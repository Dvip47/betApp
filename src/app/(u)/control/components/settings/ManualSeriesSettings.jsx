import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useGetSports from '../utilityfunctions/GetSports';


const AddSeries = ({ setOpenSeriesSettingModal }) => {

  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getBookmakerSports`
  );
  const [sportId, setSportId] = useState("");
  const [sportName, setSportName] = useState("");
  const [seriesId, setSeriesId] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [fetchedMatchesData, setFetchedMatchesData] = useState([]);
  const [fetchedSeriesData, setFetchedSeriesData] = useState([]);
  const [error, setError] = useState("");



  const fetchSeries = async () => {
    const seriesReqBody = {
      series_name: "",
      pageno: "",
      sport_id: sportId,
      limit: "1000",
      status: "2",
    };
    try {
      // setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSeries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(seriesReqBody),
        }
      );

      const jsonData = await response.json();
      setFetchedSeriesData(jsonData.series);
    } catch (error) {
      setError(error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchMatches = async () => {
    const matchReqBody = {
      series_id: seriesId,
      match_name: "",
      pageno: "",
      sport_id: sportId,
      limit: "1000",
      status: "1",
    };
    try {
      // setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllMatches`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matchReqBody),
        }
      );

      const jsonData = await response.json();
      setFetchedMatchesData(jsonData.matches);
    } catch (error) {
      setError(error);
    } finally {
      // setLoading(false);
    }
  };


  useEffect(() => {

    if (sportId === "") {
      setFetchedSeriesData([])
      setFetchedMatchesData([])
    } else {
      fetchSeries()
    }
  }, [sportId])

  useEffect(() => {
    if (seriesId === "") {
      setFetchedMatchesData([])
    } else {
      fetchMatches()
    }
  }, [seriesId])

 

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/addBookmaker`,
          {
            sport_id: sportId,
            sport_name: sportName,
            series_id: seriesId,
            series_name: seriesName
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res && res.status === 200) {
          alert(res.data.message)
          setRefresh(prev => !prev)
          setOpenSeriesSettingModal(prev => !prev);
        }

      }
    } catch (error) {
      console.error(error)
    }
  };


  return (
    <div className='w-full'>
      <div className="flex flex-col ">
        <div class="w-full mx-auto">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sport Name
          </label>
          <select
            value={sportId}
            onChange={(e) => {
              const selectedSportId = e.target.value;
              const selectedSport = dataObj.data.eventTypes.find(item => item.sport_id === selectedSportId);
              if (selectedSport) {
                setSportId(selectedSportId);
                setSportName(selectedSport.sport_name); // Set sportName here
              }
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value={""}>Please Select Sport</option>
            {dataObj.loading ? (
              <span>Loading</span>
            ) : (
              dataObj &&
              dataObj.data && dataObj.data.eventTypes.map((item, index) => (
                <option key={index} value={item.sport_id}>
                  {item.sport_name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* series */}
        <div class="w-full mx-auto">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Series Name
          </label>
          <select
            value={seriesId}
            onChange={(e) => {
              const selectedSeriesId = e.target.value;
              const selectedSeries = fetchedSeriesData.find(item => item.competition_id === selectedSeriesId);
              if (selectedSeries) {
                setSeriesId(selectedSeriesId);
                setSeriesName(selectedSeries.competition_name); // Set seriesName here
              }
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value={""}>Please Select Series</option>
            {fetchedSeriesData.length > 0 &&
              fetchedSeriesData.map((item, index) => (
                <option key={index} value={item.competition_id}>
                  {item.competition_name}
                </option>
              ))}
          </select>
        </div>


        <div className="flex items-center justify-end mt-4">
          <button type='button' className=" bg_1 text-gray-200 rounded p_4 px-2 py-1" onClick={handleSubmit}>Submit</button>
        </div>
      </div>


    </div>
  )
}

export default AddSeries
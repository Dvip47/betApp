import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useGetSports from '../utilityfunctions/GetSports';


const AddBookmaker = ({ setAddBookmaker }) => {

  const dataObj = useGetSports(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getBookmakerSports`
  );
  const [bookmakerName, setBookmakerName] = useState("");
  const [bookmakerId, setBookmakerId] = useState("");
  const [sportId, setSportId] = useState("");
  const [sportName, setSportName] = useState("");
  const [seriesId, setSeriesId] = useState("");
  const [seriesName, setSeriesName] = useState("");
  const [matchId, setMatchId] = useState("");
  const [matchName, setMatchName] = useState("");
  const [marketId, setMarketId] = useState("");
  const [marketName, setMarketName] = useState("");
  const [fetchedSeriesData, setFetchedSeriesData] = useState([]);
  const [fetchedMatchesData, setFetchedMatchesData] = useState([]);
  const [fetchedMarketsData, setFetchedMarketsData] = useState([]);
  const [isSelectionPresent, setIsSelectionPresent] = useState(true)
  const [fetchedMarketSelectionsData, setFetchedMarketSelectionsData] = useState([]);
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getSeriesDirect`,
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getMatchesDirect`,
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
  const fetchMarkets = async () => {
    const matchReqBody = {
      series_id: seriesId,
      match_id: matchId,
      pageno: "",
      sport_id: sportId,
      limit: "1000",
      status: "1",
    };
    try {
      // setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getMarketsDirect`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matchReqBody),
        }
      );

      const jsonData = await response.json();
      const markets = jsonData.markets
      if (markets) {
        const matchOdds = markets.find(mkt => mkt.market_name == "Match Odds")
        if(matchOdds){
          setMarketName(matchOdds.market_name)
          setMarketId(matchOdds.market_id)
        }
      }
      setFetchedMarketsData(jsonData.markets);
    } catch (error) {
      setError(error);
    } finally {
      // setLoading(false);
    }
  };

  const fetchMarketSelections = async () => {
    const matchReqBody = {
      series_id: seriesId,
      match_id: matchId,
      market_id: marketId,
      sport_id: sportId,
      limit: "1000",
      status: "",
      pageno: "1",

    };
    try {
      // setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getMarketSelections`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matchReqBody),
        }
      );

      const jsonData = await response.json();
      if (jsonData && jsonData.selections && jsonData.selections.length > 0) {
        setIsSelectionPresent(true);
      } else {
        setIsSelectionPresent(false);
      }
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
      setFetchedMarketsData([])
      setFetchedMarketSelectionsData([])
    } else {
      fetchSeries()
    }
  }, [sportId])

  useEffect(() => {
    if (seriesId === "") {
      setFetchedMatchesData([])
      setFetchedMarketsData([])
      setFetchedMarketSelectionsData([])
    } else {
      fetchMatches()
    }
  }, [seriesId])

  useEffect(() => {
    if (matchId === "") {
      setFetchedMarketsData([])
      setFetchedMarketSelectionsData([])
    } else {
      fetchMarkets()
    }
  }, [matchId])

  useEffect(() => {
    if (marketId === "") {
      setFetchedMarketSelectionsData([])
    } else {
      fetchMarketSelections()
    }
  }, [marketId])







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
            series_name: seriesName,
            match_id: matchId,
            match_name: matchName,
            market_id: marketId,
            market_name: marketName,
            bookmaker_name: bookmakerName,
            bookmaker_id: bookmakerId,
            minBet: 100,
            maxBet: 100000
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res && res.status === 200) {
          alert(res.data.message)
          setAddBookmaker(false);
          setRefresh(prev => !prev)
        }

      }
    } catch (error) {
      console.error(error)
    }
  };



  // Function to generate bookmakerId from bookmakerName
  const generateBookmakerId = (name) => {
    return name.toLowerCase().replace(/\s+/g, '');
  };

  return (
    <div className='w-ful my-4 bg-blue-900 px-2 px-4 pb-10 rounded-lg text-white'>
      <div className="flex items-center justify-end pb-8 pt-4">
        <p className="text-white tracking-wide bg-red-400/[0.5] rounded px-2 py-1 font-bold text-[0.833rem] cursor-pointer hover:bg-gray-500" onClick={() => setAddBookmaker(false)}>X Cancel</p>
      </div>
      <div className="flex items-end gap-x-2">
        <div class="w-full mx-auto">
          <label class="text-gray-200 font-medium text-[0.803rem]">
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
          <label class="text-gray-200 font-medium text-[0.803rem]">
            Series Name
          </label>
          <select
            value={seriesId}
            onChange={(e) => {
              const selectedSeriesId = e.target.value;
              const selectedSeries = fetchedSeriesData.find(item => item.series_id == selectedSeriesId);
              if (selectedSeries) {
                setSeriesId(selectedSeriesId);
                setSeriesName(selectedSeries.series_name); // Set seriesName here
              }
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value={""}>Please Select Series</option>
            {fetchedSeriesData.length > 0 &&
              fetchedSeriesData.map((item, index) => (
                <option key={index} value={item.series_id}>
                  {item.series_name}
                </option>
              ))}
          </select>
        </div>


        <div class="w-full mx-auto">
          <label class="text-gray-200 font-medium text-[0.803rem]">
            Match Name
          </label>
          <select
            value={matchId}
            onChange={(e) => {
              const selectedMatchId = e.target.value;
              const selectedMatch = fetchedMatchesData.find(item => item.match_id === selectedMatchId);
              if (selectedMatch) {
                setMatchId(selectedMatchId);
                setMatchName(selectedMatch.match_name); // Set matchName here
              }
            }}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value={""}>Please Select Match</option>
            {fetchedMatchesData.length > 0 &&
              fetchedMatchesData.map((item, index) => (
                <option key={index} value={item.match_id}>
                  {item.match_name}
                </option>
              ))}
          </select>
        </div>

        {/* Market Name Dropdown */}
        <div className="w-full mx-auto">
          <label className="text-gray-200 font-medium text-[0.803rem]">
            Market Name 
          </label>
          <select
            value={marketName}
            disabled
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled value="">
              {/* Please Select Market */}
              {marketName}
            </option>

          </select>
        </div>



        {/* Bookmaker Name */}
        <div class="w-full mx-auto">
          <label class="text-gray-200 font-medium text-[0.803rem]">
            Bookmaker Name
          </label>

          <input
            onChange={(e) => {
              const newName = e.target.value;
              setBookmakerName(newName);
              setBookmakerId(generateBookmakerId(newName));

            }}
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Bookmaker Name"
            required
          />
        </div>

        <div className="flex items-center justify-end">
          <button type='button' className=" bg_1 text-gray-200 rounded p_4 px-4 py-2" onClick={handleSubmit}>Submit</button>
        </div>

      </div>


    </div>
  )
}

export default AddBookmaker
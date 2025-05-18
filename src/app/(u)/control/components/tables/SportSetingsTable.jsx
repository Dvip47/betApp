import React, { useEffect, useState } from "react";
import Pagination from "../utilitycomponents/Pagination";
import { Modal } from "@mantine/core";
import SportSetting from "../settings/SportSetting";
import axios from "axios";
import ManualSport from "../settings/ManualSport";
import Toggle from "../utilitycomponents/Toggle";

export default function SportSetingsTable() {
  const [data, setData] = useState(null);
  const [sportObj, setSportObj] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false)

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getAllSports`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res && res.status === 200) {
          setData(res.data)
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [refresh]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage('')
    }, 700)
  }, [successMessage])

  const updateSportStatus = async (sport_id, is_active) => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updateSportStatus`,
          {
            sport_id: sport_id,
            is_active: is_active,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res && res.status === 200) {
          setSuccessMessage(res.data.message);
          fetchData();
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }
  const [openSportModal, setOpenSportModal] = useState(false)
  const [addManualSportModal, setAddManualSportModal] = useState(false)
  const [sportId, setSportId] = useState("")
  const handleSportModalView = (sport) => {
    if (sport) {
      setSportId(sport.sport_id)
      setSportObj(sport)
    }
    setOpenSportModal(prev => !prev);
  };
  return (
    <div className="relative w-full">
      {successMessage != "" && (
        <div className="bg-green-400/[0.1] z-50  top-0 bottom-0 right-0 left-0 flex justify-end items-start p-3 fixed">
          <div className="bg-green-400 text-gray-50 p-3 p_1 font-medium rounded">
            {successMessage}
          </div>
        </div>
      )}
      <div className="heading_top border-b-[1px] border-b-black">
        <h1 className="text-xl font-semibold mb-4 ">Sports Setting</h1>
      </div>
      <div className="button my-4">
        <button
          type="button"
          onClick={() => {
            setAddManualSportModal(true)
          }}
          class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add Manual Sport
        </button>
      </div>

      <div className="relative overflow-x-auto min-h-[400px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="p_2 font-bold text-gray-100 bg-[#2F352E]">
            <tr>
              <th scope="col" className="px-6 py-3 max-w-[10px]">S NO.</th>
              <th scope="col" className="px-6 py-3">SETTING</th>
              <th scope="col" className="px-6 py-3">SPORT</th>
              <th scope="col" className="px-6 py-3">ACTION</th>
            </tr>
          </thead>
          <tbody className="bg-[#8A4B78]">
            {loading ? (
              <span>Loading</span>
            ) : (
              data !== null && data.eventTypes && data.eventTypes.map((item, index) => {
                return (
                  <tr className="border-b dark:border-gray-700 text-gray-100" key={index}>
                    <th className="px-6 py-2 font-medium max-w-[10px] whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">{item.sport_name}</td>
                    <td className="px-6 py-2">
                      <button
                        type="button"
                        onClick={() => handleSportModalView(item)}
                        className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 font-medium rounded text-sm px-1.5 py-1 text-center"
                      >
                        Settings
                      </button>
                    </td>
                    <td className="px-6 py-2 relative">
                      <div className="relative flex items-center">
                        <Toggle
                          initialState={item.is_active === '1'}
                          onToggle={(isActive) => {
                            updateSportStatus(`${item.sport_id}`, isActive ? "1" : "0");
                          }}
                        />
                        {/* <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={false}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label> */}

                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        pageNumber={1}
        // handleNextPage={handleNextPage}
        // handlePrevPage={handlePrevPage}
        isLastPage={true}
      // goToPage={goToPage}

      />
      <Modal
        opened={openSportModal}
        title={"Sport Setting"}
        onClose={() => handleSportModalView()}
        size={""}

      >
        {/* Matket Component goes here */}
        <SportSetting sport_id={sportId} data={sportObj} setRefresh={setRefresh} setOpenSportModal={setOpenSportModal} />
      </Modal>
      <Modal
        opened={addManualSportModal}
        title={"Manual Sport"}
        onClose={() => setAddManualSportModal(false)}
        size={""}

      >
        {/* Add Manual Sport Component goes here */}
        <ManualSport sport_id={sportId} />
      </Modal>
    </div>
  );
}

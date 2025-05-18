import React, { useState, useEffect } from "react";
import axios from "axios";
import { sendHttpRequest } from "@/app/api/ship_yard/sender";



const SportsSettings = ({ userData, setRefresh, setSuccessMessage, setErrorMessage, userType, levelId, ctlSent, controlSent }) => {
  const [loading, setLoading] = useState(false);

  const [activeStates, setActiveStates] = useState([])
  const [activeStates3, setActiveStates3] = useState([]);
  const [currentUserEvents, setCurrentUserEvents] = useState([])
  const [mainAdminEvents, setMainAdminEvents] = useState([])
  const [controlEvents, setControlEvents] = useState([])
  const [adminEvents, setAdminEvents] = useState([])
  const [masterEvents, setMasterEvents] = useState([])
  const [superEvents, setSuperEvents] = useState([])
  const [panelEvents, setPanelEvents] = useState([])
  const [normalEvents, setNormalEvents] = useState([])
  const [events, setEvents] = useState([]);
  const [loadin, setLoadin] = useState(false)

  // useEffect(()=>{
  //   console.log("###",normalEvents)
  //   updateUserEventList()
  // },[normalEvents,panelEvents, superEvents, masterEvents, adminEvents, mainAdminEvents, controlEvents])

  const [sports, setSports] = useState(["Cricket", "Football", "Tennis", "Basketball", "Esports", "Darts", "Volleyball", "Gaelic Games", "Mixed Martial Arts", "Horse Racing", "Horse Racing - Today's Card", "Greyhound Racing", "Greyhounds - Today's Card", "Politics", "Rugby Union", "Rugby League", "Boxing", "Baseball", "Golf", "Motor Sport", "All Casino", "Virtual Games"])


  useEffect(() => {
    (async () => {
      setLoadin(true)

      if (controlSent === true && userType === "controlusers") {
        const res_ = await sendHttpRequest("/users/curevents", "get")
        if (res_ && res_.data && res_.data.length > 0) {
          setCurrentUserEvents(res_.data)
        }
        const res__ = await sendHttpRequest("/users/getmainevents", "post", { __id: userData._id })
        if (res__ && res__.data && res__.data.length > 0) {
          setControlEvents(res__.data)
        } else {
          setControlEvents([])
        }
        setLoadin(false)
        return
      }


      if (controlSent === true && userType === "mainadmins") {
        const res_ = await sendHttpRequest("/users/curevents", "get")
        if (res_ && res_.data && res_.data.length > 0) {
          setCurrentUserEvents(res_.data)
        }
        const res__ = await sendHttpRequest("/users/getmainevents", "post", { __id: userData._id })
        if (res__ && res__.data && res__.data.length > 0) {
          setMainAdminEvents(res__.data)
        } else {
          setMainAdminEvents([])
        }
        setLoadin(false)
        return
      }
      // control admins
      if (controlSent === true && userType === "admins") {
        const res_ = await sendHttpRequest("/users/curevents", "get")
        if (res_ && res_.data && res_.data.length > 0) {
          setCurrentUserEvents(res_.data)
        }
        const res__ = await sendHttpRequest("/users/getmainevents", "post", { __id: userData._id })
        if (res__ && res__.data && res__.data.length > 0) {
          setAdminEvents(res__.data)
        } else {
          setAdminEvents([])
        }
        setLoadin(false)
        return
      }

      // control masters
      if (controlSent === true && userType === "masters") {
        const res_ = await sendHttpRequest("/users/curevents", "get")
        if (res_ && res_.data && res_.data.length > 0) {
          setCurrentUserEvents(res_.data)
        }
        const res__ = await sendHttpRequest("/users/getmainevents", "post", { __id: userData._id })
        if (res__ && res__.data && res__.data.length > 0) {
          setMasterEvents(res__.data)
        } else {
          setMasterEvents([])
        }
        setLoadin(false)
        return
      }

      // control supers
      if (controlSent === true && userType === "supers") {
        const res_ = await sendHttpRequest("/users/curevents", "get")
        if (res_ && res_.data && res_.data.length > 0) {
          setCurrentUserEvents(res_.data)
        }
        const res__ = await sendHttpRequest("/users/getmainevents", "post", { __id: userData._id })
        if (res__ && res__.data && res__.data.length > 0) {
          setSuperEvents(res__.data)
        } else {
          setSuperEvents([])
        }
        setLoadin(false)
        return
      }

      // control panels
      if (controlSent === true && userType === "panels") {
        const res_ = await sendHttpRequest("/users/curevents", "get")
        if (res_ && res_.data && res_.data.length > 0) {
          setCurrentUserEvents(res_.data)
        }
        const res__ = await sendHttpRequest("/users/getmainevents", "post", { __id: userData._id })
        if (res__ && res__.data && res__.data.length > 0) {
          setPanelEvents(res__.data)
        } else {
          setPanelEvents([])
        }
        setLoadin(false)
        return
      }

      // control normals
      if (controlSent === true && userType === "normals") {
        const res_ = await sendHttpRequest("/users/curevents", "get")
        if (res_ && res_.data && res_.data.length > 0) {
          setCurrentUserEvents(res_.data)
        }
        const res__ = await sendHttpRequest("/users/getmainevents", "post", { __id: userData._id })
        if (res__ && res__.data && res__.data.length > 0) {
          setNormalEvents(res__.data)
        } else {
          setNormalEvents([])
        }
        setLoadin(false)
        return
      }


    })()
  }, [])
  const toggleActive = (index) => {
    const newActiveStates = [...activeStates];
    newActiveStates[index] = !newActiveStates[index];
    setActiveStates(newActiveStates);
  };
  const toggleActiveControls = (sport) => {
    console.log(controlEvents)
    setControlEvents(prevActiveStates => {
      if (prevActiveStates.includes(sport)) {
        return prevActiveStates.filter(activeSport => activeSport !== sport);
      } else {
        return [...prevActiveStates, sport];
      }
    });
  };
  const toggleMainAdminActives = (sport) => {
    setMainAdminEvents(prevActiveStates => {
      if (prevActiveStates.includes(sport)) {
        // If the sport is already in the activeStates2 list, remove it
        return prevActiveStates.filter(activeSport => activeSport !== sport);
      } else {
        // If the sport is not in the activeStates2 list, add i
        return [...prevActiveStates, sport];
      }
    });
  };
  const toggleAdminActives = (sport) => {
    setAdminEvents(prevActiveStates => {
      if (prevActiveStates.includes(sport)) {
        // If the sport is already in the activeStates2 list, remove it
        return prevActiveStates.filter(activeSport => activeSport !== sport);
      } else {
        // If the sport is not in the activeStates2 list, add i
        return [...prevActiveStates, sport];
      }
    });
  };
  const toggleMasterActives = (sport) => {
    setMasterEvents(prevActiveStates => {
      if (prevActiveStates.includes(sport)) {
        // If the sport is already in the activeStates2 list, remove it
        return prevActiveStates.filter(activeSport => activeSport !== sport);
      } else {
        // If the sport is not in the activeStates2 list, add i
        return [...prevActiveStates, sport];
      }
    });
  };
  const toggleSuperActives = (sport) => {
    setSuperEvents(prevActiveStates => {
      if (prevActiveStates.includes(sport)) {
        // If the sport is already in the activeStates2 list, remove it
        return prevActiveStates.filter(activeSport => activeSport !== sport);
      } else {
        // If the sport is not in the activeStates2 list, add i
        return [...prevActiveStates, sport];
      }
    });
  };
  const togglePanelActives = (sport) => {
    setPanelEvents(prevActiveStates => {
      if (prevActiveStates.includes(sport)) {
        // If the sport is already in the activeStates2 list, remove it
        return prevActiveStates.filter(activeSport => activeSport !== sport);
      } else {
        // If the sport is not in the activeStates2 list, add i
        return [...prevActiveStates, sport];
      }
    });
  };

  const toggleNormalActives = (sport) => {
    let sports = [...normalEvents]
    console.log(sports)
    if (sports.includes(sport)) {
      const updated = sports.filter(activeSport => activeSport !== sport)
      updateUserSports(updated)
    } else {
      const updated = [...sports, sport]
      updateUserSports(updated)
    }
    // setNormalEvents(prevActiveStates => {
    //   if (prevActiveStates.includes(sport)) {
    //     return ;
    //   } else {
    //     return [...prevActiveStates, sport];
    //   }
    // });
  };


  const updateUserSports = async (sports) => {
    setLoading(true);
    setRefresh(false);

    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/event_list_patch`,
          {
            user_id: userData._id,
            event_list: sports
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res && res.status === 200 && res.data.statusCode === 200) {
          setSuccessMessage("Status  Update Successfully");
        } else {
          setErrorMessage("Oops something went wrong");
        }
        setRefresh(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateUserEventList = async () => {
    setLoading(true);
    setRefresh(false);

    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/event_list_patch`,
          {
            user_id: userData._id,
            event_list: userType === "controlusers" ? controlEvents : userType === "mainadmins" ? mainAdminEvents : userType === "admins" ? adminEvents : userType === "masters" ? masterEvents : userType === "supers" ? superEvents : userType === "panels" ? panelEvents : userType === "normals" && normalEvents
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res && res.status === 200 && res.data.statusCode === 200) {
          setSuccessMessage("Status  Update Successfully");
        } else {
          setErrorMessage("Oops something went wrong");
        }
        setRefresh(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="overflow-x-auto rounded">

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-200 bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SrNo.
            </th>
            <th scope="col" className="px-6 py-3">
              Sport Name
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>

          {controlSent === true && userType === "controlusers" && sports.length > 0 && sports.map((sport, index) => (
            <tr
              key={index}
              className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="border-r px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}.
              </th>
              <td className="px-6 py-1 border-r">{sport}</td>
              <td className="px-6" onClick={() => {
                toggleActiveControls(sport)
                updateUserEventList()
              }}>
                <img
                  src={controlEvents.includes(sport) ? "/toggleOn.png" : "/inactive.png"}
                  alt={controlEvents.includes(sport) ? "active" : "inactive"}
                  className="w-[50px] cursor-pointer"
                />
              </td>
            </tr>
          ))}


          {controlSent === true && userType === "mainadmins" && currentUserEvents.length > 0 && currentUserEvents.map((sport, index) => (
            <tr
              key={index}
              className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="border-r px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}.
              </th>
              <td className="px-6 py-1 border-r">{sport}</td>
              <td className="px-6" onClick={() => {
                toggleMainAdminActives(sport)
                updateUserEventList()
              }}>
                <img
                  src={mainAdminEvents.includes(sport) ? "/toggleOn.png" : "/inactive.png"}
                  alt={mainAdminEvents.includes(sport) ? "active" : "inactive"}
                  className="w-[50px] cursor-pointer"
                />
              </td>
            </tr>
          ))}

          {/* control admins */}
          {controlSent === true && userType === "admins" && currentUserEvents.length > 0 && currentUserEvents.map((sport, index) => (
            <tr
              key={index}
              className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="border-r px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}.
              </th>
              <td className="px-6 py-1 border-r">{sport}</td>
              <td className="px-6" onClick={() => {
                toggleAdminActives(sport)
                updateUserEventList()
              }}>
                <img
                  src={adminEvents.includes(sport) ? "/toggleOn.png" : "/inactive.png"}
                  alt={adminEvents.includes(sport) ? "active" : "inactive"}
                  className="w-[50px] cursor-pointer"
                />
              </td>
            </tr>
          ))}


          {/* control masters */}

          {controlSent === true && userType === "masters" && currentUserEvents.length > 0 && currentUserEvents.map((sport, index) => (
            <tr
              key={index}
              className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="border-r px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}.
              </th>
              <td className="px-6 py-1 border-r">{sport}</td>
              <td className="px-6" onClick={() => {
                toggleMasterActives(sport)
                updateUserEventList()
              }}>
                <img
                  src={masterEvents.includes(sport) ? "/toggleOn.png" : "/inactive.png"}
                  alt={masterEvents.includes(sport) ? "active" : "inactive"}
                  className="w-[50px] cursor-pointer"
                />
              </td>
            </tr>
          ))}


          {/* control supers */}


          {controlSent === true && userType === "supers" && currentUserEvents.length > 0 && currentUserEvents.map((sport, index) => (
            <tr
              key={index}
              className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="border-r px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}.
              </th>
              <td className="px-6 py-1 border-r">{sport}</td>
              <td className="px-6" onClick={() => {
                toggleSuperActives(sport)
                updateUserEventList()
              }}>
                <img
                  src={superEvents.includes(sport) ? "/toggleOn.png" : "/inactive.png"}
                  alt={superEvents.includes(sport) ? "active" : "inactive"}
                  className="w-[50px] cursor-pointer"
                />
              </td>
            </tr>
          ))}

          {/* control panels */}
          {controlSent === true && userType === "panels" && currentUserEvents.length > 0 && currentUserEvents.map((sport, index) => (
            <tr
              key={index}
              className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="border-r px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}.
              </th>
              <td className="px-6 py-1 border-r">{sport}</td>
              <td className="px-6" onClick={() => {
                togglePanelActives(sport)
                updateUserEventList()
              }}>
                <img
                  src={panelEvents.includes(sport) ? "/toggleOn.png" : "/inactive.png"}
                  alt={panelEvents.includes(sport) ? "active" : "inactive"}
                  className="w-[50px] cursor-pointer"
                />
              </td>
            </tr>
          ))}

          {/* control normals */}

          {controlSent === true && userType === "normals" && currentUserEvents.length > 0 && currentUserEvents.map((sport, index) => (
            <tr
              key={index}
              className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="border-r px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}.
              </th>
              <td className="px-6 py-1 border-r">{sport}</td>
              <td className="px-6" onClick={() => {
                toggleNormalActives(sport)
                // updateUserEventList()
              }}>
                <img
                  src={normalEvents.includes(sport) ? "/toggleOn.png" : "/inactive.png"}
                  alt={normalEvents.includes(sport) ? "active" : "inactive"}
                  className="w-[50px] cursor-pointer"
                />
              </td>
            </tr>
          ))}



          <tr>
            {
              events.length === 0 && loadin && levelId != "OVER_WRITE" && (
                <td className="text-sm text-gray-800">Loading</td>
              )
            }

            {
              activeStates3.length === 0 && !loadin && userType != "mainadmins" && levelId === "OVER_WRITE" && (
                <td className="text-sm text-gray-800">No data found</td>
              )
            }
            {
              activeStates3.length === 0 && loadin && levelId === "OVER_WRITE" && (
                <td className="text-sm text-gray-800">Loading</td>
              )
            }
          </tr>
        </tbody>
      </table>


    </div>
  );
};

export default SportsSettings;

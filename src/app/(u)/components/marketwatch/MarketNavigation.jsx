import React, { useState, useEffect, useRef, useContext } from 'react';

import WestRoundedIcon from '@mui/icons-material/WestRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { getIcon } from '../../utils/utils';
import { getEvents } from '@/app/api/exchange';


const inhouseStyling = {
    default: `hover:animate-bounce`
}

const MarketWatchNav = ({ setCurrentSport, currentSport, setCurrentEventTypeId, setLoadingStatus, setSport }) => {
    const [guideToLeft, setGuideToLeft] = useState(false)
    const containerRef = useRef(null);
    const [events, setEvents] = useState([])
    const [loadin, setLoadin] = useState(false)

    const fetcheEvents = async () => {
        try {
            setLoadin(true)
            const eventTypes = await getEvents()
            if (eventTypes) {
                setEvents(eventTypes)
                setCurrentSport(eventTypes[0].sport_name)
                setCurrentEventTypeId(eventTypes[0].sport_id)
                setLoadin(false);
                
            }
        } catch (error) {
            console.log(error)
            setLoadin(false)

        }
    }

    useEffect(() => {
        fetcheEvents()
    }, [])

    const scrollToRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 100,
                behavior: 'smooth',
            });
        }
    };

    const scrollToLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: - 100,
                behavior: 'smooth',
            });
        }
    };


    const handledOnclick = (sportName, eventType) => {
        // let spName = sportName
        if (currentSport === sportName) {
            return
        }
        setCurrentSport(sportName);
        setCurrentEventTypeId(eventType.sport_id)
        setLoadingStatus(true)
    };
    return (
        <div className="flex flex-col mt-5 w-full ">

            <div className="flex flex-col w-full bg_1 rounded p-2">
                <div className="flex justify-between items-center w-full px-2 py-1">
                    <div className="flex justify-end items-center p-0" onClick={scrollToLeft}>
                        <WestRoundedIcon fontSize='smaller' className={` cursor-pointer text-orange-500`} />
                    </div>
                    <div className="flex justify-end items-center p-0" onClick={() => {
                        setGuideToLeft(true)
                        scrollToRight()
                    }}>
                        <EastRoundedIcon fontSize='smaller' className=' cursor-pointer text-orange-500 ' />
                    </div>
                </div>
                <div
                    className="flex gap-2 text-white text-sm overflow-x-auto my-1"
                    ref={containerRef}
                    style={{
                        "msOverflowStyle": "none",
                        "scrollbarWidth": "none",
                        "overflow": "auto"
                    }}
                >
                    {
                        events.length > 0 && events.map((modes, index) => {
                            const icon = getIcon(modes.sport_name)
                            return (
                                (

                                    <div
                                        onClick={() => handledOnclick(modes.sport_name, modes)}
                                        key={index}
                                        className={`${currentSport === modes.sport_name
                                            ? "bg-gradient-to-r from-black to-orange-600"
                                            : "bg-gray-900/[0.8]"
                                            } flex items-center justify-center gap-1 rounded-r hover:text-white cursor-pointer px-4 py-2`}
                                        style={{ whiteSpace: 'nowrap' }}
                                    >
                                        <div
                                            className={`flex items-center justify-center gap-1 rounded-r hover:text-white cursor-pointer`}
                                        >
                                            {
                                                icon && icon != null ? (
                                                    <img className="h-[1.4rem] w-[1.4rem]" src={icon.url} alt="cricket-ball--v1" />
                                                ) :
                                                    modes.icon
                                            }
                                            <p className="font-bold p_2 w-full">{modes.sport_name === "Football" ? "Soccer" : modes.sport_name}</p>
                                        </div>
                                    </div>

                                )
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )

}

export default MarketWatchNav
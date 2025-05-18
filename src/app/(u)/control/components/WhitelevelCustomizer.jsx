"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getCasinoProviders,
  getGames,
  getPopularGames,
} from "@/app/api/ship_yard/sender";
import PopularCustomize from "./Populars";

const WhitelevelCustomize = () => {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [provider, setProvider] = useState("ALL");
  const [gameName, setGameName] = useState("");

  const [games, setGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [providers, setProviders] = useState([]);
  const [activeGame, setActiveGame] = useState("");

  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1);
  const [toggleHelp, setToggleHelp] = useState(true);

  useEffect(() => {
    if (sessionExpired === true) {
      localStorage.clear();
      window.location.replace("/login");
    }
  }, [sessionExpired]);

  const fetchGames = async (
    currentLimit = limit,
    currentPage = page,
    provider,
    gameName
  ) => {
    try {
      const gamesData = await getGames({
        limit: currentLimit,
        page: currentPage,
        provider,
        gameName,
      });
      if (gamesData) {
        setGames(gamesData.data);
        setTotalPages(gamesData.metadata.totalPages);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const fetchPopularGames = async () => {
    try {
      const gamesData = await getPopularGames();
      if (gamesData) {
        console.log("<<<<<<<");
        setPopularGames(gamesData.data);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userdata`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          if (res.status === 200) {
            if (res.data.statusCode === 404) {
              setLoading(false);
              setAdminList([]);
            } else if (res.data.statusCode === 200) {
              setLoading(false);
              setAdminList([res.data.other]);
            } else if (res.data.statusCode === 401) {
              setLoading(false);
              setSessionExpired(true);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProviders = async () => {
    try {
      const providers = await getCasinoProviders();
      setProviders(providers);
    } catch (error) {
      console.log(error);
    }
  };
  const manageGame = async (game) => {
    try {
      setLoading2(true);
      setActiveGame(game.game_id);
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/manageGame`,
          {
            game_id: game.game_id,
            popular: "toggled",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          fetchPopularGames();
          fetchGames(limit, page, provider, gameName);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActiveGame("");
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchProviders();
    fetchData();
    fetchPopularGames();
    fetchGames();
  }, []);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page when limit changes
  };

  useEffect(() => {
    fetchGames(limit, page, provider, gameName);
  }, [limit, page, provider, gameName]);

  return (
    <div className="">
      <h2 className="text-2xl text-blue-800 leading-loose font-bold  mb-4">
        Casino Center
      </h2>
      <div className="grid grid-cols-12 gap-x-10">
        <div className="col-span-12 sm:col-span-4 gap-0.5 sm:border-r sm:pr-10 ">
          <PopularCustomize
            setPopularGames={setPopularGames}
            popularGames={popularGames}
          />
        </div>
        <div className="col-span-12 sm:col-span-8 w-full ">
          <div className="flex max-sm:flex-col justify-between">
            <h5 className="text-lg font-bold uppercase text-blue-600">GAMES</h5>
            {toggleHelp ? (
              <div className="bg-gray-100 pl-4 pb-4 rounded">
                <div className="justify-end items-center flex">
                  <button
                    type="button"
                    onClick={() => setToggleHelp((prev) => !prev)}
                    className="text-lg font-bold text-red-500"
                  >
                    X
                  </button>
                </div>
                <p className="text-sm font-bold text-blue-400 pr-4">
                  Click game to add/remove popular badge
                </p>
              </div>
            ) : (
              <p
                className="text-sm font-bold underline text-red-400 cursor-pointer"
                onClick={() => setToggleHelp((prev) => !prev)}
              >
                Help?
              </p>
            )}
          </div>
          {/* filter */}
          <div className="flex max-sm:flex-col sm:items-center sm:justify-between mb-4 gap-x-4 mt-2">
            <div className="flex max-sm:flex-col sm:items-start gap-x-4">
              <div className="flex items-start">
                <h6 className="text-sm font-bold">Filter by:</h6>
              </div>
              <div className="flex flex-col">
                <label htmlFor="limit" className="text-sm font-bold">
                  Provider:
                </label>
                <select
                  id="limit"
                  value={provider}
                  onChange={(e) => {
                    setProvider(e.target.value);
                    setPage(1);
                  }}
                  className="border p-1 rounded"
                >
                  <option value="">ALL</option>
                  {providers.map((option) => (
                    <option
                      key={option.provider_name}
                      value={option.provider_name}
                    >
                      {option.provider_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="game_name" className="text-sm font-bold">
                  Game Name:
                </label>
                <input
                  type="text"
                  id="game_name"
                  value={gameName}
                  onChange={(e) => {
                    setGameName(e.target.value);
                    setPage(1);
                  }}
                  className="border p-1 rounded"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="limit" className="text-sm font-bold">
                Games per page
              </label>
              <select
                id="limit"
                value={limit}
                onChange={handleLimitChange}
                className="border p-1 rounded"
              >
                {[5, 10, 20, 50, 100].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-4 gap-0.5 ">
            {games &&
              games.length > 0 &&
              games.map((game, index) => (
                <div
                  key={index}
                  className={`relative rounded hover:bg-gray-500 w-full col-span-1 font-medium leading-loose bg-gray-300 text-xs px-4 py-1 cursor-pointer transition-all duration-700 ease-in-out ${"border-r text-white"} ${
                    game.popular === "1" && "bg-yellow-500"
                  }`}
                  onClick={() => {
                    if (activeGame === "") {
                      manageGame(game);
                    }
                  }}
                >
                  {loading2 && game.game_id === activeGame && (
                    <div className="absolute inset-0 bg-secondary/[0.8] flex justify-center items-center font-bold sm:text-lg">
                      Loading...
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <img src={game.url} alt="" className="h-12 w-12" />
                    </div>
                    <div className="flex flex-col  items-end">
                      <h5 className="text-black text-xs text-end">{game.game_name}</h5>
                      <h5 className="text-black text-xs text-end">
                        Sub Provider - {game.sub_provider_name}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
              onClick={handlePreviousPage}
              disabled={page <= 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
              onClick={handleNextPage}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitelevelCustomize;

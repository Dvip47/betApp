"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { RiCalendarScheduleLine } from "react-icons/ri";

const ScoresCustomizer = ({ popularGames, setRefreshData }) => {
  const [message, setMessage] = useState("");
  const [selectedGameIndex, setSelectedGameIndex] = useState(null);
  const [scoreKey, setScoreKey] = useState("");

  const handleSaveScoreKey = async () => {
    if (selectedGameIndex === null) return;

    const match_id = popularGames[selectedGameIndex]?.match_id;
    const score_key = scoreKey;

    if (!match_id || !score_key) {
      setMessage("Match ID or Score Key is missing!");
      return;
    }

    try {
      const token = localStorage.getItem("tk");
      if (token) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/manageMatchScorekey`,
          {
            match_id,
            score_key,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Score key saved successfully!");
      }
    } catch (error) {
      console.error("Error saving score key:", error);
      setMessage("Failed to save score key.");
    }

    setScoreKey(""); // Clear input
    setSelectedGameIndex(null); // Close modal
    setRefreshData(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div>
      {message && (
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-4 rounded shadow-lg transform transition-all duration-300 ease-in-out z-9999">
          {message}
        </div>
      )}

     
      <div className="columns-2">
        {popularGames.map((game, index) => (
          <div
            key={game.match_id}
            className="relative hover:bg-blue-100 bg-white border border-blue-300 shadow-md rounded p-2 transition-all duration-500 ease-in-out cursor-pointer mb-1"
          >
            <div
              className="flex flex-col"
              onClick={() =>
                setSelectedGameIndex(selectedGameIndex === index ? null : index)
              }
            >
              <div className="flex items-center gap-x-4">
                <p className="text-black text-sm font-semibold">
                  {game.match_name}
                </p>
              </div>
              <div className="flex items-center gap-x-2 text-start">
                <RiCalendarScheduleLine />
                <span className="text-black font-medium text-sm">
                  {moment(game.market_start_time).format("MMM Do YYYY, h:mm a")}
                </span>
              </div>
              <div className="text-start">
                <span
                  className={`text-white font-medium text-sm px-3 ${
                    game.score_key ? "bg-green-500" : "bg-blue-500"
                  } rounded`}
                >
                  {game.score_key ? game.score_key : "Add Key"}
                </span>
              </div>
            </div>

            {selectedGameIndex === index && (
              <div className="absolute top-full left-3/4 w-full transform -translate-x-1/2 mt-2 bg-white shadow-lg border border-gray-300 rounded-lg p-4 z-[9999]">
                <p className="text-sm mb-2">
                  Enter Score Key for <strong>{game.match_name}</strong>:
                </p>
                <input
                  type="text"
                  value={scoreKey}
                  onChange={(e) => setScoreKey(e.target.value)}
                  placeholder="Enter score key"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleSaveScoreKey}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setSelectedGameIndex(null)}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoresCustomizer;

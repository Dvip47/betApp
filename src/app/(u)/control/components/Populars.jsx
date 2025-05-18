"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const PopularCustomize = ({ popularGames, setPopularGames }) => {
  const [message, setMessage] = useState("");
  const [selectedGameIndex, setSelectedGameIndex] = useState(null);
  const [newPosition, setNewPosition] = useState("");

  const handleReorder = () => {
    if (selectedGameIndex === null || newPosition === "") return;

    const newIndex = parseInt(newPosition, 10) - 1;
    if (isNaN(newIndex) || newIndex < 0 || newIndex >= popularGames.length) {
      setMessage("Invalid position. Please try again.");
      return;
    }

    // Reorder the games array
    const reorderedGames = [...popularGames];
    const [selectedGame] = reorderedGames.splice(selectedGameIndex, 1);
    reorderedGames.splice(newIndex, 0, selectedGame);

    // Update sort_priority
    const updatedGames = reorderedGames.map((game, idx) => ({
      ...game,
      sort_priority: idx + 1,
    }));

    setPopularGames(updatedGames);
    saveGameOrder(updatedGames);
    setSelectedGameIndex(null);
    setNewPosition("");
  };

  const saveGameOrder = async (reorderedGames) => {
    try {
      const token = localStorage.getItem("tk");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/updateGameOrder`,
        { games: reorderedGames },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error("Error saving game order:", error);
    }
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
        <div className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
          {message}
        </div>
      )}

      <h2 className="text-lg font-bold uppercase text-blue-600 mb-4">
        Popular Games
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {popularGames.map((game, index) => (
          <div
            key={game.game_id}
            className="relative hover:bg-blue-100 bg-white border border-blue-300 shadow-md rounded-lg p-2 transition-all duration-500 ease-in-out cursor-pointer"
           
          >
            <div className="flex justify-between items-center"  onClick={() =>
              setSelectedGameIndex(selectedGameIndex === index ? null : index)
            }>
              <div className="flex items-center gap-x-4">
                <img
                  src={game.url}
                  alt={game.game_name}
                  className="h-16 w-16 rounded-md border border-gray-300"
                />
                <div>
                  <h5 className="text-black text-sm font-semibold">
                    {game.game_name}
                  </h5>
                  <h5 className="text-black text-xs font-semibold">
                    Provider - {game.provider_name}
                  </h5>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold">
                  <span className="text-white font-medium text-sm px-3 bg-blue-500 rounded">
                    {index + 1}
                  </span>
                </p>
                <p className="text-[0.65rem] font-bold">Sort Priority</p>
              </div>
            </div>

            {selectedGameIndex === index && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg border border-gray-300 rounded-lg p-4 z-[9999]">
                <p className="text-sm mb-2">
                  Enter new position for{" "}
                  <strong>{popularGames[index].game_name}</strong>:
                </p>
                <input
                  type="number"
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  placeholder="New position"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleReorder}
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

export default PopularCustomize;


// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PopularCustomize = ({ popularGames, setPopularGames }) => {
//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleDragStart = (index) => {
//     setDraggedIndex(index);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault(); // Allow drop
//   };

//   const handleDrop = (index) => {
//     if (draggedIndex === null) return;

//     // Reorder the games array
//     const reorderedGames = [...popularGames];
//     const [draggedItem] = reorderedGames.splice(draggedIndex, 1);
//     reorderedGames.splice(index, 0, draggedItem);

//     // Update sort_priority based on new index
//     const updatedGames = reorderedGames.map((game, idx) => ({
//       ...game,
//       sort_priority: idx + 1, // new sort priority based on index
//     }));

//     setPopularGames(updatedGames); // Update the state with reordered games
//     setDraggedIndex(null);

//     // Save the updated game order with new sort priorities
//     saveGameOrder(updatedGames);
//   };

//   const saveGameOrder = async (reorderedGames) => {
//     try {
//       const token = localStorage.getItem("tk");

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/updateGameOrder`,
//         { games: reorderedGames },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res) {
//         setMessage(res.data.message);
//       }
//     } catch (error) {
//       console.error("Error saving game order:", error);
//     }
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setMessage("");
//     }, 3000);
//   }, [message]);
//   return (
//     <div className="">
//       {message && (
//         <div className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
//           {message}
//         </div>
//       )}

//       <h2 className="text-lg font-bold uppercase text-blue-600 mb-4">
//         Popular Games
//       </h2>
//       <div className="grid grid-cols-1 gap-4">
//         {popularGames.map((game, index) => (
//           <div
//             key={game.game_id}
//             draggable
//             onDragStart={() => handleDragStart(index)}
//             onDragOver={handleDragOver}
//             onDrop={() => handleDrop(index)}
//             className="hover:bg-blue-100 bg-white border border-blue-300 shadow-md rounded-lg p-2 transition-all duration-500 ease-in-out"
//           >
//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-x-4">
//                 <img
//                   src={game.url}
//                   alt={game.game_name}
//                   className="h-16 w-16 rounded-md border border-gray-300"
//                 />
//                 <div className="">
//                   <h5 className="text-black text-sm font-semibold ">
//                     {game.game_name}
//                   </h5>
//                   <h5 className="text-black text-xs font-semibold ">
//                     Provider - {game.provider_name}
//                   </h5>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <p className=" font-bold">
//                   <span className="text-white font-medium text-sm px-3 bg-blue-500 rounded">
//                     {index + 1}
//                   </span>
//                 </p>
//                 <p className="text-[0.65rem] font-bold">
//                   Sort Priority
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Drop Area */}
//         <div
//           className="bg-gray-100 border-2 border-dashed border-gray-400 h-10 rounded-md flex justify-center items-center text-gray-500"
//           onDragOver={handleDragOver}
//           onDrop={() => handleDrop(popularGames.length)}
//         >
//           Drop here to reorder
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopularCustomize;

import React from "react";
export default function DeleteDeclaredMarkets() {

    return (
        <div className="bg-gray-100 p-2 ">
            <h1 className="text-xl font-semibold mb-4 ">Delete Declared Markets</h1>
            <div className="p-12 flex flex-col items-center gap-2 justify-center ">

                <p className="t_c_1 h_6 font-bold">Note: Here All Declared Market Will be deleted.</p>
                <button className="bg-orange-700 p_1 p-2 font-bold rounded text-gray-200 " type="button" onClick={() => alert("Developement in progress")}>Submit</button>
            </div>
        </div>
    );
}

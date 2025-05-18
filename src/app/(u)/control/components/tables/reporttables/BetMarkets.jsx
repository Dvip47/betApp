import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function BetMarkets() {
  const searchParams = useSearchParams();
  const match_id = searchParams.get("match")
  const market_id = searchParams.get("market")

  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      const body = {
        market_id: market_id,
        match_id,
        page_no: page,
      };
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getMatchMarkets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const jsonData = await response.json();
      setData(jsonData.marketbets);
    } catch (error) {
      setError(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [market_id, page]);

  return (
    <div className="relative w-full">
      <div className="heading_top border-b-[1px] border-b-black flex justify-between">
        <h1 className="text-xl font-semibold ">Bets Market</h1>
        <div className="button ">
          <button
            type="button"
            class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Back
          </button>
        </div>
      </div>

      <div class="relative overflow-x-auto min-h-[400px]">
        <table class="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th class="py-2 px-4 border-b">S NO.</th>
              <th class="py-2 px-4 border-b">SETTLED</th>
              <th class="py-2 px-4 border-b">DEALER</th>
              <th class="py-2 px-4 border-b">USERNAME</th>
              <th class="py-2 px-4 border-b">TYPE</th>
              <th class="py-2 px-4 border-b">ODDS</th>
              <th class="py-2 px-4 border-b">STACK</th>
              <th class="py-2 px-4 border-b">PROFIT/LOSS</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr>
                    <td class="py-2 px-4 border-b">{index + 1}</td>
                    <td class="py-2 px-4 border-b">
                      {item.market_name + "Round Id" + item.market_id}
                      <br />
                      {"Placed" +
                        new Date(item.betPlacingTime).toLocaleString()}
                    </td>
                    <td class="py-2 px-4 border-b">DEALER</td>
                    <td class="py-2 px-4 border-b">{item.user_name}</td>
                    <td class="py-2 px-4 border-b">{item.type}</td>
                    <td class="py-2 px-4 border-b">{item.price}</td>
                    <td class="py-2 px-4 border-b">{item.stack}</td>
                    <td class="py-2 px-4 border-b">PROFIT/LOSS</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

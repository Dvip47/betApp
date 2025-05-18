import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchResultsSetting = ({ sport_id, data, setOpenMatchResultsModal,getBetsMarkets, setOpenMatchMarketsModal }) => {
  const [selections, setSelections] = useState([]);
  const [buttons, setButtons] = useState({
    selectionId: '',
    runnerName: '',
    total_runs: ''
  });

  const getMarketSelections = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getBetsMarketSelections`,
        {
          sport_id: sport_id,
          market_id: data.marketId,
          match_id: data.matchId,
        }
      );
      if (res && res.status === 200) {
        setSelections(res.data.selections);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      getMarketSelections();
    }
  }, [data]);

  const handleSubmit = async () => {
    if (sport_id === "4") {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updateMarketResults`,
          {
            selectionId: buttons.selectionId,
            runnerName: buttons.runnerName,
            total_runs: buttons.total_runs,
            marketId: data.marketId,
            marketType: data.marketType
          }
        );
        if (res && res.status === 200) {
          setOpenMatchResultsModal(false)
          getBetsMarkets()
          alert(res.data.message);
        }

      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/updateMarketResults`,
          {
            selectionId: buttons.selectionId,
            marketId: data.marketId,
            marketType: data.marketType
          }
        );
        if (res && res.status === 200) {
          setOpenMatchResultsModal(false)
          getBetsMarkets()
          alert(res.data.message)
        }

      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        {data && data.marketType === "fancy" || data && data.marketType === "premium" ? (
          <>
            <label className='form-label'>Select Selection Name</label>
            <select
              className='form-input rounded'
              value={buttons.runnerName}
              onChange={(e) => {
                setButtons(prev => ({
                  ...prev,
                  runnerName: e.target.value
                }));
              }}
            >
              <option value="">Please select selection</option>
              <option value={"Total Runs"}>
                Total Runs
              </option>
            </select>

            {buttons.runnerName === "Total Runs" && (
              <div className="flex flex-col mt-4">
                <label className='form-label'>Total Runs</label>
                <input
                  type="number"
                  className='form-input rounded'
                  name="total_runs"
                  value={buttons.total_runs || ''}
                  onChange={(e) => setButtons(prev => ({
                    ...prev,
                    total_runs: e.target.value
                  }))}
                />
              </div>
            )}
          </>
        ) : data && (
          <>
            <label className='form-label'>Select Selection Name</label>
            <select
              className='form-input rounded'
              value={buttons.runnerName}
              onChange={(e) => {
                const selectedOption = selections.find(option => option.runnerName === e.target.value);
                setButtons(prev => ({
                  ...prev,
                  selectionId: selectedOption ? selectedOption.selectionId : '', // Set selectionId based on the selected runnerName
                  runnerName: e.target.value
                }));
              }}
            >
              <option value="">Please select selection</option>
              {selections.map((selection, index) => (
                <option key={index} value={selection.runnerName}>
                  {selection.runnerName}
                </option>
              ))}
            </select>

            {buttons.runnerName === "Total Runs" && (
              <div className="flex flex-col mt-4">
                <label className='form-label'>Total Runs</label>
                <input
                  type="number"
                  className='form-input rounded'
                  name="total_runs"
                  value={buttons.total_runs || ''}
                  onChange={(e) => setButtons(prev => ({
                    ...prev,
                    total_runs: e.target.value
                  }))}
                />
              </div>
            )}
          </>
        )}

        <div className="flex items-center justify-end">
          <button type='button' className="bg-blue-700 text-gray-100 rounded px-3 py-2 text-[0.833rem]" onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchResultsSetting;


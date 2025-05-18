import React from "react"
// import { styling1 } from "src/app/custom_styling/styling";


const EmptyOddCell = ({ type, team, handlePlaceBet, eventId, setSelectedOdd, eventName, marketId, styling1,canBet }) => {
    // const OddsComponent = ({ type, team, price, size, handlePlaceBet, eventId, setSelectedOdd, eventName, marketId }) => {
    return (
        <div
            className={`${styling1.oddsStyle} ${type === "back" ? styling1.backOdd : styling1.layOdd}`}
            onClick={() => {
                if (canBet) {
                    handlePlaceBet({
                        betType: type,
                        selection: team,
                        price: 1.00,
                        stake: 0,
                        eventId: eventId,
                        eventName: eventName,
                        mktId: marketId
                    });
                    setSelectedOdd(eventId);
                }

            }}
        >
            <p className={` ${styling1.oddsP}`}>
                <span className='text-transparent'>0</span>
            </p>
            <p className={` ${styling1.oddsP}`}>
                <span className='text-transparent'>0</span>
            </p>
        </div>
    );
};


const OddsComponent = ({ type, team, price, size, handlePlaceBet, eventId, setSelectedOdd, eventName, marketId, styling1,canBet }) => {
    return (
        <div
            className={`${styling1.oddsStyle} ${type === "back" ? styling1.backOdd : styling1.layOdd}`}
            onClick={() => {
                if (canBet) {
                    handlePlaceBet({
                        betType: type,
                        selection: team,
                        price: price,
                        stake: 0,
                        eventId: eventId,
                        eventName: eventName,
                        mktId: marketId
                    });
                    setSelectedOdd(eventId);
                }
            }}
        >
            <p className={`${styling1.oddsT1}`}>{price}</p>
            <p className={`${styling1.oddsP}`}>{size}</p>
        </div>
    );
};


export {
    OddsComponent,
    EmptyOddCell
}
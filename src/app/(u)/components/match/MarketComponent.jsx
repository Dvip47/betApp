import React, {  useEffect, useState } from 'react'
import { Box, Collapse, Group } from '@mantine/core'
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatNumber } from '../../utils/utils';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { styling2, styling4 } from 'src/app/custom_styling/styling';
import MarketOddsComponent from './MarketOddsCompoent';


export const sortBetsLastUpdateTime = (bets) => {
    bets.sort((a, b) => {
        // Convert 'updatedTime' strings to Date objects
        const dateA = new Date(a.updatedTime);
        const dateB = new Date(b.updatedTime);

        // Compare the Date objects
        return dateB - dateA;
    });
}

const MarketComponent = ({ market, openedd, mktBks }) => {
    const [open, setOpen] = useState(openedd)
    const [mktBk, setMktBk] = useState({})

    useEffect(() => {
        if (mktBks.length > 0) {
            const mktBk_ = mktBks.find(mktOdds => mktOdds.marketId === market.marketId)
            if (mktBk_) {
                setMktBk(mktBk_)
            }
        }
    }, [mktBks])

    const onClick = () => {
        setOpen(prev => !prev)
    }


    return (
        <div className="w-full">
            <div className="my-2 w-full">
                <div className={`flex items-center gap-x-1`}>
                    <InfoTwoToneIcon
                        fontSize='smaller'
                        className='text-orange-500 cursor-pointer'
                        onClick={() => alert("Terms and Conditions Apply")}
                    />
                    <p className={` ${styling4.totalMatched}`}>
                        MATCHED:
                    </p>
                    <p className={` ${styling4.totalMatched}`}>
                        {mktBk.totalMatched > 0 ? (mktBk.totalMatched).toFixed(2) : 0}
                    </p>
                </div>
            </div>


            <Box key={market.marketName} mx="auto" className={`bg_1 w-full rounded col-span-12 grid grid-cols-12 items-center`}>

                <Group position="start" mb={5} onClick={onClick} className="bg-gray-800 p-1 col-span-12">
                    <div className="flex justify-between text-white items-center w-full">
                        <p className="p_1_sm font-bold text-gray-200 p-1">{market.marketName}</p>
                        {open ? <ArrowDropUpIcon fontSize='small' className='' /> : <ArrowDropDownIcon fontSize='small' />}
                    </div>
                </Group>


                <Collapse in={open} className="col-span-12 text-white px-1 rounded">
                    <div className="grid grid-cols-12 w-full mb-1 items-center">
                        <div className="col-span-6 md:col-span-6 lg:col-span-7 "></div>

                        <div className="col-span-6 md:col-span-6 lg:col-span-5">
                            <div className="grid max-mk:grid-cols-6 mk:grid-cols-7 gap-x-1">
                                <div className="col-span-1 max-mk:hidden"></div>
                                <div className='col-span-3 pr-4 flex justify-end  border-gray-500 shadow shadow-[#7EBCEE]/[1]'>
                                    <p className='text-[0.9rem] font-bold tracking-wide text-[#7EBCEE]/[0.9]'>Back</p>
                                </div>
                                <div className='col-span-3 pl-4 flex justify-  border-gray-500 shadow shadow-[#F4AFD9]/[1]'>
                                    <p className='text-[0.9rem] font-bold tracking-wide text-[#F4AFD9]/[0.9]'>Lay</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        market.runners && market.runners.map((runner, ii) => (
                            <div key={ii} className="bg_1 col-span-12 grid grid-cols-12 items-center py-1 w-full border-b border-gray-700 hover:bg-orange-500/[0.1]" >
                                <div className={`col-span-6 md:col-span-6 lg:col-span-7 flex items-center gap-x-2`}>
                                    <InfoTwoToneIcon
                                        fontSize='smaller'
                                        className='text-orange-500 cursor-pointer'
                                        onClick={() => alert("Terms and Conditions Apply")}
                                    />
                                    <div className="grid grid-cols-6">
                                        <div className="col-span-4">
                                            <p className={`${styling2.oddsText1} truncate`}>
                                                {`${runner.runnerName} ${runner.handicap !== 0 ? runner.handicap : ""}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-6  md:col-span-6 lg:col-span-5">
                                    <MarketOddsComponent
                                        mktBk={mktBk}
                                        styling2={styling2}
                                        ii={ii}
                                        formatNumber={formatNumber}
                                        runner={runner}
                                        market={market}

                                    />
                                </div>


                            </div>
                        ))
                    }
                </Collapse>
            </Box>
        </div >
    );
};
export default MarketComponent






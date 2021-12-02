import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useCoin } from '../../context/CoinContext';
import CoinService from '../../services/coinServices'
import { BsTwitter, BsReddit } from "react-icons/bs";

import { Spinner } from "@chakra-ui/react"

import { XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer, ReferenceLine } from 'recharts';


function Detail() {



    const { id } = useParams();

    const { currency, currencySymbol } = useCoin();
    const [loading, setLoading] = useState(true)
    const [mainCoinData, setmainCoinData] = useState([])

    console.log(id);

    let coin_name = mainCoinData?.name
    let coin_name_short = mainCoinData?.symbol?.toUpperCase()
    let twitter_followers = mainCoinData?.community_data?.twitter_followers
    let reddit_subscribers = mainCoinData?.community_data?.reddit_subscribers
    let hashing_algorithm = mainCoinData?.hashing_algorithm
    let categories = mainCoinData?.categories
    let currency_price = mainCoinData?.market_data?.current_price[`${currency}`]
    let market_cap = mainCoinData?.market_data?.market_cap[`${currency}`]
    let market_cap_change_per_24h = mainCoinData?.market_data?.market_cap_change_percentage_24h
    let low_24h = mainCoinData?.market_data?.low_24h[`${currency}`]
    let high_24h = mainCoinData?.market_data?.high_24h[`${currency}`]
    let total_volume = mainCoinData?.market_data?.total_volume[`${currency}`]
    let market_cap_rank = mainCoinData?.market_cap_rank



    const [sparklineMainData, setSparklineMainData] = useState([])
    let sparklineData = []
    sparklineMainData.map(item => sparklineData.push({ value: item.toFixed(2) }))
    sparklineData.reverse() //main data's first item is last data. 



    useEffect(() => {
        setLoading(true)
        const coinService = new CoinService();
        coinService.getCoinDetail(id).then(result => {
            //console.log(result.data.market_data.sparkline_7d.price)

            setmainCoinData(result.data)
            setSparklineMainData(result.data.market_data.sparkline_7d.price)
            setLoading(false)
        })
    }, [id])

    //console.log(mainCoinData?.market_data?.current_price[`${currency}`]);
    return (
        <div className="detail ">

            {
                loading ? <div className="flex justify-center mt-5"><Spinner /></div> : (
                    <div className="grid grid-rows-1">
                        <div className="sm:mt-10 grid grid-rows-1">
                            <div className="container mx-auto mt-2 sm:border sm:rounded sm:shadow-md grid grid-rows-1 sm:grid-cols-2">
                                <div className=" p-5 sm:py-10 sm:px-20">
                                    <div className="coinNames mb-2">
                                        <img className="inline-block mr-2" src={mainCoinData?.image?.small} alt="" />
                                        <span className="mr-2 font-bold">{coin_name}</span>
                                        <span>({coin_name_short})</span>
                                    </div>
                                    <div className="coinMarket mb-2">
                                        <span className="bg-gray-200 rounded px-3 text-sm font-bold"> Market Cap #{market_cap_rank}</span>
                                    </div>
                                    <div className="socialmedia mb-1">
                                        <span className="text-xs px-2 mr-2 bg-gray-200 rounded inline-flex items-center text-blue-400"> <BsTwitter className="mr-1 text-twitter" /> {twitter_followers.toLocaleString()}</span>
                                        <span className="text-xs px-2 bg-gray-200 rounded inline-flex items-center text-red-400"> <BsReddit className="mr-1 text-reddit" /> {reddit_subscribers.toLocaleString()}</span>
                                    </div>
                                    <div className="hashAlgorithm">
                                        {

                                            hashing_algorithm === null ? false : (
                                                <>
                                                    <span className="text-xs">Algorithm: </span>
                                                    <span className="bg-gray-200 px-2 mr-1 rounded text-xs">{hashing_algorithm}</span>
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className="tags">
                                        <div className="text-xs">Categories:
                                            {

                                                categories.map((item, i) => (
                                                    <span key={i} className="bg-gray-200 inline-block px-2 mx-1 rounded text-xs mb-1 text-center"> {item}</span>
                                                )
                                                )
                                            }</div>

                                    </div>
                                </div>
                                <div className=" p-4 sm:p-10">
                                    <div className="">
                                        <span className="text-sm font-bold">{mainCoinData?.name} Price: </span>
                                        <div className="mt-2">
                                            <span className="mr-5 text-lg font-bold">{currencySymbol} {currency_price.toLocaleString()}</span>
                                            <span className={`font-bold p-1 rounded ${market_cap_change_per_24h < 0 ? 'bg-red-500 text-white' : 'text-green-500'}`}>{market_cap_change_per_24h.toFixed(2)}</span>
                                        </div>
                                        <div className="mt-1">
                                            <span className="text-xs  mr-1">Low (in 24h): <span className="font-bold">{currencySymbol} {low_24h.toLocaleString()}</span> </span>
                                            <span className="text-xs ">High (in 24h): <span className="font-bold">{currencySymbol} {high_24h.toLocaleString()}</span> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="stats h-36 px-3 py-3 sm:px-20 grid grid-rows-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x ">
                                <div className="marketCap flex justify-between sm:px-3 py-2 my-auto">
                                    <div className="font-bold">Market Cap</div>
                                    <div>{currencySymbol} {market_cap.toLocaleString()}</div>
                                </div>
                                <div className="totalVolume flex justify-between sm:px-3 py-2 my-auto">
                                    <div className="font-bold">Total Volume</div>
                                    <div>{currencySymbol} {total_volume.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                        <div className="sparkline container mx-auto mt-2">

                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={sparklineData}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <ReferenceLine y={sparklineData[sparklineData.length - 1]?.value} label="" stroke="red" strokeDasharray="3 3" />
                                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default Detail

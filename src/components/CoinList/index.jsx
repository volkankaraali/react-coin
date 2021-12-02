
import React from 'react'
import { useCoin } from '../../context/CoinContext'
import { Link } from 'react-router-dom';

import { FaSort } from "react-icons/fa";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import FavoriteButton from '../FavoriteButton.jsx';
import Search from '../Search';
function CoinList() {

    const { coinData, setPage, page, setPerPage, perPage, currencySymbol, searchInput } = useCoin();



    //let sparklineData=data.sparkline_in_7d.price

    const previusHandleChange = () => {
        page !== 1 ? setPage(page - 1) : setPage(1)
    }
    const nextHandleChange = () => {
        setPage(page + 1)
    }

    const changePerPage = (perPage) => {
        setPerPage(perPage)
        setPage(1)
    }

    return (
        <div className="container mx-auto mt-5">


            {
                searchInput !== "" ? <Search />
                    : (
                        <>
                            <div className="flex justify-end mb-1">
                                <div className="flex">
                                    <div><FaSort className="h-6 mr-1 text-pBlue" /></div>
                                    <button onClick={() => changePerPage(10)} className={`px-1 mr-1 bg-pBlue text-sm text-pGray rounded ${perPage !== 10 ? "opacity-50" : "opacity-100 pointer-events-none"}  `}>10</button>
                                    <button onClick={() => changePerPage(30)} className={`px-1 mr-1 bg-pBlue text-sm text-pGray rounded ${perPage !== 30 ? "opacity-50" : "opacity-100 pointer-events-none"}  `}>30</button>
                                    <button onClick={() => changePerPage(50)} className={`px-1 mr-1 bg-pBlue text-sm text-pGray rounded ${perPage !== 50 ? "opacity-50" : "opacity-100 pointer-events-none"}  `}>50</button>

                                </div>
                            </div>
                            <table className="w-full">
                                <thead className=" h-10 text-left bg-pBlue text-white">
                                    <tr>
                                        <th className="w-6"></th>
                                        <th className="">Name</th>
                                        <th>Price</th>
                                        <th>24h %</th>
                                        <th className={`hidden sm:table-cell `}>Last 7 Days</th>
                                    </tr>
                                </thead>
                                <tbody className="max-h-28">
                                    {
                                        coinData.map((coin, i) => {
                                            let sparklineData = coin?.sparkline_in_7d.price
                                            return (
                                                <tr key={i} className="hover:bg-gray-100 h-20">
                                                    <td className="px-1 text-center"><span className="font-bold">{coin.market_cap_rank}</span></td>
                                                    <td className=""> <div className="flex "><img className="inline mr-1 h-6 sm:h-8" src={coin.image} alt="" /><Link to={`/detail/${coin.id}`} className="hover:underline my-auto"><span className="font-bold">{coin.name} </span></Link><FavoriteButton coin={coin} /></div></td>
                                                    <td className="px-1 "><span className="font-bold">{currencySymbol}{coin.current_price.toLocaleString()}</span></td>
                                                    <td className="px-1"><span className={`font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>{coin.price_change_percentage_24h}</span></td>
                                                    <td className="hidden sm:table-cell">
                                                        <Sparklines className="h-10" data={sparklineData.slice(0, sparklineData.lenght).reverse()} limit={sparklineData.lenght}>
                                                            <SparklinesLine className="h-10" style={{ stroke: "black", fill: "none" }} />
                                                        </Sparklines>
                                                    </td>
                                                </tr>
                                            )
                                        })

                                    }

                                </tbody>
                            </table >
                        </>
                    )
            }


            <div className="flex justify-center mt-2 mb-2">
                <button className={`py-1 px-2 mr-1 rounded bg-pBlue text-pGray ${page === 1 ? 'hidden' : 'visible'} `} onClick={() => setPage(1)}>First Page</button>
                <button disabled={page === 1 ? true : false} className={`py-1 px-2 rounded bg-pBlue text-pGray ${page === 1 ? 'opacity-50 pointer-events-none' : 'text-black'} `} onClick={() => previusHandleChange()}>Previus</button>
                <span className="mx-4">{page}</span>
                <button className={`py-1 px-2  rounded bg-pBlue text-pGray `} onClick={() => nextHandleChange()}>Next</button>
            </div>



        </div >
    )
}

export default CoinList

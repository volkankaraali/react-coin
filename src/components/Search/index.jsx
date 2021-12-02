import React from 'react'
import { Link } from 'react-router-dom'
import { useCoin } from '../../context/CoinContext'
import FavoriteButton from '../FavoriteButton.jsx'
import { Alert, Text } from '@mantine/core';
function Search() {
    const { filteredCoin, currencySymbol, searchInput } = useCoin()


    return (
        <div>

            <table className="w-full">
                <thead className=" h-10 text-left bg-pBlue text-white">
                    <tr>
                        <th className="w-6"></th>
                        <th className="">Name</th>
                        <th>Price</th>
                        <th>24h %</th>
                    </tr>
                </thead>

                <tbody className="max-h-28">

                    {
                        filteredCoin.map((coin, i) => {

                            return (
                                <tr key={i} className="hover:bg-gray-100 h-20">
                                    <td className="px-1 text-center"><span className="font-bold">{coin.market_cap_rank}</span></td>
                                    <td className=""> <div className="flex "><img className="inline mr-1 h-6 sm:h-8" src={coin.image} alt="" /><Link to={`/detail/${coin.id}`} className="hover:underline my-auto"><span className="font-bold">{coin.name} </span></Link><FavoriteButton coin={coin} /></div></td>
                                    <td className="px-1 "><span className="font-bold">{currencySymbol}{coin.current_price.toLocaleString()}</span></td>
                                    <td className="px-1"><span className={`font-bold ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>{coin.price_change_percentage_24h}</span></td>
                                    <td className="hidden sm:table-cell">

                                    </td>
                                </tr>
                            )
                        })

                    }

                </tbody>

            </table >
            {
                filteredCoin.length === 0 && <Alert className="mt-1 font-bold" color="red">
                    There is not found a coin that name <Text className="inline-block" color="red" size="sm">
                        {searchInput}.
                    </Text>
                </Alert>
            }

        </div>
    )
}

export default Search

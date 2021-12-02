import { Alert } from '@mantine/core';
import React from 'react'
import { Link } from 'react-router-dom';
import { useCoin } from '../../context/CoinContext'
import FavoriteButton from '../FavoriteButton.jsx';

function FavoriteCoins() {

    const { favoriteCoins, currencySymbol } = useCoin();
    console.log(favoriteCoins[0]);
    return (
        <div className="favoriteCoins bg-gray-100 py-10">
            <div className="container mx-auto">
                <div className="font-bold mb-1">Favorite Coins {favoriteCoins.length > 0 && `(${favoriteCoins.length})`}</div>
                {
                    favoriteCoins.length === 0 && <Alert className="mt-1 font-bold" color="red">
                        There is not favorite coins.

                    </Alert>
                }

                <div className="grid grid-rows-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        favoriteCoins.map((coin, i) => (
                            <div key={i} className="favoriteCoin flex bg-white justify-between px-2 mb-2 sm:mr-1 font-bold border rounded shadow-md">
                                <img className="h-5 self-center" src={coin.image} alt="" />
                                <div className="self-center "><Link to={`/detail/${coin.id}`} className="hover:underline">{coin.name}</Link></div>
                                <div className="self-center">{currencySymbol}{coin.current_price.toLocaleString()}</div>
                                <div className={`self-center ${favoriteCoins[0]?.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>{coin.price_change_percentage_24h.toFixed(2)}</div>
                                <div className="self-center"><FavoriteButton coin={coin} /></div>
                            </div>
                        ))
                    }


                </div>
            </div>



        </div>
    )
}

export default FavoriteCoins

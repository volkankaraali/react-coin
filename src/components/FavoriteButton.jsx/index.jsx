import React, { useState, useEffect } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { useCoin } from '../../context/CoinContext'

function FavoriteButton({ coin }) {

    const { favoriteCoins, setFavoriteCoins } = useCoin();
    const [favStatus, setFavStatus] = useState()




    // useEffect(() => {
    //     if (!favCoinsOnStorage.find(e => { if (e.id === coin.id) { return true } else { return false } })) {
    //         console.log(coin.id + "eklendi");
    //         coin.favStatus = favStatus
    //         favCoinsOnStorage.push(coin)
    //         localStorage.setItem('favoriteCoins', JSON.stringify(favCoinsOnStorage))
    //         setFavoriteCoins(favCoinsOnStorage)
    //     } else {
    //         coin.favStatus = favStatus
    //         console.log(coin.id + "silindi");
    //         let deleteCoin = favoriteCoins.filter(item => {
    //             if (item.id === coin.id) {
    //                 return false
    //             } else return item
    //         })
    //         localStorage.setItem('favoriteCoins', JSON.stringify(deleteCoin))
    //         setFavoriteCoins(deleteCoin)
    //     }
    // }, [favStatus])



    const addFav = (coin) => {
        let favCoinsOnStorage = JSON.parse(localStorage.getItem("favoriteCoins"))
        favCoinsOnStorage.push(coin)
        localStorage.setItem('favoriteCoins', JSON.stringify(favCoinsOnStorage))
        setFavoriteCoins(JSON.parse(localStorage.getItem("favoriteCoins")))

    }
    const delFav = (coin) => {
        let delFav = favoriteCoins.filter(e => e.id === coin.id ? false : e)
        localStorage.setItem('favoriteCoins', JSON.stringify(delFav))
        setFavoriteCoins(delFav)
    }

    return (
        <div className="flex justify-center">
            {
                favoriteCoins.find(e => e.id === coin.id ? true : false)
                    ? <FaStar onClick={() => delFav(coin)} className="fav ml-2 my-auto cursor-pointer"></FaStar>
                    : <FaRegStar onClick={() => addFav(coin)} className="unFav ml-2 my-auto cursor-pointer " />
            }

        </div>
    )
}

export default FavoriteButton

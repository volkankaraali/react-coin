import React from 'react'
import CoinList from '../../components/CoinList'
import FavoriteCoins from '../../components/FavoriteCoins'
import SearchBar from '../../components/SearcBar'

function Home() {
    return (
        <>
            <FavoriteCoins />
            <SearchBar />
            <CoinList></CoinList>
        </>
    )
}

export default Home

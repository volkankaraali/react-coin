import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCoin } from '../../context/CoinContext';

function SearchBar() {


    const { first250Coin, setFilteredCoin, searchInput, setSearchInput, } = useCoin();
    const [input, setInput] = useState("")



    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }
    useEffect(() => {
        let filtered = first250Coin.filter(coin => coin.name.toLowerCase().includes(searchInput.toLowerCase()))
        setFilteredCoin(filtered)
    }, [searchInput])


    return (
        <div className="search">
            <div className=" flex justify-center mt-3">
                <input onChange={handleChange} value={searchInput} className="border rounded mr-1 w-56 px-2" placeholder="Find Coin" />
            </div>
        </div>
    )
}

export default SearchBar

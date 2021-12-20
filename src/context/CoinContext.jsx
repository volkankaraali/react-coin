import { createContext, useContext, useEffect, useState } from "react";
import CoinService from "../services/coinServices";
import currencies from "../currencySymbols.json"
const CoinContext = createContext();

export const CoinProvider = ({ children }) => {

    const [currency, setCurrency] = useState('usd')
    const [coinData, setCoinData] = useState([])

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const [allCoin, setAllCoin] = useState([])
    const [currencySymbol, setCurrencySymbol] = useState()

    const [favoriteCoins, setFavoriteCoins] = useState([])

    const [first250Coin, setFirst250Coin] = useState([])
    const [filteredCoin, setFilteredCoin] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        let favCoinsOnStorage = JSON.parse(localStorage.getItem("favoriteCoins"))
        if (favCoinsOnStorage === null) {
            favCoinsOnStorage = []
            localStorage.setItem("favoriteCoins", JSON.stringify(favCoinsOnStorage))
            setFavoriteCoins(JSON.parse(localStorage.getItem("favoriteCoins")))
        } else {
            setFavoriteCoins(JSON.parse(localStorage.getItem("favoriteCoins")))
        }

    }, [])

    useEffect(() => {
        let coinService = new CoinService()

        coinService.getCoinListWithData(currency, perPage, page).then(result => {
            setCoinData(result.data)
        })


        let currencySymbol = Object.entries(currencies).find(([key, value]) => {
            if (key === currency) {
                return value
            } else return false
        })
        setCurrencySymbol(currencySymbol[1].symbol)

        coinService.get250Coin(currency)
            .then(result => setFirst250Coin(result.data))

    }, [currency, page, perPage])


    const values = {
        setCurrency,
        currency,
        coinData,
        setPage,
        page,
        perPage,
        setPerPage,
        allCoin,
        currencies,
        currencySymbol,
        favoriteCoins,
        setFavoriteCoins,
        filteredCoin,
        setFilteredCoin,
        first250Coin,
        setFirst250Coin,
        searchInput,
        setSearchInput,

    }
    return <CoinContext.Provider value={values} >{children}</CoinContext.Provider>
}

export const useCoin = () => useContext(CoinContext);
import axios from "axios"

export default class CoinService {

    getCoinName() {
        let apiurl = "https://api.coingecko.com/api/v3/coins/list"
        return axios.get(apiurl)
    }

    getCoinListWithData(currency, perPage, page) {
        let apiurl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true`
        return axios.get(apiurl)
    }

    getCoinDetail(id) {
        let apiurl = `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`
        return axios.get(apiurl)
    }

    get250Coin(currency) {
        let apiurl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&sparkline=false`
        return axios.get(apiurl)
    }

    getEvents() {
        let apiurl = "https://api.coingecko.com/api/v3/events"
        return axios.get(apiurl)
    }
}

import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Coin from './components/coinitem/coin';
function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
    .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h').then((res) => {
      setCoins(res.data);
      console.log(res.data);
    })
    .catch((error) => console.error(error));
  }, [])
  const  handleChange= (e) => {
    setSearch(e.target.value);
  }
  const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <div className="header">
        <h1 className="brand"><i className="fas fa-moon" />CoinTrack</h1>
        <form action="">
          <input className="inputField" type="text" placeholder='Search a Coin' onChange={handleChange} />
        </form>
      </div>
      <div className="coinsContainer">
        {filteredCoins.map((coin => {
          return(
            <Coin key={coins.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketCap={coin.market_cap} 
              volume={coin.total_volume}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h} 
          />  
          )
        }))}
      </div>
      
    </div>
  );
}

export default App;

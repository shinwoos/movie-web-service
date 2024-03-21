import { useState, useEffect } from "react";

function TodoList() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [inputResult, setInputResult] = useState(0);
  const [usd, setUsd] = useState(0);
  useEffect(() => {
    console.log("start coin api get");
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((res) => {
        setCoins(res);
        console.log(res);
        setLoading(false);
      });
  }, []);

  let coinPrice = document.querySelector("#selectCoin");
  const onChange = (e) => {
    setUsd(e.target.value);
    console.log(coinPrice.value);
    setInputResult(e.target.value / coinPrice.value);
  };

  const selectChange = (e) => {
    setInputResult(usd / e.target.value);
  };
  return (
    <div>
      <h1>the COins {coins.length}</h1>
      {loading ? <strong>Loading</strong> : null}
      <input type="number" onChange={onChange} placeholder="USD" />
      USD
      <br />
      <select id="selectCoin" onChange={selectChange}>
        {coins.map((item) => {
          return (
            <option key={item.id} value={item.quotes.USD.price}>
              {item.name} ({item.symbol}): {item.quotes.USD.price} USD
            </option>
          );
        })}
      </select>
      <h1>{inputResult}</h1>
    </div>
  );
}

export default TodoList;

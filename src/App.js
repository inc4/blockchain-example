import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Counter from './Counter.json';
import './App.css';

function App(props) {
  // ethereum - object of Metamask
  const { ethereum } = window;

  // provider - ethers.js object to work with blockchain
  const provider = typeof ethereum !== "undefined" ?
    new ethers.providers.Web3Provider(ethereum) : null;

  // signer, who signs transactions
  const signer = provider.getSigner();

  // contract object. It needs ABI (Application Binary Interface)
  const contract = new ethers.Contract(props.contract, Counter.abi, signer);

  const [address, setAddress] = useState();
  const [score, setScore] = useState();
  const [scoreInput, setScoreInput] = useState();

  function handleChange(event) {
    setScoreInput(event.target.value);
  }

  async function setScoreBlockchain() {
    // we call setScore() function from Smart Contract
    await contract.setScore(scoreInput);
  }

  useEffect(async () => {
    const res = await ethereum.request({ method: "eth_requestAccounts" });
    setAddress(res[0]);

    // get score from Smart Contract
    const scoreRes = await contract.getScore();
    setScore(scoreRes.toNumber());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Your address: {address}
        </p>
        <p>
          Your score: {score}
        </p>
	<p>
	  <input name="score" value={scoreInput} onChange={handleChange} />
	  <button onClick={setScoreBlockchain}>Set Score</button>
	</p>
      </header>
    </div>
  );
}

export default App;

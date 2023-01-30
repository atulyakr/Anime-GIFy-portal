import React, { useState,useEffect } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';


const TEST_GIFS = [
	'https://media.giphy.com/media/OACHuKGkZ5F3FUbNsY/giphy.gif',
  
	'https://ineedanime.com/wp-content/uploads/2021/09/saitama-one-punch-sup.gif',
  
	'https://i.pinimg.com/originals/a9/ba/34/a9ba34e010fb17fc3fcc7795cf28299b.gif',
  
	'https://i.redd.it/ovj839o79l561.gif',
  
  'https://giffiles.alphacoders.com/132/13240.gif',
  
  'https://storiesmedia.sportskeeda.com/wp-content/uploads/2023/01/11114641/tumblr_3e9cd68c86e884d7c738134b40fa647f_05315032_640.gif',
  
  'https://usagif.com/wp-content/uploads/2022/hqgif/blue-lock-6.gif',

  'https://i.makeagif.com/media/3-30-2022/k8qHxl.gif',
]
// Constants
const TWITTER_HANDLE = 'Atulya70603425';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // Actions
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

  
  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log('Phantom wallet found!');
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log(
        'Connected with Public Key:',
        response.publicKey.toString()
      );

      setWalletAddress(response.publicKey.toString());
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  };

  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
    const response = await solana.connect();
    console.log('Connected with Public Key:', response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
    }
  };
  
  const sendGif = async () => {
  if (inputValue.length > 0) {
    console.log('Gif link:', inputValue);
    setGifList([...gifList, inputValue]);
    setInputValue('');
  } else {
    console.log('Empty input. Try again.');
  }
};
  
  const onInputChange = (event) =>{
  const { value } = event.target;
  setInputValue(value);
  };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

const renderConnectedContainer = () => (
  <div className="connected-container">
    {/* Go ahead and add this input and button to start */}
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendGif();
      }}
    >
      <input type="text" placeholder="Enter gif link!" value={inputValue} onChange={onInputChange}
    />
      <button type="submit" className="cta-button submit-gif-button">Submit</button>
    </form>
    <div className="gif-grid">
      {gifList.map((gif) => (
        <div className="gif-item" key={gif}>
          <img src={gif} alt={gif} />
        </div>
      ))}
    </div>
  </div>
);

  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);


  useEffect(() => {
  if (walletAddress) {
    console.log('Fetching GIF list...');
    
    // Call Solana program here.

    // Set state
    setGifList(TEST_GIFS);
  }
}, [walletAddress]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
         
          <p className="header"> Anime GIF Portal</p>
          <p className="sub-text">
            View your Anime GIF collection in the metaverse ✨
          </p>
          {/* Render your connect to wallet button right here */}
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
import logo from './logo.svg';
import './App.css';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import Connect from './Connect.js';
import { useWeb3Modal } from '@web3modal/ethers/react'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider } from 'ethers'
import { useWeb3ModalProvider } from '@web3modal/ethers/react'
// 1. Get projectId
const projectId = 'd766efba775d9b20de72903895f90ac1'

// 2. Set chains
const bscnet = {
  chainId: 56,
  name: 'Binance Smart Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc-dataseed.binance.org/'
}
const mainnet = {
  chainId: 1,
  name: 'Ethereum Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/Os2nU25OrsrV1sAKwoSUISe0R6KyHjqm'
};
const amoynet = {
  chainId: 80002,
  name: 'Amoy',
  currency: 'MATIC',
  explorerUrl: '',
  rpcUrl: 'https://rpc-amoy.polygon.technology/'
}


// 3. Create a metadata object
const metadata = {
  name: 'Irondoge',
  description: 'Irondoge',
  //url: 'https://mywebsite.com', // origin must match your domain & subdomain
  url: 'http://localhost:3000/', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl:'', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, bscnet,amoynet],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})
export default function App() {
  const { open } = useWeb3Modal()
  const { address, chainId, isConnected } = useWeb3ModalAccount()

  function details() {
    
    console.log('Address:', address);
    console.log('chainId:', chainId);
    console.log('isConnected:', isConnected);
  }
  const { walletProvider } = useWeb3ModalProvider()

  async function getBalance() {
    const provider = new BrowserProvider(walletProvider)

    let bal = await provider.getBalance(address);
    console.log("Current bal:", bal);
    //const fBalance = await ethers.formatEther(bal)
    //  console.log("Current fBalance:", fBalance);
   //   const Balance = await ethers.parseEther(fBalance)
     // console.log("Current Balance:", Balance)
  }
  async function onSignMessage() {
    console.log(walletProvider);
    const provider = new BrowserProvider(walletProvider)
    const signer = await provider.getSigner()
    const signature = await signer?.signMessage('Hello Web3Modal Ethers')
    console.log(signature)
  }

  
  return (
    <>
      <button onClick={() => details()}>Details</button>
      <button onClick={() => getBalance()}>getBalance</button>
      <button onClick={() => onSignMessage()}>Sign Message</button>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
    </>
  )
}
//function App() {
 // return (
 //   <div className="App">
 //     <header className="App-header">
 //       <img src={logo} className="App-logo" alt="logo" />
 //       <p>
 //         Edit <code>src/App.js</code> and save to reload.
 //       </p>
 //       <a
 //         className="App-link"
 //         href="https://reactjs.org"
 //         target="_blank"
 //         rel="noopener noreferrer"
 //       >
 //         Learn React
 //       </a>
 //     </header>
 //   </div>
 // );
//}

//export default App;
//
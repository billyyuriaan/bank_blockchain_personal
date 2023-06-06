import { useRef, useState } from 'react'
import { Bankcontract } from './utils/contract'
import './App.css'
import Web3 from 'web3'

function App() {
  const [account, setAccount] = useState("")
  const [ballance, setBallance] = useState(0)
  const [connected, setConnected] = useState(false)
  const transferUang = useRef()
  const noVirtual = useRef()
  const contract = Bankcontract()

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        const balances = await web3.eth.getBalance(accounts[0]);
        setAccount(accounts[0])
        setBallance(balances)
        setConnected(true)
      } catch (e) {
        console.log(e);
      }
    }else{
      alert("No Metamask")
    }
  }


  const handleTransfer = async (e) => {
    e.preventDefault()

    try {
      const gas = await contract.methods.transfer(account, transferUang.current.value).estimateGas();
      await contract.methods.transfer(account, transferUang.current.value).send({from : account, gas : gas})


    } catch (error) {
      console.log(error);
    }
  }

  const handleVAAccount = async (e) => {
    e.preventDefault()

    try {
      const gas = await contract.methods.createVirtualAccount().estimateGas()
      const res = await contract.methods.createVirtualAccount().call()

      console.log(res);

    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="App">
      <h1>Bank Berbasis Blockchain</h1>
      {
          connected ? (
            <>
              <p>Account : {account}</p>
              <p>Ballance : {ballance}</p>
            </>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )
        }
      <br /><br />
      <section>
        <h3>Transfer Uang</h3>
        <form>
          <input type="number" name="nominalTransfer" id="nominalTransfer" ref={transferUang} placeholder='masukan nominal' /><br /><br />
          <button onClick={handleTransfer}>
            Tranfer
          </button>
        </form>
      </section>
      <section><br /><br />
        <h3>Transfer Virtual Account</h3>
        <form>
          <button onClick={handleVAAccount}>
            Create Virtual Acount
          </button>
        </form>
      </section>
    </div>
  )
}

export default App

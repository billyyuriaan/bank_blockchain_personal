import Web3 from 'web3'
import { Bank } from './abi.js'

const ADDRESS = "0xB66D13e74256b208D737dFD192a7Cfb9a028bbAa"

const Bankcontract = () => {
    const web3 = new Web3(window.ethereum)
    const address = "0xB66D13e74256b208D737dFD192a7Cfb9a028bbAa"
    const contract = new web3.eth.Contract(Bank, address)

    return contract
}

export {Bankcontract};
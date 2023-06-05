import Web3 from 'web3'
import { Bank } from './abi.js'

const Bankcontract = () => {
    const web3 = new Web3(window.ethereum)
    const address = "0x2F90B6F6952806F8D717cA6CDfb600655Db5d134"
    const contract = new web3.eth.Contract(Bank, address)

    return contract
}

export {Bankcontract};
import Eth from 'ethjs'
import { network, websocketNetwork } from '../models/network'

export const getProviderUrl = () => {
  if (network === 'testrpc') {
    return 'http://localhost:8545'
  } else {
    return `https://${websocketNetwork}.infura.io:443`
  }
}

let prompted = false

export const getProvider = () => {
  if (window.ethereum) {
    window.web3 = new window.Web3(window.ethereum)
    try {
      // Request account access if needed
      if (prompted) {
        return true
      } else {
      		window.ethereum.enable()
        prompted = true
      }
    } catch (error) {
      console.log('User denied account access...')
    }
  }

  if (typeof window.web3 !== 'undefined' && typeof window.web3.currentProvider !== 'undefined') {
    return window.web3.currentProvider
  } else {
    return new Eth.HttpProvider(getProviderUrl())
  }
}

export const getWebsocketProvider = () => {
  // https://github.com/ethereum/web3.js/issues/1119
  if (!window.Web3.providers.WebsocketProvider.prototype.sendAsync) {
    window.Web3.providers.WebsocketProvider.prototype.sendAsync = window.Web3.providers.WebsocketProvider.prototype.send
  }

  return new window.Web3.providers.WebsocketProvider(`wss://${websocketNetwork}.infura.io/_ws`)
}

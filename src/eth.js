// Functions for interacting with an Ethereum RPC host
const config = require('../config.json');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(config.PUBLIC_HOST));

// Send a transaction. Don't wait for the receipt; just return the hash.
const sendSigned = (tx) => {
  return new Promise((resolve, reject) => {
    web3.eth.sendSignedTransaction(tx)
    .on('transactionHash', function(hash) { resolve(hash); })
    .on('error', function(err) { reject(err); })
  })
}

const getNonce = (addr) => {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionCount(addr)
    .then((nonce) => { resolve(nonce); })
    .catch((err) => { reject(err); })
  })
}

module.exports = {
  sendSigned,
  getNonce,
}

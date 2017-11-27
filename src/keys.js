// Functions for interacting with keys given a mnemonic (in the config)
const config = require('../config.json');
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');
const Tx = require('ethereumjs-tx');

// Store access to keys globally
const HDPATH = 'm/44\'/60\'/0\'/0/';
const HDPATH_INDEX = '0';
const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(config.MNEMONIC));
const node = hdwallet.derivePath(HDPATH + HDPATH_INDEX);

const getPrivateKey = () => {
  return node.getWallet().getPrivateKeyString();
}

const getAddress = () => {
  return node.getWallet().getAddressString();
}

const signTransaction = (txObj) => {
  const tx = new Tx(txObj);
  const pkey = Buffer.from(getPrivateKey().slice(2), 'hex');
  tx.sign(pkey);
  const serialized = tx.serialize();
  return serialized.toString('hex');
}

module.exports = {
  getPrivateKey,
  getAddress,
  signTransaction,
};

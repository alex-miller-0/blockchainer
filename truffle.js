module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
    // kovan: {
    //   provider: new HDWalletProvider(mnemonic, 'http://localhost:8545'),
    //   network_id: '*',
    //   gas: 4500000,
    //   gasPrice: 4000000000,
    // },
  }
};

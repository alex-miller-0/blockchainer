// Checkpoint state of a directory to a main chain. This requires the following
// parameters (saved in config.json):
//   1. PRIVATE_HOST - the URL to access the blockchain we will be checkpointing
//   2. PUBLIC_HOST - the URL to access the blockchain where the checkpoint is being saved
//   3. CONTRACT - the address for the contract (the method name should be standardized)
//   4. STATE_DIR - the local directory that has the state (to be checkpointed)
//
// This will do the following:
//   1. Get the block number from the local chain
//   2. Hash the state directory
//   3. Get the block number from the local chain again. If this is different,
//      we will include both (thus the state could correspond to any of the
//      blocks in the range).
//   4. Save the state hash and the block range to the public chain via the contract.
const config = require('../config.json');
const Web3 = require('web3');
const web3Private = new Web3(new Web3.providers.HttpProvider(config.PRIVATE_HOST));
const web3Public = new Web3(new Web3.providers.HttpProvider(config.PUBLIC_HOST));
const fs = require('fs');
const rlp = require('rlp');

const run = (interval) => {
  let blockNumber;
  let stateHash;

  setInterval(function() {
    getParityManifest()
    .then((data) => {
      blockNumber = data[0];
      stateHash = data[1];
      console.log('blockNumber', blockNumber);
      console.log('stateHash', stateHash);
    })
    .catch(function(err) { console.log('Error:', err); })
  }, interval*1000);
}


// If the user is running a parity node for the private chain, we can take the
// state hash and corresponding block number stored in the snapshot that is
// automatically taken every 30,000 blocks.
// See here: https://github.com/paritytech/parity/wiki/Warp-Sync-Snapshot-Format
const getParityManifest = () => {
  return new Promise((resolve, reject) => {
    const snapshotDir = `${config.PARITY_DIR}/chains/${config.PRIVATE_CHAIN_NAME}/db/906a34e69aec8c0d/snapshot/current/MANIFEST`;
    console.log('snapshot', snapshotDir);
    const encoded = fs.readFileSync(snapshotDir);
    const decoded = rlp.decode(encoded);
    if (decoded[0].toString('hex') != '02') { reject('Unable to process MANIFEST.') }
    // // The bock number corresponding to the state root hash
    const blockNumber = parseInt(decoded[4].toString('hex'), 16);
    // // The state root hash
    const stateHash = decoded[3].toString('hex');
    resolve([blockNumber, stateHash]);
  })
}

module.exports = {
  run,
};

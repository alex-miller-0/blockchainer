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

const run = (interval) => {
  setInterval(function() {
    console.log('running on interval', interval, 'linking', config.PRIVATE_HOST, 'to', config.PUBLIC_HOST);
  }, interval*1000);
}

module.exports = {
  run,
};

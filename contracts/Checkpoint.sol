pragma solidity ^0.4.17;

contract Checkpoint {
  address public owner;
  event SaveCheckpoint(uint indexed blockNumber, bytes32 indexed stateHash, uint indexed chainId);

  function Checkpoint() public {
    owner = msg.sender;
  }

  function changeOwner(address newOwner) public {
    require(msg.sender == owner);
    owner = newOwner;
  }

  function saveCheckpoint(uint blockNumber, bytes32 stateHash, uint chainId) public {
    require(msg.sender == owner);
    SaveCheckpoint(blockNumber, stateHash, chainId);
  }
}

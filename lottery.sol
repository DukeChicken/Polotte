// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Lottery is Ownable{
    address payable[] public players;
    uint public lotteryId;
    uint public prize;
    uint public noOfGroup1;
    uint public noOfGroup2;
    address payable[] public Group1Players;
    address payable[] public Group2Players;   
    address payable[] public WinneruserAddresses;
    mapping (uint => address payable) public lotteryHistory;
    mapping (uint => uint ) public lotteryGroupHistory;
    enum LOTTERY_STATE {
        OPEN,
        CLOSED,
        CALCULATING_WINNER
    }
    LOTTERY_STATE public lottery_state;

    function setupLottery() public payable onlyOwner {
        require(msg.value >= 0);
        lotteryId = 1;
        lottery_state = LOTTERY_STATE.CLOSED;
        noOfGroup1=0;
        noOfGroup2=0;
    }

    function startLottery() public onlyOwner {
        require(lottery_state == LOTTERY_STATE.CLOSED);
                

        lottery_state = LOTTERY_STATE.OPEN;
    }
    function getState() public view returns (LOTTERY_STATE) {
        return lottery_state;
    }

    function getWinnerByLottery(uint lottery) public view returns (address payable) {
        return lotteryHistory[lottery];
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enterPool1() public payable {
        require(lottery_state == LOTTERY_STATE.OPEN);
        require(msg.value >= 1e16);

        // address of player entering lottery
        Group1Players.push(payable(msg.sender)); 
        players.push(payable(msg.sender));
        noOfGroup1=noOfGroup1+1;
    }

    function enterPool2() public payable {
        require(lottery_state == LOTTERY_STATE.OPEN);
        require(msg.value >= 1e16);

        // address of player entering lottery
        Group2Players.push(payable(msg.sender)); 
        players.push(payable(msg.sender));
        noOfGroup2=noOfGroup2+1;

    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));}
    

    function endLottery() public onlyOwner {
        // uint256(
        //     keccack256(
        //         abi.encodePacked(
        //             nonce, // nonce is preditable (aka, transaction number)
        //             msg.sender, // msg.sender is predictable
        //             block.difficulty, // can actually be manipulated by the miners!
        //             block.timestamp // timestamp is predictable
        //         )
        //     )
        // ) % players.length;
        lottery_state = LOTTERY_STATE.CALCULATING_WINNER;
    }

    function givePrize() public onlyOwner {
        pickWinnerGroup();
        pickAWinner();
        lottery_state = LOTTERY_STATE.CLOSED;
        // reset the state of the contract
    }


    function pickWinnerGroup() public onlyOwner {
        require(lottery_state == LOTTERY_STATE.CALCULATING_WINNER);
        uint index = getRandomNumber() % 2;
        lotteryGroupHistory[lotteryId] = index;
        if(index==0) {   // if else statement
         WinneruserAddresses = Group1Players;
      } 
        else {
         WinneruserAddresses = Group2Players;
      } 
        senWinGroupEth ();
        WinneruserAddresses= new address payable[](0);

        // reset the state of the contract
    }

    function senWinGroupEth () public onlyOwner{
        prize=address(this).balance/10*8/WinneruserAddresses.length;
        for (uint i=0; i<WinneruserAddresses.length; i++) {
                 WinneruserAddresses[i].transfer(prize);

      }
    }

    function pickAWinner() public onlyOwner {
        uint index = getRandomNumber() % players.length;
        players[index].transfer(address(this).balance*2);
        lotteryHistory[lotteryId] = players[index];
        lotteryId++;
        // reset the state of the contract
        players = new address payable[](0);
    }


}

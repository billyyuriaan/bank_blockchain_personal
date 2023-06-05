// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Bank {    
    mapping(address => uint256) private balances;
    mapping(address => bool) private isVirtualAccount;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event VirtualAccountCreated(address indexed account);
    event VirtualAccountRemoved(address indexed account);

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function createVirtualAccount() public {
        require(!isVirtualAccount[msg.sender], "Virtual account already exists");

        isVirtualAccount[msg.sender] = true;
        emit VirtualAccountCreated(msg.sender);
    }

    function removeVirtualAccount() public {
        require(isVirtualAccount[msg.sender], "No virtual account exists");

        isVirtualAccount[msg.sender] = false;
        emit VirtualAccountRemoved(msg.sender);
    }

    function transfer(address to, uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        if (isVirtualAccount[to]) {
            // Virtual account transfer
            balances[msg.sender] -= amount;
            emit Transfer(msg.sender, to, amount);
        } else {
            // Regular transfer
            balances[msg.sender] -= amount;
            balances[to] += amount;
            emit Transfer(msg.sender, to, amount);
        }
    } 
}

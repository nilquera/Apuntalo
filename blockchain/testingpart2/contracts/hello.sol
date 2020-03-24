pragma solidity >=0.4.21 <0.7.0;

import "./ConvertLib.sol";

contract HelloWorld {

  string private name;
  mapping (address => uint) balances; //balance de cada address
  mapping (address => bool) active_accounts; //Está activa la address? Si -> true, No ->false
  event Transfer(address indexed _from, address indexed _to, uint256 _value);

//Tendremos una cuenta master (la 0) con todo el ethereum.
  constructor() public {
    name = "default";
    balances[msg.sender] = 100000;
    active_accounts[msg.sender] = true;
  }

  function getName() public view returns (string memory) {
    return name;
  }

  function setName(string memory _name) public {
    name = _name;
  }


//Funciones para el manejo de cuentas:
  function isTaken(address account) public view returns (bool) {
    if(active_accounts[account] == true) return true;
    return false;
  }

  function activateAccount(address account) public returns (string memory) {
    if(active_accounts[account] == true) return "This account address already exists";
    active_accounts[account] = true;
    return "Account activated successfully";
  }

  function deactivateAccount(address account) public returns (string memory) {
    if(active_accounts[account] == false) return "This account address doesn't exists";
    active_accounts[account] = false;
    return "Account deactivated successfully";
  }


  //Funciones para Transacciones:
  function getBalance(address account) public view returns (uint){
    return balances[account];
  }
  function getBalanceInEth(address account) public view returns(uint){
		return ConvertLib.convert(getBalance(account),2);
	}

  function sendCoin(address sender, address reciever, uint amount) public returns (bool suficient) {
    if(balances[sender] < amount || active_accounts[sender] == false || active_accounts[reciever] == false) return false;
    balances[sender] -= amount;
    balances[reciever] += amount;
    emit Transfer(sender, reciever, amount);
    return true;
  }
}

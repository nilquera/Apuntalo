//Web3 bueno
var Web3 = require("web3");

class call_blockchain {
  constructor() {
    this.MyContract = require("./testingpart2/build/contracts/HelloWorld.json");
    this.web3 = new Web3("http://localhost:8545");
    //this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    this.contract;
    this.id;
    this.deployedNetwork;
  }
  async update() {
    try {
      this.contract = new this.web3.eth.Contract(
        this.MyContract.abi,
        this.deployedNetwork.address
      );
    } catch (error) {
      console.error(error);
    }
  }
  async init_web3() {
    try {
      this.id = await this.web3.eth.net.getId();
      this.deployedNetwork = this.MyContract.networks[this.id];
      this.contract = new this.web3.eth.Contract(
        this.MyContract.abi,
        this.deployedNetwork.address
      );
    } catch (error) {
      console.error(error);
    }
  }

  async get_addresses() {
    try {
      var data = await this.web3.eth.getAccounts();
      //console.log(data);
      //data = Array.from(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async address_used(account) {
    const data = await this.contract.methods.isTaken(account).call();
    console.log(data);
    return data;
  }

  

  async get_Balance(account) {
    try {
      var data = await this.contract.methods.getBalance(account).call();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async send_coin(sender, reciever, amount) {
    try {
      var data = await this.contract.methods
        .sendCoin(sender, reciever, amount)
        .send({ from: sender });
      console.log(data);
      this.update();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async activate_account(account, charged) {
    try {
      var data = await this.contract.methods
        .activateAccount(account)
        .send({ from: charged});
      console.log(data);
      this.update();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async signup_user() {
    try  {
      var free_account = '';
      var found = false;
      var accounts = await this.web3.eth.getAccounts();
      //var accounts = blockchain.get_addresses();
      //console.log(accounts[0]);
      var i = 0;
      var length = accounts.length;
      while((found == false) && (i < length)) {
          var used = await blockchain.address_used(accounts[i]);
          if(used == false) {
            free_account = accounts[i];
            await blockchain.activate_account(free_account, accounts[0]);
            found = true;
            return free_account;
          }
          ++i;
      }
      console.log("No queden mes usuaris Ethereum lliures");
      return null;
    } catch (error) {
      console.error(error);
    }
  }

  async ingresar(account, amount) {
    try {
      var completo = await this.contract.methods.ingreso(account, amount).send({from: account});
      return completo;
    } catch(error) {
      console.error(error);
    }
  }

}
//
// console.log("invocando objeto...");
blockchain = new call_blockchain();
// console.log("objeto invocado");
blockchain.init_web3();
// console.log("web3 iniciado");
// console.log("Escenario: cuenta 1 (Activada) -> 100.000 monedas en su cuenta");
// console.log("           cuenta 2 (Desactivada) -> 0 monedas en su cuenta");
// console.log(
//   "Acción: Activar cuenta 2 y enviar x monedas de cuenta 1 a cuenta 2"
// );
//accounts = blockchain.get_addresses();
//accounts = blockchain.get_addresses();
//console.log(accounts[0]);

//FUNCIÓN PARA DAR DE ALTA A UN USUARIO NUEVO (RETURNS @ ETHEREUM):
var new_user;
(async () => {
  var result = await blockchain.signup_user();
  console.log(result);
  new_user = result;
})(); 
//FUNCIÓN PARA VER EL BALANCE:
(async () => {
  var result = await blockchain.get_Balance(new_user);
  console.log(result);
})();

//FUNCIÓN PARA INGRESAR MONEDAS:
(async () => {
  var result = await blockchain.ingresar(new_user, 50);
  console.log(result);
})();
//FUNCIÓN PARA VER EL BALANCE:
(async () => {
  var result = await blockchain.get_Balance(new_user);
  console.log(result);
})();

//console.log(result);
// var cuenta1 = "0x97aa547e791f83288520898f849c3119175050c7";
// var cuenta2 = "0xe2b0a73bc78f65f5a7c100b6b4b758baca30a7b7";
// setTimeout(function () {
//   console.log("Balance cuenta 1:");
//   blockchain.get_Balance(cuenta1);
// }, 3000);
//
// setTimeout(function () {
//   console.log("cuenta 1 está activada?");
//   blockchain.address_used(cuenta1);
// }, 6000);
//
// setTimeout(function () {
//   console.log("cuenta 2 está activada?");
//   blockchain.address_used(cuenta2);
// }, 9000);
//
// setTimeout(function () {
//   console.log("Activando cuenta...");
//   blockchain.activate_account(cuenta2);
// }, 12000);
//
// setTimeout(function () {
//   console.log("cuenta 2 está activada?");
//   blockchain.address_used(cuenta2);
// }, 16000);
//
// setTimeout(function () {
//   console.log("Balance cuenta 2:");
//   blockchain.get_Balance(cuenta2);
// }, 19000);
//
// setTimeout(function () {
//   console.log("cuenta 1 envía 50.000 monedas a cuenta 2...");
//   blockchain.send_coin(cuenta1, cuenta2, 50000);
// }, 23000);
//
// setTimeout(function () {
//   console.log("Balance cuenta 2:");
//   blockchain.get_Balance(cuenta2);
// }, 26000);
//
// setTimeout(function () {
//   console.log("Balance cuenta 1:");
//   blockchain.get_Balance(cuenta1);
// }, 29000);
//
// setTimeout(function () {
//   console.log("<-------------FIN DEL TESTEO------------->");
// }, 32000);

module.exports.call_blockchain = call_blockchain;

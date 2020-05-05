//Web3 bueno
var  Web3 = require('web3');

class call_blockchain {

       
        /*MyContract;
        web3;
        id;
        deployedNetwork;
        contract;
        */

    constructor() {
        
        this.MyContract = require('./testingpart2/build/contracts/HelloWorld.json');
        this.web3 = new Web3('http://localhost:8545');
        //this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        this.contract;
        this.id;
        this.deployedNetwork;
    }

    async init_web3() {
        try {
            this.id = await this.web3.eth.net.getId();
            this.deployedNetwork = this.MyContract.networks[this.id];
            this.contract = new this.web3.eth.Contract(this.MyContract.abi, this.deployedNetwork.address);
            //console.log(this.contract);
        } catch(error) {
            console.error(error);
        }
    } 

    async get_addresses() {
        const data = await web3.eth.getAccounts();
        console.log(data);
        return data;
    }
    
    async address_used(account) {
        const data = await contract.methods.isTaken(account).call();
        console.log(data);
        return data;
    }
    
    async signup_user() {
        const data = await contract.methods.signupusr().call();
        console.log(data);
        return data;
    }
    
    async get_Balance(account) {
        try {
            console.log(this.id);
            console.log(this.contract);
            var data = await this.contract.methods.getBalance(account).call();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
        
    }
}

console.log("invocando objeto...");
blockchain = new call_blockchain();
console.log("objeto invocado");
blockchain.init_web3();
console.log("web3 iniciado");
setTimeout(function() { 
    blockchain.get_Balance("0x98262550b91fe12d7e53ec5a7aa604a5522238db");
}, 50);







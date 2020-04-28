

class call_blockchain {

    constructor() {
        this.Web3 = require('web3');
        this.MyContract = require('./testingpart2/build/contracts/HelloWorld.json');
        this.web3 = new Web3('http://localhost:8545');
    
        this.id;
        this.deployedNetwork;
        this.contract;
    }

    async init_web3() {
        try {
            id = await web3.eth.net.getId();
            deployedNetwork = MyContract.networks[id];
            contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address);
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
            const data = await contract.methods.getBalance(account).call();
            console.log(ok);
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
blockchain.get_Balance("b930bdda26572edb36142f69111ae4b24355b715a87cf26269f6c946119310bb");
//console.log(dato);






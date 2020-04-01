const Web3 = require('web3');
const MyContract = require('./testingpart2/build/contracts/HelloWorld.json');

async function initWeb3() { 
    
    const web3 = new Web3('http://localhost:8545');

    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address);
}

async function address_used(account) {
    const data = await contract.methods.isTaken(account).call();
    console.log(data);
    return data;
}

async function get_Balance(account) {
    const data = await contract.methods.getBalance(account).call();
    console.log(ok);
    return data;
}


initWeb3();
console.log("done");
get_Balance('0xc0195500065dbf3574e48228330c99e88efab329');
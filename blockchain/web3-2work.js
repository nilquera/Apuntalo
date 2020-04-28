
    const Web3 = require('web3');
    const MyContract = require('./testingpart2/build/contracts/HelloWorld.json');
    const web3 = new Web3('http://localhost:8545');

    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address);

    contract.methods.getBalance("b930bdda26572edb36142f69111ae4b24355b715a87cf26269f6c946119310bb").call();
/*async function get_addresses() {
    const data = await web3.eth.getAccounts();
    console.log(data);
    return data;
}

async function address_used(account) {
    const data = await contract.methods.isTaken(account).call();
    console.log(data);
    return data;
}

async function signup_user() {
    const data = await contract.methods.signupusr().call();
    console.log(data);
    return data;
}

async function get_Balance(account) {
    const data = await contract.methods.getBalance(account).call();
    console.log(ok);
    return data;
}
*/

//Prueba
/*initWeb3().then(console.log("HOLA"));
console.log("done");
get_Balance('0xc0195500065dbf3574e48228330c99e88efab329');
*/
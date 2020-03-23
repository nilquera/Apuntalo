const hello = artifacts.require('./HelloWorld');

//const helloSettings = {
//    name: "Sergio"
//}

module.exports = function(deployer){
    deployer.deploy(hello, "Sergio");
};
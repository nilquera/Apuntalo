const ConvertLib = artifacts.require("ConvertLib");
const hello = artifacts.require('./HelloWorld');

//const helloSettings = {
//    name: "Sergio"
//}

module.exports = function(deployer){
    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, hello);
    deployer.deploy(hello);
    
};
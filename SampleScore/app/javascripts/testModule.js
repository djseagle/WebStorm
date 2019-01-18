var Web3 = require('web3')
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}
var connection = web3.isConnected()
if (connection) {
  console.log('connected')
} else {
  console.log('not connected')
}
var version = web3.version.node
console.log('version: '+version)

//web3.eth.defaultAccount = web3.eth.Score2
console.log(web3.eth.score)

var account_one = web3.eth.accounts[0]
console.log(account_one)

var abi = [ { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "isSuccess", "type": "bool" }, { "indexed": false, "name": "password", "type": "string" } ], "name": "NewCustomer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "isSuccess", "type": "bool" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "NewMerchant", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "SendScoreToCustomer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "TransferScoreToAnother", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "isSuccess", "type": "bool" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "AddGood", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "isSuccess", "type": "bool" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "BuyGood", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "sender", "type": "address" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "SettleScoreWithBank", "type": "event" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_customerAddr", "type": "address" }, { "name": "_password", "type": "string" } ], "name": "newCustomer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_merchantAddr", "type": "address" }, { "name": "_password", "type": "string" } ], "name": "newMerchant", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_merchantAddr", "type": "address" } ], "name": "isMerchantAlreadyRegister", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_customerAddr", "type": "address" } ], "name": "getCustomerPassword", "outputs": [ { "name": "", "type": "bool" }, { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_merchantAddr", "type": "address" } ], "name": "getMerchantPassword", "outputs": [ { "name": "", "type": "bool" }, { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_receiver", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "sendScoreToCustomer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "customerAddr", "type": "address" } ], "name": "getScoreWithCustomerAddr", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "merchantAddr", "type": "address" } ], "name": "getScoreWithMerchantAddr", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_senderType", "type": "uint256" }, { "name": "_sender", "type": "address" }, { "name": "_receiver", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "transferScoreToAnother", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getIssuedScoreAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getSettledScoreAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_merchantAddr", "type": "address" }, { "name": "_goodId", "type": "string" }, { "name": "_price", "type": "uint256" } ], "name": "addGood", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_merchantAddr", "type": "address" } ], "name": "getGoodsByMerchant", "outputs": [ { "name": "", "type": "bytes32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_customerAddr", "type": "address" }, { "name": "_goodId", "type": "string" } ], "name": "buyGood", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_customerAddr", "type": "address" } ], "name": "getGoodsByCustomer", "outputs": [ { "name": "", "type": "bytes32[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_merchantAddr", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "settleScoreWithBank", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]
var contractAddress = '0xD2484368629fECF34aeBdB2525b151F46FAA8230'
var greeter = web3.eth.contract(abi).at(contractAddress)

module.exports = {
    get:function () {
        console.log("Greeter: get()...")
        return greeter.greet.call()
    },
    set:function (info) {
        console.log("Greeter:set()...")
        greeter.setGreeting(info)
    }
}

var Web3 = require('web3')
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'))
console.log('web3 loaded')
//var abi = [  { "constant": true, "inputs": [], "name": "data", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function"  },  { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"  },  { "constant": false, "inputs": [ { "name": "str", "type": "string" } ], "name": "setData", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"  },  { "constant": true, "inputs": [], "name": "getData", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function"  }  ]
var abi = [ { "constant": false, "inputs": [ { "name": "str", "type": "string" } ], "name": "setData", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "data", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getData", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }]
//var address = '0x9e390b154d543a1505edd7a3dc9e1a560f3dd57f7e06d678638d155b73fab15f'
//var address = '0x9B9bb0a85589aC2fcB3231293611BA38A9F926c3'
//var address = '0x0f8727d08834721d59693ae68d6235e9033b8bd64322ec2e5a2bc62c93bc5462'
var address = '0x4bec2b4d80ab12cc5c51c3ff772c07f4ce9cb67b'
var data = new web3.eth.contract(abi,address)

data.methods.getData().call(null,function (error,result) {
    console.log('the data:'+result)
})

data.methods.setData('hello blc').send({from:'0x26f73341583A6765898d274BB19AeA9F3e5DA4FF'}).on('transactionHash', function (hash) {
    console.log('hash:'+hash)
    data.methods.getData().call(null,function (error,result) {
        console.log('the data:' +result)
    })
})

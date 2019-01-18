const http = require('http')
const web3 = require('web3')
const querystring = require('querystring')
const fs = require('fs')
const urllib = require('url')
console.log('loaded')

var server = http.createServer(function (req,res) {
    console.log('http open')
}).listen(8080)

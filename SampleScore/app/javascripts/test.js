var http = require('http')
var url = require('url')
var util = require('util')

var testModule = require('./testModule')

http.createServer(function (req,res) {
    console.log(testModule.set(Math.random().toString(36).substr(2)))
    console.log(testModule.get())
}).listen(3000)

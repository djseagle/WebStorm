// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css'

const customer = require('./customer')
const bank = require('./bank')
const merchant = require('./merchant')
const test = require('./test')
const vote = require('./vote')

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import ScoreArtifacts from '../../build/contracts/Score'
import VoteArtifacts from '../../build/contracts/Vote'
import TestArtifacts from '../../build/contracts/test'

// MetaCoin is our usable abstraction, which we'll use through the code below.
let ScoreContract = contract(ScoreArtifacts)
let ScoreInstance

let VoteContract = contract(VoteArtifacts)
let VoteInstance

let TestContract = contract(TestArtifacts)
let TestInstance

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts
let account

window.App = {
  // 获得合约实例
  init: function () {
    // 设置web3连接
    ScoreContract.setProvider(window.web3.currentProvider)
    // Get the initial account balance so it can be displayed.
    window.web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        window.App.setStatus('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        window.App.setStatus('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
        return
      }
      accounts = accs
      account = accounts[0]
    })

    ScoreContract.deployed().then(function (instance) {
      ScoreInstance = instance
    }).catch(function (e) {
      console.log(e, null)
    })

    VoteContract.deployed().then(function (instance) {
      VoteInstance = instance
    }).catch(function (e) {
      console.log(e, null)
    })

    TestContract.deployed().then(function (instance) {
      TestInstance = instance
    }).catch(function (e) {
      console.log(e,null)
    })
  },

  //  Test Page |  testSum
  testSum:function(){
    // const a = document.getElementById('testa').value
    // const b = document.getElementById('testb').value
    // const c = a + b
    //window.App.displaytestsummary(c)
    //test.displaytestsummary(c)
    console.log('will jump to test.js ')
    test.testsummary(TestInstance, account)

  },

  // displaytestsummary
  displaytestsummary:function(message){
    const status = document.getElementById('testsumresult')
    status.innerHTML = message
    console.log('summary display done')
  },

  //  Test Page | 查询Ganache version
  getGanacheVersion: function () {
    // const version = window.web3.eth.accounts[0]
    // const nodeVersion = window.web3.version.node
    // window.App.displayGanacheVersion('Infor   :   ' +nodeVersion)
    // window.web3.version.getNode(function (err,res) {
    //     if(res){
    //         window.App.displayGanacheVersion('Ver   :'+res)
    //     }else{
    //         window.App.displayGanacheVersion('error')
    //     }
    // })
    const address = window.web3.eth.accounts[2]
    const coinbase = window.web3.eth.getBalance(address);
    window.App.displayGanacheVersion('account'+address + '        balance :'+coinbase)

  },

  // Vote Page提交投票
  voterSubmit: function(){

  },

  // Vote Page 当前方案列表显示
  getTopicList: function(){
    let accounts = ''
    window.web3.eth.accounts.forEach(e => accounts += e  +'\n')
    // window.App.displayTopicList(accounts)
    window.App.displayTopicList('1.aaaaaaaaaaaaaa    2.bbbbbbbbbbbb   3.ccccccccccc')
  },

  // Vote Page 方案提交
  submitTopic: function(){

  },

  // Vote Page 最终结果
  votingResult: function(){

  },

  // 新建客户
  newCustomer: function () {
    customer.newCustomer(ScoreInstance, account)
  },
  // 客户登录
  customerLogin: function () {
    customer.customerLogin(ScoreInstance, account)
  },
  // 当前客户信息
  getCurrentCustomer: function (currentAccount) {
    customer.showCurrentAccount(currentAccount)
  },
  // 当前客户余额
  getScoreWithCustomerAddr: function (currentAccount) {
    customer.getScoreWithCustomerAddr(currentAccount, ScoreInstance, account)
  },
  // 客户购买商品
  buyGood: function (currentAccount) {
    customer.buyGood(currentAccount, ScoreInstance, account)
  },
  // 查看已经购买的物品
  getGoodsByCustomer: function (currentAccount) {
    customer.getGoodsByCustomer(currentAccount, ScoreInstance, account)
  },
  // 客户转让积分
  transferScoreToAnotherFromCustomer: function (currentAccount) {
    customer.transferScoreToAnotherFromCustomer(currentAccount, ScoreInstance, account)
  },
  // 商家注册
  newMerchant: function () {
    merchant.newMerchant(ScoreInstance, account)
  },
  // 商家登录
  merchantLogin: function () {
    merchant.merchantLogin(ScoreInstance, account)
  },
  // 当前商家账户
  getCurrentMerchant: function (currentAccount) {
    merchant.getCurrentMerchant(currentAccount)
  },
  // 当前商家余额
  getScoreWithMerchantAddr: function (currentAccount) {
    merchant.getScoreWithMerchantAddr(currentAccount, ScoreInstance, account)
  },
  // 商家积分转让
  transferScoreToAnotherFromMerchant: function (currentAccount) {
    merchant.transferScoreToAnotherFromMerchant(currentAccount, ScoreInstance, account)
  },
  // 商家添加商品
  addGood: function (currentAccount) {
    merchant.addGood(currentAccount, ScoreInstance, account)
  },
  // 显示商家的所有商品
  getGoodsByMerchant: function (currentAccount) {
    merchant.getGoodsByMerchant(currentAccount, ScoreInstance, account)
  },
  // 商家清算积分
  settleScoreWithBank: function (currentAccount) {
    merchant.settleScoreWithBank(currentAccount, ScoreInstance, account)
  },
  // 发行积分
  sendScoreToCustomer: function () {
    bank.sendScoreToCustomer(ScoreInstance, account)
  },
  // 银行登录
  bankLogin: function () {
    bank.bankLogin(ScoreInstance, account)
  },
  // 查看已经发行的积分
  getIssuedScoreAmount: function () {
    bank.getIssuedScoreAmount(ScoreInstance, account)
  },
  // 已经清算积分总数目
  getSettledScoreAmount: function () {
    bank.getSettledScoreAmount(ScoreInstance, account)
  },
  // 查询所有的区块链账户
  allAccounts: function () {
    let allAccount = ''
    window.web3.eth.accounts.forEach(e => {
      allAccount += e + '\n'
    })
    window.App.setConsole(allAccount)
  },
  // 状态栏显示
  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },
  // 显示console
  setConsole: function (message) {
    const status = document.getElementById('console')
    status.innerHTML = message
  },
  // 显示testSummary
  setSummary: function(message){
    const status = document.getElementById('testSummary')
    status.innerHTML = message
  },
  // 显示方案列表 topic list
  displayTopicList: function(message){
      const status = document.getElementById('topicList')
      status.innerHTML = message
  },
  // 显示GanacheVersion
  displayGanacheVersion: function(message) {
    const status = document.getElementById('getGanacheVersion')
    status.innerHTML = message
  }
}

window.addEventListener('load', function () {
  // 设置web3连接 http://127.0.0.1:8545
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  window.App.init()
})

import {default as Web3} from 'web3'
import {default as contract} from 'truffle-contract'

import ScoreArtifacts from '../../build/contracts/Score'

let ScoreContract = contract(ScoreArtifacts)
let ScoreInstance
let accounts
let account
window.App = {
  init:function () {
    ScoreContract.setProvider(window.web3.currentProvider)
    window.web3.eth.getAccounts(function (err,accs) {
      accounts = accs
      account = accounts[0]
    })
    ScoreContract.deployed().then(function (instance) {
      ScoreInstance = instance
    }).catch(function (e) {
      console.log(e,null)
    })
  }
}

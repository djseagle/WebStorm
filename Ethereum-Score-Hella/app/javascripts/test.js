const util = require('./utils')
module.exports = {

  // 默认coinbase是银行账户
  bankLogin: function (ScoreInstance, account) {
    const address = document.getElementById('bankLoginAddr').value
    ScoreInstance.getOwner({ from: account }).then(function (result) {
      if (address.localeCompare(result) === 0) {
        // 跳转到管理员页面
        window.location.href = 'bank.html?account=' + address
      } else {
        window.alert('不是银行账户，登录失败')
      }
    })
  },
  // 银行向顾客发送积分
  sendScoreToCustomer: function (ScoreInstance, account) {
    const address = document.getElementById('customerAddress').value
    const score = document.getElementById('scoreAmount').value
    ScoreInstance.sendScoreToCustomer(address, score, { from: account })
    ScoreInstance.SendScoreToCustomer(function (e, r) {
      if (!e) {
        console.log(r.args.message)
        window.App.setStatus(r.args.message)
      }
    })
  },
  // 银行获取已经发行的积分
  getIssuedScoreAmount: function (ScoreInstance, account) {
    ScoreInstance.getIssuedScoreAmount({ from: account }).then(function (result) {
      window.App.setStatus('已发行的积分总数为：' + result)
    })
  },
  // 银行获得已经清算的积分
  getSettledScoreAmount: function (ScoreInstance, account) {
    ScoreInstance.getSettledScoreAmount({ from: account }).then(function (result) {
      window.App.setStatus('已清算的积分总数为：' + result)
    })
  },
  // testsum
  // testsummary2:function(TestInstance) {
  //   const a = document.getElementById('testa').value
  //   const b = document.getElementById('testb').value
  //   const c = a + b
  //   // TestInstance.setArgs(a,b).then(function (c) {
  //   //   window.App.displayTopicList(c)
  //   // })
  //   console.log('testsummary done, pending for display')
  //   window.App.displaytestsummary(c)
  // },

  testsummary: function (TestInstance, account) {
    console.log('jumped into test.js')
    const a = document.getElementById('testa').value
    const b = document.getElementById('testb').value
    console.log('A: ' + a + '    B:' + b)
    const c = a + b
    console.log('sum done')
    window.App.setStatus(c)
    window.App.displaytestsummary(c)
    // TestInstance.funAdd(a, b).then(function (e,r) {
    //     if(!e){
    //         console.log(r)
    //         window.App.setStatus(r);
    //         window.App.displaytestsummary(r)
    //     }else{
    //         console.log(e)
    //         window.App.setStatus(e)
    //         window.App.displaytestsummary(e)
    //     }
    // })
  }

}

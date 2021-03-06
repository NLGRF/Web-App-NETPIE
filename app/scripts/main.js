const Config = {}
const Global = {}

Config.appId = 'Appname'
Config.appKey = 'gwfq7ENR0n5AQTI'
Config.appSecret = 'loLeZBa1Ijy44K2OI31GuIFrw'
Config.topic = '/gearname/topic1'
Config.alias = 'hello-cmmc-alias'

console.log(Config)
microgear = Microgear.create({
  key: Config.appKey,
  secret: Config.appSecret,
})

microgear.on('connected', function () {
  console.log('netpie connected')
  microgear.setAlias(Config.alias)
  microgear.subscribe('/gearname/+')
  clearInterval(Global.timer1)
  hideNetpieConnectingIcon()
  $('#incoming-messages').html('<a class="button is-primary is-loading"></a> connected')
})

microgear.on('present', function (event) {
  console.log(event)
})

microgear.on('absent', function (event) {
  console.log(event)
})

microgear.on('message', function (topic, msg) {
  const $p = $('<p class="title">' + msg + '</p>')
  var dateString = moment().format('h:mm:ss a')
  $('#incoming-messages').html($p)
  $('.message-header-text').text('[' + dateString + '] Message: ' + topic)
})

function hideNetpieConnectingIcon () {
  $('.netpie-connecting').hide()
}

function connect_netpie () {
  const startTime = new Date().getTime()
  Global.startedOn = startTime
  Global.timeoutOn = startTime + (10 * 1000)
  Global.timer1 = setInterval(function () {
    const currentTime = new Date().getTime()
    if (currentTime > Global.timeoutOn) {
      alert(Config.appId + ' is an invalid appId.')
      clearInterval(Global.timer1)
      hideNetpieConnectingIcon()
    }
    else {
      console.log('wating... ', Global.timeoutOn - currentTime)
    }
  }, 100)
  microgear.resettoken(function (err) {
    if (err) {
      console.log('reset token err', err)
    } else {
      microgear.connect(Config.appId)
    }
  })
}

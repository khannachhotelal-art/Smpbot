# Smpbot
const mineflayer = require('mineflayer')

const server = {
  host: 'TrueSMP.play.hosting',
  port: 18786
}

const ONLINE_TIME = 2 * 60 * 60 * 1000
const SLEEP_TIME = 1 * 60 * 60 * 1000

const bots = [
  { username: 'SMP_1' },
  { username: 'SMP_2' },
  { username: 'SMP_3' }
]

let index = 0
let bot = null
let afk = null

function startBot(i) {
  const data = bots[i]

  bot = mineflayer.createBot({
    host: server.host,
    port: server.port,
    username: data.username
  })

  bot.on('spawn', () => {
    console.log(data.username + " joined")

    afk = setInterval(() => {
      const moves = ['forward','back','left','right','jump']
      const m = moves[Math.floor(Math.random()*moves.length)]
      bot.setControlState(m,true)
      setTimeout(()=>bot.setControlState(m,false),1000)
    },15000)

    setTimeout(() => {
      bot.quit()
    }, ONLINE_TIME)
  })

  bot.on('end', () => {
    clearInterval(afk)

    index = (index + 1) % bots.length

    setTimeout(() => {
      startBot(index)
    }, SLEEP_TIME)
  })
}

startBot(index)

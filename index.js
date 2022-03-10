const os = require('os')
const log = require('./logger.js')

setInterval(() => {
    const memo = parseInt(os.freemem() / 1024 / 1024)
    const total = parseInt(os.totalmem() / 1024 / 1024)
    const percent = parseInt((memo / total) * 100)

    const stats = {
        free : memo + ' MB',
        total: total + ' MB',
        usage: percent +'%'
    }
    console.clear()
    console.table(stats)

    log(JSON.stringify(stats))
}, 1000)


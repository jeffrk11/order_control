const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')

const emitter = new EventEmitter()

emitter.on('log', (message) => {
    var data = new Date();
    var now = data.getHours() +':'+ data.getSeconds() + ' ' +data.getDay()
    fs.appendFile(
        path.join( __dirname, 'log.txt'),
        message + ' '+ now +'\n', 
        err => { 
            if (err) throw err
        })
})

function log(message){
    emitter.emit('log',message)
}


module.exports = log

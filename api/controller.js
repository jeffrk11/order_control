const EventEmitter = require('events')
const service = require('./service.js')

const controller = new EventEmitter()

controller.on('add', obj => {
    service.add(obj)
})

controller.on('del', obj => {
    service.del(obj)
})

function map(obj){
    controller.emit(obj)
}
module.exports.map = map
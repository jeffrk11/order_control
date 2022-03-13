const DB = require('../db/db.js')

function getAllPedidos(){
    return DB.get("pedidos").pedidos
}
function savePedidos(pedidos){
    return DB.set(pedidos)
}

module.exports = {
    //get all pedidos
    findAll: function(){
        return getAllPedidos()
    },
    //get one by id
    findById: function(id){
        const pedidos = getAllPedidos()
        return pedidos.find(e => {return e.id === id})
    },
    //save one 
    save: function(pedido){
        const pedidos = savePedidos(pedidos)
        
    }

}
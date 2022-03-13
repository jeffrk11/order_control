const path = require('path')
const fs = require('fs')
//    var pedidos = {pedidos:[{ 'id':1},{ 'id':2}]}

//    let pedido = pedidos['pedidos'].find(pedido =>{ return (pedido.id === 2) })
var data = {daniela: 'linda'}
fs.writeFile(
    
    path.join(__dirname,'../api/db/pedidos/pedidos.json'),
    JSON.stringify(data,null,4),
    err => {
        if(err) throw err
    }
)

console.log()
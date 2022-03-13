const path = require('path')
const fs = require('fs')
const pedidos = require('../db/pedidos/pedidos.json')
const pedidos_refs = require('../db/pedidos/pedidos_referencias.json')

//logica de jsons aqui
class DB {
    constructor(){
        this.jsons = [pedidos,pedidos_refs]
    }

    get(table) {
        for(var i = 0; i < this.jsons.length; i++){
            if(table in this.jsons[i])
                return this.jsons[i]
        }
        return null
    }

    set(pedidos){
        fs.writeFile(
            path.join('../api/db/pedidos','pedidos.json'),
            JSON.stringify(pedidos,null,4),
            err => {
                if(err) throw err
            }
        )
    }
}


module.exports = new DB
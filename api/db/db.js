const path = require('path')
const fs = require('fs')
const ped_json = require('../db/pedidos/pedidos.json')
const pr_json = require('../db/pedidos/pedidos_referencias.json')
const ref_json = require('../db/referencias/referencias.json')

//logica de jsons aqui
class DB {
    constructor(){
        this.jsons =    {
                            pedidos: ped_json,
                            pedidos_referencias: pr_json,
                            referencias: ref_json
                        }
    }

    get(table) {
        return this.jsons[table]
    }

    set(pedidos){
        fs.writeFile(
            path.join(__dirname,'../db/pedidos/pedidos.json'),
            JSON.stringify(pedidos,null,4),
            err => {
                if(err) throw err
            }
        )
    }

    save(table_dir,data){
        fs.writeFile(
            path.join(__dirname,table_dir),
            JSON.stringify(data,null,4),
            err => {
                if(err) throw err
            }
        )
    }
}


module.exports = new DB
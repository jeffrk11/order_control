const path = require('path')
const fs = require('fs')
const ped_json = require('../db/pedidos/pedidos.json')
const pr_json = require('../db/pedidos/pedidos_referencias.json')
const ref_json = require('../db/referencias/referencias.json')
// const ref_tipos_json = require('../db/referencias/referencias_tipos.json')
// const ref_estilos_json = require('../db/referencias/referencias_estilos.json')
// const tipos_json = require('../db/referencias/tipos.json')
// const estilos_json = require('../db/referencias/estilos.json')


//logica de jsons aqui
class DB {
    constructor(){
        this.jsons =    {
                            pedidos: ped_json,
                            pedidos_referencias: pr_json,
                            referencias: ref_json
                            // referencias_tipos: ref_tipos_json,
                            // referencias_estilos: ref_estilos_json,
                            // tipos: tipos_json,
                            // estilos: estilos_json
                        }
        this.dirs = {
                        referencias : '../db/referencias/referencias.json',
                        pedidos: '../db/pedidos/pedidos.json',
                        pedidos_referencias : '../db/pedidos/pedidos_referencias.json'
                        
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

    save(table,data){
        fs.writeFile(
            path.join(__dirname,this.dirs[table]),
            JSON.stringify(data,null,4),
            err => {
                if(err) throw err
            }
        )
    }

    insert(table,data){
        const json = this.get(table)
        //se for array colcoa um por um
        if(Array.isArray(data))
            data.forEach(e =>{json.push(e)})
        else
            json.push(data)
        
        this.save(table,json)
    }
}


module.exports = new DB
const DB = require('../db/db.js')

module.exports = {
    insert: function(ref){
        DB.insert('referencias',ref)
    },
    update: function(ref){
        let referencias = DB.get('referencias')
        referencias = referencias.map( e=>{ return e.id === ref.id ? ref : e})
        DB.save('referencias',referencias)
    },
    delete: function(id){
        let referencias = DB.get('referencias')
        let ped_ref = DB.get('pedidos_referencias');
        //filtra e tira os deletados
        ped_ref = ped_ref.filter(e => {return e.id_referencia !== id })
        referencias = referencias.filter(e => {return e.id !== id})
        //salva sem os deletados
        DB.save('referencias',referencias)
        DB.save('pedidos_referencias',ped_ref) 
    },
    findById: function(id){
        return DB.get('referencias').find(e => {
            return e.id === id
        })
    },
    findAllByIds: function(list){
        return DB.get('referencias').filter(e => {
            return list.includes(e.id)
        })
    },
    findAll: function(){
        return DB.get('referencias')
    },
    findReferenciaTipoById: function(id){
        return DB.get('referencias_tipos').find(e => {
            return e.id_referencia === id
        })
    },
    findReferenciaEstiloById: function(id){
        return DB.get('referencias_estilos').find(e => {
            return e.id_referencia === id
        })
    },
    getDescricaoTipo: function(id){
        return DB.get('tipos').find( e =>{
            return e.id === id
        })
    },
    getDescricaoEstilo: function(id){
        return DB.get('estilos').find( e =>{
            return e.id === id
        })
    }
}
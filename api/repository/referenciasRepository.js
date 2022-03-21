const DB = require('../db/db.js')

module.exports = {
    //get one by id
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
    },findReferenciaEstiloById: function(id){
        return DB.get('referencias_estilos').find(e => {
            return e.id_referencia === id
        })
    },getDescricaoTipo: function(id){
        return DB.get('tipos').find( e =>{
            return e.id === id
        })
    },getDescricaoEstilo: function(id){
        return DB.get('estilos').find( e =>{
            return e.id === id
        })
    }
}
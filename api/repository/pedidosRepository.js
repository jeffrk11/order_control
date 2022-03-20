const DB = require('../db/db.js')


module.exports = {
    //get all pedidos
    findAll: function(){
        return DB.get('pedidos')
    },
    //get all pedidos conections with referencias
    findAllPedidosReferencias: function(){
        return DB.get('pedidos_referencias')
    },
    //get all referencias  with pedido id
    findAllPedidosReferenciasByPedidoId: function(id){
        return DB.get('pedidos_referencias').filter( e =>{
            return e.id_pedido === id
        })
    },
    //get one by id
    findById: function(id){
        return DB.get('pedidos').find(e => {
            return e.id === id
        })
    },
    //save one 
    save: function(pedido){
        const pedidos = DB.get('pedidos')
        const ped_ref = DB.get('pedidos_referencias')
        //salvando pedidos referencias
        if(pedido.referencias !== undefined){
            pedido.referencias.forEach(e => { ped_ref.push(e) })
            DB.save('../db/pedidos/pedidos_referencias.json',ped_ref)
        }
        //salvando pedido
        //limpando obj
        delete pedido.referencias
        pedidos.push(pedido);
        DB.save('../db/pedidos/pedidos.json',pedidos)
    },
    //delete a pedido
    delete: function(id){
        let pedidos = DB.get('pedidos')
        let ped_ref = DB.get('pedidos_referencias');
        //filtra e tira os deletados
        ped_ref = ped_ref.filter(e => {return e.id_pedido !== id })
        pedidos = pedidos.filter(e => {return e.id !== id})
        //salva sem os deletados
        DB.save('../db/pedidos/pedidos.json',pedidos)
        DB.save('../db/pedidos/pedidos_referencias.json',ped_ref) 
    },
    //update a pedido
    update: function(pedido){
        let pedidos = DB.get('pedidos')
        let ped_ref = DB.get('pedidos_referencias')
        //salvando pedidos referencias
        
        if(pedido.referencias !== undefined){
            //deletar tudo antes
            ped_ref = ped_ref.filter(e => {return e.id_pedido !== pedido.id  })
            pedido.referencias.forEach(e => { ped_ref.push(e) })
            DB.save('../db/pedidos/pedidos_referencias.json',ped_ref)
        }
        //limpando objeto
        delete pedido.referencias
        pedidos = pedidos.map( e=>{ return e.id === pedido.id ? pedido : e})
        DB.save('../db/pedidos/pedidos.json',pedidos)
    }

}
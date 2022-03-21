const repo =require('../repository/pedidosRepository')
const ref_repo =require('../repository/referenciasRepository')


function addReferencias(pedidos){
    //const ped_ref = repo.findAllPedidosReferencias();

    pedidos.forEach(pedido => {
        let refs = repo.findAllPedidosReferenciasByPedidoId(pedido.id)
        pedido.referencias = []
        ref_aux = []
        let map =  new Map()
        refs.forEach(r =>{
            //copiando para n alterar o objeto de referencia
            let cop_r = JSON.parse(JSON.stringify(r)) //deep copy
            //se nao existe no map ele adiciona
            if(map.get(cop_r.id_referencia) === undefined){
                map.set(cop_r.id_referencia, [])
            }
            //agora existindo vai setar
            map.get(cop_r.id_referencia).push(cop_r)
            //deixando mais amigavel
            delete cop_r.id_referencia
            delete cop_r.id_pedido
        })
        //setar dentro de pedido.referencias
        for(let key in Object.fromEntries(map)){
            pedido.referencias.push(
                {
                    referencia: parseInt(key),
                    tamanhos: map.get(parseInt(key))
                }
            )
        }

    })
    
}

function validateRef(referencias){
    let refs = []
    referencias.forEach(e => {
        if(ref_repo.findById(e.id_referencia) == undefined){
            refs.push(e.id_referencia);
        }
    })
    if(refs.length > 0) throw new BusinessException(404,"REFERENCIA INEXISTENTE",refs)
}

module.exports = {
    //get all pedidos
    findAll: function () {
        const pedidos = repo.findAll()
        //putting referencias in pedidos by id
        addReferencias(pedidos)
        return pedidos;
    },
    findById: function (id) {
        const pedido = repo.findById(id)
        if(pedido !== undefined){
            addReferencias([pedido])
            return pedido
        }else{
            throw new BusinessException(404,"PEDIDO NAO EXISTE COM ESSE CODIGO")
        }
    },
    save: function (pedido) {
        validateRef(pedido.referencias)
        if(repo.findById(pedido.id) === undefined){
            repo.save(pedido)
        }else{
            throw new BusinessException(404,"PEDIDO JA EXISTE COM ESSE CODIGO",pedido)
        }
    },
    delete: function(id){
        if(repo.findById(id) !== undefined){
            return repo.delete(id)
        }else{
            throw new BusinessException(404,"PEDIDO NAO EXISTE COM ESSE CODIGO")
        }
    },
    update: function(pedido){
        validateRef(pedido.referencias)
        if(repo.findById(pedido.id) !== undefined){
            repo.update(pedido)
        }else{
            throw new BusinessException(404,"PEDIDO NAO EXISTE COM ESSE CODIGO")
        }
    }
}
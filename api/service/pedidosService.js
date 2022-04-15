const repo =require('../repository/pedidosRepository')
const ref_repo =require('../repository/referenciasRepository')

function BusinessException(status=500,message,body){
    this.message = message;
    this.body = body
    this.name = "BusinessException";
    this.status = status
}
//montando para mostrar
function addReferencias(pedidos){
    //const ped_ref = repo.findAllPedidosReferencias();

    pedidos.forEach(pedido => {
        //pegando referencias desse pedido
        let pedido_refs = repo.findAllPedidosReferenciasByPedidoId(pedido.id)
        //pegando detalhes das referencias desse pedido
        let list_refs = pedido_refs.map(ped =>{ return ped.id_referencia})
        let ref_detail = ref_repo.findAllByIds(list_refs)
        pedido.referencias = []
        //colocando detalhe da referencia no pedido referencia
        pedido_refs.forEach(ref =>{
            ref.referencia = ref_detail.find( e => { return e.id === ref.id_referencia})
        })
        //colocando pedido referencia dentro desse pedido
        pedido_refs.forEach(ref =>{
            pedido.referencias.push(ref);
        })
        

    })
    
}

function validateRef(referencias = []){
    let refs = []
    referencias.forEach(e => {
        if(ref_repo.findById(e.id_referencia) == undefined){
            refs.push(e.id_referencia);
        }
    })
    if(refs.length > 0) throw new BusinessException(404,"REFERENCIA INEXISTENTE",refs)
}

function montar_pedido_referencia(pedido){
    let list_ped_ref = [];
    //se nao exisitr esse campo dentro do pedido, setar como lista vazia
    if(!pedido.referencias)
        pedido.referencias = [];

    pedido.referencias.forEach(e => {
        let pedido_referencia = {};
            pedido_referencia.id_pedido = pedido.id;
            pedido_referencia.id_referencia = e.id_referencia;
            pedido_referencia.tamanhos = e.tamanhos;
        //adicionando o pedido ref a lista para salvar
        list_ped_ref.push(pedido_referencia);
    })

    return list_ped_ref;
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
    insert: function (pedido) {
        validateRef(pedido.referencias)
        //montando objeto pedido_referencia para salvar
        if(repo.findById(pedido.id) === undefined){
            repo.insertPedidoReferencia(montar_pedido_referencia(pedido))
            //salvar objeto do pedido sem as referencias
            delete pedido.referencias
            repo.insert(pedido)
        }else{
            throw new BusinessException(404,"PEDIDO JA EXISTE COM ESSE CODIGO",pedido)
        }
    },
    delete: function(id){
        if(repo.findById(id) !== undefined){
            return repo.delete(id)
        }else{
            throw new BusinessException(404,"PEDIDO NAO EXISTE COM ESSE CODIGO",id)
        }
    },
    update: function(pedido){
        validateRef(pedido.referencias)
        //removendo pedidos referencias
        let ped_refs = repo.findAllPedidosReferencias()
                                .filter(e => { return e.id_pedido !== pedido.id})

        //setando alterados
            pedido.referencias.forEach(e => {
                let pedido_referencia = {};
                    pedido_referencia.id_pedido = pedido.id;
                    pedido_referencia.id_referencia = e.id_referencia;
                    pedido_referencia.tamanhos = e.tamanhos;
                //adicionando o pedido ref a lista para salvar
                ped_refs.push(pedido_referencia);
            })
        
        if(repo.findById(pedido.id) !== undefined){
            let pedidos = repo.findAll().filter( e =>{ return e.id !== pedido.id })
            delete pedido.referencias
            pedidos.push(pedido)
            //depois de todas validacoes salvar

            repo.savePedidoReferencia(ped_refs)
            repo.save(pedidos)
        }else{
            throw new BusinessException(404,"PEDIDO NAO EXISTE COM ESSE CODIGO",pedido.id)
        }
    }
}
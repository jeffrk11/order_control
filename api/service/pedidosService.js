const repo =require('../repository/pedidosRepository')
const ref_repo =require('../repository/referenciasRepository')

function BusinessException(status=500,message,body){
    this.message = message;
    this.body = body
    this.name = "BusinessException";
    this.status = status
}

function addReferencias(pedidos){
    const ped_ref = repo.findAllPedidosReferencias();
    pedidos = pedidos.map(e => {
        e.referencias = ped_ref.filter(refs => {
            if(e.id === refs.id_pedido){
                return refs
            }
        })
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
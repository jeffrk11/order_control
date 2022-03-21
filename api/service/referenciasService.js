const repo =require('../repository/referenciasRepository')

function BusinessException(status=500,message,body){
    this.message = message;
    this.body = body
    this.name = "BusinessException";
    this.status = status
}

function montarReferencia(id){
    
    const ref_tipo = repo.findReferenciaTipoById(id)
    const ref_estilo = repo.findReferenciaEstiloById(id)
    const tipo = repo.getDescricaoTipo(ref_tipo.id_tipo)
    const estilo = repo.getDescricaoEstilo(ref_estilo.id_estilo)

    model = 
    {
        id: id,
        tipo: tipo.descricao,
        estilo: estilo.descricao
    }
    return model;
}

module.exports = {
    findById: function(id){
        const ref = repo.findById(id)
        if(ref !== undefined)
            return montarReferencia(id);

        throw new BusinessException(404,"REFERENCIA NAO EXISTE COM ESSE CODIGO")
    },
    findAllByIds: function(list){
        const refs = repo.findAllByIds(list)
        return refs.map( e =>{
            return montarReferencia(e.id)
        })
    },
    findAll: function(){
        const refs = repo.findAll()
        return refs.map( e => {
            return montarReferencia(e.id)
        })
    }
}
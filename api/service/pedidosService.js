const repo =require('../repository/pedidosRepository')
module.exports = {
    //get all pedidos
    findAll: function () {
        return repo.findAll()
    },
    findById: function (id) {
        return repo.findById(id)
    },
    save: function (pedido) {
        return repo.save(pedido)
    }
}
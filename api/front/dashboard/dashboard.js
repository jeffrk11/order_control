const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')
const ejs = require('ejs');
const ped_service = require('../../service/pedidosService')
const ref_service = require('../../service/referenciasService')

router.get('/dashboard',(req,res,next) => {
    const pedidos = ped_service.findAll()
    const referencias = ref_service.findAll()

    res.render(path.join(__dirname,'../../views/partials/esqueleto.ejs'),
        {
            content: '../dashboard/dashboard.ejs',
            pedidos: pedidos,
            referencias: referencias
        });
    //res.render(path.join(__dirname,'../../views/pedidos/cadastrar.ejs'), { pedido:pedido, referencias:referencias });
})

module.exports = router
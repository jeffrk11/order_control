const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const service = require('../service/pedidosService')

//retorna todos os pedidos
router.get('/pedidos',(req,res,next) =>{
    const pedidos = service.findAll()
    res.status(200).send(JSON.stringify(pedidos))
})

router.get('/pedidos/:id',(req,res,next) =>{
    const id = parseInt(req.params.id)
    const pedido = service.findById(id)
    let http = 200

    if(pedido === undefined) http = 204
    res.status(http).send(JSON.stringify(service.findById(id)))
})

router.post('/pedidos',(req,res,next) =>{
    const pedido = req.body

    console.log(pedido)
    res.status(200).send(pedido)
})

module.exports = router
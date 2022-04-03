const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const service = require('../service/pedidosService')

//retorna todos os pedidos
router.get('/pedidos',(req,res,next) =>{
    const pedidos = service.findAll()
    res.status(200).send(JSON.stringify(pedidos))
})

router.post('/pedidos',(req,res) =>{
    const pedido = req.body
    console.log(pedido)
    service.insert(pedido)
    res.status(201).send("CRIADO COM SUCESSO")
})

router.get('/pedidos/:id',(req,res,next) =>{
    const id = parseInt(req.params.id)
    const pedido = service.findById(id)

    
    res.status(200).send((pedido))
})



router.delete('/pedidos/:id',(req,res,next) =>{
    const id = parseInt(req.params.id)
    const pedido = service.delete(id)
    res.status(200).send("DELETADO COM SUCESSO")
})

router.put('/pedidos',(req,res,next) =>{
    const pedido = req.body
    service.update(pedido)
    res.status(200).send("ATUALIZADO COM SUCESSO")
})

module.exports = router
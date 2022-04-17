const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const service = require('../service/referenciasService')
const tomb = require('./tomb.js')

router.get('/referencias/:id',(req,res,next) =>{
    const id = parseInt(req.params.id)
    const referencia = service.findById(id)
    
    res.status(200).send((referencia))
})
router.post('/referencias',(req,res,next) =>{
    const referencia = req.body
    service.insert(referencia)
    
    res.status(201).send('SALVO')
})
router.delete('/referencias/:id',(req,res,next) =>{
    const id = parseInt(req.params.id)
    service.delete(id)
    res.status(200).send("DELETADO COM SUCESSO")
})
router.get('/referencias',(req,res,next) =>{
    //const referencias = req.body   
    res.status(200).send(service.findAll())
})
router.put('/referencias',(req,res,next) =>{
    const referencia = req.body
    service.update(referencia)
    res.status(200).send("ATUALIZADO COM SUCESSO")
})
router.patch('/referencias/tombamento',(req,res,next) =>{
    res.status(200).send(tomb.tombar())
})

module.exports = router
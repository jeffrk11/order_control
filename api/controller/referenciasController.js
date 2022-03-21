const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const service = require('../service/referenciasService')

router.get('/referencias/:id',(req,res,next) =>{
    const id = parseInt(req.params.id)
    const referencia = service.findById(id)
    
    res.status(200).send((referencia))
})

router.get('/referencias',(req,res,next) =>{
    //const referencias = req.body   
    res.status(200).send(service.findAll())
})

module.exports = router
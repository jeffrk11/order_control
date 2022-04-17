const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')
const ejs = require('ejs');
const service = require('../../service/referenciasService')


//are reservada apenas para o front para nao confundir com o controller da api
router.get('/edicao/referencia',(req,res,next) => {
    res.render(path.join(__dirname,'../../views/partials/esqueleto.ejs'),
        {
            content: '../referencias/edicao.ejs',
            referencia: {}
        });
})
router.get('/referencia/listagem',(req,res,next) => {
    const referencias = service.findAll()
    res.render(path.join(__dirname,'../../views/partials/esqueleto.ejs'), 
    {
        content: '../referencias/lista.ejs',
        referencias: referencias
        
    });
})
router.get('/referencia/edicao/:id',(req,res,next) => {
    const id = parseInt(req.params.id)
    const referencia = service.findById(id)
    res.render(path.join(__dirname,'../../views/partials/esqueleto.ejs'), 
    {
        content: '../referencias/edicao.ejs',
        novo: false,
        referencia: referencia
        
    });
})
router.get('/referencia/novo',(req,res,next) => {
    
    res.render(path.join(__dirname,'../../views/partials/esqueleto.ejs'), 
    {
        referencia: {
            tamanhos: {}
        },
        content: '../referencias/edicao.ejs',
        novo: true        
    });
})
module.exports = router
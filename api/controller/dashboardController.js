const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')
const ejs = require('ejs');


router.get('/dashboard',(req,res,next) =>{

    // res.render(path.join(__dirname,'../views/index.ejs'), {title: "oi"});
    res.render(path.join(__dirname,'../views/pedidos/cadastrar.ejs'), 
    {
        data: [
            {
                ref: 1,
                desc: 'roupinha',
                total: 10
            }
        ]
    }
    );
    
    // fs.readFile(
    //     path.join(__dirname,'../http/public/index.html'),
    //     (err, content) =>{
    //         if(err) throw err

    //         res.end(content)
    //     }
    // )
    //res.end(path.join(__dirname,'../http/public/index.html'));
    
})



module.exports = router
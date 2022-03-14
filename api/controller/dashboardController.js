const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')

router.get('/abc',(req,res,next) =>{

    fs.readFile(
        path.join(__dirname,'../http/public/index.html'),
        (err, content) =>{
            if(err) throw err

            res.end(content)
        }
    )
    //res.end(path.join(__dirname,'../http/public/index.html'));
    
})



module.exports = router
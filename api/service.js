const path = require('path')
const fs = require('fs')
const data = require('./urls.json')

module.exports.add = 
function add(obj){
    data.urls.push(obj)
    writefile(data)
    console.log('adicionado')
}

module.exports.del = 
function del(obj){
    console.log('removido');
}

function writefile(data){
    fs.writeFile(
        path.join(__dirname,'urls.json'),
        JSON.stringify(data,null,4),
        err => {
            if(err) throw err
        }
    )
}




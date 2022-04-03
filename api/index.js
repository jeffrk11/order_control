const http = require('http')
const URL = require('url')
const controller = require('./controller.js')
const service = require('./service.js')

http.createServer((req, res) => {
    console.log(URL.parse(req.url,true))
    const reqMap = (URL.parse(req.url,true).pathname).split('/').filter( e => e !== '')
    const obj = URL.parse(req.url,true).query

    requestMapping(reqMap,obj);
    return res.end('ok')
}).listen(9090, () => console.log("API no ar"))

function requestMapping(req,obj){
    console.log(req)
    switch(req[0]){
        case 'add':
            return service.add(obj)

        case 'del':
            return service.del(obj)
        default:
            return 
    }
}
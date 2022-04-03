const http = require( 'http');
//importando app
const app = require('./app')
//porta
const port = process.env.PORT || 9090;
//criando servidor
const server = http.createServer(app);
//escutando
server.listen(port);
//import REGIOES from '../enums/Regioes.js';
//import SITUACOES from '../enums/Situacoes.js';

let REGIOES = import('../enums/Regioes.js').then( module =>{REGIOES = module.default});
let SITUACOES = import('../enums/Situacoes.js').then( module =>{SITUACOES = module.default});;

//globais
let tbody = document.getElementById('tb')
let filtro_representante = document.getElementById('filtro_representante')
let filtro_cliente = document.getElementById('filtro_cliente')
let filtro_codigo = document.getElementById('filtro_id')
let filtro_regiao = document.getElementById('filtro_regiao')
let filtro_situacao = document.getElementById('filtro_situacao')
let pedidos_cop;

//page load
window.onload = function() {
    populate_select(filtro_regiao,REGIOES)
    populate_select(filtro_situacao,SITUACOES)
    pedidos_cop = pedidos
    draw_table()
}

function populate_select(select,enu){
    let dados  = (Object.keys(enu)).map( e =>  enu[e].name)
    //option vazia
    dados.forEach( txt =>{
        let option = document.createElement("option");
        option.text = txt
        select.add(option)
    })
}

function draw_table(){
    tbody.innerHTML = ''
    pedidos_cop.forEach(pedido => {
        console.log(pedido)
        //inserindo linha
        let tr = tbody.insertRow()
        //codigo
        tr.insertCell().appendChild(createCell(pedido.id))
        //representante
        tr.insertCell().appendChild(createCell(pedido.representante))
        //cliente
        tr.insertCell().appendChild(createCell(pedido.cliente))
        //situacao
        tr.insertCell().appendChild(createCell(pedido.situacao))
        //regiao
        tr.insertCell().appendChild(createCell(pedido.regiao))
        //referencias
        tr.insertCell().appendChild(createCell(pedido.referencias.length))
        //btn editar
        let div = createElement(undefined,'div','d-flex w-100 justify-content-around')
        div.appendChild(createButton('bg-secondary','fa-file-pen', 'openPedido('+pedido.id+')'))
        div.appendChild(createButton('bg-danger','fa-trash-can','deletePedido('+pedido.id+')'))
        tr.insertCell().appendChild(div)
        

        //setando posicao celulas
        for(let i = 0; i < tr.children.length; i++){
                tr.children[i].className = "align-middle"
        }
        
    });
}

function createButton(color, icon_name, onclick){
    let btn = document.createElement('button')
    btn.type = 'button'
    btn.style = 'border-style: none'
    btn.className = color + ' border-5 p-2'
    btn.setAttribute('onclick',onclick)
    //icone
    let icon = document.createElement('i')
    icon.className = icon_name+' fa-solid p-1'
    icon.style = 'color: #ffffff'

    btn.appendChild(icon)

    return btn
}

function openPedido(id){
    window.location.replace('/pedido/edicao/'+id)
}

function deletePedido(id){
    let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("/pedidos/"+id, requestOptions)
                .then(response => {
                    return {    status: response.status,
                                response: response.text()}
                })
                .then(result => {
                    //setando
                    result.response.then( val => {
                        if(result.status == 404)
                            document.getElementById('txt_mensagem_modal_aviso').innerText = JSON.parse(val).erro.mensagem;
                        if(result.status == 200 || result.status == 201)
                            document.getElementById('txt_mensagem_modal_aviso').innerText = val;
                            pedidos =  pedidos.filter(e => { return e.id != id})
                            pedidos_cop = pedidos
                            draw_table();
                    })
                })
                .catch(error => console.log('error', error));
    
}

function createCell(info){
    return document.createTextNode(info)
}

function createElement(id=null,element,className=null,innerHTML=null,type=null,child= null){
    let aux = document.createElement(element)
        aux.id = id
        aux.className = className
        aux.type = type
        aux.innerHTML = innerHTML
        if(child)
            aux.appendChild(child)
    return aux;
}

function limpar_filtro(){
    console.log('a')
    filtro_codigo.value = ''
    filtro_representante.value = ''
    filtro_cliente.value = ''
    filtro_regiao.value = 0
    filtro_situacao.value = 0
    filtro()
}

function filtro(){
    //reset 
    pedidos_cop = pedidos
    //filtro codigo
    if(filtro_codigo.value){
        pedidos_cop = pedidos_cop.filter( e=> {
            return e.id == parseInt(filtro_codigo.value)
        })
    }
    //filtro representante
    if(filtro_representante.value){
        pedidos_cop = pedidos_cop.filter( e=> {
            return  e.representante.toUpperCase().includes(filtro_representante.value.toUpperCase())
        })
    }
    //filtro cliente
    if(filtro_cliente.value){
        pedidos_cop = pedidos_cop.filter( e=> {
            return  e.cliente.toUpperCase().includes(filtro_cliente.value.toUpperCase())
        })
    }
    //filtro regiao
    if(filtro_regiao.value != 0){
        pedidos_cop = pedidos_cop.filter( e=> {
            return  e.regiao.toUpperCase().includes(filtro_regiao.value.toUpperCase())
        })
    }
    //filtro situacao
    if(filtro_situacao.value != 0){
        pedidos_cop = pedidos_cop.filter( e=> {
            console.log(e.situacao.toUpperCase().includes(filtro_situacao.value.toUpperCase()))
            return  e.situacao.toUpperCase().includes(filtro_situacao.value.toUpperCase())
        })
    }

    if(!filtro_codigo.value && !filtro_representante.value && !filtro_cliente.value && filtro_regiao.value == 0 && filtro_situacao.value == 0){
        pedidos_cop = pedidos

    }
    draw_table();
}

filtro_representante.addEventListener("keyup", event => {
    filtro()
})
filtro_cliente.addEventListener("keyup", event => {
    filtro()
})
filtro_codigo.addEventListener("keyup", event => {
    filtro()
})
filtro_regiao.addEventListener("change", event => {
    filtro()
})
filtro_situacao.addEventListener("change", event => {
    filtro()
})
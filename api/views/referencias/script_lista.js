//globais
let tbody = document.getElementById('tb')

//page load
window.onload = function() {
    draw_table()
}

function draw_table(){
    tbody.innerHTML = ''
    referencias.forEach(referencia => {
        //inserindo linha
        let tr = tbody.insertRow()
        //codigo
        tr.insertCell().appendChild(createCell(referencia.id))
        //descricao
        tr.insertCell().appendChild(createCell(referencia.descricao))
        //rn
        tr.insertCell().appendChild(createCell(referencia.tamanhos.rn || 0))
        //p
        tr.insertCell().appendChild(createCell(referencia.tamanhos.p || 0))
        //m
        tr.insertCell().appendChild(createCell(referencia.tamanhos.m || 0))
        //g
        tr.insertCell().appendChild(createCell(referencia.tamanhos.g || 0))
        //t1
        tr.insertCell().appendChild(createCell(referencia.tamanhos.t1 || 0))
        //t2
        tr.insertCell().appendChild(createCell(referencia.tamanhos.t2 || 0))
        //t3
        tr.insertCell().appendChild(createCell(referencia.tamanhos.t3 || 0))
        //btn editar
        let div = createElement(undefined,'div','d-flex w-100 justify-content-around')
        div.appendChild(createButton('bg-secondary','fa-file-pen', 'openReferencia('+referencia.id+')'))
        div.appendChild(createButton('bg-danger','fa-trash-can','deleteReferencia('+referencia.id+')'))
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

function openReferencia(id){
    window.location.replace('/pedido/edicao/'+id)
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
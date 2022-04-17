
function save_referencia(){
    referencia.id = parseInt(document.getElementById('id_referencia').value)
    referencia.descricao = document.getElementById('descricao').value
    referencia.estilo = document.getElementById('estilo').value
    referencia.tipo = document.getElementById('tipo').value
    referencia.tecido = document.getElementById('tecido').value

    if(document.getElementById('rn').value)
        referencia.tamanhos.rn = parseInt(document.getElementById('rn').value)
    if(document.getElementById('p').value)
        referencia.tamanhos.p  = parseInt(document.getElementById('p').value)
    if(document.getElementById('m').value)
        referencia.tamanhos.m  = parseInt(document.getElementById('m').value)
    if(document.getElementById('g').value)
        referencia.tamanhos.g  = parseInt(document.getElementById('g').value)
    if(document.getElementById('t1').value)
        referencia.tamanhos.t1 = parseInt(document.getElementById('t1').value)
    if(document.getElementById('t2').value)
        referencia.tamanhos.t2 = parseInt(document.getElementById('t2').value)
    if(document.getElementById('t3').value)
        referencia.tamanhos.t3 = parseInt(document.getElementById('t3').value)

    if(this.validate_referencia(referencia)){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify(referencia)

        var requestOptions = {
            method: novo ? 'POST' : 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/referencias", requestOptions)
                .then(response => {
                    return {    status: response.status,
                                response: response.text()}
                })
                .then(result => {
                    //setando
                    result.response.then( val => {
                        console.log(result.status)
                        if(result.status == 404)
                            document.getElementById('txt_mensagem_modal_aviso').innerText = JSON.parse(val).erro.mensagem;
                        if(result.status == 200 || result.status == 201)
                            document.getElementById('txt_mensagem_modal_aviso').innerText = val;
                    })
                })
                .catch(error => console.log('error', error));
    }else{
        document.getElementById('txt_mensagem_modal_aviso').innerText = "Referência invália, verifique os campos";
    }
}

//validacao salvar
function validate_referencia(referencia){
    //se algum desses campos estiverem vazios, entao false
    if( !referencia.id || !referencia.descricao || !referencia.estilo || !referencia.tipo || !referencia.tecido)
        return false
    return true
} 
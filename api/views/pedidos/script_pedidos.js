   //carregando pedidos
    // document.addEventListener('DOMContentLoaded', function() {
        
    //     axios.get('http://localhost:9090/pedidos')
    //         .then( resp => console.log(resp))
    //         .catch(error => console.log(error))
    // })

    //page load
    window.onload = function() {
        draw_table()
    }
    
    //adiciona ao json global
    function table_add_ref(){
        let txt_add_ref = document.getElementById('txt_add_ref').value || 0
        if(!txt_add_ref) window.alert('referencia invalida')
        else{
            let ref = referencias.find( e => {
                return e.id === parseInt(txt_add_ref)
            })
            if(!ref) window.alert('referencia não encontrada')
            else{
                if(pedido.referencias.find(e => {return e.id_referencia === ref.id}))
                    window.alert('referencia ja adicionada')
                else{
                    //criando modelo de referencia_pedido
                    let model ={
                        id_pedido: pedido.id,
                        id_referencia: ref.id,
                        referencia: ref,
                        tamanhos: {}
                    }
                    //adicionando tamanhos de acordo com a referencia

                    for(let key in ref.tamanhos){
                        model.tamanhos[key] = {quantidade_pedido : 0, quantidade_final : 0}
                    }
                    pedido.referencias.push(model)
                }
            }
        }
        draw_table()
    }
    //remove do json global
    function table_del_ref(ref){
        //remove do json global
        
        pedido.referencias = pedido.referencias.filter( e =>{
            return e.id_referencia !== ref
        })
        draw_table()
    }
    //desenha a tabela baseado no json
    function draw_table(){
        let tbody = document.getElementById('tb')
        tbody.innerHTML = ''
        pedido.referencias.forEach(e => {
            let tr = tbody.insertRow()
            //id referencia
            tr.insertCell().appendChild(document.createTextNode(e.id_referencia))
            //descricao
            let desc = referencias.find(r => { return r.id === e.id_referencia })
            tr.insertCell().appendChild(document.createTextNode(e.referencia.descricao))
            //qtd pedidos
            //total
            let total = 0 
            for(let key in e.tamanhos){ //loop nas chaves do objeto tamannhos
                total += e.tamanhos[key].quantidade_pedido
            }
            tr.insertCell().appendChild(document.createTextNode(total))
            let div_container = document.createElement('div')
                div_container.className = 'd-flex'
            //pedido
            let pedido = document.createElement('h4')
                pedido.className = 'm-1'
            let pedido_fin = document.createElement('h4')
            div_container.appendChild(pedido)
            div_container.appendChild(pedido_fin)
            let qtds_pedido = [div_container.cloneNode(true),
                                div_container.cloneNode(true),
                                div_container.cloneNode(true),
                                div_container.cloneNode(true),
                                div_container.cloneNode(true),
                                div_container.cloneNode(true),
                                div_container.cloneNode(true)]
            
            //rn
            let rn = e.tamanhos.rn
            qtds_pedido[0].firstChild.innerHTML = rn ? rn.quantidade_pedido : 0
            qtds_pedido[0].lastChild.innerHTML = rn ? rn.quantidade_final : 0
            tr.insertCell().appendChild(qtds_pedido[0])
            //p
            let p = e.tamanhos.p
            qtds_pedido[1].firstChild.innerHTML  = p ? p.quantidade_pedido : 0
            qtds_pedido[1].lastChild.innerHTML = p ? p.quantidade_final : 0
            tr.insertCell().appendChild(qtds_pedido[1])
            //m
            let m = e.tamanhos.m
            qtds_pedido[2].firstChild.innerHTML  = m ? m.quantidade_pedido : 0
            qtds_pedido[2].lastChild.innerHTML = m ? m.quantidade_final : 0
            tr.insertCell().appendChild(qtds_pedido[2])
            //g
            let g = e.tamanhos.g
            qtds_pedido[3].firstChild.innerHTML  = g ? g.quantidade_pedido : 0
            qtds_pedido[3].lastChild.innerHTML = g ? g.quantidade_final : 0
            tr.insertCell().appendChild(qtds_pedido[3])
            //1
            let t1 = e.tamanhos.t1
            qtds_pedido[4].firstChild.innerHTML = t1 ? t1.quantidade_pedido : 0
            qtds_pedido[4].lastChild.innerHTML = t1 ? t1.quantidade_final : 0
            tr.insertCell().appendChild(qtds_pedido[4])
            //2
            let t2 = e.tamanhos.t2
            qtds_pedido[5].firstChild.innerHTML  = t2 ? t2.quantidade_pedido : 0
            qtds_pedido[5].lastChild.innerHTML = t2 ? t2.quantidade_final : 0
            tr.insertCell().appendChild(qtds_pedido[5])
            //3
            let t3= e.tamanhos.t3
            qtds_pedido[6].firstChild.innerHTML  = t3 ? t3.quantidade_pedido : 0
            qtds_pedido[6].lastChild.innerHTML = t3 ? t3.quantidade_final : 0
            tr.insertCell().appendChild(qtds_pedido[6])

            //botao acao
                //div container
                let div_btns = document.createElement('div')
                    div_btns.className = 'd-flex justify-content-evenly'
                //btn edit
                let btn_edit = document.createElement('button')
                    btn_edit.className = 'btn btn-outline-info  m-1 p-0 w-100'
                    btn_edit.appendChild(document.createTextNode('E'))
                    btn_edit.type = 'button'
                    btn_edit.setAttribute( "onClick", "draw_modal_content("+ e.id_referencia +")" );
                    btn_edit.setAttribute("data-bs-toggle" ,"modal")
                    btn_edit.setAttribute("data-bs-target","#modal_line")
                //btn del
                let btn_del = document.createElement('button')
                    btn_del.className = 'btn btn-outline-danger  m-1 p-0 w-100'
                    btn_del.appendChild(document.createTextNode('X'))
                    btn_del.type = 'button'
                    btn_del.setAttribute( "onClick", "table_del_ref("+e.id_referencia+")" );
                    //setando tds estilos 3,4,5,6
            tr.insertCell().appendChild(div_btns)
                div_btns.appendChild(btn_edit)
                div_btns.appendChild(btn_del)
            for(let i = 0; i < tr.children.length; i++){
                if(i > 2)
                    tr.children[i].width = "10%"
            }
            
        });
    }

    function draw_modal_content(referencia){
        //objeto
        let ref = pedido.referencias.find(e => { return e.id_referencia === referencia})
        console.log(ref)
        //pegando o corpo do modal
        let modal_body = document.getElementById('modal_body')
            modal_body.innerHTML = ''
        //set onclick modal
        let btn_modal_save = document.getElementById('btn_modal_save')
            btn_modal_save.setAttribute('onclick','saveValuesModal('+referencia+')')
        //titulo
        let title = this.createElement('modal_title','div','row'); 
            title.appendChild(this.createElement('modal_title_txt','h4',undefined,ref.referencia.descricao ))
        //cabecalho tabela
        let row_cabecalho = this.createElement('row_cabecalho','div','row m-1');
        //col tamanho
        let col_tamanho = this.createElement('col_tamanho','div','col')
            col_tamanho.appendChild(this.createElement('col_tamanho_txt','h5',undefined,'Tamanho'))
        //col pedido
        let col_pedido = this.createElement('col_pedido','div','col')
            col_pedido.appendChild(this.createElement('col_pedido_txt','h5',undefined,'Pedido'))
        //col pedido final
        let col_pedido_final = this.createElement('col_pedido_final','div','col')
            col_pedido_final.appendChild(this.createElement('col_pedido_final_txt','h5',undefined,'Pedido final'))
        //tamanhos e inputs  
        //RN 
        let row_rn = this.createElement('row_rn','div','row m-1')
            row_rn.appendChild(this.createElement(undefined,'div','col-2',undefined,undefined,
                                            this.createElement('col_tamanho_txt','h5',undefined,'RN')))
            row_rn.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                            this.createElement('rn_input_pedido','input','w-75',undefined,'number')))
            row_rn.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                            this.createElement('rn_input_pedido_final','input','w-75',undefined,'number')))
        //p
        let row_p = this.createElement('row_p1','div','row m-1')
            row_p.appendChild(this.createElement(undefined,'div','col-2',undefined,undefined,
                                            this.createElement('col_tamanho_txt','h5',undefined,'P')))
            row_p.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                            this.createElement('p_input_pedido','input','w-75',undefined,'number')))
            row_p.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                            this.createElement('p_input_pedido_final','input','w-75',undefined,'number')))
        //m
        let row_m = this.createElement('row_m','div','row m-1')
            row_m.appendChild(this.createElement(undefined,'div','col-2',undefined,undefined,
                                            this.createElement('col_tamanho_txt','h5',undefined,'M')))
            row_m.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                            this.createElement('m_input_pedido','input','w-75',undefined,'number')))
            row_m.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                            this.createElement('m_input_pedido_final','input','w-75',undefined,'number')))
        //g
        let row_g = this.createElement('row_g','div','row m-1')
            row_g.appendChild(this.createElement(undefined,'div','col-2',undefined,undefined,
                                            this.createElement('col_tamanho_txt','h5',undefined,'G')))
            row_g.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                this.createElement('g_input_pedido','input','w-75',undefined,'number')))
            row_g.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                this.createElement('g_input_pedido_final','input','w-75',undefined,'number')))
        //1
            let row_t1 = this.createElement('row_t1','div','row m-1')
            row_t1.appendChild(this.createElement(undefined,'div','col-2',undefined,undefined,
                                            this.createElement('col_tamanho_txt','h5',undefined,'1')))
            row_t1.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                            this.createElement('t1_input_pedido','input','w-75',undefined,'number')))
            row_t1.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                            this.createElement('t1_input_pedido_final','input','w-75',undefined,'number')))
        //2
        let row_t2 = this.createElement('row_t2','div','row m-1')
            row_t2.appendChild(this.createElement(undefined,'div','col-2',undefined,undefined,
                                            this.createElement('col_tamanho_txt','h5',undefined,'2')))
            row_t2.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                            this.createElement('t2_input_pedido','input','w-75',undefined,'number')))
            row_t2.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                            this.createElement('t2_input_pedido_final','input','w-75',undefined,'number')))
        //3
        let row_t3 = this.createElement('row_t3','div','row m-1')
            row_t3.appendChild(this.createElement(undefined,'div','col-2',undefined,undefined,
                                            this.createElement('col_tamanho_txt','h5',undefined,'3')))
            row_t3.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                this.createElement('t3_input_pedido','input','w-75',undefined,'number')))
            row_t3.appendChild(this.createElement(undefined,'div','col-5 d-flex justify-content-end',undefined,undefined,
                                this.createElement('t3_input_pedido_final','input','w-75',undefined,'number')))

        //estrutura
        modal_body.appendChild(title)
        modal_body.appendChild(row_cabecalho)
            row_cabecalho.appendChild(col_tamanho)
            row_cabecalho.appendChild(col_pedido)
            row_cabecalho.appendChild(col_pedido_final)
        modal_body.appendChild(row_rn)
        modal_body.appendChild(row_p)
        modal_body.appendChild(row_m)
        modal_body.appendChild(row_g)
        modal_body.appendChild(row_t1)
        modal_body.appendChild(row_t2)
        modal_body.appendChild(row_t3)
        //set values
        this.setValuesModal(ref)
    }
    function setValuesModal(ref){
        //values
        console.log(ref)
        let rn_tamanho = ref.tamanhos.rn
        let p_tamanho = ref.tamanhos.p
        let m_tamanho = ref.tamanhos.m
        let g_tamanho = ref.tamanhos.g
        let t1_tamanho = ref.tamanhos.t1
        let t2_tamanho = ref.tamanhos.t2
        let t3_tamanho =ref.tamanhos.t3
        //rn
        console.log(ref)
        let rn_input_pedido = document.getElementById('rn_input_pedido')
            rn_input_pedido.value = rn_tamanho ? rn_tamanho.quantidade_pedido : 0
        let rn_input_pedido_final = document.getElementById('rn_input_pedido_final')
            rn_input_pedido_final.value =  rn_tamanho ? rn_tamanho.quantidade_final : 0
        //p
        let p_input_pedido = document.getElementById('p_input_pedido')
            p_input_pedido.value = p_tamanho ? p_tamanho.quantidade_pedido : 0
        let p_input_pedido_final = document.getElementById('p_input_pedido_final')
            p_input_pedido_final.value =  p_tamanho ? p_tamanho.quantidade_final : 0
        //m
        let m_input_pedido = document.getElementById('m_input_pedido')
            m_input_pedido.value =  m_tamanho ? m_tamanho.quantidade_pedido : 0
        let m_input_pedido_final = document.getElementById('m_input_pedido_final')
            m_input_pedido_final.value =  m_tamanho ? m_tamanho.quantidade_final : 0
        //g
        let g_input_pedido = document.getElementById('g_input_pedido')
            g_input_pedido.value =  g_tamanho ? g_tamanho.quantidade_pedido : 0
        let g_input_pedido_final = document.getElementById('g_input_pedido_final')
            g_input_pedido_final.value =  g_tamanho ? g_tamanho.quantidade_final : 0
        //1
        let t1_input_pedido = document.getElementById('t1_input_pedido')
            t1_input_pedido.value = t1_tamanho ? t1_tamanho.quantidade_pedido : 0
        let t1_input_pedido_final = document.getElementById('t1_input_pedido_final')
            t1_input_pedido_final.value =  t1_tamanho ? t1_tamanho.quantidade_final : 0
        //2
        let t2_input_pedido = document.getElementById('t2_input_pedido')
            t2_input_pedido.value =  t2_tamanho ? t2_tamanho.quantidade_pedido : 0
        let t2_input_pedido_final = document.getElementById('t2_input_pedido_final')
            t2_input_pedido_final.value =  t2_tamanho ? t2_tamanho.quantidade_final : 0
        //
        let t3_input_pedido = document.getElementById('t3_input_pedido')
            t3_input_pedido.value =  t3_tamanho ? t3_tamanho.quantidade_pedido : 0
        let t3_input_pedido_final = document.getElementById('t3_input_pedido_final')
            t3_input_pedido_final.value =  t3_tamanho ? t3_tamanho.quantidade_final : 0

    }
    function saveValuesModal(referencia){
        //values
        let rn_input_pedido = document.getElementById('rn_input_pedido')
        let rn_input_pedido_final = document.getElementById('rn_input_pedido_final')
        let p_input_pedido = document.getElementById('p_input_pedido')
        let p_input_pedido_final = document.getElementById('p_input_pedido_final')
        let m_input_pedido = document.getElementById('m_input_pedido')
        let m_input_pedido_final = document.getElementById('m_input_pedido_final')
        let g_input_pedido = document.getElementById('g_input_pedido')
        let g_input_pedido_final = document.getElementById('g_input_pedido_final')
        let t1_input_pedido = document.getElementById('t1_input_pedido')
        let t1_input_pedido_final = document.getElementById('t1_input_pedido_final')
        let t2_input_pedido = document.getElementById('t2_input_pedido')
        let t2_input_pedido_final = document.getElementById('t2_input_pedido_final')
        let t3_input_pedido = document.getElementById('t3_input_pedido')
        let t3_input_pedido_final = document.getElementById('t3_input_pedido_final')

        let ref = pedido.referencias.find(e=>{ return e.id_referencia === referencia})
        //limpando os tamanhos
        ref.tamanhos = {}
        //set values in ref, se existir
        if(rn_input_pedido.value > 0 || rn_input_pedido_final.value > 0){
            ref.tamanhos.rn = {quantidade_pedido : rn_input_pedido.value,
                                quantidade_final : rn_input_pedido_final.value}
        }
        if(p_input_pedido.value > 0 || p_input_pedido_final.value > 0){
            ref.tamanhos.p =  {quantidade_pedido : p_input_pedido.value,
                                quantidade_final : p_input_pedido_final.value}
        }
        if(m_input_pedido.value > 0 || m_input_pedido_final.value > 0){
            ref.tamanhos.m =  {quantidade_pedido : m_input_pedido.value,
                                quantidade_final : m_input_pedido_final.value}
        }
        if(g_input_pedido.value > 0 || g_input_pedido_final.value > 0){
            ref.tamanhos.g =  {quantidade_pedido : g_input_pedido.value,
                                quantidade_final : g_input_pedido_final.value}
        }
        if(t1_input_pedido.value > 0 || t1_input_pedido_final.value > 0){
            ref.tamanhos.t1 =  {quantidade_pedido:  t1_input_pedido.value,
                                quantidade_final : t1_input_pedido_final.value}
        }
        if(t2_input_pedido.value > 0 || t2_input_pedido_final.value > 0){
            ref.tamanhos.t2 =  {quantidade_pedido :  t2_input_pedido.value,
                                quantidade_final  : t2_input_pedido_final.value}
        }
        if(t3_input_pedido.value > 0 || t3_input_pedido_final.value > 0){
            ref.tamanhos.t3 =  {quantidade_pedido:  t3_input_pedido.value,
                                quantidade_final : t3_input_pedido_final.value}
        }
        draw_table();
    }
    function createElement(id,element,className=null,innerHTML=null,type=null,child= null){
        let aux = document.createElement(element)
            aux.id = id
            aux.className = className
            aux.type = type
            aux.innerHTML = innerHTML
            if(child)
                aux.appendChild(child)
        return aux;
    }

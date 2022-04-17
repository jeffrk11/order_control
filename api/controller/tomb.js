let referencias = require('./referencias')



module.exports = {
    tombar: function(){
        let aux = []

        referencias.forEach( txt =>{
            let modelo = {
                "id": 2
                // "descricao": "Body M/L Suedine P/G C/ Termo",
                // "tipo": "BODY",
                // "estilo": "TERMO",
                // "tecido": "SUEDINE",
                // "tamanhos": {
                //     "p": 10,
                //     "m": 10,
                //     "g": 10
                // }
            }
            modelo.id = parseInt(txt.substring(0,3))
            modelo.descricao = txt.substring(4)

            let tipos = ["CONJUNTO","CONJ","MIJÃO","SHORT","MACACÃO","BODY","CAMISETA","REGATA","SHORTS","PIJAMA","CALÇA"]
            let tecidos =["MALHA","RIBANA","PLUSH","SOFT","SUED","SUEDINE","RIB","MOLETINHO"]

            let tamanhos = ["P/G","1/3","RN/G"]
            
            modelo.tipo = tipos.find( e=> { 
                return  txt.toUpperCase().includes(e) 
            }) 
            modelo.tecido = tecidos.find( e=> { 
                return  txt.toUpperCase().includes(e) 
            }) || "OUTROS"

            modelo.tamanhos = tamanhos.find( e=> { 
                return (txt.toUpperCase().includes(e))

            })
            

            txt = txt.toUpperCase().replace(modelo.tipo,"")
            txt = txt.toUpperCase().replace(modelo.tecido,"")
            txt = txt.toUpperCase().replace(modelo.tamanhos,"")
            modelo.estilo = txt.toUpperCase().substring(4)

            aux.push(modelo);
        })
        return aux
    }
}
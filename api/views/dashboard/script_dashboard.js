import REGIOES from '../enums/Regioes.js';
import SITUCOES from '../enums/Situacoes.js';


const regioes_labels = (Object.keys(REGIOES)).map( e =>  REGIOES[e].name)
//const regioes_data =
const regioes_data  = Object.keys(REGIOES).map(e => { 
    return parseInt(pedidos.filter( ped => ped.regiao == e.replace('_','-')).length)
})

const situacoes_labels = (Object.keys(SITUCOES)).map( e =>  SITUCOES[e].name)
//const regioes_data =
const situacoes_data  = Object.keys(SITUCOES).map(e => { 
    return parseInt(pedidos.filter( ped => ped.situacao == e).length)
})

console.log(situacoes_labels)
console.log(situacoes_data)
//graficos
//option card pedido regiao
new Chart(document.getElementById('ctx_pedidos_regiao').getContext('2d'),{
    type: 'bar',
    data: {
        labels: regioes_labels,
        datasets: [{
            label: 'Pedidos por região',
            data: regioes_data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ]
        }],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Região dos Pedidos'
                }
            }
        }
    }
})

new Chart(document.getElementById('ctx_pedidos_situacao').getContext('2d'),{
    type: 'pie',
    data: {
        labels: situacoes_labels,
        datasets: [
            {
            label: 'Dataset 1',
            data: situacoes_data,
            backgroundColor: [
                'rgba(2, 254, 0, 0.4)',
                'rgba(254, 254, 0, 0.4)',
                'rgba(255, 0, 0, 0.4)'
            ]
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'situação dos Pedidos'
        }
        }
    }
})

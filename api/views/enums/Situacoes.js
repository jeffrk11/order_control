export default class Situacao {
    static aprovada = new Situacao('Aprovado');
    static pendente = new Situacao('Pendente');
    static cancelado = new Situacao('Cancelado');
    constructor(name){
        this.name = name
    }
}
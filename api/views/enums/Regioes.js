export default class Regioes {
    static centro_oeste = new Regioes('Centro-Oeste');
    static sudeste = new Regioes('Sudeste');
    static norte = new Regioes('Norte');
    static sul = new Regioes('Sul');
    static nordeste = new Regioes('Nordeste');

    constructor(name){
        this.name = name
    }
}
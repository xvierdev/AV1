import TipoAeronave from "../enums/TipoAeronave";

class Aviao {
    private codigo: number;
    private modelo: TipoAeronave;
    private tipo: string;
    private capacidade: number;
    private alcance: number;
    constructor(codigo: number, modelo: TipoAeronave, tipo: string, capacidade: number, alcance: number) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }
    public detalhes() {
        return `Código: ${this.codigo}\n` +
        `Modelo: ${this.modelo}\n` +
        `Tipo: ${this.tipo}\n` +
        `Capacidade: ${this.capacidade}\n` +
        `Alcance: ${this.alcance}`
    }
}


// Teste de funcionamento
let aviao = new Aviao(1, TipoAeronave.Comercial, 'teco-teco', 2, 4000);
console.log(aviao.detalhes());
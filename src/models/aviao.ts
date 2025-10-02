const enum Modelo{
    Comercial = "COMERCIAL",
    Militar = "MILITAR"
}

class Aviao {
    private codigo: number;
    private modelo: Modelo;
    private tipo: string;
    private capacidade: number;
    private alcance: number;
    constructor(codigo: number, modelo: Modelo, tipo: string, capacidade: number, alcance: number) {
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
let aviao = new Aviao(1, Modelo.Comercial, 'teco-teco', 2, 4000);
console.log(aviao.detalhes());
import TipoAeronave from "../enums/TipoAeronave";

class Aeronave {
    private codigo: number
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
    public salvar() {
        // Lógica para salvar a aeronave no arquivo de texto
    }
    public carregar() {
        // Lógica para carregar a aeronave do arquivo de texto
    }
}

export default Aeronave;
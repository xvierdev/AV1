class Endereco {
    rua: string;
    numero: number;
    cidade: string;
    estado: string;
    cep: string;
    pais: string;

    constructor(rua: string, numero: number, cidade: string, estado: string, cep: string, pais: string) {
        this.rua = rua;
        this.numero = numero;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.pais = pais;
    }
}

export default Endereco;
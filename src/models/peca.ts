import Status from "../enums/StatusPeca";
import Tipo from "../enums/TipoPeca";

class Peca {
    private nome: string;
    private tipo: Tipo;
    private fornecedor: string;
    private status: Status;
    constructor(nome: string, tipo: Tipo, fornecedor: string, status: Status) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    public SetStatus(newStatus: Status) {
        this.status = newStatus;
    }
}

let peça = new Peca('repinboca', Tipo.Nacional, 'desmanche', Status.Transporte);
peça.SetStatus(Status.ProntoParaUso)
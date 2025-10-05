import { StatusPeca } from "../enums/StatusPeca";
import { Tipo } from "../enums/TipoPeca";

export class Peca {
    nome: string;
    tipo: Tipo;
    fornecedor: string;
    status: StatusPeca;
    constructor(nome: string, tipo: Tipo, fornecedor: string, status: StatusPeca) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    public AtualizarStatus(novoStatus: StatusPeca) {
        this.status = novoStatus;
    }
}
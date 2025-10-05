import { StatusPeca } from "../enums/StatusPeca";
import { Tipo } from "../enums/TipoPeca";

export class Peca {
    constructor(
        public nome: string,
        public tipo: Tipo,
        public fornecedor: string,
        public status: StatusPeca,
    ) { }

    // Altera o status atual da peça.
    public AtualizarStatus(novoStatus: StatusPeca) {
        this.status = novoStatus;
    }
}
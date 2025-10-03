import StatusPeca from "../enums/StatusPeca";
import Tipo from "../enums/TipoPeca";

class Peca {
    private nome: string;
    private tipo: Tipo;
    private fornecedor: string;
    private status: StatusPeca;
    constructor(nome: string, tipo: Tipo, fornecedor: string, status: StatusPeca) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    public AtualizarStatus(novoStatus: StatusPeca) {
        this.status = novoStatus;
    }
    public salvar() {
        // Lógica para salvar a peça no arquivo de texto
    }
    public carregar() {
        // Lógica para carregar a peça do arquivo de texto
    }
}

export default Peca;
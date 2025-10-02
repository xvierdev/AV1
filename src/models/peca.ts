enum Tipo {
    Nacional = "Nacional",
    Importado = "Importado"
}

enum Status {
    Producao = "EM_PRODUÇÃO",
    Transporte = "EM_TRANSPORTE",
    ProntoParaUso = "PRONTA_PARA_USO"    
}

class Peca {
    private nome: string;
    private tipo: Tipo;
    private fornecedor: string;
    private status: Status;
    constructor(nome: string, tipo: Tipo, fornecedor: string, status:Status){
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    public SetStatus(newStatus: Status){
        this.status = newStatus;
    }
}

let peça = new Peca('repinboca', Tipo.Nacional, 'desmanche', Status.Transporte);
peça.SetStatus(Status.ProntoParaUso)
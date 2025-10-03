class Funcionario {
    private id: number;
    private nome: string;
    private telefone: string;
    private endereco: string;
    private usuario: string;
    private senha: string;
    private nivelPermissao: string;
    constructor(id: number, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: string) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelPermissao = nivelPermissao;
    }
}
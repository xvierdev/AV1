import Telefone from "./Telefone";
import Endereco from "./Endereco";
import NivelPermissao from "../enums/NivelPermissao";

class Funcionario {
    id: number;
    nome: string;
    telefone: Telefone;
    endereco: Endereco;
    usuario: string;
    senha: string;
    nivelPermissao: NivelPermissao;
    constructor(id: number, nome: string, telefone: Telefone, endereco: Endereco, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelPermissao = nivelPermissao;
    }
    public autenticar(usuario: string, senha: string): boolean {
        return this.usuario === usuario && this.senha === senha;
    }
    public salvar(): void {
        console.log(`Funcionário ${this.nome} salvo com sucesso.`);
        // TODO: Implementar lógica de salvamento em arquivo de texto
    }
    public carregar(id: number) {
        // TODO: Implementar lógica de carregamento de arquivo de texto
        console.log(`Carregando funcionário com ID ${id}...`);
        return null;
    }
}

export default Funcionario;
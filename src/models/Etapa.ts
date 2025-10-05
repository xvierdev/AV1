import { Funcionario } from "./Funcionario";
import { StatusEtapa } from "../enums/StatusEtapa";

export class Etapa {
    nome: string;
    prazo: string
    status: StatusEtapa;
    funcionarios: Array<Funcionario>;

    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Array<Funcionario>) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = status;
        this.funcionarios = funcionarios;
    }
    public inicializar() {
        this.status = StatusEtapa.Andamento;
    }
    public finalizar() {
        this.status = StatusEtapa.Concluida;
    }
    public associarFuncionario(funcionario: Funcionario) {
        this.funcionarios.push(funcionario);
    }
    public listarFuncionarios() {
        return this.funcionarios.map(funcionario => funcionario.nome).join(", ");
    }
}
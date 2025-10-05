import { Funcionario } from "./Funcionario";
import { StatusEtapa } from "../enums/StatusEtapa";

export class Etapa {
    constructor(
        public nome: string,
        public prazo: string,
        public status: StatusEtapa,
        public funcionarios: Array<Funcionario>,
    ) { }

    // Altera o status da etapa para "ANDAMENTO".
    public inicializar() {
        this.status = StatusEtapa.Andamento;
    }

    // Altera o status da etapa para "CONCLUIDA".
    public finalizar() {
        this.status = StatusEtapa.Concluida;
    }

    // Adiciona um funcionário ao array de funcionários da etapa.
    public associarFuncionario(funcionario: Funcionario) {
        this.funcionarios.push(funcionario);
    }

    // Retorna uma string com os nomes dos funcionários associados.
    public listarFuncionarios() {
        return this.funcionarios.map(funcionario => funcionario.nome).join(", ");
    }
}
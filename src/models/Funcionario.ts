import { Telefone } from "./Telefone";
import { Endereco } from "./Endereco";
import { NivelPermissao } from "../enums/NivelPermissao";

export class Funcionario {
    constructor(
        public id: number,
        public nome: string,
        public telefone: Telefone,
        public endereco: Endereco,
        public usuario: string,
        public senha: string,
        public nivelPermissao: NivelPermissao,
    ) { }
}
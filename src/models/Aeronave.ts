import { TipoAeronave } from "../enums/TipoAeronave";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";

export class Aeronave {
    constructor(
        public codigo: number,
        public modelo: TipoAeronave,
        public tipo: string,
        public capacidade: number,
        public alcance: number,
        public pecas: Peca[] = [],
        public etapas: Etapa[] = [],
    ) { }
    public detalhes() {
        return `Código: ${this.codigo}\n` +
            `Modelo: ${this.modelo}\n` +
            `Tipo: ${this.tipo}\n` +
            `Capacidade: ${this.capacidade}\n` +
            `Alcance: ${this.alcance}`
    }
}
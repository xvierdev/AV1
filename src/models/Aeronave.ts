// src/models/Aeronave.ts
import { TipoAeronave } from "../enums/TipoAeronave";
import { Peca } from "./Peca";
import { Etapa } from "./Etapa";
import { Teste } from "./Teste";
export class Aeronave {
    constructor(
        public codigo: number,
        public modelo: TipoAeronave,
        public tipo: string,
        public capacidade: number,
        public alcance: number,
        public pecas: Peca[] = [],
        public etapas: Etapa[] = [],
        public testes: Teste[] = [],
    ) { }

    // Retorna uma string formatada com os detalhes da aeronave.
    public detalhes() {
        return `Código: ${this.codigo}\n` +
            `Modelo: ${this.modelo}\n` +
            `Tipo: ${this.tipo}\n` +
            `Capacidade: ${this.capacidade}\n` +
            `Alcance: ${this.alcance}`;
    }
}
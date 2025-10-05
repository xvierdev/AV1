import { ResultadoTeste } from "../enums/ResultadoTeste";
import { TipoTeste } from "../enums/TipoTeste";

export class Teste {
    constructor(
        public tipo: TipoTeste,
        public resultado: ResultadoTeste,
    ) { }
}
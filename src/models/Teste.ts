import { ResultadoTeste } from "../enums/ResultadoTeste";
import { TipoTeste } from "../enums/TipoTeste";

export class Teste {
    tipo: TipoTeste;
    resultado: ResultadoTeste;
    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this.tipo = tipo;
        this.resultado = resultado;
    }
    public salvar() {
        // Lógica para salvar o teste no arquivo de texto
    }
    public carregar() {
        // Lógica para carregar o teste do arquivo de texto
    }
}
export class Endereco {
    constructor(
        public rua: string,
        public numero: number,
        public bairro: string,
        public cidade: string,
        public estado: string,
        public cep: string,
        public pais: string,
    ) { }
}
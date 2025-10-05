import * as readlineSync from 'readline-sync';
import { Teste } from '../models/Teste';
import { TipoTeste } from '../enums/TipoTeste';
import { ResultadoTeste } from '../enums/ResultadoTeste';
import { AppState } from '../App';

// Controla o menu de gerenciamento de testes.
export function menuTestes(state: AppState): void {
    if (!state.aeronaveAtual) return;

    let escolha: string;
    do {
        console.log(`\n--- Gerenciamento de Testes da Aeronave ${state.aeronaveAtual.codigo} ---`);
        console.log(`Total de testes registrados: ${state.aeronaveAtual.testes.length}`);
        console.log('1. Listar Testes');
        console.log('2. Adicionar Teste');
        console.log('3. Alterar Resultado de um Teste');
        console.log('4. Remover Teste');
        console.log('5. Voltar ao Menu Anterior');

        escolha = readlineSync.question('Digite o numero da sua escolha: ').trim();

        switch (escolha) {
            case '1': listarTestes(state); break;
            case '2': adicionarTeste(state); break;
            case '3': alterarResultadoTeste(state); break;
            case '4': removerTeste(state); break;
            case '5': console.log('\nVoltando...'); return;
            default: console.log(`\nOpcao invalida.`);
        }
    } while (true);
}

// Mostra a lista de testes da aeronave atual.
function listarTestes(state: AppState): void {
    if (!state.aeronaveAtual || state.aeronaveAtual.testes.length === 0) {
        console.log('\nNenhum teste registrado para esta aeronave.');
        return;
    }
    console.log('\n--- Lista de Testes Registrados ---');
    state.aeronaveAtual.testes.forEach((teste, index) => {
        console.log(`[${index + 1}] Tipo: ${teste.tipo} | Resultado: ${teste.resultado}`);
    });
}

// Coleta dados para adicionar um novo teste.
function adicionarTeste(state: AppState): void {
    if (!state.aeronaveAtual) return;

    console.log('\n--- Adicionar Novo Teste ---');
    console.log(`1: ${TipoTeste.Aerodinamico}`);
    console.log(`2: ${TipoTeste.Eletrico}`);
    console.log(`3: ${TipoTeste.Hidraulico}`);
    const tipoInput = readlineSync.question('Selecione o tipo de teste: ').trim();

    let tipo: TipoTeste;
    switch (tipoInput) {
        case '1': tipo = TipoTeste.Aerodinamico; break;
        case '2': tipo = TipoTeste.Eletrico; break;
        case '3': tipo = TipoTeste.Hidraulico; break;
        default: console.log("\nTipo de teste invalido."); return;
    }

    const novoTeste = new Teste(tipo, ResultadoTeste.REPROVADO);
    state.aeronaveAtual.testes.push(novoTeste);

    console.log(`\nTeste do tipo "${tipo}" adicionado com sucesso.`);
}

// Altera o resultado de um teste (Aprovado/Reprovado).
function alterarResultadoTeste(state: AppState): void {
    listarTestes(state);
    if (!state.aeronaveAtual || state.aeronaveAtual.testes.length === 0) return;

    const index = parseInt(readlineSync.question('Digite o numero do teste que deseja alterar: ').trim(), 10) - 1;

    if (isNaN(index) || index < 0 || index >= state.aeronaveAtual.testes.length) {
        console.log('\nNumero invalido.');
        return;
    }

    console.log(`\nSelecione o novo resultado:`);
    console.log(`1: ${ResultadoTeste.APROVADO}`);
    console.log(`2: ${ResultadoTeste.REPROVADO}`);
    const resultadoInput = readlineSync.question('Digite o novo resultado: ').trim();

    let novoResultado: ResultadoTeste;
    switch (resultadoInput) {
        case '1': novoResultado = ResultadoTeste.APROVADO; break;
        case '2': novoResultado = ResultadoTeste.REPROVADO; break;
        default: console.log("\nResultado invalido."); return;
    }

    state.aeronaveAtual.testes[index].resultado = novoResultado;
    console.log(`\nResultado do teste atualizado com sucesso.`);
}

// Remove um teste da lista.
function removerTeste(state: AppState): void {
    listarTestes(state);
    if (!state.aeronaveAtual || state.aeronaveAtual.testes.length === 0) return;

    const index = parseInt(readlineSync.question('Digite o numero do teste que deseja remover: ').trim(), 10) - 1;

    if (isNaN(index) || index < 0 || index >= state.aeronaveAtual.testes.length) {
        console.log('\nNumero invalido.');
        return;
    }

    const testeRemovido = state.aeronaveAtual.testes.splice(index, 1);
    console.log(`\nTeste do tipo "${testeRemovido[0].tipo}" removido com sucesso.`);
}
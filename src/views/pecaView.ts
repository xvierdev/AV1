import * as readlineSync from 'readline-sync';
import { Peca } from '../models/Peca';
import { Tipo } from '../enums/TipoPeca';
import { StatusPeca } from '../enums/StatusPeca';
import { AppState } from '../App';

// Controla o menu de gerenciamento de peças.
export function menuPecas(state: AppState): void {
    if (!state.aeronaveAtual) return;

    let escolha: string;
    do {
        exibirMenuPecas(state);
        escolha = readlineSync.question('Digite o numero da sua escolha: ').trim();

        switch (escolha) {
            case '1': adicionarPeca(state); break;
            case '2': listarPecas(state); break;
            case '3': removerPeca(state); break;
            case '4': atualizarStatusPeca(state); break;
            case '5': return;
            default: console.log(`\nOpcao invalida.`);
        }
    } while (true);
}

// Exibe as opções do menu de peças.
function exibirMenuPecas(state: AppState): void {
    console.log(`\n--- Gerenciamento de Pecas da Aeronave ${state.aeronaveAtual?.codigo} ---`);
    console.log(`Total de pecas: ${state.aeronaveAtual?.pecas.length}`);
    console.log('1. Adicionar Peca');
    console.log('2. Listar Pecas');
    console.log('3. Remover Peca');
    console.log('4. Atualizar Status de Peca');
    console.log('5. Voltar ao Menu Anterior');
}

// Mostra a lista de peças da aeronave atual.
function listarPecas(state: AppState): void {
    if (!state.aeronaveAtual || state.aeronaveAtual.pecas.length === 0) {
        console.log('\nNenhuma peca cadastrada para esta aeronave.');
        return;
    }
    console.log('\n--- Lista de Pecas ---');
    state.aeronaveAtual.pecas.forEach((peca, index) => {
        console.log(`[${index + 1}] Nome: ${peca.nome} | Tipo: ${peca.tipo} | Status: ${peca.status}`);
    });
}

// Coleta dados para adicionar uma nova peça.
function adicionarPeca(state: AppState): void {
    if (!state.aeronaveAtual) return;

    const nome = readlineSync.question('Nome da Peca: ').trim();
    const fornecedor = readlineSync.question('Fornecedor: ').trim();
    const tipoInput = readlineSync.question('Tipo (1: Nacional, 2: Importado): ').trim();
    const tipo = tipoInput === '2' ? Tipo.Importado : Tipo.Nacional;

    const statusInput = readlineSync.question('Status (1: Em Producao, 2: Em Transporte, 3: Pronta): ').trim();
    let status = StatusPeca.Producao;
    if (statusInput === '2') status = StatusPeca.Transporte;
    if (statusInput === '3') status = StatusPeca.Pronta;

    state.aeronaveAtual.pecas.push(new Peca(nome, tipo, fornecedor, status));
    console.log(`\nPeca "${nome}" adicionada com sucesso!`);
}

// Remove uma peça da lista.
function removerPeca(state: AppState): void {
    listarPecas(state);
    if (!state.aeronaveAtual || state.aeronaveAtual.pecas.length === 0) return;

    const index = parseInt(readlineSync.question('Digite o numero da peca para remover: ').trim(), 10) - 1;

    if (isNaN(index) || index < 0 || index >= state.aeronaveAtual.pecas.length) {
        console.log('\nNumero invalido.');
        return;
    }
    const pecaRemovida = state.aeronaveAtual.pecas.splice(index, 1);
    console.log(`\nPeca "${pecaRemovida[0].nome}" removida com sucesso.`);
}

// Altera o status de uma peça específica.
function atualizarStatusPeca(state: AppState): void {
    listarPecas(state);
    if (!state.aeronaveAtual || state.aeronaveAtual.pecas.length === 0) return;

    const index = parseInt(readlineSync.question('Digite o numero da peca para atualizar: ').trim(), 10) - 1;

    if (isNaN(index) || index < 0 || index >= state.aeronaveAtual.pecas.length) {
        console.log('\nNumero invalido.');
        return;
    }

    const peca = state.aeronaveAtual.pecas[index];
    console.log('\nSelecione o novo status: 1: EM_PRODUCAO, 2: EM_TRANSPORTE, 3: PRONTA');
    const statusInput = readlineSync.question('Digite o numero do novo status: ').trim();

    let novoStatus: StatusPeca | null = null;
    if (statusInput === '1') novoStatus = StatusPeca.Producao;
    if (statusInput === '2') novoStatus = StatusPeca.Transporte;
    if (statusInput === '3') novoStatus = StatusPeca.Pronta;

    if (novoStatus) {
        peca.AtualizarStatus(novoStatus);
        console.log(`\nStatus da peca "${peca.nome}" atualizado para "${novoStatus}".`);
    } else {
        console.log('\nOpcao de status invalida.');
    }
}
import * as readlineSync from 'readline-sync';
import { Etapa } from '../models/Etapa';
import { StatusEtapa } from '../enums/StatusEtapa';
import { AppState } from '../App';
import { listarFuncionarios } from './funcionarioView';

export function menuEtapas(state: AppState): void {
    if (!state.aeronaveAtual) return;

    let escolha: string;
    do {
        exibirMenuEtapas(state);
        escolha = readlineSync.question('Digite o numero da sua escolha: ').trim();

        switch (escolha) {
            case '1': adicionarEtapa(state); break;
            case '2': listarEtapas(state); break;
            case '3': mudarStatusEtapa(state); break;
            case '4': associarFuncionarioAEtapa(state); break;
            case '5': listarFuncionariosDeEtapa(state); break;
            case '6': return;
            default: console.log(`\nOpcao invalida.`);
        }
    } while (true);
}

function exibirMenuEtapas(state: AppState): void {
    console.log(`\n--- Gerenciamento de Etapas da Aeronave ${state.aeronaveAtual?.codigo} ---`);
    console.log(`Total de etapas: ${state.aeronaveAtual?.etapas.length}`);
    console.log('1. Adicionar Etapa');
    console.log('2. Listar Etapas');
    console.log('3. Mudar Status de Etapa');
    console.log('4. Associar Funcionario a Etapa');
    console.log('5. Listar Funcionarios de uma Etapa');
    console.log('6. Voltar ao Menu Anterior');
}

function listarEtapas(state: AppState): void {
    if (!state.aeronaveAtual || state.aeronaveAtual.etapas.length === 0) {
        console.log('\nNenhuma etapa cadastrada.');
        return;
    }
    console.log('\n--- Lista de Etapas de Producao ---');
    state.aeronaveAtual.etapas.forEach((etapa, index) => {
        console.log(`[${index + 1}] ${etapa.nome} - Status: ${etapa.status}`);
    });
}

function adicionarEtapa(state: AppState): void {
    if (!state.aeronaveAtual) return;

    const nome = readlineSync.question('Nome da Etapa: ').trim();
    const prazo = readlineSync.question('Prazo (Ex: 15 dias): ').trim();

    state.aeronaveAtual.etapas.push(new Etapa(nome, prazo, StatusEtapa.Pendente, []));
    console.log(`\nEtapa "${nome}" adicionada com sucesso!`);
}

function mudarStatusEtapa(state: AppState): void {
    listarEtapas(state);
    if (!state.aeronaveAtual || state.aeronaveAtual.etapas.length === 0) return;

    const index = parseInt(readlineSync.question('Digite o numero da etapa: ').trim(), 10) - 1;

    if (isNaN(index) || index < 0 || index >= state.aeronaveAtual.etapas.length) {
        console.log('\nNumero invalido.');
        return;
    }

    const etapa = state.aeronaveAtual.etapas[index];
    console.log(`\nStatus atual de "${etapa.nome}": ${etapa.status}`);

    if (etapa.status === StatusEtapa.Concluida) {
        console.log("\nEsta etapa ja foi concluida.");
        return;
    }

    if (etapa.status === StatusEtapa.Andamento) {
        if (readlineSync.keyInYN('Deseja finalizar esta etapa?')) {
            etapa.finalizar();
            console.log(`\nEtapa "${etapa.nome}" finalizada.`);
        }
    } else if (etapa.status === StatusEtapa.Pendente) {
        if (readlineSync.keyInYN('Deseja iniciar esta etapa?')) {
            const emAndamento = state.aeronaveAtual.etapas.some(e => e.status === StatusEtapa.Andamento);
            if (emAndamento) {
                console.log("\nErro: Ja existe outra etapa em andamento.");
                return;
            }
            if (index > 0 && state.aeronaveAtual.etapas[index - 1].status !== StatusEtapa.Concluida) {
                console.log("\nErro: A etapa anterior ainda nao foi concluida.");
                return;
            }
            etapa.inicializar();
            console.log(`\nEtapa "${etapa.nome}" iniciada.`);
        }
    }
}

function associarFuncionarioAEtapa(state: AppState): void {
    if (state.funcionarios.length === 0) {
        console.log("\nPrimeiro cadastre um funcionario no menu principal.");
        return;
    }

    listarEtapas(state);
    if (!state.aeronaveAtual || state.aeronaveAtual.etapas.length === 0) return;

    const etapaIndex = parseInt(readlineSync.question('Digite o numero da etapa: ').trim(), 10) - 1;
    if (isNaN(etapaIndex) || etapaIndex < 0 || etapaIndex >= state.aeronaveAtual.etapas.length) {
        console.log('\nNumero de etapa invalido.');
        return;
    }

    listarFuncionarios(state.funcionarios);
    const funcId = parseInt(readlineSync.question('Digite o ID do funcionario para associar: ').trim(), 10);
    const funcionario = state.funcionarios.find(f => f.id === funcId);

    if (!funcionario) {
        console.log(`\nFuncionario nao encontrado.`);
        return;
    }

    const etapa = state.aeronaveAtual.etapas[etapaIndex];
    if (etapa.funcionarios.some(f => f.id === funcionario.id)) {
        console.log(`\nErro: Funcionario ja associado a esta etapa.`);
        return;
    }

    etapa.associarFuncionario(funcionario);
    console.log(`\nFuncionario ${funcionario.nome} associado a etapa "${etapa.nome}".`);
}

function listarFuncionariosDeEtapa(state: AppState): void {
    listarEtapas(state);
    if (!state.aeronaveAtual || state.aeronaveAtual.etapas.length === 0) return;

    const etapaIndex = parseInt(readlineSync.question('Digite o numero da etapa: ').trim(), 10) - 1;
    if (isNaN(etapaIndex) || etapaIndex < 0 || etapaIndex >= state.aeronaveAtual.etapas.length) {
        console.log('\nNumero de etapa invalido.');
        return;
    }

    const etapa = state.aeronaveAtual.etapas[etapaIndex];
    if (etapa.funcionarios.length === 0) {
        console.log(`\nNenhum funcionario associado a etapa "${etapa.nome}".`);
    } else {
        console.log(`\n--- Funcionarios da Etapa: ${etapa.nome} ---`);
        etapa.funcionarios.forEach(f => console.log(`- ${f.nome} (${f.nivelPermissao})`));
    }
}
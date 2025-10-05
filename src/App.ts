import * as readlineSync from 'readline-sync';
import { Aeronave } from "./models/Aeronave";
import { Funcionario } from './models/Funcionario';
import { TipoAeronave } from "./enums/TipoAeronave";
import { menuFuncionario } from './views/funcionarioView';
import { menuGerenciamentoAeronave } from './views/gerenciamentoAeronaveView';

export interface AppState {
    aeronaveAtual: Aeronave | null;
    proximoCodigoAeronave: number;
    funcionarios: Funcionario[];
    proximoIdFuncionario: number;
}

const state: AppState = {
    aeronaveAtual: null,
    proximoCodigoAeronave: 1,
    funcionarios: [],
    proximoIdFuncionario: 1
};

function exibirMenuPrincipal(): void {
    console.log('\n--- Menu Principal ---');
    if (state.aeronaveAtual) {
        console.log(`[STATUS] Aeronave Carregada: Codigo ${state.aeronaveAtual.codigo}`);
    } else {
        console.log('[STATUS] Nenhuma Aeronave Carregada');
    }
    console.log('1. Gerenciar Funcionarios');
    console.log('2. Iniciar novo projeto de aeronave');
    console.log('3. Carregar aeronave existente');
    console.log('4. Gerenciar Aeronave Atual');
    console.log('5. Sair');
}

function menuCriarAeronave(): void {
    console.log('\n--- Novo Projeto de Aeronave ---');
    console.log(`[CODIGO AUTOMATICO] ${state.proximoCodigoAeronave}`);

    const modeloInput = readlineSync.question('Modelo (1: Comercial, 2: Militar): ').trim();
    const modelo = modeloInput === '2' ? TipoAeronave.Militar : TipoAeronave.Comercial;

    const tipo = readlineSync.question('Tipo (Ex: Airbus A320): ').trim();
    const capacidade = parseInt(readlineSync.question('Capacidade de Passageiros: ').trim(), 10) || 0;
    const alcance = parseInt(readlineSync.question('Alcance (Km): ').trim(), 10) || 0;

    state.aeronaveAtual = new Aeronave(state.proximoCodigoAeronave, modelo, tipo, capacidade, alcance);
    state.proximoCodigoAeronave++;

    console.log('\nNova Aeronave Criada com Sucesso!');
    console.log(state.aeronaveAtual.detalhes());
}

function solicitarEscolhaPrincipal(): void {
    let escolha: string;

    do {
        exibirMenuPrincipal();
        escolha = readlineSync.question('Digite o numero da sua escolha: ').trim();

        switch (escolha) {
            case '1':
                menuFuncionario(state);
                break;
            case '2':
                menuCriarAeronave();
                break;
            case '3':
                console.log('\n[Opcao 3] O carregamento sera implementado em breve.');
                break;
            case '4':
                if (state.aeronaveAtual) {
                    menuGerenciamentoAeronave(state);
                } else {
                    console.log('\nErro: Nenhuma aeronave carregada.');
                }
                break;
            case '5':
                console.log('\nSaindo do programa...');
                return;
            default:
                console.log(`\nOpcao invalida.`);
        }
    } while (true);
}

solicitarEscolhaPrincipal();
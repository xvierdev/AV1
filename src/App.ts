import * as readlineSync from 'readline-sync';
import { Aeronave } from "./models/Aeronave";
import { Funcionario } from './models/Funcionario';
import { TipoAeronave } from "./enums/TipoAeronave";
import { menuFuncionario } from './views/funcionarioView';
import { menuGerenciamentoAeronave } from './views/gerenciamentoAeronaveView';
import { saveState, loadState } from './services/persistenceService';

// Estrutura do objeto de estado central
export interface AppState {
    aeronaveAtual: Aeronave | null;
    proximoCodigoAeronave: number;
    funcionarios: Funcionario[];
    proximoIdFuncionario: number;
}

// Carregar dados no arquivo database.json ao iniciar
let state: AppState = loadState();

function exibirMenuPrincipal(): void {
    console.log('\n--- Menu Principal ---');
    if (state.aeronaveAtual) {
        console.log(`[STATUS] Aeronave Carregada: Codigo ${state.aeronaveAtual.codigo}`);
    } else {
        console.log('[STATUS] Nenhuma Aeronave Carregada');
    }
    console.log('1. Gerenciar Funcionarios');
    console.log('2. Iniciar novo projeto de aeronave');
    console.log('3. Gerenciar Aeronave Atual');
    console.log('4. Salvar e Sair');
}

// Coleta os dados para iniciar a criação de uma nova aeronave
function menuCriarAeronave(): void {
    console.log('\n--- Novo Projeto de Aeronave ---');
    console.log(`[CODIGO AUTOMATICO] ${state.proximoCodigoAeronave}`);

    const modeloInput = readlineSync.question('Modelo (1: Comercial, 2: Militar): ').trim();
    const modelo = modeloInput === '2' ? TipoAeronave.Militar : TipoAeronave.Comercial;

    const tipo = readlineSync.question('Tipo (Ex: Airbus A320): ').trim();
    const capacidade = parseInt(readlineSync.question('Capacidade de Passageiros: ').trim(), 10) || 0;
    const alcance = parseInt(readlineSync.question('Alcance (Km): ').trim(), 10) || 0;

    state.aeronaveAtual = new Aeronave(state.proximoCodigoAeronave, modelo, tipo, capacidade, alcance, [], [], []);
    state.proximoCodigoAeronave++;

    console.log('\nNova Aeronave Criada com Sucesso!');
    console.log(state.aeronaveAtual.detalhes());
}

// Controla o loop principal da aplicação
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
                if (state.aeronaveAtual) {
                    menuGerenciamentoAeronave(state);
                } else {
                    console.log('\nErro: Nenhuma aeronave carregada.');
                }
                break;
            case '4':
                saveState(state);
                console.log('Saindo do programa...');
                return;
            default:
                console.log(`\nOpcao invalida.`);
        }
    } while (true);
}

// Inicia o programa
solicitarEscolhaPrincipal();
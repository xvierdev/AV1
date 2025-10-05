import * as readlineSync from 'readline-sync';
import { AppState } from '../App';
import { menuPecas } from './pecaView';
import { menuEtapas } from './etapaView';
import { gerarRelatorioTela } from './relatorioView';

export function menuGerenciamentoAeronave(state: AppState): void {
    let escolha: string;

    do {
        exibirMenuGerenciamento(state);
        escolha = readlineSync.question('Digite o numero da sua escolha: ').trim();

        switch (escolha) {
            case '1':
                menuPecas(state);
                break;
            case '2':
                menuEtapas(state);
                break;
            case '3':
                gerarRelatorioTela(state);
                break;
            case '4':
                console.log('\nVoltando ao Menu Principal...');
                return;
            default:
                console.log(`\nOpcao invalida: "${escolha}". Por favor, digite de 1 a 4.`);
        }
    } while (true);
}

function exibirMenuGerenciamento(state: AppState): void {
    console.log(`\n--- Gerenciamento da Aeronave ${state.aeronaveAtual?.codigo} (${state.aeronaveAtual?.tipo}) ---`);
    console.log('1. Gerenciar Pecas');
    console.log('2. Gerenciar Etapas');
    console.log('3. Gerar Relatorio');
    console.log('4. Voltar ao Menu Principal');
    console.log('--------------------------------------------------');
}
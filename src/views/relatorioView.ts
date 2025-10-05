import * as fs from 'fs';
import * as readlineSync from 'readline-sync';
import { AppState } from '../App';

// Gera o conteúdo completo do relatório como uma string.
function gerarConteudoRelatorio(state: AppState): string {
    if (!state.aeronaveAtual) return "Nenhuma aeronave carregada.";

    let conteudo = '';

    conteudo += '==================================================\n';
    conteudo += `RELATORIO DE PRODUCAO - AERONAVE CODIGO: ${state.aeronaveAtual.codigo}\n`;
    conteudo += '==================================================\n\n';

    conteudo += '[ DADOS GERAIS DA AERONAVE ]\n';
    conteudo += `${state.aeronaveAtual.detalhes()}\n\n`;

    conteudo += '--------------------------------------------------\n';
    conteudo += '[ PECAS ASSOCIADAS ]\n';
    if (state.aeronaveAtual.pecas.length === 0) {
        conteudo += 'Nenhuma peca cadastrada.\n';
    } else {
        state.aeronaveAtual.pecas.forEach(peca => {
            conteudo += `- Nome: ${peca.nome} | Fornecedor: ${peca.fornecedor} | Status: ${peca.status}\n`;
        });
    }

    conteudo += '\n--------------------------------------------------\n';
    conteudo += '[ ETAPAS DE PRODUCAO ]\n';
    if (state.aeronaveAtual.etapas.length === 0) {
        conteudo += 'Nenhuma etapa cadastrada.\n';
    } else {
        state.aeronaveAtual.etapas.forEach(etapa => {
            conteudo += `\n> Etapa: ${etapa.nome} | Status: ${etapa.status}\n`;
            if (etapa.funcionarios.length === 0) {
                conteudo += '  - Funcionarios: Nenhum associado.\n';
            } else {
                conteudo += '  - Funcionarios:\n';
                etapa.funcionarios.forEach(f => {
                    conteudo += `    - ${f.nome} (${f.nivelPermissao})\n`;
                });
            }
        });
    }

    conteudo += '\n--------------------------------------------------\n';
    conteudo += '[ TESTES REGISTRADOS ]\n';
    if (state.aeronaveAtual.testes.length === 0) {
        conteudo += 'Nenhum teste registrado.\n';
    } else {
        state.aeronaveAtual.testes.forEach(teste => {
            conteudo += `- Tipo: ${teste.tipo} | Resultado: ${teste.resultado}\n`;
        });
    }

    conteudo += '\n==================================================\n';
    conteudo += 'FIM DO RELATORIO\n';
    conteudo += '==================================================\n';

    return conteudo;
}

// Mostra o relatório formatado no console.
function exibirRelatorioNaTela(state: AppState): void {
    const conteudo = gerarConteudoRelatorio(state);
    console.log('\n\n' + conteudo);
}

// Salva o conteúdo do relatório no arquivo relatorio.txt
function salvarRelatorioArquivo(state: AppState): void {
    const conteudo = gerarConteudoRelatorio(state);
    const nomeArquivo = 'relatorio.txt';

    try {
        fs.writeFileSync(nomeArquivo, conteudo, 'utf8');
        console.log(`\nRelatorio salvo com sucesso no arquivo "${nomeArquivo}"!`);
    } catch (error) {
        console.error(`\nErro ao salvar o relatorio:`, error);
    }
}

// Exibe o menu de opções para o relatório.
export function menuRelatorio(state: AppState): void {
    if (!state.aeronaveAtual) {
        console.log("\nNenhuma aeronave carregada para gerar relatorio.");
        return;
    }

    console.log('\n--- Opcoes de Relatorio ---');
    console.log('1. Exibir Relatorio na Tela');
    console.log('2. Salvar Relatorio em Arquivo (relatorio.txt)');
    console.log('3. Voltar');
    console.log('---------------------------');

    const escolha = readlineSync.question('Digite o numero da sua escolha: ').trim();

    switch (escolha) {
        case '1':
            exibirRelatorioNaTela(state);
            break;
        case '2':
            salvarRelatorioArquivo(state);
            break;
        case '3':
            console.log('\nVoltando ao menu anterior...');
            break;
        default:
            console.log('\nOpcao invalida.');
            break;
    }
}
import { AppState } from '../App';

export function gerarRelatorioTela(state: AppState): void {
    if (!state.aeronaveAtual) return;

    console.log('\n\n==================================================');
    console.log(`RELATORIO DE PRODUCAO - AERONAVE CODIGO: ${state.aeronaveAtual.codigo}`);
    console.log('==================================================');

    console.log('\n[ DADOS GERAIS DA AERONAVE ]');
    console.log(state.aeronaveAtual.detalhes());

    console.log('\n--------------------------------------------------');
    console.log('\n[ PECAS ASSOCIADAS ]');
    if (state.aeronaveAtual.pecas.length === 0) {
        console.log('Nenhuma peca cadastrada.');
    } else {
        state.aeronaveAtual.pecas.forEach(peca => {
            console.log(`- Nome: ${peca.nome} | Fornecedor: ${peca.fornecedor} | Status: ${peca.status}`);
        });
    }

    console.log('\n--------------------------------------------------');
    console.log('\n[ ETAPAS DE PRODUCAO ]');
    if (state.aeronaveAtual.etapas.length === 0) {
        console.log('Nenhuma etapa cadastrada.');
    } else {
        state.aeronaveAtual.etapas.forEach(etapa => {
            console.log(`\n> Etapa: ${etapa.nome} | Status: ${etapa.status}`);
            if (etapa.funcionarios.length === 0) {
                console.log('  - Funcionarios: Nenhum associado.');
            } else {
                console.log('  - Funcionarios:');
                etapa.funcionarios.forEach(f => console.log(`    - ${f.nome} (${f.nivelPermissao})`));
            }
        });
    }

    console.log('\n==================================================');
    console.log('FIM DO RELATORIO');
    console.log('==================================================\n');
}
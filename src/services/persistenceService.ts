import * as fs from 'fs';
import { AppState } from '../App';
import { Aeronave, Funcionario, Peca, Etapa, Teste } from '../models';


// Reconstrói os dados recriando os objetos de database.json
function reconstrucState(state: AppState): AppState {
    // Reconstruir funcionários
    const funcionarios = (state.funcionarios ?? []).map(f => new Funcionario(f.id, f.nome, f.telefone, f.endereco, f.usuario, f.senha, f.nivelPermissao));

    if (!state.aeronaveAtual) {
        return { ...state, funcionarios };
    }

    // Reconstruir aeronave
    const aeronave = state.aeronaveAtual;
    const pecas = (aeronave.pecas ?? []).map(p => new Peca(p.nome, p.tipo, p.fornecedor, p.status));
    const etapas = (aeronave.etapas ?? []).map(e => {
        // Encontrar funcionários associoados às etapas
        const funcionariosDaEtapa = (e.funcionarios ?? []).map(funcEtapa => funcionarios.find(f => f.id === funcEtapa.id)!);
        return new Etapa(e.nome, e.prazo, e.status, funcionariosDaEtapa);
    });
    const testes = (aeronave.testes ?? []).map(t => new Teste(t.tipo, t.resultado));

    const aeronaveAtual = new Aeronave(aeronave.codigo, aeronave.modelo, aeronave.tipo, aeronave.capacidade, aeronave.alcance, pecas, etapas, testes);

    return {
        ...state,
        aeronaveAtual,
        funcionarios
    };
}


const dbPath = './database.json';

// Salva o estado atual da aplicação no arquivo database.json.
export function saveState(state: AppState): void {
    try {
        const data = JSON.stringify(state, null, 2);
        fs.writeFileSync(dbPath, data, 'utf8');
        console.log('\nDados salvos com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
    }
}

// Carrega o estado da aplicação do arquivo database.json, se existir.
export function loadState(): AppState {
    const defaultState: AppState = {
        aeronaveAtual: null,
        proximoCodigoAeronave: 1,
        funcionarios: [],
        proximoIdFuncionario: 1
    };

    try {
        if (fs.existsSync(dbPath)) {
            const data = fs.readFileSync(dbPath, 'utf8');
            if (data.trim() === '') return defaultState;
            const plainState = JSON.parse(data);
            console.log('Dados carregados com sucesso.');
            return reconstrucState(plainState);
        }
    } catch (error) {
        console.error('Erro ao carregar os dados, iniciando com estado padrao:', error);
    }

    return defaultState;
}
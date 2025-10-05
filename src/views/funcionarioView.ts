import * as readlineSync from 'readline-sync';
import { Funcionario } from '../models/Funcionario';
import { Endereco } from '../models/Endereco';
import { Telefone } from '../models/Telefone';
import { NivelPermissao } from '../enums/NivelPermissao';
import { AppState } from '../App';

// Controla o menu de gerenciamento de funcionários.
export function menuFuncionario(state: AppState): void {
    let escolha: string;

    do {
        exibirMenuFuncionario(state.funcionarios);
        escolha = readlineSync.question('Digite o numero da sua escolha: ').trim();

        switch (escolha) {
            case '1':
                adicionarFuncionario(state);
                break;
            case '2':
                listarFuncionarios(state.funcionarios);
                break;
            case '3':
                selecionarFuncionario(state.funcionarios);
                break;
            case '4':
                removerFuncionario(state);
                break;
            case '5':
                mudarPermissao(state.funcionarios);
                break;
            case '6':
                console.log('\nVoltando ao Menu Principal...');
                return;
            default:
                console.log(`\nOpcao invalida: "${escolha}". Por favor, digite de 1 a 6.`);
        }
    } while (true);
}

// Exibe as opções do menu de funcionários.
function exibirMenuFuncionario(funcionarios: Funcionario[]): void {
    console.log('\n--- Gerenciamento de Funcionarios ---');
    console.log(`Funcionarios cadastrados: ${funcionarios.length}`);
    console.log('1. Adicionar');
    console.log('2. Listar');
    console.log('3. Selecionar');
    console.log('4. Remover');
    console.log('5. Mudar Permissao');
    console.log('6. Voltar ao Menu Principal');
    console.log('-------------------------------------');
}

// Mostra a lista de todos os funcionários cadastrados.
export function listarFuncionarios(funcionarios: Funcionario[]): void {
    if (funcionarios.length === 0) {
        console.log('\nNenhum funcionario cadastrado.');
        return;
    }
    console.log('\n--- Lista de Funcionarios ---');
    funcionarios.forEach(f => {
        console.log(`ID: ${f.id} | Nome: ${f.nome} | Usuario: ${f.usuario} | Nivel: ${f.nivelPermissao}`);
    });
}

// Coleta dados para adicionar um novo funcionário.
function adicionarFuncionario(state: AppState): void {
    console.log('\n--- Adicionar Novo Funcionario ---');

    const nome = readlineSync.question('Nome: ').trim();
    const usuario = readlineSync.question('Usuario: ').trim();
    const senha = readlineSync.question('Senha: ').trim();

    console.log('\n-- Telefone --');
    const ddd = parseInt(readlineSync.question('DDD: ').trim(), 10) || 0;
    const numeroTelefone = readlineSync.question('Numero: ').trim();
    const telefone = new Telefone(ddd, numeroTelefone);

    console.log('\n-- Endereco --');
    const rua = readlineSync.question('Rua: ').trim();
    const numeroEndereco = parseInt(readlineSync.question('Numero: ').trim(), 10) || 0;
    const bairro = readlineSync.question('Bairro: ').trim();
    const cidade = readlineSync.question('Cidade: ').trim();
    const estado = readlineSync.question('Estado: ').trim();
    const cep = readlineSync.question('CEP: ').trim();
    const pais = readlineSync.question('Pais: ').trim();
    const endereco = new Endereco(rua, numeroEndereco, bairro, cidade, estado, cep, pais);

    console.log('\n-- Nivel de Permissao --');
    const permissaoInput = readlineSync.question('Nivel (1: Administrador, 2: Engenheiro, 3: Operador): ').trim();

    let nivelPermissao: NivelPermissao = NivelPermissao.Operador;
    if (permissaoInput === '1') nivelPermissao = NivelPermissao.Administrador;
    if (permissaoInput === '2') nivelPermissao = NivelPermissao.Engeheiro;

    const novoFuncionario = new Funcionario(
        state.proximoIdFuncionario,
        nome,
        telefone,
        endereco,
        usuario,
        senha,
        nivelPermissao
    );

    state.funcionarios.push(novoFuncionario);
    state.proximoIdFuncionario++;

    console.log(`\nFuncionario ${nome} adicionado com sucesso! (ID: ${novoFuncionario.id})`);
}

// Exibe os detalhes completos de um funcionário específico.
function selecionarFuncionario(funcionarios: Funcionario[]): Funcionario | undefined {
    const idStr = readlineSync.question('Digite o ID do funcionario para selecionar: ').trim();
    const id = parseInt(idStr, 10);

    const funcionario = funcionarios.find(f => f.id === id);

    if (funcionario) {
        console.log(`\n--- Detalhes do Funcionario ID ${id} ---`);
        console.log(`Nome: ${funcionario.nome}`);
        console.log(`Nivel de Permissao: ${funcionario.nivelPermissao}`);
        console.log(`Telefone: (${funcionario.telefone.ddd}) ${funcionario.telefone.numero}`);
        console.log('Endereco Completo:');
        console.log(`  Rua: ${funcionario.endereco.rua}, ${funcionario.endereco.numero}`);
        console.log(`  Bairro: ${funcionario.endereco.bairro}`);
        console.log(`  Cidade: ${funcionario.endereco.cidade}`);
        console.log(`  Estado: ${funcionario.endereco.estado}`);
        console.log(`  CEP: ${funcionario.endereco.cep}`);
        console.log(`  Pais: ${funcionario.endereco.pais}`);
        console.log(`-----------------------------------------`);
        return funcionario;
    }

    console.log(`\nFuncionario com ID ${id} nao encontrado.`);
    return undefined;
}

// Remove um funcionário da lista.
function removerFuncionario(state: AppState): void {
    listarFuncionarios(state.funcionarios);
    if (state.funcionarios.length === 0) return;

    const idStr = readlineSync.question('Digite o ID do funcionario para remover: ').trim();
    const id = parseInt(idStr, 10);
    const index = state.funcionarios.findIndex(f => f.id === id);

    if (index !== -1) {
        const nomeRemovido = state.funcionarios[index].nome;
        state.funcionarios.splice(index, 1);
        console.log(`\nFuncionario ${nomeRemovido} (ID: ${id}) removido com sucesso.`);
    } else {
        console.log(`\nErro: Funcionario com ID ${id} nao encontrado.`);
    }
}

// Altera o nível de permissão de um funcionário.
function mudarPermissao(funcionarios: Funcionario[]): void {
    const funcionario = selecionarFuncionario(funcionarios);
    if (!funcionario) return;

    console.log('\nNiveis de Permissao: 1: ADM, 2: ENGENHEIRO, 3: OPERADOR');
    const permissaoInput = readlineSync.question(`Digite o novo Nivel para ${funcionario.nome}: `).trim();

    let novoNivel: NivelPermissao | null = null;
    if (permissaoInput === '1') novoNivel = NivelPermissao.Administrador;
    if (permissaoInput === '2') novoNivel = NivelPermissao.Engeheiro;
    if (permissaoInput === '3') novoNivel = NivelPermissao.Operador;

    if (novoNivel) {
        funcionario.nivelPermissao = novoNivel;
        console.log(`\nPermissao de ${funcionario.nome} atualizada para ${novoNivel}.`);
    } else {
        console.log('Opcao invalida.');
    }
}
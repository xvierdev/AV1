# Atividade Avaliativa 1
## Prof. Dr. Gerson da Penha Neto

### Projeto Aerocode

Aerocode é um sistema de simulação via Interface de Linha de Comando (CLI) desenvolvido em TypeScript para gerenciar o processo de produção de aeronaves. O sistema permite controlar as diversas fases da fabricação, desde o cadastro de funcionários e peças até o acompanhamento das etapas de montagem e a geração de relatórios finais.

O projeto foi estruturado seguindo as melhores práticas de desenvolvimento, com uma clara separação entre os modelos de dados, a lógica de visualização (menus) e os serviços de apoio, como a persistência de dados.

### Funcionalidades Implementadas

*   **Gerenciamento de Funcionários:** Adicionar, listar, selecionar, remover e alterar permissões.
*   **Criação de Aeronaves:** Iniciar novos projetos de aeronaves (Comercial ou Militar).
*   **Gerenciamento de Peças:** Adicionar, listar, remover e atualizar o status de peças associadas a uma aeronave.
*   **Gerenciamento de Etapas:** Adicionar etapas de produção, controlar o fluxo de trabalho (Pendente -> Em Andamento -> Concluída) e associar funcionários responsáveis.
*   **Geração de Relatório:** Exibir um relatório completo na tela com todos os dados da aeronave em produção.
*   **Persistência de Dados:** Todos os dados são salvos automaticamente em um arquivo `database.json` ao sair do programa e carregados ao iniciar.

### Como Instalar e Rodar o Projeto

Siga as instruções detalhadas abaixo para configurar e executar o projeto em sua máquina.

#### **Pré-requisitos**

Antes de começar, certifique-se de que você tem o **Node.js** e o **npm** (ou Yarn) instalados.

- Para verificar se você tem o Node.js instalado, execute no seu terminal:
  ```bash
  node -v
  ```
- Para verificar o npm:
  ```bash
  npm -v
  ```

#### **Instalação e Execução**

1.  **Clone o Repositório**
    Primeiro, clone o repositório do projeto para a sua máquina local (se aplicável, substitua a URL).
    ```bash
    git clone https://github.com/xvierdev/AV1.git
    ```
    Caso não esteja usando Git, apenas certifique-se de que todos os arquivos do projeto estão em uma mesma pasta.

2.  **Acesse a Pasta do Projeto**
    Navegue até o diretório do projeto.
    ```bash
    cd AV1
    ```

3.  **Instale as Dependências**
    Execute o comando abaixo para instalar todas as dependências listadas no arquivo `package.json`.
    ```bash
    npm install
    ```

4.  **Execute a Aplicação**
    Para iniciar o programa, utilize o `ts-node`, que compila e executa o código TypeScript diretamente.
    ```bash
    npx ts-node src/App.ts
    ```

Após executar o último comando, o menu principal do sistema Aerocode será exibido no seu terminal e você poderá começar a interagir com a aplicação.
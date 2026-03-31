# Desafio Técnico Petize - Search d_ev

Este projeto é a resolução do desafio técnico proposto pela Petize para a vaga de Estágio Desenvolvedor React. O objetivo principal foi construir uma aplicação React que permite buscar perfis de desenvolvedores no GitHub, exibir seus repositórios e gerenciar a navegação.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **React 19:** Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática, melhorando a robustez do código.
- **Chakra UI:** Biblioteca de componentes para React, utilizada para construir a interface de forma rápida e acessível.
- **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
- **Zod:** Biblioteca de validação de schemas, garantindo a integridade dos dados recebidos da API.
- **React Router DOM:** Para gerenciamento de rotas e navegação entre as páginas.
- **i18Next:** Framework de internacionalização para suporte a múltiplos idiomas (Português e Inglês).

## Funcionalidades Implementadas

- **Busca de Usuários:** Permite pesquisar perfis do GitHub pelo username.
- **Página de Perfil:** Exibe informações detalhadas do usuário e seus repositórios.
- **Scroll Infinito:** Carregamento dinâmico de repositórios conforme o usuário rola a página.
- **Ordenação de Repositórios:** Opções para ordenar os repositórios por diferentes critérios (atualização, criação, push, nome) e direção (ascendente/descendente).
- **Responsividade:** Interface adaptável para dispositivos móveis e desktops.
- **Internacionalização:** Suporte a Português e Inglês para os textos da aplicação e switcher de idioma.
- **Tratamento de Erros:** Mensagens informativas para usuários não encontrados ou erros na API.
- **Links Externos:** Nomes de repositórios, links de blog e Twitter são clicáveis e direcionam para as páginas correspondentes.

## Como Rodar o Projeto

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/allysrdev/petize-desafio.git
    cd petize-desafio
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou yarn install
    # ou pnpm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

    ```
    VITE_GITHUB_TOKEN=SEU_TOKEN_DO_GITHUB
    ```

    Pra gerar um token pessoal de acesso no GitHub: `Settings > Developer settings > Personal access tokens`.

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou yarn dev
    # ou pnpm dev
    ```

    O aplicativo estará disponível em `http://localhost:5173`

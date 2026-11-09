# ClinicFlow

Aplicação web para gerenciamento de pacientes, consultas e registros de atendimento, desenvolvida com React, TypeScript e Vite.

O ClinicFlow é uma aplicação frontend demonstrativa, sem backend, que utiliza o armazenamento local do navegador (`localStorage`) para persistir os dados.

> **Aviso:** o projeto utiliza dados fictícios e armazenamento local no navegador. Não utilize informações reais de pacientes. Não é um prontuário clínico certificado nem substitui sistemas que atendam aos requisitos legais e de segurança aplicáveis.

## Funcionalidades

- Dashboard com indicadores e agenda do dia.
- Cadastro e listagem de pacientes.
- Busca de pacientes por nome, e-mail ou telefone.
- Agendamento, conclusão e cancelamento de consultas.
- Registro e consulta de evoluções clínicas demonstrativas.
- Persistência dos dados no `localStorage`.

## Tecnologias utilizadas

- React 18
- TypeScript
- Vite
- Lucide React
- CSS
- ESLint
- Vitest
- React Testing Library

## Requisitos

- Node.js 20.19+ ou 22.12+.
- npm.

## Instalação e execução

Clone o repositório e acesse a pasta do projeto. Em seguida, instale as dependências:

```bash
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço apresentado pelo Vite no terminal.

## Testes e qualidade

Execute os testes automatizados:

```bash
npm run test
```

Execute os testes com relatório de cobertura:

```bash
npm run test:coverage
```

Execute a análise estática com ESLint:

```bash
npm run lint
```

Verifique a compilação de produção:

```bash
npm run build
```

O relatório HTML de cobertura é gerado na pasta `coverage/`.

Os testes automatizados verificam funcionalidades como renderização do painel, pesquisa de pacientes, cadastro e persistência local, conclusão de consultas, filtro de evoluções e confirmação de exclusão.

## Dados de demonstração

O sistema inicia com pacientes, consultas e evoluções fictícias. Os dados criados ou alterados são armazenados no navegador atual por meio do `localStorage`.

Para restaurar os dados iniciais, limpe o armazenamento local do site nas ferramentas de desenvolvedor do navegador.

## Estrutura do projeto

```text
src/
├── components/
│   ├── Modal.tsx
│   └── Sidebar.tsx
├── data/
│   └── seed.ts
├── test/
│   └── setup.ts
├── App.test.tsx
├── App.tsx
├── main.tsx
├── styles.css
└── types.ts
```

## Contexto acadêmico

O ClinicFlow está sendo utilizado como base para um projeto acadêmico de aplicação dos princípios e práticas de Clean Code.

O trabalho contempla diagnóstico de code smells, refatorações, testes automatizados, análise de qualidade e documentação do processo.

Consulte o arquivo `ENTREGA_01_DOSSIE.md` para conhecer o diagnóstico inicial e o planejamento do projeto.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE).
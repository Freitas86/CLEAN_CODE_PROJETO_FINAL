# ClinicFlow

Aplicação web para gerenciamento de pacientes, consultas e registros de atendimento, desenvolvida com React, TypeScript e Vite.

> **Aviso:** o projeto utiliza dados fictícios e armazenamento local no navegador. Não utilize informações reais de pacientes. Não é um prontuário clínico certificado nem substitui sistemas que atendam aos requisitos legais e de segurança aplicáveis.

## Funcionalidades

- Dashboard com indicadores e agenda do dia.
- Cadastro e listagem de pacientes.
- Busca de pacientes por nome, e-mail ou telefone.
- Agendamento, conclusão e cancelamento de consultas.
- Registro e consulta de evoluções clínicas demonstrativas.
- Persistência dos dados no `localStorage`.

## Requisitos

- Node.js 20.19+ ou 22.12+ (compatível com Vite 6).
- npm.

## Instalação e execução

```bash
npm install
npm run dev
```

Abra o endereço apresentado pelo Vite no terminal.

## Verificações

```bash
npm run lint
npm run build
```

## Tecnologias

React 18, TypeScript, Vite, Lucide React, ESLint e CSS responsivo.

## Dados de demonstração

O sistema inicia com pacientes, consultas e evoluções fictícias. Os dados criados ou alterados são armazenados no navegador atual. Para restaurar os dados iniciais, limpe o armazenamento local do site (DevTools > Application > Local Storage).

## Estrutura

```text
src/
├── components/
│   ├── Modal.tsx
│   └── Sidebar.tsx
├── data/
│   └── seed.ts
├── App.tsx
├── main.tsx
├── styles.css
└── types.ts
```

## Contexto acadêmico

O sistema foi desenvolvido para fins acadêmicos. Antes de utilizá-lo em uma atividade avaliativa, verifique os critérios de aceitação definidos pelo docente e documente corretamente a origem e o histórico do projeto.

## Licença

MIT — consulte o arquivo [LICENSE](./LICENSE).

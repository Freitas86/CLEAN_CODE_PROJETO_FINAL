# ClinicFlow

Aplicação web demonstrativa para gerenciamento de pacientes, consultas e registros de atendimento, desenvolvida com React, TypeScript e Vite.

> **Aviso:** o projeto utiliza dados fictícios e armazenamento local no navegador. Não utilize informações reais de pacientes. Não é um prontuário clínico certificado nem substitui sistemas que atendam aos requisitos legais e de segurança aplicáveis.

## Funcionalidades

- Dashboard com indicadores e agenda do dia.
- Cadastro e listagem de pacientes.
- Busca de pacientes por nome, e-mail ou telefone.
- Agendamento, conclusão e cancelamento de consultas.
- Registro e consulta de evoluções demonstrativas.
- Persistência dos dados no `localStorage`.

## Tecnologias

- React 18
- TypeScript
- Vite
- Lucide React
- ESLint
- Vitest
- React Testing Library
- Husky
- GitHub Actions

## Requisitos

- Node.js 20.19+ ou 22.12+.
- npm.

## Instalação e execução

Clone o repositório e acesse a pasta do projeto. Instale as dependências:

```bash
npm ci
```

Inicie o servidor:

```bash
npm run dev
```

Abra no navegador o endereço apresentado pelo Vite.

## Testes e qualidade

Execute os testes:

```bash
npm test
```

Gere o relatório de cobertura:

```bash
npm run test:coverage
```

Execute o ESLint:

```bash
npm run lint
```

Verifique a compilação:

```bash
npm run build
```

O relatório HTML de cobertura é gerado na pasta `coverage/`.

O projeto possui um hook do Husky que executa lint e testes antes dos commits. O GitHub Actions também executa lint, testes e build em pushes e pull requests direcionados à branch `main`.

## Dados de demonstração

O sistema inicia com pacientes, consultas e evoluções fictícias. Os dados criados ou alterados são armazenados no navegador atual por meio do `localStorage`.

Para restaurar os dados iniciais, limpe o armazenamento local do site nas ferramentas de desenvolvedor do navegador.

## Estrutura do projeto

```text
src/
├── components/
│   ├── AppointmentForm.tsx
│   ├── Appointments.tsx
│   ├── Appointments.test.tsx
│   ├── Dashboard.tsx
│   ├── Modal.tsx
│   ├── NoteForm.tsx
│   ├── PatientForm.tsx
│   ├── Patients.tsx
│   ├── Records.tsx
│   ├── Shared.tsx
│   └── Sidebar.tsx
├── data/
│   └── seed.ts
├── hooks/
│   └── useLocalStorage.ts
├── test/
│   └── setup.ts
├── utils/
│   └── clinicHelpers.ts
├── App.test.tsx
├── App.tsx
├── main.tsx
├── styles.css
└── types.ts
```

## Documentação do projeto

A documentação das análises, testes, ferramentas, arquitetura, repositório e processo de desenvolvimento está disponível na pasta [`docs/`](docs/README.md).

O diagnóstico e o planejamento inicial estão registrados em [`ENTREGA_01_DOSSIE.md`](ENTREGA_01_DOSSIE.md).

## Contexto acadêmico

O ClinicFlow foi utilizado como base para aplicar princípios e práticas de Clean Code, incluindo identificação de Code Smells, refatorações, testes automatizados e documentação das alterações.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE).
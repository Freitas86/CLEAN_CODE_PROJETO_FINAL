# Arquitetura e dependências

## Visão geral

O ClinicFlow é uma aplicação web demonstrativa desenvolvida com React e TypeScript para apoiar tarefas de gerenciamento de uma clínica. O sistema permite organizar pacientes, consultas e registros de evolução, por meio de uma interface dividida em diferentes áreas.

A aplicação não possui backend próprio. Os dados de demonstração e as alterações realizadas durante o uso são armazenados no `localStorage` do navegador, por meio de um hook específico. Por esse motivo, o sistema tem finalidade demonstrativa e não deve ser utilizado para armazenar dados reais de pacientes.

## Organização dos arquivos

```text
src/
├── App.test.tsx
├── App.tsx
├── main.tsx
├── styles.css
├── types.ts
├── components/
│   ├── AppointmentForm.tsx
│   ├── Appointments.tsx
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
└── utils/
    └── clinicHelpers.ts
```

## Responsabilidade dos principais arquivos

| Arquivo | Responsabilidade |
|---|---|
| `main.tsx` | Inicializa a aplicação React e renderiza o componente principal. |
| `App.tsx` | Coordena os estados principais, as ações do sistema, a navegação e a montagem das áreas da aplicação. |
| `types.ts` | Define os tipos utilizados para pacientes, consultas e prontuários. |
| `data/seed.ts` | Fornece dados fictícios para a demonstração do sistema. |
| `hooks/useLocalStorage.ts` | Centraliza a leitura e a gravação de dados no armazenamento local do navegador. |
| `utils/clinicHelpers.ts` | Reúne funções auxiliares utilizadas nas regras e operações da clínica. |
| `components/Sidebar.tsx` | Apresenta o menu lateral e permite navegar entre as páginas. |
| `components/Modal.tsx` | Apresenta janelas modais e permite seu fechamento. |
| `components/Shared.tsx` | Reúne elementos visuais compartilhados, como campos, títulos, busca e cartões de indicadores. |
| `components/Dashboard.tsx` | Apresenta o painel inicial com indicadores e informações das consultas. |
| `components/Patients.tsx` | Apresenta a área de gerenciamento de pacientes. |
| `components/Appointments.tsx` | Apresenta a área de gerenciamento de consultas. |
| `components/Records.tsx` | Apresenta os registros de evolução clínica. |

| `components/PatientForm.tsx` | Contém o formulário de cadastro de pacientes. |
| `components/AppointmentForm.tsx` | Contém o formulário de agendamento de consultas. |
| `components/NoteForm.tsx` | Contém o formulário de registro de evoluções. |
| `App.test.tsx` | Reúne os testes automatizados da aplicação. |
| `test/setup.ts` | Configura o ambiente utilizado nos testes automatizados. |
| `styles.css` | Contém os estilos visuais da interface. |

## Organização das responsabilidades

Durante as refatorações, algumas partes que estavam concentradas no `App.tsx` foram separadas em arquivos específicos.

As páginas passaram a ter componentes próprios, como `Dashboard`, `Patients`, `Appointments` e `Records`. Os formulários de cadastro de pacientes, agendamento e evolução também foram extraídos para componentes independentes.

Além disso, os elementos visuais utilizados em diferentes partes do sistema foram reunidos em `Shared.tsx`. A persistência dos dados foi centralizada no hook `useLocalStorage.ts`, enquanto as funções auxiliares foram organizadas em `clinicHelpers.ts`.

Com essa divisão, cada arquivo passou a ter uma responsabilidade mais definida, facilitando a leitura e a manutenção do código.

## Fluxo simplificado

1. `main.tsx` inicializa a aplicação e renderiza o componente `App`.
2. `App.tsx` coordena os estados e utiliza o hook `useLocalStorage.ts` para carregar e persistir os dados.
3. O usuário navega entre as áreas do sistema por meio do componente `Sidebar`.
4. As páginas são apresentadas pelos componentes específicos, de acordo com a área selecionada.
5. Quando necessário, `App.tsx` abre o componente `Modal`, que recebe o formulário correspondente.
6. Os formulários enviam os dados para as funções responsáveis pelo cadastro ou registro das informações.
7. As alterações são atualizadas nos estados e armazenadas no `localStorage`.

## Dependências e limites

A aplicação utiliza React e TypeScript para construção da interface e organização do código. Também depende do navegador para executar o sistema e armazenar os dados localmente.

Não há, na versão atual, uma API própria ou um banco de dados em servidor. O `localStorage` é suficiente para a demonstração das funcionalidades, mas não oferece os recursos de segurança, compartilhamento e controle necessários para armazenar informações clínicas reais.

## Pontos de atenção para refatoração

A principal concentração de responsabilidades identificada inicialmente estava no `App.tsx`, que reunia estados, funções de interação, persistência e montagem das páginas.

Ao longo do trabalho, parte dessas responsabilidades foi distribuída entre componentes, hooks e módulos auxiliares. Mesmo após as alterações, o `App.tsx` continua responsável por coordenar o funcionamento geral da aplicação.

As refatorações foram realizadas gradualmente, procurando manter o comportamento existente. Para verificar possíveis impactos, foram executados o build, os testes automatizados e o linter após as alterações.

## Evidências

- Inicialização da aplicação: `src/main.tsx`.
- Componente principal: `src/App.tsx`.
- Persistência local: `src/hooks/useLocalStorage.ts`.
- Funções auxiliares: `src/utils/clinicHelpers.ts`.
- Tipos: `src/types.ts`.
- Dados demonstrativos: `src/data/seed.ts`.
- Componentes e formulários: `src/components/`.
- Testes automatizados: `src/App.test.tsx`.

## Roteiro de 1 minuto

O ClinicFlow foi desenvolvido com React e TypeScript. Inicialmente, boa parte das responsabilidades estava concentrada no arquivo `App.tsx`. Durante o trabalho de refatoração, separamos as páginas, os formulários e os componentes compartilhados, além de organizar a persistência dos dados em um hook e as funções auxiliares em um módulo próprio. Essa organização tornou o código mais dividido e facilitou sua manutenção. Como o sistema utiliza o armazenamento local do navegador e não possui backend, continua sendo uma aplicação demonstrativa, sem indicação de uso com dados reais de pacientes.

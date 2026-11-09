# Cobertura de testes

## Objetivo

Registrar os testes utilizados no ClinicFlow e comparar a cobertura antes e depois das refatorações. Os testes ajudam a verificar se as mudanças no código preservaram as funcionalidades que já existiam.

## Estrutura atual

Os testes automatizados são executados com Vitest e Testing Library.

Atualmente, existem dois arquivos de testes:

- `src/App.test.tsx`: contém seis testes relacionados às funcionalidades principais do sistema.
- `src/components/Appointments.test.tsx`: contém um teste para verificar a associação entre os status das consultas e suas respectivas classes CSS.

Os testes de `App.test.tsx` verificam:

- Exibição do painel inicial.
- Pesquisa de pacientes.
- Cadastro de paciente e persistência no `localStorage`.
- Finalização de consulta.
- Filtragem de prontuários.
- Confirmação de exclusão.

O teste de `Appointments.test.tsx` verifica os três status disponíveis: Agendada, Concluída e Cancelada.

## Linha de base

Antes das refatorações, foram registrados os seguintes resultados:

| Indicador | Resultado inicial |
|---|---:|
| Testes executados | 6 |
| Testes aprovados | 6 |
| Statements | 86,20% |
| Branches | 83,33% |
| Functions | 62,50% |
| Lines | 86,20% |

Esses valores foram mantidos para permitir a comparação com a situação atual.

## Resultado após as refatorações

Comando utilizado:

```cmd
npm run test:coverage
```

Resultado da última execução, em 09/11/2026:

| Indicador | Resultado atual |
|---|---:|
| Testes executados | 7 |
| Testes aprovados | 7 |
| Statements | 80,65% |
| Branches | 81,73% |
| Functions | 63,49% |
| Lines | 80,65% |

Todos os sete testes passaram. A cobertura atual de linhas permanece acima dos 50% exigidos para o trabalho.

A cobertura de linhas diminuiu em relação à linha de base porque a estrutura do código foi modificada e passou a incluir novos componentes e arquivos. Isso não significa, por si só, que as funcionalidades deixaram de funcionar. Por isso, a análise também considera os testes aprovados e os arquivos que ainda precisam de mais cenários de teste.

## Cobertura por arquivo e módulo

Resultado atual da execução:

| Arquivo | Statements | Branches | Functions | Lines |
|---|---:|---:|---:|---:|
| `App.tsx` | 77,59% | 90,00% | 38,46% | 77,59% |
| `types.ts` | 0,00% | 0,00% | 0,00% | 0,00% |
| `AppointmentForm.tsx` | 4,34% | 100,00% | 0,00% | 4,34% |
| `Appointments.tsx` | 93,75% | 83,33% | 66,66% | 93,75% |
| `Dashboard.tsx` | 100,00% | 90,00% | 50,00% | 100,00% |
| `Modal.tsx` | 80,00% | 66,66% | 66,66% | 80,00% |
| `NoteForm.tsx` | 4,16% | 100,00% | 0,00% | 4,16% |
| `PatientForm.tsx` | 100,00% | 100,00% | 100,00% | 100,00% |
| `Patients.tsx` | 92,22% | 75,00% | 75,00% | 92,22% |
| `Records.tsx` | 97,05% | 85,71% | 100,00% | 97,05% |
| `Shared.tsx` | 98,83% | 90,90% | 87,50% | 98,83% |
| `Sidebar.tsx` | 96,96% | 66,66% | 100,00% | 96,96% |
| `seed.ts` | 94,73% | 50,00% | 100,00% | 94,73% |
| `useLocalStorage.ts` | 85,71% | 62,50% | 100,00% | 85,71% |
| `clinicHelpers.ts` | 89,47% | 66,66% | 100,00% | 89,47% |

### Análise dos resultados

Os componentes `Dashboard.tsx`, `PatientForm.tsx`, `Records.tsx`, `Shared.tsx` e `Patients.tsx` apresentam boa cobertura de linhas.

Os pontos que ainda precisam de atenção são:

- `AppointmentForm.tsx`: possui baixa cobertura porque seus cenários de preenchimento e envio ainda não são exercitados pelos testes atuais.
- `NoteForm.tsx`: também precisa de testes específicos para os campos e o envio do formulário.
- `App.tsx`: ainda possui trechos de navegação e ações que não são percorridos pelos testes.
- `types.ts`: contém declarações de tipos TypeScript, sem comportamento executável para ser testado diretamente. Por isso, o percentual de 0% não representa uma funcionalidade quebrada.

## Relação entre testes e refatorações

| Refatoração | Validação relacionada |
|---|---|
| PR #5 — Decomposição do App | Testes de regressão das funcionalidades principais em `App.test.tsx`. |
| PR #6 — Centralização da persistência | Testes de cadastro, finalização de consulta e persistência no `localStorage`. |
| PR #7 — Separação das telas | Testes de navegação e funcionalidades principais em `App.test.tsx`. |
| PR #8 — Separação dos formulários | Testes de cadastro e demais fluxos existentes. Ainda faltam testes específicos para todos os formulários. |
| PR #11 — Agrupamento dos parâmetros do Dashboard | Teste de exibição do painel inicial. |
| PR #12 — Simplificação dos status das consultas | Teste específico em `Appointments.test.tsx`, cobrindo os três status. |

Os testes atuais funcionam como uma proteção para as principais funcionalidades. Entretanto, nem todas as refatorações possuem um teste unitário exclusivo. Por isso, a validação também considera o ESLint, o build e os testes de regressão.

## Como executar

Instalar as dependências:

```cmd
npm ci
```

Executar os testes:

```cmd
npm test
```

Executar os testes com cobertura:

```cmd
npm run test:coverage
```

O relatório HTML de cobertura é gerado na pasta `coverage`.

## Estratégia durante as refatorações

1. Executar os testes antes de alterar o código.
2. Fazer uma mudança pequena e específica.
3. Executar novamente os testes.
4. Comparar o resultado com a linha de base.
5. Corrigir falhas antes de seguir para outra mudança.
6. Registrar no commit o objetivo da alteração.

Além dos testes, o projeto passou a executar verificações automáticas com Husky antes dos commits e GitHub Actions durante os Pull Requests e os envios para `main`.

## Evidências

- Testes principais: `src/App.test.tsx`.
- Teste dos status: `src/components/Appointments.test.tsx`.
- Configuração: `vitest.config.ts`.
- Comando de cobertura: `npm run test:coverage`.
- Resultado atual: 7 testes aprovados e 80,65% de cobertura de linhas.
- Integração de qualidade: `.husky/pre-commit` e `.github/workflows/quality.yml`.
- Pull Request da simplificação dos status: [PR #12](https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL/pull/12).

## Roteiro de 1 minuto

Antes das refatorações, o projeto tinha seis testes automatizados e cobertura de linhas de 86,20%. Depois das mudanças, foram acrescentados testes para os status das consultas, chegando a sete testes aprovados e 80,65% de cobertura de linhas. Alguns formulários ainda precisam de testes específicos, mas o resultado geral continua acima dos 50% exigidos. As verificações também passaram a ser executadas automaticamente antes dos commits e no GitHub.
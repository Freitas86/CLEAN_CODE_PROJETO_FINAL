# Análise de Code Smells

## Objetivo

Registrar os problemas de organização identificados na versão inicial do ClinicFlow e apresentar as melhorias realizadas durante as refatorações. A análise considera o código da branch `original` e compara sua estrutura com a versão atual da `main`.

## Versão analisada

- Repositório: [CLEAN_CODE_PROJETO_FINAL](https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL)
- Versão original: branch `original`.
- Commit original: `a7f12fbe489e0b1894cb605a7ffe88960c4750bf`.
- Versão refatorada: branch `main`.

## Code Smells identificados

| ID | Code Smell | Categoria | Evidência na versão original | Situação |
|---|---|---|---|---|
| CF-01 | Large Class | Bloaters | `App.tsx` concentrava estados, persistência, ações e páginas. | Melhorado com extração de componentes. |
| CF-02 | Long Method | Bloaters | A função `App()` reunia diversas operações e uma estrutura extensa de interface. | Melhorado parcialmente com a separação de componentes e formulários. |
| CF-03 | Long Parameter List | Bloaters | `Dashboard` recebia oito propriedades individualmente. | Refatorado na PR #11. |
| CF-04 | Switch Statements | Object-Orientation Abusers | Condicionais ternárias encadeadas selecionavam a classe visual conforme o status da consulta. | Simplificado na PR #12 com o objeto `STATUS_CLASSES`. |
| CF-05 | Divergent Change | Change Preventers | Alterações de interface, persistência e regras de negócio exigiam modificações no mesmo arquivo `App.tsx`. | Melhorado com a separação de responsabilidades. |
| CF-07 | Feature Envy | Couplers | `getPatientName()` trabalhava diretamente sobre a coleção de pacientes, embora estivesse junto às funções gerais da aplicação. | Extraída para `clinicHelpers.ts`, melhorando a organização da responsabilidade. |

O projeto também apresentou o smell `Duplicate Code`, registrado como melhoria complementar. Os três efeitos responsáveis pela persistência de pacientes, consultas e evoluções foram substituídos pelo hook `useLocalStorage`.

**Observação:** o caso de Feature Envy é uma adaptação do conceito ao contexto funcional de React e TypeScript. Não representa o exemplo clássico de um método de uma classe que acessa excessivamente outra classe. Da mesma forma, o caso de Switch Statements foi identificado pela presença de condicionais encadeadas, e não por uma estrutura literal `switch/case`.

## Principais refatorações

### CF-01 — Large Class

**Problema encontrado**

O arquivo `App.tsx` concentrava responsabilidades diferentes, como controle de estado, persistência, operações de cadastro e apresentação das páginas.

**Técnica aplicada**

Extração de componentes e separação de responsabilidades em módulos próprios.

**Resultado**

As páginas, formulários e componentes compartilhados passaram a ter arquivos próprios. O `App.tsx` continua coordenando a aplicação, mas deixou de concentrar toda a implementação.

**Evidência**

- Antes: `src/App.tsx` na branch `original`.
- Depois: `src/components/`.
- PRs #5, #7 e #8.

### CF-02 — Long Method

**Problema encontrado**

A função principal `App()` acumulava estados, funções de manipulação e uma estrutura extensa de interface.

**Técnica aplicada**

Extração de componentes e funções para reduzir o tamanho e separar responsabilidades.

**Resultado**

A implementação das páginas e dos formulários foi distribuída em componentes específicos. A função principal ainda mantém a coordenação geral do sistema, portanto a melhoria é parcial.

**Evidência**

- Antes: `src/App.tsx` na branch `original`.
- Depois: `src/components/`.
- PRs #5, #7 e #8.

### CF-03 — Long Parameter List

**Problema encontrado**

O componente `Dashboard` recebia oito propriedades individualmente, misturando informações e funções de ação.

**Técnica aplicada**

Introdução de objeto de parâmetros (*Introduce Parameter Object*).

**Resultado**

As propriedades foram agrupadas em dois objetos:

- `data`: informações utilizadas pelo painel.
- `actions`: funções executadas pelas ações do painel.

A chamada do componente ficou mais organizada e os parâmetros passaram a ter agrupamentos por finalidade.

**Evidência**

- Arquivo: `src/components/Dashboard.tsx`.
- PR #11.

### CF-04 — Switch Statements

**Problema encontrado**

Na versão original, a apresentação do status das consultas utilizava condicionais ternárias encadeadas para determinar a classe visual de cada situação.

**Técnica aplicada**

Simplificação da lógica condicional por meio de um objeto de mapeamento.

**Resultado**

A lógica foi substituída pelo objeto `STATUS_CLASSES`, relacionando cada status à sua classe visual. Também foram adicionados testes para verificar os três estados possíveis: agendada, concluída e cancelada.

**Evidência**

- Antes: `src/App.tsx`, branch `original`.
- Depois: objeto `STATUS_CLASSES`.
- PR #12.

### CF-05 — Divergent Change

**Problema encontrado**

O `App.tsx` reunia responsabilidades diferentes. Isso aumentava a possibilidade de alterações em funcionalidades distintas exigirem modificações no mesmo arquivo.

**Técnica aplicada**

Extração de componentes e separação das responsabilidades.

**Resultado**

Páginas, formulários e elementos compartilhados passaram a ser mantidos em arquivos específicos. Isso reduz a concentração de mudanças no componente principal.

**Evidência**

- Antes: `src/App.tsx`, branch `original`.
- Depois: `src/components/`.
- PRs #5, #7 e #8.

### CF-07 — Feature Envy

**Problema encontrado**

A função `getPatientName()` estava localizada junto às funções gerais da aplicação, mas sua responsabilidade era consultar exclusivamente os dados de pacientes, procurando um registro pelo identificador.

**Técnica aplicada**

Extração da função para um módulo de utilitários compartilhado.

**Resultado**

A função passou a ser mantida em `src/utils/clinicHelpers.ts`, junto às funções auxiliares utilizadas pelos componentes. Essa organização deixa mais clara sua responsabilidade relacionada aos dados de pacientes.

**Evidência**

- Antes: função definida em `src/App.tsx`, branch `original`.
- Depois: `src/utils/clinicHelpers.ts`.
- Utilização em `App`, `Appointments`, `Dashboard` e `Records`.

**Observação:** a classificação como Feature Envy é uma interpretação do conceito no contexto funcional do projeto, não um exemplo clássico de orientação a objetos.

### Melhoria complementar — Duplicate Code

**Problema encontrado**

Três efeitos separados realizavam a gravação dos dados de pacientes, consultas e evoluções no `localStorage`, repetindo a mesma lógica.

**Técnica aplicada**

Extração da lógica compartilhada para um hook personalizado.

**Resultado**

A persistência passou a ser centralizada em `useLocalStorage`, reduzindo a repetição da lógica e facilitando a manutenção.

**Evidência**

- Antes: três efeitos em `src/App.tsx`, branch `original`.
- Depois: `src/hooks/useLocalStorage.ts`.
- PR #6.

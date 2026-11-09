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
| CF-01 | Large Class | Inchaços | `App.tsx` concentrava estados, persistência, ações e páginas. | Melhorado |
| CF-02 | Long Method | Inchaços | A função `App()` reunia diversas operações e uma estrutura extensa de interface. | Melhorado, ainda existe concentração de responsabilidades. |
| CF-03 | Long Parameter List | Inchaços | `Dashboard` recebia oito propriedades individualmente. | Melhorado na PR #11. |
| CF-04 | Switch Statements | Abusos da OO | A navegação utilizava condicionais simples, sem estrutura `switch/case`. | Não confirmado como Code Smell. |
| CF-05 | Divergent Change | Impedidores de Mudança | Alterações em diferentes responsabilidades frequentemente exigiam modificações em `App.tsx`. | Melhorado. |
| CF-06 | Duplicate Code | Dispensáveis | Três efeitos separados realizavam a persistência de pacientes, consultas e evoluções. | Resolvido com `useLocalStorage`. |
| CF-07 | Feature Envy | Acopladores | `getPatientName()` consultava a lista de pacientes recebida como parâmetro. | Não confirmado como Code Smell. |

A análise foi conservadora: os itens CF-04 e CF-07 foram mantidos como possibilidades investigadas, mas não foram apresentados como problemas comprovados.

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

**Antes**

O componente recebia propriedades como `patients`, `appointments`, `activePatients`, `completed`, `upcoming`, `onNewAppointment`, `onNewPatient` e `onFinish`.

**Depois**

As propriedades foram agrupadas em dois objetos:

- `data`: informações utilizadas pelo painel.
- `actions`: funções executadas pelas ações do painel.

**Resultado**

A chamada do componente ficou mais organizada e os parâmetros passaram a ter agrupamentos por finalidade.

**Evidência**

- Arquivo: `src/components/Dashboard.tsx`.
- PR #11: [Agrupamento dos parâmetros do Dashboard](https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL/pull/11).

### CF-05 — Divergent Change

**Problema encontrado**

O `App.tsx` reunia responsabilidades diferentes. Isso aumentava a possibilidade de alterações em funcionalidades distintas exigirem modificações no mesmo arquivo.

**Técnica aplicada**

Extração de componentes e separação das responsabilidades.

**Resultado**

Páginas, formulários e elementos compartilhados passaram a ser mantidos em arquivos específicos. Isso reduz a concentração de mudanças no componente principal.

**Evidência**

- Arquivo original: `src/App.tsx`.
- Estrutura atual: `src/components/`, `src/hooks/` e `src/utils/`.
- PRs #5, #6, #7 e #8.

### CF-06 — Duplicate Code

**Problema encontrado**

A versão original possuía três efeitos separados para salvar pacientes, consultas e evoluções no `localStorage`.

**Técnica aplicada**

Extração da lógica repetida para uma função reutilizável, implementada como hook personalizado.

**Resultado**

A persistência passou a ser centralizada em `useLocalStorage`, reduzindo a repetição da mesma lógica.

**Evidência**

- Antes: três efeitos em `src/App.tsx`.
- Depois: `src/hooks/useLocalStorage.ts`.
- PR #6.

## Refatoração adicional: simplificação dos status

Além dos itens analisados, foi simplificada a condição ternária encadeada utilizada para definir as classes CSS dos status das consultas.

**Antes**

A lógica verificava individualmente se a consulta estava concluída, cancelada ou agendada.

**Depois**

Foi criado o objeto `STATUS_CLASSES`, que relaciona cada status à respectiva classe CSS.

**Resultado**

A associação ficou mais direta e o comportamento passou a ser verificado por teste automatizado.

**Evidência**

- Arquivo: `src/components/Appointments.tsx`.
- PR #12: [Simplificação dos status das consultas](https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL/pull/12).
- Teste: `src/components/Appointments.test.tsx`.

## Resultado geral

| Item | Resultado |
|---|---|
| CF-01 | Melhorou a distribuição das responsabilidades. |
| CF-02 | Reduziu a extensão e a concentração da implementação. |
| CF-03 | Agrupou os parâmetros do Dashboard em dois objetos. |
| CF-04 | Não confirmado; não foi identificado `switch/case` na navegação. |
| CF-05 | Reduziu a concentração de responsabilidades no arquivo principal. |
| CF-06 | Centralizou a persistência e eliminou a repetição dos três efeitos. |
| CF-07 | Não confirmado; a função auxiliar realiza uma busca simples na lista recebida. |

A análise identificou cinco problemas com evidências suficientes e duas possibilidades que não foram confirmadas. A simplificação da condição dos status também foi realizada como melhoria adicional.

## Evidências

- Versão original: branch `original`.
- Versão atual: branch `main`.
- PR #5: extração de componentes.
- PR #6: centralização da persistência.
- PR #7: separação das páginas.
- PR #8: separação dos formulários.
- PR #11: agrupamento dos parâmetros do Dashboard.
- PR #12: simplificação dos status e teste automatizado.
- Testes: `npm test`.

## Roteiro de 1 minuto

Na análise inicial, identificamos concentração de responsabilidades no `App.tsx`, repetição na persistência e excesso de parâmetros no Dashboard. Durante as refatorações, extraímos componentes, centralizamos o armazenamento em um hook e agrupamos os parâmetros do painel. Também simplificamos a lógica dos status das consultas. Dois itens inicialmente considerados foram descartados como Code Smells por falta de evidência suficiente.
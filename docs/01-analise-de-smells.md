# Análise de Code Smells

## Objetivo

Registrar os problemas de organização encontrados na versão inicial do ClinicFlow. A análise considera os conceitos estudados em aula e evita classificar trechos como Code Smell quando não há evidência suficiente.

## Versão analisada

- Repositório: https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL
- Branch de referência: `original`
- Commit: `a7f12fbe489e0b1894cb605a7ffe88960c4750bf`

## Itens identificados

| ID | Code Smell | Categoria | Evidência inicial | Situação |
|---|---|---|---|---|
| CF-01 | Large Class | Inchaços | `App.tsx` concentra estado, persistência, regras de interação, navegação e várias partes da interface. | Identificado |
| CF-02 | Long Method | Inchaços | A função principal `App()` reúne muitos estados, efeitos, funções de manipulação e uma estrutura extensa de JSX. | Identificado |
| CF-03 | Long Parameter List | Inchaços | O componente `Dashboard` recebe várias propriedades para apresentar dados e executar ações. | Identificado |
| CF-04 | Switch Statements | Abusos da OO | A seleção e apresentação de páginas utiliza condicionais baseadas no valor de `activePage`. | Candidato; validar se a complexidade justifica a classificação |
| CF-05 | Divergent Change | Impedidores de Mudança | `App.tsx` concentra responsabilidades diferentes, fazendo com que alterações de áreas distintas possam exigir mudanças no mesmo arquivo. | Identificado como concentração de responsabilidades |
| CF-06 | Duplicate Code | Dispensáveis | Existem três efeitos semelhantes em `App.tsx` para persistir pacientes, consultas e prontuários no `localStorage`. | Identificado |
| CF-07 | Feature Envy | Acopladores | `getPatientName()` consulta uma lista de pacientes recebida como parâmetro para obter o nome correspondente. | Candidato; evidência ainda fraca |

## Observações sobre o diagnóstico

Os componentes `Sidebar.tsx` e `Modal.tsx` foram analisados e não apresentaram problemas relevantes que justifiquem uma refatoração específica. O primeiro concentra a navegação lateral; o segundo cuida da apresentação e do fechamento de uma janela modal.

As interfaces e tipos declarados em `types.ts` também não foram classificados automaticamente como `Data Class`. Em TypeScript, declarar interfaces para representar estruturas de dados é uma prática comum e, isoladamente, não caracteriza um problema.

O CF-04 e o CF-07 precisam ser tratados com cuidado. A presença de condicionais não significa, por si só, que exista `Switch Statements`; é necessário avaliar se há lógica de seleção que tende a crescer e dificulta a manutenção. Da mesma forma, uma função que recebe uma lista como parâmetro não caracteriza automaticamente `Feature Envy`.

## Direção das refatorações

As mudanças devem ser feitas em etapas pequenas, mantendo os testes como proteção do comportamento existente. A prioridade inicial é reduzir a concentração de responsabilidades em `App.tsx`, reaproveitar a lógica de persistência e simplificar a passagem de propriedades quando isso trouxer benefício real.

Não considerar um item como resolvido apenas porque o código foi movido para outro arquivo. A refatoração precisa melhorar a organização e manter o comportamento esperado.

## Evidências

- Arquivo principal analisado: `src/App.tsx`.
- Componentes também analisados: `src/components/Sidebar.tsx` e `src/components/Modal.tsx`.
- Tipos e dados iniciais: `src/types.ts` e `src/data/seed.ts`.
- Referência conceitual: material de aula `topico10-code_smells.pdf`.

## Roteiro de 1 minuto

Na análise inicial, o principal ponto encontrado foi a concentração de responsabilidades no `App.tsx`. A função principal controla estados, persistência e várias partes da interface. Também existem três efeitos semelhantes para salvar dados no armazenamento local e um componente que recebe várias propriedades. Alguns outros itens foram mantidos como candidatos, porque não basta encontrar uma condicional ou uma função que consulta uma lista para afirmar que existe um Code Smell. A ideia é refatorar somente o que tiver justificativa no código.

## Situação após as refatorações

Após as alterações realizadas no projeto, os itens identificados inicialmente foram revisados considerando a estrutura atual do código.

| ID | Code Smell | Situação atual | Justificativa |
|---|---|---|---|
| CF-01 | Large Class | Melhorado | Parte das responsabilidades que estavam concentradas no `App.tsx` foi distribuída entre componentes, hooks e módulos auxiliares. |
| CF-02 | Long Method | Melhorado, mas ainda presente | A extração das páginas e dos formulários reduziu o tamanho da função principal. Mesmo assim, `App()` ainda reúne estados, funções de manipulação e a montagem da interface. |
| CF-03 | Long Parameter List | Candidato | O `Dashboard` recebe oito propriedades. Entretanto, elas possuem finalidades distintas e são utilizadas pelo componente. Não foi realizada uma alteração apenas para reduzir essa quantidade. |
| CF-04 | Switch Statements | Não confirmado | A seleção das páginas utiliza condicionais com `activePage`. A lógica atual é simples e não apresenta complexidade suficiente para justificar uma refatoração específica. |
| CF-05 | Divergent Change | Melhorado | A separação das páginas, formulários e elementos compartilhados reduziu a necessidade de concentrar alterações de diferentes áreas no `App.tsx`. |
| CF-06 | Duplicate Code | Resolvido | Os efeitos semelhantes de persistência foram substituídos pelo hook `useLocalStorage.ts`, que centraliza essa responsabilidade. |
| CF-07 | Feature Envy | Não confirmado | A função `getPatientName()` realiza uma busca simples na lista de pacientes. Não há evidência suficiente de que esteja assumindo responsabilidades inadequadas. |

### Resultado das refatorações

A principal mudança foi a redução da concentração de responsabilidades no arquivo `App.tsx`. As páginas e os formulários passaram a ter componentes próprios, os elementos visuais compartilhados foram organizados em `Shared.tsx` e a persistência dos dados foi centralizada em um hook.

O `App.tsx` ainda mantém a coordenação geral da aplicação, incluindo estados, operações e navegação. Portanto, os itens CF-01 e CF-02 foram melhorados, mas não devem ser considerados completamente eliminados.

O item CF-06 foi resolvido com a criação do hook de persistência. Os itens CF-03, CF-04 e CF-07 foram mantidos como candidatos ou não confirmados, pois não foi encontrada justificativa suficiente para realizar novas alterações.

### Roteiro atualizado para apresentação

Na análise inicial, encontramos uma concentração de responsabilidades no `App.tsx`, além de trechos semelhantes responsáveis pela persistência dos dados. Durante as refatorações, separamos as páginas, os formulários e os componentes compartilhados, além de criar um hook para centralizar o armazenamento local. Com isso, conseguimos melhorar a organização do projeto e resolver a duplicação da persistência. Alguns pontos permaneceram como candidatos, porque não apresentavam evidências suficientes para justificar novas alterações. A intenção foi melhorar o código sem modificar partes que já estavam funcionando corretamente.
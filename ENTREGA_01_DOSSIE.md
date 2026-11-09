# Entrega 01 — Dossiê e diagnóstico inicial

**Projeto:** ClinicFlow  
**Repositório:** https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL  
**Data do diagnóstico:** 09/11/2026  
**Versão original:** branch `original`  
**Status:** diagnóstico inicial atualizado 

> Este documento separa os dados efetivamente medidos dos itens ainda pendentes. O objetivo é registrar o ponto de partida antes das refatorações, sem atribuir ao projeto resultados que ainda não foram verificados.

## 1. Integrante e repositório

### Integrante

| Integrante | Participação |
|---|---|
| Gustavo Freitas | Trabalho individual|

### Repositório

- **URL:** https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL
- **Branch original:** `original`
- **Hash completo da versão original:** `a7f12fbe489e0b1894cb605a7ffe88960c4750bf`
- **Branch de desenvolvimento:** `main`
- **Hash da main após o merge do PR #1:** `a2eac7873d4a4ee8667e2afab929e28e187b8e27`
- **PR #1:** `chore/testes-e-qualidade` — integrado à `main`.
- **Commit de configuração de testes:** `99bd29a` — `test: configure automated tests and coverage`.

A branch `original` deve permanecer congelada. As alterações seguintes devem ser realizadas em branches de trabalho e integradas à `main` por Pull Requests. Como o projeto é individual, a revisão técnica será registrada pelo próprio autor; não se deve declarar revisão por colega ou aprovação de outro integrante.

## 2. Descrição do software

### 2.1 Domínio e objetivo

O ClinicFlow é uma aplicação web demonstrativa para apoiar a organização das rotinas administrativas de um consultório. Reúne informações de pacientes, consultas e registros de evolução em uma interface única.

O objetivo do trabalho é melhorar a estrutura interna do código por meio de técnicas de Clean Code e refatoração, preservando o comportamento funcional existente.

**Limitação de uso:** trata-se de um protótipo acadêmico de frontend, com dados fictícios e persistência no `localStorage` do navegador. Não deve ser utilizado para armazenar dados reais de pacientes nem ser considerado um prontuário clínico pronto para produção.

### 2.2 Funcionalidades identificadas

- Dashboard com indicadores e agenda do dia.
- Cadastro, listagem, pesquisa e exclusão de pacientes.
- Agendamento e listagem de consultas.
- Conclusão e cancelamento de consultas.
- Registro e consulta de evoluções clínicas demonstrativas.
- Filtro de evoluções por paciente.
- Persistência local dos dados no navegador.

### 2.3 Stack tecnológica

| Tecnologia | Finalidade |
|---|---|
| React 18 | Construção da interface por componentes |
| TypeScript 5.6 | Tipagem estática |
| Vite 6 | Servidor de desenvolvimento e build |
| Lucide React | Ícones |
| CSS | Estilização da interface |
| ESLint 9 | Análise estática e lint |
| Vitest 3 | Execução dos testes |
| React Testing Library 16 | Testes de componentes e interações |
| jsdom 25 | Ambiente DOM para testes |
| `@vitest/coverage-v8` 3 | Medição de cobertura |
| `localStorage` | Persistência local no navegador |

A versão analisada não possui backend, API própria, banco de dados remoto nem autenticação real.

## 3. Contagem de linhas — CLOC

A medição foi realizada com **cloc 2.10**, considerando os arquivos TypeScript, JavaScript e CSS do projeto e excluindo dependências, arquivos gerados, testes e diretórios de controle de versão.

Comando utilizado:

```bash
cloc . --include-lang=TypeScript,JavaScript,CSS --exclude-dir=node_modules,dist,coverage,test,tests,.git --not-match-f='\.test\.'
```

Resultado informado pelo terminal:

```text
Language      files    blank   comment     code
TypeScript        8       42         0      407
JavaScript        1        1         0       24
CSS               1        0         0       11
------------------------------------------------
SUM:             10       43         0      442
```

**Total inicial: 442 linhas de código (LOC).**

O número atende ao intervalo de 400 a 800 linhas estabelecido na atividade. Essa contagem representa a versão inicial do código de aplicação, sem contabilizar os testes automatizados e as dependências de terceiros.

## 4. Baseline inicial

O baseline representa o estado inicial do projeto antes das refatorações estruturais. A suíte de testes e as ferramentas de qualidade foram configuradas para permitir a medição e proteger o comportamento durante as mudanças.

### 4.1 Testes e cobertura

Foram configurados seis testes automatizados em `src/App.test.tsx`:

1. Renderização dos indicadores do dashboard.
2. Pesquisa/filtro de pacientes.
3. Cadastro de paciente e persistência no `localStorage`.
4. Conclusão de consulta.
5. Filtro de evoluções por paciente.
6. Confirmação antes da exclusão de paciente.

Resultado medido:

```text
Test Files  1 passed (1)
Tests       6 passed (6)

Coverage:
All files  86.20% statements
           83.33% branches
           62.50% functions
           86.20% lines
```

**Cobertura de linhas inicial medida: 86,20%.**

A cobertura supera a referência de aproximadamente 50% indicada na atividade. O relatório deve ser mantido como baseline da suíte de caracterização antes das refatorações.

Observação: arquivos exclusivamente de tipos TypeScript não executam lógica em tempo de execução e podem aparecer com cobertura zero sem representar, por si só, falha de teste.

### 4.2 Linter

O projeto utiliza ESLint 9 com configuração em `eslint.config.js`.

Comando:

```bash
npm run lint
```

Resultado medido: execução concluída sem erros e sem avisos reportados.

### 4.3 Build

Comando:

```bash
npm run build
```

Resultado medido: build de produção concluído com sucesso pelo Vite, após a verificação de tipos TypeScript.

### 4.4 Complexidade

A complexidade ciclomática ainda não foi medida por uma ferramenta específica. Essa métrica ficará registrada como **não aferida** até que seja configurada uma regra/ferramenta e executada tanto na versão original quanto nas versões refatoradas. Não será atribuído um valor estimado.

### 4.5 Instalação de dependências e auditoria

Na execução de `npm ci`, o npm informou **13 vulnerabilidades** nas dependências instaladas: 10 moderadas e 3 críticas. Esse resultado será investigado com `npm audit`, identificando os pacotes afetados antes de qualquer atualização. Não será utilizado `npm audit fix --force` sem avaliar possíveis alterações incompatíveis.

### 4.6 Resumo do baseline

| Métrica | Resultado |
|---|---:|
| LOC medido com cloc 2.10 | 442 |
| Testes automatizados | 6 aprovados |
| Cobertura de linhas | 86,20% |
| Cobertura de branches | 83,33% |
| Cobertura de funções | 62,50% |
| ESLint | Sem erros ou avisos |
| Build de produção | Sucesso |
| Complexidade ciclomática | Não aferida |
| Vulnerabilidades npm reportadas na instalação | 13 (10 moderadas, 3 críticas) |

## 5. Catálogo inicial de code smells

A análise foi feita sobre os arquivos da versão original do ClinicFlow, principalmente `src/App.tsx`. As linhas abaixo referem-se à cópia analisada; podem mudar após as refatorações.

| ID | Code smell | Categoria do Tópico 10 | Evidência no código | Impacto |
|---|---|---|---|---|
| CF-01 | Large Class / componente com responsabilidades excessivas | Inchaços | `src/App.tsx`, componente `App`, linhas 35–168 | O componente concentra estados, persistência, operações de pacientes, consultas e evoluções, filtros, navegação e apresentação dos modais. A concentração dificulta compreender e alterar o módulo. |
| CF-02 | Long Method | Inchaços | `src/App.tsx`, função `App`, linhas 35–168 | A função principal possui um fluxo extenso de estados, efeitos, handlers e uma árvore de renderização grande. É difícil localizar e testar isoladamente cada responsabilidade. |
| CF-03 | Long Parameter List | Inchaços | `src/App.tsx`, componente `Dashboard`, aproximadamente linhas 189–227 | O Dashboard recebe oito propriedades entre dados, indicadores e callbacks. A interface do componente fica mais trabalhosa de compreender e evoluir. |
| CF-04 | Switch Statements (condicionais por tipo) — candidato a validar | Abusos da OO | `src/App.tsx`, seleção de páginas nas linhas 126–136 e função `pageTitle` | A página ativa é tratada por verificações condicionais em mais de um ponto. A classificação deve ser mantida como candidata, pois condicionais simples de renderização são comuns em React; o problema só se confirma se a lógica de variação estiver excessivamente espalhada. |
| CF-05 | Divergent Change | Impedidores de Mudança | `src/App.tsx`, linhas 35–112 | O mesmo módulo precisa mudar por motivos distintos: alterações de interface, regras de pacientes, consultas, evoluções, persistência e notificações. Há múltiplas razões independentes para modificar o componente. |
| CF-06 | Duplicated Code | Dispensáveis | `src/App.tsx`, linhas 46–48 | Três `useEffect` repetem a mesma estrutura para salvar pacientes, consultas e evoluções no `localStorage`. A repetição pode ser encapsulada sem alterar o comportamento. |
| CF-07 | Feature Envy — candidato a validar | Acopladores | `src/App.tsx`, função `getPatientName`, linhas 31–33, utilizada por diferentes componentes | A função utilitária recebe a coleção de pacientes e consulta seus dados para obter o nome. Como o projeto usa funções e componentes funcionais, e não métodos de classes de domínio, a correspondência com a definição clássica de Feature Envy não é perfeita. A classificação deve ser validada antes de ser tratada como smell definitivo. |

### 5.1 Situação da cobertura das cinco categorias

O catálogo contém sete ocorrências/candidatos e apresenta pelo menos um item associado a cada categoria. Entretanto, **CF-04 e CF-07 estão marcados como candidatos**, não como diagnósticos definitivos. A confirmação dessas duas classificações é uma pendência de validação técnica e acadêmica.

Não serão inventadas ocorrências de Recusa de Herança, Campo Temporário, Intimidade Inapropriada ou Cadeia de Mensagens: a estrutura atual é baseada em componentes e funções React e não apresenta evidência clara desses problemas.

## 6. Plano inicial de refatoração

O trabalho será dividido em Pull Requests pequenos, com uma mudança estrutural por vez e testes executados antes e depois.

| PR planejado | Objetivo | Técnicas do Tópico 11 | Grupo |
|---|---|---|---|
| PR 02 — separar persistência | Retirar a repetição dos efeitos de persistência e centralizar leitura/gravação | Extrair Método; Extrair Variável | Composição de Métodos |
| PR 03 — separar lógica de domínio | Mover operações de pacientes, consultas e evoluções para módulos coesos | Mover Função; Extrair Classe/módulo | Movendo Recursos entre Objetos |
| PR 04 — decompor App | Reduzir a responsabilidade do componente principal e isolar componentes de página | Extrair Componente / Extrair Método | Composição de Métodos |
| PR 05 — simplificar propriedades | Reduzir a lista de propriedades do Dashboard, se continuar necessária após a separação | Introduzir Objeto-Parâmetro | Simplificação de Chamadas |
| PR 06 — organizar navegação | Centralizar títulos e metadados das páginas e reavaliar condicionais de seleção | Substituir Condicional por configuração/estrutura adequada; Renomear Método | Organização de Dados / Simplificação de Condicionais |
| PR 07 — revisar consultas e pacientes | Corrigir a localização das consultas de dados e evitar mutação do array recebido | Mover Função; Extrair Variável; Substituir Algoritmo, se aplicável | Movendo Recursos / Composição de Métodos |

A sequência e a numeração final dos PRs serão ajustadas conforme o catálogo de smells confirmado. Cada PR deverá registrar o problema, a técnica aplicada, os testes, o lint e o resultado do build.

## 7. Estratégia de Git e revisão

- `original` representa a versão anterior e deve permanecer congelada.
- `main` recebe as alterações aprovadas por Pull Requests.
- Cada refatoração será desenvolvida em uma branch específica.
- Os commits devem seguir Conventional Commits.
- O autor fará uma auto-revisão técnica documentada, verificando diff, testes, lint, build e preservação do comportamento.

## 8. Ferramentas utilizadas e planejadas

| Ferramenta | Uso | Situação |
|---|---|---|
| Git e GitHub | Versionamento, branches e Pull Requests | Em uso |
| cloc 2.10 | Contagem de LOC | Executado |
| Node.js e npm | Ambiente e dependências | Em uso |
| React e TypeScript | Interface e tipagem | Já utilizados pelo projeto |
| Vite | Desenvolvimento e build | Em uso |
| ESLint | Lint e análise estática | Configurado e executado |
| Vitest | Testes automatizados | Configurado e executado |
| React Testing Library | Testes de componentes | Configurada e utilizada |
| jsdom | DOM simulado | Configurado |
| V8 Coverage | Cobertura de testes | Configurado e executado |
| GitHub Actions | Integração contínua | Pendente de implementação |
| Husky | Hooks Git | Pendente de implementação |
| commitlint | Validação de Conventional Commits | Pendente de implementação |
| Ferramenta de complexidade | Medição comparativa | Pendente de escolha/configuração |
| ChatGPT (GPT-6) | Apoio à análise, documentação e sugestões | Utilizado com revisão humana |

## 9. Riscos e limitações

### 9.1 Limitações técnicas

- Aplicação frontend sem backend ou banco de dados remoto.
- Dados armazenados localmente no navegador.
- Sem autenticação real, controle de acesso ou perfis de usuário.
- Sem backup, sincronização ou recuperação de dados.
- Sem integração com serviços externos.
- Não adequada para armazenar dados clínicos reais.

### 9.2 Riscos do trabalho

- A cobertura atual é uma proteção para as refatorações, mas os seis testes não garantem todos os fluxos possíveis.
- Os candidatos CF-04 e CF-07 precisam de validação para evitar classificações artificiais.
- As vulnerabilidades encontradas pelo npm precisam ser analisadas sem atualizações forçadas que possam quebrar a aplicação.
- A complexidade ciclomática ainda não possui baseline numérico.
- A configuração de CI, hooks e Conventional Commits ainda precisa ser concluída e demonstrada em execução.

## 10. Uso de inteligência artificial

ChatGPT foi utilizado como apoio para leitura do código, identificação de possíveis problemas, organização do plano de refatoração e preparação da documentação. As sugestões não são aceitas automaticamente: o autor deve compreender as alterações, revisar os diffs e executar testes, lint e build antes de integrá-las.

O uso de IA será informado na documentação e na apresentação, sem atribuir à ferramenta a autoria ou validação final das decisões técnicas.

## 11. Pendências para concluir a Entrega 01

- [x] Confirmar aprovação do ClinicFlow como projeto-base.
- [x] Registrar repositório público e branches.
- [x] Registrar hash da versão original.
- [x] Medir LOC com cloc.
- [x] Configurar e executar testes automatizados.
- [x] Medir cobertura de testes.
- [x] Executar ESLint.
- [x] Executar build de produção.
- [ ] Validar definitivamente os candidatos CF-04 e CF-07 para confirmar a cobertura das cinco categorias.
- [ ] Medir complexidade ciclomática.
- [ ] Investigar as 13 vulnerabilidades indicadas pelo npm.
- [ ] Implementar CI, hooks e commitlint e registrar evidências.
- [ ] Criar/atualizar o CHANGELOG e os seis arquivos de documentação exigidos para a entrega final.

## 12. Evidências

- Repositório: https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL
- Branch `original`: `a7f12fbe489e0b1894cb605a7ffe88960c4750bf`
- Branch `main` após PR #1: `a2eac7873d4a4ee8667e2afab929e28e187b8e27`
- Commit de testes: `99bd29a`
- Saída do `cloc`: 442 LOC, conforme seção 3.
- Execução de testes e cobertura: 6 testes aprovados e 86,20% de cobertura de linhas.
- Execução do ESLint: sem erros e sem avisos.
- Build: concluído com sucesso.
- ZIP analisado: `ClinicFlow-Git(1).zip`, enviado em 09/11/2026.

## 13. Roteiro de 1 minuto

O ClinicFlow é uma aplicação web demonstrativa para gestão de pacientes, consultas e evoluções de um consultório. O projeto utiliza React, TypeScript e Vite, com persistência local pelo navegador. A versão original está preservada na branch `original`, enquanto a `main` recebe as melhorias por Pull Requests. A contagem inicial foi de 442 linhas com cloc 2.10. Para estabelecer uma rede de segurança, foram adicionados seis testes automatizados, que passaram com 86,20% de cobertura de linhas. O ESLint e o build também foram executados com sucesso. O diagnóstico inicial identificou concentração de responsabilidades no `App.tsx`, repetição na persistência e outros candidatos a code smells. O próximo passo é validar os candidatos das categorias exigidas e aplicar refatorações pequenas, sempre preservando o comportamento do sistema.

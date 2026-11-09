# Repositório e fluxo de trabalho

## Repositório

Endereço público:

https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL

O projeto foi desenvolvido individualmente, conforme alinhamento realizado para a atividade. Por esse motivo, as revisões técnicas foram feitas pelo próprio autor, sem registrar aprovações de outros integrantes.

## Organização das branches

- `original`: mantém a versão original utilizada como referência para o diagnóstico.
- `main`: reúne as alterações integradas ao projeto.
- Branches de trabalho: utilizadas para desenvolver mudanças específicas antes da abertura de Pull Requests.

A branch `original` foi preservada como referência. As alterações foram desenvolvidas em branches separadas e, na maior parte do trabalho, integradas à `main` por meio de Pull Requests.

## Referências de versão

| Referência | Identificador |
|---|---|
| Commit da versão original | `a7f12fbe489e0b1894cb605a7ffe88960c4750bf` |
| Commit da integração de qualidade | `c1acb8a` |

O commit `c1acb8a` corresponde à integração do Husky e do workflow do GitHub Actions. Ele foi enviado diretamente para a branch `main`, como uma exceção ao fluxo de Pull Requests utilizado nas demais alterações.

## Pull Requests realizados

| PR | Branch | Objetivo | Situação |
|---|---|---|---|
| #1 | `chore/testes-e-qualidade` | Preparação dos testes e verificações de qualidade. | Integrado |
| #2 | `docs/entrega-01-dossie` | Inclusão do dossiê inicial. | Integrado |
| #3 | `docs/readme-e-changelog` | Atualização do README e do CHANGELOG. | Integrado |
| #4 | `docs/documentacao-tecnica` | Inclusão da documentação técnica. | Integrado |
| #5 | `refactor/decompor-app` | Extração de componentes e redução das responsabilidades concentradas no componente principal. | Integrado |
| #6 | `refactor/reorganizar-app` | Centralização da persistência dos dados no hook `useLocalStorage`. | Integrado |
| #7 | `refactor/separar-telas` | Separação das telas em componentes específicos. | Integrado |
| #8 | `refactor/separar-formularios` | Separação dos formulários em componentes independentes. | Integrado |
| #9 | `docs/atualizar-arquitetura` | Atualização da documentação da arquitetura. | Integrado |
| #10 | `docs/atualizar-analise-smells` | Atualização da análise dos Code Smells. | Integrado |
| #11 | `refactor/parametro-dashboard` | Agrupamento dos parâmetros do Dashboard em objetos de dados e ações. | Integrado |
| #12 | `refactor/simplificar-status-consultas` | Simplificação da definição das classes CSS dos status das consultas por meio de uma tabela de mapeamento. | Integrado |

As seis PRs de refatoração de código foram as de número 5, 6, 7, 8, 11 e 12. As demais foram utilizadas para preparação, qualidade e documentação do projeto.

## Fluxo de trabalho

O fluxo utilizado durante o desenvolvimento foi:

1. Atualizar a `main` local com as alterações do repositório.
2. Criar uma branch específica para a tarefa.
3. Implementar uma mudança por vez.
4. Executar testes, lint e build quando aplicável.
5. Conferir `git status` e revisar o diff.
6. Fazer commit com uma mensagem que explique a alteração.
7. Enviar a branch ao GitHub e abrir um Pull Request.
8. Integrar a alteração à `main`.

Como o trabalho foi desenvolvido individualmente, a revisão técnica ficou sob responsabilidade do próprio autor. Não foram registradas aprovações de colegas ou revisões externas que não ocorreram.

A configuração do Husky e do GitHub Actions foi adicionada posteriormente, no commit `c1acb8a`, diretamente na `main`. O hook local executa o ESLint e os testes antes do commit. O workflow do GitHub Actions executa lint, testes e build em pushes e Pull Requests direcionados à `main`.

## Comandos úteis

Consultar a situação do repositório:

```cmd
git status --short --branch
```

Consultar branches:

```cmd
git branch -a
```

Atualizar a `main`:

```cmd
git switch main
git pull origin main
```

Criar uma branch de trabalho:

```cmd
git switch -c nome-da-branch
```

Revisar as alterações:

```cmd
git diff
git diff --check
```

Registrar e enviar alterações:

```cmd
git add .
git commit -m "tipo: descrição da alteração"
git push -u origin nome-da-branch
```

Consultar o histórico:

```cmd
git log --oneline --graph --all
```

Consultar os commits posteriores à versão original:

```cmd
git log --oneline origin/original..main
```

Consultar a quantidade de commits por autor:

```cmd
git shortlog -sn origin/original..main
```

## Evidências

- Repositório público: https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL
- Histórico das Pull Requests: [Pull Requests no GitHub](https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL/pulls)
- Histórico de commits: [Commits no GitHub](https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL/commits/main)
- Execuções de qualidade: [GitHub Actions](https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL/actions)
- Branch original: `original`.
- Commit da integração de qualidade: `c1acb8a`.

## Roteiro de 1 minuto

O ClinicFlow está em um repositório público no GitHub. A branch `original` foi preservada como referência para comparar o código antes e depois das refatorações. Ao longo do desenvolvimento foram realizadas 12 Pull Requests, incluindo seis voltadas diretamente à refatoração do código. Também foram adicionadas verificações automáticas com Husky e GitHub Actions. Como o projeto foi desenvolvido individualmente, as revisões ficaram sob responsabilidade do próprio autor.
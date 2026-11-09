# Repositório e fluxo de trabalho

## Repositório

Endereço público:

https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL

O projeto está sendo desenvolvido individualmente, conforme alinhamento realizado para a atividade.

## Organização das branches

- `original`: mantém a versão original utilizada como referência para o diagnóstico.
- `main`: reúne as alterações integradas ao projeto.
- branches de trabalho: utilizadas para desenvolver mudanças específicas antes de abrir pull requests.

A branch `original` deve permanecer preservada. As alterações do trabalho devem partir da `main`, em branches separadas, e ser integradas por pull requests.

## Referências de versão

| Referência | Identificador |
|---|---|
| Commit da versão original | `a7f12fbe489e0b1894cb605a7ffe88960c4750bf` |
| Commit da `main` após integração da documentação inicial | `8ef8456` |

O identificador completo deve ser conferido no GitHub ou com `git rev-parse` antes da entrega final, caso a branch tenha recebido novos commits.

## Pull requests já realizados

| PR | Branch | Objetivo | Situação registrada |
|---|---|---|---|
| PR #1 | `chore/testes-e-qualidade` | Preparação dos testes e verificações de qualidade. | Integrado |
| PR #2 | `docs/entrega-01-dossie` | Inclusão do dossiê inicial. | Integrado |
| PR #3 | `docs/readme-e-changelog` | Atualização do README e criação/atualização do CHANGELOG. | Integrado |
| PR #4 | `docs/documentacao-tecnica` | Inclusão da documentação técnica. | Em preparação |

## Fluxo de trabalho

Para cada alteração:

1. Atualizar a `main` local com `git pull`.
2. Criar uma branch específica para a tarefa.
3. Implementar uma mudança por vez.
4. Executar testes, lint e build quando aplicável.
5. Conferir `git status` e revisar o diff.
6. Fazer commit com mensagem que explique a alteração.
7. Enviar a branch ao GitHub e abrir um pull request.
8. Integrar a alteração após a revisão e as verificações exigidas.

Como o trabalho é individual, a revisão técnica deve ser feita pelo próprio autor. Não registrar aprovação de outra pessoa quando ela não ocorreu.

## Comandos úteis

```cmd
git status --short --branch
git branch
git switch main
git pull origin main
git switch -c nome-da-branch
git diff
git add .
git commit -m "tipo: descrição da alteração"
git push -u origin nome-da-branch
```

## Evidências

- Repositório público: https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL
- Branch atual de documentação: `docs/documentacao-tecnica`.
- Histórico de PRs: seção Pull requests do GitHub.
- Commit original: `a7f12fbe489e0b1894cb605a7ffe88960c4750bf`.

## Roteiro de 1 minuto

O projeto está em um repositório público no GitHub. A branch `original` foi preservada como referência e as mudanças são desenvolvidas em branches separadas, integradas por pull requests. Já foram integradas as etapas de testes e qualidade, dossiê inicial e README com CHANGELOG. A documentação técnica está sendo preparada em uma branch própria, mantendo o histórico de alterações organizado.

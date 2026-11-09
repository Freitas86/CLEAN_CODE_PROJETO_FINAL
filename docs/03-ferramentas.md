# Ferramentas

## Tecnologias do projeto

| Ferramenta | Utilização |
|---|---|
| React | Construção da interface por componentes. |
| TypeScript | Tipagem do código da aplicação. |
| Vite | Ambiente de desenvolvimento e geração da versão de produção. |
| Vitest | Execução dos testes automatizados e coleta de cobertura. |
| Testing Library | Testes de interação e comportamento da interface. |
| ESLint | Análise estática e identificação de problemas de código. |
| Lucide React | Ícones utilizados na interface. |
| Git e GitHub | Controle de versão e revisão das alterações por pull requests. |
| cloc | Contagem de linhas de código. |

## Comandos utilizados

Instalação das dependências:

```cmd
npm ci
```

Execução local:

```cmd
npm run dev
```

Testes:

```cmd
npm test
```

Testes com cobertura:

```cmd
npm run test -- --coverage
```

Análise do ESLint:

```cmd
npm run lint
```

Build de produção:

```cmd
npm run build
```

Contagem de linhas:

```cmd
cloc . --include-lang=TypeScript,JavaScript,CSS --exclude-dir=node_modules,dist,coverage,test,tests,.git --not-match-f='\.test\.'
```

## Resultados da linha de base

- ESLint: execução concluída sem avisos ou erros.
- Build: execução concluída com sucesso.
- Testes: 6 aprovados.
- Cobertura de linhas: 86,20%.
- cloc: 442 linhas de código, considerando os filtros registrados no comando acima.

## Integração de qualidade

A análise do ESLint e os testes fazem parte das verificações locais do projeto. A integração em hooks e no fluxo de CI deve ser documentada como concluída somente depois de existir configuração no repositório e evidência de execução. Não registrar uma etapa como automatizada apenas porque o comando pode ser executado manualmente.

## Observação sobre dependências

Na instalação registrada com `npm ci`, o npm informou 13 vulnerabilidades: 10 moderadas e 3 críticas. Esse resultado deve ser tratado como ponto de atenção e investigado com os comandos de auditoria do npm. Não executar `npm audit fix --force` sem avaliar o impacto das atualizações, pois isso pode introduzir mudanças incompatíveis.

## Evidências

- Scripts: `package.json`.
- Configuração ESLint: `eslint.config.js`.
- Configuração Vitest: `vitest.config.ts` e `vite.config.ts`.
- Contagem de linhas: comando `cloc` documentado nesta página.
- Resultados iniciais: lint e build sem erros; seis testes aprovados.

## Roteiro de 1 minuto

O projeto utiliza React e TypeScript, com Vite para desenvolvimento e build. Para qualidade, foram usados Vitest e Testing Library nos testes, ESLint na análise estática e cloc para medir o tamanho do código. Na linha de base, o lint e o build terminaram sem erros, os seis testes passaram e o projeto apresentou 442 linhas de código dentro dos filtros definidos.

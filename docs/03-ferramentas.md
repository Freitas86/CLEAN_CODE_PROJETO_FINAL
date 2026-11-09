# Ferramentas

## Tecnologias do projeto

| Ferramenta | Utilização |
|---|---|
| React 18.3.1 | Construção da interface por componentes. |
| TypeScript | Tipagem do código da aplicação. |
| Vite 6.4.6 | Ambiente de desenvolvimento e geração da versão de produção. |
| Vitest 3.0.0 | Execução dos testes automatizados e coleta de cobertura. |
| Testing Library | Testes de interação e comportamento da interface. |
| ESLint 9.17.0 | Análise estática e identificação de problemas de código. |
| Husky 9.1.7 | Execução automática de verificações antes dos commits. |
| Git e GitHub | Controle de versão, histórico e pull requests. |
| GitHub Actions | Execução automatizada das verificações no repositório. |
| cloc | Contagem de linhas de código. |
| Lucide React 0.468.0 | Ícones utilizados na interface. |

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
npm run test:coverage
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

Antes das refatorações, foram registrados:

- ESLint: execução sem erros.
- Build: execução concluída com sucesso.
- Testes: 6 aprovados.
- Cobertura de linhas: 86,20%.
- cloc: 442 linhas de código, considerando os filtros registrados.

## Resultados após as alterações

Na versão atual, foram obtidos:

- Testes: 7 aprovados em 2 arquivos.
- Cobertura de instruções: 80,65%.
- Cobertura de branches: 81,73%.
- Cobertura de funções: 63,49%.
- Cobertura de linhas: 80,65%.
- ESLint: execução concluída sem erros.
- Build: execução concluída com sucesso.

A cobertura atual permanece acima dos 50% previstos na atividade. A redução em relação à linha de base não significa, isoladamente, piora na qualidade: a estrutura e a quantidade de código mudaram durante as refatorações.

## Integração de qualidade

Foram configuradas duas etapas de verificação automática:

**1. Hook local com Husky**

O arquivo `.husky/pre-commit` executa:

```cmd
npm run lint
npm test
```

Assim, o lint e os testes são executados antes da criação de um commit.

**2. Integração contínua com GitHub Actions**

O arquivo `.github/workflows/quality.yml` configura o workflow `Quality Checks`, executado em pushes e pull requests direcionados à branch `main`.

As etapas são:

- Instalação das dependências com `npm ci`.
- Execução do ESLint.
- Execução dos testes.
- Build de produção.

A execução do workflow foi conferida no GitHub e apresentou resultado de sucesso.

## Uso de inteligência artificial

O ChatGPT foi utilizado como apoio durante a análise de Code Smells, discussão das possibilidades de refatoração e organização da documentação. As alterações foram aplicadas e verificadas no próprio projeto, com execução de testes, lint e build.

A ferramenta foi utilizada como apoio, não como substituta da conferência do código. As sugestões precisaram ser avaliadas conforme a estrutura existente e os resultados das verificações.

## Observação sobre dependências

Durante a instalação do Husky, o npm informou 13 vulnerabilidades: 10 moderadas e 3 críticas. Esse resultado deve ser investigado em uma revisão posterior das dependências. Não foi executado `npm audit fix --force`, evitando atualizações automáticas potencialmente incompatíveis.

## Evidências

- Scripts: `package.json`.
- Configuração ESLint: `eslint.config.js`.
- Configuração Vitest: `vitest.config.ts`.
- Hook local: `.husky/pre-commit`.
- Integração contínua: `.github/workflows/quality.yml`.
- Resultados dos testes: `npm test`.
- Relatório de cobertura: `npm run test:coverage`.
- Build: `npm run build`.

## Roteiro de 1 minuto

O projeto utiliza React, TypeScript e Vite. Para verificar a qualidade, foram utilizados Vitest, Testing Library e ESLint. Também foram configurados o Husky, que executa lint e testes antes dos commits, e o GitHub Actions, que repete as verificações no repositório. Na versão atual, os sete testes passaram e a cobertura de linhas ficou em 80,65%, acima do mínimo previsto na atividade.
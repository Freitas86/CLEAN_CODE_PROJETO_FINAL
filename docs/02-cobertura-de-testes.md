# Cobertura de testes

## Objetivo

Registrar a situação dos testes antes das refatorações e definir como verificar se as mudanças preservam o comportamento do ClinicFlow.

## Estrutura atual

Os testes automatizados são executados com Vitest e Testing Library. O arquivo de testes informado na linha de base é `src/App.test.tsx`.

Foram registrados seis testes cobrindo os seguintes comportamentos:

- Exibição do painel inicial.
- Pesquisa de pacientes.
- Cadastro de paciente e persistência no `localStorage`.
- Finalização de consulta.
- Filtragem de prontuários.
- Confirmação de exclusão.

## Linha de base

Comando utilizado:

```cmd
npm run test -- --coverage
```

Resultado registrado:

| Indicador | Resultado inicial |
|---|---:|
| Testes executados | 6 |
| Testes aprovados | 6 |
| Statements | 86,20% |
| Branches | 83,33% |
| Functions | 62,50% |
| Lines | 86,20% |

A cobertura de linhas supera o mínimo de 50% definido para o trabalho. Mesmo assim, a cobertura não garante que todos os cenários possíveis estejam testados.

## Resultado por arquivo

| Arquivo | Statements | Branches | Functions | Lines |
|---|---:|---:|---:|---:|
| `App.tsx` | 84,52% | 85,85% | 58,33% | 84,52% |
| `Modal.tsx` | 80,00% | 66,66% | 66,66% | 80,00% |
| `Sidebar.tsx` | 96,96% | 66,66% | 100,00% | 96,96% |
| `seed.ts` | 94,73% | 50,00% | 100,00% | 94,73% |

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
npm run test -- --coverage
```

O relatório HTML de cobertura é gerado na pasta `coverage`.

## Estratégia durante as refatorações

1. Executar os testes antes de alterar o código.
2. Fazer uma mudança pequena e específica.
3. Executar novamente os testes.
4. Comparar o resultado com a linha de base.
5. Corrigir falhas antes de seguir para outra mudança.
6. Registrar no commit o objetivo da alteração.

A comparação deve considerar tanto os testes aprovados quanto a cobertura. Se uma refatoração reduzir a cobertura ou remover cenários importantes, será necessário revisar a alteração.

## Evidências

- Testes: `src/App.test.tsx`.
- Configuração de testes: `vitest.config.ts` e `vite.config.ts`.
- Comando de referência: `npm run test -- --coverage`.
- Resultado inicial registrado: 6 testes aprovados e 86,20% de cobertura de linhas.

## Roteiro de 1 minuto

Antes das refatorações, o projeto tinha seis testes automatizados e todos passaram. A cobertura inicial de linhas foi de 86,20%, acima dos 50% exigidos. Os testes verificam funções importantes, como cadastro, pesquisa, finalização de consulta e exclusão. Durante o trabalho, eles serão executados novamente a cada mudança para conferir se o comportamento continua funcionando.

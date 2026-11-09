# Documentação do projeto

## Objetivo

Esta documentação foi organizada para facilitar a consulta das informações técnicas do ClinicFlow e apoiar a apresentação do trabalho de Clean Code.

Os documentos registram o diagnóstico inicial, as mudanças realizadas, os resultados dos testes e as decisões tomadas durante o desenvolvimento.

## Organização

| Documento | Conteúdo |
|---|---|
| `README.md` | Índice e orientação de leitura da documentação. |
| `01-analise-de-smells.md` | Diagnóstico dos Code Smells e situação de cada item. |
| `02-cobertura-de-testes.md` | Testes existentes, cobertura inicial e resultados atuais. |
| `03-ferramentas.md` | Tecnologias, comandos e ferramentas de qualidade. |
| `04-arquitetura-e-dependencias.md` | Estrutura do código, responsabilidades e limites da arquitetura. |
| `05-repositorio.md` | Branches, Pull Requests e fluxo de trabalho. |
| `06-documentacao.md` | Organização e manutenção dos próprios documentos. |

## Padrão de atualização

A documentação deve acompanhar o estado real do repositório. Quando uma refatoração for concluída:

- Atualizar a situação do Code Smell correspondente.
- Registrar quais arquivos foram alterados.
- Informar os testes executados e seus resultados.
- Atualizar métricas somente após nova medição.
- Incluir o commit ou Pull Request que contém a mudança.
- Retirar observações de pendência apenas quando houver evidência.
- Registrar limitações e pontos que ainda precisam de melhoria.

Os resultados da linha de base não devem ser substituídos. Eles servem para comparação com os resultados obtidos depois das refatorações.

Também é importante não apresentar como concluídas atividades que não foram realizadas. Revisões externas, aprovações de colegas e configurações de repositório devem ser descritas conforme o que realmente aconteceu.

## Cuidados com as evidências

As evidências podem incluir saídas do terminal, relatórios de cobertura, resultados do ESLint, resultado do build, commits e Pull Requests. Sempre que possível, registrar o comando utilizado e a data da execução.

Não incluir dados reais de pacientes, credenciais, tokens ou informações pessoais nos documentos e nas capturas de tela.

Os diagramas de arquitetura devem representar a estrutura real do código. Da mesma forma, os indicadores de cobertura devem corresponder à última execução dos testes.

## Evidências

- Índice: `docs/README.md`.
- Diagnóstico: `docs/01-analise-de-smells.md`.
- Métricas e testes: `docs/02-cobertura-de-testes.md`.
- Ferramentas e automação: `docs/03-ferramentas.md`.
- Arquitetura: `docs/04-arquitetura-e-dependencias.md`.
- Histórico: `docs/05-repositorio.md`.
- Repositório: [ClinicFlow no GitHub](https://github.com/Freitas86/CLEAN_CODE_PROJETO_FINAL).

## Roteiro de 1 minuto

A documentação foi dividida em arquivos menores para facilitar a consulta. Há um documento para o diagnóstico dos Code Smells, outro para testes e cobertura, um para ferramentas, um para arquitetura, um para o fluxo do Git e este arquivo com as orientações de manutenção. Os documentos foram atualizados para registrar as refatorações realizadas, os resultados obtidos e as limitações que ainda existem no projeto.
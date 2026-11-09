# Documentação do projeto

## Objetivo

Esta documentação foi organizada para facilitar a consulta das informações técnicas do ClinicFlow e apoiar a apresentação do trabalho de Clean Code.

## Organização

| Documento | Conteúdo |
|---|---|
| `README.md` | Índice e orientação de leitura. |
| `01-analise-de-smells.md` | Diagnóstico dos Code Smells e situação de cada item. |
| `02-cobertura-de-testes.md` | Testes existentes, cobertura inicial e estratégia de validação. |
| `03-ferramentas.md` | Tecnologias, comandos e ferramentas de qualidade. |
| `04-arquitetura-e-dependencias.md` | Estrutura do código, responsabilidades e limites da arquitetura. |
| `05-repositorio.md` | Branches, pull requests e fluxo de trabalho. |
| `06-documentacao.md` | Organização e manutenção dos próprios documentos. |

## Padrão de atualização

A documentação deve acompanhar o estado real do repositório. Quando uma refatoração for concluída:

- atualizar a situação do Code Smell correspondente;
- registrar quais arquivos foram alterados;
- informar os testes executados e seus resultados;
- atualizar métricas somente após nova medição;
- incluir o commit ou pull request que contém a mudança;
- retirar observações de pendência apenas quando houver evidência.

Os resultados da linha de base não devem ser substituídos. Eles servem para comparação com os resultados obtidos depois das refatorações.

## Cuidados com as evidências

As evidências podem incluir saídas do terminal, relatórios de cobertura, resultados do ESLint, resultado do build, commits e pull requests. Sempre que possível, registrar o comando utilizado e a data da execução.

Não incluir dados reais de pacientes, credenciais, tokens ou informações pessoais nos documentos e nas capturas de tela.

## Evidências

- Índice: `docs/README.md`.
- Diagnóstico: `docs/01-analise-de-smells.md`.
- Métricas: `docs/02-cobertura-de-testes.md` e `docs/03-ferramentas.md`.
- Arquitetura: `docs/04-arquitetura-e-dependencias.md`.
- Histórico: `docs/05-repositorio.md`.

## Roteiro de 1 minuto

A documentação foi dividida em arquivos menores para facilitar a consulta. Há um documento para o diagnóstico dos Code Smells, outro para testes e cobertura, um para ferramentas, um para arquitetura, um para o fluxo do Git e este arquivo com as orientações de manutenção. Quando as refatorações forem concluídas, os documentos serão atualizados com os resultados e as evidências correspondentes.

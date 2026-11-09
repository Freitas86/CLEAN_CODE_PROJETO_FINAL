# Changelog

Todas as mudanças relevantes do projeto são registradas neste arquivo.

O formato segue as convenções do [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Unreleased]

### Adicionado
- Testes automatizados utilizando Vitest e React Testing Library.
- Relatório de cobertura de testes com o provedor V8.
- Hook `useLocalStorage` para centralizar a persistência dos dados.
- Componentes separados para páginas, formulários e elementos compartilhados.
- Verificações automáticas de qualidade com Husky e GitHub Actions.
- Documentação da análise de Code Smells, refatorações, testes e arquitetura.

### Alterado
- Organização do componente principal `App.tsx`.
- Separação das páginas e dos formulários em componentes próprios.
- Agrupamento dos parâmetros do Dashboard nos objetos `data` e `actions`.
- Simplificação da associação entre os status das consultas e suas classes CSS.
- Atualização do README com instruções de instalação, execução e testes.

### Corrigido
- Repetição da lógica de persistência no armazenamento local.
- Organização da lógica de apresentação dos status das consultas.
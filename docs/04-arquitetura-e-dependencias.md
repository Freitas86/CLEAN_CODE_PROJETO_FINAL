# Arquitetura e dependências

## Visão geral

O ClinicFlow é uma aplicação web demonstrativa para apoiar tarefas de gerenciamento de uma clínica. A interface foi construída com React e TypeScript.

A versão analisada não possui backend próprio. Os dados de demonstração e as alterações realizadas durante o uso ficam no armazenamento local do navegador (`localStorage`). Por isso, o sistema não deve ser utilizado para armazenar dados reais de pacientes.

## Organização dos arquivos

```text
src/
├── App.test.tsx
├── App.tsx
├── main.tsx
├── styles.css
├── types.ts
├── components/
│   ├── Modal.tsx
│   └── Sidebar.tsx
├── data/
│   └── seed.ts
└── test/
    └── setup.ts
```

## Responsabilidade dos principais arquivos

| Arquivo | Responsabilidade observada |
|---|---|
| `main.tsx` | Inicializa a aplicação React e renderiza o componente principal. |
| `App.tsx` | Concentra estados, persistência local, funções de interação e montagem das páginas. |
| `types.ts` | Define os tipos usados para pacientes, consultas e prontuários. |
| `data/seed.ts` | Fornece dados fictícios para demonstração. |
| `components/Sidebar.tsx` | Apresenta o menu lateral e permite navegar entre páginas. |
| `components/Modal.tsx` | Apresenta uma janela modal e oferece o fechamento. |
| `App.test.tsx` | Reúne os testes automatizados da aplicação. |
| `styles.css` | Contém os estilos da interface. |

## Fluxo simplificado

1. `main.tsx` cria a raiz React e renderiza `App`.
2. `App.tsx` carrega os dados do `localStorage`, utilizando os dados de demonstração como alternativa inicial.
3. O usuário navega entre as áreas por meio do componente `Sidebar`.
4. As ações de cadastro, atualização e exclusão são processadas pelos manipuladores de `App.tsx`.
5. Os estados atualizados são persistidos no `localStorage`.
6. `Modal` é utilizado para apresentar formulários e outras interações em janela.

## Dependências e limites

A aplicação depende do navegador para executar a interface e armazenar os dados localmente. Não há, na versão analisada, serviço de autenticação ou API de backend descritos nesta arquitetura.

O `localStorage` não substitui um banco de dados de produção e não oferece, por si só, os controles de segurança, compartilhamento e governança necessários para informações clínicas reais.

## Ponto de atenção para refatoração

O principal ponto arquitetural identificado é a concentração de responsabilidades em `App.tsx`. A proposta é avaliar a separação de responsabilidades em componentes e módulos menores, mantendo a interface e o comportamento existentes.

A separação deve ser feita gradualmente, com testes executados antes e depois de cada alteração.

## Evidências

- Inicialização: `src/main.tsx`.
- Componente principal: `src/App.tsx`.
- Persistência: chamadas ao `localStorage` em `src/App.tsx`.
- Tipos: `src/types.ts`.
- Dados demonstrativos: `src/data/seed.ts`.
- Componentes: `src/components/Sidebar.tsx` e `src/components/Modal.tsx`.

## Roteiro de 1 minuto

A aplicação é organizada em React e TypeScript. O arquivo `main.tsx` inicia a interface e o `App.tsx` concentra boa parte do funcionamento, incluindo estados, persistência local e páginas. O menu lateral e a janela modal já estão separados em componentes próprios. Como o projeto não possui backend e usa `localStorage`, ele é apenas demonstrativo e não deve receber dados reais de pacientes. A principal melhoria planejada é distribuir melhor as responsabilidades hoje concentradas no componente principal.

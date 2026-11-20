# AGENTS.md — crmkimi

Diretrizes incrementais de referência visual e qualidade. Antes de editar código, consultar README e documentação já existente; GitHub é o registro de alterações.

## Referências externas para design e interação (17/11/2026)

- TasteSkill (https://www.tasteskill.dev/): método de revisão de direção visual, tipografia, espaçamento e composição autoral, nunca template a copiar.
- Transitions.dev (https://transitions.dev/): fonte de microinterações CSS quando houver interface web; `prefers-reduced-motion`, teclado, foco e contraste obrigatórios.
- React Bits (https://reactbits.dev/): considerar componentes React gratuitos individualmente, após revisão de licença MIT + Commons Clause, dependências, SSR (se houver) e bundle; sem Pro não licenciado.
- RiseClub (https://riseclub.tech/): observar organização de aprendizagem/comunidade e conteúdo editorial; jamais copiar conteúdo, interface, marcas ou dados.
- Escopo local: CRM: priorizar legibilidade de tabelas, filtros, formulários, estados de carregamento e feedback de ações. Não expor dados pessoais nem enfraquecer controles de autorização.
- Adoção apenas quando resolver necessidade real: branch/PR pequeno, verificação responsiva 390/1440 (para web), motion reduzido, sem mudanças em banco, DNS, credenciais, funis ou produção decorrentes deste documento.
- Não executar instaladores/skills/scripts externos automaticamente. Preservar instruções mais específicas, licenças e testes do projeto.

## Seleção contextual de skills compartilhadas (20/11/2026)

Este repositório participa do repertório de métodos de desenvolvimento reutilizáveis; seus contratos locais, regras de dados, identidade e gates sempre prevalecem. **Usar todas as competências pertinentes**, não instalar todas as ferramentas nem introduzir efeitos gratuitos.
- **Reanimate** (https://github.com/NiazMorshed2007/reanimate): adaptar apenas o método de engenharia de motion — observar estados/tempo/easing, criar solução autoral com CSS/WAAPI ou lib já existente, comparar capturas; não baixar, executar ou incorporar runtime de terceiros.
- **Gists públicos de QA**: diagnosticar oclusão mobile/CTA com https://gist.github.com/tobiashochguertel/bf7bc60f8946c7ecbe0d14782b4a8c99 e planejar capturas 390/1440 com https://gist.github.com/michael-matias-2026/d80389dfa08f4db9c5cc6020adf911ce ; são referências, não código para copiar/executar sem licença e revisão.
- **Playwright/a11y**: testar teclado, foco, touch, `prefers-reduced-motion`, overflow, loading/erro e desempenho somente quando pertinentes, preferindo os testes existentes. Adoção de SQL/RLS requer autorização separada e apenas hipóteses verificadas contra PostgreSQL oficial; nunca executar SQL de Gists em produção.
- **Foco local:** CRM, tabelas, filtros, formulários e ações auditáveis. Animação é opcional; clareza, desempenho, foco/teclado, sigilo de dados, autorização e estados de erro prevalecem. Não presumir que Playwright esteja instalado.
- Em cada micro-PR registrar `USE/ADAPT/REJECT/NOT_APPLICABLE`, custo, risco, licença, evidências e gates efetivamente executados. Sem mudança de banco, dados, DNS, segurança, funis ou produção; sem Lovable Max ou instaladores externos automáticos.

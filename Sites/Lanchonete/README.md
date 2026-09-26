# TasteHouse

Aplicativo web de delivery de comida com painel administrativo (white-label) — cardápio,
carrinho, checkout via PIX, acompanhamento de pedidos em tempo real, avaliações, reservas
e suporte.

## Stack

| Camada | Tecnologia |
|---|---|
| UI | React 19 + Vite 7 |
| Estilo | Tailwind CSS v4 (`@tailwindcss/vite`) + CSS por componente |
| Ícones | lucide-react |
| Backend | Firebase — Authentication (e-mail/senha + Google) e Firestore |
| Rotas | Estado interno (`activePage` no `App.jsx`) — ainda **sem** react-router |
| Lint | ESLint 9 (flat config) |

## Comandos

```bash
npm install          # dependências
npm run dev          # servidor de desenvolvimento -> http://localhost:5173
npm run build        # build de produção em dist/
npm run preview      # serve o build localmente
npm run lint         # ESLint no repositório inteiro
npm run test         # testes das funções puras (Vitest)
npm run doctor       # valida a config do Firebase (config completa e coerente)
npm run check:rules  # valida as regras de segurança do Firestore
npm run admin:list   # lista os admins do projeto
npm run admin:add    -- <UID>   # libera o Painel Admin para um usuário
npm run admin:remove -- <UID>   # revoga o acesso
npm run start        # serve o dist/ (usa a variável PORT)
```

Os comandos `admin:*` precisam de uma chave de serviço em `service-account.json`
(veja o [FIREBASE_SECURITY_SETUP.md](./FIREBASE_SECURITY_SETUP.md)). Ela está no
`.gitignore` — nunca commite esse arquivo.

Antes de commitar, o mais seguro é: **`npm run lint && npm run test && npm run check:rules && npm run build`**
(no VS Code isso é a task **verify** — `Ctrl+Shift+P` → *Run Task*).

Para conferir o app rodando de verdade, siga o **[QA_CHECKLIST.md](./QA_CHECKLIST.md)** —
roteiro na ordem, do login ao painel, com o resultado esperado em cada passo.

## Estrutura

```
├── .vscode/                       # configuração compartilhada do editor
├── public/                        # arquivos estáticos servidos na raiz
├── scripts/
│   ├── check-firestore-rules.mjs  # garante que as regras seguem travadas
│   └── replace-colors.cjs         # auditoria de cores fixas da marca (dry run)
├── src/
│   ├── components/                # cada componente com seu .css ao lado
│   ├── utils/                     # lógica pura e testável (itens, cores, endereço, avaliações)
│   ├── App.jsx                    # estado global: rota ativa, carrinho, usuário, tema
│   ├── firebase.js                # inicialização do SDK
│   ├── index.css                  # Tailwind + variáveis da marca
│   └── main.jsx                   # entrada do React
├── firestore.rules                # regras de segurança (a proteção real do banco)
├── firebase.json                  # config do Firebase CLI (deploy das regras)
├── QA_CHECKLIST.md                # roteiro de verificação manual, na ordem
└── FIREBASE_SECURITY_SETUP.md
```

## Primeiros passos (Firebase)

1. **Siga o [FIREBASE_SECURITY_SETUP.md](./FIREBASE_SECURITY_SETUP.md) antes de tudo.**
   Ele cria seu documento em `admins/{uid}` e publica as `firestore.rules`.
   Sem isso o Painel Admin fica inacessível **e** o banco fica sem proteção.
2. Crie a conta que será administradora, faça login e confirme que **Painel Admin**
   aparece na barra lateral.

### Coleções do Firestore

| Coleção | Escrita por | Lida por |
|---|---|---|
| `users/{uid}` | o próprio usuário (`favorites` apenas) | o próprio usuário |
| `admins/{uid}` | **somente console/Admin SDK** | o próprio usuário |
| `settings/restaurant` | admin | público (tema do site) |
| `menuItems` | admin (`MenuAdminTab`) | público |
| `orders` | cliente autenticado | dono do pedido + admin |
| `reviews` | usuário autenticado | público |
| `reservations` | público (formulário) | **admin** |
| `supportMessages` | público (formulário) | **admin** |

> O `src/firebase.js` **não** é um segredo: a config web vai dentro do bundle e é visível
> para qualquer visitante. Quem protege os dados são as `firestore.rules`.

## Tema white-label

`Painel Admin → Configurações` grava em `settings/restaurant`, e o `App.jsx` aplica
`--brand-color` / `--brand-color-dark` em `:root`. Todo componente que usa
`var(--brand-color)` acompanha a cor automaticamente.

Algumas cores ainda estão fixas e não seguem o tema:

```bash
node scripts/replace-colors.cjs          # lista os arquivos/linhas afetados
node scripts/replace-colors.cjs --write  # aplica as substituições
```

## VS Code

Ao abrir o projeto, aceite as extensões recomendadas (`.vscode/extensions.json`):
ESLint, Tailwind CSS IntelliSense e Firecode/VSFire (syntax highlight de `*.rules`).
Já vêm configurados: formatar ao salvar + `source.fixAll.eslint`, aspas simples,
`dist`/`.firebase`/logs fora da busca, e as tasks `dev`, `build`, `lint`,
`check:rules` e `verify`.
Para depurar, use **Vite: Chrome** (F5) — a task sobe o servidor automaticamente.
Se o VS Code reclamar que o servidor não subiu, rode `npm run dev` num terminal e use
**Vite: attach to running browser**.

## Fluxo de pedido

`Carrinho → Dados de Entrega → PIX → Pedido criado → Acompanhamento`

1. **Carrinho** (`CartDropdown`): quantidades, cupom de desconto e taxa de entrega.
2. **Dados de Entrega** (`CheckoutModal`): nome, telefone/WhatsApp e endereço completo.
   O último endereço usado fica salvo em `users/{uid}.lastAddress` e volta preenchido.
3. **PIX** (`PixPaymentModal`): confirma o valor e mostra o endereço antes de pagar.
4. **Pedido**: gravado em `orders` com `customer` + `address` (as regras exigem os dois —
   um pedido sem endereço é recusado pelo Firestore).
5. **Painel Admin → Pedidos**: mostra nome, telefone (com link de `tel:` e WhatsApp) e o
   endereço, com botão **Copiar endereço** para o entregador.

> Depois de publicar as novas `firestore.rules`, quem estiver com um bundle antigo em
> cache precisa recarregar a página — o pedido antigo não enviava endereço e seria
> recusado pelas regras.

## Painel Admin

Acessível apenas para quem tem um documento em `admins/{uid}` (veja
[FIREBASE_SECURITY_SETUP.md](./FIREBASE_SECURITY_SETUP.md)). Seis abas:

| Aba | O que faz |
|---|---|
| **Pedidos** | Faturamento do dia, pedidos ativos e avanço de status (Preparando → A caminho → Entregue) |
| **Reservas** | Reservas de mesa do site: Confirmar / Cancelar / Excluir, filtro por status, contador de pendentes |
| **Suporte** | Mensagens da Central de Ajuda: responder por e-mail, marcar como resolvida / reabrir, contador de abertas |
| **Avaliações** | Média das notas, filtro por positivas/negativas e exclusão de avaliações |
| **Cardápio** | CRUD dos itens do cardápio |
| **Configurações** | Nome, slogan, cor da marca, WhatsApp e taxa de entrega (white-label) |

Reservas e Suporte mostram um contador vermelho na aba quando há itens aguardando —
os dados são lidos em tempo real (sempre só para admins, por causa das regras).

## Limitações conhecidas

- **PIX é simulado**: chave estática e QR Code ilustrativo, sem confirmação real.
- Nada define o status `cancelled` — a interface (badge e acompanhamento) existe, mas
  não há ação no painel nem cancelamento pelo cliente.
- A moderação de avaliações só permite **excluir** (não há opção de ocultar sem apagar).
- Cupons (`WELCOME20`, `FLASH30`, …) estão duplicados em `CartDropdown.jsx` e
  `OffersPage.jsx` — precisam ser mantidos em sincronia manualmente.
- Testes unitários em `src/utils/` (58 testes via Vitest) — sem testes de componentes ainda.

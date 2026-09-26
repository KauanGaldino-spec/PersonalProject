# QA Checklist

Verificação manual, na ordem. Cada bloco depende do anterior. Rode `npm run doctor`
primeiro e resolva o que ele apontar — sem isso nada abaixo funciona.

## 0. Preparação (uma vez)

- [ ] `npm run doctor` → **"Tudo certo na configuracao local"**
- [ ] `npm run admin:list` → **mostra seu uid** (se não, crie o documento em `admins`)
- [ ] `firestore.rules` publicado (Console → Firestore → Regras → Publicar, ou `firebase deploy --only firestore:rules`)
- [ ] `npm run dev` → http://localhost:5173

## 1. Autenticação

- [ ] Criar conta com e-mail/senha → **modal fecha, avatar aparece no header**
- [ ] Recarregar a página → **continua logado**
- [ ] Senha errada → **"E-mail ou senha incorretos."** dentro do modal
- [ ] Repetir um e-mail já usado → **"Este e-mail já está cadastrado."**
- [ ] Senha com menos de 6 caracteres → **"A senha deve ter pelo menos 6 caracteres."**
- [ ] Login com Google → **funciona** (provedor ativo no Console)
- [ ] Botão de sair → **volta ao estado deslogado**, "Painel Admin" some

## 2. Painel Admin (a migração mais importante de testar)

- [ ] Sidebar mostra **"Painel Admin"** (logado como admin)
- [ ] Recarregar → **continua aparecendo**
- [ ] Aba **Cardápio → "Importar Cardápio Inicial"** → **itens aparecem**
- [ ] Abrir o app deslogado: o aviso amarelo **"Cardápio de demonstração"** desapareceu
- [ ] Aba **Configurações**: trocar nome + cor + taxa de entrega → **Salvar → "Configurações Salvas!"**
- [ ] Recarregar → **nome no header/logo e cor dos botões mudaram**
- [ ] Passar o mouse num botão laranja → **o hover usa o tom escuro da SUA cor**

## 3. Menu e favoritos

- [ ] Cardápio mostra os itens reais, com preço e categoria
- [ ] Adicionar ao carrinho → **badge do carrinho sobe**
- [ ] Favoritar (coração) → **coração preenche; contador no header sobe**
- [ ] Aba Favoritos → **item listado**; remover → **sai da lista**
- [ ] Recarregar → **favoritos continuam** (salgados no Firestore)

## 4. Carrinho e cupons

- [ ] Alterar quantidade / remover → **subtotal recalcula**
- [ ] Cupom `WELCOME20` → **"Cupom WELCOME20 aplicado!" e 20% de desconto**
- [ ] Cupom inválido → **"Cupom inválido ou expirado."**
- [ ] Taxa de entrega configurada aparece na linha **"Taxa de Entrega"**

## 5. Checkout e pedido (fluxo novo)

- [ ] "Finalizar Pedido" → **abre "Dados de Entrega"** (não foi direto para o PIX)
- [ ] Clicar "Continuar para pagamento" com telefone curto → **"Informe um telefone válido com DDD"**
- [ ] CEP com menos de 8 dígitos → **"Informe um CEP válido com 8 dígitos."**
- [ ] Preencher tudo → **avança para o PIX**
- [ ] O PIX mostra **"Entregar em Rua ..., número — bairro — cidade"**
- [ ] "Já realizei o pagamento" → **vai para Meus Pedidos, carrinho zerado**

## 6. Acompanhamento em tempo real (o teste mais legal)

- [ ] Abrir **Meus Pedidos** em uma janela e o **Painel Admin** em outra
- [ ] Admin: **"Despachar (A Caminho)"** → **a janela do cliente muda sozinha, sem F5**
- [ ] Badge vira **"A caminho"** e o modal "Acompanhar" mostra o passo 2
- [ ] Admin: **"Marcar como Entregue"** → **cliente vê "Entregue"** e o ETA vira "Pedido entregue"
- [ ] **Ver Detalhes** → subtotal, entrega, desconto, total **e o endereço de entrega**

## 7. Endereço no painel

- [ ] Aba **Pedidos**: o card mostra **"Entrega"** com nome, endereço e telefone
- [ ] **"Copiar endereço"** → **vira "Copiado"** e cola certo num editor
- [ ] Link **WhatsApp** abre `wa.me/55...` com o número do cliente
- [ ] Link do telefone (`tel:`) abre o discador
- [ ] Fazer um 2º pedido → **o endereço volta preenchido** (salvo em `users/{uid}.lastAddress`)

## 8. Reservas, Suporte e Avaliações (abas novas)

- [ ] Enviar uma reserva pelo site → **aparece na aba Reservas como "Pendente"**
- [ ] A aba mostra **contador vermelho** com o número de pendentes
- [ ] **Confirmar** → badge vira **"Confirmada"** e o contador cai
- [ ] Reserva de hoje mostra **"Hoje (...)"**; a de amanhã, **"Amanhã"**
- [ ] Enviar mensagem na Central de Ajuda → **aba Suporte mostra "Aberta" + contador**
- [ ] **Marcar como resolvida** → some do filtro "Abertas"; **Reabrir** devolve
- [ ] Excluir (2 cliques: "Excluir" → "Confirmar exclusão") → **some**
- [ ] Avaliação pública: enviar → **aparece na aba Avaliações** com média atualizada
- [ ] Excluir avaliação no admin → **some do site também**

## 9. "Útil" (voto que alterna)

- [ ] Clicar em **"Útil"** → **botão fica preto**, contador +1
- [ ] Clicar de novo → **volta ao normal**, contador -1
- [ ] Recarregar → **o estado do seu voto continua** (para avaliações reais)
- [ ] Clicar 10x rápido → **nunca passa de +1** (o contador não infla)
- [ ] Deslogado, clicar em "Útil" → **abre o modal de login**

## 10. Regras de segurança (prova rápida)

Com o app aberto, no console do navegador:

- [ ] Dado errado num pedido é recusado (não dá para testar sem mexer no código — confie no `npm run check:rules`)
- [ ] Deslogado, `getDocs(collection(db,'orders'))` → **"Missing or insufficient permissions"**
- [ ] Logado como cliente, abrir `admins/<seu-uid>` de outro usuário → **permission-denied**
- [ ] As abas Reservas/Suporte **só funcionam como admin** (um cliente não lê esses dados)

---

## Comandos de verificação automática

```bash
npm run lint         # ESLint
npm run test         # 58 testes das funções puras
npm run doctor       # configuração do Firebase
npm run check:rules  # 39 checagens das regras de segurança
npm run build        # build de produção
```

Se algo falhar, o mais provável é: regras não publicadas (erros de permissão),
documento `admins` ausente (painel sumiu) ou menu vazio (aparece o aviso de demonstração).

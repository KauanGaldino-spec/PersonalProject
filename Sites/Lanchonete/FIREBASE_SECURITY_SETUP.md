# Firebase Security Setup

The database is protected by `firestore.rules` (committed in the repo), not by the
config in `src/firebase.js`. **The web config is not a secret** — it ships inside the
JavaScript bundle and can be read by anyone. Rules are the actual protection.

---

## 0. Check your setup first

```bash
npm run doctor
```

This validates that `src/firebase.js` is complete, that every field points at the
**same** project (a half-copied or mixed-up config is the most common cause of
"nothing works"), that `.firebaserc` matches, that your service-account key belongs
to that project, and that at least one admin exists. It prints the exact Console
links for the steps it cannot check locally.

Fix anything it reports **before** continuing.

## 1. Create your admin document (do this FIRST)

Admin rights moved out of `users/{uid}` (which users can write) into `admins/{uid}`
(which **nobody** can write from a browser).

### Option A — from the terminal (recommended, no Console UI gotchas)

```bash
# one-time: download a service-account key
#   Firebase Console -> gear icon -> Project settings -> Service accounts
#   -> "Generate new private key"  ->  save as service-account.json in the project root

npm run admin:list     # who is an admin right now
npm run admin:add  -- <UID>     # grant
npm run admin:remove -- <UID>   # revoke
```

`service-account.json` is gitignored — it is a real secret, never commit it.
This path uses the Admin SDK, so it works even after the strict rules are published.

### Option B — from the Firebase Console

1. Open the [Firebase Console](https://console.firebase.google.com/) → the project in
   `src/firebase.js` (`npm run doctor` prints it)
2. **Authentication → Users** and copy your **UID** (long string, e.g. `aB3xY5...`)
3. **Firestore Database → Dados / Data → Iniciar coleção / Start collection**
   - Collection ID, exactly: `admins`
   - **Document ID**: paste your UID — ⚠️ clear the **Auto-ID** value the Console
     pre-fills, otherwise the document gets a random ID and the app won't find it
   - Add any field, e.g. `role` (string) = `owner`
4. Save

> If you skip this step you lose access to the admin panel. The app shows a banner
> with your exact UID (and the path it looked for) to help you recover, and the
> task prints it too: `npm run admin:list`.

## 2. Publish the rules

**Option A — Console (quickest):**

1. **Firestore Database → Rules** tab
2. Select everything in the editor, paste the full contents of `firestore.rules`, **Publish**

**Option B — CLI (validates server-side before applying):**

```bash
npm i -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

`firebase.json` and `.firebaserc` are already configured, so no extra flags are needed.

## 3. Verify

| Check | Expected |
|---|---|
| Signed out, load the site | Storefront loads with your brand name/color (public read on `settings` + `menuItems`) |
| Signed out, open DevTools console and run `getDocs(collection(db,'orders'))` | `Missing or insufficient permissions` |
| Signed in as a normal customer, place an order | Works; the order appears in **Meus Pedidos** — but not other people's |
| Signed in as a customer, try `setDoc(doc(db,'admins', myUid), {})` | `Missing or insufficient permissions` |
| Signed in as the admin | **Painel Admin** visible; orders can be advanced; menu + settings editable |

## What the rules enforce

| Collection | Read | Create | Update / Delete |
|---|---|---|---|
| `users/{uid}` | owner only | owner, `favorites` only | owner, `favorites` + `lastAddress` **only** |
| `admins/{uid}` | owner only | ✗ client | ✗ client (console/Admin SDK only) |
| `settings/*` | public | — | admin only |
| `menuItems/*` | public | — | admin only |
| `orders/*` | owner + admin | owner, incl. **`customer` + `address`** | admin only |
| `reviews/*` | public | signed-in, own `userId` | `helpful`/`helpfulBy` only, or admin |
| `reservations/*` | **admin only** | public, shape-validated | admin only |
| `supportMessages/*` | **admin only** | public, shape-validated | admin only |
| anything else | ✗ | ✗ | ✗ |

Orders are rejected unless they carry the delivery details (`customer.name`,
`customer.phone`, `address.street/number/district/city`) — the `hasDeliveryDetails()`
helper enforces that, so a malformed order can never reach the kitchen.

> **Rollout note:** if you publish these rules while users still have the previous
> bundle cached, their checkout will fail (the old code sent no address). Ask them to
> reload, or deploy the new build at the same time.

Public **write** is allowed on `reservations` and `supportMessages` (guests must be able
to book a table / contact you without an account), but reads are staff-only so customer
names, emails and phone numbers are never publicly harvestable. Both writes are
shape-validated (allowed keys, types, lengths, `status`, and a server timestamp) so
nobody can post junk documents. For spam protection beyond this, enable
[App Check](https://firebase.google.com/docs/app-check).

## Known limitation

`reviews` update lets any signed-in visitor move `helpful`/`helpfulBy`. The app only
ever changes its own vote, but a hand-crafted request could inflate one review's counter.
Closing that fully requires a trusted server (Cloud Functions + `increment`), which is
the upgrade path if the reviews counter ever matters commercially.

## Rotating admin access

To revoke someone: delete their document in `admins`. To revoke everyone instantly,
delete the `admins` collection. No code change or redeploy is needed.

## Switching Firebase projects (or creating a new one)

Two files must be updated — they are the **only** places the project id lives:

1. **`src/firebase.js`** — paste the whole web config from
   *Project settings → Your apps → SDK setup and configuration*.
   Copy **all six fields**; a partially copied config is the usual reason the app
   "half works".
2. **`.firebaserc`** — set `projects.default` to the new project id (used by `firebase deploy`).

Then verify:

```bash
npm run doctor
```

It cross-checks the two files, checks that every config field points at the same
project, and reports the Console steps that cannot be verified locally. After
switching projects you must redo the setup above: create the Firestore database,
enable the auth providers, publish `firestore.rules`, and create your `admins/{uid}`
document.

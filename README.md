# Khata King — UI design preview

A click-through, UI-only redesign of the Al Khair Trader "Khata King" ledger
app. **Design only: no database, no login, no real data.** Every number is
mock data from the real app's history, so the screens feel true to life.

## Design direction (frontend-design skill)

- **Subject:** a wholesale bakery ledger — flour, ovens, daily cash memos,
  money trust. The look is grounded there, not in a generic SaaS kit.
- **Palette:** warm bakery paper `#FAF6EE`, deep pine green `#1E5B3E` (the
  app's own identity), amber `#D9A441` for money due, brick red `#B3382E`
  for overdue. Warm paper is chosen for a bakery, not as a default; the
  accent is green + amber, not the cream-and-terracotta cliché.
- **Type:** Fraunces (display — big balances, headings) + Inter (UI text).
  Money always in tabular figures so digits never jitter.
- **Layout:** ledger rules and ruled rows, not identical rounded cards. A
  stamp-style PAID / UNPAID chip, a monospace paper receipt, hairline
  dividers. One orchestrated moment: the update screen's progress.
- **Motion:** restrained; reduced-motion respected.

## Screens (12)

Home · Suppliers · Supplier detail (Overview / Purchases / Payments /
History) · Purchase receipt (Design A paper receipt) · New purchase ·
Khata (customers) · Bill detail (invoice summary box) · Record payment ·
Payment promises · Items · More / Settings · Users (admin) · Update

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

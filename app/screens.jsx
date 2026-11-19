"use client";

import { useState } from "react";
import {
  ACTIVITY,
  CUSTOMERS,
  PROMISES,
  SUPPLIERS,
  TODAY,
  fmt,
} from "./data";

function Stamp({ kind, children }) {
  return <span className={`stamp ${kind}`}>{children}</span>;
}

export function HomeScreen({ go }) {
  const dueToday = PROMISES.filter((p) => p.tone === "due" || p.tone === "overdue");
  return (
    <div>
      <p className="kicker">Today · 19 Nov 2026</p>
      <p className="big-money">
        <small>Total outstanding</small>
        <br />
        {fmt(TODAY.outstanding)}
      </p>
      <div className="stat-grid">
        <div className="stat">
          <p className="label">Today&apos;s sales</p>
          <p className="value money">{fmt(TODAY.sales)}</p>
        </div>
        <div className="stat">
          <p className="label">Cash received</p>
          <p className="value money">{fmt(TODAY.cash)}</p>
        </div>
        <div className="stat">
          <p className="label">Due today</p>
          <p className="value money due">{fmt(TODAY.dueToday)}</p>
        </div>
        <div className="stat">
          <p className="label">Promises due</p>
          <p className="value money">{dueToday.length}</p>
        </div>
      </div>

      <div className="quick">
        <button onClick={() => go("new-purchase")}>
          + New Purchase
          <span>Record stock bought</span>
        </button>
        <button onClick={() => go("record-payment")}>
          Record Payment
          <span>Cash received</span>
        </button>
        <button className="light" onClick={() => go("promises")}>
          Promises due
          <span>{dueToday.length} need chasing</span>
        </button>
        <button className="light" onClick={() => go("khata")}>
          New Bill
          <span>Bill a customer</span>
        </button>
      </div>

      <hr className="rule" />
      <p className="kicker">Promises due today</p>
      <ul className="row-list">
        {dueToday.map((p) => (
          <li key={p.name}>
            <button className="row-item" onClick={() => go("promises")}>
              <span className="avatar soft">{p.name.charAt(0)}</span>
              <span className="main">
                <p className="name">{p.name}</p>
                <p className="detail">{p.date}</p>
              </span>
              <span className="amount">
                <span className="money due">{fmt(p.amount)}</span>
                <span className="tag">{p.status}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <hr className="rule" />
      <p className="kicker">Recent activity</p>
      <ul className="row-list">
        {ACTIVITY.map((a) => (
          <li key={a.text}>
            <div className="row-item" style={{ cursor: "default" }}>
              <span className="main">
                <p className="name" style={{ fontWeight: 500 }}>
                  {a.text}
                </p>
                <p className="detail">{a.time}</p>
              </span>
              <span className="amount">
                <span className="money">{a.amount}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SuppliersScreen({ go }) {
  const [q, setQ] = useState("");
  const list = SUPPLIERS.filter((s) =>
    s.name.toLowerCase().includes(q.toLowerCase())
  );
  const totalDue = SUPPLIERS.reduce((a, s) => a + s.due, 0);
  return (
    <div>
      <p className="kicker">Suppliers · {SUPPLIERS.length}</p>
      <p className="big-money">
        <small>Total you owe</small>
        <br />
        {fmt(totalDue)}
      </p>
      <div className="field" style={{ marginTop: 16 }}>
        <label htmlFor="sup-search">Search suppliers</label>
        <input
          id="sup-search"
          type="search"
          placeholder="Type a name…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <ul className="row-list">
        {list.map((s) => (
          <li key={s.id}>
            <button
              className="row-item"
              onClick={() => go("supplier", { id: s.id })}
            >
              <span className="avatar">{s.name.charAt(0)}</span>
              <span className="main">
                <p className="name">{s.name}</p>
                <p className="detail">
                  {s.kind} · Last {s.last}
                </p>
              </span>
              <span className="amount">
                <span className={`money ${s.due > 0 ? "due" : "ok"}`}>
                  {s.due > 0 ? fmt(s.due) : "Settled"}
                </span>
                <span className="tag">{s.due > 0 ? "due" : "paid up"}</span>
              </span>
              <span className="chev" aria-hidden="true">
                ›
              </span>
            </button>
          </li>
        ))}
        {list.length === 0 && (
          <li>
            <p className="sub">No supplier matches that name.</p>
          </li>
        )}
      </ul>
      <div className="btn-row" style={{ marginTop: 18 }}>
        <button className="btn" onClick={() => go("new-purchase")}>
          + New Purchase
        </button>
        <button className="btn ghost" onClick={() => go("record-payment")}>
          Record Payment
        </button>
      </div>
    </div>
  );
}

const TABS = ["Overview", "Purchases", "Payments", "History"];

export function SupplierDetailScreen({ supplier, go }) {
  const [tab, setTab] = useState("Overview");
  return (
    <div>
      <p className="kicker">{supplier.kind}</p>
      <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px" }}>{supplier.name}</h2>
      <p className="sub">
        Balance due · {supplier.due > 0 ? "pay soon" : "all settled"}
      </p>
      <p className="big-money">{fmt(supplier.due)}</p>
      <p style={{ marginTop: 6 }}>
        {supplier.due > 0 ? (
          <Stamp kind="unpaid">Unpaid</Stamp>
        ) : (
          <Stamp kind="paid">Paid</Stamp>
        )}
      </p>
      <div className="stat-grid">
        <div className="stat">
          <p className="label">Purchases</p>
          <p className="value money">{fmt(supplier.purchases)}</p>
        </div>
        <div className="stat">
          <p className="label">Paid</p>
          <p className="value money">{fmt(supplier.paid)}</p>
        </div>
      </div>

      <div className="tabs" role="tablist" aria-label="Supplier sections">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div>
          <p className="kicker" style={{ marginTop: 16 }}>
            Latest purchase
          </p>
          <table className="lines">
            <thead>
              <tr>
                <th>Item</th>
                <th className="num">Qty</th>
                <th className="num">Rate</th>
                <th className="num">Amount</th>
              </tr>
            </thead>
            <tbody>
              {supplier.items.map((it) => (
                <tr key={it.name}>
                  <td>{it.name}</td>
                  <td className="num">{it.qty}</td>
                  <td className="num">{fmt(it.rate)}</td>
                  <td className="num">{fmt(it.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sub">Last purchase {supplier.last}.</p>
          <div className="btn-row">
            <button className="btn" onClick={() => go("new-purchase")}>
              + New Purchase
            </button>
            <button className="btn ghost" onClick={() => go("record-payment")}>
              Record Payment
            </button>
          </div>
        </div>
      )}

      {tab === "Purchases" && (
        <ul className="row-list">
          {supplier.items.map((it, i) => (
            <li key={it.name}>
              <button
                className="row-item"
                onClick={() => go("receipt", { id: supplier.id })}
              >
                <span className="main">
                  <p className="name">
                    Purchase #{i + 1} · {it.name}
                  </p>
                  <p className="detail">{supplier.last}</p>
                </span>
                <span className="amount">
                  <span className="money">{fmt(it.amount)}</span>
                  <span className="tag">tap for receipt</span>
                </span>
                <span className="chev" aria-hidden="true">
                  ›
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {tab === "Payments" && (
        <ul className="row-list">
          <li>
            <div className="row-item" style={{ cursor: "default" }}>
              <span className="main">
                <p className="name">Payment · Cash</p>
                <p className="detail">10 Nov 2026</p>
              </span>
              <span className="amount">
                <span className="money ok">{fmt(60000)}</span>
              </span>
            </div>
          </li>
          <li>
            <div className="row-item" style={{ cursor: "default" }}>
              <span className="main">
                <p className="name">Payment · Bank transfer</p>
                <p className="detail">2 Nov 2026</p>
              </span>
              <span className="amount">
                <span className="money ok">{fmt(supplier.paid - 60000)}</span>
              </span>
            </div>
          </li>
        </ul>
      )}

      {tab === "History" && (
        <div>
          <p className="kicker" style={{ marginTop: 16 }}>
            Monthly breakdown
          </p>
          <table className="lines">
            <thead>
              <tr>
                <th>Month</th>
                <th className="num">Bought</th>
                <th className="num">Paid</th>
              </tr>
            </thead>
            <tbody>
              {supplier.history.map((h) => (
                <tr key={h.month}>
                  <td>
                    {h.month}
                    <br />
                    <span style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
                      {h.purchases} purchases
                    </span>
                  </td>
                  <td className="num">{fmt(h.amount)}</td>
                  <td className="num">{fmt(h.paid)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="kicker" style={{ marginTop: 18 }}>
            Items bought, all time
          </p>
          <ul className="row-list">
            {supplier.items.map((it) => (
              <li key={it.name}>
                <div className="row-item" style={{ cursor: "default" }}>
                  <span className="main">
                    <p className="name">{it.name}</p>
                    <p className="detail">Total qty {it.qty}</p>
                  </span>
                  <span className="amount">
                    <span className="money">{fmt(it.amount)}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function PurchaseReceiptScreen({ supplier }) {
  const total = supplier.items.reduce((a, i) => a + i.amount, 0);
  const prevDue = supplier.due - total > 0 ? supplier.due - total : 15000;
  return (
    <div>
      <div className="receipt">
        <h3>AL KHAIR TRADER</h3>
        <p className="r-sub">Wholesale Bakery · Cash Memo</p>
        <div className="r-line" />
        <div className="r-row">
          <span>Receipt #4</span>
          <span>18 Nov 2026</span>
        </div>
        <div className="r-row">
          <span>Supplier</span>
          <span>{supplier.name}</span>
        </div>
        <div className="r-line" />
        {supplier.items.map((it) => (
          <div className="r-row" key={it.name}>
            <span>
              {it.name} × {it.qty}
            </span>
            <span>{fmt(it.amount)}</span>
          </div>
        ))}
        <div className="r-line" />
        <div className="r-row">
          <span>Previous Due</span>
          <span>{fmt(prevDue)}</span>
        </div>
        <div className="r-row">
          <span>Purchase Total</span>
          <span>{fmt(total)}</span>
        </div>
        <div className="r-row total">
          <span>Balance Due</span>
          <span>{fmt(supplier.due)}</span>
        </div>
        <div className="r-line" />
        <p className="r-center">* * UNPAID * *</p>
        <p className="barcode" aria-hidden="true">
          ||| | || ||| | |||
        </p>
        <p className="r-center">JAZAKALLAH — THANK YOU</p>
      </div>
      <div className="btn-row three">
        <button className="btn">Share</button>
        <button className="btn ghost">Print</button>
        <button className="btn ghost">WhatsApp</button>
      </div>
      <p className="sub">
        Design A — classic paper receipt. Tap a purchase in the Purchases tab
        to open its receipt.
      </p>
    </div>
  );
}

export function NewPurchaseScreen({ go }) {
  const [supplier, setSupplier] = useState(SUPPLIERS[0].id);
  return (
    <div>
      <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px" }}>New Purchase</h2>
      <p className="sub">Record stock bought from a supplier.</p>
      <div className="field">
        <label htmlFor="np-supplier">Supplier</label>
        <select
          id="np-supplier"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        >
          {SUPPLIERS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="np-date">Date</label>
        <input id="np-date" type="text" defaultValue="19 Nov 2026" />
      </div>
      <p className="kicker">Items</p>
      <table className="lines">
        <thead>
          <tr>
            <th>Item</th>
            <th className="num">Qty</th>
            <th className="num">Rate</th>
            <th className="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fine Atta 10kg</td>
            <td className="num">40</td>
            <td className="num">1,150</td>
            <td className="num">46,000</td>
          </tr>
          <tr>
            <td>Maida 10kg</td>
            <td className="num">25</td>
            <td className="num">1,280</td>
            <td className="num">32,000</td>
          </tr>
        </tbody>
      </table>
      <button className="btn ghost" style={{ marginTop: 12 }}>
        + Add another item
      </button>
      <hr className="rule" />
      <div className="sum-row grand">
        <span>Purchase total</span>
        <span className="money">{fmt(78000)}</span>
      </div>
      <button
        className="btn amber"
        style={{ marginTop: 14 }}
        onClick={() => go("supplier", { id: supplier })}
      >
        Save Purchase
      </button>
      <p className="sub" style={{ marginTop: 10 }}>
        Preview only — nothing is saved.
      </p>
    </div>
  );
}

export { CUSTOMERS };

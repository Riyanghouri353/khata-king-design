"use client";

import { useState } from "react";
import { CUSTOMERS, ITEMS, PROMISES, USERS, fmt } from "./data";

function Stamp({ kind, children }) {
  return <span className={`stamp ${kind}`}>{children}</span>;
}

export function KhataScreen({ go }) {
  const [q, setQ] = useState("");
  const list = CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase())
  );
  const totalDue = CUSTOMERS.reduce((a, c) => a + c.netDue, 0);
  return (
    <div>
      <p className="kicker">
        Khata · <span lang="ur">کھاتا</span> · {CUSTOMERS.length} customers
      </p>
      <p className="big-money">
        <small>Total customers owe you</small>
        <br />
        {fmt(totalDue)}
      </p>
      <div className="field" style={{ marginTop: 16 }}>
        <label htmlFor="kh-search">Search customers</label>
        <input
          id="kh-search"
          type="search"
          placeholder="Type a name…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <ul className="row-list">
        {list.map((c) => (
          <li key={c.id}>
            <button
              className="row-item"
              onClick={() => go("bill", { id: c.id })}
            >
              <span className="avatar soft">{c.name.charAt(0)}</span>
              <span className="main">
                <p className="name">{c.name}</p>
                <p className="detail">
                  {c.bill} · {c.date}
                </p>
              </span>
              <span className="amount">
                <span className={`money ${c.netDue > 0 ? "due" : "ok"}`}>
                  {c.netDue > 0 ? fmt(c.netDue) : "Paid"}
                </span>
                <span className="tag">
                  {c.netDue > 0 ? "balance due" : "settled"}
                </span>
              </span>
              <span className="chev" aria-hidden="true">
                ›
              </span>
            </button>
          </li>
        ))}
        {list.length === 0 && (
          <li>
            <p className="sub">No customer matches that name.</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export function BillDetailScreen({ customer, go }) {
  const grand = customer.gross - customer.returns + customer.prevDue;
  return (
    <div>
      <p className="kicker">Bill · {customer.date}</p>
      <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px" }}>
        {customer.name}
      </h2>
      <p style={{ margin: "6px 0 0" }}>
        {customer.netDue > 0 ? (
          <Stamp kind="unpaid">Unpaid</Stamp>
        ) : (
          <Stamp kind="paid">Paid</Stamp>
        )}
      </p>

      <div className="invoice">
        <div className="inv-head">
          <span className="no">{customer.bill}</span>
          <span className="date">{customer.date}</span>
        </div>
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
            {customer.lines.map((l) => (
              <tr key={l.name}>
                <td>{l.name}</td>
                <td className="num">{l.qty}</td>
                <td className="num">{fmt(l.rate)}</td>
                <td className="num">{fmt(l.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ height: 12 }} />
        <div className="sum-row">
          <span>Gross Bill</span>
          <span className="money">{fmt(customer.gross)}</span>
        </div>
        {customer.returns > 0 && (
          <div className="sum-row">
            <span>Less Returns</span>
            <span className="money">− {fmt(customer.returns)}</span>
          </div>
        )}
        <div className="sum-row">
          <span>Previous Due</span>
          <span className="money">{fmt(customer.prevDue)}</span>
        </div>
        <div className="sum-row grand">
          <span>Grand Total</span>
          <span className="money">{fmt(grand)}</span>
        </div>
        <div className="sum-row">
          <span>Cash Received</span>
          <span className="money">{fmt(customer.cash)}</span>
        </div>
        <div className={`net-due ${customer.netDue === 0 ? "paid" : ""}`}>
          <span className="label">Net Balance Due</span>
          <span className="money">
            {customer.netDue === 0 ? "Rs. 0 — Paid" : fmt(customer.netDue)}
          </span>
        </div>
      </div>

      <div className="btn-row three">
        <button className="btn">Share</button>
        <button className="btn ghost">Print</button>
        <button className="btn ghost">WhatsApp</button>
      </div>
      <button className="btn amber" onClick={() => go("record-payment")}>
        Record Payment
      </button>
      <p className="sub" style={{ marginTop: 10 }}>
        Print uses the separate black-on-white thermal layout — the in-app
        receipt never changes.
      </p>
    </div>
  );
}

export function RecordPaymentScreen({ go }) {
  const [method, setMethod] = useState("Cash");
  const [customer, setCustomer] = useState(CUSTOMERS[0].id);
  const picked = CUSTOMERS.find((c) => c.id === customer);
  return (
    <div>
      <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px" }}>
        Record Payment
      </h2>
      <p className="sub">Cash received against a customer&apos;s khata.</p>
      <div className="field">
        <label htmlFor="rp-customer">Customer</label>
        <select
          id="rp-customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        >
          {CUSTOMERS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} — {fmt(c.netDue)} due
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="rp-amount">Amount received</label>
        <input
          id="rp-amount"
          type="text"
          inputMode="numeric"
          defaultValue={String(picked.netDue)}
        />
      </div>
      <div className="field">
        <label id="rp-method-label">Payment method</label>
        <div
          className="seg"
          role="group"
          aria-labelledby="rp-method-label"
        >
          {["Cash", "JazzCash", "Easypaisa", "Bank"].map((m) => (
            <button
              key={m}
              aria-pressed={method === m}
              onClick={() => setMethod(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        <label htmlFor="rp-note">Note (optional)</label>
        <input id="rp-note" type="text" placeholder="e.g. Paid at the shop" />
      </div>
      <button className="btn amber" onClick={() => go("bill", { id: customer })}>
        Save Payment
      </button>
      <p className="sub" style={{ marginTop: 10 }}>
        Preview only — nothing is saved. In the real app this is the step that
        fires the payment notification.
      </p>
    </div>
  );
}

export function PromisesScreen() {
  return (
    <div>
      <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px" }}>
        Payment Promises
      </h2>
      <p className="sub">
        When a customer says &ldquo;I&apos;ll pay Friday&rdquo;, it lives here —
        and the reminder goes out at 9:00 AM on the day.
      </p>
      <ul className="row-list">
        {PROMISES.map((p) => (
          <li key={p.name}>
            <div className="row-item" style={{ cursor: "default" }}>
              <span className="avatar soft">{p.name.charAt(0)}</span>
              <span className="main">
                <p className="name">{p.name}</p>
                <p className="detail">{p.date}</p>
              </span>
              <span className="amount">
                <span className="money">{fmt(p.amount)}</span>
                <span className="tag">
                  <Stamp kind={p.tone}>{p.status}</Stamp>
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <hr className="rule" />
      <p className="sub">
        A covering payment flips a promise to Fulfilled automatically.
      </p>
    </div>
  );
}

export function ItemsScreen() {
  return (
    <div>
      <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px" }}>Items</h2>
      <p className="sub">Bakery items and their selling rates.</p>
      <ul className="row-list">
        {ITEMS.map((it) => (
          <li key={it.name}>
            <div className="row-item" style={{ cursor: "default" }}>
              <span className="main">
                <p className="name">{it.name}</p>
                <p className="detail">
                  per {it.unit} · {it.stock}
                </p>
              </span>
              <span className="amount">
                <span className="money">{fmt(it.rate)}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MoreScreen({ go }) {
  const [notifs, setNotifs] = useState(true);
  return (
    <div>
      <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px" }}>More</h2>
      <p className="sub">Administration and settings.</p>

      <div className="update-banner">
        <h3>Update available — v1.3</h3>
        <p>A new version is ready. Download inside the app, then one Install tap.</p>
        <button className="btn" onClick={() => go("update")}>
          Update Now
        </button>
      </div>

      <div className="set-row">
        <div className="main">
          <p className="name">Users</p>
          <p className="detail">Administration · owner only</p>
        </div>
        <button
          className="btn ghost"
          style={{ width: "auto", padding: "8px 14px" }}
          onClick={() => go("users")}
        >
          Open
        </button>
      </div>
      <div className="set-row">
        <div className="main">
          <p className="name">Notifications</p>
          <p className="detail">Payment alerts and promise reminders</p>
        </div>
        <button
          className="toggle"
          role="switch"
          aria-checked={notifs}
          aria-label="Notifications"
          onClick={() => setNotifs((v) => !v)}
        />
      </div>
      <div className="set-row">
        <div className="main">
          <p className="name">Payment Promises</p>
          <p className="detail">Reminders at 9:00 AM</p>
        </div>
        <button
          className="btn ghost"
          style={{ width: "auto", padding: "8px 14px" }}
          onClick={() => go("promises")}
        >
          Open
        </button>
      </div>

      <div className="version-card">
        <p className="kicker">App version</p>
        <p style={{ margin: "0 0 4px" }}>
          <strong>Current:</strong> 1.2
        </p>
        <p style={{ margin: "0 0 12px", color: "var(--muted)" }}>
          Latest: 1.3 · checks at startup and on open
        </p>
        <button className="btn ghost" onClick={() => go("update")}>
          Check for Updates
        </button>
      </div>
    </div>
  );
}

export function UsersScreen() {
  return (
    <div>
      <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px" }}>Users</h2>
      <p className="sub">
        Only the owner sees this screen. Everyone writes only their own entry;
        the owner reads the whole list.
      </p>
      <ul className="row-list">
        {USERS.map((u) => (
          <li key={u.email}>
            <div className="row-item" style={{ cursor: "default" }}>
              <span className="avatar">{u.name.charAt(0)}</span>
              <span className="main">
                <p className="name">
                  {u.name} {u.you && <span style={{ color: "var(--pine)" }}>· You</span>}
                </p>
                <p className="detail">
                  {u.email} · Joined {u.joined}
                </p>
              </span>
              <span className="amount">
                <Stamp kind={u.you ? "paid" : "due"}>{u.role}</Stamp>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="sub" style={{ marginTop: 14 }}>
        New users appear here after they update the app and open it once.
      </p>
    </div>
  );
}

export function UpdateScreen() {
  return (
    <div>
      <h2 style={{ fontSize: "1.6rem", margin: "0 0 4px" }}>Update</h2>
      <p className="sub">Khata King 1.2 → 1.3 · 19.6 MB</p>
      <div className="version-card">
        <p className="kicker">Downloading</p>
        <p className="big-money" style={{ fontSize: "2rem" }}>
          68%
        </p>
        <div className="progress" role="progressbar" aria-valuenow={68} aria-valuemin={0} aria-valuemax={100} aria-label="Download progress">
          <span />
        </div>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          13.3 MB of 19.6 MB · direct download
        </p>
      </div>
      <button className="btn">Install when ready</button>
      <p className="sub" style={{ marginTop: 12 }}>
        Android still needs one Install tap, and a one-time allow-installs
        prompt the first time. Speed is your connection — the download is
        direct, nothing in between.
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { SUPPLIERS, CUSTOMERS } from "./data";
import {
  HomeScreen,
  SuppliersScreen,
  SupplierDetailScreen,
  PurchaseReceiptScreen,
  NewPurchaseScreen,
} from "./screens";
import {
  KhataScreen,
  BillDetailScreen,
  RecordPaymentScreen,
  PromisesScreen,
  ItemsScreen,
  MoreScreen,
  UsersScreen,
  UpdateScreen,
} from "./screens2";

const NAV = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "suppliers", label: "Suppliers", icon: "▤" },
  { id: "khata", label: "Khata", icon: "☰" },
  { id: "items", label: "Items", icon: "▦" },
  { id: "more", label: "More", icon: "•••" },
];

const ALL_SCREENS = [
  { id: "home", label: "Home — today at a glance" },
  { id: "suppliers", label: "Suppliers" },
  { id: "supplier", label: "Supplier detail + History tab" },
  { id: "receipt", label: "Purchase receipt (paper)" },
  { id: "new-purchase", label: "New purchase" },
  { id: "khata", label: "Khata (customers)" },
  { id: "bill", label: "Bill detail — invoice box" },
  { id: "record-payment", label: "Record payment" },
  { id: "promises", label: "Payment promises" },
  { id: "items", label: "Items & rates" },
  { id: "more", label: "More / Settings" },
  { id: "users", label: "Users (owner only)" },
  { id: "update", label: "In-app update" },
];

const TITLES = {
  home: null,
  suppliers: "Suppliers",
  supplier: "Supplier",
  receipt: "Purchase Receipt",
  "new-purchase": "New Purchase",
  khata: "Khata",
  bill: "Bill",
  "record-payment": "Record Payment",
  promises: "Payment Promises",
  items: "Items",
  more: "More",
  users: "Users",
  update: "Update",
};

function titleFor(screen) {
  if (screen.name === "supplier") {
    const s = SUPPLIERS.find((x) => x.id === screen.params?.id);
    return s ? s.name : "Supplier";
  }
  if (screen.name === "bill") {
    const c = CUSTOMERS.find((x) => x.id === screen.params?.id);
    return c ? c.name : "Bill";
  }
  return TITLES[screen.name] || "Khata King";
}

export default function Home() {
  const [stack, setStack] = useState([{ name: "home", params: {} }]);
  const screen = stack[stack.length - 1];

  const go = (name, params = {}) => {
    const id = name;
    const resolved =
      id === "supplier" && !params.id
        ? { id: SUPPLIERS[0].id }
        : id === "bill" && !params.id
          ? { id: CUSTOMERS[0].id }
          : id === "receipt" && !params.id
            ? { id: SUPPLIERS[0].id }
            : params;
    setStack((s) => [...s, { name, params: resolved }]);
  };

  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));

  const jump = (name) => {
    const params =
      name === "supplier"
        ? { id: SUPPLIERS[0].id }
        : name === "bill"
          ? { id: CUSTOMERS[0].id }
          : name === "receipt"
            ? { id: SUPPLIERS[0].id }
            : {};
    setStack([{ name, params }]);
  };

  const supplier = SUPPLIERS.find((s) => s.id === screen.params?.id) || SUPPLIERS[0];
  const customer =
    CUSTOMERS.find((c) => c.id === screen.params?.id) || CUSTOMERS[0];

  const renderScreen = () => {
    switch (screen.name) {
      case "home":
        return <HomeScreen go={go} />;
      case "suppliers":
        return <SuppliersScreen go={go} />;
      case "supplier":
        return <SupplierDetailScreen supplier={supplier} go={go} />;
      case "receipt":
        return <PurchaseReceiptScreen supplier={supplier} />;
      case "new-purchase":
        return <NewPurchaseScreen go={go} />;
      case "khata":
        return <KhataScreen go={go} />;
      case "bill":
        return <BillDetailScreen customer={customer} go={go} />;
      case "record-payment":
        return <RecordPaymentScreen go={go} />;
      case "promises":
        return <PromisesScreen />;
      case "items":
        return <ItemsScreen />;
      case "more":
        return <MoreScreen go={go} />;
      case "users":
        return <UsersScreen />;
      case "update":
        return <UpdateScreen />;
      default:
        return <HomeScreen go={go} />;
    }
  };

  return (
    <main className="stage">
      <aside className="side">
        <p className="kicker">Al Khair Trader · UI design preview</p>
        <h1>
          Khata King, <em>redesigned.</em>
        </h1>
        <p className="lede">
          The whole app, reskinned — warm bakery paper, deep pine green, big
          serif balances, ledger rules instead of identical cards. Tap through
          the phone. Nothing here saves, logs in, or touches real data.
        </p>
        <ul className="screen-list" aria-label="Jump to a screen">
          {ALL_SCREENS.map((s) => (
            <li key={s.id + s.label}>
              <button
                aria-current={screen.name === s.id}
                onClick={() => jump(s.id)}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
        <p className="meta">
          Design only — mock figures from the real app&apos;s history. If you
          like it, the next step is a build prompt for the Kotlin app, screen
          by screen.
        </p>
      </aside>

      <div className="phone">
        <header className="appbar">
          {screen.name === "home" ? (
            <span className="wordmark">
              Khata King <small>Al Khair Trader</small>
            </span>
          ) : (
            <>
              <button className="back" onClick={back} aria-label="Back">
                ‹
              </button>
              <h2>{titleFor(screen)}</h2>
            </>
          )}
          <span className="urdu" lang="ur">
            کھاتا
          </span>
        </header>

        <div className="screen">{renderScreen()}</div>

        <nav className="bottomnav" aria-label="App sections">
          {NAV.map((n) => (
            <button
              key={n.id}
              aria-current={screen.name === n.id ? "page" : undefined}
              onClick={() => jump(n.id)}
            >
              <span className="ico" aria-hidden="true">
                {n.icon}
              </span>
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}

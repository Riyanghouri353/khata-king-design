// Mock data only — figures borrowed from the real app's history so the
// screens feel true to life. Nothing here is live data.

export const fmt = (n) => "Rs. " + n.toLocaleString("en-PK");

export const SUPPLIERS = [
  {
    id: "zikaulla",
    name: "Zikaulla",
    kind: "Flour & atta",
    purchases: 204660,
    paid: 179000,
    due: 25660,
    last: "18 Nov 2026",
    items: [
      { name: "Fine Atta 10kg", qty: 40, rate: 1150, amount: 46000 },
      { name: "Maida 10kg", qty: 25, rate: 1280, amount: 32000 },
    ],
    history: [
      { month: "Nov 2026", purchases: 6, amount: 204660, paid: 179000 },
      { month: "Oct 2026", purchases: 8, amount: 186400, paid: 186400 },
      { month: "Sep 2026", purchases: 7, amount: 154200, paid: 154200 },
    ],
  },
  {
    id: "daal",
    name: "Daal Hammed",
    kind: "Daal & pulses",
    purchases: 148000,
    paid: 126075,
    due: 21925,
    last: "17 Nov 2026",
    items: [
      { name: "Daal Chana 5kg", qty: 30, rate: 950, amount: 28500 },
      { name: "Daal Moong 5kg", qty: 20, rate: 1100, amount: 22000 },
    ],
    history: [
      { month: "Nov 2026", purchases: 4, amount: 148000, paid: 126075 },
      { month: "Oct 2026", purchases: 5, amount: 121500, paid: 121500 },
    ],
  },
  {
    id: "sugar",
    name: "Sugar Traders",
    kind: "Sugar & ghee",
    purchases: 96400,
    paid: 96400,
    due: 0,
    last: "15 Nov 2026",
    items: [{ name: "Sugar 50kg", qty: 12, rate: 6800, amount: 81600 }],
    history: [{ month: "Nov 2026", purchases: 3, amount: 96400, paid: 96400 }],
  },
  {
    id: "ghee",
    name: "Ghee House",
    kind: "Ghee & oil",
    purchases: 78250,
    paid: 60000,
    due: 18250,
    last: "14 Nov 2026",
    items: [{ name: "Banaspati Ghee 16kg", qty: 10, rate: 7200, amount: 72000 }],
    history: [{ month: "Nov 2026", purchases: 2, amount: 78250, paid: 60000 }],
  },
];

export const CUSTOMERS = [
  {
    id: "bago",
    name: "Bago",
    bill: "INV-571649",
    gross: 1730,
    returns: 0,
    prevDue: 1000,
    cash: 1500,
    netDue: 1230,
    status: "UNPAID",
    date: "3 Nov 2026",
    lines: [
      { name: "Cake Rusk", qty: 5, rate: 170, amount: 850 },
      { name: "Jam", qty: 4, rate: 175, amount: 700 },
      { name: "Cream Roll", qty: 1, rate: 180, amount: 180 },
    ],
  },
  {
    id: "farooq",
    name: "Malik Farooq",
    bill: "INV-C6F2F4",
    gross: 2200,
    returns: 0,
    prevDue: 0,
    cash: 0,
    netDue: 2200,
    status: "UNPAID",
    date: "18 Nov 2026",
    lines: [
      { name: "Khatai", qty: 6, rate: 225, amount: 1350 },
      { name: "Cake Rusk", qty: 5, rate: 170, amount: 850 },
    ],
  },
  {
    id: "javed",
    name: "Javed Mughal",
    bill: "INV-571651",
    gross: 4860,
    returns: 200,
    prevDue: 1200,
    cash: 4000,
    netDue: 1860,
    status: "UNPAID",
    date: "18 Nov 2026",
    lines: [
      { name: "Cream Roll", qty: 12, rate: 180, amount: 2160 },
      { name: "Jam", qty: 10, rate: 175, amount: 1750 },
      { name: "Cake Rusk", qty: 5, rate: 170, amount: 850 },
      { name: "Khatai", qty: 1, rate: 225, amount: 225 },
    ],
  },
  {
    id: "kazim",
    name: "Malik Kazim",
    bill: "INV-571648",
    gross: 3120,
    returns: 0,
    prevDue: 0,
    cash: 3120,
    netDue: 0,
    status: "PAID",
    date: "17 Nov 2026",
    lines: [
      { name: "Cake Rusk", qty: 10, rate: 170, amount: 1700 },
      { name: "Jam", qty: 8, rate: 175, amount: 1400 },
    ],
  },
  {
    id: "shafi",
    name: "Shafi",
    bill: "INV-571640",
    gross: 2560,
    returns: 0,
    prevDue: 0,
    cash: 0,
    netDue: 2560,
    status: "UNPAID",
    date: "12 Nov 2026",
    lines: [{ name: "Khatai", qty: 8, rate: 225, amount: 1800 }],
  },
  {
    id: "azeem",
    name: "Azeem Ullah",
    bill: "INV-571633",
    gross: 51860,
    returns: 0,
    prevDue: 0,
    cash: 30000,
    netDue: 21860,
    status: "UNPAID",
    date: "25 Oct 2026",
    lines: [
      { name: "Cake Rusk", qty: 120, rate: 170, amount: 20400 },
      { name: "Khatai", qty: 80, rate: 225, amount: 18000 },
      { name: "Jam", qty: 40, rate: 175, amount: 7000 },
    ],
  },
];

export const ITEMS = [
  { name: "Cake Rusk", rate: 170, unit: "pack", stock: "In stock" },
  { name: "Jam", rate: 175, unit: "jar", stock: "In stock" },
  { name: "Cream Roll", rate: 180, unit: "pack", stock: "Low" },
  { name: "Khatai", rate: 225, unit: "pack", stock: "In stock" },
  { name: "Plain Rusk", rate: 150, unit: "pack", stock: "In stock" },
  { name: "Biscuits", rate: 120, unit: "pack", stock: "Out" },
];

export const PROMISES = [
  {
    name: "Malik Farooq",
    amount: 2200,
    date: "Today, 19 Nov",
    status: "Due today",
    tone: "due",
  },
  {
    name: "Shafi",
    amount: 2560,
    date: "17 Nov",
    status: "2 days overdue",
    tone: "overdue",
  },
  {
    name: "Javed Mughal",
    amount: 1860,
    date: "Tomorrow, 20 Nov",
    status: "Due tomorrow",
    tone: "soon",
  },
  {
    name: "Azeem Ullah",
    amount: 21860,
    date: "22 Nov",
    status: "Due in 3 days",
    tone: "soon",
  },
  {
    name: "Malik Kazim",
    amount: 3120,
    date: "17 Nov",
    status: "Fulfilled",
    tone: "paid",
  },
];

export const USERS = [
  { name: "Riyan Ghouri", email: "riyanghouri7@gmail.com", role: "Owner", you: true, joined: "19 Nov 2026" },
  { name: "Bilal Ahmed", email: "bilal@shop.local", role: "Staff", you: false, joined: "19 Nov 2026" },
  { name: "Usman Tariq", email: "usman@shop.local", role: "Staff", you: false, joined: "19 Nov 2026" },
];

export const ACTIVITY = [
  { text: "Payment received from Malik Kazim", amount: "Rs. 3,120", time: "11:42 AM" },
  { text: "New purchase from Zikaulla", amount: "Rs. 46,000", time: "10:15 AM" },
  { text: "Bill INV-571649 shared with Bago", amount: "Rs. 1,230 due", time: "Yesterday" },
  { text: "Promise recorded — Malik Farooq", amount: "Rs. 2,200 by Fri", time: "Yesterday" },
];

export const TODAY = {
  sales: 18460,
  cash: 11200,
  dueToday: 4760,
  outstanding: 30230,
};

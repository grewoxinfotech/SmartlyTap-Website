export type OrderStatus = "Pending" | "Paid" | "Processing" | "Failed";

export type AdminOrder = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Business";
  createdAt: string;
};

export type AdminCard = {
  id: string;
  owner: string;
  active: boolean;
  tapCount: number;
  lastTappedAt: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  price: number;
  sku: string;
  status: "Active" | "Draft";
  imageUrl: string;
};

export type AdminReseller = {
  id: string;
  name: string;
  email: string;
  commissionRate: number;
  totalSales: number;
  payoutDue: number;
};

export const orders: AdminOrder[] = [
  {
    id: "ORD-10492",
    customer: "Aarav Sharma",
    email: "aarav@example.com",
    amount: 2499,
    status: "Paid",
    createdAt: "2026-04-15",
  },
  {
    id: "ORD-10491",
    customer: "Meera Iyer",
    email: "meera@example.com",
    amount: 1499,
    status: "Processing",
    createdAt: "2026-04-15",
  },
  {
    id: "ORD-10490",
    customer: "Rahul Verma",
    email: "rahul@example.com",
    amount: 999,
    status: "Pending",
    createdAt: "2026-04-14",
  },
  {
    id: "ORD-10489",
    customer: "Zoya Khan",
    email: "zoya@example.com",
    amount: 3499,
    status: "Failed",
    createdAt: "2026-04-14",
  },
  {
    id: "ORD-10488",
    customer: "Ishaan Patel",
    email: "ishaan@example.com",
    amount: 1999,
    status: "Paid",
    createdAt: "2026-04-13",
  },
];

export const users: AdminUser[] = [
  { id: "USR-9001", name: "Aarav Sharma", email: "aarav@example.com", plan: "Pro", createdAt: "2026-02-02" },
  { id: "USR-9002", name: "Meera Iyer", email: "meera@example.com", plan: "Business", createdAt: "2026-01-12" },
  { id: "USR-9003", name: "Rahul Verma", email: "rahul@example.com", plan: "Free", createdAt: "2026-03-28" },
  { id: "USR-9004", name: "Zoya Khan", email: "zoya@example.com", plan: "Pro", createdAt: "2026-02-21" },
  { id: "USR-9005", name: "Ishaan Patel", email: "ishaan@example.com", plan: "Pro", createdAt: "2026-03-04" },
];

export const cards: AdminCard[] = [
  { id: "CARD-2A9F", owner: "Aarav Sharma", active: true, tapCount: 128, lastTappedAt: "2026-04-16" },
  { id: "CARD-19C2", owner: "Meera Iyer", active: true, tapCount: 84, lastTappedAt: "2026-04-15" },
  { id: "CARD-00D1", owner: "Rahul Verma", active: false, tapCount: 21, lastTappedAt: "2026-04-11" },
  { id: "CARD-77B0", owner: "Zoya Khan", active: true, tapCount: 203, lastTappedAt: "2026-04-16" },
  { id: "CARD-6C10", owner: "Ishaan Patel", active: true, tapCount: 56, lastTappedAt: "2026-04-14" },
];

export const products: AdminProduct[] = [
  { id: "PRD-1001", name: "NFC Smart Card — Classic", price: 999, sku: "NFCC-CL-01", status: "Active", imageUrl: "/products/card-classic.png" },
  { id: "PRD-1002", name: "NFC Smart Card — Metal", price: 2499, sku: "NFCC-MT-02", status: "Active", imageUrl: "/products/card-metal.png" },
  { id: "PRD-1003", name: "NFC Sticker Pack (x10)", price: 399, sku: "NFC-ST-10", status: "Draft", imageUrl: "/products/stickers.png" },
];

export const resellers: AdminReseller[] = [
  { id: "RS-3001", name: "NorthStar Distributors", email: "northstar@example.com", commissionRate: 12, totalSales: 182_000, payoutDue: 14_200 },
  { id: "RS-3002", name: "TapWave Partners", email: "tapwave@example.com", commissionRate: 10, totalSales: 96_000, payoutDue: 6_800 },
  { id: "RS-3003", name: "RetailBridge", email: "retailbridge@example.com", commissionRate: 8, totalSales: 44_500, payoutDue: 2_300 },
];

export function delay<T>(value: T, ms = 650): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}


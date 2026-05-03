export interface Bed {
  id: string;
  number: string;
  status: "occupied" | "vacant" | "overdue";
  tenantId?: string;
}

export interface Room {
  id: string;
  number: string;
  floor?: number;
  beds: Bed[];
}

export interface OwnerPG {
  id: string;
  name: string;
  address: string;
  city: string;
  type: "Boys" | "Girls" | "Co-ed";
  rooms: Room[];
  defaultRent: number;
  advanceAmount: number;
  rentDueDate: number;
  noticePeriod: number;
  whatsappEnabled: boolean;
  photo?: string;
}

export interface RentRecord {
  month: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  paidDate?: string;
  mode?: "cash" | "upi" | "bank";
}

export interface OwnerTenant {
  id: string;
  name: string;
  phone: string;
  pgId: string;
  pgName: string;
  roomNumber: string;
  bedNumber: string;
  monthlyRent: number;
  advancePaid: number;
  advancePaidDate: string;
  joinDate: string;
  status: "active" | "notice_given" | "vacated";
  rentStatus: "paid" | "pending" | "overdue";
  noticeDate?: string;
  idProof?: string;
  notes?: string;
  rentHistory: RentRecord[];
  rewards: { earlyPayments: number; totalCredit: number };
  messages: { type: string; text: string; timestamp: string; delivered: boolean }[];
}

export interface Expense {
  id: string;
  pgId: string;
  pgName: string;
  category: string;
  amount: number;
  date: string;
  notes?: string;
  icon: string;
}

export interface OwnerNotification {
  id: string;
  type: "overdue" | "reminder_sent" | "payment_marked" | "move_out" | "vacancy";
  message: string;
  time: string;
  read: boolean;
  action?: string;
}

export const ownerProfile = {
  id: "owner1",
  name: "Ramesh Sharma",
  phone: "+91 98765 43210",
  email: "ramesh.sharma@gmail.com",
  city: "Bangalore",
  pgCount: "2-3",
  experience: "5",
  plan: "Basic",
  planPGs: 3,
  planPrice: "₹399/mo",
  renewalDate: "Mar 31, 2025",
  createdAt: "2022-03-15",
  avatar: "RS",
  whatsappNumber: "+91 98765 43210",
  defaultRentDue: 5,
  defaultNotice: 30,
  defaultAdvance: 1,
  rewardEnabled: true,
  rewardAmount: 200,
  reminderBefore: true,
  reminderOnDue: true,
  reminderAfter: true,
};

export const ownerPGs: OwnerPG[] = [
  {
    id: "opg1",
    name: "Sharma Boys PG",
    address: "45 Koramangala 5th Block, Near Jyothi Nivas College",
    city: "Bangalore",
    type: "Boys",
    defaultRent: 8500,
    advanceAmount: 8500,
    rentDueDate: 5,
    noticePeriod: 30,
    whatsappEnabled: true,
    rooms: [
      {
        id: "r1", number: "101", floor: 1,
        beds: [
          { id: "b1", number: "A", status: "occupied", tenantId: "ot1" },
          { id: "b2", number: "B", status: "occupied", tenantId: "ot2" },
          { id: "b3", number: "C", status: "overdue", tenantId: "ot3" },
        ],
      },
      {
        id: "r2", number: "102", floor: 1,
        beds: [
          { id: "b4", number: "A", status: "occupied", tenantId: "ot4" },
          { id: "b5", number: "B", status: "vacant" },
        ],
      },
      {
        id: "r3", number: "201", floor: 2,
        beds: [
          { id: "b6", number: "A", status: "occupied", tenantId: "ot5" },
          { id: "b7", number: "B", status: "occupied", tenantId: "ot6" },
          { id: "b8", number: "C", status: "vacant" },
        ],
      },
      {
        id: "r4", number: "202", floor: 2,
        beds: [
          { id: "b9", number: "A", status: "occupied", tenantId: "ot7" },
          { id: "b10", number: "B", status: "occupied", tenantId: "ot8" },
        ],
      },
    ],
  },
  {
    id: "opg2",
    name: "Sharma Girls PG",
    address: "12 Indiranagar 12th Main, Near CMH Road",
    city: "Bangalore",
    type: "Girls",
    defaultRent: 9500,
    advanceAmount: 9500,
    rentDueDate: 1,
    noticePeriod: 30,
    whatsappEnabled: true,
    rooms: [
      {
        id: "r5", number: "101", floor: 1,
        beds: [
          { id: "b11", number: "A", status: "occupied", tenantId: "ot9" },
          { id: "b12", number: "B", status: "occupied", tenantId: "ot10" },
        ],
      },
      {
        id: "r6", number: "102", floor: 1,
        beds: [
          { id: "b13", number: "A", status: "vacant" },
          { id: "b14", number: "B", status: "vacant" },
        ],
      },
      {
        id: "r7", number: "201", floor: 2,
        beds: [
          { id: "b15", number: "A", status: "occupied", tenantId: "ot11" },
          { id: "b16", number: "B", status: "notice_given" as any, tenantId: "ot12" },
        ],
      },
    ],
  },
];

export const ownerTenants: OwnerTenant[] = [
  {
    id: "ot1", name: "Arjun Kumar", phone: "+91 94567 89012",
    pgId: "opg1", pgName: "Sharma Boys PG", roomNumber: "101", bedNumber: "A",
    monthlyRent: 8500, advancePaid: 8500, advancePaidDate: "2024-11-01",
    joinDate: "2024-11-01", status: "active", rentStatus: "paid",
    rentHistory: [
      { month: "Feb 2025", amount: 8500, status: "paid", paidDate: "2025-02-03", mode: "upi" },
      { month: "Jan 2025", amount: 8500, status: "paid", paidDate: "2025-01-04", mode: "upi" },
      { month: "Dec 2024", amount: 8500, status: "paid", paidDate: "2024-12-05", mode: "cash" },
      { month: "Nov 2024", amount: 8500, status: "paid", paidDate: "2024-11-04", mode: "upi" },
    ],
    rewards: { earlyPayments: 4, totalCredit: 800 },
    messages: [
      { type: "Rent Reminder", text: "Hi Arjun, your rent of ₹8,500 is due on 5th Feb. Please pay on time.", timestamp: "Feb 2, 2025 10:00 AM", delivered: true },
      { type: "Payment Confirmed", text: "Hi Arjun, your rent payment of ₹8,500 for Feb has been confirmed. Thank you!", timestamp: "Feb 3, 2025 2:30 PM", delivered: true },
    ],
  },
  {
    id: "ot2", name: "Rohan Mehta", phone: "+91 98234 56789",
    pgId: "opg1", pgName: "Sharma Boys PG", roomNumber: "101", bedNumber: "B",
    monthlyRent: 8500, advancePaid: 8500, advancePaidDate: "2024-10-15",
    joinDate: "2024-10-15", status: "active", rentStatus: "paid",
    rentHistory: [
      { month: "Feb 2025", amount: 8500, status: "paid", paidDate: "2025-02-05", mode: "bank" },
      { month: "Jan 2025", amount: 8500, status: "paid", paidDate: "2025-01-06", mode: "upi" },
      { month: "Dec 2024", amount: 8500, status: "paid", paidDate: "2024-12-07", mode: "upi" },
    ],
    rewards: { earlyPayments: 2, totalCredit: 400 },
    messages: [
      { type: "Rent Reminder", text: "Hi Rohan, your rent of ₹8,500 is due on 5th Feb.", timestamp: "Feb 2, 2025 10:00 AM", delivered: true },
    ],
  },
  {
    id: "ot3", name: "Suresh Patel", phone: "+91 97654 32109",
    pgId: "opg1", pgName: "Sharma Boys PG", roomNumber: "101", bedNumber: "C",
    monthlyRent: 8500, advancePaid: 8500, advancePaidDate: "2024-09-01",
    joinDate: "2024-09-01", status: "active", rentStatus: "overdue",
    rentHistory: [
      { month: "Feb 2025", amount: 8500, status: "overdue" },
      { month: "Jan 2025", amount: 8500, status: "overdue" },
      { month: "Dec 2024", amount: 8500, status: "paid", paidDate: "2024-12-12", mode: "cash" },
    ],
    rewards: { earlyPayments: 0, totalCredit: 0 },
    messages: [
      { type: "Overdue Reminder", text: "Hi Suresh, your rent of ₹8,500 for Feb is overdue. Please pay ASAP.", timestamp: "Feb 10, 2025 9:00 AM", delivered: true },
      { type: "Overdue Reminder", text: "Hi Suresh, your rent of ₹8,500 for Jan is still pending.", timestamp: "Jan 15, 2025 9:00 AM", delivered: false },
    ],
  },
  {
    id: "ot4", name: "Kiran Rao", phone: "+91 93456 78901",
    pgId: "opg1", pgName: "Sharma Boys PG", roomNumber: "102", bedNumber: "A",
    monthlyRent: 8500, advancePaid: 8500, advancePaidDate: "2025-01-01",
    joinDate: "2025-01-01", status: "active", rentStatus: "pending",
    rentHistory: [
      { month: "Feb 2025", amount: 8500, status: "pending" },
      { month: "Jan 2025", amount: 8500, status: "paid", paidDate: "2025-01-05", mode: "upi" },
    ],
    rewards: { earlyPayments: 1, totalCredit: 200 },
    messages: [
      { type: "Rent Reminder", text: "Hi Kiran, your rent of ₹8,500 is due on 5th Feb.", timestamp: "Feb 2, 2025 10:00 AM", delivered: true },
    ],
  },
  {
    id: "ot5", name: "Deepak Singh", phone: "+91 91234 56789",
    pgId: "opg1", pgName: "Sharma Boys PG", roomNumber: "201", bedNumber: "A",
    monthlyRent: 8500, advancePaid: 8500, advancePaidDate: "2024-08-15",
    joinDate: "2024-08-15", status: "active", rentStatus: "paid",
    rentHistory: [
      { month: "Feb 2025", amount: 8500, status: "paid", paidDate: "2025-02-01", mode: "upi" },
      { month: "Jan 2025", amount: 8500, status: "paid", paidDate: "2025-01-01", mode: "upi" },
    ],
    rewards: { earlyPayments: 6, totalCredit: 1200 },
    messages: [],
  },
  {
    id: "ot6", name: "Ankit Verma", phone: "+91 89012 34567",
    pgId: "opg1", pgName: "Sharma Boys PG", roomNumber: "201", bedNumber: "B",
    monthlyRent: 8500, advancePaid: 8500, advancePaidDate: "2024-12-01",
    joinDate: "2024-12-01", status: "notice_given", noticeDate: "2025-02-01", rentStatus: "paid",
    rentHistory: [
      { month: "Feb 2025", amount: 8500, status: "paid", paidDate: "2025-02-05", mode: "cash" },
      { month: "Jan 2025", amount: 8500, status: "paid", paidDate: "2025-01-05", mode: "cash" },
    ],
    rewards: { earlyPayments: 2, totalCredit: 400 },
    messages: [
      { type: "Move-out Notice", text: "Hi Ankit, we've received your move-out notice for March 1st.", timestamp: "Feb 1, 2025 4:00 PM", delivered: true },
    ],
  },
  {
    id: "ot7", name: "Vijay Nair", phone: "+91 78901 23456",
    pgId: "opg1", pgName: "Sharma Boys PG", roomNumber: "202", bedNumber: "A",
    monthlyRent: 8500, advancePaid: 8500, advancePaidDate: "2024-07-01",
    joinDate: "2024-07-01", status: "active", rentStatus: "paid",
    rentHistory: [
      { month: "Feb 2025", amount: 8500, status: "paid", paidDate: "2025-02-04", mode: "upi" },
    ],
    rewards: { earlyPayments: 5, totalCredit: 1000 },
    messages: [],
  },
  {
    id: "ot8", name: "Pranav Joshi", phone: "+91 67890 12345",
    pgId: "opg1", pgName: "Sharma Boys PG", roomNumber: "202", bedNumber: "B",
    monthlyRent: 8500, advancePaid: 8500, advancePaidDate: "2025-02-01",
    joinDate: "2025-02-01", status: "active", rentStatus: "pending",
    rentHistory: [
      { month: "Feb 2025", amount: 8500, status: "pending" },
    ],
    rewards: { earlyPayments: 0, totalCredit: 0 },
    messages: [
      { type: "Welcome", text: "Hi Pranav, welcome to Sharma Boys PG! Your rent of ₹8,500 is due on 5th every month.", timestamp: "Feb 1, 2025 11:00 AM", delivered: true },
    ],
  },
  // Girls PG tenants
  {
    id: "ot9", name: "Priya Sharma", phone: "+91 98765 12345",
    pgId: "opg2", pgName: "Sharma Girls PG", roomNumber: "101", bedNumber: "A",
    monthlyRent: 9500, advancePaid: 9500, advancePaidDate: "2024-10-01",
    joinDate: "2024-10-01", status: "active", rentStatus: "paid",
    rentHistory: [
      { month: "Feb 2025", amount: 9500, status: "paid", paidDate: "2025-02-01", mode: "upi" },
      { month: "Jan 2025", amount: 9500, status: "paid", paidDate: "2025-01-01", mode: "upi" },
    ],
    rewards: { earlyPayments: 4, totalCredit: 800 },
    messages: [],
  },
  {
    id: "ot10", name: "Neha Gupta", phone: "+91 87654 32109",
    pgId: "opg2", pgName: "Sharma Girls PG", roomNumber: "101", bedNumber: "B",
    monthlyRent: 9500, advancePaid: 9500, advancePaidDate: "2024-11-15",
    joinDate: "2024-11-15", status: "active", rentStatus: "pending",
    rentHistory: [
      { month: "Feb 2025", amount: 9500, status: "pending" },
      { month: "Jan 2025", amount: 9500, status: "paid", paidDate: "2025-01-03", mode: "upi" },
    ],
    rewards: { earlyPayments: 2, totalCredit: 400 },
    messages: [],
  },
  {
    id: "ot11", name: "Divya Krishnan", phone: "+91 76543 21098",
    pgId: "opg2", pgName: "Sharma Girls PG", roomNumber: "201", bedNumber: "A",
    monthlyRent: 9500, advancePaid: 9500, advancePaidDate: "2024-09-01",
    joinDate: "2024-09-01", status: "active", rentStatus: "paid",
    rentHistory: [
      { month: "Feb 2025", amount: 9500, status: "paid", paidDate: "2025-02-01", mode: "bank" },
    ],
    rewards: { earlyPayments: 5, totalCredit: 1000 },
    messages: [],
  },
  {
    id: "ot12", name: "Meera Pillai", phone: "+91 65432 10987",
    pgId: "opg2", pgName: "Sharma Girls PG", roomNumber: "201", bedNumber: "B",
    monthlyRent: 9500, advancePaid: 9500, advancePaidDate: "2024-06-01",
    joinDate: "2024-06-01", status: "notice_given", noticeDate: "2025-02-15", rentStatus: "paid",
    rentHistory: [
      { month: "Feb 2025", amount: 9500, status: "paid", paidDate: "2025-02-01", mode: "upi" },
    ],
    rewards: { earlyPayments: 6, totalCredit: 1200 },
    messages: [],
  },
];

export const expenses: Expense[] = [
  { id: "ex1", pgId: "opg1", pgName: "Sharma Boys PG", category: "Groceries", amount: 12000, date: "2025-02-01", notes: "Monthly groceries for cooking", icon: "🛒" },
  { id: "ex2", pgId: "opg1", pgName: "Sharma Boys PG", category: "Gas", amount: 1800, date: "2025-02-03", icon: "🔥" },
  { id: "ex3", pgId: "opg1", pgName: "Sharma Boys PG", category: "Repairs", amount: 3500, date: "2025-02-07", notes: "Plumbing fix in room 101", icon: "🔧" },
  { id: "ex4", pgId: "opg1", pgName: "Sharma Boys PG", category: "Salary", amount: 8000, date: "2025-02-01", notes: "Cook salary", icon: "💰" },
  { id: "ex5", pgId: "opg1", pgName: "Sharma Boys PG", category: "Electricity", amount: 4200, date: "2025-02-10", icon: "⚡" },
  { id: "ex6", pgId: "opg2", pgName: "Sharma Girls PG", category: "Groceries", amount: 9000, date: "2025-02-01", icon: "🛒" },
  { id: "ex7", pgId: "opg2", pgName: "Sharma Girls PG", category: "Maintenance", amount: 2500, date: "2025-02-08", notes: "Painting touch-up", icon: "🏠" },
  { id: "ex8", pgId: "opg2", pgName: "Sharma Girls PG", category: "Salary", amount: 7000, date: "2025-02-01", notes: "Housekeeping staff", icon: "💰" },
  { id: "ex9", pgId: "opg2", pgName: "Sharma Girls PG", category: "Electricity", amount: 3100, date: "2025-02-10", icon: "⚡" },
  { id: "ex10", pgId: "opg1", pgName: "Sharma Boys PG", category: "Internet", amount: 1500, date: "2025-02-05", icon: "🌐" },
];

export const ownerNotifications: OwnerNotification[] = [
  { id: "on1", type: "overdue", message: "Suresh Patel at Sharma Boys PG is 25 days overdue — ₹17,000 (2 months)", time: "Today, 9:00 AM", read: false, action: "View Tenant" },
  { id: "on2", type: "move_out", message: "Ankit Verma submitted move-out notice. Vacating March 1st.", time: "Yesterday, 4:00 PM", read: false, action: "View Notice" },
  { id: "on3", type: "move_out", message: "Meera Pillai notice expires in 13 days. Bed 201B will be vacant.", time: "Yesterday, 4:00 PM", read: false, action: "View" },
  { id: "on4", type: "reminder_sent", message: "Rent reminders sent to 8 tenants for February 2025", time: "Feb 2, 10:00 AM", read: true },
  { id: "on5", type: "payment_marked", message: "Arjun Kumar rent marked paid — ₹8,500 (Feb 2025)", time: "Feb 3, 2:30 PM", read: true },
  { id: "on6", type: "payment_marked", message: "Priya Sharma rent marked paid — ₹9,500 (Feb 2025)", time: "Feb 1, 11:00 AM", read: true },
  { id: "on7", type: "vacancy", message: "Bed 102B in Sharma Boys PG has been vacant for 22 days", time: "Feb 15, 9:00 AM", read: true, action: "View Bed" },
  { id: "on8", type: "vacancy", message: "Room 102 in Sharma Girls PG (2 beds) vacant for 15 days", time: "Feb 8, 9:00 AM", read: true },
];

// Computed helpers
export function getPGStats(pgId: string) {
  const pg = ownerPGs.find(p => p.id === pgId)!;
  const allBeds = pg.rooms.flatMap(r => r.beds);
  const totalBeds = allBeds.length;
  const occupiedBeds = allBeds.filter(b => b.status !== "vacant").length;
  const vacantBeds = allBeds.filter(b => b.status === "vacant").length;
  const pgTenants = ownerTenants.filter(t => t.pgId === pgId);
  const expectedRent = pgTenants.reduce((sum, t) => sum + t.monthlyRent, 0);
  const collectedRent = pgTenants.filter(t => t.rentStatus === "paid").reduce((sum, t) => sum + t.monthlyRent, 0);
  const pendingRent = pgTenants.filter(t => t.rentStatus === "pending").reduce((sum, t) => sum + t.monthlyRent, 0);
  const overdueRent = pgTenants.filter(t => t.rentStatus === "overdue").reduce((sum, t) => sum + t.monthlyRent, 0);
  return { totalBeds, occupiedBeds, vacantBeds, expectedRent, collectedRent, pendingRent, overdueRent };
}

export function getOverallStats() {
  const allBeds = ownerPGs.flatMap(p => p.rooms.flatMap(r => r.beds));
  const totalBeds = allBeds.length;
  const occupiedBeds = allBeds.filter(b => b.status !== "vacant").length;
  const expectedRent = ownerTenants.reduce((sum, t) => sum + t.monthlyRent, 0);
  const collectedRent = ownerTenants.filter(t => t.rentStatus === "paid").reduce((sum, t) => sum + t.monthlyRent, 0);
  const pendingRent = ownerTenants.filter(t => t.rentStatus === "pending").reduce((sum, t) => sum + t.monthlyRent, 0);
  const overdueRent = ownerTenants.filter(t => t.rentStatus === "overdue").reduce((sum, t) => sum + t.monthlyRent, 0);
  return { totalPGs: ownerPGs.length, totalBeds, occupiedBeds, expectedRent, collectedRent, pendingRent, overdueRent };
}

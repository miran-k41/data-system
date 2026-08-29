import { Customer, PassportOrder, ActivityItem, CommunicationMessage, NoteItem, InvoiceItem } from "./types";

export const DEFAULT_CUSTOMER: Customer = {
  id: "CUST-88392",
  name: "Sydney Lockhead",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  isOnline: true,
  lastSeen: "2 min ago",
  sentryConnected: true,
  clarityConnected: true,
  email: "sydneylockhead@gmail.com",
  phone1: "+1 (609) 828-2333",
  phone2: "+1 (720) 260-5017",
  company: "Geico Marketing, Ltd.",
  lastIp: "69.141.42.77",
  timezone: "6:36 AM EDT",
  locationCity: "South Holland",
  locationState: "IL",
  activeCall: {
    agentName: "Philip",
    duration: "04:18",
    status: "active"
  }
};

export const DEFAULT_ORDER: PassportOrder = {
  id: "ORD-94812",
  orderNumber: "H245326",
  customerId: "CUST-88392",
  applicantName: "Hazel Mannion",
  applicantInitials: "HM",
  applicantDob: "Feb 25, 2018",
  applicantType: "Child",
  passportType: "Hazel's new passport",
  travelDate: "Apr 20, 2025",
  applicationProgress: 70,
  requirementsProgress: 70,
  shippingLabelProgress: 100,
  status: "Shipped",
  expectedDelivery: "1 hour",
  requirements: [
    {
      id: "req-1",
      title: "Government fee",
      completed: true,
      viewable: true,
      documentType: "receipt",
      updatedAt: "Today at 05:45 AM",
      verifiedBy: "Adam (System)"
    },
    {
      id: "req-2",
      title: "Proof of Citizenship",
      completed: true,
      viewable: true,
      documentType: "citizenship",
      updatedAt: "Yesterday at 11:20 PM",
      verifiedBy: "Philip"
    },
    {
      id: "req-3",
      title: "Proof of ID",
      completed: false,
      viewable: true,
      documentType: "id_card",
      updatedAt: "Pending submission"
    },
    {
      id: "req-4",
      title: "Passport photo",
      completed: false,
      viewable: true,
      documentType: "photo",
      updatedAt: "Pending photo upload"
    }
  ],
  shippingAddress: {
    name: "Sydney Lockhead",
    street: "16855 Luella Avenue",
    cityStateZip: "South Holland, IL | 60473",
    phone: "+1 (708) 606-3818"
  },
  progressStep: 1,
  courierDetails: {
    shipInDate: "Tomorrow (Aug 29, 2026)",
    serviceType: "Overnight Express Priority",
    courierName: "FedEx Express (Morning Delivery)",
    trackingNumber: "FX-9402-8841-US"
  }
};

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    timestamp: "Just now",
    actor: "Philip",
    actorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    action: "Initiated live customer call",
    details: "Discussed passport photo specifications and parent authorization form requirement.",
    type: "agent"
  },
  {
    id: "act-2",
    timestamp: "18 mins ago",
    actor: "System Engine",
    action: "Inbound courier packet pre-scanned",
    details: "USPS / FedEx tracking FX-9402-8841-US verified at sorting hub. Out for direct delivery.",
    type: "courier"
  },
  {
    id: "act-3",
    timestamp: "45 mins ago",
    actor: "Sydney Lockhead",
    action: "Submitted Proof of Citizenship document",
    details: "Certified Consular Report of Birth Abroad (FS-240) uploaded in 600 DPI.",
    type: "system"
  },
  {
    id: "act-4",
    timestamp: "2 hours ago",
    actor: "Adam",
    actorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    action: "Verified Department of State fee receipt",
    details: "$135.00 passport book expedited fee verified with authorization code #GOV-99214.",
    type: "agent"
  },
  {
    id: "act-5",
    timestamp: "Yesterday",
    actor: "Stripe Billing",
    action: "Payment processed successfully",
    details: "$245.00 total for HelloGov expedited child passport service package.",
    type: "payment"
  }
];

export const INITIAL_COMMUNICATIONS: CommunicationMessage[] = [
  {
    id: "msg-1",
    sender: "agent",
    senderName: "Philip",
    channel: "call",
    timestamp: "Active Call (04:18 elapsed)",
    content: "📞 Live voice session with Sydney Lockhead regarding child passport DS-11 parental consent form and notary signature requirements.",
    recordingDuration: "In Progress"
  },
  {
    id: "msg-2",
    sender: "agent",
    senderName: "Adam",
    channel: "sms",
    timestamp: "Today, 6:15 AM",
    content: "Hello Sydney, we verified Hazel's citizenship records! Please provide a front-facing passport photo when ready so we can finalize the packet for the Department of State.",
    status: "delivered"
  },
  {
    id: "msg-3",
    sender: "customer",
    senderName: "Sydney Lockhead",
    channel: "sms",
    timestamp: "Today, 6:18 AM",
    content: "Thank you Adam! We are taking Hazel to the local photo studio this morning at 9 AM and will upload it immediately right through the link.",
    status: "read"
  },
  {
    id: "msg-4",
    sender: "system",
    senderName: "HelloGov Automation",
    channel: "email",
    timestamp: "Aug 27, 2026, 4:30 PM",
    content: "Order #H245326 confirmed: Expedited Child Passport Renewal. Estimated arrival at Department of State: Aug 30.",
    status: "read"
  }
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: "note-1",
    author: "Philip",
    authorRole: "Senior Case Specialist",
    createdAt: "Today at 06:25 AM",
    content: "Travel date is rigid (April 20, 2025 for family trip to Rome). Sydney requested expedited 3-day DOS hand-carry courier as soon as photo is attached.",
    tag: "Expedited Travel",
    isUrgent: true
  },
  {
    id: "note-2",
    author: "Adam",
    authorRole: "Compliance Reviewer",
    createdAt: "Yesterday at 09:15 PM",
    content: "Birth certificate copy authenticated. Both parents will appear at the acceptance facility or submit notarized Form DS-3053.",
    tag: "Compliance"
  }
];

export const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-8812",
    date: "Aug 26, 2026",
    dueDate: "Aug 26, 2026",
    amount: 245.00,
    status: "Paid",
    items: [
      { description: "Department of State Government Application Fee", amount: 100.00 },
      { description: "Government Expedited Processing Surcharge", amount: 60.00 },
      { description: "HelloGov Concierge Application Review & Pre-Check", amount: 50.00 },
      { description: "FedEx Priority Secure Overnight Inbound Courier", amount: 35.00 }
    ]
  }
];

export const COURIER_OPTIONS = [
  { id: "fedex_overnight", name: "FedEx Express (Morning Priority)", price: "$35.00", eta: "Next morning by 10:30 AM" },
  { id: "ups_next_day", name: "UPS Next Day Air Saver", price: "$32.00", eta: "Next day by 3:00 PM" },
  { id: "dhl_express", name: "DHL Express Direct Dispatch", price: "$42.00", eta: "Same day dispatch" },
  { id: "usps_priority_express", name: "USPS Priority Mail Express", price: "$28.75", eta: "1-2 Business Days" }
];

export const SERVICE_TYPES = [
  "Expedited 3-Day DOS Hand Carry",
  "Standard Priority (5-7 Days)",
  "Urgent Travel Emergency (24-48 Hours)",
  "Next Business Day Courier Relay"
];

export const SHIP_DATES = [
  "Today (Immediate Dispatch)",
  "Tomorrow (Aug 29, 2026)",
  "Monday (Aug 31, 2026)",
  "Custom Date..."
];

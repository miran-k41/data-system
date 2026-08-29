export interface Customer {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  lastSeen: string;
  sentryConnected: boolean;
  clarityConnected: boolean;
  email: string;
  phone1: string;
  phone2: string;
  company: string;
  lastIp: string;
  timezone: string;
  locationCity: string;
  locationState: string;
  activeCall?: {
    agentName: string;
    duration: string;
    status: "active" | "hold" | "ended";
  };
}

export interface RequirementItem {
  id: string;
  title: string;
  completed: boolean;
  viewable: boolean;
  documentType?: "receipt" | "citizenship" | "id_card" | "photo";
  fileUrl?: string;
  updatedAt?: string;
  verifiedBy?: string;
}

export interface PassportOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  applicantName: string;
  applicantInitials: string;
  applicantDob: string;
  applicantType: "Child" | "Adult";
  passportType: string;
  travelDate: string;
  applicationProgress: number;
  requirementsProgress: number;
  shippingLabelProgress: number;
  status: "Shipped" | "Processing" | "Review Required" | "Completed" | "Pending Courier";
  expectedDelivery: string;
  requirements: RequirementItem[];
  shippingAddress: {
    name: string;
    street: string;
    cityStateZip: string;
    phone: string;
  };
  progressStep: number;
  courierDetails?: {
    shipInDate?: string;
    serviceType?: string;
    courierName?: string;
    assignedAt?: string;
    trackingNumber?: string;
  };
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  actor: string;
  actorAvatar?: string;
  action: string;
  details: string;
  type: "system" | "agent" | "courier" | "payment";
}

export interface CommunicationMessage {
  id: string;
  sender: "customer" | "agent" | "system";
  senderName: string;
  channel: "email" | "sms" | "call";
  timestamp: string;
  content: string;
  status?: "sent" | "delivered" | "read";
  recordingDuration?: string;
}

export interface NoteItem {
  id: string;
  author: string;
  authorRole: string;
  createdAt: string;
  content: string;
  tag?: string;
  isUrgent?: boolean;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Pending" | "Refunded";
  items: {
    description: string;
    amount: number;
  }[];
}

// ─── Kurdish Ministry Correspondence Types ─────────────────────────────────────
export interface LetterRecord {
  id: string;
  name: string;
  code: number;
  receivingMinistry: string;
  letterNumber: number;
  date: string;
  subject: string;
  details: string;
  directedTo: string;
  purpose: string;
  dateOfForwarding: string;
  createdAt: string;
  status?: "Submitted" | "Forwarded" | "Approved" | "Archived" | "تۆمارکراوە" | "نێردراوە" | "پەسەندکراوە";
}

// نووسراوی وەرگیراو لە (وەزارەت / لایەن)
export const DEFAULT_RECEIVING_MINISTRIES = [
  "وەزارەتی دارایی و ئابووری",
  "وەزارەتی تەندروستی",
  "وەزارەتی پەروەردە",
  "وەزارەتی خوێندنی باڵا و توێژینەوەی زانستی",
  "وەزارەتی ئەوقاف و کاروباری ئاینی",
  "وەزارەتی کار و کاروباری کۆمەڵایەتی",
  "وەزارەتی کاروباری شەهیدان و ئەنفالکراوان",
  "نووسینگەی بەڕێز سەرۆک وەزیران",
  "و. ئاوەدانکردنەوە و نیشتەجێبوون",
  "وەزارەتی گواستنەوە و گەیاندن",
  "وەزارەتی بازرگانی و پیشەسازی",
  "فەرمانگەی پڕۆتۆکۆڵ",
  "یەکێتی ژوورەکانی بازرگانی",
  "هۆڵی مامۆستا سەعد",
  "ئەندازیاری ئابووری",
  "مەکتەبی سیاسی پ.د.ک لقی 2"
];

// ئاڕاستەکراوە بۆ (وەزارەت / لایەنی مەبەست)
export const DEFAULT_DIRECTED_TO_LIST = [
  "وەڵام بدرێتەوە",
  "ناوەندی ڕاوێژی یاسایی و ستراتیجی",
  "فەرمانگەی کاروباری کارگێڕی و دارایی",
  "فەرمانگەی پلاندانان",
  "فەرمانگەی بەدواداچوونی پڕۆژەکان",
  "فەرمانگەی یاسایی",
  "ڕەزامەندی نادرێت",
  "وەزارەتی دارایی و ئابووری",
  "وەزارەتی تەندروستی",
  "وەزارەتی پەروەردە",
  "وەزارەتی خوێندنی باڵا و توێژینەوەی زانستی",
  "وەزارەتی ئەوقاف و کاروباری ئاینی",
  "وەزارەتی کار و کاروباری کۆمەڵایەتی",
  "وەزارەتی کاروباری شەهیدان و ئەنفالکراوان",
  "نووسینگەی بەڕێز سەرۆک وەزیران",
  "و. ئاوەدانکردنەوە و نیشتەجێبوون",
  "فەرمانگەی تەکنەلۆجیای زانیاری",
  "وەزارەتی گواستنەوە و گەیاندن",
  "فەرمانگەی کاروباری کارگێڕی و دارایی/لیژنەی",
  "فەرمانگەی یاسایی / گرێبەستەکان",
  "لیژنەی ڕاژە"
];

export const DEFAULT_MINISTRIES = DEFAULT_RECEIVING_MINISTRIES;

export interface FormErrors {
  name?: string;
  code?: string;
  receivingMinistry?: string;
  letterNumber?: string;
  date?: string;
  subject?: string;
  details?: string;
  directedTo?: string;
  purpose?: string;
  dateOfForwarding?: string;
}

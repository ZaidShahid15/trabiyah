import { PrayerTime, HabitItem, DeviceFinish, FAQItem } from "./types";

export const INITIAL_PRAYER_TIMES: PrayerTime[] = [
  {
    name: "Fajr",
    nameArabic: "الفجر",
    time: "04:32",
    period: "AM",
    status: "past",
    quote: "Start your day with remembrance and light."
  },
  {
    name: "Dhuhr",
    nameArabic: "الظهر",
    time: "13:04",
    period: "PM",
    status: "past",
    quote: "A quiet moment of gratitude in the midday rush."
  },
  {
    name: "Asr",
    nameArabic: "العصر",
    time: "16:52",
    period: "PM",
    status: "past",
    quote: "Re-center your mind and energy before evening."
  },
  {
    name: "Maghrib",
    nameArabic: "المغرب",
    time: "18:42",
    period: "PM",
    status: "active",
    quote: "The visual climax of the day — peace at dusk."
  },
  {
    name: "Isha",
    nameArabic: "العشاء",
    time: "20:15",
    period: "PM",
    status: "upcoming",
    quote: "Transition into peaceful rest and night reflection."
  }
];

export const INITIAL_HABITS: HabitItem[] = [
  {
    id: "h1",
    name: "Morning Dhikr",
    nameArabic: "أذكار الصباح",
    frequency: "Daily",
    category: "Dhikr",
    completed: true
  },
  {
    id: "h2",
    name: "Surah Al-Mulk",
    nameArabic: "سورة الملك",
    frequency: "Every Night",
    category: "Spiritual",
    completed: false
  },
  {
    id: "h3",
    name: "Family Dinner Remittance",
    nameArabic: "صلة الرحم",
    frequency: "Daily",
    category: "Family",
    completed: true
  },
  {
    id: "h4",
    name: "Daily Quran Reading (15m)",
    nameArabic: "قراءة القرآن",
    frequency: "Daily",
    category: "Spiritual",
    completed: false
  },
  {
    id: "h5",
    name: "Gratitude Journaling",
    nameArabic: "الحمد لله",
    frequency: "Daily",
    category: "Mind",
    completed: false
  }
];

export const DEVICE_FINISHES: DeviceFinish[] = [
  {
    id: "walnut",
    name: "Classic Walnut",
    description: "Deep, rich dark walnut wood frame with organic grain. Brings a historic, warm organic heritage feel to any modern space.",
    price: 199,
    hex: "#443525",
    accentHex: "#B8976A",
    imageStyle: "bg-stone-900 border-yellow-800"
  },
  {
    id: "oak",
    name: "Natural Oak",
    description: "Light, airy natural white-oak wood frame. Clean Scandinavian/Japandi style that blends effortlessly with modern neutral plaster.",
    price: 199,
    hex: "#D0C0A8",
    accentHex: "#B8976A",
    imageStyle: "bg-amber-100 border-amber-200"
  },
  {
    id: "travertine",
    name: "Pure Travertine",
    description: "Precision-sculpted sand-colored genuine travertine stone frame. Solid, architectural, and completely unique in natural pattern.",
    price: 249,
    hex: "#DCD3C7",
    accentHex: "#B8976A",
    imageStyle: "bg-stone-100 border-stone-200"
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Connect with Ease",
    description: "Unbox Tarbiyah, plug in the premium woven power cable, and connect via the iOS or Android mobile companion app. Set your home coordinates and preferences in moments."
  },
  {
    number: "02",
    title: "Symphony of display",
    description: "The matte paper-like display automatically renders your local prayer times, chosen spiritual reminders, and daily family metrics. No notification pings or blue light glare."
  },
  {
    number: "03",
    title: "Grow Together",
    description: "Complete daily habits directly on the touch screen, or sync from your phone. Create gentle collective encouragement so building positive habits becomes an embedded home rhythm."
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "How does the display work? Is it an iPad?",
    answer: "No, Tarbiyah features a custom, high-contrast matte glass display that mimics the texture and optical feel of textured heavy-stock paper. It emits zero blue light, is anti-glare, and blends completely into your domestic interior without ever looking like an aggressive screen."
  },
  {
    question: "How are the prayer times calculated?",
    answer: "During setup, the companion app sets your precise geographic coordinates. It supports all major calculation methods (ISNA, Muslim World League, Egyptian General Authority of Survey, Umm al-Qura, Karachi, London Unified, etc.). You can also add custom minute offsets for specific local mosques."
  },
  {
    question: "Do I need a subscription to use the app or device?",
    answer: "Absolutely not. All core features — prayer displays, companion app sync, remote configurations, list integrations, and basic habit tracking — are entirely free with no monthly subscription."
  },
  {
    question: "Where is the physical device crafted?",
    answer: "Our solid walnut and white-oak frames are sourced sustainably in North America, then precision-milled and finished. The Travertine stone version is hand-carved in signature blocks and polished individually to preserve the rich earthy pores."
  },
  {
    question: "What is the return policy & warranty?",
    answer: "We offer a 30-day money-back satisfaction guarantee and a comprehensive 2-year warranty on all electronic and casing components."
  }
];

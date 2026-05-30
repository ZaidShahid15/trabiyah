export interface PrayerTime {
  name: string;
  nameArabic: string;
  time: string;
  period: "AM" | "PM";
  status: "past" | "active" | "upcoming";
  quote: string;
}

export interface HabitItem {
  id: string;
  name: string;
  nameArabic: string;
  frequency: string;
  category: "Spiritual" | "Mind" | "Family" | "Dhikr";
  completed: boolean;
}

export interface DeviceFinish {
  id: string;
  name: string;
  description: string;
  price: number;
  hex: string;
  accentHex: string;
  imageStyle: string; // Tailwind representation
}

export interface FAQItem {
  question: string;
  answer: string;
}

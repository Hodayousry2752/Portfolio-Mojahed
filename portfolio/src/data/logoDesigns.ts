// data/logoDesigns.ts
export interface LogoDesign {
  id: number;
  name: string;
  category: string;
  color: string;
  description: string;
  createdAt: string;
  imageUrl: string;
}

// استيراد الصور من الجهاز
import logo1 from '../assets/images/Logo/48.png';
import logo2 from '../assets/images/Logo/Big.png';
import logo3 from '../assets/images/Logo/Decorition one.png';
import logo4 from '../assets/images/Logo/Extra.png';
import logo5 from '../assets/images/Logo/GTS.png';
import logo6 from '../assets/images/Logo/Hi.png';
import logo7 from '../assets/images/Logo/Ke.png';
import logo8 from '../assets/images/Logo/Majestic.png';
import logo9 from '../assets/images/Logo/Midway.png';
import logo10 from '../assets/images/Logo/Naf.png';
import logo11 from '../assets/images/Logo/one run 2.png';
import logo12 from '../assets/images/Logo/One Run.png';
import logo13 from '../assets/images/Logo/parametric png.png';
import logo14 from '../assets/images/Logo/Po.png';
import logo15 from '../assets/images/Logo/Ros.png';
import logo16 from '../assets/images/Logo/Run.png';
import logo17 from '../assets/images/Logo/Smart.png';
import logo18 from '../assets/images/Logo/Wis.png';
import logo19 from '../assets/images/Logo/احمد.png';
import logo20 from '../assets/images/Logo/الامور.png';
import logo21 from '../assets/images/Logo/البعلبكي.png';
import logo22 from '../assets/images/Logo/البن البرازيلي.png';
import logo24 from '../assets/images/Logo/الكوخ.png';
import logo25 from '../assets/images/Logo/المستشارون.png';
import logo26 from '../assets/images/Logo/المورقي.png';
import logo27 from '../assets/images/Logo/اوميغا.png';
import logo28 from '../assets/images/Logo/تاج.png';
import logo29 from '../assets/images/Logo/حمزه.png';
import logo30 from '../assets/images/Logo/دار السلام.png';
import logo31 from '../assets/images/Logo/دهب.png';
import logo32 from '../assets/images/Logo/رامي.png';
import logo33 from '../assets/images/Logo/روعة الشرق.png';
import logo34 from '../assets/images/Logo/سرايا.png';
import logo36 from '../assets/images/Logo/شادي.png';
import logo37 from '../assets/images/Logo/شذى.png';
import logo38 from '../assets/images/Logo/طافش.png';
import logo39 from '../assets/images/Logo/كرم لوغو 2.png';
import logo40 from '../assets/images/Logo/مفروشات موسى.png';

// إنشاء مصفوفة اللوجوهات مع التعديلات المطلوبة
export const logoDesigns: LogoDesign[] = [
  {
    id: 1,
    name: "48",
    category: "Automotive",
    color: "#3498DB",
    description: "Car trading or automotive business",
    createdAt: "2024-01-15",
    imageUrl: logo1,
  },
  {
    id: 2,
    name: "Big",
    category: "Business",
    color: "#2C3E50",
    description: "Bold and impactful brand identity",
    createdAt: "2024-02-10",
    imageUrl: logo2,
  },
  {
    id: 3,
    name: "Decoration one",
    category: "Home & Furniture",
    color: "#E74C3C",
    description: "Interior decoration and home design",
    createdAt: "2024-03-05",
    imageUrl: logo3
  },
  {
    id: 4,
    name: "Extra",
    category: "Health",
    color: "#9B59B6",
    description: "Health or wellness services",
    createdAt: "2024-01-25",
    imageUrl: logo4
  },
  {
    id: 5,
    name: "GTS",
    category: "Technology",
    color: "#1ABC9C",
    description: "Technology solutions or IT services",
    createdAt: "2024-02-18",
    imageUrl: logo5,
  },
  {
    id: 6,
    name: "Hi",
    category: "Design",
    color: "#F1C40F",
    description: "Creative design agency or studio",
    createdAt: "2024-03-12",
    imageUrl: logo6
  },
  {
    id: 7,
    name: "Ke",
    category: "Design",
    color: "#D35400",
    description: "Graphic design or creative studio",
    createdAt: "2024-01-30",
    imageUrl: logo7
  },
  {
    id: 8,
    name: "Majestic",
    category: "Real Estate", // تغيير من Luxury إلى Real Estate
    color: "#C0392B",
    description: "Real estate and property development",
    createdAt: "2024-02-22",
    imageUrl: logo8
  },
  {
    id: 9,
    name: "Midway",
    category: "Fashion",
    color: "#E67E22",
    description: "Fashion brand or clothing line",
    createdAt: "2024-03-08",
    imageUrl: logo9
  },
  {
    id: 10,
    name: "Naf",
    category: "Technology",
    color: "#16A085",
    description: "Equipment or engineering company",
    createdAt: "2024-01-20",
    imageUrl: logo10
  },
  {
    id: 11,
    name: "one run 2",
    category: "Sports",
    color: "#27AE60",
    description: "Sports equipment or athletic brand",
    createdAt: "2024-02-14",
    imageUrl: logo11
  },
  {
    id: 12,
    name: "One Run",
    category: "Sports",
    color: "#2ECC71",
    description: "Running club or fitness center",
    createdAt: "2024-03-01",
    imageUrl: logo12
  },
  {
    id: 13,
    name: "parametric png",
    category: "Home & Furniture",
    color: "#2980B9",
    description: "Furniture or home design business",
    createdAt: "2024-01-28",
    imageUrl: logo13
  },
  {
    id: 14,
    name: "Po",
    category: "Design",
    color: "#8E44AD",
    description: "Design studio or creative agency",
    createdAt: "2024-02-05",
    imageUrl: logo14
  },
  {
    id: 15,
    name: "Ros",
    category: "Real Estate", // تغيير من Fashion إلى Real Estate (فلل وشاليهات)
    color: "#D35400",
    description: "Villas and chalets real estate",
    createdAt: "2024-03-15",
    imageUrl: logo15
  },
  {
    id: 16,
    name: "Run",
    category: "Sports",
    color: "#E74C3C",
    description: "Fitness and training services",
    createdAt: "2024-01-18",
    imageUrl: logo16
  },
  {
    id: 17,
    name: "Smart",
    category: "Sports",
    color: "#3498DB",
    description: "Smart sports equipment or fitness tech",
    createdAt: "2024-02-25",
    imageUrl: logo17
  },
  {
    id: 18,
    name: "Wis",
    category: "Fashion",
    color: "#2C3E50",
    description: "Fashion brand or clothing store",
    createdAt: "2024-03-10",
    imageUrl: logo18
  },
  {
    id: 19,
    name: "احمد",
    category: "Health",
    color: "#1ABC9C",
    description: "Health clinic or medical services",
    createdAt: "2024-01-22",
    imageUrl: logo19
  },
  {
    id: 20,
    name: "الامور",
    category: "Food & Beverage", // تغيير من Business إلى Food & Beverage
    color: "#7F8C8D",
    description: "Food and beverage business",
    createdAt: "2024-02-08",
    imageUrl: logo20
  },
  {
    id: 21,
    name: "البعلبكي",
    category: "Business",
    color: "#D35400",
    description: "Family business or enterprise",
    createdAt: "2024-03-03",
    imageUrl: logo21
  },
  {
    id: 22,
    name: "البن البرازيلي",
    category: "Food & Beverage",
    color: "#8B4513",
    description: "Coffee shop or café business",
    createdAt: "2024-01-17",
    imageUrl: logo22
  },
  {
    id: 24,
    name: "الكوخ",
    category: "Food & Beverage",
    color: "#CD853F",
    description: "Restaurant or food services",
    createdAt: "2024-03-07",
    imageUrl: logo24
  },
  {
    id: 25,
    name: "المستشارون",
    category: "General Services", // تغيير من Consulting إلى General Services (تنقيات المياه والبيئة)
    color: "#34495E",
    description: "Water purification and environmental services",
    createdAt: "2024-01-29",
    imageUrl: logo25
  },
  {
    id: 26,
    name: "المورقي",
    category: "Business",
    color: "#7F8C8D",
    description: "Local business or services",
    createdAt: "2024-02-11",
    imageUrl: logo26
  },
  {
    id: 27,
    name: "اوميغا",
    category: "Technology",
    color: "#3498DB",
    description: "Technology or electronics company",
    createdAt: "2024-03-14",
    imageUrl: logo27
  },
  {
    id: 28,
    name: "تاج",
    category: "Home & Furniture",
    color: "#F1C40F",
    description: "Furniture store or home furnishings",
    createdAt: "2024-01-24",
    imageUrl: logo28
  },
  {
    id: 29,
    name: "حمزه",
    category: "Home & Furniture",
    color: "#27AE60",
    description: "Home furniture and interior design",
    createdAt: "2024-02-16",
    imageUrl: logo29
  },
  {
    id: 30,
    name: "دار السلام",
    category: "Real Estate",
    color: "#9B59B6",
    description: "Real estate or property company",
    createdAt: "2024-03-06",
    imageUrl: logo30
  },
  {
    id: 31,
    name: "دهب",
    category: "General Services",
    color: "#FFD700",
    description: "General business or services",
    createdAt: "2024-01-19",
    imageUrl: logo31
  },
  {
    id: 32,
    name: "رامي",
    category: "Home & Furniture",
    color: "#E74C3C",
    description: "Lighting and home fixtures",
    createdAt: "2024-02-21",
    imageUrl: logo32
  },
  {
    id: 33,
    name: "روعة الشرق",
    category: "Food & Beverage",
    color: "#C0392B",
    description: "Eastern sweets and desserts shop",
    createdAt: "2024-03-13",
    imageUrl: logo33
  },
  {
    id: 34,
    name: "سرايا",
    category: "General Services", // بقيت في General Services، وتم إزالة Travel
    color: "#1ABC9C",
    description: "General services and utilities",
    createdAt: "2024-01-26",
    imageUrl: logo34
  },
  {
    id: 36,
    name: "شادي",
    category: "Health",
    color: "#8E44AD",
    description: "Health or medical services",
    createdAt: "2024-03-04",
    imageUrl: logo36
  },
  {
    id: 37,
    name: "شذى",
    category: "General Services",
    color: "#FFB6C1",
    description: "General services or utilities",
    createdAt: "2024-01-31",
    imageUrl: logo37
  },
  {
    id: 38,
    name: "طافش",
    category: "Automotive",
    color: "#FF6347",
    description: "Automotive services or car business",
    createdAt: "2024-02-17",
    imageUrl: logo38
  },
  {
    id: 39,
    name: "كرمل لوغو 2",
    category: "Food & Beverage",
    color: "#DEB887",
    description: "Dessert shop or sweets business",
    createdAt: "2024-03-11",
    imageUrl: logo39
  },
  {
    id: 40,
    name: "مفروشات موسى",
    category: "Home & Furniture",
    color: "#CD853F",
    description: "Furniture store or home furnishings",
    createdAt: "2024-02-03",
    imageUrl: logo40
  }
];

// تصدير قائمة التصنيفات المخفضة (بدون Travel)
export const categories = [
  "Automotive",
  "Business",
  "Design",
  "Fashion",
  "Food & Beverage",
  "General Services",
  "Health",
  "Home & Furniture",
  "Real Estate",
  "Sports",
  "Technology"
];
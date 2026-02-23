import { useState } from 'react';
import {
  ShoppingCart, Store, CreditCard, BarChart2, PieChart, TrendingUp,
  Facebook, Twitter, Instagram, Youtube, Linkedin, Share2,
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ChevronRight, ChevronLeft,
  Circle, Square, Triangle, Star, Heart, Hexagon,
  Phone, Mail, MapPin, Globe, Clock, Calendar,
  Tag, Gift, Percent, Zap, Award, Shield,
  Home, Building, Car, Plane, Camera, Music,
} from 'lucide-react';

const ICON_CATEGORIES = [
  {
    label: 'Бизнес',
    icons: [
      { name: 'ShoppingCart', component: ShoppingCart },
      { name: 'Store', component: Store },
      { name: 'CreditCard', component: CreditCard },
      { name: 'BarChart2', component: BarChart2 },
      { name: 'PieChart', component: PieChart },
      { name: 'TrendingUp', component: TrendingUp },
      { name: 'Tag', component: Tag },
      { name: 'Gift', component: Gift },
      { name: 'Percent', component: Percent },
      { name: 'Zap', component: Zap },
      { name: 'Award', component: Award },
      { name: 'Shield', component: Shield },
    ],
  },
  {
    label: 'Социальные сети',
    icons: [
      { name: 'Facebook', component: Facebook },
      { name: 'Twitter', component: Twitter },
      { name: 'Instagram', component: Instagram },
      { name: 'Youtube', component: Youtube },
      { name: 'Linkedin', component: Linkedin },
      { name: 'Share2', component: Share2 },
    ],
  },
  {
    label: 'Стрелки',
    icons: [
      { name: 'ArrowRight', component: ArrowRight },
      { name: 'ArrowLeft', component: ArrowLeft },
      { name: 'ArrowUp', component: ArrowUp },
      { name: 'ArrowDown', component: ArrowDown },
      { name: 'ChevronRight', component: ChevronRight },
      { name: 'ChevronLeft', component: ChevronLeft },
    ],
  },
  {
    label: 'Геометрия',
    icons: [
      { name: 'Circle', component: Circle },
      { name: 'Square', component: Square },
      { name: 'Triangle', component: Triangle },
      { name: 'Star', component: Star },
      { name: 'Heart', component: Heart },
      { name: 'Hexagon', component: Hexagon },
    ],
  },
  {
    label: 'Контакты',
    icons: [
      { name: 'Phone', component: Phone },
      { name: 'Mail', component: Mail },
      { name: 'MapPin', component: MapPin },
      { name: 'Globe', component: Globe },
      { name: 'Clock', component: Clock },
      { name: 'Calendar', component: Calendar },
    ],
  },
  {
    label: 'Разное',
    icons: [
      { name: 'Home', component: Home },
      { name: 'Building', component: Building },
      { name: 'Car', component: Car },
      { name: 'Plane', component: Plane },
      { name: 'Camera', component: Camera },
      { name: 'Music', component: Music },
    ],
  },
];

interface IconLibraryProps {
  onSelectIcon: (iconName: string) => void;
}

export function IconLibrary({ onSelectIcon }: IconLibraryProps) {
  const [activeCategory, setActiveCategory] = useState(ICON_CATEGORIES[0].label);

  const category = ICON_CATEGORIES.find((c) => c.label === activeCategory) ?? ICON_CATEGORIES[0];

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex gap-1.5 flex-wrap">
        {ICON_CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={[
              'px-2.5 py-1 rounded-full text-xs font-medium transition',
              activeCategory === cat.label
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 overflow-y-auto flex-1 pb-2">
        {category.icons.map(({ name, component: Icon }) => (
          <div key={name} className="group relative">
            <button
              onClick={() => onSelectIcon(name)}
              className="w-full aspect-square bg-gray-700 hover:bg-indigo-600/20 border border-gray-600 hover:border-indigo-500 rounded-lg flex items-center justify-center transition-colors"
              title={name}
            >
              <Icon size={22} className="text-gray-300 group-hover:text-indigo-300" />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-xs bg-gray-900 text-white px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-10 border border-gray-700">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

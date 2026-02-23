import { useState } from 'react';
import { Search } from 'lucide-react';

const FONTS = [
  { family: 'Roboto', sample: 'Привет, мир!' },
  { family: 'Open Sans', sample: 'Открытый Санс' },
  { family: 'Montserrat', sample: 'Монтсеррат' },
  { family: 'Playfair Display', sample: 'Плейфер Дисплей' },
  { family: 'Oswald', sample: 'Освальд' },
  { family: 'Inter', sample: 'Интер шрифт' },
  { family: 'Raleway', sample: 'Ралевэй' },
  { family: 'Lora', sample: 'Лора Шрифт' },
  { family: 'Nunito', sample: 'Нунито' },
  { family: 'PT Sans', sample: 'ПТ Санс' },
];

interface FontSelectorProps {
  selectedFont: string;
  onSelectFont: (fontFamily: string) => void;
}

export function FontSelector({ selectedFont, onSelectFont }: FontSelectorProps) {
  const [query, setQuery] = useState('');

  const filtered = FONTS.filter((f) =>
    f.family.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Поиск шрифта..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 pb-2">
        {filtered.map((font) => (
          <button
            key={font.family}
            onClick={() => onSelectFont(font.family)}
            className={[
              'flex flex-col gap-0.5 text-left px-3 py-2.5 rounded-lg border transition',
              selectedFont === font.family
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                : 'bg-gray-700 border-gray-600 text-gray-200 hover:border-gray-500',
            ].join(' ')}
          >
            <span className="text-xs text-gray-500">{font.family}</span>
            <span style={{ fontFamily: font.family }} className="text-base truncate">
              {font.sample}
            </span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-6">Шрифты не найдены</p>
        )}
      </div>
    </div>
  );
}

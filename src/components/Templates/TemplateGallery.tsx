import { Search } from 'lucide-react';
import { useTemplatesStore } from '../../store/templatesStore';
import { TemplateCard } from './TemplateCard';
import type { Template } from '../../types';

const CATEGORIES = [
  { id: null, label: 'Все' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'realestate', label: 'Недвижимость' },
  { id: 'events', label: 'Мероприятия' },
  { id: 'promo', label: 'Промо' },
];

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const { filteredTemplates, selectedCategory, searchQuery, setSelectedCategory, setSearchQuery } =
    useTemplatesStore();

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Поиск шаблонов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={String(cat.id)}
            onClick={() => setSelectedCategory(cat.id)}
            className={[
              'px-3 py-1 rounded-full text-xs font-medium transition',
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 overflow-y-auto flex-1 pb-2">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onApply={onSelectTemplate}
          />
        ))}
        {filteredTemplates.length === 0 && (
          <div className="col-span-2 text-center text-gray-500 text-sm py-12">
            Шаблоны не найдены
          </div>
        )}
      </div>
    </div>
  );
}

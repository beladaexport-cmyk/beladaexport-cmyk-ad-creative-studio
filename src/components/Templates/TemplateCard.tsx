import type { Template } from '../../types';

const CATEGORY_LABELS: Record<string, string> = {
  ecommerce: 'E-commerce',
  realestate: 'Недвижимость',
  events: 'Мероприятия',
  promo: 'Промо',
};

interface TemplateCardProps {
  template: Template;
  onApply: (template: Template) => void;
}

export function TemplateCard({ template, onApply }: TemplateCardProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-gray-700 border border-gray-600 hover:border-indigo-500 transition-colors cursor-pointer">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <button
            onClick={() => onApply(template)}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg"
          >
            Применить
          </button>
        </div>
      </div>
      <div className="p-2.5">
        <p className="text-sm font-medium text-gray-100 truncate">{template.name}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs bg-indigo-600/20 text-indigo-300 px-2 py-0.5 rounded-full">
            {CATEGORY_LABELS[template.category] ?? template.category}
          </span>
          <span className="text-xs text-gray-500">
            {template.width}×{template.height}
          </span>
        </div>
      </div>
    </div>
  );
}

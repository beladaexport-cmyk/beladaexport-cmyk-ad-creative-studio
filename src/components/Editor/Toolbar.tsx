import React, { useRef } from 'react';
import {
  MousePointer2,
  Type,
  Square,
  Circle,
  Image,
  Smile,
  LayoutTemplate,
  BookImage,
} from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import type { ToolType } from '../../types';

interface ToolbarProps {
  onOpenTemplates: () => void;
  onOpenLibrary: () => void;
  onOpenIcons: () => void;
  onImageUpload: (file: File) => void;
}

interface ToolItem {
  id: ToolType | 'templates' | 'library' | 'icons' | 'image-upload';
  label: string;
  icon: React.ElementType;
}

const tools: ToolItem[] = [
  { id: 'select', label: 'Выделение', icon: MousePointer2 },
  { id: 'text', label: 'Текст', icon: Type },
  { id: 'rectangle', label: 'Прямоугольник', icon: Square },
  { id: 'circle', label: 'Окружность', icon: Circle },
];

const actions: ToolItem[] = [
  { id: 'image-upload', label: 'Загрузить изображение', icon: Image },
  { id: 'icons', label: 'Иконки', icon: Smile },
];

const panels: ToolItem[] = [
  { id: 'templates', label: 'Шаблоны', icon: LayoutTemplate },
  { id: 'library', label: 'Библиотека', icon: BookImage },
];

export function Toolbar({ onOpenTemplates, onOpenLibrary, onOpenIcons, onImageUpload }: ToolbarProps) {
  const { activeTool, setActiveTool } = useEditorStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = (id: ToolItem['id']) => {
    if (id === 'templates') return onOpenTemplates();
    if (id === 'library') return onOpenLibrary();
    if (id === 'icons') return onOpenIcons();
    if (id === 'image-upload') return fileRef.current?.click();
    setActiveTool(id as ToolType);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
      e.target.value = '';
    }
  };

  const renderTool = (tool: ToolItem) => {
    const isActive = activeTool === tool.id;
    const Icon = tool.icon;
    return (
      <div key={tool.id} className="relative group">
        <button
          onClick={() => handleClick(tool.id)}
          className={[
            'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
            isActive
              ? 'bg-indigo-600 text-white'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white',
          ].join(' ')}
          title={tool.label}
        >
          <Icon size={18} />
        </button>
        <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 border border-gray-700 transition-opacity">
          {tool.label}
        </span>
      </div>
    );
  };

  return (
    <div className="w-14 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-3 gap-1 flex-shrink-0">
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {tools.map(renderTool)}

      <div className="w-8 h-px bg-gray-700 my-1" />

      {actions.map(renderTool)}

      <div className="w-8 h-px bg-gray-700 my-1" />

      {panels.map(renderTool)}
    </div>
  );
}

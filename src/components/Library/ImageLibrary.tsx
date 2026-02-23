import React, { useState } from 'react';
import { Search, Upload } from 'lucide-react';

const STOCK_IMAGES = Array.from({ length: 20 }, (_, i) => ({
  id: `stock-${i + 1}`,
  url: `https://picsum.photos/seed/lib${i + 1}/400/300`,
  thumb: `https://picsum.photos/seed/lib${i + 1}/200/150`,
}));

interface ImageLibraryProps {
  onSelectImage: (url: string) => void;
}

export function ImageLibrary({ onSelectImage }: ImageLibraryProps) {
  const [query, setQuery] = useState('');

  const filtered = STOCK_IMAGES.filter((img) =>
    img.id.includes(query.toLowerCase())
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onSelectImage(url);
    e.target.value = '';
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <label className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg cursor-pointer transition">
        <Upload size={14} />
        Загрузить изображение
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </label>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Поиск..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 overflow-y-auto flex-1 pb-2">
        {filtered.map((img) => (
          <button
            key={img.id}
            onClick={() => onSelectImage(img.url)}
            className="rounded-lg overflow-hidden group relative aspect-video"
          >
            <img
              src={img.thumb}
              alt={img.id}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(color);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      onChange(val);
    }
  };

  const handlePickerChange = (val: string) => {
    setHex(val);
    onChange(val);
  };

  return (
    <div className="flex flex-col gap-1 relative">
      {label && (
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="w-8 h-8 rounded-md border border-gray-600 flex-shrink-0 shadow-inner"
          style={{ backgroundColor: color }}
          onClick={() => setOpen((v) => !v)}
          title="Выбрать цвет"
        />
        <input
          type="text"
          value={hex}
          onChange={handleHexChange}
          maxLength={7}
          className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm text-gray-100 w-24 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
          placeholder="#000000"
        />
      </div>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 bg-gray-800 border border-gray-700 rounded-xl p-3 shadow-2xl">
          <HexColorPicker color={color} onChange={handlePickerChange} />
          <button
            className="mt-2 w-full text-xs text-gray-400 hover:text-gray-200 transition"
            onClick={() => setOpen(false)}
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
}

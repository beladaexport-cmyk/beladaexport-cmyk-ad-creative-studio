import { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { useEditorStore } from '../../store/editorStore';
import { ColorPicker } from '../UI/ColorPicker';
import { Input } from '../UI/Input';
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';

const FONTS = [
  'Roboto', 'Open Sans', 'Montserrat', 'Playfair Display',
  'Oswald', 'Inter', 'Raleway', 'Lora', 'Nunito', 'PT Sans',
];

function NumInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <Input
      label={label}
      type="number"
      value={String(Math.round(value))}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
  );
}

export function PropertiesPanel() {
  const { canvas, selectedObjects } = useEditorStore();
  const [, forceUpdate] = useState(0);

  const obj = selectedObjects[0] ?? null;

  useEffect(() => {
    if (!canvas) return;
    const handler = () => forceUpdate((n) => n + 1);
    canvas.on('selection:created', handler);
    canvas.on('selection:updated', handler);
    canvas.on('selection:cleared', handler);
    canvas.on('object:modified', handler);
    return () => {
      canvas.off('selection:created', handler);
      canvas.off('selection:updated', handler);
      canvas.off('selection:cleared', handler);
      canvas.off('object:modified', handler);
    };
  }, [canvas]);

  if (!obj) {
    return (
      <div className="flex flex-col h-full">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2">
          Свойства
        </div>
        <p className="text-gray-500 text-xs text-center py-8 px-3">
          Выберите объект для редактирования свойств
        </p>
      </div>
    );
  }

  const set = (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (obj as any).set(props);
    canvas?.renderAll();
    forceUpdate((n) => n + 1);
  };

  const isText = obj.type === 'i-text' || obj.type === 'text';
  const textObj = isText ? (obj as fabric.IText) : null;

  const fill = (typeof obj.fill === 'string' ? obj.fill : '#000000') as string;
  const stroke = (obj.stroke ?? '') as string;
  const opacity = Math.round((obj.opacity ?? 1) * 100);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2 border-b border-gray-700">
        Свойства
      </div>

      <div className="p-3 space-y-4">
        {/* Position */}
        <section>
          <div className="text-xs font-medium text-gray-500 mb-2">Позиция</div>
          <div className="grid grid-cols-2 gap-2">
            <NumInput label="X" value={obj.left ?? 0} onChange={(v) => set({ left: v })} />
            <NumInput label="Y" value={obj.top ?? 0} onChange={(v) => set({ top: v })} />
          </div>
        </section>

        {/* Size */}
        <section>
          <div className="text-xs font-medium text-gray-500 mb-2">Размер</div>
          <div className="grid grid-cols-2 gap-2">
            <NumInput
              label="Ш"
              value={(obj.width ?? 0) * (obj.scaleX ?? 1)}
              onChange={(v) => set({ scaleX: v / (obj.width ?? 1) })}
            />
            <NumInput
              label="В"
              value={(obj.height ?? 0) * (obj.scaleY ?? 1)}
              onChange={(v) => set({ scaleY: v / (obj.height ?? 1) })}
            />
          </div>
        </section>

        {/* Text properties */}
        {isText && textObj && (
          <section>
            <div className="text-xs font-medium text-gray-500 mb-2">Текст</div>
            <div className="space-y-2">
              <Input
                label="Содержимое"
                value={textObj.text ?? ''}
                onChange={(e) => {
                  textObj.set({ text: e.target.value });
                  canvas?.renderAll();
                  forceUpdate((n) => n + 1);
                }}
              />
              <div>
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Шрифт
                </label>
                <select
                  value={textObj.fontFamily ?? 'Roboto'}
                  onChange={(e) => set({ fontFamily: e.target.value })}
                  className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1.5 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {FONTS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <NumInput
                label="Размер"
                value={textObj.fontSize ?? 48}
                onChange={(v) => set({ fontSize: v })}
              />
              <div>
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                  Стиль
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => set({ fontWeight: textObj.fontWeight === 'bold' ? 'normal' : 'bold' })}
                    className={`p-1.5 rounded ${textObj.fontWeight === 'bold' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    title="Жирный"
                  >
                    <Bold size={14} />
                  </button>
                  <button
                    onClick={() => set({ fontStyle: textObj.fontStyle === 'italic' ? 'normal' : 'italic' })}
                    className={`p-1.5 rounded ${textObj.fontStyle === 'italic' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    title="Курсив"
                  >
                    <Italic size={14} />
                  </button>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                  Выравнивание
                </div>
                <div className="flex gap-2">
                  {(['left', 'center', 'right'] as const).map((align) => {
                    const icons = { left: AlignLeft, center: AlignCenter, right: AlignRight };
                    const Icon = icons[align];
                    return (
                      <button
                        key={align}
                        onClick={() => set({ textAlign: align })}
                        className={`p-1.5 rounded ${textObj.textAlign === align ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                        title={align}
                      >
                        <Icon size={14} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Fill */}
        <section>
          <ColorPicker
            label="Заливка"
            color={fill}
            onChange={(c) => set({ fill: c })}
          />
        </section>

        {/* Stroke */}
        <section>
          <div className="space-y-2">
            <ColorPicker
              label="Обводка"
              color={stroke || '#000000'}
              onChange={(c) => set({ stroke: c })}
            />
            <NumInput
              label="Толщина обводки"
              value={obj.strokeWidth ?? 0}
              onChange={(v) => set({ strokeWidth: v })}
            />
          </div>
        </section>

        {/* Opacity */}
        <section>
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Прозрачность: {opacity}%
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => set({ opacity: Number(e.target.value) / 100 })}
            className="w-full accent-indigo-500"
          />
        </section>

        {/* Shadow */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Тень</span>
            <button
              onClick={() => {
                if (obj.shadow) {
                  obj.set({ shadow: undefined });
                } else {
                  obj.set({ shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.4)', blur: 10, offsetX: 4, offsetY: 4 }) });
                }
                canvas?.renderAll();
                forceUpdate((n) => n + 1);
              }}
              className={`text-xs px-2 py-1 rounded ${obj.shadow ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              {obj.shadow ? 'Выкл' : 'Вкл'}
            </button>
          </div>
          {obj.shadow && (
            <div className="space-y-2">
              <NumInput
                label="Размытие"
                value={(obj.shadow as fabric.Shadow).blur ?? 10}
                onChange={(v) => {
                  (obj.shadow as fabric.Shadow).blur = v;
                  canvas?.renderAll();
                  forceUpdate((n) => n + 1);
                }}
              />
              <NumInput
                label="Смещение X"
                value={(obj.shadow as fabric.Shadow).offsetX ?? 4}
                onChange={(v) => {
                  (obj.shadow as fabric.Shadow).offsetX = v;
                  canvas?.renderAll();
                  forceUpdate((n) => n + 1);
                }}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

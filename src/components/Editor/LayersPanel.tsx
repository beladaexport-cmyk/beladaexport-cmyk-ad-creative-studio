import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Eye, EyeOff, Lock, Unlock, Trash2, Type, Square, Circle, Image } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

interface LayerItem {
  index: number;
  object: fabric.Object;
  name: string;
  visible: boolean;
  locked: boolean;
  type: string;
}

function getIcon(type: string) {
  if (type === 'i-text' || type === 'text') return <Type size={13} />;
  if (type === 'rect') return <Square size={13} />;
  if (type === 'circle') return <Circle size={13} />;
  if (type === 'image') return <Image size={13} />;
  return <Square size={13} />;
}

function getName(obj: fabric.Object, index: number): string {
  const ext = obj as fabric.Object & { name?: string };
  if (ext.name) return ext.name;
  const t = obj.type ?? 'object';
  if (t === 'i-text' || t === 'text') {
    const txt = (obj as fabric.IText).text ?? '';
    return txt.slice(0, 20) || `Текст ${index + 1}`;
  }
  if (t === 'rect') return `Прямоугольник ${index + 1}`;
  if (t === 'circle') return `Окружность ${index + 1}`;
  if (t === 'image') return `Изображение ${index + 1}`;
  return `Объект ${index + 1}`;
}

export function LayersPanel() {
  const { canvas, setSelectedObjects } = useEditorStore();
  const [layers, setLayers] = useState<LayerItem[]>([]);
  const dragIndexRef = useRef<number | null>(null);

  const refresh = () => {
    if (!canvas) return;
    const objs = canvas.getObjects() as fabric.Object[];
    setLayers(
      objs
        .map((obj: fabric.Object, i: number) => ({
          index: i,
          object: obj,
          name: getName(obj, i),
          visible: obj.visible !== false,
          locked: !obj.selectable,
          type: obj.type ?? 'object',
        }))
        .reverse()
    );
  };

  useEffect(() => {
    if (!canvas) return;
    refresh();
    canvas.on('object:added', refresh);
    canvas.on('object:removed', refresh);
    canvas.on('object:modified', refresh);
    canvas.on('selection:created', refresh);
    canvas.on('selection:cleared', refresh);
    return () => {
      canvas.off('object:added', refresh);
      canvas.off('object:removed', refresh);
      canvas.off('object:modified', refresh);
      canvas.off('selection:created', refresh);
      canvas.off('selection:cleared', refresh);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas]);

  const selectLayer = (layer: LayerItem) => {
    if (!canvas) return;
    canvas.setActiveObject(layer.object);
    canvas.renderAll();
    setSelectedObjects([layer.object]);
  };

  const toggleVisibility = (e: React.MouseEvent, layer: LayerItem) => {
    e.stopPropagation();
    layer.object.set({ visible: !layer.visible });
    canvas?.renderAll();
    refresh();
  };

  const toggleLock = (e: React.MouseEvent, layer: LayerItem) => {
    e.stopPropagation();
    layer.object.set({ selectable: layer.locked, evented: layer.locked });
    canvas?.renderAll();
    refresh();
  };

  const deleteLayer = (e: React.MouseEvent, layer: LayerItem) => {
    e.stopPropagation();
    if (!canvas) return;
    canvas.remove(layer.object);
    canvas.renderAll();
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragIndexRef.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!canvas || dragIndexRef.current === null) return;
    const fromIndex = dragIndexRef.current;
    if (fromIndex === targetIndex) return;

    const objs = canvas.getObjects();
    const total = objs.length;
    // layers are displayed reversed, convert back
    const fromCanvas = total - 1 - fromIndex;
    const toCanvas = total - 1 - targetIndex;
    const obj = objs[fromCanvas];
    canvas.remove(obj);
    const newObjs = canvas.getObjects();
    newObjs.splice(toCanvas, 0, obj);
    // re-add in order
    canvas.clear();
    newObjs.forEach((o: fabric.Object) => canvas.add(o));
    canvas.renderAll();
    refresh();
    dragIndexRef.current = null;
  };

  const isSelected = (layer: LayerItem) =>
    canvas?.getActiveObjects().includes(layer.object);

  return (
    <div className="flex flex-col h-full">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2">
        Слои
      </div>
      <div className="flex-1 overflow-y-auto">
        {layers.length === 0 && (
          <p className="text-gray-500 text-xs text-center py-8 px-3">
            Холст пустой. Добавьте элементы через панель инструментов.
          </p>
        )}
        {layers.map((layer) => (
          <div
            key={layer.index}
            draggable
            onDragStart={(e) => handleDragStart(e, layer.index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, layer.index)}
            onClick={() => selectLayer(layer)}
            className={[
              'flex items-center gap-2 px-3 py-2 cursor-pointer group transition-colors text-sm',
              isSelected(layer)
                ? 'bg-indigo-600/20 border-l-2 border-indigo-500'
                : 'hover:bg-gray-700/50 border-l-2 border-transparent',
            ].join(' ')}
          >
            <span className="text-gray-500 flex-shrink-0">{getIcon(layer.type)}</span>
            <span className="flex-1 truncate text-gray-200 text-xs">{layer.name}</span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => toggleVisibility(e, layer)}
                className="text-gray-400 hover:text-white p-0.5"
                title={layer.visible ? 'Скрыть' : 'Показать'}
              >
                {layer.visible ? <Eye size={13} /> : <EyeOff size={13} />}
              </button>
              <button
                onClick={(e) => toggleLock(e, layer)}
                className="text-gray-400 hover:text-white p-0.5"
                title={layer.locked ? 'Разблокировать' : 'Заблокировать'}
              >
                {layer.locked ? <Lock size={13} /> : <Unlock size={13} />}
              </button>
              <button
                onClick={(e) => deleteLayer(e, layer)}
                className="text-gray-400 hover:text-red-400 p-0.5"
                title="Удалить"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

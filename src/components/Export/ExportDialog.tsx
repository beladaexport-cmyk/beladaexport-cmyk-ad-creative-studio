import { useState } from 'react';
import { fabric } from 'fabric';
import { Modal } from '../UI/Modal';
import { exportToPNG, exportToJPG, exportToPDF } from '../../utils/export';
import { CANVAS_PRESETS } from '../../data/presets';

type Format = 'PNG' | 'JPG' | 'PDF';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  canvas: fabric.Canvas | null;
  projectName?: string;
}

export function ExportDialog({ isOpen, onClose, canvas, projectName = 'export' }: ExportDialogProps) {
  const [format, setFormat] = useState<Format>('PNG');
  const [quality, setQuality] = useState(92);
  const [multiplier, setMultiplier] = useState(2);

  const handleExport = () => {
    if (!canvas) return;
    const name = projectName.replace(/\s+/g, '_');
    if (format === 'PNG') {
      exportToPNG(canvas, name, multiplier);
    } else if (format === 'JPG') {
      exportToJPG(canvas, name, quality / 100);
    } else if (format === 'PDF') {
      exportToPDF(canvas, name);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Экспорт" size="sm">
      <div className="space-y-5">
        {/* Format */}
        <div>
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Формат</div>
          <div className="flex gap-2">
            {(['PNG', 'JPG', 'PDF'] as Format[]).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={[
                  'flex-1 py-2 rounded-lg text-sm font-medium border transition',
                  format === f
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500',
                ].join(' ')}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Resolution multiplier for PNG */}
        {format === 'PNG' && (
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Разрешение
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((m) => (
                <button
                  key={m}
                  onClick={() => setMultiplier(m)}
                  className={[
                    'flex-1 py-2 rounded-lg text-sm font-medium border transition',
                    multiplier === m
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500',
                  ].join(' ')}
                >
                  {m}x
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quality for JPG */}
        {format === 'JPG' && (
          <div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Качество: {quality}%
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>
        )}

        {/* Platform presets */}
        <div>
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
            Форматы площадок
          </div>
          <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
            {CANVAS_PRESETS.map((preset) => (
              <div
                key={preset.id}
                className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1.5"
              >
                <div className="text-xs font-medium text-gray-200 truncate">{preset.name}</div>
                <div className="text-xs text-gray-500">
                  {preset.width}×{preset.height}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export button */}
        <button
          onClick={handleExport}
          disabled={!canvas}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-medium py-2.5 rounded-lg transition"
        >
          Экспортировать {format}
        </button>
      </div>
    </Modal>
  );
}

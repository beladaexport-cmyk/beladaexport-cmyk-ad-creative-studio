import { useState } from 'react';
import {
  Undo2,
  Redo2,
  Save,
  Download,
  Moon,
  Sun,
  Grid3X3,
  Pencil,
} from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

interface TopBarProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: () => void;
  lastSaved: Date | null;
  isSaving: boolean;
}

export function TopBar({
  projectName,
  onProjectNameChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  onExport,
  lastSaved,
  isSaving,
}: TopBarProps) {
  const { zoom, isDarkMode, showGrid, toggleDarkMode, toggleGrid } = useEditorStore();
  const [editing, setEditing] = useState(false);
  const [nameVal, setNameVal] = useState(projectName);

  const commitName = () => {
    setEditing(false);
    if (nameVal.trim()) onProjectNameChange(nameVal.trim());
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-12 bg-gray-900 border-b border-gray-700 flex items-center px-4 gap-3 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-2">
        <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
          AC
        </div>
        <span className="text-sm font-semibold text-white hidden sm:block">Ad Creative Studio</span>
      </div>

      <div className="w-px h-6 bg-gray-700" />

      {/* Project name */}
      <div className="flex items-center gap-1.5 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => e.key === 'Enter' && commitName()}
            className="bg-gray-700 border border-indigo-500 rounded px-2 py-0.5 text-sm text-white focus:outline-none w-40"
          />
        ) : (
          <button
            onClick={() => { setNameVal(projectName); setEditing(true); }}
            className="text-sm text-gray-200 hover:text-white flex items-center gap-1 truncate"
          >
            <span className="truncate max-w-32">{projectName}</span>
            <Pencil size={12} className="text-gray-500 flex-shrink-0" />
          </button>
        )}
      </div>

      <div className="flex-1" />

      {/* Save status */}
      <span className="text-xs text-gray-500 hidden md:block">
        {isSaving ? 'Сохранение...' : lastSaved ? `Сохранено в ${formatTime(lastSaved)}` : ''}
      </span>

      {/* Zoom */}
      <span className="text-xs text-gray-400 font-mono hidden md:block">
        {Math.round(zoom * 100)}%
      </span>

      <div className="w-px h-6 bg-gray-700" />

      {/* Undo/Redo */}
      <button
        disabled={!canUndo}
        onClick={onUndo}
        className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-30 transition"
        title="Отменить (Ctrl+Z)"
      >
        <Undo2 size={16} />
      </button>
      <button
        disabled={!canRedo}
        onClick={onRedo}
        className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-gray-700 disabled:opacity-30 transition"
        title="Повторить (Ctrl+Y)"
      >
        <Redo2 size={16} />
      </button>

      <div className="w-px h-6 bg-gray-700" />

      {/* Grid */}
      <button
        onClick={toggleGrid}
        className={`p-1.5 rounded transition ${showGrid ? 'text-indigo-400 bg-indigo-600/20' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
        title="Сетка"
      >
        <Grid3X3 size={16} />
      </button>

      {/* Dark mode */}
      <button
        onClick={toggleDarkMode}
        className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-gray-700 transition"
        title={isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
      >
        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <div className="w-px h-6 bg-gray-700" />

      {/* Save */}
      <button
        onClick={onSave}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm transition"
        title="Сохранить (Ctrl+S)"
      >
        <Save size={14} />
        <span className="hidden sm:block">Сохранить</span>
      </button>

      {/* Export */}
      <button
        onClick={onExport}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition"
        title="Экспортировать"
      >
        <Download size={14} />
        <span className="hidden sm:block">Экспорт</span>
      </button>
    </div>
  );
}

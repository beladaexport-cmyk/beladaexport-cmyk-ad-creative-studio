import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEditorStore } from '../store/editorStore';
import { useProjectsStore } from '../store/projectsStore';
import { useHistory } from '../hooks/useHistory';
import { useAutoSave } from '../hooks/useAutoSave';
import { useKeyboard } from '../hooks/useKeyboard';
import { Canvas } from '../components/Editor/Canvas';
import { Toolbar } from '../components/Editor/Toolbar';
import { TopBar } from '../components/Editor/TopBar';
import { LayersPanel } from '../components/Editor/LayersPanel';
import { PropertiesPanel } from '../components/Editor/PropertiesPanel';
import { TemplateGallery } from '../components/Templates/TemplateGallery';
import { ImageLibrary } from '../components/Library/ImageLibrary';
import { IconLibrary } from '../components/Library/IconLibrary';
import { ExportDialog } from '../components/Export/ExportDialog';
import { addTextToCanvas, addRectToCanvas, addCircleToCanvas, addImageToCanvas } from '../utils/canvas';
import { applyTemplate } from '../utils/templates';
import { TEMPLATES } from '../data/templates';
import type { Template } from '../types';

type RightTab = 'layers' | 'properties';
type SidePanel = 'templates' | 'library' | 'icons' | null;

export default function Editor() {
  const location = useLocation();

  const { canvas, activeTool, setActiveTool, canvasWidth, canvasHeight, setSelectedObjects } =
    useEditorStore();
  const { currentProject, createNewProject, saveProject } = useProjectsStore();

  const [rightTab, setRightTab] = useState<RightTab>('layers');
  const [sidePanel, setSidePanel] = useState<SidePanel>(null);
  const [showExport, setShowExport] = useState(false);
  const [projectName, setProjectName] = useState(currentProject?.name ?? 'Новый проект');

  const { canUndo, canRedo, undo, redo } = useHistory(canvas);
  const { lastSaved, isSaving } = useAutoSave(canvas, currentProject);

  // Initialize project if none
  useEffect(() => {
    if (!currentProject) {
      createNewProject('Новый проект', 1080, 1080);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply template from navigation state
  useEffect(() => {
    if (!canvas) return;
    const state = location.state as { templateId?: string } | null;
    if (state?.templateId) {
      const tpl = TEMPLATES.find((t) => t.id === state.templateId);
      if (tpl) applyTemplate(canvas, tpl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas]);

  // Selection tracking
  useEffect(() => {
    if (!canvas) return;
    const onSelection = () => setSelectedObjects(canvas.getActiveObjects());
    const onClear = () => setSelectedObjects([]);
    canvas.on('selection:created', onSelection);
    canvas.on('selection:updated', onSelection);
    canvas.on('selection:cleared', onClear);
    return () => {
      canvas.off('selection:created', onSelection);
      canvas.off('selection:updated', onSelection);
      canvas.off('selection:cleared', onClear);
    };
  }, [canvas, setSelectedObjects]);

  // Tool clicks on canvas
  useEffect(() => {
    if (!canvas) return;
    const handleClick = () => {
      if (activeTool === 'text') {
        addTextToCanvas(canvas);
        setActiveTool('select');
      } else if (activeTool === 'rectangle') {
        addRectToCanvas(canvas);
        setActiveTool('select');
      } else if (activeTool === 'circle') {
        addCircleToCanvas(canvas);
        setActiveTool('select');
      }
    };
    canvas.on('mouse:up', handleClick);
    // cursor
    canvas.defaultCursor = activeTool === 'select' ? 'default' : 'crosshair';
    return () => {
      canvas.off('mouse:up', handleClick);
    };
  }, [canvas, activeTool, setActiveTool]);

  const handleSave = useCallback(() => {
    if (!canvas || !currentProject) return;
    const updated = {
      ...currentProject,
      name: projectName,
      updatedAt: new Date().toISOString(),
    };
    saveProject(updated);
  }, [canvas, currentProject, projectName, saveProject]);

  const handleImageUpload = useCallback(
    (file: File) => {
      if (!canvas) return;
      const url = URL.createObjectURL(file);
      addImageToCanvas(canvas, url);
    },
    [canvas]
  );

  const handleSelectImage = useCallback(
    (url: string) => {
      if (!canvas) return;
      addImageToCanvas(canvas, url);
      setSidePanel(null);
    },
    [canvas]
  );

  const handleSelectIcon = useCallback(
    (iconName: string) => {
      if (!canvas) return;
      // Add icon as text (unicode workaround) — use icon name as text label
      addTextToCanvas(canvas, { text: iconName, fontSize: 60, fill: '#4F46E5' });
      setSidePanel(null);
    },
    [canvas]
  );

  const handleSelectTemplate = useCallback(
    (template: Template) => {
      if (!canvas) return;
      applyTemplate(canvas, template);
      setSidePanel(null);
    },
    [canvas]
  );

  useKeyboard({
    canvas,
    onUndo: undo,
    onRedo: redo,
    onSave: handleSave,
    onZoomIn: () => useEditorStore.getState().setZoom(Math.min(useEditorStore.getState().zoom + 0.1, 3)),
    onZoomOut: () => useEditorStore.getState().setZoom(Math.max(useEditorStore.getState().zoom - 0.1, 0.1)),
  });

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      <TopBar
        projectName={projectName}
        onProjectNameChange={setProjectName}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onSave={handleSave}
        onExport={() => setShowExport(true)}
        lastSaved={lastSaved}
        isSaving={isSaving}
      />

      <div className="flex flex-1 overflow-hidden">
        <Toolbar
          onOpenTemplates={() => setSidePanel('templates')}
          onOpenLibrary={() => setSidePanel('library')}
          onOpenIcons={() => setSidePanel('icons')}
          onImageUpload={handleImageUpload}
        />

        <Canvas width={canvasWidth} height={canvasHeight} />

        {/* Right panel */}
        <div className="w-60 bg-gray-800 border-l border-gray-700 flex flex-col flex-shrink-0">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            {(['layers', 'properties'] as RightTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setRightTab(tab)}
                className={[
                  'flex-1 py-2.5 text-xs font-medium transition',
                  rightTab === tab
                    ? 'text-indigo-400 border-b-2 border-indigo-500'
                    : 'text-gray-500 hover:text-gray-300',
                ].join(' ')}
              >
                {tab === 'layers' ? 'Слои' : 'Свойства'}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-hidden">
            {rightTab === 'layers' ? <LayersPanel /> : <PropertiesPanel />}
          </div>
        </div>
      </div>

      {/* Side panel: Templates */}
      {sidePanel === 'templates' && (
        <div className="fixed left-14 top-12 bottom-0 w-80 bg-gray-800 border-r border-gray-700 z-40 flex flex-col p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Шаблоны</h3>
            <button
              onClick={() => setSidePanel(null)}
              className="text-gray-400 hover:text-white text-lg leading-none"
            >
              ×
            </button>
          </div>
          <TemplateGallery onSelectTemplate={handleSelectTemplate} />
        </div>
      )}

      {/* Side panel: Image Library */}
      {sidePanel === 'library' && (
        <div className="fixed left-14 top-12 bottom-0 w-72 bg-gray-800 border-r border-gray-700 z-40 flex flex-col p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Библиотека изображений</h3>
            <button
              onClick={() => setSidePanel(null)}
              className="text-gray-400 hover:text-white text-lg leading-none"
            >
              ×
            </button>
          </div>
          <ImageLibrary onSelectImage={handleSelectImage} />
        </div>
      )}

      {/* Side panel: Icons */}
      {sidePanel === 'icons' && (
        <div className="fixed left-14 top-12 bottom-0 w-64 bg-gray-800 border-r border-gray-700 z-40 flex flex-col p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Иконки</h3>
            <button
              onClick={() => setSidePanel(null)}
              className="text-gray-400 hover:text-white text-lg leading-none"
            >
              ×
            </button>
          </div>
          <IconLibrary onSelectIcon={handleSelectIcon} />
        </div>
      )}

      {/* Export dialog */}
      <ExportDialog
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        canvas={canvas}
        projectName={projectName}
      />
    </div>
  );
}

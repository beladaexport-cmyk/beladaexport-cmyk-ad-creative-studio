import { create } from 'zustand';
import { fabric } from 'fabric';
import type { ToolType } from '../types';

interface EditorState {
  canvas: fabric.Canvas | null;
  activeTool: ToolType;
  selectedObjects: fabric.Object[];
  canvasWidth: number;
  canvasHeight: number;
  zoom: number;
  showGrid: boolean;
  isDarkMode: boolean;
  isLoading: boolean;
  setCanvas: (canvas: fabric.Canvas | null) => void;
  setActiveTool: (tool: ToolType) => void;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  setCanvasSize: (width: number, height: number) => void;
  setZoom: (zoom: number) => void;
  toggleGrid: () => void;
  toggleDarkMode: () => void;
  setIsLoading: (loading: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  canvas: null,
  activeTool: 'select',
  selectedObjects: [],
  canvasWidth: 1080,
  canvasHeight: 1080,
  zoom: 1,
  showGrid: false,
  isDarkMode: true,
  isLoading: false,

  setCanvas: (canvas) => set({ canvas }),
  setActiveTool: (activeTool) => set({ activeTool }),
  setSelectedObjects: (selectedObjects) => set({ selectedObjects }),
  setCanvasSize: (canvasWidth, canvasHeight) => set({ canvasWidth, canvasHeight }),
  setZoom: (zoom) => set({ zoom }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

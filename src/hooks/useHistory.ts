import { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const MAX_HISTORY = 50;

interface UseHistoryReturn {
  canUndo: boolean;
  canRedo: boolean;
  saveState: () => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
}

export function useHistory(canvas: fabric.Canvas | null): UseHistoryReturn {
  const historyRef = useRef<string[]>([]);
  const indexRef = useRef<number>(-1);
  const isApplyingRef = useRef(false);
  const [, forceUpdate] = useState(0);

  const saveState = useCallback(() => {
    if (!canvas || isApplyingRef.current) return;
    const json = JSON.stringify(canvas.toJSON(['id', 'name']));
    // Remove future states if branching
    historyRef.current = historyRef.current.slice(0, indexRef.current + 1);
    historyRef.current.push(json);
    if (historyRef.current.length > MAX_HISTORY) {
      historyRef.current.shift();
    } else {
      indexRef.current += 1;
    }
    forceUpdate((n) => n + 1);
  }, [canvas]);

  const undo = useCallback(() => {
    if (!canvas || indexRef.current <= 0) return;
    indexRef.current -= 1;
    isApplyingRef.current = true;
    canvas.loadFromJSON(historyRef.current[indexRef.current], () => {
      canvas.renderAll();
      isApplyingRef.current = false;
      forceUpdate((n) => n + 1);
    });
  }, [canvas]);

  const redo = useCallback(() => {
    if (!canvas || indexRef.current >= historyRef.current.length - 1) return;
    indexRef.current += 1;
    isApplyingRef.current = true;
    canvas.loadFromJSON(historyRef.current[indexRef.current], () => {
      canvas.renderAll();
      isApplyingRef.current = false;
      forceUpdate((n) => n + 1);
    });
  }, [canvas]);

  const clearHistory = useCallback(() => {
    historyRef.current = [];
    indexRef.current = -1;
    forceUpdate((n) => n + 1);
  }, []);

  // Save initial state when canvas is ready
  useEffect(() => {
    if (!canvas) return;
    const handleModified = () => saveState();
    canvas.on('object:added', handleModified);
    canvas.on('object:modified', handleModified);
    canvas.on('object:removed', handleModified);
    return () => {
      canvas.off('object:added', handleModified);
      canvas.off('object:modified', handleModified);
      canvas.off('object:removed', handleModified);
    };
  }, [canvas, saveState]);

  const canUndo = indexRef.current > 0;
  const canRedo = indexRef.current < historyRef.current.length - 1;

  return { canUndo, canRedo, saveState, undo, redo, clearHistory };
}

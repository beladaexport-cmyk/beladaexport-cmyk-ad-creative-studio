import { useEffect } from 'react';
import { fabric } from 'fabric';

interface UseKeyboardOptions {
  canvas: fabric.Canvas | null;
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

export function useKeyboard({
  canvas,
  onUndo,
  onRedo,
  onSave,
  onZoomIn,
  onZoomOut,
}: UseKeyboardOptions): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      // Don't intercept when typing in an input/textarea
      if (tag === 'input' || tag === 'textarea') return;

      const ctrl = e.ctrlKey || e.metaKey;

      if (ctrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        onUndo?.();
        return;
      }

      if (ctrl && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        onRedo?.();
        return;
      }

      if (ctrl && e.key === 's') {
        e.preventDefault();
        onSave?.();
        return;
      }

      if (ctrl && e.key === 'd') {
        e.preventDefault();
        if (!canvas) return;
        const active = canvas.getActiveObjects() as fabric.Object[];
        active.forEach((obj: fabric.Object) => {
          obj.clone((clone: fabric.Object) => {
            clone.set({ left: (obj.left ?? 0) + 20, top: (obj.top ?? 0) + 20 });
            canvas.add(clone);
          });
        });
        canvas.renderAll();
        return;
      }

      if ((e.key === 'Delete' || e.key === 'Backspace') && !ctrl) {
        if (!canvas) return;
        const active = canvas.getActiveObjects() as fabric.Object[];
        if (active.length > 0) {
          active.forEach((obj: fabric.Object) => canvas.remove(obj));
          canvas.discardActiveObject();
          canvas.renderAll();
        }
        return;
      }

      if (e.key === 'Escape') {
        canvas?.discardActiveObject();
        canvas?.renderAll();
        return;
      }

      if (e.key === '+' || e.key === '=') {
        onZoomIn?.();
        return;
      }

      if (e.key === '-') {
        onZoomOut?.();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canvas, onUndo, onRedo, onSave, onZoomIn, onZoomOut]);
}

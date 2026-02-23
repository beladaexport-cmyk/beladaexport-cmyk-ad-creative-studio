import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

interface UseCanvasOptions {
  width: number;
  height: number;
  backgroundColor?: string;
}

interface UseCanvasReturn {
  canvas: fabric.Canvas | null;
  isReady: boolean;
}

export function useCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: UseCanvasOptions
): UseCanvasReturn {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [isReady, setIsReady] = useState(false);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fc = new fabric.Canvas(canvasRef.current, {
      width: options.width,
      height: options.height,
      backgroundColor: options.backgroundColor ?? '#ffffff',
      preserveObjectStacking: true,
      selection: true,
    });

    fabricRef.current = fc;
    setCanvas(fc);
    setIsReady(true);

    return () => {
      fc.dispose();
      fabricRef.current = null;
      setCanvas(null);
      setIsReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  return { canvas, isReady };
}

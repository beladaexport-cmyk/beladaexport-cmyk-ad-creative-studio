import { useEffect, useRef } from 'react';
import { useCanvas } from '../../hooks/useCanvas';
import { useEditorStore } from '../../store/editorStore';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface CanvasProps {
  width: number;
  height: number;
}

export function Canvas({ width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvas, isReady } = useCanvas(canvasRef, { width, height });
  const { setCanvas, zoom, setZoom, showGrid, isDarkMode } = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Register canvas in store
  useEffect(() => {
    if (isReady) setCanvas(canvas);
    return () => {
      if (!isReady) setCanvas(null);
    };
  }, [canvas, isReady, setCanvas]);

  // Apply zoom to canvas
  useEffect(() => {
    if (!canvas) return;
    canvas.setZoom(zoom);
    canvas.setWidth(width * zoom);
    canvas.setHeight(height * zoom);
    canvas.renderAll();
  }, [canvas, zoom, width, height]);

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.1, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.1, 0.1));

  const bgColor = isDarkMode ? '#1f2937' : '#f3f4f6';

  return (
    <div
      className="flex flex-col items-center justify-center flex-1 overflow-auto"
      style={{ background: bgColor }}
    >
      <div
        ref={containerRef}
        className="relative shadow-2xl"
        style={{ width: width * zoom, height: height * zoom }}
      >
        <canvas ref={canvasRef} />

        {/* Grid overlay */}
        {showGrid && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={width * zoom}
            height={height * zoom}
          >
            <defs>
              <pattern id="grid" width={20 * zoom} height={20 * zoom} patternUnits="userSpaceOnUse">
                <path
                  d={`M ${20 * zoom} 0 L 0 0 0 ${20 * zoom}`}
                  fill="none"
                  stroke="rgba(99,102,241,0.25)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        )}
      </div>

      {/* Zoom controls */}
      <div className="flex items-center gap-2 mt-4 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 shadow">
        <button
          onClick={handleZoomOut}
          className="text-gray-400 hover:text-white transition"
          title="Уменьшить"
        >
          <ZoomOut size={16} />
        </button>
        <span className="text-xs text-gray-300 w-12 text-center font-mono">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          className="text-gray-400 hover:text-white transition"
          title="Увеличить"
        >
          <ZoomIn size={16} />
        </button>
      </div>
    </div>
  );
}

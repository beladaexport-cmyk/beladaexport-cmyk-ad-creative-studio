import { fabric } from 'fabric';

export function addTextToCanvas(
  canvas: fabric.Canvas,
  options: { text?: string; left?: number; top?: number; fontSize?: number; fill?: string; fontFamily?: string } = {}
): fabric.IText {
  const text = new fabric.IText(options.text ?? 'Текст', {
    left: options.left ?? canvas.getWidth() / 2 - 100,
    top: options.top ?? canvas.getHeight() / 2 - 20,
    fontSize: options.fontSize ?? 48,
    fill: options.fill ?? '#000000',
    fontFamily: options.fontFamily ?? 'Roboto',
  });
  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
  return text;
}

export function addRectToCanvas(
  canvas: fabric.Canvas,
  options: { left?: number; top?: number; width?: number; height?: number; fill?: string; stroke?: string; strokeWidth?: number } = {}
): fabric.Rect {
  const rect = new fabric.Rect({
    left: options.left ?? canvas.getWidth() / 2 - 75,
    top: options.top ?? canvas.getHeight() / 2 - 50,
    width: options.width ?? 150,
    height: options.height ?? 100,
    fill: options.fill ?? '#4F46E5',
    stroke: options.stroke ?? '',
    strokeWidth: options.strokeWidth ?? 0,
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.renderAll();
  return rect;
}

export function addCircleToCanvas(
  canvas: fabric.Canvas,
  options: { left?: number; top?: number; radius?: number; fill?: string; stroke?: string; strokeWidth?: number } = {}
): fabric.Circle {
  const circle = new fabric.Circle({
    left: options.left ?? canvas.getWidth() / 2 - 50,
    top: options.top ?? canvas.getHeight() / 2 - 50,
    radius: options.radius ?? 50,
    fill: options.fill ?? '#10B981',
    stroke: options.stroke ?? '',
    strokeWidth: options.strokeWidth ?? 0,
  });
  canvas.add(circle);
  canvas.setActiveObject(circle);
  canvas.renderAll();
  return circle;
}

export function addImageToCanvas(
  canvas: fabric.Canvas,
  url: string,
  options: { left?: number; top?: number; scaleX?: number; scaleY?: number } = {}
): Promise<fabric.Image> {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(
      url,
      (img: fabric.Image) => {
        if (!img) {
          reject(new Error('Failed to load image'));
          return;
        }
        const maxDim = 400;
        const scale = Math.min(maxDim / (img.width ?? 1), maxDim / (img.height ?? 1));
        img.set({
          left: options.left ?? canvas.getWidth() / 2 - (img.width ?? 0) * scale / 2,
          top: options.top ?? canvas.getHeight() / 2 - (img.height ?? 0) * scale / 2,
          scaleX: options.scaleX ?? scale,
          scaleY: options.scaleY ?? scale,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        resolve(img);
      },
      { crossOrigin: 'anonymous' }
    );
  });
}

export function alignObjects(
  canvas: fabric.Canvas,
  alignment: 'left' | 'right' | 'center' | 'top' | 'bottom' | 'middle'
): void {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects.length) return;
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  activeObjects.forEach((obj: fabric.Object) => {
    const objWidth = (obj.width ?? 0) * (obj.scaleX ?? 1);
    const objHeight = (obj.height ?? 0) * (obj.scaleY ?? 1);
    switch (alignment) {
      case 'left':
        obj.set({ left: 0 });
        break;
      case 'right':
        obj.set({ left: canvasWidth - objWidth });
        break;
      case 'center':
        obj.set({ left: (canvasWidth - objWidth) / 2 });
        break;
      case 'top':
        obj.set({ top: 0 });
        break;
      case 'bottom':
        obj.set({ top: canvasHeight - objHeight });
        break;
      case 'middle':
        obj.set({ top: (canvasHeight - objHeight) / 2 });
        break;
    }
    obj.setCoords();
  });
  canvas.renderAll();
}

export function getCanvasJSON(canvas: fabric.Canvas): string {
  return JSON.stringify(canvas.toJSON(['id', 'name']));
}

export function loadCanvasFromJSON(canvas: fabric.Canvas, json: string): Promise<void> {
  return new Promise((resolve) => {
    canvas.loadFromJSON(json, () => {
      canvas.renderAll();
      resolve();
    });
  });
}

export function exportCanvasToPNG(canvas: fabric.Canvas, filename = 'export', multiplier = 2): void {
  const dataURL = canvas.toDataURL({ format: 'png', multiplier });
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${filename}.png`;
  link.click();
}

export function exportCanvasToJPG(canvas: fabric.Canvas, filename = 'export', quality = 0.9): void {
  const dataURL = canvas.toDataURL({ format: 'jpeg', quality, multiplier: 2 });
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${filename}.jpg`;
  link.click();
}

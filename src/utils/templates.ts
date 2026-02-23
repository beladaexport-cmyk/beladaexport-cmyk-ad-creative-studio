import { fabric } from 'fabric';
import type { Template } from '../types';

export function getTemplatePreview(template: Template): string {
  return template.thumbnail;
}

export function applyTemplate(canvas: fabric.Canvas, template: Template): Promise<void> {
  return new Promise((resolve) => {
    canvas.clear();

    // Set canvas background
    const bg = (template as Template & { backgroundColor?: string }).backgroundColor;
    if (bg) {
      canvas.setBackgroundColor(bg, () => canvas.renderAll());
    }

    const loadNext = (index: number) => {
      if (index >= template.elements.length) {
        canvas.renderAll();
        resolve();
        return;
      }

      const el = template.elements[index];
      const props = el.properties;

      if (el.type === 'text') {
        const text = new fabric.IText(props.text ?? '', {
          left: props.left,
          top: props.top,
          fontSize: props.fontSize ?? 48,
          fill: props.fill ?? '#000000',
          fontFamily: props.fontFamily ?? 'Roboto',
        });
        canvas.add(text);
        loadNext(index + 1);
      } else if (el.type === 'shape') {
        const rect = new fabric.Rect({
          left: props.left,
          top: props.top,
          width: props.width ?? 100,
          height: props.height ?? 100,
          fill: props.fill ?? '#cccccc',
          selectable: false,
          evented: false,
        });
        canvas.add(rect);
        loadNext(index + 1);
      } else if (el.type === 'image' && props.src) {
        fabric.Image.fromURL(
          props.src,
          (img: fabric.Image) => {
            img.set({ left: props.left, top: props.top });
            canvas.add(img);
            loadNext(index + 1);
          },
          { crossOrigin: 'anonymous' }
        );
      } else {
        loadNext(index + 1);
      }
    };

    loadNext(0);
  });
}

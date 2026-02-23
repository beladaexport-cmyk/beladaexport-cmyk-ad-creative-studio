import { fabric } from 'fabric';

export function exportToPNG(canvas: fabric.Canvas, filename: string, multiplier = 2): void {
  const dataURL = canvas.toDataURL({ format: 'png', multiplier });
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJPG(canvas: fabric.Canvas, filename: string, quality = 0.92): void {
  const dataURL = canvas.toDataURL({ format: 'jpeg', quality, multiplier: 2 });
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${filename}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(canvas: fabric.Canvas, filename: string): void {
  const dataURL = canvas.toDataURL({ format: 'png', multiplier: 2 });
  const width = canvas.getWidth();
  const height = canvas.getHeight();

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: white; }
          img { max-width: 100%; height: auto; display: block; }
          @page { size: ${width}px ${height}px; margin: 0; }
          @media print { body { min-height: initial; } img { width: 100%; } }
        </style>
      </head>
      <body>
        <img src="${dataURL}" alt="${filename}" />
        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          };
        <\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

import type { fabric } from 'fabric';

export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'icon';
  fabricObject?: fabric.Object;
  properties: {
    left: number;
    top: number;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    fontSize?: number;
    fontFamily?: string;
    text?: string;
    src?: string;
  };
}

export interface Template {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
  thumbnail: string;
  backgroundColor?: string;
  elements: CanvasElement[];
}

export interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
  elements: CanvasElement[];
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandKit {
  id: string;
  name: string;
  colors: string[];
  fonts: string[];
  logos: string[];
}

export type ToolType = 'select' | 'text' | 'rectangle' | 'circle' | 'image' | 'icon';
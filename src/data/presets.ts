export interface CanvasPreset {
  id: string;
  name: string;
  platform: string;
  width: number;
  height: number;
  icon: string;
}

export const CANVAS_PRESETS: CanvasPreset[] = [
  {
    id: 'instagram-post',
    name: 'Instagram Пост',
    platform: 'Instagram',
    width: 1080,
    height: 1080,
    icon: 'Instagram',
  },
  {
    id: 'instagram-story',
    name: 'Instagram Stories',
    platform: 'Instagram',
    width: 1080,
    height: 1920,
    icon: 'Instagram',
  },
  {
    id: 'facebook-post',
    name: 'Facebook Пост',
    platform: 'Facebook',
    width: 1200,
    height: 630,
    icon: 'Facebook',
  },
  {
    id: 'google-display',
    name: 'Google Display',
    platform: 'Google',
    width: 300,
    height: 250,
    icon: 'Globe',
  },
  {
    id: 'google-banner',
    name: 'Google Баннер',
    platform: 'Google',
    width: 728,
    height: 90,
    icon: 'Globe',
  },
  {
    id: 'tiktok-video',
    name: 'TikTok Видео',
    platform: 'TikTok',
    width: 1080,
    height: 1920,
    icon: 'Video',
  },
  {
    id: 'web-banner',
    name: 'Веб Баннер',
    platform: 'Web',
    width: 960,
    height: 100,
    icon: 'Monitor',
  },
];

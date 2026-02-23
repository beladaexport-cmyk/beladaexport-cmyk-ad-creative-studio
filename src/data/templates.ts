import type { Template } from '../types';

export const TEMPLATES: Template[] = [
  // E-commerce
  {
    id: 'ecom-1',
    name: 'Распродажа — Скидка 50%',
    category: 'ecommerce',
    width: 1080,
    height: 1080,
    thumbnail: 'https://picsum.photos/seed/ecom1/300/300',
    backgroundColor: '#FF6B35',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1080, height: 1080, fill: '#FF6B35' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 100, top: 300, fontSize: 120, fill: '#FFFFFF', text: 'СКИДКА\n50%', fontFamily: 'Montserrat' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 100, top: 600, fontSize: 40, fill: '#FFFFFF', text: 'Только сегодня!', fontFamily: 'Roboto' },
      },
    ],
  },
  {
    id: 'ecom-2',
    name: 'Новая коллекция',
    category: 'ecommerce',
    width: 1080,
    height: 1080,
    thumbnail: 'https://picsum.photos/seed/ecom2/300/300',
    backgroundColor: '#1A1A2E',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1080, height: 1080, fill: '#1A1A2E' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 100, top: 400, fontSize: 80, fill: '#E94560', text: 'НОВАЯ\nКОЛЛЕКЦИЯ', fontFamily: 'Oswald' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 100, top: 650, fontSize: 36, fill: '#FFFFFF', text: 'Осень / Зима 2024', fontFamily: 'Roboto' },
      },
    ],
  },
  {
    id: 'ecom-3',
    name: 'Flash Sale',
    category: 'ecommerce',
    width: 1200,
    height: 630,
    thumbnail: 'https://picsum.photos/seed/ecom3/300/200',
    backgroundColor: '#FFD700',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1200, height: 630, fill: '#FFD700' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 80, top: 180, fontSize: 100, fill: '#1A1A1A', text: 'FLASH SALE', fontFamily: 'Montserrat' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 80, top: 340, fontSize: 48, fill: '#333333', text: 'До -70% на всё!', fontFamily: 'Roboto' },
      },
    ],
  },

  // Real Estate
  {
    id: 'realestate-1',
    name: 'Продажа квартиры',
    category: 'realestate',
    width: 1080,
    height: 1080,
    thumbnail: 'https://picsum.photos/seed/realestate1/300/300',
    backgroundColor: '#2C3E50',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1080, height: 1080, fill: '#2C3E50' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 80, top: 200, fontSize: 72, fill: '#FFFFFF', text: 'ПРОДАЁТСЯ\nКВАРТИРА', fontFamily: 'Playfair Display' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 80, top: 450, fontSize: 48, fill: '#E8D5A3', text: '3 комн. | 95 м²', fontFamily: 'Roboto' },
      },
      {
        id: 'el-4',
        type: 'text',
        properties: { left: 80, top: 560, fontSize: 64, fill: '#E8D5A3', text: '12 500 000 ₽', fontFamily: 'Montserrat' },
      },
    ],
  },
  {
    id: 'realestate-2',
    name: 'Аренда офиса',
    category: 'realestate',
    width: 1200,
    height: 630,
    thumbnail: 'https://picsum.photos/seed/realestate2/300/200',
    backgroundColor: '#ECF0F1',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1200, height: 630, fill: '#ECF0F1' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 80, top: 160, fontSize: 80, fill: '#2C3E50', text: 'АРЕНДА\nОФИСА', fontFamily: 'Oswald' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 80, top: 380, fontSize: 40, fill: '#7F8C8D', text: 'от 50 м² в центре города', fontFamily: 'Roboto' },
      },
    ],
  },
  {
    id: 'realestate-3',
    name: 'Новостройка',
    category: 'realestate',
    width: 1080,
    height: 1920,
    thumbnail: 'https://picsum.photos/seed/realestate3/300/500',
    backgroundColor: '#16213E',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1080, height: 1920, fill: '#16213E' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 80, top: 600, fontSize: 88, fill: '#FFFFFF', text: 'ЖК\n«ГОРИЗОНТ»', fontFamily: 'Playfair Display' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 80, top: 900, fontSize: 44, fill: '#4FC3F7', text: 'Квартиры от 4 млн ₽', fontFamily: 'Roboto' },
      },
    ],
  },

  // Events
  {
    id: 'events-1',
    name: 'Приглашение на мероприятие',
    category: 'events',
    width: 1080,
    height: 1080,
    thumbnail: 'https://picsum.photos/seed/events1/300/300',
    backgroundColor: '#6C3483',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1080, height: 1080, fill: '#6C3483' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 80, top: 250, fontSize: 100, fill: '#FFFFFF', text: 'ВЫ\nПРИГЛАШЕНЫ', fontFamily: 'Raleway' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 80, top: 550, fontSize: 48, fill: '#F8C471', text: '15 декабря 2024', fontFamily: 'Roboto' },
      },
      {
        id: 'el-4',
        type: 'text',
        properties: { left: 80, top: 650, fontSize: 36, fill: '#FFFFFF', text: 'Конференц-зал «Метрополь»', fontFamily: 'Roboto' },
      },
    ],
  },
  {
    id: 'events-2',
    name: 'Концерт / Вечеринка',
    category: 'events',
    width: 1080,
    height: 1920,
    thumbnail: 'https://picsum.photos/seed/events2/300/500',
    backgroundColor: '#0D0D0D',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1080, height: 1920, fill: '#0D0D0D' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 60, top: 500, fontSize: 130, fill: '#FF1744', text: 'PARTY\nNIGHT', fontFamily: 'Oswald' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 60, top: 900, fontSize: 52, fill: '#FFFFFF', text: '31 декабря • 22:00', fontFamily: 'Roboto' },
      },
    ],
  },
  {
    id: 'events-3',
    name: 'Вебинар',
    category: 'events',
    width: 1200,
    height: 630,
    thumbnail: 'https://picsum.photos/seed/events3/300/200',
    backgroundColor: '#1565C0',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1200, height: 630, fill: '#1565C0' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 80, top: 150, fontSize: 88, fill: '#FFFFFF', text: 'ВЕБИНАР', fontFamily: 'Montserrat' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 80, top: 310, fontSize: 44, fill: '#90CAF9', text: 'Маркетинг в 2024 году', fontFamily: 'Roboto' },
      },
      {
        id: 'el-4',
        type: 'text',
        properties: { left: 80, top: 420, fontSize: 36, fill: '#FFFFFF', text: 'Бесплатно • 20 ноября', fontFamily: 'Roboto' },
      },
    ],
  },

  // Promo
  {
    id: 'promo-1',
    name: 'Специальное предложение',
    category: 'promo',
    width: 1080,
    height: 1080,
    thumbnail: 'https://picsum.photos/seed/promo1/300/300',
    backgroundColor: '#00897B',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1080, height: 1080, fill: '#00897B' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 80, top: 280, fontSize: 90, fill: '#FFFFFF', text: 'СПЕЦ\nПРЕДЛОЖЕНИЕ', fontFamily: 'Montserrat' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 80, top: 580, fontSize: 48, fill: '#E0F2F1', text: 'Только для подписчиков', fontFamily: 'Roboto' },
      },
    ],
  },
  {
    id: 'promo-2',
    name: 'Промо в Stories',
    category: 'promo',
    width: 1080,
    height: 1920,
    thumbnail: 'https://picsum.photos/seed/promo2/300/500',
    backgroundColor: '#AD1457',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 1080, height: 1920, fill: '#AD1457' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 60, top: 550, fontSize: 110, fill: '#FFFFFF', text: 'УСПЕЙ\nКУПИТЬ', fontFamily: 'Raleway' },
      },
      {
        id: 'el-3',
        type: 'text',
        properties: { left: 60, top: 850, fontSize: 52, fill: '#FCE4EC', text: 'Осталось 3 дня!', fontFamily: 'Roboto' },
      },
      {
        id: 'el-4',
        type: 'text',
        properties: { left: 60, top: 960, fontSize: 44, fill: '#FFFFFF', text: 'Листай вверх ↑', fontFamily: 'Roboto' },
      },
    ],
  },
  {
    id: 'promo-3',
    name: 'Баннер распродажи',
    category: 'promo',
    width: 728,
    height: 90,
    thumbnail: 'https://picsum.photos/seed/promo3/300/80',
    backgroundColor: '#F57F17',
    elements: [
      {
        id: 'el-1',
        type: 'shape',
        properties: { left: 0, top: 0, width: 728, height: 90, fill: '#F57F17' },
      },
      {
        id: 'el-2',
        type: 'text',
        properties: { left: 20, top: 18, fontSize: 42, fill: '#FFFFFF', text: 'РАСПРОДАЖА — СКИДКИ ДО 80%', fontFamily: 'Oswald' },
      },
    ],
  },
];

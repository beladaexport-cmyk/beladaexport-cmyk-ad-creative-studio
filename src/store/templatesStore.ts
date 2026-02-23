import { create } from 'zustand';
import { TEMPLATES } from '../data/templates';
import type { Template } from '../types';

interface TemplatesState {
  templates: Template[];
  selectedCategory: string | null;
  searchQuery: string;
  filteredTemplates: Template[];
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
}

function filterTemplates(templates: Template[], category: string | null, query: string): Template[] {
  return templates.filter((t) => {
    const matchCategory = !category || t.category === category;
    const matchQuery = !query || t.name.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  });
}

export const useTemplatesStore = create<TemplatesState>((set, get) => ({
  templates: TEMPLATES,
  selectedCategory: null,
  searchQuery: '',
  filteredTemplates: TEMPLATES,

  setSelectedCategory: (selectedCategory) => {
    set({ selectedCategory });
    const { templates, searchQuery } = get();
    set({ filteredTemplates: filterTemplates(templates, selectedCategory, searchQuery) });
  },

  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
    const { templates, selectedCategory } = get();
    set({ filteredTemplates: filterTemplates(templates, selectedCategory, searchQuery) });
  },
}));

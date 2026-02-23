import { create } from 'zustand';
import type { Project } from '../types';
import { saveProjects, loadProjects as loadFromStorage, saveCurrentProject, loadCurrentProject } from '../utils/storage';

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loadProjects: () => void;
  saveProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (project: Project | null) => void;
  createNewProject: (name: string, width: number, height: number) => Project;
  duplicateProject: (id: string) => Project | null;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  currentProject: null,

  loadProjects: () => {
    const projects = loadFromStorage();
    const current = loadCurrentProject();
    set({ projects, currentProject: current });
  },

  saveProject: (project) => {
    const { projects } = get();
    const exists = projects.findIndex((p) => p.id === project.id);
    let updated: Project[];
    if (exists >= 0) {
      updated = [...projects];
      updated[exists] = project;
    } else {
      updated = [project, ...projects];
    }
    set({ projects: updated, currentProject: project });
    saveProjects(updated);
    saveCurrentProject(project);
  },

  deleteProject: (id) => {
    const { projects, currentProject } = get();
    const updated = projects.filter((p) => p.id !== id);
    set({ projects: updated });
    saveProjects(updated);
    if (currentProject?.id === id) {
      set({ currentProject: null });
    }
  },

  setCurrentProject: (currentProject) => {
    set({ currentProject });
    if (currentProject) {
      saveCurrentProject(currentProject);
    }
  },

  createNewProject: (name, width, height) => {
    const project: Project = {
      id: `project-${Date.now()}`,
      name,
      width,
      height,
      elements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const { projects } = get();
    const updated = [project, ...projects];
    set({ projects: updated, currentProject: project });
    saveProjects(updated);
    saveCurrentProject(project);
    return project;
  },

  duplicateProject: (id) => {
    const { projects } = get();
    const source = projects.find((p) => p.id === id);
    if (!source) return null;
    const copy: Project = {
      ...source,
      id: `project-${Date.now()}`,
      name: `${source.name} (копия)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [copy, ...projects];
    set({ projects: updated });
    saveProjects(updated);
    return copy;
  },
}));

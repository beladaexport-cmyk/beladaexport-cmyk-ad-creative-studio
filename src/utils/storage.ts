import type { Project } from '../types';

const PROJECTS_KEY = 'ad-creative-projects';
const CURRENT_PROJECT_KEY = 'ad-creative-current-project';

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  } catch {
    // storage quota exceeded or unavailable
  }
}

export function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

export function saveCurrentProject(project: Project): void {
  try {
    localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify(project));
  } catch {
    // storage unavailable
  }
}

export function loadCurrentProject(): Project | null {
  try {
    const raw = localStorage.getItem(CURRENT_PROJECT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Project;
  } catch {
    return null;
  }
}

export function clearCurrentProject(): void {
  localStorage.removeItem(CURRENT_PROJECT_KEY);
}

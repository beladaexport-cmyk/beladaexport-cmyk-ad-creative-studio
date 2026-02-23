import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import type { Project } from '../types';
import { saveCurrentProject } from '../utils/storage';

interface UseAutoSaveReturn {
  lastSaved: Date | null;
  isSaving: boolean;
}

export function useAutoSave(
  canvas: fabric.Canvas | null,
  project: Project | null
): UseAutoSaveReturn {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!canvas || !project) return;

    timerRef.current = setInterval(() => {
      setIsSaving(true);
      try {
        const updated: Project = {
          ...project,
          updatedAt: new Date().toISOString(),
        };
        saveCurrentProject(updated);
        setLastSaved(new Date());
      } finally {
        setIsSaving(false);
      }
    }, 30_000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [canvas, project]);

  return { lastSaved, isSaving };
}

import { ThemeMode } from './courseTypes';

const COMPLETED_ITEMS_STORAGE_KEY = 'uade-daa:completed-items';
const THEME_MODE_STORAGE_KEY = 'uade-daa:theme-mode';

function readStorageValue(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorageValue(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    return;
  }
}

export function loadCompletedItemIds(): string[] {
  const storedValue = readStorageValue(COMPLETED_ITEMS_STORAGE_KEY);
  if (!storedValue) {
    return [];
  }
  try {
    const parsedValue: unknown = JSON.parse(storedValue);
    return Array.isArray(parsedValue)
      ? parsedValue.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

export function saveCompletedItemIds(completedItemIds: string[]): void {
  writeStorageValue(COMPLETED_ITEMS_STORAGE_KEY, JSON.stringify(completedItemIds));
}

export function loadThemeMode(): ThemeMode {
  return readStorageValue(THEME_MODE_STORAGE_KEY) === 'emerald-night' ? 'emerald-night' : 'emerald-light';
}

export function saveThemeMode(themeMode: ThemeMode): void {
  writeStorageValue(THEME_MODE_STORAGE_KEY, themeMode);
}

const EXERCISE_DRAFT_STORAGE_PREFIX = 'uade-daa:exercise-draft:';

export interface ExerciseUserDraft {
  pseudocode: string;
  code: string;
}

export function loadExerciseUserDraft(exerciseId: string): ExerciseUserDraft {
  const storedValue = readStorageValue(`${EXERCISE_DRAFT_STORAGE_PREFIX}${exerciseId}`);
  if (!storedValue) {
    return { pseudocode: '', code: '' };
  }
  try {
    const parsedValue = JSON.parse(storedValue) as Partial<ExerciseUserDraft>;
    return {
      pseudocode: typeof parsedValue.pseudocode === 'string' ? parsedValue.pseudocode : '',
      code: typeof parsedValue.code === 'string' ? parsedValue.code : '',
    };
  } catch {
    return { pseudocode: '', code: '' };
  }
}

export function saveExerciseUserDraft(exerciseId: string, draft: ExerciseUserDraft): void {
  writeStorageValue(`${EXERCISE_DRAFT_STORAGE_PREFIX}${exerciseId}`, JSON.stringify(draft));
}

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'uade-daa:sidebar-collapsed';

export function loadSidebarCollapsedPreference(): boolean {
  return readStorageValue(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true';
}

export function saveSidebarCollapsedPreference(isCollapsed: boolean): void {
  writeStorageValue(SIDEBAR_COLLAPSED_STORAGE_KEY, String(isCollapsed));
}

export type WhiteboardTool = 'pencil' | 'rectangle' | 'circle' | 'arrow' | 'line' | 'eraser';

export interface WhiteboardPoint {
  x: number;
  y: number;
}

export interface WhiteboardElement {
  id: string;
  tool: WhiteboardTool;
  color: string;
  strokeWidth: number;
  points?: WhiteboardPoint[];
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
}

const WHITEBOARD_STORAGE_PREFIX = 'uade-daa:whiteboard:';

export function loadExerciseWhiteboard(exerciseId: string): WhiteboardElement[] {
  const storedValue = readStorageValue(`${WHITEBOARD_STORAGE_PREFIX}${exerciseId}`);
  if (!storedValue) {
    return [];
  }
  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

export function saveExerciseWhiteboard(exerciseId: string, elements: WhiteboardElement[]): void {
  writeStorageValue(`${WHITEBOARD_STORAGE_PREFIX}${exerciseId}`, JSON.stringify(elements));
}

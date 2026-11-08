import { MODULE_NAVIGATION_LIST, STUDY_MODULES_BY_ID } from '../data/courseModulesData';
import { EXAM_EXERCISES_LIST } from '../data/examExercisesData';
import { ModuleId } from './courseTypes';

export interface SearchableStudyEntry {
  anchorId: string;
  title: string;
  moduleId: ModuleId;
  moduleLabel: string;
  kindLabel: string;
  searchableText: string;
}

const MAX_SEARCH_RESULTS = 8;

function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function findModuleLabel(moduleId: ModuleId): string {
  return MODULE_NAVIGATION_LIST.find((moduleItem) => moduleItem.id === moduleId)?.sidebarTitle ?? '';
}

function buildStudyModuleEntries(): SearchableStudyEntry[] {
  return Object.values(STUDY_MODULES_BY_ID).flatMap((moduleData) => {
    const moduleId = moduleData.metadata.id;
    const moduleLabel = findModuleLabel(moduleId);
    const conceptEntries = moduleData.concepts.map((concept) => ({
      anchorId: concept.id,
      title: concept.title,
      moduleId,
      moduleLabel,
      kindLabel: 'Concepto',
      searchableText: normalizeForSearch(`${concept.title} ${concept.badgeText} ${concept.summary}`),
    }));
    const algorithmEntries = moduleData.algorithms.map((algorithm) => ({
      anchorId: algorithm.id,
      title: algorithm.name,
      moduleId,
      moduleLabel,
      kindLabel: 'Algoritmo',
      searchableText: normalizeForSearch(`${algorithm.name} ${algorithm.paradigmTag} ${algorithm.keyInsight}`),
    }));
    return [...conceptEntries, ...algorithmEntries];
  });
}

function buildExamExerciseEntries(): SearchableStudyEntry[] {
  const moduleId: ModuleId = 'module-6-exam-exercises';
  const moduleLabel = findModuleLabel(moduleId);
  return EXAM_EXERCISES_LIST.map((exercise) => ({
    anchorId: exercise.id,
    title: exercise.title,
    moduleId,
    moduleLabel,
    kindLabel: 'Ejercicio de Parcial',
    searchableText: normalizeForSearch(`${exercise.title} ${exercise.paradigm} ${exercise.problemStatement}`),
  }));
}

const STUDY_SEARCH_INDEX: SearchableStudyEntry[] = [
  ...buildStudyModuleEntries(),
  ...buildExamExerciseEntries(),
];

export function searchStudyEntries(query: string): SearchableStudyEntry[] {
  const normalizedQuery = normalizeForSearch(query.trim());
  if (!normalizedQuery) {
    return [];
  }
  const titleMatches = STUDY_SEARCH_INDEX.filter((entry) =>
    normalizeForSearch(entry.title).includes(normalizedQuery),
  );
  const bodyMatches = STUDY_SEARCH_INDEX.filter(
    (entry) => !titleMatches.includes(entry) && entry.searchableText.includes(normalizedQuery),
  );
  return [...titleMatches, ...bodyMatches].slice(0, MAX_SEARCH_RESULTS);
}

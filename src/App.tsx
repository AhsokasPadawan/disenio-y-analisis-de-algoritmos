import { ExamExerciseItem, ExamParadigmCategory } from './core/domain/coreTypes';
import { StudyPlatformShell } from './core/ui/StudyPlatformShell';
import { PracticeFilterOption } from './core/ui/practice/PracticeFilterBar';
import { COURSE_BLOCK_REGISTRY } from './course/components/courseBlockRegistry';
import { ExerciseVisualResource } from './course/components/ExerciseVisualResource';
import {
  COURSE_SEARCH_INDEX,
  COURSE_SLIDE_DECK,
  MODULE_NAVIGATION_LIST,
  STUDY_MODULES_BY_ID,
} from './course/data/courseModulesData';
import { EXAM_EXERCISES_LIST } from './course/data/examExercisesData';
import {
  MODULE_SUBTOPICS_LOOKUP,
  resolveActiveSubtopicId,
} from './course/data/moduleSubtopicsData';
import { tokenizeCode } from './course/domain/codeSyntaxHighlighter';

const TRACKABLE_STUDY_ITEM_IDS: readonly string[] = [
  ...MODULE_NAVIGATION_LIST.map((moduleItem) => moduleItem.id).filter(
    (moduleId) => moduleId in STUDY_MODULES_BY_ID,
  ),
  ...EXAM_EXERCISES_LIST.map((exercise) => exercise.id),
];

const COURSE_PARADIGM_FILTERS: readonly PracticeFilterOption[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Complejidad', value: 'Complejidad' },
  { label: 'Divide & Conquer', value: 'Divide & Conquer' },
  { label: 'Greedy', value: 'Greedy' },
  { label: 'Programación Dinámica', value: 'Programación Dinámica' },
  { label: 'Backtracking / B&B', value: 'Backtracking / B&B' },
];

const PARADIGM_EQUIVALENTS_LOOKUP: Record<string, readonly string[]> = {
  'Divide & Conquer': ['Divide & Conquer', 'Reducción y Conquista'],
  'Programación Dinámica': ['Programación Dinámica', 'Reconstrucción de Decisiones'],
};

function matchesCoursePracticeCategory(
  exercise: ExamExerciseItem,
  selectedCategory: ExamParadigmCategory,
): boolean {
  if (selectedCategory === 'all') return true;
  const acceptedParadigms = PARADIGM_EQUIVALENTS_LOOKUP[selectedCategory] ?? [selectedCategory];
  return acceptedParadigms.includes(exercise.paradigm);
}

export function App() {
  return (
    <StudyPlatformShell
      courseTitle="Diseño y Análisis de Algoritmos"
      courseDepartment="Grado · Ingeniería"
      modules={MODULE_NAVIGATION_LIST}
      subtopicsByModuleId={MODULE_SUBTOPICS_LOOKUP}
      slides={COURSE_SLIDE_DECK}
      exercises={EXAM_EXERCISES_LIST}
      searchIndex={COURSE_SEARCH_INDEX}
      trackableItemIds={TRACKABLE_STUDY_ITEM_IDS}
      practiceModuleId="module-6-exam-exercises"
      practiceHeadingTitle="Banco de Ejercicios de Parcial y Patrones de Examen"
      paradigmFilters={COURSE_PARADIGM_FILTERS}
      courseBlockRegistry={COURSE_BLOCK_REGISTRY}
      resolveActiveSubtopicId={resolveActiveSubtopicId}
      matchesPracticeCategory={matchesCoursePracticeCategory}
      renderExerciseVisualResource={(resource, exerciseId) => (
        <ExerciseVisualResource resource={resource} exerciseId={exerciseId} />
      )}
      tokenizeCode={tokenizeCode}
    />
  );
}

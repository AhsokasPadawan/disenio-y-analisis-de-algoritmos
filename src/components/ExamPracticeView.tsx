import { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Filter,
  Search,
} from 'lucide-react';
import { EXAM_EXERCISES_LIST } from '../data/examExercisesData';
import { ExamParadigmCategory } from '../domain/courseTypes';
import { SECTION_THEMES } from '../domain/sectionThemes';
import { ExerciseWorkspace } from './ExerciseWorkspace';
import { ExerciseVisualResource } from './ExerciseVisualResource';
import { MathFormula } from './MathFormula';

interface ExamPracticeViewProps {
  completedItemIds: string[];
  selectedExerciseId: string;
  selectedParadigmFilter?: ExamParadigmCategory;
  onSelectExercise: (exerciseId: string) => void;
  onSelectParadigmFilter?: (paradigm: ExamParadigmCategory) => void;
  onToggleCompletedItem: (itemId: string) => void;
}

const PARADIGM_FILTERS: { label: string; value: ExamParadigmCategory }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Complejidad', value: 'Complejidad' },
  { label: 'Divide & Conquer', value: 'Divide & Conquer' },
  { label: 'Greedy', value: 'Greedy' },
  { label: 'Programación Dinámica', value: 'Programación Dinámica' },
  { label: 'Backtracking / B&B', value: 'Backtracking / B&B' },
];

const ORIGIN_FILTERS: { label: string; value: 'all' | 'Parcial' | 'Guía Progra III' | 'Diapositivas' }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Parcial', value: 'Parcial' },
  { label: 'Guía Progra III', value: 'Guía Progra III' },
  { label: 'Diapositivas', value: 'Diapositivas' },
];

export function ExamPracticeView({
  completedItemIds,
  selectedExerciseId,
  selectedParadigmFilter,
  onSelectExercise,
  onSelectParadigmFilter,
  onToggleCompletedItem,
}: ExamPracticeViewProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [internalParadigm, setInternalParadigm] = useState<ExamParadigmCategory>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<'all' | 'Parcial' | 'Guía Progra III' | 'Diapositivas'>('all');
  const [isSolutionAccordionOpen, setIsSolutionAccordionOpen] = useState<boolean>(false);

  const selectedParadigm = selectedParadigmFilter ?? internalParadigm;
  const practiceTheme = SECTION_THEMES['module-6-exam-exercises'];

  const filteredExercises = EXAM_EXERCISES_LIST.filter((exercise) => {
    const matchesQuery =
      searchQuery.trim() === '' ||
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.paradigm.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesParadigm =
      selectedParadigm === 'all' ||
      exercise.paradigm === selectedParadigm ||
      (selectedParadigm === 'Divide & Conquer' && exercise.paradigm === 'Reducción y Conquista') ||
      (selectedParadigm === 'Programación Dinámica' && exercise.paradigm === 'Reconstrucción de Decisiones');

    const matchesOrigin =
      selectedOrigin === 'all' || exercise.sourceOrigin === selectedOrigin;

    return matchesQuery && matchesParadigm && matchesOrigin;
  });

  const effectiveList = filteredExercises.length > 0 ? filteredExercises : EXAM_EXERCISES_LIST;

  const currentIndex = effectiveList.findIndex(
    (exercise) => exercise.id === selectedExerciseId,
  );
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;
  const currentExercise = effectiveList[activeIndex] ?? EXAM_EXERCISES_LIST[0];
  const isCompleted = completedItemIds.includes(currentExercise.id);

  const handleSelectPrevious = () => {
    if (activeIndex > 0) {
      onSelectExercise(effectiveList[activeIndex - 1].id);
    }
  };

  const handleSelectNext = () => {
    if (activeIndex < effectiveList.length - 1) {
      onSelectExercise(effectiveList[activeIndex + 1].id);
    }
  };

  const handleParadigmChange = (paradigm: ExamParadigmCategory) => {
    setInternalParadigm(paradigm);
    onSelectParadigmFilter?.(paradigm);
    const subset = EXAM_EXERCISES_LIST.filter((item) =>
      paradigm === 'all'
        ? true
        : item.paradigm === paradigm ||
          (paradigm === 'Divide & Conquer' && item.paradigm === 'Reducción y Conquista') ||
          (paradigm === 'Programación Dinámica' && item.paradigm === 'Reconstrucción de Decisiones'),
    );
    if (subset.length > 0 && !subset.some((item) => item.id === selectedExerciseId)) {
      onSelectExercise(subset[0].id);
    }
  };

  const handleOriginChange = (origin: 'all' | 'Parcial' | 'Guía Progra III' | 'Diapositivas') => {
    setSelectedOrigin(origin);
    const subset = EXAM_EXERCISES_LIST.filter((item) =>
      origin === 'all' ? true : item.sourceOrigin === origin,
    );
    if (subset.length > 0 && !subset.some((item) => item.id === selectedExerciseId)) {
      onSelectExercise(subset[0].id);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col gap-3 overflow-hidden">
      <div className={`flex shrink-0 flex-col gap-2 rounded-2xl border bg-white/95 p-3 shadow-sm dark:bg-zinc-900 ${practiceTheme.cardBorderClass}`}>
        <h1 className="sr-only">Banco de Ejercicios de Parcial y Patrones de Examen</h1>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-md px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${practiceTheme.slideBadgeClass}`}>
              Ejercicio #{currentExercise.number}
            </span>
            <label
              htmlFor="exam-exercise-selector"
              className={`text-xs font-bold uppercase ${practiceTheme.slideHeaderClass}`}
            >
              Seleccionar:
            </label>
            <select
              id="exam-exercise-selector"
              aria-label="Seleccionar ejercicio de práctica"
              value={currentExercise.id}
              onChange={(event) => onSelectExercise(event.target.value)}
              className={`max-w-md truncate rounded-xl border px-3 py-1.5 text-xs font-bold outline-none transition sm:text-sm ${practiceTheme.counterBoxClass}`}
            >
              {effectiveList.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  #{exercise.number} · {exercise.title} ({exercise.paradigm})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSelectPrevious}
              disabled={activeIndex === 0}
              aria-label="Ejercicio anterior"
              title="Ejercicio anterior"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition disabled:opacity-40 ${practiceTheme.secondaryButtonClass}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className={`rounded-lg border px-2.5 py-1 text-xs font-black font-mono ${practiceTheme.counterBoxClass}`}>
              Ejercicio #{currentExercise.number}
            </div>

            <button
              type="button"
              onClick={handleSelectNext}
              disabled={activeIndex === effectiveList.length - 1}
              aria-label="Ejercicio siguiente"
              title="Ejercicio siguiente"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition disabled:opacity-40 ${practiceTheme.secondaryButtonClass}`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className={`flex flex-wrap items-center justify-between gap-2 border-t pt-2 ${practiceTheme.cardBorderClass}`}>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className={`font-bold mr-1 flex items-center gap-1 ${practiceTheme.slideHeaderClass}`}>
              <Filter className="h-3 w-3" /> Técnica:
            </span>
            {PARADIGM_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => handleParadigmChange(f.value)}
                className={`rounded-lg px-2 py-0.5 font-semibold transition ${
                  selectedParadigm === f.value
                    ? `${practiceTheme.primaryButtonClass} shadow-xs font-bold`
                    : `${practiceTheme.secondaryButtonClass} border`
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar consigna..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className={`h-7.5 w-44 rounded-lg border pl-8 pr-2 text-xs text-zinc-900 outline-none transition focus:w-56 dark:text-zinc-100 ${practiceTheme.accentSurfaceClass}`}
              />
            </div>

            <div className="flex items-center gap-1 text-[11px]">
              {ORIGIN_FILTERS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => handleOriginChange(o.value)}
                  className={`rounded-lg px-2 py-0.5 font-semibold transition ${
                    selectedOrigin === o.value
                      ? `${practiceTheme.primaryButtonClass} font-bold`
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-hidden lg:flex-row">
        <div className={`flex flex-col justify-between overflow-y-auto rounded-2xl border bg-white/95 p-4 shadow-sm lg:w-[32%] shrink-0 dark:bg-zinc-900 ${practiceTheme.cardBorderClass}`}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`inline-flex h-5.5 px-1.5 items-center justify-center rounded-lg text-xs font-extrabold ${practiceTheme.stepBadgeClass}`}>
                  #{currentExercise.number}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${practiceTheme.slideBadgeClass}`}>
                  {currentExercise.paradigm}
                </span>
                <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${practiceTheme.counterBoxClass}`}>
                  {currentExercise.difficultyLabel}
                </span>
              </div>

              <h2 className={`text-base font-extrabold sm:text-lg ${practiceTheme.titleTextClass}`}>
                {currentExercise.title}
              </h2>

              <div className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${practiceTheme.formulaCardClass}`}>
                Objetivo: <MathFormula expression={currentExercise.targetComplexityLatex} />
              </div>
            </div>

            <div className={`border-t pt-2.5 ${practiceTheme.cardBorderClass}`}>
              <h3 className={`text-xs font-bold uppercase ${practiceTheme.slideHeaderClass}`}>
                Consigna Formal
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-700 sm:text-sm dark:text-zinc-300 whitespace-pre-line">
                {currentExercise.problemStatement}
              </p>
              <ExerciseVisualResource
                resource={currentExercise.recursoVisual}
                exerciseId={currentExercise.id}
              />
            </div>

            <div className={`rounded-xl border p-2.5 text-xs font-semibold ${practiceTheme.accentSurfaceClass} ${practiceTheme.strongTextClass}`}>
              <span className={`font-bold ${practiceTheme.slideHeaderClass}`}>Ejemplo: </span>
              {currentExercise.inputOutputExample}
            </div>

            <div className={`rounded-xl border ${practiceTheme.formulaContainerClass}`}>
              <button
                type="button"
                onClick={() => setIsSolutionAccordionOpen(!isSolutionAccordionOpen)}
                className={`flex w-full items-center justify-between p-2.5 text-xs font-bold ${practiceTheme.strongTextClass}`}
              >
                <span>Clave Algorítmica y Recurrencia</span>
                {isSolutionAccordionOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {isSolutionAccordionOpen && currentExercise.conceptualStrategy && (
                <div className={`space-y-2 border-t p-2.5 text-xs text-zinc-700 dark:text-zinc-300 ${practiceTheme.cardBorderClass}`}>
                  <div>
                    <span className={`font-bold ${practiceTheme.slideHeaderClass}`}>
                      Invariante / Estrategia:
                    </span>
                    <p className="mt-0.5 leading-relaxed">
                      {currentExercise.conceptualStrategy.invariantAndIntuition}
                    </p>
                  </div>
                  {currentExercise.conceptualStrategy.recurrenceOrTransitionLatex && (
                    <div className={`rounded-lg border p-2 text-center font-mono ${practiceTheme.formulaCardClass}`}>
                      <MathFormula
                        expression={currentExercise.conceptualStrategy.recurrenceOrTransitionLatex}
                      />
                    </div>
                  )}
                  {currentExercise.complexityAnalysis && (
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span>Cota Temporal: </span>
                      <strong className={practiceTheme.slideHeaderClass}>
                        {currentExercise.complexityAnalysis.temporalLatex}
                      </strong>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={`pt-3 mt-3 border-t ${practiceTheme.cardBorderClass}`}>
            <button
              type="button"
              onClick={() => onToggleCompletedItem(currentExercise.id)}
              aria-label={isCompleted ? 'Ejercicio practicado' : `Marcar ejercicio ${currentExercise.title} como practicado`}
              className={`flex w-full items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                isCompleted
                  ? practiceTheme.primaryButtonClass
                  : practiceTheme.secondaryButtonClass
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isCompleted ? 'Ejercicio Practicado' : 'Marcar como practicado'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
          <ExerciseWorkspace
            key={currentExercise.id}
            exerciseId={currentExercise.id}
            exerciseTitle={currentExercise.title}
          />
        </div>
      </div>
    </div>
  );
}

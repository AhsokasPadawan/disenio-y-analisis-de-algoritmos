import { useState } from 'react';
import { CheckCircle2, Filter } from 'lucide-react';
import { MODULE_NAVIGATION_LIST } from '../data/courseModulesData';
import { EXAM_EXERCISES_LIST } from '../data/examExercisesData';
import { ExamExerciseItem, ExamParadigmCategory } from '../domain/courseTypes';
import { ExerciseWorkspace } from './ExerciseWorkspace';
import { ExerciseVisualResource } from './ExerciseVisualResource';
import { MathFormula } from './MathFormula';

interface ExamExerciseCardProps {
  exercise: ExamExerciseItem;
  isCompleted: boolean;
  onToggleCompleted: (exerciseId: string) => void;
}

const PARADIGM_FILTER_OPTIONS: { id: ExamParadigmCategory; label: string }[] = [
  { id: 'all', label: `Todos los Patrones (${EXAM_EXERCISES_LIST.length})` },
  { id: 'Divide & Conquer', label: 'Filtrar: Divide & Conquer' },
  { id: 'Greedy', label: 'Filtrar: Greedy' },
  { id: 'Programación Dinámica', label: 'Filtrar: Programación Dinámica' },
  { id: 'Backtracking / B&B', label: 'Filtrar: Backtracking / B&B' },
];

function ExamExerciseCard({
  exercise,
  isCompleted,
  onToggleCompleted,
}: ExamExerciseCardProps) {
  return (
    <article
      id={exercise.id}
      className="scroll-mt-24 rounded-2xl border border-emerald-800/20 bg-white/95 p-6 text-zinc-900 shadow-sm transition dark:border-emerald-800/40 dark:bg-zinc-900 dark:text-zinc-100"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-950 text-xs font-extrabold text-emerald-400">
              #{exercise.number}
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-300">
              {exercise.paradigm}
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-950 dark:bg-zinc-800 dark:text-emerald-300">
              {exercise.difficultyLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950 px-3 py-0.5 text-xs font-semibold text-emerald-300">
              Objetivo: <MathFormula expression={exercise.targetComplexityLatex} />
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-emerald-950 dark:text-emerald-300">
            {exercise.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onToggleCompleted(exercise.id)}
          aria-label={`Marcar ejercicio ${exercise.title} como practicado`}
          className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
            isCompleted
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-emerald-800/30 bg-emerald-50 text-emerald-950 hover:bg-emerald-100 dark:border-emerald-700/50 dark:bg-zinc-800 dark:text-emerald-300 dark:hover:bg-zinc-700'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{isCompleted ? 'Practicado' : 'Marcar practicado'}</span>
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="space-y-3 lg:w-[30%] shrink-0">
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
            {exercise.problemStatement}
          </p>

          <ExerciseVisualResource
            resource={exercise.recursoVisual}
            exerciseId={exercise.id}
          />

          <div className="rounded-xl border border-emerald-800/20 bg-emerald-50/80 px-4 py-2.5 text-xs font-semibold text-emerald-950 dark:border-emerald-800/30 dark:bg-zinc-950 dark:text-emerald-200">
            {exercise.inputOutputExample}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <ExerciseWorkspace exerciseId={exercise.id} exerciseTitle={exercise.title} />
        </div>
      </div>
    </article>
  );
}

interface ExamExercisesBankViewProps {
  completedItemIds: string[];
  onToggleCompletedItem: (itemId: string) => void;
  searchQuery?: string;
}

export function ExamExercisesBankView({
  completedItemIds,
  onToggleCompletedItem,
  searchQuery = '',
}: ExamExercisesBankViewProps) {
  const [selectedParadigm, setSelectedParadigm] = useState<ExamParadigmCategory>('all');
  const metadata = MODULE_NAVIGATION_LIST[5];
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredExercises = EXAM_EXERCISES_LIST.filter((exercise) => {
    const matchesParadigm =
      selectedParadigm === 'all' || exercise.paradigm === selectedParadigm;
    const matchesQuery =
      !normalizedQuery ||
      exercise.title.toLowerCase().includes(normalizedQuery) ||
      exercise.problemStatement.toLowerCase().includes(normalizedQuery) ||
      exercise.paradigm.toLowerCase().includes(normalizedQuery);
    return matchesParadigm && matchesQuery;
  });

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-emerald-800/20 bg-white/95 p-6 text-zinc-900 shadow-sm dark:border-emerald-800/40 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-400">
            {metadata.contractTag}
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-300">
            Práctica Activa: Consignas y Espacio de Código
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-emerald-950 sm:text-3xl dark:text-emerald-300">
          {metadata.headerTitle}
        </h1>
        <p className="mt-2 text-sm text-zinc-700 sm:text-base dark:text-zinc-300">
          {metadata.subtitle}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 uppercase dark:text-emerald-400">
            <Filter className="h-3.5 w-3.5" />
            Paradigma:
          </span>
          {PARADIGM_FILTER_OPTIONS.map((filterOption) => {
            const isSelected = filterOption.id === selectedParadigm;
            return (
              <button
                key={filterOption.id}
                type="button"
                onClick={() => setSelectedParadigm(filterOption.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  isSelected
                    ? 'bg-emerald-950 text-emerald-400 shadow-xs dark:bg-emerald-800 dark:text-white'
                    : 'bg-emerald-100 text-emerald-950 hover:bg-emerald-200 dark:bg-zinc-800 dark:text-emerald-200 dark:hover:bg-zinc-700'
                }`}
              >
                {filterOption.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="space-y-6">
        {filteredExercises.map((exercise) => (
          <ExamExerciseCard
            key={exercise.id}
            exercise={exercise}
            isCompleted={completedItemIds.includes(exercise.id)}
            onToggleCompleted={onToggleCompletedItem}
          />
        ))}
      </div>
    </div>
  );
}

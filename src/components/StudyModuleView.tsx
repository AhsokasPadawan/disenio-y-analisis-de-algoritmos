import { CheckCircle2 } from 'lucide-react';
import { ConceptCardItem, ModuleStudyData } from '../domain/courseTypes';
import { MathFormula } from './MathFormula';
import { ModuleVisualizersSection } from './ModuleVisualizersSection';

interface StudyModuleViewProps {
  moduleData: ModuleStudyData;
  isModuleCompleted: boolean;
  onToggleModuleCompleted: (moduleId: string) => void;
}

const SURFACE_CARD_CLASSES =
  'rounded-2xl border border-emerald-800/15 bg-white/95 shadow-sm dark:border-emerald-800/40 dark:bg-zinc-900';

function ConceptCard({ concept }: { concept: ConceptCardItem }) {
  return (
    <article id={concept.id} className={`${SURFACE_CARD_CLASSES} scroll-mt-24 p-6`}>
      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-900/40 dark:text-amber-300">
        {concept.badgeText}
      </span>
      <h2 className="mt-2 text-lg font-bold text-emerald-950 dark:text-emerald-300">{concept.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{concept.summary}</p>
      <ul className="mt-3 space-y-1.5">
        {concept.bulletPoints.map((bulletText) => (
          <li key={bulletText} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
            <span>{bulletText}</span>
          </li>
        ))}
      </ul>
      {concept.formulas?.map((formula) => (
        <div
          key={formula.label}
          className="mt-4 rounded-xl bg-emerald-50 p-3 text-emerald-950 dark:bg-zinc-950 dark:text-emerald-100"
        >
          <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-400">{formula.label}</div>
          <MathFormula expression={formula.latex} displayMode />
          <p className="text-xs text-zinc-600 dark:text-zinc-400">{formula.description}</p>
        </div>
      ))}
    </article>
  );
}

export function StudyModuleView({ moduleData, isModuleCompleted, onToggleModuleCompleted }: StudyModuleViewProps) {
  const { metadata } = moduleData;
  return (
    <div className="space-y-8">
      <header className={`${SURFACE_CARD_CLASSES} p-6`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-400">
            {metadata.contractTag}
          </span>
          <button
            type="button"
            onClick={() => onToggleModuleCompleted(metadata.id)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
              isModuleCompleted
                ? 'border-emerald-600 bg-emerald-600 text-white'
                : 'border-emerald-800/30 bg-emerald-50 text-emerald-950 hover:bg-emerald-100 dark:border-emerald-700/50 dark:bg-zinc-800 dark:text-emerald-300 dark:hover:bg-zinc-700'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{isModuleCompleted ? 'Módulo repasado' : 'Marcar módulo como repasado'}</span>
          </button>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-emerald-950 sm:text-3xl dark:text-emerald-300">
          {metadata.headerTitle}
        </h1>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">{metadata.subtitle}</p>
        <p className="mt-4 rounded-xl border-l-4 border-emerald-600 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-950 dark:bg-zinc-950 dark:text-emerald-100">
          {metadata.keyTakeaway}
        </p>
      </header>

      <ModuleVisualizersSection moduleId={metadata.id} />

      <section className="grid gap-6 lg:grid-cols-2">
        {moduleData.concepts.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </section>
    </div>
  );
}

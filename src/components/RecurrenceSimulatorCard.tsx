import { useState } from 'react';
import { Calculator, Sparkles } from 'lucide-react';
import {
  evaluateRecurrence,
  RecurrenceInput,
  RecurrenceKind,
} from '../domain/recurrenceEvaluator';
import { useSectionTheme } from '../domain/sectionThemes';
import { MathFormula } from './MathFormula';

interface RecurrencePreset {
  id: string;
  label: string;
  input: RecurrenceInput;
}

const RECURRENCE_PRESETS: RecurrencePreset[] = [
  {
    id: 'mergesort-division',
    label: 'MergeSort (División)',
    input: { kind: 'division', subproblemCountA: 2, factorB: 2, polynomialDegreeK: 1 },
  },
  {
    id: 'binary-search-division',
    label: 'Búsqueda Binaria (División)',
    input: { kind: 'division', subproblemCountA: 1, factorB: 2, polynomialDegreeK: 0 },
  },
  {
    id: 'karatsuba-division',
    label: 'Karatsuba (División)',
    input: { kind: 'division', subproblemCountA: 3, factorB: 2, polynomialDegreeK: 1 },
  },
  {
    id: 'pseudo-m-division',
    label: 'Elemento Mayoritario (División)',
    input: { kind: 'division', subproblemCountA: 1, factorB: 2, polynomialDegreeK: 1 },
  },
  {
    id: 'factorial-subtraction',
    label: 'QuickSort Peor Caso (Sustracción)',
    input: { kind: 'subtraction', subproblemCountA: 1, factorB: 1, polynomialDegreeK: 1 },
  },
  {
    id: 'hanoi-subtraction',
    label: 'Torres de Hanoi (Sustracción)',
    input: { kind: 'subtraction', subproblemCountA: 2, factorB: 1, polynomialDegreeK: 0 },
  },
];

export function RecurrenceSimulatorCard() {
  const sectionTheme = useSectionTheme();
  const [recurrenceInput, setRecurrenceInput] = useState<RecurrenceInput>(
    RECURRENCE_PRESETS[0].input,
  );

  const evaluation = evaluateRecurrence(recurrenceInput);

  const handleKindChange = (newKind: RecurrenceKind) => {
    setRecurrenceInput((previous) => ({
      ...previous,
      kind: newKind,
      factorB: newKind === 'division' ? Math.max(2, previous.factorB) : Math.max(1, previous.factorB),
      subproblemCountA: Math.max(1, Math.round(previous.subproblemCountA)),
    }));
  };

  return (
    <section className={`rounded-2xl border p-6 transition ${sectionTheme.analysisPanelClass}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${sectionTheme.stepBadgeClass}`}>
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${sectionTheme.slideBadgeClass}`}>
              <Sparkles className="h-3 w-3" />
              Simulador Interactivo
            </span>
            <h2 className={`mt-1 text-xl font-extrabold ${sectionTheme.titleTextClass}`}>
              Simulador en Vivo: Teorema de Recurrencias
            </h2>
          </div>
        </div>

        <div className={`inline-flex rounded-xl border p-1 ${sectionTheme.analysisSubcardClass}`}>
          <button
            type="button"
            onClick={() => handleKindChange('division')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              recurrenceInput.kind === 'division'
                ? sectionTheme.primaryButtonClass
                : `${sectionTheme.slideHeaderClass} hover:opacity-80`
            }`}
          >
            División T(n / b)
          </button>
          <button
            type="button"
            onClick={() => handleKindChange('subtraction')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              recurrenceInput.kind === 'subtraction'
                ? sectionTheme.primaryButtonClass
                : `${sectionTheme.slideHeaderClass} hover:opacity-80`
            }`}
          >
            Sustracción T(n - b)
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {RECURRENCE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => setRecurrenceInput(preset.input)}
            className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${sectionTheme.secondaryButtonClass}`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className={`block rounded-xl border p-3.5 ${sectionTheme.accentSurfaceClass} ${sectionTheme.titleTextClass}`}>
          <span className="block text-xs font-bold uppercase">
            Llamadas recursivas (a)
          </span>
          <input
            type="number"
            min={recurrenceInput.kind === 'division' ? 1 : 0.5}
            step={recurrenceInput.kind === 'division' ? 1 : 0.5}
            max={16}
            value={recurrenceInput.subproblemCountA}
            onChange={(event) =>
              setRecurrenceInput((previous) => ({
                ...previous,
                subproblemCountA: Number(event.target.value) || 1,
              }))
            }
            className={`mt-2 w-full rounded-lg border bg-white px-3 py-1.5 text-sm font-bold dark:bg-zinc-900 ${sectionTheme.cardBorderClass} ${sectionTheme.titleTextClass}`}
          />
        </label>

        <label className={`block rounded-xl border p-3.5 ${sectionTheme.accentSurfaceClass} ${sectionTheme.titleTextClass}`}>
          <span className="block text-xs font-bold uppercase">
            {recurrenceInput.kind === 'division'
              ? 'Factor de partición (b >= 2)'
              : 'Reducción constante (b >= 1)'}
          </span>
          <input
            type="number"
            min={recurrenceInput.kind === 'division' ? 2 : 1}
            max={10}
            value={recurrenceInput.factorB}
            onChange={(event) =>
              setRecurrenceInput((previous) => ({
                ...previous,
                factorB: Number(event.target.value) || 2,
              }))
            }
            className={`mt-2 w-full rounded-lg border bg-white px-3 py-1.5 text-sm font-bold dark:bg-zinc-900 ${sectionTheme.cardBorderClass} ${sectionTheme.titleTextClass}`}
          />
        </label>

        <label className={`block rounded-xl border p-3.5 ${sectionTheme.accentSurfaceClass} ${sectionTheme.titleTextClass}`}>
          <span className="block text-xs font-bold uppercase">
            Grado polinómico no recursivo (k)
          </span>
          <input
            type="number"
            min={0}
            max={6}
            value={recurrenceInput.polynomialDegreeK}
            onChange={(event) =>
              setRecurrenceInput((previous) => ({
                ...previous,
                polynomialDegreeK: Math.max(0, Number(event.target.value) || 0),
              }))
            }
            className={`mt-2 w-full rounded-lg border bg-white px-3 py-1.5 text-sm font-bold dark:bg-zinc-900 ${sectionTheme.cardBorderClass} ${sectionTheme.titleTextClass}`}
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className={`rounded-xl border p-4 ${sectionTheme.formulaCardClass}`}>
          <p className={`text-xs font-semibold tracking-wider uppercase ${sectionTheme.formulaLabelClass}`}>
            Ecuación Planteada y Comparación Crítica
          </p>
          <MathFormula expression={evaluation.formulaLatex} displayMode className={sectionTheme.titleTextClass} />
          <p className={`mt-1 inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${sectionTheme.slideBadgeClass}`}>
            {evaluation.comparisonLabel}
          </p>
        </div>

        <div className={`rounded-xl border p-4 ${sectionTheme.accentSurfaceClass}`}>
          <p className={`text-xs font-bold tracking-wider uppercase ${sectionTheme.slideHeaderClass}`}>
            {evaluation.matchedCaseTitle}
          </p>
          <div className={`mt-1 text-lg font-extrabold ${sectionTheme.titleTextClass}`}>
            <MathFormula expression={evaluation.complexityLatex} displayMode />
          </div>
          <p className={`text-xs leading-relaxed ${sectionTheme.strongTextClass}`}>{evaluation.explanation}</p>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { MathFormula } from '../MathFormula';
import { useSectionTheme } from '../../domain/sectionThemes';

interface ComplexityCurve {
  id: string;
  label: string;
  latex: string;
  description: string;
  colorClass: string;
  badgeBg: string;
  computeValue: (n: number) => number;
}

const COMPLEXITY_CURVES: ComplexityCurve[] = [
  {
    id: 'constant',
    label: 'Constante',
    latex: 'O(1)',
    description: 'Tiempo independiente del tamaño de entrada. Óptimo absoluto.',
    colorClass: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    computeValue: () => 1,
  },
  {
    id: 'logarithmic',
    label: 'Logarítmica',
    latex: 'O(\\log n)',
    description: 'Bipartición recursiva (ej. Búsqueda Binaria). Crece imperceptiblemente.',
    colorClass: 'text-sky-400',
    badgeBg: 'bg-sky-500/20 border-sky-500/40 text-sky-300',
    computeValue: (n) => Math.log2(Math.max(1, n)),
  },
  {
    id: 'linear',
    label: 'Lineal',
    latex: 'O(n)',
    description: 'Escaneo directo de elementos. Crecimiento proporcional.',
    colorClass: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300',
    computeValue: (n) => n,
  },
  {
    id: 'linearithmic',
    label: 'Cuasilineal',
    latex: 'O(n \\log n)',
    description: 'Ordenamientos óptimos por comparación (MergeSort, QuickSort promedio).',
    colorClass: 'text-amber-400',
    badgeBg: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    computeValue: (n) => n * Math.log2(Math.max(1, n)),
  },
  {
    id: 'quadratic',
    label: 'Cuadrática',
    latex: 'O(n^2)',
    description: 'Bucles anidados o pares ordenados (BubbleSort, comparaciones dobles).',
    colorClass: 'text-orange-400',
    badgeBg: 'bg-orange-500/20 border-orange-500/40 text-orange-300',
    computeValue: (n) => n * n,
  },
  {
    id: 'exponential',
    label: 'Exponencial',
    latex: 'O(2^n)',
    description: 'Exploración de subconjuntos exhaustiva (Mochila 0/1 ingenua, N-Reinas).',
    colorClass: 'text-rose-400',
    badgeBg: 'bg-rose-500/20 border-rose-500/40 text-rose-300',
    computeValue: (n) => Math.pow(2, n),
  },
  {
    id: 'factorial',
    label: 'Factorial',
    latex: 'O(n!)',
    description: 'Permutaciones exhaustivas (Viajante de Comercio sin poda). Intratable.',
    colorClass: 'text-red-500',
    badgeBg: 'bg-red-500/20 border-red-500/40 text-red-300',
    computeValue: (n) => {
      let result = 1;
      for (let index = 2; index <= Math.min(10, n); index++) {
        result *= index;
      }
      return result;
    },
  },
];

const PRESET_N_VALUES = [4, 8, 16, 32, 64, 128, 1024];

export function GrowthCurvesVisualizer() {
  const sectionTheme = useSectionTheme();
  const [selectedN, setSelectedN] = useState<number>(16);
  const [activeCurveId, setActiveCurveId] = useState<string>('linearithmic');

  const activeCurve =
    COMPLEXITY_CURVES.find((curve) => curve.id === activeCurveId) || COMPLEXITY_CURVES[3];

  const handleSelectN = (value: number) => {
    setSelectedN(value);
  };

  const handleSelectCurve = (id: string) => {
    setActiveCurveId(id);
  };

  return (
    <div className={`flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border p-3 sm:p-4 ${sectionTheme.analysisPanelClass}`}>
      <div className={`flex shrink-0 flex-wrap items-center justify-between gap-2 border-b pb-2.5 ${sectionTheme.analysisDividerClass}`}>
        <div>
          <span className={`text-xs font-bold uppercase tracking-wider ${sectionTheme.slideHeaderClass}`}>
            Simulador de Crecimiento Asintótico
          </span>
          <h3 className={`text-sm sm:text-base font-black ${sectionTheme.titleTextClass}`}>
            Jerarquía de Familias Asintóticas de Peor Caso
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-semibold pr-1 ${sectionTheme.slideHeaderClass}`}>Tamaño n:</span>
          {PRESET_N_VALUES.map((nValue) => (
            <button
              key={nValue}
              type="button"
              onClick={() => handleSelectN(nValue)}
              className={`rounded-lg px-2 py-1 text-xs font-mono font-bold transition ${
                selectedN === nValue
                  ? sectionTheme.primaryButtonClass
                  : sectionTheme.secondaryButtonClass
              }`}
            >
              n={nValue}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 my-2 overflow-hidden">
        <div className={`lg:col-span-8 flex flex-col justify-between rounded-xl border bg-zinc-950 p-3 overflow-hidden text-zinc-100 ${sectionTheme.cardBorderClass}`}>
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 text-xs">
            <span className="font-semibold text-zinc-400">Comparativa Operaciones Estimadas</span>
            <span className="font-mono text-sky-400">Para n = {selectedN}</span>
          </div>

          <div className="flex-1 min-h-0 flex flex-col justify-around py-1 gap-1.5">
            {COMPLEXITY_CURVES.map((curve) => {
              const rawOperations = curve.computeValue(selectedN);
              const isSelected = curve.id === activeCurveId;
              const formattedOperations =
                rawOperations > 1_000_000_000
                  ? '> 10^9 (Intratable)'
                  : Math.round(rawOperations).toLocaleString();

              const barPercentage = Math.min(
                100,
                Math.max(4, (Math.log10(Math.max(1, rawOperations)) / 8) * 100),
              );

              return (
                <button
                  key={curve.id}
                  type="button"
                  onClick={() => handleSelectCurve(curve.id)}
                  className={`flex items-center gap-2.5 rounded-lg p-1.5 text-left transition ${
                    isSelected
                      ? 'bg-sky-950/80 border border-sky-500/50'
                      : 'hover:bg-zinc-800/60 border border-transparent'
                  }`}
                >
                  <div className="w-24 shrink-0 font-mono text-xs font-black">
                    <MathFormula expression={curve.latex} className={curve.colorClass} />
                  </div>

                  <div className="flex-1 min-w-0 h-4 rounded-full bg-zinc-800/80 overflow-hidden flex items-center">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-sky-400' : 'bg-zinc-600'
                      }`}
                      style={{ width: `${barPercentage}%` }}
                    />
                  </div>

                  <div className="w-32 shrink-0 text-right font-mono text-xs font-bold text-zinc-200">
                    {formattedOperations}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-zinc-400 border-t border-zinc-800 pt-1.5 flex items-center justify-between">
            <span>Regla de Ordenamiento:</span>
            <span className="text-sky-300 font-semibold">
              O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n^2) &lt; O(2^n) &lt; O(n!)
            </span>
          </div>
        </div>

        <div className={`lg:col-span-4 flex flex-col justify-between rounded-xl border bg-zinc-950 p-3 text-zinc-100 ${sectionTheme.cardBorderClass}`}>
          <div className="border-b border-zinc-800 pb-2">
            <span className={`inline-block rounded-md border px-2 py-0.5 text-xs font-bold ${activeCurve.badgeBg}`}>
              {activeCurve.label}
            </span>
            <div className="mt-1 text-xl font-black text-white">
              <MathFormula expression={activeCurve.latex} className={activeCurve.colorClass} />
            </div>
          </div>

          <div className="my-auto space-y-2 text-xs">
            <p className="text-zinc-300 leading-relaxed font-medium">
              {activeCurve.description}
            </p>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 font-mono text-[11px]">
              <div>Para n = {selectedN}:</div>
              <div className="text-sky-400 font-bold text-sm mt-0.5">
                ≈ {Math.round(activeCurve.computeValue(selectedN)).toLocaleString()} ops
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-2 text-[11px] text-zinc-400">
            Principio de Invarianza: el orden asintótico determina el comportamiento ante instancias de gran tamaño.
          </div>
        </div>
      </div>
    </div>
  );
}

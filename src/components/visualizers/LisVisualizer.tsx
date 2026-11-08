import { useState } from 'react';
import { RotateCcw, Award } from 'lucide-react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

interface LisStep {
  step: number;
  phase: 'loop' | 'backtrack' | 'complete';
  title: string;
  badge: string;
  description: string;
  iPointer: number;
  jPointer?: number;
  comparing?: {
    valid: boolean;
    conditionText: string;
    updated: boolean;
  };
  matrixD: {
    lengths: number[];
    predecessors: number[];
  };
  highlightCell?: { row: 0 | 1; col: number };
  activeBacktrackIndex?: number;
  reconstructedIndices: number[];
}

const X_ARRAY = [3, 2, 6, 4, 5, 1, 7, 8];

const LIS_STEPS: LisStep[] = [
  {
    step: 0,
    phase: 'loop',
    title: 'Paso 0: Inicialización de Estructuras Canónicas UADE',
    badge: '1. Inicialización D[2, n]',
    description: 'Se inicializa la matriz auxiliar D de 2 x n: Fila D[0] (longitudes L[i]) con 1 en todas las posiciones. Fila D[1] (predecesores) con -1 en todas las posiciones.',
    iPointer: 0,
    matrixD: {
      lengths: [1, 1, 1, 1, 1, 1, 1, 1],
      predecessors: [-1, -1, -1, -1, -1, -1, -1, -1],
    },
    reconstructedIndices: [],
  },
  {
    step: 1,
    phase: 'loop',
    title: 'Paso 1: i = 2 (X[2] = 6) explorando j = 0 (X[0] = 3)',
    badge: '2. Doble Bucle (j < i)',
    description: 'i=2, j=0: Como X[0] = 3 ≤ X[2] = 6 y D[0, 0] + 1 = 1 + 1 = 2 > D[0, 2] = 1, actualizamos: D[0, 2] = 2 y D[1, 2] = 0.',
    iPointer: 2,
    jPointer: 0,
    comparing: {
      valid: true,
      conditionText: 'X[0]=3 ≤ X[2]=6 y D[0, 0]+1 = 2 > 1',
      updated: true,
    },
    matrixD: {
      lengths: [1, 1, 2, 1, 1, 1, 1, 1],
      predecessors: [-1, -1, 0, -1, -1, -1, -1, -1],
    },
    highlightCell: { row: 0, col: 2 },
    reconstructedIndices: [],
  },
  {
    step: 2,
    phase: 'loop',
    title: 'Paso 2: i = 3 (X[3] = 4) explorando j = 0 (X[0] = 3)',
    badge: '2. Doble Bucle (j < i)',
    description: 'i=3, j=0: X[0] = 3 ≤ X[3] = 4. D[0, 0] + 1 = 2 > D[0, 3] = 1 → D[0, 3] = 2 y D[1, 3] = 0. En j=1 (2≤4) no supera 2; en j=2 (6>4) no es creciente.',
    iPointer: 3,
    jPointer: 0,
    comparing: {
      valid: true,
      conditionText: 'X[0]=3 ≤ X[3]=4 y D[0, 0]+1 = 2 > 1',
      updated: true,
    },
    matrixD: {
      lengths: [1, 1, 2, 2, 1, 1, 1, 1],
      predecessors: [-1, -1, 0, 0, -1, -1, -1, -1],
    },
    highlightCell: { row: 0, col: 3 },
    reconstructedIndices: [],
  },
  {
    step: 3,
    phase: 'loop',
    title: 'Paso 3: i = 4 (X[4] = 5) explorando j = 3 (X[3] = 4)',
    badge: '2. Doble Bucle (j < i)',
    description: 'i=4, j=3: X[3] = 4 ≤ X[4] = 5. D[0, 3] + 1 = 2 + 1 = 3 > D[0, 4] = 1 → D[0, 4] = 3 y D[1, 4] = 3 (predecesor es el índice 3).',
    iPointer: 4,
    jPointer: 3,
    comparing: {
      valid: true,
      conditionText: 'X[3]=4 ≤ X[4]=5 y D[0, 3]+1 = 3 > 1',
      updated: true,
    },
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 1, 1],
      predecessors: [-1, -1, 0, 0, 3, -1, -1, -1],
    },
    highlightCell: { row: 0, col: 4 },
    reconstructedIndices: [],
  },
  {
    step: 4,
    phase: 'loop',
    title: 'Paso 4: i = 6 (X[6] = 7) explorando j = 4 (X[4] = 5)',
    badge: '2. Doble Bucle (j < i)',
    description: 'i=6, j=4: X[4] = 5 ≤ X[6] = 7. D[0, 4] + 1 = 3 + 1 = 4 > D[0, 6] = 1 → D[0, 6] = 4 y D[1, 6] = 4.',
    iPointer: 6,
    jPointer: 4,
    comparing: {
      valid: true,
      conditionText: 'X[4]=5 ≤ X[6]=7 y D[0, 4]+1 = 4 > 1',
      updated: true,
    },
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 1],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, -1],
    },
    highlightCell: { row: 0, col: 6 },
    reconstructedIndices: [],
  },
  {
    step: 5,
    phase: 'loop',
    title: 'Paso 5: i = 7 (X[7] = 8) explorando j = 6 (X[6] = 7)',
    badge: '2. Doble Bucle (j < i)',
    description: 'i=7, j=6: X[6] = 7 ≤ X[7] = 8. D[0, 6] + 1 = 4 + 1 = 5 > D[0, 7] = 1 → D[0, 7] = 5 y D[1, 7] = 6. ¡Longitud máxima LIS = 5 alcanzada!',
    iPointer: 7,
    jPointer: 6,
    comparing: {
      valid: true,
      conditionText: 'X[6]=7 ≤ X[7]=8 y D[0, 6]+1 = 5 > 1',
      updated: true,
    },
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    highlightCell: { row: 0, col: 7 },
    reconstructedIndices: [],
  },
  {
    step: 6,
    phase: 'backtrack',
    title: 'Paso 6: Backtracking — Inicio en Índice de Longitud Máxima (k = 7)',
    badge: '3. Backtracking Punteros',
    description: 'Buscamos max(D[0, k]): ocurre en k = 7 con valor 5. El elemento X[7] = 8 pertenece a la LIS. Leemos D[1, 7] = 6 para saltar a su predecesor.',
    iPointer: 7,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    activeBacktrackIndex: 7,
    reconstructedIndices: [7],
  },
  {
    step: 7,
    phase: 'backtrack',
    title: 'Paso 7: Backtracking — Salto a Índice 6 (X[6] = 7)',
    badge: '3. Backtracking Punteros',
    description: 'Desde k = 7 saltamos a k = 6. Elemento X[6] = 7 incluido en la LIS. Leemos D[1, 6] = 4 para continuar.',
    iPointer: 6,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    activeBacktrackIndex: 6,
    reconstructedIndices: [6, 7],
  },
  {
    step: 8,
    phase: 'backtrack',
    title: 'Paso 8: Backtracking — Salto a Índice 4 (X[4] = 5)',
    badge: '3. Backtracking Punteros',
    description: 'Desde k = 6 saltamos a k = 4. Elemento X[4] = 5 incluido en la LIS. Leemos D[1, 4] = 3 para continuar.',
    iPointer: 4,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    activeBacktrackIndex: 4,
    reconstructedIndices: [4, 6, 7],
  },
  {
    step: 9,
    phase: 'backtrack',
    title: 'Paso 9: Backtracking — Salto a Índice 3 (X[3] = 4)',
    badge: '3. Backtracking Punteros',
    description: 'Desde k = 4 saltamos a k = 3. Elemento X[3] = 4 incluido en la LIS. Leemos D[1, 3] = 0 para continuar.',
    iPointer: 3,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    activeBacktrackIndex: 3,
    reconstructedIndices: [3, 4, 6, 7],
  },
  {
    step: 10,
    phase: 'backtrack',
    title: 'Paso 10: Backtracking — Salto a Índice 0 (X[0] = 3) y Fin (-1)',
    badge: '3. Backtracking Punteros',
    description: 'Desde k = 3 saltamos a k = 0. Elemento X[0] = 3 incluido en la LIS. Leemos D[1, 0] = -1: ¡Llegamos al origen (-1)! Fin de la reconstrucción.',
    iPointer: 0,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    activeBacktrackIndex: 0,
    reconstructedIndices: [0, 3, 4, 6, 7],
  },
  {
    step: 11,
    phase: 'complete',
    title: 'Paso 11: Solución Concluida — Subsecuencia Z = [3, 4, 5, 7, 8]',
    badge: '4. Solución Óptima',
    description: 'La subsecuencia creciente más larga reconstruida es Z = [3, 4, 5, 7, 8] con longitud óptima = 5. Complejidad del algoritmo: Θ(n²) en tiempo y Θ(n) en espacio.',
    iPointer: -1,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    reconstructedIndices: [0, 3, 4, 6, 7],
  },
];

const PHASE_BADGE_STYLES: Record<
  LisStep['phase'],
  { bg: string; border: string; text: string }
> = {
  loop: { bg: 'bg-emerald-950/70', border: 'border-emerald-600/60', text: 'text-emerald-300' },
  backtrack: { bg: 'bg-amber-950/70', border: 'border-amber-600/60', text: 'text-amber-300' },
  complete: { bg: 'bg-teal-900', border: 'border-teal-400', text: 'text-white' },
};

export function LisVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const frame = LIS_STEPS[currentStep] ?? LIS_STEPS[0];
  const phaseStyle = PHASE_BADGE_STYLES[frame.phase];

  return (
    <AnimationPlayerShell
      title="Subsecuencia Creciente Más Larga (LIS): Matriz D[2, n] y Punteros Predecesores"
      badge="Programación Dinámica · Esquema de Cátedra UADE"
      currentStep={currentStep}
      totalSteps={LIS_STEPS.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={frame.description}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="flex flex-col gap-2.5 py-1 w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-emerald-800/40 pb-1.5 text-xs">
          <span className="font-bold text-emerald-300">
            {frame.title}
          </span>
          <span className={`rounded px-2.5 py-0.5 font-mono text-[11px] font-bold border ${phaseStyle.bg} ${phaseStyle.border} ${phaseStyle.text}`}>
            {frame.badge}
          </span>
        </div>

        <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2 text-xs font-mono">
            <span className="font-bold text-zinc-200">
              Vector de Entrada X[0..n-1]
            </span>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-amber-300">
                <span className="w-2 h-2 rounded bg-amber-400" /> Puntero i (Exterior)
              </span>
              <span className="flex items-center gap-1 text-sky-300">
                <span className="w-2 h-2 rounded bg-sky-400" /> Puntero j (Interior)
              </span>
              <span className="flex items-center gap-1 text-emerald-300">
                <span className="w-2 h-2 rounded bg-emerald-500" /> LIS Óptimo
              </span>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-2 font-mono text-center">
            {X_ARRAY.map((val, idx) => {
              const isIPointer = frame.iPointer === idx;
              const isJPointer = frame.jPointer === idx;
              const isSolution = frame.reconstructedIndices.includes(idx);

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center rounded-lg border p-1.5 transition-all duration-300 ${
                    isSolution
                      ? 'border-emerald-400 bg-emerald-500 text-zinc-950 font-black shadow-md scale-105'
                      : isIPointer
                      ? 'border-amber-400 bg-amber-950/80 text-amber-200 ring-1 ring-amber-400'
                      : isJPointer
                      ? 'border-sky-400 bg-sky-950/80 text-sky-200 ring-1 ring-sky-400'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-300'
                  }`}
                >
                  <span className="text-sm font-black">{val}</span>
                  <span className={`text-[10px] mt-0.5 ${isSolution ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>
                    [{idx}]
                  </span>
                  <div className="h-3 text-[9px] font-bold mt-0.5">
                    {isIPointer && !isSolution && <span className="text-amber-400">i</span>}
                    {isJPointer && !isSolution && <span className="text-sky-400">j</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl">
            <div className="border-b border-zinc-800 pb-1 mb-2 text-xs font-mono font-bold text-zinc-200">
              Matriz Auxiliar D[2, n] de Cátedra UADE
            </div>

            <table className="w-full border-collapse text-center text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                  <th className="p-1.5 text-left">Fila / Índice</th>
                  {X_ARRAY.map((_, idx) => (
                    <th key={idx} className="p-1.5 font-bold text-zinc-300">
                      [{idx}]
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800/60">
                  <td className="p-1.5 text-left font-bold text-sky-300 border-r border-zinc-800 text-[11px] whitespace-nowrap">
                    D[0]: Longitud L[i]
                  </td>
                  {frame.matrixD.lengths.map((len, idx) => {
                    const isBacktrack = frame.activeBacktrackIndex === idx;
                    const isHighlight = frame.highlightCell && frame.highlightCell.row === 0 && frame.highlightCell.col === idx;

                    return (
                      <td
                        key={idx}
                        className={`p-1.5 font-bold transition-all duration-300 ${
                          isBacktrack
                            ? 'bg-amber-400 text-zinc-950 font-black scale-105 shadow-md'
                            : isHighlight
                            ? 'bg-amber-500 text-zinc-950 font-black scale-105 shadow-md'
                            : 'text-zinc-200 bg-zinc-900/40'
                        }`}
                      >
                        {len}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="p-1.5 text-left font-bold text-purple-300 border-r border-zinc-800 text-[11px] whitespace-nowrap">
                    D[1]: Predecesor j
                  </td>
                  {frame.matrixD.predecessors.map((pred, idx) => {
                    const isBacktrack = frame.activeBacktrackIndex === idx;

                    return (
                      <td
                        key={idx}
                        className={`p-1.5 font-bold transition-all duration-300 ${
                          isBacktrack
                            ? 'bg-amber-950 text-amber-200 border border-amber-400 font-black'
                            : pred === -1
                            ? 'text-zinc-600 bg-zinc-900/30'
                            : 'text-purple-300 bg-zinc-900/40'
                        }`}
                      >
                        {pred}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2">
            {frame.comparing && (
              <div className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2 font-mono text-xs shadow-xl">
                <span className="text-[11px] font-bold text-zinc-300 border-b border-zinc-800 pb-0.5">
                  Condición de Extensión:
                </span>
                <div className="text-[10.5px] text-zinc-300 mt-1">
                  {frame.comparing.conditionText}
                </div>
                <div className="text-[10px] text-amber-300 font-bold mt-0.5">
                  ✓ Actualiza D[0, {frame.iPointer}] y D[1, {frame.iPointer}]
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2 font-mono shadow-xl">
              <span className="text-[11px] font-bold text-amber-400 border-b border-zinc-800 pb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Subsecuencia Óptima Z Reconstruida:
              </span>
              <div className="flex items-center justify-center gap-1.5 py-1">
                {frame.reconstructedIndices.length > 0 ? (
                  frame.reconstructedIndices
                    .slice()
                    .sort((a, b) => a - b)
                    .map((idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center h-8 w-8 rounded-lg bg-amber-400 text-zinc-950 font-black text-xs shadow-md"
                      >
                        <span>{X_ARRAY[idx]}</span>
                      </div>
                    ))
                ) : (
                  <span className="text-xs text-zinc-500 py-1">
                    Pendiente de backtracking...
                  </span>
                )}
              </div>
              <div className="text-[11px] text-zinc-400 flex justify-between border-t border-zinc-800 pt-1">
                <span>Longitud LIS Óptima:</span>
                <strong className="text-amber-300">5 elementos</strong>
              </div>
            </div>

            <div className="rounded-xl border border-amber-800/30 bg-amber-950/20 p-2 text-[10px] text-zinc-300 flex flex-col gap-1">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-amber-400" />
                Reconstrucción por Punteros D[1]:
              </span>
              <span>
                Desde k* con mayor D[0, k*]: 7 → 6 → 4 → 3 → 0 → -1. Se recuperan los valores en orden ascendente: <strong>[3, 4, 5, 7, 8]</strong>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

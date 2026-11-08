import { useState } from 'react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

interface QuickSortFrame {
  step: number;
  phase: 'pivot_select' | 'pointer_search' | 'swap' | 'pointer_cross' | 'pivot_placed' | 'conquer' | 'completed';
  range: [number, number];
  pivot_val: number;
  pivot_idx: number;
  i: number;
  j: number;
  state: number[];
  locked: number[];
  action: string;
}

const INITIAL_ARRAY = [7, 1, 8, 5, 3, 6, 2, 9, 0, 4];

const QUICKSORT_FRAMES: QuickSortFrame[] = [
  {
    step: 1,
    phase: 'pivot_select',
    range: [0, 9],
    pivot_val: 7,
    pivot_idx: 0,
    i: 0,
    j: 9,
    state: [7, 1, 8, 5, 3, 6, 2, 9, 0, 4],
    locked: [],
    action: 'Llamada inicial QuickSort(0, 9): se elige el pivote A[0] = 7. El puntero i inicia a la izquierda y el puntero j a la derecha.',
  },
  {
    step: 2,
    phase: 'pointer_search',
    range: [0, 9],
    pivot_val: 7,
    pivot_idx: 0,
    i: 2,
    j: 8,
    state: [7, 1, 8, 5, 3, 6, 2, 9, 0, 4],
    locked: [],
    action: 'Búsqueda de punteros: i avanza buscando elementos mayores al pivote (se detiene en A[2]=8) y j retrocede buscando menores (se detiene en A[8]=0).',
  },
  {
    step: 3,
    phase: 'swap',
    range: [0, 9],
    pivot_val: 7,
    pivot_idx: 0,
    i: 2,
    j: 8,
    state: [7, 1, 0, 5, 3, 6, 2, 9, 8, 4],
    locked: [],
    action: 'Intercambio de partición: swap(A[2], A[8]) coloca el 0 en el lado menor y el 8 en el lado mayor respecto al pivote 7.',
  },
  {
    step: 4,
    phase: 'pointer_cross',
    range: [0, 9],
    pivot_val: 7,
    pivot_idx: 0,
    i: 8,
    j: 7,
    state: [7, 1, 0, 5, 3, 6, 2, 4, 8, 9],
    locked: [],
    action: 'Continuación y cruce de punteros: swap(A[7]=9, A[9]=4). Los punteros se cruzan (j=7 queda a la izquierda de i=8). Finaliza el escaneo de este nivel.',
  },
  {
    step: 5,
    phase: 'pivot_placed',
    range: [0, 9],
    pivot_val: 7,
    pivot_idx: 7,
    i: 7,
    j: 7,
    state: [4, 1, 0, 5, 3, 6, 2, 7, 8, 9],
    locked: [7],
    action: 'Fijación del pivote: swap(A[0], A[j=7]). El pivote 7 queda en su posición definitiva índice 7. Divide el problema en A[0..6] y A[8..9].',
  },
  {
    step: 6,
    phase: 'pivot_placed',
    range: [8, 9],
    pivot_val: 8,
    pivot_idx: 8,
    i: 8,
    j: 9,
    state: [4, 1, 0, 5, 3, 6, 2, 7, 8, 9],
    locked: [7, 8, 9],
    action: 'Subproblema derecho A[8..9]: pivote 8 ya es menor que 9. Los elementos 8 y 9 quedan ordenados y fijados en sus posiciones finales.',
  },
  {
    step: 7,
    phase: 'pointer_search',
    range: [0, 6],
    pivot_val: 4,
    pivot_idx: 0,
    i: 3,
    j: 6,
    state: [4, 1, 0, 5, 3, 6, 2, 7, 8, 9],
    locked: [7, 8, 9],
    action: 'Subproblema izquierdo A[0..6]: nuevo pivote A[0]=4. Puntero i se detiene en A[3]=5 (> 4) y puntero j en A[6]=2 (< 4).',
  },
  {
    step: 8,
    phase: 'pivot_placed',
    range: [0, 6],
    pivot_val: 4,
    pivot_idx: 4,
    i: 4,
    j: 4,
    state: [2, 1, 0, 3, 4, 6, 5, 7, 8, 9],
    locked: [4, 7, 8, 9],
    action: 'swap(A[3], A[6]) y fijación del pivote 4: swap(A[0], A[4]) ubica definitivamente el 4 en índice 4. Restan subproblemas A[0..3] y A[5..6].',
  },
  {
    step: 9,
    phase: 'conquer',
    range: [0, 3],
    pivot_val: 2,
    pivot_idx: 2,
    i: 2,
    j: 2,
    state: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    locked: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    action: 'Partición recursiva en A[0..3] (pivotes 2, 1) y A[5..6] (swap de 6 y 5). Todos los subproblemas alcanzan casos base unitarios ordenados.',
  },
  {
    step: 10,
    phase: 'completed',
    range: [0, 9],
    pivot_val: -1,
    pivot_idx: -1,
    i: -1,
    j: -1,
    state: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    locked: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    action: 'Arreglo completamente ordenado: todas las particiones recursivas de QuickSort concluyeron y los 10 elementos están en su posición definitiva.',
  },
];

const PHASE_LABEL_MAP: Record<QuickSortFrame['phase'], string> = {
  pivot_select: 'Selección de Pivote',
  pointer_search: 'Búsqueda de Punteros i y j',
  swap: 'Intercambio de Partición (Swap)',
  pointer_cross: 'Cruce de Punteros (Stop)',
  pivot_placed: 'Pivote en Posición Definitiva',
  conquer: 'Partición de Subproblemas',
  completed: 'Arreglo Completamente Ordenado',
};

const PHASE_COLOR_MAP: Record<QuickSortFrame['phase'], string> = {
  pivot_select: 'text-amber-400',
  pointer_search: 'text-sky-400',
  swap: 'text-purple-400',
  pointer_cross: 'text-orange-400',
  pivot_placed: 'text-rose-400',
  conquer: 'text-sky-300',
  completed: 'text-rose-300',
};

export function QuickSortVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const currentFrame = QUICKSORT_FRAMES[currentStep] ?? QUICKSORT_FRAMES[0];

  return (
    <AnimationPlayerShell
      title="Partición de Hoare en QuickSort con Punteros i, j y Pivot"
      badge="Divide & Conquer"
      currentStep={currentStep}
      totalSteps={QUICKSORT_FRAMES.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={currentFrame.action}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="h-full min-h-0 flex-1 flex flex-col justify-between items-center w-full gap-2.5 sm:gap-3">
        <div className="shrink-0 w-full flex flex-wrap items-center justify-between gap-2 rounded-xl border border-rose-800/40 bg-zinc-950/70 px-3 py-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-zinc-300 font-sans">
              Arreglo Original A[0..9]:
            </span>
            <span className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[11px] font-mono text-zinc-400">
              Desordenado (n = 10)
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5">
            {INITIAL_ARRAY.map((val: number, idx: number) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 leading-none mb-0.5">
                  {idx}
                </span>
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 items-center justify-center rounded-lg bg-zinc-900 border border-rose-900/60 text-zinc-200 font-mono text-xs sm:text-sm font-bold shadow-xs">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 w-full rounded-2xl border-2 border-rose-800/50 bg-zinc-950/90 p-3 sm:p-5 shadow-2xl flex flex-col justify-between items-center overflow-y-auto">
          <div className="w-full flex items-center justify-between gap-2 border-b border-white/10 pb-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-mono font-bold text-zinc-300">
                Subproblema Activo:
              </span>
              <span className="rounded-md bg-sky-500/20 border border-sky-500/40 px-2 py-0.5 text-xs font-mono font-bold text-sky-300">
                A[{currentFrame.range[0]}..{currentFrame.range[1]}]
              </span>
            </div>

            {currentFrame.pivot_val >= 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-mono text-zinc-400">
                  Pivote en Partición:
                </span>
                <span className="flex items-center gap-1.5 rounded-lg border border-amber-400/80 bg-amber-500/20 px-2.5 py-0.5 font-mono text-xs sm:text-sm font-black text-amber-300 shadow-xs">
                  <span>A[{currentFrame.pivot_idx}] =</span>
                  <span className="rounded bg-amber-400 px-1.5 text-zinc-950 font-black">{currentFrame.pivot_val}</span>
                </span>
              </div>
            ) : (
              <span className="rounded-md bg-rose-500/20 border border-rose-500/50 px-2.5 py-0.5 text-xs font-mono font-bold text-rose-300">
                ✓ Todas las particiones completadas
              </span>
            )}
          </div>

          <div className="w-full flex-1 flex flex-col justify-center items-center my-auto py-2">
            <div className="flex flex-wrap items-end justify-center gap-2 sm:gap-3 md:gap-3.5">
              {currentFrame.state.map((val: number, idx: number) => {
                const isLocked = currentFrame.locked.includes(idx);
                const isPivot = idx === currentFrame.pivot_idx && !isLocked;
                const isI = idx === currentFrame.i;
                const isJ = idx === currentFrame.j;
                const inSubproblem = idx >= currentFrame.range[0] && idx <= currentFrame.range[1];

                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className="h-6 flex items-center justify-center font-mono font-bold text-xs">
                      {isI && isJ && (
                        <span className="rounded-md bg-fuchsia-500 px-2 py-0.5 text-xs font-black text-white shadow-xs">
                          i, j ▼
                        </span>
                      )}
                      {isI && !isJ && (
                        <span className="rounded-md bg-sky-400 px-2 py-0.5 text-xs font-black text-zinc-950 shadow-xs">
                          i ▼
                        </span>
                      )}
                      {!isI && isJ && (
                        <span className="rounded-md bg-orange-400 px-2 py-0.5 text-xs font-black text-zinc-950 shadow-xs">
                          j ▼
                        </span>
                      )}
                      {!isI && !isJ && isPivot && (
                        <span className="rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-black text-zinc-950 shadow-xs">
                          PIVOT
                        </span>
                      )}
                      {!isI && !isJ && !isPivot && isLocked && (
                        <span className="rounded-md bg-rose-500/20 border border-rose-500/50 px-1.5 py-0.5 text-[10px] font-bold text-rose-300">
                          ✓ FIJO
                        </span>
                      )}
                    </div>

                    <div
                      className={`flex h-11 w-11 sm:h-13 sm:w-13 md:h-15 md:w-15 items-center justify-center rounded-2xl font-mono text-base sm:text-xl md:text-2xl font-black transition-all duration-300 shadow-md ${
                        isLocked
                          ? 'border-2 border-rose-400 bg-rose-500 text-zinc-950 shadow-lg scale-105'
                          : isPivot
                          ? 'border-2 border-amber-400 bg-amber-400 text-zinc-950 ring-2 ring-amber-400/40 shadow-lg scale-105'
                          : isI
                          ? 'border-2 border-sky-400 bg-sky-950/80 text-sky-200 ring-2 ring-sky-400/40'
                          : isJ
                          ? 'border-2 border-orange-400 bg-orange-950/80 text-orange-200 ring-2 ring-orange-400/40'
                          : inSubproblem
                          ? 'border-2 border-zinc-700 bg-zinc-900 text-white'
                          : 'border border-zinc-800 bg-zinc-950 text-zinc-500 opacity-50'
                      }`}
                    >
                      {val}
                    </div>

                    <span className="text-[10px] sm:text-xs font-mono text-zinc-400">
                      [{idx}]
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-white/10 pt-2 shrink-0">
            <span>Subarreglo izquierdo: valores ≤ pivote</span>
            <span className="font-bold text-amber-300">Partición Hoare (i, j)</span>
            <span>Subarreglo derecho: valores &gt; pivote</span>
          </div>
        </div>

        <div className="shrink-0 w-full grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 text-xs sm:text-sm font-mono">
          <div className="flex flex-col gap-0.5 rounded-xl border border-rose-800/40 bg-rose-950/80 p-1.5 sm:p-2 shadow-xs">
            <span className="text-[10px] sm:text-[11px] uppercase font-sans font-bold text-zinc-400">
              Fase Activa
            </span>
            <span className={`font-bold truncate ${PHASE_COLOR_MAP[currentFrame.phase]}`}>
              {PHASE_LABEL_MAP[currentFrame.phase]}
            </span>
          </div>

          <div className="flex flex-col gap-0.5 rounded-xl border border-rose-800/40 bg-rose-950/80 p-1.5 sm:p-2 shadow-xs">
            <span className="text-[10px] sm:text-[11px] uppercase font-sans font-bold text-zinc-400">
              Pivote y Punteros
            </span>
            <span className="font-bold text-sky-300 truncate">
              {currentFrame.pivot_val >= 0
                ? `Pivote: ${currentFrame.pivot_val} | i: ${currentFrame.i} | j: ${currentFrame.j}`
                : 'Partición concluida'}
            </span>
          </div>

          <div className="flex flex-col gap-0.5 rounded-xl border border-rose-800/40 bg-rose-950/80 p-1.5 sm:p-2 shadow-xs">
            <span className="text-[10px] sm:text-[11px] uppercase font-sans font-bold text-zinc-400">
              Posición Definitiva
            </span>
            <span className="font-bold text-rose-400">
              {currentFrame.locked.length} / 10 ordenados
            </span>
          </div>

          <div className="flex flex-col gap-0.5 rounded-xl border border-rose-800/40 bg-rose-950/80 p-1.5 sm:p-2 shadow-xs">
            <span className="text-[10px] sm:text-[11px] uppercase font-sans font-bold text-zinc-400">
              Complejidad
            </span>
            <span className="font-bold text-amber-300">
              O(n log n) prom · O(n²) peor
            </span>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

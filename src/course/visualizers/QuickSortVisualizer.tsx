import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import {
  OriginalArrayBanner,
  VisualizerMetricCard,
} from './shared/VisualizerMetricSubcards';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

interface QuickSortFrame {
  step: number;
  phase:
    | 'pivot_select'
    | 'pointer_search'
    | 'swap'
    | 'pointer_cross'
    | 'pivot_placed'
    | 'conquer'
    | 'completed';
  range: [number, number];
  pivot_val: number;
  pivot_idx: number;
  i: number;
  j: number;
  state: number[];
  locked: number[];
  action: string;
}

const INITIAL_ARRAY = [7, 1, 8, 5, 3, 6, 2, 9, 0, 4] as const;

const QUICKSORT_FRAMES: readonly QuickSortFrame[] = [
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

type QuickSortCellStatus = 'locked' | 'pivot' | 'pointer_i' | 'pointer_j' | 'subproblem' | 'inactive';

const CELL_STYLE_BY_STATUS: Record<QuickSortCellStatus, string> = {
  locked: 'border-2 border-rose-400 bg-rose-500 text-zinc-950 shadow-lg scale-105',
  pivot: 'border-2 border-amber-400 bg-amber-400 text-zinc-950 ring-2 ring-amber-400/40 shadow-lg scale-105',
  pointer_i: 'border-2 border-sky-400 bg-sky-950/80 text-sky-200 ring-2 ring-sky-400/40',
  pointer_j: 'border-2 border-orange-400 bg-orange-950/80 text-orange-200 ring-2 ring-orange-400/40',
  subproblem: 'border-2 border-zinc-700 bg-zinc-900 text-white',
  inactive: 'border border-zinc-800 bg-zinc-950 text-zinc-500 opacity-50',
};

function resolveCellStatus(idx: number, frame: QuickSortFrame): QuickSortCellStatus {
  const isLocked = frame.locked.includes(idx);
  if (isLocked) return 'locked';
  if (idx === frame.pivot_idx) return 'pivot';
  if (idx === frame.i) return 'pointer_i';
  if (idx === frame.j) return 'pointer_j';
  if (idx >= frame.range[0] && idx <= frame.range[1]) return 'subproblem';
  return 'inactive';
}

export function QuickSortVisualizer() {
  const {
    currentStep,
    currentFrame,
    totalSteps,
    isPlaying,
    playbackSpeed,
    setCurrentStep,
    togglePlay,
    setPlaybackSpeed,
    resetPlayback,
  } = useVisualizerPlayback(QUICKSORT_FRAMES);

  return (
    <AnimationPlayerShell
      title="Partición de Hoare en QuickSort con Punteros i, j y Pivot"
      badge="Divide & Conquer"
      currentStep={currentStep}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={currentFrame.action}
      onStepChange={setCurrentStep}
      onTogglePlay={togglePlay}
      onSpeedChange={setPlaybackSpeed}
      onReset={resetPlayback}
    >
      <div className="h-full min-h-0 flex-1 flex flex-col justify-between items-center w-full gap-2.5 sm:gap-3">
        <OriginalArrayBanner
          titleLabel="Arreglo Original A[0..9]:"
          subtitleBadge="Desordenado (n = 10)"
          values={INITIAL_ARRAY}
        />

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
              {currentFrame.state.map((val, idx) => {
                const isLocked = currentFrame.locked.includes(idx);
                const isPivot = idx === currentFrame.pivot_idx && !isLocked;
                const isI = idx === currentFrame.i;
                const isJ = idx === currentFrame.j;
                const cellStatus = resolveCellStatus(idx, currentFrame);

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
                      className={`flex h-11 w-11 sm:h-13 sm:w-13 md:h-15 md:w-15 items-center justify-center rounded-2xl font-mono text-base sm:text-xl md:text-2xl font-black transition-all duration-300 shadow-md ${CELL_STYLE_BY_STATUS[cellStatus]}`}
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
          <VisualizerMetricCard
            label="Fase Activa"
            value={PHASE_LABEL_MAP[currentFrame.phase]}
            valueClassName={PHASE_COLOR_MAP[currentFrame.phase]}
          />
          <VisualizerMetricCard
            label="Pivote y Punteros"
            value={
              currentFrame.pivot_val >= 0
                ? `Pivote: ${currentFrame.pivot_val} | i: ${currentFrame.i} | j: ${currentFrame.j}`
                : 'Partición concluida'
            }
            valueClassName="text-sky-300"
          />
          <VisualizerMetricCard
            label="Posición Definitiva"
            value={`${currentFrame.locked.length} / 10 ordenados`}
            valueClassName="text-rose-400"
          />
          <VisualizerMetricCard
            label="Complejidad"
            value="O(n log n) prom · O(n²) peor"
            valueClassName="text-amber-300"
          />
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

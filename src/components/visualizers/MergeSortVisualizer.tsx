import { useState } from 'react';
import { AnimationPlayerShell } from './AnimationPlayerShell';
import { ANIMATION_SPECS_DATA } from '../../data/animationSpecsData';

interface MergeSortFrame {
  step: number;
  action: 'split' | 'base' | 'merge' | 'merge_final';
  subarrays?: number[][];
  result?: number[];
}

interface SubarrayLayoutConfig {
  cardPadding: string;
  cellSize: string;
  cellFont: string;
  headerMargin: string;
  subarraysGap: string;
  isCompactHeader: boolean;
}

const ACTION_PHASE_LABELS: Record<string, string> = {
  split: 'Fase de División (Divide)',
  base: 'Caso Base (Hojas del Árbol)',
  merge: 'Fase de Mezcla (Conquer & Merge)',
  merge_final: 'Vector Final Ordenado',
};

const ACTION_DESCRIPTIONS: Record<string, string> = {
  split: 'Divide recursivamente el problema a la mitad: T(n) = 2T(n/2) + O(1). Se bifurca hasta alcanzar subproblemas unitarios.',
  base: 'Caso base n=1: un elemento individual está trivialmente ordenado. Se detiene la división y comienza el retorno.',
  merge: 'Combina ordenadamente subarreglos contiguos en tiempo O(n) comparando elementos de menor a mayor.',
  merge_final: 'Mezcla definitiva completada con éxito: el arreglo completo de 10 elementos se encuentra ordenado de forma ascendente.',
};

const ACTION_STYLE_MAP: Record<string, { cardBorder: string; cardBg: string; cellBg: string; text: string; badge: string }> = {
  split: {
    cardBorder: 'border-sky-500/60 ring-1 ring-sky-500/20',
    cardBg: 'bg-sky-950/40',
    cellBg: 'bg-zinc-800 text-sky-200 border border-sky-700/50',
    text: 'text-sky-300',
    badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  },
  base: {
    cardBorder: 'border-amber-500/70 ring-1 ring-amber-500/30',
    cardBg: 'bg-amber-950/30',
    cellBg: 'bg-amber-400 text-zinc-950 font-black shadow-md',
    text: 'text-amber-300',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  merge: {
    cardBorder: 'border-rose-500/70 ring-1 ring-rose-500/30',
    cardBg: 'bg-rose-950/50',
    cellBg: 'bg-rose-500 text-zinc-950 font-black shadow-md',
    text: 'text-rose-300',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
  merge_final: {
    cardBorder: 'border-rose-400 ring-2 ring-rose-400/40',
    cardBg: 'bg-rose-950/70',
    cellBg: 'bg-rose-400 text-zinc-950 font-black shadow-lg scale-105',
    text: 'text-rose-200',
    badge: 'bg-rose-400/25 text-rose-200 border-rose-400/60',
  },
};

function getSubarrayLayoutConfig(count: number): SubarrayLayoutConfig {
  if (count >= 8) {
    return {
      cardPadding: 'p-1.5 sm:p-2',
      cellSize: 'h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10',
      cellFont: 'text-xs sm:text-sm md:text-base font-black',
      headerMargin: 'mb-1 pb-0.5',
      subarraysGap: 'gap-1.5 sm:gap-2',
      isCompactHeader: true,
    };
  }

  if (count >= 4) {
    return {
      cardPadding: 'p-2 sm:p-2.5',
      cellSize: 'h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11',
      cellFont: 'text-sm sm:text-base md:text-lg font-black',
      headerMargin: 'mb-1.5 pb-1',
      subarraysGap: 'gap-2 sm:gap-2.5',
      isCompactHeader: false,
    };
  }

  return {
    cardPadding: 'p-2.5 sm:p-3',
    cellSize: 'h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14',
    cellFont: 'text-base sm:text-xl md:text-2xl font-black',
    headerMargin: 'mb-2 pb-1.5',
    subarraysGap: 'gap-3 sm:gap-4',
    isCompactHeader: false,
  };
}

export function MergeSortVisualizer() {
  const spec = ANIMATION_SPECS_DATA.MERGESORT_TRACE ?? {
    array_initial: [7, 1, 8, 5, 3, 6, 2, 9, 0, 4],
    frames: [
      { step: 1, action: 'split', subarrays: [[7, 1, 8, 5, 3], [6, 2, 9, 0, 4]] },
      { step: 2, action: 'split', subarrays: [[7, 1, 8], [5, 3], [6, 2, 9], [0, 4]] },
      { step: 3, action: 'split', subarrays: [[7, 1], [8], [5], [3], [6, 2], [9], [0], [4]] },
      { step: 4, action: 'base', subarrays: [[7], [1], [8], [5], [3], [6], [2], [9], [0], [4]] },
      { step: 5, action: 'merge', subarrays: [[1, 7], [8], [3, 5], [2, 6], [9], [0, 4]] },
      { step: 6, action: 'merge', subarrays: [[1, 7, 8], [3, 5], [2, 6, 9], [0, 4]] },
      { step: 7, action: 'merge', subarrays: [[1, 3, 5, 7, 8], [0, 2, 4, 6, 9]] },
      { step: 8, action: 'merge_final', result: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
    ],
  };

  const frames: MergeSortFrame[] = spec.frames;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const currentFrame = frames[currentStep] ?? frames[0];
  const activeSubarrays: number[][] =
    currentFrame.subarrays ?? (currentFrame.result ? [currentFrame.result] : [spec.array_initial]);
  const activeStyle = ACTION_STYLE_MAP[currentFrame.action] ?? ACTION_STYLE_MAP.split;
  const layoutConfig = getSubarrayLayoutConfig(activeSubarrays.length);

  return (
    <AnimationPlayerShell
      title="Traza Completa de MergeSort en Vector de 10 Elementos"
      badge="Divide & Conquer"
      currentStep={currentStep}
      totalSteps={frames.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={ACTION_DESCRIPTIONS[currentFrame.action] || 'Paso de ejecución de MergeSort'}
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
            {spec.array_initial.map((val: number, idx: number) => (
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

        <div className="flex-1 min-h-0 w-full rounded-2xl border-2 border-rose-800/50 bg-zinc-950/90 p-2 sm:p-3.5 shadow-2xl flex flex-col justify-center items-center overflow-y-auto">
          <div className="w-full flex-1 flex flex-col justify-center items-center my-auto">
            <div className={`w-full flex flex-wrap items-center justify-center ${layoutConfig.subarraysGap} py-1`}>
              {activeSubarrays.map((sub: number[], subIdx: number) => (
                <div
                  key={subIdx}
                  className={`flex flex-col items-center rounded-2xl border-2 ${layoutConfig.cardPadding} shadow-xl transition-all duration-300 ${activeStyle.cardBorder} ${activeStyle.cardBg}`}
                >
                  <div className={`flex items-center justify-between gap-2.5 w-full border-b border-white/10 ${layoutConfig.headerMargin}`}>
                    <span className={`font-mono font-bold uppercase ${layoutConfig.isCompactHeader ? 'text-[10px]' : 'text-[11px] sm:text-xs'} ${activeStyle.text}`}>
                      {layoutConfig.isCompactHeader ? `#${subIdx + 1}` : `Subarreglo #${subIdx + 1}`}
                    </span>
                    <span className={`rounded-md border px-1.5 py-0.2 font-mono font-bold ${layoutConfig.isCompactHeader ? 'text-[9px]' : 'text-[10px]'} ${activeStyle.badge}`}>
                      {layoutConfig.isCompactHeader ? `n=${sub.length}` : `tam: ${sub.length}`}
                    </span>
                  </div>

                  <div className="flex gap-1 sm:gap-1.5">
                    {sub.map((val: number, valIdx: number) => (
                      <div
                        key={valIdx}
                        className={`flex ${layoutConfig.cellSize} items-center justify-center rounded-xl font-mono ${layoutConfig.cellFont} transition-all duration-200 shadow-md ${activeStyle.cellBg}`}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 text-xs sm:text-sm font-mono">
          <div className="flex flex-col gap-0.5 rounded-xl border border-rose-800/40 bg-rose-950/80 p-1.5 sm:p-2 shadow-xs">
            <span className="text-[10px] sm:text-[11px] uppercase font-sans font-bold text-zinc-400">
              Fase Activa
            </span>
            <span className="font-bold text-rose-300 truncate">
              {ACTION_PHASE_LABELS[currentFrame.action]}
            </span>
          </div>

          <div className="flex flex-col gap-0.5 rounded-xl border border-rose-800/40 bg-rose-950/80 p-1.5 sm:p-2 shadow-xs">
            <span className="text-[10px] sm:text-[11px] uppercase font-sans font-bold text-zinc-400">
              Subarreglos en Nivel
            </span>
            <span className="font-bold text-sky-400">
              {activeSubarrays.length} subarreglos activos
            </span>
          </div>

          <div className="flex flex-col gap-0.5 rounded-xl border border-rose-800/40 bg-rose-950/80 p-1.5 sm:p-2 shadow-xs">
            <span className="text-[10px] sm:text-[11px] uppercase font-sans font-bold text-zinc-400">
              Costo del Nivel (Combinar)
            </span>
            <span className="font-bold text-amber-300">
              cn = Θ(n) mezclas
            </span>
          </div>

          <div className="flex flex-col gap-0.5 rounded-xl border border-rose-800/40 bg-rose-950/80 p-1.5 sm:p-2 shadow-xs">
            <span className="text-[10px] sm:text-[11px] uppercase font-sans font-bold text-zinc-400">
              Complejidad Total
            </span>
            <span className="font-bold text-rose-300">
              T(n) = Θ(n log n)
            </span>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

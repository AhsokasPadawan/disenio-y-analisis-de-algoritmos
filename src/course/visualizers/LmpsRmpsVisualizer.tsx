import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import { MathFormula } from '../../core/ui/MathFormula';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

interface StepFrame {
  step: number;
  phase: 'init' | 'lmps' | 'rmps' | 'crossing' | 'final';
  pointer?: number;
  lmpsRange?: [number, number];
  rmpsRange?: [number, number];
  currentSum?: number;
  bestLmps: number;
  bestRmps: number;
  description: string;
}

const ARRAY_VALUES = [3, -5, 5, 9, 7, -10, 4] as const;
const MID_INDEX = 3;

const SIMULATION_STEPS: readonly StepFrame[] = [
  {
    step: 0,
    phase: 'init',
    bestLmps: 0,
    bestRmps: 0,
    description:
      'Partición en mid = 3 (valor 9). Mitad izquierda [0..3], mitad derecha [4..6]. Resultados recursivos ya obtenidos: maxIzq = 14, maxDer = 7.',
  },
  {
    step: 1,
    phase: 'lmps',
    pointer: 3,
    currentSum: 9,
    bestLmps: 9,
    bestRmps: 0,
    lmpsRange: [3, 3],
    description:
      'LMPS inicio en i = mid = 3 (valor 9). Suma acumulada = 9. Récord inicial LMPS = 9 en rango [3..3].',
  },
  {
    step: 2,
    phase: 'lmps',
    pointer: 2,
    currentSum: 14,
    bestLmps: 14,
    bestRmps: 0,
    lmpsRange: [2, 3],
    description:
      'LMPS paso hacia la izquierda i = 2 (valor 5). Suma acumulada = 9 + 5 = 14. Supera récord previo → Nuevo LMPS = 14 en rango [2..3].',
  },
  {
    step: 3,
    phase: 'lmps',
    pointer: 1,
    currentSum: 9,
    bestLmps: 14,
    bestRmps: 0,
    lmpsRange: [2, 3],
    description:
      'LMPS paso i = 1 (valor -5). Suma acumulada = 14 + (-5) = 9. No supera 14 → Se preserva LMPS = 14 en rango [2..3].',
  },
  {
    step: 4,
    phase: 'lmps',
    pointer: 0,
    currentSum: 12,
    bestLmps: 14,
    bestRmps: 0,
    lmpsRange: [2, 3],
    description:
      'LMPS paso i = 0 (valor 3). Suma acumulada = 9 + 3 = 12. Fin del barrido izquierdo. LMPS definitivo = 14 (subarreglo [2..3]: 5 + 9).',
  },
  {
    step: 5,
    phase: 'rmps',
    pointer: 4,
    currentSum: 7,
    bestLmps: 14,
    bestRmps: 7,
    lmpsRange: [2, 3],
    rmpsRange: [4, 4],
    description:
      'RMPS inicio en j = mid + 1 = 4 (valor 7). Suma acumulada = 7. Récord inicial RMPS = 7 en rango [4..4].',
  },
  {
    step: 6,
    phase: 'rmps',
    pointer: 5,
    currentSum: -3,
    bestLmps: 14,
    bestRmps: 7,
    lmpsRange: [2, 3],
    rmpsRange: [4, 4],
    description:
      'RMPS paso hacia la derecha j = 5 (valor -10). Suma acumulada = 7 + (-10) = -3. Cae por debajo → Se preserva RMPS = 7.',
  },
  {
    step: 7,
    phase: 'rmps',
    pointer: 6,
    currentSum: 1,
    bestLmps: 14,
    bestRmps: 7,
    lmpsRange: [2, 3],
    rmpsRange: [4, 4],
    description:
      'RMPS paso j = 6 (valor 4). Suma acumulada = -3 + 4 = 1. Fin del barrido derecho. RMPS definitivo = 7 en rango [4..4].',
  },
  {
    step: 8,
    phase: 'crossing',
    bestLmps: 14,
    bestRmps: 7,
    lmpsRange: [2, 3],
    rmpsRange: [4, 4],
    description:
      'Combinación de Cruce: maxCruce = LMPS + RMPS = 14 + 7 = 21. Se empalman los subarreglos adyacentes formando [2..4] con elementos [5, 9, 7].',
  },
  {
    step: 9,
    phase: 'final',
    bestLmps: 14,
    bestRmps: 7,
    lmpsRange: [2, 3],
    rmpsRange: [4, 4],
    description:
      'Decisión Tripartita D&C: max(maxIzq = 14, maxDer = 7, maxCruce = 21) = 21. ¡El subarreglo de suma máxima es continuo y cruza el punto medio!',
  },
];

type LmpsCellStatus =
  | 'crossing'
  | 'pointer_lmps'
  | 'pointer_rmps'
  | 'lmps_best'
  | 'rmps_best'
  | 'default';

const CELL_STYLE_BY_STATUS: Record<LmpsCellStatus, string> = {
  crossing: 'border-2 border-rose-400 bg-rose-500/30 text-white shadow-lg scale-105',
  pointer_lmps: 'border-2 border-amber-400 bg-amber-900/50 text-amber-200 shadow-md scale-105',
  pointer_rmps: 'border-2 border-sky-400 bg-sky-900/50 text-sky-200 shadow-md scale-105',
  lmps_best: 'border-2 border-amber-500 bg-amber-500/20 text-amber-100 shadow-sm',
  rmps_best: 'border-2 border-sky-500 bg-sky-500/20 text-sky-100 shadow-sm',
  default: 'border border-rose-800/40 bg-zinc-900 text-zinc-300',
};

function resolveLmpsCellStatus(idx: number, frame: StepFrame): LmpsCellStatus {
  const isInCrossing =
    (frame.phase === 'crossing' || frame.phase === 'final') && idx >= 2 && idx <= 4;
  if (isInCrossing) return 'crossing';

  if (idx === frame.pointer) {
    return frame.phase === 'lmps' ? 'pointer_lmps' : 'pointer_rmps';
  }

  if (frame.lmpsRange && idx >= frame.lmpsRange[0] && idx <= frame.lmpsRange[1]) {
    return 'lmps_best';
  }

  if (frame.rmpsRange && idx >= frame.rmpsRange[0] && idx <= frame.rmpsRange[1]) {
    return 'rmps_best';
  }

  return 'default';
}

export function LmpsRmpsVisualizer() {
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
  } = useVisualizerPlayback(SIMULATION_STEPS);

  const maxCruce = currentFrame.bestLmps + currentFrame.bestRmps;

  return (
    <AnimationPlayerShell
      title="Suma Parcial Máxima: Subproblemas de Cruce LMPS + RMPS"
      badge="Divide & Conquer · O(n log n)"
      currentStep={currentStep}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={currentFrame.description}
      onStepChange={setCurrentStep}
      onTogglePlay={togglePlay}
      onSpeedChange={setPlaybackSpeed}
      onReset={resetPlayback}
    >
      <div className="flex flex-col items-center justify-center gap-4 py-1.5 w-full">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="rounded-md bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 text-amber-300 font-bold">
            Mitad Izquierda [0..3]
          </span>
          <span className="text-zinc-500">|</span>
          <span className="rounded-md bg-rose-500/20 border border-rose-500/40 px-2.5 py-0.5 text-rose-300 font-bold">
            Pivote mid = {MID_INDEX}
          </span>
          <span className="text-zinc-500">|</span>
          <span className="rounded-md bg-sky-500/20 border border-sky-500/40 px-2.5 py-0.5 text-sky-300 font-bold">
            Mitad Derecha [4..6]
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {ARRAY_VALUES.map((val, idx) => {
            const isMid = idx === MID_INDEX;
            const isCurrentPointer = idx === currentFrame.pointer;
            const cellStatus = resolveLmpsCellStatus(idx, currentFrame);

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className="flex h-5 items-center justify-center text-[10px] font-mono font-bold">
                  {isCurrentPointer ? (
                    <span
                      className={`rounded px-1 text-zinc-950 font-bold ${
                        currentFrame.phase === 'lmps' ? 'bg-amber-400' : 'bg-sky-400'
                      }`}
                    >
                      {currentFrame.phase === 'lmps' ? `i = ${idx}` : `j = ${idx}`}
                    </span>
                  ) : isMid ? (
                    <span className="rounded bg-rose-400 px-1 text-zinc-950 font-bold">
                      mid
                    </span>
                  ) : (
                    <span className="text-zinc-600">[{idx}]</span>
                  )}
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl font-mono text-sm font-extrabold transition-all duration-200 ${CELL_STYLE_BY_STATUS[cellStatus]}`}
                >
                  {val > 0 ? `+${val}` : val}
                </div>

                <span className="text-[10px] font-mono text-zinc-500">
                  {idx <= MID_INDEX ? 'Izq' : 'Der'}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-3xl text-xs font-mono">
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/40 p-2 text-center">
            <span className="block text-[10px] font-bold text-amber-400 uppercase tracking-wide">
              LMPS (hacia Izq)
            </span>
            <span className="text-sm sm:text-base font-black text-amber-200">
              {currentFrame.bestLmps > 0 ? currentFrame.bestLmps : '—'}
            </span>
            <span className="block text-[9px] text-zinc-400">
              {currentFrame.lmpsRange
                ? `Rango [${currentFrame.lmpsRange[0]}..${currentFrame.lmpsRange[1]}]`
                : 'mid..0'}
            </span>
          </div>

          <div className="rounded-xl border border-sky-500/30 bg-sky-950/40 p-2 text-center">
            <span className="block text-[10px] font-bold text-sky-400 uppercase tracking-wide">
              RMPS (hacia Der)
            </span>
            <span className="text-sm sm:text-base font-black text-sky-200">
              {currentFrame.bestRmps > 0 ? currentFrame.bestRmps : '—'}
            </span>
            <span className="block text-[9px] text-zinc-400">
              {currentFrame.rmpsRange
                ? `Rango [${currentFrame.rmpsRange[0]}..${currentFrame.rmpsRange[1]}]`
                : '(mid+1)..fin'}
            </span>
          </div>

          <div className="rounded-xl border border-rose-500/40 bg-rose-950/50 p-2 text-center">
            <span className="block text-[10px] font-bold text-rose-400 uppercase tracking-wide">
              maxCruce (LMPS + RMPS)
            </span>
            <span className="text-sm sm:text-base font-black text-rose-200">
              {currentFrame.bestLmps > 0 && currentFrame.bestRmps > 0 ? maxCruce : '—'}
            </span>
            <span className="block text-[9px] text-zinc-400">
              {currentFrame.bestLmps > 0 && currentFrame.bestRmps > 0
                ? 'Rango [2..4] (5+9+7)'
                : 'Cruce central'}
            </span>
          </div>

          <div className="rounded-xl border border-purple-500/40 bg-purple-950/40 p-2 text-center">
            <span className="block text-[10px] font-bold text-purple-300 uppercase tracking-wide">
              Decisión D&C
            </span>
            <span className="text-sm sm:text-base font-black text-purple-200">
              {currentFrame.phase === 'final' ? 'max(14, 7, 21) = 21' : 'max(Izq, Der, Cruce)'}
            </span>
            <span className="block text-[9px] text-zinc-400">
              Recurrencia <MathFormula formula="\Theta(n \log n)" />
            </span>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import { MathFormula } from '../../core/ui/MathFormula';
import { ANIMATION_SPECS_DATA } from '../data/animationSpecsData';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

interface HanoiFrame {
  move: number;
  disk?: number;
  from?: number;
  to?: number;
  Peg_1: number[];
  Peg_2: number[];
  Peg_3: number[];
}

const FALLBACK_HANOI_FRAMES: readonly HanoiFrame[] = [
  { move: 0, Peg_1: [4, 3, 2, 1], Peg_2: [], Peg_3: [] },
  { move: 1, disk: 1, from: 1, to: 2, Peg_1: [4, 3, 2], Peg_2: [1], Peg_3: [] },
  { move: 2, disk: 2, from: 1, to: 3, Peg_1: [4, 3], Peg_2: [1], Peg_3: [2] },
  { move: 3, disk: 1, from: 2, to: 3, Peg_1: [4, 3], Peg_2: [], Peg_3: [2, 1] },
  { move: 4, disk: 3, from: 1, to: 2, Peg_1: [4], Peg_2: [3], Peg_3: [2, 1] },
  { move: 5, disk: 1, from: 3, to: 1, Peg_1: [4, 1], Peg_2: [3], Peg_3: [2] },
  { move: 6, disk: 2, from: 3, to: 2, Peg_1: [4, 1], Peg_2: [3, 2], Peg_3: [] },
  { move: 7, disk: 1, from: 1, to: 2, Peg_1: [4], Peg_2: [3, 2, 1], Peg_3: [] },
  { move: 8, disk: 4, from: 1, to: 3, Peg_1: [], Peg_2: [3, 2, 1], Peg_3: [4] },
  { move: 9, disk: 1, from: 2, to: 3, Peg_1: [], Peg_2: [3, 2], Peg_3: [4, 1] },
  { move: 10, disk: 2, from: 2, to: 1, Peg_1: [2], Peg_2: [3], Peg_3: [4, 1] },
  { move: 11, disk: 1, from: 3, to: 1, Peg_1: [2, 1], Peg_2: [3], Peg_3: [4] },
  { move: 12, disk: 3, from: 2, to: 3, Peg_1: [2, 1], Peg_2: [], Peg_3: [4, 3] },
  { move: 13, disk: 1, from: 1, to: 2, Peg_1: [2], Peg_2: [1], Peg_3: [4, 3] },
  { move: 14, disk: 2, from: 1, to: 3, Peg_1: [], Peg_2: [1], Peg_3: [4, 3, 2] },
  { move: 15, disk: 1, from: 2, to: 3, Peg_1: [], Peg_2: [], Peg_3: [4, 3, 2, 1] },
];

const DISK_COLORS: Record<number, string> = {
  1: 'bg-rose-400 border-rose-300 text-rose-950',
  2: 'bg-amber-400 border-amber-300 text-amber-950',
  3: 'bg-sky-400 border-sky-300 text-sky-950',
  4: 'bg-violet-400 border-violet-300 text-violet-950',
};

const DISK_WIDTHS: Record<number, string> = {
  1: 'w-16',
  2: 'w-24',
  3: 'w-32',
  4: 'w-40',
};

type PegKey = 'Peg_1' | 'Peg_2' | 'Peg_3';

const PEG_LABELS: Record<PegKey, { name: string; role: string }> = {
  Peg_1: { name: 'Poste 1 (A)', role: 'Origen' },
  Peg_2: { name: 'Poste 2 (B)', role: 'Auxiliar' },
  Peg_3: { name: 'Poste 3 (C)', role: 'Destino' },
};

const PEG_KEYS: readonly PegKey[] = ['Peg_1', 'Peg_2', 'Peg_3'];

export function HanoiVisualizer() {
  const frames: readonly HanoiFrame[] =
    ANIMATION_SPECS_DATA.HANOI_4_DISKS_COMPLETE_15_MOVES?.frames ?? FALLBACK_HANOI_FRAMES;

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
  } = useVisualizerPlayback(frames);

  const moveDescription =
    currentFrame.move === 0
      ? 'Configuración Inicial: 4 discos ordenados decrecientemente en el Poste Origen (A).'
      : `Movimiento #${currentFrame.move}: Mover disco ${currentFrame.disk} desde Poste ${currentFrame.from} hacia Poste ${currentFrame.to}.`;

  return (
    <AnimationPlayerShell
      title="Torres de Hanoi: Secuencia Completa de 15 Movimientos (4 Discos)"
      badge="Subtract & Conquer"
      currentStep={currentStep}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={moveDescription}
      onStepChange={setCurrentStep}
      onTogglePlay={togglePlay}
      onSpeedChange={setPlaybackSpeed}
      onReset={resetPlayback}
    >
      <div className="flex flex-col items-center justify-center gap-4 py-2">
        <div className="grid grid-cols-3 gap-6 w-full max-w-xl">
          {PEG_KEYS.map((pegKey) => {
            const disks: number[] = currentFrame[pegKey] ?? [];
            const pegInfo = PEG_LABELS[pegKey];

            return (
              <div key={pegKey} className="flex flex-col items-center">
                <div className="text-center mb-2">
                  <div className="text-xs font-bold text-white">{pegInfo.name}</div>
                  <div className="text-[10px] font-mono text-rose-400">{pegInfo.role}</div>
                </div>

                <div className="relative flex flex-col-reverse items-center justify-start h-44 w-full rounded-b-xl border-b-4 border-amber-600 bg-zinc-900/60 pb-1">
                  <div className="absolute top-0 bottom-0 w-2.5 bg-amber-700/80 rounded-t-md" />

                  {disks.map((diskVal) => (
                    <div
                      key={diskVal}
                      className={`z-10 my-0.5 flex h-7 items-center justify-center rounded-md border font-mono text-xs font-black shadow-md transition-all duration-200 ${DISK_WIDTHS[diskVal]} ${DISK_COLORS[diskVal]}`}
                    >
                      Disco {diskVal}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-300 border-t border-zinc-800/80 pt-2 w-full">
          <span>
            Movimiento: <strong className="text-amber-300">{currentFrame.move} de 15</strong>
          </span>
          <span>
            Ecuación de recurrencia: <MathFormula formula="T(n) = 2T(n-1) + 1" />
          </span>
          <span>
            Complejidad:{' '}
            <strong className="text-rose-400">
              <MathFormula formula="\Theta(2^n)" />
            </strong>
          </span>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

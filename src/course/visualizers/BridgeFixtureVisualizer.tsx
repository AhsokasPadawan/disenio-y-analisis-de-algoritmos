import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import { MathFormula } from '../../core/ui/MathFormula';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

interface FixtureFrame {
  step: number;
  stage: string;
  grid: readonly (readonly number[])[];
  activeStageColRange: [number, number];
}

const BRIDGE_FIXTURE_FRAMES: readonly FixtureFrame[] = [
  {
    step: 1,
    stage: 'Etapa 1: Casos Base de 2 equipos (CompletarT(1,2), CompletarT(3,4), etc.) para Día 1',
    activeStageColRange: [0, 0],
    grid: [
      [2, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [4, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0, 0],
      [6, 0, 0, 0, 0, 0, 0],
      [5, 0, 0, 0, 0, 0, 0],
      [8, 0, 0, 0, 0, 0, 0],
      [7, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    step: 2,
    stage: 'Etapa 2: Combinar subgrupos de 4 equipos (Días 2 y 3 mediante copia transpuesta)',
    activeStageColRange: [1, 2],
    grid: [
      [2, 3, 4, 0, 0, 0, 0],
      [1, 4, 3, 0, 0, 0, 0],
      [4, 1, 2, 0, 0, 0, 0],
      [3, 2, 1, 0, 0, 0, 0],
      [6, 7, 8, 0, 0, 0, 0],
      [5, 8, 7, 0, 0, 0, 0],
      [8, 5, 6, 0, 0, 0, 0],
      [7, 6, 5, 0, 0, 0, 0],
    ],
  },
  {
    step: 3,
    stage: 'Etapa 3: Combinar los dos bloques de 4 equipos para completar Días 4 a 7 (Matriz 8x7 final)',
    activeStageColRange: [3, 6],
    grid: [
      [2, 3, 4, 5, 6, 7, 8],
      [1, 4, 3, 8, 5, 6, 7],
      [4, 1, 2, 7, 8, 5, 6],
      [3, 2, 1, 6, 7, 8, 5],
      [6, 7, 8, 1, 2, 3, 4],
      [5, 8, 7, 4, 1, 2, 3],
      [8, 5, 6, 3, 4, 1, 2],
      [7, 6, 5, 2, 3, 4, 1],
    ],
  },
];

type FixtureCellStatus = 'blank' | 'newly_filled' | 'filled';

const CELL_STYLE_BY_STATUS: Record<FixtureCellStatus, string> = {
  blank: 'text-zinc-700',
  newly_filled: 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30',
  filled: 'text-rose-200',
};

const TOURNAMENT_DAYS = [1, 2, 3, 4, 5, 6, 7] as const;

export function BridgeFixtureVisualizer() {
  const {
    currentStep,
    currentFrame: frame,
    totalSteps,
    isPlaying,
    playbackSpeed,
    setCurrentStep,
    togglePlay,
    setPlaybackSpeed,
    resetPlayback,
  } = useVisualizerPlayback(BRIDGE_FIXTURE_FRAMES);

  return (
    <AnimationPlayerShell
      title="Torneo de Bridge para 8 Equipos en 7 Días (Divide & Conquer)"
      badge="Divide & Conquer"
      currentStep={currentStep}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={frame.stage}
      onStepChange={setCurrentStep}
      onTogglePlay={togglePlay}
      onSpeedChange={setPlaybackSpeed}
      onReset={resetPlayback}
    >
      <div className="flex flex-col items-center justify-center gap-4 py-2">
        <div className="overflow-x-auto w-full">
          <table className="mx-auto border-collapse text-center text-xs font-mono">
            <thead>
              <tr className="border-b border-rose-800">
                <th className="p-2 text-rose-400 font-bold">Equipo \ Día</th>
                {TOURNAMENT_DAYS.map((day) => (
                  <th
                    key={day}
                    className={`p-2 font-bold ${
                      day - 1 >= frame.activeStageColRange[0] &&
                      day - 1 <= frame.activeStageColRange[1]
                        ? 'text-amber-300 bg-amber-950/40'
                        : 'text-zinc-400'
                    }`}
                  >
                    Día {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {frame.grid.map((row, teamIdx) => (
                <tr key={teamIdx} className="border-b border-zinc-800/60 hover:bg-zinc-900/40">
                  <td className="p-2 font-bold text-white bg-rose-950/80 border-r border-rose-900">
                    Equipo {teamIdx + 1}
                  </td>
                  {row.map((opponent, dayIdx) => {
                    const isNewlyFilled =
                      dayIdx >= frame.activeStageColRange[0] &&
                      dayIdx <= frame.activeStageColRange[1];
                    const status: FixtureCellStatus =
                      opponent === 0 ? 'blank' : isNewlyFilled ? 'newly_filled' : 'filled';

                    return (
                      <td
                        key={dayIdx}
                        className={`p-2 transition-all duration-300 ${CELL_STYLE_BY_STATUS[status]}`}
                      >
                        {opponent === 0 ? '-' : `vs ${opponent}`}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-300 border-t border-zinc-800/80 pt-2 w-full">
          <span>
            Dimensión: <strong className="text-white">8 equipos × 7 días</strong>
          </span>
          <span>
            Ecuación de recurrencia: <MathFormula formula="T(n) = 2T(n/2) + O(n^2)" />
          </span>
          <span>
            Complejidad total:{' '}
            <strong className="text-rose-400">
              <MathFormula formula="\Theta(n^2)" />
            </strong>
          </span>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

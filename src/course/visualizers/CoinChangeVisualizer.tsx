import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import {
  COLUMNS,
  DENOMINATIONS,
  FULL_MATRIX,
  STEPS,
  StepData,
} from './coinChangeData';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

type CellVisualState = 'finalSource' | 'current' | 'source' | 'calculated' | 'empty';

const CELL_STYLE_LOOKUP: Record<CellVisualState, string> = {
  finalSource:
    'bg-emerald-600/30 text-emerald-200 font-black border-2 border-emerald-400 scale-105',
  current:
    'bg-amber-400/30 text-amber-200 font-black border-2 border-amber-400 scale-110 shadow-lg',
  source: 'bg-cyan-500/20 text-cyan-200 font-bold border border-cyan-400',
  calculated: 'text-zinc-200 bg-zinc-900/60',
  empty: 'text-zinc-500 bg-transparent',
};

function resolveCellState(
  frame: StepData,
  currentStepIndex: number,
  r: number,
  c: number,
): CellVisualState {
  const isCalculated = currentStepIndex > 0 && currentStepIndex >= r * 9 + c + 1;
  const isCurrent = frame.row === r && frame.col === c;
  const isSource = (frame.sourceCells ?? []).some(([sr, sc]) => sr === r && sc === c);

  if (frame.isFinal && isSource) return 'finalSource';
  if (isCurrent) return 'current';
  if (isSource) return 'source';
  if (isCalculated) return 'calculated';
  return 'empty';
}

export function CoinChangeVisualizer() {
  const {
    currentStep: currentStepIndex,
    currentFrame,
    totalSteps,
    isPlaying,
    playbackSpeed,
    setCurrentStep,
    togglePlay,
    setPlaybackSpeed,
    resetPlayback,
  } = useVisualizerPlayback(STEPS);

  return (
    <AnimationPlayerShell
      title="Problema del Cambio de Monedas: Contraejemplo Canónico de Greedy y Solución DP"
      badge="Programación Dinámica"
      currentStep={currentStepIndex}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={currentFrame.description}
      onStepChange={setCurrentStep}
      onTogglePlay={togglePlay}
      onSpeedChange={setPlaybackSpeed}
      onReset={resetPlayback}
    >
      <div className="flex flex-col gap-3 py-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Denominaciones:</span>
            <div className="flex gap-1.5">
              {DENOMINATIONS.map((coin, idx) => (
                <span
                  key={coin}
                  className="rounded-lg bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 font-mono text-xs font-bold text-emerald-300"
                >
                  d{idx + 1} = ${coin}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-zinc-400">Objetivo:</span>
            <span className="rounded bg-amber-400/20 px-2 py-0.5 font-bold text-amber-300 border border-amber-400/40">
              V = $8
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-inner">
          <table className="w-full border-collapse text-center font-mono text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="p-2 text-left font-sans text-xs">Moneda \ Valor</th>
                {COLUMNS.map((col) => (
                  <th key={col} className="p-2 text-zinc-300">
                    ${col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DENOMINATIONS.map((coin, rowIdx) => (
                <tr key={rowIdx} className="border-b border-zinc-800/80">
                  <td className="p-2 text-left font-bold text-white bg-emerald-950/60 border-r border-emerald-900 font-sans">
                    d{rowIdx + 1} = ${coin}
                  </td>
                  {COLUMNS.map((col) => {
                    const state = resolveCellState(currentFrame, currentStepIndex, rowIdx, col);
                    const calculated = state !== 'empty';
                    const cellValue = calculated ? FULL_MATRIX[rowIdx][col] : '';

                    return (
                      <td
                        key={col}
                        className={`p-2 transition-all duration-200 ${CELL_STYLE_LOOKUP[state]}`}
                      >
                        {cellValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-300 border-t border-zinc-800/80 pt-2">
          <span>Recurrencia: M[i, j] = min(M[i-1, j], 1 + M[i, j - di])</span>
          <span className="text-emerald-300 font-bold">
            {currentFrame.isFinal
              ? 'Óptimo Global Reconstruido: {4, 4} (2 monedas)'
              : `Paso ${currentStepIndex} de ${STEPS.length - 1}`}
          </span>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

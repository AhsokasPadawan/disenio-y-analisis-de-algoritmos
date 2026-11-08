import { Award, RotateCcw } from 'lucide-react';
import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import {
  LIS_STEPS,
  PHASE_BADGE_STYLES,
  X_ARRAY,
} from './lisData';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

export function LisVisualizer() {
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
  } = useVisualizerPlayback(LIS_STEPS);

  const phaseStyle = PHASE_BADGE_STYLES[frame.phase];

  return (
    <AnimationPlayerShell
      title="Subsecuencia Creciente Más Larga (LIS): Matriz D[2, n] y Punteros Predecesores"
      badge="Programación Dinámica · Esquema de Cátedra UADE"
      currentStep={currentStep}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={frame.description}
      onStepChange={setCurrentStep}
      onTogglePlay={togglePlay}
      onSpeedChange={setPlaybackSpeed}
      onReset={resetPlayback}
    >
      <div className="flex flex-col gap-2.5 py-1 w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-emerald-800/40 pb-1.5 text-xs">
          <span className="font-bold text-emerald-300">{frame.title}</span>
          <span
            className={`rounded px-2.5 py-0.5 font-mono text-[11px] font-bold border ${phaseStyle.bg} ${phaseStyle.border} ${phaseStyle.text}`}
          >
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
                  <span
                    className={`text-[10px] mt-0.5 ${
                      isSolution ? 'text-zinc-950 font-bold' : 'text-zinc-500'
                    }`}
                  >
                    [{idx}]
                  </span>
                  <div className="h-3 text-[9px] font-bold mt-0.5">
                    {isIPointer && !isSolution && (
                      <span className="text-amber-400">i</span>
                    )}
                    {isJPointer && !isSolution && (
                      <span className="text-sky-400">j</span>
                    )}
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
                    const isHighlight =
                      frame.highlightCell &&
                      frame.highlightCell.row === 0 &&
                      frame.highlightCell.col === idx;

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
                Desde k* con mayor D[0, k*]: 7 → 6 → 4 → 3 → 0 → -1. Se recuperan
                los valores en orden ascendente: <strong>[3, 4, 5, 7, 8]</strong>.
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

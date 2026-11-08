import { ArrowUp, ArrowUpLeft, Package, RotateCcw } from 'lucide-react';
import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import {
  FULL_MATRIX,
  ITEMS,
  KNAPSACK_STEPS,
  PHASE_BADGE_STYLES,
} from './knapsack01Data';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

export function Knapsack01Visualizer() {
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
  } = useVisualizerPlayback(KNAPSACK_STEPS);

  const phaseStyle = PHASE_BADGE_STYLES[frame.phase];

  const isBacktrackCell = (r: number, c: number): boolean => {
    return frame.backtrackPath.some(([row, col]) => row === r && col === c);
  };

  const isCellVisible = (r: number, c: number): boolean => {
    if (r < frame.visibleUpToRow) return true;
    if (r === frame.visibleUpToRow && c <= frame.visibleUpToCol) return true;
    return false;
  };

  return (
    <AnimationPlayerShell
      title="Mochila 0-1: Tabulación Inductiva de Bellman y Backtracking Inverso"
      badge="Programación Dinámica · Bellman O(n · W)"
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ITEMS.map((item) => {
            const isSelected = frame.selectedItemIds.includes(item.id);
            const isCurrentInStep =
              frame.highlightCell && frame.highlightCell[0] === item.id;

            return (
              <div
                key={item.id}
                className={`flex flex-col rounded-xl border p-2 font-mono text-xs transition-all duration-300 ${
                  isSelected
                    ? 'border-amber-400 bg-amber-950/80 text-white shadow-md ring-1 ring-amber-400 scale-[1.02]'
                    : isCurrentInStep
                    ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200'
                    : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-emerald-400" />
                    {item.name}
                  </span>
                  {isSelected && (
                    <span className="rounded bg-amber-400 text-zinc-950 px-1.5 py-0.2 text-[9px] font-black uppercase">
                      Elegido
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span>
                    Peso: <strong className="text-zinc-200">{item.weight}</strong>
                  </span>
                  <span>
                    Valor:{' '}
                    <strong className="text-emerald-300">${item.value}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1 mb-2 text-[11px] font-mono text-zinc-400">
              <span className="font-bold text-zinc-200">
                Matriz V[0..4, 0..7] (Capacidad W = 7)
              </span>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="flex items-center gap-1 text-sky-300">
                  <span className="w-2 h-2 rounded bg-sky-500" /> V[i-1, w] (Arriba)
                </span>
                <span className="flex items-center gap-1 text-purple-300">
                  <span className="w-2 h-2 rounded bg-purple-500" /> V[i-1, w-p]+v
                </span>
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="w-2 h-2 rounded bg-amber-400" /> Backtrack
                </span>
              </div>
            </div>

            <table className="w-full border-collapse text-center text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                  <th className="p-1.5 text-left">Objeto \ Cap. (w)</th>
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((w) => (
                    <th key={w} className="p-1.5 font-bold text-zinc-300">
                      {w}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FULL_MATRIX.map((row, rIdx) => {
                  const item = rIdx > 0 ? ITEMS[rIdx - 1] : null;

                  return (
                    <tr key={rIdx} className="border-b border-zinc-900">
                      <td className="p-1 text-left font-bold border-r border-zinc-800 text-[11px] whitespace-nowrap">
                        {rIdx === 0 ? (
                          <span className="text-zinc-500">i=0 (Base)</span>
                        ) : (
                          <span
                            className={
                              item && frame.selectedItemIds.includes(item.id)
                                ? 'text-amber-300 font-black'
                                : 'text-zinc-300'
                            }
                          >
                            {item?.name} (p={item?.weight}, v={item?.value})
                          </span>
                        )}
                      </td>
                      {row.map((val, cIdx) => {
                        const visible = isCellVisible(rIdx, cIdx);
                        const isHighlight =
                          frame.highlightCell &&
                          frame.highlightCell[0] === rIdx &&
                          frame.highlightCell[1] === cIdx;
                        const isWithout =
                          frame.withoutCell &&
                          frame.withoutCell[0] === rIdx &&
                          frame.withoutCell[1] === cIdx;
                        const isWith =
                          frame.withCell &&
                          frame.withCell[0] === rIdx &&
                          frame.withCell[1] === cIdx;
                        const isBacktrack = isBacktrackCell(rIdx, cIdx);

                        return (
                          <td
                            key={cIdx}
                            className={`p-1.5 font-mono text-xs font-bold transition-all duration-300 rounded ${
                              !visible
                                ? 'text-zinc-800 bg-zinc-950/40'
                                : isBacktrack
                                ? 'bg-amber-400 text-zinc-950 font-black scale-105 shadow-md ring-1 ring-amber-300'
                                : isHighlight
                                ? 'bg-emerald-500 text-zinc-950 font-black scale-105 shadow-md'
                                : isWithout
                                ? 'bg-sky-950 border border-sky-500 text-sky-200'
                                : isWith
                                ? 'bg-purple-950 border border-purple-500 text-purple-200'
                                : 'text-zinc-300 bg-zinc-900/40'
                            }`}
                          >
                            {visible ? val : '·'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {frame.formulaComparison && (
              <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl font-mono text-xs">
                <span className="text-[11px] font-bold text-zinc-300 border-b border-zinc-800 pb-1 flex items-center gap-1">
                  <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
                  Ecuación de Bellman en Celda Actual:
                </span>
                <div className="flex flex-col gap-1 mt-1 text-[11px]">
                  <div
                    className={`flex items-center justify-between p-1 rounded border ${
                      frame.formulaComparison.winner === 'without'
                        ? 'border-sky-500 bg-sky-950/80 text-sky-200 font-bold'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <ArrowUp className="w-3 h-3 text-sky-400" />
                      Sin Objeto V[i-1, w]:
                    </span>
                    <strong>{frame.formulaComparison.withoutVal}</strong>
                  </div>
                  <div
                    className={`flex items-center justify-between p-1 rounded border ${
                      frame.formulaComparison.winner === 'with'
                        ? 'border-purple-500 bg-purple-950/80 text-purple-200 font-bold'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <ArrowUpLeft className="w-3 h-3 text-purple-400" />
                      Con Objeto V[i-1, w-p] + v:
                    </span>
                    <strong>{frame.formulaComparison.withVal}</strong>
                  </div>
                </div>
                <div className="border-t border-zinc-800 pt-1 text-[10px] text-emerald-300 font-bold text-center">
                  max({frame.formulaComparison.withoutVal},{' '}
                  {frame.formulaComparison.withVal}) ={' '}
                  {Math.max(
                    frame.formulaComparison.withoutVal,
                    frame.formulaComparison.withVal,
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Capacidad Mochila (W):</span>
                <strong className="text-white font-bold">7</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Peso Acumulado Seleccionado:</span>
                <strong className="text-amber-300 font-bold">
                  {frame.selectedItemIds.reduce(
                    (sum, id) =>
                      sum + (ITEMS.find((it) => it.id === id)?.weight ?? 0),
                    0,
                  )}{' '}
                  / 7
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Valor Óptimo Obtenido:</span>
                <strong className="text-emerald-300 font-bold">
                  $
                  {frame.selectedItemIds.reduce(
                    (sum, id) =>
                      sum + (ITEMS.find((it) => it.id === id)?.value ?? 0),
                    0,
                  )}
                </strong>
              </div>
              <div className="border-t border-zinc-800 pt-1 flex items-center justify-between">
                <span className="text-zinc-400">Objetos Óptimos:</span>
                <span className="text-white font-black">
                  {frame.selectedItemIds.length > 0
                    ? `{ ${frame.selectedItemIds.map((id) => `Obj ${id}`).join(', ')} }`
                    : 'En exploración...'}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-800/30 bg-emerald-950/20 p-2 text-[10px] text-zinc-300 flex flex-col gap-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-amber-400" />
                Criterio de Reconstrucción Inversa:
              </span>
              <span>
                Si V[i, w] ≠ V[i-1, w] → El objeto i está en la solución óptima. Se
                resta p_i de w y se continúa desde V[i-1, w - p_i].
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

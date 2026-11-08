import { Award, Split } from 'lucide-react';
import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import {
  DIM_ARRAY,
  MATRICES,
  MATRIX_CHAIN_STEPS,
} from './matrixChainData';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

export function MatrixChainVisualizer() {
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
  } = useVisualizerPlayback(MATRIX_CHAIN_STEPS);

  return (
    <AnimationPlayerShell
      title="Multiplicación Encadenada de Matrices: Llenado Diagonal M[i, j] y Matriz de Cortes S[i, j]"
      badge="Programación Dinámica · Orden Diagonal Θ(n³)"
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
        <div className="flex flex-wrap items-center justify-between border-b border-amber-800/40 pb-1.5 text-xs">
          <span className="font-bold text-amber-300">{frame.title}</span>
          <span className="rounded px-2.5 py-0.5 font-mono text-[11px] font-bold border bg-amber-950/70 border-amber-600/60 text-amber-300">
            {frame.badge}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400">Matrices:</span>
            {MATRICES.map((mat, idx) => (
              <span
                key={idx}
                className="rounded bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-zinc-200"
              >
                <strong>{mat.name}</strong> ({mat.rows}x{mat.cols})
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">Vector d:</span>
            <span className="rounded bg-sky-950 border border-sky-600 px-2 py-0.5 font-bold text-sky-200">
              [{DIM_ARRAY.join(', ')}]
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          <div className="lg:col-span-4 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 border-b border-zinc-800 pb-1">
              Matriz M[1..4, 1..4] (Costo Escalar)
            </span>
            <table className="w-full border-collapse text-center text-xs font-mono my-2">
              <thead>
                <tr className="text-zinc-400 text-[11px] border-b border-zinc-800">
                  <th className="p-1 text-left">i\j</th>
                  <th>A₁</th>
                  <th>A₂</th>
                  <th>A₃</th>
                  <th>A₄</th>
                </tr>
              </thead>
              <tbody>
                {frame.revealedM.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-zinc-900">
                    <td className="p-1 font-bold text-zinc-400 border-r border-zinc-800">
                      A{rIdx + 1}
                    </td>
                    {row.map((val, cIdx) => {
                      const isActive =
                        frame.activeCell &&
                        frame.activeCell[0] === rIdx &&
                        frame.activeCell[1] === cIdx;
                      const isUnused = rIdx > cIdx;

                      return (
                        <td
                          key={cIdx}
                          className={`p-1.5 font-bold transition-all duration-300 rounded ${
                            isUnused
                              ? 'text-zinc-800 bg-zinc-950/20'
                              : isActive
                              ? 'bg-amber-400 text-zinc-950 font-black scale-105 shadow-md'
                              : val !== null
                              ? 'text-amber-300 bg-amber-950/30'
                              : 'text-zinc-700 bg-zinc-900/20'
                          }`}
                        >
                          {isUnused ? '—' : val !== null ? val : '·'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-[10px] text-zinc-400 text-center">
              Llenado diagonal: L = 1 → 2 → 3 → 4
            </div>
          </div>

          <div className="lg:col-span-4 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-sky-400 border-b border-zinc-800 pb-1 flex items-center justify-between">
              <span>Matriz S[1..4, 1..4] (Corte Óptimo k*)</span>
              <Split className="w-3.5 h-3.5 text-sky-400" />
            </span>
            <table className="w-full border-collapse text-center text-xs font-mono my-2">
              <thead>
                <tr className="text-zinc-400 text-[11px] border-b border-zinc-800">
                  <th className="p-1 text-left">i\j</th>
                  <th>A₁</th>
                  <th>A₂</th>
                  <th>A₃</th>
                  <th>A₄</th>
                </tr>
              </thead>
              <tbody>
                {frame.revealedS.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-zinc-900">
                    <td className="p-1 font-bold text-zinc-400 border-r border-zinc-800">
                      A{rIdx + 1}
                    </td>
                    {row.map((val, cIdx) => {
                      const isActive =
                        frame.activeCell &&
                        frame.activeCell[0] === rIdx &&
                        frame.activeCell[1] === cIdx;
                      const isUnused = rIdx >= cIdx;

                      return (
                        <td
                          key={cIdx}
                          className={`p-1.5 font-bold transition-all duration-300 rounded ${
                            isUnused
                              ? 'text-zinc-800 bg-zinc-950/20'
                              : isActive
                              ? 'bg-sky-400 text-zinc-950 font-black scale-105 shadow-md'
                              : val !== null
                              ? 'text-sky-300 bg-sky-950/30'
                              : 'text-zinc-700 bg-zinc-900/20'
                          }`}
                        >
                          {isUnused ? '—' : val !== null ? `k=${val}` : '·'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-[10px] text-zinc-400 text-center">
              Guarda el índice donde se divide la cadena
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2">
            {frame.candidates && frame.candidates.length > 0 && (
              <div className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2 font-mono text-xs shadow-xl">
                <span className="text-[11px] font-bold text-zinc-300 border-b border-zinc-800 pb-0.5">
                  Evaluación de Cortes k ∈ [i, j-1]:
                </span>
                <div className="flex flex-col gap-1 mt-1">
                  {frame.candidates.map((cand) => (
                    <div
                      key={cand.k}
                      className={`flex flex-col p-1 rounded border text-[10px] ${
                        cand.isMin
                          ? 'border-amber-500 bg-amber-950/80 text-amber-200 font-bold'
                          : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>Corte k = {cand.k}</span>
                        <span>
                          Total: <strong>{cand.totalCost}</strong>
                        </span>
                      </div>
                      <span className="text-[9.5px] text-zinc-400 mt-0.5">
                        {cand.formulaText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 font-mono shadow-xl">
              <span className="text-[11px] font-bold text-amber-400 border-b border-zinc-800 pb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Parentización Óptima:
              </span>
              <div className="py-1 text-center font-bold text-sm text-amber-300">
                {frame.reconstructedParens ?? 'Calculando cadenas...'}
              </div>
              <div className="text-[11px] text-zinc-400 flex justify-between border-t border-zinc-800 pt-1">
                <span>Costo Mínimo Final:</span>
                <strong className="text-amber-300">57 multiplicaciones</strong>
              </div>
            </div>

            <div className="rounded-xl border border-amber-800/30 bg-amber-950/20 p-2 text-[10px] text-zinc-300 flex flex-col gap-1">
              <span className="font-bold text-amber-400">Ahorro Asintótico:</span>
              <span>
                Multiplicación ingenua: hasta 230 operaciones. Con DP diagonal: 57
                operaciones (ahorro del 75.2%).
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

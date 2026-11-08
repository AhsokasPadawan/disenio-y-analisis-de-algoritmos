import { RotateCcw, Sparkles } from 'lucide-react';
import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import {
  ARROW_SYMBOLS,
  LCS_STEPS,
  LCS_TABLE,
  PHASE_BADGE_STYLES,
  X_SEQ,
  Y_SEQ,
} from './lcsData';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

export function LcsVisualizer() {
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
  } = useVisualizerPlayback(LCS_STEPS);

  const phaseStyle = PHASE_BADGE_STYLES[frame.phase];

  const isBacktrackCell = (r: number, c: number): boolean => {
    return frame.backtrackPath.some(([row, col]) => row === r && col === c);
  };

  return (
    <AnimationPlayerShell
      title="Subsecuencia Común Más Larga (LCS): Matriz C[i, j] y Punteros ↖, ↑, ←"
      badge="Programación Dinámica · Tabulación Θ(m · n)"
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
      <div className="flex flex-col gap-2 py-1 w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-emerald-800/40 pb-1.5 text-xs">
          <span className="font-bold text-emerald-300">{frame.title}</span>
          <span
            className={`rounded px-2.5 py-0.5 font-mono text-[11px] font-bold border ${phaseStyle.bg} ${phaseStyle.border} ${phaseStyle.text}`}
          >
            {frame.badge}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Cadena X (filas):</span>
            <div className="flex gap-1">
              {X_SEQ.map((ch, idx) => {
                const isCurrentX =
                  frame.focusCell && frame.focusCell[0] === idx + 1;
                return (
                  <span
                    key={idx}
                    className={`rounded px-1.5 py-0.5 font-bold transition-all ${
                      isCurrentX
                        ? 'bg-amber-400 text-zinc-950 ring-1 ring-amber-300'
                        : 'bg-sky-950/80 border border-sky-600/60 text-sky-200'
                    }`}
                  >
                    {ch}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Cadena Y (columnas):</span>
            <div className="flex gap-1">
              {Y_SEQ.map((ch, idx) => {
                const isCurrentY =
                  frame.focusCell && frame.focusCell[1] === idx + 1;
                return (
                  <span
                    key={idx}
                    className={`rounded px-1.5 py-0.5 font-bold transition-all ${
                      isCurrentY
                        ? 'bg-amber-400 text-zinc-950 ring-1 ring-amber-300'
                        : 'bg-emerald-950/80 border border-emerald-600/60 text-emerald-200'
                    }`}
                  >
                    {ch}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/90 p-2 shadow-xl flex justify-center">
            <table className="border-collapse text-center text-[11px] font-mono select-none">
              <thead>
                <tr>
                  <th className="p-1 text-zinc-500">i\j</th>
                  <th className="p-1 text-zinc-500">∅</th>
                  {Y_SEQ.map((charY, colIdx) => {
                    const isFocus =
                      frame.focusCell && frame.focusCell[1] === colIdx + 1;
                    return (
                      <th
                        key={colIdx}
                        className={`p-1 font-bold ${
                          isFocus
                            ? 'text-amber-300 bg-amber-950/40 rounded'
                            : 'text-emerald-400'
                        }`}
                      >
                        {charY}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {LCS_TABLE.map((row, rIdx) => {
                  const charX = rIdx > 0 ? X_SEQ[rIdx - 1] : '∅';
                  const isFocusRow = frame.focusCell && frame.focusCell[0] === rIdx;

                  return (
                    <tr key={rIdx}>
                      <td
                        className={`p-1 font-bold border-r border-zinc-800 ${
                          isFocusRow
                            ? 'text-amber-300 bg-amber-950/40 rounded'
                            : 'text-sky-300'
                        }`}
                      >
                        {charX}
                      </td>
                      {row.map((cell, cIdx) => {
                        const isFocus =
                          frame.focusCell &&
                          frame.focusCell[0] === rIdx &&
                          frame.focusCell[1] === cIdx;
                        const isBacktrack = isBacktrackCell(rIdx, cIdx);
                        const isDiag = cell.dir === 'diag';

                        return (
                          <td
                            key={cIdx}
                            className={`p-1 font-mono transition-all duration-200 rounded min-w-[34px] ${
                              isBacktrack
                                ? 'bg-amber-400 text-zinc-950 font-black scale-105 shadow-md ring-1 ring-amber-300'
                                : isFocus
                                ? 'bg-emerald-500 text-zinc-950 font-black scale-105 shadow-md'
                                : isDiag && cell.val > 0
                                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50'
                                : 'text-zinc-300 bg-zinc-900/30'
                            }`}
                          >
                            <span className="font-bold">{cell.val}</span>
                            {cell.dir !== 'none' && (
                              <span
                                className={`text-[10px] ml-0.5 ${
                                  isBacktrack
                                    ? 'text-zinc-950 font-black'
                                    : isDiag
                                    ? 'text-emerald-400 font-bold'
                                    : 'text-zinc-500'
                                }`}
                              >
                                {ARROW_SYMBOLS[cell.dir]}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2">
            {frame.comparison && (
              <div className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2 font-mono text-xs shadow-xl">
                <span className="text-[11px] font-bold text-zinc-300 border-b border-zinc-800 pb-0.5">
                  Comparación de Caracteres:
                </span>
                <div className="flex items-center justify-between text-[11px] mt-1">
                  <span>
                    X[{frame.focusCell ? frame.focusCell[0] - 1 : 0}]:{' '}
                    <strong className="text-sky-300">
                      {frame.comparison.charX}
                    </strong>
                  </span>
                  <span>vs</span>
                  <span>
                    Y[{frame.focusCell ? frame.focusCell[1] - 1 : 0}]:{' '}
                    <strong className="text-emerald-300">
                      {frame.comparison.charY}
                    </strong>
                  </span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      frame.comparison.match
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {frame.comparison.match ? '¡COINCIDEN!' : 'Difieren'}
                  </span>
                </div>
                <div className="text-[10.5px] text-zinc-300 font-semibold mt-1">
                  {frame.comparison.details}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 font-mono shadow-xl">
              <span className="text-[11px] font-bold text-emerald-400 border-b border-zinc-800 pb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Subsecuencia Reconstruida (Reversa):
              </span>
              <div className="flex items-center justify-center gap-1.5 py-1">
                {frame.reconstructedChars.length > 0 ? (
                  frame.reconstructedChars.map((ch, idx) => (
                    <span
                      key={idx}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950 font-black text-xs shadow-md"
                    >
                      {ch}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-zinc-500 py-1">
                    Pendiente de backtracking...
                  </span>
                )}
              </div>
              <div className="text-[11px] text-zinc-400 flex justify-between border-t border-zinc-800 pt-1">
                <span>Longitud LCS actual:</span>
                <strong className="text-emerald-300">
                  {frame.reconstructedChars.length} / 4
                </strong>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-800/30 bg-emerald-950/20 p-2 text-[10px] text-zinc-300 flex flex-col gap-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-amber-400" />
                Regla de Reconstrucción:
              </span>
              <span>
                • Flecha ↖: carácter común; agregarlo y saltar a (i-1, j-1).
                <br />
                • Flecha ↑: saltar a (i-1, j) sin agregar carácter.
                <br />
                • Flecha ←: saltar a (i, j-1) sin agregar carácter.
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

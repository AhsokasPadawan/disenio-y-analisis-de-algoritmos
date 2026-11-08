import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import {
  ALPHABETA_STEPS,
  TREE_EDGES,
  TREE_NODES,
} from './minMaxAlphaBetaData';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

export function MinMaxAlphaBetaVisualizer() {
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
  } = useVisualizerPlayback(ALPHABETA_STEPS);

  const formatBound = (val: number): string => {
    if (val === -Infinity) return '-∞';
    if (val === Infinity) return '+∞';
    return String(val);
  };

  return (
    <AnimationPlayerShell
      title="Árbol de Juegos con Min-Max y Poda Alfa-Beta (Cátedra UADE)"
      badge="Teoría de Juegos"
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
        <div className="flex items-center justify-between border-b border-zinc-800 pb-1 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-sans font-semibold">
              Nodo Activo:
            </span>
            <span className="rounded-md bg-amber-400 text-zinc-950 px-2 py-0.5 font-bold shadow-xs">
              {frame.activeNode} ({TREE_NODES[frame.activeNode]?.kind ?? 'MAX'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-sky-950 border border-sky-600/60 px-2 py-0.5 text-sky-300">
              α = <strong>{formatBound(frame.alpha)}</strong>
            </span>
            <span className="rounded bg-rose-950 border border-rose-600/60 px-2 py-0.5 text-rose-300">
              β = <strong>{formatBound(frame.beta)}</strong>
            </span>
            {frame.cutReason && (
              <span className="rounded bg-rose-600 text-white px-2 py-0.5 font-bold animate-pulse text-[11px]">
                ✂ {frame.cutReason}
              </span>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-inner">
          <svg
            viewBox="0 0 500 215"
            className="mx-auto block h-36 sm:h-40 md:h-44 w-full max-w-[480px]"
          >
            {TREE_EDGES.map(([u, v], idx) => {
              const uCoord = TREE_NODES[u];
              const vCoord = TREE_NODES[v];
              if (!uCoord || !vCoord) return null;

              const isPruned = frame.prunedEdges.some(
                ([pu, pv]) => pu === u && pv === v,
              );
              const isActiveEdge = frame.activeNode === v || frame.activeNode === u;

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={uCoord.x}
                    y1={uCoord.y}
                    x2={vCoord.x}
                    y2={vCoord.y}
                    stroke={
                      isPruned ? '#ef4444' : isActiveEdge ? '#f59e0b' : '#3f3f46'
                    }
                    strokeWidth={isPruned ? '1.5' : isActiveEdge ? '2' : '1'}
                    strokeDasharray={isPruned ? '4 3' : undefined}
                    opacity={isPruned ? 0.6 : 1}
                  />
                  {isPruned && (
                    <text
                      x={(uCoord.x + vCoord.x) / 2}
                      y={(uCoord.y + vCoord.y) / 2}
                      fill="#ef4444"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ✂
                    </text>
                  )}
                </g>
              );
            })}

            {Object.entries(TREE_NODES).map(([key, node]) => {
              const isPruned = frame.prunedNodes.includes(key);
              const isActive = frame.activeNode === key;
              const isEvaluated =
                frame.evaluatedLeaves.includes(key) ||
                frame.nodeValues[key] !== undefined;
              const nodeVal = frame.nodeValues[key];

              if (node.kind === 'LEAF') {
                return (
                  <g key={key} className="transition-all duration-200">
                    <rect
                      x={node.x - 12}
                      y={node.y - 10}
                      width="24"
                      height="20"
                      rx="4"
                      fill={
                        isPruned
                          ? '#450a0a'
                          : isEvaluated
                          ? '#4c1d95'
                          : '#27272a'
                      }
                      stroke={
                        isPruned
                          ? '#dc2626'
                          : isEvaluated
                          ? '#a78bfa'
                          : '#52525b'
                      }
                      strokeWidth={isPruned ? '1.5' : '1'}
                      strokeDasharray={isPruned ? '2 2' : undefined}
                      opacity={isPruned ? 0.5 : 1}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      fill={
                        isPruned
                          ? '#f87171'
                          : isEvaluated
                          ? '#ddd6fe'
                          : '#d4d4d8'
                      }
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      textDecoration={isPruned ? 'line-through' : undefined}
                    >
                      {node.val}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 19}
                      fill={isPruned ? '#ef4444' : '#71717a'}
                      fontSize="8"
                      fontWeight="semibold"
                      textAnchor="middle"
                    >
                      {isPruned ? 'Poda' : node.label}
                    </text>
                  </g>
                );
              }

              const isMax = node.kind === 'MAX';

              return (
                <g key={key} className="transition-all duration-200">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="14"
                    fill={
                      isPruned
                        ? '#450a0a'
                        : isActive
                        ? '#f59e0b'
                        : nodeVal !== undefined
                        ? isMax
                          ? '#0284c7'
                          : '#be123c'
                        : '#27272a'
                    }
                    stroke={
                      isPruned
                        ? '#dc2626'
                        : isActive
                        ? '#fbbf24'
                        : nodeVal !== undefined
                        ? isMax
                          ? '#38bdf8'
                          : '#fb7185'
                        : '#52525b'
                    }
                    strokeWidth={isActive ? '2.5' : '1.5'}
                    strokeDasharray={isPruned ? '3 2' : undefined}
                    opacity={isPruned ? 0.4 : 1}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    fill={isActive ? '#18181b' : '#ffffff'}
                    fontSize="10"
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    {nodeVal !== undefined ? nodeVal : key}
                  </text>
                  <text
                    x={node.x}
                    y={node.y - 17}
                    fill={isPruned ? '#ef4444' : isMax ? '#38bdf8' : '#fb7185'}
                    fontSize="8"
                    fontWeight="extrabold"
                    textAnchor="middle"
                  >
                    {isPruned ? '✂' : isMax ? '▲ MAX' : '▼ MIN'}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="flex-1 flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 text-xs font-mono">
            <span className="text-[11px] font-sans font-bold text-zinc-300">
              Regla Matemática de Corte:
            </span>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-rose-400 font-bold">β ≤ α:</span>
              <span>
                Corte inmediato del subárbol hermano. El ancestro nunca descenderá
                por una alternativa peor.
              </span>
            </div>
            <div className="flex items-center gap-4 mt-1 text-[11px]">
              <span>
                Hojas Evaluadas:{' '}
                <strong className="text-violet-300">
                  {frame.evaluatedLeaves.length} / 8
                </strong>
              </span>
              <span>
                Hojas Ahorradas:{' '}
                <strong className="text-rose-400">
                  {frame.prunedNodes.length} (37.5%)
                </strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 min-w-[210px] text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-zinc-400">Poda en Nodo E:</span>
              <span className="text-rose-400 font-bold">Hoja K=9 cortada</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Poda en Nodo C:</span>
              <span className="text-rose-400 font-bold">Subárbol G cortado</span>
            </div>
            <div className="flex justify-between border-t border-zinc-800 pt-1 mt-0.5">
              <span className="text-zinc-300 font-bold">Valor Raíz A:</span>
              <strong className="text-amber-300 font-black text-xs">5</strong>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

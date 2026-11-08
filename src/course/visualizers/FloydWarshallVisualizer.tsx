import { Network } from 'lucide-react';
import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import {
  FW_STEPS,
  GRAPH_EDGES,
  GRAPH_NODES,
} from './floydWarshallData';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

export function FloydWarshallVisualizer() {
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
  } = useVisualizerPlayback(FW_STEPS);

  const isUpdated = (r: number, c: number): boolean => {
    return frame.updatedCells.some(([row, col]) => row === r && col === c);
  };

  const isEdgeInActivePath = (u: number, v: number): boolean => {
    if (!frame.activePath) return false;
    return frame.activePath.some(([pu, pv]) => pu === u && pv === v);
  };

  return (
    <AnimationPlayerShell
      title="Algoritmo de Floyd-Warshall: Todos los Pares de Caminos Mínimos y Nodo Pivote k"
      badge="Programación Dinámica · Relajación Matricial In-Place Θ(|V|³)"
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
          <span className="rounded px-2.5 py-0.5 font-mono text-[11px] font-bold border bg-emerald-950/70 border-emerald-600/60 text-emerald-300">
            {frame.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          <div className="lg:col-span-6 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1 mb-2 text-xs font-mono">
              <span className="font-bold text-zinc-200">
                Matriz de Distancias A{frame.k !== null ? `⁽${frame.k}⁾` : ''}
              </span>
              {frame.k !== null && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-600/60 px-2 py-0.5 rounded">
                  Pivote k = {frame.k}
                </span>
              )}
            </div>

            <table className="w-full border-collapse text-center text-xs font-mono my-1">
              <thead>
                <tr className="text-zinc-400 text-[11px] border-b border-zinc-800">
                  <th className="p-1 text-left">i\j</th>
                  {[0, 1, 2, 3].map((node) => (
                    <th
                      key={node}
                      className={`p-1 font-bold ${
                        frame.highlightedCol === node
                          ? 'text-amber-300 bg-amber-950/40 rounded'
                          : 'text-zinc-300'
                      }`}
                    >
                      Nodo {node}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {frame.matrix.map((row, rIdx) => {
                  const isPivotRow = frame.highlightedRow === rIdx;

                  return (
                    <tr
                      key={rIdx}
                      className={`border-b border-zinc-900 ${
                        isPivotRow ? 'bg-amber-950/20' : ''
                      }`}
                    >
                      <td
                        className={`p-1.5 text-left font-bold border-r border-zinc-800 ${
                          isPivotRow ? 'text-amber-300 font-black' : 'text-zinc-400'
                        }`}
                      >
                        Nodo {rIdx}
                      </td>
                      {row.map((val, cIdx) => {
                        const cellUpdated = isUpdated(rIdx, cIdx);
                        const isPivotCol = frame.highlightedCol === cIdx;

                        return (
                          <td
                            key={cIdx}
                            className={`p-1.5 font-bold transition-all duration-300 rounded ${
                              cellUpdated
                                ? 'bg-emerald-500 text-zinc-950 font-black scale-105 shadow-md ring-1 ring-emerald-300'
                                : (isPivotRow || isPivotCol) && val !== 'inf'
                                ? 'bg-amber-950/30 text-amber-200'
                                : val === 'inf'
                                ? 'text-zinc-600'
                                : 'text-zinc-300'
                            }`}
                          >
                            {val === 'inf' ? '∞' : val}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="text-[10px] text-zinc-400 flex items-center justify-between border-t border-zinc-800/80 pt-1.5 mt-1">
              <span>Fila {frame.k ?? 'k'} y Columna {frame.k ?? 'k'}: Invariantes</span>
              <span className="text-emerald-300 font-bold">
                Relajación: A[i, j] = min(A[i, j], A[i, k] + A[k, j])
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1 mb-1 text-xs font-mono">
              <span className="flex items-center gap-1.5 font-bold text-zinc-200">
                <Network className="w-3.5 h-3.5 text-emerald-400" />
                Grafo Topológico Sincronizado
              </span>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Nodo Pivote k
                </span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Desvío Puente
                </span>
              </div>
            </div>

            <div className="w-full flex justify-center py-1">
              <svg viewBox="0 0 300 220" className="w-full max-w-[280px] h-auto select-none">
                <defs>
                  <marker
                    id="fw-arrow"
                    viewBox="0 0 10 10"
                    refX="18"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#52525b" />
                  </marker>
                  <marker
                    id="fw-arrow-active"
                    viewBox="0 0 10 10"
                    refX="18"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                  </marker>
                </defs>

                {GRAPH_EDGES.map((edge, idx) => {
                  const uNode = GRAPH_NODES[edge.u];
                  const vNode = GRAPH_NODES[edge.v];
                  const isPath = isEdgeInActivePath(edge.u, edge.v);

                  const midX = (uNode.x + vNode.x) / 2;
                  const midY = (uNode.y + vNode.y) / 2;

                  return (
                    <g key={idx}>
                      <line
                        x1={uNode.x}
                        y1={uNode.y}
                        x2={vNode.x}
                        y2={vNode.y}
                        stroke={isPath ? '#10b981' : '#3f3f46'}
                        strokeWidth={isPath ? 2.5 : 1.2}
                        markerEnd={
                          isPath ? 'url(#fw-arrow-active)' : 'url(#fw-arrow)'
                        }
                        className="transition-all duration-300"
                      />
                      <rect
                        x={midX - 7}
                        y={midY - 6}
                        width="14"
                        height="12"
                        rx="2"
                        fill="#18181b"
                        stroke={isPath ? '#10b981' : '#3f3f46'}
                        strokeWidth="1"
                      />
                      <text
                        x={midX}
                        y={midY + 3}
                        fontSize="8px"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                        fill={isPath ? '#34d399' : '#a1a1aa'}
                      >
                        {edge.w}
                      </text>
                    </g>
                  );
                })}

                {GRAPH_NODES.map((node) => {
                  const isPivot = frame.k === node.id;

                  return (
                    <g key={node.id} className="transition-all duration-300">
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={15}
                        fill={isPivot ? '#f59e0b' : '#18181b'}
                        stroke={isPivot ? '#fbbf24' : '#52525b'}
                        strokeWidth={isPivot ? 3 : 1.5}
                      />
                      <text
                        x={node.x}
                        y={node.y + 4}
                        textAnchor="middle"
                        fontSize="11px"
                        fontWeight="900"
                        fontFamily="monospace"
                        fill={isPivot ? '#18181b' : '#f4f4f5'}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {frame.relaxation && (
              <div className="rounded-lg border border-emerald-800/40 bg-emerald-950/30 p-1.5 font-mono text-[10.5px] text-emerald-200">
                <div className="font-bold text-amber-300">
                  Desvío por Puente k = {frame.relaxation.k}:
                </div>
                <div>{frame.relaxation.description}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

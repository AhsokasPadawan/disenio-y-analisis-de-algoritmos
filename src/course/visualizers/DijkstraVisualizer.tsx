import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import { ANIMATION_SPECS_DATA } from '../data/animationSpecsData';
import {
  DijkstraFrame,
  DijkstraSpec,
  NODE_COORDS,
  STEP_DESCRIPTIONS,
} from './dijkstraData';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

export function DijkstraVisualizer() {
  const spec = ANIMATION_SPECS_DATA.DIJKSTRA_TRACE_WEHBE as DijkstraSpec;

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
  } = useVisualizerPlayback<DijkstraFrame>(spec.frames);

  const stepDescription =
    STEP_DESCRIPTIONS[currentStep] ?? `Paso ${frame.step}: Exploración de Dijkstra`;

  return (
    <AnimationPlayerShell
      title="Algoritmo de Dijkstra Paso a Paso"
      badge="Algoritmos Greedy"
      currentStep={currentStep}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={stepDescription}
      onStepChange={setCurrentStep}
      onTogglePlay={togglePlay}
      onSpeedChange={setPlaybackSpeed}
      onReset={resetPlayback}
    >
      <div className="h-full min-h-0 flex-1 flex flex-col justify-between items-center w-full gap-2.5 sm:gap-3">
        <div className="shrink-0 w-full flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-800/40 bg-zinc-950/80 p-2 sm:p-2.5">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 text-xs font-bold font-mono">
              Nodo Pivot Actual: {frame.selected_node}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Origen: <strong className="text-emerald-400">s = {spec.source}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Visitados: {frame.visited.length} / 6
            </span>
            <span className="flex items-center gap-1 text-zinc-400">
              Pendientes: {frame.pending.length}
            </span>
          </div>
        </div>

        <div className="flex-1 min-h-0 w-full flex flex-col lg:flex-row items-stretch justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0 min-h-0 h-full rounded-2xl border-2 border-emerald-800/50 bg-zinc-950/90 p-2 sm:p-3.5 shadow-2xl flex flex-col justify-between items-center overflow-hidden">
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-1.5 px-2 shrink-0">
              <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                Grafo Ponderado G = (V=6, E=10)
              </span>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="inline-block h-2.5 w-4 rounded-xs bg-emerald-500" />
                  Camino Mínimo
                </span>
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" />
                  Pivot Actual
                </span>
              </div>
            </div>

            <div className="w-full flex-1 min-h-0 flex items-center justify-center py-1">
              <svg viewBox="0 0 540 280" className="w-full h-full max-h-[350px] select-none">
                <defs>
                  <marker
                    id="dijkstra-arrow-gray"
                    viewBox="0 0 10 10"
                    refX="26"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#52525b" />
                  </marker>
                  <marker
                    id="dijkstra-arrow-green"
                    viewBox="0 0 10 10"
                    refX="27"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#10b981" />
                  </marker>
                </defs>

                {spec.edges.map((edge, idx) => {
                  const fromCoord = NODE_COORDS[edge.from];
                  const toCoord = NODE_COORDS[edge.to];
                  const isPrevEdge =
                    frame.prev[edge.to] === edge.from && frame.visited.includes(edge.to);

                  if (edge.from === 1 && edge.to === 4) {
                    return (
                      <g key={idx}>
                        <path
                          d="M 60 140 Q 270 295 480 140"
                          fill="none"
                          stroke={isPrevEdge ? '#10b981' : '#3f3f46'}
                          strokeWidth={isPrevEdge ? '3.5' : '1.5'}
                          strokeDasharray={isPrevEdge ? undefined : '4 3'}
                          markerEnd={
                            isPrevEdge
                              ? 'url(#dijkstra-arrow-green)'
                              : 'url(#dijkstra-arrow-gray)'
                          }
                        />
                        <circle
                          cx="270"
                          cy="256"
                          r="8.5"
                          fill="#18181b"
                          stroke={isPrevEdge ? '#10b981' : '#52525b'}
                          strokeWidth="1.5"
                        />
                        <text
                          x="270"
                          y="259.5"
                          fill={isPrevEdge ? '#34d399' : '#d4d4d8'}
                          fontSize="10"
                          fontWeight="black"
                          textAnchor="middle"
                        >
                          {edge.w}
                        </text>
                      </g>
                    );
                  }

                  const midX = (fromCoord.x + toCoord.x) / 2;
                  const midY = (fromCoord.y + toCoord.y) / 2;

                  return (
                    <g key={idx}>
                      <line
                        x1={fromCoord.x}
                        y1={fromCoord.y}
                        x2={toCoord.x}
                        y2={toCoord.y}
                        stroke={isPrevEdge ? '#10b981' : '#3f3f46'}
                        strokeWidth={isPrevEdge ? '3.5' : '1.5'}
                        strokeDasharray={isPrevEdge ? undefined : '4 3'}
                        markerEnd={
                          isPrevEdge
                            ? 'url(#dijkstra-arrow-green)'
                            : 'url(#dijkstra-arrow-gray)'
                        }
                      />
                      <circle
                        cx={midX}
                        cy={midY}
                        r="8.5"
                        fill="#18181b"
                        stroke={isPrevEdge ? '#10b981' : '#52525b'}
                        strokeWidth="1.5"
                      />
                      <text
                        x={midX}
                        y={midY + 3.5}
                        fill={isPrevEdge ? '#34d399' : '#d4d4d8'}
                        fontSize="10"
                        fontWeight="black"
                        textAnchor="middle"
                      >
                        {edge.w}
                      </text>
                    </g>
                  );
                })}

                {spec.nodes.map((node) => {
                  const coord = NODE_COORDS[node];
                  const isSelected = node === frame.selected_node;
                  const isVisited = frame.visited.includes(node);
                  const distVal = frame.dist[node];

                  return (
                    <g key={node} className="transition-all duration-300">
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="20"
                        fill={
                          isSelected
                            ? '#fbbf24'
                            : isVisited
                            ? '#059669'
                            : '#27272a'
                        }
                        stroke={
                          isSelected
                            ? '#f59e0b'
                            : isVisited
                            ? '#34d399'
                            : '#52525b'
                        }
                        strokeWidth={isSelected ? '3.5' : isVisited ? '2.5' : '1.5'}
                      />
                      <text
                        x={coord.x}
                        y={coord.y + 4.5}
                        fill={isSelected ? '#18181b' : '#ffffff'}
                        fontSize="13"
                        fontWeight="black"
                        textAnchor="middle"
                      >
                        {node}
                      </text>
                      <g>
                        <rect
                          x={coord.x - 22}
                          y={coord.y + 24}
                          width="44"
                          height="16"
                          rx="4"
                          fill="#18181b"
                          stroke={isVisited ? '#10b981' : '#3f3f46'}
                          strokeWidth="1"
                        />
                        <text
                          x={coord.x}
                          y={coord.y + 35.5}
                          fill={isVisited ? '#6ee7b7' : '#a1a1aa'}
                          fontSize="9.5"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          d={distVal === 'inf' ? '∞' : distVal}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-1.5 px-2 shrink-0">
              <span>Aristas continuas verdes = Árbol de Caminos Mínimos</span>
              <span className="text-emerald-400 font-bold">
                Relajación voraz: d[v] = min(d[v], d[u] + w(u,v))
              </span>
              <span>Costo a cada nodo finalizado</span>
            </div>
          </div>

          <div className="w-full lg:w-80 xl:w-96 shrink-0 min-h-0 h-full rounded-2xl border border-emerald-800/40 bg-zinc-950/80 p-3 sm:p-3.5 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
              <span className="text-xs font-bold font-sans uppercase tracking-wider text-emerald-400">
                Tabla de Distancias y Predecesores
              </span>
              <span className="text-xs font-mono text-zinc-400 font-bold">
                Paso {frame.step}
              </span>
            </div>

            <div className="flex-1 min-h-0 flex flex-col justify-between py-1">
              <table className="w-full border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-emerald-400 uppercase text-[11px]">
                    <th className="py-1.5 px-2 text-left">Nodo</th>
                    <th className="py-1.5 px-2 text-center">selec</th>
                    <th className="py-1.5 px-2 text-center">costo d[v]</th>
                    <th className="py-1.5 px-2 text-center">prev π[v]</th>
                    <th className="py-1.5 px-2 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {spec.nodes.map((node) => {
                    const isSelected = node === frame.selected_node;
                    const isVisited = frame.visited.includes(node);
                    const dist = frame.dist[node];
                    const prev = frame.prev[node];

                    return (
                      <tr
                        key={node}
                        className={`transition-colors border-b border-zinc-800/60 ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-200'
                            : isVisited
                            ? 'bg-emerald-950/30 text-emerald-100'
                            : 'text-zinc-400'
                        }`}
                      >
                        <td className="py-2 px-2 text-left font-bold">
                          <span
                            className={`inline-flex items-center justify-center h-6 w-6 rounded-full font-black text-xs ${
                              isSelected
                                ? 'bg-amber-400 text-zinc-950 shadow-xs'
                                : isVisited
                                ? 'bg-emerald-500 text-zinc-950'
                                : 'bg-zinc-800 text-zinc-300'
                            }`}
                          >
                            {node}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-center font-bold">
                          {isVisited ? (
                            <span className="rounded bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 px-1.5 py-0.5 text-[10px]">
                              true
                            </span>
                          ) : (
                            <span className="text-zinc-600 text-[10px]">false</span>
                          )}
                        </td>
                        <td
                          className={`py-2 px-2 text-center font-bold text-sm ${
                            dist === 'inf' ? 'text-zinc-500' : 'text-amber-300'
                          }`}
                        >
                          {dist === 'inf' ? '∞' : dist}
                        </td>
                        <td className="py-2 px-2 text-center text-sky-300 font-bold">
                          {prev ?? '-'}
                        </td>
                        <td className="py-2 px-2 text-center">
                          {isSelected ? (
                            <span className="rounded bg-amber-400 text-zinc-950 font-black px-1.5 py-0.5 text-[10px] shadow-xs">
                              PIVOT
                            </span>
                          ) : isVisited ? (
                            <span className="text-emerald-400 font-bold text-[10px]">
                              Cerrado
                            </span>
                          ) : (
                            <span className="text-zinc-500 text-[10px]">
                              Tentativo
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-white/10 pt-2 shrink-0 text-[11px] font-mono text-zinc-400 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span>Relajación activa:</span>
                <span className="text-amber-300 font-bold">d[u] + w(u, v) &lt; d[v]</span>
              </div>
              <p className="text-[10px] text-zinc-500">
                Al cerrar cada nodo pivot, su costo tentativo pasa a ser la distancia mínima definitiva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

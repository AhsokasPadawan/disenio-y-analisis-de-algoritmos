import { Database, Layers, Zap } from 'lucide-react';
import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import {
  ACTION_BADGE_STYLES,
  EDGE_VISUAL_STYLES,
  NODE_VISUAL_STYLES,
  STEPS,
  TREE_NODES,
} from './fibonacciMemoizationData';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

export function FibonacciMemoizationVisualizer() {
  const {
    currentStep,
    currentFrame: step,
    totalSteps,
    isPlaying,
    playbackSpeed,
    setCurrentStep,
    togglePlay,
    setPlaybackSpeed,
    resetPlayback,
  } = useVisualizerPlayback(STEPS);

  const badgeStyle = ACTION_BADGE_STYLES[step.actionType];

  return (
    <AnimationPlayerShell
      title="Árbol Recursivo Dinámico vs Tabla Caché Memoizada F(5)"
      badge="Programación Dinámica · Top-Down con Memoización"
      currentStep={currentStep}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={step.description}
      onStepChange={setCurrentStep}
      onTogglePlay={togglePlay}
      onSpeedChange={setPlaybackSpeed}
      onReset={resetPlayback}
    >
      <div className="flex flex-col gap-2.5 py-1 w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-emerald-800/40 pb-1.5 text-xs">
          <span className="font-bold text-emerald-300">{step.title}</span>
          <span
            className={`rounded px-2.5 py-0.5 font-mono text-[11px] font-bold border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text}`}
          >
            {step.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          <div className="lg:col-span-8 flex flex-col rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 mb-1.5 border-b border-zinc-800 pb-1">
              <span className="flex items-center gap-1.5 font-bold text-zinc-200">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Construcción Dinámica Pre-order (15 Nodos Teóricos)
              </span>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Llamada
                </span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Memoizado
                </span>
                <span className="flex items-center gap-1 text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> Cache Hit
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Poda ✂
                </span>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <svg viewBox="0 0 620 325" className="w-full max-w-[590px] h-auto select-none">
                {TREE_NODES.map((node) => {
                  if (!node.parent) return null;
                  const parentNode = TREE_NODES.find(
                    (candidate) => candidate.id === node.parent,
                  );
                  if (!parentNode) return null;

                  const nodeStatus = step.nodeStates[node.id] ?? 'hidden';
                  const parentStatus = step.nodeStates[parentNode.id] ?? 'hidden';
                  if (nodeStatus === 'hidden' || parentStatus === 'hidden') return null;

                  const edgeStyle = EDGE_VISUAL_STYLES[nodeStatus];

                  return (
                    <line
                      key={`${parentNode.id}-${node.id}`}
                      x1={parentNode.x}
                      y1={parentNode.y}
                      x2={node.x}
                      y2={node.y}
                      stroke={edgeStyle.stroke}
                      strokeWidth={
                        nodeStatus === 'calling' || nodeStatus === 'cache-hit' ? 2.5 : 1.5
                      }
                      strokeDasharray={edgeStyle.strokeDasharray}
                      opacity={edgeStyle.opacity}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {TREE_NODES.map((node) => {
                  const nodeStatus = step.nodeStates[node.id] ?? 'hidden';
                  const style = NODE_VISUAL_STYLES[nodeStatus];
                  if (!style.showInSvg) return null;

                  const radius =
                    node.id === 'f5' ? 19 : node.parent === 'f5' ? 17 : 14;
                  const displayValue =
                    step.memo[node.value ?? -1] !== undefined
                      ? step.memo[node.value ?? -1]
                      : undefined;

                  return (
                    <g key={node.id} className="transition-all duration-300">
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius}
                        fill={style.fill}
                        stroke={style.stroke}
                        strokeWidth={
                          nodeStatus === 'calling' || nodeStatus === 'cache-hit'
                            ? 2.5
                            : 1.5
                        }
                        strokeDasharray={style.strokeDasharray}
                        opacity={style.opacity}
                      />
                      <text
                        x={node.x}
                        y={node.y + (style.badgeLabel ? 2 : 4)}
                        textAnchor="middle"
                        fontSize={radius >= 17 ? '10.5px' : '9px'}
                        fontFamily="monospace"
                        fontWeight="bold"
                        fill={style.textColor}
                        opacity={style.opacity}
                      >
                        {nodeStatus === 'memoized' && displayValue !== undefined
                          ? `${node.label}=${displayValue}`
                          : node.label}
                      </text>

                      {style.badgeLabel && (
                        <g>
                          <rect
                            x={node.x - 21}
                            y={node.y + radius - 2}
                            width="42"
                            height="11"
                            rx="3"
                            fill={style.badgeBg}
                            opacity={style.opacity}
                          />
                          <text
                            x={node.x}
                            y={node.y + radius + 6.5}
                            textAnchor="middle"
                            fontSize="7.5px"
                            fontFamily="monospace"
                            fontWeight="bold"
                            fill={style.badgeTextColor}
                          >
                            {style.badgeLabel}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-200">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  Tabla Caché memo[0..5]
                </span>
                {step.memoAction && (
                  <span
                    className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      step.memoAction === 'write'
                        ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                        : 'bg-cyan-950 border border-cyan-600 text-cyan-300'
                    }`}
                  >
                    {step.memoAction === 'write' ? 'Escritura O(1)' : '⚡ Lectura O(1)'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-6 gap-1 font-mono text-center">
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const val = step.memo[idx];
                  const isCurrent = step.activeMemoKey === idx;
                  const isWritten = val !== undefined;

                  return (
                    <div
                      key={idx}
                      className={`flex flex-col rounded-lg border p-1 transition-all duration-300 ${
                        isCurrent && step.memoAction === 'write'
                          ? 'border-emerald-400 bg-emerald-950/90 ring-1 ring-emerald-400 shadow-md scale-105'
                          : isCurrent && step.memoAction === 'read'
                          ? 'border-cyan-400 bg-cyan-950/90 ring-1 ring-cyan-400 shadow-md scale-105'
                          : isWritten
                          ? 'border-emerald-800/80 bg-emerald-950/40 text-emerald-200'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-600'
                      }`}
                    >
                      <span className="text-[9px] text-zinc-400">[{idx}]</span>
                      <span
                        className={`text-xs font-black mt-0.5 ${
                          isCurrent
                            ? 'text-white'
                            : isWritten
                            ? 'text-emerald-300'
                            : 'text-zinc-600'
                        }`}
                      >
                        {val !== undefined ? val : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Llamadas Evaluadas:</span>
                <strong className="text-amber-300 font-bold">
                  {step.callsEvaluated} / 15
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Cache Hits O(1):</span>
                <strong className="text-cyan-300 font-bold">{step.cacheHits}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Llamadas Podadas:</span>
                <strong className="text-rose-400 font-bold">
                  {step.callsPruned} (46.7% ahorro)
                </strong>
              </div>
              <div className="border-t border-zinc-800 pt-1 flex items-center justify-between">
                <span className="text-zinc-400">Complejidad:</span>
                <span className="text-emerald-300 font-bold">
                  O(n) tiempo · O(n) espacio
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-800/30 bg-emerald-950/20 p-2 text-[10px] text-zinc-300 flex flex-col gap-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                Invariante de Programación Dinámica:
              </span>
              <span>
                Cada subproblema F(k) se evalúa exactamente <strong>1 vez</strong>.
                Todo intento posterior se resuelve en tiempo <strong>O(1)</strong> en
                caché.
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

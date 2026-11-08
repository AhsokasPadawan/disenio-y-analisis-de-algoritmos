import { useState } from 'react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

interface TreeNodeCoord {
  x: number;
  y: number;
  label: string;
  kind: 'MAX' | 'MIN' | 'LEAF';
  val?: number;
}

const TREE_NODES: Record<string, TreeNodeCoord> = {
  A: { x: 250, y: 25, label: 'A (MAX)', kind: 'MAX' },
  B: { x: 130, y: 75, label: 'B (MIN)', kind: 'MIN' },
  C: { x: 370, y: 75, label: 'C (MIN)', kind: 'MIN' },
  D: { x: 75, y: 130, label: 'D (MAX)', kind: 'MAX' },
  E: { x: 185, y: 130, label: 'E (MAX)', kind: 'MAX' },
  F: { x: 315, y: 130, label: 'F (MAX)', kind: 'MAX' },
  G: { x: 425, y: 130, label: 'G (MAX)', kind: 'MAX' },
  H: { x: 50, y: 185, label: 'H', kind: 'LEAF', val: 3 },
  I: { x: 100, y: 185, label: 'I', kind: 'LEAF', val: 5 },
  J: { x: 160, y: 185, label: 'J', kind: 'LEAF', val: 6 },
  K: { x: 210, y: 185, label: 'K', kind: 'LEAF', val: 9 },
  L: { x: 290, y: 185, label: 'L', kind: 'LEAF', val: 1 },
  M: { x: 340, y: 185, label: 'M', kind: 'LEAF', val: 2 },
  N: { x: 400, y: 185, label: 'N', kind: 'LEAF', val: 0 },
  O: { x: 450, y: 185, label: 'O', kind: 'LEAF', val: -1 },
};

const TREE_EDGES: [string, string][] = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'D'],
  ['B', 'E'],
  ['C', 'F'],
  ['C', 'G'],
  ['D', 'H'],
  ['D', 'I'],
  ['E', 'J'],
  ['E', 'K'],
  ['F', 'L'],
  ['F', 'M'],
  ['G', 'N'],
  ['G', 'O'],
];

interface AlphaBetaStep {
  step: number;
  activeNode: string;
  alpha: number;
  beta: number;
  evaluatedLeaves: string[];
  prunedNodes: string[];
  prunedEdges: [string, string][];
  nodeValues: Record<string, number>;
  cutReason?: string;
  description: string;
}

const ALPHABETA_STEPS: AlphaBetaStep[] = [
  {
    step: 1,
    activeNode: 'A',
    alpha: -Infinity,
    beta: Infinity,
    evaluatedLeaves: [],
    prunedNodes: [],
    prunedEdges: [],
    nodeValues: {},
    description: '1. Raíz A (MAX) inicia con intervalo [α = -∞, β = +∞]. Desciende por subárbol izquierdo hacia B.',
  },
  {
    step: 2,
    activeNode: 'B',
    alpha: -Infinity,
    beta: Infinity,
    evaluatedLeaves: [],
    prunedNodes: [],
    prunedEdges: [],
    nodeValues: {},
    description: '2. Nodo B (MIN) recibe [α = -∞, β = +∞]. Desciende a hijo izquierdo D.',
  },
  {
    step: 3,
    activeNode: 'D',
    alpha: -Infinity,
    beta: Infinity,
    evaluatedLeaves: ['H'],
    prunedNodes: [],
    prunedEdges: [],
    nodeValues: { D: 3, H: 3 },
    description: '3. Nodo D (MAX) evalúa hoja H = 3. Actualiza α = max(-∞, 3) = 3.',
  },
  {
    step: 4,
    activeNode: 'D',
    alpha: 3,
    beta: Infinity,
    evaluatedLeaves: ['H', 'I'],
    prunedNodes: [],
    prunedEdges: [],
    nodeValues: { D: 5, H: 3, I: 5 },
    description: '4. Nodo D (MAX) evalúa hoja I = 5. Como 5 > 3, D toma valor 5. Retorna 5 a su padre B.',
  },
  {
    step: 5,
    activeNode: 'B',
    alpha: -Infinity,
    beta: 5,
    evaluatedLeaves: ['H', 'I'],
    prunedNodes: [],
    prunedEdges: [],
    nodeValues: { B: 5, D: 5, H: 3, I: 5 },
    description: '5. Nodo B (MIN) recibe 5 de D. Como B minimiza, actualiza cota superior β = min(+∞, 5) = 5. Pasa [α = -∞, β = 5] a su hijo E.',
  },
  {
    step: 6,
    activeNode: 'E',
    alpha: -Infinity,
    beta: 5,
    evaluatedLeaves: ['H', 'I', 'J'],
    prunedNodes: [],
    prunedEdges: [],
    nodeValues: { B: 5, D: 5, E: 6, H: 3, I: 5, J: 6 },
    description: '6. Nodo E (MAX) evalúa hoja J = 6. Actualiza α = max(-∞, 6) = 6.',
  },
  {
    step: 7,
    activeNode: 'E',
    alpha: 6,
    beta: 5,
    evaluatedLeaves: ['H', 'I', 'J'],
    prunedNodes: ['K'],
    prunedEdges: [['E', 'K']],
    nodeValues: { B: 5, D: 5, E: 6, H: 3, I: 5, J: 6 },
    cutReason: 'Poda Beta en E: β (5) ≤ α (6)',
    description: '7. ¡PODA BETA ACTIVADA! En E se cumple β ≤ α (5 ≤ 6). Como el padre B nunca elegirá un valor ≥ 6, se poda la hoja K=9 sin evaluarla.',
  },
  {
    step: 8,
    activeNode: 'B',
    alpha: -Infinity,
    beta: 5,
    evaluatedLeaves: ['H', 'I', 'J'],
    prunedNodes: ['K'],
    prunedEdges: [['E', 'K']],
    nodeValues: { B: 5, D: 5, E: 6, H: 3, I: 5, J: 6 },
    description: '8. Nodo B (MIN) consolida su valor óptimo: min(5, 6) = 5. Retorna 5 a la raíz A.',
  },
  {
    step: 9,
    activeNode: 'A',
    alpha: 5,
    beta: Infinity,
    evaluatedLeaves: ['H', 'I', 'J'],
    prunedNodes: ['K'],
    prunedEdges: [['E', 'K']],
    nodeValues: { A: 5, B: 5, D: 5, E: 6, H: 3, I: 5, J: 6 },
    description: '9. Raíz A (MAX) recibe 5 de B. Actualiza su cota inferior α = max(-∞, 5) = 5. Ahora explora C con [α = 5, β = +∞].',
  },
  {
    step: 10,
    activeNode: 'C',
    alpha: 5,
    beta: Infinity,
    evaluatedLeaves: ['H', 'I', 'J'],
    prunedNodes: ['K'],
    prunedEdges: [['E', 'K']],
    nodeValues: { A: 5, B: 5, D: 5, E: 6, H: 3, I: 5, J: 6 },
    description: '10. Nodo C (MIN) recibe [α = 5, β = +∞]. Desciende a hijo izquierdo F.',
  },
  {
    step: 11,
    activeNode: 'F',
    alpha: 5,
    beta: Infinity,
    evaluatedLeaves: ['H', 'I', 'J', 'L', 'M'],
    prunedNodes: ['K'],
    prunedEdges: [['E', 'K']],
    nodeValues: { A: 5, B: 5, D: 5, E: 6, F: 2, H: 3, I: 5, J: 6, L: 1, M: 2 },
    description: '11. F (MAX) evalúa L=1 y M=2. Como 2 > 1, F toma valor 2 y retorna 2 a C.',
  },
  {
    step: 12,
    activeNode: 'C',
    alpha: 5,
    beta: 2,
    evaluatedLeaves: ['H', 'I', 'J', 'L', 'M'],
    prunedNodes: ['K'],
    prunedEdges: [['E', 'K']],
    nodeValues: { A: 5, B: 5, C: 2, D: 5, E: 6, F: 2, H: 3, I: 5, J: 6, L: 1, M: 2 },
    description: '12. Nodo C (MIN) recibe 2 de F. Actualiza cota superior β = min(+∞, 2) = 2.',
  },
  {
    step: 13,
    activeNode: 'C',
    alpha: 5,
    beta: 2,
    evaluatedLeaves: ['H', 'I', 'J', 'L', 'M'],
    prunedNodes: ['K', 'G', 'N', 'O'],
    prunedEdges: [['E', 'K'], ['C', 'G'], ['G', 'N'], ['G', 'O']],
    nodeValues: { A: 5, B: 5, C: 2, D: 5, E: 6, F: 2, H: 3, I: 5, J: 6, L: 1, M: 2 },
    cutReason: 'Poda Alfa en C: β (2) ≤ α (5)',
    description: '13. ¡PODA ALFA MASIVA! En C se cumple β ≤ α (2 ≤ 5). Como la raíz A ya tiene asegurado al menos 5, descarta todo el subárbol G (hojas N y O) sin abrirlo.',
  },
  {
    step: 14,
    activeNode: 'A',
    alpha: 5,
    beta: Infinity,
    evaluatedLeaves: ['H', 'I', 'J', 'L', 'M'],
    prunedNodes: ['K', 'G', 'N', 'O'],
    prunedEdges: [['E', 'K'], ['C', 'G'], ['G', 'N'], ['G', 'O']],
    nodeValues: { A: 5, B: 5, C: 2, D: 5, E: 6, F: 2, H: 3, I: 5, J: 6, L: 1, M: 2 },
    description: '14. ¡FIN DE BÚSQUEDA! Raíz A toma max(5, 2) = 5. Se evaluaron 5 hojas de 8 totales (37.5% podado) con optimalidad garantizada.',
  },
];

export function MinMaxAlphaBetaVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const frame = ALPHABETA_STEPS[currentStep] ?? ALPHABETA_STEPS[0];

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
      totalSteps={ALPHABETA_STEPS.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={frame.description}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="flex flex-col gap-2 py-1 w-full overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-1 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-sans font-semibold">Nodo Activo:</span>
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
          <svg viewBox="0 0 500 215" className="mx-auto block h-36 sm:h-40 md:h-44 w-full max-w-[480px]">
            {TREE_EDGES.map(([u, v], idx) => {
              const uCoord = TREE_NODES[u];
              const vCoord = TREE_NODES[v];
              if (!uCoord || !vCoord) return null;

              const isPruned = frame.prunedEdges.some(([pu, pv]) => pu === u && pv === v);
              const isActiveEdge = frame.activeNode === v || frame.activeNode === u;

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={uCoord.x}
                    y1={uCoord.y}
                    x2={vCoord.x}
                    y2={vCoord.y}
                    stroke={isPruned ? '#ef4444' : isActiveEdge ? '#f59e0b' : '#3f3f46'}
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
              const isEvaluated = frame.evaluatedLeaves.includes(key) || frame.nodeValues[key] !== undefined;
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
                      fill={isPruned ? '#f87171' : isEvaluated ? '#ddd6fe' : '#d4d4d8'}
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
            <span className="text-[11px] font-sans font-bold text-zinc-300">Regla Matemática de Corte:</span>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-rose-400 font-bold">β ≤ α:</span>
              <span>Corte inmediato del subárbol hermano. El ancestro nunca descenderá por una alternativa peor.</span>
            </div>
            <div className="flex items-center gap-4 mt-1 text-[11px]">
              <span>Hojas Evaluadas: <strong className="text-violet-300">{frame.evaluatedLeaves.length} / 8</strong></span>
              <span>Hojas Ahorradas: <strong className="text-rose-400">{frame.prunedNodes.length} (37.5%)</strong></span>
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

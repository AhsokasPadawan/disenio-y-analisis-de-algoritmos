import { useState } from 'react';
import { Network } from 'lucide-react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  u: number;
  v: number;
  w: number;
}

interface RelaxationDetail {
  i: number;
  j: number;
  k: number;
  oldVal: number | 'inf';
  aik: number;
  akj: number;
  newVal: number;
  description: string;
}

interface StepSpec {
  k: number | null;
  phase: 'init' | 'pivot' | 'complete';
  title: string;
  badge: string;
  description: string;
  matrix: (number | 'inf')[][];
  highlightedRow?: number;
  highlightedCol?: number;
  updatedCells: [number, number][];
  relaxation?: RelaxationDetail;
  activePath?: [number, number][];
}

const GRAPH_NODES: GraphNode[] = [
  { id: 0, label: '0', x: 70, y: 55 },
  { id: 1, label: '1', x: 230, y: 55 },
  { id: 2, label: '2', x: 230, y: 175 },
  { id: 3, label: '3', x: 70, y: 175 },
];

const GRAPH_EDGES: GraphEdge[] = [
  { u: 0, v: 1, w: 1 },
  { u: 1, v: 2, w: 3 },
  { u: 2, v: 0, w: 7 },
  { u: 2, v: 1, w: 2 },
  { u: 2, v: 3, w: 3 },
  { u: 3, v: 0, w: 3 },
  { u: 3, v: 1, w: 4 },
  { u: 3, v: 2, w: 8 },
];

const FW_STEPS: StepSpec[] = [
  {
    k: null,
    phase: 'init',
    title: 'Paso 0: Matriz de Adyacencia Inicial A⁽⁻¹⁾ (Aristas Directas)',
    badge: '1. Grafo Inicial',
    description: 'Se inicializa la matriz A con las aristas dirigidas directas del grafo. Si no hay arista directa entre i y j, el costo es ∞. En la diagonal principal A[i, i] = 0.',
    matrix: [
      [0, 1, 'inf', 'inf'],
      ['inf', 0, 3, 'inf'],
      [7, 2, 0, 3],
      [3, 4, 8, 0],
    ],
    updatedCells: [],
  },
  {
    k: 0,
    phase: 'pivot',
    title: 'Paso 1: Pivote k = 0 (Nodo 0 como Puente)',
    badge: '2. Pivote k=0',
    description: 'Se evalúa si algún par (i, j) mejora pasando por el nodo 0: A[i, j] vs A[i, 0] + A[0, j]. Fila 0 y Columna 0 son invariantes in-place. No hay mejoras estrictas con k=0.',
    matrix: [
      [0, 1, 'inf', 'inf'],
      ['inf', 0, 3, 'inf'],
      [7, 2, 0, 3],
      [3, 4, 8, 0],
    ],
    highlightedRow: 0,
    highlightedCol: 0,
    updatedCells: [],
  },
  {
    k: 1,
    phase: 'pivot',
    title: 'Paso 2: Pivote k = 1 — Relajación de Celda (0, 2) vía Nodo 1',
    badge: '2. Relajación k=1',
    description: 'Celda (0, 2): directo es ∞. Vía nodo 1: A[0, 1] + A[1, 2] = 1 + 3 = 4 < ∞. ¡Se relaja A[0, 2] = 4! Además (3, 2) mejora de 8 a 4+3 = 7.',
    matrix: [
      [0, 1, 4, 'inf'],
      ['inf', 0, 3, 'inf'],
      [7, 2, 0, 3],
      [3, 4, 7, 0],
    ],
    highlightedRow: 1,
    highlightedCol: 1,
    updatedCells: [[0, 2], [3, 2]],
    relaxation: {
      i: 0,
      j: 2,
      k: 1,
      oldVal: 'inf',
      aik: 1,
      akj: 3,
      newVal: 4,
      description: 'A[0, 2] = min(∞, A[0, 1] + A[1, 2] = 1 + 3) = 4',
    },
    activePath: [[0, 1], [1, 2]],
  },
  {
    k: 2,
    phase: 'pivot',
    title: 'Paso 3: Pivote k = 2 — Conexión Multietapa vía Nodo 2',
    badge: '2. Relajación k=2',
    description: 'Con pivote 2: Celda (0, 3) se relaja de ∞ a A[0, 2] + A[2, 3] = 4 + 3 = 7. Celda (1, 3) de ∞ a 3 + 3 = 6. Celda (1, 0) de ∞ a 3 + 7 = 10.',
    matrix: [
      [0, 1, 4, 7],
      [10, 0, 3, 6],
      [7, 2, 0, 3],
      [3, 4, 7, 0],
    ],
    highlightedRow: 2,
    highlightedCol: 2,
    updatedCells: [[0, 3], [1, 3], [1, 0]],
    relaxation: {
      i: 0,
      j: 3,
      k: 2,
      oldVal: 'inf',
      aik: 4,
      akj: 3,
      newVal: 7,
      description: 'A[0, 3] = min(∞, A[0, 2] + A[2, 3] = 4 + 3) = 7',
    },
    activePath: [[0, 2], [2, 3]],
  },
  {
    k: 3,
    phase: 'pivot',
    title: 'Paso 4: Pivote k = 3 — Optimización Final vía Nodo 3',
    badge: '2. Relajación k=3',
    description: 'Celda (1, 0) mejora de 10 a A[1, 3] + A[3, 0] = 6 + 3 = 9. Celda (2, 0) mejora de 7 a A[2, 3] + A[3, 0] = 3 + 3 = 6.',
    matrix: [
      [0, 1, 4, 7],
      [9, 0, 3, 6],
      [6, 2, 0, 3],
      [3, 4, 7, 0],
    ],
    highlightedRow: 3,
    highlightedCol: 3,
    updatedCells: [[1, 0], [2, 0]],
    relaxation: {
      i: 1,
      j: 0,
      k: 3,
      oldVal: 10,
      aik: 6,
      akj: 3,
      newVal: 9,
      description: 'A[1, 0] = min(10, A[1, 3] + A[3, 0] = 6 + 3) = 9',
    },
    activePath: [[1, 3], [3, 0]],
  },
  {
    k: null,
    phase: 'complete',
    title: 'Paso 5: Matriz Final de Todos los Pares de Caminos Mínimos A⁽³⁾',
    badge: '3. Solución Completa',
    description: 'El algoritmo ha completado las 4 iteraciones de pivote |V| = 4. La matriz contiene las distancias mínimas garantizadas para todos los pares de nodos en Θ(|V|³) = 64 operaciones elementales.',
    matrix: [
      [0, 1, 4, 7],
      [9, 0, 3, 6],
      [6, 2, 0, 3],
      [3, 4, 7, 0],
    ],
    updatedCells: [],
  },
];

export function FloydWarshallVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const frame = FW_STEPS[currentStep] ?? FW_STEPS[0];

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
      totalSteps={FW_STEPS.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={frame.description}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="flex flex-col gap-2.5 py-1 w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-emerald-800/40 pb-1.5 text-xs">
          <span className="font-bold text-emerald-300">
            {frame.title}
          </span>
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
                        frame.highlightedCol === node ? 'text-amber-300 bg-amber-950/40 rounded' : 'text-zinc-300'
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
              <span className="text-emerald-300 font-bold">Relajación: A[i, j] = min(A[i, j], A[i, k] + A[k, j])</span>
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
                        markerEnd={isPath ? 'url(#fw-arrow-active)' : 'url(#fw-arrow)'}
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

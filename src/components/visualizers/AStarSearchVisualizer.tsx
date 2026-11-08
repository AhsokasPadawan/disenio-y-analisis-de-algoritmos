import { useState } from 'react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

interface GraphNodeCoord {
  x: number;
  y: number;
}

const GRAPH_COORDS: Record<string, GraphNodeCoord> = {
  S: { x: 55, y: 110 },
  A: { x: 150, y: 45 },
  B: { x: 160, y: 110 },
  D: { x: 150, y: 175 },
  C: { x: 265, y: 110 },
  E: { x: 250, y: 175 },
  F: { x: 360, y: 175 },
  X: { x: 265, y: 45 },
  Y: { x: 385, y: 110 },
  Z: { x: 450, y: 175 },
};

const GRAPH_EDGES = [
  { u: 'S', v: 'A', w: 5 },
  { u: 'S', v: 'B', w: 9 },
  { u: 'S', v: 'D', w: 6 },
  { u: 'A', v: 'B', w: 3 },
  { u: 'A', v: 'X', w: 9 },
  { u: 'B', v: 'A', w: 2 },
  { u: 'B', v: 'C', w: 1 },
  { u: 'C', v: 'Y', w: 5 },
  { u: 'C', v: 'F', w: 7 },
  { u: 'D', v: 'C', w: 2 },
  { u: 'D', v: 'E', w: 2 },
  { u: 'E', v: 'Z', w: 7 },
  { u: 'F', v: 'Z', w: 4 },
];

const HEURISTICS: Record<string, number> = {
  S: 5,
  A: 7,
  B: 3,
  C: 4,
  D: 6,
  E: 5,
  F: 6,
  X: 0,
  Y: 0,
  Z: 0,
};

const GOALS = ['X', 'Y', 'Z'];

interface SearchStep {
  step: number;
  algoMode: 'astar' | 'ucs';
  activeNode: string;
  activeEdge?: { u: string; v: string };
  openQueue: { node: string; g: number; h: number; f: number }[];
  visited: string[];
  pathFound?: string[];
  description: string;
}

const ASTAR_STEPS: SearchStep[] = [
  {
    step: 1,
    algoMode: 'astar',
    activeNode: 'S',
    openQueue: [{ node: 'S', g: 0, h: 5, f: 5 }],
    visited: ['S'],
    description: 'A* Inicial: Nodo raíz S con g=0, h=5 → f=5. Se extrae S y genera sucesores A(g=5,h=7,f=12), B(g=9,h=3,f=12) y D(g=6,h=6,f=12).',
  },
  {
    step: 2,
    algoMode: 'astar',
    activeNode: 'A',
    activeEdge: { u: 'S', v: 'A' },
    openQueue: [
      { node: 'A', g: 5, h: 7, f: 12 },
      { node: 'B', g: 9, h: 3, f: 12 },
      { node: 'D', g: 6, h: 6, f: 12 },
    ],
    visited: ['S', 'A'],
    description: 'A* Paso 1: Se expande A (f=12). Genera B con g=5+3=8, h=3 → f=11 (mejora costo previo de B) y X (meta) con g=5+9=14, h=0 → f=14.',
  },
  {
    step: 3,
    algoMode: 'astar',
    activeNode: 'B',
    activeEdge: { u: 'A', v: 'B' },
    openQueue: [
      { node: 'B', g: 8, h: 3, f: 11 },
      { node: 'D', g: 6, h: 6, f: 12 },
      { node: 'X', g: 14, h: 0, f: 14 },
    ],
    visited: ['S', 'A', 'B'],
    description: 'A* Paso 2: Se extrae B (menor f=11). B expande C con g=8+1=9, h=4 → f=13.',
  },
  {
    step: 4,
    algoMode: 'astar',
    activeNode: 'D',
    activeEdge: { u: 'S', v: 'D' },
    openQueue: [
      { node: 'D', g: 6, h: 6, f: 12 },
      { node: 'C', g: 9, h: 4, f: 13 },
      { node: 'X', g: 14, h: 0, f: 14 },
    ],
    visited: ['S', 'A', 'B', 'D'],
    description: 'A* Paso 3: Se extrae D (f=12). D expande C con g=6+2=8, h=4 → f=12 (mejora a C) y E con g=6+2=8, h=5 → f=13.',
  },
  {
    step: 5,
    algoMode: 'astar',
    activeNode: 'C',
    activeEdge: { u: 'D', v: 'C' },
    openQueue: [
      { node: 'C', g: 8, h: 4, f: 12 },
      { node: 'E', g: 8, h: 5, f: 13 },
      { node: 'X', g: 14, h: 0, f: 14 },
    ],
    visited: ['S', 'A', 'B', 'D', 'C'],
    description: 'A* Paso 4: Se extrae C (f=12). C expande la meta Y con g=8+5=13, h=0 → f=13 y F con g=8+7=15, h=6 → f=21.',
  },
  {
    step: 6,
    algoMode: 'astar',
    activeNode: 'Y',
    activeEdge: { u: 'C', v: 'Y' },
    openQueue: [
      { node: 'Y', g: 13, h: 0, f: 13 },
      { node: 'E', g: 8, h: 5, f: 13 },
      { node: 'X', g: 14, h: 0, f: 14 },
    ],
    visited: ['S', 'A', 'B', 'D', 'C', 'Y'],
    pathFound: ['S', 'D', 'C', 'Y'],
    description: 'A* Final: ¡Meta Y extraída con f=13! Ruta óptima: S → D → C → Y (costo real g = 13). Solo 5 nodos expandidos gracias a la heurística.',
  },
];

const UCS_STEPS: SearchStep[] = [
  {
    step: 1,
    algoMode: 'ucs',
    activeNode: 'S',
    openQueue: [{ node: 'S', g: 0, h: 0, f: 0 }],
    visited: ['S'],
    description: 'UCS Inicial (h=0 ciego): Extrae S (g=0). Genera A(g=5), D(g=6) y B(g=9). Expande estrictamente por menor g(n).',
  },
  {
    step: 2,
    algoMode: 'ucs',
    activeNode: 'A',
    activeEdge: { u: 'S', v: 'A' },
    openQueue: [
      { node: 'A', g: 5, h: 0, f: 5 },
      { node: 'D', g: 6, h: 0, f: 6 },
      { node: 'B', g: 9, h: 0, f: 9 },
    ],
    visited: ['S', 'A'],
    description: 'UCS Paso 1: Extrae A (g=5). Genera B con g=5+3=8 (mejora g=9) y X(meta) con g=5+9=14.',
  },
  {
    step: 3,
    algoMode: 'ucs',
    activeNode: 'D',
    activeEdge: { u: 'S', v: 'D' },
    openQueue: [
      { node: 'D', g: 6, h: 0, f: 6 },
      { node: 'B', g: 8, h: 0, f: 8 },
      { node: 'X', g: 14, h: 0, f: 14 },
    ],
    visited: ['S', 'A', 'D'],
    description: 'UCS Paso 2: Extrae D (g=6). Genera C con g=6+2=8 y E con g=6+2=8. Explora radialmente sin orientación a meta.',
  },
  {
    step: 4,
    algoMode: 'ucs',
    activeNode: 'B',
    activeEdge: { u: 'A', v: 'B' },
    openQueue: [
      { node: 'B', g: 8, h: 0, f: 8 },
      { node: 'C', g: 8, h: 0, f: 8 },
      { node: 'E', g: 8, h: 0, f: 8 },
      { node: 'X', g: 14, h: 0, f: 14 },
    ],
    visited: ['S', 'A', 'D', 'B'],
    description: 'UCS Paso 3: Extrae B (g=8). B genera C con g=8+1=9 (no mejora g=8 existente).',
  },
  {
    step: 5,
    algoMode: 'ucs',
    activeNode: 'C',
    activeEdge: { u: 'D', v: 'C' },
    openQueue: [
      { node: 'C', g: 8, h: 0, f: 8 },
      { node: 'E', g: 8, h: 0, f: 8 },
      { node: 'X', g: 14, h: 0, f: 14 },
    ],
    visited: ['S', 'A', 'D', 'B', 'C'],
    description: 'UCS Paso 4: Extrae C (g=8). C genera Y(meta) con g=8+5=13 y F con g=8+7=15.',
  },
  {
    step: 6,
    algoMode: 'ucs',
    activeNode: 'E',
    activeEdge: { u: 'D', v: 'E' },
    openQueue: [
      { node: 'E', g: 8, h: 0, f: 8 },
      { node: 'Y', g: 13, h: 0, f: 13 },
      { node: 'X', g: 14, h: 0, f: 14 },
      { node: 'F', g: 15, h: 0, f: 15 },
    ],
    visited: ['S', 'A', 'D', 'B', 'C', 'E'],
    description: 'UCS Paso 5 (Ineficiencia): Extrae E (g=8 < 13), explorando rama irrelevante hacia Z antes de aceptar la meta.',
  },
  {
    step: 7,
    algoMode: 'ucs',
    activeNode: 'Y',
    activeEdge: { u: 'C', v: 'Y' },
    openQueue: [
      { node: 'Y', g: 13, h: 0, f: 13 },
      { node: 'X', g: 14, h: 0, f: 14 },
      { node: 'F', g: 15, h: 0, f: 15 },
    ],
    visited: ['S', 'A', 'D', 'B', 'C', 'E', 'Y'],
    pathFound: ['S', 'D', 'C', 'Y'],
    description: 'UCS Final: Extrae Y (g=13). Halla el mismo costo óptimo (13) pero necesitó expandir 6 nodos en lugar de 5 (desperdicia expansiones en E).',
  },
];

export function AStarSearchVisualizer() {
  const [activeTab, setActiveTab] = useState<'astar' | 'ucs'>('astar');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const steps = activeTab === 'astar' ? ASTAR_STEPS : UCS_STEPS;
  const frame = steps[currentStep] ?? steps[0];

  const handleSwitchTab = (tab: 'astar' | 'ucs') => {
    setActiveTab(tab);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <AnimationPlayerShell
      title={`Búsqueda Informada: ${activeTab === 'astar' ? 'A* con Heurística f(n) = g(n) + h(n)' : 'UCS Ciega con f(n) = g(n)'}`}
      badge={activeTab === 'astar' ? 'A* Informado' : 'UCS Dijkstra'}
      currentStep={currentStep}
      totalSteps={steps.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={frame.description}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="flex flex-col gap-2 py-1 w-full overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-zinc-800 pb-1.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSwitchTab('astar')}
              className={`px-3 py-0.5 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'astar'
                  ? 'bg-violet-600 border-violet-400 text-white shadow-xs'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              ★ Algoritmo A* (Informado: g + h)
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('ucs')}
              className={`px-3 py-0.5 text-xs font-bold rounded-lg border transition-all ${
                activeTab === 'ucs'
                  ? 'bg-sky-600 border-sky-400 text-white shadow-xs'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              ⌾ Algoritmo UCS (Ciego: h=0)
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
            <span>Metas: <strong className="text-violet-300">[X, Y, Z]</strong></span>
            <span>·</span>
            <span>Origen: <strong className="text-amber-400">S</strong></span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-inner">
          <svg viewBox="0 0 490 215" className="mx-auto block h-36 sm:h-40 md:h-44 w-full max-w-[480px]">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="20"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#52525b" />
              </marker>
              <marker
                id="arrow-active"
                viewBox="0 0 10 10"
                refX="20"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
              <marker
                id="arrow-path"
                viewBox="0 0 10 10"
                refX="20"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#a78bfa" />
              </marker>
            </defs>

            {GRAPH_EDGES.map((edge, idx) => {
              const uCoord = GRAPH_COORDS[edge.u];
              const vCoord = GRAPH_COORDS[edge.v];
              if (!uCoord || !vCoord) return null;

              const isEdgeActive = frame.activeEdge && frame.activeEdge.u === edge.u && frame.activeEdge.v === edge.v;
              const isPathEdge =
                frame.pathFound &&
                frame.pathFound.indexOf(edge.u) !== -1 &&
                frame.pathFound.indexOf(edge.v) === frame.pathFound.indexOf(edge.u) + 1;

              const midX = (uCoord.x + vCoord.x) / 2;
              const midY = (uCoord.y + vCoord.y) / 2;

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={uCoord.x}
                    y1={uCoord.y}
                    x2={vCoord.x}
                    y2={vCoord.y}
                    stroke={isPathEdge ? '#a78bfa' : isEdgeActive ? '#f59e0b' : '#3f3f46'}
                    strokeWidth={isPathEdge ? '3' : isEdgeActive ? '2.5' : '1.5'}
                    strokeDasharray={isEdgeActive ? '4 2' : undefined}
                    markerEnd={isPathEdge ? 'url(#arrow-path)' : isEdgeActive ? 'url(#arrow-active)' : 'url(#arrow)'}
                    className="transition-colors duration-200"
                  />
                  <rect
                    x={midX - 7}
                    y={midY - 7}
                    width="14"
                    height="14"
                    rx="3"
                    fill="#18181b"
                    stroke={isPathEdge ? '#a78bfa' : isEdgeActive ? '#f59e0b' : '#3f3f46'}
                    strokeWidth="1"
                  />
                  <text
                    x={midX}
                    y={midY + 3.5}
                    fill={isPathEdge ? '#c4b5fd' : isEdgeActive ? '#fbbf24' : '#a1a1aa'}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {edge.w}
                  </text>
                </g>
              );
            })}

            {Object.entries(GRAPH_COORDS).map(([name, coord]) => {
              const isGoal = GOALS.includes(name);
              const isActive = name === frame.activeNode;
              const isVisited = frame.visited.includes(name);
              const isInOpen = frame.openQueue.some((q) => q.node === name);
              const isGoalReached = frame.pathFound && frame.pathFound[frame.pathFound.length - 1] === name;

              return (
                <g key={name} className="transition-all duration-300">
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="15"
                    fill={
                      isGoalReached
                        ? '#8b5cf6'
                        : isActive
                        ? '#f59e0b'
                        : isGoal && isVisited
                        ? '#7c3aed'
                        : isVisited
                        ? '#5b21b6'
                        : isInOpen
                        ? '#0284c7'
                        : '#27272a'
                    }
                    stroke={
                      isGoalReached
                        ? '#c4b5fd'
                        : isActive
                        ? '#fbbf24'
                        : isGoal
                        ? '#a78bfa'
                        : isInOpen
                        ? '#38bdf8'
                        : '#52525b'
                    }
                    strokeWidth={isActive || isGoalReached ? '2.5' : isGoal ? '2' : '1.5'}
                  />
                  <text
                    x={coord.x}
                    y={coord.y + 4}
                    fill={isActive ? '#18181b' : '#ffffff'}
                    fontSize="11"
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    {name}
                  </text>
                  <text
                    x={coord.x}
                    y={coord.y - 19}
                    fill={isGoal ? '#c4b5fd' : '#ddd6fe'}
                    fontSize="8.5"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {isGoal ? 'META' : activeTab === 'astar' ? `h=${HEURISTICS[name]}` : 'h=0'}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="flex-1 flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950 p-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-violet-300">
              Frontera / Cola de Prioridad ({activeTab === 'astar' ? 'f = g + h' : 'f = g'}):
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {frame.openQueue.map((item, idx) => {
                const isHead = idx === 0;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 rounded-lg border px-2 py-0.5 font-mono text-[11px] ${
                      isHead
                        ? 'border-amber-400 bg-amber-950/70 text-amber-200 ring-1 ring-amber-400/50'
                        : 'border-zinc-800 bg-zinc-900/80 text-zinc-300'
                    }`}
                  >
                    <strong className="text-white">{item.node}</strong>
                    <span className="text-zinc-400">
                      g={item.g} {activeTab === 'astar' && `+ h=${item.h}`} = <strong className="text-amber-300">f={item.f}</strong>
                    </span>
                    {isHead && <span className="text-[9px] text-amber-400 font-bold">TOP</span>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 min-w-[200px] text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-zinc-400">Algoritmo:</span>
              <strong className={activeTab === 'astar' ? 'text-violet-300' : 'text-sky-400'}>
                {activeTab === 'astar' ? 'A* (Informado)' : 'UCS (Dijkstra)'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Nodos Expandidos:</span>
              <span className="text-amber-300 font-bold">{frame.visited.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Camino Óptimo:</span>
              <span className="text-violet-300 font-bold">S → D → C → Y</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Costo Acumulado:</span>
              <span className="text-white font-bold">g = 13</span>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

import { useState } from 'react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

interface NodeCoord {
  x: number;
  y: number;
}

interface PrimStep {
  step: number;
  visited: string[];
  tree_edges: [string, string, number][];
  description: string;
}

interface KruskalStep {
  step: number;
  edge?: [string, string, number];
  status: 'accepted' | 'rejected' | 'completed';
  components: string[][];
  description: string;
}

const GRAPH_NODE_POSITIONS: Record<string, NodeCoord> = {
  a: { x: 55, y: 130 },
  b: { x: 175, y: 45 },
  c: { x: 365, y: 45 },
  d: { x: 485, y: 130 },
  e: { x: 400, y: 215 },
  f: { x: 140, y: 215 },
  g: { x: 270, y: 130 },
};

const GRAPH_NODES: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

const GRAPH_EDGES: { u: string; v: string; w: number }[] = [
  { u: 'a', v: 'g', w: 1 },
  { u: 'f', v: 'g', w: 2 },
  { u: 'b', v: 'c', w: 3 },
  { u: 'c', v: 'g', w: 3 },
  { u: 'a', v: 'b', w: 4 },
  { u: 'e', v: 'g', w: 4 },
  { u: 'a', v: 'f', w: 5 },
  { u: 'c', v: 'd', w: 5 },
  { u: 'a', v: 'c', w: 7 },
  { u: 'd', v: 'e', w: 7 },
  { u: 'e', v: 'f', w: 8 },
  { u: 'd', v: 'g', w: 9 },
];

const PRIM_STEPS: PrimStep[] = [
  {
    step: 0,
    visited: ['d'],
    tree_edges: [],
    description: 'Paso inicial de Prim: se selecciona el nodo inicial "d" para fundar el árbol. El corte separa {d} de los demás vértices.',
  },
  {
    step: 1,
    visited: ['d', 'c'],
    tree_edges: [['d', 'c', 5]],
    description: 'Corte ({d} | {a,b,c,e,f,g}): se evalúan las aristas incidentes a "d". Se agrega (D, C, w=5) por ser la mínima del corte.',
  },
  {
    step: 2,
    visited: ['d', 'c', 'b'],
    tree_edges: [['d', 'c', 5], ['c', 'b', 3]],
    description: 'Corte ({c, d} | resto): la arista mínima del corte es (C, B, w=3), incorporando el nodo "b" al árbol conexo.',
  },
  {
    step: 3,
    visited: ['d', 'c', 'b', 'g'],
    tree_edges: [['d', 'c', 5], ['c', 'b', 3], ['c', 'g', 3]],
    description: 'Corte ({b, c, d} | resto): la arista mínima del corte es (C, G, w=3), incorporando el nodo "g" al árbol conexo.',
  },
  {
    step: 4,
    visited: ['d', 'c', 'b', 'g', 'a'],
    tree_edges: [['d', 'c', 5], ['c', 'b', 3], ['c', 'g', 3], ['g', 'a', 1]],
    description: 'Corte ({b, c, d, g} | resto): la arista mínima del corte es (G, A, w=1), incorporando el nodo "a" al árbol conexo.',
  },
  {
    step: 5,
    visited: ['d', 'c', 'b', 'g', 'a', 'f'],
    tree_edges: [['d', 'c', 5], ['c', 'b', 3], ['c', 'g', 3], ['g', 'a', 1], ['g', 'f', 2]],
    description: 'Corte ({a, b, c, d, g} | resto): la arista mínima del corte es (G, F, w=2), incorporando el nodo "f" al árbol conexo.',
  },
  {
    step: 6,
    visited: ['d', 'c', 'b', 'g', 'a', 'f', 'e'],
    tree_edges: [['d', 'c', 5], ['c', 'b', 3], ['c', 'g', 3], ['g', 'a', 1], ['g', 'f', 2], ['g', 'e', 4]],
    description: 'Corte ({a, b, c, d, f, g} | {e}): la arista mínima del corte es (G, E, w=4), incorporando el último nodo "e".',
  },
  {
    step: 7,
    visited: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    tree_edges: [['d', 'c', 5], ['c', 'b', 3], ['c', 'g', 3], ['g', 'a', 1], ['g', 'f', 2], ['g', 'e', 4]],
    description: 'Árbol Generador Mínimo completo: se visitaron los 7 vértices con V-1 = 6 aristas. Costo total óptimo = 18.',
  },
];

const KRUSKAL_STEPS: KruskalStep[] = [
  {
    step: 1,
    edge: ['a', 'g', 1],
    status: 'accepted',
    components: [['a', 'g'], ['b'], ['c'], ['d'], ['e'], ['f']],
    description: 'Evaluar arista mínima global (A, G, w=1): une las componentes disjuntas {A} y {G} → ACEPTADA.',
  },
  {
    step: 2,
    edge: ['f', 'g', 2],
    status: 'accepted',
    components: [['a', 'f', 'g'], ['b'], ['c'], ['d'], ['e']],
    description: 'Evaluar arista (F, G, w=2): une {F} con la componente {A, G} → ACEPTADA.',
  },
  {
    step: 3,
    edge: ['b', 'c', 3],
    status: 'accepted',
    components: [['a', 'f', 'g'], ['b', 'c'], ['d'], ['e']],
    description: 'Evaluar arista (B, C, w=3): une las componentes disjuntas {B} y {C} → ACEPTADA.',
  },
  {
    step: 4,
    edge: ['c', 'g', 3],
    status: 'accepted',
    components: [['a', 'b', 'c', 'f', 'g'], ['d'], ['e']],
    description: 'Evaluar arista (C, G, w=3): fusiona las componentes {B, C} y {A, F, G} → ACEPTADA.',
  },
  {
    step: 5,
    edge: ['a', 'b', 4],
    status: 'rejected',
    components: [['a', 'b', 'c', 'f', 'g'], ['d'], ['e']],
    description: 'Evaluar arista (A, B, w=4): ambos vértices ya pertenecen a {A, B, C, F, G} → RECHAZADA (forma ciclo).',
  },
  {
    step: 6,
    edge: ['e', 'g', 4],
    status: 'accepted',
    components: [['a', 'b', 'c', 'e', 'f', 'g'], ['d']],
    description: 'Evaluar arista (E, G, w=4): une {E} a la componente principal → ACEPTADA.',
  },
  {
    step: 7,
    edge: ['a', 'f', 5],
    status: 'rejected',
    components: [['a', 'b', 'c', 'e', 'f', 'g'], ['d']],
    description: 'Evaluar arista (A, F, w=5): ambos vértices ya pertenecen a la misma componente → RECHAZADA (forma ciclo).',
  },
  {
    step: 8,
    edge: ['c', 'd', 5],
    status: 'accepted',
    components: [['a', 'b', 'c', 'd', 'e', 'f', 'g']],
    description: 'Evaluar arista (C, D, w=5): une {D} con la componente principal. Se alcanzan V-1 = 6 aristas del MST.',
  },
  {
    step: 9,
    status: 'completed',
    components: [['a', 'b', 'c', 'd', 'e', 'f', 'g']],
    description: '¡Kruskal finalizado con éxito! Todos los 7 vértices pertenecen a la misma componente conexa con 6 aristas. Aristas restantes (w=7, 8, 9) se descartan por generar ciclos. Costo total = 18.',
  },
];

export function PrimVsKruskalVisualizer() {
  const [activeTab, setActiveTab] = useState<'prim' | 'kruskal'>('prim');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const activeSteps = activeTab === 'prim' ? PRIM_STEPS : KRUSKAL_STEPS;
  const totalSteps = activeSteps.length;

  const currentPrimStep = PRIM_STEPS[currentStep] ?? PRIM_STEPS[0];
  const currentKruskalStep = KRUSKAL_STEPS[currentStep] ?? KRUSKAL_STEPS[0];

  const handleSwitchTab = (tab: 'prim' | 'kruskal') => {
    setActiveTab(tab);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const isEdgeInPrimTree = (u: string, v: string) => {
    return currentPrimStep.tree_edges.some(
      ([eU, eV]) => (eU === u && eV === v) || (eU === v && eV === u)
    );
  };

  const isLatestPrimEdge = (u: string, v: string) => {
    if (currentPrimStep.tree_edges.length === 0) return false;
    const latest = currentPrimStep.tree_edges[currentPrimStep.tree_edges.length - 1];
    return (latest[0] === u && latest[1] === v) || (latest[0] === v && latest[1] === u);
  };

  const isEdgeAcceptedInKruskal = (u: string, v: string) => {
    const evaluatedSoFar = KRUSKAL_STEPS.slice(0, currentStep + 1);
    return evaluatedSoFar.some(
      (f) =>
        f.status === 'accepted' &&
        f.edge &&
        ((f.edge[0] === u && f.edge[1] === v) || (f.edge[0] === v && f.edge[1] === u))
    );
  };

  const isEdgeRejectedInKruskal = (u: string, v: string) => {
    const evaluatedSoFar = KRUSKAL_STEPS.slice(0, currentStep + 1);
    return evaluatedSoFar.some(
      (f) =>
        f.status === 'rejected' &&
        f.edge &&
        ((f.edge[0] === u && f.edge[1] === v) || (f.edge[0] === v && f.edge[1] === u))
    );
  };

  const isCurrentKruskalEdge = (u: string, v: string) => {
    if (currentKruskalStep.status === 'completed') return false;
    if (!currentKruskalStep.edge) return false;
    const [eU, eV] = currentKruskalStep.edge;
    return (eU === u && eV === v) || (eU === v && eV === u);
  };

  const primCost = currentPrimStep.tree_edges.reduce((acc, edge) => acc + edge[2], 0);

  const kruskalAcceptedEdges = KRUSKAL_STEPS.slice(0, currentStep + 1).filter(
    (f) => f.status === 'accepted' && f.edge
  );
  const kruskalRejectedEdges = KRUSKAL_STEPS.slice(0, currentStep + 1).filter(
    (f) => f.status === 'rejected' && f.edge
  );
  const kruskalCost = kruskalAcceptedEdges.reduce((acc, f) => acc + (f.edge ? f.edge[2] : 0), 0);

  const currentDescription =
    activeTab === 'prim' ? currentPrimStep.description : currentKruskalStep.description;

  return (
    <AnimationPlayerShell
      title={`Comparador de Árbol Generador Mínimo: ${activeTab === 'prim' ? 'Algoritmo de Prim' : 'Algoritmo de Kruskal'}`}
      badge="Algoritmos Greedy"
      currentStep={currentStep}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={currentDescription}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="h-full min-h-0 flex-1 flex flex-col justify-between items-center w-full gap-2.5 sm:gap-3">
        <div className="shrink-0 w-full flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-800/40 bg-zinc-950/80 p-2 sm:p-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => handleSwitchTab('prim')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition shadow-xs ${
                activeTab === 'prim'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md font-black'
                  : 'text-zinc-300 hover:bg-emerald-900/40 hover:text-emerald-200'
              }`}
            >
              Prim (Árbol Conexo y Corte)
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('kruskal')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition shadow-xs ${
                activeTab === 'kruskal'
                  ? 'bg-emerald-500 text-zinc-950 shadow-md font-black'
                  : 'text-zinc-300 hover:bg-emerald-900/40 hover:text-emerald-200'
              }`}
            >
              Kruskal (Bosque Global y Union-Find)
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
            {activeTab === 'prim' ? (
              <>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Nodos en Árbol: {currentPrimStep.visited.length}/7
                </span>
                <span className="flex items-center gap-1 text-sky-400 font-bold">
                  Aristas MST: {currentPrimStep.tree_edges.length}/6
                </span>
                <span className="rounded-md bg-emerald-900/40 border border-emerald-700/50 px-2 py-0.5 text-emerald-300 font-bold">
                  Costo: {primCost}
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Aceptadas: {kruskalAcceptedEdges.length}/6
                </span>
                <span className="flex items-center gap-1 text-rose-400 font-bold">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  Ciclos Evitados: {kruskalRejectedEdges.length}
                </span>
                <span className="rounded-md bg-emerald-900/40 border border-emerald-700/50 px-2 py-0.5 text-emerald-300 font-bold">
                  Costo: {kruskalCost}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 min-h-0 w-full flex flex-col lg:flex-row items-stretch justify-between gap-3 sm:gap-4">
          <div className="w-full lg:w-[48%] xl:w-[50%] shrink-0 min-h-0 h-full rounded-2xl border-2 border-emerald-800/50 bg-zinc-950/90 p-2 sm:p-3 shadow-2xl flex flex-col justify-between items-center overflow-hidden">
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-1.5 px-2 shrink-0">
              <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                Grafo Ponderado G = (V=7, E=12)
              </span>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="inline-block h-2.5 w-4 rounded-xs bg-emerald-500" />
                  Arista MST
                </span>
                {activeTab === 'kruskal' && (
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="inline-block h-2.5 w-4 rounded-xs bg-rose-500" />
                    Ciclo
                  </span>
                )}
                {activeTab === 'kruskal' && (
                  <span className="flex items-center gap-1 text-amber-300">
                    <span className="inline-block h-2.5 w-4 rounded-xs bg-amber-400" />
                    Evaluando
                  </span>
                )}
              </div>
            </div>

            <div className="w-full flex-1 min-h-0 flex items-center justify-center py-1">
              <svg
                viewBox="0 0 540 260"
                className="w-full h-full max-h-[350px] select-none"
              >
                {GRAPH_EDGES.map((edge, idx) => {
                  const uCoord = GRAPH_NODE_POSITIONS[edge.u];
                  const vCoord = GRAPH_NODE_POSITIONS[edge.v];
                  const midX = (uCoord.x + vCoord.x) / 2;
                  const midY = (uCoord.y + vCoord.y) / 2;

                  const isPrimTree = activeTab === 'prim' && isEdgeInPrimTree(edge.u, edge.v);
                  const isLatestPrim = activeTab === 'prim' && isLatestPrimEdge(edge.u, edge.v);
                  const isKruskalAccepted = activeTab === 'kruskal' && isEdgeAcceptedInKruskal(edge.u, edge.v);
                  const isKruskalRejected = activeTab === 'kruskal' && isEdgeRejectedInKruskal(edge.u, edge.v);
                  const isKruskalCurrent = activeTab === 'kruskal' && isCurrentKruskalEdge(edge.u, edge.v);

                  const isAccepted = isPrimTree || isKruskalAccepted;

                  return (
                    <g key={idx}>
                      <line
                        x1={uCoord.x}
                        y1={uCoord.y}
                        x2={vCoord.x}
                        y2={vCoord.y}
                        stroke={
                          isLatestPrim
                            ? '#34d399'
                            : isKruskalCurrent
                            ? '#f59e0b'
                            : isAccepted
                            ? '#10b981'
                            : isKruskalRejected
                            ? '#f43f5e'
                            : '#3f3f46'
                        }
                        strokeWidth={
                          isLatestPrim || isKruskalCurrent
                            ? '4'
                            : isAccepted
                            ? '3.5'
                            : isKruskalRejected
                            ? '2'
                            : '1.5'
                        }
                        strokeDasharray={
                          isKruskalCurrent
                            ? '5 3'
                            : isKruskalRejected
                            ? '4 2'
                            : undefined
                        }
                      />
                      <circle
                        cx={midX}
                        cy={midY}
                        r="8.5"
                        fill="#18181b"
                        stroke={
                          isAccepted
                            ? '#10b981'
                            : isKruskalRejected
                            ? '#f43f5e'
                            : isKruskalCurrent
                            ? '#f59e0b'
                            : '#52525b'
                        }
                        strokeWidth="1.5"
                      />
                      <text
                        x={midX}
                        y={midY + 3.5}
                        fill={
                          isAccepted
                            ? '#34d399'
                            : isKruskalRejected
                            ? '#fb7185'
                            : isKruskalCurrent
                            ? '#fef08a'
                            : '#d4d4d8'
                        }
                        fontSize="10"
                        fontWeight="black"
                        textAnchor="middle"
                      >
                        {edge.w}
                      </text>
                    </g>
                  );
                })}

                {GRAPH_NODES.map((node) => {
                  const coord = GRAPH_NODE_POSITIONS[node];
                  const isInPrimTree = activeTab === 'prim' && currentPrimStep.visited.includes(node);
                  const inKruskalMst =
                    activeTab === 'kruskal' &&
                    (currentKruskalStep.status === 'completed' ||
                      kruskalAcceptedEdges.some(
                        (f) => f.edge && (f.edge[0] === node || f.edge[1] === node)
                      ));

                  const isHighlighted = isInPrimTree || inKruskalMst;

                  return (
                    <g key={node}>
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="18"
                        fill={isHighlighted ? '#059669' : '#27272a'}
                        stroke={isHighlighted ? '#34d399' : '#52525b'}
                        strokeWidth={isHighlighted ? '3' : '2'}
                      />
                      <text
                        x={coord.x}
                        y={coord.y + 4.5}
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="black"
                        textAnchor="middle"
                      >
                        {node.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-1.5 px-2 shrink-0">
              <span>Vértices: |V| = 7</span>
              <span className="text-emerald-400 font-bold">
                Costo Óptimo MST: 18 (Único e idéntico para Prim y Kruskal)
              </span>
              <span>Aristas Finales: |V| - 1 = 6</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 min-h-0 h-full flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3">
            {activeTab === 'prim' ? (
              <>
                <div className="flex-1 min-w-0 min-h-0 h-full rounded-2xl border border-emerald-800/40 bg-zinc-950/80 p-3 sm:p-3.5 flex flex-col justify-between shadow-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
                    <span className="text-xs font-bold font-sans uppercase tracking-wider text-emerald-400">
                      Vértices en Corte (S)
                    </span>
                    <span className="text-xs font-mono text-emerald-300 font-bold">
                      {currentPrimStep.visited.length} / 7
                    </span>
                  </div>

                  <div className="flex-1 flex flex-wrap content-start items-center gap-2 py-1">
                    {GRAPH_NODES.map((node) => {
                      const isVisited = currentPrimStep.visited.includes(node);
                      return (
                        <div
                          key={node}
                          className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 font-mono text-xs font-bold transition-all shadow-xs ${
                            isVisited
                              ? 'border-emerald-500 bg-emerald-500/25 text-emerald-200 ring-2 ring-emerald-400/40'
                              : 'border-zinc-800 bg-zinc-900 text-zinc-500'
                          }`}
                        >
                          <span>{node.toUpperCase()}</span>
                          {isVisited && (
                            <span className="text-[10px] text-emerald-400 font-black">✓</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-zinc-400 border-t border-white/10 pt-2 shrink-0">
                    Propiedad del Corte: Prim cruza de los nodos visitados hacia los no visitados.
                  </p>
                </div>

                <div className="flex-1 min-w-0 min-h-0 h-full rounded-2xl border border-emerald-800/40 bg-zinc-950/80 p-3 sm:p-3.5 flex flex-col justify-between shadow-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
                    <span className="text-xs font-bold font-sans uppercase tracking-wider text-emerald-400">
                      Aristas en Árbol
                    </span>
                    <span className="text-xs font-mono text-zinc-400 font-bold">
                      {currentPrimStep.tree_edges.length} / 6
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col gap-1.5 justify-start py-1">
                    {currentPrimStep.tree_edges.map(([u, v, w], idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-emerald-700/60 bg-emerald-950/60 px-2.5 py-1.5 font-mono text-xs shadow-xs text-emerald-200"
                      >
                        <span className="font-bold">
                          ({u.toUpperCase()}, {v.toUpperCase()})
                        </span>
                        <span className="rounded-md bg-emerald-500 text-zinc-950 font-black px-1.5 py-0.5 text-xs shadow-xs">
                          w = {w}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-zinc-400 border-t border-white/10 pt-2 shrink-0">
                    Suma acumulada del MST: {primCost}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 min-w-0 min-h-0 h-full rounded-2xl border border-emerald-800/40 bg-zinc-950/80 p-3 sm:p-3.5 flex flex-col justify-between shadow-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
                    <span className="text-xs font-bold font-sans uppercase tracking-wider text-emerald-400">
                      Componentes (Union-Find)
                    </span>
                    <span className="text-xs font-mono text-sky-300 font-bold">
                      {currentKruskalStep.components.length} conjuntos
                    </span>
                  </div>

                  <div className="flex-1 flex flex-wrap content-start items-center gap-1.5 py-1">
                    {currentKruskalStep.components.map((comp, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-emerald-800/50 bg-emerald-950/60 px-2.5 py-1.5 font-mono text-xs text-emerald-200 shadow-xs"
                      >
                        {'{ ' + comp.map((c) => c.toUpperCase()).join(', ') + ' }'}
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-zinc-400 border-t border-white/10 pt-2 shrink-0">
                    Union-Find detecta ciclos y fusiona componentes en tiempo casi lineal O(m · α(n)).
                  </p>
                </div>

                <div className="flex-1 min-w-0 min-h-0 h-full rounded-2xl border border-emerald-800/40 bg-zinc-950/80 p-3 sm:p-3.5 flex flex-col justify-between shadow-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
                    <span className="text-xs font-bold font-sans uppercase tracking-wider text-emerald-400">
                      Evaluación de Aristas
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        currentKruskalStep.status === 'completed'
                          ? 'bg-emerald-500 text-zinc-950 font-black'
                          : currentKruskalStep.status === 'accepted'
                          ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/25 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {currentKruskalStep.status === 'completed'
                        ? 'COMPLETO'
                        : currentKruskalStep.status === 'accepted'
                        ? 'ACEPTADA'
                        : 'CICLO'}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center py-1">
                    {currentKruskalStep.edge ? (
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-zinc-400 font-mono">Arista evaluada:</span>
                        <div className="flex items-center gap-2 font-mono text-base font-bold text-white">
                          <span>({currentKruskalStep.edge[0].toUpperCase()}, {currentKruskalStep.edge[1].toUpperCase()})</span>
                          <span className="rounded-lg bg-amber-400 text-zinc-950 px-2.5 py-0.5 text-xs font-black">
                            peso = {currentKruskalStep.edge[2]}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="block text-emerald-400 font-black text-sm font-mono mb-1">
                          ✓ MST Completado
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          6 aristas aceptadas | Costo = 18
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-400 border-t border-white/10 pt-2 shrink-0">
                    MST acumulado: {kruskalCost} (Aceptadas: {kruskalAcceptedEdges.length}/6)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

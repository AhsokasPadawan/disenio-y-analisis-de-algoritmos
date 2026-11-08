import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

interface DfsNode {
  id: string;
  depth: number;
  val?: number;
  decision: string;
  accum: number;
  remaining: number;
  status: 'active' | 'solution' | 'pruned_excess' | 'pruned_deficit';
  x: number;
  y: number;
}

interface SubsetSumStep {
  step: number;
  activeNodeId: string;
  description: string;
}

const TREE_NODES: DfsNode[] = [
  {
    id: 'root',
    depth: 0,
    decision: 'Raíz',
    accum: 0,
    remaining: 28,
    status: 'active',
    x: 250,
    y: 30,
  },
  {
    id: 'v0_no',
    depth: 1,
    val: 5,
    decision: 'x0=0',
    accum: 0,
    remaining: 23,
    status: 'active',
    x: 130,
    y: 90,
  },
  {
    id: 'v0_yes',
    depth: 1,
    val: 5,
    decision: 'x0=1',
    accum: 5,
    remaining: 23,
    status: 'active',
    x: 370,
    y: 90,
  },
  {
    id: 'v0_yes_v1_no',
    depth: 2,
    val: 10,
    decision: 'x1=0',
    accum: 5,
    remaining: 13,
    status: 'active',
    x: 310,
    y: 160,
  },
  {
    id: 'v0_yes_v1_yes',
    depth: 2,
    val: 10,
    decision: 'x1=1',
    accum: 15,
    remaining: 13,
    status: 'pruned_excess',
    x: 430,
    y: 160,
  },
  {
    id: 'v0_yes_v1_no_v2_yes',
    depth: 3,
    val: 6,
    decision: 'x2=1',
    accum: 11,
    remaining: 7,
    status: 'solution',
    x: 310,
    y: 230,
  },
  {
    id: 'v0_no_v1_yes',
    depth: 2,
    val: 10,
    decision: 'x1=1',
    accum: 10,
    remaining: 13,
    status: 'active',
    x: 180,
    y: 160,
  },
  {
    id: 'v0_no_v1_yes_v2_yes',
    depth: 3,
    val: 6,
    decision: 'x2=1',
    accum: 16,
    remaining: 7,
    status: 'pruned_excess',
    x: 180,
    y: 230,
  },
];

const SUBSET_SUM_STEPS: SubsetSumStep[] = [
  {
    step: 1,
    activeNodeId: 'root',
    description:
      'Nodo Raíz: Suma acumulada = 0, Suma remanente de elementos restantes {5, 10, 6, 7} = 28. Objetivo m = 11.',
  },
  {
    step: 2,
    activeNodeId: 'v0_yes',
    description:
      'Rama Inclusión v0 = 5 (x0 = 1): Suma acumulada = 5. Como 5 ≤ 11 y 5 + 23 ≥ 11, la rama es factible y continúa.',
  },
  {
    step: 3,
    activeNodeId: 'v0_yes_v1_yes',
    description:
      'Rama Inclusión v1 = 10 (x1 = 1): Suma acumulada = 5 + 10 = 15 > 11. PODA POR EXCESO (Criterio 1: Suma > m). Se corta la rama con ✗.',
  },
  {
    step: 4,
    activeNodeId: 'v0_yes_v1_no',
    description:
      'Backtracking a Rama Exclusión v1 = 10 (x1 = 0): Suma acumulada se mantiene en 5. Suma remanente {6, 7} = 13. Factible.',
  },
  {
    step: 5,
    activeNodeId: 'v0_yes_v1_no_v2_yes',
    description:
      'Rama Inclusión v2 = 6 (x2 = 1): Suma acumulada = 5 + 6 = 11 == m. ¡SOLUCIÓN ÓPTIMA ENCONTRADA! Subconjunto: {5, 6}.',
  },
];

const NODE_STATUS_COLORS: Record<
  DfsNode['status'],
  { fill: string; stroke: string }
> = {
  active: { fill: '#27272a', stroke: '#71717a' },
  solution: { fill: '#7c3aed', stroke: '#a78bfa' },
  pruned_excess: { fill: '#dc2626', stroke: '#f87171' },
  pruned_deficit: { fill: '#dc2626', stroke: '#f87171' },
};

export function SubsetSumTreeVisualizer() {
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
  } = useVisualizerPlayback(SUBSET_SUM_STEPS);

  return (
    <AnimationPlayerShell
      title="Árbol DFS de Backtracking: Suma de Subconjuntos V={5, 10, 6, 7}, m=11"
      badge="Backtracking"
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
      <div className="flex flex-col items-center justify-center gap-4 py-2">
        <div className="relative overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-inner w-full">
          <svg viewBox="0 0 500 280" className="mx-auto block h-64 w-full max-w-[500px]">
            <line x1="250" y1="30" x2="130" y2="90" stroke="#52525b" strokeWidth="1.5" />
            <line x1="250" y1="30" x2="370" y2="90" stroke="#52525b" strokeWidth="1.5" />
            <line x1="370" y1="90" x2="310" y2="160" stroke="#52525b" strokeWidth="1.5" />
            <line x1="370" y1="90" x2="430" y2="160" stroke="#52525b" strokeWidth="1.5" />
            <line x1="310" y1="160" x2="310" y2="230" stroke="#52525b" strokeWidth="1.5" />
            <line x1="130" y1="90" x2="180" y2="160" stroke="#52525b" strokeWidth="1.5" />
            <line x1="180" y1="160" x2="180" y2="230" stroke="#52525b" strokeWidth="1.5" />

            {TREE_NODES.map((node) => {
              const isCurrent = node.id === frame.activeNodeId;
              const isSolution = node.status === 'solution';
              const isPruned = node.status === 'pruned_excess';
              const statusColors = NODE_STATUS_COLORS[node.status];

              const fill = isCurrent ? '#fbbf24' : statusColors.fill;
              const stroke = isCurrent ? '#f59e0b' : statusColors.stroke;
              const strokeWidth = isCurrent ? '3' : '1.5';

              return (
                <g key={node.id} className="transition-all duration-300">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="18"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    fill={isCurrent ? '#18181b' : '#ffffff'}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Σ={node.accum}
                  </text>
                  <text
                    x={node.x + 24}
                    y={node.y + 4}
                    fill="#a1a1aa"
                    fontSize="9"
                    fontWeight="mono"
                  >
                    {node.decision}
                  </text>
                  {isPruned && (
                    <text
                      x={node.x}
                      y={node.y + 30}
                      fill="#f87171"
                      fontSize="11"
                      fontWeight="black"
                      textAnchor="middle"
                    >
                      ✗ Poda
                    </text>
                  )}
                  {isSolution && (
                    <text
                      x={node.x}
                      y={node.y + 30}
                      fill="#c4b5fd"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ✓ Solución
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-300 border-t border-zinc-800/80 pt-2 w-full">
          <span>Reglas de Poda Formales:</span>
          <span className="text-rose-400">1. Poda por Exceso: suma &gt; m</span>
          <span className="text-amber-400">
            2. Poda por Defecto: suma + remanente &lt; m
          </span>
          <span className="text-violet-300 font-bold">Solución: &#123;5, 6&#125;</span>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

import { useState } from 'react';
import { Zap, Layers, Database } from 'lucide-react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

type NodeStatus = 'hidden' | 'calling' | 'base-case' | 'memoized' | 'cache-hit' | 'pruned';

interface TreeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  parent?: string;
  value?: number;
}

const TREE_NODES: TreeNode[] = [
  { id: 'f5', label: 'F(5)', x: 310, y: 28, value: 5 },
  { id: 'f4', label: 'F(4)', x: 160, y: 88, parent: 'f5', value: 3 },
  { id: 'f3_r', label: 'F(3)', x: 460, y: 88, parent: 'f5', value: 2 },
  { id: 'f3_l', label: 'F(3)', x: 95, y: 155, parent: 'f4', value: 2 },
  { id: 'f2_r', label: 'F(2)', x: 225, y: 155, parent: 'f4', value: 1 },
  { id: 'f2_rl', label: 'F(2)', x: 405, y: 155, parent: 'f3_r', value: 1 },
  { id: 'f1_rr', label: 'F(1)', x: 515, y: 155, parent: 'f3_r', value: 1 },
  { id: 'f2_l', label: 'F(2)', x: 55, y: 225, parent: 'f3_l', value: 1 },
  { id: 'f1_lr', label: 'F(1)', x: 135, y: 225, parent: 'f3_l', value: 1 },
  { id: 'f1_rl', label: 'F(1)', x: 195, y: 225, parent: 'f2_r', value: 1 },
  { id: 'f0_rr', label: 'F(0)', x: 255, y: 225, parent: 'f2_r', value: 0 },
  { id: 'f1_rll', label: 'F(1)', x: 375, y: 225, parent: 'f2_rl', value: 1 },
  { id: 'f0_rlr', label: 'F(0)', x: 435, y: 225, parent: 'f2_rl', value: 0 },
  { id: 'f1_ll', label: 'F(1)', x: 30, y: 290, parent: 'f2_l', value: 1 },
  { id: 'f0_ll', label: 'F(0)', x: 80, y: 290, parent: 'f2_l', value: 0 },
];

interface StepSpec {
  title: string;
  badge: string;
  actionType: 'call' | 'base' | 'memo' | 'prune' | 'optimal';
  description: string;
  memo: Record<number, number>;
  activeMemoKey?: number;
  memoAction?: 'write' | 'read';
  nodeStates: Record<string, NodeStatus>;
  callsEvaluated: number;
  callsPruned: number;
  cacheHits: number;
}

const STEPS: StepSpec[] = [
  {
    title: 'Paso 0: Llamada Inicial a la Raíz F(5)',
    badge: '1. Apertura de Marco',
    actionType: 'call',
    description: 'Se invoca F(5) en la raíz. La tabla memo está completamente vacía. F(5) comprueba si memo[5] existe; al no encontrarlo, se ramifica hacia su hijo izquierdo F(4).',
    memo: {},
    nodeStates: {
      f5: 'calling',
    },
    callsEvaluated: 1,
    callsPruned: 0,
    cacheHits: 0,
  },
  {
    title: 'Paso 1: Llamada Recursiva a F(4)',
    badge: '1. Descenso Pre-order',
    actionType: 'call',
    description: 'F(5) invoca F(4). El nodo F(4) se abre en estado activo. memo[4] no está en la tabla, por lo que desciende inmediatamente hacia F(3).',
    memo: {},
    nodeStates: {
      f5: 'calling',
      f4: 'calling',
    },
    callsEvaluated: 2,
    callsPruned: 0,
    cacheHits: 0,
  },
  {
    title: 'Paso 2: Llamada Recursiva a F(3)',
    badge: '1. Descenso Pre-order',
    actionType: 'call',
    description: 'F(4) invoca a F(3). Se abre el nodo F(3). memo[3] no existe aún en caché. Continúa la exploración en profundidad llamando a F(2).',
    memo: {},
    nodeStates: {
      f5: 'calling',
      f4: 'calling',
      f3_l: 'calling',
    },
    callsEvaluated: 3,
    callsPruned: 0,
    cacheHits: 0,
  },
  {
    title: 'Paso 3: Llamada Recursiva a F(2)',
    badge: '1. Descenso Pre-order',
    actionType: 'call',
    description: 'F(3) invoca a F(2). memo[2] está vacío. F(2) se abre y procede a evaluar a su hijo izquierdo F(1).',
    memo: {},
    nodeStates: {
      f5: 'calling',
      f4: 'calling',
      f3_l: 'calling',
      f2_l: 'calling',
    },
    callsEvaluated: 4,
    callsPruned: 0,
    cacheHits: 0,
  },
  {
    title: 'Paso 4: Caso Base Trivial F(1) = 1',
    badge: '2. Caso Base Trivial',
    actionType: 'base',
    description: 'F(2) evalúa F(1). Como n = 1 ≤ 1, es un caso base trivial que retorna 1 sin bifurcarse. Se registra de forma inmediata memo[1] = 1.',
    memo: { 1: 1 },
    activeMemoKey: 1,
    memoAction: 'write',
    nodeStates: {
      f5: 'calling',
      f4: 'calling',
      f3_l: 'calling',
      f2_l: 'calling',
      f1_ll: 'base-case',
    },
    callsEvaluated: 5,
    callsPruned: 0,
    cacheHits: 0,
  },
  {
    title: 'Paso 5: Caso Base Trivial F(0) = 0',
    badge: '2. Caso Base Trivial',
    actionType: 'base',
    description: 'F(2) evalúa su hijo derecho F(0). Caso base trivial n = 0: retorna 0 de forma inmediata. Se registra memo[0] = 0 en la tabla.',
    memo: { 0: 0, 1: 1 },
    activeMemoKey: 0,
    memoAction: 'write',
    nodeStates: {
      f5: 'calling',
      f4: 'calling',
      f3_l: 'calling',
      f2_l: 'calling',
      f1_ll: 'base-case',
      f0_ll: 'base-case',
    },
    callsEvaluated: 6,
    callsPruned: 0,
    cacheHits: 0,
  },
  {
    title: 'Paso 6: Acción de Memoización — Guardado de F(2) = 1',
    badge: '3. Escritura en Caché',
    actionType: 'memo',
    description: 'F(2) suma F(1) + F(0) = 1 + 0 = 1. ¡Acción de Memoización!: Escribe memo[2] = 1 en la tabla caché. A partir de este instante, F(2) jamás se volverá a recalcular. Retorna 1 a F(3).',
    memo: { 0: 0, 1: 1, 2: 1 },
    activeMemoKey: 2,
    memoAction: 'write',
    nodeStates: {
      f5: 'calling',
      f4: 'calling',
      f3_l: 'calling',
      f2_l: 'memoized',
      f1_ll: 'base-case',
      f0_ll: 'base-case',
    },
    callsEvaluated: 6,
    callsPruned: 0,
    cacheHits: 0,
  },
  {
    title: 'Paso 7: Rama Derecha de F(3) — Caso Base F(1) = 1',
    badge: '2. Caso Base Trivial',
    actionType: 'base',
    description: 'F(3) invoca a su hijo derecho F(1). Al ser caso base trivial (o consulta a memo[1]), retorna 1 de inmediato sin bifurcación adicional.',
    memo: { 0: 0, 1: 1, 2: 1 },
    nodeStates: {
      f5: 'calling',
      f4: 'calling',
      f3_l: 'calling',
      f2_l: 'memoized',
      f1_ll: 'base-case',
      f0_ll: 'base-case',
      f1_lr: 'base-case',
    },
    callsEvaluated: 7,
    callsPruned: 0,
    cacheHits: 0,
  },
  {
    title: 'Paso 8: Acción de Memoización — Guardado de F(3) = 2',
    badge: '3. Escritura en Caché',
    actionType: 'memo',
    description: 'F(3) suma memo[2] (1) + memo[1] (1) = 2. ¡Acción de Memoización!: Escribe memo[3] = 2 en la tabla caché con costo O(1). Retorna 2 a su llamador F(4).',
    memo: { 0: 0, 1: 1, 2: 1, 3: 2 },
    activeMemoKey: 3,
    memoAction: 'write',
    nodeStates: {
      f5: 'calling',
      f4: 'calling',
      f3_l: 'memoized',
      f2_l: 'memoized',
      f1_ll: 'base-case',
      f0_ll: 'base-case',
      f1_lr: 'base-case',
    },
    callsEvaluated: 7,
    callsPruned: 0,
    cacheHits: 0,
  },
  {
    title: 'Paso 9: ⚡ Acción de Poda — Cache Hit O(1) en F(2) de F(4)',
    badge: '4. Cache Hit O(1) & Poda',
    actionType: 'prune',
    description: 'F(4) invoca su hijo derecho F(2). Consulta la tabla: ¡memo[2] = 1 ya está calculado! Lee el valor en O(1) y poda el subárbol completo (F(1) y F(0)) sin expandirlo, ahorrando 2 llamadas recursivas.',
    memo: { 0: 0, 1: 1, 2: 1, 3: 2 },
    activeMemoKey: 2,
    memoAction: 'read',
    nodeStates: {
      f5: 'calling',
      f4: 'calling',
      f3_l: 'memoized',
      f2_l: 'memoized',
      f1_ll: 'base-case',
      f0_ll: 'base-case',
      f1_lr: 'base-case',
      f2_r: 'cache-hit',
      f1_rl: 'pruned',
      f0_rr: 'pruned',
    },
    callsEvaluated: 7,
    callsPruned: 2,
    cacheHits: 1,
  },
  {
    title: 'Paso 10: Acción de Memoización — Guardado de F(4) = 3',
    badge: '3. Escritura en Caché',
    actionType: 'memo',
    description: 'F(4) suma memo[3] (2) + memo[2] (1) = 3. Escribe memo[4] = 3 en la tabla. Toda la rama izquierda de la raíz F(5) queda completamente resuelta.',
    memo: { 0: 0, 1: 1, 2: 1, 3: 2, 4: 3 },
    activeMemoKey: 4,
    memoAction: 'write',
    nodeStates: {
      f5: 'calling',
      f4: 'memoized',
      f3_l: 'memoized',
      f2_l: 'memoized',
      f1_ll: 'base-case',
      f0_ll: 'base-case',
      f1_lr: 'base-case',
      f2_r: 'cache-hit',
      f1_rl: 'pruned',
      f0_rr: 'pruned',
    },
    callsEvaluated: 8,
    callsPruned: 2,
    cacheHits: 1,
  },
  {
    title: 'Paso 11: ⚡ Acción de Poda Masiva — Cache Hit O(1) en F(3) de F(5)',
    badge: '4. Poda Masiva de Subárbol',
    actionType: 'prune',
    description: 'La raíz F(5) pide su hijo derecho F(3). Sin DP esto abriría 5 llamadas más. Consulta la tabla: memo[3] = 2 existe. ¡Lectura en O(1)! Poda todo el subárbol derecho de 5 nodos de un solo golpe ✂.',
    memo: { 0: 0, 1: 1, 2: 1, 3: 2, 4: 3 },
    activeMemoKey: 3,
    memoAction: 'read',
    nodeStates: {
      f5: 'calling',
      f4: 'memoized',
      f3_l: 'memoized',
      f2_l: 'memoized',
      f1_ll: 'base-case',
      f0_ll: 'base-case',
      f1_lr: 'base-case',
      f2_r: 'cache-hit',
      f1_rl: 'pruned',
      f0_rr: 'pruned',
      f3_r: 'cache-hit',
      f2_rl: 'pruned',
      f1_rr: 'pruned',
      f1_rll: 'pruned',
      f0_rlr: 'pruned',
    },
    callsEvaluated: 8,
    callsPruned: 7,
    cacheHits: 2,
  },
  {
    title: 'Paso 12: Resultado Final — memo[5] = 5 con Optimalidad O(n)',
    badge: '5. Solución Óptima',
    actionType: 'optimal',
    description: 'F(5) = memo[4] (3) + memo[3] (2) = 5. Se almacena memo[5] = 5. El cálculo concluye evaluando solo 8 llamadas frente a las 15 de la recursión ingenua (7 podadas, 46.7% ahorro).',
    memo: { 0: 0, 1: 1, 2: 1, 3: 2, 4: 3, 5: 5 },
    activeMemoKey: 5,
    memoAction: 'write',
    nodeStates: {
      f5: 'memoized',
      f4: 'memoized',
      f3_l: 'memoized',
      f2_l: 'memoized',
      f1_ll: 'base-case',
      f0_ll: 'base-case',
      f1_lr: 'base-case',
      f2_r: 'cache-hit',
      f1_rl: 'pruned',
      f0_rr: 'pruned',
      f3_r: 'cache-hit',
      f2_rl: 'pruned',
      f1_rr: 'pruned',
      f1_rll: 'pruned',
      f0_rlr: 'pruned',
    },
    callsEvaluated: 8,
    callsPruned: 7,
    cacheHits: 2,
  },
];

const NODE_VISUAL_STYLES: Record<
  NodeStatus,
  {
    fill: string;
    stroke: string;
    strokeDasharray?: string;
    textColor: string;
    badgeLabel?: string;
    badgeBg?: string;
    badgeTextColor?: string;
    opacity: number;
    showInSvg: boolean;
  }
> = {
  hidden: {
    fill: 'transparent',
    stroke: 'transparent',
    textColor: 'transparent',
    opacity: 0,
    showInSvg: false,
  },
  calling: {
    fill: '#451a03',
    stroke: '#f59e0b',
    textColor: '#fef3c7',
    badgeLabel: 'Llamada...',
    badgeBg: '#b45309',
    badgeTextColor: '#fef3c7',
    opacity: 1,
    showInSvg: true,
  },
  'base-case': {
    fill: '#064e3b',
    stroke: '#34d399',
    textColor: '#ecfdf5',
    badgeLabel: 'Base',
    badgeBg: '#059669',
    badgeTextColor: '#ecfdf5',
    opacity: 1,
    showInSvg: true,
  },
  memoized: {
    fill: '#064e3b',
    stroke: '#10b981',
    textColor: '#ecfdf5',
    badgeLabel: 'memo',
    badgeBg: '#047857',
    badgeTextColor: '#d1fae5',
    opacity: 1,
    showInSvg: true,
  },
  'cache-hit': {
    fill: '#083344',
    stroke: '#06b6d4',
    textColor: '#cffafe',
    badgeLabel: '⚡ Hit O(1)',
    badgeBg: '#0891b2',
    badgeTextColor: '#ecfeff',
    opacity: 1,
    showInSvg: true,
  },
  pruned: {
    fill: '#18181b',
    stroke: '#ef4444',
    strokeDasharray: '3 3',
    textColor: '#ef4444',
    badgeLabel: '✂ Poda',
    badgeBg: '#7f1d1d',
    badgeTextColor: '#fecaca',
    opacity: 0.5,
    showInSvg: true,
  },
};

const EDGE_VISUAL_STYLES: Record<
  NodeStatus,
  { stroke: string; strokeDasharray?: string; opacity: number }
> = {
  hidden: { stroke: 'transparent', opacity: 0 },
  calling: { stroke: '#f59e0b', opacity: 0.9 },
  'base-case': { stroke: '#34d399', opacity: 0.9 },
  memoized: { stroke: '#10b981', opacity: 0.9 },
  'cache-hit': { stroke: '#06b6d4', strokeDasharray: '3 3', opacity: 0.9 },
  pruned: { stroke: '#ef4444', strokeDasharray: '3 3', opacity: 0.35 },
};

const ACTION_BADGE_STYLES: Record<
  StepSpec['actionType'],
  { bg: string; border: string; text: string }
> = {
  call: { bg: 'bg-amber-950/70', border: 'border-amber-600/60', text: 'text-amber-300' },
  base: { bg: 'bg-emerald-950/70', border: 'border-emerald-600/60', text: 'text-emerald-300' },
  memo: { bg: 'bg-teal-950/70', border: 'border-teal-600/60', text: 'text-teal-300' },
  prune: { bg: 'bg-rose-950/70', border: 'border-rose-600/60', text: 'text-rose-300' },
  optimal: { bg: 'bg-emerald-900', border: 'border-emerald-400', text: 'text-white' },
};

export function FibonacciMemoizationVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const step = STEPS[currentStep] ?? STEPS[0];
  const badgeStyle = ACTION_BADGE_STYLES[step.actionType];

  return (
    <AnimationPlayerShell
      title="Árbol Recursivo Dinámico vs Tabla Caché Memoizada F(5)"
      badge="Programación Dinámica · Top-Down con Memoización"
      currentStep={currentStep}
      totalSteps={STEPS.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={step.description}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="flex flex-col gap-2.5 py-1 w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-emerald-800/40 pb-1.5 text-xs">
          <span className="font-bold text-emerald-300">
            {step.title}
          </span>
          <span className={`rounded px-2.5 py-0.5 font-mono text-[11px] font-bold border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text}`}>
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
                  const parentNode = TREE_NODES.find((candidate) => candidate.id === node.parent);
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
                      strokeWidth={nodeStatus === 'calling' || nodeStatus === 'cache-hit' ? 2.5 : 1.5}
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

                  const radius = node.id === 'f5' ? 19 : node.parent === 'f5' ? 17 : 14;
                  const displayValue = step.memo[node.value ?? -1] !== undefined
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
                        strokeWidth={nodeStatus === 'calling' || nodeStatus === 'cache-hit' ? 2.5 : 1.5}
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
                  <span className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    step.memoAction === 'write'
                      ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                      : 'bg-cyan-950 border border-cyan-600 text-cyan-300'
                  }`}>
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
                      <span className={`text-xs font-black mt-0.5 ${
                        isCurrent
                          ? 'text-white'
                          : isWritten
                          ? 'text-emerald-300'
                          : 'text-zinc-600'
                      }`}>
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
                <strong className="text-amber-300 font-bold">{step.callsEvaluated} / 15</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Cache Hits O(1):</span>
                <strong className="text-cyan-300 font-bold">{step.cacheHits}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Llamadas Podadas:</span>
                <strong className="text-rose-400 font-bold">{step.callsPruned} (46.7% ahorro)</strong>
              </div>
              <div className="border-t border-zinc-800 pt-1 flex items-center justify-between">
                <span className="text-zinc-400">Complejidad:</span>
                <span className="text-emerald-300 font-bold">O(n) tiempo · O(n) espacio</span>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-800/30 bg-emerald-950/20 p-2 text-[10px] text-zinc-300 flex flex-col gap-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                Invariante de Programación Dinámica:
              </span>
              <span>
                Cada subproblema F(k) se evalúa exactamente <strong>1 vez</strong>. Todo intento posterior se resuelve en tiempo <strong>O(1)</strong> en caché.
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

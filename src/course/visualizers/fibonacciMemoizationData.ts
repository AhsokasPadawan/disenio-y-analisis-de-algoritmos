export type NodeStatus =
  | 'hidden'
  | 'calling'
  | 'base-case'
  | 'memoized'
  | 'cache-hit'
  | 'pruned';

export interface TreeNode {
  id: string;
  label: string;
  x: number;
  y: number;
  parent?: string;
  value?: number;
}

export const TREE_NODES: TreeNode[] = [
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

export interface StepSpec {
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

export const STEPS: StepSpec[] = [
  {
    title: 'Paso 0: Llamada Inicial a la Raíz F(5)',
    badge: '1. Apertura de Marco',
    actionType: 'call',
    description:
      'Se invoca F(5) en la raíz. La tabla memo está completamente vacía. F(5) comprueba si memo[5] existe; al no encontrarlo, se ramifica hacia su hijo izquierdo F(4).',
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
    description:
      'F(5) invoca F(4). El nodo F(4) se abre en estado activo. memo[4] no está en la tabla, por lo que desciende inmediatamente hacia F(3).',
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
    description:
      'F(4) invoca a F(3). Se abre el nodo F(3). memo[3] no existe aún en caché. Continúa la exploración en profundidad llamando a F(2).',
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
    description:
      'F(3) invoca a F(2). memo[2] está vacío. F(2) se abre y procede a evaluar a su hijo izquierdo F(1).',
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
    description:
      'F(2) evalúa F(1). Como n = 1 ≤ 1, es un caso base trivial que retorna 1 sin bifurcarse. Se registra de forma inmediata memo[1] = 1.',
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
    description:
      'F(2) evalúa su hijo derecho F(0). Caso base trivial n = 0: retorna 0 de forma inmediata. Se registra memo[0] = 0 en la tabla.',
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
    description:
      'F(2) suma F(1) + F(0) = 1 + 0 = 1. ¡Acción de Memoización!: Escribe memo[2] = 1 en la tabla caché. A partir de este instante, F(2) jamás se volverá a recalcular. Retorna 1 a F(3).',
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
    description:
      'F(3) invoca a su hijo derecho F(1). Al ser caso base trivial (o consulta a memo[1]), retorna 1 de inmediato sin bifurcación adicional.',
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
    description:
      'F(3) suma memo[2] (1) + memo[1] (1) = 2. ¡Acción de Memoización!: Escribe memo[3] = 2 en la tabla caché con costo O(1). Retorna 2 a su llamador F(4).',
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
    description:
      'F(4) invoca su hijo derecho F(2). Consulta la tabla: ¡memo[2] = 1 ya está calculado! Lee el valor en O(1) y poda el subárbol completo (F(1) y F(0)) sin expandirlo, ahorrando 2 llamadas recursivas.',
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
    description:
      'F(4) suma memo[3] (2) + memo[2] (1) = 3. Escribe memo[4] = 3 en la tabla. Toda la rama izquierda de la raíz F(5) queda completamente resuelta.',
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
    description:
      'La raíz F(5) pide su hijo derecho F(3). Sin DP esto abriría 5 llamadas más. Consulta la tabla: memo[3] = 2 existe. ¡Lectura en O(1)! Poda todo el subárbol derecho de 5 nodos de un solo golpe ✂.',
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
    description:
      'F(5) = memo[4] (3) + memo[3] (2) = 5. Se almacena memo[5] = 5. El cálculo concluye evaluando solo 8 llamadas frente a las 15 de la recursión ingenua (7 podadas, 46.7% ahorro).',
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

export const NODE_VISUAL_STYLES: Record<
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

export const EDGE_VISUAL_STYLES: Record<
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

export const ACTION_BADGE_STYLES: Record<
  StepSpec['actionType'],
  { bg: string; border: string; text: string }
> = {
  call: { bg: 'bg-amber-950/70', border: 'border-amber-600/60', text: 'text-amber-300' },
  base: { bg: 'bg-emerald-950/70', border: 'border-emerald-600/60', text: 'text-emerald-300' },
  memo: { bg: 'bg-teal-950/70', border: 'border-teal-600/60', text: 'text-teal-300' },
  prune: { bg: 'bg-rose-950/70', border: 'border-rose-600/60', text: 'text-rose-300' },
  optimal: { bg: 'bg-emerald-900', border: 'border-emerald-400', text: 'text-white' },
};

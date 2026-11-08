export interface KnapsackItem {
  id: number;
  name: string;
  weight: number;
  value: number;
}

export interface StepDetail {
  step: number;
  phase: 'tabulation' | 'backtracking' | 'complete';
  title: string;
  badge: string;
  description: string;
  highlightCell?: [number, number];
  withoutCell?: [number, number];
  withCell?: [number, number];
  visibleUpToRow: number;
  visibleUpToCol: number;
  backtrackPath: [number, number][];
  selectedItemIds: number[];
  formulaComparison?: {
    withoutVal: number;
    withVal: number;
    winner: 'without' | 'with';
  };
}

export const ITEMS: KnapsackItem[] = [
  { id: 1, name: 'Obj 1', weight: 2, value: 3 },
  { id: 2, name: 'Obj 2', weight: 3, value: 4 },
  { id: 3, name: 'Obj 3', weight: 4, value: 5 },
  { id: 4, name: 'Obj 4', weight: 5, value: 8 },
];

export const FULL_MATRIX: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 3, 3, 3, 3, 3],
  [0, 0, 3, 4, 4, 7, 7, 7],
  [0, 0, 3, 4, 5, 7, 8, 9],
  [0, 0, 3, 4, 5, 8, 8, 11],
];

export const KNAPSACK_STEPS: StepDetail[] = [
  {
    step: 0,
    phase: 'tabulation',
    title: 'Paso 0: Fila Base i = 0 (Sin Objetos)',
    badge: '1. Casos Base',
    description:
      'Con 0 objetos disponibles, el valor obtenido para cualquier capacidad w ∈ [0..7] es 0. Se inicializa la primera fila V[0, w] = 0.',
    visibleUpToRow: 0,
    visibleUpToCol: 7,
    backtrackPath: [],
    selectedItemIds: [],
  },
  {
    step: 1,
    phase: 'tabulation',
    title: 'Paso 1: Objeto 1 (p₁ = 2, v₁ = 3)',
    badge: '2. Tabulación Fila 1',
    description:
      'Para w < 2 no entra (valor 0). A partir de w ≥ 2, se incluye aportando valor 3. V[1, 2..7] = 3.',
    highlightCell: [1, 2],
    withoutCell: [0, 2],
    withCell: [0, 0],
    visibleUpToRow: 1,
    visibleUpToCol: 7,
    backtrackPath: [],
    selectedItemIds: [],
    formulaComparison: {
      withoutVal: 0,
      withVal: 3,
      winner: 'with',
    },
  },
  {
    step: 2,
    phase: 'tabulation',
    title: 'Paso 2: Objeto 2 (p₂ = 3, v₂ = 4) en w = 3',
    badge: '2. Ecuación Bellman',
    description:
      'Para w = 3 compiten: Opción sin Obj 2: V[1, 3] = 3 vs Con Obj 2: V[1, 3-3] + 4 = 0 + 4 = 4. max(3, 4) = 4 (gana incluirlo).',
    highlightCell: [2, 3],
    withoutCell: [1, 3],
    withCell: [1, 0],
    visibleUpToRow: 2,
    visibleUpToCol: 4,
    backtrackPath: [],
    selectedItemIds: [],
    formulaComparison: {
      withoutVal: 3,
      withVal: 4,
      winner: 'with',
    },
  },
  {
    step: 3,
    phase: 'tabulation',
    title: 'Paso 3: Objeto 2 (p₂ = 3, v₂ = 4) en w = 5 — Combinación',
    badge: '2. Ecuación Bellman',
    description:
      'En w = 5: Sin Obj 2 da V[1, 5] = 3. Con Obj 2 da V[1, 5-3] + 4 = V[1, 2] + 4 = 3 + 4 = 7. ¡Entran Obj 1 y Obj 2 juntos!',
    highlightCell: [2, 5],
    withoutCell: [1, 5],
    withCell: [1, 2],
    visibleUpToRow: 2,
    visibleUpToCol: 7,
    backtrackPath: [],
    selectedItemIds: [],
    formulaComparison: {
      withoutVal: 3,
      withVal: 7,
      winner: 'with',
    },
  },
  {
    step: 4,
    phase: 'tabulation',
    title: 'Paso 4: Objeto 3 (p₃ = 4, v₃ = 5) en w = 7',
    badge: '2. Ecuación Bellman',
    description:
      'En w = 7: Sin Obj 3 da V[2, 7] = 7. Con Obj 3 da V[2, 7-4] + 5 = V[2, 3] + 5 = 4 + 5 = 9. max(7, 9) = 9.',
    highlightCell: [3, 7],
    withoutCell: [2, 7],
    withCell: [2, 3],
    visibleUpToRow: 3,
    visibleUpToCol: 7,
    backtrackPath: [],
    selectedItemIds: [],
    formulaComparison: {
      withoutVal: 7,
      withVal: 9,
      winner: 'with',
    },
  },
  {
    step: 5,
    phase: 'tabulation',
    title: 'Paso 5: Objeto 4 (p₄ = 5, v₄ = 8) en w = 7 — Valor Óptimo',
    badge: '2. Valor Global Óptimo',
    description:
      'En celda final V[4, 7]: Sin Obj 4 da V[3, 7] = 9. Con Obj 4 da V[3, 7-5] + 8 = V[3, 2] + 8 = 3 + 8 = 11. max(9, 11) = 11. ¡Valor máximo alcanzable = 11!',
    highlightCell: [4, 7],
    withoutCell: [3, 7],
    withCell: [3, 2],
    visibleUpToRow: 4,
    visibleUpToCol: 7,
    backtrackPath: [[4, 7]],
    selectedItemIds: [],
    formulaComparison: {
      withoutVal: 9,
      withVal: 11,
      winner: 'with',
    },
  },
  {
    step: 6,
    phase: 'backtracking',
    title: 'Paso 6: Backtracking Inverso — V[4, 7] = 11 vs V[3, 7] = 9',
    badge: '3. Backtracking Inverso',
    description:
      'Desde V[4, 7] = 11: Como V[4, 7] ≠ V[3, 7] (11 ≠ 9), el Objeto 4 FUE INCLUIDO. Restamos peso: 7 - 5 = 2. Saltamos a V[3, 2].',
    highlightCell: [4, 7],
    withoutCell: [3, 7],
    visibleUpToRow: 4,
    visibleUpToCol: 7,
    backtrackPath: [
      [4, 7],
      [3, 2],
    ],
    selectedItemIds: [4],
  },
  {
    step: 7,
    phase: 'backtracking',
    title: 'Paso 7: Backtracking Inverso — V[3, 2] = 3 vs V[2, 2] = 3',
    badge: '3. Backtracking Inverso',
    description:
      'En V[3, 2] = 3: V[3, 2] == V[2, 2] (3 == 3) → El Objeto 3 NO se incluyó (provino de arriba). Capacidad se mantiene en 2. Saltamos a V[2, 2].',
    highlightCell: [3, 2],
    withoutCell: [2, 2],
    visibleUpToRow: 4,
    visibleUpToCol: 7,
    backtrackPath: [
      [4, 7],
      [3, 2],
      [2, 2],
    ],
    selectedItemIds: [4],
  },
  {
    step: 8,
    phase: 'backtracking',
    title: 'Paso 8: Backtracking Inverso — V[2, 2] = 3 vs V[1, 2] = 3',
    badge: '3. Backtracking Inverso',
    description:
      'En V[2, 2] = 3: V[2, 2] == V[1, 2] (3 == 3) → El Objeto 2 NO se incluyó. Capacidad remanente se mantiene en 2. Saltamos a V[1, 2].',
    highlightCell: [2, 2],
    withoutCell: [1, 2],
    visibleUpToRow: 4,
    visibleUpToCol: 7,
    backtrackPath: [
      [4, 7],
      [3, 2],
      [2, 2],
      [1, 2],
    ],
    selectedItemIds: [4],
  },
  {
    step: 9,
    phase: 'backtracking',
    title: 'Paso 9: Backtracking Inverso — V[1, 2] = 3 vs V[0, 2] = 0',
    badge: '3. Backtracking Inverso',
    description:
      'En V[1, 2] = 3: V[1, 2] ≠ V[0, 2] (3 ≠ 0) → El Objeto 1 FUE INCLUIDO. Restamos peso: 2 - 2 = 0. Saltamos a V[0, 0].',
    highlightCell: [1, 2],
    withoutCell: [0, 2],
    visibleUpToRow: 4,
    visibleUpToCol: 7,
    backtrackPath: [
      [4, 7],
      [3, 2],
      [2, 2],
      [1, 2],
      [0, 0],
    ],
    selectedItemIds: [4, 1],
  },
  {
    step: 10,
    phase: 'complete',
    title: 'Paso 10: Solución Óptima Reconstruida — {Obj 1, Obj 4}',
    badge: '4. Solución Óptima',
    description:
      'Llegamos a fila 0 con capacidad remanente 0. Conjunto óptimo: {Obj 1, Obj 4}. Peso total = 2 + 5 = 7 ≤ 7. Valor máximo = 3 + 8 = 11.',
    visibleUpToRow: 4,
    visibleUpToCol: 7,
    backtrackPath: [
      [4, 7],
      [3, 2],
      [2, 2],
      [1, 2],
      [0, 0],
    ],
    selectedItemIds: [1, 4],
  },
];

export const PHASE_BADGE_STYLES: Record<
  StepDetail['phase'],
  { bg: string; border: string; text: string }
> = {
  tabulation: {
    bg: 'bg-emerald-950/70',
    border: 'border-emerald-600/60',
    text: 'text-emerald-300',
  },
  backtracking: {
    bg: 'bg-amber-950/70',
    border: 'border-amber-600/60',
    text: 'text-amber-300',
  },
  complete: { bg: 'bg-teal-900', border: 'border-teal-400', text: 'text-white' },
};

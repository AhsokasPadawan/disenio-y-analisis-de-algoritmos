export interface LisStep {
  step: number;
  phase: 'loop' | 'backtrack' | 'complete';
  title: string;
  badge: string;
  description: string;
  iPointer: number;
  jPointer?: number;
  comparing?: {
    valid: boolean;
    conditionText: string;
    updated: boolean;
  };
  matrixD: {
    lengths: number[];
    predecessors: number[];
  };
  highlightCell?: { row: 0 | 1; col: number };
  activeBacktrackIndex?: number;
  reconstructedIndices: number[];
}

export const X_ARRAY = [3, 2, 6, 4, 5, 1, 7, 8];

export const LIS_STEPS: LisStep[] = [
  {
    step: 0,
    phase: 'loop',
    title: 'Paso 0: Inicialización de Estructuras Canónicas UADE',
    badge: '1. Inicialización D[2, n]',
    description:
      'Se inicializa la matriz auxiliar D de 2 x n: Fila D[0] (longitudes L[i]) con 1 en todas las posiciones. Fila D[1] (predecesores) con -1 en todas las posiciones.',
    iPointer: 0,
    matrixD: {
      lengths: [1, 1, 1, 1, 1, 1, 1, 1],
      predecessors: [-1, -1, -1, -1, -1, -1, -1, -1],
    },
    reconstructedIndices: [],
  },
  {
    step: 1,
    phase: 'loop',
    title: 'Paso 1: i = 2 (X[2] = 6) explorando j = 0 (X[0] = 3)',
    badge: '2. Doble Bucle (j < i)',
    description:
      'i=2, j=0: Como X[0] = 3 ≤ X[2] = 6 y D[0, 0] + 1 = 1 + 1 = 2 > D[0, 2] = 1, actualizamos: D[0, 2] = 2 y D[1, 2] = 0.',
    iPointer: 2,
    jPointer: 0,
    comparing: {
      valid: true,
      conditionText: 'X[0]=3 ≤ X[2]=6 y D[0, 0]+1 = 2 > 1',
      updated: true,
    },
    matrixD: {
      lengths: [1, 1, 2, 1, 1, 1, 1, 1],
      predecessors: [-1, -1, 0, -1, -1, -1, -1, -1],
    },
    highlightCell: { row: 0, col: 2 },
    reconstructedIndices: [],
  },
  {
    step: 2,
    phase: 'loop',
    title: 'Paso 2: i = 3 (X[3] = 4) explorando j = 0 (X[0] = 3)',
    badge: '2. Doble Bucle (j < i)',
    description:
      'i=3, j=0: X[0] = 3 ≤ X[3] = 4. D[0, 0] + 1 = 2 > D[0, 3] = 1 → D[0, 3] = 2 y D[1, 3] = 0. En j=1 (2≤4) no supera 2; en j=2 (6>4) no es creciente.',
    iPointer: 3,
    jPointer: 0,
    comparing: {
      valid: true,
      conditionText: 'X[0]=3 ≤ X[3]=4 y D[0, 0]+1 = 2 > 1',
      updated: true,
    },
    matrixD: {
      lengths: [1, 1, 2, 2, 1, 1, 1, 1],
      predecessors: [-1, -1, 0, 0, -1, -1, -1, -1],
    },
    highlightCell: { row: 0, col: 3 },
    reconstructedIndices: [],
  },
  {
    step: 3,
    phase: 'loop',
    title: 'Paso 3: i = 4 (X[4] = 5) explorando j = 3 (X[3] = 4)',
    badge: '2. Doble Bucle (j < i)',
    description:
      'i=4, j=3: X[3] = 4 ≤ X[4] = 5. D[0, 3] + 1 = 2 + 1 = 3 > D[0, 4] = 1 → D[0, 4] = 3 y D[1, 4] = 3 (predecesor es el índice 3).',
    iPointer: 4,
    jPointer: 3,
    comparing: {
      valid: true,
      conditionText: 'X[3]=4 ≤ X[4]=5 y D[0, 3]+1 = 3 > 1',
      updated: true,
    },
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 1, 1],
      predecessors: [-1, -1, 0, 0, 3, -1, -1, -1],
    },
    highlightCell: { row: 0, col: 4 },
    reconstructedIndices: [],
  },
  {
    step: 4,
    phase: 'loop',
    title: 'Paso 4: i = 6 (X[6] = 7) explorando j = 4 (X[4] = 5)',
    badge: '2. Doble Bucle (j < i)',
    description:
      'i=6, j=4: X[4] = 5 ≤ X[6] = 7. D[0, 4] + 1 = 3 + 1 = 4 > D[0, 6] = 1 → D[0, 6] = 4 y D[1, 6] = 4.',
    iPointer: 6,
    jPointer: 4,
    comparing: {
      valid: true,
      conditionText: 'X[4]=5 ≤ X[6]=7 y D[0, 4]+1 = 4 > 1',
      updated: true,
    },
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 1],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, -1],
    },
    highlightCell: { row: 0, col: 6 },
    reconstructedIndices: [],
  },
  {
    step: 5,
    phase: 'loop',
    title: 'Paso 5: i = 7 (X[7] = 8) explorando j = 6 (X[6] = 7)',
    badge: '2. Doble Bucle (j < i)',
    description:
      'i=7, j=6: X[6] = 7 ≤ X[7] = 8. D[0, 6] + 1 = 4 + 1 = 5 > D[0, 7] = 1 → D[0, 7] = 5 y D[1, 7] = 6. ¡Longitud máxima LIS = 5 alcanzada!',
    iPointer: 7,
    jPointer: 6,
    comparing: {
      valid: true,
      conditionText: 'X[6]=7 ≤ X[7]=8 y D[0, 6]+1 = 5 > 1',
      updated: true,
    },
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    highlightCell: { row: 0, col: 7 },
    reconstructedIndices: [],
  },
  {
    step: 6,
    phase: 'backtrack',
    title: 'Paso 6: Backtracking — Inicio en Índice de Longitud Máxima (k = 7)',
    badge: '3. Backtracking Punteros',
    description:
      'Buscamos max(D[0, k]): ocurre en k = 7 con valor 5. El elemento X[7] = 8 pertenece a la LIS. Leemos D[1, 7] = 6 para saltar a su predecesor.',
    iPointer: 7,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    activeBacktrackIndex: 7,
    reconstructedIndices: [7],
  },
  {
    step: 7,
    phase: 'backtrack',
    title: 'Paso 7: Backtracking — Salto a Índice 6 (X[6] = 7)',
    badge: '3. Backtracking Punteros',
    description:
      'Desde k = 7 saltamos a k = 6. Elemento X[6] = 7 incluido en la LIS. Leemos D[1, 6] = 4 para continuar.',
    iPointer: 6,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    activeBacktrackIndex: 6,
    reconstructedIndices: [6, 7],
  },
  {
    step: 8,
    phase: 'backtrack',
    title: 'Paso 8: Backtracking — Salto a Índice 4 (X[4] = 5)',
    badge: '3. Backtracking Punteros',
    description:
      'Desde k = 6 saltamos a k = 4. Elemento X[4] = 5 incluido en la LIS. Leemos D[1, 4] = 3 para continuar.',
    iPointer: 4,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    activeBacktrackIndex: 4,
    reconstructedIndices: [4, 6, 7],
  },
  {
    step: 9,
    phase: 'backtrack',
    title: 'Paso 9: Backtracking — Salto a Índice 3 (X[3] = 4)',
    badge: '3. Backtracking Punteros',
    description:
      'Desde k = 4 saltamos a k = 3. Elemento X[3] = 4 incluido en la LIS. Leemos D[1, 3] = 0 para continuar.',
    iPointer: 3,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    activeBacktrackIndex: 3,
    reconstructedIndices: [3, 4, 6, 7],
  },
  {
    step: 10,
    phase: 'backtrack',
    title: 'Paso 10: Backtracking — Salto a Índice 0 (X[0] = 3) y Fin (-1)',
    badge: '3. Backtracking Punteros',
    description:
      'Desde k = 3 saltamos a k = 0. Elemento X[0] = 3 incluido en la LIS. Leemos D[1, 0] = -1: ¡Llegamos al origen (-1)! Fin de la reconstrucción.',
    iPointer: 0,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    activeBacktrackIndex: 0,
    reconstructedIndices: [0, 3, 4, 6, 7],
  },
  {
    step: 11,
    phase: 'complete',
    title: 'Paso 11: Solución Concluida — Subsecuencia Z = [3, 4, 5, 7, 8]',
    badge: '4. Solución Óptima',
    description:
      'La subsecuencia creciente más larga reconstruida es Z = [3, 4, 5, 7, 8] con longitud óptima = 5. Complejidad del algoritmo: Θ(n²) en tiempo y Θ(n) en espacio.',
    iPointer: -1,
    matrixD: {
      lengths: [1, 1, 2, 2, 3, 1, 4, 5],
      predecessors: [-1, -1, 0, 0, 3, -1, 4, 6],
    },
    reconstructedIndices: [0, 3, 4, 6, 7],
  },
];

export const PHASE_BADGE_STYLES: Record<
  LisStep['phase'],
  { bg: string; border: string; text: string }
> = {
  loop: {
    bg: 'bg-emerald-950/70',
    border: 'border-emerald-600/60',
    text: 'text-emerald-300',
  },
  backtrack: {
    bg: 'bg-amber-950/70',
    border: 'border-amber-600/60',
    text: 'text-amber-300',
  },
  complete: { bg: 'bg-teal-900', border: 'border-teal-400', text: 'text-white' },
};

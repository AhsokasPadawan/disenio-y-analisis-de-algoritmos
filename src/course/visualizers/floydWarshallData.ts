export interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  u: number;
  v: number;
  w: number;
}

export interface RelaxationDetail {
  i: number;
  j: number;
  k: number;
  oldVal: number | 'inf';
  aik: number;
  akj: number;
  newVal: number;
  description: string;
}

export interface StepSpec {
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

export const GRAPH_NODES: GraphNode[] = [
  { id: 0, label: '0', x: 70, y: 55 },
  { id: 1, label: '1', x: 230, y: 55 },
  { id: 2, label: '2', x: 230, y: 175 },
  { id: 3, label: '3', x: 70, y: 175 },
];

export const GRAPH_EDGES: GraphEdge[] = [
  { u: 0, v: 1, w: 1 },
  { u: 1, v: 2, w: 3 },
  { u: 2, v: 0, w: 7 },
  { u: 2, v: 1, w: 2 },
  { u: 2, v: 3, w: 3 },
  { u: 3, v: 0, w: 3 },
  { u: 3, v: 1, w: 4 },
  { u: 3, v: 2, w: 8 },
];

export const FW_STEPS: StepSpec[] = [
  {
    k: null,
    phase: 'init',
    title: 'Paso 0: Matriz de Adyacencia Inicial A⁽⁻¹⁾ (Aristas Directas)',
    badge: '1. Grafo Inicial',
    description:
      'Se inicializa la matriz A con las aristas dirigidas directas del grafo. Si no hay arista directa entre i y j, el costo es ∞. En la diagonal principal A[i, i] = 0.',
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
    description:
      'Se evalúa si algún par (i, j) mejora pasando por el nodo 0: A[i, j] vs A[i, 0] + A[0, j]. Fila 0 y Columna 0 son invariantes in-place. No hay mejoras estrictas con k=0.',
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
    description:
      'Celda (0, 2): directo es ∞. Vía nodo 1: A[0, 1] + A[1, 2] = 1 + 3 = 4 < ∞. ¡Se relaja A[0, 2] = 4! Además (3, 2) mejora de 8 a 4+3 = 7.',
    matrix: [
      [0, 1, 4, 'inf'],
      ['inf', 0, 3, 'inf'],
      [7, 2, 0, 3],
      [3, 4, 7, 0],
    ],
    highlightedRow: 1,
    highlightedCol: 1,
    updatedCells: [
      [0, 2],
      [3, 2],
    ],
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
    activePath: [
      [0, 1],
      [1, 2],
    ],
  },
  {
    k: 2,
    phase: 'pivot',
    title: 'Paso 3: Pivote k = 2 — Conexión Multietapa vía Nodo 2',
    badge: '2. Relajación k=2',
    description:
      'Con pivote 2: Celda (0, 3) se relaja de ∞ a A[0, 2] + A[2, 3] = 4 + 3 = 7. Celda (1, 3) de ∞ a 3 + 3 = 6. Celda (1, 0) de ∞ a 3 + 7 = 10.',
    matrix: [
      [0, 1, 4, 7],
      [10, 0, 3, 6],
      [7, 2, 0, 3],
      [3, 4, 7, 0],
    ],
    highlightedRow: 2,
    highlightedCol: 2,
    updatedCells: [
      [0, 3],
      [1, 3],
      [1, 0],
    ],
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
    activePath: [
      [0, 2],
      [2, 3],
    ],
  },
  {
    k: 3,
    phase: 'pivot',
    title: 'Paso 4: Pivote k = 3 — Optimización Final vía Nodo 3',
    badge: '2. Relajación k=3',
    description:
      'Celda (1, 0) mejora de 10 a A[1, 3] + A[3, 0] = 6 + 3 = 9. Celda (2, 0) mejora de 7 a A[2, 3] + A[3, 0] = 3 + 3 = 6.',
    matrix: [
      [0, 1, 4, 7],
      [9, 0, 3, 6],
      [6, 2, 0, 3],
      [3, 4, 7, 0],
    ],
    highlightedRow: 3,
    highlightedCol: 3,
    updatedCells: [
      [1, 0],
      [2, 0],
    ],
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
    activePath: [
      [1, 3],
      [3, 0],
    ],
  },
  {
    k: null,
    phase: 'complete',
    title: 'Paso 5: Matriz Final de Todos los Pares de Caminos Mínimos A⁽³⁾',
    badge: '3. Solución Completa',
    description:
      'El algoritmo ha completado las 4 iteraciones de pivote |V| = 4. La matriz contiene las distancias mínimas garantizadas para todos los pares de nodos en Θ(|V|³) = 64 operaciones elementales.',
    matrix: [
      [0, 1, 4, 7],
      [9, 0, 3, 6],
      [6, 2, 0, 3],
      [3, 4, 7, 0],
    ],
    updatedCells: [],
  },
];

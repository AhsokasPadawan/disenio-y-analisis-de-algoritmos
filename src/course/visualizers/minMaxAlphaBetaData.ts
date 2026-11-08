export interface TreeNodeCoord {
  x: number;
  y: number;
  label: string;
  kind: 'MAX' | 'MIN' | 'LEAF';
  val?: number;
}

export const TREE_NODES: Record<string, TreeNodeCoord> = {
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

export const TREE_EDGES: [string, string][] = [
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

export interface AlphaBetaStep {
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

export const ALPHABETA_STEPS: AlphaBetaStep[] = [
  {
    step: 1,
    activeNode: 'A',
    alpha: -Infinity,
    beta: Infinity,
    evaluatedLeaves: [],
    prunedNodes: [],
    prunedEdges: [],
    nodeValues: {},
    description:
      '1. Raíz A (MAX) inicia con intervalo [α = -∞, β = +∞]. Desciende por subárbol izquierdo hacia B.',
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
    description:
      '2. Nodo B (MIN) recibe [α = -∞, β = +∞]. Desciende a hijo izquierdo D.',
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
    description:
      '3. Nodo D (MAX) evalúa hoja H = 3. Actualiza α = max(-∞, 3) = 3.',
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
    description:
      '4. Nodo D (MAX) evalúa hoja I = 5. Como 5 > 3, D toma valor 5. Retorna 5 a su padre B.',
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
    description:
      '5. Nodo B (MIN) recibe 5 de D. Como B minimiza, actualiza cota superior β = min(+∞, 5) = 5. Pasa [α = -∞, β = 5] a su hijo E.',
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
    description:
      '6. Nodo E (MAX) evalúa hoja J = 6. Actualiza α = max(-∞, 6) = 6.',
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
    description:
      '7. ¡PODA BETA ACTIVADA! En E se cumple β ≤ α (5 ≤ 6). Como el padre B nunca elegirá un valor ≥ 6, se poda la hoja K=9 sin evaluarla.',
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
    description:
      '8. Nodo B (MIN) consolida su valor óptimo: min(5, 6) = 5. Retorna 5 a la raíz A.',
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
    description:
      '9. Raíz A (MAX) recibe 5 de B. Actualiza su cota inferior α = max(-∞, 5) = 5. Ahora explora C con [α = 5, β = +∞].',
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
    description:
      '10. Nodo C (MIN) recibe [α = 5, β = +∞]. Desciende a hijo izquierdo F.',
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
    description:
      '11. F (MAX) evalúa L=1 y M=2. Como 2 > 1, F toma valor 2 y retorna 2 a C.',
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
    description:
      '12. Nodo C (MIN) recibe 2 de F. Actualiza cota superior β = min(+∞, 2) = 2.',
  },
  {
    step: 13,
    activeNode: 'C',
    alpha: 5,
    beta: 2,
    evaluatedLeaves: ['H', 'I', 'J', 'L', 'M'],
    prunedNodes: ['K', 'G', 'N', 'O'],
    prunedEdges: [
      ['E', 'K'],
      ['C', 'G'],
      ['G', 'N'],
      ['G', 'O'],
    ],
    nodeValues: { A: 5, B: 5, C: 2, D: 5, E: 6, F: 2, H: 3, I: 5, J: 6, L: 1, M: 2 },
    cutReason: 'Poda Alfa en C: β (2) ≤ α (5)',
    description:
      '13. ¡PODA ALFA MASIVA! En C se cumple β ≤ α (2 ≤ 5). Como la raíz A ya tiene asegurado al menos 5, descarta todo el subárbol G (hojas N y O) sin abrirlo.',
  },
  {
    step: 14,
    activeNode: 'A',
    alpha: 5,
    beta: Infinity,
    evaluatedLeaves: ['H', 'I', 'J', 'L', 'M'],
    prunedNodes: ['K', 'G', 'N', 'O'],
    prunedEdges: [
      ['E', 'K'],
      ['C', 'G'],
      ['G', 'N'],
      ['G', 'O'],
    ],
    nodeValues: { A: 5, B: 5, C: 2, D: 5, E: 6, F: 2, H: 3, I: 5, J: 6, L: 1, M: 2 },
    description:
      '14. ¡FIN DE BÚSQUEDA! Raíz A toma max(5, 2) = 5. Se evaluaron 5 hojas de 8 totales (37.5% podado) con optimalidad garantizada.',
  },
];

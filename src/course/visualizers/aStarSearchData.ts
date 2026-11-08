export interface GraphNodeCoord {
  x: number;
  y: number;
}

export const GRAPH_COORDS: Record<string, GraphNodeCoord> = {
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

export const GRAPH_EDGES = [
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

export const HEURISTICS: Record<string, number> = {
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

export const GOALS = ['X', 'Y', 'Z'];

export interface SearchStep {
  step: number;
  algoMode: 'astar' | 'ucs';
  activeNode: string;
  activeEdge?: { u: string; v: string };
  openQueue: { node: string; g: number; h: number; f: number }[];
  visited: string[];
  pathFound?: string[];
  description: string;
}

export const ASTAR_STEPS: SearchStep[] = [
  {
    step: 1,
    algoMode: 'astar',
    activeNode: 'S',
    openQueue: [{ node: 'S', g: 0, h: 5, f: 5 }],
    visited: ['S'],
    description:
      'A* Inicial: Nodo raíz S con g=0, h=5 → f=5. Se extrae S y genera sucesores A(g=5,h=7,f=12), B(g=9,h=3,f=12) y D(g=6,h=6,f=12).',
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
    description:
      'A* Paso 1: Se expande A (f=12). Genera B con g=5+3=8, h=3 → f=11 (mejora costo previo de B) y X (meta) con g=5+9=14, h=0 → f=14.',
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
    description:
      'A* Paso 2: Se extrae B (menor f=11). B expande C con g=8+1=9, h=4 → f=13.',
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
    description:
      'A* Paso 3: Se extrae D (f=12). D expande C con g=6+2=8, h=4 → f=12 (mejora a C) y E con g=6+2=8, h=5 → f=13.',
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
    description:
      'A* Paso 4: Se extrae C (f=12). C expande la meta Y con g=8+5=13, h=0 → f=13 y F con g=8+7=15, h=6 → f=21.',
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
    description:
      'A* Final: ¡Meta Y extraída con f=13! Ruta óptima: S → D → C → Y (costo real g = 13). Solo 5 nodos expandidos gracias a la heurística.',
  },
];

export const UCS_STEPS: SearchStep[] = [
  {
    step: 1,
    algoMode: 'ucs',
    activeNode: 'S',
    openQueue: [{ node: 'S', g: 0, h: 0, f: 0 }],
    visited: ['S'],
    description:
      'UCS Inicial (h=0 ciego): Extrae S (g=0). Genera A(g=5), D(g=6) y B(g=9). Expande estrictamente por menor g(n).',
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
    description:
      'UCS Paso 1: Extrae A (g=5). Genera B con g=5+3=8 (mejora g=9) y X(meta) con g=5+9=14.',
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
    description:
      'UCS Paso 2: Extrae D (g=6). Genera C con g=6+2=8 y E con g=6+2=8. Explora radialmente sin orientación a meta.',
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
    description:
      'UCS Paso 3: Extrae B (g=8). B genera C con g=8+1=9 (no mejora g=8 existente).',
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
    description:
      'UCS Paso 4: Extrae C (g=8). C genera Y(meta) con g=8+5=13 y F con g=8+7=15.',
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
    description:
      'UCS Paso 5 (Ineficiencia): Extrae E (g=8 < 13), explorando rama irrelevante hacia Z antes de aceptar la meta.',
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
    description:
      'UCS Final: Extrae Y (g=13). Halla el mismo costo óptimo (13) pero necesitó expandir 6 nodos en lugar de 5 (desperdicia expansiones en E).',
  },
];

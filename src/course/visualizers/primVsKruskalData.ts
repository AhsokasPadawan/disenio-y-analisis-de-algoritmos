export interface NodeCoord {
  x: number;
  y: number;
}

export interface PrimStep {
  step: number;
  visited: string[];
  tree_edges: [string, string, number][];
  description: string;
}

export interface KruskalStep {
  step: number;
  edge?: [string, string, number];
  status: 'accepted' | 'rejected' | 'completed';
  components: string[][];
  description: string;
}

export const GRAPH_NODE_POSITIONS: Record<string, NodeCoord> = {
  a: { x: 55, y: 130 },
  b: { x: 175, y: 45 },
  c: { x: 365, y: 45 },
  d: { x: 485, y: 130 },
  e: { x: 400, y: 215 },
  f: { x: 140, y: 215 },
  g: { x: 270, y: 130 },
};

export const GRAPH_NODES: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

export const GRAPH_EDGES: { u: string; v: string; w: number }[] = [
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

export const PRIM_STEPS: PrimStep[] = [
  {
    step: 0,
    visited: ['d'],
    tree_edges: [],
    description:
      'Paso inicial de Prim: se selecciona el nodo inicial "d" para fundar el árbol. El corte separa {d} de los demás vértices.',
  },
  {
    step: 1,
    visited: ['d', 'c'],
    tree_edges: [['d', 'c', 5]],
    description:
      'Corte ({d} | {a,b,c,e,f,g}): se evalúan las aristas incidentes a "d". Se agrega (D, C, w=5) por ser la mínima del corte.',
  },
  {
    step: 2,
    visited: ['d', 'c', 'b'],
    tree_edges: [
      ['d', 'c', 5],
      ['c', 'b', 3],
    ],
    description:
      'Corte ({c, d} | resto): la arista mínima del corte es (C, B, w=3), incorporando el nodo "b" al árbol conexo.',
  },
  {
    step: 3,
    visited: ['d', 'c', 'b', 'g'],
    tree_edges: [
      ['d', 'c', 5],
      ['c', 'b', 3],
      ['c', 'g', 3],
    ],
    description:
      'Corte ({b, c, d} | resto): la arista mínima del corte es (C, G, w=3), incorporando el nodo "g" al árbol conexo.',
  },
  {
    step: 4,
    visited: ['d', 'c', 'b', 'g', 'a'],
    tree_edges: [
      ['d', 'c', 5],
      ['c', 'b', 3],
      ['c', 'g', 3],
      ['g', 'a', 1],
    ],
    description:
      'Corte ({b, c, d, g} | resto): la arista mínima del corte es (G, A, w=1), incorporando el nodo "a" al árbol conexo.',
  },
  {
    step: 5,
    visited: ['d', 'c', 'b', 'g', 'a', 'f'],
    tree_edges: [
      ['d', 'c', 5],
      ['c', 'b', 3],
      ['c', 'g', 3],
      ['g', 'a', 1],
      ['g', 'f', 2],
    ],
    description:
      'Corte ({a, b, c, d, g} | resto): la arista mínima del corte es (G, F, w=2), incorporando el nodo "f" al árbol conexo.',
  },
  {
    step: 6,
    visited: ['d', 'c', 'b', 'g', 'a', 'f', 'e'],
    tree_edges: [
      ['d', 'c', 5],
      ['c', 'b', 3],
      ['c', 'g', 3],
      ['g', 'a', 1],
      ['g', 'f', 2],
      ['g', 'e', 4],
    ],
    description:
      'Corte ({a, b, c, d, f, g} | {e}): la arista mínima del corte es (G, E, w=4), incorporando el último nodo "e".',
  },
  {
    step: 7,
    visited: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    tree_edges: [
      ['d', 'c', 5],
      ['c', 'b', 3],
      ['c', 'g', 3],
      ['g', 'a', 1],
      ['g', 'f', 2],
      ['g', 'e', 4],
    ],
    description:
      'Árbol Generador Mínimo completo: se visitaron los 7 vértices con V-1 = 6 aristas. Costo total óptimo = 18.',
  },
];

export const KRUSKAL_STEPS: KruskalStep[] = [
  {
    step: 1,
    edge: ['a', 'g', 1],
    status: 'accepted',
    components: [['a', 'g'], ['b'], ['c'], ['d'], ['e'], ['f']],
    description:
      'Evaluar arista mínima global (A, G, w=1): une las componentes disjuntas {A} y {G} → ACEPTADA.',
  },
  {
    step: 2,
    edge: ['f', 'g', 2],
    status: 'accepted',
    components: [['a', 'f', 'g'], ['b'], ['c'], ['d'], ['e']],
    description:
      'Evaluar arista (F, G, w=2): une {F} con la componente {A, G} → ACEPTADA.',
  },
  {
    step: 3,
    edge: ['b', 'c', 3],
    status: 'accepted',
    components: [['a', 'f', 'g'], ['b', 'c'], ['d'], ['e']],
    description:
      'Evaluar arista (B, C, w=3): une las componentes disjuntas {B} y {C} → ACEPTADA.',
  },
  {
    step: 4,
    edge: ['c', 'g', 3],
    status: 'accepted',
    components: [['a', 'b', 'c', 'f', 'g'], ['d'], ['e']],
    description:
      'Evaluar arista (C, G, w=3): fusiona las componentes {B, C} y {A, F, G} → ACEPTADA.',
  },
  {
    step: 5,
    edge: ['a', 'b', 4],
    status: 'rejected',
    components: [['a', 'b', 'c', 'f', 'g'], ['d'], ['e']],
    description:
      'Evaluar arista (A, B, w=4): ambos vértices ya pertenecen a {A, B, C, F, G} → RECHAZADA (forma ciclo).',
  },
  {
    step: 6,
    edge: ['e', 'g', 4],
    status: 'accepted',
    components: [['a', 'b', 'c', 'e', 'f', 'g'], ['d']],
    description:
      'Evaluar arista (E, G, w=4): une {E} a la componente principal → ACEPTADA.',
  },
  {
    step: 7,
    edge: ['a', 'f', 5],
    status: 'rejected',
    components: [['a', 'b', 'c', 'e', 'f', 'g'], ['d']],
    description:
      'Evaluar arista (A, F, w=5): ambos vértices ya pertenecen a la misma componente → RECHAZADA (forma ciclo).',
  },
  {
    step: 8,
    edge: ['c', 'd', 5],
    status: 'accepted',
    components: [['a', 'b', 'c', 'd', 'e', 'f', 'g']],
    description:
      'Evaluar arista (C, D, w=5): une {D} con la componente principal. Se alcanzan V-1 = 6 aristas del MST.',
  },
  {
    step: 9,
    status: 'completed',
    components: [['a', 'b', 'c', 'd', 'e', 'f', 'g']],
    description:
      '¡Kruskal finalizado con éxito! Todos los 7 vértices pertenecen a la misma componente conexa con 6 aristas. Aristas restantes (w=7, 8, 9) se descartan por generar ciclos. Costo total = 18.',
  },
];

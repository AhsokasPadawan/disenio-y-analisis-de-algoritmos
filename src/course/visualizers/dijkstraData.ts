export interface NodeCoord {
  x: number;
  y: number;
}

export interface DijkstraEdge {
  from: number;
  to: number;
  w: number;
}

export interface DijkstraFrame {
  step: number;
  selected_node: number;
  visited: number[];
  pending: number[];
  dist: Record<number | string, number | 'inf'>;
  prev: Record<number | string, number>;
}

export interface DijkstraSpec {
  nodes: number[];
  source: number;
  edges: DijkstraEdge[];
  frames: DijkstraFrame[];
}

export const NODE_COORDS: Record<number, NodeCoord> = {
  1: { x: 60, y: 140 },
  2: { x: 200, y: 55 },
  3: { x: 370, y: 55 },
  4: { x: 480, y: 140 },
  5: { x: 285, y: 145 },
  6: { x: 200, y: 225 },
};

export const STEP_DESCRIPTIONS: Record<number, string> = {
  0: 'Inicialización en origen s = 1: d[1] = 0, para los demás d[v] = ∞. Se relajan las aristas salientes de 1: a 2 (peso 2), a 6 (peso 3), a 5 (peso 6) y a 4 (peso 15).',
  1: 'Nodo pivot 2 (d=2): es el nodo no visitado con menor distancia tentativa. Se extrae y se relajan sus aristas: a 3 (2+3=5) y a 5 (2+2=4 < 6, se mejora d[5]).',
  2: 'Nodo pivot 6 (d=3): menor distancia tentativa disponible. Se relajan sus aristas: a 4 (3+1=4 < 15, se reduce drásticamente d[4] con prev=6).',
  3: 'Nodo pivot 5 (d=4): se evalúan sus aristas salientes a 4 (4+3=7 > 4, no mejora) y a 6 (ya visitado). No hay cambios en distancias.',
  4: 'Nodo pivot 4 (d=4): se exploran aristas salientes. No hay mejoras. La distancia mínima definitiva a 4 queda confirmada en 4 con camino 1 → 6 → 4.',
  5: 'Nodo pivot 3 (d=5): último nodo en la cola. Se confirma su distancia mínima definitiva en 5 con camino 1 → 2 → 3. Algoritmo finalizado con éxito.',
};

export interface StepData {
  step: number;
  row: number;
  col: number;
  description: string;
  sourceCells?: [number, number][];
  isFinal?: boolean;
}

export const DENOMINATIONS = [1, 4, 6];
export const COLUMNS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const FULL_MATRIX = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 1, 2, 3, 4, 2],
  [0, 1, 2, 3, 1, 2, 1, 2, 2],
];

export const STEPS: StepData[] = [
  {
    step: 0,
    row: -1,
    col: -1,
    description:
      'Tabla inicializada en blanco. Denominaciones d = {1, 4, 6}, valor objetivo = $8. Se llenará la matriz M[moneda, valor] fila por fila.',
  },
  {
    step: 1,
    row: 0,
    col: 0,
    description:
      'Fila 1 (d1 = 1), j = 0: Para valor 0 se requieren exactamente 0 monedas.',
  },
  {
    step: 2,
    row: 0,
    col: 1,
    description:
      'Fila 1 (d1 = 1), j = 1: Con solo monedas de 1, se requiere 1 moneda.',
  },
  {
    step: 3,
    row: 0,
    col: 2,
    description:
      'Fila 1 (d1 = 1), j = 2: Con solo monedas de 1, se requieren 2 monedas (1 + 1).',
  },
  {
    step: 4,
    row: 0,
    col: 3,
    description:
      'Fila 1 (d1 = 1), j = 3: Con solo monedas de 1, se requieren 3 monedas.',
  },
  {
    step: 5,
    row: 0,
    col: 4,
    description:
      'Fila 1 (d1 = 1), j = 4: Con solo monedas de 1, se requieren 4 monedas.',
  },
  {
    step: 6,
    row: 0,
    col: 5,
    description:
      'Fila 1 (d1 = 1), j = 5: Con solo monedas de 1, se requieren 5 monedas.',
  },
  {
    step: 7,
    row: 0,
    col: 6,
    description:
      'Fila 1 (d1 = 1), j = 6: Con solo monedas de 1, se requieren 6 monedas.',
  },
  {
    step: 8,
    row: 0,
    col: 7,
    description:
      'Fila 1 (d1 = 1), j = 7: Con solo monedas de 1, se requieren 7 monedas.',
  },
  {
    step: 9,
    row: 0,
    col: 8,
    description:
      'Fila 1 (d1 = 1), j = 8: Con solo monedas de 1, se requieren 8 monedas. Fila 1 completada.',
  },
  {
    step: 10,
    row: 1,
    col: 0,
    description:
      'Fila 2 (d2 = 4), j = 0: Para valor 0 se requieren 0 monedas.',
  },
  {
    step: 11,
    row: 1,
    col: 1,
    description:
      'Fila 2 (d2 = 4), j = 1: j < 4, no alcanza la moneda de 4; se copia de la celda superior M[0, 1] = 1.',
    sourceCells: [[0, 1]],
  },
  {
    step: 12,
    row: 1,
    col: 2,
    description:
      'Fila 2 (d2 = 4), j = 2: j < 4, no alcanza la moneda de 4; se copia de la celda superior M[0, 2] = 2.',
    sourceCells: [[0, 2]],
  },
  {
    step: 13,
    row: 1,
    col: 3,
    description:
      'Fila 2 (d2 = 4), j = 3: j < 4, no alcanza la moneda de 4; se copia de la celda superior M[0, 3] = 3.',
    sourceCells: [[0, 3]],
  },
  {
    step: 14,
    row: 1,
    col: 4,
    description:
      'Fila 2 (d2 = 4), j = 4: min(M[0, 4]=4, 1 + M[1, 0]=1) = 1. ¡Se usa 1 moneda de 4!',
    sourceCells: [
      [0, 4],
      [1, 0],
    ],
  },
  {
    step: 15,
    row: 1,
    col: 5,
    description:
      'Fila 2 (d2 = 4), j = 5: min(M[0, 5]=5, 1 + M[1, 1]=2) = 2 monedas (4 + 1).',
    sourceCells: [
      [0, 5],
      [1, 1],
    ],
  },
  {
    step: 16,
    row: 1,
    col: 6,
    description:
      'Fila 2 (d2 = 4), j = 6: min(M[0, 6]=6, 1 + M[1, 2]=3) = 3 monedas (4 + 1 + 1).',
    sourceCells: [
      [0, 6],
      [1, 2],
    ],
  },
  {
    step: 17,
    row: 1,
    col: 7,
    description:
      'Fila 2 (d2 = 4), j = 7: min(M[0, 7]=7, 1 + M[1, 3]=4) = 4 monedas (4 + 1 + 1 + 1).',
    sourceCells: [
      [0, 7],
      [1, 3],
    ],
  },
  {
    step: 18,
    row: 1,
    col: 8,
    description:
      'Fila 2 (d2 = 4), j = 8: min(M[0, 8]=8, 1 + M[1, 4]=2) = 2 monedas (4 + 4). Fila 2 completada.',
    sourceCells: [
      [0, 8],
      [1, 4],
    ],
  },
  {
    step: 19,
    row: 2,
    col: 0,
    description:
      'Fila 3 (d3 = 6), j = 0: Para valor 0 se requieren 0 monedas.',
  },
  {
    step: 20,
    row: 2,
    col: 1,
    description:
      'Fila 3 (d3 = 6), j = 1: j < 6, se copia de arriba M[1, 1] = 1.',
    sourceCells: [[1, 1]],
  },
  {
    step: 21,
    row: 2,
    col: 2,
    description:
      'Fila 3 (d3 = 6), j = 2: j < 6, se copia de arriba M[1, 2] = 2.',
    sourceCells: [[1, 2]],
  },
  {
    step: 22,
    row: 2,
    col: 3,
    description:
      'Fila 3 (d3 = 6), j = 3: j < 6, se copia de arriba M[1, 3] = 3.',
    sourceCells: [[1, 3]],
  },
  {
    step: 23,
    row: 2,
    col: 4,
    description:
      'Fila 3 (d3 = 6), j = 4: j < 6, se copia de arriba M[1, 4] = 1.',
    sourceCells: [[1, 4]],
  },
  {
    step: 24,
    row: 2,
    col: 5,
    description:
      'Fila 3 (d3 = 6), j = 5: j < 6, se copia de arriba M[1, 5] = 2.',
    sourceCells: [[1, 5]],
  },
  {
    step: 25,
    row: 2,
    col: 6,
    description:
      'Fila 3 (d3 = 6), j = 6: min(M[1, 6]=3, 1 + M[2, 0]=1) = 1. ¡Se usa 1 moneda de 6!',
    sourceCells: [
      [1, 6],
      [2, 0],
    ],
  },
  {
    step: 26,
    row: 2,
    col: 7,
    description:
      'Fila 3 (d3 = 6), j = 7: min(M[1, 7]=4, 1 + M[2, 1]=2) = 2 monedas (6 + 1).',
    sourceCells: [
      [1, 7],
      [2, 1],
    ],
  },
  {
    step: 27,
    row: 2,
    col: 8,
    description:
      'Fila 3 (d3 = 6), j = 8: min(M[1, 8]=2, 1 + M[2, 2]=3) = 2. ¡Usar 6 daría 3 monedas {6, 1, 1}! No usar 6 retiene el óptimo {4, 4} de 2 monedas.',
    sourceCells: [
      [1, 8],
      [2, 2],
    ],
  },
  {
    step: 28,
    row: 2,
    col: 8,
    description:
      'Solución Final: M[2, 8] = 2. Backtracking reconstruye {4, 4} (2 monedas). El enfoque voraz habría elegido 6 + 1 + 1 (3 monedas), demostrando el fallo de Greedy.',
    sourceCells: [
      [1, 8],
      [1, 4],
      [1, 0],
    ],
    isFinal: true,
  },
];

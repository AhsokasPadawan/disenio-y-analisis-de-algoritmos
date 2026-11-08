export interface QueenStep {
  step: number;
  configId: number;
  branchLabel: string;
  board: number[];
  action: string;
  conflict: [number, number] | null;
  attackedCells?: [number, number][];
  isSolution?: boolean;
}

export const QUEEN_STEPS: QueenStep[] = [
  {
    step: 1,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, -1, -1, -1],
    action:
      'Configuración 1 (Rama Col 0) · Fila 0: Colocar reina en columna 0 (0, 0). Sin restricciones.',
    conflict: null,
  },
  {
    step: 2,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, 0, -1, -1],
    action:
      'Configuración 1 · Fila 1: Intentar columna 0. Conflicto de columna vertical con (0, 0).',
    conflict: [1, 0],
  },
  {
    step: 3,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, 1, -1, -1],
    action:
      'Configuración 1 · Fila 1: Intentar columna 1. Conflicto diagonal con (0, 0) (|1-0| == |1-0|).',
    conflict: [1, 1],
  },
  {
    step: 4,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, 2, -1, -1],
    action:
      'Configuración 1 · Fila 1: Intentar columna 2 (1, 2). Posición factible sin ataques.',
    conflict: null,
  },
  {
    step: 5,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, 2, 0, -1],
    action:
      'Configuración 1 · Fila 2: Columnas 0, 1, 2 y 3 quedan atacadas. Callejón sin salida → Backtracking.',
    conflict: [2, 0],
  },
  {
    step: 6,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, 3, -1, -1],
    action:
      'Configuración 1 · Fila 1: Probar columna 3 (1, 3). Fila 2 también queda bloqueada → Podar rama 1.',
    conflict: [2, 1],
  },
  {
    step: 7,
    configId: 2,
    branchLabel: 'Rama 2: Columna 1',
    board: [1, -1, -1, -1],
    action:
      'Configuración 2 (Rama Col 1) · Fila 0: Avanzar a columna 1 (0, 1). Nuevo subárbol de búsqueda.',
    conflict: null,
  },
  {
    step: 8,
    configId: 2,
    branchLabel: 'Rama 2: Columna 1',
    board: [1, 3, -1, -1],
    action:
      'Configuración 2 · Fila 1: Probar col 0 y 2 (atacadas). Colocar reina en columna 3 (1, 3) válida.',
    conflict: null,
  },
  {
    step: 9,
    configId: 2,
    branchLabel: 'Rama 2: Columna 1',
    board: [1, 3, 0, -1],
    action:
      'Configuración 2 · Fila 2: Columna 0 (2, 0) está libre de ataques diagonales y ortogonales.',
    conflict: null,
  },
  {
    step: 10,
    configId: 2,
    branchLabel: 'Rama 2: Columna 1 (Solución 1)',
    board: [1, 3, 0, 2],
    action:
      '¡SOLUCIÓN 1 ENCONTRADA! Configuración 2 completa: [1, 3, 0, 2]. 4 damas mutuamente a salvo.',
    conflict: null,
    isSolution: true,
  },
  {
    step: 11,
    configId: 3,
    branchLabel: 'Rama 3: Columna 2',
    board: [2, -1, -1, -1],
    action:
      'Configuración 3 (Rama Col 2) · Fila 0: Colocar reina en columna 2 (0, 2). Explorar subárbol simétrico.',
    conflict: null,
  },
  {
    step: 12,
    configId: 3,
    branchLabel: 'Rama 3: Columna 2',
    board: [2, 0, -1, -1],
    action:
      'Configuración 3 · Fila 1: Probar col 0 (1, 0). Válida sin conflicto ortogonal ni diagonal.',
    conflict: null,
  },
  {
    step: 13,
    configId: 3,
    branchLabel: 'Rama 3: Columna 2',
    board: [2, 0, 3, -1],
    action:
      'Configuración 3 · Fila 2: Probar col 3 (2, 3). Válida (|2-0| != |3-2| y |2-1| != |3-0|).',
    conflict: null,
  },
  {
    step: 14,
    configId: 3,
    branchLabel: 'Rama 3: Columna 2 (Solución 2)',
    board: [2, 0, 3, 1],
    action:
      '¡SOLUCIÓN 2 ENCONTRADA! Configuración 3 completa: [2, 0, 3, 1]. Segunda y última solución canónica.',
    conflict: null,
    isSolution: true,
  },
  {
    step: 15,
    configId: 4,
    branchLabel: 'Rama 4: Columna 3',
    board: [3, -1, -1, -1],
    action:
      'Configuración 4 (Rama Col 3) · Fila 0: Colocar reina en columna 3 (0, 3). Explorar última rama raíz.',
    conflict: null,
  },
  {
    step: 16,
    configId: 4,
    branchLabel: 'Rama 4: Columna 3',
    board: [3, 0, -1, -1],
    action:
      'Configuración 4 · Fila 1: Probar col 0 (1, 0). Libre de conflicto diagonal y de columna.',
    conflict: null,
  },
  {
    step: 17,
    configId: 4,
    branchLabel: 'Rama 4: Columna 3',
    board: [3, 0, 2, -1],
    action:
      'Configuración 4 · Fila 2: Intentos en col 1 y 2 bloqueados. Fila 3 no tiene celdas válidas → Backtracking.',
    conflict: [2, 2],
  },
  {
    step: 18,
    configId: 4,
    branchLabel: 'Rama 4: Columna 3',
    board: [3, 1, -1, -1],
    action:
      'Configuración 4 · Fila 1: Probar col 1 (1, 1). Conflicto en Fila 2. Árbol de búsqueda 4x4 concluido exhaustivamente.',
    conflict: [1, 1],
  },
];

export const CONFIG_JUMP_INDICES: Record<number, number> = {
  1: 0,
  2: 6,
  3: 10,
  4: 14,
};

export const CANONICAL_CONFIGURATIONS = [
  {
    id: 1,
    label: 'Rama Col 0',
    desc: 'Fila 0 = Col 0',
    result: 'Poda / Fallo',
    color: 'border-zinc-700 bg-zinc-900/60',
  },
  {
    id: 2,
    label: 'Rama Col 1',
    desc: 'Solución 1: [1, 3, 0, 2]',
    result: '¡Solución Factible!',
    color: 'border-violet-600 bg-violet-950/40',
  },
  {
    id: 3,
    label: 'Rama Col 2',
    desc: 'Solución 2: [2, 0, 3, 1]',
    result: '¡Solución Factible!',
    color: 'border-violet-600 bg-violet-950/40',
  },
  {
    id: 4,
    label: 'Rama Col 3',
    desc: 'Fila 0 = Col 3',
    result: 'Poda / Fallo',
    color: 'border-zinc-700 bg-zinc-900/60',
  },
];

export function isUnderAttackByExistingQueens(
  row: number,
  col: number,
  board: number[],
): boolean {
  for (let r = 0; r < 4; r++) {
    const c = board[r];
    if (c === -1 || r === row) continue;
    if (c === col) return true;
    if (Math.abs(r - row) === Math.abs(c - col)) return true;
  }
  return false;
}

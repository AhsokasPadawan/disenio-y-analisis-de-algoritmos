export type ArrowDir = 'diag' | 'up' | 'left' | 'none';

export interface LcsCell {
  val: number;
  dir: ArrowDir;
}

export const X_SEQ = ['A', 'B', 'C', 'B', 'D', 'A', 'B'];
export const Y_SEQ = ['B', 'D', 'C', 'A', 'B', 'A'];

export const LCS_TABLE: LcsCell[][] = [
  [
    { val: 0, dir: 'none' },
    { val: 0, dir: 'none' },
    { val: 0, dir: 'none' },
    { val: 0, dir: 'none' },
    { val: 0, dir: 'none' },
    { val: 0, dir: 'none' },
    { val: 0, dir: 'none' },
  ],
  [
    { val: 0, dir: 'none' },
    { val: 0, dir: 'up' },
    { val: 0, dir: 'up' },
    { val: 0, dir: 'up' },
    { val: 1, dir: 'diag' },
    { val: 1, dir: 'left' },
    { val: 1, dir: 'diag' },
  ],
  [
    { val: 0, dir: 'none' },
    { val: 1, dir: 'diag' },
    { val: 1, dir: 'left' },
    { val: 1, dir: 'left' },
    { val: 1, dir: 'up' },
    { val: 2, dir: 'diag' },
    { val: 2, dir: 'left' },
  ],
  [
    { val: 0, dir: 'none' },
    { val: 1, dir: 'up' },
    { val: 1, dir: 'up' },
    { val: 2, dir: 'diag' },
    { val: 2, dir: 'left' },
    { val: 2, dir: 'up' },
    { val: 2, dir: 'up' },
  ],
  [
    { val: 0, dir: 'none' },
    { val: 1, dir: 'diag' },
    { val: 1, dir: 'up' },
    { val: 2, dir: 'up' },
    { val: 2, dir: 'up' },
    { val: 3, dir: 'diag' },
    { val: 3, dir: 'left' },
  ],
  [
    { val: 0, dir: 'none' },
    { val: 1, dir: 'up' },
    { val: 2, dir: 'diag' },
    { val: 2, dir: 'up' },
    { val: 2, dir: 'up' },
    { val: 3, dir: 'up' },
    { val: 3, dir: 'up' },
  ],
  [
    { val: 0, dir: 'none' },
    { val: 1, dir: 'up' },
    { val: 2, dir: 'up' },
    { val: 2, dir: 'up' },
    { val: 3, dir: 'diag' },
    { val: 3, dir: 'up' },
    { val: 4, dir: 'diag' },
  ],
  [
    { val: 0, dir: 'none' },
    { val: 1, dir: 'diag' },
    { val: 2, dir: 'up' },
    { val: 2, dir: 'up' },
    { val: 3, dir: 'up' },
    { val: 4, dir: 'diag' },
    { val: 4, dir: 'up' },
  ],
];

export interface StepSpec {
  step: number;
  phase: 'tabulation' | 'backtracking' | 'complete';
  title: string;
  badge: string;
  description: string;
  focusCell?: [number, number];
  comparison?: {
    match: boolean;
    charX: string;
    charY: string;
    details: string;
  };
  backtrackPath: [number, number][];
  reconstructedChars: string[];
}

export const LCS_STEPS: StepSpec[] = [
  {
    step: 0,
    phase: 'tabulation',
    title: 'Paso 0: Inicialización de Frontera C[0, j] = C[i, 0] = 0',
    badge: '1. Casos Base',
    description:
      'La subsecuencia común entre cualquier prefijo y la cadena vacía tiene longitud 0. Se inicializan la fila 0 y columna 0 en ceros.',
    backtrackPath: [],
    reconstructedChars: [],
  },
  {
    step: 1,
    phase: 'tabulation',
    title: 'Paso 1: Coincidencia en C[2, 1] — X[1]="B" == Y[0]="B"',
    badge: '2. Transición Diagonal ↖',
    description:
      'Los caracteres coinciden: X[1] == Y[0] == "B". C[2, 1] = 1 + C[1, 0] = 1 + 0 = 1. Se registra flecha diagonal ↖ apuntando a la celda noroeste.',
    focusCell: [2, 1],
    comparison: {
      match: true,
      charX: 'B',
      charY: 'B',
      details: 'C[2, 1] = 1 + C[1, 0] = 1 (Flecha ↖)',
    },
    backtrackPath: [],
    reconstructedChars: [],
  },
  {
    step: 2,
    phase: 'tabulation',
    title: 'Paso 2: Discrepancia en C[3, 2] — X[2]="C" ≠ Y[1]="D"',
    badge: '2. Selección Máximo ↑',
    description:
      'Difieren: X[2]="C" ≠ Y[1]="D". C[3, 2] = max(C[2, 2]=1, C[3, 1]=1) = 1. Al ser iguales o provenir de arriba, se asigna flecha vertical ↑.',
    focusCell: [3, 2],
    comparison: {
      match: false,
      charX: 'C',
      charY: 'D',
      details: 'max(C[2, 2]=1, C[3, 1]=1) = 1 (Flecha ↑)',
    },
    backtrackPath: [],
    reconstructedChars: [],
  },
  {
    step: 3,
    phase: 'tabulation',
    title: 'Paso 3: Coincidencia en C[3, 3] — X[2]="C" == Y[2]="C"',
    badge: '2. Transición Diagonal ↖',
    description:
      'Coinciden: X[2] == Y[2] == "C". C[3, 3] = 1 + C[2, 2] = 1 + 1 = 2 con flecha ↖. La longitud acumulada asciende a 2.',
    focusCell: [3, 3],
    comparison: {
      match: true,
      charX: 'C',
      charY: 'C',
      details: 'C[3, 3] = 1 + C[2, 2] = 2 (Flecha ↖)',
    },
    backtrackPath: [],
    reconstructedChars: [],
  },
  {
    step: 4,
    phase: 'tabulation',
    title: 'Paso 4: Coincidencia en C[4, 5] — X[3]="B" == Y[4]="B"',
    badge: '2. Transición Diagonal ↖',
    description:
      'Coinciden: X[3] == Y[4] == "B". C[4, 5] = 1 + C[3, 4] = 1 + 2 = 3 con flecha ↖. Longitud alcanzada = 3.',
    focusCell: [4, 5],
    comparison: {
      match: true,
      charX: 'B',
      charY: 'B',
      details: 'C[4, 5] = 1 + C[3, 4] = 3 (Flecha ↖)',
    },
    backtrackPath: [],
    reconstructedChars: [],
  },
  {
    step: 5,
    phase: 'tabulation',
    title: 'Paso 5: Coincidencia Final en C[6, 6] — X[5]="A" == Y[5]="A"',
    badge: '2. Máximo Global',
    description:
      'Coincidencia en C[6, 6]: X[5] == Y[5] == "A". C[6, 6] = 1 + C[5, 5] = 1 + 3 = 4 con flecha ↖. La matriz alcanza la longitud máxima LCS = 4.',
    focusCell: [6, 6],
    comparison: {
      match: true,
      charX: 'A',
      charY: 'A',
      details: 'C[6, 6] = 1 + C[5, 5] = 4 (Flecha ↖)',
    },
    backtrackPath: [],
    reconstructedChars: [],
  },
  {
    step: 6,
    phase: 'backtracking',
    title: 'Paso 6: Inicio de Reconstrucción Inversa desde C[7, 6]',
    badge: '3. Traza Reversa',
    description:
      'Iniciamos en C[7, 6] = 4. La flecha apunta ↑ hacia C[6, 6]. Como proviene de arriba, no hubo coincidencia en este paso: subimos sin agregar carácter.',
    focusCell: [7, 6],
    backtrackPath: [
      [7, 6],
      [6, 6],
    ],
    reconstructedChars: [],
  },
  {
    step: 7,
    phase: 'backtracking',
    title: 'Paso 7: En C[6, 6] Flecha ↖ — ¡Captura Carácter "A"!',
    badge: '3. Carácter Reconstruido',
    description:
      'En C[6, 6], la flecha es diagonal ↖ hacia C[5, 5]. ¡El carácter "A" pertenece al LCS! Lo agregamos y saltamos a C[5, 5].',
    focusCell: [6, 6],
    backtrackPath: [
      [7, 6],
      [6, 6],
      [5, 5],
    ],
    reconstructedChars: ['A'],
  },
  {
    step: 8,
    phase: 'backtracking',
    title: 'Paso 8: En C[5, 5] Flecha ↑ hacia C[4, 5]',
    badge: '3. Traza Reversa',
    description:
      'En C[5, 5] la flecha apunta ↑ hacia C[4, 5]. No hay carácter asociado; nos movemos arriba a C[4, 5].',
    focusCell: [5, 5],
    backtrackPath: [
      [7, 6],
      [6, 6],
      [5, 5],
      [4, 5],
    ],
    reconstructedChars: ['A'],
  },
  {
    step: 9,
    phase: 'backtracking',
    title: 'Paso 9: En C[4, 5] Flecha ↖ — ¡Captura Carácter "B"!',
    badge: '3. Carácter Reconstruido',
    description:
      'En C[4, 5] la flecha es ↖ hacia C[3, 4]. ¡El carácter "B" pertenece al LCS! Cadena acumulada: "BA". Luego C[3, 4] apunta ← hacia C[3, 3].',
    focusCell: [4, 5],
    backtrackPath: [
      [7, 6],
      [6, 6],
      [5, 5],
      [4, 5],
      [3, 4],
      [3, 3],
    ],
    reconstructedChars: ['B', 'A'],
  },
  {
    step: 10,
    phase: 'backtracking',
    title: 'Paso 10: En C[3, 3] Flecha ↖ — ¡Captura Carácter "C"!',
    badge: '3. Carácter Reconstruido',
    description:
      'En C[3, 3] la flecha es ↖ hacia C[2, 2]. ¡El carácter "C" pertenece al LCS! Cadena acumulada: "CBA". Luego C[2, 2] apunta ← hacia C[2, 1].',
    focusCell: [3, 3],
    backtrackPath: [
      [7, 6],
      [6, 6],
      [5, 5],
      [4, 5],
      [3, 4],
      [3, 3],
      [2, 2],
      [2, 1],
    ],
    reconstructedChars: ['C', 'B', 'A'],
  },
  {
    step: 11,
    phase: 'complete',
    title: 'Paso 11: En C[2, 1] Flecha ↖ — ¡Captura "B"! Solución: "BCBA"',
    badge: '4. Solución Óptima',
    description:
      'En C[2, 1] la flecha es ↖ hacia C[1, 0]. Capturamos "B". Al alcanzar la columna 0, el backtracking concluye con éxito. Cadena final: "BCBA" (Longitud 4).',
    focusCell: [2, 1],
    backtrackPath: [
      [7, 6],
      [6, 6],
      [5, 5],
      [4, 5],
      [3, 4],
      [3, 3],
      [2, 2],
      [2, 1],
      [1, 0],
    ],
    reconstructedChars: ['B', 'C', 'B', 'A'],
  },
];

export const ARROW_SYMBOLS: Record<ArrowDir, string> = {
  diag: '↖',
  up: '↑',
  left: '←',
  none: '',
};

export const PHASE_BADGE_STYLES: Record<
  StepSpec['phase'],
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

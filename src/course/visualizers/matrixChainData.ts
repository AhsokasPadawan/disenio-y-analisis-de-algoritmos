export interface CandidateSplit {
  k: number;
  leftCost: number;
  rightCost: number;
  multCost: number;
  totalCost: number;
  formulaText: string;
  isMin: boolean;
}

export interface StepSpec {
  step: number;
  length: number;
  phase: 'diagonal' | 'complete';
  title: string;
  badge: string;
  description: string;
  activeCell?: [number, number];
  candidates?: CandidateSplit[];
  optimalK?: number;
  revealedM: (number | null)[][];
  revealedS: (number | null)[][];
  reconstructedParens?: string;
}

export const MATRICES = [
  { name: 'A₁', rows: 4, cols: 1 },
  { name: 'A₂', rows: 1, cols: 5 },
  { name: 'A₃', rows: 5, cols: 3 },
  { name: 'A₄', rows: 3, cols: 6 },
];

export const DIM_ARRAY = [4, 1, 5, 3, 6];

export const MATRIX_CHAIN_STEPS: StepSpec[] = [
  {
    step: 0,
    length: 1,
    phase: 'diagonal',
    title: 'Paso 0: Diagonal Principal L = 1 (Casos Base M[i, i] = 0)',
    badge: '1. Casos Base L=1',
    description:
      'Para una única matriz (cadena de longitud 1), no se requiere ninguna multiplicación escalar: M[1, 1] = M[2, 2] = M[3, 3] = M[4, 4] = 0.',
    revealedM: [
      [0, null, null, null],
      [null, 0, null, null],
      [null, null, 0, null],
      [null, null, null, 0],
    ],
    revealedS: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  {
    step: 1,
    length: 2,
    phase: 'diagonal',
    title: 'Paso 1: Cadena L = 2 — Celda M[1, 2] (A₁ · A₂)',
    badge: '2. Longitud L=2',
    description:
      'Único corte posible k = 1: M[1, 1] + M[2, 2] + d₀·d₁·d₂ = 0 + 0 + (4·1·5) = 20. Se guarda M[1, 2] = 20 y S[1, 2] = 1.',
    activeCell: [0, 1],
    candidates: [
      {
        k: 1,
        leftCost: 0,
        rightCost: 0,
        multCost: 20,
        totalCost: 20,
        formulaText: '0 + 0 + (4 · 1 · 5) = 20',
        isMin: true,
      },
    ],
    optimalK: 1,
    revealedM: [
      [0, 20, null, null],
      [null, 0, null, null],
      [null, null, 0, null],
      [null, null, null, 0],
    ],
    revealedS: [
      [null, 1, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  {
    step: 2,
    length: 2,
    phase: 'diagonal',
    title: 'Paso 2: Cadena L = 2 — M[2, 3] = 15 y M[3, 4] = 90',
    badge: '2. Longitud L=2',
    description:
      'M[2, 3] = 1·5·3 = 15 (corte k=2). M[3, 4] = 5·3·6 = 90 (corte k=3). Toda la diagonal de longitud 2 queda completada.',
    activeCell: [1, 2],
    revealedM: [
      [0, 20, null, null],
      [null, 0, 15, null],
      [null, null, 0, 90],
      [null, null, null, 0],
    ],
    revealedS: [
      [null, 1, null, null],
      [null, null, 2, null],
      [null, null, null, 3],
      [null, null, null, null],
    ],
  },
  {
    step: 3,
    length: 3,
    phase: 'diagonal',
    title: 'Paso 3: Cadena L = 3 — Celda M[1, 3] (Barrido k ∈ {1, 2})',
    badge: '3. Barrido de Partición',
    description:
      'Compiten 2 cortes: k=1: M[1, 1] + M[2, 3] + 4·1·3 = 0 + 15 + 12 = 27 vs k=2: M[1, 2] + M[3, 3] + 4·5·3 = 20 + 0 + 60 = 80. Mínimo = 27 con k* = 1.',
    activeCell: [0, 2],
    candidates: [
      {
        k: 1,
        leftCost: 0,
        rightCost: 15,
        multCost: 12,
        totalCost: 27,
        formulaText: 'M[1, 1] + M[2, 3] + (4·1·3) = 0 + 15 + 12 = 27',
        isMin: true,
      },
      {
        k: 2,
        leftCost: 20,
        rightCost: 0,
        multCost: 60,
        totalCost: 80,
        formulaText: 'M[1, 2] + M[3, 3] + (4·5·3) = 20 + 0 + 60 = 80',
        isMin: false,
      },
    ],
    optimalK: 1,
    revealedM: [
      [0, 20, 27, null],
      [null, 0, 15, null],
      [null, null, 0, 90],
      [null, null, null, 0],
    ],
    revealedS: [
      [null, 1, 1, null],
      [null, null, 2, null],
      [null, null, null, 3],
      [null, null, null, null],
    ],
  },
  {
    step: 4,
    length: 3,
    phase: 'diagonal',
    title: 'Paso 4: Cadena L = 3 — Celda M[2, 4] (Barrido k ∈ {2, 3})',
    badge: '3. Barrido de Partición',
    description:
      'k=2: 0 + 90 + 1·5·6 = 120 vs k=3: 15 + 0 + 1·3·6 = 33. Mínimo = 33 con k* = 3. M[2, 4] = 33, S[2, 4] = 3.',
    activeCell: [1, 3],
    candidates: [
      {
        k: 2,
        leftCost: 0,
        rightCost: 90,
        multCost: 30,
        totalCost: 120,
        formulaText: 'M[2, 2] + M[3, 4] + (1·5·6) = 0 + 90 + 30 = 120',
        isMin: false,
      },
      {
        k: 3,
        leftCost: 15,
        rightCost: 0,
        multCost: 18,
        totalCost: 33,
        formulaText: 'M[2, 3] + M[4, 4] + (1·3·6) = 15 + 0 + 18 = 33',
        isMin: true,
      },
    ],
    optimalK: 3,
    revealedM: [
      [0, 20, 27, null],
      [null, 0, 15, 33],
      [null, null, 0, 90],
      [null, null, null, 0],
    ],
    revealedS: [
      [null, 1, 1, null],
      [null, null, 2, 3],
      [null, null, null, 3],
      [null, null, null, null],
    ],
  },
  {
    step: 5,
    length: 4,
    phase: 'diagonal',
    title: 'Paso 5: Cadena L = 4 — Celda Final M[1, 4] (Barrido k ∈ {1, 2, 3})',
    badge: '4. Mínimo Global M[1, 4]',
    description:
      'k=1: M[1, 1] + M[2, 4] + 4·1·6 = 0 + 33 + 24 = 57. k=2: M[1, 2] + M[3, 4] + 4·5·6 = 20 + 90 + 120 = 230. k=3: M[1, 3] + M[4, 4] + 4·3·6 = 27 + 0 + 72 = 99. ¡El mínimo absoluto es 57 con corte k* = 1!',
    activeCell: [0, 3],
    candidates: [
      {
        k: 1,
        leftCost: 0,
        rightCost: 33,
        multCost: 24,
        totalCost: 57,
        formulaText: 'k=1: 0 + 33 + (4·1·6) = 57 (ÓPTIMO)',
        isMin: true,
      },
      {
        k: 2,
        leftCost: 20,
        rightCost: 90,
        multCost: 120,
        totalCost: 230,
        formulaText: 'k=2: 20 + 90 + (4·5·6) = 230',
        isMin: false,
      },
      {
        k: 3,
        leftCost: 27,
        rightCost: 0,
        multCost: 72,
        totalCost: 99,
        formulaText: 'k=3: 27 + 0 + (4·3·6) = 99',
        isMin: false,
      },
    ],
    optimalK: 1,
    revealedM: [
      [0, 20, 27, 57],
      [null, 0, 15, 33],
      [null, null, 0, 90],
      [null, null, null, 0],
    ],
    revealedS: [
      [null, 1, 1, 1],
      [null, null, 2, 3],
      [null, null, null, 3],
      [null, null, null, null],
    ],
    reconstructedParens: '(A₁ · ((A₂ · A₃) · A₄))',
  },
  {
    step: 6,
    length: 4,
    phase: 'complete',
    title: 'Paso 6: Reconstrucción de Parentización Óptima mediante Matriz S',
    badge: '5. Parentización Óptima',
    description:
      'S[1, 4] = 1 divide en (A₁) y (A₂..A₄). S[2, 4] = 3 divide en (A₂..A₃) y (A₄). S[2, 3] = 2 divide en (A₂) y (A₃). Paréntesis óptimos: (A₁ · ((A₂ · A₃) · A₄)) con solo 57 multiplicaciones (frente a 230 o 99).',
    revealedM: [
      [0, 20, 27, 57],
      [null, 0, 15, 33],
      [null, null, 0, 90],
      [null, null, null, 0],
    ],
    revealedS: [
      [null, 1, 1, 1],
      [null, null, 2, 3],
      [null, null, null, 3],
      [null, null, null, null],
    ],
    reconstructedParens: '(A₁ · ((A₂ · A₃) · A₄))',
  },
];

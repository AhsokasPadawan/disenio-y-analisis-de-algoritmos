import { useState } from 'react';
import { Split, Award } from 'lucide-react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

interface CandidateSplit {
  k: number;
  leftCost: number;
  rightCost: number;
  multCost: number;
  totalCost: number;
  formulaText: string;
  isMin: boolean;
}

interface StepSpec {
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

const MATRICES = [
  { name: 'A₁', rows: 4, cols: 1 },
  { name: 'A₂', rows: 1, cols: 5 },
  { name: 'A₃', rows: 5, cols: 3 },
  { name: 'A₄', rows: 3, cols: 6 },
];

const DIM_ARRAY = [4, 1, 5, 3, 6];

const MATRIX_CHAIN_STEPS: StepSpec[] = [
  {
    step: 0,
    length: 1,
    phase: 'diagonal',
    title: 'Paso 0: Diagonal Principal L = 1 (Casos Base M[i, i] = 0)',
    badge: '1. Casos Base L=1',
    description: 'Para una única matriz (cadena de longitud 1), no se requiere ninguna multiplicación escalar: M[1, 1] = M[2, 2] = M[3, 3] = M[4, 4] = 0.',
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
    description: 'Único corte posible k = 1: M[1, 1] + M[2, 2] + d₀·d₁·d₂ = 0 + 0 + (4·1·5) = 20. Se guarda M[1, 2] = 20 y S[1, 2] = 1.',
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
    description: 'M[2, 3] = 1·5·3 = 15 (corte k=2). M[3, 4] = 5·3·6 = 90 (corte k=3). Toda la diagonal de longitud 2 queda completada.',
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
    description: 'Compiten 2 cortes: k=1: M[1, 1] + M[2, 3] + 4·1·3 = 0 + 15 + 12 = 27 vs k=2: M[1, 2] + M[3, 3] + 4·5·3 = 20 + 0 + 60 = 80. Mínimo = 27 con k* = 1.',
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
    description: 'k=2: 0 + 90 + 1·5·6 = 120 vs k=3: 15 + 0 + 1·3·6 = 33. Mínimo = 33 con k* = 3. M[2, 4] = 33, S[2, 4] = 3.',
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
    description: 'k=1: M[1, 1] + M[2, 4] + 4·1·6 = 0 + 33 + 24 = 57. k=2: M[1, 2] + M[3, 4] + 4·5·6 = 20 + 90 + 120 = 230. k=3: M[1, 3] + M[4, 4] + 4·3·6 = 27 + 0 + 72 = 99. ¡El mínimo absoluto es 57 con corte k* = 1!',
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
    description: 'S[1, 4] = 1 divide en (A₁) y (A₂..A₄). S[2, 4] = 3 divide en (A₂..A₃) y (A₄). S[2, 3] = 2 divide en (A₂) y (A₃). Paréntesis óptimos: (A₁ · ((A₂ · A₃) · A₄)) con solo 57 multiplicaciones (frente a 230 o 99).',
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

export function MatrixChainVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const frame = MATRIX_CHAIN_STEPS[currentStep] ?? MATRIX_CHAIN_STEPS[0];

  return (
    <AnimationPlayerShell
      title="Multiplicación Encadenada de Matrices: Llenado Diagonal M[i, j] y Matriz de Cortes S[i, j]"
      badge="Programación Dinámica · Orden Diagonal Θ(n³)"
      currentStep={currentStep}
      totalSteps={MATRIX_CHAIN_STEPS.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={frame.description}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="flex flex-col gap-2.5 py-1 w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-amber-800/40 pb-1.5 text-xs">
          <span className="font-bold text-amber-300">
            {frame.title}
          </span>
          <span className="rounded px-2.5 py-0.5 font-mono text-[11px] font-bold border bg-amber-950/70 border-amber-600/60 text-amber-300">
            {frame.badge}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400">Matrices:</span>
            {MATRICES.map((mat, idx) => (
              <span
                key={idx}
                className="rounded bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-zinc-200"
              >
                <strong>{mat.name}</strong> ({mat.rows}x{mat.cols})
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">Vector d:</span>
            <span className="rounded bg-sky-950 border border-sky-600 px-2 py-0.5 font-bold text-sky-200">
              [{DIM_ARRAY.join(', ')}]
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          <div className="lg:col-span-4 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 border-b border-zinc-800 pb-1">
              Matriz M[1..4, 1..4] (Costo Escalar)
            </span>
            <table className="w-full border-collapse text-center text-xs font-mono my-2">
              <thead>
                <tr className="text-zinc-400 text-[11px] border-b border-zinc-800">
                  <th className="p-1 text-left">i\j</th>
                  <th>A₁</th>
                  <th>A₂</th>
                  <th>A₃</th>
                  <th>A₄</th>
                </tr>
              </thead>
              <tbody>
                {frame.revealedM.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-zinc-900">
                    <td className="p-1 font-bold text-zinc-400 border-r border-zinc-800">
                      A{rIdx + 1}
                    </td>
                    {row.map((val, cIdx) => {
                      const isActive = frame.activeCell && frame.activeCell[0] === rIdx && frame.activeCell[1] === cIdx;
                      const isUnused = rIdx > cIdx;

                      return (
                        <td
                          key={cIdx}
                          className={`p-1.5 font-bold transition-all duration-300 rounded ${
                            isUnused
                              ? 'text-zinc-800 bg-zinc-950/20'
                              : isActive
                              ? 'bg-amber-400 text-zinc-950 font-black scale-105 shadow-md'
                              : val !== null
                              ? 'text-amber-300 bg-amber-950/30'
                              : 'text-zinc-700 bg-zinc-900/20'
                          }`}
                        >
                          {isUnused ? '—' : val !== null ? val : '·'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-[10px] text-zinc-400 text-center">
              Llenado diagonal: L = 1 → 2 → 3 → 4
            </div>
          </div>

          <div className="lg:col-span-4 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-sky-400 border-b border-zinc-800 pb-1 flex items-center justify-between">
              <span>Matriz S[1..4, 1..4] (Corte Óptimo k*)</span>
              <Split className="w-3.5 h-3.5 text-sky-400" />
            </span>
            <table className="w-full border-collapse text-center text-xs font-mono my-2">
              <thead>
                <tr className="text-zinc-400 text-[11px] border-b border-zinc-800">
                  <th className="p-1 text-left">i\j</th>
                  <th>A₁</th>
                  <th>A₂</th>
                  <th>A₃</th>
                  <th>A₄</th>
                </tr>
              </thead>
              <tbody>
                {frame.revealedS.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-zinc-900">
                    <td className="p-1 font-bold text-zinc-400 border-r border-zinc-800">
                      A{rIdx + 1}
                    </td>
                    {row.map((val, cIdx) => {
                      const isActive = frame.activeCell && frame.activeCell[0] === rIdx && frame.activeCell[1] === cIdx;
                      const isUnused = rIdx >= cIdx;

                      return (
                        <td
                          key={cIdx}
                          className={`p-1.5 font-bold transition-all duration-300 rounded ${
                            isUnused
                              ? 'text-zinc-800 bg-zinc-950/20'
                              : isActive
                              ? 'bg-sky-400 text-zinc-950 font-black scale-105 shadow-md'
                              : val !== null
                              ? 'text-sky-300 bg-sky-950/30'
                              : 'text-zinc-700 bg-zinc-900/20'
                          }`}
                        >
                          {isUnused ? '—' : val !== null ? `k=${val}` : '·'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-[10px] text-zinc-400 text-center">
              Guarda el índice donde se divide la cadena
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2">
            {frame.candidates && frame.candidates.length > 0 && (
              <div className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2 font-mono text-xs shadow-xl">
                <span className="text-[11px] font-bold text-zinc-300 border-b border-zinc-800 pb-0.5">
                  Evaluación de Cortes k ∈ [i, j-1]:
                </span>
                <div className="flex flex-col gap-1 mt-1">
                  {frame.candidates.map((cand) => (
                    <div
                      key={cand.k}
                      className={`flex flex-col p-1 rounded border text-[10px] ${
                        cand.isMin
                          ? 'border-amber-500 bg-amber-950/80 text-amber-200 font-bold'
                          : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>Corte k = {cand.k}</span>
                        <span>Total: <strong>{cand.totalCost}</strong></span>
                      </div>
                      <span className="text-[9.5px] text-zinc-400 mt-0.5">{cand.formulaText}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 font-mono shadow-xl">
              <span className="text-[11px] font-bold text-amber-400 border-b border-zinc-800 pb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Parentización Óptima:
              </span>
              <div className="py-1 text-center font-bold text-sm text-amber-300">
                {frame.reconstructedParens ?? 'Calculando cadenas...'}
              </div>
              <div className="text-[11px] text-zinc-400 flex justify-between border-t border-zinc-800 pt-1">
                <span>Costo Mínimo Final:</span>
                <strong className="text-amber-300">57 multiplicaciones</strong>
              </div>
            </div>

            <div className="rounded-xl border border-amber-800/30 bg-amber-950/20 p-2 text-[10px] text-zinc-300 flex flex-col gap-1">
              <span className="font-bold text-amber-400">
                Ahorro Asintótico:
              </span>
              <span>
                Multiplicación ingenua: hasta 230 operaciones. Con DP diagonal: 57 operaciones (ahorro del 75.2%).
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

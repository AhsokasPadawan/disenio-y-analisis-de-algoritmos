import { useState } from 'react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

interface StepData {
  step: number;
  row: number;
  col: number;
  description: string;
  sourceCells?: [number, number][];
  isFinal?: boolean;
}

const DENOMINATIONS = [1, 4, 6];
const COLUMNS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const FULL_MATRIX = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 1, 2, 3, 4, 2],
  [0, 1, 2, 3, 1, 2, 1, 2, 2],
];

const STEPS: StepData[] = [
  {
    step: 0,
    row: -1,
    col: -1,
    description: 'Tabla inicializada en blanco. Denominaciones d = {1, 4, 6}, valor objetivo = $8. Se llenará la matriz M[moneda, valor] fila por fila.',
  },
  {
    step: 1,
    row: 0,
    col: 0,
    description: 'Fila 1 (d1 = 1), j = 0: Para valor 0 se requieren exactamente 0 monedas.',
  },
  {
    step: 2,
    row: 0,
    col: 1,
    description: 'Fila 1 (d1 = 1), j = 1: Con solo monedas de 1, se requiere 1 moneda.',
  },
  {
    step: 3,
    row: 0,
    col: 2,
    description: 'Fila 1 (d1 = 1), j = 2: Con solo monedas de 1, se requieren 2 monedas (1 + 1).',
  },
  {
    step: 4,
    row: 0,
    col: 3,
    description: 'Fila 1 (d1 = 1), j = 3: Con solo monedas de 1, se requieren 3 monedas.',
  },
  {
    step: 5,
    row: 0,
    col: 4,
    description: 'Fila 1 (d1 = 1), j = 4: Con solo monedas de 1, se requieren 4 monedas.',
  },
  {
    step: 6,
    row: 0,
    col: 5,
    description: 'Fila 1 (d1 = 1), j = 5: Con solo monedas de 1, se requieren 5 monedas.',
  },
  {
    step: 7,
    row: 0,
    col: 6,
    description: 'Fila 1 (d1 = 1), j = 6: Con solo monedas de 1, se requieren 6 monedas.',
  },
  {
    step: 8,
    row: 0,
    col: 7,
    description: 'Fila 1 (d1 = 1), j = 7: Con solo monedas de 1, se requieren 7 monedas.',
  },
  {
    step: 9,
    row: 0,
    col: 8,
    description: 'Fila 1 (d1 = 1), j = 8: Con solo monedas de 1, se requieren 8 monedas. Fila 1 completada.',
  },
  {
    step: 10,
    row: 1,
    col: 0,
    description: 'Fila 2 (d2 = 4), j = 0: Para valor 0 se requieren 0 monedas.',
  },
  {
    step: 11,
    row: 1,
    col: 1,
    description: 'Fila 2 (d2 = 4), j = 1: j < 4, no alcanza la moneda de 4; se copia de la celda superior M[0, 1] = 1.',
    sourceCells: [[0, 1]],
  },
  {
    step: 12,
    row: 1,
    col: 2,
    description: 'Fila 2 (d2 = 4), j = 2: j < 4, no alcanza la moneda de 4; se copia de la celda superior M[0, 2] = 2.',
    sourceCells: [[0, 2]],
  },
  {
    step: 13,
    row: 1,
    col: 3,
    description: 'Fila 2 (d2 = 4), j = 3: j < 4, no alcanza la moneda de 4; se copia de la celda superior M[0, 3] = 3.',
    sourceCells: [[0, 3]],
  },
  {
    step: 14,
    row: 1,
    col: 4,
    description: 'Fila 2 (d2 = 4), j = 4: min(M[0, 4]=4, 1 + M[1, 0]=1) = 1. ¡Se usa 1 moneda de 4!',
    sourceCells: [[0, 4], [1, 0]],
  },
  {
    step: 15,
    row: 1,
    col: 5,
    description: 'Fila 2 (d2 = 4), j = 5: min(M[0, 5]=5, 1 + M[1, 1]=2) = 2 monedas (4 + 1).',
    sourceCells: [[0, 5], [1, 1]],
  },
  {
    step: 16,
    row: 1,
    col: 6,
    description: 'Fila 2 (d2 = 4), j = 6: min(M[0, 6]=6, 1 + M[1, 2]=3) = 3 monedas (4 + 1 + 1).',
    sourceCells: [[0, 6], [1, 2]],
  },
  {
    step: 17,
    row: 1,
    col: 7,
    description: 'Fila 2 (d2 = 4), j = 7: min(M[0, 7]=7, 1 + M[1, 3]=4) = 4 monedas (4 + 1 + 1 + 1).',
    sourceCells: [[0, 7], [1, 3]],
  },
  {
    step: 18,
    row: 1,
    col: 8,
    description: 'Fila 2 (d2 = 4), j = 8: min(M[0, 8]=8, 1 + M[1, 4]=2) = 2 monedas (4 + 4). Fila 2 completada.',
    sourceCells: [[0, 8], [1, 4]],
  },
  {
    step: 19,
    row: 2,
    col: 0,
    description: 'Fila 3 (d3 = 6), j = 0: Para valor 0 se requieren 0 monedas.',
  },
  {
    step: 20,
    row: 2,
    col: 1,
    description: 'Fila 3 (d3 = 6), j = 1: j < 6, se copia de arriba M[1, 1] = 1.',
    sourceCells: [[1, 1]],
  },
  {
    step: 21,
    row: 2,
    col: 2,
    description: 'Fila 3 (d3 = 6), j = 2: j < 6, se copia de arriba M[1, 2] = 2.',
    sourceCells: [[1, 2]],
  },
  {
    step: 22,
    row: 2,
    col: 3,
    description: 'Fila 3 (d3 = 6), j = 3: j < 6, se copia de arriba M[1, 3] = 3.',
    sourceCells: [[1, 3]],
  },
  {
    step: 23,
    row: 2,
    col: 4,
    description: 'Fila 3 (d3 = 6), j = 4: j < 6, se copia de arriba M[1, 4] = 1.',
    sourceCells: [[1, 4]],
  },
  {
    step: 24,
    row: 2,
    col: 5,
    description: 'Fila 3 (d3 = 6), j = 5: j < 6, se copia de arriba M[1, 5] = 2.',
    sourceCells: [[1, 5]],
  },
  {
    step: 25,
    row: 2,
    col: 6,
    description: 'Fila 3 (d3 = 6), j = 6: min(M[1, 6]=3, 1 + M[2, 0]=1) = 1. ¡Se usa 1 moneda de 6!',
    sourceCells: [[1, 6], [2, 0]],
  },
  {
    step: 26,
    row: 2,
    col: 7,
    description: 'Fila 3 (d3 = 6), j = 7: min(M[1, 7]=4, 1 + M[2, 1]=2) = 2 monedas (6 + 1).',
    sourceCells: [[1, 7], [2, 1]],
  },
  {
    step: 27,
    row: 2,
    col: 8,
    description: 'Fila 3 (d3 = 6), j = 8: min(M[1, 8]=2, 1 + M[2, 2]=3) = 2. ¡Usar 6 daría 3 monedas {6, 1, 1}! No usar 6 retiene el óptimo {4, 4} de 2 monedas.',
    sourceCells: [[1, 8], [2, 2]],
  },
  {
    step: 28,
    row: 2,
    col: 8,
    description: 'Solución Final: M[2, 8] = 2. Backtracking reconstruye {4, 4} (2 monedas). El enfoque voraz habría elegido 6 + 1 + 1 (3 monedas), demostrando el fallo de Greedy.',
    sourceCells: [[1, 8], [1, 4], [1, 0]],
    isFinal: true,
  },
];

export function CoinChangeVisualizer() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const currentFrame = STEPS[currentStepIndex] ?? STEPS[0];

  const isCellCalculated = (r: number, c: number) => {
    if (currentStepIndex === 0) return false;
    const targetStep = r * 9 + c + 1;
    return currentStepIndex >= targetStep;
  };

  const isCurrentCell = (r: number, c: number) => {
    return currentFrame.row === r && currentFrame.col === c;
  };

  const isSourceCell = (r: number, c: number) => {
    return (currentFrame.sourceCells ?? []).some(([sr, sc]) => sr === r && sc === c);
  };

  const handleStepChange = (newStep: number) => {
    setCurrentStepIndex(Math.max(0, Math.min(STEPS.length - 1, newStep)));
  };

  return (
    <AnimationPlayerShell
      title="Problema del Cambio de Monedas: Contraejemplo Canónico de Greedy y Solución DP"
      badge="Programación Dinámica"
      currentStep={currentStepIndex}
      totalSteps={STEPS.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={currentFrame.description}
      onStepChange={handleStepChange}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStepIndex(0)}
    >
      <div className="flex flex-col gap-3 py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-rose-900/40 bg-rose-950/20 p-2.5 sm:p-3 text-xs">
            <span className="font-bold text-rose-300 block mb-1">
              Fallo de Algoritmo Greedy:
            </span>
            <p className="text-zinc-300 leading-snug">
              Greedy toma la moneda más grande disponible (6) y luego dos de 1:
              <strong className="text-white ml-1">6 + 1 + 1 = 3 monedas</strong>.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/30 p-2.5 sm:p-3 text-xs">
            <span className="font-bold text-emerald-300 block mb-1">
              Solución Óptima de Programación Dinámica:
            </span>
            <p className="text-zinc-300 leading-snug">
              Evalúa combinaciones mediante la recurrencia tabular y encuentra:
              <strong className="text-emerald-300 ml-1">4 + 4 = 2 monedas</strong>.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-3 shadow-inner">
          <table className="w-full border-collapse text-center text-xs font-mono">
            <thead>
              <tr className="border-b border-emerald-800 text-emerald-400">
                <th className="p-2 text-left font-sans">Moneda \ Valor</th>
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className={`p-2 transition-colors ${
                      currentFrame.col === col
                        ? 'text-amber-300 font-extrabold bg-amber-400/10'
                        : ''
                    }`}
                  >
                    ${col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DENOMINATIONS.map((coin, rowIdx) => {
                return (
                  <tr key={rowIdx} className="border-b border-zinc-800/80">
                    <td className="p-2 text-left font-bold text-white bg-emerald-950/60 border-r border-emerald-900 font-sans">
                      d{rowIdx + 1} = ${coin}
                    </td>
                    {COLUMNS.map((col) => {
                      const calculated = isCellCalculated(rowIdx, col);
                      const isCurrent = isCurrentCell(rowIdx, col);
                      const isSource = isSourceCell(rowIdx, col);
                      const cellValue = calculated ? FULL_MATRIX[rowIdx][col] : '';

                      let cellStyle = 'text-zinc-500 bg-transparent';
                      if (currentFrame.isFinal && isSource) {
                        cellStyle = 'bg-emerald-600/30 text-emerald-200 font-black border-2 border-emerald-400 scale-105';
                      } else if (isCurrent) {
                        cellStyle = 'bg-amber-400/30 text-amber-200 font-black border-2 border-amber-400 scale-110 shadow-lg';
                      } else if (isSource) {
                        cellStyle = 'bg-cyan-500/20 text-cyan-200 font-bold border border-cyan-400';
                      } else if (calculated) {
                        cellStyle = 'text-zinc-200 bg-zinc-900/60';
                      }

                      return (
                        <td
                          key={col}
                          className={`p-2 transition-all duration-200 ${cellStyle}`}
                        >
                          {cellValue}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-300 border-t border-zinc-800/80 pt-2">
          <span>Recurrencia: M[i, j] = min(M[i-1, j], 1 + M[i, j - di])</span>
          <span className="text-emerald-300 font-bold">
            {currentFrame.isFinal
              ? 'Óptimo Global Reconstruido: {4, 4} (2 monedas)'
              : `Paso ${currentStepIndex} de ${STEPS.length - 1}`}
          </span>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

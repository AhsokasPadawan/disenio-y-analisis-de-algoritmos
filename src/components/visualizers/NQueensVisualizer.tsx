import { useState } from 'react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

interface QueenStep {
  step: number;
  configId: number;
  branchLabel: string;
  board: number[];
  action: string;
  conflict: [number, number] | null;
  attackedCells?: [number, number][];
  isSolution?: boolean;
}

const QUEEN_STEPS: QueenStep[] = [
  {
    step: 1,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, -1, -1, -1],
    action: 'Configuración 1 (Rama Col 0) · Fila 0: Colocar reina en columna 0 (0, 0). Sin restricciones.',
    conflict: null,
  },
  {
    step: 2,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, 0, -1, -1],
    action: 'Configuración 1 · Fila 1: Intentar columna 0. Conflicto de columna vertical con (0, 0).',
    conflict: [1, 0],
  },
  {
    step: 3,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, 1, -1, -1],
    action: 'Configuración 1 · Fila 1: Intentar columna 1. Conflicto diagonal con (0, 0) (|1-0| == |1-0|).',
    conflict: [1, 1],
  },
  {
    step: 4,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, 2, -1, -1],
    action: 'Configuración 1 · Fila 1: Intentar columna 2 (1, 2). Posición factible sin ataques.',
    conflict: null,
  },
  {
    step: 5,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, 2, 0, -1],
    action: 'Configuración 1 · Fila 2: Columnas 0, 1, 2 y 3 quedan atacadas. Callejón sin salida → Backtracking.',
    conflict: [2, 0],
  },
  {
    step: 6,
    configId: 1,
    branchLabel: 'Rama 1: Columna 0',
    board: [0, 3, -1, -1],
    action: 'Configuración 1 · Fila 1: Probar columna 3 (1, 3). Fila 2 también queda bloqueada → Podar rama 1.',
    conflict: [2, 1],
  },
  {
    step: 7,
    configId: 2,
    branchLabel: 'Rama 2: Columna 1',
    board: [1, -1, -1, -1],
    action: 'Configuración 2 (Rama Col 1) · Fila 0: Avanzar a columna 1 (0, 1). Nuevo subárbol de búsqueda.',
    conflict: null,
  },
  {
    step: 8,
    configId: 2,
    branchLabel: 'Rama 2: Columna 1',
    board: [1, 3, -1, -1],
    action: 'Configuración 2 · Fila 1: Probar col 0 y 2 (atacadas). Colocar reina en columna 3 (1, 3) válida.',
    conflict: null,
  },
  {
    step: 9,
    configId: 2,
    branchLabel: 'Rama 2: Columna 1',
    board: [1, 3, 0, -1],
    action: 'Configuración 2 · Fila 2: Columna 0 (2, 0) está libre de ataques diagonales y ortogonales.',
    conflict: null,
  },
  {
    step: 10,
    configId: 2,
    branchLabel: 'Rama 2: Columna 1 (Solución 1)',
    board: [1, 3, 0, 2],
    action: '¡SOLUCIÓN 1 ENCONTRADA! Configuración 2 completa: [1, 3, 0, 2]. 4 damas mutuamente a salvo.',
    conflict: null,
    isSolution: true,
  },
  {
    step: 11,
    configId: 3,
    branchLabel: 'Rama 3: Columna 2',
    board: [2, -1, -1, -1],
    action: 'Configuración 3 (Rama Col 2) · Fila 0: Colocar reina en columna 2 (0, 2). Explorar subárbol simétrico.',
    conflict: null,
  },
  {
    step: 12,
    configId: 3,
    branchLabel: 'Rama 3: Columna 2',
    board: [2, 0, -1, -1],
    action: 'Configuración 3 · Fila 1: Probar col 0 (1, 0). Válida sin conflicto ortogonal ni diagonal.',
    conflict: null,
  },
  {
    step: 13,
    configId: 3,
    branchLabel: 'Rama 3: Columna 2',
    board: [2, 0, 3, -1],
    action: 'Configuración 3 · Fila 2: Probar col 3 (2, 3). Válida (|2-0| != |3-2| y |2-1| != |3-0|).',
    conflict: null,
  },
  {
    step: 14,
    configId: 3,
    branchLabel: 'Rama 3: Columna 2 (Solución 2)',
    board: [2, 0, 3, 1],
    action: '¡SOLUCIÓN 2 ENCONTRADA! Configuración 3 completa: [2, 0, 3, 1]. Segunda y última solución canónica.',
    conflict: null,
    isSolution: true,
  },
  {
    step: 15,
    configId: 4,
    branchLabel: 'Rama 4: Columna 3',
    board: [3, -1, -1, -1],
    action: 'Configuración 4 (Rama Col 3) · Fila 0: Colocar reina en columna 3 (0, 3). Explorar última rama raíz.',
    conflict: null,
  },
  {
    step: 16,
    configId: 4,
    branchLabel: 'Rama 4: Columna 3',
    board: [3, 0, -1, -1],
    action: 'Configuración 4 · Fila 1: Probar col 0 (1, 0). Libre de conflicto diagonal y de columna.',
    conflict: null,
  },
  {
    step: 17,
    configId: 4,
    branchLabel: 'Rama 4: Columna 3',
    board: [3, 0, 2, -1],
    action: 'Configuración 4 · Fila 2: Intentos en col 1 y 2 bloqueados. Fila 3 no tiene celdas válidas → Backtracking.',
    conflict: [2, 2],
  },
  {
    step: 18,
    configId: 4,
    branchLabel: 'Rama 4: Columna 3',
    board: [3, 1, -1, -1],
    action: 'Configuración 4 · Fila 1: Probar col 1 (1, 1). Conflicto en Fila 2. Árbol de búsqueda 4x4 concluido exhaustivamente.',
    conflict: [1, 1],
  },
];

const CONFIG_JUMP_INDICES: Record<number, number> = {
  1: 0,
  2: 6,
  3: 10,
  4: 14,
};

const CANONICAL_CONFIGURATIONS = [
  { id: 1, label: 'Rama Col 0', desc: 'Fila 0 = Col 0', result: 'Poda / Fallo', color: 'border-zinc-700 bg-zinc-900/60' },
  { id: 2, label: 'Rama Col 1', desc: 'Solución 1: [1, 3, 0, 2]', result: '¡Solución Factible!', color: 'border-violet-600 bg-violet-950/40' },
  { id: 3, label: 'Rama Col 2', desc: 'Solución 2: [2, 0, 3, 1]', result: '¡Solución Factible!', color: 'border-violet-600 bg-violet-950/40' },
  { id: 4, label: 'Rama Col 3', desc: 'Fila 0 = Col 3', result: 'Poda / Fallo', color: 'border-zinc-700 bg-zinc-900/60' },
];

function isUnderAttackByExistingQueens(row: number, col: number, board: number[]): boolean {
  for (let r = 0; r < 4; r++) {
    const c = board[r];
    if (c === -1 || r === row) continue;
    if (c === col) return true;
    if (Math.abs(r - row) === Math.abs(c - col)) return true;
  }
  return false;
}

export function NQueensVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const frame = QUEEN_STEPS[currentStep] ?? QUEEN_STEPS[0];

  const handleSelectConfig = (configId: number) => {
    const targetIndex = CONFIG_JUMP_INDICES[configId];
    if (targetIndex !== undefined) {
      setCurrentStep(targetIndex);
    }
  };

  return (
    <AnimationPlayerShell
      title="Problema de las N-Reinas (4 Damas en Tablero 4x4) con Backtracking"
      badge="Backtracking y Poda"
      currentStep={currentStep}
      totalSteps={QUEEN_STEPS.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={frame.action}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="flex flex-col gap-3 py-1">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          {CANONICAL_CONFIGURATIONS.map((cfg) => {
            const isActive = frame.configId === cfg.id;
            return (
              <button
                key={cfg.id}
                type="button"
                onClick={() => handleSelectConfig(cfg.id)}
                className={`flex flex-col items-start p-2 rounded-lg border text-left transition-all ${
                  isActive
                    ? 'border-amber-400 bg-amber-950/40 shadow-xs ring-1 ring-amber-400/50'
                    : `${cfg.color} hover:border-zinc-500`
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[11px] font-bold ${isActive ? 'text-amber-300' : 'text-zinc-200'}`}>
                    {cfg.label}
                  </span>
                  {cfg.result.includes('Solución') && (
                    <span className="text-[9px] font-black uppercase text-violet-300 bg-violet-950/80 px-1 rounded">
                      Sol
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-zinc-400 truncate w-full mt-0.5">{cfg.desc}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-1">
          <div className="relative p-2 bg-zinc-950 border-2 border-violet-700/60 rounded-xl shadow-lg">
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3].map((col) => {
                  const isDark = (row + col) % 2 === 1;
                  const hasQueen = frame.board[row] === col;
                  const isConflict =
                    frame.conflict && frame.conflict[0] === row && frame.conflict[1] === col;
                  const isAttacked = !hasQueen && isUnderAttackByExistingQueens(row, col, frame.board);

                  return (
                    <div
                      key={`${row}-${col}`}
                      className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg font-mono text-xs font-bold transition-all duration-200 ${
                        isConflict
                          ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-900/60'
                          : hasQueen
                          ? frame.isSolution
                            ? 'bg-violet-500 text-white shadow-md shadow-violet-900/50 scale-105 ring-2 ring-violet-300'
                            : 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-900/50 scale-105'
                          : isAttacked
                          ? 'bg-rose-950/30 text-rose-300/40 border border-rose-900/20'
                          : isDark
                          ? 'bg-violet-950/70 text-zinc-500 border border-violet-900/30'
                          : 'bg-zinc-800/70 text-zinc-400 border border-zinc-700/30'
                      }`}
                    >
                      {hasQueen && (
                        <span className="text-2xl leading-none drop-shadow-xs">♛</span>
                      )}
                      {isConflict && !hasQueen && (
                        <span className="text-base font-black text-white">✗</span>
                      )}
                      {!hasQueen && !isConflict && (
                        <span className="text-[9px] opacity-30 select-none">
                          {row},{col}
                        </span>
                      )}
                      {isAttacked && !isConflict && !hasQueen && (
                        <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-rose-400/60">
                          ✕
                        </span>
                      )}
                    </div>
                  );
                }),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 max-w-sm w-full font-mono text-xs bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
              <span className="text-zinc-400 text-[11px] font-sans font-semibold">Estado de la Búsqueda:</span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-extrabold ${
                  frame.isSolution
                    ? 'bg-violet-500 text-white animate-bounce'
                    : frame.conflict
                    ? 'bg-rose-500 text-zinc-950'
                    : 'bg-zinc-800 text-zinc-200'
                }`}
              >
                {frame.isSolution ? '¡Solución Válida!' : frame.conflict ? 'Conflicto Detectado' : 'Posición Factible'}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-zinc-400">Configuración Activa:</span>
                <span className="text-amber-300 font-bold">{frame.branchLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Vector de Columnas:</span>
                <span className="text-zinc-200 font-bold">
                  [{frame.board.map((c) => (c === -1 ? '·' : c)).join(', ')}]
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Soluciones en 4x4:</span>
                <span className="text-violet-300 font-bold">2 únicas ([1,3,0,2] y [2,0,3,1])</span>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-950 p-2 text-[10px] text-zinc-400 border border-zinc-800">
              <p className="font-sans font-semibold text-zinc-300 mb-0.5">Predicado de Poda Diagonal:</p>
              <code>|fila_i - fila_j| == |col_i - col_j|</code>
              <p className="mt-1 text-zinc-500 text-[9px]">
                Si la distancia vertical iguala la horizontal, ambas reinas comparten la misma diagonal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

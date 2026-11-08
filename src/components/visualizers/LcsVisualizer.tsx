import { useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

type ArrowDir = 'diag' | 'up' | 'left' | 'none';

interface LcsCell {
  val: number;
  dir: ArrowDir;
}

const X_SEQ = ['A', 'B', 'C', 'B', 'D', 'A', 'B'];
const Y_SEQ = ['B', 'D', 'C', 'A', 'B', 'A'];

const LCS_TABLE: LcsCell[][] = [
  [
    { val: 0, dir: 'none' }, { val: 0, dir: 'none' }, { val: 0, dir: 'none' },
    { val: 0, dir: 'none' }, { val: 0, dir: 'none' }, { val: 0, dir: 'none' }, { val: 0, dir: 'none' }
  ],
  [
    { val: 0, dir: 'none' }, { val: 0, dir: 'up' }, { val: 0, dir: 'up' },
    { val: 0, dir: 'up' }, { val: 1, dir: 'diag' }, { val: 1, dir: 'left' }, { val: 1, dir: 'diag' }
  ],
  [
    { val: 0, dir: 'none' }, { val: 1, dir: 'diag' }, { val: 1, dir: 'left' },
    { val: 1, dir: 'left' }, { val: 1, dir: 'up' }, { val: 2, dir: 'diag' }, { val: 2, dir: 'left' }
  ],
  [
    { val: 0, dir: 'none' }, { val: 1, dir: 'up' }, { val: 1, dir: 'up' },
    { val: 2, dir: 'diag' }, { val: 2, dir: 'left' }, { val: 2, dir: 'up' }, { val: 2, dir: 'up' }
  ],
  [
    { val: 0, dir: 'none' }, { val: 1, dir: 'diag' }, { val: 1, dir: 'up' },
    { val: 2, dir: 'up' }, { val: 2, dir: 'up' }, { val: 3, dir: 'diag' }, { val: 3, dir: 'left' }
  ],
  [
    { val: 0, dir: 'none' }, { val: 1, dir: 'up' }, { val: 2, dir: 'diag' },
    { val: 2, dir: 'up' }, { val: 2, dir: 'up' }, { val: 3, dir: 'up' }, { val: 3, dir: 'up' }
  ],
  [
    { val: 0, dir: 'none' }, { val: 1, dir: 'up' }, { val: 2, dir: 'up' },
    { val: 2, dir: 'up' }, { val: 3, dir: 'diag' }, { val: 3, dir: 'up' }, { val: 4, dir: 'diag' }
  ],
  [
    { val: 0, dir: 'none' }, { val: 1, dir: 'diag' }, { val: 2, dir: 'up' },
    { val: 2, dir: 'up' }, { val: 3, dir: 'up' }, { val: 4, dir: 'diag' }, { val: 4, dir: 'up' }
  ],
];

interface StepSpec {
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

const LCS_STEPS: StepSpec[] = [
  {
    step: 0,
    phase: 'tabulation',
    title: 'Paso 0: Inicialización de Frontera C[0, j] = C[i, 0] = 0',
    badge: '1. Casos Base',
    description: 'La subsecuencia común entre cualquier prefijo y la cadena vacía tiene longitud 0. Se inicializan la fila 0 y columna 0 en ceros.',
    backtrackPath: [],
    reconstructedChars: [],
  },
  {
    step: 1,
    phase: 'tabulation',
    title: 'Paso 1: Coincidencia en C[2, 1] — X[1]="B" == Y[0]="B"',
    badge: '2. Transición Diagonal ↖',
    description: 'Los caracteres coinciden: X[1] == Y[0] == "B". C[2, 1] = 1 + C[1, 0] = 1 + 0 = 1. Se registra flecha diagonal ↖ apuntando a la celda noroeste.',
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
    description: 'Difieren: X[2]="C" ≠ Y[1]="D". C[3, 2] = max(C[2, 2]=1, C[3, 1]=1) = 1. Al ser iguales o provenir de arriba, se asigna flecha vertical ↑.',
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
    description: 'Coinciden: X[2] == Y[2] == "C". C[3, 3] = 1 + C[2, 2] = 1 + 1 = 2 con flecha ↖. La longitud acumulada asciende a 2.',
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
    description: 'Coinciden: X[3] == Y[4] == "B". C[4, 5] = 1 + C[3, 4] = 1 + 2 = 3 con flecha ↖. Longitud alcanzada = 3.',
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
    description: 'Coincidencia en C[6, 6]: X[5] == Y[5] == "A". C[6, 6] = 1 + C[5, 5] = 1 + 3 = 4 con flecha ↖. La matriz alcanza la longitud máxima LCS = 4.',
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
    description: 'Iniciamos en C[7, 6] = 4. La flecha apunta ↑ hacia C[6, 6]. Como proviene de arriba, no hubo coincidencia en este paso: subimos sin agregar carácter.',
    focusCell: [7, 6],
    backtrackPath: [[7, 6], [6, 6]],
    reconstructedChars: [],
  },
  {
    step: 7,
    phase: 'backtracking',
    title: 'Paso 7: En C[6, 6] Flecha ↖ — ¡Captura Carácter "A"!',
    badge: '3. Carácter Reconstruido',
    description: 'En C[6, 6], la flecha es diagonal ↖ hacia C[5, 5]. ¡El carácter "A" pertenece al LCS! Lo agregamos y saltamos a C[5, 5].',
    focusCell: [6, 6],
    backtrackPath: [[7, 6], [6, 6], [5, 5]],
    reconstructedChars: ['A'],
  },
  {
    step: 8,
    phase: 'backtracking',
    title: 'Paso 8: En C[5, 5] Flecha ↑ hacia C[4, 5]',
    badge: '3. Traza Reversa',
    description: 'En C[5, 5] la flecha apunta ↑ hacia C[4, 5]. No hay carácter asociado; nos movemos arriba a C[4, 5].',
    focusCell: [5, 5],
    backtrackPath: [[7, 6], [6, 6], [5, 5], [4, 5]],
    reconstructedChars: ['A'],
  },
  {
    step: 9,
    phase: 'backtracking',
    title: 'Paso 9: En C[4, 5] Flecha ↖ — ¡Captura Carácter "B"!',
    badge: '3. Carácter Reconstruido',
    description: 'En C[4, 5] la flecha es ↖ hacia C[3, 4]. ¡El carácter "B" pertenece al LCS! Cadena acumulada: "BA". Luego C[3, 4] apunta ← hacia C[3, 3].',
    focusCell: [4, 5],
    backtrackPath: [[7, 6], [6, 6], [5, 5], [4, 5], [3, 4], [3, 3]],
    reconstructedChars: ['B', 'A'],
  },
  {
    step: 10,
    phase: 'backtracking',
    title: 'Paso 10: En C[3, 3] Flecha ↖ — ¡Captura Carácter "C"!',
    badge: '3. Carácter Reconstruido',
    description: 'En C[3, 3] la flecha es ↖ hacia C[2, 2]. ¡El carácter "C" pertenece al LCS! Cadena acumulada: "CBA". Luego C[2, 2] apunta ← hacia C[2, 1].',
    focusCell: [3, 3],
    backtrackPath: [[7, 6], [6, 6], [5, 5], [4, 5], [3, 4], [3, 3], [2, 2], [2, 1]],
    reconstructedChars: ['C', 'B', 'A'],
  },
  {
    step: 11,
    phase: 'complete',
    title: 'Paso 11: En C[2, 1] Flecha ↖ — ¡Captura "B"! Solución: "BCBA"',
    badge: '4. Solución Óptima',
    description: 'En C[2, 1] la flecha es ↖ hacia C[1, 0]. Capturamos "B". Al alcanzar la columna 0, el backtracking concluye con éxito. Cadena final: "BCBA" (Longitud 4).',
    focusCell: [2, 1],
    backtrackPath: [[7, 6], [6, 6], [5, 5], [4, 5], [3, 4], [3, 3], [2, 2], [2, 1], [1, 0]],
    reconstructedChars: ['B', 'C', 'B', 'A'],
  },
];

const ARROW_SYMBOLS: Record<ArrowDir, string> = {
  diag: '↖',
  up: '↑',
  left: '←',
  none: '',
};

const PHASE_BADGE_STYLES: Record<
  StepSpec['phase'],
  { bg: string; border: string; text: string }
> = {
  tabulation: { bg: 'bg-emerald-950/70', border: 'border-emerald-600/60', text: 'text-emerald-300' },
  backtracking: { bg: 'bg-amber-950/70', border: 'border-amber-600/60', text: 'text-amber-300' },
  complete: { bg: 'bg-teal-900', border: 'border-teal-400', text: 'text-white' },
};

export function LcsVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const frame = LCS_STEPS[currentStep] ?? LCS_STEPS[0];
  const phaseStyle = PHASE_BADGE_STYLES[frame.phase];

  const isBacktrackCell = (r: number, c: number): boolean => {
    return frame.backtrackPath.some(([row, col]) => row === r && col === c);
  };

  return (
    <AnimationPlayerShell
      title="Subsecuencia Común Más Larga (LCS): Matriz C[i, j] y Punteros ↖, ↑, ←"
      badge="Programación Dinámica · Tabulación Θ(m · n)"
      currentStep={currentStep}
      totalSteps={LCS_STEPS.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={frame.description}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="flex flex-col gap-2 py-1 w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between border-b border-emerald-800/40 pb-1.5 text-xs">
          <span className="font-bold text-emerald-300">
            {frame.title}
          </span>
          <span className={`rounded px-2.5 py-0.5 font-mono text-[11px] font-bold border ${phaseStyle.bg} ${phaseStyle.border} ${phaseStyle.text}`}>
            {frame.badge}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Cadena X (filas):</span>
            <div className="flex gap-1">
              {X_SEQ.map((ch, idx) => {
                const isCurrentX = frame.focusCell && frame.focusCell[0] === idx + 1;
                return (
                  <span
                    key={idx}
                    className={`rounded px-1.5 py-0.5 font-bold transition-all ${
                      isCurrentX
                        ? 'bg-amber-400 text-zinc-950 ring-1 ring-amber-300'
                        : 'bg-sky-950/80 border border-sky-600/60 text-sky-200'
                    }`}
                  >
                    {ch}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Cadena Y (columnas):</span>
            <div className="flex gap-1">
              {Y_SEQ.map((ch, idx) => {
                const isCurrentY = frame.focusCell && frame.focusCell[1] === idx + 1;
                return (
                  <span
                    key={idx}
                    className={`rounded px-1.5 py-0.5 font-bold transition-all ${
                      isCurrentY
                        ? 'bg-amber-400 text-zinc-950 ring-1 ring-amber-300'
                        : 'bg-emerald-950/80 border border-emerald-600/60 text-emerald-200'
                    }`}
                  >
                    {ch}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/90 p-2 shadow-xl flex justify-center">
            <table className="border-collapse text-center text-[11px] font-mono select-none">
              <thead>
                <tr>
                  <th className="p-1 text-zinc-500">i\j</th>
                  <th className="p-1 text-zinc-500">∅</th>
                  {Y_SEQ.map((charY, colIdx) => {
                    const isFocus = frame.focusCell && frame.focusCell[1] === colIdx + 1;
                    return (
                      <th
                        key={colIdx}
                        className={`p-1 font-bold ${
                          isFocus ? 'text-amber-300 bg-amber-950/40 rounded' : 'text-emerald-400'
                        }`}
                      >
                        {charY}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {LCS_TABLE.map((row, rIdx) => {
                  const charX = rIdx > 0 ? X_SEQ[rIdx - 1] : '∅';
                  const isFocusRow = frame.focusCell && frame.focusCell[0] === rIdx;

                  return (
                    <tr key={rIdx}>
                      <td
                        className={`p-1 font-bold border-r border-zinc-800 ${
                          isFocusRow ? 'text-amber-300 bg-amber-950/40 rounded' : 'text-sky-300'
                        }`}
                      >
                        {charX}
                      </td>
                      {row.map((cell, cIdx) => {
                        const isFocus = frame.focusCell && frame.focusCell[0] === rIdx && frame.focusCell[1] === cIdx;
                        const isBacktrack = isBacktrackCell(rIdx, cIdx);
                        const isDiag = cell.dir === 'diag';

                        return (
                          <td
                            key={cIdx}
                            className={`p-1 font-mono transition-all duration-200 rounded min-w-[34px] ${
                              isBacktrack
                                ? 'bg-amber-400 text-zinc-950 font-black scale-105 shadow-md ring-1 ring-amber-300'
                                : isFocus
                                ? 'bg-emerald-500 text-zinc-950 font-black scale-105 shadow-md'
                                : isDiag && cell.val > 0
                                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50'
                                : 'text-zinc-300 bg-zinc-900/30'
                            }`}
                          >
                            <span className="font-bold">{cell.val}</span>
                            {cell.dir !== 'none' && (
                              <span className={`text-[10px] ml-0.5 ${
                                isBacktrack
                                  ? 'text-zinc-950 font-black'
                                  : isDiag
                                  ? 'text-emerald-400 font-bold'
                                  : 'text-zinc-500'
                              }`}>
                                {ARROW_SYMBOLS[cell.dir]}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2">
            {frame.comparison && (
              <div className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2 font-mono text-xs shadow-xl">
                <span className="text-[11px] font-bold text-zinc-300 border-b border-zinc-800 pb-0.5">
                  Comparación de Caracteres:
                </span>
                <div className="flex items-center justify-between text-[11px] mt-1">
                  <span>X[{frame.focusCell ? frame.focusCell[0] - 1 : 0}]: <strong className="text-sky-300">{frame.comparison.charX}</strong></span>
                  <span>vs</span>
                  <span>Y[{frame.focusCell ? frame.focusCell[1] - 1 : 0}]: <strong className="text-emerald-300">{frame.comparison.charY}</strong></span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                    frame.comparison.match
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {frame.comparison.match ? '¡COINCIDEN!' : 'Difieren'}
                  </span>
                </div>
                <div className="text-[10.5px] text-zinc-300 font-semibold mt-1">
                  {frame.comparison.details}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/90 p-2.5 font-mono shadow-xl">
              <span className="text-[11px] font-bold text-emerald-400 border-b border-zinc-800 pb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Subsecuencia Reconstruida (Reversa):
              </span>
              <div className="flex items-center justify-center gap-1.5 py-1">
                {frame.reconstructedChars.length > 0 ? (
                  frame.reconstructedChars.map((ch, idx) => (
                    <span
                      key={idx}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950 font-black text-xs shadow-md"
                    >
                      {ch}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-zinc-500 py-1">
                    Pendiente de backtracking...
                  </span>
                )}
              </div>
              <div className="text-[11px] text-zinc-400 flex justify-between border-t border-zinc-800 pt-1">
                <span>Longitud LCS actual:</span>
                <strong className="text-emerald-300">{frame.reconstructedChars.length} / 4</strong>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-800/30 bg-emerald-950/20 p-2 text-[10px] text-zinc-300 flex flex-col gap-1">
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-amber-400" />
                Regla de Reconstrucción:
              </span>
              <span>
                • Flecha ↖: carácter común; agregarlo y saltar a (i-1, j-1).
                <br />
                • Flecha ↑: saltar a (i-1, j) sin agregar carácter.
                <br />
                • Flecha ←: saltar a (i, j-1) sin agregar carácter.
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

interface HuffmanFrame {
  step: number;
  queue: readonly string[];
  description: string;
}

const HUFFMAN_FRAMES: readonly HuffmanFrame[] = [
  {
    step: 0,
    queue: ['F:5', 'E:9', 'C:12', 'B:13', 'D:16', 'A:45'],
    description:
      'Se insertan los 6 caracteres como nodos hoja en una cola de prioridad mínima (Min-Heap), ordenados por frecuencia.',
  },
  {
    step: 1,
    queue: ['C:12', 'B:13', 'N1:14', 'D:16', 'A:45'],
    description:
      'Se extraen los 2 mínimos absolutos (F:5 y E:9). Se crea el nodo interno N1 (peso 5+9=14) con aristas 0 y 1, y se reinserta en el Min-Heap.',
  },
  {
    step: 2,
    queue: ['N1:14', 'D:16', 'N2:25', 'A:45'],
    description:
      'Se extraen los siguientes 2 mínimos (C:12 y B:13). Se crea N2 (peso 12+13=25) y se reinserta en el Min-Heap.',
  },
  {
    step: 3,
    queue: ['N2:25', 'N3:30', 'A:45'],
    description:
      'Se extraen N1:14 y D:16. Se crea N3 (peso 14+16=30) uniendo el subárbol N1 con la hoja D, y se reinserta en el Min-Heap.',
  },
  {
    step: 4,
    queue: ['A:45', 'N4:55'],
    description:
      'Se extraen N2:25 y N3:30. Se crea N4 (peso 25+30=55) uniendo los dos subárboles mayores, y se reinserta en el Min-Heap.',
  },
  {
    step: 5,
    queue: ['Raíz:100'],
    description:
      'Última extracción: quedan A:45 y N4:55. Se unen formando la Raíz (peso 100%). El árbol binario de códigos prefijo queda finalizado.',
  },
];

const PREFIX_CODE_DATA = [
  { char: 'A', freq: '45%', code: '0', stepConnected: 5 },
  { char: 'B', freq: '13%', code: '101', stepConnected: 2 },
  { char: 'C', freq: '12%', code: '100', stepConnected: 2 },
  { char: 'D', freq: '16%', code: '111', stepConnected: 3 },
  { char: 'E', freq: '9%', code: '1101', stepConnected: 1 },
  { char: 'F', freq: '5%', code: '1100', stepConnected: 1 },
] as const;

interface HuffmanEdgePair {
  stepRequired: number;
  parentX: number;
  parentY: number;
  leftChildX: number;
  leftChildY: number;
  leftLabelX: number;
  leftLabelY: number;
  rightChildX: number;
  rightChildY: number;
  rightLabelX: number;
  rightLabelY: number;
  fontSize: string;
}

const HUFFMAN_EDGE_PAIRS: readonly HuffmanEdgePair[] = [
  {
    stepRequired: 5,
    parentX: 250,
    parentY: 35,
    leftChildX: 100,
    leftChildY: 110,
    leftLabelX: 165,
    leftLabelY: 65,
    rightChildX: 405,
    rightChildY: 105,
    rightLabelX: 335,
    rightLabelY: 65,
    fontSize: '13',
  },
  {
    stepRequired: 4,
    parentX: 405,
    parentY: 105,
    leftChildX: 300,
    leftChildY: 175,
    leftLabelX: 340,
    leftLabelY: 135,
    rightChildX: 510,
    rightChildY: 175,
    rightLabelX: 465,
    rightLabelY: 135,
    fontSize: '13',
  },
  {
    stepRequired: 2,
    parentX: 300,
    parentY: 175,
    leftChildX: 250,
    leftChildY: 250,
    leftLabelX: 265,
    leftLabelY: 210,
    rightChildX: 350,
    rightChildY: 250,
    rightLabelX: 330,
    rightLabelY: 210,
    fontSize: '13',
  },
  {
    stepRequired: 3,
    parentX: 510,
    parentY: 175,
    leftChildX: 450,
    leftChildY: 245,
    leftLabelX: 470,
    leftLabelY: 205,
    rightChildX: 570,
    rightChildY: 250,
    rightLabelX: 545,
    rightLabelY: 205,
    fontSize: '13',
  },
  {
    stepRequired: 1,
    parentX: 450,
    parentY: 245,
    leftChildX: 410,
    leftChildY: 305,
    leftLabelX: 420,
    leftLabelY: 275,
    rightChildX: 490,
    rightChildY: 305,
    rightLabelX: 475,
    rightLabelY: 275,
    fontSize: '12',
  },
];

interface HuffmanInternalNode {
  id: string;
  weight: string;
  stepRequired: number;
  cx: number;
  cy: number;
  r: number;
  isRoot?: boolean;
}

const HUFFMAN_INTERNAL_NODES: readonly HuffmanInternalNode[] = [
  { id: 'Raíz', weight: '100%', stepRequired: 5, cx: 250, cy: 35, r: 23, isRoot: true },
  { id: 'N4', weight: '55%', stepRequired: 4, cx: 405, cy: 105, r: 20 },
  { id: 'N2', weight: '25%', stepRequired: 2, cx: 300, cy: 175, r: 19 },
  { id: 'N3', weight: '30%', stepRequired: 3, cx: 510, cy: 175, r: 19 },
  { id: 'N1', weight: '14%', stepRequired: 1, cx: 450, cy: 245, r: 18 },
];

interface HuffmanLeafNode {
  char: string;
  freq: string;
  stepRequired: number;
  cx: number;
  cy: number;
  r: number;
}

const HUFFMAN_LEAF_NODES: readonly HuffmanLeafNode[] = [
  { char: 'A', freq: '45%', stepRequired: 5, cx: 100, cy: 110, r: 19 },
  { char: 'C', freq: '12%', stepRequired: 2, cx: 250, cy: 250, r: 18 },
  { char: 'B', freq: '13%', stepRequired: 2, cx: 350, cy: 250, r: 18 },
  { char: 'D', freq: '16%', stepRequired: 3, cx: 570, cy: 250, r: 18 },
  { char: 'F', freq: '5%', stepRequired: 1, cx: 410, cy: 305, r: 17 },
  { char: 'E', freq: '9%', stepRequired: 1, cx: 490, cy: 305, r: 17 },
];

export function HuffmanTreeVisualizer() {
  const {
    currentStep,
    currentFrame,
    totalSteps,
    isPlaying,
    playbackSpeed,
    setCurrentStep,
    togglePlay,
    setPlaybackSpeed,
    resetPlayback,
  } = useVisualizerPlayback(HUFFMAN_FRAMES);

  return (
    <AnimationPlayerShell
      title="Construcción del Árbol de Huffman (Min-Heap y Códigos sin Prefijo)"
      badge="Algoritmos Greedy"
      currentStep={currentStep}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={currentFrame.description}
      onStepChange={setCurrentStep}
      onTogglePlay={togglePlay}
      onSpeedChange={setPlaybackSpeed}
      onReset={resetPlayback}
    >
      <div className="h-full min-h-0 flex-1 flex flex-col justify-between items-center w-full gap-2.5 sm:gap-3">
        <div className="shrink-0 w-full flex flex-col sm:flex-row items-stretch justify-between gap-2.5 rounded-xl border border-emerald-800/40 bg-zinc-950/80 p-2.5 sm:p-3">
          <div className="flex-1 flex items-start gap-2 border-b sm:border-b-0 sm:border-r border-white/10 pb-2 sm:pb-0 sm:pr-3">
            <span className="rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 text-[11px] font-bold font-mono shrink-0">
              Problema
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Codificar texto con frecuencias desbalanceadas. Una longitud fija de 3 bits/símbolo desperdicia espacio en caracteres que aparecen muy seguido.
            </p>
          </div>

          <div className="flex-1 flex items-start gap-2 sm:pl-3">
            <span className="rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 text-[11px] font-bold font-mono shrink-0">
              Solución Greedy
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Combinar iterativamente los 2 nodos de menor peso usando un Min-Heap. El árbol resultante asigna menos bits a caracteres frecuentes sin ambigüedad de prefijo.
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-0 w-full flex flex-col lg:flex-row items-stretch justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0 min-h-0 h-full rounded-2xl border-2 border-emerald-800/50 bg-zinc-950/90 p-2 sm:p-3 shadow-2xl flex flex-col justify-between items-center overflow-hidden">
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-1.5 px-2 shrink-0">
              <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                Árbol Binario de Prefijo Óptimo
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                Ramas: <strong className="text-sky-300">0 (Izq)</strong> · <strong className="text-amber-300">1 (Der)</strong>
              </span>
            </div>

            <div className="w-full flex-1 min-h-0 flex items-center justify-center py-1">
              <svg viewBox="0 0 640 330" className="w-full h-full max-h-[350px] select-none">
                {HUFFMAN_EDGE_PAIRS.map(
                  (edge) =>
                    currentStep >= edge.stepRequired && (
                      <g key={edge.stepRequired}>
                        <line
                          x1={edge.parentX}
                          y1={edge.parentY}
                          x2={edge.leftChildX}
                          y2={edge.leftChildY}
                          stroke="#10b981"
                          strokeWidth="2.5"
                        />
                        <text
                          x={edge.leftLabelX}
                          y={edge.leftLabelY}
                          fill="#38bdf8"
                          fontSize={edge.fontSize}
                          fontWeight="bold"
                        >
                          0
                        </text>
                        <line
                          x1={edge.parentX}
                          y1={edge.parentY}
                          x2={edge.rightChildX}
                          y2={edge.rightChildY}
                          stroke="#10b981"
                          strokeWidth="2.5"
                        />
                        <text
                          x={edge.rightLabelX}
                          y={edge.rightLabelY}
                          fill="#fbbf24"
                          fontSize={edge.fontSize}
                          fontWeight="bold"
                        >
                          1
                        </text>
                      </g>
                    ),
                )}

                {HUFFMAN_INTERNAL_NODES.map(
                  (node) =>
                    currentStep >= node.stepRequired && (
                      <g key={node.id}>
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={node.r}
                          fill={node.isRoot ? '#047857' : '#065f46'}
                          stroke={node.isRoot ? '#34d399' : '#10b981'}
                          strokeWidth={node.isRoot ? '3' : '2.5'}
                        />
                        <text
                          x={node.cx}
                          y={node.cy - 4}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={node.r <= 18 ? '10' : '11'}
                          fontWeight={node.isRoot ? 'black' : 'bold'}
                        >
                          {node.id}
                        </text>
                        <text
                          x={node.cx}
                          y={node.cy + 9}
                          textAnchor="middle"
                          fill={node.isRoot ? '#a7f3d0' : '#6ee7b7'}
                          fontSize={node.r <= 18 ? '9' : '10'}
                          fontWeight={node.isRoot ? 'bold' : 'normal'}
                        >
                          {node.weight}
                        </text>
                      </g>
                    ),
                )}

                {HUFFMAN_LEAF_NODES.map((leaf) => {
                  const isConnected = currentStep >= leaf.stepRequired;
                  return (
                    <g key={leaf.char}>
                      <circle
                        cx={leaf.cx}
                        cy={leaf.cy}
                        r={leaf.r}
                        fill={isConnected ? '#059669' : '#1f2937'}
                        stroke={isConnected ? '#34d399' : '#4b5563'}
                        strokeWidth="2.5"
                      />
                      <text
                        x={leaf.cx}
                        y={leaf.cy - 4}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize={leaf.r <= 17 ? '11' : '12'}
                        fontWeight="black"
                      >
                        {leaf.char}
                      </text>
                      <text
                        x={leaf.cx}
                        y={leaf.cy + 8}
                        textAnchor="middle"
                        fill="#a7f3d0"
                        fontSize="9"
                        fontWeight="bold"
                      >
                        {leaf.freq}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/10 pt-1.5 px-2 shrink-0">
              <span>Hojas = Caracteres del Alfabeto</span>
              <span className="text-emerald-400 font-bold">Uniones Greedy hacia la Raíz</span>
              <span>Longitud de Código = Profundidad en el Árbol</span>
            </div>
          </div>

          <div className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col justify-between gap-3 h-full min-h-0">
            <div className="flex-1 min-h-0 rounded-2xl border border-emerald-800/40 bg-zinc-950/80 p-3 sm:p-3.5 flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
                <span className="text-xs font-bold font-sans uppercase tracking-wider text-emerald-400">
                  Cola Min-Heap Activa
                </span>
                <span className="text-xs font-mono text-zinc-400 font-bold">
                  {currentFrame.queue.length} nodos
                </span>
              </div>

              <div className="flex-1 flex flex-wrap content-start items-center gap-2 py-1">
                {currentFrame.queue.map((item, idx) => {
                  const isNextPair = idx < 2 && currentStep < totalSteps - 1;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 font-mono text-xs font-bold transition-all shadow-xs ${
                        isNextPair
                          ? 'border-amber-400 bg-amber-500/25 text-amber-200 ring-2 ring-amber-400/40'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-300'
                      }`}
                    >
                      <span>{item}</span>
                      {isNextPair && (
                        <span className="rounded bg-amber-400/30 px-1 text-[9px] text-amber-300 font-black">
                          min
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-[11px] text-zinc-400 border-t border-white/10 pt-2 shrink-0">
                Los 2 mínimos se extraen en cada paso en tiempo O(log n).
              </p>
            </div>

            <div className="flex-1 min-h-0 rounded-2xl border border-emerald-800/40 bg-zinc-950/80 p-3 sm:p-3.5 flex flex-col justify-between shadow-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
                <span className="text-xs font-bold font-sans uppercase tracking-wider text-emerald-400">
                  Códigos sin Prefijo
                </span>
                <span className="text-xs font-mono text-zinc-400 font-bold">
                  {PREFIX_CODE_DATA.filter((item) => currentStep >= item.stepConnected).length} / 6 fijados
                </span>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-2 content-start py-0.5">
                {PREFIX_CODE_DATA.map((item) => {
                  const isConnected = currentStep >= item.stepConnected;
                  return (
                    <div
                      key={item.char}
                      className={`flex items-center justify-between rounded-xl border px-2.5 py-1.5 font-mono text-xs shadow-xs ${
                        isConnected
                          ? 'border-emerald-700/60 bg-emerald-950/60 text-emerald-200'
                          : 'border-zinc-800 bg-zinc-900/50 text-zinc-500'
                      }`}
                    >
                      <span className="font-bold">
                        {item.char} <span className="text-[10px] text-zinc-400 font-normal">({item.freq})</span>
                      </span>
                      {isConnected ? (
                        <span className="rounded-md bg-emerald-500 text-zinc-950 font-black px-1.5 py-0.5 text-xs shadow-xs">
                          {item.code}
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-500 font-bold">?</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

import { useState } from 'react';
import { AnimationPlayerShell } from './AnimationPlayerShell';

interface HuffmanFrame {
  step: number;
  queue: string[];
}

const HUFFMAN_FRAMES: HuffmanFrame[] = [
  {
    step: 0,
    queue: ['F:5', 'E:9', 'C:12', 'B:13', 'D:16', 'A:45'],
  },
  {
    step: 1,
    queue: ['C:12', 'B:13', 'N1:14', 'D:16', 'A:45'],
  },
  {
    step: 2,
    queue: ['N1:14', 'D:16', 'N2:25', 'A:45'],
  },
  {
    step: 3,
    queue: ['N2:25', 'N3:30', 'A:45'],
  },
  {
    step: 4,
    queue: ['A:45', 'N4:55'],
  },
  {
    step: 5,
    queue: ['Raíz:100'],
  },
];

const STEP_DESCRIPTIONS: Record<number, string> = {
  0: 'Se insertan los 6 caracteres como nodos hoja en una cola de prioridad mínima (Min-Heap), ordenados por frecuencia.',
  1: 'Se extraen los 2 mínimos absolutos (F:5 y E:9). Se crea el nodo interno N1 (peso 5+9=14) con aristas 0 y 1, y se reinserta en el Min-Heap.',
  2: 'Se extraen los siguientes 2 mínimos (C:12 y B:13). Se crea N2 (peso 12+13=25) y se reinserta en el Min-Heap.',
  3: 'Se extraen N1:14 y D:16. Se crea N3 (peso 14+16=30) uniendo el subárbol N1 con la hoja D, y se reinserta en el Min-Heap.',
  4: 'Se extraen N2:25 y N3:30. Se crea N4 (peso 25+30=55) uniendo los dos subárboles mayores, y se reinserta en el Min-Heap.',
  5: 'Última extracción: quedan A:45 y N4:55. Se unen formando la Raíz (peso 100%). El árbol binario de códigos prefijo queda finalizado.',
};

const PREFIX_CODE_DATA = [
  { char: 'A', freq: '45%', code: '0', bits: 1, stepConnected: 5 },
  { char: 'B', freq: '13%', code: '101', bits: 3, stepConnected: 2 },
  { char: 'C', freq: '12%', code: '100', bits: 3, stepConnected: 2 },
  { char: 'D', freq: '16%', code: '111', bits: 3, stepConnected: 3 },
  { char: 'E', freq: '9%', code: '1101', bits: 4, stepConnected: 1 },
  { char: 'F', freq: '5%', code: '1100', bits: 4, stepConnected: 1 },
];

export function HuffmanTreeVisualizer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const currentFrame = HUFFMAN_FRAMES[currentStep] ?? HUFFMAN_FRAMES[0];

  return (
    <AnimationPlayerShell
      title="Construcción del Árbol de Huffman (Min-Heap y Códigos sin Prefijo)"
      badge="Algoritmos Greedy"
      currentStep={currentStep}
      totalSteps={HUFFMAN_FRAMES.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={STEP_DESCRIPTIONS[currentStep]}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
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
              <svg
                viewBox="0 0 640 330"
                className="w-full h-full max-h-[350px] select-none"
              >
                {currentStep >= 5 && (
                  <g>
                    <line x1="250" y1="35" x2="100" y2="110" stroke="#10b981" strokeWidth="2.5" />
                    <text x="165" y="65" fill="#38bdf8" fontSize="13" fontWeight="bold">0</text>
                    <line x1="250" y1="35" x2="405" y2="105" stroke="#10b981" strokeWidth="2.5" />
                    <text x="335" y="65" fill="#fbbf24" fontSize="13" fontWeight="bold">1</text>
                  </g>
                )}

                {currentStep >= 4 && (
                  <g>
                    <line x1="405" y1="105" x2="300" y2="175" stroke="#10b981" strokeWidth="2.5" />
                    <text x="340" y="135" fill="#38bdf8" fontSize="13" fontWeight="bold">0</text>
                    <line x1="405" y1="105" x2="510" y2="175" stroke="#10b981" strokeWidth="2.5" />
                    <text x="465" y="135" fill="#fbbf24" fontSize="13" fontWeight="bold">1</text>
                  </g>
                )}

                {currentStep >= 2 && (
                  <g>
                    <line x1="300" y1="175" x2="250" y2="250" stroke="#10b981" strokeWidth="2.5" />
                    <text x="265" y="210" fill="#38bdf8" fontSize="13" fontWeight="bold">0</text>
                    <line x1="300" y1="175" x2="350" y2="250" stroke="#10b981" strokeWidth="2.5" />
                    <text x="330" y="210" fill="#fbbf24" fontSize="13" fontWeight="bold">1</text>
                  </g>
                )}

                {currentStep >= 3 && (
                  <g>
                    <line x1="510" y1="175" x2="450" y2="245" stroke="#10b981" strokeWidth="2.5" />
                    <text x="470" y="205" fill="#38bdf8" fontSize="13" fontWeight="bold">0</text>
                    <line x1="510" y1="175" x2="570" y2="250" stroke="#10b981" strokeWidth="2.5" />
                    <text x="545" y="205" fill="#fbbf24" fontSize="13" fontWeight="bold">1</text>
                  </g>
                )}

                {currentStep >= 1 && (
                  <g>
                    <line x1="450" y1="245" x2="410" y2="305" stroke="#10b981" strokeWidth="2.5" />
                    <text x="420" y="275" fill="#38bdf8" fontSize="12" fontWeight="bold">0</text>
                    <line x1="450" y1="245" x2="490" y2="305" stroke="#10b981" strokeWidth="2.5" />
                    <text x="475" y="275" fill="#fbbf24" fontSize="12" fontWeight="bold">1</text>
                  </g>
                )}

                {currentStep >= 5 && (
                  <g>
                    <circle cx="250" cy="35" r="23" fill="#047857" stroke="#34d399" strokeWidth="3" />
                    <text x="250" y="32" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="black">Raíz</text>
                    <text x="250" y="46" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">100%</text>
                  </g>
                )}

                {currentStep >= 4 && (
                  <g>
                    <circle cx="405" cy="105" r="20" fill="#065f46" stroke="#10b981" strokeWidth="2.5" />
                    <text x="405" y="101" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">N4</text>
                    <text x="405" y="114" textAnchor="middle" fill="#6ee7b7" fontSize="10">55%</text>
                  </g>
                )}

                {currentStep >= 2 && (
                  <g>
                    <circle cx="300" cy="175" r="19" fill="#065f46" stroke="#10b981" strokeWidth="2.5" />
                    <text x="300" y="171" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">N2</text>
                    <text x="300" y="184" textAnchor="middle" fill="#6ee7b7" fontSize="10">25%</text>
                  </g>
                )}

                {currentStep >= 3 && (
                  <g>
                    <circle cx="510" cy="175" r="19" fill="#065f46" stroke="#10b981" strokeWidth="2.5" />
                    <text x="510" y="171" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">N3</text>
                    <text x="510" y="184" textAnchor="middle" fill="#6ee7b7" fontSize="10">30%</text>
                  </g>
                )}

                {currentStep >= 1 && (
                  <g>
                    <circle cx="450" cy="245" r="18" fill="#065f46" stroke="#10b981" strokeWidth="2.5" />
                    <text x="450" y="241" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">N1</text>
                    <text x="450" y="253" textAnchor="middle" fill="#6ee7b7" fontSize="9">14%</text>
                  </g>
                )}

                <g>
                  <circle
                    cx="100"
                    cy="110"
                    r="19"
                    fill={currentStep >= 5 ? '#059669' : '#1f2937'}
                    stroke={currentStep >= 5 ? '#34d399' : '#4b5563'}
                    strokeWidth="2.5"
                  />
                  <text x="100" y="106" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="black">A</text>
                  <text x="100" y="119" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">45%</text>
                </g>

                <g>
                  <circle
                    cx="250"
                    cy="250"
                    r="18"
                    fill={currentStep >= 2 ? '#059669' : '#1f2937'}
                    stroke={currentStep >= 2 ? '#34d399' : '#4b5563'}
                    strokeWidth="2.5"
                  />
                  <text x="250" y="246" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="black">C</text>
                  <text x="250" y="258" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">12%</text>
                </g>

                <g>
                  <circle
                    cx="350"
                    cy="250"
                    r="18"
                    fill={currentStep >= 2 ? '#059669' : '#1f2937'}
                    stroke={currentStep >= 2 ? '#34d399' : '#4b5563'}
                    strokeWidth="2.5"
                  />
                  <text x="350" y="246" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="black">B</text>
                  <text x="350" y="258" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">13%</text>
                </g>

                <g>
                  <circle
                    cx="570"
                    cy="250"
                    r="18"
                    fill={currentStep >= 3 ? '#059669' : '#1f2937'}
                    stroke={currentStep >= 3 ? '#34d399' : '#4b5563'}
                    strokeWidth="2.5"
                  />
                  <text x="570" y="246" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="black">D</text>
                  <text x="570" y="258" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">16%</text>
                </g>

                <g>
                  <circle
                    cx="410"
                    cy="305"
                    r="17"
                    fill={currentStep >= 1 ? '#059669' : '#1f2937'}
                    stroke={currentStep >= 1 ? '#34d399' : '#4b5563'}
                    strokeWidth="2.5"
                  />
                  <text x="410" y="301" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="black">F</text>
                  <text x="410" y="313" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">5%</text>
                </g>

                <g>
                  <circle
                    cx="490"
                    cy="305"
                    r="17"
                    fill={currentStep >= 1 ? '#059669' : '#1f2937'}
                    stroke={currentStep >= 1 ? '#34d399' : '#4b5563'}
                    strokeWidth="2.5"
                  />
                  <text x="490" y="301" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="black">E</text>
                  <text x="490" y="313" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">9%</text>
                </g>
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
                  const isNextPair = idx < 2 && currentStep < HUFFMAN_FRAMES.length - 1;
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

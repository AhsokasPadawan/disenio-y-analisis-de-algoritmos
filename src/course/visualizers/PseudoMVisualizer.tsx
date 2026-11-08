import { ArrowDown, Check, ShieldCheck, Sparkles, X } from 'lucide-react';
import { AnimationPlayerShell } from '../../core/ui/AnimationPlayerShell';
import { useVisualizerPlayback } from './shared/useVisualizerPlayback';

interface PairSpec {
  indices: [number, number];
  values: [number, number];
  status: 'equal' | 'different';
  survivor?: number;
}

interface StepData {
  stepIndex: number;
  phaseTitle: string;
  badge: string;
  description: string;
  originalArray: readonly number[];
  currentLevelArray: readonly number[];
  levelNumber: number;
  pairs: readonly PairSpec[];
  oddElement?: { index: number; value: number };
  survivors: readonly number[];
  candidatePostulated?: number;
  verificationScan?: {
    candidate: number;
    matchedIndices: readonly number[];
    currentCount: number;
    threshold: number;
    isMajority: boolean;
  };
}

const ORIGINAL_ARRAY = [3, 3, 4, 2, 3, 3, 3, 1, 3] as const;

const LEVEL_0_PAIRS: readonly PairSpec[] = [
  { indices: [0, 1], values: [3, 3], status: 'equal', survivor: 3 },
  { indices: [2, 3], values: [4, 2], status: 'different' },
  { indices: [4, 5], values: [3, 3], status: 'equal', survivor: 3 },
  { indices: [6, 7], values: [3, 1], status: 'different' },
];

const STEPS_DATA: readonly StepData[] = [
  {
    stepIndex: 0,
    phaseTitle: 'Arreglo Inicial y Parámetros del Problema',
    badge: 'Inicialización',
    description:
      'Dado un vector A con n = 9 elementos, un elemento mayoritario estricto debe aparecer más de n/2 = 4.5 veces (mínimo 5 apariciones). Se busca encontrarlo en tiempo lineal O(n) mediante reducciones por emparejamiento.',
    originalArray: ORIGINAL_ARRAY,
    currentLevelArray: ORIGINAL_ARRAY,
    levelNumber: 0,
    pairs: [],
    survivors: [],
  },
  {
    stepIndex: 1,
    phaseTitle: 'Nivel 0: Agrupación en Parejas Adyacentes (2i, 2i+1)',
    badge: 'Emparejamiento Nivel 0',
    description:
      'Se divide el arreglo contiguamente en parejas: (3, 3), (4, 2), (3, 3), (3, 1). Al tener n = 9 (impar), el último elemento en índice 8 (valor 3) queda como candidato de respaldo pseudo-mayoritario.',
    originalArray: ORIGINAL_ARRAY,
    currentLevelArray: ORIGINAL_ARRAY,
    levelNumber: 0,
    pairs: LEVEL_0_PAIRS,
    oddElement: { index: 8, value: 3 },
    survivors: [],
  },
  {
    stepIndex: 2,
    phaseTitle: 'Nivel 0: Resolución de Pares y Vector Sobreviviente',
    badge: 'Filtrado Nivel 0',
    description:
      'En cada par igual se conserva una copia; los pares distintos se cancelan y descartan (invariante: se descarta a lo sumo un mayoritario junto con un no mayoritario). El vector resultante para el siguiente nivel queda en [3, 3].',
    originalArray: ORIGINAL_ARRAY,
    currentLevelArray: ORIGINAL_ARRAY,
    levelNumber: 0,
    pairs: LEVEL_0_PAIRS,
    oddElement: { index: 8, value: 3 },
    survivors: [3, 3],
  },
  {
    stepIndex: 3,
    phaseTitle: 'Nivel 1: Reducción Recursiva sobre Sobrevivientes (n = 2)',
    badge: 'Emparejamiento Nivel 1',
    description:
      'Se ejecuta recursivamente sobre el vector reducido [3, 3]. Al ser de longitud 2, se compara el único par (3, 3): como son idénticos, sobrevive un 3 hacia el próximo nivel.',
    originalArray: ORIGINAL_ARRAY,
    currentLevelArray: [3, 3],
    levelNumber: 1,
    pairs: [{ indices: [0, 1], values: [3, 3], status: 'equal', survivor: 3 }],
    survivors: [3],
  },
  {
    stepIndex: 4,
    phaseTitle: 'Caso Base: Postulación del Candidato Mayoritario (n = 1)',
    badge: 'Candidato Encontrado',
    description:
      'El vector reducido tiene longitud 1 con el valor [3]. El algoritmo postula formalmente a x = 3 como el único candidato factible. Para garantizar certeza absoluta, se debe verificar su frecuencia en el arreglo original.',
    originalArray: ORIGINAL_ARRAY,
    currentLevelArray: [3],
    levelNumber: 2,
    pairs: [],
    survivors: [3],
    candidatePostulated: 3,
  },
  {
    stepIndex: 5,
    phaseTitle: 'Fase de Verificación Lineal O(n) en Arreglo Original',
    badge: 'Verificación O(n)',
    description:
      'Se recorre el arreglo original completo en una única pasada lineal acumulando las ocurrencias del candidato x = 3. Se hallan 6 coincidencias (en índices 0, 1, 4, 5, 6 y 8).',
    originalArray: ORIGINAL_ARRAY,
    currentLevelArray: ORIGINAL_ARRAY,
    levelNumber: 0,
    pairs: [],
    survivors: [],
    candidatePostulated: 3,
    verificationScan: {
      candidate: 3,
      matchedIndices: [0, 1, 4, 5, 6, 8],
      currentCount: 6,
      threshold: 4.5,
      isMajority: true,
    },
  },
  {
    stepIndex: 6,
    phaseTitle: 'Conclusión: Elemento Mayoritario Confirmado',
    badge: 'Resultado Confirmado',
    description:
      'El conteo final es 6 > 4.5 (66.7% de los elementos). El valor 3 es certificado como el Elemento Mayoritario Estricto. La complejidad temporal total es T(n) = T(n/2) + O(n) = O(n).',
    originalArray: ORIGINAL_ARRAY,
    currentLevelArray: ORIGINAL_ARRAY,
    levelNumber: 0,
    pairs: [],
    survivors: [],
    candidatePostulated: 3,
    verificationScan: {
      candidate: 3,
      matchedIndices: [0, 1, 4, 5, 6, 8],
      currentCount: 6,
      threshold: 4.5,
      isMajority: true,
    },
  },
];

const PAIR_CARD_STYLES: Record<
  PairSpec['status'],
  { badge: string; border: string; bg: string; text: string; label: string }
> = {
  equal: {
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    border: 'border-rose-500/60',
    bg: 'bg-rose-950/30',
    text: 'text-rose-300',
    label: 'Iguales → Sobrevive 1',
  },
  different: {
    badge: 'bg-zinc-700/40 text-zinc-300 border-zinc-600/50',
    border: 'border-zinc-700/60',
    bg: 'bg-zinc-900/40',
    text: 'text-zinc-400',
    label: 'Distintos → Descartados',
  },
};

export function PseudoMVisualizer() {
  const {
    currentStep,
    currentFrame: step,
    totalSteps,
    isPlaying,
    playbackSpeed,
    setCurrentStep,
    togglePlay,
    setPlaybackSpeed,
    resetPlayback,
  } = useVisualizerPlayback(STEPS_DATA);

  return (
    <AnimationPlayerShell
      title="Algoritmo de Elemento Mayoritario (Pseudo-M)"
      badge="Divide & Conquer · Reducción por Pares"
      currentStep={currentStep}
      totalSteps={totalSteps}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={step.description}
      onStepChange={setCurrentStep}
      onTogglePlay={togglePlay}
      onSpeedChange={setPlaybackSpeed}
      onReset={resetPlayback}
    >
      <div className="flex flex-col gap-4 py-2 w-full">
        <div className="flex flex-wrap items-center justify-between border-b border-rose-800/40 pb-2 text-xs">
          <span className="font-bold text-rose-300">{step.phaseTitle}</span>
          <span className="rounded bg-rose-950 px-2.5 py-1 font-mono text-[11px] font-semibold text-amber-300 border border-rose-800/50">
            {step.badge}
          </span>
        </div>

        {step.verificationScan ? (
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-zinc-900/90 border border-rose-800/40 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-zinc-300">
                Escaneo Lineal sobre Arreglo Original (n = {step.originalArray.length})
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-mono">Candidato evaluado:</span>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-rose-500 text-zinc-950">
                  x = {step.verificationScan.candidate}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 py-2">
              {step.originalArray.map((val, idx) => {
                const isMatched = step.verificationScan?.matchedIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center w-12 h-14 rounded-xl border font-mono transition-all duration-300 ${
                      isMatched
                        ? 'border-rose-400 bg-rose-500/20 text-rose-200 shadow-md shadow-rose-950/60 ring-2 ring-rose-500/50 scale-105'
                        : 'border-zinc-700/60 bg-zinc-800/60 text-zinc-400 opacity-60'
                    }`}
                  >
                    <span className="text-[10px] text-zinc-400 mb-0.5">[{idx}]</span>
                    <span className="text-base font-black">{val}</span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-zinc-800 text-xs">
              <div className="flex flex-col p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <span className="text-zinc-400 text-[11px]">Ocurrencias del Candidato</span>
                <span className="font-mono text-lg font-bold text-rose-400">
                  {step.verificationScan.currentCount} / {step.originalArray.length}
                </span>
              </div>
              <div className="flex flex-col p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <span className="text-zinc-400 text-[11px]">Umbral Mayoritario Estricto</span>
                <span className="font-mono text-lg font-bold text-amber-300">
                  &gt; {step.verificationScan.threshold} ({Math.floor(step.verificationScan.threshold) + 1} mín.)
                </span>
              </div>
              <div className="flex flex-col p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <span className="text-zinc-400 text-[11px]">Veredicto Formal</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-rose-400" />
                  <span className="font-bold text-rose-300 text-sm">
                    {step.verificationScan.isMajority ? 'Mayoritario Válido' : 'No Mayoritario'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-md">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>Vector en Nivel {step.levelNumber} (Longitud = {step.currentLevelArray.length})</span>
                {step.candidatePostulated !== undefined && (
                  <span className="flex items-center gap-1 text-rose-300 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Candidato: x = {step.candidatePostulated}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 py-1">
                {step.currentLevelArray.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center w-12 h-13 rounded-xl border border-rose-500/40 bg-zinc-800/80 font-mono text-zinc-200 shadow-xs"
                  >
                    <span className="text-[10px] text-zinc-400">[{idx}]</span>
                    <span className="text-base font-bold text-rose-300">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {step.pairs.length > 0 && (
              <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-xs font-semibold text-zinc-300 mb-1">
                  Evaluación de Parejas Adyacentes (2i, 2i+1)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {step.pairs.map((pair, pIdx) => {
                    const style = PAIR_CARD_STYLES[pair.status];
                    return (
                      <div
                        key={pIdx}
                        className={`flex flex-col items-center justify-between p-3 rounded-xl border ${style.border} ${style.bg} transition-all duration-300`}
                      >
                        <div className="flex items-center justify-between w-full text-[10px] text-zinc-400 font-mono mb-1.5">
                          <span>Par {pIdx}</span>
                          <span className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${style.badge}`}>
                            {style.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 my-1">
                          <span className="w-8 h-8 rounded-lg bg-zinc-800/90 border border-zinc-700 flex items-center justify-center font-mono font-bold text-sm text-zinc-100">
                            {pair.values[0]}
                          </span>
                          <span className="text-zinc-500 font-bold">:</span>
                          <span className="w-8 h-8 rounded-lg bg-zinc-800/90 border border-zinc-700 flex items-center justify-center font-mono font-bold text-sm text-zinc-100">
                            {pair.values[1]}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-[11px] font-mono">
                          {pair.status === 'equal' ? (
                            <span className="text-rose-300 flex items-center gap-1 font-semibold">
                              <Check className="w-3.5 h-3.5" /> Pasa valor: {pair.survivor}
                            </span>
                          ) : (
                            <span className="text-zinc-400 flex items-center gap-1 font-semibold">
                              <X className="w-3.5 h-3.5" /> Ambos eliminados
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {step.oddElement && (
                    <div className="flex flex-col items-center justify-between p-3 rounded-xl border border-amber-500/60 bg-amber-950/20">
                      <div className="flex items-center justify-between w-full text-[10px] text-zinc-400 font-mono mb-1.5">
                        <span>Elemento Impar</span>
                        <span className="px-1.5 py-0.5 rounded border border-amber-500/40 bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                          Sin pareja
                        </span>
                      </div>
                      <div className="my-1">
                        <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center font-mono font-bold text-sm text-amber-200">
                          {step.oddElement.value}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] font-mono text-amber-300 font-semibold text-center">
                        Candidato de respaldo
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step.survivors.length > 0 && (
              <div className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-rose-950/30 border border-rose-800/40">
                <div className="flex items-center gap-1.5 text-xs text-rose-300 font-semibold">
                  <ArrowDown className="w-4 h-4 text-rose-400 animate-bounce" />
                  Vector Reducido para Nivel Siguiente (Sobrevivientes)
                </div>
                <div className="flex items-center justify-center gap-2">
                  {step.survivors.map((sVal, sIdx) => (
                    <div
                      key={sIdx}
                      className="w-10 h-10 rounded-xl bg-rose-500 text-zinc-950 font-mono font-black text-sm flex items-center justify-center shadow-md shadow-rose-950/50"
                    >
                      {sVal}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AnimationPlayerShell>
  );
}

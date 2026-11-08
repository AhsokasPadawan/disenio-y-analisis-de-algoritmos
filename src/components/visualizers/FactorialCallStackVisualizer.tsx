import { useState } from 'react';
import { AnimationPlayerShell } from './AnimationPlayerShell';
import { ANIMATION_SPECS_DATA } from '../../data/animationSpecsData';

interface FactorialFrame {
  step: number;
  phase: 'push' | 'base_case' | 'pop_resolve';
  stack: string[];
  note?: string;
  returned?: number;
}

const STEP_DESCRIPTIONS: string[] = [
  'Llamada inicial Factorial(4): se evalúa 4 * Factorial(3), se apila el marco en memoria y se transfiere el control a Factorial(3).',
  'Llamada recursiva Factorial(3): queda pendiente 3 * Factorial(2), se apila un nuevo marco sobre el anterior.',
  'Llamada recursiva Factorial(2): queda pendiente 2 * Factorial(1), se apila en el tope de la pila.',
  'Llamada recursiva Factorial(1): queda pendiente 1 * Factorial(0), se apila alcanzando el penúltimo nivel.',
  'Caso Base n = 0: Factorial(0) devuelve directamente 1 sin expandir más llamadas. Se inicia la fase de retorno.',
  'Desapilando Factorial(1): se resuelve 1 * 1 = 1 y se retorna al marco de Factorial(2).',
  'Desapilando Factorial(2): se resuelve 2 * 1 = 2 y se retorna al marco de Factorial(3).',
  'Desapilando Factorial(3): se resuelve 3 * 2 = 6 y se retorna al marco inicial Factorial(4).',
  'Desapilando llamada inicial Factorial(4): se resuelve 4 * 6 = 24. La pila queda vacía y se obtiene el resultado final 24.',
];

const PHASE_LABEL_MAP: Record<FactorialFrame['phase'], string> = {
  push: 'Apilar llamada recursiva',
  base_case: 'Caso Base: Factorial(0) = 1',
  pop_resolve: 'Desapilar y calcular',
};

const PHASE_COLOR_MAP: Record<FactorialFrame['phase'], string> = {
  push: 'text-rose-400',
  base_case: 'text-amber-400',
  pop_resolve: 'text-amber-400',
};

export function FactorialCallStackVisualizer() {
  const spec = ANIMATION_SPECS_DATA.FACTORIAL_CALL_STACK;
  const frames: FactorialFrame[] = spec?.frames ?? [];

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const currentFrame = frames[currentStep] ?? frames[0];
  const isPopping = currentFrame.phase === 'pop_resolve' || currentFrame.phase === 'base_case';
  const isFinalStep = currentStep === frames.length - 1;
  const reversedStack = [...currentFrame.stack].reverse();

  return (
    <AnimationPlayerShell
      title="Pila de Recursión (Call Stack) en Factorial(4)"
      badge="Subtract & Conquer"
      currentStep={currentStep}
      totalSteps={frames.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={STEP_DESCRIPTIONS[currentStep] ?? currentFrame.note}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="flex-1 min-h-0 w-full flex flex-col lg:flex-row items-stretch justify-between gap-3 sm:gap-4">
        <div className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col justify-between gap-2.5">
          <div className="flex flex-col gap-1 rounded-xl border border-rose-800/40 bg-rose-950/80 p-2.5 sm:p-3 text-xs sm:text-sm font-mono shadow-xs">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-sans font-bold">
              Operación en Pila
            </span>
            <span className={`font-bold text-sm sm:text-base ${PHASE_COLOR_MAP[currentFrame.phase]}`}>
              {PHASE_LABEL_MAP[currentFrame.phase]}
            </span>
          </div>

          <div className="flex flex-col gap-1 rounded-xl border border-rose-800/40 bg-rose-950/80 p-2.5 sm:p-3 text-xs sm:text-sm font-mono shadow-xs">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-sans font-bold">
              Profundidad LIFO
            </span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-400 text-sm sm:text-base">
                {currentFrame.stack.length} / 5 marcos
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2.5 w-3.5 rounded-xs transition-colors ${
                      level <= currentFrame.stack.length
                        ? 'bg-sky-400 shadow-xs'
                        : 'bg-rose-900/40 border border-rose-800/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl border border-rose-800/40 bg-rose-950/80 p-2.5 sm:p-3 text-xs sm:text-sm font-mono shadow-xs">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-sans font-bold">
              Retorno del Marco Activo
            </span>
            <span className={`font-bold text-sm sm:text-base ${currentFrame.returned !== undefined ? 'text-amber-300' : 'text-zinc-400'}`}>
              {currentFrame.returned !== undefined ? `Retorno = ${currentFrame.returned}` : '?'}
            </span>
          </div>

          <div className="flex flex-col gap-1 rounded-xl border border-rose-800/40 bg-rose-950/80 p-2.5 sm:p-3 text-xs sm:text-sm font-mono shadow-xs">
            <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-sans font-bold">
              Resultado Factorial(4)
            </span>
            <span className={`font-bold text-sm sm:text-base ${isFinalStep ? 'text-rose-300' : 'text-zinc-400'}`}>
              {isFinalStep ? '24' : '?'}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0 min-h-0 h-full flex flex-col items-center justify-between">
          <div className="shrink-0 text-xs font-black uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1.5">
            <span>Tope de la Pila LIFO</span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-zinc-950 text-[10px] font-black">
              ▲
            </span>
          </div>

          <div className="flex-1 min-h-0 w-full max-w-lg rounded-b-2xl border-b-4 border-l-4 border-r-4 border-rose-400/70 bg-zinc-950/90 p-2.5 sm:p-3 gap-2 shadow-2xl flex flex-col justify-end overflow-y-auto">
            {reversedStack.map((item, reverseIndex) => {
              const originalIndex = currentFrame.stack.length - 1 - reverseIndex;
              const isTop = originalIndex === currentFrame.stack.length - 1;
              const formattedItem = item.replace(/Fact\(/g, 'Factorial(');
              return (
                <div
                  key={`${item}-${originalIndex}`}
                  className={`w-full rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-bold transition-all duration-200 shadow-md ${
                    isTop
                      ? isPopping
                        ? 'border-2 border-amber-400 bg-amber-500/25 text-amber-100 ring-2 ring-amber-400/30'
                        : 'border-2 border-rose-400 bg-rose-500/25 text-rose-100 ring-2 ring-rose-400/30'
                      : 'border border-rose-900/60 bg-rose-950/50 text-zinc-300 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 min-w-0 truncate">
                      {isTop && (
                        <span className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-rose-400 text-zinc-950 text-[10px] sm:text-[11px] font-black">
                          ▲
                        </span>
                      )}
                      <span className="truncate">{formattedItem}</span>
                    </span>

                    <div className="shrink-0">
                      {isTop && currentFrame.returned !== undefined && (
                        <span className="rounded-lg bg-amber-400/30 border border-amber-400/70 px-2 py-0.5 text-xs font-bold text-amber-300 shadow-xs">
                          Retorno = {currentFrame.returned}
                        </span>
                      )}
                      {isTop && currentFrame.phase === 'base_case' && currentFrame.returned === undefined && (
                        <span className="rounded-lg bg-rose-400/30 border border-rose-400/70 px-2 py-0.5 text-xs font-bold text-rose-300 shadow-xs">
                          Caso Base (Retorno = 1)
                        </span>
                      )}
                      {isTop && currentFrame.phase === 'push' && (
                        <span className="rounded-lg bg-sky-400/20 border border-sky-400/60 px-2 py-0.5 text-xs font-bold text-sky-300 shadow-xs">
                          En ejecución (Retorno: ?)
                        </span>
                      )}
                      {!isTop && (
                        <span className="text-[11px] sm:text-xs text-zinc-400 font-medium">
                          Esperando retorno (?)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="shrink-0 mt-1.5 text-center text-xs font-mono text-zinc-400">
            Fondo de Pila: Llamada Raíz Factorial(4)
          </div>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

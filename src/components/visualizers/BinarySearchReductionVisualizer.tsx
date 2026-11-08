import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { MathFormula } from '../MathFormula';
import { useSectionTheme } from '../../domain/sectionThemes';

interface SearchStepState {
  stepIndex: number;
  low: number;
  high: number;
  mid: number;
  target: number;
  found: boolean;
  explanation: string;
}

const SAMPLE_SORTED_ARRAY = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91, 104, 118, 130, 142, 160];

export function BinarySearchReductionVisualizer() {
  const sectionTheme = useSectionTheme();
  const [targetValue, setTargetValue] = useState<number>(56);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const calculateSearchSteps = (target: number): SearchStepState[] => {
    const steps: SearchStepState[] = [];
    let low = 0;
    let high = SAMPLE_SORTED_ARRAY.length - 1;
    let stepCount = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midValue = SAMPLE_SORTED_ARRAY[mid];

      if (midValue === target) {
        steps.push({
          stepIndex: stepCount,
          low,
          high,
          mid,
          target,
          found: true,
          explanation: `¡Elemento encontrado en el índice ${mid}! Comparación exacta: T[${mid}] = ${midValue}.`,
        });
        break;
      }

      if (target < midValue) {
        steps.push({
          stepIndex: stepCount,
          low,
          high,
          mid,
          target,
          found: false,
          explanation: `${target} < T[${mid}] (${midValue}). Se descarta la mitad derecha. Rango nuevo: [${low}..${mid - 1}].`,
        });
        high = mid - 1;
      } else {
        steps.push({
          stepIndex: stepCount,
          low,
          high,
          mid,
          target,
          found: false,
          explanation: `${target} > T[${mid}] (${midValue}). Se descarta la mitad izquierda. Rango nuevo: [${mid + 1}..${high}].`,
        });
        low = mid + 1;
      }
      stepCount++;
    }

    return steps;
  };

  const steps = calculateSearchSteps(targetValue);
  const activeStep = steps[Math.min(currentStepIndex, steps.length - 1)] || steps[0];

  const handleSelectTarget = (value: number) => {
    setTargetValue(value);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  return (
    <div className={`flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border p-3 sm:p-4 ${sectionTheme.analysisPanelClass}`}>
      <div className={`flex shrink-0 flex-wrap items-center justify-between gap-2 border-b pb-2 ${sectionTheme.analysisDividerClass}`}>
        <div>
          <span className={`text-xs font-bold uppercase tracking-wider ${sectionTheme.slideHeaderClass}`}>
            Simulación de Búsqueda Binaria Recursiva
          </span>
          <h3 className={`text-sm sm:text-base font-black ${sectionTheme.titleTextClass}`}>
            Reducción Geométrica por División n/2
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${sectionTheme.slideHeaderClass}`}>Buscar x:</span>
          {[12, 56, 118, 160].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleSelectTarget(val)}
              className={`rounded-lg px-2.5 py-1 text-xs font-mono font-bold transition ${
                targetValue === val
                  ? sectionTheme.primaryButtonClass
                  : sectionTheme.secondaryButtonClass
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-between py-2 overflow-hidden gap-2">
        <div className={`rounded-xl border bg-zinc-950 p-3 text-zinc-100 ${sectionTheme.cardBorderClass}`}>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>Arreglo Ordenado (Tamaño n = {SAMPLE_SORTED_ARRAY.length})</span>
            <span className="font-mono text-sky-400">
              Paso {activeStep.stepIndex + 1} de {steps.length}
            </span>
          </div>

          <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 text-center">
            {SAMPLE_SORTED_ARRAY.map((num, idx) => {
              const inRange = idx >= activeStep.low && idx <= activeStep.high;
              const isMid = idx === activeStep.mid;
              const isFound = isMid && activeStep.found;

              let cellStyle = 'bg-zinc-900/40 text-zinc-600 border-zinc-850 opacity-40';
              if (isFound) {
                cellStyle = 'bg-sky-400 text-zinc-950 font-black border-sky-300 scale-105 shadow-md';
              } else if (isMid) {
                cellStyle = 'bg-amber-400 text-zinc-950 font-black border-amber-300 scale-105 shadow-md';
              } else if (inRange) {
                cellStyle = 'bg-sky-950/80 text-sky-200 border-sky-500/40 font-semibold';
              }

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center rounded-lg border py-1.5 transition-all ${cellStyle}`}
                >
                  <span className="text-[10px] font-mono opacity-60">[{idx}]</span>
                  <span className="text-xs sm:text-sm font-mono font-bold mt-0.5">{num}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <div className={`rounded-xl border p-2.5 flex flex-col justify-between ${sectionTheme.analysisSubcardClass}`}>
            <span className={`text-[11px] font-bold uppercase ${sectionTheme.slideHeaderClass}`}>Subproblema Activo</span>
            <div className={`font-mono text-xs sm:text-sm mt-1 ${sectionTheme.titleTextClass}`}>
              Rango: <span className={`font-bold ${sectionTheme.strongTextClass}`}>[{activeStep.low}..{activeStep.high}]</span>
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Tamaño actual: {Math.max(0, activeStep.high - activeStep.low + 1)} elementos
            </div>
          </div>

          <div className={`rounded-xl border p-2.5 flex flex-col justify-between ${sectionTheme.analysisSubcardClass}`}>
            <span className={`text-[11px] font-bold uppercase ${sectionTheme.slideHeaderClass}`}>Punto Medio Evaluado</span>
            <div className={`font-mono text-xs sm:text-sm mt-1 ${sectionTheme.titleTextClass}`}>
              mid = ({activeStep.low} + {activeStep.high}) / 2 = <span className="text-amber-600 dark:text-amber-400 font-bold">{activeStep.mid}</span>
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Valor inspeccionado: T[{activeStep.mid}] = {SAMPLE_SORTED_ARRAY[activeStep.mid]}
            </div>
          </div>

          <div className={`rounded-xl border p-2.5 flex flex-col justify-between ${sectionTheme.formulaCardClass}`}>
            <span className={`text-[11px] font-bold uppercase ${sectionTheme.formulaLabelClass}`}>Ecuación de Recurrencia</span>
            <div className={`font-mono text-xs sm:text-sm mt-1 ${sectionTheme.titleTextClass}`}>
              <MathFormula expression="T(n) = T(n/2) + O(1)" />
            </div>
            <div className={`text-[11px] font-bold mt-0.5 ${sectionTheme.strongTextClass}`}>
              Costo asintótico: <MathFormula expression="\Theta(\log_2 n)" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl border p-2.5 flex items-center justify-between gap-3 ${sectionTheme.accentSurfaceClass}`}>
          <p className={`text-xs sm:text-sm font-medium truncate flex-1 ${sectionTheme.strongTextClass}`}>
            {activeStep.explanation}
          </p>

          <div className="shrink-0 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleReset}
              className={`rounded-lg border p-1.5 ${sectionTheme.secondaryButtonClass}`}
              aria-label="Reiniciar"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`rounded-lg border p-1.5 disabled:opacity-40 ${sectionTheme.secondaryButtonClass}`}
              aria-label="Paso anterior"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              disabled={currentStepIndex === steps.length - 1}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold disabled:opacity-40 flex items-center gap-1 ${sectionTheme.primaryButtonClass}`}
            >
              <span>Siguiente</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { AnimationPlayerShell } from './AnimationPlayerShell';
import { useSectionTheme } from '../../domain/sectionThemes';

interface LCBBNode {
  id: number;
  label: string;
  cotaC: number;
  cotaU: number;
  upper: number;
  status: 'vivo' | 'podado' | 'optimo' | 'infactible';
  reason: string;
}

const JOB_SEQUENCING_NODES: LCBBNode[] = [
  { id: 1, label: 'Raíz (Inicial)', cotaC: 0, cotaU: 24, upper: 24, status: 'vivo', reason: 'Inicio del árbol. Cota superior global upper = 24.' },
  { id: 2, label: 't1 en pos 1', cotaC: 0, cotaU: 13, upper: 13, status: 'vivo', reason: 'Programar t1 primero. Mejora el upper global a 13.' },
  { id: 3, label: 't2 en pos 1', cotaC: 4, cotaU: 18, upper: 13, status: 'podado', reason: 'c(x) = 4, pero u(x)=18 > upper=13. No mejora.' },
  { id: 4, label: 't3 en pos 1', cotaC: 4, cotaU: 11, upper: 11, status: 'vivo', reason: 't3 en pos 1 reduce penalidad. Nuevo upper global = 11.' },
  { id: 5, label: 't3 -> t2', cotaC: 4, cotaU: 6, upper: 6, status: 'vivo', reason: 'Combinación t3 luego t2. Cota superior se reduce a 6.' },
  { id: 6, label: 't3 -> t2 -> t1 -> t4', cotaC: 6, cotaU: 6, upper: 6, status: 'optimo', reason: '¡Secuencia óptima alcanzada! Penalidad mínima = 6.' },
];

const KNAPSACK_BB_NODES: LCBBNode[] = [
  { id: 1, label: 'Raíz (w=0, v=0)', cotaC: 0, cotaU: 40, upper: 0, status: 'vivo', reason: 'Capacidad W=15. Cota superior fraccionaria relajada = 40.' },
  { id: 2, label: 'Incluir Obj 1 (w=2, v=10)', cotaC: 10, cotaU: 40, upper: 10, status: 'vivo', reason: 'Obj 1 entra (peso 2 ≤ 15). upper = 10.' },
  { id: 3, label: 'Excluir Obj 1', cotaC: 0, cotaU: 32, upper: 10, status: 'vivo', reason: 'Rama sin Obj 1. Cota superior cae a 32.' },
  { id: 4, label: 'Obj 1 + Obj 2 (w=6, v=20)', cotaC: 20, cotaU: 40, upper: 20, status: 'vivo', reason: 'Obj 1 + Obj 2 entran. upper se eleva a 20.' },
  { id: 5, label: 'Obj 1 + Obj 2 + Obj 3 + Obj 4', cotaC: 38, cotaU: 38, upper: 38, status: 'optimo', reason: 'Solución factible óptima con beneficio total = 38.' },
];

interface BranchAndBoundVisualizersProps {
  initialActiveTab?: 'job' | 'knapsack' | 'traversal';
}

export function BranchAndBoundVisualizers({ initialActiveTab = 'job' }: BranchAndBoundVisualizersProps = {}) {
  const [activeTab, setActiveTab] = useState<'job' | 'knapsack' | 'traversal'>(initialActiveTab);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const sectionTheme = useSectionTheme();

  const activeNodes = activeTab === 'job' ? JOB_SEQUENCING_NODES : KNAPSACK_BB_NODES;
  const currentNode = activeNodes[currentStep] ?? activeNodes[0];

  const handleTabChange = (tab: 'job' | 'knapsack' | 'traversal') => {
    setActiveTab(tab);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const statusBadge: Record<string, { label: string; style: string }> = {
    vivo: { label: 'Nodo Vivo (En Cola)', style: 'bg-sky-500/20 text-sky-300 border-sky-500/40' },
    podado: { label: 'Podado (Killed)', style: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
    optimo: { label: '★ Solución Óptima', style: 'bg-violet-500/20 text-violet-300 border-violet-500/40' },
    infactible: { label: 'Infactible', style: 'bg-zinc-800 text-zinc-400 border-zinc-700' },
  };

  return (
    <AnimationPlayerShell
      title={`Branch & Bound de Menor Costo (LC-BB): ${activeTab === 'job' ? 'Secuenciación de Tareas' : 'Mochila 0-1 con Cotas'}`}
      badge="Ramificación y Poda"
      currentStep={currentStep}
      totalSteps={activeNodes.length}
      isPlaying={isPlaying}
      playbackSpeed={playbackSpeed}
      stepDescription={currentNode.reason}
      onStepChange={setCurrentStep}
      onTogglePlay={() => setIsPlaying(!isPlaying)}
      onSpeedChange={setPlaybackSpeed}
      onReset={() => setCurrentStep(0)}
    >
      <div className="flex flex-col gap-4 py-2">
        <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleTabChange('job')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                activeTab === 'job'
                  ? `${sectionTheme.primaryButtonClass} shadow-xs`
                  : 'text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              Secuenciación de Tareas
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('knapsack')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                activeTab === 'knapsack'
                  ? `${sectionTheme.primaryButtonClass} shadow-xs`
                  : 'text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              Mochila 0-1 (LC-BB)
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-zinc-400">Variable Global:</span>
            <span className="rounded bg-amber-400/20 px-2 py-0.5 font-bold text-amber-300 border border-amber-400/40">
              upper = {currentNode.upper}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {activeNodes.map((node, idx) => {
            const isCurrent = idx === currentStep;
            const isVisited = idx <= currentStep;
            const badgeInfo = statusBadge[node.status];

            return (
              <div
                key={node.id}
                className={`flex flex-col rounded-xl border p-3 transition-all duration-300 ${
                  isCurrent
                    ? 'border-amber-400 bg-amber-500/10 shadow-md scale-102'
                    : isVisited
                    ? 'border-violet-800/60 bg-zinc-900/90'
                    : 'border-zinc-800 bg-zinc-950/60 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-bold text-white">Nodo #{node.id}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold border ${badgeInfo.style}`}
                  >
                    {badgeInfo.label}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-zinc-300 mb-2 truncate">
                  {node.label}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-1.5 rounded-lg bg-zinc-950 p-2 border border-zinc-800 font-mono text-[11px]">
                  <div>
                    <span className="text-zinc-500 block text-[9px]">Cota inf c(x):</span>
                    <strong className="text-sky-300">{node.cotaC}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[9px]">Cota sup u(x):</span>
                    <strong className="text-amber-300">{node.cotaU}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-300 border-t border-zinc-800/80 pt-2">
          <span>Regla de Poda LC-BB: <strong className="text-rose-400">Si c(x) ≥ upper, se poda el subárbol inmediatamente</strong></span>
          <span className="text-violet-300">Menor c(x) determina el nodo vivo a expandir primero</span>
        </div>
      </div>
    </AnimationPlayerShell>
  );
}

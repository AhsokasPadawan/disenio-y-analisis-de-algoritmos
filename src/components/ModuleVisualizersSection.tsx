import { ReactNode } from 'react';
import { ModuleId } from '../domain/courseTypes';
import { AsymptoticBoundsVisualizer } from './visualizers/AsymptoticBoundsVisualizer';
import { ComplexityClassesDiagram } from './visualizers/ComplexityClassesDiagram';
import { RecurrenceSimulatorCard } from './RecurrenceSimulatorCard';
import { FactorialCallStackVisualizer } from './visualizers/FactorialCallStackVisualizer';
import { MergeSortVisualizer } from './visualizers/MergeSortVisualizer';
import { QuickSortVisualizer } from './visualizers/QuickSortVisualizer';
import { PseudoMVisualizer } from './visualizers/PseudoMVisualizer';
import { HanoiVisualizer } from './visualizers/HanoiVisualizer';
import { BridgeFixtureVisualizer } from './visualizers/BridgeFixtureVisualizer';
import { LmpsRmpsVisualizer } from './visualizers/LmpsRmpsVisualizer';
import { HuffmanTreeVisualizer } from './visualizers/HuffmanTreeVisualizer';
import { DijkstraVisualizer } from './visualizers/DijkstraVisualizer';
import { PrimVsKruskalVisualizer } from './visualizers/PrimVsKruskalVisualizer';
import { FibonacciMemoizationVisualizer } from './visualizers/FibonacciMemoizationVisualizer';
import { CoinChangeVisualizer } from './visualizers/CoinChangeVisualizer';
import { Knapsack01Visualizer } from './visualizers/Knapsack01Visualizer';
import { FloydWarshallVisualizer } from './visualizers/FloydWarshallVisualizer';
import { LcsVisualizer } from './visualizers/LcsVisualizer';
import { LisVisualizer } from './visualizers/LisVisualizer';
import { MatrixChainVisualizer } from './visualizers/MatrixChainVisualizer';
import { SubsetSumTreeVisualizer } from './visualizers/SubsetSumTreeVisualizer';
import { NQueensVisualizer } from './visualizers/NQueensVisualizer';
import { AStarSearchVisualizer } from './visualizers/AStarSearchVisualizer';
import { BranchAndBoundVisualizers } from './visualizers/BranchAndBoundVisualizers';
import { MinMaxAlphaBetaVisualizer } from './visualizers/MinMaxAlphaBetaVisualizer';

interface ModuleVisualizersSectionProps {
  moduleId: ModuleId;
}

const VISUALIZERS_LOOKUP_BY_MODULE: Record<string, () => ReactNode> = {
  'module-1-complexity': () => (
    <div className="space-y-6">
      <AsymptoticBoundsVisualizer />
      <RecurrenceSimulatorCard />
      <ComplexityClassesDiagram />
    </div>
  ),
  'module-2-divide-and-conquer': () => (
    <div className="space-y-6">
      <FactorialCallStackVisualizer />
      <MergeSortVisualizer />
      <QuickSortVisualizer />
      <PseudoMVisualizer />
      <HanoiVisualizer />
      <BridgeFixtureVisualizer />
      <LmpsRmpsVisualizer />
    </div>
  ),
  'module-3-greedy-and-graphs': () => (
    <div className="space-y-6">
      <HuffmanTreeVisualizer />
      <DijkstraVisualizer />
      <PrimVsKruskalVisualizer />
    </div>
  ),
  'module-4-dynamic-programming': () => (
    <div className="space-y-6">
      <FibonacciMemoizationVisualizer />
      <CoinChangeVisualizer />
      <Knapsack01Visualizer />
      <FloydWarshallVisualizer />
      <LcsVisualizer />
      <LisVisualizer />
      <MatrixChainVisualizer />
    </div>
  ),
  'module-5-backtracking-and-bnb': () => (
    <div className="space-y-6">
      <SubsetSumTreeVisualizer />
      <NQueensVisualizer />
      <AStarSearchVisualizer />
      <BranchAndBoundVisualizers />
      <MinMaxAlphaBetaVisualizer />
    </div>
  ),
};

export function ModuleVisualizersSection({ moduleId }: ModuleVisualizersSectionProps) {
  const renderVisualizers = VISUALIZERS_LOOKUP_BY_MODULE[moduleId];
  if (!renderVisualizers) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 border-b border-emerald-800/20 pb-2 dark:border-emerald-800/40">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <h2 className="text-base font-extrabold text-emerald-950 sm:text-lg dark:text-emerald-300">
          Visualizadores Algorítmicos Interactivos
        </h2>
      </div>
      {renderVisualizers()}
    </section>
  );
}

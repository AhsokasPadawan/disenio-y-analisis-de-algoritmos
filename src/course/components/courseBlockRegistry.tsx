import { ReactNode } from 'react';
import {
  SlideBlockComponentProps,
  SlideBlockRegistry,
} from '../../core/ui/slides/defaultBlockRegistry';
import { AStarSearchVisualizer } from '../visualizers/AStarSearchVisualizer';
import { AsymptoticBoundsVisualizer } from '../visualizers/AsymptoticBoundsVisualizer';
import { BinarySearchReductionVisualizer } from '../visualizers/BinarySearchReductionVisualizer';
import { BranchAndBoundVisualizers } from '../visualizers/BranchAndBoundVisualizers';
import { BridgeFixtureVisualizer } from '../visualizers/BridgeFixtureVisualizer';
import { CoinChangeVisualizer } from '../visualizers/CoinChangeVisualizer';
import { ComplexityClassesDiagram } from '../visualizers/ComplexityClassesDiagram';
import { DijkstraVisualizer } from '../visualizers/DijkstraVisualizer';
import { FactorialCallStackVisualizer } from '../visualizers/FactorialCallStackVisualizer';
import { FibonacciMemoizationVisualizer } from '../visualizers/FibonacciMemoizationVisualizer';
import { FloydWarshallVisualizer } from '../visualizers/FloydWarshallVisualizer';
import { GrowthCurvesVisualizer } from '../visualizers/GrowthCurvesVisualizer';
import { HanoiVisualizer } from '../visualizers/HanoiVisualizer';
import { HuffmanTreeVisualizer } from '../visualizers/HuffmanTreeVisualizer';
import { Knapsack01Visualizer } from '../visualizers/Knapsack01Visualizer';
import { LcsVisualizer } from '../visualizers/LcsVisualizer';
import { LisVisualizer } from '../visualizers/LisVisualizer';
import { LmpsRmpsVisualizer } from '../visualizers/LmpsRmpsVisualizer';
import { MatrixChainVisualizer } from '../visualizers/MatrixChainVisualizer';
import { MergeSortVisualizer } from '../visualizers/MergeSortVisualizer';
import { MinMaxAlphaBetaVisualizer } from '../visualizers/MinMaxAlphaBetaVisualizer';
import { NQueensVisualizer } from '../visualizers/NQueensVisualizer';
import { PrimVsKruskalVisualizer } from '../visualizers/PrimVsKruskalVisualizer';
import { PseudoMVisualizer } from '../visualizers/PseudoMVisualizer';
import { QuickSortVisualizer } from '../visualizers/QuickSortVisualizer';
import { SubsetSumTreeVisualizer } from '../visualizers/SubsetSumTreeVisualizer';
import {
  CodeSlideBlock,
  ComplexitySlideBlock,
  CourseExerciseSlideBlock,
} from './CourseSlideBlocks';
import { RecurrenceSimulatorCard } from './RecurrenceSimulatorCard';

export const VISUALIZER_LOOKUP: Record<string, () => ReactNode> = {
  'asymptotic-bounds': () => <AsymptoticBoundsVisualizer />,
  'growth-curves': () => <GrowthCurvesVisualizer />,
  'binary-search-reduction': () => <BinarySearchReductionVisualizer />,
  'recurrence-simulator': () => <RecurrenceSimulatorCard />,
  'complexity-classes': () => <ComplexityClassesDiagram />,
  'factorial-call-stack': () => <FactorialCallStackVisualizer />,
  'mergesort-tree': () => <MergeSortVisualizer />,
  'quicksort-partition': () => <QuickSortVisualizer />,
  'pseudo-m-majority': () => <PseudoMVisualizer />,
  'hanoi-towers': () => <HanoiVisualizer />,
  'bridge-fixture': () => <BridgeFixtureVisualizer />,
  'lmps-rmps': () => <LmpsRmpsVisualizer />,
  'huffman-tree': () => <HuffmanTreeVisualizer />,
  'dijkstra-graph': () => <DijkstraVisualizer />,
  'prim-vs-kruskal': () => <PrimVsKruskalVisualizer />,
  'fibonacci-memo': () => <FibonacciMemoizationVisualizer />,
  'coin-change-dp': () => <CoinChangeVisualizer />,
  'knapsack-01-dp': () => <Knapsack01Visualizer />,
  'floyd-warshall': () => <FloydWarshallVisualizer />,
  'lcs-table': () => <LcsVisualizer />,
  'lis-trace': () => <LisVisualizer />,
  'matrix-chain-dp': () => <MatrixChainVisualizer />,
  'subset-sum-tree': () => <SubsetSumTreeVisualizer />,
  'n-queens': () => <NQueensVisualizer />,
  'astar-vs-ucs': () => <AStarSearchVisualizer />,
  'bnb-job-sequencing': () => <BranchAndBoundVisualizers initialActiveTab="job" />,
  'bnb-knapsack': () => <BranchAndBoundVisualizers initialActiveTab="knapsack" />,
  'bnb-assignment': () => <BranchAndBoundVisualizers initialActiveTab="job" />,
  'bnb-fifo-lifo': () => <BranchAndBoundVisualizers initialActiveTab="traversal" />,
  'minmax-alphabeta': () => <MinMaxAlphaBetaVisualizer />,
};

function VisualizerSlideBlock({ slide }: SlideBlockComponentProps) {
  if (!slide.visualizerId) return null;
  return (
    <div className="min-h-full flex-1 flex flex-col">
      {VISUALIZER_LOOKUP[slide.visualizerId]?.()}
    </div>
  );
}

export const COURSE_BLOCK_REGISTRY: SlideBlockRegistry = {
  visualizer: VisualizerSlideBlock,
  pseudocode: CodeSlideBlock,
  code: CodeSlideBlock,
  complexity: ComplexitySlideBlock,
  exercise: CourseExerciseSlideBlock,
};

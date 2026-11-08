import { ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ConceptSlide } from '../domain/slideDeckBuilder';
import { AnnotatedCodeBlock } from './AnnotatedCodeBlock';
import { ExerciseWorkspace } from './ExerciseWorkspace';
import { ExerciseVisualResource } from './ExerciseVisualResource';
import { IdeCodeBlock } from './IdeCodeBlock';
import { MathFormula } from './MathFormula';
import { RecurrenceSimulatorCard } from './RecurrenceSimulatorCard';
import { AsymptoticBoundsVisualizer } from './visualizers/AsymptoticBoundsVisualizer';
import { BinarySearchReductionVisualizer } from './visualizers/BinarySearchReductionVisualizer';
import { ComplexityClassesDiagram } from './visualizers/ComplexityClassesDiagram';
import { FactorialCallStackVisualizer } from './visualizers/FactorialCallStackVisualizer';
import { GrowthCurvesVisualizer } from './visualizers/GrowthCurvesVisualizer';
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
import { SECTION_THEMES, SectionTheme, SectionThemeContext } from '../domain/sectionThemes';

interface PresentationSlideViewProps {
  slide: ConceptSlide;
  currentSlideIndex: number;
  totalSlidesCount: number;
  moduleSlideIndex: number;
  moduleSlidesCount: number;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
}

const VISUALIZER_LOOKUP: Record<string, () => ReactNode> = {
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

function getFormulaGridColsClass(count: number): string {
  if (count === 1) return 'grid-cols-1';
  if (count === 2) return 'grid-cols-1 md:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-3';
}

function getSummaryTypographyClass(textLength: number, titleTextClass: string): string {
  if (textLength < 140) {
    return `text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-bold ${titleTextClass}`;
  }
  if (textLength < 250) {
    return `text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed font-semibold ${titleTextClass}`;
  }
  return `text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-semibold ${titleTextClass}`;
}

function renderColonFormattedLine(line: string, strongTextClass: string) {
  const colonIndex = line.indexOf(':');
  if (colonIndex === -1) {
    return <span>{line}</span>;
  }
  const prefix = line.slice(0, colonIndex).trim();
  const rest = line.slice(colonIndex + 1);

  return (
    <span>
      <strong className={`font-bold ${strongTextClass}`}>
        {prefix}:
      </strong>
      {rest}
    </span>
  );
}

function renderSummaryContent(
  summary: string,
  typographyClass: string,
  sectionTheme: SectionTheme,
) {
  const lines = summary.split('\n');
  if (lines.length === 1) {
    return (
      <p className={typographyClass}>
        {renderColonFormattedLine(lines[0], sectionTheme.strongTextClass)}
      </p>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 sm:gap-2 ${typographyClass}`}>
      <p>{renderColonFormattedLine(lines[0], sectionTheme.strongTextClass)}</p>
      <div className={`flex flex-col gap-1 sm:gap-1.5 pl-2.5 sm:pl-3.5 border-l-2 ${sectionTheme.inlineAccentBorderClass} text-xs sm:text-sm md:text-base font-semibold`}>
        {lines.slice(1).map((line, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <span className={`${sectionTheme.bulletMarkerClass} font-bold select-none`}>•</span>
            <div>{renderColonFormattedLine(line.replace(/^[•\-\*]\s*/, ''), sectionTheme.strongTextClass)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderFormattedPoint(
  pointText: string,
  textClass: string,
  sectionTheme: SectionTheme,
  subTextClass?: string,
) {
  const lines = pointText.split('\n');
  if (lines.length === 1) {
    return (
      <span className={textClass}>
        {renderColonFormattedLine(lines[0], sectionTheme.strongTextClass)}
      </span>
    );
  }

  const [firstLine, ...subLines] = lines;
  const actualSubTextClass = subTextClass || textClass;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className={textClass}>{renderColonFormattedLine(firstLine, sectionTheme.strongTextClass)}</div>
      <div className={`flex flex-col gap-1.5 pl-3 sm:pl-4 border-l-2 ${sectionTheme.inlineAccentBorderClass} my-0.5`}>
        {subLines.map((subLine, idx) => (
          <div key={idx} className={`flex items-start gap-2 ${actualSubTextClass}`}>
            <span className={`${sectionTheme.bulletMarkerClass} font-bold select-none`}>•</span>
            <div>{renderColonFormattedLine(subLine, sectionTheme.strongTextClass)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getBulletFlexWeight(text: string): number {
  const lineCount = text.split('\n').length;
  const lengthScore = text.length / 120;
  return Math.max(1, Math.round(lineCount * 1.5 + lengthScore));
}

function getBulletTypographyConfig(
  itemCount: number,
  averageLength: number,
  stepBadgeClass: string,
  accentSurfaceClass: string,
) {
  if (itemCount <= 3 && averageLength < 220) {
    return {
      textClass: 'text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200',
      subTextClass: 'text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300',
      badgeClass: `flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl text-sm sm:text-base md:text-lg font-bold shadow-xs my-auto ${stepBadgeClass}`,
      itemClass: `w-full flex items-center gap-3.5 sm:gap-4 rounded-2xl border p-3 sm:p-3.5 md:p-4 shadow-xs transition-all ${accentSurfaceClass}`,
      listGapClass: 'flex-1 min-h-0 flex flex-col justify-between gap-2.5 sm:gap-3 overflow-hidden',
    };
  }
  if (itemCount >= 5) {
    return {
      textClass: 'text-xs sm:text-sm md:text-base font-medium leading-snug text-zinc-800 dark:text-zinc-200',
      subTextClass: 'text-[11px] sm:text-xs md:text-sm leading-snug text-zinc-700 dark:text-zinc-300',
      badgeClass: `flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg text-xs sm:text-sm font-bold shadow-xs my-auto ${stepBadgeClass}`,
      itemClass: `w-full flex items-center gap-2.5 sm:gap-3 rounded-xl border px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-xs transition-all ${accentSurfaceClass}`,
      listGapClass: 'flex-1 min-h-0 flex flex-col justify-between gap-1.5 sm:gap-2 overflow-hidden',
    };
  }
  return {
    textClass: 'text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed text-zinc-800 dark:text-zinc-200',
    subTextClass: 'text-xs sm:text-sm md:text-base leading-relaxed text-zinc-700 dark:text-zinc-300',
    badgeClass: `flex h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-xl text-xs sm:text-sm md:text-base font-bold shadow-xs my-auto ${stepBadgeClass}`,
    itemClass: `w-full flex items-center gap-3 rounded-xl border p-2 sm:p-2.5 md:p-3 shadow-xs transition-all ${accentSurfaceClass}`,
    listGapClass: 'flex-1 min-h-0 flex flex-col justify-between gap-2 sm:gap-2.5 overflow-hidden',
  };
}

export function PresentationSlideView({
  slide,
  currentSlideIndex,
  totalSlidesCount,
  moduleSlideIndex,
  moduleSlidesCount,
  onNavigatePrevious,
  onNavigateNext,
}: PresentationSlideViewProps) {
  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === totalSlidesCount - 1;
  const isExercise = slide.slideKind === 'exercise' || slide.exerciseItem !== undefined;
  const exerciseNumber = slide.exerciseItem?.number;
  const sectionTheme = SECTION_THEMES[slide.moduleId] ?? SECTION_THEMES['module-0-prelude'];

  const bulletItemCount = slide.theoryData?.bulletPoints?.length ?? 0;
  const bulletAverageLength = bulletItemCount > 0
    ? (slide.theoryData?.bulletPoints?.reduce((acc, str) => acc + str.length, 0) ?? 0) / bulletItemCount
    : 0;
  const bulletTypography = getBulletTypographyConfig(
    bulletItemCount,
    bulletAverageLength,
    sectionTheme.stepBadgeClass,
    sectionTheme.accentSurfaceClass,
  );
  const summaryTypographyClass = getSummaryTypographyClass(
    slide.theoryData?.summary?.length ?? 0,
    sectionTheme.titleTextClass,
  );
  const formulaCount = slide.theoryData?.formulas?.length ?? 0;
  const formulaGridColsClass = getFormulaGridColsClass(formulaCount);

  return (
    <SectionThemeContext.Provider value={sectionTheme}>
      <div
        tabIndex={0}
        role="region"
        aria-label={`${slide.moduleTitle}: ${slide.conceptTitle}`}
        className="flex h-full w-full flex-col justify-between rounded-none bg-white p-2.5 sm:p-3 md:p-3.5 transition-all outline-none dark:bg-zinc-900 overflow-hidden"
      >
        <div className={`shrink-0 border-b pb-2.5 ${sectionTheme.cardBorderClass} flex items-center justify-between gap-3`}>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`rounded-md px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${sectionTheme.slideBadgeClass}`}>
                {isExercise && exerciseNumber !== undefined
                  ? `Ejercicio #${exerciseNumber}`
                  : `Diapositiva #${moduleSlideIndex + 1}`}
              </span>
              <h1 className={`text-xs sm:text-sm font-black uppercase tracking-wider truncate ${sectionTheme.slideHeaderClass}`}>
                {slide.moduleTitle}
              </h1>
            </div>
            <h2 className={`text-lg sm:text-xl md:text-2xl font-black truncate mt-0.5 ${sectionTheme.titleTextClass}`}>
              {slide.conceptTitle}
            </h2>
          </div>

        <div className="shrink-0 flex items-center gap-2">
          <div className={`rounded-xl border px-3.5 py-1 text-center ${sectionTheme.counterBoxClass}`}>
            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider leading-none opacity-80">
              {isExercise && exerciseNumber !== undefined ? 'Ejercicio' : 'Diapositiva'}
            </div>
            <div className="font-mono text-sm sm:text-base md:text-lg font-black leading-tight">
              {isExercise && exerciseNumber !== undefined ? (
                `#${exerciseNumber}`
              ) : (
                <>
                  {moduleSlideIndex + 1}{' '}
                  <span className="text-xs font-normal opacity-60">/ {moduleSlidesCount}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="my-2 flex-1 min-h-0 flex flex-col overflow-hidden pr-0.5">
        {slide.slideKind === 'quote' && slide.quoteData && (
          <div className={`h-full min-h-0 flex-1 flex flex-col justify-between rounded-2xl border p-5 sm:p-7 shadow-lg overflow-hidden ${sectionTheme.quoteCardClass}`}>
            <div className={`shrink-0 flex items-center justify-between border-b pb-2.5 ${sectionTheme.cardBorderClass}`}>
              <div className="flex items-center gap-2">
                <Quote className={`h-5 w-5 ${sectionTheme.bulletMarkerClass}`} />
                <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${sectionTheme.slideHeaderClass}`}>
                  {slide.conceptSubtitle || 'Epígrafe'}
                </span>
              </div>
              <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${sectionTheme.slideBadgeClass}`}>
                Epígrafe
              </span>
            </div>

            <div className="my-auto py-3 px-2 sm:px-6 flex flex-col items-center text-center">
              <p className={`text-lg sm:text-2xl md:text-3xl font-serif italic font-semibold leading-relaxed max-w-4xl ${sectionTheme.titleTextClass}`}>
                “{slide.quoteData.quote}”
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className={`text-xs sm:text-sm md:text-base font-black ${sectionTheme.slideHeaderClass}`}>
                  — {slide.quoteData.author}
                </span>
                {slide.quoteData.source && (
                  <span className="text-[11px] sm:text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    · {slide.quoteData.source}
                  </span>
                )}
              </div>
            </div>

            {slide.quoteData.pedagogicalContext && (
              <div className={`shrink-0 rounded-xl border p-3 sm:p-3.5 shadow-xs ${sectionTheme.accentSurfaceClass}`}>
                <span className={`block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-0.5 ${sectionTheme.slideHeaderClass}`}>
                  Enfoque Didáctico de la Cátedra
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
                  {slide.quoteData.pedagogicalContext}
                </p>
              </div>
            )}
          </div>
        )}

        {slide.slideKind === 'visualizer' && slide.visualizerId && (
          <div className="min-h-full flex-1 flex flex-col">
            {VISUALIZER_LOOKUP[slide.visualizerId]?.()}
          </div>
        )}

        {slide.slideKind === 'theory' && slide.theoryData && (
          <div className="min-h-full flex-1 flex flex-col justify-between gap-2.5 sm:gap-3 overflow-hidden">
            {formulaCount > 0 ? (
              <>
                <div className={`shrink-0 rounded-2xl border p-2.5 sm:p-3 flex flex-col justify-start gap-2 shadow-xs overflow-hidden ${sectionTheme.formulaContainerClass}`}>
                  {slide.theoryData.summary &&
                    renderSummaryContent(slide.theoryData.summary, summaryTypographyClass, sectionTheme)}

                  <div className={`grid gap-2 ${formulaGridColsClass}`}>
                    {slide.theoryData.formulas?.map((formula) => (
                      <div
                        key={formula.label}
                        className={`rounded-xl border px-3 py-1.5 sm:py-2 flex flex-col justify-between ${sectionTheme.formulaCardClass}`}
                      >
                        <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wide ${sectionTheme.formulaLabelClass}`}>
                          {formula.label}
                        </p>
                        <MathFormula
                          expression={formula.latex}
                          displayMode
                          className={`${sectionTheme.titleTextClass} text-xs sm:text-sm my-0.5`}
                        />
                        <p className={`text-[10px] sm:text-xs leading-tight ${sectionTheme.formulaDescriptionClass}`}>
                          {formula.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {slide.theoryData.bulletPoints && slide.theoryData.bulletPoints.length > 0 && (
                  <div className={`flex-1 min-h-0 rounded-2xl border bg-white dark:bg-zinc-900 p-3 sm:p-3.5 flex flex-col justify-start shadow-xs overflow-hidden ${sectionTheme.cardBorderClass}`}>
                    <ul className={bulletTypography.listGapClass}>
                      {slide.theoryData.bulletPoints.map((pointText, index) => (
                        <li
                          key={index}
                          style={{ flex: `${getBulletFlexWeight(pointText)} 1 0%` }}
                          className={`${bulletTypography.itemClass} overflow-hidden`}
                        >
                          <span className={bulletTypography.badgeClass}>{index + 1}</span>
                          <div className="flex-1 min-w-0 my-auto">
                            {renderFormattedPoint(
                              pointText,
                              bulletTypography.textClass,
                              sectionTheme,
                              bulletTypography.subTextClass,
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className={`min-h-full flex-1 flex flex-col justify-start rounded-2xl border bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-xs overflow-hidden ${sectionTheme.cardBorderClass}`}>
                {slide.theoryData.summary && (
                  <div className={`shrink-0 border-b pb-2.5 mb-3 ${sectionTheme.cardBorderClass}`}>
                    {renderSummaryContent(slide.theoryData.summary, summaryTypographyClass, sectionTheme)}
                  </div>
                )}

                {slide.theoryData.bulletPoints && slide.theoryData.bulletPoints.length > 0 && (
                  <ul className={bulletTypography.listGapClass}>
                    {slide.theoryData.bulletPoints.map((pointText, index) => (
                      <li
                        key={index}
                        style={{ flex: `${getBulletFlexWeight(pointText)} 1 0%` }}
                        className={`${bulletTypography.itemClass} overflow-hidden`}
                      >
                        <span className={bulletTypography.badgeClass}>{index + 1}</span>
                        <div className="flex-1 min-w-0 my-auto">
                          {renderFormattedPoint(
                            pointText,
                            bulletTypography.textClass,
                            sectionTheme,
                            bulletTypography.subTextClass,
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {slide.theoryData.callout ? (
                  <div className="shrink-0 mt-2.5 rounded-xl border-2 border-amber-400 bg-white p-3 sm:p-3.5 shadow-xs dark:border-amber-400 dark:bg-zinc-900">
                    <p className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-0.5">
                      {slide.theoryData.callout.title}
                    </p>
                    <p className="text-xs sm:text-sm md:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      {slide.theoryData.callout.text}
                    </p>
                  </div>
                ) : slide.theoryData.keyInsight ? (
                  <div className={`shrink-0 mt-2.5 rounded-xl border p-2.5 sm:p-3 ${sectionTheme.accentSurfaceClass}`}>
                    <p className={`text-[11px] sm:text-xs font-medium ${sectionTheme.strongTextClass}`}>
                      <span className={`font-bold ${sectionTheme.slideHeaderClass}`}>Invariante Pedagógico: </span>
                      {slide.theoryData.keyInsight}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        {(slide.slideKind === 'pseudocode' || slide.slideKind === 'code') && slide.codeSnippet && (
          <div className="h-full min-h-0 flex-1 flex flex-col">
            <IdeCodeBlock
              key={`${slide.id}-${slide.codeSnippet.preferredLanguage}`}
              title={slide.codeSnippet.title}
              snippets={slide.codeSnippet.snippets}
              initialLanguage={slide.codeSnippet.preferredLanguage}
              sectionTheme={sectionTheme}
            />
          </div>
        )}

        {slide.slideKind === 'complexity' && slide.complexityData && (
          <div className="h-full min-h-0 flex-1 flex flex-col lg:flex-row gap-3 overflow-hidden">
            {slide.codeSnippet ? (
              <>
                <div className="flex-1 min-w-0 min-h-0 flex flex-col h-full">
                  <AnnotatedCodeBlock
                    key={`${slide.id}-${slide.codeSnippet.preferredLanguage}`}
                    title={slide.codeSnippet.title}
                    snippets={slide.codeSnippet.snippets}
                    annotations={slide.complexityData.annotations || []}
                    initialLanguage={slide.codeSnippet.preferredLanguage}
                    showAnnotationsDefault={true}
                    sectionTheme={sectionTheme}
                  />
                </div>

                <div className={`shrink-0 lg:w-80 xl:w-96 flex flex-col justify-between gap-1.5 sm:gap-2 rounded-2xl border p-2.5 sm:p-3 overflow-hidden ${sectionTheme.analysisPanelClass}`}>
                  <div className={`border-b pb-1.5 flex items-center justify-between shrink-0 ${sectionTheme.analysisDividerClass}`}>
                    <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${sectionTheme.analysisAccentTextClass}`}>
                      Análisis Asintótico
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-transparent px-2 py-0.5 rounded border-2 border-amber-400">
                      Cotas en Amarillo
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 shrink-0">
                    <div className={`rounded-xl border p-1.5 sm:p-2 ${sectionTheme.analysisSubcardClass}`}>
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                        Tiempo (Peor)
                      </span>
                      <div className={`mt-0.5 text-xs sm:text-sm md:text-base font-black ${sectionTheme.titleTextClass}`}>
                        <MathFormula expression={slide.complexityData.temporalLatex} />
                      </div>
                    </div>

                    <div className={`rounded-xl border p-1.5 sm:p-2 ${sectionTheme.analysisSubcardClass}`}>
                      <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wide">
                        Espacio Auxiliar
                      </span>
                      <div className={`mt-0.5 text-xs sm:text-sm md:text-base font-black ${sectionTheme.titleTextClass}`}>
                        <MathFormula expression={slide.complexityData.spatialLatex} />
                      </div>
                    </div>
                  </div>

                  {slide.complexityData.bestCaseLatex && slide.complexityData.worstCaseLatex && (
                    <div className={`rounded-xl border p-1.5 shrink-0 ${sectionTheme.analysisSubcardClass}`}>
                      <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wide ${sectionTheme.analysisAccentTextClass}`}>
                        Desglose por Casos
                      </span>
                      <div className="mt-1 grid grid-cols-3 gap-1 text-center">
                        <div className={`rounded-lg p-1 border ${sectionTheme.analysisInnerCellClass}`}>
                          <span className={`block text-[8px] sm:text-[9px] uppercase font-bold ${sectionTheme.analysisAccentTextClass}`}>Mejor</span>
                          <div className={`text-[11px] sm:text-xs font-bold mt-0.5 ${sectionTheme.titleTextClass}`}>
                            <MathFormula expression={slide.complexityData.bestCaseLatex} />
                          </div>
                        </div>
                        <div className={`rounded-lg p-1 border ${sectionTheme.analysisInnerCellClass}`}>
                          <span className={`block text-[8px] sm:text-[9px] uppercase font-bold ${sectionTheme.analysisAccentTextClass}`}>Promedio</span>
                          <div className={`text-[11px] sm:text-xs font-bold mt-0.5 ${sectionTheme.titleTextClass}`}>
                            <MathFormula expression={slide.complexityData.averageCaseLatex || slide.complexityData.temporalLatex} />
                          </div>
                        </div>
                        <div className={`rounded-lg p-1 border ${sectionTheme.analysisInnerCellClass}`}>
                          <span className={`block text-[8px] sm:text-[9px] uppercase font-bold ${sectionTheme.analysisAccentTextClass}`}>Peor</span>
                          <div className={`text-[11px] sm:text-xs font-bold mt-0.5 ${sectionTheme.titleTextClass}`}>
                            <MathFormula expression={slide.complexityData.worstCaseLatex} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {slide.complexityData.theoremApplied && (
                    <div className={`rounded-xl border p-1.5 shrink-0 ${sectionTheme.analysisSubcardClass}`}>
                      <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wide mb-0.5 ${sectionTheme.analysisAccentTextClass}`}>
                        Ecuación de Recurrencia / Deducción
                      </p>
                      <div className={`text-[11px] sm:text-xs font-semibold overflow-x-auto overflow-y-hidden py-0.5 ${sectionTheme.titleTextClass}`}>
                        <MathFormula expression={slide.complexityData.theoremApplied} />
                      </div>
                    </div>
                  )}

                  <div className={`rounded-xl border p-2 sm:p-2.5 flex-1 min-h-0 flex flex-col justify-center ${sectionTheme.analysisSubcardClass}`}>
                    <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wide mb-0.5 ${sectionTheme.analysisAccentTextClass}`}>
                      Justificación Analítica
                    </p>
                    <p className="text-[11px] sm:text-xs leading-relaxed text-zinc-700 dark:text-zinc-200">
                      {slide.complexityData.justification}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 h-full flex-1 min-h-0">
                <div className={`rounded-xl border p-4 flex flex-col justify-between ${sectionTheme.analysisPanelClass}`}>
                  <div className={`border-b pb-2 ${sectionTheme.analysisDividerClass}`}>
                    <span className={`text-xs font-black uppercase tracking-wider ${sectionTheme.analysisAccentTextClass}`}>
                      Órdenes Asintóticos
                    </span>
                  </div>
                  <div className="my-auto space-y-3">
                    <div className={`rounded-xl border p-3 ${sectionTheme.analysisSubcardClass}`}>
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase">
                        Tiempo
                      </span>
                      <div className={`mt-1 text-base sm:text-lg font-bold ${sectionTheme.titleTextClass}`}>
                        <MathFormula expression={slide.complexityData.temporalLatex} />
                      </div>
                    </div>
                    <div className={`rounded-xl border p-3 ${sectionTheme.analysisSubcardClass}`}>
                      <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase">
                        Espacio
                      </span>
                      <div className={`mt-1 text-base sm:text-lg font-bold ${sectionTheme.titleTextClass}`}>
                        <MathFormula expression={slide.complexityData.spatialLatex} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`flex flex-col justify-between rounded-xl border p-4 shadow-xs ${sectionTheme.accentSurfaceClass}`}>
                  <div>
                    <div className={`border-b pb-2 mb-3 ${sectionTheme.cardBorderClass}`}>
                      <span className={`text-xs font-black uppercase tracking-wider ${sectionTheme.slideHeaderClass}`}>
                        Análisis y Justificación
                      </span>
                    </div>
                    {slide.complexityData.theoremApplied && (
                      <div className="mb-3">
                        <p className={`text-xs font-bold uppercase ${sectionTheme.slideHeaderClass}`}>
                          Recurrencia / Teorema
                        </p>
                        <p className={`mt-1 text-xs sm:text-sm font-semibold ${sectionTheme.titleTextClass}`}>
                          {slide.complexityData.theoremApplied}
                        </p>
                      </div>
                    )}
                    <p className={`text-xs font-bold uppercase ${sectionTheme.slideHeaderClass}`}>
                      Justificación
                    </p>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {slide.complexityData.justification}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {slide.slideKind === 'exercise' && slide.exerciseItem && (
          <div className="flex h-full min-h-0 flex-1 flex-col gap-3 overflow-y-auto lg:flex-row">
            <div className={`shrink-0 space-y-2.5 rounded-xl border p-3 overflow-y-auto lg:w-[30%] ${sectionTheme.accentSurfaceClass}`}>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:bg-amber-900/40 dark:text-amber-300">
                  {slide.exerciseItem.paradigm}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${sectionTheme.slideBadgeClass}`}>
                  {slide.exerciseItem.difficultyLabel}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${sectionTheme.formulaCardClass}`}>
                  Objetivo: <MathFormula expression={slide.exerciseItem.targetComplexityLatex} />
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-line">
                {slide.exerciseItem.problemStatement}
              </p>
              <ExerciseVisualResource
                resource={slide.exerciseItem.recursoVisual}
                exerciseId={slide.exerciseItem.id}
              />
              <div className={`rounded-lg border bg-white/80 p-2.5 text-xs font-semibold dark:bg-zinc-900 ${sectionTheme.cardBorderClass} ${sectionTheme.strongTextClass}`}>
                {slide.exerciseItem.inputOutputExample}
              </div>
            </div>

            <div className="flex-1 min-w-0 min-h-0 h-full flex flex-col overflow-y-auto">
              <ExerciseWorkspace
                exerciseId={slide.exerciseItem.id}
                exerciseTitle={slide.exerciseItem.title}
              />
            </div>
          </div>
        )}
      </div>

      <footer className={`shrink-0 border-t pt-2.5 ${sectionTheme.cardBorderClass} flex items-center justify-between gap-3`}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNavigatePrevious}
            disabled={isFirstSlide}
            aria-label="Diapositiva anterior"
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${sectionTheme.secondaryButtonClass}`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Anterior</span>
          </button>

          <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${sectionTheme.counterBoxClass}`}>
            {isExercise && exerciseNumber !== undefined
              ? `Ejercicio #${exerciseNumber}`
              : `Diapositiva ${moduleSlideIndex + 1} / ${moduleSlidesCount}`}
          </span>

          <button
            type="button"
            onClick={onNavigateNext}
            disabled={isLastSlide}
            aria-label="Diapositiva siguiente"
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shadow-xs transition disabled:cursor-not-allowed disabled:opacity-40 ${sectionTheme.primaryButtonClass}`}
          >
            <span>Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 truncate">
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 truncate">
            {slide.conceptSubtitle}
          </span>
          <span className="hidden md:inline-block rounded-md bg-zinc-200/60 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-500">
            ← / →
          </span>
        </div>
      </footer>
      </div>
    </SectionThemeContext.Provider>
  );
}

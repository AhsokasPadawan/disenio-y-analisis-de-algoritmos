import { CodeComplexityAnnotation } from '../components/AnnotatedCodeBlock';
import { MODULE_0_COMPLETE_SLIDES } from '../data/module0PreludeDeckData';
import { MODULE_1_COMPLETE_SLIDES } from '../data/module1CompleteDeckData';
import { MODULE_2_COMPLETE_SLIDES } from '../data/module2CompleteDeckData';
import { MODULE_3_COMPLETE_SLIDES } from '../data/module3CompleteDeckData';
import { MODULE_4_COMPLETE_SLIDES } from '../data/module4CompleteDeckData';
import { MODULE_NAVIGATION_LIST, STUDY_MODULES_BY_ID } from '../data/courseModulesData';
import { EXAM_EXERCISES_LIST } from '../data/examExercisesData';
import {
  AlgorithmShowcaseItem,
  ConceptCardItem,
  ExamExerciseItem,
  ModuleId,
  OpeningQuoteData,
} from './courseTypes';

export type SlideKind =
  | 'theory'
  | 'quote'
  | 'visualizer'
  | 'pseudocode'
  | 'code'
  | 'complexity'
  | 'exercise';

export interface ConceptSlide {
  id: string;
  moduleId: ModuleId;
  moduleTitle: string;
  conceptTitle: string;
  conceptSubtitle: string;
  badgeLabel: string;
  slideKind: SlideKind;
  partIndex: number;
  totalParts: number;
  visualizerId?: string;
  exerciseItem?: ExamExerciseItem;
  quoteData?: OpeningQuoteData;
  theoryData?: {
    summary: string;
    bulletPoints?: string[];
    formulas?: { label: string; latex: string; description: string }[];
    keyInsight?: string;
    stepByStepSummary?: string[];
    callout?: {
      title: string;
      text: string;
    };
  };
  codeSnippet?: {
    title: string;
    snippets: {
      pseudocode: string;
      java: string;
      python: string;
    };
    preferredLanguage: 'pseudocode' | 'java' | 'python';
  };
  complexityData?: {
    temporalLatex: string;
    spatialLatex: string;
    justification: string;
    theoremApplied?: string;
    bestCaseLatex?: string;
    averageCaseLatex?: string;
    worstCaseLatex?: string;
    annotations?: CodeComplexityAnnotation[];
  };
}

const ALGORITHM_VISUALIZER_MAP: Record<string, { id: string; title: string }> = {
  'merge-sort': { id: 'mergesort-tree', title: 'Árbol de División y Mezcla MergeSort' },
  'quick-sort': { id: 'quicksort-partition', title: 'Partición Hoare con Punteros y Pivote' },
  'majority-element-pseudo-m': { id: 'pseudo-m-majority', title: 'Reducción por Emparejamiento y Verificación' },
  'dijkstra-algorithm': { id: 'dijkstra-graph', title: 'Grafo y Vectores Sincronizados Dijkstra' },
  'prim-mst': { id: 'prim-vs-kruskal', title: 'Comparativa Prim vs Kruskal Paso a Paso' },
  'kruskal-mst': { id: 'prim-vs-kruskal', title: 'Comparativa Prim vs Kruskal Paso a Paso' },
  'knapsack-01': { id: 'knapsack-01-dp', title: 'Matriz DP Mochila 0-1 con Backtracking' },
  'floyd-warshall': { id: 'floyd-warshall', title: 'Matrices de Distancias Floyd-Warshall con Nodo Puente' },
  'lcs-and-coin-change': { id: 'lcs-table', title: 'Matriz LCS con Punteros de Reconstrucción' },
  'backtracking-n-queens': { id: 'n-queens', title: 'Tablero 4x4 N-Reinas con Chequeo de Diagonales' },
  'minmax-alpha-beta': { id: 'minmax-alphabeta', title: 'Árbol de Juegos Min-Max y Poda Alfa-Beta' },
};

const CONCEPT_VISUALIZER_MAP: Record<string, { id: string; title: string }> = {
  'asymptotic-notations': { id: 'asymptotic-bounds', title: 'Cotas Asintóticas Theta(n^3) y Umbral n0=3' },
  'complexity-classes-p-np': { id: 'complexity-classes', title: 'Diagramas de Euler Clases P, NP, NPC y NP-hard' },
  'dnc-general-structure': { id: 'factorial-call-stack', title: 'Pila de Ejecución Recursiva Factorial(4)' },
  'greedy-components': { id: 'huffman-tree', title: 'Construcción del Árbol de Huffman con Min-Heap' },
  'optimality-principle': { id: 'fibonacci-memo', title: 'Árbol Exponencial vs Tabla Memoizada Fibonacci' },
  'dp-classic-problems-overview': { id: 'coin-change-dp', title: 'Fallo Voraz vs Óptimo DP y Matriz de Cambio' },
  'backtracking-vs-bnb': { id: 'astar-vs-ucs', title: 'Comparativa Gráfica Búsqueda UCS vs A*' },
  'minmax-alpha-beta-concept': { id: 'minmax-alphabeta', title: 'Árbol de Juegos Min-Max y Poda Alfa-Beta' },
};

function buildConceptCardSlides(
  moduleId: ModuleId,
  moduleTitle: string,
  concept: ConceptCardItem,
): ConceptSlide[] {
  const slides: ConceptSlide[] = [
    {
      id: `${concept.id}-theory`,
      moduleId,
      moduleTitle,
      conceptTitle: concept.title,
      conceptSubtitle: concept.badgeText,
      badgeLabel: 'Fundamento Teórico',
      slideKind: 'theory',
      partIndex: 1,
      totalParts: CONCEPT_VISUALIZER_MAP[concept.id] ? 2 : 1,
      theoryData: {
        summary: concept.summary,
        bulletPoints: concept.bulletPoints,
        formulas: concept.formulas,
      },
    },
  ];

  const visualizerSpec = CONCEPT_VISUALIZER_MAP[concept.id];
  if (visualizerSpec) {
    slides.push({
      id: `${concept.id}-visualizer`,
      moduleId,
      moduleTitle,
      conceptTitle: visualizerSpec.title,
      conceptSubtitle: concept.title,
      badgeLabel: 'Simulación / Visualización',
      slideKind: 'visualizer',
      partIndex: 2,
      totalParts: 2,
      visualizerId: visualizerSpec.id,
    });
  }

  return slides;
}

function buildAlgorithmSlides(
  moduleId: ModuleId,
  moduleTitle: string,
  algorithm: AlgorithmShowcaseItem,
): ConceptSlide[] {
  const baseTitle = algorithm.name;
  const subtitle = algorithm.paradigmTag;
  const visualizerSpec = ALGORITHM_VISUALIZER_MAP[algorithm.id];
  const isSplitCodeAlgorithm = algorithm.id === 'minmax-alpha-beta';
  const totalParts = visualizerSpec ? (isSplitCodeAlgorithm ? 5 : 4) : 3;

  const complexityData = {
    temporalLatex: algorithm.worstCaseComplexityLatex,
    spatialLatex: algorithm.spaceComplexityLatex,
    bestCaseLatex: algorithm.bestCaseComplexityLatex,
    averageCaseLatex: algorithm.averageCaseComplexityLatex,
    worstCaseLatex: algorithm.worstCaseComplexityLatex,
    justification: algorithm.keyInsight,
    theoremApplied: algorithm.recurrenceOrEquationLatex,
  };

  const slides: ConceptSlide[] = [
    {
      id: `${algorithm.id}-theory`,
      moduleId,
      moduleTitle,
      conceptTitle: baseTitle,
      conceptSubtitle: subtitle,
      badgeLabel: '1. Explicación Teórica',
      slideKind: 'theory',
      partIndex: 1,
      totalParts,
      theoryData: {
        summary: algorithm.keyInsight,
        bulletPoints: algorithm.stepByStepSummary,
        formulas: [
          {
            label: 'Ecuación / Recurrencia Característica',
            latex: algorithm.recurrenceOrEquationLatex,
            description: 'Costo recurrente o relación de transición fundamental.',
          },
        ],
        keyInsight: algorithm.keyInsight,
        stepByStepSummary: algorithm.stepByStepSummary,
      },
    },
  ];

  if (visualizerSpec) {
    slides.push({
      id: `${algorithm.id}-visualizer`,
      moduleId,
      moduleTitle,
      conceptTitle: visualizerSpec.title,
      conceptSubtitle: baseTitle,
      badgeLabel: '2. Visualizador Paso a Paso',
      slideKind: 'visualizer',
      partIndex: 2,
      totalParts,
      visualizerId: visualizerSpec.id,
    });
  }

  const offset = visualizerSpec ? 1 : 0;

  slides.push(
    {
      id: `${algorithm.id}-pseudocode`,
      moduleId,
      moduleTitle,
      conceptTitle: baseTitle,
      conceptSubtitle: subtitle,
      badgeLabel: `${2 + offset}. Pseudocódigo`,
      slideKind: 'pseudocode',
      partIndex: 2 + offset,
      totalParts,
      codeSnippet: {
        title: `${baseTitle} (Pseudocódigo)`,
        snippets: algorithm.codeSnippets,
        preferredLanguage: 'pseudocode',
      },
      complexityData,
    },
  );

  if (isSplitCodeAlgorithm) {
    slides.push(
      {
        id: `${algorithm.id}-code-max`,
        moduleId,
        moduleTitle,
        conceptTitle: `${baseTitle}: Rama MAX y Poda Beta`,
        conceptSubtitle: subtitle,
        badgeLabel: `${3 + offset}. Código: Nodo MAX`,
        slideKind: 'code',
        partIndex: 3 + offset,
        totalParts,
        codeSnippet: {
          title: `${baseTitle} (Rama MAX y Poda Beta)`,
          snippets: {
            java:
              'public class PodaAlfaBeta {\n    public static final int MAX = 1;\n    public static final int MIN = -1;\n    public static final int INF = 1000000000;\n\n    public static int evaluarNodoMax(NodoJuego e, int alfa, int beta) {\n        if (e.esHoja()) return e.getResultado();\n        int val = -INF;\n        for (NodoJuego sig : e.getHijos()) {\n            val = Math.max(val, algoritmoAB(sig, MIN, alfa, beta));\n            alfa = Math.max(alfa, val);\n            if (beta <= alfa) break;\n        }\n        return val;\n    }\n}',
            pseudocode:
              'algoritmo AB_Max(e: estado, alfa: real, beta: real)\n    si hoja(e) entonces return result(e)\n    val = -inf\n    foreach sig en son(e) do\n        val = max(val, AB_Min(sig, alfa, beta))\n        alfa = max(alfa, val)\n        si beta <= alfa entonces break\n    endforeach\n    return val',
            python:
              'def evaluar_nodo_max(e, alfa, beta):\n    if e.es_hoja(): return e.get_resultado()\n    val = float("-inf")\n    for sig in e.get_hijos():\n        val = max(val, algoritmo_ab(sig, MIN, alfa, beta))\n        alfa = max(alfa, val)\n        if beta <= alfa: break\n    return val',
          },
          preferredLanguage: 'java',
        },
        complexityData,
      },
      {
        id: `${algorithm.id}-code-min`,
        moduleId,
        moduleTitle,
        conceptTitle: `${baseTitle}: Rama MIN y Poda Alfa`,
        conceptSubtitle: subtitle,
        badgeLabel: `${4 + offset}. Código: Nodo MIN`,
        slideKind: 'code',
        partIndex: 4 + offset,
        totalParts,
        codeSnippet: {
          title: `${baseTitle} (Rama MIN y Poda Alfa)`,
          snippets: {
            java:
              'public class PodaAlfaBeta {\n    public static final int INF = 1000000000;\n\n    public static int evaluarNodoMin(NodoJuego e, int alfa, int beta) {\n        if (e.esHoja()) return e.getResultado();\n        int val = INF;\n        for (NodoJuego sig : e.getHijos()) {\n            val = Math.min(val, algoritmoAB(sig, MAX, alfa, beta));\n            beta = Math.min(beta, val);\n            if (beta <= alfa) break;\n        }\n        return val;\n    }\n}',
            pseudocode:
              'algoritmo AB_Min(e: estado, alfa: real, beta: real)\n    si hoja(e) entonces return result(e)\n    val = +inf\n    foreach sig en son(e) do\n        val = min(val, AB_Max(sig, alfa, beta))\n        beta = min(beta, val)\n        si beta <= alfa entonces break\n    endforeach\n    return val',
            python:
              'def evaluar_nodo_min(e, alfa, beta):\n    if e.es_hoja(): return e.get_resultado()\n    val = float("inf")\n    for sig in e.get_hijos():\n        val = min(val, algoritmo_ab(sig, MAX, alfa, beta))\n        beta = min(beta, val)\n        if beta <= alfa: break\n    return val',
          },
          preferredLanguage: 'java',
        },
        complexityData,
      },
    );
  } else {
    slides.push({
      id: `${algorithm.id}-code`,
      moduleId,
      moduleTitle,
      conceptTitle: baseTitle,
      conceptSubtitle: subtitle,
      badgeLabel: `${3 + offset}. Implementación Java / Python`,
      slideKind: 'code',
      partIndex: 3 + offset,
      totalParts,
      codeSnippet: {
        title: `${baseTitle} (Código Ejecutable)`,
        snippets: algorithm.codeSnippets,
        preferredLanguage: 'java',
      },
      complexityData,
    });
  }

  return slides;
}

function buildExamExerciseSlides(
  moduleId: ModuleId,
  moduleTitle: string,
  exercise: ExamExerciseItem,
): ConceptSlide[] {
  return [
    {
      id: `${exercise.id}-workspace`,
      moduleId,
      moduleTitle,
      conceptTitle: exercise.title,
      conceptSubtitle: `${exercise.paradigm} · ${exercise.difficultyLabel}`,
      badgeLabel: 'Consigna y Práctica',
      slideKind: 'exercise',
      partIndex: 1,
      totalParts: 1,
      exerciseItem: exercise,
    },
  ];
}

export function buildCourseDeckSlides(): ConceptSlide[] {
  const deck: ConceptSlide[] = [];

  for (const moduleItem of MODULE_NAVIGATION_LIST) {
    if (moduleItem.id === 'module-0-prelude') {
      deck.push(...MODULE_0_COMPLETE_SLIDES);
    } else if (moduleItem.id === 'module-1-complexity') {
      deck.push(...MODULE_1_COMPLETE_SLIDES);
    } else if (moduleItem.id === 'module-2-divide-and-conquer') {
      deck.push(...MODULE_2_COMPLETE_SLIDES);
    } else if (moduleItem.id === 'module-6-exam-exercises') {
      for (const exercise of EXAM_EXERCISES_LIST) {
        deck.push(...buildExamExerciseSlides(moduleItem.id, moduleItem.headerTitle, exercise));
      }
    } else if (moduleItem.id === 'module-3-greedy-and-graphs') {
      deck.push(...MODULE_3_COMPLETE_SLIDES);
    } else if (moduleItem.id === 'module-4-dynamic-programming') {
      deck.push(...MODULE_4_COMPLETE_SLIDES);
    } else {
      const moduleData = STUDY_MODULES_BY_ID[moduleItem.id];
      for (const concept of moduleData.concepts) {
        deck.push(...buildConceptCardSlides(moduleItem.id, moduleItem.headerTitle, concept));
      }
      for (const algorithm of moduleData.algorithms) {
        deck.push(...buildAlgorithmSlides(moduleItem.id, moduleItem.headerTitle, algorithm));
      }
    }
  }

  return deck;
}

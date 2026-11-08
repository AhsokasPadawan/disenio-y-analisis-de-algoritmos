import { ExamParadigmCategory, ModuleId } from './courseTypes';

export interface ModuleSubtopicItem {
  id: string;
  title: string;
  slideId?: string;
  paradigm?: ExamParadigmCategory;
}

export const MODULE_SUBTOPICS_LOOKUP: Record<ModuleId, ModuleSubtopicItem[]> = {
  'module-0-prelude': [
    {
      id: 'm0-sub-contrato',
      title: 'Aprender a Nadar (Contrato)',
      slideId: 'm0-apertura-quote',
    },
    {
      id: 'm0-sub-reglas',
      title: 'Reglas de Cursada y Exámenes',
      slideId: 'm0-reglas-juego-theory',
    },
    {
      id: 'm0-sub-metodologia',
      title: 'Diagnóstico y Enfoque Activo',
      slideId: 'm0-diagnostico-theory',
    },
    {
      id: 'm0-sub-familias',
      title: 'Las 4 Familias Algorítmicas',
      slideId: 'm0-mapa-tecnicas-theory',
    },
  ],
  'module-1-complexity': [
    {
      id: 'm1-sub-invarianza',
      title: 'Principio de Invarianza',
      slideId: 'm1-apertura-quote',
    },
    {
      id: 'm1-sub-definicion',
      title: 'Definición Formal y Conteo',
      slideId: 'm1-definicion-algoritmo-theory',
    },
    {
      id: 'm1-sub-busqueda-lineal',
      title: 'Búsqueda Lineal y Casos',
      slideId: 'm1-busqueda-lineal-theory',
    },
    {
      id: 'm1-sub-recursion',
      title: 'Recursión y Pila de Llamadas',
      slideId: 'm1-recursion-theory',
    },
    {
      id: 'm1-sub-factorial',
      title: 'Factorial Recursivo',
      slideId: 'm1-factorial-visual',
    },
    {
      id: 'm1-sub-busqueda-binaria',
      title: 'Búsqueda Binaria Recursiva',
      slideId: 'm1-binrec-theory',
    },
    {
      id: 'm1-sub-notaciones',
      title: 'Notaciones Asintóticas (O, Ω, Θ)',
      slideId: 'm1-notaciones-theory',
    },
    {
      id: 'm1-sub-familias',
      title: 'Familias de Crecimiento',
      slideId: 'm1-familias-theory',
    },
    {
      id: 'm1-sub-recurrencias',
      title: 'Teorema de Recurrencias',
      slideId: 'm1-recurrencias-sustraccion-theory',
    },
    {
      id: 'm1-sub-clases',
      title: 'Tratabilidad y Clases P / NP',
      slideId: 'm1-tratabilidad-theory',
    },
  ],
  'module-2-divide-and-conquer': [
    {
      id: 'm2-sub-esquema',
      title: 'Esquema General D&C',
      slideId: 'm2-apertura-quote',
    },
    {
      id: 'm2-sub-abb',
      title: 'Suma de Nodos en ABB',
      slideId: 'm2-suma-nodos-abb-theory',
    },
    {
      id: 'm2-sub-potencia',
      title: 'Cálculo de Potencias',
      slideId: 'm2-potencia-optimizada-theory',
    },
    {
      id: 'm2-sub-busqueda-binaria',
      title: 'Búsqueda Binaria',
      slideId: 'm2-busqueda-binaria-theory',
    },
    {
      id: 'm2-sub-mergesort',
      title: 'MergeSort',
      slideId: 'm2-mergesort-theory',
    },
    {
      id: 'm2-sub-quicksort',
      title: 'QuickSort',
      slideId: 'm2-quicksort-theory',
    },
    {
      id: 'm2-sub-mayoritario',
      title: 'Elemento Mayoritario (Pseudo-M)',
      slideId: 'm2-elemento-mayoritario-theory',
    },
    {
      id: 'm2-sub-bridge',
      title: 'Torneo de Bridge (Round-Robin)',
      slideId: 'm2-torneo-bridge-theory',
    },
    {
      id: 'm2-sub-mps',
      title: 'Suma Parcial Máxima (MPS)',
      slideId: 'm2-mps-subarray-theory',
    },
    {
      id: 'm2-sub-strassen',
      title: 'Multiplicación de Strassen',
      slideId: 'm2-strassen-matrices-theory',
    },
    {
      id: 'm2-sub-palindromos',
      title: 'Detección de Palíndromos (S&C)',
      slideId: 'm2-palindromos-sac-theory',
    },
    {
      id: 'm2-sub-hanoi',
      title: 'Torres de Hanoi',
      slideId: 'm2-torres-hanoi-theory',
    },
    {
      id: 'm2-sub-fibonacci',
      title: 'Fibonacci Recursivo',
      slideId: 'm2-fibonacci-patologia-theory',
    },
  ],
  'module-3-greedy-and-graphs': [
    {
      id: 'm3-sub-fundamentos',
      title: 'Fundamentos y Esquema Voraz',
      slideId: 'm3-epigrafe-friedman-quote',
    },
    {
      id: 'm3-sub-cambio-monedas',
      title: 'Cambio de Monedas',
      slideId: 'm3-cambio-monedas-theory',
    },
    {
      id: 'm3-sub-mochila',
      title: 'Mochila Fraccionaria',
      slideId: 'm3-mochila-fraccionaria-theory',
    },
    {
      id: 'm3-sub-huffman',
      title: 'Códigos de Huffman',
      slideId: 'm3-huffman-theory',
    },
    {
      id: 'm3-sub-gale-shapley',
      title: 'Gale-Shapley (Matrimonios)',
      slideId: 'm3-gale-shapley-theory',
    },
    {
      id: 'm3-sub-job-sequencing',
      title: 'Planificación con Plazos',
      slideId: 'm3-job-sequencing-theory',
    },
    {
      id: 'm3-sub-sjf',
      title: 'Minimización de Espera (SJF)',
      slideId: 'm3-sjf-theory',
    },
    {
      id: 'm3-sub-konigsberg',
      title: 'Puentes de Königsberg',
      slideId: 'm3-konigsberg-theory',
    },
    {
      id: 'm3-sub-dijkstra',
      title: 'Dijkstra (Caminos Mínimos)',
      slideId: 'dijkstra-algorithm-theory',
    },
    {
      id: 'm3-sub-prim',
      title: 'Prim (Árbol Recubrimiento Mínimo)',
      slideId: 'prim-mst-theory',
    },
    {
      id: 'm3-sub-kruskal',
      title: 'Kruskal (Union-Find)',
      slideId: 'kruskal-mst-theory',
    },
    {
      id: 'm3-sub-comparativa',
      title: 'Dijkstra vs Prim / Kruskal',
      slideId: 'shortest-paths-vs-mst-theory',
    },
  ],
  'module-4-dynamic-programming': [
    {
      id: 'm4-sub-principio-optimalidad',
      title: 'Principio de Bellman y Tabulación',
      slideId: 'm4-epigrafe-santayana-quote',
    },
    {
      id: 'm4-sub-fibonacci',
      title: 'Fibonacci Memoizado y Tabulado',
      slideId: 'm4-fibonacci-theory',
    },
    {
      id: 'm4-sub-cambio-monedas',
      title: 'Cambio de Monedas DP',
      slideId: 'm4-cambio-monedas-dp-theory',
    },
    {
      id: 'm4-sub-mochila',
      title: 'Mochila 0-1 DP',
      slideId: 'm4-mochila-01-dp-theory',
    },
    {
      id: 'm4-sub-lcs',
      title: 'Subsecuencia Común Más Larga (LCS)',
      slideId: 'm4-lcs-theory',
    },
    {
      id: 'm4-sub-lis',
      title: 'Subsecuencia Creciente Más Larga (LIS)',
      slideId: 'm4-lis-theory',
    },
    {
      id: 'm4-sub-matrix-chain',
      title: 'Multiplicación Encadenada de Matrices',
      slideId: 'm4-matrix-chain-theory',
    },
    {
      id: 'm4-sub-floyd',
      title: 'Floyd-Warshall (Todos a Todos)',
      slideId: 'm4-floyd-warshall-theory',
    },
    {
      id: 'm4-sub-tsp',
      title: 'Viajante de Comercio (Held-Karp)',
      slideId: 'm4-tsp-held-karp-theory',
    },
  ],
  'module-5-backtracking-and-bnb': [
    {
      id: 'm5-sub-comparativa',
      title: 'Backtracking (DFS) vs Branch & Bound',
      slideId: 'backtracking-vs-bnb-theory',
    },
    {
      id: 'm5-sub-n-queens',
      title: 'N-Reinas y Generación de Estados',
      slideId: 'backtracking-n-queens-theory',
    },
    {
      id: 'm5-sub-minmax',
      title: 'MinMax y Poda Alfa-Beta',
      slideId: 'minmax-alpha-beta-concept-theory',
    },
  ],
  'module-6-exam-exercises': [
    {
      id: 'm6-sub-complejidad',
      title: 'Complejidad y Recurrencias',
      paradigm: 'Complejidad',
    },
    {
      id: 'm6-sub-dyc',
      title: 'Divide & Conquer',
      paradigm: 'Divide & Conquer',
    },
    {
      id: 'm6-sub-greedy',
      title: 'Algoritmos Greedy',
      paradigm: 'Greedy',
    },
    {
      id: 'm6-sub-dp',
      title: 'Programación Dinámica',
      paradigm: 'Programación Dinámica',
    },
    {
      id: 'm6-sub-backtracking',
      title: 'Backtracking y Branch & Bound',
      paradigm: 'Backtracking / B&B',
    },
  ],
};

const PARADIGM_CANONICAL_LOOKUP: Partial<Record<ExamParadigmCategory, ExamParadigmCategory>> = {
  'Reducción y Conquista': 'Divide & Conquer',
  'Reconstrucción de Decisiones': 'Programación Dinámica',
};

export function resolveActiveSubtopicId(
  moduleId: ModuleId,
  moduleSlideIds: string[],
  activeSlideId?: string,
  activeExerciseParadigm?: ExamParadigmCategory,
): string | undefined {
  const subtopics = MODULE_SUBTOPICS_LOOKUP[moduleId] ?? [];
  if (subtopics.length === 0) {
    return undefined;
  }

  if (moduleId === 'module-6-exam-exercises') {
    if (!activeExerciseParadigm) {
      return undefined;
    }
    const canonicalParadigm =
      PARADIGM_CANONICAL_LOOKUP[activeExerciseParadigm] ?? activeExerciseParadigm;
    return subtopics.find((item) => item.paradigm === canonicalParadigm)?.id;
  }

  if (!activeSlideId) {
    return subtopics[0]?.id;
  }

  const directMatch = subtopics.find((item) => item.slideId === activeSlideId);
  if (directMatch) {
    return directMatch.id;
  }

  const currentIndex = moduleSlideIds.indexOf(activeSlideId);
  if (currentIndex === -1) {
    return subtopics[0]?.id;
  }

  let matchedSubtopicId = subtopics[0]?.id;
  let bestSlideIndex = -1;

  for (const subtopic of subtopics) {
    if (!subtopic.slideId) {
      continue;
    }
    const subtopicSlideIndex = moduleSlideIds.indexOf(subtopic.slideId);
    if (subtopicSlideIndex !== -1 && subtopicSlideIndex <= currentIndex && subtopicSlideIndex >= bestSlideIndex) {
      bestSlideIndex = subtopicSlideIndex;
      matchedSubtopicId = subtopic.id;
    }
  }

  return matchedSubtopicId;
}

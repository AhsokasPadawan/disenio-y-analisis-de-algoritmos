import rawTheory0Payload from '../../../teoria/teoria_0_preludio.json';
import rawTheory1Payload from '../../../teoria/teoria_1_complejidad.json';
import rawTheory2Payload from '../../../teoria/teoria_2_divide_and_conquer.json';
import rawTheory3Payload from '../../../teoria/teoria_3_greedy.json';
import rawTheory4Payload from '../../../teoria/teoria_4_backtracking.json';
import rawTheory5Payload from '../../../teoria/teoria_5_programacion_dinamica.json';
import {
  ConceptSlide,
  ModuleMetadata,
  ModuleStudyData,
} from '../../core/domain/coreTypes';
import { parseRawTheoryModuleData } from '../../core/domain/jsonCourseProcessor';
import {
  buildSlideDeck,
  CustomAlgorithmCodeSlideSpec,
  SlideVisualizerBinding,
} from '../../core/domain/slideDeckBuilder';
import {
  buildStudySearchIndex,
  SearchableStudyEntry,
} from '../../core/domain/studySearch';
import { EXAM_EXERCISES_LIST } from './examExercisesData';
import { MODULE_0_COMPLETE_SLIDES } from './module0PreludeDeckData';
import { MODULE_1_COMPLETE_SLIDES } from './module1CompleteDeckData';
import { MODULE_2_COMPLETE_SLIDES } from './module2CompleteDeckData';
import { MODULE_3_COMPLETE_SLIDES } from './module3CompleteDeckData';
import { MODULE_4_COMPLETE_SLIDES } from './module4CompleteDeckData';

export const MODULE_NAVIGATION_LIST: ModuleMetadata[] = [
  {
    id: 'module-0-prelude',
    numberLabel: '0',
    sidebarTitle: '0. Preludio y Reglas',
    headerTitle: 'Preludio: Encuadre y Reglas de la Materia',
    subtitle:
      'Encuadre normativo de la cátedra, régimen de parciales y final anticipado, metodología activa y mapa de paradigmas.',
    contractTag: 'IPreludeOrientation',
    keyTakeaway:
      'Nadie aprende a nadar en un aula oyendo hablar a un instructor: el diseño de algoritmos exige práctica intensiva y diseño activo.',
  },
  {
    id: 'module-1-complexity',
    numberLabel: '1',
    sidebarTitle: '1. Complejidad y Recurrencias',
    headerTitle: 'Complejidad Temporal, Recurrencias y Clases P/NP',
    subtitle:
      'Fundamentos del análisis asintótico, Principio de Invarianza, ecuaciones de recurrencia por sustracción y división, y tratabilidad computacional.',
    contractTag: 'IAsymptoticAnalyzer',
    keyTakeaway:
      'El orden asintótico abstrae el hardware y mide la tasa de crecimiento intrínseca del algoritmo cuando n tiende a infinito.',
  },
  {
    id: 'module-2-divide-and-conquer',
    numberLabel: '2',
    sidebarTitle: '2. Divide & Conquer',
    headerTitle: 'Divide & Conquer y Subtract & Conquer',
    subtitle:
      'Descomposición recursiva en subproblemas independientes, reducción geométrica o constante y combinación eficiente de resultados.',
    contractTag: 'IDivideAndConquerSolver',
    keyTakeaway:
      'La ganancia de Divide & Conquer surge al equilibrar el tamaño de los subproblemas y mantener lineal o constante el paso de combinación.',
  },
  {
    id: 'module-3-greedy-and-graphs',
    numberLabel: '3',
    sidebarTitle: '3. Greedy y Grafos',
    headerTitle: 'Algoritmos Greedy y Grafos',
    subtitle:
      'Estrategias voraces basadas en decisiones localmente óptimas, caminos mínimos desde un origen y árboles de recubrimiento de costo mínimo.',
    contractTag: 'IGreedyGraphOptimizer',
    keyTakeaway:
      'Un algoritmo Greedy toma decisiones irrevocables guiadas por una función de selección local sin retroceder sobre estados previos.',
  },
  {
    id: 'module-4-dynamic-programming',
    numberLabel: '4',
    sidebarTitle: '4. Programación Dinámica',
    headerTitle: 'Programación Dinámica',
    subtitle:
      'Resolución bottom-up mediante tabulación cuando existen subestructura óptima y superposición de subproblemas.',
    contractTag: 'IDynamicProgrammingTable',
    keyTakeaway:
      'Almacenar los resultados de subproblemas solapados en una tabla transforma árboles recursivos exponenciales en recorridos polinómicos.',
  },
  {
    id: 'module-5-backtracking-and-bnb',
    numberLabel: '5',
    sidebarTitle: '5. Backtracking & Branch and Bound',
    headerTitle: 'Backtracking, Branch & Bound y Juegos',
    subtitle:
      'Exploración sistemática del espacio de estados mediante recorrido en profundidad con poda lógica, cotas de optimización y árboles MinMax.',
    contractTag: 'IStateSpaceExplorer',
    keyTakeaway:
      'Cuando no existe algoritmo polinómico conocido, la eficiencia depende de podar ramas inviables o subóptimas lo más cerca posible de la raíz.',
  },
  {
    id: 'module-6-exam-exercises',
    numberLabel: '6',
    sidebarTitle: '6. Banco de Ejercicios de Parcial',
    headerTitle: 'Banco de Ejercicios de Parcial y Patrones de Examen',
    subtitle:
      'Colección completa con 123 ejercicios de exámenes y guías prácticas clasificados por técnica algorítmica.',
    contractTag: 'IExamPatternRepository',
    keyTakeaway:
      'Todo ejercicio de parcial responde a un invariante estructural: identificarlo define de inmediato si corresponde aplicar división binaria, escalera, tabulación o reconstrucción.',
  },
];

const NAVIGATION_METADATA_BY_MODULE_ID: Record<string, ModuleMetadata> = {
  'module-0-prelude': MODULE_NAVIGATION_LIST[0],
  'module-1-complexity': MODULE_NAVIGATION_LIST[1],
  'module-2-divide-and-conquer': MODULE_NAVIGATION_LIST[2],
  'module-3-greedy-and-graphs': MODULE_NAVIGATION_LIST[3],
  'module-4-dynamic-programming': MODULE_NAVIGATION_LIST[4],
  'module-5-backtracking-and-bnb': MODULE_NAVIGATION_LIST[5],
};

const THEORY_PAYLOAD_BY_MODULE_ID: Record<string, unknown> = {
  'module-0-prelude': rawTheory0Payload,
  'module-1-complexity': rawTheory1Payload,
  'module-2-divide-and-conquer': rawTheory2Payload,
  'module-3-greedy-and-graphs': rawTheory3Payload,
  'module-4-dynamic-programming': rawTheory5Payload,
  'module-5-backtracking-and-bnb': rawTheory4Payload,
};

export const STUDY_MODULES_BY_ID: Record<string, ModuleStudyData> = {
  'module-0-prelude': parseRawTheoryModuleData(
    THEORY_PAYLOAD_BY_MODULE_ID['module-0-prelude'],
    NAVIGATION_METADATA_BY_MODULE_ID['module-0-prelude'],
  ),
  'module-1-complexity': parseRawTheoryModuleData(
    THEORY_PAYLOAD_BY_MODULE_ID['module-1-complexity'],
    NAVIGATION_METADATA_BY_MODULE_ID['module-1-complexity'],
  ),
  'module-2-divide-and-conquer': parseRawTheoryModuleData(
    THEORY_PAYLOAD_BY_MODULE_ID['module-2-divide-and-conquer'],
    NAVIGATION_METADATA_BY_MODULE_ID['module-2-divide-and-conquer'],
  ),
  'module-3-greedy-and-graphs': parseRawTheoryModuleData(
    THEORY_PAYLOAD_BY_MODULE_ID['module-3-greedy-and-graphs'],
    NAVIGATION_METADATA_BY_MODULE_ID['module-3-greedy-and-graphs'],
  ),
  'module-4-dynamic-programming': parseRawTheoryModuleData(
    THEORY_PAYLOAD_BY_MODULE_ID['module-4-dynamic-programming'],
    NAVIGATION_METADATA_BY_MODULE_ID['module-4-dynamic-programming'],
  ),
  'module-5-backtracking-and-bnb': parseRawTheoryModuleData(
    THEORY_PAYLOAD_BY_MODULE_ID['module-5-backtracking-and-bnb'],
    NAVIGATION_METADATA_BY_MODULE_ID['module-5-backtracking-and-bnb'],
  ),
};

const ALGORITHM_VISUALIZER_MAP: Record<string, SlideVisualizerBinding> = {
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

const CONCEPT_VISUALIZER_MAP: Record<string, SlideVisualizerBinding> = {
  'asymptotic-notations': { id: 'asymptotic-bounds', title: 'Cotas Asintóticas Theta(n^3) y Umbral n0=3' },
  'complexity-classes-p-np': { id: 'complexity-classes', title: 'Diagramas de Euler Clases P, NP, NPC y NP-hard' },
  'dnc-general-structure': { id: 'factorial-call-stack', title: 'Pila de Ejecución Recursiva Factorial(4)' },
  'greedy-components': { id: 'huffman-tree', title: 'Construcción del Árbol de Huffman con Min-Heap' },
  'optimality-principle': { id: 'fibonacci-memo', title: 'Árbol Exponencial vs Tabla Memoizada Fibonacci' },
  'dp-classic-problems-overview': { id: 'coin-change-dp', title: 'Fallo Voraz vs Óptimo DP y Matriz de Cambio' },
  'backtracking-vs-bnb': { id: 'astar-vs-ucs', title: 'Comparativa Gráfica Búsqueda UCS vs A*' },
  'minmax-alpha-beta-concept': { id: 'minmax-alphabeta', title: 'Árbol de Juegos Min-Max y Poda Alfa-Beta' },
};

const CUSTOM_ALGORITHM_CODE_SLIDES_BY_ID: Record<string, CustomAlgorithmCodeSlideSpec[]> = {
  'minmax-alpha-beta': [
    {
      idSuffix: 'code-max',
      conceptTitleSuffix: 'Rama MAX y Poda Beta',
      badgeTitle: 'Código: Nodo MAX',
      snippetTitleSuffix: 'Rama MAX y Poda Beta',
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
    {
      idSuffix: 'code-min',
      conceptTitleSuffix: 'Rama MIN y Poda Alfa',
      badgeTitle: 'Código: Nodo MIN',
      snippetTitleSuffix: 'Rama MIN y Poda Alfa',
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
  ],
};

const CURATED_MODULE_SLIDES_BY_ID: Record<string, ConceptSlide[]> = {
  'module-0-prelude': MODULE_0_COMPLETE_SLIDES,
  'module-1-complexity': MODULE_1_COMPLETE_SLIDES,
  'module-2-divide-and-conquer': MODULE_2_COMPLETE_SLIDES,
  'module-3-greedy-and-graphs': MODULE_3_COMPLETE_SLIDES,
  'module-4-dynamic-programming': MODULE_4_COMPLETE_SLIDES,
};

export function buildCourseDeckSlides(): ConceptSlide[] {
  return buildSlideDeck({
    modules: MODULE_NAVIGATION_LIST,
    studyModulesById: STUDY_MODULES_BY_ID,
    curatedModuleSlidesById: CURATED_MODULE_SLIDES_BY_ID,
    practiceModuleId: 'module-6-exam-exercises',
    exercises: EXAM_EXERCISES_LIST,
    conceptVisualizersById: CONCEPT_VISUALIZER_MAP,
    algorithmVisualizersById: ALGORITHM_VISUALIZER_MAP,
    customAlgorithmCodeSlidesById: CUSTOM_ALGORITHM_CODE_SLIDES_BY_ID,
  });
}

export const COURSE_SLIDE_DECK: ConceptSlide[] = buildCourseDeckSlides();

export const COURSE_SEARCH_INDEX: SearchableStudyEntry[] = buildStudySearchIndex({
  modules: MODULE_NAVIGATION_LIST,
  studyModulesById: STUDY_MODULES_BY_ID,
  exercises: EXAM_EXERCISES_LIST,
  practiceModuleId: 'module-6-exam-exercises',
});

import rawTheory0Payload from '../../teoria/teoria_0_preludio.json';
import rawTheory1Payload from '../../teoria/teoria_1_complejidad.json';
import rawTheory2Payload from '../../teoria/teoria_2_divide_and_conquer.json';
import rawTheory3Payload from '../../teoria/teoria_3_greedy.json';
import rawTheory4Payload from '../../teoria/teoria_4_backtracking.json';
import rawTheory5Payload from '../../teoria/teoria_5_programacion_dinamica.json';
import {
  AlgorithmShowcaseItem,
  CodeSnippetsByLanguage,
  ConceptCardItem,
  ConceptFormulaItem,
  ModuleId,
  ModuleMetadata,
  ModuleStudyData,
} from '../domain/courseTypes';

interface RawFormulaItem {
  label?: string;
  latex?: string;
  description?: string;
}

interface RawConceptItem {
  id?: string;
  title?: string;
  badgeText?: string;
  summary?: string;
  bulletPoints?: string[];
  formulas?: RawFormulaItem[];
}

interface RawCodeSnippets {
  pseudocode?: string;
  java?: string;
  python?: string;
}

interface RawAlgorithmItem {
  id?: string;
  name?: string;
  paradigmTag?: string;
  bestCaseComplexityLatex?: string;
  averageCaseComplexityLatex?: string;
  worstCaseComplexityLatex?: string;
  spaceComplexityLatex?: string;
  recurrenceOrEquationLatex?: string;
  keyInsight?: string;
  stepByStepSummary?: string[];
  codeSnippets?: RawCodeSnippets;
}

interface RawTheoryPayload {
  modulo?: string;
  titulo_general?: string;
  conceptos?: RawConceptItem[];
  concepts?: RawConceptItem[];
  algoritmos?: RawAlgorithmItem[];
  algorithms?: RawAlgorithmItem[];
}

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

const NAVIGATION_METADATA_BY_MODULE_ID: Record<
  Exclude<ModuleId, 'module-6-exam-exercises'>,
  ModuleMetadata
> = {
  'module-0-prelude': MODULE_NAVIGATION_LIST[0],
  'module-1-complexity': MODULE_NAVIGATION_LIST[1],
  'module-2-divide-and-conquer': MODULE_NAVIGATION_LIST[2],
  'module-3-greedy-and-graphs': MODULE_NAVIGATION_LIST[3],
  'module-4-dynamic-programming': MODULE_NAVIGATION_LIST[4],
  'module-5-backtracking-and-bnb': MODULE_NAVIGATION_LIST[5],
};

const THEORY_PAYLOAD_BY_MODULE_ID: Record<
  Exclude<ModuleId, 'module-6-exam-exercises'>,
  unknown
> = {
  'module-0-prelude': rawTheory0Payload,
  'module-1-complexity': rawTheory1Payload,
  'module-2-divide-and-conquer': rawTheory2Payload,
  'module-3-greedy-and-graphs': rawTheory3Payload,
  'module-4-dynamic-programming': rawTheory5Payload,
  'module-5-backtracking-and-bnb': rawTheory4Payload,
};

function normalizeFormulas(
  formulas?: RawFormulaItem[],
): ConceptFormulaItem[] | undefined {
  if (!formulas || !Array.isArray(formulas)) {
    return undefined;
  }
  return formulas.map((formula) => ({
    label: formula.label ?? '',
    latex: formula.latex ?? '',
    description: formula.description ?? '',
  }));
}

function normalizeCodeSnippets(
  snippets?: RawCodeSnippets,
): CodeSnippetsByLanguage {
  return {
    pseudocode: snippets?.pseudocode ?? '',
    java: snippets?.java ?? '',
    python: snippets?.python ?? '',
  };
}

export function parseRawTheoryModuleData(
  raw: unknown,
  metadata: ModuleMetadata,
): ModuleStudyData {
  if (!raw || typeof raw !== 'object') {
    return {
      metadata,
      concepts: [],
      algorithms: [],
    };
  }

  const payload = raw as RawTheoryPayload;
  const rawConcepts = payload.conceptos ?? payload.concepts ?? [];
  const rawAlgorithms = payload.algoritmos ?? payload.algorithms ?? [];

  const concepts: ConceptCardItem[] = rawConcepts.map((item, index) => ({
    id: item.id ?? `${metadata.id}-concept-${index + 1}`,
    title: item.title ?? '',
    badgeText: item.badgeText ?? 'Fundamento Teórico',
    summary: item.summary ?? '',
    bulletPoints: item.bulletPoints ?? [],
    formulas: normalizeFormulas(item.formulas),
  }));

  const algorithms: AlgorithmShowcaseItem[] = rawAlgorithms.map((item, index) => ({
    id: item.id ?? `${metadata.id}-algo-${index + 1}`,
    name: item.name ?? '',
    paradigmTag: item.paradigmTag ?? metadata.sidebarTitle,
    bestCaseComplexityLatex: item.bestCaseComplexityLatex ?? 'O(1)',
    averageCaseComplexityLatex: item.averageCaseComplexityLatex ?? 'O(n)',
    worstCaseComplexityLatex: item.worstCaseComplexityLatex ?? 'O(n)',
    spaceComplexityLatex: item.spaceComplexityLatex ?? 'O(1)',
    recurrenceOrEquationLatex: item.recurrenceOrEquationLatex ?? '',
    keyInsight: item.keyInsight ?? '',
    stepByStepSummary: item.stepByStepSummary ?? [],
    codeSnippets: normalizeCodeSnippets(item.codeSnippets),
  }));

  return {
    metadata,
    concepts,
    algorithms,
  };
}

export const STUDY_MODULES_BY_ID: Record<
  Exclude<ModuleId, 'module-6-exam-exercises'>,
  ModuleStudyData
> = {
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

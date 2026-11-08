import ejerciciosManifest from '../../../ejercicios/ejercicios_manifest.json';
import ejerciciosDivideAndConquer from '../../../ejercicios/ejercicios_divide_and_conquer.json';
import ejerciciosGreedy from '../../../ejercicios/ejercicios_greedy.json';
import ejerciciosProgramacionDinamica from '../../../ejercicios/ejercicios_programacion_dinamica.json';
import ejerciciosBacktracking from '../../../ejercicios/ejercicios_backtracking.json';
import {
  ExamExerciseComplexityAnalysis,
  ExamExerciseConceptualStrategy,
  ExamExerciseItem,
} from '../../core/domain/coreTypes';
import {
  ExerciseParserConfig,
  parseRawExercisesData,
  RawExercisesData,
} from '../../core/domain/jsonCourseProcessor';

const PARADIGM_LOOKUP: Record<string, string> = {
  divide_and_conquer: 'Divide & Conquer',
  greedy: 'Greedy',
  programacion_dinamica: 'Programación Dinámica',
  backtracking: 'Backtracking / B&B',
};

const CANONICAL_TITLE_LOOKUP: Record<string, string> = {
  'picos-en-un-vector': 'Pico Estricto en Vector Unimodal',
  'navegacion-en-canoa-en-el-rio-ctalam': 'Alquiler de Canoas en el Río Ctalamochita',
  'navegacion-en-canoa-en-el-rio-ctala': 'Alquiler de Canoas en el Río Ctalamochita',
  'navegacion-en-canoa-en-el-rio-ctalamochita': 'Alquiler de Canoas en el Río Ctalamochita',
};

const CANONICAL_ID_LOOKUP: Record<string, string> = {
  'picos-en-un-vector': 'exam-1-strict-peaks',
  'navegacion-en-canoa-en-el-rio-ctalam': 'exam-5-canoes-ctalamochita',
  'navegacion-en-canoa-en-el-rio-ctala': 'exam-5-canoes-ctalamochita',
  'navegacion-en-canoa-en-el-rio-ctalamochita': 'exam-5-canoes-ctalamochita',
};

const STRATEGY_LOOKUP: Record<string, ExamExerciseConceptualStrategy> = {
  'Divide & Conquer': {
    invariantAndIntuition:
      'Dividir el espacio de búsqueda o tamaño n en subproblemas independientes de tamaño n/b, resolviendo la combinación en tiempo lineal o constante.',
    keySteps: [
      'Identificar caso base de corte trivial.',
      'Calcular punto medio o partición equilibrada.',
      'Combinar resultados asegurando cota asintótica óptima.',
    ],
    recurrenceOrTransitionLatex: 'T(n) = a \\cdot T(n/b) + \\Theta(n^k)',
  },
  Greedy: {
    invariantAndIntuition:
      'Elegir en cada paso la opción localmente óptima según la función de selección voraz, demostrando propiedad de elección voraz y subestructura óptima.',
    keySteps: [
      'Ordenar o indexar candidatos según el criterio voraz.',
      'Verificar factibilidad antes de incorporar a la solución.',
      'Comprobar condición de corte de solución completa.',
    ],
    recurrenceOrTransitionLatex: '\\text{costo} = \\sum_{i \\in S} w_i',
  },
  'Programación Dinámica': {
    invariantAndIntuition:
      'Identificar subproblemas solapados y aplicar el Principio de Optimalidad de Bellman mediante tabulación o memoización.',
    keySteps: [
      'Definir el estado y significado de la tabla DP[i, j].',
      'Plantear la ecuación de recurrencia y los casos base.',
      'Determinar el orden de llenado y reconstruir la solución óptima.',
    ],
    recurrenceOrTransitionLatex: 'DP[i, j] = \\text{opt}(DP[i-1, j], DP[i-1, j - c_i] + v_i)',
  },
  'Backtracking / B&B': {
    invariantAndIntuition:
      'Explorar sistemáticamente el árbol de espacio de estados en profundidad, aplicando podas por factibilidad y cotas para descartar ramas no prometedoras.',
    keySteps: [
      'Definir vector de solución s[1..k] y dominio de candidatos.',
      'Verificar condición esPrometedor(s, k) para podar el subárbol.',
      'Si k alcanza la profundidad n, procesar o comparar contra la mejor cota.',
    ],
    recurrenceOrTransitionLatex: '\\text{Poda: } \\text{cota}(nodo) \\le \\text{mejorValor}',
  },
  Complejidad: {
    invariantAndIntuition:
      'Análisis formal asintótico de cotas superiores, inferiores y ajustadas.',
    keySteps: [
      'Conteo de operaciones elementales.',
      'Resolución de sumatorias o recurrencias.',
      'Determinación de la cota Big-O.',
    ],
    recurrenceOrTransitionLatex: 'T(n) = \\Theta(f(n))',
  },
  'Reducción y Conquista': {
    invariantAndIntuition: 'Reducción del tamaño del problema en cada paso.',
    keySteps: ['Paso de reducción.', 'Llamada al subproblema.', 'Verificación de invariante.'],
    recurrenceOrTransitionLatex: 'T(n) = T(n-1) + \\Theta(1)',
  },
  'Reconstrucción de Decisiones': {
    invariantAndIntuition:
      'Backtracking sobre la tabla de programación dinámica para reconstruir la secuencia óptima.',
    keySteps: [
      'Localizar celda del valor óptimo.',
      'Rastrear transiciones activas hacia atrás.',
      'Ensamblar la solución óptima.',
    ],
    recurrenceOrTransitionLatex: '\\text{Camino} = \\text{Rastrear}(DP)',
  },
};

const DEFAULT_COMPLEXITY_BY_PARADIGM: Record<string, string> = {
  'Divide & Conquer': '\\mathcal{O}(\\log n)',
  Greedy: '\\mathcal{O}(n \\log n)',
  'Programación Dinámica': '\\mathcal{O}(n \\cdot m)',
};

const SPATIAL_COMPLEXITY_BY_PARADIGM: Record<string, string> = {
  'Divide & Conquer': '\\mathcal{O}(\\log n)',
  'Programación Dinámica': '\\mathcal{O}(n \\cdot m)',
};

const THEOREM_APPLIED_BY_PARADIGM: Record<string, string> = {
  'Divide & Conquer': 'Teorema Maestro de División',
  'Programación Dinámica': 'Principio de Optimalidad de Bellman',
};

const COMPLEXITY_PATTERN_RULES: { pattern: RegExp; latex: string }[] = [
  {
    pattern: /mejor que o\(n\)|o\(log n\)|o\(\\log n\)/i,
    latex: '\\mathcal{O}(\\log n)',
  },
  {
    pattern: /o\(n\)|lineal/i,
    latex: '\\mathcal{O}(n)',
  },
  {
    pattern: /o\(n\s*\\log n\)/i,
    latex: '\\mathcal{O}(n \\log n)',
  },
  {
    pattern: /o\(n\^2\)|cuadr[aá]tico/i,
    latex: '\\mathcal{O}(n^2)',
  },
];

function inferCourseExerciseComplexity(enunciado: string, paradigm: string): string {
  const matchedRule = COMPLEXITY_PATTERN_RULES.find((rule) => rule.pattern.test(enunciado));
  if (matchedRule) {
    return matchedRule.latex;
  }
  return DEFAULT_COMPLEXITY_BY_PARADIGM[paradigm] ?? '\\mathcal{O}(b^d) \\text{ con podas}';
}

function buildCourseComplexityAnalysis(
  targetComplexityLatex: string,
  paradigm: string,
): ExamExerciseComplexityAnalysis {
  return {
    temporalLatex: targetComplexityLatex,
    spatialLatex: SPATIAL_COMPLEXITY_BY_PARADIGM[paradigm] ?? '\\mathcal{O}(n)',
    justification:
      'Derivado del análisis asintótico de recurrencias o conteo formal de estados según la técnica algorítmica.',
    theoremApplied:
      THEOREM_APPLIED_BY_PARADIGM[paradigm] ??
      'Análisis por Árbol de Estados o Algoritmo Voraz',
  };
}

function resolveCourseSourceLabels(rawSource: string): {
  difficultyLabel: string;
  sourceOrigin: string;
} {
  const isParcial = rawSource.toLowerCase().includes('parcial');
  return {
    difficultyLabel: isParcial ? 'Examen Parcial' : 'Guía Práctica',
    sourceOrigin: isParcial ? 'Parcial' : 'Guía Progra III',
  };
}

export const COURSE_EXERCISE_PARSER_CONFIG: ExerciseParserConfig = {
  categoryLabels: PARADIGM_LOOKUP,
  defaultCategory: 'Divide & Conquer',
  canonicalTitlesBySlug: CANONICAL_TITLE_LOOKUP,
  canonicalIdsBySlug: CANONICAL_ID_LOOKUP,
  strategiesByCategory: STRATEGY_LOOKUP,
  resolveTargetComplexity: inferCourseExerciseComplexity,
  resolveComplexityAnalysis: buildCourseComplexityAnalysis,
  resolveSourceLabels: resolveCourseSourceLabels,
};

const modularExercisesPayload: RawExercisesData = {
  metadata: {
    titulo: ejerciciosManifest.titulo,
    descripcion: ejerciciosManifest.descripcion,
    temas: ejerciciosManifest.modulos.map((modulo) => modulo.tema),
  },
  ejercicios_por_tema: {
    divide_and_conquer: ejerciciosDivideAndConquer.ejercicios,
    greedy: ejerciciosGreedy.ejercicios,
    programacion_dinamica: ejerciciosProgramacionDinamica.ejercicios,
    backtracking: ejerciciosBacktracking.ejercicios,
  },
};

export const EXAM_EXERCISES_LIST: ExamExerciseItem[] = parseRawExercisesData(
  modularExercisesPayload,
  COURSE_EXERCISE_PARSER_CONFIG,
);

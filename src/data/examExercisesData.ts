import ejerciciosManifest from '../../ejercicios/ejercicios_manifest.json';
import ejerciciosDivideAndConquer from '../../ejercicios/ejercicios_divide_and_conquer.json';
import ejerciciosGreedy from '../../ejercicios/ejercicios_greedy.json';
import ejerciciosProgramacionDinamica from '../../ejercicios/ejercicios_programacion_dinamica.json';
import ejerciciosBacktracking from '../../ejercicios/ejercicios_backtracking.json';
import {
  ExamExerciseItem,
  ExamParadigmCategory,
  ExamExerciseVisualResource,
} from '../domain/courseTypes';

interface RawExerciseVisualResource {
  tipo: string;
  formato: string;
  codigo: string;
}

interface RawExerciseItem {
  id_tema: number;
  tema: string;
  titulo: string;
  enunciado: string;
  recurso_visual: RawExerciseVisualResource | null;
  fuente_original: string;
}

interface RawExercisesData {
  metadata?: {
    titulo?: string;
    descripcion?: string;
    temas?: string[];
  };
  ejercicios_por_tema: Record<string, RawExerciseItem[]>;
}

const PARADIGM_LOOKUP: Record<string, Exclude<ExamParadigmCategory, 'all'>> = {
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

const STRATEGY_LOOKUP: Record<
  Exclude<ExamParadigmCategory, 'all'>,
  {
    invariantAndIntuition: string;
    keySteps: string[];
    recurrenceOrTransitionLatex: string;
  }
> = {
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 36);
}

function inferComplexity(
  enunciado: string,
  paradigm: Exclude<ExamParadigmCategory, 'all'>,
): string {
  if (
    /mejor que o\(n\)/i.test(enunciado) ||
    /o\(log n\)/i.test(enunciado) ||
    /o\(\\log n\)/i.test(enunciado)
  ) {
    return '\\mathcal{O}(\\log n)';
  }
  if (/o\(n\)/i.test(enunciado) || /lineal/i.test(enunciado)) {
    return '\\mathcal{O}(n)';
  }
  if (/o\(n \\log n\)/i.test(enunciado) || /o\(n\\log n\)/i.test(enunciado)) {
    return '\\mathcal{O}(n \\log n)';
  }
  if (/o\(n\^2\)/i.test(enunciado) || /cuadr[aá]tico/i.test(enunciado)) {
    return '\\mathcal{O}(n^2)';
  }
  if (paradigm === 'Divide & Conquer') return '\\mathcal{O}(\\log n)';
  if (paradigm === 'Greedy') return '\\mathcal{O}(n \\log n)';
  if (paradigm === 'Programación Dinámica') return '\\mathcal{O}(n \\cdot m)';
  return '\\mathcal{O}(b^d) \\text{ con podas}';
}

function makeSnippets(title: string) {
  const safeName = title
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  return {
    pseudocode: `Funcion Resolver${safeName || 'Problema'}(datos)\nInicio\n    Devolver resultado\nFin`,
    java: `public class Solution {\n    public static void resolver() {\n    }\n}`,
    python: `def resolver(datos):\n    pass`,
  };
}

export function parseRawExercisesData(raw: unknown): ExamExerciseItem[] {
  if (!raw || typeof raw !== 'object') {
    return [];
  }

  const payload = raw as RawExercisesData;
  const categories =
    payload.metadata?.temas ?? Object.keys(payload.ejercicios_por_tema ?? {});
  const result: ExamExerciseItem[] = [];
  let globalIndex = 1;

  for (const tema of categories) {
    const list = payload.ejercicios_por_tema?.[tema] ?? [];
    for (const item of list) {
      const paradigm = PARADIGM_LOOKUP[tema] ?? 'Divide & Conquer';
      const rawSlug = slugify(item.titulo);
      const title = CANONICAL_TITLE_LOOKUP[rawSlug] ?? item.titulo;
      const id = CANONICAL_ID_LOOKUP[rawSlug] ?? `exam-${globalIndex}-${rawSlug}`;
      const fuente = (item.fuente_original ?? '').toLowerCase();
      const isParcial = fuente.includes('parcial');
      const difficultyLabel = isParcial ? 'Examen Parcial' : 'Guía Práctica';
      const sourceOrigin = isParcial ? 'Parcial' : 'Guía Progra III';
      const targetComplexityLatex = inferComplexity(item.enunciado, paradigm);

      result.push({
        id,
        number: globalIndex,
        title,
        paradigm,
        difficultyLabel,
        targetComplexityLatex,
        sourceOrigin,
        problemStatement: item.enunciado,
        inputOutputExample: item.recurso_visual
          ? 'Ver recurso visual adjunto y casos de prueba.'
          : 'Ver casos y especificaciones en la consigna formal.',
        recursoVisual: item.recurso_visual
          ? {
              tipo: item.recurso_visual.tipo as ExamExerciseVisualResource['tipo'],
              formato: item.recurso_visual.formato,
              codigo: item.recurso_visual.codigo,
            }
          : null,
        conceptualStrategy: STRATEGY_LOOKUP[paradigm],
        codeSnippets: makeSnippets(item.titulo),
        complexityAnalysis: {
          temporalLatex: targetComplexityLatex,
          spatialLatex:
            paradigm === 'Divide & Conquer'
              ? '\\mathcal{O}(\\log n)'
              : paradigm === 'Programación Dinámica'
              ? '\\mathcal{O}(n \\cdot m)'
              : '\\mathcal{O}(n)',
          justification:
            'Derivado del análisis asintótico de recurrencias o conteo formal de estados según la técnica algorítmica.',
          theoremApplied:
            paradigm === 'Divide & Conquer'
              ? 'Teorema Maestro de División'
              : paradigm === 'Programación Dinámica'
              ? 'Principio de Optimalidad de Bellman'
              : 'Análisis por Árbol de Estados o Algoritmo Voraz',
        },
      });

      globalIndex++;
    }
  }

  return result;
}

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

export const EXAM_EXERCISES_LIST: ExamExerciseItem[] = parseRawExercisesData(modularExercisesPayload);

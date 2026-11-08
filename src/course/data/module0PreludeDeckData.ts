import { ConceptSlide } from '../../core/domain/coreTypes';

const MODULE_0_TITLE = '0. Preludio: Encuadre y Reglas';

export const MODULE_0_COMPLETE_SLIDES: ConceptSlide[] = [
  {
    id: 'm0-apertura-quote',
    moduleId: 'module-0-prelude',
    moduleTitle: MODULE_0_TITLE,
    conceptTitle: 'Aprender a Nadar: El Contrato Metodológico de la Cátedra',
    conceptSubtitle: 'Reflexión Pedagógica Inicial · Cátedra Wehbe',
    badgeLabel: '1. Cita Disparadora',
    slideKind: 'quote',
    partIndex: 1,
    totalParts: 4,
    quoteData: {
      quote:
        '¿Se puede aprender a nadar en un aula oyendo hablar a un instructor? Tampoco se puede aprender a programar y diseñar algoritmos de forma pasiva.',
      author: 'Prof. Ricardo Wehbe',
      source: 'Diseño y Análisis de Algoritmos · UADE',
      pedagogicalContext:
        'El diseño de algoritmos no es una disciplina de memorización pasiva de recetas, sino de gimnasia deductiva constante. Requiere diseñar, justificar invariantes y demostrar cotas asintóticas activamente.',
    },
  },

  {
    id: 'm0-reglas-juego-theory',
    moduleId: 'module-0-prelude',
    moduleTitle: MODULE_0_TITLE,
    conceptTitle: 'Las Reglas del Juego (Evaluación y Cursada)',
    conceptSubtitle: 'Régimen Formal de Evaluación y Aprobación UADE',
    badgeLabel: '2. Régimen Académico',
    slideKind: 'theory',
    partIndex: 2,
    totalParts: 4,
    theoryData: {
      summary:
        'Estructura de evaluación formal de la materia para Diseño y Análisis de Algoritmos / Programación III:',
      bulletPoints: [
        'Exámenes parciales: Dos parciales teórico-prácticos individuales con resolución de problemas y demostración asintótica.\nPrimer parcial: Complejidad temporal, Divide and Conquer y Programación Dinámica.\nSegundo parcial: Complejidad acumulativa, Algoritmos Greedy, Backtracking y Branch & Bound.',
        'Régimen de recuperación: Es posible recuperar exactamente uno de los dos parciales para alcanzar la aprobación de cursada.',
        'Instancias de examen final: Final anticipado en fecha de recuperatorio para alumnos con ambos parciales aprobados en primera instancia; examen final regular integrador en fechas oficiales.',
      ],
      keyInsight:
        'La cátedra evalúa la solvencia analítica para justificar por qué una solución es óptima antes de codificarla.',
    },
  },

  {
    id: 'm0-diagnostico-theory',
    moduleId: 'module-0-prelude',
    moduleTitle: MODULE_0_TITLE,
    conceptTitle: 'El Desafío Metodológico: "Aprender a Nadar"',
    conceptSubtitle: 'Diagnóstico Pedagógico y Formación Analítica del Ingeniero',
    badgeLabel: '3. Enfoque Cognitivo',
    slideKind: 'theory',
    partIndex: 3,
    totalParts: 4,
    theoryData: {
      summary:
        '¿Se puede aprender a nadar en un aula oyendo hablar a un instructor? Tampoco se puede aprender a programar y diseñar algoritmos de forma pasiva: exige práctica intensiva y diseño activo.',
      bulletPoints: [
        'Deficiencia en Lógica: Falta de rigor en el razonamiento deductivo paso a paso; tendencia a asumir conclusiones sin demostración formal.',
        'Deficiencia en Análisis: Impulso de codificar de inmediato sin comprender la geometría del espacio de estados ni los casos borde.',
        'Deficiencia en Síntesis: Dificultad para interconectar múltiples paradigmas algorítmicos ante problemas novedosos o híbridos.',
      ],
      callout: {
        title: 'Meta Central del Curso',
        text: 'Desarrollar el criterio para seleccionar, demostrar e implementar la alternativa de menor complejidad asintótica.',
      },
    },
  },

  {
    id: 'm0-mapa-tecnicas-theory',
    moduleId: 'module-0-prelude',
    moduleTitle: MODULE_0_TITLE,
    conceptTitle: 'Las Cuatro Familias Algorítmicas Fundamentales',
    conceptSubtitle: 'Hoja de Ruta de la Materia (por orden de estudio)',
    badgeLabel: '4. Hoja de Ruta',
    slideKind: 'theory',
    partIndex: 4,
    totalParts: 4,
    theoryData: {
      summary:
        'Las cuatro familias algorítmicas fundamentales que se abordarán a lo largo de la materia:',
      bulletPoints: [
        'Divide and Conquer: Partición en subproblemas independientes de igual naturaleza, resolución recursiva y combinación eficiente.',
        'Algoritmos Greedy (Voraces): Decisiones locales óptimas e irrevocables en cada paso sin reconsiderar el pasado.',
        'Programación Dinámica: Subproblemas solapados resueltos en tabla bottom-up aprovechando subestructura óptima para evitar recomputaciones.',
        'Backtracking y Ramificación & Poda (Branch & Bound): Exploración exhaustiva y sistemática del árbol de soluciones con poda lógica o por cotas.',
      ],
      keyInsight:
        'Todo ejercicio de parcial responde a una estructura: reconocerla revela de inmediato cuál de las cuatro técnicas aplicar.',
    },
  },
];

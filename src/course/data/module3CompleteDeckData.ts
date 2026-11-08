import { ConceptSlide } from '../../core/domain/coreTypes';

const MODULE_3_TITLE = 'Algoritmos Greedy y Grafos';

const CAMBIO_MONEDAS_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(v) \\text{ iterativo} / \\Theta(1) \\text{ división}',
  spatialLatex: 'O(v) \\text{ colección} / O(1) \\text{ contadores}',
  bestCaseLatex: '\\Theta(1)',
  averageCaseLatex: '\\Theta(v)',
  worstCaseLatex: '\\Theta(v)',
  theoremApplied: 'T(v) = \\sum_{i=1}^k c_i \\implies \\Theta(v) \\text{ si la menor denominación es 1}',
  justification:
    'En el peor caso con moneda unitaria, el bucle itera v veces resultando en complejidad pseudopolinomial respecto a la longitud en bits del valor. Con k denominaciones fijas computando cociente y residuo de división entera, el tiempo es Theta(1).',
  annotations: [
    {
      startLine: 3,
      endLine: 6,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 7,
      endLine: 16,
      asymptoticCost: '\\Theta(v)',
    },
    {
      startLine: 17,
      endLine: 18,
      asymptoticCost: 'O(1)',
    },
  ],
};

const MOCHILA_FRACCIONARIA_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n \\log n)',
  spatialLatex: 'O(n)',
  bestCaseLatex: '\\Theta(n \\log n)',
  averageCaseLatex: '\\Theta(n \\log n)',
  worstCaseLatex: '\\Theta(n \\log n)',
  theoremApplied: 'T(n) = O(n \\log n) + O(n) = \\Theta(n \\log n)',
  justification:
    'El costo dominante reside en el ordenamiento de los n objetos según su densidad de valor v_i / p_i. El ciclo voraz examina a lo sumo n elementos en tiempo lineal total O(n), saturando la mochila con una única fracción final.',
  annotations: [
    {
      startLine: 4,
      endLine: 6,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 7,
      endLine: 13,
      asymptoticCost: 'O(n \\log n)',
    },
    {
      startLine: 14,
      endLine: 23,
      asymptoticCost: 'O(n \\log n)',
    },
  ],
};

const HUFFMAN_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n \\log n)',
  spatialLatex: '\\Theta(n)',
  bestCaseLatex: '\\Theta(n \\log n)',
  averageCaseLatex: '\\Theta(n \\log n)',
  worstCaseLatex: '\\Theta(n \\log n)',
  theoremApplied: 'T(n) = \\sum_{i=1}^{n-1} 3 \\log i = \\Theta(n \\log n)',
  justification:
    'La cola de prioridad almacena inicialmente n hojas. Se ejecutan exactamente n - 1 iteraciones donde cada una realiza dos operaciones poll() y un add() sobre el Min-Heap en tiempo O(log n). El árbol binario resultante alberga 2n - 1 nodos en memoria.',
  annotations: [
    {
      startLine: 3,
      endLine: 7,
      asymptoticCost: 'O(n \\log n)',
    },
    {
      startLine: 8,
      endLine: 15,
      asymptoticCost: '\\Theta(n \\log n)',
    },
    {
      startLine: 16,
      endLine: 16,
      asymptoticCost: 'O(1)',
    },
  ],
};

const GALE_SHAPLEY_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n^2)',
  spatialLatex: '\\Theta(n^2)',
  bestCaseLatex: '\\Theta(n)',
  averageCaseLatex: '\\Theta(n^2)',
  worstCaseLatex: '\\Theta(n^2)',
  theoremApplied: 'T(n) \\le n \\times n = n^2 \\text{ propuestas máximas}',
  justification:
    'Cada uno de los n hombres propone a cada mujer a lo sumo una vez en orden decreciente de preferencia, acotando el número total de propuestas por n^2. La matriz de ranking inverso precalculada permite que cada mujer evalúe una nueva propuesta en O(1).',
  annotations: [
    {
      startLine: 2,
      endLine: 5,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 6,
      endLine: 7,
      asymptoticCost: '\\Theta(n^2)',
    },
    {
      startLine: 8,
      endLine: 16,
      asymptoticCost: '\\Theta(n^2)',
    },
  ],
};

const JOB_SEQUENCING_COMPLEXITY_DATA = {
  temporalLatex: 'O(n^2) \\text{ básica} / O(n \\log n) \\text{ Union-Find}',
  spatialLatex: 'O(n)',
  bestCaseLatex: 'O(n \\log n)',
  averageCaseLatex: 'O(n^2)',
  worstCaseLatex: 'O(n^2)',
  theoremApplied: 'T(n) = O(n \\log n) + \\sum_{i=1}^n O(i) = O(n^2)',
  justification:
    'Ordenar las tareas por ganancia toma O(n log n). En la versión con vector ordenado, verificar la factibilidad e intercalar la tarea desplazando elementos toma O(n) por etapa, totalizando O(n^2). Utilizando conjuntos disjuntos (Union-Find) se reduce a O(n log n).',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(n \\log n)',
    },
    {
      startLine: 5,
      endLine: 5,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 6,
      endLine: 15,
      asymptoticCost: 'O(n^2)',
    },
  ],
};

const SJF_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n \\log n)',
  spatialLatex: 'O(n)',
  bestCaseLatex: '\\Theta(n \\log n)',
  averageCaseLatex: '\\Theta(n \\log n)',
  worstCaseLatex: '\\Theta(n \\log n)',
  theoremApplied: 'T_{\\text{total}} = \\sum_{i=1}^n (n - i + 1) \\cdot t_{p_i} \\implies \\text{ordenamiento óptimo}',
  justification:
    'El costo temporal está gobernado estrictamente por el ordenamiento de los procesos por duración creciente. Cargar las tareas en una cola de prioridad mínima basada en heap o aplicar MergeSort insume Theta(n log n). El espacio de memoria auxiliar es lineal O(n).',
  annotations: [
    {
      startLine: 3,
      endLine: 5,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 6,
      endLine: 10,
      asymptoticCost: 'O(n \\log n)',
    },
    {
      startLine: 11,
      endLine: 17,
      asymptoticCost: 'O(n \\log n)',
    },
  ],
};

const KONIGSBERG_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(|V| + |E|)',
  spatialLatex: 'O(|V|)',
  bestCaseLatex: '\\Theta(|V| + |E|)',
  averageCaseLatex: '\\Theta(|V| + |E|)',
  worstCaseLatex: '\\Theta(|V| + |E|)',
  theoremApplied: '\\sum_{v \\in V} \\text{grado}(v) = 2|E|',
  justification:
    'Calcular los grados de todos los vértices en un grafo representado con listas de adyacencia requiere examinar cada vértice y recorrer sus aristas incidentes exactamente una vez, totalizando tiempo lineal Theta(|V| + |E|). Con matriz de adyacencia toma Theta(|V|^2).',
  annotations: [
    {
      startLine: 3,
      endLine: 4,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 5,
      endLine: 18,
      asymptoticCost: '\\Theta(|V| + |E|)',
    },
    {
      startLine: 19,
      endLine: 21,
      asymptoticCost: 'O(1)',
    },
  ],
};

const DIJKSTRA_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(|V|^2) \\text{ matriz} / \\mathcal{O}((|V| + |E|) \\log |V|) \\text{ heap}',
  spatialLatex: '\\Theta(|V|)',
  bestCaseLatex: '\\Theta(|V|^2)',
  averageCaseLatex: '\\Theta(|V|^2)',
  worstCaseLatex: '\\Theta(|V|^2)',
  theoremApplied: 'T(|V|, |E|) = |V| \\cdot O(|V|) + |E| \\cdot O(1) = \\Theta(|V|^2)',
  justification:
    'Con arreglos o matrices de adyacencia, seleccionar el vértice mínimo toma O(|V|) en cada una de las |V| iteraciones, sumando Theta(|V|^2). La relajación recorre todas las aristas |E| en O(1) cada una. En grafos densos (|E| ~ |V|^2), esta formulación es óptima.',
  annotations: [
    {
      startLine: 3,
      endLine: 7,
      asymptoticCost: 'O(|V|)',
    },
    {
      startLine: 8,
      endLine: 11,
      asymptoticCost: 'O(|V|)',
    },
    {
      startLine: 12,
      endLine: 20,
      asymptoticCost: 'O(|V|)',
    },
  ],
};

const PRIM_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(|V|^2) \\text{ matriz} / \\mathcal{O}(|E| \\log |V|) \\text{ heap}',
  spatialLatex: '\\Theta(|V|)',
  bestCaseLatex: '\\Theta(|V|^2)',
  averageCaseLatex: '\\Theta(|V|^2)',
  worstCaseLatex: '\\Theta(|V|^2)',
  theoremApplied: 'T(|V|) = (|V| - 1) \\cdot \\big(O(|V|) + O(|V|)\\big) = \\Theta(|V|^2)',
  justification:
    'El algoritmo realiza |V| - 1 etapas externas. En cada etapa busca el vértice externo con arista de menor peso hacia el árbol en tiempo O(|V|) y luego actualiza los vectores de control minDist y masCercano en tiempo O(|V|), sumando Theta(|V|^2).',
  annotations: [
    {
      startLine: 2,
      endLine: 5,
      asymptoticCost: 'O(|V|)',
    },
    {
      startLine: 7,
      endLine: 11,
      asymptoticCost: 'O(|V|)',
    },
    {
      startLine: 13,
      endLine: 15,
      asymptoticCost: 'O(|V|)',
    },
  ],
};

const KRUSKAL_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(|E| \\log |E|) = \\Theta(|E| \\log |V|)',
  spatialLatex: 'O(|V| + |E|)',
  bestCaseLatex: '\\Theta(|E| \\log |V|)',
  averageCaseLatex: '\\Theta(|E| \\log |V|)',
  worstCaseLatex: '\\Theta(|E| \\log |V|)',
  theoremApplied: 'T(|E|, |V|) = O(|E| \\log |E|) + 2|E| \\cdot \\alpha(|V|) = \\Theta(|E| \\log |V|)',
  justification:
    'El ordenamiento inicial de las |E| aristas gobierna la complejidad con Theta(|E| log |E|). Dado que |E| <= |V|^2, log |E| <= 2 log |V|. Con la estructura Disjoint-Set con compresión de caminos y unión por rango, las operaciones find y union insumen tiempo casi constante O(alpha(|V|)).',
  annotations: [
    {
      startLine: 2,
      endLine: 2,
      asymptoticCost: '\\Theta(|E| \\log |E|)',
    },
    {
      startLine: 3,
      endLine: 4,
      asymptoticCost: 'O(|V|)',
    },
    {
      startLine: 7,
      endLine: 17,
      asymptoticCost: 'O(|E| \\cdot \\alpha(|V|))',
    },
  ],
};

export const MODULE_3_COMPLETE_SLIDES: ConceptSlide[] = [
  {
    id: 'm3-epigrafe-friedman-quote',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Componentes Formales de un Algoritmo Greedy: La Elección Voraz',
    conceptSubtitle: 'Cita Disparadora y Epígrafe Inicial · Milton Friedman (1979)',
    badgeLabel: '1. Cita Disparadora',
    slideKind: 'quote',
    partIndex: 1,
    totalParts: 1,
    quoteData: {
      quote:
        'Of course none of us are greedy. It’s only the other fellow who’s greedy. (Por supuesto, ninguno de nosotros es codicioso. Es siempre el otro el que es codicioso.)',
      author: 'Milton Friedman',
      source: 'The Phil Donahue Show (1979)',
      pedagogicalContext:
        'Reflexión sobre la miopía del paradigma voraz: una estrategia de diseño algorítmico que toma decisiones irrevocables basadas exclusivamente en el óptimo local inmediato sin evaluar consecuencias globales futuras ni admitir marcha atrás.',
    },
  },

  {
    id: 'greedy-components-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Componentes Formales de un Algoritmo Greedy',
    conceptSubtitle: 'Fundamentos de Optimización Combinatoria sin Marcha Atrás',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 3,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Principio rector: Construir una solución paso a paso mediante decisiones parciales e irrevocables basadas en una evaluación miope del mejor beneficio inmediato.',
      bulletPoints: [
        'Conjunto de Candidatos (C): Colección finita de recursos iniciales con los que se construye la solución.',
        'Función de Selección: Criterio heurístico que extrae en cada paso al candidato localmente más prometedor.',
        'Función de Factibilidad: Predicado booleano que determina si el candidato elegido puede incorporarse a la solución parcial sin violar restricciones.',
        'Función Objetivo: Métrica cuantitativa de costo o beneficio que se busca optimizar sobre la solución construida.',
        'Función Solución: Predicado booleano que dictamina si el conjunto acumulado conforma una solución completa.',
      ],
      formulas: [
        {
          label: 'Inclusión Irrevocable',
          latex: 'x = \\text{Seleccionar}(C), \\quad C \\leftarrow C \\setminus \\{x\\}, \\quad S \\leftarrow S \\cup \\{x\\}',
          description: 'Un candidato aceptado jamás se remueve y uno descartado jamás vuelve a examinarse.',
        },
      ],
      keyInsight:
        'A diferencia de Divide & Conquer, no hay descomposición recursiva en subproblemas disjuntos; a diferencia de Backtracking, no hay marcha atrás.',
    },
  },
  {
    id: 'm3-fundamentos-greedy-propiedades-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Condiciones de Optimalidad: Elección Voraz y Subestructura',
    conceptSubtitle: 'Teoría de Corrección en Algoritmos Voraces Exactos',
    badgeLabel: '2. Propiedades Teóricas',
    partIndex: 2,
    totalParts: 3,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Condiciones de optimalidad: Para que un algoritmo voraz garantice una solución globalmente óptima y no degenere en una heurística aproximada, deben satisfacerse dos propiedades teóricas:\n• Propiedad de Elección Voraz: Existe una solución globalmente óptima que contiene a la primera elección efectuada por el criterio local miope.\n• Subestructura Óptima: Una solución óptima al problema general contiene dentro de sí soluciones óptimas a los subproblemas derivados de fijar la elección voraz.',
      bulletPoints: [
        'Demostración por Lema de Intercambio: Se asume una solución óptima arbitraria y se demuestra que sustituir sus elementos por las elecciones voraces nunca degrada la función objetivo.',
        'Consecuencia del Fallo: Si alguna de estas propiedades no se cumple, el algoritmo voraz produce resultados subóptimos o inválidos, requiriendo Backtracking o Programación Dinámica.',
        'Ausencia de Marcha Atrás: Un candidato aceptado jamás se remueve y uno descartado jamás se reconsidera, por lo que toda elección errónea es irreversible.',
      ],
      formulas: [
        {
          label: 'Lema de Intercambio General',
          latex: 'f(S_{\\text{greedy}}) \\ge f(S^*) \\implies S_{\\text{greedy}} \\text{ es globalmente óptima}',
          description: 'Toda solución óptima candidata S* puede transformarse en la solución greedy mediante intercambios válidos sin pérdida de calidad.',
        },
      ],
      keyInsight:
        'La optimalidad voraz exige que el criterio miope coincida inductivamente con la dirección de avance hacia el óptimo global.',
    },
  },
  {
    id: 'm3-fundamentos-greedy-pseudocodigo',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Esquema Voraz Genérico: Pseudocódigo',
    conceptSubtitle: 'Bucle Canónico de Selección, Factibilidad e Incorporación',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 3,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'GreedyGenerico(C: Conjunto) -> Solucion',
      snippets: {
        pseudocode:
          'ALGORITMO GreedyGenerico(C: Conjunto) -> Solucion\n    S <- Vacio\n    Mientras C != Vacio Y NO esSolucion(S) Hacer\n        x <- Seleccionar(C)\n        C <- C - {x}\n        Si esFactible(S U {x}) Entonces\n            S <- S U {x}\n        FinSi\n    FinMientras\n    Si esSolucion(S) Entonces\n        Devolver S\n    Sino\n        Devolver "No hay solucion factible"\n    FinSi',
        java:
          'public abstract class EsquemaGreedy<Candidato, Solucion> {\n    public Solucion ejecutarGreedy(java.util.List<Candidato> candidatos) {\n        Solucion sol = inicializarSolucion();\n        ordenarCandidatos(candidatos);\n        int i = 0;\n        while (i < candidatos.size() && !esSolucion(sol)) {\n            Candidato x = candidatos.get(i);\n            if (esFactible(sol, x)) {\n                incorporar(sol, x);\n            }\n            i++;\n        }\n        if (esSolucion(sol)) {\n            return sol;\n        }\n        throw new IllegalStateException("No existe solucion factible.");\n    }\n}',
        python:
          'def greedy_generico(candidatos: list, es_solucion, es_factible, seleccionar) -> list:\n    solucion = []\n    candidatos_restantes = candidatos.copy()\n    while candidatos_restantes and not es_solucion(solucion):\n        x = seleccionar(candidatos_restantes)\n        candidatos_restantes.remove(x)\n        if es_factible(solucion, x):\n            solucion.append(x)\n    if es_solucion(solucion):\n        return solucion\n    raise ValueError("No existe solucion factible")',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: CAMBIO_MONEDAS_COMPLEXITY_DATA,
  },

  {
    id: 'm3-cambio-monedas-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'El Problema del Cambio de Monedas (Coin Change)',
    conceptSubtitle: 'Sistemas Canónicos vs Contraejemplos y Suboptimalidad',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 5,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Objetivo de optimización: Abonar un monto entero v utilizando la mínima cantidad total de monedas de denominaciones d_1 > d_2 > ... > d_k = 1 con disponibilidad infinita.',
      bulletPoints: [
        'Criterio Voraz: En cada iteración, seleccionar la moneda de mayor denominación que no supere el saldo remanente por pagar.',
        'Sistemas Canónicos (Frutillas en Thurgau): En sistemas monetarios decimales como el franco suizo (5fr, 2fr, 1fr, 50c, 20c, 10c, 5c, 1c), abonar 878c entrega exactamente 9 monedas y garantiza optimalidad.',
        'Contraejemplo Histórico (Whisky en Loch Ness): En el sistema pre-decimal británico (240p, 60p, 30p, 24p, 12p, 6p, 3p, 1p), para pagar 288p Greedy entrega 4 monedas vs el óptimo global de 3 monedas (240+24+24).',
        'Contraejemplos Artificiales: Con monedas {1, 3, 4} para monto 6, Greedy entrega 4+1+1 (3 monedas) vs el óptimo 3+3 (2 monedas). Con {6, 4, 1} para 8, entrega 6+1+1 (3 monedas) vs 4+4 (2 monedas).',
        'Puente hacia Programación Dinámica: En sistemas arbitrarios no canónicos, el criterio voraz fracasa y se requiere programación dinámica para garantizar optimalidad.',
      ],
      formulas: [
        {
          label: 'Función Objetivo de Minimización',
          latex: '\\min \\sum_{i=1}^k x_i \\quad \\text{sujeto a} \\quad \\sum_{i=1}^k x_i \\cdot d_i = v, \\quad x_i \\in \\mathbb{N}_0',
          description: 'Minimizar la suma de monedas entregadas igualando exactamente el valor solicitado.',
        },
      ],
      keyInsight:
        'La técnica voraz solo garantiza optimalidad en sistemas de monedas donde ninguna combinación de monedas menores puede igualar o superar a una mayor.',
    },
  },
  {
    id: 'm3-cambio-monedas-visualizer',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Cambio de Monedas: Fallo Voraz vs Óptimo DP',
    conceptSubtitle: 'Simulador Comparativo de Sistemas Canónicos y No Canónicos',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 5,
    slideKind: 'visualizer',
    visualizerId: 'coin-change-dp',
  },
  {
    id: 'm3-cambio-monedas-pseudocode',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Cambio de Monedas: Pseudocódigo',
    conceptSubtitle: 'Recorrido Monótono Decreciente por Denominaciones',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 5,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'Cambio(v: entero, monedas: Vector<entero>) -> entero',
      snippets: {
        pseudocode:
          'ALGORITMO Cambio(v: entero, monedas: Vector<entero>) -> entero\n    n <- 0\n    s <- 0\n    i <- 0\n    Mientras (s < v) Y (i < Longitud(monedas)) Hacer\n        Si s + monedas[i] <= v Entonces\n            s <- s + monedas[i]\n            n <- n + 1\n        Sino\n            i <- i + 1\n        FinSi\n    FinMientras\n    Si s == v Entonces\n        Devolver n\n    Sino\n        Devolver "No hay solucion exacta"\n    FinSi',
        java:
          'public static int cambio(int[] monedas, int valor) {\n    int totalMonedas = 0;\n    int acumulado = 0;\n    int i = 0;\n    while (acumulado < valor && i < monedas.length) {\n        if (acumulado + monedas[i] <= valor) {\n            acumulado += monedas[i];\n            totalMonedas++;\n        } else {\n            i++;\n        }\n    }\n    if (acumulado == valor) return totalMonedas;\n    throw new IllegalArgumentException("No hay solucion.");\n}',
        python:
          'def cambio_monedas(monedas: list[int], valor: int) -> int:\n    total_monedas = 0\n    acumulado = 0\n    i = 0\n    while acumulado < valor and i < len(monedas):\n        if acumulado + monedas[i] <= valor:\n            acumulado += monedas[i]\n            total_monedas += 1\n        else:\n            i += 1\n    if acumulado == valor:\n        return total_monedas\n    raise ValueError("No hay solucion exacta")',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: CAMBIO_MONEDAS_COMPLEXITY_DATA,
  },
  {
    id: 'm3-cambio-monedas-code',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Cambio de Monedas: Implementación Java TDA',
    conceptSubtitle: 'Construcción con ConjuntoRepTDA y Manejo de Excepciones',
    badgeLabel: '4. Código Fuente',
    partIndex: 4,
    totalParts: 5,
    slideKind: 'code',
    codeSnippet: {
      title: 'CambioMonedasSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO Cambio(v: entero, monedas: Vector<entero>) -> entero\n    ...\n    Si s + monedas[i] <= v Entonces s <- s + monedas[i]',
        java:
          'public static ConjuntoRepTDA<Integer> cambio(\n    VectorTDA<Integer> monedas, int valor) throws Exception {\n    ConjuntoRepTDA<Integer> resultado = new ConjuntoRep<Integer>();\n    resultado.InicializarConjunto();\n    int suma = 0;\n    int i = 0;\n    while (suma < valor && i < monedas.longitud()) {\n        int monedaActual = monedas.recuperarElemento(i);\n        if (suma + monedaActual <= valor) {\n            resultado.Agregar(monedaActual);\n            suma += monedaActual;\n        } else {\n            i++;\n        }\n    }\n    if (suma == valor) return resultado;\n    throw new Exception("No es posible dar cambio exacto.");\n}',
        python:
          'def dar_cambio_lista(monedas: list[int], valor: int) -> list[int]:\n    resultado = []\n    suma = 0\n    i = 0\n    while suma < valor and i < len(monedas):\n        if suma + monedas[i] <= valor:\n            resultado.append(monedas[i])\n            suma += monedas[i]\n        else:\n            i += 1\n    if suma == valor: return resultado\n    raise ValueError("No es posible dar cambio exacto")',
      },
      preferredLanguage: 'java',
    },
    complexityData: CAMBIO_MONEDAS_COMPLEXITY_DATA,
  },
  {
    id: 'm3-cambio-monedas-complexity',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Cambio de Monedas: Análisis de Complejidad',
    conceptSubtitle: 'Costo Pseudopolinomial vs Optimización por División Entera',
    badgeLabel: '5. Complejidad Asintótica',
    partIndex: 5,
    totalParts: 5,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'CambioMonedasSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO Cambio(v: entero, monedas: Vector<entero>) -> entero\n    n <- 0; s <- 0; i <- 0\n    Mientras (s < v) Y (i < Longitud(monedas)) Hacer\n        Si s + monedas[i] <= v Entonces\n            s <- s + monedas[i]; n <- n + 1\n        Sino i <- i + 1 FinSi\n    FinMientras\n    Si s == v Entonces Devolver n Sino Devolver Fallo FinSi',
        java:
          'public static ConjuntoRepTDA<Integer> cambio(\n    VectorTDA<Integer> monedas, int valor) throws Exception {\n    ConjuntoRepTDA<Integer> res = new ConjuntoRep<Integer>();\n    res.InicializarConjunto();\n    int suma = 0;\n    int i = 0;\n    while (suma < valor && i < monedas.longitud()) {\n        int moneda = monedas.recuperarElemento(i);\n        if (suma + moneda <= valor) {\n            res.Agregar(moneda);\n            suma += moneda;\n        } else {\n            i++;\n        }\n    }\n    if (suma == valor) return res;\n    throw new Exception("Sin cambio exacto.");\n}',
        python:
          'def cambio_monedas(monedas: list[int], valor: int) -> int:\n    total_monedas = 0; acumulado = 0; i = 0\n    while acumulado < valor and i < len(monedas):\n        if acumulado + monedas[i] <= valor:\n            acumulado += monedas[i]; total_monedas += 1\n        else: i += 1\n    if acumulado == valor: return total_monedas\n    raise ValueError("Sin cambio exacto")',
      },
      preferredLanguage: 'java',
    },
    complexityData: CAMBIO_MONEDAS_COMPLEXITY_DATA,
  },

  {
    id: 'm3-mochila-fraccionaria-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Mochila Fraccionaria (Continuous Knapsack)',
    conceptSubtitle: 'Criterio por Densidad de Valor y Demostración por Intercambio',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 4,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Problema de optimización: Maximizar el beneficio acumulado en una mochila de capacidad P permitiendo fraccionar continuamente los objetos divisibles.',
      bulletPoints: [
        'Criterio de Densidad: Ordenar los objetos según su beneficio específico r_i = v_i / p_i (cociente valor/peso).',
        'Saturación Progresiva: Se toman enteros los objetos más eficientes (x_i = 1) hasta el primer objeto que desborda la mochila, tomando la fracción exacta x_i = (P - suma) / p_i.',
        'Demostración de Optimalidad: Sea G la solución greedy y O otra factible. Si discrepan en el objeto k con g_k > o_k, reemplazar peso de un objeto posterior j de menor ratio genera ganancia Delta V >= 0.',
        'Contraste con Mochila 0/1: En la variante discreta 0/1 donde los objetos no se pueden fraccionar, la estrategia por densidad no garantiza el óptimo y requiere Programación Dinámica.',
        'Instancia Canónica de Cátedra: Con P = 10 y objetos (4,3), (7,5), (2,4), (5,4), los ratios son 1.40, 1.33, 1.25, 0.50. Se toman enteros Obj 2 y Obj 1, fracción 0.5 de Obj 4 y 0 de Obj 3, logrando valor 13.5.',
      ],
      formulas: [
        {
          label: 'Formulación Continua',
          latex: '\\max \\sum_{i=1}^n x_i v_i \\quad \\text{sujeto a} \\quad \\sum_{i=1}^n x_i p_i \\le P, \\quad x_i \\in [0, 1]',
          description: 'A diferencia del caso 0/1 donde x_i pertenece a {0, 1}, aquí x_i es una variable continua en el intervalo unidad.',
        },
      ],
      keyInsight:
        'La divisibilidad de los objetos permite saturar la capacidad al 100% con los elementos de mayor densidad, garantizando la optimalidad voraz.',
    },
  },
  {
    id: 'm3-mochila-fraccionaria-pseudocode',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Mochila Fraccionaria: Pseudocódigo',
    conceptSubtitle: 'Ordenamiento por Ratio y Asignación de Fracción Saturante',
    badgeLabel: '2. Pseudocódigo',
    partIndex: 2,
    totalParts: 4,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'MochilaFraccionaria(O: Vector<Objeto>, P: entero) -> Vector<Real>',
      snippets: {
        pseudocode:
          'ALGORITMO MochilaFraccionaria(O: Vector<Objeto>, P: entero) -> Vector<Real>\n    OrdenarPorRatioDecreciente(O)\n    Para i <- 0 Hasta Longitud(O) - 1 Hacer\n        R[i] <- 0.0\n    FinPara\n    suma <- 0.0\n    obj <- 0\n    Mientras suma < P Y obj < Longitud(O) Hacer\n        R[obj] <- MIN(1.0, (P - suma) / O[obj].peso)\n        suma <- suma + R[obj] * O[obj].peso\n        obj <- obj + 1\n    FinMientras\n    Devolver R',
        java:
          'public static double[] mochila(double[] valores, double[] pesos, double capacidad) {\n    int n = valores.length;\n    Integer[] indices = new Integer[n];\n    for (int i = 0; i < n; i++) indices[i] = i;\n    java.util.Arrays.sort(indices, (a, b) -> Double.compare(valores[b] / pesos[b], valores[a] / pesos[a]));\n    double[] fracciones = new double[n];\n    double pesoActual = 0.0;\n    for (int idx : indices) {\n        if (pesoActual >= capacidad) break;\n        double f = Math.min(1.0, (capacidad - pesoActual) / pesos[idx]);\n        fracciones[idx] = f;\n        pesoActual += f * pesos[idx];\n    }\n    return fracciones;\n}',
        python:
          'def mochila_fraccionaria(valores: list[float], pesos: list[float], capacidad: float) -> list[float]:\n    n = len(valores)\n    indices = sorted(range(n), key=lambda i: valores[i] / pesos[i], reverse=True)\n    fracciones = [0.0] * n\n    peso_acumulado = 0.0\n    for i in indices:\n        if peso_acumulado >= capacidad: break\n        f = min(1.0, (capacidad - peso_acumulado) / pesos[i])\n        fracciones[i] = f\n        peso_acumulado += f * pesos[i]\n    return fracciones',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: MOCHILA_FRACCIONARIA_COMPLEXITY_DATA,
  },
  {
    id: 'm3-mochila-fraccionaria-code',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Mochila Fraccionaria: Implementación Java TDA',
    conceptSubtitle: 'Uso de ColaPrioridadTDA para Selección de Mayor Ratio',
    badgeLabel: '3. Código Fuente',
    partIndex: 3,
    totalParts: 4,
    slideKind: 'code',
    codeSnippet: {
      title: 'MochilaFraccionariaSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO MochilaFraccionaria(O: Vector<Objeto>, P: entero) -> Vector<Real>\n    ...\n    R[obj] <- MIN(1.0, (P - suma) / O[obj].peso)\n    suma <- suma + R[obj] * O[obj].peso',
        java:
          'public static VectorTDA<Double> mochila(VectorTDA<Integer> valores,\n    VectorTDA<Integer> pesos, int cantidad, int capacidad) throws Exception {\n    VectorTDA<Double> resultado = new Vector<Double>();\n    resultado.inicializarVector(cantidad);\n    for (int i = 0; i < cantidad; i++) {\n        resultado.agregarElemento(i, 0.0);\n    }\n    ColaPrioridadTDA<Integer> cola = new ColaPrioridad<Integer>();\n    cola.InicializarCola();\n    for (int i = 0; i < cantidad; i++) {\n        int ratio = (int) (((double) valores.recuperarElemento(i)\n            / pesos.recuperarElemento(i)) * 10000);\n        cola.AgregarElemento(i, ratio);\n    }\n    double suma = 0.0;\n    while (suma < capacidad && !cola.ColaVacia()) {\n        int obj = cola.RecuperarMaxElemento();\n        int pesoObj = pesos.recuperarElemento(obj);\n        double fraccion = Math.min(1.0, (double) (capacidad - suma) / pesoObj);\n        resultado.agregarElemento(obj, fraccion);\n        suma += fraccion * pesoObj;\n        cola.EliminarMaxPrioridad();\n    }\n    return resultado;\n}',
        python:
          'def mochila_fraccionaria_heap(valores, pesos, capacidad):\n    # Utiliza cola de prioridad para extraer mayor ratio\n    pass',
      },
      preferredLanguage: 'java',
    },
    complexityData: MOCHILA_FRACCIONARIA_COMPLEXITY_DATA,
  },
  {
    id: 'm3-mochila-fraccionaria-complexity',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Mochila Fraccionaria: Análisis de Complejidad',
    conceptSubtitle: 'Costo Gobernado por Ordenamiento Theta(n log n)',
    badgeLabel: '4. Complejidad Asintótica',
    partIndex: 4,
    totalParts: 4,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'MochilaFraccionariaSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO MochilaFraccionaria(O: Vector<Objeto>, P: entero) -> Vector<Real>\n    OrdenarPorRatioDecreciente(O)\n    Para i <- 0 Hasta n-1 Hacer R[i] <- 0.0 FinPara\n    Mientras suma < P Y obj < n Hacer\n        R[obj] <- MIN(1.0, (P - suma) / O[obj].peso)\n        suma <- suma + R[obj] * O[obj].peso\n        obj <- obj + 1\n    FinMientras',
        java:
          'public static VectorTDA<Double> mochila(\n    VectorTDA<Integer> val, VectorTDA<Integer> peso,\n    int n, int cap) throws Exception {\n    VectorTDA<Double> res = new Vector<Double>();\n    res.inicializarVector(n);\n    for (int i = 0; i < n; i++) res.agregarElemento(i, 0.0);\n    ColaPrioridadTDA<Integer> cola = new ColaPrioridad<Integer>();\n    cola.InicializarCola();\n    for (int i = 0; i < n; i++) {\n        int ratio = (int) (((double) val.recuperarElemento(i)\n            / peso.recuperarElemento(i)) * 10000);\n        cola.AgregarElemento(i, ratio);\n    }\n    double suma = 0.0;\n    while (suma < cap && !cola.ColaVacia()) {\n        int obj = cola.RecuperarMaxElemento();\n        int pObj = peso.recuperarElemento(obj);\n        double f = Math.min(1.0, (double) (cap - suma) / pObj);\n        res.agregarElemento(obj, f);\n        suma += f * pObj;\n        cola.EliminarMaxPrioridad();\n    }\n    return res;\n}',
        python:
          'def mochila_fraccionaria(valores, pesos, capacidad):\n    n = len(valores)\n    indices = sorted(range(n), key=lambda i: valores[i]/pesos[i], reverse=True)\n    fracciones = [0.0] * n; suma = 0.0\n    for i in indices:\n        if suma >= capacidad: break\n        f = min(1.0, (capacidad - suma) / pesos[i])\n        fracciones[i] = f; suma += f * pesos[i]\n    return fracciones',
      },
      preferredLanguage: 'java',
    },
    complexityData: MOCHILA_FRACCIONARIA_COMPLEXITY_DATA,
  },

  {
    id: 'm3-huffman-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Compresión de Datos y Códigos de Huffman',
    conceptSubtitle: 'Construcción Ascendente de Árboles Binarios de Prefijos Óptimos',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 6,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Compresión sin pérdida: Algoritmo voraz desarrollado por David Huffman (1952) que genera un código prefijo de longitud variable óptimo minimizando el número total de bits transmitidos.',
      bulletPoints: [
        'Propiedad de Código Prefijo: Ninguna palabra de código es prefijo de otra, permitiendo decodificación unívoca de izquierda a derecha sin separadores.',
        'Estrategia Voraz Bottom-Up: Se inicia con un bosque donde cada símbolo representa un árbol trivial con peso igual a su frecuencia. En cada paso se extraen los dos árboles con menores frecuencias.',
        'Fusión con Min-Heap: Se crea un nuevo nodo interno con la suma de los dos mínimos extraídos (hijo izquierdo bit 0, derecho bit 1) y se reinserta en la cola de prioridad.',
        'Instancia Canónica de Cátedra: 6 caracteres con frecuencias F:5, E:9, C:12, B:13, D:16, A:45 (total 100). Produce códigos: A="0", C="100", B="101", D="111", F="1100", E="1101".',
        'Eficiencia de Compresión: Para 100.000 caracteres, la codificación de longitud fija requiere 300.000 bits; Huffman requiere 224.000 bits, logrando un ahorro del 25.33%.',
      ],
      formulas: [
        {
          label: 'Longitud Ponderada del Árbol B(T)',
          latex: 'B(T) = \\sum_{c \\in C} \\text{frecuencia}(c) \\cdot \\text{profundidad}_T(c)',
          description: 'Función objetivo que Huffman minimiza estrictamente respecto a cualquier otro código prefijo binario.',
        },
      ],
      keyInsight:
        'Los caracteres más frecuentes quedan ubicados a menor profundidad en el árbol, asignándoles cadenas de bits más cortas.',
    },
  },
  {
    id: 'm3-huffman-visualizer',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Árbol de Huffman: Construcción Paso a Paso',
    conceptSubtitle: 'Simulación Interactiva de Extracciones y Fusiones en Min-Heap',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 6,
    slideKind: 'visualizer',
    visualizerId: 'huffman-tree',
  },
  {
    id: 'm3-huffman-pseudocode',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Código de Huffman: Pseudocódigo',
    conceptSubtitle: 'Esquema de Fusiones con Cola de Prioridad Mínima',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 6,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'Huffman(C: Conjunto<Simbolo>) -> NodoArbol',
      snippets: {
        pseudocode:
          'ALGORITMO Huffman(C: Conjunto<Simbolo>) -> NodoArbol\n    n <- Cardinal(C)\n    Q <- InicializarMinPriorityQueue()\n    Para cada c en C Hacer\n        Q.Insertar(c, c.frecuencia)\n    FinPara\n    Para i <- 1 Hasta n - 1 Hacer\n        z <- NuevoNodoInterno()\n        z.izq <- Q.ExtraerMinimo()\n        z.der <- Q.ExtraerMinimo()\n        z.frecuencia <- z.izq.frecuencia + z.der.frecuencia\n        Q.Insertar(z, z.frecuencia)\n    FinPara\n    Devolver Q.ExtraerMinimo()',
        java:
          'public static HuffmanNode construirArbol(char[] simbolos, int[] frecuencias) {\n    java.util.PriorityQueue<HuffmanNode> pq = new java.util.PriorityQueue<>();\n    for (int i = 0; i < simbolos.length; i++) {\n        pq.add(new HuffmanNode(simbolos[i], frecuencias[i]));\n    }\n    while (pq.size() > 1) {\n        HuffmanNode izq = pq.poll();\n        HuffmanNode der = pq.poll();\n        pq.add(new HuffmanNode(izq.frecuencia + der.frecuencia, izq, der));\n    }\n    return pq.peek();\n}',
        python:
          'import heapq\n\ndef construir_arbol_huffman(frecuencias: dict[str, int]):\n    heap = [[peso, [simbolo, ""]] for simbolo, peso in frecuencias.items()]\n    heapq.heapify(heap)\n    while len(heap) > 1:\n        menor1 = heapq.heappop(heap)\n        menor2 = heapq.heappop(heap)\n        for par in menor1[1:]: par[1] = "0" + par[1]\n        for par in menor2[1:]: par[1] = "1" + par[1]\n        heapq.heappush(heap, [menor1[0] + menor2[0]] + menor1[1:] + menor2[1:])\n    return heap[0]',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: HUFFMAN_COMPLEXITY_DATA,
  },
  {
    id: 'm3-huffman-code-node',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Código de Huffman: Estructura de Nodo Java',
    conceptSubtitle: 'Definición de HuffmanNode y Comparador por Frecuencia',
    badgeLabel: '4. Estructura de Datos',
    partIndex: 4,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'HuffmanNode.java',
      snippets: {
        pseudocode:
          'TIPO HuffmanNode:\n    simbolo: Caracter\n    frecuencia: Entero\n    izq, der: Puntero a HuffmanNode',
        java:
          'public class HuffmanNode implements Comparable<HuffmanNode> {\n    public char simbolo;\n    public int frecuencia;\n    public HuffmanNode izq, der;\n\n    public HuffmanNode(char simbolo, int frecuencia) {\n        this.simbolo = simbolo;\n        this.frecuencia = frecuencia;\n    }\n\n    public HuffmanNode(int frecuencia, HuffmanNode izq, HuffmanNode der) {\n        this.simbolo = \'\\0\';\n        this.frecuencia = frecuencia;\n        this.izq = izq;\n        this.der = der;\n    }\n\n    public boolean esHoja() {\n        return this.izq == null && this.der == null;\n    }\n\n    @Override\n    public int compareTo(HuffmanNode otro) {\n        return Integer.compare(this.frecuencia, otro.frecuencia);\n    }\n}',
        python:
          'class HuffmanNode:\n    def __init__(self, simbolo, frecuencia, izq=None, der=None):\n        self.simbolo = simbolo\n        self.frecuencia = frecuencia\n        self.izq = izq\n        self.der = der\n    def __lt__(self, otro):\n        return self.frecuencia < otro.frecuencia',
      },
      preferredLanguage: 'java',
    },
    complexityData: HUFFMAN_COMPLEXITY_DATA,
  },
  {
    id: 'm3-huffman-code-algorithm',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Código de Huffman: Algoritmo de Construcción Java',
    conceptSubtitle: 'Iteración con java.util.PriorityQueue y Retorno de Raíz',
    badgeLabel: '5. Implementación Algorítmica',
    partIndex: 5,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'HuffmanAlgorithm.java',
      snippets: {
        pseudocode:
          'ALGORITMO Huffman(C: Conjunto<Simbolo>) -> NodoArbol\n    ...\n    z.frecuencia <- z.izq.frecuencia + z.der.frecuencia\n    Q.Insertar(z, z.frecuencia)',
        java:
          'public class HuffmanAlgorithm {\n    public static HuffmanNode construirArbol(char[] simbolos, int[] frecuencias) {\n        java.util.PriorityQueue<HuffmanNode> pq = new java.util.PriorityQueue<HuffmanNode>();\n        for (int i = 0; i < simbolos.length; i++) {\n            pq.add(new HuffmanNode(simbolos[i], frecuencias[i]));\n        }\n        while (pq.size() > 1) {\n            HuffmanNode x = pq.poll();\n            HuffmanNode y = pq.poll();\n            HuffmanNode padre = new HuffmanNode(x.frecuencia + y.frecuencia, x, y);\n            pq.add(padre);\n        }\n        return pq.peek();\n    }\n}',
        python:
          'def huffman_tree(simbolos, frecuencias):\n    # PriorityQueue estándar\n    pass',
      },
      preferredLanguage: 'java',
    },
    complexityData: HUFFMAN_COMPLEXITY_DATA,
  },
  {
    id: 'm3-huffman-complexity',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Código de Huffman: Análisis de Complejidad',
    conceptSubtitle: 'Deducción Asintótica con Min-Heap Theta(n log n)',
    badgeLabel: '6. Complejidad Asintótica',
    partIndex: 6,
    totalParts: 6,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'HuffmanAlgorithm.java',
      snippets: {
        pseudocode:
          'ALGORITMO Huffman(C: Conjunto<Simbolo>) -> NodoArbol\n    Para cada c en C Hacer Q.Insertar(c, c.frecuencia) FinPara\n    Para i <- 1 Hasta n - 1 Hacer\n        z.izq <- Q.ExtraerMinimo(); z.der <- Q.ExtraerMinimo()\n        z.frecuencia <- z.izq.frecuencia + z.der.frecuencia\n        Q.Insertar(z, z.frecuencia)\n    FinPara\n    Devolver Q.ExtraerMinimo()',
        java:
          'public static HuffmanNode construirArbol(\n    char[] simbolos, int[] frecuencias) {\n    java.util.PriorityQueue<HuffmanNode> pq =\n        new java.util.PriorityQueue<HuffmanNode>();\n    for (int i = 0; i < simbolos.length; i++) {\n        pq.add(new HuffmanNode(simbolos[i], frecuencias[i]));\n    }\n    while (pq.size() > 1) {\n        HuffmanNode x = pq.poll();\n        HuffmanNode y = pq.poll();\n        HuffmanNode padre = new HuffmanNode(\n            x.frecuencia + y.frecuencia, x, y);\n        pq.add(padre);\n    }\n    return pq.peek();\n}',
        python:
          'def huffman_arbol(frecuencias):\n    heap = [[peso, [s, ""]] for s, peso in frecuencias.items()]\n    heapq.heapify(heap)\n    while len(heap) > 1:\n        x = heapq.heappop(heap); y = heapq.heappop(heap)\n        heapq.heappush(heap, [x[0] + y[0], x, y])\n    return heap[0]',
      },
      preferredLanguage: 'java',
    },
    complexityData: HUFFMAN_COMPLEXITY_DATA,
  },

  {
    id: 'm3-gale-shapley-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Emparejamientos Estables: Algoritmo de Gale-Shapley',
    conceptSubtitle: 'Resolución del Stable Marriage Problem (Tribu de los Kikimuris)',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 4,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Asignación biyectiva entre dos conjuntos disjuntos de n hombres y n mujeres, cada uno con una lista estricta de preferencias sobre los miembros del sexo opuesto.',
      bulletPoints: [
        'Definición de Par Inestable: Un par (m, f) no emparejado entre sí constituye un par bloqueador si m prefiere a f sobre su pareja actual y f prefiere a m sobre su prometido actual.',
        'Condición de Estabilidad: Un emparejamiento perfecto es ESTABLE si no contiene ningún par inestable.',
        'Protocolo de Propuestas: Cada hombre libre propone a su mujer más preferida a quien aún no se haya declarado. La mujer acepta provisionalmente si está libre; si ya está comprometida con m\', rompe su compromiso si prefiere al nuevo proponente m o lo rechaza si prefiere a m\'.',
        'Cota Cuadrática de Propuestas: En cada paso se emite una propuesta no repetida. Al haber n hombres y n mujeres, el bucle converge en a lo sumo n^2 rondas.',
        'Asimetría Sociológica de Cátedra: El algoritmo favorece al bando proponente (male-optimal: cada hombre obtiene la mejor pareja posible en cualquier emparejamiento estable) y perjudica al receptor (female-pessimal).',
      ],
      formulas: [
        {
          label: 'Cota Superior de Terminación',
          latex: 'P_{\\text{total}} \\le n \\times n = n^2 \\implies \\mathcal{O}(n^2)',
          description: 'El número total de propuestas posibles entre n hombres y n mujeres está estrictamente acotado por n al cuadrado.',
        },
      ],
      keyInsight:
        'El bienestar de los hombres disminuye monótonamente en cada propuesta rechazada, mientras que el bienestar de las mujeres mejora monótonamente.',
    },
  },
  {
    id: 'm3-gale-shapley-pseudocode',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Gale-Shapley: Pseudocódigo',
    conceptSubtitle: 'Rondas de Declaración y Compromisos Provisionales',
    badgeLabel: '2. Pseudocódigo',
    partIndex: 2,
    totalParts: 4,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'GaleShapley(Hombres, Mujeres, PrefH, PrefM) -> Parejas',
      snippets: {
        pseudocode:
          'ALGORITMO GaleShapley(Hombres, Mujeres, PrefH, PrefM) -> Parejas\n    Inicializar todos los hombres y mujeres como libres\n    Mientras exista un hombre m libre con candidatas en su lista Hacer\n        f <- primera mujer en PrefH[m] a quien m no ha propuesto\n        Marcar f como propuesta por m\n        Si f esta libre Entonces\n            Comprometer(m, f)\n        Sino Si PrefM[f].ranking(m) < PrefM[f].ranking(f.prometido) Entonces\n            Liberar(f.prometido)\n            Comprometer(m, f)\n        Sino\n            // f rechaza a m; m continua libre\n        FinSi\n    FinMientras\n    Devolver conjunto de parejas comprometidas',
        java:
          'public static int[] emparejar(int[][] prefHombres, int[][] prefMujeres, int n) {\n    int[] esposoDe = new int[n];\n    int[] proximaPropuesta = new int[n];\n    boolean[] hombreLibre = new boolean[n];\n    java.util.Arrays.fill(esposoDe, -1);\n    java.util.Arrays.fill(hombreLibre, true);\n    int libresCount = n;\n    while (libresCount > 0) {\n        int m = 0;\n        while (m < n && !hombreLibre[m]) m++;\n        int w = prefHombres[m][proximaPropuesta[m]++];\n        if (esposoDe[w] == -1) {\n            esposoDe[w] = m;\n            hombreLibre[m] = false;\n            libresCount--;\n        } else {\n            int actual = esposoDe[w];\n            if (prefiere(prefMujeres, w, m, actual)) {\n                esposoDe[w] = m;\n                hombreLibre[m] = false;\n                hombreLibre[actual] = true;\n            }\n        }\n    }\n    return esposoDe;\n}',
        python:
          'def gale_shapley(pref_hombres: list[list[int]], pref_mujeres: list[list[int]]) -> list[int]:\n    n = len(pref_hombres)\n    esposo_de = [-1] * n\n    proxima_propuesta = [0] * n\n    hombres_libres = list(range(n))\n    ranking_m = [{m: rank for rank, m in enumerate(pref_mujeres[w])} for w in range(n)]\n    while hombres_libres:\n        m = hombres_libres[0]\n        w = pref_hombres[m][proxima_propuesta[m]]\n        proxima_propuesta[m] += 1\n        if esposo_de[w] == -1:\n            esposo_de[w] = m\n            hombres_libres.pop(0)\n        else:\n            actual = esposo_de[w]\n            if ranking_m[w][m] < ranking_m[w][actual]:\n                esposo_de[w] = m\n                hombres_libres.pop(0)\n                hombres_libres.append(actual)\n    return esposo_de',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: GALE_SHAPLEY_COMPLEXITY_DATA,
  },
  {
    id: 'm3-gale-shapley-code',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Gale-Shapley: Implementación Java',
    conceptSubtitle: 'Matriz de Ranking Inverso para Comparación en Tiempo O(1)',
    badgeLabel: '3. Código Fuente',
    partIndex: 3,
    totalParts: 4,
    slideKind: 'code',
    codeSnippet: {
      title: 'GaleShapley.java',
      snippets: {
        pseudocode:
          'ALGORITMO GaleShapley(Hombres, Mujeres, PrefH, PrefM) -> Parejas\n    ...\n    Si PrefM[f].ranking(m) < PrefM[f].ranking(f.prometido) Entonces',
        java:
          'public class GaleShapley {\n    public static int[] emparejar(int[][] prefH, int[][] prefM, int n) {\n        int[] esposoDe = new int[n];\n        int[] propIndex = new int[n];\n        boolean[] hombreLibre = new boolean[n];\n        java.util.Arrays.fill(esposoDe, -1);\n        java.util.Arrays.fill(hombreLibre, true);\n        int libres = n;\n\n        int[][] rankM = new int[n][n];\n        for (int w = 0; w < n; w++) {\n            for (int r = 0; r < n; r++) {\n                rankM[w][prefM[w][r]] = r;\n            }\n        }\n\n        while (libres > 0) {\n            int m = 0;\n            while (m < n && !hombreLibre[m]) m++;\n            int w = prefH[m][propIndex[m]++];\n            if (esposoDe[w] == -1) {\n                esposoDe[w] = m;\n                hombreLibre[m] = false;\n                libres--;\n            } else if (rankM[w][m] < rankM[w][esposoDe[w]]) {\n                hombreLibre[esposoDe[w]] = true;\n                esposoDe[w] = m;\n                hombreLibre[m] = false;\n            }\n        }\n        return esposoDe;\n    }\n}',
        python:
          '# Gale-Shapley con ranking inverso\ndef emparejar(pref_h, pref_m):\n    pass',
      },
      preferredLanguage: 'java',
    },
    complexityData: GALE_SHAPLEY_COMPLEXITY_DATA,
  },
  {
    id: 'm3-gale-shapley-complexity',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Gale-Shapley: Análisis de Complejidad',
    conceptSubtitle: 'Convergencia Cuadrática Theta(n^2) y Espacio Bidimensional',
    badgeLabel: '4. Complejidad Asintótica',
    partIndex: 4,
    totalParts: 4,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'GaleShapley.java',
      snippets: {
        pseudocode:
          'ALGORITMO GaleShapley(H, M, PrefH, PrefM)\n    // Precalculo de ranking inverso: Theta(n^2)\n    // Maximo n^2 rondas de propuesta en O(1) cada una\n    // Tiempo total: Theta(n^2), Espacio: Theta(n^2)',
        java:
          'public static int[] emparejar(int[][] prefH, int[][] prefM, int n) {\n    int[] esposoDe = new int[n], propIndex = new int[n];\n    boolean[] hombreLibre = new boolean[n];\n    java.util.Arrays.fill(esposoDe, -1); java.util.Arrays.fill(hombreLibre, true);\n    int libres = n, rankM[][] = new int[n][n];\n    for (int w = 0; w < n; w++)\n        for (int r = 0; r < n; r++) rankM[w][prefM[w][r]] = r;\n    while (libres > 0) {\n        int m = 0;\n        while (m < n && !hombreLibre[m]) m++;\n        int w = prefH[m][propIndex[m]++];\n        if (esposoDe[w] == -1) {\n            esposoDe[w] = m; hombreLibre[m] = false; libres--;\n        } else if (rankM[w][m] < rankM[w][esposoDe[w]]) {\n            hombreLibre[esposoDe[w]] = true; esposoDe[w] = m; hombreLibre[m] = false;\n        }\n    }\n    return esposoDe;\n}',
        python:
          '# Complejidad: Theta(n^2) tiempo, Theta(n^2) espacio',
      },
      preferredLanguage: 'java',
    },
    complexityData: GALE_SHAPLEY_COMPLEXITY_DATA,
  },

  {
    id: 'm3-job-sequencing-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Planificación con Plazos y Ganancias (Job Sequencing)',
    conceptSubtitle: 'Maximización de Beneficio con Deadlines en Procesador Único',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 4,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Problema de secuenciamiento: Se disponen n tareas unitarias con plazo límite t_i y beneficio g_i; maximizar la ganancia total ejecutando tareas en instantes t <= t_i.',
      bulletPoints: [
        'Estrategia Voraz: Ordenar las tareas en orden decreciente según su ganancia g_i. En cada paso se toma la tarea disponible de mayor beneficio.',
        'Asignación en el Slot Más Tardío: Para maximizar la compatibilidad, cada tarea seleccionada se programa en el slot temporal disponible más tardío posible que cumpla slot <= t_i, preservando slots tempranos para tareas más urgentes.',
        'Condición de Factibilidad: Una secuencia ordenada por deadline [s_1, s_2, ..., s_k] es factible si y sólo si para toda posición cronológica j se cumple j <= t_{s_j}.',
        'Instancia Canónica de Cátedra: 4 tareas con g=(50, 10, 15, 30) y t=(2, 1, 2, 1). Se ordenan T1(50,2), T4(30,1), T3(15,2), T2(10,1). Se incorporan T1 y T4 en secuencia <T4, T1> logrando ganancia máxima 80; T3 y T2 se descartan por incompatibilidad.',
      ],
      formulas: [
        {
          label: 'Maximización del Beneficio Total',
          latex: '\\max \\sum_{i \\in S} g_i \\quad \\text{sujeto a} \\quad \\text{cronograma}(i) \\le t_i \\quad \\forall i \\in S',
          description: 'Maximizar la suma de ganancias de las tareas que logran ejecutarse dentro de sus plazos.',
        },
      ],
      keyInsight:
        'Retrasar la ejecución de una tarea rentable hasta su último instante posible deja libres los primeros instantes para tareas con menor margen de maniobra.',
    },
  },
  {
    id: 'm3-job-sequencing-pseudocode',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Planificación con Plazos: Pseudocódigo',
    conceptSubtitle: 'Inserción Ordenada y Desplazamiento por Factibilidad',
    badgeLabel: '2. Pseudocódigo',
    partIndex: 2,
    totalParts: 4,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'MaximizarGanancia(O: Vector<Tarea>) -> Vector<Tarea>',
      snippets: {
        pseudocode:
          'ALGORITMO MaximizarGanancia(O: Vector<Tarea>) -> Vector<Tarea>\n    OrdenarPorGananciaDecreciente(O)\n    R[0] <- O[0]\n    cantidad <- 1\n    Para etapa <- 1 Hasta Longitud(O) - 1 Hacer\n        j <- cantidad - 1\n        Mientras j >= 0 Y O[R[j]].tiempo > MAX(O[etapa].tiempo, j + 1) Hacer\n            j <- j - 1\n        FinMientras\n        Si O[etapa].tiempo > j + 1 Entonces\n            Para m <- cantidad - 1 Hasta j + 1 Paso -1 Hacer\n                R[m + 1] <- R[m]\n            FinPara\n            R[j + 1] <- O[etapa]\n            cantidad <- cantidad + 1\n        FinSi\n    FinPara\n    Devolver R',
        java:
          'public static int planificar(int[] ganancias, int[] tiempos, int n, int[] resultado) {\n    Integer[] orden = new Integer[n];\n    for (int i = 0; i < n; i++) orden[i] = i;\n    java.util.Arrays.sort(orden, (a, b) -> Integer.compare(ganancias[b], ganancias[a]));\n    int maxDeadline = 0;\n    for (int t : tiempos) maxDeadline = Math.max(maxDeadline, t);\n    int[] slots = new int[maxDeadline + 1];\n    java.util.Arrays.fill(slots, -1);\n    int gananciaTotal = 0;\n    for (int idx : orden) {\n        for (int t = Math.min(maxDeadline, tiempos[idx]); t > 0; t--) {\n            if (slots[t] == -1) {\n                slots[t] = idx;\n                gananciaTotal += ganancias[idx];\n                break;\n            }\n        }\n    }\n    return gananciaTotal;\n}',
        python:
          'def job_sequencing(ganancias: list[int], tiempos: list[int]) -> int:\n    n = len(ganancias)\n    indices = sorted(range(n), key=lambda i: ganancias[i], reverse=True)\n    max_t = max(tiempos)\n    slots = [-1] * (max_t + 1)\n    ganancia_total = 0\n    for idx in indices:\n        for t in range(min(max_t, tiempos[idx]), 0, -1):\n            if slots[t] == -1:\n                slots[t] = idx\n                ganancia_total += ganancias[idx]\n                break\n    return ganancia_total',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: JOB_SEQUENCING_COMPLEXITY_DATA,
  },
  {
    id: 'm3-job-sequencing-code',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Planificación con Plazos: Implementación Java TDA',
    conceptSubtitle: 'Uso de ColaPrioridadTDA y Verificación de Compatibilidad',
    badgeLabel: '3. Código Fuente',
    partIndex: 3,
    totalParts: 4,
    slideKind: 'code',
    codeSnippet: {
      title: 'JobSequencingSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO MaximizarGanancia(O: Vector<Tarea>) -> Vector<Tarea>\n    ...\n    Si O[etapa].tiempo > j + 1 Entonces R[j + 1] <- O[etapa]',
        java:
          'public static int planificar(VectorTDA<Integer> ganancias,\n    VectorTDA<Integer> tiempos, int cantidad, VectorTDA<Integer> resultado) throws Exception {\n    ColaPrioridadTDA<Integer> cola = new ColaPrioridad<Integer>();\n    cola.InicializarCola();\n    for (int i = 0; i < cantidad; i++) {\n        cola.AgregarElemento(i, ganancias.recuperarElemento(i));\n    }\n    int cantSecuencia = 0;\n    if (!cola.ColaVacia()) {\n        resultado.agregarElemento(0, cola.RecuperarMaxElemento());\n        cola.EliminarMaxPrioridad();\n        cantSecuencia = 1;\n    }\n    while (!cola.ColaVacia()) {\n        int cand = cola.RecuperarMaxElemento();\n        int plazo = tiempos.recuperarElemento(cand);\n        int j = cantSecuencia - 1;\n        while (j >= 0 && tiempos.recuperarElemento(\n            resultado.recuperarElemento(j)) > Math.max(plazo, j + 1)) {\n            j--;\n        }\n        if (plazo > j + 1) {\n            for (int m = cantSecuencia - 1; m > j; m--) {\n                resultado.agregarElemento(m + 1, resultado.recuperarElemento(m));\n            }\n            resultado.agregarElemento(j + 1, cand);\n            cantSecuencia++;\n        }\n        cola.EliminarMaxPrioridad();\n    }\n    return cantSecuencia;\n}',
        python:
          '# Planificacion con plazos en Python\ndef planificar_tareas(ganancias, tiempos):\n    pass',
      },
      preferredLanguage: 'java',
    },
    complexityData: JOB_SEQUENCING_COMPLEXITY_DATA,
  },
  {
    id: 'm3-job-sequencing-complexity',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Planificación con Plazos: Análisis de Complejidad',
    conceptSubtitle: 'Comparativa Asintótica: Vector Cuadrático vs Disjoint Set O(n log n)',
    badgeLabel: '4. Complejidad Asintótica',
    partIndex: 4,
    totalParts: 4,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'JobSequencingSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO MaximizarGanancia(O)\n    OrdenarPorGanancia(O) // O(n log n)\n    Para cada tarea candidata:\n        Buscar slot mas tardio y desplazar // O(n)\n    Total: O(n^2) con vector / O(n alpha(n)) con Union-Find',
        java:
          'public static int planificar(VectorTDA<Integer> gan, VectorTDA<Integer> tie, int n, VectorTDA<Integer> res) throws Exception {\n    ColaPrioridadTDA<Integer> cola = new ColaPrioridad<Integer>();\n    cola.InicializarCola();\n    for (int i = 0; i < n; i++) cola.AgregarElemento(i, gan.recuperarElemento(i));\n    int cant = 0;\n    while (!cola.ColaVacia()) {\n        int cand = cola.RecuperarMaxElemento(); cola.EliminarMaxPrioridad();\n        int plazo = tie.recuperarElemento(cand), j = cant - 1;\n        while (j >= 0 && tie.recuperarElemento(res.recuperarElemento(j)) > Math.max(plazo, j + 1)) j--;\n        if (plazo > j + 1) {\n            for (int m = cant - 1; m > j; m--) res.agregarElemento(m + 1, res.recuperarElemento(m));\n            res.agregarElemento(j + 1, cand);\n            cant++;\n        }\n    }\n    return cant;\n}',
        python:
          '# Complejidad: O(n^2) con vector, O(n log n) con Union-Find',
      },
      preferredLanguage: 'java',
    },
    complexityData: JOB_SEQUENCING_COMPLEXITY_DATA,
  },

  {
    id: 'm3-sjf-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Minimización del Tiempo Medio de Espera (SJF)',
    conceptSubtitle: 'Shortest Job First y Demostración por Reducción de Inversiones',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 4,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Optimización de sistemas operativos: Ordenar n tareas en un procesador mononúcleo para minimizar el tiempo total acumulado y el tiempo medio de permanencia.',
      bulletPoints: [
        'Función de Costo Acumulada: El tiempo total es la sumatoria ponderada T_total = sum_{i=1}^n (n - i + 1) * t_{p_i}, donde cada duración impacta en todas las tareas que esperan detrás.',
        'Regla Voraz Shortest Job First: Para minimizar la suma ponderada, las duraciones más reducidas deben asociarse a los coeficientes más grandes (n, n-1, ..., 1), ejecutando en orden estrictamente creciente de duración.',
        'Demostración por Lema de Intercambio: Supongamos una planificación óptima con un par adyacente invertido donde t_k > t_{k+1}. Intercambiarlos reduce el tiempo total en Delta T = t_{k+1} - t_k < 0, demostrando que cualquier inversión degrada la optimalidad.',
        'Instancia Canónica de Cátedra: 3 procesos con duraciones t(p1)=5, t(p2)=10, t(p3)=3. De las 6 permutaciones posibles, el orden SJF (p3, p1, p2) logra el tiempo mínimo de 29 (3 + 8 + 18), superando al peor caso (p2, p1, p3) que insume 43.',
      ],
      formulas: [
        {
          label: 'Tiempo Total en el Sistema',
          latex: 'T_{\\text{total}} = \\sum_{i=1}^n \\sum_{j=1}^i t_{p_j} = \\sum_{i=1}^n (n - i + 1) \\cdot t_{p_i}',
          description: 'El primer proceso atendido impacta n veces en la suma total; el último proceso impacta una sola vez.',
        },
      ],
      keyInsight:
        'Anticipar los procesos más rápidos vacía la cola a mayor velocidad, reduciendo drásticamente la espera colectiva.',
    },
  },
  {
    id: 'm3-sjf-pseudocode',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Minimización de Espera: Pseudocódigo',
    conceptSubtitle: 'Ordenamiento Ascendente por Duración de Procesamiento',
    badgeLabel: '2. Pseudocódigo',
    partIndex: 2,
    totalParts: 4,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'MinimizarEspera(O: Vector<Tarea>) -> Vector<Tarea>',
      snippets: {
        pseudocode:
          'ALGORITMO MinimizarEspera(O: Vector<Tarea>) -> Vector<Tarea>\n    OrdenarPorDuracionCreciente(O)\n    Devolver O',
        java:
          'public static int[] minimizarEspera(int[] duraciones) {\n    int[] ordenado = duraciones.clone();\n    java.util.Arrays.sort(ordenado);\n    return ordenado;\n}',
        python:
          'def minimizar_espera(duraciones: list[int]) -> list[int]:\n    return sorted(duraciones)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: SJF_COMPLEXITY_DATA,
  },
  {
    id: 'm3-sjf-code',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Minimización de Espera: Implementación Java TDA',
    conceptSubtitle: 'Extracción por Mínima Prioridad con ColaPrioridadTDA',
    badgeLabel: '3. Código Fuente',
    partIndex: 3,
    totalParts: 4,
    slideKind: 'code',
    codeSnippet: {
      title: 'MinimizarEsperaTDA.java',
      snippets: {
        pseudocode:
          'ALGORITMO MinimizarEspera(O: Vector<Tarea>) -> Vector<Tarea>\n    OrdenarPorDuracionCreciente(O)\n    Devolver O',
        java:
          'public static VectorTDA<Integer> minimizarEspera(VectorTDA<Integer> tareas, int cantidad) throws Exception {\n    VectorTDA<Integer> resultado = new Vector<Integer>();\n    resultado.inicializarVector(cantidad);\n    ColaPrioridadTDA<Integer> cola = new ColaPrioridad<Integer>();\n    cola.InicializarCola();\n    for (int i = 0; i < cantidad; i++) {\n        cola.AgregarElemento(i, tareas.recuperarElemento(i));\n    }\n    int i = 0;\n    while (!cola.ColaVacia()) {\n        resultado.agregarElemento(i, cola.RecuperarMinElemento());\n        cola.EliminarMinPrioridad();\n        i++;\n    }\n    return resultado;\n}',
        python:
          'import heapq\n\ndef sjf_heap(tareas: list[int]) -> list[int]:\n    heap = tareas.copy()\n    heapq.heapify(heap)\n    return [heapq.heappop(heap) for _ in range(len(tareas))]',
      },
      preferredLanguage: 'java',
    },
    complexityData: SJF_COMPLEXITY_DATA,
  },
  {
    id: 'm3-sjf-complexity',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Minimización de Espera: Análisis de Complejidad',
    conceptSubtitle: 'Costo Óptimo Theta(n log n) Basado en Ordenamiento',
    badgeLabel: '4. Complejidad Asintótica',
    partIndex: 4,
    totalParts: 4,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'MinimizarEsperaTDA.java',
      snippets: {
        pseudocode:
          'ALGORITMO MinimizarEspera(O: Vector<Tarea>) -> Vector<Tarea>\n    // Carga de tareas en Min-Heap: O(n log n)\n    // Extraccion sucesiva ordenada: O(n log n)\n    // Complejidad temporal: Theta(n log n)',
        java:
          'public static VectorTDA<Integer> minimizarEspera(\n    VectorTDA<Integer> tareas, int cantidad) throws Exception {\n    VectorTDA<Integer> res = new Vector<Integer>();\n    res.inicializarVector(cantidad);\n    ColaPrioridadTDA<Integer> cola = new ColaPrioridad<Integer>();\n    cola.InicializarCola();\n    for (int i = 0; i < cantidad; i++) {\n        cola.AgregarElemento(i, tareas.recuperarElemento(i));\n    }\n    int i = 0;\n    while (!cola.ColaVacia()) {\n        res.agregarElemento(i, cola.RecuperarMinElemento());\n        cola.EliminarMinPrioridad();\n        i++;\n    }\n    return res;\n}',
        python:
          '# Complejidad: Theta(n log n) tiempo, O(n) espacio',
      },
      preferredLanguage: 'java',
    },
    complexityData: SJF_COMPLEXITY_DATA,
  },

  {
    id: 'm3-konigsberg-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Euler y los Siete Puentes de Königsberg',
    conceptSubtitle: 'Fundación Topológica de Grafos y Condición de Grados',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 4,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Nacimiento de la teoría de grafos: Leonhard Euler (1736) resolvió el dilema de cruzar cada uno de los siete puentes sobre el río Pregel exactamente una vez.',
      bulletPoints: [
        'Abstracción Topológica: Euler prescindió de distancias y formas geométricas; modeló las 4 masas territoriales (Kneiphof, Lomse, Ribera Norte, Ribera Sur) como vértices y los 7 puentes como aristas.',
        'Teorema de Paridad de Euler: Para entrar y salir de un vértice sin repetir aristas, el grado debe ser par. Un ciclo euleriano cerrado exige que TODOS los vértices tengan grado par; un camino euleriano abierto exige exactamente DOS vértices impares.',
        'Demostración de Imposibilidad (1736): Los cuatro vértices tenían grado impar (Kneiphof=5, Norte=3, Sur=3, Lomse=3). Por tanto, el paseo euleriano era estrictamente imposible.',
        'Situación Post-1945 en Kaliningrado: Tras los bombardeos de la Segunda Guerra Mundial se destruyeron dos puentes históricos, dejando exactamente dos vértices de grado impar (Sur=3 y Lomse=3). Paradójicamente, hoy en día SÍ existe un camino euleriano resoluble.',
      ],
      formulas: [
        {
          label: 'Lema del Apretón de Manos (Euler)',
          latex: '\\sum_{v \\in V} \\text{grado}(v) = 2 |E| \\implies 5 + 3 + 3 + 3 = 14 = 2 \\times 7',
          description: 'La suma de los grados de todos los vértices es igual al doble del número total de aristas en el grafo.',
        },
      ],
      keyInsight:
        'La solución a problemas de conectividad depende exclusivamente de la estructura combinatoria y topológica, no de propiedades métricas.',
    },
  },
  {
    id: 'm3-konigsberg-pseudocode',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Condición Euleriana: Pseudocódigo',
    conceptSubtitle: 'Verificación de Caminos y Circuitos según Conteo de Impares',
    badgeLabel: '2. Pseudocódigo',
    partIndex: 2,
    totalParts: 4,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'VerificacionEuleriana(G: Grafo) -> Cadena',
      snippets: {
        pseudocode:
          'ALGORITMO VerificacionEuleriana(G: Grafo) -> Cadena\n    impares <- 0\n    Para cada v en Vertices(G) Hacer\n        Si Grado(G, v) MOD 2 != 0 Entonces\n            impares <- impares + 1\n        FinSi\n    FinPara\n    Si impares == 0 Entonces\n        Devolver "Existe Ciclo Euleriano"\n    Sino Si impares == 2 Entonces\n        Devolver "Existe Camino Euleriano"\n    Sino\n        Devolver "No es Euleriano (Imposible)"\n    FinSi',
        java:
          'public static String verificarEuler(int[][] adyacencia) {\n    int impares = 0;\n    for (int[] fila : adyacencia) {\n        int grado = 0;\n        for (int peso : fila) if (peso > 0) grado++;\n        if (grado % 2 != 0) impares++;\n    }\n    if (impares == 0) return "Ciclo Euleriano";\n    if (impares == 2) return "Camino Euleriano";\n    return "No es Euleriano";\n}',
        python:
          'def verificar_euleriano(grafo: dict[str, list[str]]) -> str:\n    impares = sum(1 for v in grafo if len(grafo[v]) % 2 != 0)\n    if impares == 0: return "Ciclo Euleriano"\n    if impares == 2: return "Camino Euleriano"\n    return "No es Euleriano"',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: KONIGSBERG_COMPLEXITY_DATA,
  },
  {
    id: 'm3-konigsberg-code',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Condición Euleriana: Implementación Java TDA',
    conceptSubtitle: 'Cálculo de Grados sobre Estructura GrafoTDA',
    badgeLabel: '3. Código Fuente',
    partIndex: 3,
    totalParts: 4,
    slideKind: 'code',
    codeSnippet: {
      title: 'VerificacionEulerianaTDA.java',
      snippets: {
        pseudocode:
          'ALGORITMO VerificacionEuleriana(G: Grafo) -> Cadena\n    ...\n    Si Grado(G, v) MOD 2 != 0 Entonces impares <- impares + 1',
        java:
          'public static String verificarCondicionEuleriana(GrafoTDA<Integer> g) throws Exception {\n    ConjuntoTDA<Integer> verts = g.Vertices();\n    int impares = 0;\n    while (!verts.conjuntoVacio()) {\n        int v = verts.elegir();\n        verts.sacar(v);\n        ConjuntoTDA<Integer> ady = g.Adyacentes(v);\n        int grado = 0;\n        while (!ady.conjuntoVacio()) {\n            int w = ady.elegir();\n            ady.sacar(w);\n            grado++;\n        }\n        if (grado % 2 != 0) {\n            impares++;\n        }\n    }\n    if (impares == 0) return "Ciclo Euleriano";\n    if (impares == 2) return "Camino Euleriano";\n    return "No es Euleriano";\n}',
        python:
          '# Verificacion topologica euleriana\ndef verificar_euler(g):\n    pass',
      },
      preferredLanguage: 'java',
    },
    complexityData: KONIGSBERG_COMPLEXITY_DATA,
  },
  {
    id: 'm3-konigsberg-complexity',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Condición Euleriana: Análisis de Complejidad',
    conceptSubtitle: 'Recorrido Lineal Theta(|V| + |E|) sobre Listas de Adyacencia',
    badgeLabel: '4. Complejidad Asintótica',
    partIndex: 4,
    totalParts: 4,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'VerificacionEulerianaTDA.java',
      snippets: {
        pseudocode:
          'ALGORITMO VerificacionEuleriana(G: Grafo) -> Cadena\n    Para cada v en Vertices(G):\n        grado <- Grado(v) // Suma total de aristas = 2|E|\n    Tiempo: Theta(|V| + |E|)',
        java:
          'public static String verificarCondicionEuleriana(\n    GrafoTDA<Integer> g) throws Exception {\n    ConjuntoTDA<Integer> verts = g.Vertices();\n    int impares = 0;\n    while (!verts.conjuntoVacio()) {\n        int v = verts.elegir();\n        verts.sacar(v);\n        ConjuntoTDA<Integer> ady = g.Adyacentes(v);\n        int grado = 0;\n        while (!ady.conjuntoVacio()) {\n            int w = ady.elegir();\n            ady.sacar(w);\n            grado++;\n        }\n        if (grado % 2 != 0) {\n            impares++;\n        }\n    }\n    if (impares == 0) return "Ciclo Euleriano";\n    if (impares == 2) return "Camino Euleriano";\n    return "No es Euleriano";\n}',
        python:
          '# Complejidad: Theta(|V| + |E|) tiempo, O(|V|) espacio',
      },
      preferredLanguage: 'java',
    },
    complexityData: KONIGSBERG_COMPLEXITY_DATA,
  },

  {
    id: 'dijkstra-algorithm-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Dijkstra (Caminos Mínimos desde un Origen)',
    conceptSubtitle: 'Relajación Voraz de Aristas y Restricción de Pesos No Negativos',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 6,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Problema de caminos mínimos (SSSP): Determinar la ruta de menor costo acumulado desde un origen s hacia todos los vértices en grafos dirigidos con pesos w(e) >= 0.',
      bulletPoints: [
        'Estrategia Voraz: En cada iteración se selecciona de los pendientes aquel con menor distancia provisional dist[u], declarándola definitiva.',
        'Operación de Relajación: Para cada vecino v pendiente de u, si dist[u] + w(u, v) < dist[v], se actualiza dist[v] = dist[u] + w(u, v) y prev[v] = u.',
        'Caso 1 vs Caso 2 de Cátedra: Caso 1 calcula el costo directo de los caminos mínimos; Caso 2 construye el Árbol de Caminos Mínimos (SPT) reteniendo prev[v].',
        'Restricción de No Negatividad: Dijkstra asume que al visitar un nodo su distancia ya es definitiva. La presencia de pesos negativos invalidaría las decisiones voraces previas.',
        'Instancia Canónica de Cátedra (6 Nodos): Con origen s=1, las relajaciones determinan dist[1]=0, dist[2]=2, dist[4]=5, dist[5]=5, dist[6]=8 y dist[3]=11.',
      ],
      formulas: [
        {
          label: 'Ecuación de Relajación',
          latex: 'd[v] = \\min\\big(d[v],\\; d[u] + w(u, v)\\big), \\quad w(u, v) \\ge 0',
          description: 'Actualización voraz de la cota superior de distancia acumulada hacia el vértice vecino v.',
        },
      ],
      keyInsight:
        'Dado que todos los pesos son no negativos, cualquier camino alternativo que pase por nodos aún no visitados tendrá un costo mayor o igual al mínimo actual.',
    },
  },
  {
    id: 'dijkstra-algorithm-visualizer',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Dijkstra (Caminos Mínimos desde un Origen)',
    conceptSubtitle: 'Simulación Interactiva en Grafo y Vectores de Control',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 6,
    slideKind: 'visualizer',
    visualizerId: 'dijkstra-graph',
  },
  {
    id: 'dijkstra-algorithm-pseudocode',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Dijkstra (Caminos Mínimos desde un Origen)',
    conceptSubtitle: 'Pseudocódigo Canónico con Vectores de Distancia y Predecesores',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 6,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'Dijkstra',
      snippets: {
        pseudocode:
          'Funcion Dijkstra(Grafo, costos, origen, n) : Vector\nInicio\n    Visitados <- {origen}\n    Para v <- 1 Hasta n Hacer\n        D[v] <- costos[origen, v]\n        P[v] <- origen\n    FinPara\n    Repetir n - 1 veces\n        w <- VerticeNoVisitadoConMenorDistancia(D, Visitados)\n        Visitados <- Visitados U {w}\n        Para cada v en (Vertices - Visitados) Hacer\n            Si D[w] + costos[w, v] < D[v] Entonces\n                D[v] <- D[w] + costos[w, v]\n                P[v] <- w\n            FinSi\n        FinPara\n    FinRepetir\n    Devolver D\nFin',
        java:
          'import java.util.Arrays;\n\npublic class DijkstraShortestPath {\n    public static int[] computeShortestDistances(int[][] matrix, int src) {\n        int n = matrix.length;\n        int[] dist = new int[n];\n        boolean[] visited = new boolean[n];\n        Arrays.fill(dist, Integer.MAX_VALUE);\n        dist[src] = 0;\n        for (int step = 0; step < n - 1; step++) {\n            int u = selectUnvisitedMinimumVertex(dist, visited);\n            if (u == -1) break;\n            visited[u] = true;\n            for (int v = 0; v < n; v++) {\n                int w = matrix[u][v];\n                if (!visited[v] && w > 0 && dist[u] != Integer.MAX_VALUE) {\n                    int d = dist[u] + w;\n                    if (d < dist[v]) dist[v] = d;\n                }\n            }\n        }\n        return dist;\n    }\n}',
        python:
          'import heapq\n\ndef dijkstra_shortest_paths(adjacency_list: dict[int, list[tuple[int, int]]], source_node: int) -> dict[int, float]:\n    distances: dict[int, float] = {node: float("inf") for node in adjacency_list}\n    distances[source_node] = 0.0\n    priority_queue: list[tuple[float, int]] = [(0.0, source_node)]\n\n    while priority_queue:\n        current_distance, current_node = heapq.heappop(priority_queue)\n        if current_distance > distances[current_node]:\n            continue\n        for neighbor, edge_weight in adjacency_list[current_node]:\n            candidate_distance = current_distance + edge_weight\n            if candidate_distance < distances[neighbor]:\n                distances[neighbor] = candidate_distance\n                heapq.heappush(priority_queue, (candidate_distance, neighbor))\n    return distances',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: DIJKSTRA_COMPLEXITY_DATA,
  },
  {
    id: 'dijkstra-algorithm-code-main',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Dijkstra (Caminos Mínimos desde un Origen)',
    conceptSubtitle: 'Parte 1: Bucle de Relajación Principal (Java / Python)',
    badgeLabel: '4. Código Principal',
    partIndex: 4,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'DijkstraShortestPath.java',
      snippets: {
        pseudocode:
          'Funcion Dijkstra(Grafo, costos, origen, n) : Vector\n    ...\n    Si D[w] + costos[w, v] < D[v] Entonces D[v] <- D[w] + costos[w, v]',
        java:
          'public class DijkstraShortestPath {\n    public static int[] computeShortestDistances(int[][] matrix, int src) {\n        int n = matrix.length;\n        int[] dist = new int[n];\n        boolean[] visited = new boolean[n];\n        Arrays.fill(dist, Integer.MAX_VALUE);\n        dist[src] = 0;\n\n        for (int step = 0; step < n - 1; step++) {\n            int u = selectUnvisitedMinimumVertex(dist, visited);\n            if (u == -1) break;\n            visited[u] = true;\n            for (int v = 0; v < n; v++) {\n                int w = matrix[u][v];\n                if (!visited[v] && w > 0 && dist[u] != Integer.MAX_VALUE) {\n                    int d = dist[u] + w;\n                    if (d < dist[v]) dist[v] = d;\n                }\n            }\n        }\n        return dist;\n    }\n}',
        python:
          'import heapq\n\ndef dijkstra_shortest_paths(adjacency_list, source_node):\n    distances = {node: float("inf") for node in adjacency_list}\n    distances[source_node] = 0.0\n    priority_queue = [(0.0, source_node)]\n    while priority_queue:\n        cur_d, u = heapq.heappop(priority_queue)\n        if cur_d > distances[u]: continue\n        for v, w in adjacency_list[u]:\n            if cur_d + w < distances[v]:\n                distances[v] = cur_d + w\n                heapq.heappush(priority_queue, (cur_d + w, v))\n    return distances',
      },
      preferredLanguage: 'java',
    },
    complexityData: DIJKSTRA_COMPLEXITY_DATA,
  },
  {
    id: 'dijkstra-algorithm-code-select',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Dijkstra (Caminos Mínimos desde un Origen)',
    conceptSubtitle: 'Parte 2: Selección Voraz del Vértice Mínimo No Visitado',
    badgeLabel: '5. Método Auxiliar',
    partIndex: 5,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'selectUnvisitedMinimumVertex.java',
      snippets: {
        pseudocode:
          'Funcion VerticeNoVisitadoConMenorDistancia(D, Visitados) : Vertice\n    min <- Infinito; u <- Nulo\n    Para cada v en (Vertices - Visitados) Hacer\n        Si D[v] < min Entonces min <- D[v]; u <- v FinSi\n    FinPara\n    Devolver u',
        java:
          'private static int selectUnvisitedMinimumVertex(\n    int[] distances, boolean[] visited) {\n    int minimumDistance = Integer.MAX_VALUE;\n    int selectedVertex = -1;\n    for (int vertex = 0; vertex < distances.length; vertex++) {\n        if (!visited[vertex] && distances[vertex] < minimumDistance) {\n            minimumDistance = distances[vertex];\n            selectedVertex = vertex;\n        }\n    }\n    return selectedVertex;\n}',
        python:
          'def select_unvisited_min(distances, visited):\n    min_dist = float("inf"); selected = -1\n    for v, d in enumerate(distances):\n        if not visited[v] and d < min_dist:\n            min_dist = d; selected = v\n    return selected',
      },
      preferredLanguage: 'java',
    },
    complexityData: DIJKSTRA_COMPLEXITY_DATA,
  },
  {
    id: 'dijkstra-algorithm-complexity',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Dijkstra (Caminos Mínimos desde un Origen)',
    conceptSubtitle: 'Matriz Theta(V^2) vs Min-Heap O((V + E) log V)',
    badgeLabel: '6. Complejidad Asintótica',
    partIndex: 6,
    totalParts: 6,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'DijkstraShortestPath.java',
      snippets: {
        pseudocode:
          'Funcion Dijkstra(Grafo, costos, origen, n)\n    Para v <- 1 Hasta n: D[v] <- costos[origen, v] FinPara // O(V)\n    Repetir n - 1 veces:                                   // V iteraciones\n        w <- VerticeNoVisitadoConMenorDistancia(D)          // O(V)\n        Para cada vecino v: Relajar D[v]                    // O(V)\n    Total: Theta(V^2) con matriz / O((V + E) log V) con heap',
        java:
          'public static int[] computeShortestDistances(\n    int[][] matriz, int origen) {\n    int n = matriz.length;\n    int[] dist = new int[n];\n    boolean[] visitado = new boolean[n];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[origen] = 0;\n    for (int step = 0; step < n - 1; step++) {\n        int u = selectUnvisitedMinimumVertex(dist, visitado);\n        if (u == -1) break;\n        visitado[u] = true;\n        for (int v = 0; v < n; v++) {\n            int peso = matriz[u][v];\n            if (!visitado[v] && peso > 0\n                && dist[u] != Integer.MAX_VALUE) {\n                int nueva = dist[u] + peso;\n                if (nueva < dist[v]) dist[v] = nueva;\n            }\n        }\n    }\n    return dist;\n}',
        python:
          '# Dijkstra Min-Heap: O((V + E) log V)',
      },
      preferredLanguage: 'java',
    },
    complexityData: DIJKSTRA_COMPLEXITY_DATA,
  },

  {
    id: 'prim-mst-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Prim (Árbol de Recubrimiento Mínimo)',
    conceptSubtitle: 'Crecimiento de Árbol Conexo por Cortes y Aristas Seguras',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 7,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Definición de MST: Subgrafo conexo y acíclico T = (V, E\') con |V| - 1 aristas que conecta todos los vértices minimizando la suma total de sus pesos.',
      bulletPoints: [
        'Estrategia Voraz por Cortes: Prim expande un único árbol conexo a partir de una raíz r, seleccionando la arista de corte de menor peso que conecta un nodo del árbol con un vértice externo.',
        'Lema de Corte (Cut Property): Para cualquier corte (S, V - S), la arista más liviana que cruza el corte pertenece forzosamente a algún Árbol de Recubrimiento Mínimo.',
        'Vectores de Control: masCercano[i] guarda el vértice del árbol más próximo al nodo externo i; minDist[i] almacena el peso de dicha arista.',
        'Garantía Acíclica: Dado que cada nueva arista conecta un nodo del árbol con uno estrictamente exterior, jamás puede formarse un ciclo.',
        'Instancia Canónica de Cátedra (7 Nodos): Con vértices {a, b, c, d, e, f, g} iniciando en d, incorpora c(5), b(3), g(3), a(1), f(2) y e(4), con peso total mínimo 18.',
      ],
      formulas: [
        {
          label: 'Invariante de Arista Segura',
          latex: 'e = \\arg\\min_{u \\in S, v \\in V \\setminus S} w(u, v) \\implies T \\leftarrow T \\cup \\{e\\}',
          description: 'La arista de menor peso que cruza el corte es segura para ser añadida al árbol en construcción.',
        },
      ],
      keyInsight:
        'El subgrafo construido por Prim es conexo en todas las etapas intermedias, haciéndolo ideal para grafos densos.',
    },
  },
  {
    id: 'prim-mst-visualizer',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Prim (Árbol de Recubrimiento Mínimo)',
    conceptSubtitle: 'Comparativa Visual Prim vs Kruskal Paso a Paso',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 7,
    slideKind: 'visualizer',
    visualizerId: 'prim-vs-kruskal',
  },
  {
    id: 'prim-mst-pseudocode',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Prim (Árbol de Recubrimiento Mínimo)',
    conceptSubtitle: 'Vectores de Distancia Mínima y Actualización de Vecindad',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 7,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'Prim(L: Matriz[n][n]) -> ConjuntoAristas',
      snippets: {
        pseudocode:
          'Procedimiento Prim(Grafo, costos, n)\nInicio\n    Visitados <- {1}\n    Para i <- 2 Hasta n Hacer\n        MenorCosto[i] <- costos[1, i]\n        MasCercano[i] <- 1\n    FinPara\n    Repetir n - 1 veces\n        w <- VerticeConMenorCostoConexion(MenorCosto, Visitados)\n        Visitados <- Visitados U {w}\n        AgregarAristaMST(MasCercano[w], w)\n        Para cada v en (Vertices - Visitados) Hacer\n            Si costos[w, v] < MenorCosto[v] Entonces\n                MenorCosto[v] <- costos[w, v]\n                MasCercano[v] <- w\n            FinSi\n        FinPara\n    FinRepetir\nFin',
        java:
          'public class PrimMinimumSpanningTree {\n    public static int computeMstTotalWeight(int[][] costMatrix) {\n        int vertexCount = costMatrix.length;\n        boolean[] inTree = new boolean[vertexCount];\n        int[] minEdgeWeight = new int[vertexCount];\n        inTree[0] = true;\n        for (int vertex = 1; vertex < vertexCount; vertex++) {\n            minEdgeWeight[vertex] = costMatrix[0][vertex];\n        }\n\n        int totalMstWeight = 0;\n        for (int step = 1; step < vertexCount; step++) {\n            int bestVertex = -1;\n            int smallestWeight = Integer.MAX_VALUE;\n            for (int candidate = 1; candidate < vertexCount; candidate++) {\n                if (!inTree[candidate] && minEdgeWeight[candidate] < smallestWeight) {\n                    smallestWeight = minEdgeWeight[candidate];\n                    bestVertex = candidate;\n                }\n            }\n            inTree[bestVertex] = true;\n            totalMstWeight += smallestWeight;\n            for (int neighbor = 1; neighbor < vertexCount; neighbor++) {\n                if (!inTree[neighbor] && costMatrix[bestVertex][neighbor] < minEdgeWeight[neighbor]) {\n                    minEdgeWeight[neighbor] = costMatrix[bestVertex][neighbor];\n                }\n            }\n        }\n        return totalMstWeight;\n    }\n}',
        python:
          'def prim_mst_total_weight(cost_matrix: list[list[float]]) -> float:\n    vertex_count = len(cost_matrix)\n    in_tree = [False] * vertex_count\n    min_edge_weight = [cost_matrix[0][v] for v in range(vertex_count)]\n    in_tree[0] = True\n    total_mst_weight = 0.0\n\n    for _ in range(vertex_count - 1):\n        best_vertex = min(\n            (v for v in range(vertex_count) if not in_tree[v]),\n            key=lambda v: min_edge_weight[v]\n        )\n        in_tree[best_vertex] = True\n        total_mst_weight += min_edge_weight[best_vertex]\n        for neighbor in range(vertex_count):\n            if not in_tree[neighbor] and cost_matrix[best_vertex][neighbor] < min_edge_weight[neighbor]:\n                min_edge_weight[neighbor] = cost_matrix[best_vertex][neighbor]\n    return total_mst_weight',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: PRIM_COMPLEXITY_DATA,
  },
  {
    id: 'prim-mst-code-init',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Prim (Árbol de Recubrimiento Mínimo)',
    conceptSubtitle: 'Parte 1: Inicialización de Vértices y Distancias Raíz',
    badgeLabel: '4. Código: Inicialización',
    partIndex: 4,
    totalParts: 7,
    slideKind: 'code',
    codeSnippet: {
      title: 'PrimMSTInit.java',
      snippets: {
        pseudocode:
          'Visitados <- {1}\nPara i <- 2 Hasta n Hacer\n    MenorCosto[i] <- costos[1, i]\n    MasCercano[i] <- 1\nFinPara',
        java:
          'public static int computeMstTotalWeight(int[][] costMatrix) {\n    int vertexCount = costMatrix.length;\n    boolean[] inTree = new boolean[vertexCount];\n    int[] minEdgeWeight = new int[vertexCount];\n    inTree[0] = true;\n    for (int vertex = 1; vertex < vertexCount; vertex++) {\n        minEdgeWeight[vertex] = costMatrix[0][vertex];\n    }\n    int totalMstWeight = 0;\n    // Continua en la siguiente diapositiva con el bucle voraz\n    return totalMstWeight;\n}',
        python:
          'def prim_init(cost_matrix):\n    n = len(cost_matrix)\n    in_tree = [False] * n; in_tree[0] = True\n    min_dist = [cost_matrix[0][v] for v in range(n)]\n    return in_tree, min_dist',
      },
      preferredLanguage: 'java',
    },
    complexityData: PRIM_COMPLEXITY_DATA,
  },
  {
    id: 'prim-mst-code-loop',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Prim (Árbol de Recubrimiento Mínimo)',
    conceptSubtitle: 'Parte 2: Bucle Voraz de Selección de Corte y Relajación',
    badgeLabel: '5. Código: Bucle Voraz',
    partIndex: 5,
    totalParts: 7,
    slideKind: 'code',
    codeSnippet: {
      title: 'PrimMSTLoop.java',
      snippets: {
        pseudocode:
          'Repetir n - 1 veces\n    w <- VerticeConMenorCostoConexion(MenorCosto, Visitados)\n    Visitados <- Visitados U {w}\n    AgregarAristaMST(MasCercano[w], w)\n    Para cada v en (Vertices - Visitados) Hacer\n        Si costos[w, v] < MenorCosto[v] Entonces\n            MenorCosto[v] <- costos[w, v]; MasCercano[v] <- w\n        FinSi\n    FinPara\nFinRepetir',
        java:
          'for (int step = 1; step < vertexCount; step++) {\n    int bestVertex = -1;\n    int smallestWeight = Integer.MAX_VALUE;\n    for (int candidate = 1; candidate < vertexCount; candidate++) {\n        if (!inTree[candidate] && minEdgeWeight[candidate] < smallestWeight) {\n            smallestWeight = minEdgeWeight[candidate];\n            bestVertex = candidate;\n        }\n    }\n    inTree[bestVertex] = true;\n    totalMstWeight += smallestWeight;\n    for (int neighbor = 1; neighbor < vertexCount; neighbor++) {\n        int w = costMatrix[bestVertex][neighbor];\n        if (!inTree[neighbor] && w < minEdgeWeight[neighbor]) {\n            minEdgeWeight[neighbor] = w;\n        }\n    }\n}',
        python:
          'for _ in range(n - 1):\n    best = min((v for v in range(n) if not in_tree[v]), key=lambda v: min_dist[v])\n    in_tree[best] = True; total += min_dist[best]\n    for v in range(n):\n        if not in_tree[v] and matrix[best][v] < min_dist[v]:\n            min_dist[v] = matrix[best][v]',
      },
      preferredLanguage: 'java',
    },
    complexityData: PRIM_COMPLEXITY_DATA,
  },
  {
    id: 'prim-mst-code-helper',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Prim (Árbol de Recubrimiento Mínimo)',
    conceptSubtitle: 'Parte 3: Método Auxiliar de Clonación para GrafoTDA',
    badgeLabel: '6. Método Auxiliar',
    partIndex: 6,
    totalParts: 7,
    slideKind: 'code',
    codeSnippet: {
      title: 'PrimHelper.java',
      snippets: {
        pseudocode:
          'FUNCION Clonar(c: Conjunto) -> Conjunto\n    // Clona los elementos preservando el conjunto original',
        java:
          'private static ConjuntoTDA<Integer> clonar(ConjuntoTDA<Integer> c) throws Exception {\n    ConjuntoTDA<Integer> clon = new Conjunto<Integer>();\n    clon.inicializarConjunto();\n    ConjuntoTDA<Integer> aux = new Conjunto<Integer>();\n    aux.inicializarConjunto();\n    while (!c.conjuntoVacio()) {\n        int elem = c.elegir();\n        c.sacar(elem);\n        aux.agregar(elem);\n    }\n    while (!aux.conjuntoVacio()) {\n        int elem = aux.elegir();\n        aux.sacar(elem);\n        c.agregar(elem);\n        clon.agregar(elem);\n    }\n    return clon;\n}',
        python:
          'def clonar_conjunto(conjunto: set) -> set:\n    return conjunto.copy()',
      },
      preferredLanguage: 'java',
    },
    complexityData: PRIM_COMPLEXITY_DATA,
  },
  {
    id: 'prim-mst-complexity',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Algoritmo de Prim (Árbol de Recubrimiento Mínimo)',
    conceptSubtitle: 'Matriz Cuadrática Theta(V^2) vs Heap O(E log V)',
    badgeLabel: '7. Complejidad Asintótica',
    partIndex: 7,
    totalParts: 7,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'PrimMST.java',
      snippets: {
        pseudocode:
          'ALGORITMO Prim(L: Matriz[n][n])\n    // Etapas: n - 1\n    // En cada etapa: busqueda O(n) + actualizacion O(n)\n    // Costo total: Theta(n^2)',
        java:
          'public static int computeMstTotalWeight(int[][] matriz) {\n    int n = matriz.length, total = 0;\n    boolean[] enArbol = new boolean[n]; int[] minDist = new int[n];\n    enArbol[0] = true;\n    for (int v = 1; v < n; v++) minDist[v] = matriz[0][v];\n    for (int step = 1; step < n; step++) {\n        int best = -1, minW = Integer.MAX_VALUE;\n        for (int c = 1; c < n; c++) {\n            if (!enArbol[c] && minDist[c] < minW) { minW = minDist[c]; best = c; }\n        }\n        enArbol[best] = true; total += minW;\n        for (int v = 1; v < n; v++) {\n            if (!enArbol[v] && matriz[best][v] < minDist[v]) minDist[v] = matriz[best][v];\n        }\n    }\n    return total;\n}',
        python:
          '# Prim: Theta(V^2) con matriz, O(E log V) con Min-Heap',
      },
      preferredLanguage: 'java',
    },
    complexityData: PRIM_COMPLEXITY_DATA,
  },

  {
    id: 'kruskal-mst-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Kruskal (Union-Find): Árbol de Recubrimiento Mínimo',
    conceptSubtitle: 'Crecimiento de Floresta y Detección de Ciclos con Union-Find',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 6,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Perspectiva centrada en aristas: Joseph Kruskal (1956) propuso ordenar todas las aristas de forma ascendente e incorporarlas vorazmente evitando ciclos.',
      bulletPoints: [
        'Crecimiento por Floresta: Inicialmente cada uno de los |V| vértices constituye un componente conexo disjunto (árbol trivial de un solo nodo).',
        'Detección de Ciclos con Conjuntos Disjuntos: Para una arista e = (u, v), si buscar(u) != buscar(v), los extremos pertenecen a componentes diferentes; la arista es FACTIBLE y se fusionan mediante combinar(buscar(u), buscar(v)).',
        'Descarte Definitivo: Si buscar(u) == buscar(v), agregar la arista formaría un ciclo cerrado; es NO FACTIBLE y se descarta de forma irrevocable.',
        'Instancia Canónica de Cátedra: Mismo grafo de 7 nodos. Procesa (a,g)=1 [✓], (f,g)=2 [✓], (b,c)=3 [✓], (c,g)=3 [✓], (a,b)=4 [✗ ciclo], (e,g)=4 [✓], (a,f)=5 [✗ ciclo], (c,d)=5 [✓]. Con 6 aristas aceptadas finaliza con costo 18.',
        'Estructura Union-Find Optimizada: Con unión por rango y compresión de caminos, las consultas y fusiones toman tiempo amortizado casi constante O(alpha(V)).',
      ],
      formulas: [
        {
          label: 'Condición de Factibilidad Acíclica',
          latex: '\\text{Find}(u) \\ne \\text{Find}(v) \\implies T \\leftarrow T \\cup \\{(u, v)\\}, \\quad \\text{Union}(u, v)',
          description: 'Incorpora la arista liviana si y solo si sus extremos pertenecen a componentes conexos disjuntos.',
        },
      ],
      keyInsight:
        'A diferencia de Prim, el subgrafo de Kruskal no es conexo durante las etapas intermedias, evolucionando como una floresta hasta la unificación final.',
    },
  },
  {
    id: 'kruskal-mst-visualizer',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Kruskal (Union-Find): Árbol de Recubrimiento Mínimo',
    conceptSubtitle: 'Simulación Paso a Paso de Ordenamiento de Aristas y Union-Find',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 6,
    slideKind: 'visualizer',
    visualizerId: 'prim-vs-kruskal',
  },
  {
    id: 'kruskal-mst-pseudocode',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Kruskal (Union-Find): Árbol de Recubrimiento Mínimo',
    conceptSubtitle: 'Esquema de Ordenamiento Global y Manipulación de Disjoint Sets',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 6,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'Kruskal(G: Grafo) -> ConjuntoAristas',
      snippets: {
        pseudocode:
          'Funcion Kruskal(Vertices, Aristas, n) : ConjuntoAristas\nInicio\n    OrdenarPorPesoAscendente(Aristas)\n    InicializarConjuntosDisjuntos(n)\n    ArbolMST <- Vacio\n    Para cada arista (u, v, peso) en Aristas Hacer\n        compU <- BuscarRepresentante(u)\n        compV <- BuscarRepresentante(v)\n        Si compU != compV Entonces\n            ArbolMST <- ArbolMST U {(u, v, peso)}\n            FusionarConjuntos(compU, compV)\n        FinSi\n    FinPara\n    Devolver ArbolMST\nFin',
        java:
          'public static int computeMstWeight(int vertexCount, Edge[] edges) {\n    Arrays.sort(edges, Comparator.comparingInt(Edge::weight));\n    int[] parent = new int[vertexCount];\n    for (int i = 0; i < vertexCount; i++) parent[i] = i;\n    int totalWeight = 0, selectedEdges = 0;\n    for (Edge edge : edges) {\n        int rootSource = find(parent, edge.source());\n        int rootTarget = find(parent, edge.target());\n        if (rootSource != rootTarget) {\n            parent[rootSource] = rootTarget;\n            totalWeight += edge.weight();\n            selectedEdges++;\n            if (selectedEdges == vertexCount - 1) break;\n        }\n    }\n    return totalWeight;\n}',
        python:
          'def kruskal_mst_weight(vertex_count: int, edges: list[tuple[int, int, int]]) -> int:\n    parent = list(range(vertex_count))\n    def find(i):\n        if parent[i] == i: return i\n        parent[i] = find(parent[i])\n        return parent[i]\n    sorted_edges = sorted(edges, key=lambda e: e[2])\n    total_weight = 0; edges_added = 0\n    for u, v, w in sorted_edges:\n        ru, rv = find(u), find(v)\n        if ru != rv:\n            parent[ru] = rv; total_weight += w; edges_added += 1\n            if edges_added == vertex_count - 1: break\n    return total_weight',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: KRUSKAL_COMPLEXITY_DATA,
  },
  {
    id: 'kruskal-mst-code-setup',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Kruskal (Union-Find): Árbol de Recubrimiento Mínimo',
    conceptSubtitle: 'Parte 1: Ordenamiento de Aristas y Conjuntos Iniciales',
    badgeLabel: '4. Código: Ordenamiento',
    partIndex: 4,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'KruskalSetup.java',
      snippets: {
        pseudocode:
          'OrdenarPorPesoAscendente(Aristas)\nInicializarConjuntosDisjuntos(n)\nArbolMST <- Vacio',
        java:
          'public record Edge(int source, int target, int weight) {}\n\npublic static int computeMstWeight(int vertexCount, Edge[] edges) {\n    Arrays.sort(edges, Comparator.comparingInt(Edge::weight));\n    int[] parent = new int[vertexCount];\n    for (int i = 0; i < vertexCount; i++) {\n        parent[i] = i;\n    }\n    int totalWeight = 0;\n    int selectedEdges = 0;\n    // Continua en la siguiente diapositiva con el bucle de union\n    return totalWeight;\n}',
        python:
          'def kruskal_setup(n, edges):\n    sorted_edges = sorted(edges, key=lambda e: e[2])\n    parent = list(range(n))\n    return sorted_edges, parent',
      },
      preferredLanguage: 'java',
    },
    complexityData: KRUSKAL_COMPLEXITY_DATA,
  },
  {
    id: 'kruskal-mst-code-loop',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Kruskal (Union-Find): Árbol de Recubrimiento Mínimo',
    conceptSubtitle: 'Parte 2: Bucle Voraz, Detección de Ciclos y Fusión',
    badgeLabel: '5. Código: Fusión y Ciclos',
    partIndex: 5,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'KruskalLoop.java',
      snippets: {
        pseudocode:
          'Para cada arista (u, v, peso) en Aristas Hacer\n    compU <- BuscarRepresentante(u)\n    compV <- BuscarRepresentante(v)\n    Si compU != compV Entonces\n        ArbolMST <- ArbolMST U {(u, v, peso)}\n        FusionarConjuntos(compU, compV)\n    FinSi\nFinPara',
        java:
          'for (Edge edge : edges) {\n    int rootSource = find(parent, edge.source());\n    int rootTarget = find(parent, edge.target());\n    if (rootSource != rootTarget) {\n        parent[rootSource] = rootTarget;\n        totalWeight += edge.weight();\n        selectedEdges++;\n        if (selectedEdges == vertexCount - 1) break;\n    }\n}\n\nprivate static int find(int[] parent, int i) {\n    if (parent[i] == i) return i;\n    return parent[i] = find(parent, parent[i]);\n}',
        python:
          'for u, v, w in sorted_edges:\n    ru, rv = find(parent, u), find(parent, v)\n    if ru != rv:\n        parent[ru] = rv; total += w; count += 1\n        if count == n - 1: break',
      },
      preferredLanguage: 'java',
    },
    complexityData: KRUSKAL_COMPLEXITY_DATA,
  },
  {
    id: 'kruskal-mst-complexity',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Kruskal (Union-Find): Árbol de Recubrimiento Mínimo',
    conceptSubtitle: 'Dominancia del Ordenamiento Theta(E log V)',
    badgeLabel: '6. Complejidad Asintótica',
    partIndex: 6,
    totalParts: 6,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'KruskalMST.java',
      snippets: {
        pseudocode:
          'Funcion Kruskal(Vertices, Aristas, n)\n    // Ordenamiento: Theta(|E| log |V|)\n    // Find y Union: O(|E| alpha(|V|))\n    // Total: Theta(|E| log |V|)',
        java:
          'public static int computeMstWeight(int n, Edge[] edges) {\n    Arrays.sort(edges, Comparator.comparingInt(Edge::weight));\n    int[] parent = new int[n];\n    for (int i = 0; i < n; i++) parent[i] = i;\n    int total = 0;\n    int aceptadas = 0;\n    for (Edge edge : edges) {\n        int rootU = find(parent, edge.source());\n        int rootV = find(parent, edge.target());\n        if (rootU != rootV) {\n            parent[rootU] = rootV;\n            total += edge.weight();\n            aceptadas++;\n            if (aceptadas == n - 1) break;\n        }\n    }\n    return total;\n}',
        python:
          '# Kruskal: Theta(E log V) tiempo, O(V + E) espacio',
      },
      preferredLanguage: 'java',
    },
    complexityData: KRUSKAL_COMPLEXITY_DATA,
  },

  {
    id: 'shortest-paths-vs-mst-theory',
    moduleId: 'module-3-greedy-and-graphs',
    moduleTitle: MODULE_3_TITLE,
    conceptTitle: 'Caminos Mínimos (Dijkstra) vs Árbol de Recubrimiento Mínimo (Prim / Kruskal)',
    conceptSubtitle: 'Criterio Ingenieril según el Espectro de Densidad Topológica',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 1,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Selección óptima de arquitectura: Aunque Prim y Kruskal resuelven el MST con idéntico costo total, su rendimiento computacional difiere drásticamente según la densidad de conexiones del grafo.',
      bulletPoints: [
        'Espectro de Conectividad: En todo grafo conexo, el número de aristas satisface |V| - 1 <= |E| <= |V|(|V| - 1)/2.',
        'Grafos Ralos o Poco Densos (|E| ~ |V|): Redes de transporte o mallas donde cada nodo tiene pocos enlaces. Kruskal con O(|V| log |V|) aventaja a Prim cuadrático Theta(|V|^2) por un orden de magnitud logarítmico contra polinomial.',
        'Grafos Densos o Fuertemente Conectados (|E| ~ |V|^2): Redes casi completas. Prim con matriz de adyacencia Theta(|V|^2) supera a Kruskal O(|V|^2 log |V|) al ahorrarse el factor logarítmico del ordenamiento de aristas superfluas.',
        'Prim con Fibonacci Heap: Reduce el tiempo a O(|E| + |V| log |V|), igualando a la matriz en grafos densos pero con una constante oculta pesada en la práctica.',
      ],
      formulas: [
        {
          label: 'Umbral Teórico de Decisión',
          latex: '|E| < \\frac{|V|^2}{\\log_2 |V|} \\implies \\text{Elegir Kruskal}, \\quad \\text{caso contrario} \\implies \\text{Elegir Prim}',
          description: 'Criterio cuantitativo de selección automática de algoritmo según el ratio de aristas por vértice.',
        },
      ],
      keyInsight:
        'Kruskal domina en grafos ralos representados por listas; Prim domina en grafos densos representados por matrices de adyacencia.',
    },
  },
];

import { ConceptSlide } from '../../core/domain/coreTypes';

const MODULE_4_TITLE = 'Programación Dinámica';

const DP_GENERIC_COMPLEXITY_DATA = {
  temporalLatex: 'O(|\\mathcal{S}| \\cdot \\text{deg})',
  spatialLatex: 'O(|\\mathcal{S}|)',
  bestCaseLatex: 'O(|\\mathcal{S}| \\cdot \\text{deg})',
  averageCaseLatex: 'O(|\\mathcal{S}| \\cdot \\text{deg})',
  worstCaseLatex: 'O(|\\mathcal{S}| \\cdot \\text{deg})',
  theoremApplied: 'T = \\sum_{s \\in \\mathcal{S}} \\text{deg}(s) = O(|\\mathcal{S}| \\cdot \\max \\text{deg})',
  justification:
    'El costo temporal es el producto del número total de subproblemas únicos (cardinalidad del espacio de estados) multiplicado por la cantidad de decisiones o transiciones consideradas por cada subproblema. La complejidad espacial corresponde a la cantidad de celdas reservadas en la tabla de memoización o tabulación.',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 5,
      endLine: 7,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 8,
      endLine: 13,
      asymptoticCost: 'O(\\text{deg})',
    },
    {
      startLine: 14,
      endLine: 16,
      asymptoticCost: 'O(1)',
    },
  ],
};

const FIBONACCI_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n)',
  spatialLatex: '\\Theta(n) \\text{ VectorTDA} / \\Theta(1) \\text{ optimizado}',
  bestCaseLatex: '\\Theta(1) \\text{ para } n \\le 1',
  averageCaseLatex: '\\Theta(n)',
  worstCaseLatex: '\\Theta(n)',
  theoremApplied: 'T(n) = O(1) + \\sum_{i=2}^n O(1) = \\Theta(n)',
  justification:
    'El bucle se ejecuta exactamente n - 1 veces, realizando sumas y accesos vectoriales en tiempo constante O(1). Se sustituye el árbol exponencial O(2^n) por una trayectoria lineal Theta(n). Manteniendo dos variables acumuladoras prev1 y prev2, la memoria se reduce a Theta(1).',
  annotations: [
    {
      startLine: 2,
      endLine: 3,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 4,
      endLine: 7,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 8,
      endLine: 12,
      asymptoticCost: '\\Theta(n)',
    },
    {
      startLine: 13,
      endLine: 13,
      asymptoticCost: 'O(1)',
    },
  ],
};

const COIN_CHANGE_DP_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(k \\cdot v)',
  spatialLatex: '\\Theta(k \\cdot v)',
  bestCaseLatex: '\\Theta(k \\cdot v)',
  averageCaseLatex: '\\Theta(k \\cdot v)',
  worstCaseLatex: '\\Theta(k \\cdot v)',
  theoremApplied: 'T(k, v) = \\sum_{i=0}^{k-1} \\sum_{j=1}^v O(1) = \\Theta(k \\cdot v)',
  justification:
    'La matriz posee k filas correspondientes a las denominaciones de monedas y v + 1 columnas para cada valor intermedio. Cada celda se calcula en tiempo O(1) mediante una suma y una comparación mínima. La reconstrucción por backtracking toma a lo sumo k + v pasos.',
  annotations: [
    {
      startLine: 2,
      endLine: 6,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 7,
      endLine: 9,
      asymptoticCost: 'O(k)',
    },
    {
      startLine: 10,
      endLine: 17,
      asymptoticCost: '\\Theta(k \\cdot v)',
    },
    {
      startLine: 18,
      endLine: 18,
      asymptoticCost: 'O(1)',
    },
  ],
};

const KNAPSACK_01_DP_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n \\cdot W)',
  spatialLatex: '\\Theta(n \\cdot W)',
  bestCaseLatex: '\\Theta(n \\cdot W)',
  averageCaseLatex: '\\Theta(n \\cdot W)',
  worstCaseLatex: '\\Theta(n \\cdot W)',
  theoremApplied: 'T(n, W) = \\sum_{i=1}^n \\sum_{w=0}^W O(1) = \\Theta(n \\cdot W)',
  justification:
    'El algoritmo completa sistemáticamente una tabla de (n + 1) filas y (W + 1) columnas. Cada estado evalúa la alternativa de incluir o descartar el objeto i en tiempo O(1). La complejidad es pseudopolinomial, siendo polinomial respecto a W pero exponencial respecto a su longitud binaria log W.',
  annotations: [
    {
      startLine: 2,
      endLine: 5,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 6,
      endLine: 7,
      asymptoticCost: 'O(n + W)',
    },
    {
      startLine: 8,
      endLine: 17,
      asymptoticCost: '\\Theta(n \\cdot W)',
    },
    {
      startLine: 18,
      endLine: 18,
      asymptoticCost: 'O(1)',
    },
  ],
};

const LCS_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(m \\cdot n)',
  spatialLatex: '\\Theta(m \\cdot n)',
  bestCaseLatex: '\\Theta(m \\cdot n)',
  averageCaseLatex: '\\Theta(m \\cdot n)',
  worstCaseLatex: '\\Theta(m \\cdot n)',
  theoremApplied: 'T(m, n) = \\sum_{i=1}^m \\sum_{j=1}^n O(1) = \\Theta(m \\cdot n)',
  justification:
    'La matriz de dimensiones (m + 1) x (n + 1) almacena las longitudes de LCS para todos los pares de prefijos de las cadenas X e Y. Cada celda ejecuta una comparación de caracteres y un acceso a vecinos en tiempo O(1). La reconstrucción de la subsecuencia requiere a lo sumo m + n pasos.',
  annotations: [
    {
      startLine: 2,
      endLine: 6,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 7,
      endLine: 8,
      asymptoticCost: 'O(m + n)',
    },
    {
      startLine: 9,
      endLine: 17,
      asymptoticCost: '\\Theta(m \\cdot n)',
    },
    {
      startLine: 18,
      endLine: 18,
      asymptoticCost: 'O(1)',
    },
  ],
};

const LIS_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n^2) \\text{ clásica} / \\Theta(n \\log n) \\text{ binaria}',
  spatialLatex: '\\Theta(n)',
  bestCaseLatex: '\\Theta(n^2)',
  averageCaseLatex: '\\Theta(n^2)',
  worstCaseLatex: '\\Theta(n^2)',
  theoremApplied: 'T(n) = \\sum_{i=1}^{n-1} i = \\frac{n(n-1)}{2} = \\Theta(n^2)',
  justification:
    'El algoritmo de la cátedra utiliza dos bucles anidados: el externo fija el final de la subsecuencia en el índice i, y el interno examina los predecesores viables j < i. La matriz auxiliar D de 2 x n almacena longitudes y punteros. Con ordenamiento de paciencia y búsqueda binaria se reduce a Theta(n log n).',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 5,
      endLine: 8,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 9,
      endLine: 16,
      asymptoticCost: '\\Theta(n^2)',
    },
    {
      startLine: 17,
      endLine: 19,
      asymptoticCost: 'O(n)',
    },
  ],
};

const MATRIX_CHAIN_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n^3)',
  spatialLatex: '\\Theta(n^2)',
  bestCaseLatex: '\\Theta(n^3)',
  averageCaseLatex: '\\Theta(n^3)',
  worstCaseLatex: '\\Theta(n^3)',
  theoremApplied: '\\sum_{L=2}^n (n - L + 1)(L - 1) = \\frac{n^3 - n}{6} = \\Theta(n^3)',
  justification:
    'La matriz triangular superior M de n x n almacena los costos mínimos de subcadenas. El cálculo involucra tres bucles anidados: fijar el inicio i, el fin j y el punto intermedio de partición k. La cantidad total de particiones evaluadas es (n^3 - n)/6. La tabla S de tamaño n x n preserva los cortes óptimos.',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 5,
      endLine: 5,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 6,
      endLine: 17,
      asymptoticCost: '\\Theta(n^3)',
    },
    {
      startLine: 18,
      endLine: 18,
      asymptoticCost: 'O(1)',
    },
  ],
};

const FLOYD_WARSHALL_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(|V|^3)',
  spatialLatex: '\\Theta(|V|^2) \\text{ in-place}',
  bestCaseLatex: '\\Theta(|V|^3)',
  averageCaseLatex: '\\Theta(|V|^3)',
  worstCaseLatex: '\\Theta(|V|^3)',
  theoremApplied: 'T(|V|) = \\sum_{k=0}^{|V|-1} \\sum_{i=0}^{|V|-1} \\sum_{j=0}^{|V|-1} O(1) = \\Theta(|V|^3)',
  justification:
    'El algoritmo evalúa sistemáticamente los |V| vértices intermedios k para cada par de origen i y destino j. Cada celda ejecuta una suma y una comparación mínima en O(1). La propiedad de actualización in-place sobre una única matriz de tamaño |V| x |V| preserva la memoria en Theta(|V|^2).',
  annotations: [
    {
      startLine: 2,
      endLine: 6,
      asymptoticCost: '\\Theta(|V|^2)',
    },
    {
      startLine: 7,
      endLine: 16,
      asymptoticCost: '\\Theta(|V|^3)',
    },
    {
      startLine: 17,
      endLine: 17,
      asymptoticCost: 'O(1)',
    },
  ],
};

const TSP_HELD_KARP_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n^2 \\cdot 2^n)',
  spatialLatex: '\\Theta(n \\cdot 2^n)',
  bestCaseLatex: '\\Theta(n^2 \\cdot 2^n)',
  averageCaseLatex: '\\Theta(n^2 \\cdot 2^n)',
  worstCaseLatex: '\\Theta(n^2 \\cdot 2^n)',
  theoremApplied: 'T(n) = \\sum_{s=1}^{n-1} \\binom{n-1}{s} (n - 1 - s) \\cdot s = \\Theta(n^2 2^n)',
  justification:
    'Existen n * 2^n subproblemas únicos definidos por el nodo actual y la máscara de bits del subconjunto de ciudades visitadas. Cada estado explora a lo sumo n transiciones posibles, reduciendo el costo factorial O(n!) a un costo exponencial acotado de Theta(n^2 2^n). La memoria requerida es Theta(n 2^n).',
  annotations: [
    {
      startLine: 2,
      endLine: 5,
      asymptoticCost: 'O(n \\cdot 2^n)',
    },
    {
      startLine: 6,
      endLine: 6,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 7,
      endLine: 18,
      asymptoticCost: '\\Theta(n^2 \\cdot 2^n)',
    },
    {
      startLine: 19,
      endLine: 19,
      asymptoticCost: 'O(1)',
    },
  ],
};

export const MODULE_4_COMPLETE_SLIDES: ConceptSlide[] = [
  {
    id: 'm4-epigrafe-santayana-quote',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Principio de Optimalidad de Bellman y Tabulación Bottom-Up',
    conceptSubtitle: 'Cita Disparadora y Epígrafe Inicial · George Santayana (1905)',
    badgeLabel: '1. Cita Disparadora',
    partIndex: 1,
    totalParts: 1,
    slideKind: 'quote',
    quoteData: {
      quote: 'Aquellos que no pueden recordar el pasado están condenados a repetirlo.',
      author: 'George Santayana',
      source: 'The Life of Reason: Reason in Common Sense (1905)',
      pedagogicalContext:
        'El principio fundacional de la Programación Dinámica (Bellman): memoización y tabulación de subproblemas solapados para erradicar el recalculo exponencial de la recursión ingenua.',
    },
  },

  {
    id: 'm4-fundamentos-bellman-teoria',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Principios Teóricos: Subestructura Óptima y Superposición',
    conceptSubtitle: 'Pilares del Paradigma de Bellman frente a Divide & Conquer',
    badgeLabel: '1. Fundamentos Teóricos',
    partIndex: 1,
    totalParts: 4,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Principios rectores de la Programación Dinámica: Técnica de diseño introducida por Richard Bellman (década de 1950) aplicable a problemas de optimización combinatoria y decisión que satisfacen dos condiciones matemáticas indispensables.',
      bulletPoints: [
        'Subestructura Óptima (Principio de Optimalidad de Bellman): Una solución óptima al problema global contiene en su interior soluciones óptimas a sus subproblemas componentes. Cualesquiera sean el estado y decisión iniciales, las decisiones restantes deben constituir una política óptima respecto al estado resultante.',
        'Superposición de Subproblemas (Overlapping Subproblems): El espacio de subproblemas es pequeño (polinomial), pero una descomposición recursiva ingenua reevalúa las mismas subinstancias de forma exponencial.',
        'Diferencia con Divide & Conquer: En Divide & Conquer los subproblemas son independientes y disjuntos (MergeSort, QuickSort); en Programación Dinámica los subproblemas se comparten y solapan masivamente.',
        'Estructura de Almacenamiento: Los resultados consolidados se memorizan en una tabla, matriz o vector con tiempo de acceso O(1), transformando costos exponenciales en polinomiales.',
      ],
      formulas: [
        {
          label: 'Ecuación Canónica de Bellman',
          latex: 'OPT(s) = \\begin{cases} \\text{CasoBase}(s) & \\text{si } s \\in \\mathcal{S}_{\\text{base}} \\\\ \\min_{a \\in \\mathcal{A}(s)} / \\max_{a \\in \\mathcal{A}(s)} \\{ \\text{costo}(s, a) \\oplus OPT(\\text{transicion}(s, a)) \\} & \\text{si } s \\notin \\mathcal{S}_{\\text{base}} \\end{cases}',
          description: 'Optimización recursiva condicionada por la mejor decisión viable sobre el espacio de estados.',
        },
      ],
      keyInsight:
        'Si una solución óptima pudiera construirse a partir de subsoluciones subóptimas, el principio de Bellman falla y la técnica no es aplicable directamente.',
    },
  },
  {
    id: 'm4-estrategias-topdown-bottomup-teoria',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Estrategias de Implementación y Reconstrucción',
    conceptSubtitle: 'Top-Down con Memoización vs Bottom-Up con Tabulación',
    badgeLabel: '2. Estrategias y Reconstrucción',
    partIndex: 2,
    totalParts: 4,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Estrategias de resolución: Dos caminos fundamentales para explotar la superposición de subproblemas y recuperar la estructura completa de la solución óptima.',
      bulletPoints: [
        'Top-Down con Memoización: Preserva la formulación recursiva natural y consulta una tabla hash o vector de caché antes de calcular. Evalúa sólo estados alcanzables pero conlleva sobrecarga en la pila de llamadas (call stack).',
        'Bottom-Up con Tabulación: Ordena los subproblemas topológicamente en su grafo de dependencias (DAG) y computa iterativamente desde los casos base triviales hasta el objetivo global.',
        'Ventajas de Tabulación: Elimina el riesgo de desbordamiento de pila (StackOverflowError) y habilita optimizaciones de espacio descartando filas o estados prescindibles.',
        'Reconstrucción de la Solución: Para recuperar las decisiones óptimas y no sólo el valor escalar, se realiza backtracking sobre la tabla o se consulta una matriz auxiliar de decisiones guardada durante el llenado.',
      ],
      formulas: [
        {
          label: 'Orden Topológico en DAG de Dependencias',
          latex: 'u \\to v \\in E_{\\text{DAG}} \\iff OPT(u) \\text{ depende del cálculo previo de } OPT(v)',
          description: 'El llenado iterativo bottom-up debe procesar primero a v antes de poder determinar u.',
        },
      ],
      keyInsight:
        'Tabulación garantiza máxima eficiencia temporal al eliminar la sobrecarga de funciones y habilitar la reutilización in-place de memoria.',
    },
  },
  {
    id: 'm4-esquema-generico-pseudocode',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Esquema Genérico de Programación Dinámica: Pseudocódigo',
    conceptSubtitle: 'Patrón Canónico Bottom-Up y Backtracking de Reconstrucción',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 4,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'ProgramacionDinamicaGenerica(Instancia I) -> (ValorOptimo, Solucion)',
      snippets: {
        pseudocode:
          'ALGORITMO ProgramacionDinamicaGenerica(Instancia I)\n    T <- inicializarTablaConCasosBase(S)\n    Para cada s en ordenTopologico(S) Hacer\n        T[s] <- Optimizar(T[transicion(s, a)] + costo(s, a) para todo a en A(s))\n        Decision[s] <- a_optima\n    FinPara\n    ValorOptimo <- T[estado_objetivo]\n    Solucion <- ReconstruirSolucion(Decision, estado_objetivo)\n    Devolver (ValorOptimo, Solucion)',
        java:
          'public static int resolverTopDown(int estado, Integer[] memo) {\n    if (esCasoBase(estado)) return valorCasoBase(estado);\n    if (memo[estado] != null) return memo[estado];\n    int mejor = Integer.MAX_VALUE;\n    for (int t : obtenerTransiciones(estado)) {\n        int act = costo(estado, t) + resolverTopDown(t, memo);\n        if (act < mejor) mejor = act;\n    }\n    memo[estado] = mejor;\n    return mejor;\n}',
        python:
          'def resolver_top_down(estado: int, memo: dict) -> int:\n    if es_caso_base(estado):\n        return valor_caso_base(estado)\n    if estado in memo:\n        return memo[estado]\n    mejor = min(costo(estado, t) + resolver_top_down(t, memo) for t in transiciones(estado))\n    memo[estado] = mejor\n    return mejor',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: DP_GENERIC_COMPLEXITY_DATA,
  },
  {
    id: 'm4-esquema-generico-code',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Esquema Genérico: Implementación de Referencia',
    conceptSubtitle: 'Patrón Top-Down con Memoización en Java',
    badgeLabel: '4. Código Java',
    partIndex: 4,
    totalParts: 4,
    slideKind: 'code',
    codeSnippet: {
      title: 'ProgramacionDinamicaEsquema.java',
      snippets: {
        pseudocode:
          'ALGORITMO ResolverTopDown(estado, memo)\n    Si esCasoBase(estado) Entonces Devolver valorCasoBase(estado)\n    Si memo[estado] != Nulo Entonces Devolver memo[estado]\n    mejor <- Infinito\n    Para cada t en transiciones(estado) Hacer\n        mejor <- Min(mejor, costo(estado, t) + ResolverTopDown(t, memo))\n    FinPara\n    memo[estado] <- mejor\n    Devolver mejor',
        java:
          'public static int resolverTopDown(int estado, Integer[] memo) {\n    if (esCasoBase(estado)) {\n        return valorCasoBase(estado);\n    }\n    if (memo[estado] != null) {\n        return memo[estado];\n    }\n    int mejor = Integer.MAX_VALUE;\n    for (int t : obtenerTransiciones(estado)) {\n        int act = costo(estado, t) + resolverTopDown(t, memo);\n        if (act < mejor) mejor = act;\n    }\n    memo[estado] = mejor;\n    return mejor;\n}',
        python:
          'def resolver_top_down(estado: int, memo: dict) -> int:\n    if es_caso_base(estado):\n        return valor_caso_base(estado)\n    if estado in memo:\n        return memo[estado]\n    mejor = float("inf")\n    for t in obtener_transiciones(estado):\n        act = costo(estado, t) + resolver_top_down(t, memo)\n        if act < mejor:\n            mejor = act\n    memo[estado] = mejor\n    return mejor',
      },
      preferredLanguage: 'java',
    },
    complexityData: DP_GENERIC_COMPLEXITY_DATA,
  },

  {
    id: 'm4-fibonacci-theory',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Caso de Estudio Fundacional: Sucesión de Fibonacci',
    conceptSubtitle: 'Patología de la Recursión Ingenua vs Eficiencia de DP',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 5,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Transformación de complejidad: Fibonacci evidencia cómo el recalculo redundante destruye el rendimiento y cómo la memorización restablece la eficiencia lineal.',
      bulletPoints: [
        'Recursión Ingenua: El árbol binario de llamadas alcanza profundidad n y F(n+1) aprox phi^n hojas, con costo exponencial Theta(phi^n) = O(2^n). F(3) se recalcula 2 veces, F(2) 3 veces, F(1) 5 veces.',
        'Top-Down con Memoización: Incorpora un vector memo de tamaño n+1. Cualquier consulta recurrente retorna en O(1), podando el árbol a una trayectoria de Theta(n) tiempo y Theta(n) espacio.',
        'Bottom-Up Tabulado (Cátedra UADE): Resuelve iterativamente de 2 a n sobre la interfaz VectorTDA<Integer>. Tiempo Theta(n), espacio Theta(n).',
        'Optimización Espacial O(1): Dado que F(i) depende únicamente de F(i-1) y F(i-2), dos variables auxiliares (prev1 y prev2) bastan para alcanzar Theta(1) en espacio.',
      ],
      formulas: [
        {
          label: 'Definición Formal de Fibonacci',
          latex: 'F(n) = \\begin{cases} 0 & \\text{si } n = 0 \\\\ 1 & \\text{si } n = 1 \\\\ F(n-1) + F(n-2) & \\text{si } n \\ge 2 \\end{cases}',
          description: 'Recurrencia lineal de orden dos con superposición masiva en descomposición recursiva.',
        },
      ],
      keyInsight:
        'Un árbol exponencial de O(2^n) colapsa a una secuencia lineal Theta(n) simplemente recordando el pasado.',
    },
  },
  {
    id: 'm4-fibonacci-visualizer',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Fibonacci: Árbol Redundante vs Tabla Memoizada',
    conceptSubtitle: 'Exploración Interactiva de Nodos Podados y Estados en Caché',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 5,
    slideKind: 'visualizer',
    visualizerId: 'fibonacci-memo',
  },
  {
    id: 'm4-fibonacci-pseudocode',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Fibonacci Tabulado: Pseudocódigo',
    conceptSubtitle: 'Llenado Lineal Ascendente sobre Vector de Estado',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 5,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'Fibonacci_Tabulado(n: entero) -> entero',
      snippets: {
        pseudocode:
          'ALGORITMO Fibonacci_Tabulado(n: entero) -> entero\n    Si n = 0 Entonces Devolver 0\n    Si n = 1 Entonces Devolver 1\n    tabla <- inicializarVector(n + 1)\n    tabla[0] <- 0\n    tabla[1] <- 1\n    Para i desde 2 hasta n Hacer\n        tabla[i] <- tabla[i - 1] + tabla[i - 2]\n    FinPara\n    Devolver tabla[n]',
        java:
          'public static int fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    int[] tabla = new int[n + 1];\n    tabla[0] = 0;\n    tabla[1] = 1;\n    for (int i = 2; i <= n; i++) {\n        tabla[i] = tabla[i - 1] + tabla[i - 2];\n    }\n    return tabla[n];\n}',
        python:
          'def fibonacci_tabulado(n: int) -> int:\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    tabla = [0] * (n + 1)\n    tabla[1] = 1\n    for i in range(2, n + 1):\n        tabla[i] = tabla[i - 1] + tabla[i - 2]\n    return tabla[n]',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: FIBONACCI_COMPLEXITY_DATA,
  },
  {
    id: 'm4-fibonacci-code',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Fibonacci: VectorTDA UADE y Optimización O(1)',
    conceptSubtitle: 'Implementación Canónica con TDAs y Reducción Espacial',
    badgeLabel: '4. Código Java',
    partIndex: 4,
    totalParts: 5,
    slideKind: 'code',
    codeSnippet: {
      title: 'Fibonacci.java (Cátedra UADE)',
      snippets: {
        pseudocode:
          'ALGORITMO FibonacciOptimizado(n: entero) -> entero\n    Si n <= 0 Entonces Devolver 0\n    Si n == 1 Entonces Devolver 1\n    a <- 0; b <- 1\n    Para i desde 2 hasta n Hacer\n        c <- a + b\n        a <- b\n        b <- c\n    FinPara\n    Devolver b',
        java:
          'public static int fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    VectorTDA<Integer> aux = new Vector<Integer>();\n    aux.inicializarVector(n + 1);\n    aux.agregarElemento(0, 0);\n    aux.agregarElemento(1, 1);\n    for (int i = 2; i <= n; i++) {\n        int f_prev1 = aux.recuperarElemento(i - 1);\n        int f_prev2 = aux.recuperarElemento(i - 2);\n        aux.agregarElemento(i, f_prev1 + f_prev2);\n    }\n    return aux.recuperarElemento(n);\n}',
        python:
          'def fibonacci_optimizado(n: int) -> int:\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b',
      },
      preferredLanguage: 'java',
    },
    complexityData: FIBONACCI_COMPLEXITY_DATA,
  },
  {
    id: 'm4-fibonacci-complexity',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Fibonacci: Análisis de Complejidad Asintótica',
    conceptSubtitle: 'Demostración de Reducción Exponencial a Lineal',
    badgeLabel: '5. Complejidad',
    partIndex: 5,
    totalParts: 5,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'Fibonacci.java (Anotaciones Asintóticas)',
      snippets: {
        pseudocode:
          'ALGORITMO Fibonacci(n)\n    Si n <= 0 Devolver 0\n    Si n == 1 Devolver 1\n    Inicializar vector aux de tamaño n + 1\n    Para i = 2 hasta n Hacer\n        aux[i] <- aux[i-1] + aux[i-2]\n    FinPara\n    Devolver aux[n]',
        java:
          'public static int fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    VectorTDA<Integer> aux = new Vector<Integer>();\n    aux.inicializarVector(n + 1);\n    aux.agregarElemento(0, 0);\n    aux.agregarElemento(1, 1);\n    for (int i = 2; i <= n; i++) {\n        int f_prev1 = aux.recuperarElemento(i - 1);\n        int f_prev2 = aux.recuperarElemento(i - 2);\n        aux.agregarElemento(i, f_prev1 + f_prev2);\n    }\n    return aux.recuperarElemento(n);\n}',
        python:
          'def fibonacci(n: int) -> int:\n    if n <= 0: return 0\n    if n == 1: return 1\n    aux = [0] * (n + 1)\n    aux[1] = 1\n    for i in range(2, n + 1):\n        aux[i] = aux[i - 1] + aux[i - 2]\n    return aux[n]',
      },
      preferredLanguage: 'java',
    },
    complexityData: FIBONACCI_COMPLEXITY_DATA,
  },

  {
    id: 'm4-cambio-monedas-dp-theory',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'El Problema del Cambio de Monedas (Coin Change)',
    conceptSubtitle: 'Optimalidad Global en Sistemas Arbitrarios vs Fallo Voraz',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 6,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Objetivo y optimalidad: Hallar la mínima cantidad de monedas de denominaciones d_0, ..., d_{n-1} para abonar un monto exacto V con suministro ilimitado.',
      bulletPoints: [
        'Fallo de la Estrategia Voraz: Frente a denominaciones no canónicas como {1, 3, 4} y monto 6, Greedy escoge 4+1+1 (3 monedas), mientras que el óptimo global es 3+3 (2 monedas).',
        'Definición de Subproblema: C[i, j] denota el número mínimo de monedas para formar el monto j utilizando únicamente las primeras i+1 denominaciones (índices 0 a i).',
        'Ecuación de Bellman: C[i, j] = C[i-1, j] si d_i > j; sino min(C[i-1, j], 1 + C[i, j - d_i]). Al usar d_i permanecemos en la fila i pues la moneda puede reutilizarse indefinidamente.',
        'Casos Base: C[i, 0] = 0 para toda fila i (pagar 0 requiere 0 monedas). Para la fila 0 (únicamente moneda d_0), C[0, j] = 1 + C[0, j - d_0] si d_0 <= j, o +infinito si d_0 > j.',
        'Reconstrucción por Backtracking: Partiendo de (n-1, V), si C[i, j] == C[i-1, j] no se usó d_i (subir a i-1); si difiere, se utilizó d_i (guardar d_i y restar j -= d_i en la misma fila i).',
      ],
      formulas: [
        {
          label: 'Ecuación de Recurrencia de Bellman (Cambio DP)',
          latex: 'C[i, j] = \\begin{cases} 0 & \\text{si } j = 0 \\\\ +\\infty & \\text{si } i = 0 \\land d_0 > j \\\\ 1 + C[0, j - d_0] & \\text{si } i = 0 \\land d_0 \\le j \\\\ C[i-1, j] & \\text{si } i > 0 \\land d_i > j \\\\ \\min(C[i-1, j],\\, 1 + C[i, j - d_i]) & \\text{si } i > 0 \\land d_i \\le j \\end{cases}',
          description: 'Evaluación del mínimo entre prescindir de la moneda d_i o incorporarla y descontar su valor.',
        },
      ],
      keyInsight:
        'Programación dinámica contempla la decisión de incluir una moneda manteniendo disponible la misma denominación sin caer en la ceguera miope de Greedy.',
    },
  },
  {
    id: 'm4-cambio-monedas-dp-visualizer',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Cambio de Monedas: Matriz DP y Retroceso',
    conceptSubtitle: 'Simulador Dinámico de Celdas Óptimas y Camino de Elección',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 6,
    slideKind: 'visualizer',
    visualizerId: 'coin-change-dp',
  },
  {
    id: 'm4-cambio-monedas-dp-pseudocode',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Cambio de Monedas DP: Pseudocódigo Formal',
    conceptSubtitle: 'Llenado por Filas y Columnas sobre Matriz n x (V+1)',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 6,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'Cambio_DP(D: Vector<entero>, V: entero) -> Matriz<entero>',
      snippets: {
        pseudocode:
          'ALGORITMO Cambio_DP(D: Vector<entero>, V: entero) -> Matriz<entero>\n    n <- longitud(D)\n    C <- inicializarMatriz(n, V + 1)\n    Para i desde 0 hasta n - 1 Hacer C[i, 0] <- 0 FinPara\n    Para j desde 1 hasta V Hacer\n        C[0, j] <- Si D[0] <= j Entonces (1 + C[0, j - D[0]]) Sino +INFINITO\n    FinPara\n    Para i desde 1 hasta n - 1 Hacer\n        Para j desde 1 hasta V Hacer\n            Si D[i] > j Entonces C[i, j] <- C[i - 1, j]\n            Sino C[i, j] <- Min(C[i - 1, j], 1 + C[i, j - D[i]])\n        FinPara\n    FinPara\n    Devolver C',
        java:
          'public static int cambio(int[] monedas, int v) {\n    int n = monedas.length;\n    int[][] c = new int[n][v + 1];\n    for (int i = 0; i < n; i++) c[i][0] = 0;\n    for (int j = 1; j <= v; j++) {\n        c[0][j] = (monedas[0] <= j) ? 1 + c[0][j - monedas[0]] : 9999999;\n    }\n    for (int i = 1; i < n; i++) {\n        for (int j = 1; j <= v; j++) {\n            int sinMoneda = c[i - 1][j];\n            int conMoneda = (monedas[i] <= j) ? 1 + c[i][j - monedas[i]] : 9999999;\n            c[i][j] = Math.min(sinMoneda, conMoneda);\n        }\n    }\n    return c[n - 1][v];\n}',
        python:
          'def cambio_dp(monedas: list[int], v: int) -> int:\n    n = len(monedas)\n    inf = float("inf")\n    dp = [[0 if j == 0 else inf for j in range(v + 1)] for _ in range(n)]\n    for j in range(1, v + 1):\n        if monedas[0] <= j: dp[0][j] = 1 + dp[0][j - monedas[0]]\n    for i in range(1, n):\n        for j in range(1, v + 1):\n            sin_m = dp[i - 1][j]\n            con_m = 1 + dp[i][j - monedas[i]] if monedas[i] <= j else inf\n            dp[i][j] = min(sin_m, con_m)\n    return dp[n - 1][v]',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: COIN_CHANGE_DP_COMPLEXITY_DATA,
  },
  {
    id: 'm4-cambio-monedas-dp-code-table',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Cambio de Monedas: Llenado de Matriz DP',
    conceptSubtitle: 'Implementación Java sobre MatrizTDA de Cátedra UADE',
    badgeLabel: '4. Código: Matriz DP',
    partIndex: 4,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'CambioMonedasDP.java (Cálculo de Matriz)',
      snippets: {
        pseudocode:
          'ALGORITMO CambioMatriz(monedas, v)\n    Para cada moneda i y cada valor j:\n        Evaluar si la moneda di entra en el monto j\n        Actualizar C[i, j] con el minimo entre fila previa y celda remanente\n    Devolver C[n-1, v]',
        java:
          'public static int cambio(VectorTDA<Integer> monedas, int v) throws Exception {\n    int cantidadMonedas = monedas.capacidadVector();\n    int INF = 9999999;\n    int dim = Math.max(cantidadMonedas, v + 1);\n    MatrizTDA<Integer> m = new Matriz<Integer>();\n    m.inicializarMatriz(dim);\n    for (int i = 0; i < cantidadMonedas; i++) m.setearValor(i, 0, 0);\n    for (int i = 0; i < cantidadMonedas; i++) {\n        int di = monedas.recuperarElemento(i);\n        for (int j = 1; j <= v; j++) {\n            int sinMoneda = (i > 0) ? m.obtenerValor(i - 1, j) : INF;\n            int conMoneda = (di <= j) ? 1 + m.obtenerValor(i, j - di) : INF;\n            m.setearValor(i, j, Math.min(sinMoneda, conMoneda));\n        }\n    }\n    return m.obtenerValor(cantidadMonedas - 1, v);\n}',
        python:
          'def calcular_cambio(monedas: list[int], v: int) -> int:\n    dp = [0] + [float("inf")] * v\n    for m in monedas:\n        for j in range(m, v + 1):\n            dp[j] = min(dp[j], 1 + dp[j - m])\n    return dp[v]',
      },
      preferredLanguage: 'java',
    },
    complexityData: COIN_CHANGE_DP_COMPLEXITY_DATA,
  },
  {
    id: 'm4-cambio-monedas-dp-code-reconstruction',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Cambio de Monedas: Reconstrucción de la Solución',
    conceptSubtitle: 'Algoritmo de Backtracking Determinista sobre MatrizTDA',
    badgeLabel: '5. Código: Backtracking',
    partIndex: 5,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'CambioMonedasDP.java (Reconstrucción)',
      snippets: {
        pseudocode:
          'ALGORITMO ReconstruirCambio(monedas, C, v)\n    i <- n - 1; j <- v\n    Mientras j > 0 Y i >= 0 Hacer\n        Si i > 0 Y C[i, j] == C[i-1, j] Entonces i <- i - 1\n        Sino Guardar monedas[i]; j <- j - monedas[i]\n    FinMientras\n    Devolver seleccionadas',
        java:
          'public static VectorTDA<Integer> reconstruirCambio(VectorTDA<Integer> monedas, MatrizTDA<Integer> m, int v) {\n    int i = monedas.capacidadVector() - 1;\n    int j = v;\n    VectorTDA<Integer> seleccionadas = new Vector<Integer>();\n    seleccionadas.inicializarVector(v + 1);\n    int pos = 0;\n    while (j > 0 && i >= 0) {\n        if (i > 0 && m.obtenerValor(i, j).equals(m.obtenerValor(i - 1, j))) {\n            i--;\n        } else {\n            int di = monedas.recuperarElemento(i);\n            seleccionadas.agregarElemento(pos++, di);\n            j = j - di;\n        }\n    }\n    return seleccionadas;\n}',
        python:
          'def reconstruir_cambio(monedas: list[int], dp: list[list[int]], v: int) -> list[int]:\n    i, j, resultado = len(monedas) - 1, v, []\n    while j > 0 and i >= 0:\n        if i > 0 and dp[i][j] == dp[i - 1][j]:\n            i -= 1\n        else:\n            resultado.append(monedas[i])\n            j -= monedas[i]\n    return resultado',
      },
      preferredLanguage: 'java',
    },
    complexityData: COIN_CHANGE_DP_COMPLEXITY_DATA,
  },
  {
    id: 'm4-cambio-monedas-dp-complexity',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Cambio de Monedas DP: Complejidad Asintótica',
    conceptSubtitle: 'Costo Pseudopolinomial Theta(k * v) y Consumo Espacial',
    badgeLabel: '6. Complejidad',
    partIndex: 6,
    totalParts: 6,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'CambioMonedasDP.java (Anotaciones Asintóticas)',
      snippets: {
        pseudocode:
          'ALGORITMO CambioDP(monedas, v)\n    Inicializar matriz de dimensiones k x (v + 1)\n    Completar casos base j = 0 con 0\n    Doble bucle for: i de 0 a k-1, j de 1 a v\n        Actualizar celda m[i, j] en tiempo constante O(1)\n    Devolver m[k - 1, v]',
        java:
          'public static int cambio(VectorTDA<Integer> monedas, int v) throws Exception {\n    int cantidadMonedas = monedas.capacidadVector();\n    int INF = 9999999;\n    int dim = Math.max(cantidadMonedas, v + 1);\n    MatrizTDA<Integer> m = new Matriz<Integer>();\n    m.inicializarMatriz(dim);\n    for (int i = 0; i < cantidadMonedas; i++) {\n        m.setearValor(i, 0, 0);\n    }\n    for (int i = 0; i < cantidadMonedas; i++) {\n        int di = monedas.recuperarElemento(i);\n        for (int j = 1; j <= v; j++) {\n            int sinMoneda = (i > 0) ? m.obtenerValor(i - 1, j) : INF;\n            int conMoneda = (di <= j) ? 1 + m.obtenerValor(i, j - di) : INF;\n            m.setearValor(i, j, Math.min(sinMoneda, conMoneda));\n        }\n    }\n    return m.obtenerValor(cantidadMonedas - 1, v);\n}',
        python:
          'def cambio(monedas: list[int], v: int) -> int:\n    c = [[0] * (v + 1) for _ in monedas]\n    for i in range(len(monedas)):\n        for j in range(1, v + 1):\n            sin_m = c[i - 1][j] if i > 0 else float("inf")\n            con_m = 1 + c[i][j - monedas[i]] if monedas[i] <= j else float("inf")\n            c[i][j] = min(sin_m, con_m)\n    return c[-1][v]',
      },
      preferredLanguage: 'java',
    },
    complexityData: COIN_CHANGE_DP_COMPLEXITY_DATA,
  },

  {
    id: 'm4-mochila-01-dp-theory',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'El Problema de la Mochila 0-1 (0-1 Knapsack)',
    conceptSubtitle: 'Decisión Binaria de Inclusión, Subestructura y Pseudo-Polinomialidad',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 6,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Optimización de capacidad: Seleccionar un subconjunto de objetos indivisibles (x_i in {0, 1}) con pesos p_i y valores v_i que maximice el valor total sin superar la capacidad W.',
      bulletPoints: [
        'Inaplicabilidad Voraz: A diferencia de la mochila fraccionaria (Greedy Theta(n log n)), en 0-1 tomar los objetos de mayor densidad v_i / p_i puede dejar huecos inservibles y resultar subóptimo.',
        'Definición del Estado V[i, w]: Máximo valor obtenible considerando únicamente los primeros i objetos y una capacidad disponible w (0 <= i <= n, 0 <= w <= W).',
        'Ecuación de Bellman: V[i, w] = V[i-1, w] si p_i > w; sino max(V[i-1, w], v_i + V[i-1, w - p_i]). Al incluir el objeto i, se recurre a la fila i-1 pues cada elemento sólo puede usarse una vez.',
        'Reconstrucción Inversa: Desde V[n, W], si V[i, w] == V[i-1, w] el objeto i no se incluye; si difiere, el objeto i se selecciona y la capacidad se reduce w -= p_i, retrocediendo a la fila i-1.',
        'Frontera de Intratabilidad (NP-Hard): La complejidad Theta(n * W) es pseudo-polinomial: polinomial respecto al valor numérico W, pero exponencial respecto a la cantidad de bits log W de la entrada.',
      ],
      formulas: [
        {
          label: 'Ecuación de Recurrencia de Bellman (Mochila 0-1)',
          latex: 'V[i, w] = \\begin{cases} 0 & \\text{si } i = 0 \\lor w = 0 \\\\ V[i-1, w] & \\text{si } p_i > w \\\\ \\max(V[i-1, w],\\, v_i + V[i-1, w - p_i]) & \\text{si } p_i \\le w \\end{cases}',
          description: 'Elección binaria óptima entre omitir el objeto i o incorporarlo descontando su peso.',
        },
      ],
      keyInsight:
        'La naturaleza 0-1 obliga a retroceder a la fila previa i-1, diferenciándose del cambio de monedas ilimitado.',
    },
  },
  {
    id: 'm4-mochila-01-dp-visualizer',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Mochila 0-1: Matriz de Beneficio y Retroceso',
    conceptSubtitle: 'Explorador Interactivo de Estados Óptimos y Objetos Elegidos',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 6,
    slideKind: 'visualizer',
    visualizerId: 'knapsack-01-dp',
  },
  {
    id: 'm4-mochila-01-dp-pseudocode',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Mochila 0-1 DP: Pseudocódigo Formal',
    conceptSubtitle: 'Llenado Bottom-Up de Matriz (n+1) x (W+1)',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 6,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'Mochila01_DP(pesos, valores, P) -> Matriz<entero>',
      snippets: {
        pseudocode:
          'ALGORITMO Mochila01_DP(pesos, valores, P) -> Matriz<entero>\n    n <- longitud(pesos)\n    V <- inicializarMatriz(n + 1, P + 1)\n    Para i desde 0 hasta n Hacer V[i, 0] <- 0 FinPara\n    Para j desde 0 hasta P Hacer V[0, j] <- 0 FinPara\n    Para i desde 1 hasta n Hacer\n        p_i <- pesos[i - 1]; v_i <- valores[i - 1]\n        Para j desde 0 hasta P Hacer\n            Si p_i > j Entonces V[i, j] <- V[i - 1, j]\n            Sino V[i, j] <- Max(V[i - 1, j], v_i + V[i - 1, j - p_i])\n        FinPara\n    FinPara\n    Devolver V',
        java:
          'public static int mochila(int[] pesos, int[] valores, int w) {\n    int n = pesos.length;\n    int[][] dp = new int[n + 1][w + 1];\n    for (int i = 1; i <= n; i++) {\n        int p = pesos[i - 1], v = valores[i - 1];\n        for (int j = 0; j <= w; j++) {\n            if (p > j) dp[i][j] = dp[i - 1][j];\n            else dp[i][j] = Math.max(dp[i - 1][j], v + dp[i - 1][j - p]);\n        }\n    }\n    return dp[n][w];\n}',
        python:
          'def mochila_01(pesos: list[int], valores: list[int], w: int) -> int:\n    n = len(pesos)\n    dp = [[0] * (w + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        p, v = pesos[i - 1], valores[i - 1]\n        for j in range(w + 1):\n            if p > j: dp[i][j] = dp[i - 1][j]\n            else: dp[i][j] = max(dp[i - 1][j], v + dp[i - 1][j - p])\n    return dp[n][w]',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: KNAPSACK_01_DP_COMPLEXITY_DATA,
  },
  {
    id: 'm4-mochila-01-dp-code-table',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Mochila 0-1: Llenado de Matriz de Beneficio',
    conceptSubtitle: 'Implementación Java con VectorTDA y MatrizTDA de Cátedra',
    badgeLabel: '4. Código: Matriz DP',
    partIndex: 4,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'Mochila01DP.java (Cálculo de Matriz)',
      snippets: {
        pseudocode:
          'ALGORITMO LlenarMatrizMochila(pesos, valores, p)\n    Para cada objeto i de 1 a n:\n        Para cada capacidad j de 0 a p:\n            Evaluar si el objeto i entra en la capacidad j\n            Guardar en V[i, j] el maximo entre no incluir e incluir\n    Devolver V[n, p]',
        java:
          'public static int mochila(VectorTDA<Integer> pesos, VectorTDA<Integer> valores, int p) throws Exception {\n    int n = pesos.capacidadVector();\n    int dim = Math.max(n + 1, p + 1);\n    MatrizTDA<Integer> m = new Matriz<Integer>();\n    m.inicializarMatriz(dim);\n    for (int i = 0; i <= n; i++) m.setearValor(i, 0, 0);\n    for (int j = 0; j <= p; j++) m.setearValor(0, j, 0);\n    for (int i = 1; i <= n; i++) {\n        int pesoObj = pesos.recuperarElemento(i - 1);\n        int valorObj = valores.recuperarElemento(i - 1);\n        for (int j = 0; j <= p; j++) {\n            int sinObjeto = m.obtenerValor(i - 1, j);\n            if (pesoObj > j) {\n                m.setearValor(i, j, sinObjeto);\n            } else {\n                int conObjeto = valorObj + m.obtenerValor(i - 1, j - pesoObj);\n                m.setearValor(i, j, Math.max(sinObjeto, conObjeto));\n            }\n        }\n    }\n    return m.obtenerValor(n, p);\n}',
        python:
          'def calcular_mochila(pesos: list[int], valores: list[int], cap: int) -> int:\n    dp = [0] * (cap + 1)\n    for p, v in zip(pesos, valores):\n        for w in range(cap, p - 1, -1):\n            dp[w] = max(dp[w], v + dp[w - p])\n    return dp[cap]',
      },
      preferredLanguage: 'java',
    },
    complexityData: KNAPSACK_01_DP_COMPLEXITY_DATA,
  },
  {
    id: 'm4-mochila-01-dp-code-reconstruction',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Mochila 0-1: Reconstrucción de Objetos',
    conceptSubtitle: 'Recorrido Inverso sobre MatrizTDA para Identificar Elementos',
    badgeLabel: '5. Código: Backtracking',
    partIndex: 5,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'Mochila01DP.java (Reconstrucción)',
      snippets: {
        pseudocode:
          'ALGORITMO ReconstruirMochila(pesos, V, P)\n    i <- n; j <- P\n    Mientras i > 0 Y j > 0 Hacer\n        Si V[i, j] != V[i-1, j] Entonces\n            Agregar objeto i-1 a elegidos\n            j <- j - pesos[i-1]\n        FinSi\n        i <- i - 1\n    FinMientras\n    Devolver elegidos',
        java:
          'public static VectorTDA<Integer> reconstruirMochila(VectorTDA<Integer> pesos, MatrizTDA<Integer> m, int p) {\n    int n = pesos.capacidadVector();\n    int i = n, j = p;\n    VectorTDA<Integer> elegidos = new Vector<Integer>();\n    elegidos.inicializarVector(n);\n    int pos = 0;\n    while (i > 0 && j > 0) {\n        if (!m.obtenerValor(i, j).equals(m.obtenerValor(i - 1, j))) {\n            elegidos.agregarElemento(pos++, i - 1);\n            j = j - pesos.recuperarElemento(i - 1);\n        }\n        i--;\n    }\n    return elegidos;\n}',
        python:
          'def reconstruir_mochila(pesos: list[int], dp: list[list[int]], p: int) -> list[int]:\n    i, j, elegidos = len(pesos), p, []\n    while i > 0 and j > 0:\n        if dp[i][j] != dp[i - 1][j]:\n            elegidos.append(i - 1)\n            j -= pesos[i - 1]\n        i -= 1\n    return elegidos',
      },
      preferredLanguage: 'java',
    },
    complexityData: KNAPSACK_01_DP_COMPLEXITY_DATA,
  },
  {
    id: 'm4-mochila-01-dp-complexity',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Mochila 0-1 DP: Análisis de Complejidad',
    conceptSubtitle: 'Costo Pseudo-Polinomial Theta(n * W) y Frontera NP-Hard',
    badgeLabel: '6. Complejidad',
    partIndex: 6,
    totalParts: 6,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'Mochila01DP.java (Anotaciones Asintóticas)',
      snippets: {
        pseudocode:
          'ALGORITMO Mochila01(pesos, valores, p)\n    Inicializar matriz de tamaño (n + 1) x (p + 1)\n    Completar fila 0 y columna 0 en 0\n    Doble bucle for: objetos i de 1 a n, capacidades j de 0 a p\n        Transición en tiempo constante O(1)\n    Devolver V[n, p]',
        java:
          'public static int mochila(VectorTDA<Integer> pesos, VectorTDA<Integer> valores, int p) throws Exception {\n    int n = pesos.capacidadVector();\n    int dim = Math.max(n + 1, p + 1);\n    MatrizTDA<Integer> m = new Matriz<Integer>();\n    m.inicializarMatriz(dim);\n    for (int i = 0; i <= n; i++) m.setearValor(i, 0, 0);\n    for (int j = 0; j <= p; j++) m.setearValor(0, j, 0);\n    for (int i = 1; i <= n; i++) {\n        int pesoObj = pesos.recuperarElemento(i - 1);\n        int valorObj = valores.recuperarElemento(i - 1);\n        for (int j = 0; j <= p; j++) {\n            int sinObj = m.obtenerValor(i - 1, j);\n            if (pesoObj > j) {\n                m.setearValor(i, j, sinObj);\n            } else {\n                int conObj = valorObj + m.obtenerValor(i - 1, j - pesoObj);\n                m.setearValor(i, j, Math.max(sinObj, conObj));\n            }\n        }\n    }\n    return m.obtenerValor(n, p);\n}',
        python:
          'def mochila(pesos: list[int], valores: list[int], w: int) -> int:\n    dp = [[0] * (w + 1) for _ in range(len(pesos) + 1)]\n    for i in range(1, len(pesos) + 1):\n        for j in range(w + 1):\n            if pesos[i - 1] > j: dp[i][j] = dp[i - 1][j]\n            else: dp[i][j] = max(dp[i - 1][j], valores[i - 1] + dp[i - 1][j - pesos[i - 1]])\n    return dp[-1][w]',
      },
      preferredLanguage: 'java',
    },
    complexityData: KNAPSACK_01_DP_COMPLEXITY_DATA,
  },

  {
    id: 'm4-lcs-theory',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Subsecuencia Común Más Larga (LCS)',
    conceptSubtitle: 'Alineamiento de Cadenas, Prefijos y Matriz de Transiciones',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 6,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Definición de subsecuencia: Dadas dos secuencias X = <x_1, ..., x_m> e Y = <y_1, ..., y_n>, hallar la longitud y los caracteres de la subsecuencia común de longitud máxima.',
      bulletPoints: [
        'Fuerza Bruta Inviable: Existen 2^m subsecuencias posibles de X; contrastarlas exhaustivamente contra Y demandaría tiempo exponencial O(n * 2^m).',
        'Definición del Subproblema c[i, j]: Longitud de la LCS entre los prefijos X[1..i] e Y[1..j] sobre una tabla de dimensiones (m + 1) x (n + 1).',
        'Teorema de Transición de Bellman: Si x_i == y_j, dicho carácter pertenece a la LCS: c[i, j] = 1 + c[i-1, j-1]. Si x_i != y_j, se toma el mayor entre omitir x_i o y_j: max(c[i-1, j], c[i, j-1]).',
        'Casos Base: c[i, 0] = 0 y c[0, j] = 0 (cualquier cadena comparada contra la cadena vacía tiene LCS de longitud 0).',
        'Reconstrucción de la Cadena: Comenzando en (m, n), si x_{i-1} == y_{j-1} se añade el carácter y se retrocede diagonalmente (i-1, j-1); en caso contrario, se avanza hacia la celda de mayor valor (arriba o izquierda).',
      ],
      formulas: [
        {
          label: 'Ecuación de Recurrencia de Bellman (LCS)',
          latex: 'c[i, j] = \\begin{cases} 0 & \\text{si } i = 0 \\lor j = 0 \\\\ c[i-1, j-1] + 1 & \\text{si } i, j > 0 \\land x_i = y_j \\\\ \\max(c[i-1, j],\\, c[i, j-1]) & \\text{si } i, j > 0 \\land x_i \\ne y_j \\end{cases}',
          description: 'Avance diagonal con incremento unitario ante coincidencias, o bifurcación ortogonal máxima.',
        },
      ],
      keyInsight:
        'La coincidencia de caracteres permite un avance diagonal estricto en la matriz, reduciendo el subproblema en ambos prefijos simultáneamente.',
    },
  },
  {
    id: 'm4-lcs-visualizer',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'LCS: Matriz de Coincidencias y Flechas de Puntero',
    conceptSubtitle: 'Visualizador Interactivo de Prefijos y Traza de Reconstrucción',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 6,
    slideKind: 'visualizer',
    visualizerId: 'lcs-table',
  },
  {
    id: 'm4-lcs-pseudocode',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'LCS: Pseudocódigo Formal',
    conceptSubtitle: 'Algoritmo Canónico de Llenado Matricial e Inicialización',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 6,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'LCS_DP(X: Vector<Caracter>, Y: Vector<Caracter>) -> Matriz<entero>',
      snippets: {
        pseudocode:
          'ALGORITMO LCS_DP(X: Vector<Caracter>, Y: Vector<Caracter>) -> Matriz<entero>\n    n <- longitud(X); m <- longitud(Y)\n    M <- inicializarMatriz(n + 1, m + 1)\n    Para i desde 0 hasta n Hacer M[i, 0] <- 0 FinPara\n    Para j desde 0 hasta m Hacer M[0, j] <- 0 FinPara\n    Para i desde 1 hasta n Hacer\n        Para j desde 1 hasta m Hacer\n            Si X[i - 1] == Y[j - 1] Entonces M[i, j] <- 1 + M[i - 1, j - 1]\n            Sino M[i, j] <- Max(M[i - 1, j], M[i, j - 1])\n        FinPara\n    FinPara\n    Devolver M',
        java:
          'public static int lcs(String s1, String s2) {\n    int m = s1.length(), n = s2.length();\n    int[][] dp = new int[m + 1][n + 1];\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {\n                dp[i][j] = 1 + dp[i - 1][j - 1];\n            } else {\n                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n            }\n        }\n    }\n    return dp[m][n];\n}',
        python:
          'def lcs(s1: str, s2: str) -> int:\n    m, n = len(s1), len(s2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if s1[i - 1] == s2[j - 1]:\n                dp[i][j] = 1 + dp[i - 1][j - 1]\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: LCS_COMPLEXITY_DATA,
  },
  {
    id: 'm4-lcs-code-table',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'LCS: Llenado de Matriz de Longitudes',
    conceptSubtitle: 'Implementación Java sobre VectorTDA<Character> y MatrizTDA',
    badgeLabel: '4. Código: Matriz DP',
    partIndex: 4,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'LCSDP.java (Cálculo de Matriz)',
      snippets: {
        pseudocode:
          'ALGORITMO LlenarMatrizLCS(s1, s2)\n    Para cada caracter i de s1 y j de s2:\n        Si coinciden, sumar 1 al valor diagonal previo\n        Sino, propagar el maximo entre arriba e izquierda\n    Devolver M[m, n]',
        java:
          'public static int subsecuenciaMasLarga(VectorTDA<Character> s1, VectorTDA<Character> s2) throws Exception {\n    int l_s1 = s1.capacidadVector();\n    int l_s2 = s2.capacidadVector();\n    int dim = Math.max(l_s1 + 1, l_s2 + 1);\n    MatrizTDA<Integer> m = new Matriz<Integer>();\n    m.inicializarMatriz(dim);\n    for (int i = 0; i <= l_s1; i++) m.setearValor(i, 0, 0);\n    for (int j = 0; j <= l_s2; j++) m.setearValor(0, j, 0);\n    for (int i = 1; i <= l_s1; i++) {\n        char c1 = s1.recuperarElemento(i - 1);\n        for (int j = 1; j <= l_s2; j++) {\n            char c2 = s2.recuperarElemento(j - 1);\n            if (c1 == c2) {\n                m.setearValor(i, j, 1 + m.obtenerValor(i - 1, j - 1));\n            } else {\n                int arriba = m.obtenerValor(i - 1, j);\n                int izq = m.obtenerValor(i, j - 1);\n                m.setearValor(i, j, Math.max(arriba, izq));\n            }\n        }\n    }\n    return m.obtenerValor(l_s1, l_s2);\n}',
        python:
          'def calcular_lcs(s1: str, s2: str) -> int:\n    m, n = len(s1), len(s2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i, c1 in enumerate(s1, 1):\n        for j, c2 in enumerate(s2, 1):\n            dp[i][j] = dp[i - 1][j - 1] + 1 if c1 == c2 else max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]',
      },
      preferredLanguage: 'java',
    },
    complexityData: LCS_COMPLEXITY_DATA,
  },
  {
    id: 'm4-lcs-code-reconstruction',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'LCS: Reconstrucción de la Cadena Óptima',
    conceptSubtitle: 'Backtracking Diagonal y Cardinal sobre MatrizTDA',
    badgeLabel: '5. Código: Backtracking',
    partIndex: 5,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'LCSDP.java (Reconstrucción)',
      snippets: {
        pseudocode:
          'ALGORITMO ReconstruirLCS(s1, s2, M)\n    i <- longitud(s1); j <- longitud(s2)\n    Mientras i > 0 Y j > 0 Hacer\n        Si s1[i-1] == s2[j-1] Entonces Agregar s1[i-1]; i <- i - 1; j <- j - 1\n        Sino si M[i-1, j] >= M[i, j-1] Entonces i <- i - 1\n        Sino j <- j - 1\n    FinMientras\n    Devolver Invertir(resultado)',
        java:
          'public static String reconstruirLCS(VectorTDA<Character> s1, VectorTDA<Character> s2, MatrizTDA<Integer> m) {\n    int i = s1.capacidadVector();\n    int j = s2.capacidadVector();\n    StringBuilder sb = new StringBuilder();\n    while (i > 0 && j > 0) {\n        if (s1.recuperarElemento(i - 1).equals(s2.recuperarElemento(j - 1))) {\n            sb.append(s1.recuperarElemento(i - 1));\n            i--;\n            j--;\n        } else if (m.obtenerValor(i - 1, j) >= m.obtenerValor(i, j - 1)) {\n            i--;\n        } else {\n            j--;\n        }\n    }\n    return sb.reverse().toString();\n}',
        python:
          'def reconstruir_lcs(s1: str, s2: str, dp: list[list[int]]) -> str:\n    i, j, res = len(s1), len(s2), []\n    while i > 0 and j > 0:\n        if s1[i - 1] == s2[j - 1]:\n            res.append(s1[i - 1])\n            i, j = i - 1, j - 1\n        elif dp[i - 1][j] >= dp[i][j - 1]:\n            i -= 1\n        else:\n            j -= 1\n    return "".join(reversed(res))',
      },
      preferredLanguage: 'java',
    },
    complexityData: LCS_COMPLEXITY_DATA,
  },
  {
    id: 'm4-lcs-complexity',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'LCS: Análisis de Complejidad Asintótica',
    conceptSubtitle: 'Costo Temporal y Espacial Cuadrático Theta(m * n)',
    badgeLabel: '6. Complejidad',
    partIndex: 6,
    totalParts: 6,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'LCSDP.java (Anotaciones Asintóticas)',
      snippets: {
        pseudocode:
          'ALGORITMO LCS(s1, s2)\n    Inicializar matriz de tamaño (m + 1) x (n + 1)\n    Completar fila 0 y columna 0 en 0\n    Doble bucle for: i de 1 a m, j de 1 a n\n        Comparación de caracteres en O(1)\n    Devolver tabla[m, n]',
        java:
          'public static int subsecuenciaMasLarga(VectorTDA<Character> s1, VectorTDA<Character> s2) throws Exception {\n    int m = s1.capacidadVector();\n    int n = s2.capacidadVector();\n    int dim = Math.max(m + 1, n + 1);\n    MatrizTDA<Integer> tabla = new Matriz<Integer>();\n    tabla.inicializarMatriz(dim);\n    for (int i = 0; i <= m; i++) tabla.setearValor(i, 0, 0);\n    for (int j = 0; j <= n; j++) tabla.setearValor(0, j, 0);\n    for (int i = 1; i <= m; i++) {\n        char c1 = s1.recuperarElemento(i - 1);\n        for (int j = 1; j <= n; j++) {\n            char c2 = s2.recuperarElemento(j - 1);\n            if (c1 == c2) {\n                tabla.setearValor(i, j, 1 + tabla.obtenerValor(i - 1, j - 1));\n            } else {\n                int arriba = tabla.obtenerValor(i - 1, j);\n                int izq = tabla.obtenerValor(i, j - 1);\n                tabla.setearValor(i, j, Math.max(arriba, izq));\n            }\n        }\n    }\n    return tabla.obtenerValor(m, n);\n}',
        python:
          'def lcs(s1: str, s2: str) -> int:\n    m, n = len(s1), len(s2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            dp[i][j] = 1 + dp[i - 1][j - 1] if s1[i - 1] == s2[j - 1] else max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]',
      },
      preferredLanguage: 'java',
    },
    complexityData: LCS_COMPLEXITY_DATA,
  },

  {
    id: 'm4-lis-theory',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Subsecuencia Creciente Más Larga (LIS)',
    conceptSubtitle: 'Formulación sobre Final de Prefijo y Matriz Auxiliar D',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 6,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Problema LIS: Dado un arreglo numérico X de n elementos, determinar la longitud y elementos de la subsecuencia más larga cuyos valores sean estrictamente crecientes (o no decrecientes).',
      bulletPoints: [
        'Definición Crítica del Estado: Sea L[i] la longitud de la LIS más larga que FINALIZA OBLIGATORIAMENTE en el elemento X[i]. Sin esta restricción, la propiedad de subestructura no puede verificarse.',
        'Ecuación de Bellman: L[i] = 1 + max({L[j] : 0 <= j < i y X[j] <= X[i]} union {0}). El caso base es L[i] = 1 (el elemento por sí mismo).',
        'Estructura de la Cátedra UADE (Matriz D de 2 x n): D[0, i] almacena la longitud L[i] y D[1, i] almacena el puntero al elemento previo j que proporcionó el óptimo (o -1 si es el inicio).',
        'Reconstrucción de la Secuencia Z: Se busca el índice inx donde D[0, inx] es máximo global; a partir de allí, se sigue la cadena de punteros D[1, curr] hasta -1 y se invierte el arreglo resultante.',
        'Comparativa Asintótica: La formulación clásica DP insume Theta(n^2). Utilizando ordenamiento con paciencia y búsqueda binaria (Patience Sorting) se reduce a Theta(n log n).',
      ],
      formulas: [
        {
          label: 'Ecuación de Bellman Condicionada (LIS)',
          latex: 'L[i] = 1 + \\max \\left( \\{ L[j] : 0 \\le j < i \\land X[j] \\le X[i] \\} \\cup \\{0\\} \\right)',
          description: 'Cálculo de la mayor longitud extendiendo una subsecuencia válida previa.',
        },
      ],
      keyInsight:
        'Condicionar el subproblema a que termine en el elemento i permite una comparación local inequívoca con todos sus predecesores viables.',
    },
  },
  {
    id: 'm4-lis-visualizer',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'LIS: Traza de Vectores y Cadena de Punteros',
    conceptSubtitle: 'Simulador Interactivo de Arreglo, Vector D y Reconstrucción',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 6,
    slideKind: 'visualizer',
    visualizerId: 'lis-trace',
  },
  {
    id: 'm4-lis-pseudocode',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'LIS: Pseudocódigo de Cátedra UADE',
    conceptSubtitle: 'Algoritmo Formal de Llenado Cuadrático y Reconstrucción Z',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 6,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'LIS_DP(X: Arreglo<entero>) -> (entero, Arreglo<entero>)',
      snippets: {
        pseudocode:
          'ALGORITMO LIS_DP(X: Arreglo<entero>) -> (entero, Arreglo<entero>)\n    n <- longitud(X)\n    D <- inicializarMatriz(2, n)\n    Para i = 0 hasta n - 1 Hacer D[0, i] <- 1; D[1, i] <- -1 FinPara\n    Para i = 1 hasta n - 1 Hacer\n        Para j = 0 hasta i - 1 Hacer\n            Si X[j] <= X[i] Y D[0, j] + 1 >= D[0, i] Entonces\n                D[0, i] <- D[0, j] + 1; D[1, i] <- j\n            FinSi\n        FinPara\n    FinPara\n    inx <- indiceMaximo(D[0])\n    L <- D[0, inx]; Z <- Reconstruir(X, D, inx, L)\n    Devolver (L, Z)',
        java:
          'public static int[] lis(int[] x) {\n    int n = x.length;\n    int[][] d = new int[2][n];\n    for (int i = 0; i < n; i++) { d[0][i] = 1; d[1][i] = -1; }\n    for (int i = 1; i < n; i++) {\n        for (int j = 0; j < i; j++) {\n            if (x[j] <= x[i] && d[0][j] + 1 >= d[0][i]) {\n                d[0][i] = d[0][j] + 1; d[1][i] = j;\n            }\n        }\n    }\n    int inx = 0;\n    for (int i = 1; i < n; i++) if (d[0][i] > d[0][inx]) inx = i;\n    int[] z = new int[d[0][inx]];\n    int curr = inx;\n    for (int i = z.length - 1; i >= 0; i--) { z[i] = x[curr]; curr = d[1][curr]; }\n    return z;\n}',
        python:
          'def lis_dp(x: list[int]) -> tuple[int, list[int]]:\n    n = len(x)\n    d = [[1] * n, [-1] * n]\n    for i in range(1, n):\n        for j in range(i):\n            if x[j] <= x[i] and d[0][j] + 1 >= d[0][i]:\n                d[0][i] = d[0][j] + 1; d[1][i] = j\n    inx = max(range(n), key=lambda i: d[0][i])\n    l, curr, z = d[0][inx], inx, []\n    while curr != -1:\n        z.append(x[curr])\n        curr = d[1][curr]\n    return l, list(reversed(z))',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: LIS_COMPLEXITY_DATA,
  },
  {
    id: 'm4-lis-code-table',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'LIS: Llenado de Matriz D y Punteros',
    conceptSubtitle: 'Implementación Java del Doble Bucle de Transición',
    badgeLabel: '4. Código: Matriz D',
    partIndex: 4,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'LISDP.java (Cálculo de Matriz D)',
      snippets: {
        pseudocode:
          'ALGORITMO CalcularLIS(X)\n    Inicializar D[0] en 1 y D[1] en -1\n    Doble bucle: i de 1 a n-1, j de 0 a i-1\n        Si X[j] <= X[i] y mejora longitud, actualizar D[0, i] y puntero D[1, i]\n    Hallar inx con longitud maxima',
        java:
          'public static int[] calcularD(VectorTDA<Integer> X) {\n    int n = X.capacidadVector();\n    int[][] D = new int[2][n];\n    for (int i = 0; i < n; i++) {\n        D[0][i] = 1;\n        D[1][i] = -1;\n    }\n    for (int i = 1; i < n; i++) {\n        int val_i = X.recuperarElemento(i);\n        for (int j = 0; j < i; j++) {\n            int val_j = X.recuperarElemento(j);\n            if (val_j <= val_i && D[0][j] + 1 >= D[0][i]) {\n                D[0][i] = D[0][j] + 1;\n                D[1][i] = j;\n            }\n        }\n    }\n    return D[0];\n}',
        python:
          'def calcular_d(x: list[int]) -> list[int]:\n    n = len(x)\n    dp = [1] * n\n    for i in range(1, n):\n        for j in range(i):\n            if x[j] <= x[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return dp',
      },
      preferredLanguage: 'java',
    },
    complexityData: LIS_COMPLEXITY_DATA,
  },
  {
    id: 'm4-lis-code-reconstruction',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'LIS: Reconstrucción Inversa de la Secuencia Z',
    conceptSubtitle: 'Encadenamiento de Punteros D[1, curr] sobre VectorTDA',
    badgeLabel: '5. Código: Backtracking',
    partIndex: 5,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'LISDP.java (Reconstrucción)',
      snippets: {
        pseudocode:
          'ALGORITMO ReconstruirLIS(X, D, inx, maxL)\n    Z <- vector de tamaño maxL\n    curr <- inx\n    Para i de maxL - 1 bajando a 0 Hacer\n        Z[i] <- X[curr]\n        curr <- D[1, curr]\n    FinPara\n    Devolver Z',
        java:
          'public static VectorTDA<Integer> reconstruirLIS(VectorTDA<Integer> X, int[][] D, int inx, int maxL) {\n    VectorTDA<Integer> Z = new Vector<Integer>();\n    Z.inicializarVector(maxL);\n    int curr = inx;\n    for (int i = maxL - 1; i >= 0; i--) {\n        Z.agregarElemento(i, X.recuperarElemento(curr));\n        curr = D[1][curr];\n    }\n    return Z;\n}',
        python:
          'def reconstruir_lis(x: list[int], prev: list[int], inx: int, max_l: int) -> list[int]:\n    z = [0] * max_l\n    curr = inx\n    for i in range(max_l - 1, -1, -1):\n        z[i] = x[curr]\n        curr = prev[curr]\n    return z',
      },
      preferredLanguage: 'java',
    },
    complexityData: LIS_COMPLEXITY_DATA,
  },
  {
    id: 'm4-lis-complexity',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'LIS: Análisis de Complejidad Asintótica',
    conceptSubtitle: 'Costo Cuadrático Theta(n^2) vs Aceleración Theta(n log n)',
    badgeLabel: '6. Complejidad',
    partIndex: 6,
    totalParts: 6,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'LISDP.java (Anotaciones Asintóticas)',
      snippets: {
        pseudocode:
          'ALGORITMO LIS(X)\n    Inicializar vectores D0 y D1 en O(n)\n    Doble bucle for: i de 1 a n-1, j de 0 a i-1\n        Comparación en tiempo O(1) con sumatoria n(n-1)/2\n    Búsqueda de índice máximo en O(n)\n    Devolver longitud máxima',
        java:
          'public static int calcularLIS(VectorTDA<Integer> x) {\n    int n = x.capacidadVector();\n    int[] d0 = new int[n];\n    int[] d1 = new int[n];\n    for (int i = 0; i < n; i++) {\n        d0[i] = 1;\n        d1[i] = -1;\n    }\n    for (int i = 1; i < n; i++) {\n        int vi = x.recuperarElemento(i);\n        for (int j = 0; j < i; j++) {\n            int vj = x.recuperarElemento(j);\n            if (vj <= vi && d0[j] + 1 >= d0[i]) {\n                d0[i] = d0[j] + 1;\n                d1[i] = j;\n            }\n        }\n    }\n    int maxL = 0;\n    for (int i = 0; i < n; i++) if (d0[i] > maxL) maxL = d0[i];\n    return maxL;\n}',
        python:
          'def lis(x: list[int]) -> int:\n    n = len(x)\n    dp = [1] * n\n    for i in range(1, n):\n        for j in range(i):\n            if x[j] <= x[i]: dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)',
      },
      preferredLanguage: 'java',
    },
    complexityData: LIS_COMPLEXITY_DATA,
  },

  {
    id: 'm4-matrix-chain-theory',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Multiplicación Encadenada de Matrices',
    conceptSubtitle: 'Propiedad Asociativa, Puntos de Partición y Matriz Triangular',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 6,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Impacto del paréntesis: Multiplicar n matrices A_1 A_2 ... A_n es asociativo, pero el número de multiplicaciones escalares depende radicalmente del orden de evaluación.',
      bulletPoints: [
        'Ejemplo Crítico: Para A_1 (10x100), A_2 (100x5) y A_3 (5x50): (A_1 A_2) A_3 requiere 10*100*5 + 10*5*50 = 7.500 multiplicaciones; mientras que A_1 (A_2 A_3) insume 100*5*50 + 10*100*50 = 75.000 (10 veces más costosa).',
        'Espacio de Búsqueda Catalán: El número de parentizaciones completas es el número de Catalán C_{n-1} aprox 4^n / (n^{3/2} sqrt(pi)), haciendo inviable la búsqueda por fuerza bruta.',
        'Definición de Subproblema m[i, j]: Número mínimo de multiplicaciones escalares para calcular el producto A_i ... A_j (con 0 <= i <= j < n).',
        'Ecuación de Bellman: m[i, j] = 0 si i == j; sino min_{i <= k < j} { m[i, k] + m[k+1, j] + d_i * d_{k+1} * d_{j+1} }, donde el vector d preserva las dimensiones compatibles.',
        'Orden de Llenado: Se llena por longitud de cadena L = j - i + 1 de 2 a n, o en orden descendente por filas i = n-1 down to 0 y j = i+1 to n-1 (Cátedra UADE).',
        'Matriz S[i, j]: Almacena el índice k* óptimo que minimizó el costo, permitiendo reconstruir los paréntesis en tiempo O(n).',
      ],
      formulas: [
        {
          label: 'Ecuación de Recurrencia de Bellman (Matrices Encadenadas)',
          latex: 'm[i, j] = \\begin{cases} 0 & \\text{si } i = j \\\\ \\min_{i \\le k < j} \\{ m[i, k] + m[k+1, j] + d_i \\cdot d_{k+1} \\cdot d_{j+1} \\} & \\text{si } i < j \\end{cases}',
          description: 'Minimización sobre todos los puntos de partición k entre el subproducto izquierdo y derecho.',
        },
      ],
      keyInsight:
        'El subproblema divide la cadena en dos subcadenas independientes en el punto k*, donde cada mitad se optimiza de manera autónoma.',
    },
  },
  {
    id: 'm4-matrix-chain-visualizer',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Multiplicación de Matrices: Matriz Triangular M y S',
    conceptSubtitle: 'Explorador Interactivo de Particiones k y Costos Acumulados',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 6,
    slideKind: 'visualizer',
    visualizerId: 'matrix-chain-dp',
  },
  {
    id: 'm4-matrix-chain-pseudocode',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Multiplicación de Matrices: Pseudocódigo',
    conceptSubtitle: 'Triple Bucle Anidado de Cátedra UADE y Matriz Auxiliar S',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 6,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'ProductoMatrices_DP(d: Vector<entero>) -> Matriz<entero>',
      snippets: {
        pseudocode:
          'ALGORITMO ProductoMatrices_DP(d: Vector<entero>) -> Matriz<entero>\n    n <- longitud(d) - 1\n    M <- inicializarMatriz(n, n)\n    Para i desde 0 hasta n - 1 Hacer M[i, i] <- 0 FinPara\n    Para i desde n - 1 descendiendo hasta 0 Hacer\n        Para j desde i + 1 hasta n - 1 Hacer\n            M[i, j] <- +INFINITO\n            Para k desde i hasta j - 1 Hacer\n                costo <- M[i, k] + M[k + 1, j] + d[i] * d[k + 1] * d[j + 1]\n                Si costo < M[i, j] Entonces\n                    M[i, j] <- costo; S[i, j] <- k\n                FinSi\n            FinPara\n        FinPara\n    FinPara\n    Devolver M',
        java:
          'public static int matrixChain(int[] d) {\n    int n = d.length - 1;\n    int[][] m = new int[n][n];\n    for (int L = 2; L <= n; L++) {\n        for (int i = 0; i <= n - L; i++) {\n            int j = i + L - 1;\n            m[i][j] = Integer.MAX_VALUE;\n            for (int k = i; k < j; k++) {\n                int q = m[i][k] + m[k + 1][j] + d[i] * d[k + 1] * d[j + 1];\n                if (q < m[i][j]) m[i][j] = q;\n            }\n        }\n    }\n    return m[0][n - 1];\n}',
        python:
          'def matrix_chain(d: list[int]) -> int:\n    n = len(d) - 1\n    m = [[0] * n for _ in range(n)]\n    for L in range(2, n + 1):\n        for i in range(n - L + 1):\n            j = i + L - 1\n            m[i][j] = min(m[i][k] + m[k + 1][j] + d[i] * d[k + 1] * d[j + 1] for k in range(i, j))\n    return m[0][n - 1]',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: MATRIX_CHAIN_COMPLEXITY_DATA,
  },
  {
    id: 'm4-matrix-chain-code-table',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Multiplicación de Matrices: Llenado de Matriz M',
    conceptSubtitle: 'Implementación Java sobre MatrizTDA con Recorrido Descendente',
    badgeLabel: '4. Código: Matriz M',
    partIndex: 4,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'ProductoMatricesDP.java (Cálculo de Matriz M)',
      snippets: {
        pseudocode:
          'ALGORITMO ProductoMatrices(v)\n    Recorrido por filas de n - 1 descendiendo a 0\n    Recorrido por columnas de i + 1 a n - 1\n        Buscar el punto de particion k que minimice el costo escalar\n    Devolver m[0, n - 1]',
        java:
          'public static int productoMatrices(VectorTDA<Integer> v) throws Exception {\n    int n = v.capacidadVector() - 1;\n    MatrizTDA<Integer> m = new Matriz<Integer>();\n    m.inicializarMatriz(n);\n    for (int i = 0; i < n; i++) m.setearValor(i, i, 0);\n    for (int i = n - 1; i >= 0; i--) {\n        for (int j = i + 1; j < n; j++) {\n            int minimo = Integer.MAX_VALUE;\n            for (int k = i; k < j; k++) {\n                int di = v.recuperarElemento(i);\n                int dk = v.recuperarElemento(k + 1);\n                int dj = v.recuperarElemento(j + 1);\n                int costo = m.obtenerValor(i, k) + m.obtenerValor(k + 1, j) + (di * dk * dj);\n                if (costo < minimo) minimo = costo;\n            }\n            m.setearValor(i, j, minimo);\n        }\n    }\n    return m.obtenerValor(0, n - 1);\n}',
        python:
          'def producto_matrices(v: list[int]) -> int:\n    n = len(v) - 1\n    m = [[0] * n for _ in range(n)]\n    for i in range(n - 1, -1, -1):\n        for j in range(i + 1, n):\n            m[i][j] = min(m[i][k] + m[k + 1][j] + v[i] * v[k + 1] * v[j + 1] for k in range(i, j))\n    return m[0][n - 1]',
      },
      preferredLanguage: 'java',
    },
    complexityData: MATRIX_CHAIN_COMPLEXITY_DATA,
  },
  {
    id: 'm4-matrix-chain-code-parens',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Multiplicación de Matrices: Parentización Óptima',
    conceptSubtitle: 'Impresión Recursiva de Paréntesis sobre Matriz S',
    badgeLabel: '5. Código: Paréntesis',
    partIndex: 5,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'ProductoMatricesDP.java (Paréntesis)',
      snippets: {
        pseudocode:
          'ALGORITMO ImprimirParentesis(S, i, j)\n    Si i == j Entonces Escribir "A" + i\n    Sino\n        Escribir "("\n        ImprimirParentesis(S, i, S[i, j])\n        Escribir " x "\n        ImprimirParentesis(S, S[i, j] + 1, j)\n        Escribir ")"\n    FinSi',
        java:
          'public static void imprimirParentesis(int[][] s, int i, int j) {\n    if (i == j) {\n        System.out.print("A" + i);\n    } else {\n        System.out.print("(");\n        imprimirParentesis(s, i, s[i][j]);\n        System.out.print(" x ");\n        imprimirParentesis(s, s[i][j] + 1, j);\n        System.out.print(")");\n    }\n}',
        python:
          'def imprimir_parentesis(s: list[list[int]], i: int, j: int) -> str:\n    if i == j:\n        return f"A{i}"\n    izq = imprimir_parentesis(s, i, s[i][j])\n    der = imprimir_parentesis(s, s[i][j] + 1, j)\n    return f"({izq} x {der})"',
      },
      preferredLanguage: 'java',
    },
    complexityData: MATRIX_CHAIN_COMPLEXITY_DATA,
  },
  {
    id: 'm4-matrix-chain-complexity',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Multiplicación de Matrices: Complejidad Asintótica',
    conceptSubtitle: 'Deducción Matemática del Costo Cúbico Theta(n^3)',
    badgeLabel: '6. Complejidad',
    partIndex: 6,
    totalParts: 6,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'ProductoMatricesDP.java (Anotaciones Asintóticas)',
      snippets: {
        pseudocode:
          'ALGORITMO MatrixChain(v)\n    Inicializar matriz de tamaño n x n\n    Poner en 0 la diagonal principal en O(n)\n    Triple bucle for: i descendente, j ascendente, k intermedio\n        Evaluación escalar en tiempo O(1)\n    Devolver m[0, n - 1]',
        java:
          'public static int productoMatrices(VectorTDA<Integer> v) throws Exception {\n    int n = v.capacidadVector() - 1;\n    MatrizTDA<Integer> m = new Matriz<Integer>();\n    m.inicializarMatriz(n);\n    for (int i = 0; i < n; i++) m.setearValor(i, i, 0);\n    for (int i = n - 1; i >= 0; i--) {\n        for (int j = i + 1; j < n; j++) {\n            int minimo = Integer.MAX_VALUE;\n            for (int k = i; k < j; k++) {\n                int di = v.recuperarElemento(i);\n                int dk = v.recuperarElemento(k + 1);\n                int dj = v.recuperarElemento(j + 1);\n                int costo = m.obtenerValor(i, k) + m.obtenerValor(k + 1, j) + (di * dk * dj);\n                if (costo < minimo) minimo = costo;\n            }\n            m.setearValor(i, j, minimo);\n        }\n    }\n    return m.obtenerValor(0, n - 1);\n}',
        python:
          'def matrix_chain(v: list[int]) -> int:\n    n = len(v) - 1\n    m = [[0] * n for _ in range(n)]\n    for i in range(n - 1, -1, -1):\n        for j in range(i + 1, n):\n            m[i][j] = min(m[i][k] + m[k + 1][j] + v[i] * v[k + 1] * v[j + 1] for k in range(i, j))\n    return m[0][n - 1]',
      },
      preferredLanguage: 'java',
    },
    complexityData: MATRIX_CHAIN_COMPLEXITY_DATA,
  },

  {
    id: 'm4-floyd-warshall-theory',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Caminos Mínimos de Todos a Todos: Floyd-Warshall',
    conceptSubtitle: 'Cierre Transitivo Métrico, Vértices Puente y Matriz In-Place',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 6,
    slideKind: 'theory',
    theoryData: {
      summary:
        'Problema APSP: Hallar la distancia mínima entre cualquier par de vértices (i, j) en un grafo dirigido ponderado G = (V, E), admitiendo pesos negativos si no existen ciclos negativos.',
      bulletPoints: [
        'Principio de Subestructura sobre Vértices Intermedios: Se restringen los nodos intermedios al subconjunto {0, 1, ..., k}. Al incorporar el pivote k, se evalúa si el camino mínimo existente A_{k-1}[i, j] mejora usando el desvío i -> k -> j.',
        'Ecuación de Recurrencia: A_k[i, j] = min(A_{k-1}[i, j], A_{k-1}[i, k] + A_{k-1}[k, j]).',
        'Caso Base A_{-1}: A_{-1}[i, i] = 0; si existe arista dirigida (i, j), A_{-1}[i, j] = peso(i, j); de lo contrario +infinito.',
        'Propiedad In-Place: Como los valores de la fila k y la columna k no varían en el paso k (A_k[i, k] = A_{k-1}[i, k]), se puede actualizar sobre una única matriz cuadrada de tamaño |V| x |V|, reduciendo espacio de O(|V|^3) a Theta(|V|^2).',
        'Detección de Ciclos Negativos: Si al finalizar las n etapas alguna entrada diagonal cumple A[i, i] < 0, existe un ciclo de costo negativo alcanzable desde i.',
        'Reconstrucción de Rutas: Una matriz Next[i, j] almacena el siguiente vértice en la trayectoria óptima hacia j.',
      ],
      formulas: [
        {
          label: 'Ecuación de Relajación de Floyd-Warshall',
          latex: 'A_k[i, j] = \\begin{cases} \\text{peso}(i, j) & \\text{si } k = -1 \\land i \\ne j \\\\ 0 & \\text{si } k = -1 \\land i = j \\\\ \\min(A_{k-1}[i, j],\\, A_{k-1}[i, k] + A_{k-1}[k, j]) & \\text{para } k = 0, 1, \\dots, |V| - 1 \\end{cases}',
          description: 'Relajación sistemática sobre el vértice intermedio pivote k.',
        },
      ],
      keyInsight:
        'Floyd-Warshall opera sistemáticamente sobre |V| etapas pivote, logrando Theta(|V|^3) con extrema simplicidad de implementación y libre de estructuras auxiliares complejas.',
    },
  },
  {
    id: 'm4-floyd-warshall-visualizer',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Floyd-Warshall: Matrices de Distancias y Pivote k',
    conceptSubtitle: 'Simulador Interactivo de Relajación Paso a Paso en Grafos',
    badgeLabel: '2. Simulación Interactiva',
    partIndex: 2,
    totalParts: 6,
    slideKind: 'visualizer',
    visualizerId: 'floyd-warshall',
  },
  {
    id: 'm4-floyd-warshall-pseudocode',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Floyd-Warshall: Pseudocódigo Canónico',
    conceptSubtitle: 'Triple Bucle Anidado de Relajación sobre Matriz de Adyacencia',
    badgeLabel: '3. Pseudocódigo',
    partIndex: 3,
    totalParts: 6,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'FloydWarshall_DP(G: GrafoDirigido) -> Matriz<real>',
      snippets: {
        pseudocode:
          'ALGORITMO FloydWarshall_DP(G: GrafoDirigido) -> Matriz<real>\n    n <- |V|\n    A <- inicializarMatriz(n, n)\n    Para i desde 0 hasta n - 1 Hacer\n        Para j desde 0 hasta n - 1 Hacer\n            Si i == j Entonces A[i, j] <- 0\n            Sino si existe arista (i, j) Entonces A[i, j] <- peso(i, j)\n            Sino A[i, j] <- +INFINITO\n        FinPara\n    FinPara\n    Para k desde 0 hasta n - 1 Hacer\n        Para i desde 0 hasta n - 1 Hacer\n            Para j desde 0 hasta n - 1 Hacer\n                Si A[i, k] + A[k, j] < A[i, j] Entonces\n                    A[i, j] <- A[i, k] + A[k, j]\n                FinSi\n            FinPara\n        FinPara\n    FinPara\n    Devolver A',
        java:
          'public static int[][] floydWarshall(int[][] dist, int n) {\n    int[][] a = new int[n][n];\n    for (int i = 0; i < n; i++) System.arraycopy(dist[i], 0, a[i], 0, n);\n    for (int k = 0; k < n; k++) {\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                if (a[i][k] != 9999999 && a[k][j] != 9999999) {\n                    a[i][j] = Math.min(a[i][j], a[i][k] + a[k][j]);\n                }\n            }\n        }\n    }\n    return a;\n}',
        python:
          'def floyd_warshall(dist: list[list[float]], n: int) -> list[list[float]]:\n    a = [row[:] for row in dist]\n    for k in range(n):\n        for i in range(n):\n            for j in range(n):\n                if a[i][k] + a[k][j] < a[i][j]:\n                    a[i][j] = a[i][k] + a[k][j]\n    return a',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: FLOYD_WARSHALL_COMPLEXITY_DATA,
  },
  {
    id: 'm4-floyd-warshall-code-algorithm',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Floyd-Warshall: Algoritmo de Relajación',
    conceptSubtitle: 'Implementación Java sobre GrafoDirTDA de Cátedra UADE',
    badgeLabel: '4. Código: Floyd',
    partIndex: 4,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'FloydWarshall.java (Relajación)',
      snippets: {
        pseudocode:
          'ALGORITMO Floyd(grafo)\n    Inicializar matriz A con aristas del grafo\n    Triple bucle anidado: k de 0 a n-1, i de 0 a n-1, j de 0 a n-1\n        Si A[i, k] + A[k, j] < A[i, j] actualizar distancia\n    Devolver matriz de distancias minimas',
        java:
          'public static int[][] floyd(GrafoDirTDA<Integer> grafo, int n) {\n    int INF = 9999999;\n    int[][] A = new int[n][n];\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            if (i == j) A[i][j] = 0;\n            else if (grafo.ExisteArista(i, j)) A[i][j] = (int) grafo.PesoArista(i, j);\n            else A[i][j] = INF;\n        }\n    }\n    for (int k = 0; k < n; k++) {\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                if (A[i][k] != INF && A[k][j] != INF) {\n                    if (A[i][k] + A[k][j] < A[i][j]) A[i][j] = A[i][k] + A[k][j];\n                }\n            }\n        }\n    }\n    return A;\n}',
        python:
          'def floyd(n: int, existe_arista, peso_arista) -> list[list[float]]:\n    inf = float("inf")\n    a = [[0 if i == j else (peso_arista(i, j) if existe_arista(i, j) else inf) for j in range(n)] for i in range(n)]\n    for k in range(n):\n        for i in range(n):\n            for j in range(n):\n                a[i][j] = min(a[i][j], a[i][k] + a[k][j])\n    return a',
      },
      preferredLanguage: 'java',
    },
    complexityData: FLOYD_WARSHALL_COMPLEXITY_DATA,
  },
  {
    id: 'm4-floyd-warshall-code-path',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Floyd-Warshall: Reconstrucción de Caminos',
    conceptSubtitle: 'Recuperación de Rutas con Matriz Next / Predecesores',
    badgeLabel: '5. Código: Rutas',
    partIndex: 5,
    totalParts: 6,
    slideKind: 'code',
    codeSnippet: {
      title: 'FloydWarshall.java (Rutas con Next)',
      snippets: {
        pseudocode:
          'ALGORITMO ReconstruirCamino(Next, u, v)\n    Si Next[u, v] == Nulo Entonces Devolver Vacio\n    camino <- [u]\n    Mientras u != v Hacer\n        u <- Next[u, v]\n        camino.Agregar(u)\n    FinMientras\n    Devolver camino',
        java:
          'public static java.util.List<Integer> reconstruirCamino(Integer[][] next, int u, int v) {\n    java.util.List<Integer> camino = new java.util.ArrayList<Integer>();\n    if (next[u][v] == null) return camino;\n    camino.add(u);\n    while (u != v) {\n        u = next[u][v];\n        camino.add(u);\n    }\n    return camino;\n}',
        python:
          'def reconstruir_camino(next_node: list[list[int | None]], u: int, v: int) -> list[int]:\n    if next_node[u][v] is None: return []\n    camino = [u]\n    while u != v:\n        u = next_node[u][v]\n        camino.append(u)\n    return camino',
      },
      preferredLanguage: 'java',
    },
    complexityData: FLOYD_WARSHALL_COMPLEXITY_DATA,
  },
  {
    id: 'm4-floyd-warshall-complexity',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Floyd-Warshall: Análisis de Complejidad',
    conceptSubtitle: 'Costo Temporal Estricto Theta(|V|^3) y Memoria In-Place Theta(|V|^2)',
    badgeLabel: '6. Complejidad',
    partIndex: 6,
    totalParts: 6,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'FloydWarshall.java (Anotaciones Asintóticas)',
      snippets: {
        pseudocode:
          'ALGORITMO Floyd(dist, n)\n    Inicializar matriz de distancias en Theta(|V|^2)\n    Triple bucle for sobre k, i y j en Theta(|V|^3)\n        Relajación elemental en tiempo O(1)\n    Devolver matriz de distancias',
        java:
          'public static int[][] floydWarshall(int[][] dist, int n) {\n    int[][] a = new int[n][n];\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            a[i][j] = dist[i][j];\n        }\n    }\n    for (int k = 0; k < n; k++) {\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                if (a[i][k] != 9999999 && a[k][j] != 9999999) {\n                    if (a[i][k] + a[k][j] < a[i][j]) {\n                        a[i][j] = a[i][k] + a[k][j];\n                    }\n                }\n            }\n        }\n    }\n    return a;\n}',
        python:
          'def floyd_warshall(dist: list[list[int]], n: int) -> list[list[int]]:\n    a = [r[:] for r in dist]\n    for k in range(n):\n        for i in range(n):\n            for j in range(n):\n                if a[i][k] + a[k][j] < a[i][j]:\n                    a[i][j] = a[i][k] + a[k][j]\n    return a',
      },
      preferredLanguage: 'java',
    },
    complexityData: FLOYD_WARSHALL_COMPLEXITY_DATA,
  },

  {
    id: 'm4-tsp-held-karp-theory',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'Problema del Viajante de Comercio (TSP) y Held-Karp',
    conceptSubtitle: 'Frontera de Intratabilidad, Subconjuntos de Bellman y Bitmask DP',
    badgeLabel: '1. Fundamento Teórico',
    partIndex: 1,
    totalParts: 5,
    slideKind: 'theory',
    theoryData: {
      summary:
        'El límite práctico de DP: Hallar un ciclo hamiltoniano de costo mínimo en un grafo completo ponderado, visitando cada ciudad una vez y regresando al origen.',
      bulletPoints: [
        'Colapso de Fuerza Bruta: Evaluar todas las permutaciones requiere (n-1)! opciones. Para n = 20, 19! aprox 1.21 x 10^17 operaciones (inviable en milenios).',
        'Formulación de Held-Karp (1962): Sea D(v, C) la distancia mínima para visitar el subconjunto de ciudades C partiendo del nodo v y regresando al origen 0.',
        'Ecuación de Bellman: D(v, C) = min_{w in C} { dist(v, w) + D(w, C \\ {w}) } con caso base D(v, emptyset) = dist(v, 0).',
        'Representación Eficiente con Máscaras de Bits (Bitmask): Un entero de n bits codifica el subconjunto C. Encender o apagar el bit u se realiza con operaciones a nivel de bit en O(1).',
        'Orden Topológico de Cálculo: Los estados se resuelven por cardinalidad creciente de bits encendidos en la máscara (tamaño 0, luego 1, 2, ..., n-1).',
        'Significado Pedagógico: La DP reduce el factorial O(n!) a Theta(n^2 * 2^n). Para n = 20, toma aprox 4 x 10^8 operaciones (segundos). Sin embargo, al mantenerse exponencial, marca la frontera de los problemas NP-Hard.',
      ],
      formulas: [
        {
          label: 'Ecuación de Recurrencia de Held-Karp (TSP Bitmask DP)',
          latex: 'D(v, C) = \\begin{cases} \\text{peso}(v, 0) & \\text{si } C = \\emptyset \\\\ \\min_{w \\in C} \\{ \\text{peso}(v, w) + D(w, C \\setminus \\{w\\}) \\} & \\text{si } C \\ne \\emptyset \\end{cases}',
          description: 'Decisión óptima del siguiente vértice intermedio sobre el subconjunto de ciudades remanentes.',
        },
      ],
      keyInsight:
        'Held-Karp demuestra la máxima potencia de la Programación Dinámica logrando una aceleración exponencial frente a la fuerza bruta en problemas NP-Hard.',
    },
  },
  {
    id: 'm4-tsp-held-karp-pseudocode',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'TSP Held-Karp: Pseudocódigo Formal',
    conceptSubtitle: 'Algoritmo de Programación Dinámica con Máscara de Bits',
    badgeLabel: '2. Pseudocódigo',
    partIndex: 2,
    totalParts: 5,
    slideKind: 'pseudocode',
    codeSnippet: {
      title: 'TSP_HeldKarp_DP(dist: Matriz<real>, n: entero) -> real',
      snippets: {
        pseudocode:
          'ALGORITMO TSP_HeldKarp_DP(dist, n) -> real\n    memo <- inicializarMatriz(n, 2^n, valor: +INFINITO)\n    Para i desde 1 hasta n - 1 Hacer memo[i, 0] <- dist[i, 0] FinPara\n    Para tam desde 1 hasta n - 2 Hacer\n        Para cada mascara S de tamaño tam sin el nodo 0 Hacer\n            Para cada u no en S Hacer\n                memo[u, S] <- Min(dist[u, v] + memo[v, S sin {v}] para cada v en S)\n            FinPara\n        FinPara\n    FinPara\n    mascaraTotal <- (2^n - 1) sin {0}\n    optimo <- Min(dist[0, v] + memo[v, mascaraTotal sin {v}] para v en 1..n-1)\n    Devolver optimo',
        java:
          'public static int tsp(int[][] dist, int n) {\n    int numEstados = 1 << n;\n    int[][] dp = new int[n][numEstados];\n    for (int i = 0; i < n; i++) java.util.Arrays.fill(dp[i], 9999999);\n    for (int i = 1; i < n; i++) dp[i][0] = dist[i][0];\n    for (int mask = 1; mask < numEstados; mask += 2) {\n        for (int u = 1; u < n; u++) {\n            if ((mask & (1 << u)) != 0) continue;\n            for (int v = 1; v < n; v++) {\n                if ((mask & (1 << v)) != 0) {\n                    dp[u][mask] = Math.min(dp[u][mask], dist[u][v] + dp[v][mask ^ (1 << v)]);\n                }\n            }\n        }\n    }\n    int res = 9999999;\n    for (int v = 1; v < n; v++) res = Math.min(res, dist[0][v] + dp[v][((1 << n) - 1) ^ (1 << v)]);\n    return res;\n}',
        python:
          'def tsp_held_karp(dist: list[list[int]], n: int) -> int:\n    memo = {}\n    def dp(u: int, mask: int) -> int:\n        if mask == (1 << n) - 1: return dist[u][0]\n        if (u, mask) in memo: return memo[(u, mask)]\n        memo[(u, mask)] = min(dist[u][v] + dp(v, mask | (1 << v)) for v in range(n) if not (mask & (1 << v)))\n        return memo[(u, mask)]\n    return dp(0, 1)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: TSP_HELD_KARP_COMPLEXITY_DATA,
  },
  {
    id: 'm4-tsp-held-karp-code-init',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'TSP Held-Karp: Inicialización y Subconjuntos',
    conceptSubtitle: 'Matriz DP n x 2^n y Casos Base con Máscara Binaria',
    badgeLabel: '3. Código: Inicialización',
    partIndex: 3,
    totalParts: 5,
    slideKind: 'code',
    codeSnippet: {
      title: 'TSPHeldKarp.java (Inicialización y Casos Base)',
      snippets: {
        pseudocode:
          'ALGORITMO InicializarTSP(dist, n)\n    Reservar matriz dp de n x 2^n en infinito\n    Establecer distancias directas al origen para subconjunto vacio\n    dp[i, 0] <- dist[i, 0] para todo i entre 1 y n - 1',
        java:
          'public static int[][] inicializarDP(int[][] dist, int n) {\n    int inf = 9999999;\n    int numEstados = 1 << n;\n    int[][] dp = new int[n][numEstados];\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < numEstados; j++) {\n            dp[i][j] = inf;\n        }\n    }\n    for (int i = 1; i < n; i++) {\n        dp[i][0] = dist[i][0];\n    }\n    return dp;\n}',
        python:
          'def inicializar_dp(dist: list[list[int]], n: int) -> list[list[int]]:\n    inf = 9999999\n    dp = [[inf] * (1 << n) for _ in range(n)]\n    for i in range(1, n):\n        dp[i][0] = dist[i][0]\n    return dp',
      },
      preferredLanguage: 'java',
    },
    complexityData: TSP_HELD_KARP_COMPLEXITY_DATA,
  },
  {
    id: 'm4-tsp-held-karp-code-transitions',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'TSP Held-Karp: Transiciones y Ciclo Óptimo',
    conceptSubtitle: 'Exploración de Subconjuntos y Cierre en el Origen en Java',
    badgeLabel: '4. Código: Transiciones',
    partIndex: 4,
    totalParts: 5,
    slideKind: 'code',
    codeSnippet: {
      title: 'TSPHeldKarp.java (Transiciones)',
      snippets: {
        pseudocode:
          'ALGORITMO TransicionesTSP(dp, dist, n)\n    Para cada subconjunto mask de menor a mayor:\n        Para cada ciudad u que no este en mask:\n            minCosto <- Min(dist[u, v] + dp[v, mask sin {v}] para v en mask)\n            dp[u, mask] <- minCosto\n    Retornar ciclo optimo cerrado en el origen',
        java:
          'public static int resolverTransiciones(int[][] dp, int[][] dist, int n) {\n    int inf = 9999999;\n    for (int mask = 1; mask < (1 << (n - 1)); mask++) {\n        int subset = mask << 1;\n        for (int u = 1; u < n; u++) {\n            if ((subset & (1 << u)) != 0) continue;\n            int minCosto = inf;\n            for (int v = 1; v < n; v++) {\n                if ((subset & (1 << v)) != 0) {\n                    int costo = dist[u][v] + dp[v][subset ^ (1 << v)];\n                    if (costo < minCosto) minCosto = costo;\n                }\n            }\n            dp[u][subset] = minCosto;\n        }\n    }\n    int todos = ((1 << n) - 1) ^ 1;\n    int res = inf;\n    for (int v = 1; v < n; v++) {\n        res = Math.min(res, dist[0][v] + dp[v][todos ^ (1 << v)]);\n    }\n    return res;\n}',
        python:
          'def resolver_transiciones(dp: list[list[int]], dist: list[list[int]], n: int) -> int:\n    for mask in range(1, 1 << (n - 1)):\n        subset = mask << 1\n        for u in range(1, n):\n            if not (subset & (1 << u)):\n                dp[u][subset] = min(dist[u][v] + dp[v][subset ^ (1 << v)] for v in range(1, n) if (subset & (1 << v)))\n    todos = ((1 << n) - 1) ^ 1\n    return min(dist[0][v] + dp[v][todos ^ (1 << v)] for v in range(1, n))',
      },
      preferredLanguage: 'java',
    },
    complexityData: TSP_HELD_KARP_COMPLEXITY_DATA,
  },
  {
    id: 'm4-tsp-held-karp-complexity',
    moduleId: 'module-4-dynamic-programming',
    moduleTitle: MODULE_4_TITLE,
    conceptTitle: 'TSP Held-Karp: Análisis de Complejidad Asintótica',
    conceptSubtitle: 'De Factorial O(n!) a Exponencial Dominado Theta(n^2 * 2^n)',
    badgeLabel: '5. Complejidad',
    partIndex: 5,
    totalParts: 5,
    slideKind: 'complexity',
    codeSnippet: {
      title: 'TSPHeldKarp.java (Anotaciones Asintóticas)',
      snippets: {
        pseudocode:
          'ALGORITMO TSP(dist, n)\n    Inicializar tabla DP de tamaño n x 2^n en O(n * 2^n)\n    Casos base con subconjunto vacio en O(n)\n    Bucle de subconjuntos y transiciones en Theta(n^2 * 2^n)\n    Retorno al origen en O(n)\n    Devolver longitud minima',
        java:
          'public static int resolverTSP(int[][] dist, int n) {\n    int inf = 9999999;\n    int numEstados = 1 << n;\n    int[][] dp = new int[n][numEstados];\n    for (int i = 0; i < n; i++) for (int j = 0; j < numEstados; j++) dp[i][j] = inf;\n    for (int i = 1; i < n; i++) dp[i][0] = dist[i][0];\n    for (int mask = 1; mask < (1 << (n - 1)); mask++) {\n        int subset = mask << 1;\n        for (int u = 1; u < n; u++) {\n            if ((subset & (1 << u)) != 0) continue;\n            int minCosto = inf;\n            for (int v = 1; v < n; v++) {\n                if ((subset & (1 << v)) != 0) {\n                    int costo = dist[u][v] + dp[v][subset ^ (1 << v)];\n                    if (costo < minCosto) minCosto = costo;\n                }\n            }\n            dp[u][subset] = minCosto;\n        }\n    }\n    return dp[1][(1 << n) - 2];\n}',
        python:
          'def resolver_tsp(dist: list[list[int]], n: int) -> int:\n    num_estados = 1 << n\n    dp = [[9999999] * num_estados for _ in range(n)]\n    for i in range(1, n): dp[i][0] = dist[i][0]\n    for mask in range(1, 1 << (n - 1)):\n        s = mask << 1\n        for u in range(1, n):\n            if not (s & (1 << u)):\n                dp[u][s] = min(dist[u][v] + dp[v][s ^ (1 << v)] for v in range(1, n) if (s & (1 << v)))\n    return dp[1][(1 << n) - 2]',
      },
      preferredLanguage: 'java',
    },
    complexityData: TSP_HELD_KARP_COMPLEXITY_DATA,
  },
];

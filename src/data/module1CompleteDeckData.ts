import { ConceptSlide } from '../domain/slideDeckBuilder';

const MODULE_1_TITLE = 'Complejidad Temporal, Recurrencias y Clases P/NP';

const LINEAR_SEARCH_COMPLEXITY_DATA = {
  temporalLatex: 'O(n)',
  spatialLatex: 'O(1)',
  bestCaseLatex: 'O(1)',
  averageCaseLatex: 'O(n)',
  worstCaseLatex: 'O(n)',
  theoremApplied: 'T_{peor}(n) = c_1 + n \\cdot c_2 + c_3 = O(n)',
  justification:
    'En el peor caso, x no pertenece al arreglo T o está en la última posición n-1, obligando a realizar n iteraciones del bucle while.',
  annotations: [
    {
      startLine: 2,
      endLine: 2,
      asymptoticCost: 'O(1)',
      label: 'Inicialización de puntero i = 0',
    },
    {
      startLine: 3,
      endLine: 5,
      asymptoticCost: 'O(n)',
      label: 'Bucle while (Peor caso: n iteraciones, Mejor caso: 1)',
    },
    {
      startLine: 6,
      endLine: 10,
      asymptoticCost: 'O(1)',
      label: 'Verificación de centinela y retorno',
    },
  ],
};

const FACTORIAL_COMPLEXITY_DATA = {
  temporalLatex: 'O(n)',
  spatialLatex: 'O(n)',
  bestCaseLatex: 'O(1)',
  averageCaseLatex: 'O(n)',
  worstCaseLatex: 'O(n)',
  theoremApplied: 'T(n) = T(n - 1) + O(1) \\implies \\Theta(n)',
  justification:
    'Cada llamada recursiva reduce n en 1 unidad hasta alcanzar el caso base n <= 1. Se encadenan n marcos de llamada sucesivos.',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(1)',
      label: 'Caso base n <= 1 retorna 1 en tiempo constante',
    },
    {
      startLine: 5,
      endLine: 6,
      asymptoticCost: 'T(n-1) + O(1)',
      label: 'Llamada recursiva a subproblema de tamaño n - 1',
    },
  ],
};

const BINARY_SEARCH_COMPLEXITY_DATA = {
  temporalLatex: 'O(\\log n)',
  spatialLatex: 'O(\\log n)',
  bestCaseLatex: 'O(1)',
  averageCaseLatex: 'O(\\log n)',
  worstCaseLatex: 'O(\\log n)',
  theoremApplied: 'T(n) = 1 \\cdot T(n/2) + O(1) \\implies a=b^k \\implies \\Theta(\\log n)',
  justification:
    'En cada llamada el espacio de búsqueda se divide estrictamente a la mitad. Como solo se invoca una de las dos mitades, el árbol no ramifica.',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(1)',
      label: 'Caso base: subarreglo vacío (elemento no encontrado)',
    },
    {
      startLine: 5,
      endLine: 7,
      asymptoticCost: 'O(1)',
      label: 'Cálculo de índice central mid y comparación',
    },
    {
      startLine: 8,
      endLine: 12,
      asymptoticCost: 'T(n/2)',
      label: 'Llamada recursiva a exactamente una de las dos mitades',
    },
  ],
};

export const MODULE_1_COMPLETE_SLIDES: ConceptSlide[] = [
  {
    id: 'm1-apertura-quote',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Principio de Invarianza: La Máquina vs El Algoritmo',
    conceptSubtitle: 'Reflexión Pedagógica Inicial · Cátedra Wehbe',
    badgeLabel: '1. Cita Disparadora',
    slideKind: 'quote',
    partIndex: 1,
    totalParts: 1,
    quoteData: {
      quote:
        'La tecnología no puede compensar jamás la ineficiencia asintótica de un mal algoritmo.',
      author: 'Prof. Ricardo Wehbe',
      source: 'Diseño y Análisis de Algoritmos · UADE',
      pedagogicalContext:
        'Comprar una computadora 10 veces más rápida solo multiplica el tiempo de ejecución por una constante física, pero no altera el orden de crecimiento asintótico. Ante un problema exponencial o superpolinomial, la tecnología es impotente cuando el tamaño de la entrada n escala.',
    },
  },

  {
    id: 'm1-definicion-algoritmo-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Definición Formal de Algoritmo, Programa e Instancia',
    conceptSubtitle: 'Fundamentos Matemáticos · Secuencia Determinística',
    badgeLabel: '1. Definición Formal',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 1,
    theoryData: {
      summary:
        'Secuencia ordenada y finita de acciones no ambiguas que transforman datos de entrada en datos de salida.',
      bulletPoints: [
        'Entrada y salida: Cero o más datos válidos de entrada y al menos una salida observable medible.',
        'Determinismo: Cada paso está unívocamente determinado a partir del estado actual y la entrada.',
        'Finitud estricta: Debe terminar obligatoriamente tras un número finito de operaciones elementales.',
        'Instancia: Valor particular de entrada (tupla concreta); un problema define infinitas instancias posibles.',
      ],
      keyInsight:
        'Un algoritmo es una abstracción matemática pura; el programa es su concreción en un lenguaje ejecutable.',
    },
  },

  {
    id: 'm1-euler-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Corrección vs Eficiencia: El Contraejemplo de Euler',
    conceptSubtitle: 'Eficacia Algorítmica · La Falacia de la Verificación Empírica',
    badgeLabel: '1. Demostración y Correctitud',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 1,
    theoryData: {
      summary:
        'Un algoritmo es correcto si produce la salida exacta para TODAS las instancias de su dominio. Probar casos particulares no es demostrar.',
      bulletPoints: [
        'Polinomio de Euler: P(n) = n^2 + n + 41 genera números primos ininterrumpidamente para n = 0, 1, 2, ..., 39.',
        'Falso positivo empírico: 40 éxitos consecutivos podrían sugerir que la fórmula siempre genera primos.',
        'Contraejemplo en n = 40: 40^2 + 40 + 41 = 40(41) + 41 = 41^2 = 1681 (compuesto, divisible por 41).',
        'Lección pedagógica: La correctitud exige demostración matemática formal y nunca meros ensayos de prueba.',
      ],
      formulas: [
        {
          label: 'Polinomio de Euler',
          latex: 'P(n) = n^2 + n + 41',
          description: 'Genera primos hasta n=39, pero falla en n=40: P(40) = 41^2',
        },
      ],
      keyInsight:
        'Un algoritmo eficiente que arroja resultados incorrectos carece por completo de utilidad.',
    },
  },

  {
    id: 'm1-invarianza-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Principio de Invarianza de la Máquina',
    conceptSubtitle: 'Independencia de Plataforma · Justificación del Análisis Asintótico',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 2,
    theoryData: {
      summary:
        'Dos computadoras distintas difieren en el tiempo de ejecución a lo sumo por una constante multiplicativa positiva.',
      bulletPoints: [
        'Principio de Invarianza: T1(n) <= c * T2(n); una máquina moderna no altera la forma de la curva ni la clase asintótica.',
        'Hardware vs Algoritmo: Una máquina 100 veces más rápida solo multiplica por una constante, pero no rescata un algoritmo exponencial.',
        'Abstracción asintótica: Interesa cómo escala el tiempo T(n) cuando n tiende a infinito, despreciando constantes y factores menores.',
        'Unidad de medida: Es el recuento de operaciones elementales ejecutadas, nunca segundos o milisegundos de reloj.',
      ],
      formulas: [
        {
          label: 'Invarianza Temporal',
          latex: 'T_1(n) \\leq c \\cdot T_2(n) \\quad \\forall n \\geq n_0',
          description: 'La tasa asintótica trasciende la velocidad del microprocesador.',
        },
      ],
      keyInsight:
        'La eficiencia algorítmica es una propiedad matemática intrínseca del método, no del procesador donde corre.',
    },
  },

  {
    id: 'm1-operaciones-elementales-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Reglas para el Conteo de Operaciones Elementales',
    conceptSubtitle: 'Mecanismos de Sumatoria y Acotación en Código Imperativo',
    badgeLabel: '2. Reglas Operativas',
    slideKind: 'theory',
    partIndex: 2,
    totalParts: 2,
    theoryData: {
      summary:
        'Una Operación Elemental (OE) es aquella cuyo tiempo de cómputo está acotado superiormente por una constante fija.',
      bulletPoints: [
        'Operaciones básicas: Asignaciones, comparaciones y operaciones aritméticas insumen O(1) operaciones elementales.',
        'Secuencia (Regla de la Suma): T(S1; S2) = T(S1) + T(S2) = max(O(T1), O(T2)).',
        'Bucles For/While (Regla del Producto): Iteraciones multiplicadas por el costo del cuerpo interno.',
        'Condicionales If-Then-Else: En el peor caso se toma el máximo entre la rama positiva y la rama negativa.',
      ],
      formulas: [
        {
          label: 'Regla del Máximo',
          latex: 'O(f(n) + g(n)) = O(\\max(f(n), g(n)))',
          description: 'El término dominante absorbe a los términos de orden inferior.',
        },
      ],
      keyInsight:
        'En análisis de algoritmos, identificar el bucle más profundo define el orden de crecimiento dominante.',
    },
  },

  {
    id: 'm1-busqueda-lineal-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Tipos de Análisis: Mejor Caso, Peor Caso y Caso Promedio',
    conceptSubtitle: 'Escenarios Asintóticos · Caso Testigo: Búsqueda Lineal',
    badgeLabel: '1. Teoría de Escenarios',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 4,
    theoryData: {
      summary:
        'El tiempo de ejecución no solo depende del tamaño n, sino de la distribución de los datos de entrada en cada instancia.',
      bulletPoints: [
        'Mejor caso: Configuración de entrada más favorable posible. En Búsqueda Lineal, el elemento está en la posición 0: O(1).',
        'Peor caso: Configuración más desfavorable; provee una garantía absoluta de que el algoritmo nunca tardará más: O(n).',
        'Caso promedio: Esperanza matemática asumiendo una distribución uniforme de probabilidad sobre las entradas: O(n).',
        'Criterio de la cátedra: Todo análisis de eficiencia se realiza sobre el PEOR CASO salvo aclaración explícita.',
      ],
      keyInsight:
        'El peor caso garantiza un límite superior determinístico indispensable en sistemas de misión crítica.',
    },
  },

  {
    id: 'm1-busqueda-lineal-pseudo',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Búsqueda Lineal: Pseudocódigo',
    conceptSubtitle: 'Escaneo Secuencial en Arreglos Desordenados',
    badgeLabel: '2. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 2,
    totalParts: 4,
    codeSnippet: {
      title: 'Buscar(T, x)',
      snippets: {
        pseudocode:
          'algoritmo Buscar(T : array[0..n-1] de Enteros, x : Entero) -> Entero\n    i <- 0\n    mientras (i < n y T[i] != x) hacer\n        i <- i + 1\n    fin mientras\n    si (i < n) entonces\n        devolver i\n    sino\n        devolver -1\n    fin si\nfin algoritmo',
        java:
          'public static int buscar(int[] T, int x) {\n    int i = 0;\n    while (i < T.length && T[i] != x) {\n        i++;\n    }\n    if (i < T.length) {\n        return i;\n    } else {\n        return -1;\n    }\n}',
        python:
          'def buscar(T: list[int], x: int) -> int:\n    i = 0\n    while i < len(T) and T[i] != x:\n        i += 1\n    return i if i < len(T) else -1',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: LINEAR_SEARCH_COMPLEXITY_DATA,
  },

  {
    id: 'm1-busqueda-lineal-code',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Búsqueda Lineal: Implementación Java',
    conceptSubtitle: 'Bucle de Escaneo Secuencial con Retorno Centinela',
    badgeLabel: '3. Código Fuente',
    slideKind: 'code',
    partIndex: 3,
    totalParts: 4,
    codeSnippet: {
      title: 'LinearSearch.java',
      snippets: {
        pseudocode:
          'algoritmo Buscar(T : array[0..n-1] de Enteros, x : Entero) -> Entero\n    i <- 0\n    mientras (i < n y T[i] != x) hacer\n        i <- i + 1\n    fin mientras\n    si (i < n) entonces\n        devolver i\n    sino\n        devolver -1\n    fin si\nfin algoritmo',
        java:
          'public static int buscar(int[] T, int x) {\n    int i = 0;\n    while (i < T.length && T[i] != x) {\n        i++;\n    }\n    if (i < T.length) {\n        return i;\n    } else {\n        return -1;\n    }\n}',
        python:
          'def buscar(T: list[int], x: int) -> int:\n    i = 0\n    while i < len(T) and T[i] != x:\n        i += 1\n    return i if i < len(T) else -1',
      },
      preferredLanguage: 'java',
    },
    complexityData: LINEAR_SEARCH_COMPLEXITY_DATA,
  },

  {
    id: 'm1-busqueda-lineal-complexity',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Búsqueda Lineal: Análisis de Complejidad por Bloques',
    conceptSubtitle: 'Resaltado en Amarillo de Inicialización, Bucle y Condicional',
    badgeLabel: '4. Complejidad con Recuadros Asintóticos',
    slideKind: 'complexity',
    partIndex: 4,
    totalParts: 4,
    codeSnippet: {
      title: 'LinearSearch.java',
      snippets: {
        pseudocode:
          'algoritmo Buscar(T : array[0..n-1] de Enteros, x : Entero) -> Entero\n    i <- 0\n    mientras (i < n y T[i] != x) hacer\n        i <- i + 1\n    fin mientras\n    si (i < n) entonces\n        devolver i\n    sino\n        devolver -1\n    fin si\nfin algoritmo',
        java:
          'public static int buscar(int[] T, int x) {\n    int i = 0;\n    while (i < T.length && T[i] != x) {\n        i++;\n    }\n    if (i < T.length) {\n        return i;\n    } else {\n        return -1;\n    }\n}',
        python:
          'def buscar(T: list[int], x: int) -> int:\n    i = 0\n    while i < len(T) and T[i] != x:\n        i += 1\n    return i if i < len(T) else -1',
      },
      preferredLanguage: 'java',
    },
    complexityData: LINEAR_SEARCH_COMPLEXITY_DATA,
  },

  {
    id: 'm1-recursion-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Propiedades Esenciales de la Recursión y Pila de Llamadas',
    conceptSubtitle: 'Caso Base, Reducción de Instancia y Call Stack Depth',
    badgeLabel: '1. Fundamentos Recursivos',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 5,
    theoryData: {
      summary:
        'Un algoritmo recursivo se define en términos de sí mismo sobre una instancia estrictamente menor.',
      bulletPoints: [
        'Caso base (condición de corte): Resuelve la instancia mínima de forma directa y no recursiva en O(1).',
        'Paso inductivo (progreso): La llamada recursiva debe converger inexorablemente hacia el caso base reduciendo la entrada.',
        'Pila de llamadas (Call Stack): Cada invocación apila un marco de activación con variables locales y dirección de retorno.',
        'Costo espacial auxiliar: La profundidad máxima del árbol de recursión determina el espacio en memoria O(profundidad).',
      ],
      formulas: [
        {
          label: 'Profundidad de Pila',
          latex: 'S(n) = \\text{profundidad máxima de recursión} = O(n)',
          description: 'Espacio ocupado por los marcos de activación en el stack.',
        },
      ],
      keyInsight:
        'La ausencia de caso base o una reducción incorrecta conduce a recursión infinita y StackOverflowError.',
    },
  },

  {
    id: 'm1-factorial-visual',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Pila de Ejecución Recursiva: Factorial(4)',
    conceptSubtitle: 'Apilado y Desapilado de Marcos de Activación',
    badgeLabel: '2. Animación Interactiva',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 5,
    visualizerId: 'factorial-call-stack',
  },

  {
    id: 'm1-factorial-pseudo',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Factorial Recursivo: Pseudocódigo',
    conceptSubtitle: 'Reducción por Sustracción Fija n - 1',
    badgeLabel: '3. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 3,
    totalParts: 5,
    codeSnippet: {
      title: 'Factorial(n)',
      snippets: {
        pseudocode:
          'algoritmo Factorial(n : Entero) -> Entero\n    si (n == 0 o n == 1) entonces\n        devolver 1\n    sino\n        devolver n * Factorial(n - 1)\n    fin si\nfin algoritmo',
        java:
          'public static int factorial(int n) {\n    if (n == 0 || n == 1) {\n        return 1;\n    } else {\n        return n * factorial(n - 1);\n    }\n}',
        python:
          'def factorial(n: int) -> int:\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: FACTORIAL_COMPLEXITY_DATA,
  },

  {
    id: 'm1-factorial-code',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Factorial Recursivo: Implementación Java',
    conceptSubtitle: 'Estructura Condicional Base y Retorno Multiplicativo',
    badgeLabel: '4. Código Fuente',
    slideKind: 'code',
    partIndex: 4,
    totalParts: 5,
    codeSnippet: {
      title: 'FactorialSolver.java',
      snippets: {
        pseudocode:
          'algoritmo Factorial(n : Entero) -> Entero\n    si (n == 0 o n == 1) entonces\n        devolver 1\n    sino\n        devolver n * Factorial(n - 1)\n    fin si\nfin algoritmo',
        java:
          'public static int factorial(int n) {\n    if (n == 0 || n == 1) {\n        return 1;\n    } else {\n        return n * factorial(n - 1);\n    }\n}',
        python:
          'def factorial(n: int) -> int:\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)',
      },
      preferredLanguage: 'java',
    },
    complexityData: FACTORIAL_COMPLEXITY_DATA,
  },

  {
    id: 'm1-factorial-complexity',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Factorial Recursivo: Ecuación y Bloques de Código',
    conceptSubtitle: 'Recurrencia por Sustracción y Costo en Memoria Pila',
    badgeLabel: '5. Complejidad con Recuadros Asintóticos',
    slideKind: 'complexity',
    partIndex: 5,
    totalParts: 5,
    codeSnippet: {
      title: 'FactorialSolver.java',
      snippets: {
        pseudocode:
          'algoritmo Factorial(n : Entero) -> Entero\n    si (n == 0 o n == 1) entonces\n        devolver 1\n    sino\n        devolver n * Factorial(n - 1)\n    fin si\nfin algoritmo',
        java:
          'public static int factorial(int n) {\n    if (n == 0 || n == 1) {\n        return 1;\n    } else {\n        return n * factorial(n - 1);\n    }\n}',
        python:
          'def factorial(n: int) -> int:\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)',
      },
      preferredLanguage: 'java',
    },
    complexityData: FACTORIAL_COMPLEXITY_DATA,
  },

  {
    id: 'm1-binrec-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Búsqueda Binaria Recursiva (Reducción por División)',
    conceptSubtitle: 'Poda de la Mitad del Espacio de Búsqueda · T(n/2)',
    badgeLabel: '1. Principio de División',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 5,
    theoryData: {
      summary:
        'Aprovecha el orden previo del arreglo comparando x contra el elemento central T[mid].',
      bulletPoints: [
        'Condición previa obligatoria: El arreglo T debe estar ordenado monótonamente.',
        'Paso de comparación O(1): Si x == T[mid] terminamos; si x < T[mid] descartamos toda la mitad derecha.',
        'Reducción geométrica: El tamaño del problema pasa de n a n/2 en cada paso recursivo.',
        'Número máximo de divisiones: Resolver 2^k = n implica k = log2(n) pasos hasta el subproblema unitario.',
      ],
      formulas: [
        {
          label: 'Ecuación de Recurrencia',
          latex: 'T(n) = T(n/2) + O(1)',
          description: 'a=1 subproblema, factor b=2, costo de partición k=0 -> Theta(log n)',
        },
      ],
      keyInsight:
        'Dividir a la mitad y descartar la otra mitad convierte un costo lineal en logarítmico.',
    },
  },

  {
    id: 'm1-binrec-visual',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Búsqueda Binaria: Reducción Geométrica n/2',
    conceptSubtitle: 'Simulador Paso a Paso de Descarte de Mitades',
    badgeLabel: '2. Animación Interactiva',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 5,
    visualizerId: 'binary-search-reduction',
  },

  {
    id: 'm1-binrec-pseudo',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Búsqueda Binaria Recursiva: Pseudocódigo',
    conceptSubtitle: 'Rango [ini..fin] y Cálculo de Punto Medio',
    badgeLabel: '3. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 3,
    totalParts: 5,
    codeSnippet: {
      title: 'Binrec(T, ini, fin, x)',
      snippets: {
        pseudocode:
          'algoritmo Binrec(T : array de Enteros, ini, fin, x : Entero) -> Entero\n    si (ini > fin) entonces\n        devolver -1\n    fin si\n    mid <- (ini + fin) DIV 2\n    si (x == T[mid]) entonces\n        devolver mid\n    sino si (x < T[mid]) entonces\n        devolver Binrec(T, ini, mid - 1, x)\n    sino\n        devolver Binrec(T, mid + 1, fin, x)\n    fin si\nfin algoritmo',
        java:
          'public static int binrec(int[] T, int ini, int fin, int x) {\n    if (ini > fin) {\n        return -1;\n    }\n    int mid = (ini + fin) / 2;\n    if (x == T[mid]) {\n        return mid;\n    } else if (x < T[mid]) {\n        return binrec(T, ini, mid - 1, x);\n    } else {\n        return binrec(T, mid + 1, fin, x);\n    }\n}',
        python:
          'def binrec(T: list[int], ini: int, fin: int, x: int) -> int:\n    if ini > fin:\n        return -1\n    mid = (ini + fin) // 2\n    if x == T[mid]:\n        return mid\n    elif x < T[mid]:\n        return binrec(T, ini, mid - 1, x)\n    else:\n        return binrec(T, mid + 1, fin, x)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: BINARY_SEARCH_COMPLEXITY_DATA,
  },

  {
    id: 'm1-binrec-code',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Búsqueda Binaria Recursiva: Implementación Java',
    conceptSubtitle: 'Control de Índices y Llamadas a Mitad Superior o Inferior',
    badgeLabel: '4. Código Fuente',
    slideKind: 'code',
    partIndex: 4,
    totalParts: 5,
    codeSnippet: {
      title: 'BinarySearchRecursive.java',
      snippets: {
        pseudocode:
          'algoritmo Binrec(T : array de Enteros, ini, fin, x : Entero) -> Entero\n    si (ini > fin) entonces\n        devolver -1\n    fin si\n    mid <- (ini + fin) DIV 2\n    si (x == T[mid]) entonces\n        devolver mid\n    sino si (x < T[mid]) entonces\n        devolver Binrec(T, ini, mid - 1, x)\n    sino\n        devolver Binrec(T, mid + 1, fin, x)\n    fin si\nfin algoritmo',
        java:
          'public static int binrec(int[] T, int ini, int fin, int x) {\n    if (ini > fin) {\n        return -1;\n    }\n    int mid = (ini + fin) / 2;\n    if (x == T[mid]) {\n        return mid;\n    } else if (x < T[mid]) {\n        return binrec(T, ini, mid - 1, x);\n    } else {\n        return binrec(T, mid + 1, fin, x);\n    }\n}',
        python:
          'def binrec(T: list[int], ini: int, fin: int, x: int) -> int:\n    if ini > fin:\n        return -1\n    mid = (ini + fin) // 2\n    if x == T[mid]:\n        return mid\n    elif x < T[mid]:\n        return binrec(T, ini, mid - 1, x)\n    else:\n        return binrec(T, mid + 1, fin, x)',
      },
      preferredLanguage: 'java',
    },
    complexityData: BINARY_SEARCH_COMPLEXITY_DATA,
  },

  {
    id: 'm1-binrec-complexity',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Búsqueda Binaria: Ecuación y Bloques de Complejidad',
    conceptSubtitle: 'Resaltado de Casos Base, Cálculo de Mid y Mitades',
    badgeLabel: '5. Complejidad con Recuadros Asintóticos',
    slideKind: 'complexity',
    partIndex: 5,
    totalParts: 5,
    codeSnippet: {
      title: 'BinarySearchRecursive.java',
      snippets: {
        pseudocode:
          'algoritmo Binrec(T : array de Enteros, ini, fin, x : Entero) -> Entero\n    si (ini > fin) entonces\n        devolver -1\n    fin si\n    mid <- (ini + fin) DIV 2\n    si (x == T[mid]) entonces\n        devolver mid\n    sino si (x < T[mid]) entonces\n        devolver Binrec(T, ini, mid - 1, x)\n    sino\n        devolver Binrec(T, mid + 1, fin, x)\n    fin si\nfin algoritmo',
        java:
          'public static int binrec(int[] T, int ini, int fin, int x) {\n    if (ini > fin) {\n        return -1;\n    }\n    int mid = (ini + fin) / 2;\n    if (x == T[mid]) {\n        return mid;\n    } else if (x < T[mid]) {\n        return binrec(T, ini, mid - 1, x);\n    } else {\n        return binrec(T, mid + 1, fin, x);\n    }\n}',
        python:
          'def binrec(T: list[int], ini: int, fin: int, x: int) -> int:\n    if ini > fin:\n        return -1\n    mid = (ini + fin) // 2\n    if x == T[mid]:\n        return mid\n    elif x < T[mid]:\n        return binrec(T, ini, mid - 1, x)\n    else:\n        return binrec(T, mid + 1, fin, x)',
      },
      preferredLanguage: 'java',
    },
    complexityData: BINARY_SEARCH_COMPLEXITY_DATA,
  },

  {
    id: 'm1-notaciones-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Definiciones Matemáticas Formales: O, Omega y Theta',
    conceptSubtitle: 'Cota Superior, Cota Inferior y Cota Asintóticamente Ajustada',
    badgeLabel: '1. Formalismo Asintótico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 2,
    theoryData: {
      summary:
        'Las notaciones asintóticas acotan el comportamiento de una función f(n) para valores suficientemente grandes de n (n >= n0).',
      bulletPoints: [
        'Notación Big-O (Cota Superior): f(n) = O(g(n)) sss existen c > 0, n0 > 0 tales que f(n) <= c * g(n) para todo n >= n0.',
        'Notación Big-Omega (Cota Inferior): f(n) = Omega(g(n)) sss existen c > 0, n0 > 0 tales que f(n) >= c * g(n) para todo n >= n0.',
        'Notación Theta (Orden Exacto): f(n) = Theta(g(n)) sss f(n) = O(g(n)) y simultáneamente f(n) = Omega(g(n)).',
        'Condición de umbral n0: El comportamiento para n pequeños es irrelevante; lo que cuenta es la asíntota cuando n -> infinito.',
      ],
      formulas: [
        {
          label: 'Definición Cota Theta',
          latex: 'c_1 g(n) \\leq f(n) \\leq c_2 g(n) \\quad \\forall n \\geq n_0',
          description: 'f(n) está atrapada entre c1*g(n) y c2*g(n) a partir del umbral n0.',
        },
      ],
      keyInsight:
        'Theta(g(n)) representa el orden exacto de magnitud, eliminando constantes y términos no dominantes.',
    },
  },

  {
    id: 'm1-notaciones-bounds-visual',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Demostración Gráfica: f(n) = 3n^3 + 5n^2 + 7',
    conceptSubtitle: 'Acotamiento Asintótico con Cotas Superior, Inferior y Umbral n0',
    badgeLabel: '2. Demostración Interactiva',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 2,
    visualizerId: 'asymptotic-bounds',
  },

  {
    id: 'm1-familias-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Jerarquía de Familias de Crecimiento Asintótico',
    conceptSubtitle: 'Ordenamiento de Menor a Mayor Tasa de Crecimiento',
    badgeLabel: '1. Escalas de Eficiencia',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 2,
    theoryData: {
      summary:
        'Clasificación canónica de órdenes de complejidad desde lo óptimo e instantáneo hasta lo intratable e incomputable.',
      bulletPoints: [
        'O(1) Constante < O(log n) Logarítmico: Crecen de forma casi imperceptible; escala masiva sin impacto de hardware.',
        'O(n) Lineal < O(n log n) Cuasilineal: Límite óptimo para ordenamiento comparativo (MergeSort, HeapSort).',
        'O(n^2) Cuadrático < O(n^3) Cúbico: Algoritmos polinomiales para instancias moderadas.',
        'O(2^n) Exponencial < O(n!) Factorial: Barrera de intratabilidad; se vuelven inejecutables para n > 40.',
      ],
      formulas: [
        {
          label: 'Cadena de Dominancia',
          latex: 'O(1) < O(\\log n) < O(n) < O(n \\log n) < O(n^2) < O(2^n) < O(n!)',
          description: 'Jerarquía fundamental para el análisis de algoritmos.',
        },
      ],
      keyInsight:
        'Un algoritmo O(n!) para n=50 tardaría más que la edad estimada del universo en computar su salida.',
    },
  },

  {
    id: 'm1-familias-visual',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Simulador Comparativo de Familias de Crecimiento',
    conceptSubtitle: 'Exploración de Operaciones para Tamaños de Entrada n Variables',
    badgeLabel: '2. Visualizador de Curvas',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 2,
    visualizerId: 'growth-curves',
  },

  {
    id: 'm1-recurrencias-sustraccion-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Teorema de Recurrencias: Sustracción y División',
    conceptSubtitle: 'Reducción por Decremento Constante · Teorema de Sustracción',
    badgeLabel: '1. Método de Sustracción',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 2,
    theoryData: {
      summary:
        'Aplica a algoritmos recursivos donde el tamaño del subproblema disminuye en una constante fija b en cada paso: T(n) = a*T(n-b) + O(n^k).',
      bulletPoints: [
        'Recurrencia por Sustracción: T(n) = a*T(n-b) + O(n^k). Decrecimiento aritmético; si a=1 lineal O(n), si a>1 exponencial O(a^(n/b)).',
        'Teorema Maestro (División): Partición en subproblemas reducidos geométricamente de tamaño n/b con costo de combinación O(n^k).',
        'Caso a < 1: Decrecimiento geométrico del esfuerzo global -> T(n) = Theta(n^k).',
        'Caso a > 1: Bifurcación con decremento fijo (ej. Torres de Hanoi: a=2, b=1) -> T(n) = Theta(n^k * a^(n/b)).',
      ],
      formulas: [
        {
          label: 'Forma General',
          latex: 'T(n) = a \\cdot T(n - b) + c \\cdot n^k',
          description: 'a=1, b=1, k=0 -> Theta(n); a=2, b=1, k=0 -> Theta(2^n)',
        },
      ],
      keyInsight:
        'Disminuir de a una unidad (n - 1) bifurcando (a > 1) genera inexorablemente complejidad exponencial.',
    },
  },

  {
    id: 'm1-recurrencias-division-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Ecuaciones de Recurrencia: Método de División y Teorema Maestro',
    conceptSubtitle: 'Partición en Subproblemas de Tamaño n / b · Teorema Maestro',
    badgeLabel: '2. Método de División',
    slideKind: 'theory',
    partIndex: 2,
    totalParts: 2,
    theoryData: {
      summary:
        'Aplica a algoritmos donde el tamaño del subproblema se divide por una constante b > 1: T(n) = a*T(n/b) + O(n^k).',
      bulletPoints: [
        'Comparación crítica: Se compara el número de llamadas a contra la capacidad de reducción b^k.',
        'Caso a < b^k (Domina la combinación): El costo del nivel raíz absorbe todo el trabajo -> T(n) = Theta(n^k).',
        'Caso a = b^k (Equilibrio de niveles): Cada nivel del árbol insume el mismo trabajo -> T(n) = Theta(n^k * log n).',
        'Caso a > b^k (Dominan las hojas): La cantidad de subproblemas mínimos domina -> T(n) = Theta(n^(log_b a)).',
      ],
      formulas: [
        {
          label: 'Teorema Maestro',
          latex: 'T(n) = a \\cdot T(n/b) + c \\cdot n^k \\implies T(n) = \\begin{cases} \\Theta(n^k) & a < b^k \\\\ \\Theta(n^k \\log n) & a = b^k \\\\ \\Theta(n^{\\log_b a}) & a > b^k \\end{cases}',
          description: 'MergeSort: a=2, b=2, k=1 -> a = b^k -> Theta(n log n)',
        },
      ],
      keyInsight:
        'El Teorema Maestro resume analíticamente la suma de costos por nivel de todo el árbol de recursión.',
    },
  },

  {
    id: 'm1-tratabilidad-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Tratabilidad Computacional y Barrera Polinomial vs Exponencial',
    conceptSubtitle: 'Tesis de Cobham-Edmonds · Problemas Tratables e Intratables',
    badgeLabel: '1. Tratabilidad Formal',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 4,
    theoryData: {
      summary:
        'Un problema se define como tratable si existe un algoritmo determinístico que lo resuelva en tiempo polinomial O(n^k).',
      bulletPoints: [
        'Tesis de Cobham-Edmonds: La clase de funciones computables en tiempo polinomial captura formalmente la noción de resolubilidad eficiente.',
        'Problemas intratables: Requieren tiempo superpolinomial, exponencial O(2^n) o factorial O(n!) en el peor caso.',
        'La barrera del hardware: Duplicar la velocidad de la máquina ante un algoritmo 2^n solo permite resolver n + 1 elementos adicionales.',
        'Consecuencia práctica: Ante problemas intratables se recurre a Backtracking con poda, Branch & Bound o heurísticas aproximadas.',
      ],
      keyInsight:
        'El crecimiento exponencial supera cualquier avance en potencia de hardware que pueda construirse.',
    },
  },

  {
    id: 'm1-clases-p-np-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Estructura de las Clases P, NP, NP-Completo y NP-Hard',
    conceptSubtitle: 'Resolución Determinística vs Verificación Polinomial',
    badgeLabel: '2. Clases de Complejidad',
    slideKind: 'theory',
    partIndex: 2,
    totalParts: 4,
    theoryData: {
      summary:
        'Clasificación fundamental de la teoría de complejidad computacional y el problema del milenio P vs NP.',
      bulletPoints: [
        'Clase P: Problemas de decisión solubles en tiempo polinomial por una Máquina de Turing Determinística.',
        'Clase NP: Problemas de decisión cuyas soluciones propuestas pueden ser verificadas en tiempo polinomial.',
        'Clase NP-Completo (NPC): Los problemas más difíciles de NP; si uno solo tuviera algoritmo polinomial, P = NP.',
        'Clase NP-Hard: Problemas al menos tan difíciles como los de NP, sin el requisito de pertenecer a NP.',
      ],
      formulas: [
        {
          label: 'Inclusión Fundamental',
          latex: 'P \\subseteq NP \\quad (\\text{Conjetura universal: } P \\neq NP)',
          description: 'Verificar una solución armada es más fácil que encontrarla desde cero.',
        },
      ],
      keyInsight:
        'Demostrar que un problema es NP-Completo justifica formalmente utilizar búsqueda con poda en lugar de buscar un algoritmo voraz perfecto.',
    },
  },

  {
    id: 'asymptotic-comparison-example-theory',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Verificación Polinómica de Certificado (NP) vs Fuerza Bruta',
    conceptSubtitle: 'Problema de la Suma de Subconjuntos · Demostración en NP',
    badgeLabel: '3. Verificación Polinómica',
    slideKind: 'theory',
    partIndex: 3,
    totalParts: 4,
    theoryData: {
      summary:
        'Verificar si un certificado candidato suma el objetivo S toma tiempo lineal O(n). En contraste, hallar la solución explorando todos los subconjuntos toma tiempo exponencial O(2^n).',
      bulletPoints: [
        'Certificado booleano: Máscara binaria candidato[1..n] que indica qué elementos forman la presunta solución.',
        'Verificación en una sola pasada: Acumular los elementos seleccionados insume exactamente n operaciones O(n).',
        'Contraste con la resolución: Generar los 2^n subconjuntos posibles por fuerza bruta resulta intratable O(2^n).',
        'Pertenencia a NP: La existencia de este verificador polinomial demuestra formalmente que Suma de Subconjunto pertenece a la clase NP.',
      ],
      formulas: [
        {
          label: 'Verificación vs Búsqueda',
          latex: 'T_{\\text{verif}}(n) = O(n) \\quad \\text{vs} \\quad T_{\\text{búsqueda}}(n) = O(2^n)',
          description: 'Verificar es exponencialmente más rápido que generar.',
        },
      ],
      keyInsight:
        'La clase NP agrupa a los problemas cuya solución puede ser verificada eficientemente en tiempo polinómico.',
    },
  },

  {
    id: 'm1-clases-p-np-visual',
    moduleId: 'module-1-complexity',
    moduleTitle: MODULE_1_TITLE,
    conceptTitle: 'Diagrama de Conjuntos de Euler: Relación P, NP, NPC y NP-Hard',
    conceptSubtitle: 'Topología de Tratabilidad bajo la Hipótesis P != NP vs P = NP',
    badgeLabel: '4. Diagrama Interactivo',
    slideKind: 'visualizer',
    partIndex: 4,
    totalParts: 4,
    visualizerId: 'complexity-classes',
  },
];

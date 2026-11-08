import { ConceptSlide } from '../../core/domain/coreTypes';

const MODULE_2_TITLE = 'Divide & Conquer y Subtract & Conquer';

const PARADIGMA_DYC_COMPLEXITY_DATA = {
  temporalLatex: 'T(n) = a \\cdot T(n/b) + f(n)',
  spatialLatex: 'O(\\log_b n) \\text{ stack}',
  bestCaseLatex: 'O(1)',
  averageCaseLatex: 'T(n)',
  worstCaseLatex: 'T(n)',
  theoremApplied: 'Teorema Maestro según relación entre a y b^k',
  justification:
    'El esquema genérico descompone el problema en a subproblemas de dimensión n/b y combina las respuestas parciales en f(n).',
  annotations: [],
};

const SUMA_ABB_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n)',
  spatialLatex: 'O(h) \\text{ stack, con } h \\in [\\log n, n]',
  bestCaseLatex: '\\Theta(n)',
  averageCaseLatex: '\\Theta(n)',
  worstCaseLatex: '\\Theta(n)',
  theoremApplied: 'T(n) = 2T(n/2) + c \\implies a=2, b=2, k=0 \\implies a > b^k \\implies \\Theta(n)',
  justification:
    'Se visitan obligatoriamente todos los nodos del árbol binario una sola vez realizando sumas en tiempo constante.',
  annotations: [],
};

const POTENCIA_OPTIMIZADA_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(\\log n)',
  spatialLatex: 'O(\\log n) \\text{ stack}',
  bestCaseLatex: 'O(1)',
  averageCaseLatex: '\\Theta(\\log n)',
  worstCaseLatex: '\\Theta(\\log n)',
  theoremApplied: 'T(n) = 1 \\cdot T(n/2) + c \\implies a=1, b=2, k=0 \\implies a = b^k \\implies \\Theta(\\log n)',
  justification:
    'Almacenar el resultado de la llamada recursiva n/2 y elevarlo al cuadrado reduce la ramificación a a=1, logrando costo logarítmico.',
  annotations: [],
};

const BUSQUEDA_BINARIA_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(\\log n)',
  spatialLatex: 'O(\\log n) \\text{ recursivo} / O(1) \\text{ iterativo}',
  bestCaseLatex: 'O(1)',
  averageCaseLatex: '\\Theta(\\log n)',
  worstCaseLatex: '\\Theta(\\log n)',
  theoremApplied: 'T(n) = 1 \\cdot T(n/2) + c \\implies a=1, b=2, k=0 \\implies \\Theta(\\log n)',
  justification:
    'La monotonía del vector permite descartar la mitad del espacio de búsqueda en cada paso sin trabajo de recombinación, reduciendo n a 1 en log2(n) comparaciones.',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 5,
      endLine: 8,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 9,
      endLine: 13,
      asymptoticCost: 'T(n/2)',
    },
  ],
};

const MERGESORT_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n \\log n)',
  spatialLatex: 'O(n) \\text{ buffer aux} + O(\\log n) \\text{ stack}',
  bestCaseLatex: '\\Theta(n \\log n)',
  averageCaseLatex: '\\Theta(n \\log n)',
  worstCaseLatex: '\\Theta(n \\log n)',
  theoremApplied: 'T(n) = 2T(n/2) + \\Theta(n) \\implies a=2, b=2, k=1 \\implies a = b^k \\implies \\Theta(n \\log n)',
  justification:
    'El árbol de llamadas posee log2(n) niveles y en cada nivel la fase de mezcla procesa los n elementos mediante dos punteros en tiempo lineal estricto Theta(n).',
  annotations: [
    {
      startLine: 2,
      endLine: 3,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 4,
      endLine: 4,
      asymptoticCost: 'T(n/2)',
    },
    {
      startLine: 5,
      endLine: 5,
      asymptoticCost: 'T(n/2)',
    },
    {
      startLine: 6,
      endLine: 6,
      asymptoticCost: '\\Theta(n)',
    },
    {
      startLine: 11,
      endLine: 13,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 14,
      endLine: 20,
      asymptoticCost: '\\Theta(n)',
    },
    {
      startLine: 21,
      endLine: 21,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 22,
      endLine: 22,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 23,
      endLine: 23,
      asymptoticCost: '\\Theta(n)',
    },
  ],
};

const QUICKSORT_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n \\log n) \\text{ promedio} / O(n^2) \\text{ peor}',
  spatialLatex: 'O(\\log n) \\text{ promedio} / O(n) \\text{ peor stack}',
  bestCaseLatex: '\\Theta(n \\log n)',
  averageCaseLatex: '\\Theta(n \\log n)',
  worstCaseLatex: 'O(n^2)',
  theoremApplied: 'T_{prom}(n) = 2T(n/2) + \\Theta(n); \\quad T_{peor}(n) = T(n-1) + \\Theta(n)',
  justification:
    'La partición de Hoare sitúa el pivote en tiempo lineal in-place. Con pivotes centrados la profundidad es logarítmica; con pivotes en extremos se degrada a cuadrático.',
  annotations: [
    {
      startLine: 2,
      endLine: 2,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 3,
      endLine: 3,
      asymptoticCost: '\\Theta(n)',
    },
    {
      startLine: 4,
      endLine: 4,
      asymptoticCost: 'T(p - ini)',
    },
    {
      startLine: 5,
      endLine: 5,
      asymptoticCost: 'T(fin - p)',
    },
    {
      startLine: 10,
      endLine: 12,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 13,
      endLine: 23,
      asymptoticCost: '\\Theta(n)',
    },
    {
      startLine: 24,
      endLine: 27,
      asymptoticCost: 'O(1)',
    },
  ],
};

const PSEUDO_M_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n)',
  spatialLatex: 'O(\\log n) \\text{ stack}',
  bestCaseLatex: '\\Theta(n)',
  averageCaseLatex: '\\Theta(n)',
  worstCaseLatex: '\\Theta(n)',
  theoremApplied: 'T(n) = 2T(n/2) + c \\implies a=2, b=2, k=0 \\implies a > b^k \\implies \\Theta(n)',
  justification:
    'La obtención del candidato con Pseudo-M insume Theta(n) y la posterior verificación de ocurrencias insume una pasada lineal de Theta(n), totalizando tiempo lineal estricto.',
  annotations: [
    {
      startLine: 9,
      endLine: 9,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 11,
      endLine: 11,
      asymptoticCost: 'T(n/2)',
    },
    {
      startLine: 12,
      endLine: 12,
      asymptoticCost: 'T(n/2)',
    },
    {
      startLine: 14,
      endLine: 23,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 27,
      endLine: 29,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 31,
      endLine: 31,
      asymptoticCost: '\\Theta(n)',
    },
    {
      startLine: 32,
      endLine: 32,
      asymptoticCost: 'O(1)',
    },
  ],
};

const PSEUDO_M_SOLVER_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n)',
  spatialLatex: 'O(\\log n) \\text{ stack}',
  bestCaseLatex: '\\Theta(n)',
  averageCaseLatex: '\\Theta(n)',
  worstCaseLatex: '\\Theta(n)',
  theoremApplied: 'T(n) = 2T(n/2) + c \\implies a=2, b=2, k=0 \\implies a > b^k \\implies \\Theta(n)',
  justification:
    'La rutina recursiva divide el arreglo en dos mitades y resuelve el conflicto entre tuplas en tiempo O(1) mediante comparaciones fijas, resultando en tiempo lineal.',
  annotations: [
    {
      startLine: 9,
      endLine: 9,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 11,
      endLine: 11,
      asymptoticCost: 'T(n/2)',
    },
    {
      startLine: 12,
      endLine: 12,
      asymptoticCost: 'T(n/2)',
    },
    {
      startLine: 14,
      endLine: 23,
      asymptoticCost: 'O(1)',
    },
  ],
};

const PSEUDO_M_VERIF_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n)',
  spatialLatex: 'O(1) \\text{ adicional}',
  bestCaseLatex: '\\Theta(n)',
  averageCaseLatex: '\\Theta(n)',
  worstCaseLatex: '\\Theta(n)',
  theoremApplied: 'T_{\\text{total}}(n) = T_{\\text{Pseudo-M}}(n) + T_{\\text{verif}}(n) = \\Theta(n) + \\Theta(n) = \\Theta(n)',
  justification:
    'El candidato generado por Pseudo-M se somete a una pasada de conteo secuencial sobre los n elementos. Ambas fases insumen tiempo lineal, preservando la cota Theta(n).',
  annotations: [
    {
      startLine: 2,
      endLine: 2,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 3,
      endLine: 3,
      asymptoticCost: 'T_{\\text{cand}}(n) = \\Theta(n)',
    },
    {
      startLine: 4,
      endLine: 5,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 6,
      endLine: 8,
      asymptoticCost: '\\Theta(n)',
    },
    {
      startLine: 9,
      endLine: 9,
      asymptoticCost: 'O(1)',
    },
  ],
};

const BRIDGE_FIXTURE_METHOD_COMPLEXITY_DATA = {
  temporalLatex: 'T(n) = 2T(n/2) + \\Theta(n^2)',
  spatialLatex: 'O(n^2) \\text{ matriz fixture} + O(\\log n) \\text{ stack}',
  bestCaseLatex: '\\Theta(n^2)',
  averageCaseLatex: '\\Theta(n^2)',
  worstCaseLatex: '\\Theta(n^2)',
  theoremApplied: 'T(n) = 2T(n/2) + \\Theta(n^2) \\implies a=2, b=2, k=2',
  justification:
    'El método fixture realiza 2 llamadas recursivas para subinstancias de n/2 parejas e invoca la rutina de recombinación CompletarT de costo cuadrático.',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 6,
      endLine: 6,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 7,
      endLine: 7,
      asymptoticCost: 'T(n/2)',
    },
    {
      startLine: 8,
      endLine: 8,
      asymptoticCost: 'T(n/2)',
    },
    {
      startLine: 9,
      endLine: 9,
      asymptoticCost: '\\Theta(n^2)',
    },
  ],
};

const BRIDGE_COMPLETART_METHOD_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n^2)',
  spatialLatex: 'O(1) \\text{ memoria auxiliar}',
  bestCaseLatex: '\\Theta(n^2)',
  averageCaseLatex: '\\Theta(n^2)',
  worstCaseLatex: '\\Theta(n^2)',
  theoremApplied: 'a < b^k \\iff 2 < 2^2 = 4 \\implies T(n) = \\Theta(n^2)',
  justification:
    'Dos ciclos for anidados de dimensión m x m = (n/2)^2 = n^2/4 asignan directamente los cruces rotativos, dominando la recurrencia.',
  annotations: [
    {
      startLine: 2,
      endLine: 6,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 7,
      endLine: 10,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 11,
      endLine: 21,
      asymptoticCost: '\\Theta(n^2)',
    },
  ],
};

const BRIDGE_FIXTURE_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n^2)',
  spatialLatex: 'O(n^2) \\text{ matriz de fixture}',
  bestCaseLatex: '\\Theta(n^2)',
  averageCaseLatex: '\\Theta(n^2)',
  worstCaseLatex: '\\Theta(n^2)',
  theoremApplied: 'T(n) = 2T(n/2) + \\Theta(n^2) \\implies a=2, b=2, k=2 \\implies a < b^k \\implies \\Theta(n^2)',
  justification:
    'El costo de la recombinación en CompletarT requiere poblar las celdas cruzadas de la matriz n x (n-1), dominando cuadráticamente la recurrencia.',
  annotations: [
    {
      startLine: 2,
      endLine: 5,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 7,
      endLine: 8,
      asymptoticCost: '2T(n/2)',
    },
    {
      startLine: 9,
      endLine: 9,
      asymptoticCost: '\\Theta(n^2)',
    },
    {
      startLine: 18,
      endLine: 21,
      asymptoticCost: 'O(n)',
    },
    {
      startLine: 22,
      endLine: 32,
      asymptoticCost: '\\Theta(n^2)',
    },
  ],
};

const MPS_SUBARRAY_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n \\log n)',
  spatialLatex: 'O(\\log n) \\text{ stack}',
  bestCaseLatex: '\\Theta(n \\log n)',
  averageCaseLatex: '\\Theta(n \\log n)',
  worstCaseLatex: '\\Theta(n \\log n)',
  theoremApplied: 'T(n) = 2T(n/2) + \\Theta(n) \\implies a=2, b=2, k=1 \\implies a = b^k \\implies \\Theta(n \\log n)',
  justification:
    'Los dos subarreglos disjuntos se resuelven en 2T(n/2) y el caso de cruce central se determina mediante los barridos lineales de LMPS y RMPS en Theta(n).',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 6,
      endLine: 6,
      asymptoticCost: 'T(n/2)',
    },
    {
      startLine: 7,
      endLine: 7,
      asymptoticCost: 'T(n/2)',
    },
    {
      startLine: 9,
      endLine: 13,
      asymptoticCost: '\\Theta(n)',
    },
    {
      startLine: 15,
      endLine: 19,
      asymptoticCost: '\\Theta(n)',
    },
    {
      startLine: 21,
      endLine: 22,
      asymptoticCost: 'O(1)',
    },
  ],
};

const STRASSEN_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(n^{\\log_2 7}) \\approx O(n^{2.807})',
  spatialLatex: 'O(n^2) \\text{ submatrices auxiliares}',
  bestCaseLatex: '\\Theta(n^{\\log_2 7})',
  averageCaseLatex: '\\Theta(n^{\\log_2 7})',
  worstCaseLatex: '\\Theta(n^{\\log_2 7})',
  theoremApplied: 'T(n) = 7T(n/2) + \\Theta(n^2) \\implies a=7, b=2, k=2 \\implies a > b^k \\implies \\Theta(n^{\\log_2 7})',
  justification:
    'Strassen reduce los productos matriciales de 8 a 7 a expensas de 18 adiciones cuadráticas, reduciendo el exponente asintótico de 3 a 2.807.',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 6,
      endLine: 12,
      asymptoticCost: '7T(n/2)',
    },
    {
      startLine: 14,
      endLine: 22,
      asymptoticCost: '\\Theta(n^2)',
    },
  ],
};

const PALINDROMOS_COMPLEXITY_DATA = {
  temporalLatex: 'O(n)',
  spatialLatex: 'O(n) \\text{ stack}',
  bestCaseLatex: 'O(1)',
  averageCaseLatex: 'O(n)',
  worstCaseLatex: 'O(n)',
  theoremApplied: 'T(n) = 1 \\cdot T(n - 2) + c \\implies a=1, b=2, k=0 \\implies \\Theta(n^{k+1}) = \\Theta(n)',
  justification:
    'Se decrementa el tamaño en 2 unidades por llamada recursiva. En el peor caso se realizan a lo sumo n/2 comparaciones de extremos.',
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
      endLine: 8,
      asymptoticCost: 'T(n - 2)',
    },
  ],
};

const HANOI_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(2^n)',
  spatialLatex: 'O(n) \\text{ stack}',
  bestCaseLatex: '\\Theta(2^n)',
  averageCaseLatex: '\\Theta(2^n)',
  worstCaseLatex: '\\Theta(2^n)',
  theoremApplied: 'T(n) = 2T(n - 1) + c \\implies a=2, b=1, k=0 \\implies a > 1 \\implies \\Theta(a^{n/b}) = \\Theta(2^n)',
  justification:
    'Trasladar n discos genera dos llamadas recursivas de tamaño n-1 y un movimiento elemental, requiriendo exactamente 2^n - 1 traslados de discos.',
  annotations: [
    {
      startLine: 2,
      endLine: 5,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 6,
      endLine: 6,
      asymptoticCost: 'T(n - 1)',
    },
    {
      startLine: 7,
      endLine: 7,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 8,
      endLine: 8,
      asymptoticCost: 'T(n - 1)',
    },
  ],
};

const FIBONACCI_COMPLEXITY_DATA = {
  temporalLatex: '\\Theta(\\phi^n) \\approx \\Theta(1.618^n) \\subset O(2^n)',
  spatialLatex: 'O(n) \\text{ stack}',
  bestCaseLatex: 'O(1)',
  averageCaseLatex: '\\Theta(\\phi^n)',
  worstCaseLatex: '\\Theta(\\phi^n)',
  theoremApplied: 'T(n) = T(n - 1) + T(n - 2) + c \\implies \\Theta(\\phi^n) \\quad \\text{con } \\phi = (1 + \\sqrt{5})/2 \\approx 1.618',
  justification:
    'La ausencia de memorización causa el recálculo exponencial de subproblemas compartidos en un árbol binario redundante de profundidad n.',
  annotations: [
    {
      startLine: 2,
      endLine: 4,
      asymptoticCost: 'O(1)',
    },
    {
      startLine: 5,
      endLine: 5,
      asymptoticCost: 'T(n - 1) + T(n - 2)',
    },
  ],
};

const MERGESORT_COMPLETE_JAVA_SNIPPET = `public static void mergeSort(int[] valores, int inicio, int fin) {
    if (inicio < fin) {
        int medio = inicio + (fin - inicio) / 2;
        mergeSort(valores, inicio, medio);
        mergeSort(valores, medio + 1, fin);
        merge(valores, inicio, medio, fin);
    }
}

private static void merge(int[] valores, int inicio, int medio, int fin) {
    int n = fin - inicio + 1;
    int[] aux = new int[n];
    int i = inicio, j = medio + 1, k = 0;
    while (i <= medio && j <= fin) {
        if (valores[i] <= valores[j]) {
            aux[k++] = valores[i++];
        } else {
            aux[k++] = valores[j++];
        }
    }
    while (i <= medio) aux[k++] = valores[i++];
    while (j <= fin) aux[k++] = valores[j++];
    for (k = 0; k < n; k++) valores[inicio + k] = aux[k];
}`;

const QUICKSORT_COMPLETE_JAVA_SNIPPET = `public static void quickSort(int[] valores, int inicio, int fin) {
    if (inicio < fin) {
        int p = particionar(valores, inicio, fin);
        quickSort(valores, inicio, p - 1);
        quickSort(valores, p + 1, fin);
    }
}

private static int particionar(int[] valores, int inicio, int fin) {
    int pivote = valores[inicio];
    int i = inicio + 1;
    int j = fin;
    while (true) {
        while (i <= fin && valores[i] <= pivote) i++;
        while (j >= inicio && valores[j] > pivote) j--;
        if (i < j) {
            int aux = valores[i]; valores[i] = valores[j]; valores[j] = aux;
        } else {
            break;
        }
    }
    int aux = valores[inicio]; valores[inicio] = valores[j]; valores[j] = aux;
    return j;
}`;

const PSEUDO_M_METHOD_JAVA_SNIPPET = `public static class Candidato {
    public boolean r; public int n, c, x;
    public Candidato(boolean r, int n, int c, int x) {
        this.r = r; this.n = n; this.c = c; this.x = x;
    }
}

public static Candidato pseudoM(int[] u, int i, int j) {
    if (i == j) return new Candidato(true, 1, 1, u[i]);
    int mid = i + (j - i) / 2;
    Candidato o1 = pseudoM(u, i, mid);
    Candidato o2 = pseudoM(u, mid + 1, j);
    int nTotal = o1.n + o2.n;
    if (!o1.r && !o2.r) return new Candidato(false, nTotal, 0, 0);
    if (o1.r && !o2.r) return new Candidato(true, nTotal, o1.c + o2.n / 2, o1.x);
    if (!o1.r && o2.r) return new Candidato(true, nTotal, o2.c + o1.n / 2, o2.x);
    if (o1.x == o2.x) return new Candidato(true, nTotal, o1.c + o2.c, o1.x);
    if (o1.c > o2.c) return new Candidato(true, nTotal, o1.c - o2.c, o1.x);
    if (o2.c > o1.c) return new Candidato(true, nTotal, o2.c - o1.c, o2.x);
    if (o1.n < o2.n) return new Candidato(true, nTotal, o1.c + o2.n / 2, o1.x);
    if (o2.n < o1.n) return new Candidato(true, nTotal, o2.c + o1.n / 2, o2.x);
    return new Candidato(false, nTotal, 0, 0);
}`;

const PSEUDO_M_VERIF_METHOD_JAVA_SNIPPET = `public static Integer elementoMayoritaro(int[] u) {
    if (u == null || u.length == 0) return null;
    Candidato cand = pseudoM(u, 0, u.length - 1);
    if (!cand.r) return null;
    int cuenta = 0;
    for (int num : u) {
        if (num == cand.x) cuenta++;
    }
    return (cuenta > u.length / 2) ? cand.x : null;
}`;

const PSEUDO_M_COMPACT_JAVA_SNIPPET = `${PSEUDO_M_METHOD_JAVA_SNIPPET}

${PSEUDO_M_VERIF_METHOD_JAVA_SNIPPET}`;

const BRIDGE_FIXTURE_METHOD_JAVA_SNIPPET = `public static void fixture(int[][] T, int first, int last) {
    if (first == last - 1) {
        T[first][0] = last + 1;
        T[last][0] = first + 1;
    } else {
        int mid = first + (last - first) / 2;
        fixture(T, first, mid);
        fixture(T, mid + 1, last);
        completarT(T, first, last);
    }
}`;

const BRIDGE_COMPLETART_METHOD_JAVA_SNIPPET = `private static void completarT(int[][] T, int first, int last) {
    int len = (last - first + 1) / 2;
    int firstAdversary = first + len + 1;
    int secondAdversary = first + 1;
    int firstDay = len - 1;
    int lastDay = firstDay + len;
    for (int j = firstDay; j < lastDay; j++) {
        T[first][j] = firstAdversary++;
        T[first + len][j] = secondAdversary++;
    }
    for (int i = first + 1; i <= first + len - 1; i++) {
        for (int j = firstDay; j < lastDay; j++) {
            if (j == firstDay) {
                T[i][j] = T[i - 1][lastDay - 1];
                T[i + len][j] = T[i + len - 1][lastDay - 1];
            } else {
                T[i][j] = T[i - 1][j - 1];
                T[i + len][j] = T[i + len - 1][j - 1];
            }
        }
    }
}`;

const BRIDGE_COMPLETE_JAVA_SNIPPET = `${BRIDGE_FIXTURE_METHOD_JAVA_SNIPPET}

${BRIDGE_COMPLETART_METHOD_JAVA_SNIPPET}`;

export const MODULE_2_COMPLETE_SLIDES: ConceptSlide[] = [
  {
    id: 'm2-apertura-quote',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Esquema General de Divide & Conquer: Deconstrucción Analítica',
    conceptSubtitle: 'Cita Disparadora y Epígrafe Inicial · René Descartes',
    badgeLabel: '1. Cita Disparadora',
    slideKind: 'quote',
    partIndex: 1,
    totalParts: 1,
    quoteData: {
      quote:
        'Dividir cada una de las dificultades bajo examen en tantas partes como sea posible y necesario para resolverlas mejor.',
      author: 'René Descartes',
      source: 'Discours de la méthode (1637)',
      pedagogicalContext:
        'Encuadre epistemológico e intuición formal sobre la deconstrucción analítica de problemas complejos en componentes ortogonales de menor dimensión.',
    },
  },

  {
    id: 'm2-paradigma-dyc-definicion-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Estructura del Paradigma y Principio de Deconstrucción',
    conceptSubtitle: 'Descomposición Recursiva · Casos Base · Combinación Ascendente',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 2,
    theoryData: {
      summary:
        'Descomposición recursiva de instancias de tamaño n en subproblemas idénticos más pequeños hasta casos base O(1), con recombinación ascendente de soluciones parciales.',
      bulletPoints: [
        'Descomposición simétrica: La instancia original se particiona en a subproblemas de dimensión n/b homogéneos entre sí y con el problema raíz.',
        'Caso base elemental: Se garantiza una condición de corte determinística donde instancias mínimas se resuelven en tiempo constante O(1).',
        'Independencia estricta: Los subproblemas son disjuntos en cálculo sin solapamiento de cómputo redundante ni efectos colaterales.',
        'Combinación ascendente: La recombinación de resultados parciales debe mantener una cota polinómica que preserve la ventaja asintótica.',
      ],
      formulas: [
        {
          label: 'Ecuación General de Recurrencia',
          latex: 'T(n) = a \\cdot T(n/b) + f(n)',
          description:
            'Donde a es el número de subproblemas, b el factor de reducción dimensional y f(n) el costo de división y combinación.',
        },
      ],
      keyInsight:
        'La ventaja asintótica de Divide & Conquer radica en que el costo de dividir y recombinar f(n) crezca más lento que la proliferación de hojas del árbol recursivo.',
    },
  },
  {
    id: 'm2-paradigma-dyc-definicion-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Estructura del Paradigma: Esquema Abstracto',
    conceptSubtitle: 'Pseudocódigo General de División, Conquista y Combinación',
    badgeLabel: '2. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 2,
    totalParts: 2,
    codeSnippet: {
      title: 'EsquemaDyC(x)',
      snippets: {
        pseudocode:
          'ALGORITMO D&C (x)\n    si CasoBase(x) entonces\n        devolver SolucionDirecta(x)\n    sino\n        <x_1, ..., x_a> <- descomponer(x)\n        para i <- 1 hasta a hacer\n            y_i <- D&C(x_i)\n        fin para\n        devolver combinar(y_1, ..., y_a)\n    fin si',
        java:
          'public abstract class EsquemaDyC<P, R> {\n    public abstract boolean esCasoBase(P problema);\n    public abstract R solucionDirecta(P problema);\n    public abstract P[] descomponer(P problema);\n    public abstract R combinar(R[] solucionesParciales);\n\n    public R resolver(P problema) {\n        if (esCasoBase(problema)) {\n            return solucionDirecta(problema);\n        }\n        P[] subproblemas = descomponer(problema);\n        @SuppressWarnings("unchecked")\n        R[] soluciones = (R[]) new Object[subproblemas.length];\n        for (int i = 0; i < subproblemas.length; i++) {\n            soluciones[i] = resolver(subproblemas[i]);\n        }\n        return combinar(soluciones);\n    }\n}',
        python:
          'class EsquemaDyC:\n    def resolver(self, problema):\n        if self.es_caso_base(problema):\n            return self.solucion_directa(problema)\n        subproblemas = self.descomponer(problema)\n        soluciones = [self.resolver(sub) for sub in subproblemas]\n        return self.combinar(soluciones)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: PARADIGMA_DYC_COMPLEXITY_DATA,
  },

  {
    id: 'm2-suma-nodos-abb-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Ejemplo Estructural: Suma de Nodos en un ABB',
    conceptSubtitle: 'Bifurcación Arbórea Natural · Caso Base Vacío · Recombinación Aditiva',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 2,
    theoryData: {
      summary:
        'El Árbol Binario de Búsqueda representa la manifestación geométrica natural del paradigma: un nodo raíz con dos subárboles disjuntos de idéntica estructura.',
      bulletPoints: [
        'Bifurcación estructural: La raíz delega recursivamente el cálculo en Suma(T.hijoIzq()) y Suma(T.hijoDer()) de forma disjunta.',
        'Caso base inmediato: Si el árbol está vacío se retorna 0 en tiempo estrictamente constante O(1).',
        'Combinación aditiva: Se integran las respuestas parciales de ambos subárboles sumándolas al valor numérico almacenado en la raíz.',
        'Equilibrio de ramas: En árboles balanceados cada subárbol contiene n/2 nodos, logrando una partición simétrica perfecta.',
      ],
      formulas: [
        {
          label: 'Recurrencia en Árbol Balanceado',
          latex: 'T(n) = 2T(n/2) + c \\implies \\Theta(n)',
          description:
            'Caso a=2, b=2, k=0 del Teorema Maestro (a > b^k). Se visitan obligatoriamente los n nodos del árbol.',
        },
      ],
      keyInsight:
        'Aun cuando la recursión divide geométricamente, si la recombinación o visita requiere inspeccionar cada elemento, la cota global no puede ser inferior a Omega(n).',
    },
  },
  {
    id: 'm2-suma-nodos-abb-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Suma de Nodos en un ABB: Pseudocódigo',
    conceptSubtitle: 'Descomposición en Subárbol Izquierdo y Derecho',
    badgeLabel: '2. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 2,
    totalParts: 2,
    codeSnippet: {
      title: 'Suma(ABB T)',
      snippets: {
        pseudocode:
          'ALGORITMO Suma (ABB T)\n    si T.arbolVacio() entonces\n        devolver 0\n    sino\n        devolver T.raiz() + Suma(T.hijoIzq()) + Suma(T.hijoDer())\n    fin si',
        java:
          'public static int sumaABB(ABB T) {\n    if (T == null || T.arbolVacio()) {\n        return 0;\n    }\n    return T.raiz() + sumaABB(T.hijoIzq()) + sumaABB(T.hijoDer());\n}',
        python:
          'def suma_abb(nodo):\n    if nodo is None:\n        return 0\n    return nodo.valor + suma_abb(nodo.izq) + suma_abb(nodo.der)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: SUMA_ABB_COMPLEXITY_DATA,
  },

  {
    id: 'm2-potencia-optimizada-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Cálculo de Potencias: Reducción de Ramificación',
    conceptSubtitle: 'Colapso de Árbol Exponencial a Cadena Logarítmica',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 2,
    theoryData: {
      summary:
        'Cálculo de a^n mediante descomposición binaria del exponente, evitando la proliferación de llamadas redundantes en el árbol de recursión.',
      bulletPoints: [
        'Ineficiencia por duplicación: Invocar Potencia(a, n/2) dos veces genera a=2, b=2, k=0 provocando una degradación a tiempo lineal Theta(n).',
        'Almacenamiento de resultado intermedio: Almacenar quad = Potencia(a, n/2) y calcular quad * quad reduce la ramificación a una única llamada a=1.',
        'Manejo de paridad: Si el exponente n es impar, se ajusta el producto final multiplicando una vez más por la base a.',
        'Profundidad de stack logarítmica: La cadena de llamadas recursivas desciende a razón de n/2 por nivel alcanzando el caso base en log2(n) pasos.',
      ],
      formulas: [
        {
          label: 'Recurrencia de Potencia Optimizada',
          latex: 'T(n) = 1 \\cdot T(n/2) + c \\implies \\Theta(\\log n)',
          description:
            'Caso a=1, b=2, k=0 del Teorema Maestro (a = b^k). Colapso a una única rama recursiva de profundidad logarítmica.',
        },
      ],
      keyInsight:
        'Guardar en una variable local el valor de un subproblema simétrico transforma una complejidad lineal en estrictamente logarítmica.',
    },
  },
  {
    id: 'm2-potencia-optimizada-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Cálculo de Potencias: Pseudocódigo',
    conceptSubtitle: 'Elevación al Cuadrado y Reutilización de Subproblema',
    badgeLabel: '2. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 2,
    totalParts: 2,
    codeSnippet: {
      title: 'Potencia_2(a, n)',
      snippets: {
        pseudocode:
          'ALGORITMO Potencia_2 (a: entero, n: entero)\n    si n == 2 entonces\n        devolver a * a\n    sino\n        quad <- Potencia_2(a, n / 2)\n        devolver quad * quad\n    fin si',
        java:
          'public static long potenciaOptimizada(long a, int n) {\n    if (n == 1) return a;\n    if (n == 2) return a * a;\n    long quad = potenciaOptimizada(a, n / 2);\n    long res = quad * quad;\n    if (n % 2 != 0) {\n        res *= a;\n    }\n    return res;\n}',
        python:
          'def potencia_optimizada(a: int, n: int) -> int:\n    if n == 1:\n        return a\n    if n == 2:\n        return a * a\n    quad = potencia_optimizada(a, n // 2)\n    res = quad * quad\n    if n % 2 != 0:\n        res *= a\n    return res',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: POTENCIA_OPTIMIZADA_COMPLEXITY_DATA,
  },

  {
    id: 'm2-busqueda-binaria-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Búsqueda Binaria',
    conceptSubtitle: 'Poda Geométrica en Arreglo Ordenado · Reducción por División',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 5,
    theoryData: {
      summary:
        'Localización de un elemento en un arreglo ordenado descartando la mitad del espacio de búsqueda en cada paso sin trabajo de recombinación.',
      bulletPoints: [
        'Precondición de monotonía: El arreglo debe estar ordenado previamente; sobre datos desordenados el paradigma no es aplicable.',
        'Pivote central de decisión: Se inspecciona S[mid] con mid = ini + (fin - ini) / 2 para prevenir desbordamientos aritméticos.',
        'Poda unidireccional: Si x < S[mid] se descarta la mitad derecha procesando [ini..mid-1]; si x > S[mid], la mitad izquierda [mid+1..fin].',
        'Recombinación nula: El hallazgo exitoso o la señal de ausencia -1 se propaga directamente sin cómputo de combinación.',
      ],
      formulas: [
        {
          label: 'Recurrencia Búsqueda Binaria',
          latex: 'T(n) = 1 \\cdot T(n/2) + c \\implies \\Theta(\\log n)',
          description:
            'a=1 subproblema, factor b=2, costo f(n)=O(1) -> a = b^k (1 = 2^0) -> Theta(log n).',
        },
      ],
      keyInsight:
        'Dividir el espacio de búsqueda a la mitad y descartar la otra mitad convierte una inspección lineal en estrictamente logarítmica.',
    },
  },
  {
    id: 'm2-busqueda-binaria-visual',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Búsqueda Binaria: Reducción Geométrica',
    conceptSubtitle: 'Simulador Paso a Paso de Descarte de Mitades',
    badgeLabel: '2. Animación Interactiva',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 5,
    visualizerId: 'binary-search-reduction',
  },
  {
    id: 'm2-busqueda-binaria-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Búsqueda Binaria: Pseudocódigo',
    conceptSubtitle: 'Control de Límites ini y fin con Descarte del Pivote',
    badgeLabel: '3. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 3,
    totalParts: 5,
    codeSnippet: {
      title: 'BUSQUEDABIN(S, ini, fin, x)',
      snippets: {
        pseudocode:
          'ALGORITMO BUSQUEDABIN (S: Vector<entero>, ini: entero, fin: entero, x: entero)\n    si ini > fin entonces\n        devolver -1\n    fin si\n    mid <- (ini + fin) / 2\n    si x == S[mid] entonces\n        devolver mid\n    sino si x < S[mid] entonces\n        devolver BUSQUEDABIN(S, ini, mid - 1, x)\n    sino\n        devolver BUSQUEDABIN(S, mid + 1, fin, x)\n    fin si',
        java:
          'public static int busquedaBinaria(int[] valores, int inicio, int fin, int valor) {\n    if (inicio > fin) {\n        return -1;\n    }\n    int mitad = inicio + (fin - inicio) / 2;\n    if (valores[mitad] == valor) {\n        return mitad;\n    } else if (valor < valores[mitad]) {\n        return busquedaBinaria(valores, inicio, mitad - 1, valor);\n    } else {\n        return busquedaBinaria(valores, mitad + 1, fin, valor);\n    }\n}',
        python:
          'def busqueda_binaria(valores: list[int], inicio: int, fin: int, valor: int) -> int:\n    if inicio > fin:\n        return -1\n    mitad = inicio + (fin - inicio) // 2\n    if valores[mitad] == valor:\n        return mitad\n    elif valor < valores[mitad]:\n        return busqueda_binaria(valores, inicio, mitad - 1, valor)\n    else:\n        return busqueda_binaria(valores, mitad + 1, fin, valor)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: BUSQUEDA_BINARIA_COMPLEXITY_DATA,
  },
  {
    id: 'm2-busqueda-binaria-code',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Búsqueda Binaria: Implementación Java',
    conceptSubtitle: 'Prevención de Overflow Aritmético en Índice Central',
    badgeLabel: '4. Código Fuente',
    slideKind: 'code',
    partIndex: 4,
    totalParts: 5,
    codeSnippet: {
      title: 'BinarySearchRecursive.java',
      snippets: {
        pseudocode:
          'ALGORITMO BUSQUEDABIN (S: Vector<entero>, ini: entero, fin: entero, x: entero)\n    si ini > fin entonces\n        devolver -1\n    fin si\n    mid <- (ini + fin) / 2\n    si x == S[mid] entonces\n        devolver mid\n    sino si x < S[mid] entonces\n        devolver BUSQUEDABIN(S, ini, mid - 1, x)\n    sino\n        devolver BUSQUEDABIN(S, mid + 1, fin, x)\n    fin si',
        java:
          'public static int busquedaBinaria(int[] valores, int inicio, int fin, int valor) {\n    if (inicio > fin) {\n        return -1;\n    }\n    int mitad = inicio + (fin - inicio) / 2;\n    if (valores[mitad] == valor) {\n        return mitad;\n    } else if (valor < valores[mitad]) {\n        return busquedaBinaria(valores, inicio, mitad - 1, valor);\n    } else {\n        return busquedaBinaria(valores, mitad + 1, fin, valor);\n    }\n}',
        python:
          'def busqueda_binaria(valores: list[int], inicio: int, fin: int, valor: int) -> int:\n    if inicio > fin:\n        return -1\n    mitad = inicio + (fin - inicio) // 2\n    if valores[mitad] == valor:\n        return mitad\n    elif valor < valores[mitad]:\n        return busqueda_binaria(valores, inicio, mitad - 1, valor)\n    else:\n        return busqueda_binaria(valores, mitad + 1, fin, valor)',
      },
      preferredLanguage: 'java',
    },
    complexityData: BUSQUEDA_BINARIA_COMPLEXITY_DATA,
  },
  {
    id: 'm2-busqueda-binaria-complexity',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Búsqueda Binaria: Análisis de Complejidad',
    conceptSubtitle: 'Comportamiento en Mejor, Peor Caso y Stack de Ejecución',
    badgeLabel: '5. Complejidad y Recurrencia',
    slideKind: 'complexity',
    partIndex: 5,
    totalParts: 5,
    codeSnippet: {
      title: 'BinarySearchRecursive.java',
      snippets: {
        pseudocode:
          'ALGORITMO BUSQUEDABIN (S: Vector<entero>, ini: entero, fin: entero, x: entero)\n    si ini > fin entonces\n        devolver -1\n    fin si\n    mid <- (ini + fin) / 2\n    si x == S[mid] entonces\n        devolver mid\n    sino si x < S[mid] entonces\n        devolver BUSQUEDABIN(S, ini, mid - 1, x)\n    sino\n        devolver BUSQUEDABIN(S, mid + 1, fin, x)\n    fin si',
        java:
          'public static int busquedaBinaria(int[] valores, int inicio, int fin, int valor) {\n    if (inicio > fin) {\n        return -1;\n    }\n    int mitad = inicio + (fin - inicio) / 2;\n    if (valores[mitad] == valor) {\n        return mitad;\n    } else if (valor < valores[mitad]) {\n        return busquedaBinaria(valores, inicio, mitad - 1, valor);\n    } else {\n        return busquedaBinaria(valores, mitad + 1, fin, valor);\n    }\n}',
        python:
          'def busqueda_binaria(valores: list[int], inicio: int, fin: int, valor: int) -> int:\n    if inicio > fin:\n        return -1\n    mitad = inicio + (fin - inicio) // 2\n    if valores[mitad] == valor:\n        return mitad\n    elif valor < valores[mitad]:\n        return busqueda_binaria(valores, inicio, mitad - 1, valor)\n    else:\n        return busqueda_binaria(valores, mitad + 1, fin, valor)',
      },
      preferredLanguage: 'java',
    },
    complexityData: BUSQUEDA_BINARIA_COMPLEXITY_DATA,
  },

  {
    id: 'm2-mergesort-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'MergeSort (Ordenamiento por Mezcla)',
    conceptSubtitle: 'División Balanceada n/2 · Combinación Lineal con Dos Punteros',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 5,
    theoryData: {
      summary:
        'Ordenamiento por mezcla que divide el arreglo en dos mitades simétricas y concentra todo el esfuerzo algorítmico en la combinación lineal de secuencias ordenadas.',
      bulletPoints: [
        'División trivial en tiempo constante: El arreglo se divide en [ini..mid] y [mid+1..fin] en tiempo O(1) calculando el punto medio.',
        'Conquista simétrica balanceada: Se ordenan recursivamente ambas mitades de tamaño exacto n/2 de manera completamente independiente.',
        'Combinación lineal Merge: El procedimiento de mezcla utiliza dos punteros recorriendo ambas mitades ordenadas en tiempo Theta(n).',
        'Insensibilidad al orden inicial: Su árbol de recursión posee siempre log2(n) niveles con trabajo n en cada nivel, garantizando Theta(n log n) en todo caso.',
      ],
      formulas: [
        {
          label: 'Recurrencia de MergeSort',
          latex: 'T(n) = 2T(n/2) + \\Theta(n) \\implies \\Theta(n \\log n)',
          description:
            'a=2 subproblemas, factor b=2, combinación f(n)=Theta(n) -> a = b^k (2 = 2^1) -> Caso 2 del Teorema Maestro.',
        },
      ],
      keyInsight:
        'MergeSort traslada toda la complejidad a la fase de combinación; dado que dos secuencias ordenadas se mezclan en tiempo lineal, la cota global es estrictamente Theta(n log n).',
    },
  },
  {
    id: 'm2-mergesort-visual',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'MergeSort: Árbol de División y Mezcla',
    conceptSubtitle: 'Simulador Interactivo de Partición y Recombinación',
    badgeLabel: '2. Animación Interactiva',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 5,
    visualizerId: 'mergesort-tree',
  },
  {
    id: 'm2-mergesort-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'MergeSort: Pseudocódigo',
    conceptSubtitle: 'Algoritmos MergeSort y Procedimiento Lineal Merge',
    badgeLabel: '3. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 3,
    totalParts: 5,
    codeSnippet: {
      title: 'MergeSort(S, ini, fin) & Merge(...)',
      snippets: {
        pseudocode:
          'ALGORITMO MergeSort (S: Vector<entero>, ini: entero, fin: entero)\n    si ini < fin entonces\n        mid <- (ini + fin) / 2\n        MergeSort(S, ini, mid)\n        MergeSort(S, mid + 1, fin)\n        Merge(S, ini, mid, fin)\n    fin si\n\nALGORITMO Merge (S: Vector<entero>, ini: entero, mid: entero, fin: entero)\n    R <- inicializarVector(fin - ini + 1)\n    i <- ini; j <- mid + 1; k <- 0\n    mientras i <= mid Y j <= fin hacer\n        si S[i] <= S[j] entonces\n            R[k++] <- S[i++]\n        sino\n            R[k++] <- S[j++]\n        fin si\n    fin mientras\n    mientras i <= mid hacer R[k++] <- S[i++] fin mientras\n    mientras j <= fin hacer R[k++] <- S[j++] fin mientras\n    para p <- 0 hasta fin - ini hacer\n        S[ini + p] <- R[p]\n    fin para',
        java: MERGESORT_COMPLETE_JAVA_SNIPPET,
        python:
          'def merge_sort(valores: list[int], inicio: int, fin: int) -> None:\n    if inicio < fin:\n        medio = inicio + (fin - inicio) // 2\n        merge_sort(valores, inicio, medio)\n        merge_sort(valores, medio + 1, fin)\n        merge(valores, inicio, medio, fin)\n\ndef merge(valores: list[int], inicio: int, medio: int, fin: int) -> None:\n    aux = []\n    i, j = inicio, medio + 1\n    while i <= medio and j <= fin:\n        if valores[i] <= valores[j]:\n            aux.append(valores[i])\n            i += 1\n        else:\n            aux.append(valores[j])\n            j += 1\n    aux.extend(valores[i:medio + 1])\n    aux.extend(valores[j:fin + 1])\n    valores[inicio:fin + 1] = aux',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: MERGESORT_COMPLEXITY_DATA,
  },
  {
    id: 'm2-mergesort-code',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'MergeSort: Implementación Java',
    conceptSubtitle: 'Gestión de Buffer Auxiliar y Copia In-Place',
    badgeLabel: '4. Código Fuente',
    slideKind: 'code',
    partIndex: 4,
    totalParts: 5,
    codeSnippet: {
      title: 'MergeSortSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO MergeSort (S: Vector<entero>, ini: entero, fin: entero)\n    si ini < fin entonces\n        mid <- (ini + fin) / 2\n        MergeSort(S, ini, mid)\n        MergeSort(S, mid + 1, fin)\n        Merge(S, ini, mid, fin)\n    fin si',
        java: MERGESORT_COMPLETE_JAVA_SNIPPET,
        python:
          'def merge_sort(valores: list[int], inicio: int, fin: int) -> None:\n    if inicio < fin:\n        medio = inicio + (fin - inicio) // 2\n        merge_sort(valores, inicio, medio)\n        merge_sort(valores, medio + 1, fin)\n        merge(valores, inicio, medio, fin)',
      },
      preferredLanguage: 'java',
    },
    complexityData: MERGESORT_COMPLEXITY_DATA,
  },
  {
    id: 'm2-mergesort-complexity',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'MergeSort: Análisis de Complejidad',
    conceptSubtitle: 'Ecuación de Recurrencia y Demostración por Teorema Maestro',
    badgeLabel: '5. Complejidad y Recurrencia',
    slideKind: 'complexity',
    partIndex: 5,
    totalParts: 5,
    codeSnippet: {
      title: 'MergeSortSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO MergeSort (S: Vector<entero>, ini: entero, fin: entero)\n    si ini < fin entonces\n        mid <- (ini + fin) / 2\n        MergeSort(S, ini, mid)\n        MergeSort(S, mid + 1, fin)\n        Merge(S, ini, mid, fin)\n    fin si',
        java: MERGESORT_COMPLETE_JAVA_SNIPPET,
        python:
          'def merge_sort(valores: list[int], inicio: int, fin: int) -> None:\n    if inicio < fin:\n        medio = inicio + (fin - inicio) // 2\n        merge_sort(valores, inicio, medio)\n        merge_sort(valores, medio + 1, fin)\n        merge(valores, inicio, medio, fin)',
      },
      preferredLanguage: 'java',
    },
    complexityData: MERGESORT_COMPLEXITY_DATA,
  },

  {
    id: 'm2-quicksort-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'QuickSort (Ordenamiento Rápido por Partición)',
    conceptSubtitle: 'Partición in-place de Hoare · Elección de Pivote · Recombinación Trivial',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 5,
    theoryData: {
      summary:
        'Ordenamiento in-place que reubica un elemento pivote en su posición definitiva y particiona los datos en menores y mayores, sin requerir recombinación posterior.',
      bulletPoints: [
        'Partición in-place de Hoare: Dos punteros convergen intercambiando elementos fuera de orden relativo respecto al pivote seleccionado.',
        'Ubicación definitiva del pivote: Al finalizar la partición, el pivote queda en su índice exacto y no vuelve a ser modificado ni evaluado.',
        'Recombinación nula: A diferencia de MergeSort, una vez ordenadas las dos subparticiones el arreglo global queda ordenado sin trabajo extra.',
        'Sensibilidad a la calidad del pivote: Si el pivote divide simétricamente se obtiene Theta(n log n); si divide en 0 y n-1 se degrada a Theta(n^2).',
      ],
      formulas: [
        {
          label: 'Recurrencias de QuickSort',
          latex:
            'T_{\\text{prom}}(n) = 2T(n/2) + \\Theta(n) \\implies \\Theta(n \\log n), \\quad T_{\\text{peor}}(n) = T(n-1) + \\Theta(n) \\implies \\Theta(n^2)',
          description:
            'El mejor caso y caso promedio son cuasilineales; el peor caso surge ante arreglos ya ordenados con selección de pivote en extremos.',
        },
      ],
      keyInsight:
        'QuickSort invierte la arquitectura de MergeSort: concentra todo el cómputo en la división mediante la partición lineal in-place, haciendo nula la fase de combinación.',
    },
  },
  {
    id: 'm2-quicksort-visual',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'QuickSort: Partición con Punteros y Pivote',
    conceptSubtitle: 'Simulador Interactivo de Cruce de Punteros de Hoare',
    badgeLabel: '2. Animación Interactiva',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 5,
    visualizerId: 'quicksort-partition',
  },
  {
    id: 'm2-quicksort-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'QuickSort: Pseudocódigo',
    conceptSubtitle: 'Algoritmos QuickSort y Subrutina de Partición Pivot',
    badgeLabel: '3. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 3,
    totalParts: 5,
    codeSnippet: {
      title: 'QuickSort(S, ini, fin) & Pivot(...)',
      snippets: {
        pseudocode:
          'ALGORITMO QuickSort (S: Vector<entero>, ini: entero, fin: entero)\n    si ini < fin entonces\n        p <- Pivot(S, ini, fin)\n        QuickSort(S, ini, p - 1)\n        QuickSort(S, p + 1, fin)\n    fin si\n\nALGORITMO Pivot (S: Vector<entero>, ini: entero, fin: entero)\n    p <- S[ini]\n    i <- ini + 1\n    j <- fin\n    repetir\n        mientras i <= fin Y S[i] <= p hacer i <- i + 1 fin mientras\n        mientras S[j] > p hacer j <- j - 1 fin mientras\n        si i < j entonces\n            swap(S[i], S[j])\n        fin si\n    hasta que i >= j\n    swap(S[ini], S[j])\n    devolver j',
        java: QUICKSORT_COMPLETE_JAVA_SNIPPET,
        python:
          'def quick_sort(valores: list[int], inicio: int, fin: int) -> None:\n    if inicio < fin:\n        p = particionar(valores, inicio, fin)\n        quick_sort(valores, inicio, p - 1)\n        quick_sort(valores, p + 1, fin)\n\ndef particionar(valores: list[int], inicio: int, fin: int) -> int:\n    pivote = valores[inicio]\n    i = inicio + 1\n    j = fin\n    while True:\n        while i <= fin and valores[i] <= pivote: i += 1\n        while j >= inicio and valores[j] > pivote: j -= 1\n        if i < j:\n            valores[i], valores[j] = valores[j], valores[i]\n        else:\n            break\n    valores[inicio], valores[j] = valores[j], valores[inicio]\n    return j',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: QUICKSORT_COMPLEXITY_DATA,
  },
  {
    id: 'm2-quicksort-code',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'QuickSort: Implementación Java',
    conceptSubtitle: 'Partición Robusta con Centinelas e Intercambio Seguro',
    badgeLabel: '4. Código Fuente',
    slideKind: 'code',
    partIndex: 4,
    totalParts: 5,
    codeSnippet: {
      title: 'QuickSortSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO QuickSort (S: Vector<entero>, ini: entero, fin: entero)\n    si ini < fin entonces\n        p <- Pivot(S, ini, fin)\n        QuickSort(S, ini, p - 1)\n        QuickSort(S, p + 1, fin)\n    fin si',
        java: QUICKSORT_COMPLETE_JAVA_SNIPPET,
        python:
          'def quick_sort(valores: list[int], inicio: int, fin: int) -> None:\n    if inicio < fin:\n        p = particionar(valores, inicio, fin)\n        quick_sort(valores, inicio, p - 1)\n        quick_sort(valores, p + 1, fin)',
      },
      preferredLanguage: 'java',
    },
    complexityData: QUICKSORT_COMPLEXITY_DATA,
  },
  {
    id: 'm2-quicksort-complexity',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'QuickSort: Análisis de Complejidad',
    conceptSubtitle: 'Caso Promedio Cuasilineal vs Peor Caso Cuadrático',
    badgeLabel: '5. Complejidad y Recurrencia',
    slideKind: 'complexity',
    partIndex: 5,
    totalParts: 5,
    codeSnippet: {
      title: 'QuickSortSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO QuickSort (S: Vector<entero>, ini: entero, fin: entero)\n    si ini < fin entonces\n        p <- Pivot(S, ini, fin)\n        quickSort(S, ini, p - 1)\n        quickSort(S, p + 1, fin)\n    fin si',
        java: QUICKSORT_COMPLETE_JAVA_SNIPPET,
        python:
          'def quick_sort(valores: list[int], inicio: int, fin: int) -> None:\n    if inicio < fin:\n        p = particionar(valores, inicio, fin)\n        quick_sort(valores, inicio, p - 1)\n        quick_sort(valores, p + 1, fin)',
      },
      preferredLanguage: 'java',
    },
    complexityData: QUICKSORT_COMPLEXITY_DATA,
  },

  {
    id: 'm2-elemento-mayoritario-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Elemento Mayoritario (Algoritmo D&C y Pseudo-M)',
    conceptSubtitle: 'Reducción por Emparejamiento · Ponderación de Frecuencias · Validación O(n)',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 6,
    theoryData: {
      summary:
        'Detección de un elemento con frecuencia estricta mayor a n/2 en tiempo lineal Theta(n) mediante descomposición en subarreglos y combinación por reducción.',
      bulletPoints: [
        'Condición de mayoría disjunta: Si un elemento es mayoritario global, obligatoriamente debe ser candidato mayoritario en al menos una de las dos mitades.',
        'Tupla descriptiva de estado: El algoritmo Pseudo-M propaga tuplas (r, n, c_x, x) que resumen existencia, longitud, balance de frecuencia y valor.',
        'Resolución de conflictos en tiempo constante: Al recombinar, si ambos candidatos existen se cancelan o ponderan sus frecuencias relativas en O(1).',
        'Verificación lineal obligatoria: El candidato final se valida mediante una pasada de conteo Theta(n) para confirmar si supera efectivamente n/2.',
      ],
      formulas: [
        {
          label: 'Recurrencia de Pseudo-M y Costo Total',
          latex:
            'T(n) = 2T(n/2) + c \\implies \\Theta(n); \\quad T_{\\text{total}}(n) = \\Theta(n) + \\Theta(n) = \\Theta(n)',
          description:
            'a=2 subproblemas, factor b=2, combinación O(1) -> a > b^k (2 > 1) -> Theta(n^1). Se evita el ordenamiento de O(n log n).',
        },
      ],
      keyInsight:
        'Resolver la fase de combinación en tiempo estrictamente constante O(1) permite que la recurrencia T(n) = 2T(n/2) + O(1) converja a tiempo lineal Theta(n).',
    },
  },
  {
    id: 'm2-elemento-mayoritario-visual',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Elemento Mayoritario: Reducción y Verificación',
    conceptSubtitle: 'Simulador Interactivo de Emparejamiento de Candidatos',
    badgeLabel: '2. Animación Interactiva',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 6,
    visualizerId: 'pseudo-m-majority',
  },
  {
    id: 'm2-elemento-mayoritario-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Elemento Mayoritario: Pseudocódigo Pseudo-M',
    conceptSubtitle: 'Combinación Exhaustiva de Casos de Candidatos',
    badgeLabel: '3. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 3,
    totalParts: 6,
    codeSnippet: {
      title: 'Pseudo-M(u, i, j) -> Tupla(r, n, c, x)',
      snippets: {
        pseudocode:
          'ALGORITMO Pseudo-M (u: Vector<entero>, i: entero, j: entero) -> Tupla(r, n, c, x)\n    si i == j entonces\n        devolver (true, 1, 1, u[i])\n    fin si\n    mid <- (i + j) / 2\n    o1 <- Pseudo-M(u, i, mid)\n    o2 <- Pseudo-M(u, mid + 1, j)\n    \n    si !o1.r Y !o2.r entonces devolver (false, o1.n + o2.n, 0, 0)\n    si o1.r Y !o2.r entonces devolver (true, o1.n + o2.n, o1.c + o2.n / 2, o1.x)\n    si !o1.r Y o2.r entonces devolver (true, o1.n + o2.n, o2.c + o1.n / 2, o2.x)\n    si o1.x == o2.x entonces devolver (true, o1.n + o2.n, o1.c + o2.c, o1.x)\n    si o1.c > o2.c entonces devolver (true, o1.n + o2.n, o1.c - o2.c, o1.x)\n    si o2.c > o1.c entonces devolver (true, o1.n + o2.n, o2.c - o1.c, o2.x)\n    si o1.n < o2.n entonces devolver (true, o1.n + o2.n, o1.c + o2.n / 2, o1.x)\n    si o2.n < o1.n entonces devolver (true, o1.n + o2.n, o2.c + o1.n / 2, o2.x)\n    devolver (false, o1.n + o2.n, 0, 0)',
        java: PSEUDO_M_COMPACT_JAVA_SNIPPET,
        python:
          'class Candidato:\n    def __init__(self, r: bool, n: int, c: int, x: int):\n        self.r, self.n, self.c, self.x = r, n, c, x\n\ndef pseudo_m(u: list[int], i: int, j: int) -> Candidato:\n    if i == j:\n        return Candidato(True, 1, 1, u[i])\n    mid = i + (j - i) // 2\n    o1 = pseudo_m(u, i, mid)\n    o2 = pseudo_m(u, mid + 1, j)\n    n_total = o1.n + o2.n\n    if not o1.r and not o2.r: return Candidato(False, n_total, 0, 0)\n    if o1.r and not o2.r: return Candidato(True, n_total, o1.c + o2.n // 2, o1.x)\n    if not o1.r and o2.r: return Candidato(True, n_total, o2.c + o1.n // 2, o2.x)\n    if o1.x == o2.x: return Candidato(True, n_total, o1.c + o2.c, o1.x)\n    if o1.c > o2.c: return Candidato(True, n_total, o1.c - o2.c, o1.x)\n    if o2.c > o1.c: return Candidato(True, n_total, o2.c - o1.c, o2.x)\n    if o1.n < o2.n: return Candidato(True, n_total, o1.c + o2.n // 2, o1.x)\n    if o2.n < o1.n: return Candidato(True, n_total, o2.c + o1.n // 2, o2.x)\n    return Candidato(False, n_total, 0, 0)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: PSEUDO_M_COMPLEXITY_DATA,
  },
  {
    id: 'm2-elemento-mayoritario-code',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Elemento Mayoritario: Implementación Java',
    conceptSubtitle: 'Estructura Candidato y Pasada de Verificación Lineal',
    badgeLabel: '4. Código Fuente',
    slideKind: 'code',
    partIndex: 4,
    totalParts: 6,
    codeSnippet: {
      title: 'MajorityElementPseudoM.java',
      snippets: {
        pseudocode:
          'ALGORITMO Pseudo-M (u: Vector<entero>, i: entero, j: entero) -> Tupla(r, n, c, x)\n    si i == j entonces devolver (true, 1, 1, u[i]) fin si\n    mid <- (i + j) / 2\n    o1 <- Pseudo-M(u, i, mid)\n    o2 <- Pseudo-M(u, mid + 1, j)\n    devolver CombinarCandidatos(o1, o2)',
        java: PSEUDO_M_COMPACT_JAVA_SNIPPET,
        python:
          'def elemento_mayoritario(u: list[int]) -> int | None:\n    if not u: return None\n    cand = pseudo_m(u, 0, len(u) - 1)\n    if not cand.r: return None\n    return cand.x if u.count(cand.x) > len(u) // 2 else None',
      },
      preferredLanguage: 'java',
    },
    complexityData: PSEUDO_M_COMPLEXITY_DATA,
  },
  {
    id: 'm2-elemento-mayoritario-complexity-pseudom',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Elemento Mayoritario: Complejidad de Pseudo-M',
    conceptSubtitle: 'Búsqueda del Candidato por D&C · Costo O(1) de Combinación',
    badgeLabel: '5. Complejidad: Pseudo-M',
    slideKind: 'complexity',
    partIndex: 5,
    totalParts: 6,
    codeSnippet: {
      title: 'MajorityElementPseudoM.java (pseudoM)',
      snippets: {
        pseudocode:
          'ALGORITMO Pseudo-M (u: Vector<entero>, i: entero, j: entero) -> Tupla(r, n, c, x)\n    si i == j entonces devolver (true, 1, 1, u[i]) fin si\n    mid <- (i + j) / 2\n    o1 <- Pseudo-M(u, i, mid)\n    o2 <- Pseudo-M(u, mid + 1, j)\n    devolver CombinarCandidatos(o1, o2)',
        java: PSEUDO_M_METHOD_JAVA_SNIPPET,
        python:
          'def pseudo_m(u: list[int], i: int, j: int) -> Candidato:\n    if i == j: return Candidato(True, 1, 1, u[i])\n    mid = i + (j - i) // 2\n    o1 = pseudo_m(u, i, mid)\n    o2 = pseudo_m(u, mid + 1, j)\n    return combinar_candidatos(o1, o2)',
      },
      preferredLanguage: 'java',
    },
    complexityData: PSEUDO_M_SOLVER_COMPLEXITY_DATA,
  },
  {
    id: 'm2-elemento-mayoritario-complexity-verif',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Elemento Mayoritario: Verificación y Cota Global',
    conceptSubtitle: 'Validación Lineal O(n) del Candidato y Balance Asintótico Total',
    badgeLabel: '6. Complejidad: Verificación',
    slideKind: 'complexity',
    partIndex: 6,
    totalParts: 6,
    codeSnippet: {
      title: 'MajorityElementPseudoM.java (elementoMayoritario)',
      snippets: {
        pseudocode:
          'ALGORITMO ElementoMayoritario (u: Vector<entero>) -> entero\n    cand <- Pseudo-M(u, 1, Longitud(u))\n    si !cand.r entonces devolver NO_EXISTE fin si\n    cuenta <- ContarOcurrencias(u, cand.x)\n    si cuenta > Longitud(u) / 2 entonces devolver cand.x\n    sino devolver NO_EXISTE fin si',
        java: PSEUDO_M_VERIF_METHOD_JAVA_SNIPPET,
        python:
          'def elemento_mayoritario(u: list[int]) -> int | None:\n    if not u: return None\n    cand = pseudo_m(u, 0, len(u) - 1)\n    if not cand.r: return None\n    return cand.x if u.count(cand.x) > len(u) // 2 else None',
      },
      preferredLanguage: 'java',
    },
    complexityData: PSEUDO_M_VERIF_COMPLEXITY_DATA,
  },

  {
    id: 'm2-torneo-bridge-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torneo de Bridge (Fixture Round-Robin)',
    conceptSubtitle: 'Construcción Matricial para n = 2^k · Rotación Cíclica de Adversarios',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 7,
    theoryData: {
      summary:
        'Generación de calendario de competición para n = 2^k parejas en n-1 jornadas sin descansos, dividiendo en dos subgrupos y cruzando mediante rotación cíclica.',
      bulletPoints: [
        'Estructura de la matriz de fixture: Se construye una matriz T de dimensiones n x (n-1) donde la celda T[i, j] indica el adversario de la pareja i en la fecha j.',
        'Caso base para n = 2: Dos parejas compiten directamente en el día 1 asignando T[1, 1] = 2 y T[2, 1] = 1.',
        'Resolución interna de subgrupos: Se resuelven de forma recursiva los subcampeonatos internos de las primeras n/2 parejas y las restantes n/2 en (n/2)-1 días.',
        'Recombinación cíclica CompletarT: En los restantes n/2 días se cruzan las parejas de ambos grupos rotando circularmente los adversarios en tiempo cuadrático.',
      ],
      formulas: [
        {
          label: 'Recurrencia del Fixture Round-Robin',
          latex: 'T(n) = 2T(n/2) + \\Theta(n^2) \\implies \\Theta(n^2)',
          description:
            'a=2, b=2, k=2 -> a < b^k (2 < 4). El costo de recombinación cuadrático domina por completo la recurrencia.',
        },
      ],
      keyInsight:
        'Aunque la división recursiva reduce el fixture a la mitad, llenar las celdas cruzadas de la matriz exige Theta(n^2) pasos, determinando una cota cuadrática infranqueable.',
    },
  },
  {
    id: 'm2-torneo-bridge-visual',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torneo de Bridge: Cuadrantes del Fixture',
    conceptSubtitle: 'Simulador Visual de Bloques y Desplazamiento Cíclico',
    badgeLabel: '2. Animación Interactiva',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 7,
    visualizerId: 'bridge-fixture',
  },
  {
    id: 'm2-torneo-bridge-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torneo de Bridge: Pseudocódigo',
    conceptSubtitle: 'Procedimientos Fixture y CompletarT',
    badgeLabel: '3. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 3,
    totalParts: 7,
    codeSnippet: {
      title: 'Fixture(T, inf, sup) & CompletarT(...)',
      snippets: {
        pseudocode:
          'ALGORITMO Fixture (T: Matriz, inf: entero, sup: entero)\n    si inf == sup - 1 entonces\n        T[inf, 1] <- sup\n        T[sup, 1] <- inf\n    sino\n        mid <- (inf + sup) / 2\n        Fixture(T, inf, mid)\n        Fixture(T, mid + 1, sup)\n        CompletarT(T, inf, sup)\n    fin si',
        java: BRIDGE_COMPLETE_JAVA_SNIPPET,
        python:
          'def fixture(T: list[list[int]], first: int, last: int) -> None:\n    if first == last - 1:\n        T[first][0] = last + 1\n        T[last][0] = first + 1\n    else:\n        mid = first + (last - first) // 2\n        fixture(T, first, mid)\n        fixture(T, mid + 1, last)\n        completar_t(T, first, last)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: BRIDGE_FIXTURE_COMPLEXITY_DATA,
  },
  {
    id: 'm2-torneo-bridge-code-fixture',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torneo de Bridge: Método Recursivo Fixture',
    conceptSubtitle: 'Bifurcación en Subgrupos de n/2 y Caso Base (Java)',
    badgeLabel: '4. Código: Fixture',
    slideKind: 'code',
    partIndex: 4,
    totalParts: 7,
    codeSnippet: {
      title: 'BridgeTournament.java (fixture)',
      snippets: {
        pseudocode:
          'ALGORITMO Fixture (T: Matriz, inf: entero, sup: entero)\n    si inf == sup - 1 entonces\n        T[inf, 1] <- sup\n        T[sup, 1] <- inf\n    sino\n        mid <- (inf + sup) / 2\n        Fixture(T, inf, mid)\n        Fixture(T, mid + 1, sup)\n        CompletarT(T, inf, sup)\n    fin si',
        java: BRIDGE_FIXTURE_METHOD_JAVA_SNIPPET,
        python:
          'def fixture(T: list[list[int]], first: int, last: int) -> None:\n    if first == last - 1:\n        T[first][0] = last + 1\n        T[last][0] = first + 1\n    else:\n        mid = first + (last - first) // 2\n        fixture(T, first, mid)\n        fixture(T, mid + 1, last)\n        completar_t(T, first, last)',
      },
      preferredLanguage: 'java',
    },
    complexityData: BRIDGE_FIXTURE_METHOD_COMPLEXITY_DATA,
  },
  {
    id: 'm2-torneo-bridge-code-completart',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torneo de Bridge: Procedimiento CompletarT',
    conceptSubtitle: 'Recombinación Cíclica Inter-Grupos Cuadrática (Java)',
    badgeLabel: '5. Código: CompletarT',
    slideKind: 'code',
    partIndex: 5,
    totalParts: 7,
    codeSnippet: {
      title: 'BridgeTournament.java (completarT)',
      snippets: {
        pseudocode:
          'ALGORITMO CompletarT (T: Matriz, inf: entero, sup: entero)\n    ...\n    // Desplazamiento circular de adversarios en columnas cruzadas',
        java: BRIDGE_COMPLETART_METHOD_JAVA_SNIPPET,
        python:
          'def completar_t(T: list[list[int]], first: int, last: int) -> None:\n    len_h = (last - first + 1) // 2\n    # Asignación y desplazamiento circular de adversarios',
      },
      preferredLanguage: 'java',
    },
    complexityData: BRIDGE_COMPLETART_METHOD_COMPLEXITY_DATA,
  },
  {
    id: 'm2-torneo-bridge-complexity-fixture',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torneo de Bridge: Complejidad de Fixture',
    conceptSubtitle: 'Bifurcación en 2 Subproblemas y Caso Base O(1)',
    badgeLabel: '6. Complejidad: Fixture',
    slideKind: 'complexity',
    partIndex: 6,
    totalParts: 7,
    codeSnippet: {
      title: 'BridgeTournament.java (fixture)',
      snippets: {
        pseudocode:
          'ALGORITMO Fixture (T: Matriz, inf: entero, sup: entero)\n    si inf == sup - 1 entonces\n        T[inf, 1] <- sup; T[sup, 1] <- inf\n    sino\n        Fixture(T, inf, mid)\n        Fixture(T, mid + 1, sup)\n        CompletarT(T, inf, sup)\n    fin si',
        java: BRIDGE_FIXTURE_METHOD_JAVA_SNIPPET,
        python:
          'def fixture(T: list[list[int]], first: int, last: int) -> None:\n    if first == last - 1:\n        T[first][0] = last + 1\n        T[last][0] = first + 1\n    else:\n        fixture(T, first, mid)\n        fixture(T, mid + 1, last)\n        completar_t(T, first, last)',
      },
      preferredLanguage: 'java',
    },
    complexityData: BRIDGE_FIXTURE_METHOD_COMPLEXITY_DATA,
  },
  {
    id: 'm2-torneo-bridge-complexity-completart',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torneo de Bridge: Complejidad de CompletarT',
    conceptSubtitle: 'Recombinación Cuadrática Theta(n^2) y Teorema Maestro',
    badgeLabel: '7. Complejidad: CompletarT',
    slideKind: 'complexity',
    partIndex: 7,
    totalParts: 7,
    codeSnippet: {
      title: 'BridgeTournament.java (completarT)',
      snippets: {
        pseudocode:
          'ALGORITMO CompletarT (T: Matriz, inf: entero, sup: entero)\n    len <- (sup - inf + 1) / 2\n    para j <- 1 hasta len hacer ... fin para\n    para i <- 2 hasta len hacer\n        para j <- 1 hasta len hacer ... fin para\n    fin para',
        java: BRIDGE_COMPLETART_METHOD_JAVA_SNIPPET,
        python:
          'def completar_t(T: list[list[int]], first: int, last: int) -> None:\n    len_h = (last - first + 1) // 2\n    # Dos bucles anidados de dimension len_h x len_h',
      },
      preferredLanguage: 'java',
    },
    complexityData: BRIDGE_COMPLETART_METHOD_COMPLEXITY_DATA,
  },

  {
    id: 'm2-mps-subarray-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Suma Parcial Máxima (Maximum Subarray / MPS)',
    conceptSubtitle: 'Tricotomía de Ubicación · Sufijo LMPS y Prefijo RMPS · Recombinación O(n)',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 5,
    theoryData: {
      summary:
        'Determinación del subarreglo continuo que maximiza la suma de sus componentes mediante división binaria y resolución del caso de cruce central en tiempo lineal.',
      bulletPoints: [
        'Tricotomía de localización: El subarreglo óptimo se ubica enteramente en la mitad izquierda, enteramente en la derecha o cruzando el punto medio mid.',
        'Subproblema de cruce central: Todo subarreglo que cruza mid se descompone en un sufijo máximo hacia la izquierda y un prefijo máximo hacia la derecha.',
        'Cálculo de LMPS y RMPS: Se calcula en tiempo lineal O(n) el Left MPS desde mid descendiendo a ini y el Right MPS desde mid+1 ascendiendo a fin.',
        'Recombinación maximizadora: La solución global es el máximo entre MPS(izq), MPS(der) y la suma (LMPS + RMPS) en tiempo constante tras el barrido.',
      ],
      formulas: [
        {
          label: 'Recurrencia de Suma Parcial Máxima D&C',
          latex: 'T(n) = 2T(n/2) + \\Theta(n) \\implies \\Theta(n \\log n)',
          description:
            'a=2, b=2, k=1 -> a = b^k (2 = 2^1). Misma estructura que MergeSort, superando ampliamente la fuerza bruta O(n^3) y O(n^2).',
        },
      ],
      keyInsight:
        'El cálculo lineal del cruce central (LMPS + RMPS) evita evaluar los n^2 pares posibles de índices, manteniendo la recombinación en Theta(n).',
    },
  },
  {
    id: 'm2-mps-subarray-visual',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Suma Parcial Máxima: LMPS y RMPS',
    conceptSubtitle: 'Simulador Interactivo de Sufijo y Prefijo de Cruce Central',
    badgeLabel: '2. Animación Interactiva',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 5,
    visualizerId: 'lmps-rmps',
  },
  {
    id: 'm2-mps-subarray-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Suma Parcial Máxima: Pseudocódigo',
    conceptSubtitle: 'Barridos Hacia los Extremos y Máximo Tripartito',
    badgeLabel: '3. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 3,
    totalParts: 5,
    codeSnippet: {
      title: 'MPS(A, ini, fin) -> Entero',
      snippets: {
        pseudocode:
          'ALGORITMO MPS (A: Vector<entero>, ini: entero, fin: entero) -> entero\n    si ini == fin entonces\n        devolver A[ini]\n    fin si\n    mid <- (ini + fin) / 2\n    maxIzq <- MPS(A, ini, mid)\n    maxDer <- MPS(A, mid + 1, fin)\n    \n    suma <- 0; sumLMPS <- -inf\n    para i <- mid hasta ini decrementando 1 hacer\n        suma <- suma + A[i]\n        si suma > sumLMPS entonces sumLMPS <- suma fin si\n    fin para\n    \n    suma <- 0; sumRMPS <- -inf\n    para j <- mid + 1 hasta fin hacer\n        suma <- suma + A[j]\n        si suma > sumRMPS entonces sumRMPS <- suma fin si\n    fin para\n    \n    devolver max(maxIzq, maxDer, sumLMPS + sumRMPS)',
        java:
          'public static int mpsDivideAndConquer(int[] A, int ini, int fin) {\n    if (ini == fin) {\n        return A[ini];\n    }\n    int mid = ini + (fin - ini) / 2;\n    int maxIzq = mpsDivideAndConquer(A, ini, mid);\n    int maxDer = mpsDivideAndConquer(A, mid + 1, fin);\n\n    int suma = 0, sumLMPS = Integer.MIN_VALUE;\n    for (int i = mid; i >= ini; i--) {\n        suma += A[i];\n        if (suma > sumLMPS) sumLMPS = suma;\n    }\n\n    suma = 0; int sumRMPS = Integer.MIN_VALUE;\n    for (int j = mid + 1; j <= fin; j++) {\n        suma += A[j];\n        if (suma > sumRMPS) sumRMPS = suma;\n    }\n\n    int maxCruce = sumLMPS + sumRMPS;\n    return Math.max(Math.max(maxIzq, maxDer), maxCruce);\n}',
        python:
          'def mps_divide_and_conquer(A: list[int], ini: int, fin: int) -> int:\n    if ini == fin:\n        return A[ini]\n    mid = ini + (fin - ini) // 2\n    max_izq = mps_divide_and_conquer(A, ini, mid)\n    max_der = mps_divide_and_conquer(A, mid + 1, fin)\n    \n    suma = 0\n    sum_lmps = -float("inf")\n    for i in range(mid, ini - 1, -1):\n        suma += A[i]\n        if suma > sum_lmps: sum_lmps = suma\n        \n    suma = 0\n    sum_rmps = -float("inf")\n    for j in range(mid + 1, fin + 1):\n        suma += A[j]\n        if suma > sum_rmps: sum_rmps = suma\n        \n    return max(max_izq, max_der, sum_lmps + sum_rmps)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: MPS_SUBARRAY_COMPLEXITY_DATA,
  },
  {
    id: 'm2-mps-subarray-code',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Suma Parcial Máxima: Implementación Java',
    conceptSubtitle: 'Estructuración D&C en O(n log n)',
    badgeLabel: '4. Código Fuente',
    slideKind: 'code',
    partIndex: 4,
    totalParts: 5,
    codeSnippet: {
      title: 'MaximumPartialSubarray.java',
      snippets: {
        pseudocode:
          'ALGORITMO MPS (A: Vector<entero>, ini: entero, fin: entero) -> entero\n    si ini == fin entonces devolver A[ini] fin si\n    mid <- (ini + fin) / 2\n    maxIzq <- MPS(A, ini, mid)\n    maxDer <- MPS(A, mid + 1, fin)\n    maxCruce <- CalcularLMPS(A, ini, mid) + CalcularRMPS(A, mid + 1, fin)\n    devolver max(maxIzq, maxDer, maxCruce)',
        java:
          'public static int mpsDivideAndConquer(int[] A, int ini, int fin) {\n    if (ini == fin) {\n        return A[ini];\n    }\n    int mid = ini + (fin - ini) / 2;\n    int maxIzq = mpsDivideAndConquer(A, ini, mid);\n    int maxDer = mpsDivideAndConquer(A, mid + 1, fin);\n\n    int suma = 0, sumLMPS = Integer.MIN_VALUE;\n    for (int i = mid; i >= ini; i--) {\n        suma += A[i];\n        if (suma > sumLMPS) sumLMPS = suma;\n    }\n\n    suma = 0; int sumRMPS = Integer.MIN_VALUE;\n    for (int j = mid + 1; j <= fin; j++) {\n        suma += A[j];\n        if (suma > sumRMPS) sumRMPS = suma;\n    }\n\n    int maxCruce = sumLMPS + sumRMPS;\n    return Math.max(Math.max(maxIzq, maxDer), maxCruce);\n}',
        python:
          'def mps_divide_and_conquer(A: list[int], ini: int, fin: int) -> int:\n    if ini == fin:\n        return A[ini]\n    mid = ini + (fin - ini) // 2\n    max_izq = mps_divide_and_conquer(A, ini, mid)\n    max_der = mps_divide_and_conquer(A, mid + 1, fin)\n    \n    suma = 0\n    sum_lmps = -float("inf")\n    for i in range(mid, ini - 1, -1):\n        suma += A[i]\n        if suma > sum_lmps: sum_lmps = suma\n        \n    suma = 0\n    sum_rmps = -float("inf")\n    for j in range(mid + 1, fin + 1):\n        suma += A[j]\n        if suma > sum_rmps: sum_rmps = suma\n        \n    return max(max_izq, max_der, sum_lmps + sum_rmps)',
      },
      preferredLanguage: 'java',
    },
    complexityData: MPS_SUBARRAY_COMPLEXITY_DATA,
  },
  {
    id: 'm2-mps-subarray-complexity',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Suma Parcial Máxima: Análisis de Complejidad',
    conceptSubtitle: 'Ecuación de Recurrencia Isomorfa a MergeSort',
    badgeLabel: '5. Complejidad y Recurrencia',
    slideKind: 'complexity',
    partIndex: 5,
    totalParts: 5,
    codeSnippet: {
      title: 'MaximumPartialSubarray.java',
      snippets: {
        pseudocode:
          'ALGORITMO MPS (A: Vector<entero>, ini: entero, fin: entero) -> entero\n    ...\n    devolver max(maxIzq, maxDer, sumLMPS + sumRMPS)',
        java:
          'public static int mpsDivideAndConquer(int[] A, int ini, int fin) {\n    if (ini == fin) {\n        return A[ini];\n    }\n    int mid = ini + (fin - ini) / 2;\n    int maxIzq = mpsDivideAndConquer(A, ini, mid);\n    int maxDer = mpsDivideAndConquer(A, mid + 1, fin);\n\n    int suma = 0, sumLMPS = Integer.MIN_VALUE;\n    for (int i = mid; i >= ini; i--) {\n        suma += A[i];\n        if (suma > sumLMPS) sumLMPS = suma;\n    }\n\n    suma = 0; int sumRMPS = Integer.MIN_VALUE;\n    for (int j = mid + 1; j <= fin; j++) {\n        suma += A[j];\n        if (suma > sumRMPS) sumRMPS = suma;\n    }\n\n    int maxCruce = sumLMPS + sumRMPS;\n    return Math.max(Math.max(maxIzq, maxDer), maxCruce);\n}',
        python:
          'def mps_divide_and_conquer(A: list[int], ini: int, fin: int) -> int:\n    ...\n    return max(max_izq, max_der, sum_lmps + sum_rmps)',
      },
      preferredLanguage: 'java',
    },
    complexityData: MPS_SUBARRAY_COMPLEXITY_DATA,
  },

  {
    id: 'm2-strassen-matrices-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Multiplicación de Matrices de Strassen',
    conceptSubtitle: 'Ruptura de la Barrera Cúbica O(N^3) · 7 Productos de Submatrices',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 4,
    theoryData: {
      summary:
        'Algoritmo subcúbico para producto de matrices de N x N que descompone en 4 bloques de N/2 y calcula 7 productos ingeniosos en lugar de los 8 habituales.',
      bulletPoints: [
        'Superación de la barrera cúbica: El producto tradicional exige 8 multiplicaciones de submatrices generando O(N^3); Strassen reduce los productos a 7.',
        'Compensación por adición matricial: Se efectúan 18 sumas y restas de submatrices de costo cuadrático Theta(N^2) para estructurar los 7 productos m1 a m7.',
        'Recombinación algebraica: Cada cuadrante de la matriz resultado C se reconstituye sumando y restando combinaciones específicas de los productos intermedios.',
        'Umbral de rentabilidad práctica: Debido a la sobrecarga de constantes aditivas, en la práctica se aplica recursión hasta un umbral N <= 18 o 32 cambiando al método clásico.',
      ],
      formulas: [
        {
          label: 'Recurrencia de Strassen',
          latex: 'T(N) = 7T(N/2) + \\Theta(N^2) \\implies \\Theta(N^{\\log_2 7}) \\approx O(N^{2.807})',
          description:
            'a=7 subproblemas, factor b=2, costo de combinación f(N)=Theta(N^2) -> a > b^k (7 > 4) -> Caso 1 del Teorema Maestro.',
        },
      ],
      keyInsight:
        'Reducir en una sola multiplicación recursiva (de 8 a 7) compensa asintóticamente cualquier cantidad constante de sumas matriciales adicionales.',
    },
  },
  {
    id: 'm2-strassen-matrices-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Multiplicación de Strassen: Pseudocódigo',
    conceptSubtitle: 'Ecuaciones de Productos M1..M7 y Composición C11..C22',
    badgeLabel: '2. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 2,
    totalParts: 4,
    codeSnippet: {
      title: 'PRODUCTOMATRICES(A, B, N)',
      snippets: {
        pseudocode:
          'ALGORITMO PRODUCTOMATRICES (A: Matriz, B: Matriz, N: entero)\n    si N <= 2 entonces\n        devolver Producto2x2(A, B)\n    sino\n        Dividir A en A11, A12, A21, A22\n        Dividir B en B11, B12, B21, B22\n        Calcular M1 hasta M7 mediante 7 llamadas recursivas\n        C11 <- M1 + M4 - M5 + M7\n        C12 <- M3 + M5\n        C21 <- M2 + M4\n        C22 <- M1 + M3 - M2 + M6\n        devolver Componer(C11, C12, C21, C22)\n    fin si',
        java:
          'public static int[][] strassen(int[][] A, int[][] B, int n) {\n    if (n <= 2) {\n        return producto2x2(A, B);\n    }\n    int k = n / 2;\n    int[][] m1 = strassen(sumar(A, A, 0, 0, k, k, k), sumar(B, B, 0, 0, k, k, k), k);\n    int[][] m2 = strassen(sumar(A, A, k, 0, k, k, k), B, k);\n    int[][] m3 = strassen(A, restar(B, B, 0, k, k, k, k), k);\n    int[][] m4 = strassen(A, restar(B, B, k, 0, 0, 0, k), k);\n    int[][] m5 = strassen(sumar(A, A, 0, 0, 0, k, k), B, k);\n    int[][] m6 = strassen(restar(A, A, k, 0, 0, 0, k), sumar(B, B, 0, 0, 0, k, k), k);\n    int[][] m7 = strassen(restar(A, A, 0, k, k, k, k), sumar(B, B, k, 0, k, k, k), k);\n\n    int[][] C = new int[n][n];\n    for (int i = 0; i < k; i++) {\n        for (int j = 0; j < k; j++) {\n            C[i][j] = m1[i][j] + m4[i][j] - m5[i][j] + m7[i][j];\n            C[i][j + k] = m3[i][j] + m5[i][j];\n            C[i + k][j] = m2[i][j] + m4[i][j];\n            C[i + k][j + k] = m1[i][j] + m3[i][j] - m2[i][j] + m6[i][j];\n        }\n    }\n    return C;\n}',
        python:
          'def strassen(A: list[list[int]], B: list[list[int]], n: int) -> list[list[int]]:\n    if n <= 2:\n        return producto_2x2(A, B)\n    k = n // 2\n    # 7 multiplicaciones recursivas m1 a m7\n    # Recombinación en cuadrantes C11, C12, C21, C22\n    return C',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: STRASSEN_COMPLEXITY_DATA,
  },
  {
    id: 'm2-strassen-matrices-code',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Multiplicación de Strassen: Implementación Java',
    conceptSubtitle: 'Desplazamiento de Índices de Bloque y Ensamblado de Matriz C',
    badgeLabel: '3. Código Fuente',
    slideKind: 'code',
    partIndex: 3,
    totalParts: 4,
    codeSnippet: {
      title: 'StrassenMatrixMultiplication.java',
      snippets: {
        pseudocode:
          'ALGORITMO PRODUCTOMATRICES (A: Matriz, B: Matriz, N: entero)\n    si N <= 2 entonces devolver Producto2x2(A, B) fin si\n    ...\n    devolver Componer(C11, C12, C21, C22)',
        java:
          'public static int[][] strassen(int[][] A, int[][] B, int n) {\n    if (n <= 2) {\n        return producto2x2(A, B);\n    }\n    int k = n / 2;\n    int[][] m1 = strassen(sumar(A, A, 0, 0, k, k, k), sumar(B, B, 0, 0, k, k, k), k);\n    int[][] m2 = strassen(sumar(A, A, k, 0, k, k, k), B, k);\n    int[][] m3 = strassen(A, restar(B, B, 0, k, k, k, k), k);\n    int[][] m4 = strassen(A, restar(B, B, k, 0, 0, 0, k), k);\n    int[][] m5 = strassen(sumar(A, A, 0, 0, 0, k, k), B, k);\n    int[][] m6 = strassen(restar(A, A, k, 0, 0, 0, k), sumar(B, B, 0, 0, 0, k, k), k);\n    int[][] m7 = strassen(restar(A, A, 0, k, k, k, k), sumar(B, B, k, 0, k, k, k), k);\n\n    int[][] C = new int[n][n];\n    for (int i = 0; i < k; i++) {\n        for (int j = 0; j < k; j++) {\n            C[i][j] = m1[i][j] + m4[i][j] - m5[i][j] + m7[i][j];\n            C[i][j + k] = m3[i][j] + m5[i][j];\n            C[i + k][j] = m2[i][j] + m4[i][j];\n            C[i + k][j + k] = m1[i][j] + m3[i][j] - m2[i][j] + m6[i][j];\n        }\n    }\n    return C;\n}',
        python:
          'def strassen(A: list[list[int]], B: list[list[int]], n: int) -> list[list[int]]:\n    if n <= 2:\n        return producto_2x2(A, B)\n    k = n // 2\n    # 7 llamadas recursivas con submatrices n/2\n    return C',
      },
      preferredLanguage: 'java',
    },
    complexityData: STRASSEN_COMPLEXITY_DATA,
  },
  {
    id: 'm2-strassen-matrices-complexity',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Multiplicación de Strassen: Análisis de Complejidad',
    conceptSubtitle: 'Teorema Maestro Caso 1: Grado Asintótico 2.807 vs 3.0',
    badgeLabel: '4. Complejidad y Recurrencia',
    slideKind: 'complexity',
    partIndex: 4,
    totalParts: 4,
    codeSnippet: {
      title: 'StrassenMatrixMultiplication.java',
      snippets: {
        pseudocode:
          'ALGORITMO PRODUCTOMATRICES (A: Matriz, B: Matriz, N: entero)\n    ...\n    devolver Componer(C11, C12, C21, C22)',
        java:
          'public static int[][] strassen(int[][] A, int[][] B, int n) {\n    if (n <= 2) {\n        return producto2x2(A, B);\n    }\n    int k = n / 2;\n    int[][] m1 = strassen(sumar(A, A, 0, 0, k, k, k), sumar(B, B, 0, 0, k, k, k), k);\n    int[][] m2 = strassen(sumar(A, A, k, 0, k, k, k), B, k);\n    int[][] m3 = strassen(A, restar(B, B, 0, k, k, k, k), k);\n    int[][] m4 = strassen(A, restar(B, B, k, 0, 0, 0, k), k);\n    int[][] m5 = strassen(sumar(A, A, 0, 0, 0, k, k), B, k);\n    int[][] m6 = strassen(restar(A, A, k, 0, 0, 0, k), sumar(B, B, 0, 0, 0, k, k), k);\n    int[][] m7 = strassen(restar(A, A, 0, k, k, k, k), sumar(B, B, k, 0, k, k, k), k);\n\n    int[][] C = new int[n][n];\n    for (int i = 0; i < k; i++) {\n        for (int j = 0; j < k; j++) {\n            C[i][j] = m1[i][j] + m4[i][j] - m5[i][j] + m7[i][j];\n            C[i][j + k] = m3[i][j] + m5[i][j];\n            C[i + k][j] = m2[i][j] + m4[i][j];\n            C[i + k][j + k] = m1[i][j] + m3[i][j] - m2[i][j] + m6[i][j];\n        }\n    }\n    return C;\n}',
        python:
          'def strassen(A: list[list[int]], B: list[list[int]], n: int) -> list[list[int]]:\n    ...\n    return C',
      },
      preferredLanguage: 'java',
    },
    complexityData: STRASSEN_COMPLEXITY_DATA,
  },

  {
    id: 'm2-palindromos-sac-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Detección de Palíndromos (Subtract & Conquer)',
    conceptSubtitle: 'Reducción por Decremento Constante b = 2 · Comparación de Extremos',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 4,
    theoryData: {
      summary:
        'Validación de simetría en secuencias mediante reducción por decremento constante de tamaño b = 2 comparando pares de extremos opuestos.',
      bulletPoints: [
        'Principio de Subtract & Conquer: La reducción del tamaño de entrada se realiza mediante sustracción fija n - b en lugar de división fraccionaria n/b.',
        'Contracción de extremos: Se comparan u[ini] y u[fin]; si difieren se concluye falso inmediatamente en O(1), si coinciden se delega recursivamente en [ini+1..fin-1].',
        'Caso base de convergencia: Si ini >= fin, se ha examinado la totalidad de la cadena con éxito y se retorna verdadero en tiempo constante O(1).',
        'Linealidad estricta: Con a=1 llamada y decremento b=2 unidades, se realizan a lo sumo n/2 llamadas elementales alcanzando Theta(n).',
      ],
      formulas: [
        {
          label: 'Recurrencia por Sustracción de Palíndromos',
          latex: 'T(n) = 1 \\cdot T(n - 2) + c \\implies \\Theta(n)',
          description:
            'a=1 subproblema, decremento b=2, k=0 -> a = 1 -> Theta(n^{k+1}) = Theta(n).',
        },
      ],
      keyInsight:
        'En Subtract & Conquer con a=1 y f(n)=O(1), el número de llamadas es proporcional a n/b produciendo una complejidad lineal Theta(n).',
    },
  },
  {
    id: 'm2-palindromos-sac-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Detección de Palíndromos: Pseudocódigo',
    conceptSubtitle: 'Verificación de Simetría con Desplazamiento de Extremos',
    badgeLabel: '2. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 2,
    totalParts: 4,
    codeSnippet: {
      title: 'Palindrome(u, ini, fin) -> Booleano',
      snippets: {
        pseudocode:
          'ALGORITMO Palindrome (u: Vector<entero>, ini: entero, fin: entero) -> booleano\n    si ini >= fin entonces\n        devolver true\n    sino si u[ini] != u[fin] entonces\n        devolver false\n    sino\n        devolver Palindrome(u, ini + 1, fin - 1)\n    fin si',
        java:
          'public static boolean esPalindromo(int[] u, int ini, int fin) {\n    if (ini >= fin) {\n        return true;\n    }\n    if (u[ini] != u[fin]) {\n        return false;\n    }\n    return esPalindromo(u, ini + 1, fin - 1);\n}',
        python:
          'def es_palindromo(u: list[int], ini: int, fin: int) -> bool:\n    if ini >= fin:\n        return True\n    if u[ini] != u[fin]:\n        return False\n    return es_palindromo(u, ini + 1, fin - 1)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: PALINDROMOS_COMPLEXITY_DATA,
  },
  {
    id: 'm2-palindromos-sac-code',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Detección de Palíndromos: Implementación Java',
    conceptSubtitle: 'Guarda de Fin y Retorno Booleano Recursivo',
    badgeLabel: '3. Código Fuente',
    slideKind: 'code',
    partIndex: 3,
    totalParts: 4,
    codeSnippet: {
      title: 'PalindromeChecker.java',
      snippets: {
        pseudocode:
          'ALGORITMO Palindrome (u: Vector<entero>, ini: entero, fin: entero) -> booleano\n    si ini >= fin entonces\n        devolver true\n    sino si u[ini] != u[fin] entonces\n        devolver false\n    sino\n        devolver Palindrome(u, ini + 1, fin - 1)\n    fin si',
        java:
          'public static boolean esPalindromo(int[] u, int ini, int fin) {\n    if (ini >= fin) {\n        return true;\n    }\n    if (u[ini] != u[fin]) {\n        return false;\n    }\n    return esPalindromo(u, ini + 1, fin - 1);\n}',
        python:
          'def es_palindromo(u: list[int], ini: int, fin: int) -> bool:\n    if ini >= fin:\n        return True\n    if u[ini] != u[fin]:\n        return False\n    return es_palindromo(u, ini + 1, fin - 1)',
      },
      preferredLanguage: 'java',
    },
    complexityData: PALINDROMOS_COMPLEXITY_DATA,
  },
  {
    id: 'm2-palindromos-sac-complexity',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Detección de Palíndromos: Análisis de Complejidad',
    conceptSubtitle: 'Teorema Maestro por Sustracción y Espacio en Stack',
    badgeLabel: '4. Complejidad y Recurrencia',
    slideKind: 'complexity',
    partIndex: 4,
    totalParts: 4,
    codeSnippet: {
      title: 'PalindromeChecker.java',
      snippets: {
        pseudocode:
          'ALGORITMO Palindrome (u: Vector<entero>, ini: entero, fin: entero) -> booleano\n    ...\n    devolver Palindrome(u, ini + 1, fin - 1)',
        java:
          'public static boolean esPalindromo(int[] u, int ini, int fin) {\n    if (ini >= fin) {\n        return true;\n    }\n    if (u[ini] != u[fin]) {\n        return false;\n    }\n    return esPalindromo(u, ini + 1, fin - 1);\n}',
        python:
          'def es_palindromo(u: list[int], ini: int, fin: int) -> bool:\n    ...\n    return es_palindromo(u, ini + 1, fin - 1)',
      },
      preferredLanguage: 'java',
    },
    complexityData: PALINDROMOS_COMPLEXITY_DATA,
  },

  {
    id: 'm2-torres-hanoi-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Las Torres de Hanoi',
    conceptSubtitle: 'Subtract & Conquer con Bifurcación · Explosión Combinatoria 2^n - 1',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 5,
    theoryData: {
      summary:
        'Problema clásico de Subtract & Conquer con bifurcación (a=2, b=1), que genera una explosión combinatoria intrínsecamente exponencial de 2^n - 1 movimientos obligatorios.',
      bulletPoints: [
        'Estrategia tripartita de traslación: 1) mover n-1 discos de origen a auxiliar, 2) mover el disco mayor directamente a destino, 3) mover n-1 discos de auxiliar a destino.',
        'Bifurcación con decremento unitario: Cada instancia de tamaño n genera dos llamadas recursivas independientes de tamaño n - 1.',
        'Optimalidad demostrada: No existe ninguna secuencia válida de movimientos que traslade n discos entre tres varillas en menos de 2^n - 1 pasos.',
        'Crecimiento intratable: Para n=64 discos a razón de un movimiento por segundo, el tiempo requerido superaría los 584 mil millones de años.',
      ],
      formulas: [
        {
          label: 'Recurrencia de Torres de Hanoi',
          latex: 'T(n) = 2T(n - 1) + c \\implies \\Theta(2^n)',
          description:
            'a=2, b=1, k=0. Teorema Maestro por Sustracción con a > 1 -> Theta(a^{n/b}) = Theta(2^n). Exactamente 2^n - 1 movimientos.',
        },
      ],
      keyInsight:
        'Subtract & Conquer con más de una llamada recursiva (a >= 2) resulta intrínsecamente intratable y condena al algoritmo a una explosión exponencial inevitable.',
    },
  },
  {
    id: 'm2-torres-hanoi-visual',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torres de Hanoi: Movimiento de Clavijas',
    conceptSubtitle: 'Simulador Interactivo de Traslado de Discos y Clavijas A, B y C',
    badgeLabel: '2. Animación Interactiva',
    slideKind: 'visualizer',
    partIndex: 2,
    totalParts: 5,
    visualizerId: 'hanoi-towers',
  },
  {
    id: 'm2-torres-hanoi-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torres de Hanoi: Pseudocódigo',
    conceptSubtitle: 'Desplazamiento Tripartito con Clavijas Origen, Auxiliar y Destino',
    badgeLabel: '3. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 3,
    totalParts: 5,
    codeSnippet: {
      title: 'Hanoi(n, A, B, C)',
      snippets: {
        pseudocode:
          'ALGORITMO Hanoi (n: entero, A: poste, B: poste, C: poste)\n    si n == 1 entonces\n        mover A -> C\n    sino\n        Hanoi(n - 1, A, C, B)\n        mover A -> C\n        Hanoi(n - 1, B, A, C)\n    fin si',
        java:
          'public static void resolverHanoi(int n, char origen, char auxiliar, char destino) {\n    if (n == 1) {\n        System.out.println("Mover disco 1 de " + origen + " a " + destino);\n        return;\n    }\n    resolverHanoi(n - 1, origen, destino, auxiliar);\n    System.out.println("Mover disco " + n + " de " + origen + " a " + destino);\n    resolverHanoi(n - 1, auxiliar, origen, destino);\n}',
        python:
          'def resolver_hanoi(n: int, origen: str, auxiliar: str, destino: str) -> None:\n    if n == 1:\n        print(f"Mover disco 1 de {origen} a {destino}")\n        return\n    resolver_hanoi(n - 1, origen, destino, auxiliar)\n    print(f"Mover disco {n} de {origen} a {destino}")\n    resolver_hanoi(n - 1, auxiliar, origen, destino)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: HANOI_COMPLEXITY_DATA,
  },
  {
    id: 'm2-torres-hanoi-code',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torres de Hanoi: Implementación Java',
    conceptSubtitle: 'Permutación de Postes en Invocaciones Consecutivas',
    badgeLabel: '4. Código Fuente',
    slideKind: 'code',
    partIndex: 4,
    totalParts: 5,
    codeSnippet: {
      title: 'TowersOfHanoiSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO Hanoi (n: entero, A: poste, B: poste, C: poste)\n    si n == 1 entonces\n        mover A -> C\n    sino\n        Hanoi(n - 1, A, C, B)\n        mover A -> C\n        Hanoi(n - 1, B, A, C)\n    fin si',
        java:
          'public static void resolverHanoi(int n, char origen, char auxiliar, char destino) {\n    if (n == 1) {\n        System.out.println("Mover disco 1 de " + origen + " a " + destino);\n        return;\n    }\n    resolverHanoi(n - 1, origen, destino, auxiliar);\n    System.out.println("Mover disco " + n + " de " + origen + " a " + destino);\n    resolverHanoi(n - 1, auxiliar, origen, destino);\n}',
        python:
          'def resolver_hanoi(n: int, origen: str, auxiliar: str, destino: str) -> None:\n    if n == 1:\n        print(f"Mover disco 1 de {origen} a {destino}")\n        return\n    resolver_hanoi(n - 1, origen, destino, auxiliar)\n    print(f"Mover disco {n} de {origen} a {destino}")\n    resolver_hanoi(n - 1, auxiliar, origen, destino)',
      },
      preferredLanguage: 'java',
    },
    complexityData: HANOI_COMPLEXITY_DATA,
  },
  {
    id: 'm2-torres-hanoi-complexity',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Torres de Hanoi: Análisis de Complejidad',
    conceptSubtitle: 'Doble Ramificación por Sustracción y Costo Exponencial 2^n',
    badgeLabel: '5. Complejidad y Recurrencia',
    slideKind: 'complexity',
    partIndex: 5,
    totalParts: 5,
    codeSnippet: {
      title: 'TowersOfHanoiSolver.java',
      snippets: {
        pseudocode:
          'ALGORITMO Hanoi (n: entero, A: poste, B: poste, C: poste)\n    ...\n    Hanoi(n - 1, A, C, B)\n    mover A -> C\n    Hanoi(n - 1, B, A, C)',
        java:
          'public static void resolverHanoi(int n, char origen, char auxiliar, char destino) {\n    if (n == 1) {\n        System.out.println("Mover disco 1 de " + origen + " a " + destino);\n        return;\n    }\n    resolverHanoi(n - 1, origen, destino, auxiliar);\n    System.out.println("Mover disco " + n + " de " + origen + " a " + destino);\n    resolverHanoi(n - 1, auxiliar, origen, destino);\n}',
        python:
          'def resolver_hanoi(n: int, origen: str, auxiliar: str, destino: str) -> None:\n    ...\n    resolver_hanoi(n - 1, auxiliar, origen, destino)',
      },
      preferredLanguage: 'java',
    },
    complexityData: HANOI_COMPLEXITY_DATA,
  },

  {
    id: 'm2-fibonacci-patologia-theory',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Fibonacci Recursivo: Ineficiencia por Solapamiento',
    conceptSubtitle: 'Patología de Subproblemas No Disjuntos · Puente hacia Programación Dinámica',
    badgeLabel: '1. Fundamento Teórico',
    slideKind: 'theory',
    partIndex: 1,
    totalParts: 4,
    theoryData: {
      summary:
        'Contraejemplo de diseño algorítmico donde la violación de la independencia de subproblemas degrada la recursión a una explosión combinatoria evitable.',
      bulletPoints: [
        'Violación de independencia: Evaluar F(n) = F(n-1) + F(n-2) provoca que las ramas calculen exactamente los mismos subestados una y otra vez.',
        'Recálculo masivo e inútil: Para calcular F(7), el subárbol F(5) se evalúa 2 veces, F(4) 3 veces, F(3) 5 veces y los casos base decenas de veces.',
        'Árbol de llamadas redundante: El número total de nodos en el árbol de recursión coincide con los números de Fibonacci, acotado por Theta(phi^n) con phi ≈ 1.618.',
        'Puente hacia Programación Dinámica: Esta patología justifica la necesidad de memorizar o tabular resultados para reducir el costo de Theta(2^n) a Theta(n).',
      ],
      formulas: [
        {
          label: 'Recurrencia de Fibonacci Ingenuo',
          latex:
            'T(n) = T(n - 1) + T(n - 2) + c \\implies \\Theta\\left(\\left(\\frac{1 + \\sqrt{5}}{2}\\right)^n\\right) = \\Theta(\\phi^n) \\approx \\Theta(1.618^n) \\subset O(2^n)',
          description:
            'La recurrencia genera un árbol binario casi completo de profundidad n con crecimiento exponencial del número de operaciones.',
        },
      ],
      keyInsight:
        'Cuando los subproblemas no son disjuntos, aplicar recursión ciega genera árboles redundantes; la solución óptima exige retener estados compartidos en tablas.',
    },
  },
  {
    id: 'm2-fibonacci-patologia-pseudo',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Fibonacci Recursivo: Pseudocódigo',
    conceptSubtitle: 'Estructura Recursiva Directa sin Memorización',
    badgeLabel: '2. Pseudocódigo',
    slideKind: 'pseudocode',
    partIndex: 2,
    totalParts: 4,
    codeSnippet: {
      title: 'Fib(n) -> Entero',
      snippets: {
        pseudocode:
          'ALGORITMO Fib (n: entero) -> entero\n    si n <= 1 entonces\n        devolver n\n    sino\n        devolver Fib(n - 1) + Fib(n - 2)\n    fin si',
        java:
          'public static int fibonacciRecursivo(int n) {\n    if (n <= 1) {\n        return n;\n    }\n    return fibonacciRecursivo(n - 1) + fibonacciRecursivo(n - 2);\n}',
        python:
          'def fibonacci_recursivo(n: int) -> int:\n    if n <= 1:\n        return n\n    return fibonacci_recursivo(n - 1) + fibonacci_recursivo(n - 2)',
      },
      preferredLanguage: 'pseudocode',
    },
    complexityData: FIBONACCI_COMPLEXITY_DATA,
  },
  {
    id: 'm2-fibonacci-patologia-code',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Fibonacci Recursivo: Implementación Java',
    conceptSubtitle: 'Código Canónico para Ilustración de Patología Asintótica',
    badgeLabel: '3. Código Fuente',
    slideKind: 'code',
    partIndex: 3,
    totalParts: 4,
    codeSnippet: {
      title: 'NaiveFibonacci.java',
      snippets: {
        pseudocode:
          'ALGORITMO Fib (n: entero) -> entero\n    si n <= 1 entonces\n        devolver n\n    sino\n        devolver Fib(n - 1) + Fib(n - 2)\n    fin si',
        java:
          'public static int fibonacciRecursivo(int n) {\n    if (n <= 1) {\n        return n;\n    }\n    return fibonacciRecursivo(n - 1) + fibonacciRecursivo(n - 2);\n}',
        python:
          'def fibonacci_recursivo(n: int) -> int:\n    if n <= 1:\n        return n\n    return fibonacci_recursivo(n - 1) + fibonacci_recursivo(n - 2)',
      },
      preferredLanguage: 'java',
    },
    complexityData: FIBONACCI_COMPLEXITY_DATA,
  },
  {
    id: 'm2-fibonacci-patologia-complexity',
    moduleId: 'module-2-divide-and-conquer',
    moduleTitle: MODULE_2_TITLE,
    conceptTitle: 'Fibonacci Recursivo: Análisis de Complejidad',
    conceptSubtitle: 'Crecimiento Áureo Phi^n y Degradación Exponencial',
    badgeLabel: '4. Complejidad y Recurrencia',
    slideKind: 'complexity',
    partIndex: 4,
    totalParts: 4,
    codeSnippet: {
      title: 'NaiveFibonacci.java',
      snippets: {
        pseudocode:
          'ALGORITMO Fib (n: entero) -> entero\n    ...\n    devolver Fib(n - 1) + Fib(n - 2)',
        java:
          'public static int fibonacciRecursivo(int n) {\n    if (n <= 1) {\n        return n;\n    }\n    return fibonacciRecursivo(n - 1) + fibonacciRecursivo(n - 2);\n}',
        python:
          'def fibonacci_recursivo(n: int) -> int:\n    ...\n    return fibonacci_recursivo(n - 1) + fibonacci_recursivo(n - 2)',
      },
      preferredLanguage: 'java',
    },
    complexityData: FIBONACCI_COMPLEXITY_DATA,
  },
];

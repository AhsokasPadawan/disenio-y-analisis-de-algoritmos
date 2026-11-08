export type RecurrenceKind = 'division' | 'subtraction';

export interface RecurrenceInput {
  kind: RecurrenceKind;
  subproblemCountA: number;
  factorB: number;
  polynomialDegreeK: number;
}

export interface RecurrenceEvaluation {
  formulaLatex: string;
  comparisonLabel: string;
  matchedCaseTitle: string;
  complexityLatex: string;
  explanation: string;
}

const POLYNOMIAL_LATEX_BY_DEGREE: Record<number, string> = {
  0: '\\Theta(1)',
  1: '\\Theta(n)',
};

function formatPolynomialTermLatex(polynomialDegreeK: number): string {
  return POLYNOMIAL_LATEX_BY_DEGREE[polynomialDegreeK] ?? `\\Theta(n^{${polynomialDegreeK}})`;
}

const POWER_OF_N_BY_EXPONENT: Record<number, string> = {
  0: '1',
  1: 'n',
};

function formatPowerOfN(exponent: number): string {
  return POWER_OF_N_BY_EXPONENT[exponent] ?? `n^{${exponent}}`;
}

function evaluateDivisionRecurrence(input: RecurrenceInput): RecurrenceEvaluation {
  const { subproblemCountA, factorB, polynomialDegreeK } = input;
  const safeFactorB = Math.max(2, factorB);
  const safeSubproblemCountA = Math.max(1, subproblemCountA);
  const safeDegreeK = Math.max(0, polynomialDegreeK);
  const criticalThreshold = Math.pow(safeFactorB, safeDegreeK);
  const formulaLatex = `T(n) = ${safeSubproblemCountA}T(n/${safeFactorB}) + ${formatPolynomialTermLatex(safeDegreeK)}`;

  if (safeSubproblemCountA < criticalThreshold) {
    return {
      formulaLatex,
      comparisonLabel: `a = ${safeSubproblemCountA} < b^k = ${criticalThreshold}`,
      matchedCaseTitle: 'Caso 1 (Domina el costo de combinación): a < b^k',
      complexityLatex: `\\Theta(${formatPowerOfN(safeDegreeK)})`,
      explanation:
        'El trabajo polinómico de dividir y combinar en la raíz domina sobre la ramificación recursiva.',
    };
  }

  if (safeSubproblemCountA === criticalThreshold) {
    const polynomialPart = safeDegreeK === 0 ? '' : `${formatPowerOfN(safeDegreeK)} `;
    return {
      formulaLatex,
      comparisonLabel: `a = ${safeSubproblemCountA} = b^k = ${criticalThreshold}`,
      matchedCaseTitle: 'Caso 2 (Equilibrio recursivo y polinómico): a = b^k',
      complexityLatex: `\\Theta(${polynomialPart}\\log n)`,
      explanation:
        'Cada nivel del árbol recursivo aporta el mismo costo asintótico, multiplicado por la altura logarítmica del árbol.',
    };
  }

  const exactLogExponent = Math.log(safeSubproblemCountA) / Math.log(safeFactorB);
  const isIntegerExponent = Number.isInteger(exactLogExponent);
  const exponentLatex = isIntegerExponent
    ? formatPowerOfN(exactLogExponent)
    : `n^{\\log_{${safeFactorB}} ${safeSubproblemCountA}}`;

  return {
    formulaLatex,
    comparisonLabel: `a = ${safeSubproblemCountA} > b^k = ${criticalThreshold}`,
    matchedCaseTitle: 'Caso 3 (Dominan las hojas del árbol recursivo): a > b^k',
    complexityLatex: `\\Theta(${exponentLatex})`,
    explanation:
      'La cantidad de subproblemas crece más rápido que la reducción del tamaño de entrada; el peso asintótico se concentra en las hojas.',
  };
}

function evaluateSubtractionRecurrence(input: RecurrenceInput): RecurrenceEvaluation {
  const { subproblemCountA, factorB, polynomialDegreeK } = input;
  const safeFactorB = Math.max(1, factorB);
  const safeDegreeK = Math.max(0, polynomialDegreeK);
  const formulaLatex = `T(n) = ${subproblemCountA}T(n - ${safeFactorB}) + ${formatPolynomialTermLatex(safeDegreeK)}`;

  if (subproblemCountA < 1) {
    return {
      formulaLatex,
      comparisonLabel: `a = ${subproblemCountA} < 1`,
      matchedCaseTitle: 'Caso 1 (Decaimiento geométrico): a < 1',
      complexityLatex: `\\Theta(${formatPowerOfN(safeDegreeK)})`,
      explanation:
        'El factor recursivo menor a 1 hace converger la serie geométrica, quedando dominado por el término polinómico inicial.',
    };
  }

  if (subproblemCountA === 1) {
    const resultingExponent = safeDegreeK + 1;
    return {
      formulaLatex,
      comparisonLabel: 'a = 1',
      matchedCaseTitle: 'Caso 2 (Reducción lineal de subproblemas): a = 1',
      complexityLatex: `\\Theta(${formatPowerOfN(resultingExponent)})`,
      explanation:
        'Se acumulan n/b llamadas lineales de costo polinómico n^k, incrementando en una unidad el grado del polinomio.',
    };
  }

  const polynomialPrefix = safeDegreeK === 0 ? '' : `${formatPowerOfN(safeDegreeK)} `;
  return {
    formulaLatex,
    comparisonLabel: `a = ${subproblemCountA} > 1`,
    matchedCaseTitle: 'Caso 3 (Explosión exponencial): a > 1',
    complexityLatex: `\\Theta(${polynomialPrefix}${subproblemCountA}^{n/${safeFactorB}})`,
    explanation:
      'Cada paso genera múltiples ramas de profundidad lineal n/b, produciendo un árbol de estados de crecimiento exponencial.',
  };
}

const RECURRENCE_EVALUATOR_BY_KIND: Record<
  RecurrenceKind,
  (input: RecurrenceInput) => RecurrenceEvaluation
> = {
  division: evaluateDivisionRecurrence,
  subtraction: evaluateSubtractionRecurrence,
};

export function evaluateRecurrence(input: RecurrenceInput): RecurrenceEvaluation {
  const evaluator = RECURRENCE_EVALUATOR_BY_KIND[input.kind];
  return evaluator(input);
}

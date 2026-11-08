import { describe, expect, it } from 'vitest';
import { evaluateRecurrence } from './recurrenceEvaluator';

describe('evaluateRecurrence', () => {
  it('evaluates Master Theorem division case when a < b^k', () => {
    const result = evaluateRecurrence({
      kind: 'division',
      subproblemCountA: 1,
      factorB: 2,
      polynomialDegreeK: 2,
    });

    expect(result.matchedCaseTitle).toBe('Caso 1 (Domina el costo de combinación): a < b^k');
    expect(result.complexityLatex).toBe('\\Theta(n^{2})');
    expect(result.comparisonLabel).toBe('a = 1 < b^k = 4');
  });

  it('evaluates Master Theorem division case for MergeSort when a = b^k', () => {
    const result = evaluateRecurrence({
      kind: 'division',
      subproblemCountA: 2,
      factorB: 2,
      polynomialDegreeK: 1,
    });

    expect(result.matchedCaseTitle).toBe('Caso 2 (Equilibrio recursivo y polinómico): a = b^k');
    expect(result.complexityLatex).toBe('\\Theta(n \\log n)');
    expect(result.comparisonLabel).toBe('a = 2 = b^k = 2');
  });

  it('evaluates Master Theorem division case for Binary Search when a = b^k and k = 0', () => {
    const result = evaluateRecurrence({
      kind: 'division',
      subproblemCountA: 1,
      factorB: 2,
      polynomialDegreeK: 0,
    });

    expect(result.matchedCaseTitle).toBe('Caso 2 (Equilibrio recursivo y polinómico): a = b^k');
    expect(result.complexityLatex).toBe('\\Theta(\\log n)');
  });

  it('evaluates Master Theorem division case for Karatsuba when a > b^k', () => {
    const result = evaluateRecurrence({
      kind: 'division',
      subproblemCountA: 3,
      factorB: 2,
      polynomialDegreeK: 1,
    });

    expect(result.matchedCaseTitle).toBe('Caso 3 (Dominan las hojas del árbol recursivo): a > b^k');
    expect(result.complexityLatex).toBe('\\Theta(n^{\\log_{2} 3})');
    expect(result.comparisonLabel).toBe('a = 3 > b^k = 2');
  });

  it('evaluates Subtraction Theorem when a = 1', () => {
    const result = evaluateRecurrence({
      kind: 'subtraction',
      subproblemCountA: 1,
      factorB: 1,
      polynomialDegreeK: 1,
    });

    expect(result.matchedCaseTitle).toBe('Caso 2 (Reducción lineal de subproblemas): a = 1');
    expect(result.complexityLatex).toBe('\\Theta(n^{2})');
  });

  it('evaluates Subtraction Theorem for Towers of Hanoi when a > 1', () => {
    const result = evaluateRecurrence({
      kind: 'subtraction',
      subproblemCountA: 2,
      factorB: 1,
      polynomialDegreeK: 0,
    });

    expect(result.matchedCaseTitle).toBe('Caso 3 (Explosión exponencial): a > 1');
    expect(result.complexityLatex).toBe('\\Theta(2^{n/1})');
  });

  it('evaluates Subtraction Theorem when a < 1', () => {
    const result = evaluateRecurrence({
      kind: 'subtraction',
      subproblemCountA: 0.5,
      factorB: 1,
      polynomialDegreeK: 2,
    });

    expect(result.matchedCaseTitle).toBe('Caso 1 (Decaimiento geométrico): a < 1');
    expect(result.complexityLatex).toBe('\\Theta(n^{2})');
  });
});

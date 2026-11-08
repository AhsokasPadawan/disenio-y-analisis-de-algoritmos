import { describe, expect, it } from 'vitest';
import { tokenizeCode } from './codeSyntaxHighlighter';

describe('codeSyntaxHighlighter', () => {
  it('preserves exact source code characters without losing any characters', () => {
    const pythonCode = 'def calcular(valores: list[int]) -> int:\n    # suma acumulada\n    total = sum(valores)\n    return total';
    const tokens = tokenizeCode(pythonCode, 'python');
    const reconstructed = tokens.map((token) => token.text).join('');
    expect(reconstructed).toBe(pythonCode);
  });

  it('recognizes python comments and keywords', () => {
    const pythonCode = 'def run():\n    # comentario\n    return True';
    const tokens = tokenizeCode(pythonCode, 'python');

    const defToken = tokens.find((t) => t.text === 'def');
    expect(defToken?.colorClass).toContain('text-purple-400');

    const commentToken = tokens.find((t) => t.text.includes('# comentario'));
    expect(commentToken?.colorClass).toContain('text-zinc-500');

    const trueToken = tokens.find((t) => t.text === 'True');
    expect(trueToken?.colorClass).toContain('text-amber-400');
  });

  it('recognizes java types, keywords, and comments', () => {
    const javaCode = 'public static int solver(String[] args) {\n    // test\n    return 42;\n}';
    const tokens = tokenizeCode(javaCode, 'java');

    const publicToken = tokens.find((t) => t.text === 'public');
    expect(publicToken?.colorClass).toContain('text-purple-400');

    const stringToken = tokens.find((t) => t.text === 'String');
    expect(stringToken?.colorClass).toContain('text-sky-400');

    const numberToken = tokens.find((t) => t.text === '42');
    expect(numberToken?.colorClass).toContain('text-amber-300');
  });

  it('recognizes pseudocode keywords and types', () => {
    const pseudoCode = 'Funcion Buscar(vector[1..n]) : Entero\nInicio\n    // comentario\n    Devolver Verdadero\nFin';
    const tokens = tokenizeCode(pseudoCode, 'pseudocode');

    const funcionToken = tokens.find((t) => t.text === 'Funcion');
    expect(funcionToken?.colorClass).toContain('text-purple-400');

    const enteroToken = tokens.find((t) => t.text === 'Entero');
    expect(enteroToken?.colorClass).toContain('text-sky-400');

    const verdaderoToken = tokens.find((t) => t.text === 'Verdadero');
    expect(verdaderoToken?.colorClass).toContain('text-amber-400');
  });
});

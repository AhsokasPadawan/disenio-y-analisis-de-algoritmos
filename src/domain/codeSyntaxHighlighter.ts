export type SupportedCodeLanguage = 'pseudocode' | 'java' | 'python';

export interface CodeToken {
  text: string;
  colorClass: string;
}

const PSEUDOCODE_KEYWORDS = new Set([
  'Funcion',
  'Procedimiento',
  'Inicio',
  'Fin',
  'Si',
  'Entonces',
  'Sino',
  'FinSi',
  'Para',
  'Hasta',
  'Hacer',
  'FinPara',
  'Mientras',
  'FinMientras',
  'Repetir',
  'FinRepetir',
  'Devolver',
  'Bajando',
  'Y',
  'O',
  'DIV',
  'MOD',
  'NO',
  'Caso',
  'Segun',
  'FinSegun',
]);

const PSEUDOCODE_TYPES = new Set([
  'Entero',
  'Booleano',
  'Vector',
  'Matriz',
  'Conjunto',
  'ParCoordenada',
  'Arista',
  'Lista',
  'Pila',
  'Cola',
  'Real',
  'Cadena',
  'Caracter',
]);

const PSEUDOCODE_LITERALS = new Set([
  'Verdadero',
  'Falso',
  'Vacio',
  'INFINITO',
  'NULO',
]);

const JAVA_KEYWORDS = new Set([
  'public',
  'private',
  'protected',
  'static',
  'final',
  'abstract',
  'synchronized',
  'class',
  'interface',
  'record',
  'enum',
  'extends',
  'implements',
  'new',
  'return',
  'if',
  'else',
  'for',
  'while',
  'do',
  'break',
  'continue',
  'switch',
  'case',
  'default',
  'try',
  'catch',
  'finally',
  'throw',
  'throws',
  'import',
  'package',
  'this',
  'super',
  'instanceof',
  'var',
]);

const JAVA_TYPES = new Set([
  'int',
  'long',
  'double',
  'float',
  'boolean',
  'char',
  'byte',
  'short',
  'void',
  'String',
  'Integer',
  'Long',
  'Double',
  'Float',
  'Boolean',
  'Character',
  'List',
  'ArrayList',
  'LinkedList',
  'Map',
  'HashMap',
  'TreeMap',
  'Set',
  'HashSet',
  'TreeSet',
  'Queue',
  'PriorityQueue',
  'Deque',
  'ArrayDeque',
  'Arrays',
  'Collections',
  'Math',
  'Comparable',
  'Comparator',
  'Optional',
]);

const JAVA_LITERALS = new Set(['true', 'false', 'null', 'MAX_VALUE', 'MIN_VALUE']);

const PYTHON_KEYWORDS = new Set([
  'def',
  'return',
  'if',
  'elif',
  'else',
  'for',
  'while',
  'in',
  'not',
  'and',
  'or',
  'is',
  'lambda',
  'pass',
  'break',
  'continue',
  'import',
  'from',
  'as',
  'class',
  'try',
  'except',
  'finally',
  'raise',
  'with',
  'yield',
  'global',
  'nonlocal',
  'assert',
]);

const PYTHON_BUILTINS = new Set([
  'int',
  'float',
  'str',
  'bool',
  'list',
  'dict',
  'set',
  'tuple',
  'bytes',
  'len',
  'range',
  'enumerate',
  'zip',
  'print',
  'min',
  'max',
  'sum',
  'sorted',
  'map',
  'filter',
  'any',
  'all',
  'abs',
  'round',
  'isinstance',
  'type',
  'open',
]);

const PYTHON_LITERALS = new Set(['True', 'False', 'None']);

const LANGUAGE_RULES: Record<
  SupportedCodeLanguage,
  {
    keywords: Set<string>;
    types: Set<string>;
    literals: Set<string>;
    commentPrefix: string;
  }
> = {
  pseudocode: {
    keywords: PSEUDOCODE_KEYWORDS,
    types: PSEUDOCODE_TYPES,
    literals: PSEUDOCODE_LITERALS,
    commentPrefix: '//',
  },
  java: {
    keywords: JAVA_KEYWORDS,
    types: JAVA_TYPES,
    literals: JAVA_LITERALS,
    commentPrefix: '//',
  },
  python: {
    keywords: PYTHON_KEYWORDS,
    types: PYTHON_BUILTINS,
    literals: PYTHON_LITERALS,
    commentPrefix: '#',
  },
};

function resolveWordClass(word: string, language: SupportedCodeLanguage): string {
  const rules = LANGUAGE_RULES[language];
  if (rules.keywords.has(word)) {
    return 'text-purple-400 font-semibold';
  }
  if (rules.types.has(word)) {
    return 'text-sky-400 font-medium';
  }
  if (rules.literals.has(word)) {
    return 'text-amber-400 font-medium';
  }
  if (/^[A-Z][A-Za-z0-9_]*$/.test(word)) {
    return 'text-amber-200';
  }
  return 'text-zinc-100';
}

export function tokenizeCode(
  sourceCode: string,
  language: SupportedCodeLanguage,
): CodeToken[] {
  if (!sourceCode) {
    return [];
  }

  const tokenRegex =
    language === 'python'
      ? /(#[^\r\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|[A-Za-z_][A-Za-z0-9_]*|[^\s\w]|\s+)/g
      : /(\/\/[^\r\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|[A-Za-z_][A-Za-z0-9_]*|[^\s\w]|\s+)/g;

  const rawMatches = sourceCode.match(tokenRegex) ?? [sourceCode];
  const tokens: CodeToken[] = [];

  for (const rawText of rawMatches) {
    if (rawText.startsWith('//') || rawText.startsWith('#')) {
      tokens.push({ text: rawText, colorClass: 'text-zinc-500 italic' });
    } else if (
      (rawText.startsWith('"') && rawText.endsWith('"')) ||
      (rawText.startsWith("'") && rawText.endsWith("'"))
    ) {
      tokens.push({ text: rawText, colorClass: 'text-emerald-300' });
    } else if (/^\d+(?:\.\d+)?$/.test(rawText)) {
      tokens.push({ text: rawText, colorClass: 'text-amber-300' });
    } else if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(rawText)) {
      tokens.push({
        text: rawText,
        colorClass: resolveWordClass(rawText, language),
      });
    } else {
      tokens.push({ text: rawText, colorClass: 'text-zinc-200' });
    }
  }

  return tokens;
}

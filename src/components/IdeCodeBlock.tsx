import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { CodeLanguage, CodeSnippetsByLanguage } from '../domain/courseTypes';
import { SectionTheme } from '../domain/sectionThemes';

interface IdeCodeBlockProps {
  title: string;
  snippets: CodeSnippetsByLanguage;
  initialLanguage?: CodeLanguage;
  sectionTheme?: SectionTheme;
}

interface LanguageOption {
  id: CodeLanguage;
  label: string;
  fileExtension: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: 'pseudocode', label: 'Pseudocódigo', fileExtension: '' },
  { id: 'java', label: 'Java', fileExtension: 'Solver.java' },
  { id: 'python', label: 'Python', fileExtension: 'solver.py' },
];

const RESERVED_KEYWORDS = new Set([
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
  'public',
  'private',
  'static',
  'class',
  'interface',
  'record',
  'return',
  'if',
  'else',
  'for',
  'while',
  'break',
  'continue',
  'new',
  'import',
  'def',
  'from',
  'in',
  'range',
  'and',
  'or',
  'not',
  'lambda',
]);

const TYPE_IDENTIFIERS = new Set([
  'Entero',
  'Booleano',
  'Vector',
  'ConjuntoAristas',
  'ParCoordenada',
  'int',
  'long',
  'float',
  'boolean',
  'void',
  'String',
  'Integer',
  'List',
  'ArrayList',
  'Arrays',
  'Math',
  'Comparator',
  'IntUnaryOperator',
  'Protocol',
  'Callable',
  'dict',
  'list',
  'tuple',
  'str',
  'bool',
]);

const CONSTANT_LITERALS = new Set([
  'Verdadero',
  'Falso',
  'Vacio',
  'INFINITO',
  'true',
  'false',
  'null',
  'True',
  'False',
  'None',
  'MAX_VALUE',
  'MIN_VALUE',
]);

function classifyTokenColorClass(token: string): string {
  if (RESERVED_KEYWORDS.has(token)) {
    return 'text-purple-400 font-semibold';
  }
  if (TYPE_IDENTIFIERS.has(token)) {
    return 'text-sky-400 font-medium';
  }
  if (CONSTANT_LITERALS.has(token) || /^\d+$/.test(token)) {
    return 'text-emerald-400 font-medium';
  }
  if (/^[A-Z][A-Za-z0-9_]*$/.test(token)) {
    return 'text-amber-300';
  }
  return 'text-zinc-100';
}

function renderHighlightedLine(lineText: string) {
  const segments = lineText.split(/([A-Za-z_][A-Za-z0-9_]*|\d+)/g);
  return segments.map((segment, index) => {
    if (!segment) {
      return null;
    }
    const colorClass = classifyTokenColorClass(segment);
    return (
      <span key={`${index}-${segment}`} className={colorClass}>
        {segment}
      </span>
    );
  });
}

export function IdeCodeBlock({
  title,
  snippets,
  initialLanguage = 'pseudocode',
  sectionTheme,
}: IdeCodeBlockProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>(initialLanguage);
  const [isCopied, setIsCopied] = useState(false);

  const activeCode = snippets[selectedLanguage] ?? '';
  const activeOption =
    LANGUAGE_OPTIONS.find((option) => option.id === selectedLanguage) ?? LANGUAGE_OPTIONS[0];
  const codeLines = activeCode.split(/\r?\n/);

  const handleCopyCode = async () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(activeCode);
      } catch {
        setIsCopied(true);
      }
    }
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1800);
  };

  const activeTabClass = sectionTheme
    ? `${sectionTheme.primaryButtonClass} shadow-xs`
    : 'bg-emerald-400 text-emerald-950 shadow-xs';
  const terminalIconClass = sectionTheme?.analysisAccentTextClass ?? 'text-emerald-400';
  const copyButtonClass = sectionTheme
    ? `inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${sectionTheme.analysisSubcardClass} ${sectionTheme.analysisAccentTextClass} hover:text-white`
    : 'inline-flex items-center gap-1.5 rounded-xl border border-emerald-800 bg-emerald-950 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:border-emerald-500 hover:bg-emerald-900 hover:text-white';

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-lg">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <Terminal className={`h-4 w-4 ${terminalIconClass}`} />
          <span className="text-xs font-semibold text-zinc-300">
            {title}
            {activeOption.fileExtension && (
              <> · <span className="text-sky-400">{activeOption.fileExtension}</span></>
            )}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex rounded-xl border border-zinc-800 bg-zinc-950 p-1"
            role="group"
            aria-label="Selector de lenguaje"
          >
            {LANGUAGE_OPTIONS.map((option) => {
              const isSelected = option.id === selectedLanguage;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedLanguage(option.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    isSelected
                      ? activeTabClass
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleCopyCode}
            className={copyButtonClass}
          >
            {isCopied ? (
              <>
                <Check className={`h-3.5 w-3.5 ${terminalIconClass}`} />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className={`h-3.5 w-3.5 ${terminalIconClass}`} />
                <span>Copiar código</span>
              </>
            )}
          </button>
        </div>
      </div>

      <pre
        aria-label={`Código en ${activeOption.label} para ${title}`}
        className={`flex-1 min-h-0 overflow-auto font-mono ${
          codeLines.length > 20
            ? 'p-2 sm:p-2.5 text-[11px] sm:text-xs leading-5'
            : 'p-4 text-xs leading-relaxed sm:text-sm'
        }`}
      >
        <code className="block min-w-fit">
          {codeLines.map((line, lineIndex) => (
            <div key={lineIndex} className={`flex ${codeLines.length > 20 ? 'leading-5' : 'leading-6'}`}>
              <span className="w-8 sm:w-10 shrink-0 select-none pr-3 sm:pr-4 text-right text-xs text-zinc-600">
                {lineIndex + 1}
              </span>
              <span className="min-w-0 flex-1 whitespace-pre">
                {renderHighlightedLine(line)}
                {line.length === 0 ? '\u00A0' : null}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

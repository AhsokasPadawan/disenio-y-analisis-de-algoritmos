import { useState } from 'react';
import { Check, Copy, Sparkles, Terminal } from 'lucide-react';
import { CodeLanguage, CodeSnippetsByLanguage } from '../domain/courseTypes';
import { SectionTheme } from '../domain/sectionThemes';
import { MathFormula } from './MathFormula';

export interface CodeComplexityAnnotation {
  startLine: number;
  endLine: number;
  asymptoticCost: string;
  label?: string;
  description?: string;
}

interface AnnotatedCodeBlockProps {
  title: string;
  snippets: CodeSnippetsByLanguage;
  annotations?: CodeComplexityAnnotation[];
  initialLanguage?: CodeLanguage;
  showAnnotationsDefault?: boolean;
  sectionTheme?: SectionTheme;
}

interface LanguageOption {
  id: CodeLanguage;
  label: string;
  fileExtension: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: 'java', label: 'Java', fileExtension: 'Solver.java' },
  { id: 'pseudocode', label: 'Pseudocódigo', fileExtension: '' },
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

function renderHighlightedTokens(lineText: string) {
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

function resolveAnnotationForLine(
  lineNumber: number,
  annotations: CodeComplexityAnnotation[],
): CodeComplexityAnnotation | undefined {
  return annotations.find(
    (annotation) => lineNumber >= annotation.startLine && lineNumber <= annotation.endLine,
  );
}

function resolveHighlightStyling(
  lineNumber: number,
  annotation?: CodeComplexityAnnotation,
): string {
  if (!annotation) {
    return 'bg-transparent';
  }

  const isStart = lineNumber === annotation.startLine;
  const isEnd = lineNumber === annotation.endLine;

  if (isStart && isEnd) {
    return 'bg-transparent border-2 border-amber-400 rounded-lg shadow-sm';
  }
  if (isStart) {
    return 'bg-transparent border-t-2 border-l-2 border-r-2 border-amber-400 rounded-t-lg shadow-xs';
  }
  if (isEnd) {
    return 'bg-transparent border-b-2 border-l-2 border-r-2 border-amber-400 rounded-b-lg shadow-xs';
  }
  return 'bg-transparent border-l-2 border-r-2 border-amber-400';
}

function getCodeBlockContainerClass(lineCount: number): string {
  if (lineCount > 22) {
    return 'p-1.5 sm:p-2 text-[10px] sm:text-[11px] leading-[17px]';
  }
  if (lineCount > 16) {
    return 'p-2 sm:p-2.5 text-[11px] sm:text-xs leading-[18px]';
  }
  return 'p-3 text-xs sm:text-sm leading-relaxed';
}

export function AnnotatedCodeBlock({
  title,
  snippets,
  annotations = [],
  initialLanguage = 'java',
  showAnnotationsDefault = true,
  sectionTheme,
}: AnnotatedCodeBlockProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>(initialLanguage);
  const [isCopied, setIsCopied] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(showAnnotationsDefault);

  const activeCode = snippets[selectedLanguage] || snippets.java || snippets.pseudocode || '';
  const activeOption =
    LANGUAGE_OPTIONS.find((option) => option.id === selectedLanguage) || LANGUAGE_OPTIONS[0];
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

  const handleToggleAnnotations = () => {
    setShowAnnotations((previous) => !previous);
  };

  const activeTabClass = sectionTheme
    ? `${sectionTheme.primaryButtonClass} shadow-xs`
    : 'bg-emerald-400 text-emerald-950 shadow-xs';
  const terminalIconClass = sectionTheme?.analysisAccentTextClass ?? 'text-emerald-400';
  const copyButtonClass = sectionTheme
    ? `inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${sectionTheme.analysisSubcardClass} ${sectionTheme.analysisAccentTextClass} hover:text-white`
    : 'inline-flex items-center gap-1.5 rounded-xl border border-emerald-800 bg-emerald-950 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:border-emerald-500 hover:bg-emerald-900 hover:text-white';

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-xl">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <Terminal className={`h-4 w-4 ${terminalIconClass}`} />
          <span className="text-xs sm:text-sm font-semibold text-zinc-200">
            {title}
            {activeOption.fileExtension && (
              <> · <span className="text-sky-400 font-mono">{activeOption.fileExtension}</span></>
            )}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {annotations.length > 0 && (
            <button
              type="button"
              onClick={handleToggleAnnotations}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition ${
                showAnnotations
                  ? 'border-2 border-amber-400 bg-transparent text-amber-300 shadow-sm'
                  : 'border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Bloques de Complejidad Asintótica</span>
            </button>
          )}

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
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Copy className={`h-3.5 w-3.5 ${terminalIconClass}`} />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div
        className={`flex-1 min-h-0 overflow-hidden flex flex-col font-mono ${getCodeBlockContainerClass(
          codeLines.length,
        )}`}
      >
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          {codeLines.map((line, index) => {
            const lineNumber = index + 1;
            const currentAnnotation = showAnnotations
              ? resolveAnnotationForLine(lineNumber, annotations)
              : undefined;
            const highlightClass = resolveHighlightStyling(lineNumber, currentAnnotation);
            const isBadgeLine = currentAnnotation && lineNumber === currentAnnotation.startLine;

            return (
              <div
                key={index}
                className={`group relative flex items-stretch px-2 transition-colors ${highlightClass}`}
              >
                <span className="w-8 sm:w-9 shrink-0 select-none pr-2 sm:pr-3 text-right text-xs text-zinc-500 font-mono">
                  {lineNumber}
                </span>

                <span className="min-w-0 flex-1 whitespace-pre py-0.5">
                  {renderHighlightedTokens(line)}
                  {line.length === 0 ? '\u00A0' : null}
                </span>

                {isBadgeLine && (
                  <div className="shrink-0 flex items-center pl-2 sm:pl-3 self-center">
                    <span className="inline-flex items-center gap-1 rounded-md bg-zinc-950 px-1.5 py-0.5 text-[11px] sm:text-xs font-black font-mono text-amber-300 shadow-md border-2 border-amber-400">
                      <MathFormula
                        expression={currentAnnotation.asymptoticCost}
                        displayMode={false}
                        className="text-amber-300 font-black"
                      />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

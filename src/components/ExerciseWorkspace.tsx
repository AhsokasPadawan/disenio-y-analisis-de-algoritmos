import { useRef, useState } from 'react';
import { Check, Copy, RotateCcw, Terminal } from 'lucide-react';
import {
  SupportedCodeLanguage,
  tokenizeCode,
} from '../domain/codeSyntaxHighlighter';
import {
  loadExerciseUserDraft,
  saveExerciseUserDraft,
} from '../domain/studyPreferencesStorage';
import { ExerciseWhiteboard } from './ExerciseWhiteboard';

interface ExerciseWorkspaceProps {
  exerciseId: string;
  exerciseTitle: string;
}

type WorkspaceTab = 'pseudocode' | 'code' | 'whiteboard';
type CodeTargetLanguage = 'java' | 'python';

function detectCodeLanguage(
  code: string,
  currentLanguage: CodeTargetLanguage,
): CodeTargetLanguage {
  if (/\b(def|elif|lambda|None|True|False)\b/.test(code) && !/\b(public|static|void|class)\b/.test(code)) {
    return 'python';
  }
  if (/\b(public|static|void|System\.out|int\[\]|String)\b/.test(code)) {
    return 'java';
  }
  return currentLanguage;
}

export function ExerciseWorkspace({
  exerciseId,
  exerciseTitle,
}: ExerciseWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('pseudocode');
  const [codeLanguage, setCodeLanguage] = useState<CodeTargetLanguage>('java');
  const [draft, setDraft] = useState(() => loadExerciseUserDraft(exerciseId));
  const [copiedStatus, setCopiedStatus] = useState(false);
  const gutterRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const handlePseudocodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextPseudocode = event.target.value;
    const nextDraft = { ...draft, pseudocode: nextPseudocode };
    setDraft(nextDraft);
    saveExerciseUserDraft(exerciseId, nextDraft);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextCode = event.target.value;
    const nextLanguage = detectCodeLanguage(nextCode, codeLanguage);
    if (nextLanguage !== codeLanguage) {
      setCodeLanguage(nextLanguage);
    }
    const nextDraft = { ...draft, code: nextCode };
    setDraft(nextDraft);
    saveExerciseUserDraft(exerciseId, nextDraft);
  };

  const handleScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollLeft } = event.currentTarget;
    if (gutterRef.current) {
      gutterRef.current.scrollTop = scrollTop;
    }
    if (preRef.current) {
      preRef.current.scrollTop = scrollTop;
      preRef.current.scrollLeft = scrollLeft;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = event.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const originalValue = textarea.value;
      const nextValue = `${originalValue.substring(0, start)}    ${originalValue.substring(end)}`;

      if (activeTab === 'pseudocode') {
        const nextDraft = { ...draft, pseudocode: nextValue };
        setDraft(nextDraft);
        saveExerciseUserDraft(exerciseId, nextDraft);
      } else {
        const nextDraft = { ...draft, code: nextValue };
        setDraft(nextDraft);
        saveExerciseUserDraft(exerciseId, nextDraft);
      }

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleClearDraft = () => {
    const nextDraft =
      activeTab === 'pseudocode'
        ? { ...draft, pseudocode: '' }
        : { ...draft, code: '' };
    setDraft(nextDraft);
    saveExerciseUserDraft(exerciseId, nextDraft);
  };

  const handleCopyCurrentDraft = async () => {
    const textToCopy = activeTab === 'pseudocode' ? draft.pseudocode : draft.code;
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
      } catch {
        setCopiedStatus(true);
      }
    }
    setCopiedStatus(true);
    setTimeout(() => {
      setCopiedStatus(false);
    }, 1800);
  };

  const currentContent = activeTab === 'pseudocode' ? draft.pseudocode : draft.code;
  const currentLanguage: SupportedCodeLanguage =
    activeTab === 'pseudocode' ? 'pseudocode' : codeLanguage;

  const tokens = tokenizeCode(currentContent, currentLanguage);
  const contentLinesCount = currentContent.split('\n').length;
  const totalLineNumbers = Math.max(contentLinesCount + 10, 30);

  return (
    <div className="flex h-full min-h-[320px] flex-1 flex-col overflow-hidden rounded-2xl border border-fuchsia-900/50 bg-zinc-950 text-zinc-100 shadow-md">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-fuchsia-400" />
          <div
            className="inline-flex rounded-xl border border-zinc-800 bg-zinc-950 p-1"
            role="tablist"
            aria-label="Editor de ejercicio"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'pseudocode'}
              onClick={() => setActiveTab('pseudocode')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                activeTab === 'pseudocode'
                  ? 'bg-fuchsia-400 text-fuchsia-950 shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              Pseudocódigo
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'code'}
              onClick={() => setActiveTab('code')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                activeTab === 'code'
                  ? 'bg-fuchsia-400 text-fuchsia-950 shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              Código
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'whiteboard'}
              onClick={() => setActiveTab('whiteboard')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                activeTab === 'whiteboard'
                  ? 'bg-fuchsia-400 text-fuchsia-950 shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              Pizarrón
            </button>
          </div>

          {activeTab === 'code' && (
            <div
              className="inline-flex rounded-xl border border-zinc-800 bg-zinc-900/80 p-0.5"
              role="group"
              aria-label="Lenguaje de código"
            >
              <button
                type="button"
                onClick={() => setCodeLanguage('java')}
                className={`rounded-lg px-2 py-0.5 text-[11px] font-semibold transition ${
                  codeLanguage === 'java'
                    ? 'bg-fuchsia-400 text-fuchsia-950 font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Java
              </button>
              <button
                type="button"
                onClick={() => setCodeLanguage('python')}
                className={`rounded-lg px-2 py-0.5 text-[11px] font-semibold transition ${
                  codeLanguage === 'python'
                    ? 'bg-fuchsia-400 text-fuchsia-950 font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Python
              </button>
            </div>
          )}
        </div>

        {activeTab !== 'whiteboard' && (
          <div className="flex items-center gap-2">
            <span className="hidden text-[11px] font-medium text-fuchsia-400 sm:inline">
              Modo: {currentLanguage}
            </span>

            <button
              type="button"
              onClick={handleCopyCurrentDraft}
              disabled={!currentContent}
              aria-label="Copiar borrador"
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white disabled:opacity-40"
            >
              {copiedStatus ? (
                <>
                  <Check className="h-3 w-3 text-fuchsia-400" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 text-zinc-400" />
                  <span>Copiar</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClearDraft}
              disabled={!currentContent}
              aria-label="Limpiar borrador"
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-400 transition hover:bg-red-950 hover:text-red-300 disabled:opacity-30"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Limpiar</span>
            </button>
          </div>
        )}
      </div>

      {activeTab === 'whiteboard' ? (
        <ExerciseWhiteboard exerciseId={exerciseId} exerciseTitle={exerciseTitle} />
      ) : (
        <div className="flex flex-1 min-h-0 overflow-hidden bg-zinc-950">
          <div
            ref={gutterRef}
            aria-hidden="true"
            className="w-12 shrink-0 select-none overflow-hidden border-r border-zinc-800/80 bg-zinc-900/50 py-3 pr-2.5 text-right font-mono text-xs leading-6 text-zinc-500"
          >
            {Array.from({ length: totalLineNumbers }, (_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>

          <div className="relative flex-1 min-h-0 overflow-hidden font-mono text-xs leading-6 sm:text-sm">
            <pre
              ref={preRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 m-0 overflow-hidden p-3 font-mono text-xs leading-6 whitespace-pre sm:text-sm"
            >
              <code>
                {tokens.map((token, index) => (
                  <span key={index} className={token.colorClass}>
                    {token.text}
                  </span>
                ))}
                {currentContent.endsWith('\n') ? '\u00A0' : null}
              </code>
            </pre>

            <textarea
              value={currentContent}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              onChange={activeTab === 'pseudocode' ? handlePseudocodeChange : handleCodeChange}
              placeholder={
                activeTab === 'pseudocode'
                  ? `// Escribe aquí tu pseudocódigo para "${exerciseTitle}"...\n// Ej: Funcion Resolver(arreglo[0..n-1]) : Entero\n// Inicio\n// ...\n// Fin`
                  : `// Escribe aquí tu código en ${codeLanguage === 'java' ? 'Java' : 'Python'} para "${exerciseTitle}"...`
              }
              aria-label={
                activeTab === 'pseudocode'
                  ? `Área de pseudocódigo para ${exerciseTitle}`
                  : `Área de código en ${codeLanguage} para ${exerciseTitle}`
              }
              className="absolute inset-0 m-0 h-full w-full resize-none overflow-auto bg-transparent p-3 font-mono text-xs leading-6 text-transparent caret-fuchsia-400 placeholder-zinc-600 outline-none whitespace-pre selection:bg-fuchsia-500/30 sm:text-sm"
              spellCheck={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

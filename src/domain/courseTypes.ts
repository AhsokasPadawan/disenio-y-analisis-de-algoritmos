export type ModuleId =
  | 'module-0-prelude'
  | 'module-1-complexity'
  | 'module-2-divide-and-conquer'
  | 'module-3-greedy-and-graphs'
  | 'module-4-dynamic-programming'
  | 'module-5-backtracking-and-bnb'
  | 'module-6-exam-exercises';

export interface OpeningQuoteData {
  quote: string;
  author: string;
  source?: string;
  pedagogicalContext?: string;
}

export type CodeLanguage = 'pseudocode' | 'java' | 'python';

export type ThemeMode = 'emerald-light' | 'emerald-night';

export type ExamParadigmCategory =
  | 'all'
  | 'Complejidad'
  | 'Divide & Conquer'
  | 'Reducción y Conquista'
  | 'Greedy'
  | 'Programación Dinámica'
  | 'Reconstrucción de Decisiones'
  | 'Backtracking / B&B';

export interface CodeSnippetsByLanguage {
  pseudocode: string;
  java: string;
  python: string;
}

export interface ConceptFormulaItem {
  label: string;
  latex: string;
  description: string;
}

export interface ConceptCardItem {
  id: string;
  title: string;
  badgeText: string;
  summary: string;
  bulletPoints: string[];
  formulas?: ConceptFormulaItem[];
}

export interface AlgorithmShowcaseItem {
  id: string;
  name: string;
  paradigmTag: string;
  bestCaseComplexityLatex: string;
  averageCaseComplexityLatex: string;
  worstCaseComplexityLatex: string;
  spaceComplexityLatex: string;
  recurrenceOrEquationLatex: string;
  keyInsight: string;
  stepByStepSummary: string[];
  codeSnippets: CodeSnippetsByLanguage;
}

export interface ModuleMetadata {
  id: ModuleId;
  numberLabel: string;
  sidebarTitle: string;
  headerTitle: string;
  subtitle: string;
  contractTag: string;
  keyTakeaway: string;
}

export interface ModuleStudyData {
  metadata: ModuleMetadata;
  concepts: ConceptCardItem[];
  algorithms: AlgorithmShowcaseItem[];
}

export interface ExamExerciseVisualResource {
  tipo: 'latex' | 'svg' | 'markdown_tabla' | 'mermaid';
  formato: string;
  codigo: string;
}

export interface ExamExerciseItem {
  id: string;
  number: number;
  title: string;
  paradigm: Exclude<ExamParadigmCategory, 'all'>;
  difficultyLabel: string;
  targetComplexityLatex: string;
  sourceOrigin?: 'Parcial' | 'Guía Progra III' | 'Diapositivas';
  problemStatement: string;
  inputOutputExample?: string;
  recursoVisual?: ExamExerciseVisualResource | null;
  conceptualStrategy?: {
    invariantAndIntuition: string;
    keySteps: string[];
    recurrenceOrTransitionLatex: string;
  };
  codeSnippets?: CodeSnippetsByLanguage;
  complexityAnalysis?: {
    temporalLatex: string;
    spatialLatex: string;
    justification: string;
    theoremApplied: string;
  };
}

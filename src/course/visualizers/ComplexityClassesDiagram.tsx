import { useState } from 'react';
import { useSectionTheme } from '../../core/domain/sectionThemes';
import { MathFormula } from '../../core/ui/MathFormula';

type ComplexityHypothesis = 'p_neq_np' | 'p_eq_np';
type ComplexityClassKey = 'P' | 'NPC' | 'NPHard';

interface ProblemExample {
  name: string;
  category: string;
  complexity: string;
  description: string;
}

const PROBLEM_EXAMPLES: Record<ComplexityClassKey, readonly ProblemExample[]> = {
  P: [
    {
      name: '2-SAT',
      category: 'Lógica',
      complexity: 'O(V + E)',
      description: 'Satisfacibilidad con cláusulas de 2 literales mediante componentes fuertemente conexas.',
    },
    {
      name: 'Camino Mínimo (Dijkstra)',
      category: 'Grafos',
      complexity: 'O((V + E) log V)',
      description: 'Cálculo de caminos mínimos en grafos con pesos positivos.',
    },
    {
      name: 'Árbol Generador Mínimo (Kruskal)',
      category: 'Greedy',
      complexity: 'O(E log E)',
      description: 'Construcción del MST con estructura Union-Find.',
    },
  ],
  NPC: [
    {
      name: '3-SAT',
      category: 'Lógica / NPC',
      complexity: 'Exponencial',
      description: 'Satisfacibilidad booleana de 3 literales. Prototipo del Teorema de Cook-Levin.',
    },
    {
      name: 'Suma de Subconjuntos (Subset Sum)',
      category: 'Aritmética / NPC',
      complexity: 'O(2^n) o Seudo-P',
      description: 'Determinar si existe un subconjunto con suma exactamente igual a m.',
    },
    {
      name: 'Viajante de Comercio (TSP - Decisión)',
      category: 'Grafos / NPC',
      complexity: 'O(n! / 2^n)',
      description: 'Determinar si existe un tour cerrado que visita cada ciudad con costo ≤ k.',
    },
  ],
  NPHard: [
    {
      name: 'Problema de la Parada (Halting Problem)',
      category: 'Indecidible',
      complexity: 'No computable',
      description: 'Determinar si un programa arbitrario se detendrá para una entrada dada.',
    },
    {
      name: 'TSP (Optimización)',
      category: 'Optimización',
      complexity: 'Exponencial',
      description: 'Encontrar el circuito hamiltoniano de costo estrictamente mínimo.',
    },
  ],
};

const CLASS_TAB_BUTTONS: readonly {
  id: ComplexityClassKey;
  label: string;
  activeClass: string;
  inactiveClass: string;
}[] = [
  {
    id: 'P',
    label: 'Clase P',
    activeClass: 'bg-sky-500 text-zinc-950 shadow-xs',
    inactiveClass: 'text-sky-600 dark:text-sky-300 hover:bg-sky-500/10',
  },
  {
    id: 'NPC',
    label: 'Clase NPC',
    activeClass: 'bg-amber-400 text-zinc-950 shadow-xs',
    inactiveClass: 'text-amber-700 dark:text-amber-300 hover:bg-amber-500/10',
  },
  {
    id: 'NPHard',
    label: 'NP-Hard',
    activeClass: 'bg-rose-500 text-zinc-950 shadow-xs',
    inactiveClass: 'text-rose-600 dark:text-rose-300 hover:bg-rose-500/10',
  },
];

export function ComplexityClassesDiagram() {
  const sectionTheme = useSectionTheme();
  const [hypothesis, setHypothesis] = useState<ComplexityHypothesis>('p_neq_np');
  const [selectedClass, setSelectedClass] = useState<ComplexityClassKey>('NPC');

  return (
    <div className={`h-full min-h-full flex-1 flex flex-col justify-between gap-3 sm:gap-4 rounded-2xl border p-3.5 sm:p-4 md:p-5 ${sectionTheme.analysisPanelClass}`}>
      <div className={`shrink-0 flex flex-wrap items-center justify-between gap-3 border-b pb-2.5 ${sectionTheme.analysisDividerClass}`}>
        <div className="flex items-center gap-2">
          <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase ${sectionTheme.slideBadgeClass}`}>
            Teoría de la Computación
          </span>
          <h3 className={`text-sm font-bold tracking-wide sm:text-base ${sectionTheme.titleTextClass}`}>
            Diagrama Interactivo de Clases: P, NP, NPC y NP-hard
          </h3>
        </div>

        <div className={`flex items-center gap-1 rounded-xl border p-1 ${sectionTheme.analysisSubcardClass}`}>
          <button
            type="button"
            onClick={() => setHypothesis('p_neq_np')}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              hypothesis === 'p_neq_np'
                ? sectionTheme.primaryButtonClass
                : `${sectionTheme.slideHeaderClass} hover:opacity-80`
            }`}
          >
            Escenario P ≠ NP (Estándar)
          </button>
          <button
            type="button"
            onClick={() => setHypothesis('p_eq_np')}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              hypothesis === 'p_eq_np'
                ? sectionTheme.primaryButtonClass
                : `${sectionTheme.slideHeaderClass} hover:opacity-80`
            }`}
          >
            Hipótesis P = NP
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
        <div className={`lg:col-span-7 flex flex-col items-center justify-center rounded-xl border-2 bg-zinc-950 p-2 sm:p-4 h-full min-h-0 overflow-hidden ${sectionTheme.cardBorderClass}`}>
          <svg
            viewBox="0 0 460 300"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full max-h-full object-contain select-none"
            aria-label="Diagrama de Euler de clases de complejidad"
          >
            {hypothesis === 'p_neq_np' ? (
              <>
                <ellipse
                  cx="230"
                  cy="200"
                  rx="210"
                  ry="90"
                  fill="#059669"
                  fillOpacity="0.12"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <text x="50" y="220" fill="#6ee7b7" fontSize="13" fontWeight="bold">
                  Clase NP
                </text>

                <ellipse
                  cx="150"
                  cy="210"
                  rx="95"
                  ry="60"
                  fill="#0284c7"
                  fillOpacity={selectedClass === 'P' ? 0.45 : 0.22}
                  stroke={selectedClass === 'P' ? '#38bdf8' : '#0284c7'}
                  strokeWidth={selectedClass === 'P' ? 3.5 : 2}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedClass('P')}
                />
                <text
                  x="150"
                  y="215"
                  fill="#e0f2fe"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  Clase P (Tratables)
                </text>

                <ellipse
                  cx="310"
                  cy="175"
                  rx="95"
                  ry="55"
                  fill="#f59e0b"
                  fillOpacity={selectedClass === 'NPC' ? 0.45 : 0.22}
                  stroke={selectedClass === 'NPC' ? '#fbbf24' : '#d97706'}
                  strokeWidth={selectedClass === 'NPC' ? 3.5 : 2}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedClass('NPC')}
                />
                <text
                  x="310"
                  y="180"
                  fill="#fef3c7"
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  NP-Completos (NPC)
                </text>

                <path
                  d="M 120,40 Q 230,-10 340,40 L 420,175 Q 310,120 200,175 Z"
                  fill="#dc2626"
                  fillOpacity={selectedClass === 'NPHard' ? 0.35 : 0.16}
                  stroke={selectedClass === 'NPHard' ? '#f87171' : '#dc2626'}
                  strokeWidth={selectedClass === 'NPHard' ? 3.5 : 2}
                  strokeDasharray={selectedClass === 'NPHard' ? undefined : '4 3'}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedClass('NPHard')}
                />
                <text
                  x="230"
                  y="65"
                  fill="#fca5a5"
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  NP-Hard (Al menos tan difíciles como NPC)
                </text>
              </>
            ) : (
              <>
                <ellipse
                  cx="230"
                  cy="200"
                  rx="180"
                  ry="75"
                  fill="#10b981"
                  fillOpacity={selectedClass === 'P' ? 0.45 : 0.3}
                  stroke={selectedClass === 'P' ? '#6ee7b7' : '#34d399'}
                  strokeWidth={selectedClass === 'P' ? 3.5 : 2.5}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedClass('P')}
                />
                <text
                  x="230"
                  y="195"
                  fill="#ffffff"
                  fontSize="16"
                  fontWeight="extrabold"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  P = NP = NPC (Colapso)
                </text>
                <text
                  x="230"
                  y="220"
                  fill="#a7f3d0"
                  fontSize="12"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  Todo problema verificable es resoluble en tiempo polinomial
                </text>

                <path
                  d="M 100,50 Q 230,0 360,50 L 400,160 Q 230,120 60,160 Z"
                  fill="#dc2626"
                  fillOpacity={selectedClass === 'NPHard' ? 0.35 : 0.2}
                  stroke={selectedClass === 'NPHard' ? '#f87171' : '#dc2626'}
                  strokeWidth={selectedClass === 'NPHard' ? 3.5 : 2}
                  strokeDasharray={selectedClass === 'NPHard' ? undefined : '4 3'}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedClass('NPHard')}
                />
                <text
                  x="230"
                  y="75"
                  fill="#fca5a5"
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                >
                  NP-Hard (Permanecen intactos / Indecidibles)
                </text>
              </>
            )}
          </svg>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between gap-2.5 sm:gap-3 h-full min-h-0">
          <div className={`shrink-0 flex items-center gap-1.5 rounded-xl border p-1 ${sectionTheme.analysisSubcardClass}`}>
            {CLASS_TAB_BUTTONS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedClass(tab.id)}
                className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${
                  selectedClass === tab.id ? tab.activeClass : tab.inactiveClass
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={`flex-1 min-h-0 flex flex-col justify-between rounded-xl border p-3 sm:p-3.5 ${sectionTheme.analysisSubcardClass}`}>
            <div className={`shrink-0 flex items-center justify-between pb-1.5 border-b ${sectionTheme.analysisDividerClass}`}>
              <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${sectionTheme.titleTextClass}`}>
                Problemas Representativos ({selectedClass}):
              </h4>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${sectionTheme.slideBadgeClass}`}>
                {PROBLEM_EXAMPLES[selectedClass].length} casos
              </span>
            </div>

            <div className="flex-1 min-h-0 flex flex-col justify-around gap-2 mt-2">
              {PROBLEM_EXAMPLES[selectedClass].map((problem) => (
                <div
                  key={problem.name}
                  className={`flex-1 min-h-0 flex flex-col justify-center rounded-lg border p-2 sm:p-2.5 text-xs ${sectionTheme.analysisInnerCellClass}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`font-bold text-xs sm:text-sm ${sectionTheme.titleTextClass}`}>{problem.name}</span>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] sm:text-xs font-mono ${sectionTheme.slideBadgeClass}`}>
                      {problem.complexity}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 leading-snug">
                    {problem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`shrink-0 rounded-xl border p-2.5 sm:p-3 text-xs sm:text-sm ${sectionTheme.accentSurfaceClass} ${sectionTheme.strongTextClass}`}>
        <p className={`font-bold mb-1 flex items-center gap-2 ${sectionTheme.slideHeaderClass}`}>
          <span>Concepto de Reducción Polinomial de Karp</span>
          <span className={`font-mono px-2 py-0.5 rounded ${sectionTheme.slideBadgeClass}`}>
            A ≤_P B
          </span>
        </p>
        <p className="leading-relaxed">
          Un problema <MathFormula formula="A" /> se reduce en tiempo polinomial a <MathFormula formula="B" /> si cualquier instancia de <MathFormula formula="A" /> puede transformarse en una instancia equivalente de <MathFormula formula="B" /> en costo polinomial. Si <MathFormula formula="B \in \mathcal{P}" />, entonces <MathFormula formula="A \in \mathcal{P}" />. Si <MathFormula formula="A" /> es NP-completo, entonces <MathFormula formula="B" /> es al menos tan difícil como <MathFormula formula="A" />.
        </p>
      </div>
    </div>
  );
}

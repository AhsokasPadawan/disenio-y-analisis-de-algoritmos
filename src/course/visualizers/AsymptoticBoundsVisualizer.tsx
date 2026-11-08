import { useState } from 'react';
import { useSectionTheme } from '../../core/domain/sectionThemes';
import { MathFormula } from '../../core/ui/MathFormula';

type BoundCurveKey = 'lower' | 'target' | 'upper';

interface BoundCurveConfig {
  key: BoundCurveKey;
  legendLabel: string;
  strokeColor: string;
  strokeWidth: string;
  dotBgClass: string;
  activeTextClass: string;
  computeY: (n: number) => number;
}

const BOUND_CURVES: readonly BoundCurveConfig[] = [
  {
    key: 'lower',
    legendLabel: 'Cota Inferior: c₁·n³ (n³)',
    strokeColor: '#84cc16',
    strokeWidth: '2.5',
    dotBgClass: 'bg-lime-500',
    activeTextClass: 'text-lime-400 opacity-100',
    computeY: (n) => Math.pow(n, 3),
  },
  {
    key: 'target',
    legendLabel: 'Función: 3n³ + 5n² + 7',
    strokeColor: '#38bdf8',
    strokeWidth: '3.5',
    dotBgClass: 'bg-sky-400',
    activeTextClass: 'text-sky-400 opacity-100',
    computeY: (n) => 3 * Math.pow(n, 3) + 5 * Math.pow(n, 2) + 7,
  },
  {
    key: 'upper',
    legendLabel: 'Cota Superior: c₂·n³ (5n³)',
    strokeColor: '#f87171',
    strokeWidth: '2.5',
    dotBgClass: 'bg-rose-400',
    activeTextClass: 'text-rose-400 opacity-100',
    computeY: (n) => 5 * Math.pow(n, 3),
  },
];

const AXIS_TICKS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export function AsymptoticBoundsVisualizer() {
  const sectionTheme = useSectionTheme();
  const [visibleCurves, setVisibleCurves] = useState<Record<BoundCurveKey, boolean>>({
    lower: true,
    target: true,
    upper: true,
  });

  const width = 800;
  const height = 340;
  const paddingLeft = 65;
  const paddingBottom = 40;
  const paddingTop = 20;
  const paddingRight = 30;

  const maxN = 10;
  const maxY = 5 * Math.pow(maxN, 3);

  const scaleX = (n: number) =>
    paddingLeft + (n / maxN) * (width - paddingLeft - paddingRight);
  const scaleY = (y: number) =>
    height - paddingBottom - (y / maxY) * (height - paddingTop - paddingBottom);

  const generatePoints = (fn: (n: number) => number) => {
    const points: string[] = [];
    for (let stepN = 0; stepN <= maxN; stepN += 0.25) {
      points.push(`${scaleX(stepN)},${scaleY(fn(stepN))}`);
    }
    return points.join(' ');
  };

  const thresholdX = scaleX(3);

  const handleToggleCurve = (curveKey: BoundCurveKey) => {
    setVisibleCurves((previous) => ({
      ...previous,
      [curveKey]: !previous[curveKey],
    }));
  };

  return (
    <div className={`flex h-full min-h-0 flex-1 flex-col gap-3 rounded-2xl border p-3.5 sm:p-4 overflow-hidden ${sectionTheme.analysisPanelClass}`}>
      <div className={`shrink-0 rounded-xl border px-4 py-2.5 ${sectionTheme.analysisSubcardClass}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
          <p className={`text-xs sm:text-sm font-black uppercase tracking-wider ${sectionTheme.slideHeaderClass}`}>
            Jerarquía de Crecimiento Asintótico
          </p>
          <div className={`overflow-x-auto text-xs sm:text-sm md:text-base font-mono ${sectionTheme.titleTextClass}`}>
            <MathFormula formula="O(1) \subset O(\log n) \subset O(n) \subset O(n \log n) \subset O(n^2) \subset O(n^3) \subset O(2^n) \subset O(n!) \subset O(n^n)" />
          </div>
        </div>
      </div>

      <div className={`relative flex-1 min-h-0 flex flex-col justify-between overflow-hidden rounded-xl border-2 bg-zinc-950 p-3 shadow-inner ${sectionTheme.cardBorderClass}`}>
        <div className="flex-1 min-h-0 w-full flex items-center justify-center">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-full w-full max-h-[460px] object-contain"
            aria-label="Gráfico cartesiano de cotas asintóticas"
          >
            <rect
              x={thresholdX}
              y={paddingTop}
              width={width - paddingRight - thresholdX}
              height={height - paddingTop - paddingBottom}
              fill="#0ea5e9"
              fillOpacity="0.08"
            />

            <line
              x1={paddingLeft}
              y1={height - paddingBottom}
              x2={width - paddingRight}
              y2={height - paddingBottom}
              stroke="#38bdf8"
              strokeWidth="2"
            />
            <line
              x1={paddingLeft}
              y1={paddingTop}
              x2={paddingLeft}
              y2={height - paddingBottom}
              stroke="#38bdf8"
              strokeWidth="2"
            />

            <line
              x1={thresholdX}
              y1={paddingTop}
              x2={thresholdX}
              y2={height - paddingBottom}
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text
              x={thresholdX + 6}
              y={paddingTop + 14}
              fill="#fbbf24"
              fontSize="11"
              fontWeight="bold"
            >
              n = 3
            </text>

            {BOUND_CURVES.map(
              (curve) =>
                visibleCurves[curve.key] && (
                  <polyline
                    key={curve.key}
                    fill="none"
                    stroke={curve.strokeColor}
                    strokeWidth={curve.strokeWidth}
                    points={generatePoints(curve.computeY)}
                  />
                ),
            )}

            <text
              x={width - paddingRight}
              y={height - paddingBottom + 28}
              fill="#bae6fd"
              fontSize="12"
              fontWeight="bold"
              textAnchor="end"
            >
              Tamaño de Entrada n →
            </text>
            <text
              x={paddingLeft - 10}
              y={paddingTop + 4}
              fill="#bae6fd"
              fontSize="12"
              fontWeight="bold"
              textAnchor="end"
            >
              Tiempo T(n)
            </text>

            {AXIS_TICKS.map((tickN) => (
              <g key={tickN}>
                <line
                  x1={scaleX(tickN)}
                  y1={height - paddingBottom}
                  x2={scaleX(tickN)}
                  y2={height - paddingBottom + 5}
                  stroke="#7dd3fc"
                  strokeWidth="1.5"
                />
                <text
                  x={scaleX(tickN)}
                  y={height - paddingBottom + 20}
                  fill="#bae6fd"
                  fontSize="11"
                  textAnchor="middle"
                >
                  {tickN}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="shrink-0 mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-2 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-4">
            {BOUND_CURVES.map((curve) => (
              <button
                key={curve.key}
                type="button"
                onClick={() => handleToggleCurve(curve.key)}
                className={`flex items-center gap-1.5 font-medium transition cursor-pointer ${
                  visibleCurves[curve.key] ? curve.activeTextClass : 'text-zinc-500 opacity-40'
                }`}
              >
                <span className={`h-3 w-3 rounded-full ${curve.dotBgClass}`} />
                <span>{curve.legendLabel}</span>
              </button>
            ))}
          </div>

          <div className="font-mono text-xs sm:text-sm text-sky-300">
            c₁·n³ ≤ 3n³ + 5n² + 7 ≤ c₂·n³ (para todo n ≥ 3)
          </div>
        </div>
      </div>
    </div>
  );
}

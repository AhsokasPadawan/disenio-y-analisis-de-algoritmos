import { useEffect, useRef, useState } from 'react';
import {
  Circle,
  Download,
  Eraser,
  Minus,
  MoveRight,
  Pencil,
  RotateCcw,
  RotateCw,
  Square,
  Trash2,
} from 'lucide-react';
import {
  loadExerciseWhiteboard,
  saveExerciseWhiteboard,
  WhiteboardElement,
  WhiteboardPoint,
  WhiteboardTool,
} from '../domain/studyPreferencesStorage';

interface ExerciseWhiteboardProps {
  exerciseId: string;
  exerciseTitle: string;
}

const COLOR_PALETTE = [
  { value: '#34d399', name: 'Esmeralda' },
  { value: '#fbbf24', name: 'Ámbar' },
  { value: '#38bdf8', name: 'Cian' },
  { value: '#f87171', name: 'Coral' },
  { value: '#a78bfa', name: 'Púrpura' },
  { value: '#f4f4f5', name: 'Blanco' },
];

const STROKE_WIDTH_OPTIONS = [
  { value: 2, label: 'Fino' },
  { value: 4, label: 'Medio' },
  { value: 8, label: 'Grueso' },
];

function drawPencilStroke(ctx: CanvasRenderingContext2D, element: WhiteboardElement) {
  const points = element.points ?? [];
  if (points.length === 0) return;

  ctx.strokeStyle = element.color;
  ctx.lineWidth = element.strokeWidth;

  if (points.length === 1) {
    ctx.fillStyle = element.color;
    ctx.beginPath();
    ctx.arc(points[0].x, points[0].y, element.strokeWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length - 1; index += 1) {
    const midX = (points[index].x + points[index + 1].x) / 2;
    const midY = (points[index].y + points[index + 1].y) / 2;
    ctx.quadraticCurveTo(points[index].x, points[index].y, midX, midY);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.stroke();
}

function drawEraserStroke(ctx: CanvasRenderingContext2D, element: WhiteboardElement) {
  const points = element.points ?? [];
  if (points.length === 0) return;

  ctx.strokeStyle = '#09090b';
  ctx.lineWidth = element.strokeWidth * 4;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }
  ctx.stroke();
}

function drawRectangle(ctx: CanvasRenderingContext2D, element: WhiteboardElement) {
  const startX = element.startX ?? 0;
  const startY = element.startY ?? 0;
  const endX = element.endX ?? 0;
  const endY = element.endY ?? 0;

  const left = Math.min(startX, endX);
  const top = Math.min(startY, endY);
  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);

  ctx.strokeStyle = element.color;
  ctx.lineWidth = element.strokeWidth;
  ctx.beginPath();
  ctx.rect(left, top, width, height);
  ctx.stroke();
}

function drawCircle(ctx: CanvasRenderingContext2D, element: WhiteboardElement) {
  const startX = element.startX ?? 0;
  const startY = element.startY ?? 0;
  const endX = element.endX ?? 0;
  const endY = element.endY ?? 0;

  const centerX = (startX + endX) / 2;
  const centerY = (startY + endY) / 2;
  const radiusX = Math.abs(endX - startX) / 2;
  const radiusY = Math.abs(endY - startY) / 2;

  ctx.strokeStyle = element.color;
  ctx.lineWidth = element.strokeWidth;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, Math.max(radiusX, 1), Math.max(radiusY, 1), 0, 0, Math.PI * 2);
  ctx.stroke();
}

function drawLine(ctx: CanvasRenderingContext2D, element: WhiteboardElement) {
  const startX = element.startX ?? 0;
  const startY = element.startY ?? 0;
  const endX = element.endX ?? 0;
  const endY = element.endY ?? 0;

  ctx.strokeStyle = element.color;
  ctx.lineWidth = element.strokeWidth;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function drawArrow(ctx: CanvasRenderingContext2D, element: WhiteboardElement) {
  const startX = element.startX ?? 0;
  const startY = element.startY ?? 0;
  const endX = element.endX ?? 0;
  const endY = element.endY ?? 0;

  ctx.strokeStyle = element.color;
  ctx.lineWidth = element.strokeWidth;
  ctx.fillStyle = element.color;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  const angle = Math.atan2(endY - startY, endX - startX);
  const headLength = Math.max(element.strokeWidth * 3.5, 12);

  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - headLength * Math.cos(angle - Math.PI / 6),
    endY - headLength * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    endX - headLength * Math.cos(angle + Math.PI / 6),
    endY - headLength * Math.sin(angle + Math.PI / 6),
  );
  ctx.closePath();
  ctx.fill();
}

const ELEMENT_DRAWERS: Record<
  WhiteboardTool,
  (ctx: CanvasRenderingContext2D, element: WhiteboardElement) => void
> = {
  pencil: drawPencilStroke,
  eraser: drawEraserStroke,
  rectangle: drawRectangle,
  circle: drawCircle,
  arrow: drawArrow,
  line: drawLine,
};

function renderWhiteboardScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  elements: WhiteboardElement[],
  activeElement: WhiteboardElement | null,
) {
  ctx.fillStyle = '#09090b';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(52, 211, 153, 0.08)';
  const gridGap = 24;
  for (let posX = gridGap; posX < width; posX += gridGap) {
    for (let posY = gridGap; posY < height; posY += gridGap) {
      ctx.beginPath();
      ctx.arc(posX, posY, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (const element of elements) {
    ELEMENT_DRAWERS[element.tool](ctx, element);
  }

  if (activeElement) {
    ELEMENT_DRAWERS[activeElement.tool](ctx, activeElement);
  }
}

export function ExerciseWhiteboard({
  exerciseId,
  exerciseTitle,
}: ExerciseWhiteboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [elements, setElements] = useState<WhiteboardElement[]>(() =>
    loadExerciseWhiteboard(exerciseId),
  );
  const [redoStack, setRedoStack] = useState<WhiteboardElement[][]>([]);
  const [selectedTool, setSelectedTool] = useState<WhiteboardTool>('pencil');
  const [selectedColor, setSelectedColor] = useState<string>('#34d399');
  const [selectedStrokeWidth, setSelectedStrokeWidth] = useState<number>(4);
  const [activeDrawingElement, setActiveDrawingElement] =
    useState<WhiteboardElement | null>(null);

  const isDrawingRef = useRef(false);

  const redrawCanvas = (overrideActiveElement?: WhiteboardElement | null) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const targetWidth = Math.floor(rect.width);
    const targetHeight = Math.floor(rect.height);

    if (targetWidth === 0 || targetHeight === 0) return;

    if (canvas.width !== targetWidth * dpr || canvas.height !== targetHeight * dpr) {
      canvas.width = targetWidth * dpr;
      canvas.height = targetHeight * dpr;
      canvas.style.width = `${targetWidth}px`;
      canvas.style.height = `${targetHeight}px`;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    renderWhiteboardScene(
      ctx,
      targetWidth,
      targetHeight,
      elements,
      overrideActiveElement !== undefined ? overrideActiveElement : activeDrawingElement,
    );
  };

  useEffect(() => {
    redrawCanvas();
    const handleResize = () => redrawCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [elements, activeDrawingElement]);

  const getCanvasPointerPosition = (
    event: React.PointerEvent<HTMLCanvasElement>,
  ): WhiteboardPoint => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.round(event.clientX - rect.left),
      y: Math.round(event.clientY - rect.top),
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.button !== 0) return;
    const position = getCanvasPointerPosition(event);
    isDrawingRef.current = true;

    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    if (selectedTool === 'pencil' || selectedTool === 'eraser') {
      const newStroke: WhiteboardElement = {
        id,
        tool: selectedTool,
        color: selectedColor,
        strokeWidth: selectedStrokeWidth,
        points: [position],
      };
      setActiveDrawingElement(newStroke);
      redrawCanvas(newStroke);
    } else {
      const newShape: WhiteboardElement = {
        id,
        tool: selectedTool,
        color: selectedColor,
        strokeWidth: selectedStrokeWidth,
        startX: position.x,
        startY: position.y,
        endX: position.x,
        endY: position.y,
      };
      setActiveDrawingElement(newShape);
      redrawCanvas(newShape);
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !activeDrawingElement) return;
    const position = getCanvasPointerPosition(event);

    if (selectedTool === 'pencil' || selectedTool === 'eraser') {
      const updatedPoints = [...(activeDrawingElement.points ?? []), position];
      const updatedStroke = {
        ...activeDrawingElement,
        points: updatedPoints,
      };
      setActiveDrawingElement(updatedStroke);
      redrawCanvas(updatedStroke);
    } else {
      const updatedShape = {
        ...activeDrawingElement,
        endX: position.x,
        endY: position.y,
      };
      setActiveDrawingElement(updatedShape);
      redrawCanvas(updatedShape);
    }
  };

  const finalizeDrawing = () => {
    if (!isDrawingRef.current || !activeDrawingElement) return;
    isDrawingRef.current = false;

    const nextElements = [...elements, activeDrawingElement];
    setElements(nextElements);
    setActiveDrawingElement(null);
    setRedoStack([]);
    saveExerciseWhiteboard(exerciseId, nextElements);
    redrawCanvas(null);
  };

  const handlePointerUp = () => {
    finalizeDrawing();
  };

  const handlePointerLeave = () => {
    finalizeDrawing();
  };

  const handleUndo = () => {
    if (elements.length === 0) return;
    const lastElement = elements[elements.length - 1];
    const nextElements = elements.slice(0, -1);
    setRedoStack([[lastElement], ...redoStack]);
    setElements(nextElements);
    saveExerciseWhiteboard(exerciseId, nextElements);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const [redoElementBatch, ...remainingRedo] = redoStack;
    const nextElements = [...elements, ...redoElementBatch];
    setRedoStack(remainingRedo);
    setElements(nextElements);
    saveExerciseWhiteboard(exerciseId, nextElements);
  };

  const handleClear = () => {
    if (elements.length === 0) return;
    setRedoStack([elements, ...redoStack]);
    setElements([]);
    saveExerciseWhiteboard(exerciseId, []);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.download = `pizarron-${exerciseId}.png`;
    anchor.href = dataUrl;
    anchor.click();
  };

  const toolIcons: Record<WhiteboardTool, React.ComponentType<{ className?: string }>> = {
    pencil: Pencil,
    rectangle: Square,
    circle: Circle,
    arrow: MoveRight,
    line: Minus,
    eraser: Eraser,
  };

  const toolLabels: Record<WhiteboardTool, string> = {
    pencil: 'Lápiz libre',
    rectangle: 'Rectángulo',
    circle: 'Círculo / Nodo',
    arrow: 'Flecha / Arista dirigida',
    line: 'Línea',
    eraser: 'Borrador',
  };

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900/90 px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5" role="toolbar" aria-label="Herramientas de dibujo">
          {(['pencil', 'rectangle', 'circle', 'arrow', 'line', 'eraser'] as WhiteboardTool[]).map(
            (toolName) => {
              const ToolIcon = toolIcons[toolName];
              const isSelected = selectedTool === toolName;
              return (
                <button
                  key={toolName}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={toolLabels[toolName]}
                  title={toolLabels[toolName]}
                  onClick={() => setSelectedTool(toolName)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                    isSelected
                      ? 'border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-300'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <ToolIcon className="h-4 w-4" />
                </button>
              );
            },
          )}

          <div className="mx-1 h-5 w-px bg-zinc-800" />

          <div className="flex items-center gap-1" role="group" aria-label="Selector de color">
            {COLOR_PALETTE.map((paletteColor) => {
              const isColorSelected = selectedColor === paletteColor.value;
              return (
                <button
                  key={paletteColor.value}
                  type="button"
                  aria-label={`Color ${paletteColor.name}`}
                  title={paletteColor.name}
                  onClick={() => setSelectedColor(paletteColor.value)}
                  className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
                    isColorSelected
                      ? 'border-white ring-2 ring-fuchsia-500/80 scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: paletteColor.value }}
                />
              );
            })}
          </div>

          <div className="mx-1 h-5 w-px bg-zinc-800" />

          <div className="flex items-center gap-1" role="group" aria-label="Grosor de trazo">
            {STROKE_WIDTH_OPTIONS.map((strokeOption) => {
              const isStrokeSelected = selectedStrokeWidth === strokeOption.value;
              return (
                <button
                  key={strokeOption.value}
                  type="button"
                  aria-label={`Grosor ${strokeOption.label}`}
                  title={`Grosor: ${strokeOption.label}`}
                  onClick={() => setSelectedStrokeWidth(strokeOption.value)}
                  className={`flex h-7 px-2 items-center justify-center rounded-md text-xs font-semibold border transition ${
                    isStrokeSelected
                      ? 'border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-300'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {strokeOption.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-1.5" role="group" aria-label="Acciones del pizarrón">
          <button
            type="button"
            onClick={handleUndo}
            disabled={elements.length === 0}
            aria-label="Deshacer trazo"
            title="Deshacer trazo"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white disabled:opacity-30"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            aria-label="Rehacer trazo"
            title="Rehacer trazo"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-zinc-700 hover:text-white disabled:opacity-30"
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={elements.length === 0}
            aria-label="Limpiar pizarrón"
            title="Limpiar pizarrón"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:bg-red-950/60 hover:text-red-300 disabled:opacity-30"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Descargar pizarrón como imagen PNG"
            title="Descargar como imagen PNG"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-fuchsia-600 hover:text-fuchsia-300"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 min-h-0 w-full overflow-hidden select-none cursor-crosshair bg-zinc-950"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Pizarrón para bocetar ${exerciseTitle}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          className="touch-none absolute inset-0 block h-full w-full"
        />
      </div>
    </div>
  );
}

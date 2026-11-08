import { useState } from 'react';
import { ChevronDown, GraduationCap, Moon, PanelLeftClose, PanelLeftOpen, Search, Sun } from 'lucide-react';
import { MODULE_NAVIGATION_LIST } from '../data/courseModulesData';
import { ExamParadigmCategory, ModuleId, ThemeMode } from '../domain/courseTypes';
import { MODULE_SUBTOPICS_LOOKUP, ModuleSubtopicItem } from '../domain/moduleSubtopicsData';
import { SECTION_THEMES } from '../domain/sectionThemes';

interface StudySidebarProps {
  activeModuleId: ModuleId;
  activeSlideId?: string;
  activeSubtopicId?: string;
  activeExerciseParadigm?: ExamParadigmCategory;
  completedItemIds: string[];
  progressPercentage: number;
  themeMode: ThemeMode;
  isCollapsed: boolean;
  onSelectModule: (moduleId: ModuleId) => void;
  onSelectSubtopic?: (
    moduleId: ModuleId,
    slideId?: string,
    paradigm?: ExamParadigmCategory,
  ) => void;
  onToggleTheme: () => void;
  onToggleCollapse: () => void;
  onOpenSearch: () => void;
}

export function StudySidebar({
  activeModuleId,
  activeSlideId,
  activeSubtopicId,
  activeExerciseParadigm,
  completedItemIds,
  progressPercentage,
  themeMode,
  isCollapsed,
  onSelectModule,
  onSelectSubtopic,
  onToggleTheme,
  onToggleCollapse,
  onOpenSearch,
}: StudySidebarProps) {
  const [prevActiveModuleId, setPrevActiveModuleId] = useState<ModuleId>(activeModuleId);
  const [openModuleId, setOpenModuleId] = useState<ModuleId | null>(activeModuleId);

  if (prevActiveModuleId !== activeModuleId) {
    setPrevActiveModuleId(activeModuleId);
    setOpenModuleId(activeModuleId);
  }

  const isNight = themeMode === 'emerald-night';
  const activeTheme = SECTION_THEMES[activeModuleId] ?? SECTION_THEMES['module-0-prelude'];
  const theoryModules = MODULE_NAVIGATION_LIST.filter(
    (moduleItem) => moduleItem.id !== 'module-6-exam-exercises',
  );
  const practiceModule =
    MODULE_NAVIGATION_LIST.find((moduleItem) => moduleItem.id === 'module-6-exam-exercises') ??
    MODULE_NAVIGATION_LIST[MODULE_NAVIGATION_LIST.length - 1];

  const handleToggleModuleAccordion = (moduleId: ModuleId) => {
    if (activeModuleId !== moduleId) {
      onSelectModule(moduleId);
      setOpenModuleId(moduleId);
    } else {
      setOpenModuleId((prev) => (prev === moduleId ? null : moduleId));
    }
  };

  const handleSubtopicClick = (
    moduleId: ModuleId,
    subtopic: ModuleSubtopicItem,
  ) => {
    if (onSelectSubtopic) {
      onSelectSubtopic(moduleId, subtopic.slideId, subtopic.paradigm);
    } else {
      onSelectModule(moduleId);
    }
  };

  if (isCollapsed) {
    return (
      <div className="flex h-full w-16 flex-col items-center justify-between border-r border-zinc-200 bg-zinc-100 py-4 px-2 text-zinc-800 transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expandir barra lateral"
            title="Expandir barra lateral"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-200/70 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <PanelLeftOpen className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col items-center gap-2" aria-label="Módulos de la materia">
          {theoryModules.map((moduleItem) => {
            const isActive = moduleItem.id === activeModuleId;
            const isCompleted = completedItemIds.includes(moduleItem.id);
            const theme = SECTION_THEMES[moduleItem.id];
            return (
              <button
                key={moduleItem.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                aria-label={moduleItem.sidebarTitle}
                title={moduleItem.sidebarTitle}
                onClick={() => onSelectModule(moduleItem.id)}
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold transition ${
                  isActive
                    ? theme.sidebarRailActiveClass
                    : 'text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white'
                }`}
              >
                <span>{moduleItem.numberLabel}</span>
                {isCompleted && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-zinc-100 dark:ring-zinc-950"
                  />
                )}
              </button>
            );
          })}

          <div className="my-1 h-px w-8 bg-zinc-300 dark:bg-zinc-800" />

          {(() => {
            const isPracticeActive = practiceModule.id === activeModuleId;
            const isPracticeCompleted = completedItemIds.includes(practiceModule.id);
            const practiceTheme = SECTION_THEMES[practiceModule.id];
            return (
              <button
                type="button"
                aria-current={isPracticeActive ? 'page' : undefined}
                aria-label={practiceModule.sidebarTitle}
                title={`Práctica: ${practiceModule.sidebarTitle}`}
                onClick={() => onSelectModule(practiceModule.id)}
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold transition ${
                  isPracticeActive
                    ? practiceTheme.sidebarRailActiveClass
                    : 'text-fuchsia-800 border border-fuchsia-300 bg-white hover:bg-fuchsia-50 dark:text-fuchsia-200 dark:border-fuchsia-400/40 dark:bg-fuchsia-500/15 dark:hover:bg-fuchsia-500/30'
                }`}
              >
                <span>{practiceModule.numberLabel}</span>
                {isPracticeCompleted && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-zinc-100 dark:ring-zinc-950"
                  />
                )}
              </button>
            );
          })()}
        </nav>

        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Abrir buscador"
            title="Buscar en la materia"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-200/70 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isNight ? 'Activar modo claro' : 'Activar modo nocturno'}
            title={isNight ? 'Cambiar a modo claro' : 'Cambiar a modo nocturno'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-200/70 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            {isNight ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <div
            role="progressbar"
            aria-label="Progreso de repaso"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercentage}
            title={`Progreso de repaso: ${progressPercentage}%`}
            className="flex h-8 w-10 items-center justify-center rounded-lg border border-zinc-300 bg-white text-[11px] font-bold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          >
            {progressPercentage}%
          </div>
        </div>
      </div>
    );
  }

  const renderModuleAccordion = (moduleItem: (typeof MODULE_NAVIGATION_LIST)[number]) => {
    const isActive = moduleItem.id === activeModuleId;
    const isCompleted = completedItemIds.includes(moduleItem.id);
    const isOpen = openModuleId === moduleItem.id;
    const theme = SECTION_THEMES[moduleItem.id];
    const subtopics = MODULE_SUBTOPICS_LOOKUP[moduleItem.id] || [];

    return (
      <div key={moduleItem.id} className="rounded-xl overflow-hidden transition-colors">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-current={isActive ? 'page' : undefined}
          aria-label={moduleItem.sidebarTitle}
          onClick={() => handleToggleModuleAccordion(moduleItem.id)}
          className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
            isActive
              ? theme.sidebarActiveClass
              : 'text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${theme.dotClass}`}
            />
            <span className="truncate">{moduleItem.sidebarTitle}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isCompleted && (
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-amber-400"
              />
            )}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {isOpen && subtopics.length > 0 && (
          <div
            className={`mt-1 ml-3.5 pl-2.5 border-l-2 ${theme.sidebarAccordionBorderClass} flex flex-col gap-0.5 py-1`}
          >
            {subtopics.map((subtopic) => {
              const isSubtopicActive = activeSubtopicId
                ? subtopic.id === activeSubtopicId
                : moduleItem.id === 'module-6-exam-exercises'
                  ? activeExerciseParadigm === subtopic.paradigm
                  : subtopic.slideId === activeSlideId;

              return (
                <button
                  key={subtopic.id}
                  type="button"
                  onClick={() => handleSubtopicClick(moduleItem.id, subtopic)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition ${
                    isSubtopicActive
                      ? theme.subtopicActiveClass
                      : theme.subtopicHoverClass
                  }`}
                >
                  <span className="truncate">{subtopic.title}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full w-72 flex-col gap-4 border-r border-zinc-200 bg-zinc-100 p-4 text-zinc-800 transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-xs ${activeTheme.sidebarActiveClass}`}>
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase truncate dark:text-zinc-400">
              Grado · Ingeniería
            </p>
            <p className="text-sm font-extrabold text-zinc-900 leading-snug dark:text-white">
              Diseño y Análisis de Algoritmos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Abrir buscador"
            title="Buscar en la materia"
            className="flex h-9 w-full items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-200/70 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isNight ? 'Activar modo claro' : 'Activar modo nocturno'}
            title={isNight ? 'Cambiar a modo claro' : 'Cambiar a modo nocturno'}
            className="flex h-9 w-full items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-200/70 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            {isNight ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Colapsar barra lateral"
            title="Colapsar barra lateral"
            className="flex h-9 w-full items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-200/70 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1">
        <div>
          <p className="px-2 pb-1.5 text-[10px] font-bold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            Teoría
          </p>
          <nav className="space-y-1" aria-label="Módulos teóricos">
            {theoryModules.map(renderModuleAccordion)}
          </nav>
        </div>

        <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
          <p className="px-2 pb-1.5 text-[10px] font-bold tracking-wider text-fuchsia-700 uppercase dark:text-fuchsia-300">
            Práctica
          </p>
          <nav aria-label="Módulo de práctica">
            {renderModuleAccordion(practiceModule)}
          </nav>
        </div>
      </div>

      <div className="mt-auto shrink-0 rounded-xl border border-zinc-200 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span id="study-progress-label" className="text-zinc-700 dark:text-zinc-300">
            Progreso de repaso
          </span>
          <span className="text-zinc-900 font-bold dark:text-white">{progressPercentage}%</span>
        </div>
        <div
          role="progressbar"
          aria-labelledby="study-progress-label"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercentage}
          className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${activeTheme.dotClass}`}
            style={{ width: `${progressPercentage}%` }}
            data-progress={progressPercentage}
          />
        </div>
        <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
          Módulos repasados y ejercicios practicados.
        </p>
      </div>
    </div>
  );
}

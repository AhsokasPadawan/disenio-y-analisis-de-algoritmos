import { ReactNode, useRef, useState } from 'react';
import {
  ConceptSlide,
  ExamExerciseItem,
  ExamExerciseVisualResource,
  ExamParadigmCategory,
  ModuleId,
  ModuleMetadata,
  ModuleSubtopicItem,
  ThemeMode,
} from '../domain/coreTypes';
import { SECTION_THEMES } from '../domain/sectionThemes';
import {
  loadCompletedItemIds,
  loadSidebarCollapsedPreference,
  loadThemeMode,
  saveCompletedItemIds,
  saveSidebarCollapsedPreference,
  saveThemeMode,
} from '../domain/studyPreferencesStorage';
import { SearchableStudyEntry } from '../domain/studySearch';
import { GlobalSearchBar } from './GlobalSearchBar';
import { ExamPracticeView } from './practice/ExamPracticeView';
import { WorkspaceCodeTokenizer } from './practice/ExerciseWorkspace';
import { PracticeFilterOption } from './practice/PracticeFilterBar';
import {
  calculateStudyProgressPercentage,
  findFirstModuleSlideIndex,
  findMatchingPracticeExercise,
  resolveSearchSelectionTarget,
} from './shellNavigationHelpers';
import { StudySidebar } from './sidebar/StudySidebar';
import { PresentationSlideView } from './slides/PresentationSlideView';
import { SlideBlockRegistry } from './slides/defaultBlockRegistry';

export interface StudyPlatformShellProps {
  courseTitle?: string;
  courseDepartment?: string;
  modules: readonly ModuleMetadata[];
  subtopicsByModuleId?: Record<ModuleId, readonly ModuleSubtopicItem[]>;
  slides: readonly ConceptSlide[];
  exercises?: readonly ExamExerciseItem[];
  searchIndex: readonly SearchableStudyEntry[];
  trackableItemIds: readonly string[];
  practiceModuleId?: ModuleId;
  practiceHeadingTitle?: string;
  paradigmFilters?: readonly PracticeFilterOption[];
  originFilters?: readonly PracticeFilterOption[];
  courseBlockRegistry?: SlideBlockRegistry;
  resolveActiveSubtopicId?: (
    moduleId: ModuleId,
    moduleSlideIds: string[],
    activeSlideId: string,
    activeExerciseParadigm?: string,
  ) => string | undefined;
  matchesPracticeCategory?: (
    exercise: ExamExerciseItem,
    selectedCategory: ExamParadigmCategory,
  ) => boolean;
  renderExerciseVisualResource?: (
    resource: ExamExerciseVisualResource | null | undefined,
    exerciseId: string,
  ) => ReactNode;
  tokenizeCode?: WorkspaceCodeTokenizer;
}

export function StudyPlatformShell({
  courseTitle,
  courseDepartment,
  modules,
  subtopicsByModuleId = {},
  slides,
  exercises = [],
  searchIndex,
  trackableItemIds,
  practiceModuleId,
  practiceHeadingTitle,
  paradigmFilters,
  originFilters,
  courseBlockRegistry,
  resolveActiveSubtopicId,
  matchesPracticeCategory,
  renderExerciseVisualResource,
  tokenizeCode,
}: StudyPlatformShellProps) {
  const mainScrollContainerRef = useRef<HTMLDivElement>(null);
  const initialModuleId = modules[0]?.id ?? slides[0]?.moduleId ?? 'module-0';
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>(initialModuleId);
  const [completedItemIds, setCompletedItemIds] = useState<string[]>(loadCompletedItemIds);
  const [themeMode, setThemeMode] = useState<ThemeMode>(loadThemeMode);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [selectedPracticeExerciseId, setSelectedPracticeExerciseId] = useState<string>(exercises[0]?.id ?? '');
  const [selectedPracticeParadigm, setSelectedPracticeParadigm] = useState<ExamParadigmCategory>('all');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(loadSidebarCollapsedPreference);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const currentSlide = slides[currentSlideIndex] ?? slides[0];
  const isExamPracticeActive = Boolean(practiceModuleId && activeModuleId === practiceModuleId && exercises.length > 0);

  const resetMainScrollPosition = () => {
    if (mainScrollContainerRef.current) mainScrollContainerRef.current.scrollTop = 0;
    window.scrollTo?.({ top: 0 });
  };

  const handleNavigateSlide = (targetIndex: number) => {
    if (targetIndex >= 0 && targetIndex < slides.length) {
      setCurrentSlideIndex(targetIndex);
      if (slides[targetIndex].moduleId !== activeModuleId) setActiveModuleId(slides[targetIndex].moduleId);
    }
  };

  const slideKeyActions: Record<string, () => void> = {
    ArrowRight: () => handleNavigateSlide(currentSlideIndex + 1),
    ArrowLeft: () => handleNavigateSlide(currentSlideIndex - 1),
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      setIsSearchModalOpen((previous) => !previous);
      return;
    }
    if (isSearchModalOpen) {
      if (event.key === 'Escape') setIsSearchModalOpen(false);
      return;
    }
    const keyAction = slideKeyActions[event.key];
    if (keyAction) {
      event.preventDefault();
      keyAction();
    }
  };

  const handleSelectModule = (moduleId: ModuleId) => {
    setActiveModuleId(moduleId);
    if (moduleId !== practiceModuleId) {
      const firstIndex = findFirstModuleSlideIndex(slides, moduleId);
      if (firstIndex !== -1) setCurrentSlideIndex(firstIndex);
    }
    resetMainScrollPosition();
  };

  const handleSelectSubtopic = (moduleId: ModuleId, slideId?: string, paradigm?: ExamParadigmCategory) => {
    setActiveModuleId(moduleId);
    if (moduleId === practiceModuleId && paradigm) {
      setSelectedPracticeParadigm(paradigm);
      const match = findMatchingPracticeExercise(exercises, paradigm, matchesPracticeCategory);
      if (match) setSelectedPracticeExerciseId(match.id);
    } else if (slideId) {
      const targetIndex = slides.findIndex((slide) => slide.id === slideId);
      if (targetIndex !== -1) setCurrentSlideIndex(targetIndex);
    }
    resetMainScrollPosition();
  };

  const handleSelectSearchEntry = (entry: SearchableStudyEntry) => {
    setIsSearchModalOpen(false);
    setActiveModuleId(entry.moduleId);
    const { targetSlideIndex, targetExerciseId } = resolveSearchSelectionTarget(entry, slides, exercises, practiceModuleId);
    if (targetExerciseId) setSelectedPracticeExerciseId(targetExerciseId);
    if (targetSlideIndex !== undefined) setCurrentSlideIndex(targetSlideIndex);
    resetMainScrollPosition();
  };

  const moduleSlides = slides.filter((slide) => slide.moduleId === currentSlide.moduleId);
  const currentModuleSlideIndex = moduleSlides.findIndex((slide) => slide.id === currentSlide.id);
  const currentPracticeExercise = exercises.find((exercise) => exercise.id === selectedPracticeExerciseId);
  const activeSectionTheme = SECTION_THEMES[activeModuleId];
  const activeSubtopicId = resolveActiveSubtopicId?.(
    activeModuleId,
    moduleSlides.map((slide) => slide.id),
    currentSlide.id,
    isExamPracticeActive ? currentPracticeExercise?.paradigm : undefined,
  );

  return (
    <div
      data-theme={themeMode}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`flex flex-col md:flex-row min-h-screen md:h-screen md:overflow-hidden overflow-y-auto ${activeSectionTheme.pageBgClass} text-zinc-900 transition-colors outline-none dark:text-zinc-100`}
    >
      <aside className={`${isSidebarCollapsed ? 'w-full md:w-16' : 'w-full md:w-72'} shrink-0 md:h-full md:overflow-hidden transition-all duration-300 ease-in-out`}>
        <StudySidebar
          modules={modules}
          subtopicsByModuleId={subtopicsByModuleId}
          practiceModuleId={practiceModuleId}
          courseTitle={courseTitle}
          courseDepartment={courseDepartment}
          activeModuleId={activeModuleId}
          activeSlideId={currentSlide.id}
          activeSubtopicId={activeSubtopicId}
          activeExerciseParadigm={isExamPracticeActive ? currentPracticeExercise?.paradigm : undefined}
          completedItemIds={completedItemIds}
          progressPercentage={calculateStudyProgressPercentage(completedItemIds, trackableItemIds)}
          themeMode={themeMode}
          isCollapsed={isSidebarCollapsed}
          onSelectModule={handleSelectModule}
          onSelectSubtopic={handleSelectSubtopic}
          onToggleTheme={() => {
            const nextTheme: ThemeMode = themeMode === 'emerald-night' ? 'emerald-light' : 'emerald-night';
            setThemeMode(nextTheme);
            saveThemeMode(nextTheme);
          }}
          onToggleCollapse={() => {
            const nextCollapsed = !isSidebarCollapsed;
            setIsSidebarCollapsed(nextCollapsed);
            saveSidebarCollapsedPreference(nextCollapsed);
          }}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col h-full md:overflow-hidden overflow-y-auto">
        <main ref={mainScrollContainerRef} className="animate-fade-slide-in flex-1 min-h-0 flex flex-col p-0 overflow-y-auto md:overflow-hidden">
          {isExamPracticeActive ? (
            <ExamPracticeView
              exercises={exercises}
              completedItemIds={completedItemIds}
              selectedExerciseId={selectedPracticeExerciseId}
              selectedParadigmFilter={selectedPracticeParadigm}
              headingTitle={practiceHeadingTitle}
              practiceModuleId={practiceModuleId}
              paradigmFilters={paradigmFilters}
              originFilters={originFilters}
              matchesCategory={matchesPracticeCategory}
              renderVisualResource={renderExerciseVisualResource}
              tokenizeCode={tokenizeCode}
              onSelectExercise={setSelectedPracticeExerciseId}
              onSelectParadigmFilter={setSelectedPracticeParadigm}
              onToggleCompletedItem={(itemId) => {
                const nextCompleted = completedItemIds.includes(itemId)
                  ? completedItemIds.filter((existingId) => existingId !== itemId)
                  : [...completedItemIds, itemId];
                setCompletedItemIds(nextCompleted);
                saveCompletedItemIds(nextCompleted);
              }}
            />
          ) : (
            <PresentationSlideView
              slide={currentSlide}
              currentSlideIndex={currentSlideIndex}
              totalSlidesCount={slides.length}
              moduleSlideIndex={currentModuleSlideIndex !== -1 ? currentModuleSlideIndex : 0}
              moduleSlidesCount={moduleSlides.length}
              courseBlockRegistry={courseBlockRegistry}
              onNavigatePrevious={() => handleNavigateSlide(currentSlideIndex - 1)}
              onNavigateNext={() => handleNavigateSlide(currentSlideIndex + 1)}
            />
          )}
        </main>
      </div>

      {isSearchModalOpen && (
        <div role="dialog" aria-modal="true" aria-label="Buscador de la materia" onClick={() => setIsSearchModalOpen(false)} className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 backdrop-blur-xs animate-fade-slide-in">
          <div className="w-full max-w-xl" onClick={(event) => event.stopPropagation()}>
            <GlobalSearchBar entries={searchIndex} autoFocus onClose={() => setIsSearchModalOpen(false)} onSelectEntry={handleSelectSearchEntry} />
          </div>
        </div>
      )}
    </div>
  );
}

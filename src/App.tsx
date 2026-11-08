import { useRef, useState } from 'react';
import { MODULE_NAVIGATION_LIST, STUDY_MODULES_BY_ID } from './data/courseModulesData';
import { EXAM_EXERCISES_LIST } from './data/examExercisesData';
import { ExamParadigmCategory, ModuleId, ThemeMode } from './domain/courseTypes';
import { resolveActiveSubtopicId } from './domain/moduleSubtopicsData';
import { SECTION_THEMES } from './domain/sectionThemes';
import { buildCourseDeckSlides, ConceptSlide } from './domain/slideDeckBuilder';
import { SearchableStudyEntry } from './domain/studySearch';
import {
  loadCompletedItemIds,
  loadSidebarCollapsedPreference,
  loadThemeMode,
  saveCompletedItemIds,
  saveSidebarCollapsedPreference,
  saveThemeMode,
} from './domain/studyPreferencesStorage';
import { ExamPracticeView } from './components/ExamPracticeView';
import { GlobalSearchBar } from './components/GlobalSearchBar';
import { PresentationSlideView } from './components/PresentationSlideView';
import { StudySidebar } from './components/StudySidebar';

const COURSE_SLIDE_DECK: ConceptSlide[] = buildCourseDeckSlides();

const TRACKABLE_STUDY_ITEM_IDS: string[] = [
  ...MODULE_NAVIGATION_LIST.map((moduleItem) => moduleItem.id).filter(
    (moduleId) => moduleId in STUDY_MODULES_BY_ID,
  ),
  ...EXAM_EXERCISES_LIST.map((exercise) => exercise.id),
];

function calculateProgressPercentage(completedItemIds: string[]): number {
  const completedTrackableCount = TRACKABLE_STUDY_ITEM_IDS.filter((itemId) =>
    completedItemIds.includes(itemId),
  ).length;
  return Math.round((completedTrackableCount / TRACKABLE_STUDY_ITEM_IDS.length) * 100);
}

export function App() {
  const mainScrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('module-0-prelude');
  const [completedItemIds, setCompletedItemIds] = useState<string[]>(loadCompletedItemIds);
  const [themeMode, setThemeMode] = useState<ThemeMode>(loadThemeMode);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [selectedPracticeExerciseId, setSelectedPracticeExerciseId] = useState<string>(
    EXAM_EXERCISES_LIST[0].id,
  );
  const [selectedPracticeParadigm, setSelectedPracticeParadigm] = useState<ExamParadigmCategory>('all');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(
    loadSidebarCollapsedPreference,
  );
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const currentSlide = COURSE_SLIDE_DECK[currentSlideIndex] ?? COURSE_SLIDE_DECK[0];
  const isExamPracticeActive = activeModuleId === 'module-6-exam-exercises';

  const handleToggleSidebarCollapse = () => {
    const nextCollapsed = !isSidebarCollapsed;
    setIsSidebarCollapsed(nextCollapsed);
    saveSidebarCollapsedPreference(nextCollapsed);
  };

  const handleToggleCompletedItem = (itemId: string) => {
    const nextCompletedItemIds = completedItemIds.includes(itemId)
      ? completedItemIds.filter((existingId) => existingId !== itemId)
      : [...completedItemIds, itemId];
    setCompletedItemIds(nextCompletedItemIds);
    saveCompletedItemIds(nextCompletedItemIds);
  };

  const handleToggleTheme = () => {
    const nextThemeMode: ThemeMode =
      themeMode === 'emerald-night' ? 'emerald-light' : 'emerald-night';
    setThemeMode(nextThemeMode);
    saveThemeMode(nextThemeMode);
  };

  const handleNavigateSlide = (targetIndex: number) => {
    if (targetIndex >= 0 && targetIndex < COURSE_SLIDE_DECK.length) {
      setCurrentSlideIndex(targetIndex);
      const targetSlide = COURSE_SLIDE_DECK[targetIndex];
      if (targetSlide.moduleId !== activeModuleId) {
        setActiveModuleId(targetSlide.moduleId);
      }
    }
  };

  const handleNavigatePreviousSlide = () => {
    handleNavigateSlide(currentSlideIndex - 1);
  };

  const handleNavigateNextSlide = () => {
    handleNavigateSlide(currentSlideIndex + 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      setIsSearchModalOpen((prev) => !prev);
      return;
    }
    if (isSearchModalOpen) {
      if (event.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleNavigateNextSlide();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handleNavigatePreviousSlide();
    }
  };

  const handleSelectModule = (moduleId: ModuleId) => {
    setActiveModuleId(moduleId);
    if (moduleId !== 'module-6-exam-exercises') {
      const firstSlideOfModuleIndex = COURSE_SLIDE_DECK.findIndex(
        (slide) => slide.moduleId === moduleId,
      );
      if (firstSlideOfModuleIndex !== -1) {
        setCurrentSlideIndex(firstSlideOfModuleIndex);
      }
    }
    if (mainScrollContainerRef.current) {
      mainScrollContainerRef.current.scrollTop = 0;
    }
    window.scrollTo?.({ top: 0 });
  };

  const handleSelectSubtopic = (
    moduleId: ModuleId,
    slideId?: string,
    paradigm?: ExamParadigmCategory,
  ) => {
    setActiveModuleId(moduleId);
    if (moduleId === 'module-6-exam-exercises') {
      if (paradigm) {
        setSelectedPracticeParadigm(paradigm);
        const matchingExercise = EXAM_EXERCISES_LIST.find(
          (exercise) =>
            exercise.paradigm === paradigm ||
            (paradigm === 'Divide & Conquer' && exercise.paradigm === 'Reducción y Conquista') ||
            (paradigm === 'Programación Dinámica' && exercise.paradigm === 'Reconstrucción de Decisiones'),
        );
        if (matchingExercise) {
          setSelectedPracticeExerciseId(matchingExercise.id);
        }
      }
    } else if (slideId) {
      const targetIndex = COURSE_SLIDE_DECK.findIndex((slide) => slide.id === slideId);
      if (targetIndex !== -1) {
        setCurrentSlideIndex(targetIndex);
      }
    }
    if (mainScrollContainerRef.current) {
      mainScrollContainerRef.current.scrollTop = 0;
    }
    window.scrollTo?.({ top: 0 });
  };

  const handleSelectSearchEntry = (entry: SearchableStudyEntry) => {
    setIsSearchModalOpen(false);
    setActiveModuleId(entry.moduleId);
    if (entry.moduleId === 'module-6-exam-exercises') {
      const matchingExercise = EXAM_EXERCISES_LIST.find(
        (exercise) =>
          exercise.id === entry.anchorId ||
          exercise.title.toLowerCase().includes(entry.title.toLowerCase()),
      );
      if (matchingExercise) {
        setSelectedPracticeExerciseId(matchingExercise.id);
      }
    } else {
      const matchingSlideIndex = COURSE_SLIDE_DECK.findIndex(
        (slide) =>
          slide.id.startsWith(entry.anchorId) ||
          slide.conceptTitle.toLowerCase().includes(entry.title.toLowerCase()),
      );
      if (matchingSlideIndex !== -1) {
        setCurrentSlideIndex(matchingSlideIndex);
      }
    }
    if (mainScrollContainerRef.current) {
      mainScrollContainerRef.current.scrollTop = 0;
    }
    window.scrollTo?.({ top: 0 });
  };

  const moduleSlides = COURSE_SLIDE_DECK.filter(
    (slide) => slide.moduleId === currentSlide.moduleId,
  );
  const currentModuleSlideIndex = moduleSlides.findIndex(
    (slide) => slide.id === currentSlide.id,
  );
  const moduleSlideIndex = currentModuleSlideIndex !== -1 ? currentModuleSlideIndex : 0;
  const moduleSlidesCount = moduleSlides.length;

  const currentPracticeExercise = EXAM_EXERCISES_LIST.find(
    (exercise) => exercise.id === selectedPracticeExerciseId,
  );
  const activeSectionTheme = SECTION_THEMES[activeModuleId] ?? SECTION_THEMES['module-0-prelude'];
  const activeSubtopicId = resolveActiveSubtopicId(
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
      <aside
        className={`${
          isSidebarCollapsed ? 'w-full md:w-16' : 'w-full md:w-72'
        } shrink-0 md:h-full md:overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <StudySidebar
          activeModuleId={activeModuleId}
          activeSlideId={currentSlide.id}
          activeSubtopicId={activeSubtopicId}
          activeExerciseParadigm={isExamPracticeActive ? currentPracticeExercise?.paradigm : undefined}
          completedItemIds={completedItemIds}
          progressPercentage={calculateProgressPercentage(completedItemIds)}
          themeMode={themeMode}
          isCollapsed={isSidebarCollapsed}
          onSelectModule={handleSelectModule}
          onSelectSubtopic={handleSelectSubtopic}
          onToggleTheme={handleToggleTheme}
          onToggleCollapse={handleToggleSidebarCollapse}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col h-full md:overflow-hidden overflow-y-auto">
        <main
          ref={mainScrollContainerRef}
          className="animate-fade-slide-in flex-1 min-h-0 flex flex-col p-0 overflow-y-auto md:overflow-hidden"
        >
          {isExamPracticeActive ? (
            <ExamPracticeView
              completedItemIds={completedItemIds}
              selectedExerciseId={selectedPracticeExerciseId}
              selectedParadigmFilter={selectedPracticeParadigm}
              onSelectExercise={setSelectedPracticeExerciseId}
              onSelectParadigmFilter={setSelectedPracticeParadigm}
              onToggleCompletedItem={handleToggleCompletedItem}
            />
          ) : (
            <PresentationSlideView
              slide={currentSlide}
              currentSlideIndex={currentSlideIndex}
              totalSlidesCount={COURSE_SLIDE_DECK.length}
              moduleSlideIndex={moduleSlideIndex}
              moduleSlidesCount={moduleSlidesCount}
              onNavigatePrevious={handleNavigatePreviousSlide}
              onNavigateNext={handleNavigateNextSlide}
            />
          )}
        </main>
      </div>

      {isSearchModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Buscador de la materia"
          onClick={() => setIsSearchModalOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 backdrop-blur-xs animate-fade-slide-in"
        >
          <div
            className="w-full max-w-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <GlobalSearchBar
              autoFocus
              onClose={() => setIsSearchModalOpen(false)}
              onSelectEntry={handleSelectSearchEntry}
            />
          </div>
        </div>
      )}
    </div>
  );
}

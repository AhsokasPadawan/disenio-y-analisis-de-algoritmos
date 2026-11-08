import { describe, expect, it } from 'vitest';
import { buildCourseDeckSlides } from './slideDeckBuilder';

describe('buildCourseDeckSlides', () => {
  it('builds a non-empty deck where concepts are partitioned into slides', () => {
    const slides = buildCourseDeckSlides();
    expect(slides.length).toBeGreaterThan(20);

    const firstSlide = slides[0];
    expect(firstSlide.slideKind).toBe('quote');
    expect(firstSlide.conceptTitle).toBeDefined();
    expect(firstSlide.moduleId).toBe('module-0-prelude');
  });

  it('contains pseudocode and code slides with attached complexity data for multi-part algorithms', () => {
    const slides = buildCourseDeckSlides();

    const pseudocodeSlides = slides.filter((slide) => slide.slideKind === 'pseudocode');
    const implementationSlides = slides.filter((slide) => slide.slideKind === 'code');

    expect(pseudocodeSlides.length).toBeGreaterThan(5);
    expect(implementationSlides.length).toBeGreaterThan(5);
    expect(pseudocodeSlides.every((slide) => slide.complexityData !== undefined)).toBe(true);
    expect(implementationSlides.every((slide) => slide.complexityData !== undefined)).toBe(true);
  });

  it('builds complete Module 2 slides including theory, visualizers, code, and complexity', () => {
    const slides = buildCourseDeckSlides();
    const module2Slides = slides.filter((slide) => slide.moduleId === 'module-2-divide-and-conquer');

    expect(module2Slides.length).toBeGreaterThan(50);
    expect(module2Slides[0].slideKind).toBe('quote');

    const expectedVisualizerIds = [
      'binary-search-reduction',
      'mergesort-tree',
      'quicksort-partition',
      'pseudo-m-majority',
      'bridge-fixture',
      'lmps-rmps',
      'hanoi-towers',
    ];

    const visualizerSlides = module2Slides.filter((slide) => slide.slideKind === 'visualizer');
    const presentVisualizerIds = visualizerSlides.map((slide) => slide.visualizerId);

    for (const expectedId of expectedVisualizerIds) {
      expect(presentVisualizerIds).toContain(expectedId);
    }

    const complexitySlides = module2Slides.filter((slide) => slide.slideKind === 'complexity');
    expect(complexitySlides.length).toBe(12);
    expect(
      complexitySlides.every(
        (slide) =>
          slide.complexityData?.annotations !== undefined &&
          slide.complexityData.annotations.length > 0 &&
          slide.codeSnippet !== undefined,
      ),
    ).toBe(true);
  });

  it('builds complete Module 3 slides including theory, visualizers, code, and complexity', () => {
    const slides = buildCourseDeckSlides();
    const module3Slides = slides.filter((slide) => slide.moduleId === 'module-3-greedy-and-graphs');

    expect(module3Slides.length).toBeGreaterThan(50);
    expect(module3Slides[0].slideKind).toBe('quote');
    expect(module3Slides[0].quoteData?.author).toBe('Milton Friedman');

    const expectedVisualizerIds = [
      'coin-change-dp',
      'huffman-tree',
      'dijkstra-graph',
      'prim-vs-kruskal',
    ];

    const visualizerSlides = module3Slides.filter((slide) => slide.slideKind === 'visualizer');
    const presentVisualizerIds = visualizerSlides.map((slide) => slide.visualizerId);

    for (const expectedId of expectedVisualizerIds) {
      expect(presentVisualizerIds).toContain(expectedId);
    }

    const complexitySlides = module3Slides.filter((slide) => slide.slideKind === 'complexity');
    expect(complexitySlides.length).toBe(10);
    expect(
      complexitySlides.every(
        (slide) =>
          slide.complexityData?.annotations !== undefined &&
          slide.complexityData.annotations.length > 0 &&
          slide.codeSnippet !== undefined,
      ),
    ).toBe(true);
  });

  it('builds complete Module 4 slides including theory, visualizers, code, and complexity', () => {
    const slides = buildCourseDeckSlides();
    const module4Slides = slides.filter((slide) => slide.moduleId === 'module-4-dynamic-programming');

    expect(module4Slides.length).toBeGreaterThan(45);
    expect(module4Slides[0].slideKind).toBe('quote');
    expect(module4Slides[0].quoteData?.author).toBe('George Santayana');

    const expectedVisualizerIds = [
      'fibonacci-memo',
      'coin-change-dp',
      'knapsack-01-dp',
      'lcs-table',
      'lis-trace',
      'matrix-chain-dp',
      'floyd-warshall',
    ];

    const visualizerSlides = module4Slides.filter((slide) => slide.slideKind === 'visualizer');
    const presentVisualizerIds = visualizerSlides.map((slide) => slide.visualizerId);

    for (const expectedId of expectedVisualizerIds) {
      expect(presentVisualizerIds).toContain(expectedId);
    }

    const complexitySlides = module4Slides.filter((slide) => slide.slideKind === 'complexity');
    expect(complexitySlides.length).toBe(8);
    expect(
      complexitySlides.every(
        (slide) =>
          slide.complexityData?.annotations !== undefined &&
          slide.complexityData.annotations.length > 0 &&
          slide.codeSnippet !== undefined,
      ),
    ).toBe(true);
  });
});

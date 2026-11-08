import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './App';

beforeEach(() => {
  localStorage.clear();
});

describe('App - Dashboard Navigation and Module Rendering', () => {
  it('renders the fixed sidebar with all modules and defaults to Module 0 with opening quote', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /0\. Preludio y Reglas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /1\. Complejidad y Recurrencias/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /2\. Divide & Conquer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /3\. Greedy y Grafos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /4\. Programación Dinámica/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /5\. Backtracking & Branch and Bound/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /6\. Banco de Ejercicios de Parcial/i })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /0\. Preludio: Encuadre y Reglas/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Aprender a Nadar/i })).toBeInTheDocument();
  });

  it('switches instantaneously between all 6 modules when clicking sidebar navigation items', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /2\. Divide & Conquer/i }));
    expect(screen.getByRole('heading', { name: /Divide & Conquer y Subtract & Conquer/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Esquema General de Divide & Conquer/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /3\. Greedy y Grafos/i }));
    expect(screen.getByRole('heading', { name: /Algoritmos Greedy y Grafos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Componentes Formales de un Algoritmo Greedy/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /4\. Programación Dinámica/i }));
    expect(screen.getByRole('heading', { name: /Programación Dinámica/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Principio de Optimalidad de Bellman y Tabulación Bottom-Up/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /5\. Backtracking & Branch and Bound/i }));
    expect(screen.getByRole('heading', { name: /Backtracking, Branch & Bound y Juegos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Backtracking \(DFS\) vs Ramificación y Poda/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /6\. Banco de Ejercicios de Parcial/i }));
    expect(screen.getByRole('heading', { name: /Banco de Ejercicios de Parcial y Patrones de Examen/i })).toBeInTheDocument();
  });

  it('allows switching between Pseudocódigo, Java, and Python tabs and copying code to clipboard', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Abrir buscador/i }));
    await user.type(screen.getByRole('searchbox', { name: /Buscar en la materia/i }), 'dijkstra');
    await user.click(screen.getByRole('option', { name: /Caminos Mínimos desde un Origen/i }));
    await user.click(screen.getByRole('button', { name: /Diapositiva siguiente/i }));
    await user.click(screen.getByRole('button', { name: /Diapositiva siguiente/i }));

    expect(screen.getAllByText(/^Dijkstra$/i).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: /Diapositiva siguiente/i }));

    const javaTabButtons = screen.getAllByRole('button', { name: /^Java$/i });
    await user.click(javaTabButtons[0]);
    expect(screen.getAllByText(/DijkstraShortestPath/i).length).toBeGreaterThan(0);

    const pythonTabButtons = screen.getAllByRole('button', { name: /^Python$/i });
    await user.click(pythonTabButtons[0]);
    expect(screen.getAllByText(/dijkstra_shortest_paths/i).length).toBeGreaterThan(0);

    const copyButtons = screen.getAllByRole('button', { name: /Copiar código/i });
    await user.click(copyButtons[0]);
    expect(screen.getByRole('button', { name: /¡Copiado!/i })).toBeInTheDocument();
  });

  it('navigates to recurrence equations theory slide when searched', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Abrir buscador/i }));
    await user.type(screen.getByRole('searchbox', { name: /Buscar en la materia/i }), 'recurrencias');
    await user.click(screen.getByRole('option', { name: /Teorema de Recurrencias/i }));

    expect(screen.getAllByRole('heading', { name: /Teorema de Recurrencias: Sustracción y División/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/Recurrencia por Sustracción/i)).toBeInTheDocument();
    expect(screen.getByText(/Teorema Maestro \(División\)/i)).toBeInTheDocument();
  });

  it('allows writing pseudocode and code in exam exercises and persists drafts in localStorage', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.click(screen.getByRole('button', { name: /6\. Banco de Ejercicios de Parcial/i }));

    expect(screen.getByRole('heading', { name: /Pico Estricto en Vector Unimodal/i })).toBeInTheDocument();

    const pseudocodeTextarea = screen.getByRole('textbox', {
      name: /Área de pseudocódigo para Pico Estricto en Vector Unimodal/i,
    });
    await user.type(pseudocodeTextarea, 'Funcion Pico(arreglo)');
    expect(pseudocodeTextarea).toHaveValue('Funcion Pico(arreglo)');

    const codeTab = screen.getByRole('tab', { name: /^Código$/i });
    await user.click(codeTab);

    const codeTextarea = screen.getByRole('textbox', {
      name: /Área de código en java para Pico Estricto en Vector Unimodal/i,
    });
    await user.type(codeTextarea, 'int x = 1;');
    expect(codeTextarea).toHaveValue('int x = 1;');

    const whiteboardTab = screen.getByRole('tab', { name: /^Pizarrón$/i });
    await user.click(whiteboardTab);
    expect(
      screen.getByRole('img', {
        name: /Pizarrón para bocetar Pico Estricto en Vector Unimodal/i,
      }),
    ).toBeInTheDocument();

    unmount();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /6\. Banco de Ejercicios de Parcial/i }));

    const reloadedPseudocodeTextarea = screen.getByRole('textbox', {
      name: /Área de pseudocódigo para Pico Estricto en Vector Unimodal/i,
    });
    expect(reloadedPseudocodeTextarea).toHaveValue('Funcion Pico(arreglo)');

    const exerciseSelect = screen.getByRole('combobox', {
      name: /Seleccionar ejercicio de práctica/i,
    });
    await user.selectOptions(exerciseSelect, 'exam-5-canoes-ctalamochita');
    expect(screen.getByRole('heading', { name: /Alquiler de Canoas en el Río Ctalamochita/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Pico Estricto en Vector Unimodal/i })).not.toBeInTheDocument();
  });

  it('finds algorithms and exam exercises from the global search and jumps to their module', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /Abrir buscador/i }));
    await user.type(screen.getByRole('searchbox', { name: /Buscar en la materia/i }), 'kruskal');
    await user.click(screen.getByRole('option', { name: /Kruskal \(Union-Find\)/i }));
    expect(screen.getByRole('heading', { name: /Algoritmos Greedy y Grafos/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Abrir buscador/i }));
    await user.type(screen.getByRole('searchbox', { name: /Buscar en la materia/i }), 'canoas');
    await user.click(screen.getByRole('option', { name: /Alquiler de Canoas en el Río Ctalamochita/i }));
    expect(screen.getByRole('heading', { name: /Banco de Ejercicios de Parcial y Patrones de Examen/i })).toBeInTheDocument();
  });

  it('tracks study progress across exam exercises and keeps it after reloading', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    expect(screen.getByRole('progressbar', { name: /Progreso de repaso/i })).toHaveAttribute('aria-valuenow', '0');

    await user.click(screen.getByRole('button', { name: /6\. Banco de Ejercicios de Parcial/i }));
    await user.click(screen.getByRole('button', { name: /Marcar ejercicio Pico Estricto en Vector Unimodal como practicado/i }));

    expect(screen.getByRole('progressbar', { name: /Progreso de repaso/i })).toHaveAttribute('aria-valuenow', '1');

    unmount();
    render(<App />);

    expect(screen.getByRole('progressbar', { name: /Progreso de repaso/i })).toHaveAttribute('aria-valuenow', '1');
    await user.click(screen.getByRole('button', { name: /6\. Banco de Ejercicios de Parcial/i }));
    expect(screen.getByRole('button', { name: /Ejercicio practicado/i })).toBeInTheDocument();
  });

  it('switches between Tablero Esmeralda light and night themes and remembers the choice', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.click(screen.getByRole('button', { name: /Activar modo nocturno/i }));
    expect(screen.getByRole('button', { name: /Activar modo claro/i })).toBeInTheDocument();

    unmount();
    render(<App />);

    expect(screen.getByRole('button', { name: /Activar modo claro/i })).toBeInTheDocument();
  });

  it('navigates through full-screen slides using presentation buttons and keyboard arrows', async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    expect(screen.getByRole('heading', { name: /Aprender a Nadar/i })).toBeInTheDocument();

    const appRoot = container.firstElementChild as HTMLElement;
    appRoot.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('heading', { name: /Las Reglas del Juego/i })).toBeInTheDocument();

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('heading', { name: /Aprender a Nadar/i })).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /Diapositiva siguiente/i });
    await user.click(nextBtn);
    expect(screen.getByRole('heading', { name: /Las Reglas del Juego/i })).toBeInTheDocument();
  });

  it('collapses the sidebar to a compact rail and expands it back, persisting choice', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    const collapseBtn = screen.getByRole('button', { name: /Colapsar barra lateral/i });
    await user.click(collapseBtn);

    const expandBtn = screen.getByRole('button', { name: /Expandir barra lateral/i });
    expect(expandBtn).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /3\. Greedy y Grafos/i }));
    expect(screen.getByRole('heading', { name: /Algoritmos Greedy y Grafos/i })).toBeInTheDocument();

    unmount();
    render(<App />);

    expect(screen.getByRole('button', { name: /Expandir barra lateral/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Expandir barra lateral/i }));
    expect(screen.getByRole('button', { name: /Colapsar barra lateral/i })).toBeInTheDocument();
  });

  it('allows opening the whiteboard in exam exercises with tools and canvas', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.click(screen.getByRole('button', { name: /6\. Banco de Ejercicios de Parcial/i }));

    const whiteboardTabs = screen.getAllByRole('tab', { name: /Pizarrón/i });
    await user.click(whiteboardTabs[0]);

    const whiteboardToolbar = screen.getByRole('toolbar', { name: /Herramientas de dibujo/i });
    expect(whiteboardToolbar).toBeInTheDocument();
    expect(within(whiteboardToolbar).getByRole('button', { name: /Lápiz libre/i })).toBeInTheDocument();
    expect(within(whiteboardToolbar).getByRole('button', { name: /Rectángulo/i })).toBeInTheDocument();
    expect(within(whiteboardToolbar).getByRole('button', { name: /Círculo/i })).toBeInTheDocument();
    expect(within(whiteboardToolbar).getByRole('button', { name: /Flecha/i })).toBeInTheDocument();
    expect(within(whiteboardToolbar).getByRole('button', { name: /Línea/i })).toBeInTheDocument();
    expect(within(whiteboardToolbar).getByRole('button', { name: /Borrador/i })).toBeInTheDocument();

    const rectangleBtn = within(whiteboardToolbar).getByRole('button', { name: /Rectángulo/i });
    await user.click(rectangleBtn);
    expect(rectangleBtn).toHaveAttribute('aria-pressed', 'true');

    const canvas = screen.getByRole('img', { name: /Pizarrón para bocetar/i });
    expect(canvas).toBeInTheDocument();

    unmount();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /6\. Banco de Ejercicios de Parcial/i }));
    const reloadedWhiteboardTabs = screen.getAllByRole('tab', { name: /Pizarrón/i });
    await user.click(reloadedWhiteboardTabs[0]);
    expect(screen.getByRole('img', { name: /Pizarrón para bocetar/i })).toBeInTheDocument();
  });

  it('renders extended sidebar header with 3 buttons side-by-side and displays vertical accordion subtopics', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText('Diseño y Análisis de Algoritmos')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Abrir buscador/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Activar modo (claro|nocturno)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Colapsar barra lateral/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Aprender a Nadar \(Contrato\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reglas de Cursada y Exámenes/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Reglas de Cursada y Exámenes/i }));
    expect(screen.getByRole('heading', { name: /Las Reglas del Juego/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /1\. Complejidad y Recurrencias/i }));
    expect(screen.getByRole('button', { name: /Notaciones Asintóticas/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Notaciones Asintóticas/i }));
    expect(screen.getByRole('heading', { name: /Definiciones Matemáticas Formales: O, Omega y Theta/i })).toBeInTheDocument();
  });

  it('shows topic-relative slide numbering for theory slides and exercise number for exercises', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText('Diapositiva #1')).toBeInTheDocument();
    expect(screen.getByText('Diapositiva 1 / 4')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /6\. Banco de Ejercicios de Parcial/i }));
    expect(screen.queryByText(/Diapositiva #/i)).not.toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Pico Estricto en Vector Unimodal/i })).toBeInTheDocument();
  });
});

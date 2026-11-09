# Plataforma Interactiva de Estudio — Diseño y Análisis de Algoritmos

Plataforma web de estudio, consulta y práctica interactiva para la materia **Diseño y Análisis de Algoritmos** (Grado en Ingeniería · UADE).

---

## Objetivo del Proyecto

Transformar el material teórico y práctico de la cátedra en un entorno digital interactivo y accesible desde computadoras y teléfonos móviles:

* **Estudio Teórico Riguroso:** Diapositivas conceptuales con soporte tipográfico formal en LaTeX (KaTeX), teoremas, principios de invarianza y desgloses de complejidad asintótica.
* **Visualizadores Paso a Paso:** Simuladores interactivos con control de reproducción temporal para algoritmos fundamentales:
  * Divide & Conquer: MergeSort, QuickSort, Búsqueda Binaria, Mayoría Pseudo-M.
  * Algoritmos Greedy: Dijkstra, Prim vs. Kruskal, Árboles de Huffman.
  * Programación Dinámica: Fibonacci memoizado, Cambio de Monedas, Mochila 0/1, Floyd-Warshall, LCS, LIS, Producto de Cadena de Matrices.
  * Backtracking y Branch & Bound: N-Reinas, Suma de Subconjuntos, Asignación de Tareas, Mochila B&B, MinMax con poda Alfa-Beta.
* **Taller Práctico de Exámenes:** Banco de ejercicios recopilados de parciales y guías, con enunciados completos, resoluciones propuestas, filtros por técnica algorítmica y pizarra interactiva (whiteboard).
* **Experiencia Multiplataforma:** Modo presentación slide-by-slide para escritorio y feed continuo optimizado para lectura y navegación en dispositivos móviles.

---

## Estructura del Proyecto

El código fuente está organizado en dos capas principales:

```text
src/
├── core/                        # Motor de la plataforma
│   ├── domain/                  # Modelos de dominio, procesador de datos JSON, preferencias y búsqueda
│   └── ui/                      # Shell principal, barra lateral, drawer móvil, visor de diapositivas y pizarra
└── course/                      # Contenido específico de Diseño y Análisis de Algoritmos
    ├── components/              # Bloques de contenido especializado (código anotado, simulador de recurrencias)
    ├── data/                    # Módulos del curso (0 a 6), diapositivas curadas y banco de ejercicios
    └── visualizers/             # Visualizadores interactivos algorítmicos paso a paso

teoria/                          # Fuentes teóricas estructuradas por unidad temática en JSON
ejercicios/                      # Banco de consignas de parciales y guías prácticas en JSON
```

---

## Cómo Correr el Proyecto

### Requisitos Previos

* **Node.js** 18 o superior
* **npm**

### Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación quedará disponible en el navegador (por defecto en `http://localhost:5173/`).

### Pruebas Automatizadas

```bash
# Ejecutar suite de pruebas unitarias
npm test
```

### Compilación para Producción

```bash
# Verificar tipos y generar paquete estático en ./dist
npm run build
```

---

## Despliegue

El proyecto cuenta con un workflow automatizado de CI/CD en [.github/workflows/deploy.yml](.github/workflows/deploy.yml) que compila, testea y publica automáticamente los cambios de la rama `main` en **GitHub Pages**.

# Plataforma Web Interactiva de Estudio — Diseño y Análisis de Algoritmos

Aplicación web interactiva en **React + TypeScript + Vite** que reemplaza las diapositivas estáticas de clase por un entorno de presentación, estudio y práctica con visualizadores paso a paso, bloques de código anotados y pizarrón de ejercicios.

---

## 1. Arquitectura: Core Universal (`src/core/`) vs. Materia (`src/course/`)

El proyecto está dividido en dos capas claramente separadas para que la base pueda reutilizarse en cualquier otra materia universitaria:

```text
src/
├── core/                        # Motor universal reutilizable en cualquier materia (CON TESTS)
│   ├── domain/                  # Contratos base, procesador de JSONs (teoría/ejercicios),
│   │                            # armador de diapositivas, buscador global, temas y storage
│   └── ui/                      # Barra lateral con temas/subtemas, reproductor de slides,
│                                # bloques universales (texto, listas, LaTeX, tablas, callouts),
│                                # buscador global y espacio de práctica con pizarrón
└── course/                      # Contenido y extensiones de la materia actual (VALIDACIÓN VISUAL)
    ├── data/                    # Adaptación de JSONs, mazos de diapositivas curados y ejercicios
    ├── components/              # Bloques específicos (IDE de código, simulador de recurrencias, etc.)
    └── visualizers/             # Visualizadores interactivos paso a paso de algoritmos
```

* **Extensibilidad Híbrida por Lookup Table:** `src/core/ui` renderiza de fábrica los bloques universales de cualquier asignatura y recibe un registro tipado (`Record<BlockKind, Component>`) desde `src/course/` para enchufar componentes específicos de la materia (en Algoritmos: editores de código, visualizadores de grafos/matrices, simuladores; en otra materia: galerías de imágenes, reproductores de video, mapas interactivos).

---

## 2. Flujo de Trabajo para Cargar Teoría y Práctica (2 Fases)

Cada materia tiene particularidades pedagógicas (dobles subtítulos, tablas comparativas, trazas paso a paso). Por eso la carga de contenido sigue un flujo en **dos fases**:

### Fase 1: Extracción Base desde PDFs/Apuntes a `teoria/` y `ejercicios/`
1. A partir de los PDFs o diapositivas originales de la cátedra, se utilizan los **Prompts de Extracción con Gemini** (detallados más abajo) para obtener archivos JSON estructurados.
2. Los archivos generados se guardan en las carpetas raíz:
   * `teoria/teoria_<numero>_<slug>.json`
   * `ejercicios/ejercicios_<tema>.json`
3. El procesador del **Core** (`src/core/domain`) lee esos archivos JSON y construye automáticamente una primera versión funcional de los módulos, subtemas, diapositivas y banco de ejercicios para poder navegar y visualizar todo el contenido desde el primer minuto.

### Fase 2: Curaduría y Refinamiento en `src/course/`
Una vez que la base JSON ya renderiza en pantalla, se itera en `src/course/data/` y `src/course/visualizers/` para:
* Refinar diapositivas que requieran desgloses especiales, dobles subtítulos, notas al pie o anotaciones línea por línea.
* Vincular conceptos o algoritmos con visualizadores interactivos mediante el registro de bloques de la materia.

---

## 3. Templates JSON Esperados (`teoria/` y `ejercicios/`)

### 3.1 Template de Teoría (`teoria/teoria_<n>_<tema>.json`)

```json
{
  "modulo": "01_nombre_modulo",
  "titulo_general": "Nombre de la Materia - Título del Módulo",
  "institucion": "Nombre de la Universidad / Facultad",
  "catedra": "Nombre de la Cátedra",
  "profesor": "Nombre del Profesor",
  "descripcion": "Resumen general de los temas abordados en este módulo.",
  "secciones": [
    {
      "id": "identificador_seccion",
      "tipo": "teoria_formal",
      "titulo": "Título de la Sección Principal",
      "subtemas": [
        {
          "id": "identificador_subtema",
          "titulo": "Título del Concepto o Subtema",
          "teoria": "- **Punto clave 1**: Explicación detallada con soporte para fórmulas LaTeX inline como $O(n \\log n)$.\n- **Punto clave 2**: Segunda viñeta conceptual.",
          "animaciones": null,
          "pseudocodigo": "algoritmo Ejemplo(n : entero) -> entero\n    devolver n + 1",
          "codigo": {
            "lenguaje": "java",
            "codigo_fuente": "public static int ejemplo(int n) {\n    return n + 1;\n}",
            "correcciones_realizadas": "Opcional: notas sobre erratas corregidas del apunte original."
          },
          "analisis_complejidad": {
            "temporal": "O(1)",
            "espacial": "O(1)",
            "desglose_asintotico": [
              {
                "linea": "Operación aritmética y retorno",
                "costo": "O(1)"
              }
            ],
            "teorema_aplicado": null,
            "observaciones": "Justificación breve del costo."
          }
        }
      ]
    }
  ]
}
```

### 3.2 Template de Ejercicios (`ejercicios/ejercicios_<tema>.json`)

```json
{
  "modulo": "identificador_tema",
  "titulo": "Banco de Ejercicios: Nombre del Tema",
  "descripcion": "Colección consolidada de ejercicios de guías prácticas, parciales y diapositivas.",
  "total_ejercicios": 1,
  "fecha_actualizacion": "2026-11-08",
  "ejercicios": [
    {
      "id_tema": 1,
      "id_global": 1,
      "tema": "identificador_tema",
      "titulo": "Título descriptivo del ejercicio",
      "enunciado": "Texto completo e íntegro del enunciado, incluyendo ítems a), b), c) y restricciones de complejidad.",
      "recurso_visual": null,
      "fuente_original": "Guía Práctica / Parcial / Diapositiva X",
      "es_ejercicio_propuesto_diapositivas": true,
      "resolucion_propuesta": [
        {
          "fuente_propuesta": "Clase 02 - Slide 15",
          "clasificacion": "identificador_tema",
          "complejidad_esperada": "O(\\log n)",
          "estrategia_sugerida": "Explicación clara de la idea o invariante para resolver el problema."
        }
      ]
    }
  ]
}
```

---

## 4. Estrategia de Ejecución en Múltiples Sesiones con Agentes (Gemini / Antigravity)

La extracción de apuntes completos, teoremas, análisis de complejidad y bancos de ejercicios genera miles de líneas de JSON y código TypeScript. Intentar procesar una materia completa en una sola interacción no es viable: la ventana de contexto de los modelos de lenguaje y el límite de tokens de respuesta por mensaje provocan saturación, truncamiento silencioso y pérdida de precisión conceptual.

Por este motivo, **la extracción, curaduría y depuración deben planificarse y ejecutarse en múltiples sesiones acotadas e incrementales**.

### 4.1 Recomendación Clave: Usar "Tarea" (Task) en vez de "Chat"
En Gemini, Antigravity o entornos similares con capacidades de agentes:
* **No utilices una sesión de Chat tradicional** para la carga masiva o refactorización. En los chats, las respuestas largas se truncan, no se persisten archivos directamente en disco y se pierde trazabilidad.
* **Creá una Tarea (Task)**: En el modo tarea, el agente cuenta con acceso autónomo a herramientas de lectura/escritura en el sistema de archivos (`read_file`, `write_file`, `edit_file`), puede ejecutar scripts de validación (`npm test`, `npm run build`), escribe directamente los archivos sin saturar el canal de conversación y preserva el estado de trabajo de forma persistente.

### 4.2 Instrucciones para Pedir al Agente que Cree el Plan de Trabajo
Antes de escribir cualquier línea de código o extraer datos, iniciá una primera tarea con el siguiente prompt para que el agente elabore la hoja de ruta en un archivo markdown (por ejemplo, `EXTRACTION_PLAN.md`):

```markdown
Actuá como arquitecto de software y docente universitario. Necesito digitalizar el contenido completo de la materia [Nombre de la Materia] en esta plataforma web.
Examiná la arquitectura en `README.md`, los templates en `teoria/` y `ejercicios/`, y las reglas de diseño en `software_design_standards_for_agents.md`.

Creá un archivo `EXTRACTION_PLAN.md` estructurado en sesiones independientes y auto-contenidas (máximo 1 o 2 módulos por sesión):
1. Para cada sesión, definí:
   - Fuentes de entrada exactas (apuntes, PDFs, guías de ejercicios).
   - Archivos JSON de salida esperados en `teoria/` y `ejercicios/`.
   - Componentes o visualizadores requeridos en `src/course/`.
   - Criterios de aceptación verificables (compilación, renderizado, tests).
2. Dejá para la última sesión una fase de auditoría final y depuración exhaustiva que valide `npm test`, `npm run build` y el cumplimiento del estándar de diseño.
No implementes código aún; únicamente redactá el plan detallado.
```

### 4.3 Prompts para Cada Sesión de Trabajo

Una vez acordado el plan, ejecutá cada sesión abriendo una nueva tarea (o continuando la tarea dedicada) con los siguientes prompts específicos:

#### Prompt para Sesión de Extracción (Fase 1: JSON Base)
```markdown
Leé `EXTRACTION_PLAN.md` y `software_design_standards_for_agents.md`.
Vamos a ejecutar la Sesión X: [Nombre del Módulo o Tema].

Instrucciones:
1. Extraé el contenido teórico de los apuntes adjuntos y creá `teoria/teoria_<n>_<slug>.json` respetando el template oficial sin omitir teoremas ni demostraciones.
2. Extraé todos los ejercicios y problemas de examen relacionados y creá `ejercicios/ejercicios_<tema>.json`.
3. Verificá que el procesador universal (`src/core/domain/jsonCourseProcessor.ts`) cargue ambos archivos sin arrojar errores.
4. Actualizá el estado de la Sesión X en `EXTRACTION_PLAN.md` como completada.
```

#### Prompt para Sesión de Curaduría y Visualizadores (Fase 2: Componentes de la Materia)
```markdown
Leé `EXTRACTION_PLAN.md` y `software_design_standards_for_agents.md`.
Vamos a ejecutar la Sesión Y: Curaduría y Visualizadores de [Módulo / Algoritmos].

Instrucciones:
1. Refiná las diapositivas de `src/course/data/` que requieran desgloses didácticos especiales o anotaciones de código.
2. Si el módulo requiere visualizadores paso a paso, implementalos en `src/course/visualizers/` utilizando el hook reutilizable `useVisualizerPlayback` y componentes compartidos de `src/course/visualizers/shared/`.
3. Registrá los nuevos bloques en `src/course/components/courseBlockRegistry.tsx`.
4. Respetá estrictamente `software_design_standards_for_agents.md`: paradigma funcional puro, uso de Lookup Tables en lugar de `switch`, cero `useEffect` secundarios para mutar estados locales y cero comentarios explicativos en el código.
5. Verificá que `npm run build` finalice con 0 errores de tipado TypeScript.
```

#### Prompt para Sesión de Revisión, Depuración y Cierre Final
Durante la etapa de revisión y depuración es mandatario que el agente audite todo el trabajo contra el estándar de diseño provisto:

```markdown
Leé `software_design_standards_for_agents.md` y `EXTRACTION_PLAN.md`.
Vamos a ejecutar la Sesión Final: Auditoría, Depuración y Cierre.

Instrucciones:
1. Revisá integralmente el código implementado y ejecutá una auditoría automática:
   - Invariante arquitectónico: Verificá que `src/core/` tenga 0 imports desde `src/course/`.
   - Paradigma funcional puro: 0 declaraciones `class` en TypeScript.
   - Lookup Tables: 0 bloques `switch` en todo el proyecto.
   - Efectos secundarios: 0 `useEffect` que reaccionen a estados locales para mutaciones o redirecciones.
   - Código auto-documentado: 0 comentarios explicativos u organizativos (`//` o `/* */`) en archivos `.ts`, `.tsx` o `.css`.
   - Modularidad: Verificá que ningún visualizador supere ~350 líneas, extrayendo datos estáticos pesados a archivos `*Data.ts`.
2. Ejecutá la suite de pruebas unitarias: `npm test -- --run` y asegurá que todos los tests pasen.
3. Ejecutá el empaquetado de producción: `npm run build` y asegurá 0 errores de tipado.
4. Al verificar que todo esté en orden, eliminá el archivo temporal `EXTRACTION_PLAN.md`.
```

---

## 5. Prompts de Gemini para Extraer Datos desde PDFs / Diapositivas

### Prompt A: Extracción de un Módulo Teórico a JSON
Adjuntá el PDF del apunte teórico o las diapositivas de la unidad en Gemini y usá este prompt:

```markdown
Actuá como un extractor experto de contenido académico universitario. Tu objetivo es convertir los documentos adjuntos de este módulo en un único archivo JSON válido que respete exactamente el esquema indicado abajo, sin omitir definiciones, teoremas, fórmulas matemáticas, ejemplos ni bloques de código.

Reglas de extracción:
1. Fidelidad total: No resumas de forma superficial. Conservá todas las definiciones formales, propiedades, demostraciones e intuiciones en el campo `teoria` usando listas Markdown y notación LaTeX entre signos `$` (escapando las barras invertidas como `\\` dentro del JSON).
2. Si el subtema incluye pseudocódigo o código en Java/Python/C, extraelo completo en `pseudocodigo` y `codigo`. Si no aplica a la materia o al subtema, colocá `null`.
3. Si hay análisis de costo o fórmulas clave, estructuralo en `analisis_complejidad` (o dejalo en `null` si no aplica).
4. Devolvé únicamente el bloque JSON válido siguiendo esta estructura:

{
  "modulo": "<numero_y_slug>",
  "titulo_general": "<titulo>",
  "institucion": "<institucion>",
  "catedra": "<catedra>",
  "profesor": "<profesor>",
  "descripcion": "<descripcion_general>",
  "secciones": [
    {
      "id": "<slug_seccion>",
      "tipo": "teoria_formal",
      "titulo": "<titulo_seccion>",
      "subtemas": [
        {
          "id": "<slug_subtema>",
          "titulo": "<titulo_subtema>",
          "teoria": "<markdown_con_latex>",
          "animaciones": null,
          "pseudocodigo": null,
          "codigo": null,
          "analisis_complejidad": null
        }
      ]
    }
  ]
}
```

### Prompt B: Extracción de Guías de Ejercicios y Parciales a JSON
Adjuntá las guías prácticas, parciales y diapositivas con ejercicios propuestos en Gemini y usá este prompt:

```markdown
Actuá como un recopilador académico riguroso. Extraé absolutamente todos los ejercicios prácticos, problemas de examen y ejercicios propuestos en las diapositivas adjuntas correspondientes a este tema, y consolidalos en un único archivo JSON válido.

Reglas de extracción:
1. Copiá el `enunciado` íntegro palabra por palabra, manteniendo sub-ítems (a, b, c) y fórmulas en LaTeX.
2. Si un ejercicio aparece repetido entre la guía y las diapositivas, unificalo y documentá la pista o estrategia de las diapositivas dentro de `resolucion_propuesta`.
3. Si el ejercicio requiere un grafo, tabla o figura del PDF para entenderse, describilo detalladamente en `recurso_visual` (o `null` si es solo texto).
4. Devolvé únicamente el JSON con esta estructura:

{
  "modulo": "<slug_tema>",
  "titulo": "Banco de Ejercicios: <Nombre del Tema>",
  "descripcion": "<descripcion>",
  "total_ejercicios": <cantidad>,
  "fecha_actualizacion": "<YYYY-MM-DD>",
  "ejercicios": [
    {
      "id_tema": 1,
      "id_global": 1,
      "tema": "<slug_tema>",
      "titulo": "<titulo_corto_identificatorio>",
      "enunciado": "<enunciado_completo>",
      "recurso_visual": null,
      "fuente_original": "<guia_o_slide_origen>",
      "es_ejercicio_propuesto_diapositivas": false,
      "resolucion_propuesta": [
        {
          "fuente_propuesta": "<origen>",
          "clasificacion": "<slug_tema>",
          "complejidad_esperada": "<cota_o_objetivo>",
          "estrategia_sugerida": "<idea_de_resolucion>"
        }
      ]
    }
  ]
}
```

---

## 6. Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar tests automatizados (exclusivos para src/core/)
npm test

# Compilar para producción y verificar tipos TypeScript
npm run build
```

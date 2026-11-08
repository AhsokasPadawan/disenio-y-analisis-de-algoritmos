export const ANIMATION_SPECS_DATA: Record<string, any> = {
  "MERGESORT_TRACE": {
    "array_initial": [
      7,
      1,
      8,
      5,
      3,
      6,
      2,
      9,
      0,
      4
    ],
    "frames": [
      {
        "step": 1,
        "action": "split",
        "subarrays": [
          [
            7,
            1,
            8,
            5,
            3
          ],
          [
            6,
            2,
            9,
            0,
            4
          ]
        ]
      },
      {
        "step": 2,
        "action": "split",
        "subarrays": [
          [
            7,
            1,
            8
          ],
          [
            5,
            3
          ],
          [
            6,
            2,
            9
          ],
          [
            0,
            4
          ]
        ]
      },
      {
        "step": 3,
        "action": "split",
        "subarrays": [
          [
            7,
            1
          ],
          [
            8
          ],
          [
            5
          ],
          [
            3
          ],
          [
            6,
            2
          ],
          [
            9
          ],
          [
            0
          ],
          [
            4
          ]
        ]
      },
      {
        "step": 4,
        "action": "base",
        "subarrays": [
          [
            7
          ],
          [
            1
          ],
          [
            8
          ],
          [
            5
          ],
          [
            3
          ],
          [
            6
          ],
          [
            2
          ],
          [
            9
          ],
          [
            0
          ],
          [
            4
          ]
        ]
      },
      {
        "step": 5,
        "action": "merge",
        "subarrays": [
          [
            1,
            7
          ],
          [
            8
          ],
          [
            3,
            5
          ],
          [
            2,
            6
          ],
          [
            9
          ],
          [
            0,
            4
          ]
        ]
      },
      {
        "step": 6,
        "action": "merge",
        "subarrays": [
          [
            1,
            7,
            8
          ],
          [
            3,
            5
          ],
          [
            2,
            6,
            9
          ],
          [
            0,
            4
          ]
        ]
      },
      {
        "step": 7,
        "action": "merge",
        "subarrays": [
          [
            1,
            3,
            5,
            7,
            8
          ],
          [
            0,
            2,
            4,
            6,
            9
          ]
        ]
      },
      {
        "step": 8,
        "action": "merge_final",
        "result": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9
        ]
      }
    ]
  },
  "QUICKSORT_TRACE": {
    "array": [
      7,
      1,
      8,
      5,
      3,
      6,
      2,
      9,
      0,
      4
    ],
    "frames": [
      {
        "step": 1,
        "action": "Llamada inicial QuickSort(0, 9): pivote A[0]=7, i=0, j=9",
        "pivot_val": 7,
        "pivot_idx": 0,
        "state": [7, 1, 8, 5, 3, 6, 2, 9, 0, 4],
        "i": 0,
        "j": 9
      },
      {
        "step": 2,
        "action": "Búsqueda: i avanza hasta A[2]=8 (> 7), j retrocede hasta A[8]=0 (< 7)",
        "pivot_val": 7,
        "pivot_idx": 0,
        "state": [7, 1, 8, 5, 3, 6, 2, 9, 0, 4],
        "i": 2,
        "j": 8
      },
      {
        "step": 3,
        "action": "swap(A[2], A[8]): coloca el 0 a la izquierda y el 8 a la derecha",
        "pivot_val": 7,
        "pivot_idx": 0,
        "state": [7, 1, 0, 5, 3, 6, 2, 9, 8, 4],
        "i": 2,
        "j": 8
      },
      {
        "step": 4,
        "action": "swap(A[7]=9, A[9]=4) y cruce de punteros: j=7 cruza a i=8",
        "pivot_val": 7,
        "pivot_idx": 0,
        "state": [7, 1, 0, 5, 3, 6, 2, 4, 8, 9],
        "i": 8,
        "j": 7
      },
      {
        "step": 5,
        "action": "swap(A[0], A[j=7]): pivote 7 fijado definitivamente en posición index 7",
        "pivot_val": 7,
        "pivot_idx": 7,
        "state": [4, 1, 0, 5, 3, 6, 2, 7, 8, 9],
        "i": 7,
        "j": 7,
        "pivot_final_idx": 7
      },
      {
        "step": 6,
        "action": "Subproblema derecho A[8..9]: 8 y 9 quedan en posiciones definitivas",
        "pivot_val": 8,
        "pivot_idx": 8,
        "state": [4, 1, 0, 5, 3, 6, 2, 7, 8, 9],
        "i": 8,
        "j": 9
      },
      {
        "step": 7,
        "action": "Subproblema izquierdo A[0..6]: nuevo pivote A[0]=4, i en 5, j en 2",
        "pivot_val": 4,
        "pivot_idx": 0,
        "state": [4, 1, 0, 5, 3, 6, 2, 7, 8, 9],
        "i": 3,
        "j": 6
      },
      {
        "step": 8,
        "action": "swap(A[3], A[6]) y fijación de pivote: 4 queda definitivamente en index 4",
        "pivot_val": 4,
        "pivot_idx": 4,
        "state": [2, 1, 0, 3, 4, 6, 5, 7, 8, 9],
        "i": 4,
        "j": 4
      },
      {
        "step": 9,
        "action": "Partición recursiva en A[0..3] y A[5..6]: subproblemas resueltos",
        "pivot_val": 2,
        "pivot_idx": 2,
        "state": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        "i": 2,
        "j": 2
      },
      {
        "step": 10,
        "action": "Arreglo completamente ordenado [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]",
        "pivot_val": -1,
        "pivot_idx": -1,
        "state": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        "i": -1,
        "j": -1
      }
    ]
  },
  "PSEUDO_M_TREE": {
    "vector": [
      1,
      3,
      5,
      1,
      1,
      2,
      3,
      3,
      1,
      1,
      1
    ],
    "levels": [
      {
        "depth": 0,
        "segment": "[0..10]",
        "eval": "Combine(Left, Right)",
        "res": {
          "r": true,
          "n": 11,
          "c": 7,
          "x": 1
        }
      },
      {
        "depth": 1,
        "left": "[0..4] -> (T, 5, 3, 1)",
        "right": "[5..10] -> (T, 6, 4, 1)"
      },
      {
        "depth": 2,
        "subsegments": [
          "[0..1] -> (F,2,0,0)",
          "[2..4] -> (T,3,2,1)",
          "[5..7] -> (T,3,2,3)",
          "[8..10] -> (T,3,3,1)"
        ]
      }
    ]
  },
  "HANOI_DISKS": {
    "pegs": {
      "A": [
        4,
        3,
        2,
        1
      ],
      "B": [],
      "C": []
    },
    "move_sequence": [
      {
        "disk": 1,
        "from": "A",
        "to": "B"
      },
      {
        "disk": 2,
        "from": "A",
        "to": "C"
      },
      {
        "disk": 1,
        "from": "B",
        "to": "C"
      },
      {
        "disk": 3,
        "from": "A",
        "to": "B"
      },
      {
        "disk": 1,
        "from": "C",
        "to": "A"
      },
      {
        "disk": 2,
        "from": "C",
        "to": "B"
      },
      {
        "disk": 1,
        "from": "A",
        "to": "B"
      },
      {
        "disk": 4,
        "from": "A",
        "to": "C"
      }
    ]
  },
  "HUFFMAN_TREE_CONSTRUCTION": {
    "initial_frequencies": {
      "F": 5,
      "E": 9,
      "C": 12,
      "B": 13,
      "D": 16,
      "A": 45
    },
    "frames": [
      {
        "step": 0,
        "queue": [
          "F:5",
          "E:9",
          "C:12",
          "B:13",
          "D:16",
          "A:45"
        ],
        "action": "Estado inicial: todos los símbolos son hojas en la cola de prioridad mínima."
      },
      {
        "step": 1,
        "extracted": [
          "F:5",
          "E:9"
        ],
        "created_node": {
          "id": "X1",
          "freq": 14,
          "left_0": "F:5",
          "right_1": "E:9"
        },
        "queue": [
          "C:12",
          "B:13",
          "X1:14",
          "D:16",
          "A:45"
        ]
      },
      {
        "step": 2,
        "extracted": [
          "C:12",
          "B:13"
        ],
        "created_node": {
          "id": "X2",
          "freq": 25,
          "left_0": "C:12",
          "right_1": "B:13"
        },
        "queue": [
          "X1:14",
          "D:16",
          "X2:25",
          "A:45"
        ]
      },
      {
        "step": 3,
        "extracted": [
          "X1:14",
          "D:16"
        ],
        "created_node": {
          "id": "X3",
          "freq": 30,
          "left_0": "X1:14",
          "right_1": "D:16"
        },
        "queue": [
          "X2:25",
          "X3:30",
          "A:45"
        ]
      },
      {
        "step": 4,
        "extracted": [
          "X2:25",
          "X3:30"
        ],
        "created_node": {
          "id": "X4",
          "freq": 55,
          "left_0": "X2:25",
          "right_1": "X3:30"
        },
        "queue": [
          "A:45",
          "X4:55"
        ]
      },
      {
        "step": 5,
        "extracted": [
          "A:45",
          "X4:55"
        ],
        "created_node": {
          "id": "X5",
          "freq": 100,
          "left_0": "A:45",
          "right_1": "X4:55"
        },
        "queue": [
          "X5:100"
        ],
        "final_codes": {
          "A": "0",
          "C": "100",
          "B": "101",
          "F": "1100",
          "E": "1101",
          "D": "111"
        },
        "bit_comparison": {
          "fixed_length_3bits": 30000,
          "huffman_variable": 22400
        }
      }
    ]
  },
  "DIJKSTRA_TRACE_WEHBE": {
    "nodes": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "source": 1,
    "edges": [
      {
        "from": 1,
        "to": 2,
        "w": 2
      },
      {
        "from": 1,
        "to": 4,
        "w": 15
      },
      {
        "from": 1,
        "to": 5,
        "w": 6
      },
      {
        "from": 1,
        "to": 6,
        "w": 3
      },
      {
        "from": 2,
        "to": 3,
        "w": 3
      },
      {
        "from": 2,
        "to": 5,
        "w": 2
      },
      {
        "from": 3,
        "to": 4,
        "w": 6
      },
      {
        "from": 5,
        "to": 4,
        "w": 3
      },
      {
        "from": 5,
        "to": 6,
        "w": 1
      },
      {
        "from": 6,
        "to": 4,
        "w": 1
      }
    ],
    "frames": [
      {
        "step": 0,
        "selected_node": 1,
        "visited": [
          1
        ],
        "pending": [
          2,
          3,
          4,
          5,
          6
        ],
        "dist": {
          "1": 0,
          "2": 2,
          "3": "inf",
          "4": 15,
          "5": 6,
          "6": 3
        },
        "prev": {
          "1": 1,
          "2": 1,
          "3": 1,
          "4": 1,
          "5": 1,
          "6": 1
        },
        "highlight_edges": []
      },
      {
        "step": 1,
        "selected_node": 2,
        "visited": [
          1,
          2
        ],
        "pending": [
          3,
          4,
          5,
          6
        ],
        "evaluated_edges": [
          {
            "from": 2,
            "to": 3,
            "w": 3,
            "improved": true
          },
          {
            "from": 2,
            "to": 5,
            "w": 2,
            "improved": true
          }
        ],
        "dist": {
          "1": 0,
          "2": 2,
          "3": 5,
          "4": 15,
          "5": 4,
          "6": 3
        },
        "prev": {
          "1": 1,
          "2": 1,
          "3": 2,
          "4": 1,
          "5": 2,
          "6": 1
        }
      },
      {
        "step": 2,
        "selected_node": 6,
        "visited": [
          1,
          2,
          6
        ],
        "pending": [
          3,
          4,
          5
        ],
        "evaluated_edges": [
          {
            "from": 6,
            "to": 4,
            "w": 1,
            "improved": true
          }
        ],
        "dist": {
          "1": 0,
          "2": 2,
          "3": 5,
          "4": 4,
          "5": 4,
          "6": 3
        },
        "prev": {
          "1": 1,
          "2": 1,
          "3": 2,
          "4": 6,
          "5": 2,
          "6": 1
        }
      },
      {
        "step": 3,
        "selected_node": 4,
        "visited": [
          1,
          2,
          6,
          4
        ],
        "pending": [
          3,
          5
        ],
        "evaluated_edges": [],
        "dist": {
          "1": 0,
          "2": 2,
          "3": 5,
          "4": 4,
          "5": 4,
          "6": 3
        },
        "prev": {
          "1": 1,
          "2": 1,
          "3": 2,
          "4": 6,
          "5": 2,
          "6": 1
        }
      },
      {
        "step": 4,
        "selected_node": 5,
        "visited": [
          1,
          2,
          6,
          4,
          5
        ],
        "pending": [
          3
        ],
        "evaluated_edges": [
          {
            "from": 5,
            "to": 4,
            "w": 3,
            "improved": false
          },
          {
            "from": 5,
            "to": 6,
            "w": 1,
            "improved": false
          }
        ],
        "dist": {
          "1": 0,
          "2": 2,
          "3": 5,
          "4": 4,
          "5": 4,
          "6": 3
        },
        "prev": {
          "1": 1,
          "2": 1,
          "3": 2,
          "4": 6,
          "5": 2,
          "6": 1
        }
      },
      {
        "step": 5,
        "selected_node": 3,
        "visited": [
          1,
          2,
          6,
          4,
          5,
          3
        ],
        "pending": [],
        "evaluated_edges": [
          {
            "from": 3,
            "to": 4,
            "w": 6,
            "improved": false
          }
        ],
        "dist": {
          "1": 0,
          "2": 2,
          "3": 5,
          "4": 4,
          "5": 4,
          "6": 3
        },
        "prev": {
          "1": 1,
          "2": 1,
          "3": 2,
          "4": 6,
          "5": 2,
          "6": 1
        }
      }
    ]
  },
  "PRIM_VS_KRUSKAL_TRACE": {
    "graph_nodes": [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g"
    ],
    "graph_edges": [
      {
        "u": "a",
        "v": "g",
        "w": 1
      },
      {
        "u": "f",
        "v": "g",
        "w": 2
      },
      {
        "u": "b",
        "v": "c",
        "w": 3
      },
      {
        "u": "c",
        "v": "g",
        "w": 3
      },
      {
        "u": "a",
        "v": "b",
        "w": 4
      },
      {
        "u": "e",
        "v": "g",
        "w": 4
      },
      {
        "u": "a",
        "v": "f",
        "w": 5
      },
      {
        "u": "c",
        "v": "d",
        "w": 5
      },
      {
        "u": "a",
        "v": "c",
        "w": 7
      },
      {
        "u": "d",
        "v": "e",
        "w": 7
      },
      {
        "u": "e",
        "v": "f",
        "w": 8
      },
      {
        "u": "d",
        "v": "g",
        "w": 9
      }
    ],
    "prim_trace": [
      {
        "step": 0,
        "visited": [],
        "candidates": [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g"
        ],
        "tree_edges": []
      },
      {
        "step": 1,
        "visited": [
          "d"
        ],
        "candidates": [
          "a",
          "b",
          "c",
          "e",
          "f",
          "g"
        ],
        "tree_edges": []
      },
      {
        "step": 2,
        "visited": [
          "c",
          "d"
        ],
        "candidates": [
          "a",
          "b",
          "e",
          "f",
          "g"
        ],
        "tree_edges": [
          [
            "d",
            "c",
            5
          ]
        ]
      },
      {
        "step": 3,
        "visited": [
          "b",
          "c",
          "d"
        ],
        "candidates": [
          "a",
          "e",
          "f",
          "g"
        ],
        "tree_edges": [
          [
            "d",
            "c",
            5
          ],
          [
            "c",
            "b",
            3
          ]
        ]
      },
      {
        "step": 4,
        "visited": [
          "b",
          "c",
          "d",
          "g"
        ],
        "candidates": [
          "a",
          "e",
          "f"
        ],
        "tree_edges": [
          [
            "d",
            "c",
            5
          ],
          [
            "c",
            "b",
            3
          ],
          [
            "c",
            "g",
            3
          ]
        ]
      },
      {
        "step": 5,
        "visited": [
          "a",
          "b",
          "c",
          "d",
          "g"
        ],
        "candidates": [
          "e",
          "f"
        ],
        "tree_edges": [
          [
            "d",
            "c",
            5
          ],
          [
            "c",
            "b",
            3
          ],
          [
            "c",
            "g",
            3
          ],
          [
            "g",
            "a",
            1
          ]
        ]
      },
      {
        "step": 6,
        "visited": [
          "a",
          "b",
          "c",
          "d",
          "f",
          "g"
        ],
        "candidates": [
          "e"
        ],
        "tree_edges": [
          [
            "d",
            "c",
            5
          ],
          [
            "c",
            "b",
            3
          ],
          [
            "c",
            "g",
            3
          ],
          [
            "g",
            "a",
            1
          ],
          [
            "g",
            "f",
            2
          ]
        ]
      },
      {
        "step": 7,
        "visited": [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g"
        ],
        "candidates": [],
        "tree_edges": [
          [
            "d",
            "c",
            5
          ],
          [
            "c",
            "b",
            3
          ],
          [
            "c",
            "g",
            3
          ],
          [
            "g",
            "a",
            1
          ],
          [
            "g",
            "f",
            2
          ],
          [
            "g",
            "e",
            4
          ]
        ],
        "total_cost": 18
      }
    ],
    "kruskal_trace": [
      {
        "step": 1,
        "edge": [
          "a",
          "g",
          1
        ],
        "status": "accepted",
        "components": [
          [
            "a",
            "g"
          ],
          [
            "b"
          ],
          [
            "c"
          ],
          [
            "d"
          ],
          [
            "e"
          ],
          [
            "f"
          ]
        ]
      },
      {
        "step": 2,
        "edge": [
          "f",
          "g",
          2
        ],
        "status": "accepted",
        "components": [
          [
            "a",
            "g",
            "f"
          ],
          [
            "b"
          ],
          [
            "c"
          ],
          [
            "d"
          ],
          [
            "e"
          ]
        ]
      },
      {
        "step": 3,
        "edge": [
          "b",
          "c",
          3
        ],
        "status": "accepted",
        "components": [
          [
            "a",
            "g",
            "f"
          ],
          [
            "b",
            "c"
          ],
          [
            "d"
          ],
          [
            "e"
          ]
        ]
      },
      {
        "step": 4,
        "edge": [
          "c",
          "g",
          3
        ],
        "status": "accepted",
        "components": [
          [
            "a",
            "g",
            "f",
            "b",
            "c"
          ],
          [
            "d"
          ],
          [
            "e"
          ]
        ]
      },
      {
        "step": 5,
        "edge": [
          "a",
          "b",
          4
        ],
        "status": "rejected_cycle",
        "components": [
          [
            "a",
            "g",
            "f",
            "b",
            "c"
          ],
          [
            "d"
          ],
          [
            "e"
          ]
        ]
      },
      {
        "step": 6,
        "edge": [
          "e",
          "g",
          4
        ],
        "status": "accepted",
        "components": [
          [
            "a",
            "g",
            "f",
            "b",
            "c",
            "e"
          ],
          [
            "d"
          ]
        ]
      },
      {
        "step": 7,
        "edge": [
          "a",
          "f",
          5
        ],
        "status": "rejected_cycle",
        "components": [
          [
            "a",
            "g",
            "f",
            "b",
            "c",
            "e"
          ],
          [
            "d"
          ]
        ]
      },
      {
        "step": 8,
        "edge": [
          "c",
          "d",
          5
        ],
        "status": "accepted",
        "components": [
          [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g"
          ]
        ],
        "total_cost": 18
      }
    ]
  },
  "FIBONACCI_MEMOIZATION_VS_REDUNDANT": {
    "target": "F7",
    "base_cases": {
      "F0": 0,
      "F1": 1
    },
    "redundant_tree_summary": {
      "total_calls": 41,
      "recalculated_nodes": [
        "F5 (x2)",
        "F4 (x3)",
        "F3 (x5)",
        "F2 (x8)"
      ]
    },
    "memoization_frames": [
      {
        "step": 1,
        "active_path": [
          "F7",
          "F6",
          "F5",
          "F4",
          "F3",
          "F2"
        ],
        "cache": {},
        "status": "Descenso por rama izquierda hasta alcanzar casos base"
      },
      {
        "step": 2,
        "node": "F2",
        "left": "F1=1 (base)",
        "right": "F0=0 (base)",
        "computed": 1,
        "cache": {
          "F2": 1
        }
      },
      {
        "step": 3,
        "node": "F3",
        "left": "F2=1",
        "right": "F1=1 (base)",
        "computed": 2,
        "cache": {
          "F2": 1,
          "F3": 2
        }
      },
      {
        "step": 4,
        "node": "F4",
        "left": "F3=2",
        "right": "F2=1 (cache hit O(1))",
        "computed": 3,
        "cache": {
          "F2": 1,
          "F3": 2,
          "F4": 3
        }
      },
      {
        "step": 5,
        "node": "F5",
        "left": "F4=3",
        "right": "F3=2 (cache hit O(1))",
        "computed": 5,
        "cache": {
          "F2": 1,
          "F3": 2,
          "F4": 3,
          "F5": 5
        }
      },
      {
        "step": 6,
        "node": "F6",
        "left": "F5=5",
        "right": "F4=3 (cache hit O(1))",
        "computed": 8,
        "cache": {
          "F2": 1,
          "F3": 2,
          "F4": 3,
          "F5": 5,
          "F6": 8
        }
      },
      {
        "step": 7,
        "node": "F7",
        "left": "F6=8",
        "right": "F5=5 (cache hit O(1))",
        "computed": 13,
        "cache": {
          "F2": 1,
          "F3": 2,
          "F4": 3,
          "F5": 5,
          "F6": 8,
          "F7": 13
        }
      }
    ]
  },
  "COIN_CHANGE_DP_TABLES": {
    "example_1_canonical_failure": {
      "denominations": [
        1,
        4,
        6
      ],
      "target_V": 8,
      "columns_j": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ],
      "matrix_rows": [
        {
          "coin": 1,
          "values": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ]
        },
        {
          "coin": 4,
          "values": [
            0,
            1,
            2,
            3,
            1,
            2,
            3,
            4,
            2
          ]
        },
        {
          "coin": 6,
          "values": [
            0,
            1,
            2,
            3,
            1,
            2,
            1,
            2,
            2
          ]
        }
      ],
      "reconstruction_path": [
        {
          "cell": [
            2,
            8
          ],
          "val": 2,
          "action": "C[2,8] == C[1,8] -> move up to [1,8]"
        },
        {
          "cell": [
            1,
            8
          ],
          "val": 2,
          "action": "C[1,8] != C[0,8] -> take coin 4, move left to [1,4]"
        },
        {
          "cell": [
            1,
            4
          ],
          "val": 1,
          "action": "C[1,4] != C[0,4] -> take coin 4, move left to [1,0]"
        },
        {
          "cell": [
            1,
            0
          ],
          "val": 0,
          "action": "j == 0 -> stop. Coins used: [4, 4]"
        }
      ]
    },
    "example_2_with_infinities": {
      "denominations": [
        2,
        4,
        7
      ],
      "target_V": 8,
      "formula_colors": {
        "green": "i == 0 and j == 0 -> 0",
        "red": "i == 0 and d_i > j -> inf",
        "blue": "i == 0 and d_i <= j -> 1 + C[i, j - d_i]",
        "yellow": "i > 0 and d_i > j -> C[i - 1, j]",
        "cyan": "i > 0 and d_i <= j -> min(1 + C[i, j - d_i], C[i - 1, j])"
      },
      "matrix_rows": [
        {
          "coin": 2,
          "values": [
            0,
            "inf",
            1,
            "inf",
            2,
            "inf",
            3,
            "inf",
            4
          ]
        },
        {
          "coin": 4,
          "values": [
            0,
            "inf",
            1,
            "inf",
            1,
            "inf",
            2,
            "inf",
            2
          ]
        },
        {
          "coin": 7,
          "values": [
            0,
            "inf",
            1,
            "inf",
            1,
            "inf",
            2,
            1,
            2
          ]
        }
      ]
    }
  },
  "KNAPSACK_01_DP_TABLES": {
    "example_1": {
      "capacity_P": 9,
      "objects": [
        {
          "id": 0,
          "peso": 3,
          "valor": 3
        },
        {
          "id": 1,
          "peso": 2,
          "valor": 8
        },
        {
          "id": 2,
          "peso": 6,
          "valor": 5
        },
        {
          "id": 3,
          "peso": 7,
          "valor": 7
        }
      ],
      "columns_j": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      "matrix_V": [
        [
          0,
          0,
          0,
          3,
          3,
          3,
          3,
          3,
          3,
          3
        ],
        [
          0,
          0,
          8,
          8,
          8,
          11,
          11,
          11,
          11,
          11
        ],
        [
          0,
          0,
          8,
          8,
          8,
          11,
          11,
          11,
          13,
          13
        ],
        [
          0,
          0,
          8,
          8,
          8,
          11,
          11,
          11,
          13,
          15
        ]
      ],
      "optimal_value": 15
    },
    "example_2_formula_coloring": {
      "capacity_P": 10,
      "objects_peso_valor": [
        [
          7,
          8
        ],
        [
          6,
          5
        ],
        [
          4,
          4
        ],
        [
          5,
          3
        ]
      ],
      "columns_j": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "matrix_V": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          8,
          8,
          8,
          8
        ],
        [
          0,
          0,
          0,
          0,
          0,
          0,
          5,
          8,
          8,
          8,
          8
        ],
        [
          0,
          0,
          0,
          0,
          4,
          4,
          5,
          8,
          8,
          8,
          9
        ],
        [
          0,
          0,
          0,
          0,
          4,
          4,
          5,
          8,
          8,
          8,
          9
        ]
      ],
      "optimal_value": 9
    }
  },
  "FLOYD_WARSHALL_MATRICES": {
    "nodes": [
      0,
      1,
      2,
      3
    ],
    "initial_G": [
      [
        0,
        1,
        "inf",
        "inf"
      ],
      [
        "inf",
        0,
        3,
        "inf"
      ],
      [
        7,
        2,
        0,
        3
      ],
      [
        3,
        "inf",
        8,
        0
      ]
    ],
    "frames": [
      {
        "k": 0,
        "bridge_node": 0,
        "matrix": [
          [
            0,
            1,
            "inf",
            "inf"
          ],
          [
            "inf",
            0,
            3,
            "inf"
          ],
          [
            7,
            2,
            0,
            3
          ],
          [
            3,
            4,
            8,
            0
          ]
        ],
        "updates": [
          {
            "cell": [
              3,
              1
            ],
            "old": "inf",
            "new": 4,
            "formula": "min(G[3,1]=inf, G[3,0]+G[0,1]=3+1=4)"
          }
        ]
      },
      {
        "k": 1,
        "bridge_node": 1,
        "matrix": [
          [
            0,
            1,
            4,
            "inf"
          ],
          [
            "inf",
            0,
            3,
            "inf"
          ],
          [
            7,
            2,
            0,
            3
          ],
          [
            3,
            4,
            7,
            0
          ]
        ],
        "updates": [
          {
            "cell": [
              0,
              2
            ],
            "old": "inf",
            "new": 4,
            "formula": "min(A0[0,2]=inf, A0[0,1]+A0[1,2]=1+3=4)"
          },
          {
            "cell": [
              3,
              2
            ],
            "old": 8,
            "new": 7,
            "formula": "min(A0[3,2]=8, A0[3,1]+A0[1,2]=4+3=7)"
          }
        ]
      },
      {
        "k": 2,
        "bridge_node": 2,
        "matrix": [
          [
            0,
            1,
            4,
            7
          ],
          [
            10,
            0,
            3,
            6
          ],
          [
            7,
            2,
            0,
            3
          ],
          [
            3,
            4,
            7,
            0
          ]
        ],
        "updates": [
          {
            "cell": [
              0,
              3
            ],
            "old": "inf",
            "new": 7,
            "formula": "min(A1[0,3]=inf, A1[0,2]+A1[2,3]=4+3=7)"
          },
          {
            "cell": [
              1,
              0
            ],
            "old": "inf",
            "new": 10,
            "formula": "min(A1[1,0]=inf, A1[1,2]+A1[2,0]=3+7=10)"
          },
          {
            "cell": [
              1,
              3
            ],
            "old": "inf",
            "new": 6,
            "formula": "min(A1[1,3]=inf, A1[1,2]+A1[2,3]=3+3=6)"
          }
        ]
      },
      {
        "k": 3,
        "bridge_node": 3,
        "matrix": [
          [
            0,
            1,
            4,
            7
          ],
          [
            9,
            0,
            3,
            6
          ],
          [
            6,
            2,
            0,
            3
          ],
          [
            3,
            4,
            7,
            0
          ]
        ],
        "updates": [
          {
            "cell": [
              1,
              0
            ],
            "old": 10,
            "new": 9,
            "formula": "min(A2[1,0]=10, A2[1,3]+A2[3,0]=6+3=9)"
          },
          {
            "cell": [
              2,
              0
            ],
            "old": 7,
            "new": 6,
            "formula": "min(A2[2,0]=7, A2[2,3]+A2[3,0]=3+3=6)"
          }
        ]
      }
    ]
  },
  "LCS_DP_TABLE": {
    "X_rows": [
      "epsilon",
      "A",
      "B",
      "C",
      "B",
      "D",
      "A"
    ],
    "Y_cols": [
      "epsilon",
      "A",
      "B",
      "A",
      "C",
      "A",
      "D",
      "A",
      "C"
    ],
    "matrix_M": [
      [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      [
        0,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2
      ],
      [
        0,
        1,
        2,
        2,
        3,
        3,
        3,
        3,
        3
      ],
      [
        0,
        1,
        2,
        2,
        3,
        3,
        3,
        3,
        3
      ],
      [
        0,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        4
      ],
      [
        0,
        1,
        2,
        3,
        3,
        4,
        4,
        5,
        5
      ]
    ],
    "lcs_length": 5,
    "lcs_string": "ABADA"
  },
  "LIS_DP_TRACES": {
    "example_1": {
      "X": [
        0,
        4,
        12,
        2,
        10,
        6,
        9,
        13,
        3,
        11,
        7,
        15
      ],
      "indices": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11
      ],
      "steps": [
        {
          "i": 0,
          "val": 0,
          "D0_len": [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
          ],
          "D1_inx": [
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1
          ]
        },
        {
          "i": 1,
          "val": 4,
          "D0_len": [
            1,
            2,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
          ],
          "D1_inx": [
            -1,
            0,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1
          ]
        },
        {
          "i": 2,
          "val": 12,
          "D0_len": [
            1,
            2,
            3,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
          ],
          "D1_inx": [
            -1,
            0,
            1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1
          ]
        },
        {
          "i": 3,
          "val": 2,
          "D0_len": [
            1,
            2,
            3,
            2,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
          ],
          "D1_inx": [
            -1,
            0,
            1,
            0,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1
          ]
        },
        {
          "i": 4,
          "val": 10,
          "D0_len": [
            1,
            2,
            3,
            2,
            3,
            1,
            1,
            1,
            1,
            1,
            1,
            1
          ],
          "D1_inx": [
            -1,
            0,
            1,
            0,
            3,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1
          ]
        },
        {
          "i": 5,
          "val": 6,
          "D0_len": [
            1,
            2,
            3,
            2,
            3,
            3,
            1,
            1,
            1,
            1,
            1,
            1
          ],
          "D1_inx": [
            -1,
            0,
            1,
            0,
            3,
            3,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1
          ]
        },
        {
          "i": 6,
          "val": 9,
          "D0_len": [
            1,
            2,
            3,
            2,
            3,
            3,
            4,
            1,
            1,
            1,
            1,
            1
          ],
          "D1_inx": [
            -1,
            0,
            1,
            0,
            3,
            3,
            5,
            -1,
            -1,
            -1,
            -1,
            -1
          ]
        },
        {
          "i": 7,
          "val": 13,
          "D0_len": [
            1,
            2,
            3,
            2,
            3,
            3,
            4,
            5,
            1,
            1,
            1,
            1
          ],
          "D1_inx": [
            -1,
            0,
            1,
            0,
            3,
            3,
            5,
            6,
            -1,
            -1,
            -1,
            -1
          ]
        },
        {
          "i": 8,
          "val": 3,
          "D0_len": [
            1,
            2,
            3,
            2,
            3,
            3,
            4,
            5,
            3,
            1,
            1,
            1
          ],
          "D1_inx": [
            -1,
            0,
            1,
            0,
            3,
            3,
            5,
            6,
            3,
            -1,
            -1,
            -1
          ]
        },
        {
          "i": 9,
          "val": 11,
          "D0_len": [
            1,
            2,
            3,
            2,
            3,
            3,
            4,
            5,
            3,
            5,
            1,
            1
          ],
          "D1_inx": [
            -1,
            0,
            1,
            0,
            3,
            3,
            5,
            6,
            3,
            6,
            -1,
            -1
          ]
        },
        {
          "i": 10,
          "val": 7,
          "D0_len": [
            1,
            2,
            3,
            2,
            3,
            3,
            4,
            5,
            3,
            5,
            4,
            1
          ],
          "D1_inx": [
            -1,
            0,
            1,
            0,
            3,
            3,
            5,
            6,
            3,
            6,
            8,
            -1
          ]
        },
        {
          "i": 11,
          "val": 15,
          "D0_len": [
            1,
            2,
            3,
            2,
            3,
            3,
            4,
            5,
            3,
            5,
            4,
            6
          ],
          "D1_inx": [
            -1,
            0,
            1,
            0,
            3,
            3,
            5,
            6,
            3,
            6,
            8,
            9
          ]
        }
      ],
      "max_length": 6,
      "backtrack_indices": [
        11,
        9,
        6,
        5,
        3,
        0
      ],
      "lis_result": [
        0,
        2,
        6,
        9,
        11,
        15
      ]
    },
    "example_2": {
      "X": [
        2,
        5,
        11,
        2,
        4,
        5,
        7,
        0,
        4,
        9,
        3,
        4
      ],
      "final_D0_len": [
        1,
        2,
        3,
        2,
        3,
        4,
        5,
        1,
        4,
        6,
        3,
        5
      ],
      "final_D1_inx": [
        -1,
        0,
        1,
        0,
        3,
        4,
        5,
        -1,
        4,
        6,
        3,
        8
      ],
      "max_length": 6,
      "backtrack_indices": [
        9,
        6,
        5,
        4,
        3,
        0
      ],
      "lis_result": [
        2,
        2,
        4,
        5,
        7,
        9
      ]
    }
  },
  "MATRIX_CHAIN_DP_TABLE": {
    "dimensions_vector_d": [
      4,
      1,
      5,
      3,
      6
    ],
    "matrices": [
      "M1 (4x1)",
      "M2 (1x5)",
      "M3 (5x3)",
      "M4 (3x6)"
    ],
    "dp_table_1_indexed": [
      [
        0,
        20,
        27,
        57
      ],
      [
        null,
        0,
        15,
        33
      ],
      [
        null,
        null,
        0,
        90
      ],
      [
        null,
        null,
        null,
        0
      ]
    ],
    "optimal_cost": 57
  },
  "SUBSET_SUM_TREE_WEHBE": {
    "V": [
      5,
      10,
      6,
      7
    ],
    "target_m": 11,
    "levels": [
      "Root (0)",
      "v0 = 5",
      "v1 = 10",
      "v2 = 6",
      "v3 = 7"
    ],
    "dfs_trace": [
      {
        "step": 1,
        "path": [],
        "sum": 0,
        "status": "active"
      },
      {
        "step": 2,
        "path": [
          0
        ],
        "sum": 0,
        "status": "active"
      },
      {
        "step": 3,
        "path": [
          0,
          0
        ],
        "sum": 0,
        "status": "active"
      },
      {
        "step": 4,
        "path": [
          0,
          0,
          0
        ],
        "sum": 0,
        "status": "active"
      },
      {
        "step": 5,
        "path": [
          0,
          0,
          0,
          0
        ],
        "sum": 0,
        "status": "leaf_not_solution"
      },
      {
        "step": 6,
        "path": [
          0,
          0,
          0,
          1
        ],
        "sum": 7,
        "status": "leaf_not_solution"
      },
      {
        "step": 7,
        "path": [
          0,
          0,
          1
        ],
        "sum": 6,
        "status": "active"
      },
      {
        "step": 8,
        "path": [
          0,
          0,
          1,
          0
        ],
        "sum": 6,
        "status": "leaf_not_solution"
      },
      {
        "step": 9,
        "path": [
          0,
          0,
          1,
          1
        ],
        "sum": 13,
        "status": "pruned_exceeds_11"
      },
      {
        "step": 10,
        "path": [
          0,
          1
        ],
        "sum": 10,
        "status": "active"
      },
      {
        "step": 11,
        "path": [
          0,
          1,
          0
        ],
        "sum": 10,
        "status": "active"
      },
      {
        "step": 12,
        "path": [
          0,
          1,
          0,
          0
        ],
        "sum": 10,
        "status": "leaf_not_solution"
      },
      {
        "step": 13,
        "path": [
          0,
          1,
          0,
          1
        ],
        "sum": 17,
        "status": "pruned_exceeds_11"
      },
      {
        "step": 14,
        "path": [
          0,
          1,
          1
        ],
        "sum": 16,
        "status": "pruned_exceeds_11",
        "skipped_leaves": [
          16,
          23
        ]
      },
      {
        "step": 15,
        "path": [
          1
        ],
        "sum": 5,
        "status": "active"
      },
      {
        "step": 16,
        "path": [
          1,
          0
        ],
        "sum": 5,
        "status": "active"
      },
      {
        "step": 17,
        "path": [
          1,
          0,
          0
        ],
        "sum": 5,
        "status": "active"
      },
      {
        "step": 18,
        "path": [
          1,
          0,
          0,
          0
        ],
        "sum": 5,
        "status": "leaf_not_solution"
      },
      {
        "step": 19,
        "path": [
          1,
          0,
          0,
          1
        ],
        "sum": 12,
        "status": "pruned_exceeds_11"
      },
      {
        "step": 20,
        "path": [
          1,
          0,
          1
        ],
        "sum": 11,
        "status": "active"
      },
      {
        "step": 21,
        "path": [
          1,
          0,
          1,
          0
        ],
        "sum": 11,
        "status": "SOLUTION_FOUND",
        "subset": [
          5,
          6
        ]
      },
      {
        "step": 22,
        "path": [
          1,
          0,
          1,
          1
        ],
        "sum": 18,
        "status": "pruned_exceeds_11"
      },
      {
        "step": 23,
        "path": [
          1,
          1
        ],
        "sum": 15,
        "status": "pruned_exceeds_11",
        "skipped_subtrees": [
          15,
          22,
          21,
          28
        ]
      }
    ]
  },
  "DFS_VS_BFS_TREES": {
    "tree_structure": {
      "root": 1,
      "children": {
        "1": [
          2,
          3
        ],
        "2": [
          4,
          5
        ],
        "3": [
          6,
          7
        ],
        "4": [
          8,
          9
        ],
        "5": [
          10,
          11
        ]
      }
    },
    "dfs_visit_order": [
      1,
      2,
      4,
      8,
      9,
      5,
      10,
      11,
      3,
      6,
      7
    ],
    "bfs_visit_order": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11
    ]
  },
  "A_STAR_SEARCH_WEHBE": {
    "start_node": "S",
    "goal_nodes": [
      "X",
      "Y",
      "Z"
    ],
    "edges": [
      {
        "u": "S",
        "v": "A",
        "w": 5
      },
      {
        "u": "S",
        "v": "B",
        "w": 9
      },
      {
        "u": "S",
        "v": "D",
        "w": 6
      },
      {
        "u": "A",
        "v": "B",
        "w": 3
      },
      {
        "u": "A",
        "v": "X",
        "w": 9
      },
      {
        "u": "B",
        "v": "A",
        "w": 2
      },
      {
        "u": "B",
        "v": "C",
        "w": 1
      },
      {
        "u": "C",
        "v": "S",
        "w": 6
      },
      {
        "u": "C",
        "v": "Y",
        "w": 5
      },
      {
        "u": "C",
        "v": "F",
        "w": 7
      },
      {
        "u": "D",
        "v": "S",
        "w": 1
      },
      {
        "u": "D",
        "v": "C",
        "w": 2
      },
      {
        "u": "D",
        "v": "E",
        "w": 2
      },
      {
        "u": "E",
        "v": "Z",
        "w": 7
      },
      {
        "u": "F",
        "v": "D",
        "w": 8
      },
      {
        "u": "F",
        "v": "Z",
        "w": 4
      }
    ],
    "heuristic_1": {
      "S": 5,
      "A": 7,
      "B": 3,
      "C": 4,
      "D": 6,
      "E": 5,
      "F": 6,
      "X": 0,
      "Y": 0,
      "Z": 0
    },
    "trace_heuristic_1": [
      {
        "step": 1,
        "expanded": "S",
        "f_val": 5,
        "generated": [
          {
            "node": "A",
            "g": 5,
            "h": 7,
            "f": 12
          },
          {
            "node": "B",
            "g": 9,
            "h": 3,
            "f": 12
          },
          {
            "node": "D",
            "g": 6,
            "h": 6,
            "f": 12
          }
        ]
      },
      {
        "step": 2,
        "expanded": "A",
        "f_val": 12,
        "generated": [
          {
            "node": "B",
            "g": 8,
            "h": 3,
            "f": 11,
            "note": "Cancels B(f=12)"
          },
          {
            "node": "X",
            "g": 14,
            "h": 0,
            "f": 14
          }
        ]
      },
      {
        "step": 3,
        "expanded": "B",
        "f_val": 11,
        "generated": [
          {
            "node": "C",
            "g": 9,
            "h": 4,
            "f": 13
          }
        ]
      },
      {
        "step": 4,
        "expanded": "D",
        "f_val": 12,
        "generated": [
          {
            "node": "C",
            "g": 8,
            "h": 4,
            "f": 12,
            "note": "Cancels C(f=13)"
          },
          {
            "node": "E",
            "g": 8,
            "h": 5,
            "f": 13
          }
        ]
      },
      {
        "step": 5,
        "expanded": "C",
        "f_val": 12,
        "generated": [
          {
            "node": "Y",
            "g": 13,
            "h": 0,
            "f": 13
          },
          {
            "node": "F",
            "g": 15,
            "h": 6,
            "f": 21
          }
        ]
      },
      {
        "step": 6,
        "expanded": "E",
        "f_val": 13,
        "generated": [
          {
            "node": "Z",
            "g": 15,
            "h": 0,
            "f": 15
          }
        ]
      },
      {
        "step": 7,
        "expanded": "Y",
        "f_val": 13,
        "status": "GOAL_REACHED",
        "optimal_path": [
          "S",
          "D",
          "C",
          "Y"
        ],
        "total_cost": 13
      }
    ],
    "heuristic_2_improved": {
      "S": 5,
      "A": 9,
      "B": 5,
      "C": 4,
      "D": 6,
      "E": 6,
      "F": 3,
      "X": 0,
      "Y": 0,
      "Z": 0
    },
    "trace_heuristic_2": [
      {
        "step": 1,
        "expanded": "S",
        "f_val": 5,
        "generated": [
          {
            "node": "D",
            "g": 6,
            "h": 6,
            "f": 12
          },
          {
            "node": "A",
            "g": 5,
            "h": 9,
            "f": 14
          },
          {
            "node": "B",
            "g": 9,
            "h": 5,
            "f": 14
          }
        ]
      },
      {
        "step": 2,
        "expanded": "D",
        "f_val": 12,
        "generated": [
          {
            "node": "C",
            "g": 8,
            "h": 4,
            "f": 12
          },
          {
            "node": "E",
            "g": 8,
            "h": 6,
            "f": 14
          }
        ]
      },
      {
        "step": 3,
        "expanded": "C",
        "f_val": 12,
        "generated": [
          {
            "node": "Y",
            "g": 13,
            "h": 0,
            "f": 13
          },
          {
            "node": "F",
            "g": 15,
            "h": 6,
            "f": 21
          }
        ]
      },
      {
        "step": 4,
        "expanded": "Y",
        "f_val": 13,
        "status": "GOAL_REACHED_DIRECTLY",
        "visited_set": [
          "S[5]",
          "D[12]",
          "C[12]",
          "Y[13]"
        ],
        "optimal_path": [
          "S",
          "D",
          "C",
          "Y"
        ],
        "total_cost": 13
      }
    ]
  },
  "FIFO_BB_VS_LIFO_BB_31_NODES": {
    "binary_tree_nodes": "1 to 31 (complete binary tree of depth 4)",
    "fifo_bb_queue_evolution": [
      {
        "visited": 1,
        "active_queue": [
          2,
          3
        ]
      },
      {
        "visited": 2,
        "active_queue": [
          3,
          4,
          5
        ]
      },
      {
        "visited": 3,
        "active_queue": [
          4,
          5,
          6,
          7
        ]
      },
      {
        "visited": 4,
        "active_queue": [
          5,
          6,
          7,
          8,
          9
        ]
      }
    ],
    "lifo_bb_stack_evolution": [
      {
        "visited": 1,
        "active_stack_top_first": [
          3,
          2
        ]
      },
      {
        "visited": 3,
        "active_stack_top_first": [
          5,
          4,
          2
        ]
      },
      {
        "visited": 5,
        "active_stack_top_first": [
          7,
          6,
          4,
          2
        ]
      },
      {
        "visited": 7,
        "active_stack_top_first": [
          9,
          8,
          6,
          4,
          2
        ]
      },
      {
        "visited": 9,
        "active_stack_top_first": [
          8,
          6,
          4,
          2
        ]
      },
      {
        "visited": 8,
        "active_stack_top_first": [
          6,
          4,
          2
        ]
      },
      {
        "visited": 6,
        "active_stack_top_first": [
          11,
          10,
          4,
          2
        ]
      }
    ]
  },
  "LCBB_JOB_SEQUENCING_TRACE": {
    "tasks": [
      {
        "id": "t1",
        "penalty": 4,
        "deadline": 1,
        "duration": 1
      },
      {
        "id": "t2",
        "penalty": 11,
        "deadline": 3,
        "duration": 2
      },
      {
        "id": "t3",
        "penalty": 7,
        "deadline": 2,
        "duration": 1
      },
      {
        "id": "t4",
        "penalty": 2,
        "deadline": 1,
        "duration": 1
      }
    ],
    "initial_upper": 24,
    "nodes_trace": [
      {
        "node": 1,
        "decision": "root",
        "u": 24,
        "c": 0,
        "global_upper": 24,
        "status": "visited"
      },
      {
        "node": 2,
        "parent": 1,
        "decision": "t1 (include)",
        "u": 20,
        "c": 0,
        "global_upper": 20,
        "status": "visited"
      },
      {
        "node": 3,
        "parent": 1,
        "decision": "~t1 (exclude)",
        "u": 24,
        "c": 4,
        "global_upper": 20,
        "status": "visited_later"
      },
      {
        "node": 4,
        "parent": 2,
        "decision": "t2 (include)",
        "u": 9,
        "c": 0,
        "global_upper": 9,
        "status": "visited"
      },
      {
        "node": 5,
        "parent": 2,
        "decision": "~t2 (exclude)",
        "u": 20,
        "c": 11,
        "global_upper": 9,
        "status": "KILLED (c=11 > upper=9)"
      },
      {
        "node": 6,
        "parent": 4,
        "decision": "t3 (include)",
        "time_used": 4,
        "deadline_t3": 2,
        "status": "INFEASIBLE (duration 1+2+1 > deadline)"
      },
      {
        "node": 7,
        "parent": 4,
        "decision": "~t3 (exclude)",
        "u": 9,
        "c": 7,
        "global_upper": 9,
        "status": "KILLED_LATER (c=7 > upper=6)"
      },
      {
        "node": 8,
        "parent": 3,
        "decision": "t2 (include)",
        "u": 13,
        "c": 4,
        "global_upper": 9,
        "status": "visited"
      },
      {
        "node": 9,
        "parent": 3,
        "decision": "~t2 (exclude)",
        "u": 24,
        "c": 15,
        "global_upper": 9,
        "status": "KILLED (c=15 > upper=9)"
      },
      {
        "node": 10,
        "parent": 8,
        "decision": "t3 (include)",
        "u": 6,
        "c": 4,
        "global_upper": 6,
        "status": "visited"
      },
      {
        "node": 11,
        "parent": 8,
        "decision": "~t3 (exclude)",
        "u": 13,
        "c": 11,
        "global_upper": 6,
        "status": "KILLED (c=11 > upper=6)"
      },
      {
        "node": 12,
        "parent": 10,
        "decision": "t4 (include)",
        "status": "INFEASIBLE (exceeds deadline)"
      },
      {
        "node": 13,
        "parent": 10,
        "decision": "~t4 (exclude)",
        "u": 6,
        "c": 6,
        "global_upper": 6,
        "status": "OPTIMAL_SOLUTION (t2, t3 included; penalty = 6)"
      }
    ]
  },
  "LCBB_01_KNAPSACK_TRACE": {
    "capacity": 15,
    "objects": [
      {
        "id": "o1",
        "v": 10,
        "w": 2
      },
      {
        "id": "o2",
        "v": 10,
        "w": 4
      },
      {
        "id": "o3",
        "v": 12,
        "w": 6
      },
      {
        "id": "o4",
        "v": 18,
        "w": 9
      }
    ],
    "nodes_trace": [
      {
        "node": 1,
        "decision": "root",
        "upper": 0,
        "status": "visited"
      },
      {
        "node": 2,
        "parent": 1,
        "decision": "o1",
        "u": -32,
        "c": -38,
        "upper": -32,
        "status": "visited"
      },
      {
        "node": 3,
        "parent": 1,
        "decision": "~o1",
        "u": -22,
        "c": -32,
        "upper": -32,
        "status": "KILLED_LATER (c=-32 >= upper=-38)"
      },
      {
        "node": 4,
        "parent": 2,
        "decision": "o2",
        "u": -32,
        "c": -38,
        "upper": -32,
        "status": "visited"
      },
      {
        "node": 5,
        "parent": 2,
        "decision": "~o2",
        "u": -22,
        "c": -36,
        "upper": -32,
        "status": "KILLED_LATER (c=-36 > upper=-38)"
      },
      {
        "node": 6,
        "parent": 4,
        "decision": "o3",
        "u": -32,
        "c": -38,
        "upper": -32,
        "status": "visited"
      },
      {
        "node": 7,
        "parent": 4,
        "decision": "~o3",
        "u": -38,
        "c": -38,
        "upper": -38,
        "status": "visited"
      },
      {
        "node": 8,
        "parent": 6,
        "decision": "o4",
        "weight": 21,
        "status": "INFEASIBLE (2+4+6+9 = 21 > 15)"
      },
      {
        "node": 9,
        "parent": 6,
        "decision": "~o4",
        "u": -32,
        "c": -32,
        "status": "KILLED (c=-32 > upper=-38)"
      },
      {
        "node": 10,
        "parent": 7,
        "decision": "o4",
        "u": -38,
        "c": -38,
        "upper": -38,
        "status": "OPTIMAL_SOLUTION (o1, o2, o4 included; weight=15, value=38)"
      },
      {
        "node": 11,
        "parent": 7,
        "decision": "~o4",
        "u": -20,
        "c": -20,
        "status": "KILLED (c=-20 > upper=-38)"
      }
    ]
  },
  "LCBB_TASK_ASSIGNMENT_TRACE": {
    "cost_matrix": [
      [
        11,
        12,
        18,
        40
      ],
      [
        14,
        15,
        13,
        22
      ],
      [
        11,
        17,
        19,
        23
      ],
      [
        17,
        14,
        20,
        28
      ]
    ],
    "upper_evolution": [
      73,
      64,
      61
    ],
    "nodes_trace": [
      {
        "node": 1,
        "path": [],
        "upper": 73,
        "status": "visited"
      },
      {
        "node": 2,
        "parent": 1,
        "assign": "a->1",
        "c": 60,
        "status": "visited"
      },
      {
        "node": 3,
        "parent": 1,
        "assign": "a->2",
        "c": 58,
        "status": "visited (min c)"
      },
      {
        "node": 4,
        "parent": 1,
        "assign": "a->3",
        "c": 65,
        "status": "KILLED (65 > 64)"
      },
      {
        "node": 5,
        "parent": 1,
        "assign": "a->4",
        "c": 78,
        "status": "KILLED (78 > 73)"
      },
      {
        "node": 6,
        "parent": 3,
        "assign": "b->1",
        "c": 68,
        "status": "KILLED (68 > 64)"
      },
      {
        "node": 7,
        "parent": 3,
        "assign": "b->3",
        "c": 59,
        "status": "visited"
      },
      {
        "node": 8,
        "parent": 3,
        "assign": "b->4",
        "c": 64,
        "status": "KILLED_LATER (64 > 61)"
      },
      {
        "node": 9,
        "parent": 7,
        "assign": "c->1, d->4",
        "c": 64,
        "upper": 64,
        "status": "visited_suboptimal"
      },
      {
        "node": 10,
        "parent": 7,
        "assign": "c->4, d->1",
        "c": 65,
        "status": "KILLED (65 > 64)"
      },
      {
        "node": 11,
        "parent": 2,
        "assign": "b->2",
        "c": 68,
        "status": "KILLED"
      },
      {
        "node": 12,
        "parent": 2,
        "assign": "b->3",
        "c": 61,
        "status": "visited"
      },
      {
        "node": 13,
        "parent": 2,
        "assign": "b->4",
        "c": 66,
        "status": "KILLED"
      },
      {
        "node": 14,
        "parent": 12,
        "assign": "c->2, d->4",
        "c": 69,
        "status": "KILLED"
      },
      {
        "node": 15,
        "parent": 12,
        "assign": "c->4, d->2",
        "c": 61,
        "upper": 61,
        "status": "OPTIMAL_SOLUTION (a->1, b->3, c->4, d->2; cost = 11+13+23+14 = 61)"
      }
    ]
  },
  "MINMAX_AND_ALPHABETA_TRACE_WEHBE": {
    "tree_structure": {
      "A_MAX": [
        "B_MIN",
        "C_MIN"
      ],
      "B_MIN": [
        "D_MAX",
        "E_MAX"
      ],
      "C_MIN": [
        "F_MAX",
        "G_MAX"
      ],
      "D_MAX": [
        {
          "H": 3
        },
        {
          "I": 5
        }
      ],
      "E_MAX": [
        {
          "J": 6
        },
        {
          "K": 9
        }
      ],
      "F_MAX": [
        {
          "L": 1
        },
        {
          "M": 2
        }
      ],
      "G_MAX": [
        {
          "N": 0
        },
        {
          "O": -1
        }
      ]
    },
    "pure_minmax_results": {
      "D": "max(3, 5) = 5",
      "E": "max(6, 9) = 9",
      "B": "min(5, 9) = 5",
      "F": "max(1, 2) = 2",
      "G": "max(0, -1) = 0",
      "C": "min(2, 0) = 0",
      "A": "max(5, 0) = 5 (All 8 leaves evaluated)"
    },
    "alphabeta_frames": [
      {
        "step": 1,
        "node": "A",
        "alfa": "-inf",
        "beta": "+inf",
        "action": "Init at root A, descend to B then D"
      },
      {
        "step": 2,
        "node": "D",
        "alfa": "-inf",
        "beta": "+inf",
        "eval_leaf": "H=3",
        "new_alfa": 3
      },
      {
        "step": 3,
        "node": "D",
        "alfa": 3,
        "beta": "+inf",
        "eval_leaf": "I=5",
        "new_alfa": 5,
        "return": 5
      },
      {
        "step": 4,
        "node": "B",
        "alfa": "-inf",
        "beta": "+inf",
        "child_D_returned": 5,
        "new_beta": 5,
        "action": "Pass alfa=-inf, beta=5 to E"
      },
      {
        "step": 5,
        "node": "E",
        "alfa": "-inf",
        "beta": 5,
        "eval_leaf": "J=6",
        "new_alfa": 6,
        "condition": "alfa (6) >= beta (5)",
        "action": "PRUNE leaf K:9! E returns 6"
      },
      {
        "step": 6,
        "node": "B",
        "return": "min(5, 6) = 5"
      },
      {
        "step": 7,
        "node": "A",
        "child_B_returned": 5,
        "new_alfa": 5,
        "beta": "+inf",
        "action": "Pass alfa=5, beta=+inf to C then F"
      },
      {
        "step": 8,
        "node": "F",
        "alfa": 5,
        "beta": "+inf",
        "eval_leaf": "L=1",
        "note": "alfa remains 5"
      },
      {
        "step": 9,
        "node": "F",
        "alfa": 5,
        "beta": "+inf",
        "eval_leaf": "M=2",
        "note": "alfa remains 5",
        "return": "max(1, 2) = 2"
      },
      {
        "step": 10,
        "node": "C",
        "alfa": 5,
        "beta": "+inf",
        "child_F_returned": 2,
        "new_beta": 2,
        "condition": "alfa (5) >= beta (2)",
        "action": "PRUNE entire subtree G (leaves N:0 and O:-1)! C returns 2"
      },
      {
        "step": 11,
        "node": "A",
        "return": "max(5, 2) = 5"
      }
    ]
  },
  "FACTORIAL_CALL_STACK": {
    "call": "Fact(4)",
    "frames": [
      {
        "step": 1,
        "phase": "push",
        "stack": [
          "4 * Fact(3)"
        ],
        "note": "Llamada inicial Fact(4) espera a Fact(3)"
      },
      {
        "step": 2,
        "phase": "push",
        "stack": [
          "4 * Fact(3)",
          "3 * Fact(2)"
        ],
        "note": "Se apila Fact(3)"
      },
      {
        "step": 3,
        "phase": "push",
        "stack": [
          "4 * Fact(3)",
          "3 * Fact(2)",
          "2 * Fact(1)"
        ],
        "note": "Se apila Fact(2)"
      },
      {
        "step": 4,
        "phase": "push",
        "stack": [
          "4 * Fact(3)",
          "3 * Fact(2)",
          "2 * Fact(1)",
          "1 * Fact(0)"
        ],
        "note": "Se apila Fact(1)"
      },
      {
        "step": 5,
        "phase": "base_case",
        "stack": [
          "4 * Fact(3)",
          "3 * Fact(2)",
          "2 * Fact(1)",
          "1 * Fact(0)",
          "1"
        ],
        "note": "Caso base n=0 devuelve 1"
      },
      {
        "step": 6,
        "phase": "pop_resolve",
        "stack": [
          "4 * Fact(3)",
          "3 * Fact(2)",
          "2 * Fact(1)",
          "1 * 1 = 1"
        ],
        "returned": 1
      },
      {
        "step": 7,
        "phase": "pop_resolve",
        "stack": [
          "4 * Fact(3)",
          "3 * Fact(2)",
          "2 * 1 = 2"
        ],
        "returned": 2
      },
      {
        "step": 8,
        "phase": "pop_resolve",
        "stack": [
          "4 * Fact(3)",
          "3 * 2 = 6"
        ],
        "returned": 6
      },
      {
        "step": 9,
        "phase": "pop_resolve",
        "stack": [
          "4 * 6 = 24"
        ],
        "returned": 24
      }
    ]
  },
  "BINARY_SEARCH_TRACE": {
    "array": [
      1,
      3,
      7,
      10,
      25,
      106,
      121,
      130,
      145
    ],
    "target_x": 3,
    "frames": [
      {
        "step": 1,
        "ini": 0,
        "fin": 8,
        "mid": 4,
        "mid_val": 25,
        "comparison": "3 < 25 -> ir a izquierda [0..3]"
      },
      {
        "step": 2,
        "ini": 0,
        "fin": 3,
        "mid": 1,
        "mid_val": 3,
        "comparison": "3 == 3 -> ¡Encontrado en índice 1!"
      }
    ]
  },
  "MERGESORT_FULL_SLIDE_TRACE": {
    "initial_array": [
      7,
      1,
      8,
      5,
      3,
      6,
      2,
      9,
      0,
      4
    ],
    "frames": [
      {
        "step": 1,
        "phase": "initial",
        "groups": [
          [
            7,
            1,
            8,
            5,
            3,
            6,
            2,
            9,
            0,
            4
          ]
        ]
      },
      {
        "step": 2,
        "phase": "split_1",
        "groups": [
          [
            7,
            1,
            8,
            5,
            3
          ],
          [
            6,
            2,
            9,
            0,
            4
          ]
        ]
      },
      {
        "step": 3,
        "phase": "split_2",
        "groups": [
          [
            7,
            1,
            8
          ],
          [
            5,
            3
          ],
          [
            6,
            2,
            9
          ],
          [
            0,
            4
          ]
        ]
      },
      {
        "step": 4,
        "phase": "split_3",
        "groups": [
          [
            7,
            1
          ],
          [
            8
          ],
          [
            5
          ],
          [
            3
          ],
          [
            6,
            2
          ],
          [
            9
          ],
          [
            0
          ],
          [
            4
          ]
        ]
      },
      {
        "step": 5,
        "phase": "split_4_leaves",
        "groups": [
          [
            7
          ],
          [
            1
          ],
          [
            8
          ],
          [
            5
          ],
          [
            3
          ],
          [
            6
          ],
          [
            2
          ],
          [
            9
          ],
          [
            0
          ],
          [
            4
          ]
        ]
      },
      {
        "step": 6,
        "phase": "merge_level_1",
        "groups": [
          [
            1,
            7
          ],
          [
            8
          ],
          [
            3,
            5
          ],
          [
            2,
            6
          ],
          [
            9
          ],
          [
            0,
            4
          ]
        ]
      },
      {
        "step": 7,
        "phase": "merge_level_2",
        "groups": [
          [
            1,
            7,
            8
          ],
          [
            3,
            5
          ],
          [
            2,
            6,
            9
          ],
          [
            0,
            4
          ]
        ]
      },
      {
        "step": 8,
        "phase": "merge_level_3",
        "groups": [
          [
            1,
            3,
            5,
            7,
            8
          ],
          [
            0,
            2,
            4,
            6,
            9
          ]
        ]
      },
      {
        "step": 9,
        "phase": "merge_final",
        "groups": [
          [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
          ]
        ]
      }
    ],
    "merge_detail_step_8_to_9": {
      "left_sub": [
        1,
        3,
        5,
        7,
        8
      ],
      "right_sub": [
        0,
        2,
        4,
        6,
        9
      ],
      "pointer_comparisons": [
        {
          "i_val": 1,
          "j_val": 0,
          "winner": 0,
          "w": [
            0
          ]
        },
        {
          "i_val": 1,
          "j_val": 2,
          "winner": 1,
          "w": [
            0,
            1
          ]
        },
        {
          "i_val": 3,
          "j_val": 2,
          "winner": 2,
          "w": [
            0,
            1,
            2
          ]
        },
        {
          "i_val": 3,
          "j_val": 4,
          "winner": 3,
          "w": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "i_val": 5,
          "j_val": 4,
          "winner": 4,
          "w": [
            0,
            1,
            2,
            3,
            4
          ]
        },
        {
          "i_val": 5,
          "j_val": 6,
          "winner": 5,
          "w": [
            0,
            1,
            2,
            3,
            4,
            5
          ]
        },
        {
          "i_val": 7,
          "j_val": 6,
          "winner": 6,
          "w": [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ]
        },
        {
          "i_val": 7,
          "j_val": 9,
          "winner": 7,
          "w": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
          ]
        },
        {
          "i_val": 8,
          "j_val": 9,
          "winner": 8,
          "w": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ]
        },
        {
          "i_val": "end",
          "j_val": 9,
          "winner": 9,
          "w": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
          ]
        }
      ]
    }
  },
  "QUICKSORT_AND_PIVOT_SLIDE_TRACE": {
    "initial_array": [
      7,
      1,
      8,
      5,
      3,
      6,
      2,
      9,
      0,
      4
    ],
    "first_partition_detail": [
      {
        "frame": 1,
        "array": [
          7,
          1,
          8,
          5,
          3,
          6,
          2,
          9,
          0,
          4
        ],
        "p": 7,
        "i": 1,
        "j": 9,
        "note": "Inicialización: p=7, i apunta a 1 (<=7), j apunta a 4 (<=7)"
      },
      {
        "frame": 2,
        "array": [
          7,
          1,
          8,
          5,
          3,
          6,
          2,
          9,
          0,
          4
        ],
        "p": 7,
        "i": 2,
        "j": 9,
        "note": "i avanza hasta 8 (>7) y se detiene; j ya está en 4 (<=7). Como i < j, se intercambian u[2]=8 y u[9]=4"
      },
      {
        "frame": 3,
        "array": [
          7,
          1,
          4,
          5,
          3,
          6,
          2,
          9,
          0,
          8
        ],
        "p": 7,
        "i": 7,
        "j": 8,
        "note": "Tras swap(8,4): i avanza por 4,5,3,6,2 y frena en u[7]=9 (>7); j retrocede de 8 a u[8]=0 (<=7). Swap(9,0)"
      },
      {
        "frame": 4,
        "array": [
          7,
          1,
          4,
          5,
          3,
          6,
          2,
          0,
          9,
          8
        ],
        "p": 7,
        "i": 8,
        "j": 7,
        "note": "i avanza a u[8]=9; j retrocede a u[7]=0. Ahora i > j: termina el ciclo while(i < j)"
      },
      {
        "frame": 5,
        "array": [
          0,
          1,
          4,
          5,
          3,
          6,
          2,
          7,
          9,
          8
        ],
        "p": 7,
        "fixed_indices": [
          7
        ],
        "note": "Se intercambia u[ini]=7 con u[j]=0. El pivot 7 queda fijo en su posición definitiva (índice 7)"
      }
    ],
    "recursive_levels_trace": [
      {
        "level": 0,
        "state": [
          7,
          1,
          8,
          5,
          3,
          6,
          2,
          9,
          0,
          4
        ],
        "fixed": []
      },
      {
        "level": 1,
        "state": [
          0,
          1,
          4,
          5,
          3,
          6,
          2,
          7,
          9,
          8
        ],
        "fixed": [
          7
        ]
      },
      {
        "level": 2,
        "state": [
          0,
          1,
          4,
          5,
          3,
          6,
          2,
          7,
          8,
          9
        ],
        "fixed": [
          0,
          7,
          9
        ]
      },
      {
        "level": 3,
        "state": [
          0,
          1,
          4,
          5,
          3,
          6,
          2,
          7,
          8,
          9
        ],
        "fixed": [
          0,
          1,
          7,
          8,
          9
        ]
      },
      {
        "level": 4,
        "state": [
          0,
          1,
          3,
          2,
          4,
          6,
          5,
          7,
          8,
          9
        ],
        "fixed": [
          0,
          1,
          4,
          7,
          8,
          9
        ]
      },
      {
        "level": 5,
        "state": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9
        ],
        "fixed": [
          0,
          1,
          3,
          4,
          6,
          7,
          8,
          9
        ]
      },
      {
        "level": 6,
        "state": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9
        ],
        "fixed": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9
        ]
      }
    ]
  },
  "FIBONACCI_REDUNDANT_TREE_F7": {
    "root": "F7",
    "node_types": {
      "normal_first_calc": [
        "F7",
        "F6",
        "F5 (left)",
        "F4 (leftmost)",
        "F3 (leftmost)",
        "F2 (leftmost)"
      ],
      "base_cases": [
        "F1 (x13)",
        "F0 (x8)"
      ],
      "recalculated_redundant_subtrees": [
        "F5 (hijo derecho de F7 - todo el subárbol recalculado)",
        "F4 (hijo derecho de F6 y hijo izquierdo de F5 derecho - recalculado 2 veces extra)",
        "F3 (recalculado 4 veces extra)",
        "F2 (recalculado 7 veces extra)"
      ]
    }
  },
  "HANOI_4_DISKS_COMPLETE_15_MOVES": {
    "initial_state": {
      "Peg_1": [
        4,
        3,
        2,
        1
      ],
      "Peg_2": [],
      "Peg_3": []
    },
    "frames": [
      {
        "move": 0,
        "Peg_1": [
          4,
          3,
          2,
          1
        ],
        "Peg_2": [],
        "Peg_3": []
      },
      {
        "move": 1,
        "disk": 1,
        "from": 1,
        "to": 2,
        "Peg_1": [
          4,
          3,
          2
        ],
        "Peg_2": [
          1
        ],
        "Peg_3": []
      },
      {
        "move": 2,
        "disk": 2,
        "from": 1,
        "to": 3,
        "Peg_1": [
          4,
          3
        ],
        "Peg_2": [
          1
        ],
        "Peg_3": [
          2
        ]
      },
      {
        "move": 3,
        "disk": 1,
        "from": 2,
        "to": 3,
        "Peg_1": [
          4,
          3
        ],
        "Peg_2": [],
        "Peg_3": [
          2,
          1
        ]
      },
      {
        "move": 4,
        "disk": 3,
        "from": 1,
        "to": 2,
        "Peg_1": [
          4
        ],
        "Peg_2": [
          3
        ],
        "Peg_3": [
          2,
          1
        ]
      },
      {
        "move": 5,
        "disk": 1,
        "from": 3,
        "to": 1,
        "Peg_1": [
          4,
          1
        ],
        "Peg_2": [
          3
        ],
        "Peg_3": [
          2
        ]
      },
      {
        "move": 6,
        "disk": 2,
        "from": 3,
        "to": 2,
        "Peg_1": [
          4,
          1
        ],
        "Peg_2": [
          3,
          2
        ],
        "Peg_3": []
      },
      {
        "move": 7,
        "disk": 1,
        "from": 1,
        "to": 2,
        "Peg_1": [
          4
        ],
        "Peg_2": [
          3,
          2,
          1
        ],
        "Peg_3": []
      },
      {
        "move": 8,
        "disk": 4,
        "from": 1,
        "to": 3,
        "Peg_1": [],
        "Peg_2": [
          3,
          2,
          1
        ],
        "Peg_3": [
          4
        ]
      },
      {
        "move": 9,
        "disk": 1,
        "from": 2,
        "to": 3,
        "Peg_1": [],
        "Peg_2": [
          3,
          2
        ],
        "Peg_3": [
          4,
          1
        ]
      },
      {
        "move": 10,
        "disk": 2,
        "from": 2,
        "to": 1,
        "Peg_1": [
          2
        ],
        "Peg_2": [
          3
        ],
        "Peg_3": [
          4,
          1
        ]
      },
      {
        "move": 11,
        "disk": 1,
        "from": 3,
        "to": 1,
        "Peg_1": [
          2,
          1
        ],
        "Peg_2": [
          3
        ],
        "Peg_3": [
          4
        ]
      },
      {
        "move": 12,
        "disk": 3,
        "from": 2,
        "to": 3,
        "Peg_1": [
          2,
          1
        ],
        "Peg_2": [],
        "Peg_3": [
          4,
          3
        ]
      },
      {
        "move": 13,
        "disk": 1,
        "from": 1,
        "to": 2,
        "Peg_1": [
          2
        ],
        "Peg_2": [
          1
        ],
        "Peg_3": [
          4,
          3
        ]
      },
      {
        "move": 14,
        "disk": 2,
        "from": 1,
        "to": 3,
        "Peg_1": [],
        "Peg_2": [
          1
        ],
        "Peg_3": [
          4,
          3,
          2
        ]
      },
      {
        "move": 15,
        "disk": 1,
        "from": 2,
        "to": 3,
        "Peg_1": [],
        "Peg_2": [],
        "Peg_3": [
          4,
          3,
          2,
          1
        ]
      }
    ]
  },
  "PSEUDO_M_COMPLETE_TREE_TRACE": {
    "input_vector": [
      1,
      3,
      5,
      1,
      1,
      2,
      3,
      3,
      1,
      1,
      1
    ],
    "tree_levels": [
      {
        "level": 4,
        "description": "Casos base de longitud 1 en el nivel más profundo",
        "nodes": [
          {
            "sub": [
              1
            ],
            "tuple": "(T,1,1,1)"
          },
          {
            "sub": [
              1
            ],
            "tuple": "(T,1,1,1)"
          },
          {
            "sub": [
              3
            ],
            "tuple": "(T,1,1,3)"
          },
          {
            "sub": [
              3
            ],
            "tuple": "(T,1,1,3)"
          },
          {
            "sub": [
              1
            ],
            "tuple": "(T,1,1,1)"
          },
          {
            "sub": [
              1
            ],
            "tuple": "(T,1,1,1)"
          }
        ]
      },
      {
        "level": 3,
        "description": "Hojas de nivel 3 y primeras combinaciones por Caso 3 y Caso 5b",
        "nodes": [
          {
            "sub": [
              1
            ],
            "tuple": "(T,1,1,1)",
            "rule": "Base"
          },
          {
            "sub": [
              3
            ],
            "tuple": "(T,1,1,3)",
            "rule": "Base"
          },
          {
            "sub": [
              5
            ],
            "tuple": "(T,1,1,5)",
            "rule": "Base"
          },
          {
            "sub": [
              1,
              1
            ],
            "tuple": "(T,2,2,1)",
            "rule": "Caso 3 (mismo candidato 1)"
          },
          {
            "sub": [
              2
            ],
            "tuple": "(T,1,1,2)",
            "rule": "Base"
          },
          {
            "sub": [
              3,
              3
            ],
            "tuple": "(T,2,2,3)",
            "rule": "Caso 3 (mismo candidato 3)"
          },
          {
            "sub": [
              1
            ],
            "tuple": "(T,1,1,1)",
            "rule": "Base"
          },
          {
            "sub": [
              1,
              1
            ],
            "tuple": "(T,2,2,1)",
            "rule": "Caso 3 (mismo candidato 1)"
          }
        ]
      },
      {
        "level": 2,
        "description": "Combinaciones intermedias",
        "nodes": [
          {
            "sub": [
              1,
              3
            ],
            "tuple": "(F,2,0,0)",
            "rule": "Caso 5b (x1!=x2, c1==c2==1, n1==n2==1)"
          },
          {
            "sub": [
              5,
              1,
              1
            ],
            "tuple": "(T,3,2,1)",
            "rule": "Caso 4 (c2=2 > c1=1 -> n1+c2-c1 = 1+2-1 = 2, x=1)"
          },
          {
            "sub": [
              2,
              3,
              3
            ],
            "tuple": "(T,3,2,3)",
            "rule": "Caso 4 (c2=2 > c1=1 -> 1+2-1 = 2, x=3)"
          },
          {
            "sub": [
              1,
              1,
              1
            ],
            "tuple": "(T,3,3,1)",
            "rule": "Caso 3 (mismo candidato 1 -> c = 1+2 = 3)"
          }
        ]
      },
      {
        "level": 1,
        "description": "Combinación de las dos mitades principales",
        "nodes": [
          {
            "sub": [
              1,
              3,
              5,
              1,
              1
            ],
            "tuple": "(T,5,3,1)",
            "rule": "Caso 2 (o1 es F, o2 es T -> c = 2 + 2/2 = 3, x=1)"
          },
          {
            "sub": [
              2,
              3,
              3,
              1,
              1,
              1
            ],
            "tuple": "(T,6,4,1)",
            "rule": "Caso 4 (x1=3 vs x2=1, c2=3 > c1=2 -> c = 3+3-2 = 4, x=1)"
          }
        ]
      },
      {
        "level": 0,
        "description": "Raíz: resultado final de Pseudo-M",
        "nodes": [
          {
            "sub": [
              1,
              3,
              5,
              1,
              1,
              2,
              3,
              3,
              1,
              1,
              1
            ],
            "tuple": "(T,11,7,1)",
            "rule": "Caso 3 (ambos tienen candidato x=1 -> c = 3+4 = 7, n=11)"
          }
        ],
        "verification": "El candidato 1 aparece 6 veces en el arreglo de longitud 11 (6 >= 11/2 + 1 = 6) -> 1 ES MAYORITARIO"
      }
    ]
  },
  "BRIDGE_TOURNAMENT_8X7_FIXTURE": {
    "teams": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "days": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "frames": [
      {
        "step": 1,
        "stage": "Casos base: 4 pares (1-2, 3-4, 5-6, 7-8) en el Día 1",
        "filled_cols": [
          1
        ],
        "col_1": [
          2,
          1,
          4,
          3,
          6,
          5,
          8,
          7
        ]
      },
      {
        "step": 2,
        "stage": "CompletarT(1,4) y CompletarT(5,8): llena Días 2 y 3 para cada subgrupo de 4 equipos",
        "filled_cols": [
          1,
          2,
          3
        ],
        "submatrix_days_1_to_3": [
          [
            2,
            3,
            4
          ],
          [
            1,
            4,
            3
          ],
          [
            4,
            1,
            2
          ],
          [
            3,
            2,
            1
          ],
          [
            6,
            7,
            8
          ],
          [
            5,
            8,
            7
          ],
          [
            8,
            5,
            6
          ],
          [
            7,
            6,
            5
          ]
        ]
      },
      {
        "step": 3,
        "stage": "CompletarT(1,8) - Primer ciclo: asigna rivales de Equipo 1 (fila 1) y Equipo 5 (fila 5) en Días 4 a 7",
        "row_1_days_4_to_7": [
          5,
          6,
          7,
          8
        ],
        "row_5_days_4_to_7": [
          1,
          2,
          3,
          4
        ]
      },
      {
        "step": 4,
        "stage": "CompletarT(1,8) - Ciclos anidados: rotación circular de la fila superior hacia la derecha (LastDay pasa a FirstDay)",
        "final_matrix_8x7": [
          [
            2,
            3,
            4,
            5,
            6,
            7,
            8
          ],
          [
            1,
            4,
            3,
            8,
            5,
            6,
            7
          ],
          [
            4,
            1,
            2,
            7,
            8,
            5,
            6
          ],
          [
            3,
            2,
            1,
            6,
            7,
            8,
            5
          ],
          [
            6,
            7,
            8,
            1,
            2,
            3,
            4
          ],
          [
            5,
            8,
            7,
            4,
            1,
            2,
            3
          ],
          [
            8,
            5,
            6,
            3,
            4,
            1,
            2
          ],
          [
            7,
            6,
            5,
            2,
            3,
            4,
            1
          ]
        ]
      }
    ]
  },
  "LMPS_AND_RMPS_SLIDE_TRACE": {
    "array": [
      3,
      2,
      -6,
      4,
      -2,
      6,
      3,
      -1,
      7,
      -3
    ],
    "indices": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "lmps_trace_for_lambda_6": [
      {
        "i": 6,
        "val": 3,
        "suma_actual": 3,
        "LMPS_6": 6,
        "suma_LMPS_6": 3
      },
      {
        "i": 5,
        "val": 6,
        "suma_actual": 9,
        "LMPS_6": 5,
        "suma_LMPS_6": 9
      },
      {
        "i": 4,
        "val": -2,
        "suma_actual": 7,
        "LMPS_6": 5,
        "suma_LMPS_6": 9
      },
      {
        "i": 3,
        "val": 4,
        "suma_actual": 11,
        "LMPS_6": 3,
        "suma_LMPS_6": 11
      },
      {
        "i": 2,
        "val": -6,
        "suma_actual": 5,
        "LMPS_6": 3,
        "suma_LMPS_6": 11
      },
      {
        "i": 1,
        "val": 2,
        "suma_actual": 7,
        "LMPS_6": 3,
        "suma_LMPS_6": 11
      },
      {
        "i": 0,
        "val": 3,
        "suma_actual": 10,
        "LMPS_6": 3,
        "suma_LMPS_6": 11,
        "final_range": "[3..6] = 4 - 2 + 6 + 3 = 11"
      }
    ],
    "rmps_trace_for_rho_1": [
      {
        "j": 1,
        "val": 2,
        "suma_actual": 2,
        "RMPS_1": 1,
        "suma_RMPS_1": 2
      },
      {
        "j": 2,
        "val": -6,
        "suma_actual": -4,
        "RMPS_1": 1,
        "suma_RMPS_1": 2
      },
      {
        "j": 3,
        "val": 4,
        "suma_actual": 0,
        "RMPS_1": 1,
        "suma_RMPS_1": 2
      },
      {
        "j": 4,
        "val": -2,
        "suma_actual": -2,
        "RMPS_1": 1,
        "suma_RMPS_1": 2
      },
      {
        "j": 5,
        "val": 6,
        "suma_actual": 4,
        "RMPS_1": 5,
        "suma_RMPS_1": 4
      },
      {
        "j": 6,
        "val": 3,
        "suma_actual": 7,
        "RMPS_1": 6,
        "suma_RMPS_1": 7
      },
      {
        "j": 7,
        "val": -1,
        "suma_actual": 6,
        "RMPS_1": 6,
        "suma_RMPS_1": 7
      },
      {
        "j": 8,
        "val": 7,
        "suma_actual": 13,
        "RMPS_1": 8,
        "suma_RMPS_1": 13
      },
      {
        "j": 9,
        "val": -3,
        "suma_actual": 10,
        "RMPS_1": 8,
        "suma_RMPS_1": 13,
        "final_range": "[1..8] = 13"
      }
    ]
  }
};

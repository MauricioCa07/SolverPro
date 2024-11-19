import React, { useState } from "react";
import Plot from "react-plotly.js";
import Navbar from "../../../components/Navbar";

export function SOR_Main() {
  return (
    <>
      <Navbar />
      <SORForm />
    </>
  );
}

function SORForm() {
  const [matrix, setMatrix] = useState<string>(""); // Matriz A en formato texto
  const [vectorB, setVectorB] = useState<string>(""); // Vector b en formato texto
  const [w, setW] = useState<number>(1.2); // Factor de relajación
  const [tol, setTol] = useState<number>(0.001); // Tolerancia
  const [maxIter, setMaxIter] = useState<number>(100); // Iteraciones máximas
  const [result, setResult] = useState<{
    solution: number[];
    errors: number[];
  } | null>(null); // Resultado del cálculo

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const A = parseMatrix(matrix);
      const b = parseVector(vectorB);

      if (A.length !== b.length || A.some(row => row.length !== b.length)) {
        alert("La matriz debe ser cuadrada y compatible con el vector b.");
        return;
      }

      const { solution, errors } = SOR(A, b, w, tol, maxIter);
      setResult({ solution, errors });
    } catch (error) {
      alert("Entrada inválida. Asegúrese de ingresar una matriz cuadrada y un vector compatibles.");
    }
  };

  return (
    <div>
      <h2>Método SOR</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Matriz (A):</label>
          <textarea
            value={matrix}
            onChange={(e) => setMatrix(e.target.value)}
            placeholder="Ejemplo: 4 -1 0\n-1 4 -1\n0 -1 4"
            required
          />
        </div>
        <div>
          <label>Vector (b):</label>
          <textarea
            value={vectorB}
            onChange={(e) => setVectorB(e.target.value)}
            placeholder="Ejemplo: 15 10 10"
            required
          />
        </div>
        <div>
          <label>Factor de Relajación (w):</label>
          <input
            type="number"
            step="0.1"
            value={w}
            onChange={(e) => setW(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Tolerancia:</label>
          <input
            type="number"
            step="0.0001"
            value={tol}
            onChange={(e) => setTol(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Iteraciones Máximas:</label>
          <input
            type="number"
            value={maxIter}
            onChange={(e) => setMaxIter(parseInt(e.target.value))}
          />
        </div>
        <button type="submit">Calcular</button>
      </form>

      {result && (
        <div>
          <h3>Solución:</h3>
          <pre>{JSON.stringify(result.solution, null, 2)}</pre>
          <h3>Gráfica de Convergencia:</h3>
          <Plot
            data={[
              {
                x: Array.from({ length: result.errors.length }, (_, i) => i + 1),
                y: result.errors,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
                name: "Error",
              },
            ]}
            layout={{
              title: "Convergencia del Método SOR",
              xaxis: { title: "Iteración" },
              yaxis: { title: "Norma del Error" },
            }}
          />
        </div>
      )}
    </div>
  );
}

function parseMatrix(input: string): number[][] {
  return input
    .trim()
    .split("\n")
    .map(row => row.trim().split(/\s+/).map(Number));
}

function parseVector(input: string): number[] {
  return input
    .trim()
    .split(/\s+/)
    .map(Number);
}

function SOR(
  A: number[][],
  b: number[],
  w: number,
  tol: number,
  maxIter: number
): { solution: number[]; errors: number[] } {
  const n = A.length;
  let x = Array(n).fill(0); // Vector inicial
  let errors: number[] = []; // Errores por iteración

  for (let iter = 0; iter < maxIter; iter++) {
    const xNew = [...x];

    for (let i = 0; i < n; i++) {
      const sigma1 = A[i].slice(0, i).reduce((sum, aij, j) => sum + aij * xNew[j], 0);
      const sigma2 = A[i].slice(i + 1).reduce((sum, aij, j) => sum + aij * x[j + i + 1], 0);
      xNew[i] = (1 - w) * x[i] + (w / A[i][i]) * (b[i] - sigma1 - sigma2);
    }

    const error = Math.sqrt(xNew.reduce((sum, xi, i) => sum + Math.pow(xi - x[i], 2), 0));
    errors.push(error);
    x = xNew;

    if (error < tol) break;
  }

  return { solution: x, errors };
}



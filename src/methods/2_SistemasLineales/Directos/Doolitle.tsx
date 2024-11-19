import React, { useState } from "react";
import Navbar from "../../../components/Navbar";

export function Doolittle_Main() {
  return (
    <>
      <Navbar />
      <DoolittleForm />
    </>
  );
}

function DoolittleForm() {
  const [matrix, setMatrix] = useState<string>(""); // Matriz A
  const [vectorB, setVectorB] = useState<string>(""); // Vector b
  const [result, setResult] = useState<{
    L: number[][];
    U: number[][];
    x: number[];
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const A = parseMatrix(matrix);
      const b = parseVector(vectorB);

      if (A.length !== b.length || A.some(row => row.length !== b.length)) {
        alert("La matriz debe ser cuadrada y compatible con el vector b.");
        return;
      }

      const { L, U, x } = Doolittle(A, b);
      setResult({ L, U, x });
    } catch (error) {
      alert("Entrada inválida. Asegúrese de ingresar una matriz cuadrada y un vector compatibles.");
    }
  };

  return (
    <div>
      <h2>Método de Doolittle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Matriz (A):</label>
          <textarea
            value={matrix}
            onChange={(e) => setMatrix(e.target.value)}
            placeholder="Ejemplo: 4 2 0\n4 4 2\n2 2 3"
            required
          />
        </div>
        <div>
          <label>Vector (b):</label>
          <textarea
            value={vectorB}
            onChange={(e) => setVectorB(e.target.value)}
            placeholder="Ejemplo: 2 4 6"
            required
          />
        </div>
        <button type="submit">Calcular</button>
      </form>

      {result && (
        <div>
          <h3>Matriz L:</h3>
          <pre>{JSON.stringify(result.L, null, 2)}</pre>
          <h3>Matriz U:</h3>
          <pre>{JSON.stringify(result.U, null, 2)}</pre>
          <h3>Solución x:</h3>
          <pre>{JSON.stringify(result.x, null, 2)}</pre>
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

function Doolittle(A: number[][], b: number[]): { L: number[][]; U: number[][]; x: number[] } {
  const n = A.length;
  const L = Array.from({ length: n }, () => Array(n).fill(0));
  const U = Array.from({ length: n }, () => Array(n).fill(0));
  const x = Array(n).fill(0);
  const y = Array(n).fill(0);

  // Factorización
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      U[i][j] = A[i][j] - L[i].slice(0, i).reduce((sum, lij, k) => sum + lij * U[k][j], 0);
    }
    for (let j = i + 1; j < n; j++) {
      L[j][i] = (A[j][i] - L[j].slice(0, i).reduce((sum, lkj, k) => sum + lkj * U[k][i], 0)) / U[i][i];
    }
    L[i][i] = 1;
  }

  // Resolución Ly = b
  for (let i = 0; i < n; i++) {
    y[i] = b[i] - L[i].slice(0, i).reduce((sum, lij, k) => sum + lij * y[k], 0);
  }

  // Resolución Ux = y
  for (let i = n - 1; i >= 0; i--) {
    x[i] = (y[i] - U[i].slice(i + 1).reduce((sum, uij, k) => sum + uij * x[k + i + 1], 0)) / U[i][i];
  }

  return { L, U, x };
}

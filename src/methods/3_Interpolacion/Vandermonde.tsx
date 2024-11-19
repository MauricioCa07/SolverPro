import React, { useState } from "react";
import Plot from "react-plotly.js";
import Navbar from "../../../components/Navbar";

export function Vandermonde_Main() {
  return (
    <>
      <Navbar />
      <VandermondeForm />
    </>
  );
}

function VandermondeForm() {
  const [points, setPoints] = useState<string>(""); // Cadena para entradas de puntos
  const [coefficients, setCoefficients] = useState<number[] | null>(null); // Coeficientes del polinomio
  const [graphData, setGraphData] = useState<{ x: number[]; y: number[] } | null>(null);

  // Función para procesar puntos y calcular el polinomio interpolante
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedPoints = parsePoints(points);
      const { X, Y } = splitPoints(parsedPoints);
      const coef = calculateVandermonde(X, Y);
      setCoefficients(coef);

      // Generar datos para graficar
      const graph = generateGraphData(X, coef);
      setGraphData(graph);
    } catch (error) {
      alert("Error en el formato de los puntos. Use el formato: x1,y1 x2,y2 ...");
    }
  };

  // Función para graficar el polinomio interpolante
  const generateGraphData = (X: number[], coef: number[]) => {
    const xMin = Math.min(...X) - 1;
    const xMax = Math.max(...X) + 1;
    const xValues = Array.from({ length: 100 }, (_, i) => xMin + (i * (xMax - xMin)) / 99); // 100 puntos
    const yValues = xValues.map((x) => evaluatePolynomial(coef, x));
    return { x: xValues, y: yValues };
  };

  return (
    <div>
      <h2>Método de Vandermonde</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingrese los puntos (formato: x1,y1 x2,y2 ...):</label>
          <input
            type="text"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Ejemplo: 1,2 2,3 3,5"
            required
          />
        </div>
        <button type="submit">Calcular</button>
      </form>

      {coefficients && (
        <div>
          <h3>Coeficientes del Polinomio:</h3>
          <pre>{JSON.stringify(coefficients, null, 2)}</pre>
        </div>
      )}

      {graphData && (
        <div>
          <h3>Gráfica del Polinomio Interpolante:</h3>
          <Plot
            data={[
              {
                x: graphData.x,
                y: graphData.y,
                type: "scatter",
                mode: "lines",
                marker: { color: "blue" },
              },
            ]}
            layout={{ title: "Polinomio Interpolante", xaxis: { title: "x" }, yaxis: { title: "y" } }}
          />
        </div>
      )}
    </div>
  );
}

// Función para convertir cadena de puntos en un array de pares [x, y]
function parsePoints(input: string): [number, number][] {
  return input.split(" ").map((point) => {
    const [x, y] = point.split(",").map(Number);
    if (isNaN(x) || isNaN(y)) throw new Error("Formato inválido");
    return [x, y];
  });
}

// Función para dividir los puntos en arrays separados de X e Y
function splitPoints(points: [number, number][]) {
  const X = points.map((p) => p[0]);
  const Y = points.map((p) => p[1]);
  return { X, Y };
}

// Método de Vandermonde
function calculateVandermonde(X: number[], Y: number[]): number[] {
  const n = X.length;
  const A = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Math.pow(X[i], n - j - 1))
  );
  const b = Y;
  return solveLinearSystem(A, b);
}

// Resolver sistema de ecuaciones lineales Ax = b
function solveLinearSystem(A: number[][], b: number[]): number[] {
  const math = require("mathjs");
  return math.lusolve(A, b).flat();
}

// Evaluar el polinomio en x dado sus coeficientes
function evaluatePolynomial(coefficients: number[], x: number): number {
  return coefficients.reduce((acc, coef, i) => acc + coef * Math.pow(x, coefficients.length - i - 1), 0);
}

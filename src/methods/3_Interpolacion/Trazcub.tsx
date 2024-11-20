import React, { useState } from "react";
import Plot from "react-plotly.js";
import Navbar from "../../components/Navbar";

export function TrazCub_Main() {
  return (
    <>
      <Navbar />
      <TrazCubForm />
    </>
  );
}

function TrazCubForm() {
  const [xValues, setXValues] = useState<string>("0 1 2 3"); // Puntos x
  const [yValues, setYValues] = useState<string>("1 2 0 3"); // Puntos y
  const [result, setResult] = useState<any>(null); // Resultados de la interpolación

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const x = parseValues(xValues);
      const y = parseValues(yValues);
      
      if (x.length !== y.length) {
        alert("Los puntos x y y deben tener la misma cantidad de elementos.");
        return;
      }

      const interpolatedData = cubicSplineInterpolation(x, y);
      setResult(interpolatedData);
    } catch (error) {
      alert("Formato de entrada inválido. Asegúrese de ingresar valores numéricos.");
    }
  };

  return (
    <div>
      <h2>Interpolación con Trazadores Cúbicos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Puntos x:</label>
          <input
            type="text"
            value={xValues}
            onChange={(e) => setXValues(e.target.value)}
            placeholder="Ejemplo: 0 1 2 3"
            required
          />
        </div>
        <div>
          <label>Puntos y:</label>
          <input
            type="text"
            value={yValues}
            onChange={(e) => setYValues(e.target.value)}
            placeholder="Ejemplo: 1 2 0 3"
            required
          />
        </div>
        <button type="submit">Calcular</button>
      </form>

      {result && (
        <div>
          <h3>Interpolación Cúbica</h3>
          <Plot
            data={[
              {
                x: result.xValues,
                y: result.yValues,
                type: "scatter",
                mode: "lines",
                name: "Interpolación",
                line: { color: "blue" },
              },
              {
                x: result.originalX,
                y: result.originalY,
                type: "scatter",
                mode: "markers",
                name: "Puntos Originales",
                marker: { color: "red" },
              },
            ]}
            layout={{
              title: "Interpolación Cúbica",
              xaxis: { title: "x" },
              yaxis: { title: "f(x)" },
            }}
          />
        </div>
      )}
    </div>
  );
}

function parseValues(input: string): number[] {
  return input
    .trim()
    .split(" ")
    .map((value) => parseFloat(value));
}

// Implementación de la interpolación cúbica
function cubicSplineInterpolation(x: number[], y: number[]) {
  const n = x.length;
  const h: number[] = [];
  const alpha: number[] = [];
  const l: number[] = Array(n).fill(1);
  const mu: number[] = Array(n).fill(0);
  const z: number[] = Array(n).fill(0);

  // Paso 1: Calcular las diferencias h, alpha
  for (let i = 1; i < n; i++) {
    h[i] = x[i] - x[i - 1];
    alpha[i] = (3 / h[i]) * (y[i] - y[i - 1]) - (3 / h[i - 1]) * (y[i - 1] - y[i - 2]);
  }

  // Paso 2: Resolver el sistema tridiagonal
  for (let i = 1; i < n - 1; i++) {
    l[i] = 2 * (x[i + 1] - x[i - 1]) - h[i - 1] * mu[i - 1];
    mu[i] = h[i] / l[i];
    z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
  }

  l[n - 1] = 1;
  z[n - 1] = 0;
  const c: number[] = Array(n).fill(0);
  const b: number[] = Array(n).fill(0);
  const d: number[] = Array(n).fill(0);

  // Paso 3: Calcular c, b, d
  for (let j = n - 2; j >= 0; j--) {
    c[j] = z[j] - mu[j] * c[j + 1];
    b[j] = (y[j + 1] - y[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
    d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
  }

  const spline = {
    xValues: [],
    yValues: [],
    originalX: x,
    originalY: y,
  };

  // Generar los valores interpolados
  for (let i = 0; i < n - 1; i++) {
    for (let t = x[i]; t <= x[i + 1]; t += (x[i + 1] - x[i]) / 100) {
      const deltaX = t - x[i];
      spline.xValues.push(t);
      spline.yValues.push(
        y[i] +
          b[i] * deltaX +
          c[i] * Math.pow(deltaX, 2) +
          d[i] * Math.pow(deltaX, 3)
      );
    }
  }

  return spline;
}

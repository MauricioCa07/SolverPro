import React, { useState } from "react";

export function LagrangeInterpolation({ X, Y }) {
  const [result, setResult] = useState(null);

  // Función principal para calcular el polinomio interpolante
  const lagrangeInterpolation = (X, Y) => {
    const n = X.length;
    const L = []; // Almacenará los coeficientes de L_i(x)

    // Función para evaluar un polinomio dado sus coeficientes y un valor
    const polyval = (coefficients, x) =>
      coefficients.reduce(
        (acc, coef, i) => acc + coef * Math.pow(x, coefficients.length - 1 - i),
        0
      );

    // Función para realizar la convolución de dos polinomios
    const conv = (poly1, poly2) => {
      const result = Array(poly1.length + poly2.length - 1).fill(0);
      for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
          result[i + j] += poly1[i] * poly2[j];
        }
      }
      return result;
    };

    // Generar los polinomios de Lagrange
    for (let i = 0; i < n; i++) {
      const aux0 = X.filter((_, j) => j !== i); // Excluye X[i]
      let aux = [1, -aux0[0]]; // Primer factor (x - X_j)
      for (let j = 1; j < aux0.length; j++) {
        aux = conv(aux, [1, -aux0[j]]);
      }
      const normalizer = polyval(aux, X[i]);
      L.push(aux.map((coef) => coef / normalizer)); // Normaliza L_i(x)
    }

    // Construir el polinomio interpolante
    const Coef = L[0].map((_, col) =>
      L.reduce((acc, row, rowIndex) => acc + row[col] * Y[rowIndex], 0)
    );

    return { L, Coef };
  };

  const handleCompute = () => {
    const { L, Coef } = lagrangeInterpolation(X, Y);
    setResult({ L, Coef });
  };

  return (
    <div>
      <button onClick={handleCompute}>Compute Lagrange Interpolation</button>
      {result && (
        <div>
          <h2>Polynomials of Lagrange (L):</h2>
          {result.L.map((row, index) => (
            <div key={index}>L[{index + 1}]: {row.map((coef) => coef.toFixed(3)).join(", ")}</div>
          ))}
          <h2>Coefficients of the Interpolating Polynomial:</h2>
          <p>{result.Coef.map((coef) => coef.toFixed(3)).join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default LagrangeInterpolation;
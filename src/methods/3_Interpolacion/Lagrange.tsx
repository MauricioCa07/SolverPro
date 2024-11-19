import React, { useState } from "react";
import Navbar from "../../components/Navbar";

interface LagrangeInterpolationProps {}

interface LagrangeResult {
  L: number[][];  // Coeficientes de los polinomios L_i(x)
  Coef: number[]; // Coeficientes del polinomio interpolante
}

export function LagrangeInterpolation_Main(){
    return(
        <>
            <Navbar/>
            <LagrangeInterpolation/>
        </>
    );
}


export function LagrangeInterpolation({}: LagrangeInterpolationProps) {
  const [numPoints, setNumPoints] = useState<number>(2); // Número de puntos a interpolar
  const [points, setPoints] = useState<{ X: number[]; Y: number[] }>({ X: [], Y: [] });
  const [result, setResult] = useState<LagrangeResult | null>(null);

  // Maneja el cambio de la cantidad de puntos
  const handleNumPointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    setNumPoints(num);
    setPoints({ X: Array(num).fill(0), Y: Array(num).fill(0) }); // Inicializa los arreglos con el número adecuado de puntos
  };

  // Maneja el cambio en los valores de X y Y
  const handleInputChange = (index: number, type: 'X' | 'Y', value: string) => {
    const newPoints = { ...points };
    if (type === 'X') {
      newPoints.X[index] = parseFloat(value);
    } else {
      newPoints.Y[index] = parseFloat(value);
    }
    setPoints(newPoints);
  };

  // Función principal para calcular el polinomio interpolante
  const lagrangeInterpolation = (X: number[], Y: number[]): LagrangeResult => {
    const n = X.length;
    const L: number[][] = []; // Almacenará los coeficientes de L_i(x)

    // Función para evaluar un polinomio dado sus coeficientes y un valor
    const polyval = (coefficients: number[], x: number): number =>
      coefficients.reduce(
        (acc, coef, i) => acc + coef * Math.pow(x, coefficients.length - 1 - i),
        0
      );

    // Función para realizar la convolución de dos polinomios
    const conv = (poly1: number[], poly2: number[]): number[] => {
      const result: number[] = Array(poly1.length + poly2.length - 1).fill(0);
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
    const Coef: number[] = L[0].map((_, col) =>
      L.reduce((acc, row, rowIndex) => acc + row[col] * Y[rowIndex], 0)
    );

    return { L, Coef };
  };

  const handleCompute = () => {
    const { L, Coef } = lagrangeInterpolation(points.X, points.Y);
    setResult({ L, Coef });
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <label>
          Number of Points:
          <input
            type="number"
            value={numPoints}
            onChange={handleNumPointsChange}
            min="2"
            max="10"
          />
        </label>

        {/* Generación de inputs dinámicos para los puntos X e Y */}
        {Array.from({ length: numPoints }).map((_, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="number"
              placeholder={`X[${index + 1}]`}
              value={points.X[index]}
              onChange={(e) => handleInputChange(index, 'X', e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder={`Y[${index + 1}]`}
              value={points.Y[index]}
              onChange={(e) => handleInputChange(index, 'Y', e.target.value)}
            />
          </div>
        ))}

        <button onClick={handleCompute}>Compute Lagrange Interpolation</button>
      </div>

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

import React, { useState } from 'react';
import * as math from 'mathjs';

const Vandermonde = ({ xValues, yValues }) => {
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleCalculate = () => {
    const X = xValues.split(',').map(Number);
    const Y = yValues.split(',').map(Number);

    if (X.length !== Y.length) {
      alert("The number of X values must match the number of Y values.");
      return;
    }

    const vandermondeInterpolation = (X, Y) => {
      const n = X.length;
      let A = math.zeros(n, n).toArray();
      const stepLog = [];

      // Construcción de la matriz de Vandermonde
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          A[i][j] = Math.pow(X[i], n - j - 1);
        }
        stepLog.push({ step: i + 1, matrix: JSON.parse(JSON.stringify(A)) });
      }

      // Resolviendo el sistema A * Coef = Y
      const Coef = math.lusolve(A, Y).flat();

      return { Coef, steps: stepLog };
    };

    const result = vandermondeInterpolation(X, Y);
    setResult(result);
    setSteps(result.steps.slice(-3)); // Mostrar solo los últimos 3 pasos
  };

  return (
    <div>
      <h2>Vandermonde Method (Interpolation)</h2>
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div>
          <h3>Coefficients of the Polynomial:</h3>
          <p>{result.Coef.map(val => val.toFixed(6)).join(', ')}</p>
          <h3>Last Steps:</h3>
          <ul>
            {steps.map(step => (
              <li key={step.step}>
                <h4>Step {step.step}:</h4>
                <p>Matrix:</p>
                <pre>{step.matrix.map(row => row.map(val => val.toFixed(6)).join('\t')).join('\n')}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Vandermonde;

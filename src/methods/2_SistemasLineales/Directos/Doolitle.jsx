import React, { useState } from 'react';
import * as math from 'mathjs';

const Doolittle = ({ matrixA, vectorB }) => {
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleCalculate = () => {
    const A = math.matrix(matrixA.split(';').map(row => row.split(',').map(Number)));
    const b = math.matrix(vectorB.split(',').map(Number));

    const doolittleFactorization = (A, b) => {
      const n = A.size()[0];
      const L = math.eye(n).toArray();
      const U = math.zeros(n, n).toArray();
      const stepLog = [];

      // Factorización
      for (let i = 0; i < n - 1; i++) {
        for (let j = i; j < n; j++) {
          U[i][j] = A.subset(math.index(i, j)) - math.dot(
            L[i].slice(0, i),
            U.map(row => row[j]).slice(0, i)
          );
        }
        for (let j = i + 1; j < n; j++) {
          L[j][i] = (A.subset(math.index(j, i)) - math.dot(
            L[j].slice(0, i),
            U.map(row => row[i]).slice(0, i)
          )) / U[i][i];
        }
        stepLog.push({ step: i + 1, L: JSON.parse(JSON.stringify(L)), U: JSON.parse(JSON.stringify(U)) });
      }

      U[n - 1][n - 1] = A.subset(math.index(n - 1, n - 1)) - math.dot(
        L[n - 1].slice(0, n - 1),
        U.map(row => row[n - 1]).slice(0, n - 1)
      );

      // Resolviendo Ly = b con sustitución hacia adelante
      const y = [];
      for (let i = 0; i < n; i++) {
        y[i] = b.subset(math.index(i)) - math.dot(L[i].slice(0, i), y);
      }

      // Resolviendo Ux = y con sustitución hacia atrás
      const x = [];
      for (let i = n - 1; i >= 0; i--) {
        x[i] = (y[i] - math.dot(U[i].slice(i + 1), x.slice(i + 1))) / U[i][i];
      }

      stepLog.push({ step: n, L: L, U: U });
      return { x, L, U, steps: stepLog };
    };

    const result = doolittleFactorization(A, b);
    setResult(result);
    setSteps(result.steps.slice(-3)); // Últimos 3 pasos
  };

  return (
    <div>
      <h2>Doolittle Method (LU Factorization)</h2>
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div>
          <h3>Solution (x): {result.x.map(val => val.toFixed(6)).join(', ')}</h3>
          <h3>Last Steps:</h3>
          <ul>
            {steps.map(step => (
              <li key={step.step}>
                <h4>Step {step.step}:</h4>
                <p>L:</p>
                <pre>{step.L.map(row => row.map(val => val.toFixed(6)).join('\t')).join('\n')}</pre>
                <p>U:</p>
                <pre>{step.U.map(row => row.map(val => val.toFixed(6)).join('\t')).join('\n')}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Doolittle;

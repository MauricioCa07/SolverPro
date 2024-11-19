import React, { useState } from 'react';
import * as math from 'mathjs';

const TrazCub = ({ xValues, yValues }) => {
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleCalculate = () => {
    const X = xValues.split(',').map(Number);
    const Y = yValues.split(',').map(Number);
    const n = X.length;

    // Inicialización
    const m = 4 * (n - 1);
    let A = math.zeros(m, m).toArray();
    let b = math.zeros(m).toArray();
    let stepByStep = [];

    // Condiciones de interpolación
    for (let i = 1; i < n; i++) {
      A[i][4 * (i - 1)] = Math.pow(X[i], 3);
      A[i][4 * (i - 1) + 1] = Math.pow(X[i], 2);
      A[i][4 * (i - 1) + 2] = X[i];
      A[i][4 * (i - 1) + 3] = 1;
      b[i] = Y[i];
    }
    A[0][0] = Math.pow(X[0], 3);
    A[0][1] = Math.pow(X[0], 2);
    A[0][2] = X[0];
    A[0][3] = 1;
    b[0] = Y[0];

    stepByStep.push({ step: 'Interpolación', A: [...A], b: [...b] });

    // Condiciones de continuidad
    for (let i = 1; i < n - 1; i++) {
      const row = n - 1 + i;
      A[row][4 * (i - 1)] = Math.pow(X[i], 3);
      A[row][4 * (i - 1) + 1] = Math.pow(X[i], 2);
      A[row][4 * (i - 1) + 2] = X[i];
      A[row][4 * (i - 1) + 3] = 1;
      A[row][4 * i] = -Math.pow(X[i], 3);
      A[row][4 * i + 1] = -Math.pow(X[i], 2);
      A[row][4 * i + 2] = -X[i];
      A[row][4 * i + 3] = -1;
      b[row] = 0;
    }

    stepByStep.push({ step: 'Continuidad', A: [...A], b: [...b] });

    // Condiciones de suavidad
    for (let i = 1; i < n - 1; i++) {
      const row = 2 * n - 3 + i;
      A[row][4 * (i - 1)] = 3 * Math.pow(X[i], 2);
      A[row][4 * (i - 1) + 1] = 2 * X[i];
      A[row][4 * (i - 1) + 2] = 1;
      A[row][4 * i] = -3 * Math.pow(X[i], 2);
      A[row][4 * i + 1] = -2 * X[i];
      A[row][4 * i + 2] = -1;
      b[row] = 0;
    }

    stepByStep.push({ step: 'Suavidad', A: [...A], b: [...b] });

    // Condiciones de concavidad
    for (let i = 1; i < n - 1; i++) {
      const row = 3 * n - 5 + i;
      A[row][4 * (i - 1)] = 6 * X[i];
      A[row][4 * (i - 1) + 1] = 2;
      A[row][4 * i] = -6 * X[i];
      A[row][4 * i + 1] = -2;
      b[row] = 0;
    }

    stepByStep.push({ step: 'Concavidad', A: [...A], b: [...b] });

    // Condiciones de frontera
    A[m - 2][0] = 6 * X[0];
    A[m - 2][1] = 2;
    b[m - 2] = 0;

    A[m - 1][m - 4] = 6 * X[n - 1];
    A[m - 1][m - 3] = 2;
    b[m - 1] = 0;

    stepByStep.push({ step: 'Frontera', A: [...A], b: [...b] });

    // Resolución del sistema
    const Saux = math.lusolve(A, b).flat();
    const Coef = [];
    for (let i = 0; i < n - 1; i++) {
      Coef.push(Saux.slice(4 * i, 4 * (i + 1)));
    }

    setResult(Coef);
    setSteps(stepByStep);
  };

  return (
    <div>
      <h2>Cubic Spline Method</h2>
      <button onClick={handleCalculate}>Calculate</button>
      {steps.length > 0 && (
        <div>
          <h3>Step by Step</h3>
          {steps.map((step, index) => (
            <div key={index}>
              <h4>{step.step}</h4>
              <p>
                <strong>Matrix A:</strong>
                <pre>{math.format(step.A, { precision: 4 })}</pre>
              </p>
              <p>
                <strong>Vector b:</strong>
                <pre>{math.format(step.b, { precision: 4 })}</pre>
              </p>
            </div>
          ))}
        </div>
      )}
      {result && (
        <div>
          <h3>Final Coefficients</h3>
          {result.map((coef, index) => (
            <p key={index}>
              Segment {index + 1}: {math.format(coef, { precision: 4 })}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrazCub;

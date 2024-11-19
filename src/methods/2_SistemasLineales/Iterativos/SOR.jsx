import React, { useState } from 'react';
import * as math from 'mathjs';

const SOR = ({ matrixA, vectorB, x0str, wstr, tolstr, Nmaxstr }) => {
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleCalculate = () => {
    const A = math.matrix(matrixA.split(';').map(row => row.split(',').map(Number)));
    const b = math.matrix(vectorB.split(',').map(Number));
    const x0 = math.matrix(x0str.split(',').map(Number));
    const w = parseFloat(wstr);
    const tol = parseFloat(tolstr);
    const Nmax = parseInt(Nmaxstr, 10);

    const SORMethod = (A, b, x0, w, tol, Nmax) => {
      const D = math.diag(math.diag(A));
      const L = math.subtract(math.multiply(-1, math.tril(A)), D);
      const U = math.subtract(math.multiply(-1, math.triu(A)), D);
      const invDL = math.inv(math.add(D, math.multiply(-w, L)));
      const Tmatrix = math.multiply(invDL, math.add(math.multiply((1 - w), D), math.multiply(w, U)));
      const C = math.multiply(w, math.multiply(invDL, b));

      let xant = x0;
      let E = 1000;
      let cont = 0;
      let xact;
      const stepLog = [];

      while (E > tol && cont < Nmax) {
        xact = math.add(math.multiply(Tmatrix, xant), C);
        E = math.norm(math.subtract(xant, xact));
        xant = xact;
        stepLog.push({ iteration: cont + 1, x: xact.toArray(), error: E });
        cont += 1;
      }

      return { x: xact, iter: cont, err: E, steps: stepLog };
    };

    const result = SORMethod(A, b, x0, w, tol, Nmax);
    setResult(result);
    setSteps(result.steps.slice(-10)); // Últimos 10 pasos
  };

  return (
    <div>
      <h2>SOR Method</h2>
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div>
          <h3>Solution (x): {result.x.toArray().map(val => val.toFixed(6)).join(', ')}</h3>
          <p>Iterations: {result.iter}</p>
          <p>Error: {result.err}</p>
          <h3>Last 10 Iterations:</h3>
          <ul>
            {steps.map(step => (
              <li key={step.iteration}>
                Iteration {step.iteration}: x = {step.x.map(val => val.toFixed(6)).join(', ')} | Error: {step.error.toFixed(6)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SOR;

// SOR.js
import React, { useState } from 'react';
import * as math from 'mathjs';

const SOR = ({ matrixA, vectorB, x0str, wstr, tolstr, Nmaxstr }) => {
  const [result, setResult] = useState(null);

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
      const T = math.add(math.multiply((1 - w), D), math.multiply(w, U));
      const Tmatrix = math.multiply(invDL, T);
      const C = math.multiply(w, math.multiply(invDL, b));

      let xant = x0;
      let E = 1000;
      let cont = 0;
      let xact;

      while (E > tol && cont < Nmax) {
        xact = math.add(math.multiply(Tmatrix, xant), C);
        E = math.norm(math.subtract(xant, xact));
        xant = xact;
        cont += 1;
      }

      return { x: xact, iter: cont, err: E };
    };

    const result = SORMethod(A, b, x0, w, tol, Nmax);
    setResult(result);
  };

  return (
    <div>
      <h2>SOR Method</h2>
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div>
          <p>Solution (x): {result.x.toString()}</p>
          <p>Iterations: {result.iter}</p>
          <p>Error: {result.err}</p>
        </div>
      )}
    </div>
  );
};

export default SOR;

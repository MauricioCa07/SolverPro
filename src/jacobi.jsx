import React, { useState } from 'react';

const JacobiMethod = () => {
  const [matrix, setMatrix] = useState([[5, 2, 1], [2, 6, 1], [1, 1, 7]]);
  const [b, setB] = useState([1, 2, 3]);
  const [result, setResult] = useState(null);

  const solve = () => {
    const n = matrix.length;
    let x = Array(n).fill(0); 
    let xNew = Array(n).fill(0);
    const tolerance = 1e-10;
    let iter = 0;
    let converged = false;

    while (!converged && iter < 100) {
      converged = true;
      for (let i = 0; i < n; i++) {
        let sum = b[i];
        for (let j = 0; j < n; j++) {
          if (j !== i) {
            sum -= matrix[i][j] * x[j];
          }
        }
        xNew[i] = sum / matrix[i][i];
        if (Math.abs(xNew[i] - x[i]) > tolerance) {
          converged = false;
        }
      }
      x = [...xNew];
      iter++;
    }
    setResult(x);
  };

  return (
    <div>
      <button onClick={solve}>Solve</button>
      {result && (
        <div>
          <strong>Solution:</strong>
          <div>{result.join(", ")}</div>
        </div>
      )}
    </div>
  );
};

export default JacobiMethod;
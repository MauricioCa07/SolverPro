import React, { useState } from 'react';

const LUDecomposition = () => {
  const [matrix, setMatrix] = useState([[2, -1, -2], [-4, 6, 3], [-4, -2, 8]]);
  const [result, setResult] = useState(null);

  const decompose = () => {
    const n = matrix.length;
    const L = Array.from({ length: n }, () => Array(n).fill(0));
    const U = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let k = i; k < n; k++) {
        let sum = 0;
        for (let j = 0; j < i; j++) {
          sum += L[i][j] * U[j][k];
        }
        U[i][k] = matrix[i][k] - sum;
      }

      for (let k = i; k < n; k++) {
        if (i === k) {
          L[i][i] = 1; 
        } else {
          let sum = 0;
          for (let j = 0; j < i; j++) {
            sum += L[k][j] * U[j][i];
          }
          L[k][i] = (matrix[k][i] - sum) / U[i][i];
        }
      }
    }
    setResult({ L, U });
  };

  return (
    <div>
      <button onClick={decompose}>Decompose</button>
      {result && (
        <div>
          <div>
            <strong>L Matrix:</strong>
            {result.L.map((row, i) => (
              <div key={i}>{row.join(", ")}</div>
            ))}
          </div>
          <div>
            <strong>U Matrix:</strong>
            {result.U.map((row, i) => (
              <div key={i}>{row.join(", ")}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LUDecomposition;
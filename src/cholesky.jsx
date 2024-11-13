import React, { useState } from 'react';

const CholeskyDecomposition = () => {
  const [matrix, setMatrix] = useState([[4, 12, -16], [12, 37, -43], [-16, -43, 98]]);
  const [result, setResult] = useState(null);

  const decompose = () => {
    const n = matrix.length;
    const L = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
        let sum = 0;

        if (j === i) { // Diagonal elements
          for (let k = 0; k < j; k++) {
            sum += L[j][k] * L[j][k];
          }
          L[j][j] = Math.sqrt(matrix[j][j] - sum);
        } else {
          for (let k = 0; k < j; k++) {
            sum += L[i][k] * L[j][k];
          }
          L[i][j] = (matrix[i][j] - sum) / L[j][j];
        }
      }
    }
    setResult(L);
  };

  return (
    <div>
      <button onClick={decompose}>Decompose</button>
      {result && (
        <div>
          <strong>L Matrix:</strong>
          {result.map((row, i) => (
            <div key={i}>{row.join(", ")}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CholeskyDecomposition;
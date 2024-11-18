import React, { useState } from 'react';

const NewtonDividedDifferences = () => {
  const [points, setPoints] = useState([[1, 2], [2, 3], [3, 6]]);
  const [result, setResult] = useState(null);

  const interpolate = () => {
    const n = points.length;
    const coefficients = Array(n).fill(0);
    const table = points.map(([x, y]) => y);

    for (let j = 1; j < n; j++) {
      for (let i = n - 1; i >= j; i--) {
        table[i] = (table[i] - table[i - 1]) / (points[i][0] - points[i - j][0]);
      }
    }

    for (let i = 0; i < n; i++) {
      coefficients[i] = table[i];
    }

    setResult(coefficients);
  };

  return (
    <div>
      <button onClick={interpolate}>Interpolate</button>
      {result && (
        <div>
          <strong>Coefficients:</strong>
          <div>{result.join(", ")}</div>
        </div>
      )}
    </div>
  );
};

export default NewtonDividedDifferences;
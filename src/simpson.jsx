import React, { useState } from 'react';

const CompositeSimpson = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(6);
  const [n, setN] = useState(6); 
  const [result, setResult] = useState(null);

  const integrate = () => {
    if (n % 2 !== 0) {
      alert('Number of subintervals must be even for Simpson\'s 1/3 rule.');
      return;
    }

    const h = (b - a) / n;
    let sum = f(a) + f(b);

    for (let i = 1; i < n; i++) {
      if (i % 2 === 0) {
        sum += 2 * f(a + i * h);
      } else {
        sum += 4 * f(a + i * h);
      }
    }

    sum *= h / 3;
    setResult(sum);
  };

  const f = (x) => {
    return Math.pow(x, 2); 
  };

  return (
    <div>
      <button onClick={integrate}>Integrate</button>
      {result && (
        <div>
          <strong>Result:</strong>
          <div>{result}</div>
        </div>
      )}
    </div>
  );
};

export default CompositeSimpson;

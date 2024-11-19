import React, { useState } from 'react';
import * as math from 'mathjs';

const TrapecioCompuesto = ({ functionStr, aStr, bStr, nStr }) => {
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  const handleCalculate = () => {
    const f = math.compile(functionStr); // Parse the function
    const a = parseFloat(aStr); // Lower bound
    const b = parseFloat(bStr); // Upper bound
    const n = parseInt(nStr, 10); // Number of subintervals

    if (n <= 0) {
      alert('El número de subintervalos debe ser mayor que 0');
      return;
    }

    const h = (b - a) / n; // Step size
    let integral = 0;
    const stepByStep = [];

    // Calculate the integral using the composite trapezoidal rule
    const xValues = [];
    const fxValues = [];

    // Initial and final terms
    const fA = f.evaluate({ x: a });
    const fB = f.evaluate({ x: b });
    integral += (fA + fB) / 2;
    stepByStep.push(`f(${a}) = ${fA.toFixed(4)}, f(${b}) = ${fB.toFixed(4)}`);

    // Intermediate terms
    for (let i = 1; i < n; i++) {
      const x = a + i * h;
      const fx = f.evaluate({ x });
      integral += fx;
      xValues.push(x);
      fxValues.push(fx);
      stepByStep.push(`f(${x.toFixed(4)}) = ${fx.toFixed(4)}`);
    }

    integral *= h;
    setResult({ integral, h, xValues, fxValues });
    setSteps(stepByStep);
  };

  return (
    <div>
      <h2>Composite Trapezoidal Rule</h2>
      <button onClick={handleCalculate}>Calculate</button>
      {steps.length > 0 && (
        <div>
          <h3>Step by Step</h3>
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      )}
      {result && (
        <div>
          <h3>Final Result</h3>
          <p>Integral: {result.integral.toFixed(4)}</p>
          <p>Step Size (h): {result.h.toFixed(4)}</p>
          <h4>x and f(x) Values:</h4>
          <ul>
            {result.xValues.map((x, index) => (
              <li key={index}>
                x = {x.toFixed(4)}, f(x) = {result.fxValues[index].toFixed(4)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrapecioCompuesto;

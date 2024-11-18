import { useState, useEffect } from "react";
import { create, all } from "mathjs";
import Navbar from "../../../components/Navbar";
import "./Secant.css";
import React from "react";

const math = create(all);

export function Secant() {
  return (
    <>
      <Navbar />
      <MathForm />
      const results = ElPEep({f: f, tolerance, iterations, x0, x1 });
      <ElPEep f tolerance iterations x0 x1/>
      <h1>results</h1>
    </>
  );
}

function MathForm() {
  const [functionValue, setFunctionValue] = useState("");
  const [tolerance, setTolerance] = useState("");
  const [iterations, setIterations] = useState("");
  const [x0, setX0] = useState("");
  const [x1, setX1] = useState("");
  const f = (x) => eval(functionValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      functionValue,
      tolerance,
      iterations,
      x0,
      x1,
    });
  };

  return (
    <div className="container">
      <h1 className="text-Method">Secant Method</h1>
      <form onSubmit={handleSubmit}>
        <div className="item">
          <label htmlFor="functionValue">Enter a function:</label>
          <input
            type="text"
            id="functionValue"
            className="form-control"
            placeholder="x^2 - 4"
            value={functionValue}
            onChange={(e) => setFunctionValue(e.target.value)}
            required
          />
          <br />
          <label htmlFor="tolerance">Enter the tolerance:</label>
          <input
            type="number"
            id="tolerance"
            className="form-control"
            placeholder="0.001"
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
            required
          />
          <br />
          <label htmlFor="iterations">Number of iterations:</label>
          <input
            type="number"
            id="iterations"
            className="form-control"
            placeholder="50"
            value={iterations}
            onChange={(e) => setIterations(e.target.value)}
            required
          />
          <br />
          <label htmlFor="x0">Enter X0:</label>
          <input
            type="number"
            id="x0"
            className="form-control"
            placeholder="1.5"
            value={x0}
            onChange={(e) => setX0(e.target.value)}
            required
          />
          <br />
          <label htmlFor="x1">Enter X1:</label>
          <input
            type="number"
            id="x1"
            className="form-control"
            placeholder="2.0"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
}

export default MathForm;

function f(func, x) {
  return math.evaluate(func, { x });
}

function ElPEep({ f: func, tolerancestr, iterationsstr, x0str, x1str }) {
  const tolerance = parseFloat(tolerancestr, 10);
  const iterations = parseInt(iterationsstr, 10);
  const X0Initial = parseFloat(x0str, 10);
  const X1Initial = parseFloat(x1str, 10);

  const [result, setResult] = useState(null);
  const [lastFiveIterations, setLastFiveIterations] = useState([]);

  useEffect(() => {
    let X0 = X0Initial;
    let X1 = X1Initial;
    let lastIterations = [];

    for (let i = 0; i < iterations; i++) {
      const fx0 = f(func, X0);
      const fx1 = f(func, X1);

      if (fx1 === 0) {
        lastIterations.push({ iteration: i + 1, Xn: X1, fxn: fx1, error: 0 });
        setResult(`Root found at: ${X1}`);
        setLastFiveIterations(lastIterations.slice(-5));
        return;
      }

      if (fx1 - fx0 === 0) {
        setResult("Error: Division by 0");
        return;
      }

      const Xn = X1 - (fx1 * (X1 - X0)) / (fx1 - fx0);
      const error = math.abs(Xn - X1);

      lastIterations.push({ iteration: i + 1, Xn, fxn: f(func, Xn), error });

      // Check if root is found within tolerance
      if (error < tolerance) {
        setResult(`Root found at: ${Xn}`);
        setLastFiveIterations(lastIterations.slice(-5));
        return;
      }

      X0 = X1;
      X1 = Xn;

      // Restrictions for very small values
      if (math.abs(X1) < 1e-10) {
        setResult("Error: Xn values are becoming too small");
        return;
      }

      if (math.abs(fx1) < 1e-10) {
        setResult(
          "Error: Function values are approaching 0, potentially unstable"
        );
        return;
      }
    }

    setResult(`No root found after ${iterations} iterations.`);
    setLastFiveIterations(lastIterations.slice(-5));
  }, [func, tolerance, iterations, X0Initial, X1Initial]);

  return (
    <div>
      <h1>{result}</h1>
      <IterationTable iterations={lastFiveIterations} />
    </div>
  );
}

function IterationTable({ iterations }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Iteration</th>
          <th>Xn</th>
          <th>F(Xn)</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>
        {iterations.map((row, index) => (
          <tr key={index}>
            <td>{row.iteration}</td>
            <td>{row.Xn}</td>
            <td>{row.fxn}</td>
            <td>{row.error}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


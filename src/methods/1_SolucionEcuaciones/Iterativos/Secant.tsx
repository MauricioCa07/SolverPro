import { useState, useEffect } from "react";
import { create, all } from "mathjs";
import Navbar from "../../../components/Navbar";
import "./Secant.css";

const math = create(all);

export function Secant() {
  return (
    <>
      <Navbar />
      <MathForm />
    </>
  );
}

function MathForm() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    ElPEep(
      formJson.function,
      formJson.tolerance,
      formJson.iteration,
      formJson.lower_limit,
      formJson.higher_imit
    );
    console.log(formJson);
  }
  return (
    <div className="container">
      <h1 className="text-Method">Secant Method</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="item">
          <label>Enter a function</label>
          <br />
          <input
            type="text"
            name="function"
            defaultValue="x²-4"
            placeholder="x^2 - 4"
            required
          />
        </div>

        <div className="item">
          <label>Enter the tolerance</label>
          <br />
          <input
            type="text"
            name="tolerance"
            defaultValue="0.0000001"
            placeholder="0.0000001"
            required
          />
        </div>

        <div className="item">
          <label>Enter the number of iterations</label>
          <br />
          <input
            type="text"
            name="iterations"
            defaultValue="100"
            placeholder="100"
            required
          />
        </div>

        <div className="item">
          <label>Enter the lower limit</label>
          <br />
          <input
            type="text"
            name="lower_limit"
            defaultValue="1.5"
            placeholder="1.5"
            required
          />
        </div>

        <div className="item">
          <label>Enter the higher limit</label>
          <br />
          <input
            type="text"
            name="higher_limit"
            defaultValue="2.0"
            placeholder="2.0"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Calculate
        </button>
      </form>
    </div>
  );
}

function f(func, x) {
  return math.evaluate(func, { x });
}
type Props = {
  func: string;
  tolerancestr: string;
  iterationsstr: string;
  x0str: string;
  x1str: string;
};

function ElPEep(func, tolerancestr, iterationsstr, x0str, x1str) {
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
        setResult("Root found at: ${X1}");
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

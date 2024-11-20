import { create, all } from "mathjs";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import "./falserule.css";

const math = create(all);

export function FrMain() {
  return (
    <>
      <Navbar />
      <MathForm />
    </>
  );
}

function MathForm() {
  const [formData, setFormData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);
    const formJson = Object.fromEntries(data.entries());

    setFormData({
      func: formJson.function,
      x0: parseFloat(formJson.x0),
      x1: parseFloat(formJson.x1),
      tolerance: parseFloat(formJson.tolerance),
      Maxiterations: parseInt(formJson.Maxiterations, 10),
    });
  }

  return (
    <div className="container">
      <h1 className="text-Method">False rule method for root approximation</h1>
      <form onSubmit={handleSubmit}>
        <div className="item">
          <label>Enter a function</label>
          <br />
          <input
            type="text"
            name="function"
            defaultValue="x^2 - 4"
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
            required
          />
        </div>
        <div className="item">
          <label>Enter the number of iterations</label>
          <br />
          <input
            type="text"
            name="Maxiterations"
            defaultValue="100"
            required
          />
        </div>
        <div className="item">
          <label>Enter the lower value</label>
          <br />
          <input
            type="text"
            name="x0"
            defaultValue="1.5"
            required
          />
        </div>
        <div className="item">
          <label>Enter the higher value</label>
          <br />
          <input
            type="text"
            name="x1"
            defaultValue="2.0"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Calculate
        </button>
      </form>
      {/* Render the results */}
      {formData && (
        <Falserule
          func={formData.func}
          x0={formData.x0}
          x1={formData.x1}
          tolerance={formData.tolerance}
          Maxiterations={formData.Maxiterations}
        />
      )}
    </div>
  );
}

function Falserule({ func, x0, x1, tolerance, Maxiterations }) {
  const [iterations, setIterations] = useState([]);
  const [result, setResult] = useState(null);

  const calculateFalseRule = () => {
    let a = x0;
    let b = x1;
    const tol = tolerance;
    const Nmax = Maxiterations;

    let fa = f(func, a);
    let fb = f(func, b);
    let pm = (fb * a - fa * b) / (fb - fa);
    let fpm = f(func, pm);
    let E = 1000;
    let cont = 1;

    const iterationResults = [];

    while (E > tol && cont <= Nmax) {
      if (fa * fpm < 0) {
        b = pm;
        fb = fpm;
      } else {
        a = pm;
        fa = fpm;
      }

      let p0 = pm;
      pm = (fb * a - fa * b) / (fb - fa);
      fpm = f(func, pm);
      E = Math.abs(pm - p0);

      iterationResults.push({
        iteration: cont,
        a: a.toFixed(6),
        b: b.toFixed(6),
        pm: pm.toFixed(6),
        error: E.toFixed(6),
      });

      cont++;
    }

    setIterations(iterationResults);
    setResult(pm);
  };

  // Run the calculation when the component mounts
  useState(() => {
    calculateFalseRule();
  }, []); // Empty dependency array ensures it runs once

  return (
    <div>
      <h2>False Rule Method Result</h2>
      <p>Root approximation: {result && result.toFixed(6)}</p>
      <IterationTable iterations={iterations} />
    </div>
  );
}

function IterationTable({ iterations }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Iteration</th>
          <th>a</th>
          <th>b</th>
          <th>pm</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>
        {iterations.map((row, index) => (
          <tr key={index}>
            <td>{row.iteration}</td>
            <td>{row.a}</td>
            <td>{row.b}</td>
            <td>{row.pm}</td>
            <td>{row.error}</td>
          </tr>
        ))}
      </tbody>
      <p>Please reload page to change parameters</p>
    </table>
    
  );
}

function f(func, x) {
  return math.evaluate(func, { x });
}

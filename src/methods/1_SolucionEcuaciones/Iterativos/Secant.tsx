import React, { useState, useEffect } from "react";
import { create, all } from "mathjs";
import Navbar from "../../../components/Navbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Secant.css";

const math = create(all);

export function Secant_Main() {
  return (
    <>
      <Navbar />
      <SecantForm />
    </>
  );
}

function SecantForm() {
  const [resultComponent, setResultComponent] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    const props = {
      func: formJson["function"],
      tolerancestr: formJson["tolerance"],
      iterationsstr: formJson["iterations"],
      x0str: formJson["x0"],
      x1str: formJson["x1"],
    };

    setResultComponent(<SecantMethod {...props} />);
  }

  return (
    <div className="container">
      <h1 className="text-Method">Secant Method</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Enter a function"
          name="function"
          defaultValue="x^2-4"
        />
        <FormInput
          label="Enter the tolerance"
          name="tolerance"
          defaultValue="1e-7"
        />
        <FormInput
          label="Enter the number of iterations"
          name="iterations"
          type="number"
          defaultValue="100"
        />
        <FormInput
          label="Enter the initial guess X0"
          name="x0"
          defaultValue="1.5"
        />
        <FormInput
          label="Enter the initial guess X1"
          name="x1"
          defaultValue="2.0"
        />
        <div className="item">
          <Button
            className="calculate-button"
            type="submit"
            variant="contained"
            disableElevation
          >
            Calculate
          </Button>
        </div>
      </form>
      {resultComponent && (
        <div className="result-container">{resultComponent}</div>
      )}
    </div>
  );
}

function FormInput({ label, name, type = "text", defaultValue }) {
  return (
    <div className="item">
      <label className="text-field">{label}</label>
      <br />
      <TextField
        type={type}
        name={name}
        defaultValue={defaultValue}
        required
        variant="standard"
      />
    </div>
  );
}

function SecantMethod({ func, tolerancestr, iterationsstr, x0str, x1str }) {
  const tolerance = parseFloat(tolerancestr);
  const iterations = parseInt(iterationsstr);
  const X0Initial = parseFloat(x0str);
  const X1Initial = parseFloat(x1str);

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

      if (error < tolerance) {
        setResult(`Root found at: ${Xn}`);
        setLastFiveIterations(lastIterations.slice(-5));
        return;
      }

      X0 = X1;
      X1 = Xn;

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
    <table className="table-dark">
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

function f(func, x) {
  return math.evaluate(func, { x });
}

import React, { useState, useEffect, useRef } from "react";
import { create, all, abs, evaluate, format } from "mathjs";
import Navbar from "../../../components/Navbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import functionPlot from "function-plot";
import "./FixedPoint.css";

//const math = create(all);

export function FixedPoint_Main() {
  return (
    <>
      <Navbar />
      <FixedPointForm />
    </>
  );
}

function FixedPointForm() {
  const [resultComponent, setResultComponent] = useState<JSX.Element | null>(
    null
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    const props = {
      func: formJson["function"] as string,
      gFunc: formJson["g_function"] as string,
      initialGuess: parseFloat(formJson["initial_guess"] as string),
      tolerance: parseFloat(formJson["tolerance"] as string),
    };

    setResultComponent(<FixedPointMethod {...props} />);
  }

  return (
    <div className="container">
      <h1 className="text-Method">Fixed Point Method</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Enter the function f(x)"
          name="function"
          defaultValue="x^2 - 4"
        />
        <FormInput
          label="Enter the function g(x)"
          name="g_function"
          defaultValue="sqrt(4)"
        />
        <FormInput
          label="Enter the initial guess"
          name="initial_guess"
          defaultValue="2"
        />
        <FormInput
          label="Enter the tolerance"
          name="tolerance"
          defaultValue="1e-7"
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

function FormInput({
  label,
  name,
  type = "text",
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue: string;
}) {
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

function FixedPointMethod({
  func,
  gFunc,
  initialGuess,
  tolerance,
}: {
  func: string;
  gFunc: string;
  initialGuess: number;
  tolerance: number;
}) {
  const [iterationsData, setIterationsData] = useState<
    { iteration: number; x0: number; xN: number; fX: number; error: number }[]
  >([]);
  const [result, setResult] = useState<string | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data: {
      iteration: number;
      x0: number;
      xN: number;
      fX: number;
      error: number;
    }[] = [];
    let x0 = initialGuess;
    let xN = evaluate(gFunc, { x: x0 });
    let error = abs(x0 - xN);
    let fX = evaluate(func, { x: xN });
    let iteration = 0;

    while (error > tolerance && iteration < 100) {
      data.push({
        iteration: iteration + 1,
        x0,
        xN,
        fX,
        error,
      });

      if (fX === 0) {
        setResult(`Root found at x = ${format(xN, { precision: 10 })}`);
        break;
      }

      x0 = xN;
      xN = evaluate(gFunc, { x: x0 });
      fX = evaluate(func, { x: xN });
      error = abs(x0 - xN);
      iteration++;
    }

    if (iteration >= 100) {
      setResult("Max iterations reached. No root found.");
    } else if (!result) {
      setResult(
        `Approximation: x = ${format(xN, { precision: 10 })}, Error: ${error}`
      );
    }

    setIterationsData(data);
    plotFunction(gFunc, initialGuess);
  }, [func, gFunc, initialGuess, tolerance]);

  const plotFunction = (func: string, xStart: number) => {
    if (graphRef.current) {
      graphRef.current.innerHTML = ""; // Clear previous graph

      const width = 800;
      const height = 400;
      const xDomain = [xStart - 5, xStart + 5];

      try {
        functionPlot({
          target: graphRef.current,
          width,
          height,
          xAxis: { domain: xDomain },
          yAxis: { label: "g(x)" },
          grid: true,
          data: [
            {
              fn: func,
              color: "blue",
            },
          ],
        });
      } catch (err) {
        console.error("Error plotting the function: ", err);
      }
    }
  };

  return (
    <div>
      <h2>{result}</h2>
      <IterationTable iterations={iterationsData} />
      <div ref={graphRef} className="graph-container"></div>
    </div>
  );
}

function IterationTable({
  iterations,
}: {
  iterations: {
    iteration: number;
    x0: number;
    xN: number;
    fX: number;
    error: number;
  }[];
}) {
  return (
    <table className="table-dark">
      <thead>
        <tr>
          <th>Iteration</th>
          <th>x0</th>
          <th>xN</th>
          <th>f(xN)</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>
        {iterations.map((row, index) => (
          <tr key={index}>
            <td>{row.iteration}</td>
            <td>{row.x0.toFixed(6)}</td>
            <td>{row.xN.toFixed(6)}</td>
            <td>{row.fX.toExponential(4)}</td>
            <td>{row.error.toExponential(4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FixedPoint_Main;

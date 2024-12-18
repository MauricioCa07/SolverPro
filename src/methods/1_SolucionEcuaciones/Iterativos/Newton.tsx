import React, { useState, useEffect, useRef } from "react";
import { create, all, abs, evaluate, format } from "mathjs";
import Navbar from "../../../components/Navbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import functionPlot from "function-plot";
import "./Newton.css";

const math = create(all);

export function Newton_Main() {
  return (
    <>
      <Navbar />
      <NewtonForm />
    </>
  );
}

function NewtonForm() {
  const [resultComponent, setResultComponent] = useState<JSX.Element | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    const initialGuess = parseFloat(formJson["initial_guess"] as string);
    const tolerance = parseFloat(formJson["tolerance"] as string);

    // Validations
    if (isNaN(initialGuess) || isNaN(tolerance)) {
      setErrorMessage("Initial guess and tolerance must be valid numbers.");
      return;
    }
    if (tolerance <= 0) {
      setErrorMessage("Tolerance must be a positive number.");
      return;
    }

    const props = {
      func: formJson["function"] as string,
      derivFunc: formJson["derivative"] as string,
      initialGuess,
      tolerance,
    };

    setResultComponent(
      <NewtonMethod {...props} setErrorMessage={setErrorMessage} />
    );
  }

  return (
    <div className="container">
      <h1 className="text-Method">Newton-Raphson Method</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Enter the function f(x)"
          name="function"
          defaultValue="x^2 - 4"
        />
        <FormInput
          label="Enter the derivative f'(x)"
          name="derivative"
          defaultValue="2*x"
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
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert
          onClose={() => setErrorMessage(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
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

function NewtonMethod({
  func,
  derivFunc,
  initialGuess,
  tolerance,
  setErrorMessage,
}: {
  func: string;
  derivFunc: string;
  initialGuess: number;
  tolerance: number;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [iterationsData, setIterationsData] = useState<
    { iteration: number; xi: number; fxi: number; error: number }[]
  >([]);
  const [result, setResult] = useState<string | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data: {
      iteration: number;
      xi: number;
      fxi: number;
      error: number;
    }[] = [];
    let xi = initialGuess;
    let error = Infinity;
    let iteration = 0;

    try {
      while (error > tolerance && iteration < 100) {
        const fxi = safeEvaluate(func, xi);
        const dfxi = safeEvaluate(derivFunc, xi);

        if (isNaN(fxi) || isNaN(dfxi)) {
          setErrorMessage("Invalid function or derivative evaluation.");
          return;
        }

        if (dfxi === 0) {
          setErrorMessage("Error: Derivative is zero at some point.");
          return;
        }

        const nextXi = xi - fxi / dfxi;
        error = abs(nextXi - xi);

        data.push({
          iteration: iteration + 1,
          xi,
          fxi,
          error,
        });

        if (fxi === 0) {
          setResult(`Root found at x = ${format(nextXi, { precision: 10 })}`);
          break;
        }

        xi = nextXi;
        iteration++;
      }

      if (iteration >= 100) {
        setErrorMessage("Max iterations reached. No root found.");
      } else if (!result) {
        setResult(
          `Approximation: x = ${format(xi, { precision: 10 })}, Error: ${error}`
        );
      }

      setIterationsData(data);
      plotFunction(func, initialGuess);
    } catch (err) {
      setErrorMessage("An error occurred during the calculation.");
    }
  }, [func, derivFunc, initialGuess, tolerance, setErrorMessage]);

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
          yAxis: { label: "f(x)" },
          grid: true,
          data: [
            {
              fn: func,
              color: "blue",
            },
          ],
        });
      } catch (err) {
        setErrorMessage("Error plotting the function.");
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
  iterations: { iteration: number; xi: number; fxi: number; error: number }[];
}) {
  return (
    <table className="table-dark">
      <thead>
        <tr>
          <th>Iteration</th>
          <th>xi</th>
          <th>f(xi)</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>
        {iterations.map((row, index) => (
          <tr key={index}>
            <td>{row.iteration}</td>
            <td>{row.xi.toFixed(6)}</td>
            <td>{row.fxi.toExponential(4)}</td>
            <td>{row.error.toExponential(4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function safeEvaluate(func: string, x: number): number {
  try {
    return evaluate(func, { x });
  } catch {
    return NaN;
  }
}

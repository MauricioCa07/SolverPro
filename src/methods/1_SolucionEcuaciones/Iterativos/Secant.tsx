import React, { useState, useEffect } from "react";
import { create, all } from "mathjs";
import Navbar from "../../../components/Navbar";
import Button from "@mui/material/Button";
import Form_Input from "../../../components/Form_Inpunt";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import functionPlot from "function-plot";
import "./Secant.css";

const math = create(all);

export function Secant_Main() {
  return (
    <>
      <Navbar />
      <Form />
    </>
  );
}

function Form() {
  const [resultComponent, setResultComponent] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    setResultComponent(
      <SecantMethod
        func={formJson.function}
        tolerancestr={formJson.tolerance}
        iterationsstr={formJson.iterations}
        x0str={formJson.x0}
        x1str={formJson.x1}
      />
    );
  }

  return (
    <div className="container">
      <h1 className="text-Method">Secant Method</h1>
      <form onSubmit={handleSubmit}>
        <Form_Input
          label="Enter a function"
          name="function"
          defaultValue="log(sin(x)^2 + 1) - (1/2)"
        />
        <Form_Input
          label="Enter the tolerance"
          name="tolerance"
          defaultValue="1e-7"
        />
        <Form_Input
          label="Enter the number of iterations"
          name="iterations"
          defaultValue="100"
        />
        <Form_Input
          label="Enter the initial guess X0"
          name="x0"
          defaultValue="0.5"
        />
        <Form_Input
          label="Enter the initial guess X1"
          name="x1"
          defaultValue="1"
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

interface SecantMethodProps {
  func: string;
  tolerancestr: string;
  iterationsstr: string;
  x0str: string;
  x1str: string;
}

function SecantMethod({
  func,
  tolerancestr,
  iterationsstr,
  x0str,
  x1str,
}: SecantMethodProps) {
  const [result, setResult] = useState<string | null>(null);
  const [iterationsData, setIterationsData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const tolerance = parseFloat(tolerancestr);
      const iterations = parseInt(iterationsstr);
      let X0 = parseFloat(x0str);
      let X1 = parseFloat(x1str);

      if (
        isNaN(tolerance) ||
        isNaN(iterations) ||
        isNaN(X0) ||
        isNaN(X1) ||
        !func
      ) {
        setErrorMessage("Please enter valid numerical values.");
        return;
      }

      if (tolerance <= 0) {
        setErrorMessage("Tolerance must be greater than zero.");
        return;
      }

      if (iterations <= 0) {
        setErrorMessage("Iterations must be a positive integer.");
        return;
      }

      const compiledFunction = math.compile(func);

      function f(x: number) {
        try {
          return compiledFunction.evaluate({ x });
        } catch (error: any) {
          throw new Error(
            `Error evaluating function at x = ${x}: ${error.message}`
          );
        }
      }

      let iterationsArray = [];

      for (let i = 0; i < iterations + 1; i++) {
        const fx0 = f(X0);
        const fx1 = f(X1);

        if (fx1 === 0) {
          iterationsArray.push({
            iteration: i,
            Xn: X1,
            fxn: fx1,
            error: 0,
          });
          setResult(`Root found at: ${X1}`);
          setIterationsData(iterationsArray);
          return;
        }

        if (fx1 - fx0 === 0) {
          setErrorMessage("Error: Division by zero in denominator.");
          return;
        }

        const Xn = X1 - (fx1 * (X1 - X0)) / (fx1 - fx0);
        var error;
        if (i >= 2) {
          error = math.abs(Xn - X1);
        } else {
          error = Infinity;
        }

        iterationsArray.push({
          iteration: i,
          Xn,
          fxn: f(Xn),
          error,
        });

        if (error < tolerance) {
          setResult(`Root found at: ${Xn}`);
          setIterationsData(iterationsArray);
          return;
        }

        X0 = X1;
        X1 = Xn;
      }

      setResult(`No root found after ${iterations} iterations.`);
      setIterationsData(iterationsArray);
    } catch (error: any) {
      setErrorMessage(`An error occurred: ${error.message}`);
    }
  }, [func, tolerancestr, iterationsstr, x0str, x1str]);

  return (
    <div>
      {errorMessage ? (
        <div className="error-message">
          <h2>Error</h2>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <>
          <h1>{result}</h1>
          <IterationTable iterations={iterationsData} />
          <FunctionGraph func={func} iterations={iterationsData} />
        </>
      )}
    </div>
  );
}

function IterationTable({ iterations }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="iteration table">
        <TableHead>
          <TableRow>
            <TableCell>Iteration</TableCell>
            <TableCell>Xn</TableCell>
            <TableCell>F(Xn)</TableCell>
            <TableCell>Error</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {iterations.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.iteration}</TableCell>
              <TableCell>{row.Xn.toFixed(6)}</TableCell>
              <TableCell>{row.fxn.toExponential(6)}</TableCell>
              <TableCell>{row.error.toExponential(6)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function FunctionGraph({ func, iterations }) {
  useEffect(() => {
    try {
      let xValues = iterations.map((row) => row.Xn);
      let minX = Math.min(...xValues) - 1;
      let maxX = Math.max(...xValues) + 1;

      functionPlot({
        target: "#graph",
        width: 800,
        height: 400,
        xAxis: { domain: [minX, maxX] },
        data: [
          {
            fn: func,
            sampler: "builtIn",
            graphType: "polyline",
          },
          {
            points: iterations.map((row) => [row.Xn, row.fxn]),
            fnType: "points",
            graphType: "scatter",
            color: "red",
          },
        ],
      });
    } catch (error) {
      console.error("Error plotting function:", error);
    }
  }, [func, iterations]);

  return <div id="graph"></div>;
}

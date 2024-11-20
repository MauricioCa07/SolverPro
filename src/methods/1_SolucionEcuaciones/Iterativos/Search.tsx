import React, { useState, useEffect, useRef } from "react";
import { create, all } from "mathjs";
import Navbar from "../../../components/Navbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Search.css";
import functionPlot from "function-plot";

const math = create(all);

export function Search_Main() {
  return (
    <>
      <Navbar />
      <SearchForm />
    </>
  );
}

function SearchForm() {
  const [resultComponent, setResultComponent] = useState<JSX.Element | null>(
    null
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());

    const props = {
      func: formJson["function"] as string,
      startStr: formJson["start"] as string,
      stepStr: formJson["step"] as string,
      iterationsStr: formJson["iterations"] as string,
    };

    setResultComponent(<SearchMethod {...props} />);
  }

  return (
    <div className="container">
      <h1 className="text-Method">Incremental Search Method</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Enter a function"
          name="function"
          defaultValue="x^2 - 4"
        />
        <FormInput
          label="Enter the start value"
          name="start"
          defaultValue="0"
        />
        <FormInput
          label="Enter the step size"
          name="step"
          defaultValue="1"
        />
        <FormInput
          label="Enter the maximum iterations"
          name="iterations"
          defaultValue="100"
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

function SearchMethod({
  func,
  startStr,
  stepStr,
  iterationsStr,
}: {
  func: string;
  startStr: string;
  stepStr: string;
  iterationsStr: string;
}) {
  const start = parseFloat(startStr);
  const step = parseFloat(stepStr);
  const maxIterations = parseInt(iterationsStr, 10);

  const [iterationsData, setIterationsData] = useState<
    { iteration: number; xInf: number; xSup: number; yInf: number; ySup: number }[]
  >([]);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let xInf = start;
    let yInf = f(func, xInf);
    let xSup = xInf + step;
    let ySup = f(func, xSup);
    const data: { iteration: number; xInf: number; xSup: number; yInf: number; ySup: number }[] = [];

    for (let i = 1; i <= maxIterations; i++) {
      data.push({ iteration: i, xInf, xSup, yInf, ySup });

      if (yInf * ySup <= 0) {
        setIterationsData(data);
        plotFunction(func, start, xSup);
        return;
      }

      xInf = xSup;
      yInf = ySup;
      xSup = xInf + step;
      ySup = f(func, xSup);
    }

    setIterationsData(data);
    plotFunction(func, start, xSup);
  }, [func, start, step, maxIterations]);

  const plotFunction = (func: string, xStart: number, xEnd: number) => {
    if (graphRef.current) {
      graphRef.current.innerHTML = ""; // Clear previous graph

      const width = 800;
      const height = 400;
      const xDomain = [xStart - (xEnd - xStart) * 0.5, xEnd + (xEnd - xStart) * 0.5];

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
        console.error("Error plotting the function: ", err);
      }
    }
  };

  return (
    <div>
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
    xInf: number;
    xSup: number;
    yInf: number;
    ySup: number;
  }[];
}) {
  return (
    <table className="table-dark">
      <thead>
        <tr>
          <th>Iteration</th>
          <th>xInf</th>
          <th>yInf</th>
          <th>xSup</th>
          <th>ySup</th>
        </tr>
      </thead>
      <tbody>
        {iterations.map((row, index) => (
          <tr key={index}>
            <td>{row.iteration}</td>
            <td>{row.xInf.toFixed(4)}</td>
            <td>{row.yInf.toFixed(4)}</td>
            <td>{row.xSup.toFixed(4)}</td>
            <td>{row.ySup.toFixed(4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function f(func: string, x: number): number {
  try {
    return math.evaluate(func, { x });
  } catch {
    return NaN;
  }
}

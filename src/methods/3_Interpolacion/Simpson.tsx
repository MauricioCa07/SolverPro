import { useState, useRef } from "react";
import { create, all } from "mathjs";
import Navbar from "../../components/Navbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Simpson.css";
import functionPlot from "function-plot";

const math = create(all);

export function Simpson_Main() {
  return (
    <>
      <Navbar />
      <SimpsonForm />
    </>
  );
}

function SimpsonForm() {
  const [resultComponent, setResultComponent] = useState<JSX.Element | null>(
    null
  );

  // State variables for inputs
  const [func, setFunc] = useState<string>("x^2");
  const [lowerLimit, setLowerLimit] = useState<string>("0");
  const [upperLimit, setUpperLimit] = useState<string>("6");
  const [subIntervals, setSubIntervals] = useState<string>("6");

  const graphRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const props = {
      func,
      lowerLimit,
      upperLimit,
      subIntervals,
    };

    setResultComponent(<SimpsonMethod {...props} />);
  }

  function plotFunction() {
    if (graphRef.current) {
      graphRef.current.innerHTML = ""; // Clear previous graph

      const parsedLowerLimit = parseFloat(lowerLimit);
      const parsedUpperLimit = parseFloat(upperLimit);

      if (isNaN(parsedLowerLimit) || isNaN(parsedUpperLimit)) {
        alert("Please enter valid numerical values for the limits.");
        return;
      }

      const width = 800;
      const height = 400;
      const xDomain = [
        parsedLowerLimit - (parsedUpperLimit - parsedLowerLimit) * 0.5,
        parsedUpperLimit + (parsedUpperLimit - parsedLowerLimit) * 0.5,
      ];

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
        alert(
          "Error plotting the function. Please check the entered expression."
        );
      }
    }
  }

  return (
    <div className="container">
      <h1 className="text-Method">Simpson's Rule</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Enter a function"
          name="function"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
        />
        <FormInput
          label="Enter the lower limit (a)"
          name="lower_limit"
          value={lowerLimit}
          onChange={(e) => setLowerLimit(e.target.value)}
        />
        <FormInput
          label="Enter the upper limit (b)"
          name="upper_limit"
          value={upperLimit}
          onChange={(e) => setUpperLimit(e.target.value)}
        />
        <FormInput
          label="Enter the number of subintervals (n)"
          name="sub_intervals"
          value={subIntervals}
          onChange={(e) => setSubIntervals(e.target.value)}
        />
        <div className="item" style={{ display: "flex", gap: "10px" }}>
          <Button
            className="calculate-button"
            type="submit"
            variant="contained"
            disableElevation
          >
            Calculate
          </Button>
          <Button
            className="plot-button"
            variant="contained"
            onClick={plotFunction}
          >
            Plot
          </Button>
        </div>
      </form>
      {resultComponent && (
        <div className="result-container">{resultComponent}</div>
      )}
      <div ref={graphRef} className="graph-container"></div>
    </div>
  );
}

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="item">
      <label className="text-field">{label}</label>
      <br />
      <TextField
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        variant="standard"
        InputProps={{
          inputProps: {
            inputMode: "decimal",
          },
        }}
      />
    </div>
  );
}

function SimpsonMethod({
  func,
  lowerLimit,
  upperLimit,
  subIntervals,
}: {
  func: string;
  lowerLimit: string;
  upperLimit: string;
  subIntervals: string;
}) {
  const [result, setResult] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function calculateSimpson() {
    // Reset state
    setResult(null);
    setErrorMessage(null);

    // Parse input values
    const parsedLowerLimit = parseFloat(lowerLimit);
    const parsedUpperLimit = parseFloat(upperLimit);
    const parsedSubIntervals = parseInt(subIntervals, 10);

    // Input validations
    if (
      isNaN(parsedLowerLimit) ||
      isNaN(parsedUpperLimit) ||
      isNaN(parsedSubIntervals) ||
      func.trim() === ""
    ) {
      setErrorMessage("Please enter valid values for all inputs.");
      return;
    }

    if (parsedLowerLimit >= parsedUpperLimit) {
      setErrorMessage("The lower limit must be less than the upper limit.");
      return;
    }

    if (parsedSubIntervals <= 0) {
      setErrorMessage("The number of subintervals must be greater than zero.");
      return;
    }

    if (parsedSubIntervals % 2 !== 0) {
      setErrorMessage(
        "The number of subintervals (n) must be even to apply Simpson's rule."
      );
      return;
    }

    const h = (parsedUpperLimit - parsedLowerLimit) / parsedSubIntervals;
    let sum = 0;

    try {
      // Evaluate function at the limits
      const fa = f(func, parsedLowerLimit);
      const fb = f(func, parsedUpperLimit);

      if (!isFinite(fa) || !isFinite(fb)) {
        setErrorMessage("The function is not defined at one of the limits.");
        return;
      }

      sum = fa + fb;

      for (let i = 1; i < parsedSubIntervals; i++) {
        const x = parsedLowerLimit + i * h;
        const fx = f(func, x);

        if (!isFinite(fx)) {
          setErrorMessage(`The function is not defined at x = ${x}.`);
          return;
        }

        sum += i % 2 === 0 ? 2 * fx : 4 * fx;
      }

      const integral = (h / 3) * sum;
      setResult(integral);
    } catch (error) {
      setErrorMessage(
        "Error evaluating the function. Please check the entered expression."
      );
    }
  }

  return (
    <div>
      <div className="item">
        <Button
          className="calculate-button"
          onClick={calculateSimpson}
          variant="contained"
          disableElevation
        >
          Calculate Integral
        </Button>
      </div>
      {errorMessage && (
        <div className="error-message">
          <h2>Error</h2>
          <p>{errorMessage}</p>
        </div>
      )}
      {result !== null && (
        <div className="result-container">
          <h2>Result</h2>
          <p>{result.toFixed(7)}</p>
        </div>
      )}
    </div>
  );
}

function f(func: string, x: number): number {
  try {
    return math.evaluate(func, { x });
  } catch {
    throw new Error("Error evaluating the function.");
  }
}

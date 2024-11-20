import React, { useState } from "react";
import Navbar from "../../components/Navbar"; 
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Euler.css"; 

interface EulerProps {
  f: string;
  x0: string;
  y0: string;
  xFinal: string;
  h: string;
}

export function Euler_Main() {
  return (
    <>
      <Navbar />
      <EulerForm />
    </>
  );
}

function EulerForm() {
  const [func, setFunc] = useState<string>("x + y");
  const [x0, setX0] = useState<string>("0");
  const [y0, setY0] = useState<string>("1");
  const [xFinal, setXFinal] = useState<string>("2");
  const [h, setH] = useState<string>("0.1");
  const [result, setResult] = useState<{ x: number; y: number }[] | null>(null);

  const eulerMethod = (
    f: string,
    x0: number,
    y0: number,
    xFinal: number,
    h: number
  ) => {
    const parseFunction = new Function("x", "y", `return ${f}`);
    const steps = Math.ceil((xFinal - x0) / h);
    const data = [{ x: x0, y: y0 }];

    let x = x0;
    let y = y0;

    for (let i = 0; i < steps; i++) {
      const yNext = y + h * parseFunction(x, y);
      x += h;
      y = yNext;
      data.push({ x, y });
    }

    return data;
  };

  const handleComputation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = eulerMethod(
        func,
        parseFloat(x0),
        parseFloat(y0),
        parseFloat(xFinal),
        parseFloat(h)
      );
      setResult(data);
    } catch (error) {
      alert("Error in computation. Please check your inputs.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-Method">Euler Method</h1>
      <form onSubmit={handleComputation}>
        <FormInput
          label="Enter the function (f)"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
        />
        <FormInput
          label="Enter x₀"
          value={x0}
          onChange={(e) => setX0(e.target.value)}
        />
        <FormInput
          label="Enter y₀"
          value={y0}
          onChange={(e) => setY0(e.target.value)}
        />
        <FormInput
          label="Enter the final value of x"
          value={xFinal}
          onChange={(e) => setXFinal(e.target.value)}
        />
        <FormInput
          label="Enter step size (h)"
          value={h}
          onChange={(e) => setH(e.target.value)}
        />
        <div className="item" style={{ display: "flex", gap: "10px" }}>
          <Button
            className="calculate-button"
            type="submit"
            variant="contained"
            disableElevation
          >
            Compute
          </Button>
        </div>
      </form>
      {result && (
        <div className="result-container">
          <h2>Solution</h2>
          <table border="1" style={{ width: "100%", textAlign: "center", border:"1"}}>
            <thead>
              <tr>
                <th>i</th>
                <th>X</th>
                <th>Y</th>
              </tr>
            </thead>
            <tbody>
              {result.map((row, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{row.x.toFixed(4)}</td>
                  <td>{row.y.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Being the last Y value of the table the approximation to solution</p>
        </div>
      )}
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="item">
      <label className="text-field">{label}</label>
      <br />
      <TextField
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

export default Euler_Main;

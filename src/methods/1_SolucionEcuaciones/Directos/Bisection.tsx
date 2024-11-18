import React from "react";
import { create, all, string } from "mathjs";
import Navbar from "../../../components/Navbar";

// Create an instance of Math.js
const math = create(all);

export function Bisection_Main() {
  return (
    <>
      <Navbar />
      <Math_Form />
    </>
  );
}

function Math_Form() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    Bisection({
      func: formJson.function,
      astring: formJson.lower_limit,
      bstring: formJson.higher_limit,
      tolstring: formJson.tolerance,
      Nmaxstring: formJson.iterations,
    });
  }

  return (
    <div className="container">
      <h1 className="text-Method">Bisection Method</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="item">
          <label>Enter a function</label>
          <br />
          <input
            type="text"
            name="function"
            defaultValue="x^2-4"
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

function evaluateFunction(func: string, x: number): number {
  return math.evaluate(func, { x });
}
type Props = {
  func: string;
  astring: string;
  bstring: string;
  tolstring: string;
  Nmaxstring: string;
};

function Bisection({ func, astring, bstring, tolstring, Nmaxstring }: Props) {
  const a = parseFloat(astring);
  const b = parseFloat(bstring);
  const tol = parseFloat(tolstring);
  const Nmax = parseInt(Nmaxstring, 10);

  let aValue = a;
  let bValue = b;
  let fa = evaluateFunction(func, aValue);
  let pm = (aValue + bValue) / 2;
  let fpm = evaluateFunction(func, pm);
  let error = 1000;
  let iterations = 1;

  while (error > tol && iterations < Nmax) {
    if (fa * fpm < 0) {
      bValue = pm;
    } else {
      aValue = pm;
      fa = fpm;
    }

    const previousPm = pm;
    pm = (aValue + bValue) / 2;
    fpm = evaluateFunction(func, pm);
    error = Math.abs(pm - previousPm);
    iterations++;
  }

  return (
    <div>
      <h1>Bisection Method Result</h1>
      <p>
        Root found at: <strong>{pm}</strong>
      </p>
      <p>
        Number of iterations: <strong>{iterations}</strong>
      </p>
      <p>
        Final error: <strong>{error}</strong>
      </p>
    </div>
  );
}

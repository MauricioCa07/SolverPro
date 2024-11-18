import React from "react";
import { create, all } from "mathjs";

type Props = {
  f: string;
  astring: string;
  bstring: string;
  tolstring: string;
  Nmaxstring: string;
};

// Create an instance of Math.js
const math = create(all);

function evaluateFunction(func: string, x: number): number {
  return math.evaluate(func, { x });
}

export const Bisection: React.FC<Props> = ({
  f: func,
  astring,
  bstring,
  tolstring,
  Nmaxstring,
}) => {
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
};

export default Bisection;

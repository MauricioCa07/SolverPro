import React from "react";
import { create, all } from "mathjs";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Plot from "react-plotly.js";

const math = create(all);

export function SearchMain() {
  return (
    <>
      <Navbar />
      <MathForm />
    </>
  );
}

function MathForm() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    Search(
      formJson.function,
      formJson.start,
      formJson.step,
      formJson.iterations
    );
    console.log(formJson);
  }
  return (
    <div className="container">
      <h1 className="text-Method">Incremental search method</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="item">
          <label>Enter a function</label>
          <br />
          <input
            type="text"
            name="function"
            defaultValue="x²-4"
            placeholder="x^2 - 4"
            required
          />
        </div>

        <div className="item">
          <label>Enter the start number for the search</label>
          <br />
          <input
            type="text"
            name="start"
            defaultValue="0"
            placeholder="0"
            required
          />
        </div>

        <div className="item">
          <label>Enter the size of interval</label>
          <br />
          <input
            type="text"
            name="Step"
            defaultValue="1"
            placeholder="1"
            required
          />
        </div>

        <div className="item">
          <label>Enter the maximum iterations</label>
          <br />
          <input
            type="text"
            name="iterations"
            defaultValue="100"
            placeholder="100"
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

function f(func: string, x: number): number {
  return math.evaluate(func, { x });
}

interface SearchProps {
  f: string; // La función como string, por ejemplo "x^2 - 4"
  x0string: string; // Valor inicial como string
  hstring: string; // Incremento como string
  Nmaxstring: string; // Número máximo de iteraciones como string
}

export function Search(func, x0string, hstring, Nmaxstring) {
  const x0: number = parseFloat(x0string);
  const h: number = parseFloat(hstring);
  const Nmax: number = parseInt(Nmaxstring, 10);

  const [result, setResult] = useState(null);
  const [lastFiveIterations, setLastFiveIterations] = useState([]);

  let xinf: number = x0;
  let yinf: number = f(func, xinf);
  let xsup: number = xinf + h;
  let ysup: number = f(func, xsup);

  useEffect(() => {
    for (let i = 1; i <= Nmax; i++) {
      if (yinf * ysup <= 0) {
        return (
          <h1>
            Root at the interval between {xinf} and {xsup} in {i} iterations
          </h1>
        ); // Si hay cambio de signo, retornamos los resultados
      }
      xinf = xsup;
      yinf = ysup;
      xsup = xinf + h;
      ysup = f(func, xsup); // Corregí esto también, faltaba pasar `func`
    }
  }, [func, x0string, hstring, Nmaxstring]);

  return (
    <h1>
      Could not find a sign switch for the function in the given maximum
      iterations
    </h1>
  );
}

export default Search;

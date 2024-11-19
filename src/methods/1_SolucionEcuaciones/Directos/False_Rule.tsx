import { create, all } from "mathjs";
import { useState, useEffect } from "react";
const math = create(all);
import Navbar from "../../../components/Navbar";


export function FrMain(){
  return(
    <>
      <Navbar/>
      <MathForm/>
    </>
  );
}

function MathForm() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    Falserule(
      formJson.function,
      formJson.x0,
      formJson.x1,
      formJson.tolerance,
      formJson.Maxiterations
    );
    console.log(formJson);
  }
  return (
    <div className="container">
      <h1 className="text-Method">False rule method for root aproximation</h1>
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
            name="Maxiterations"
            defaultValue="100"
            placeholder="100"
            required
          />
        </div>

        <div className="item">
          <label>Enter the lower value</label>
          <br />
          <input
            type="text"
            name="x0"
            defaultValue="1.5"
            placeholder="1.5"
            required
          />
        </div>

        <div className="item">
          <label>Enter the higher value</label>
          <br />
          <input
            type="text"
            name="x1"
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


function f(func, x) {
  return math.evaluate(func, { x });
}

export function Falserule(
  func,
  astring,
  bstring,
  tolstring,
  Nmaxstring,
) {

  const [result, setResult] = useState(null);
  const [lastIterations, setLastIterations] = useState([]);

useEffect(() => {
  let a = parseFloat(astring, 10);
  let b = parseFloat(bstring, 10);
  const tol = parseFloat(tolstring, 10);
  const Nmax = parseInt(Nmaxstring, 10);

  let fa = f(func, a);
  let fb = f(func, b);
  let pm = (fb * a - fa * b) / (fb - fa);
  let fpm = f(func, pm);
  let E = 1000;
  let cont = 1;

  while (E > tol && cont < Nmax) {
    if (fa * fpm < 0) {
      b = pm;
      fb = fpm;
    } else {
      a = pm;
      fa = fpm;
    }

    let p0 = pm;
    pm = (fb * a - fa * b) / (fb - fa);
    fpm = f(func, pm);
    E = Math.abs(pm - p0);

    cont++;
    setResult(`Root aproximation at ${pm}`);
    console.log(`Root aproximation at ${pm}`);
    lastIterations.push({iteration: cont+1, a: a, b: b, pm:pm, error: E});
    setLastIterations(lastIterations);
  }
}, [func, astring, bstring, tolstring, Nmaxstring,]);

  return (
    <div>
    <h1>{result}</h1>
      <IterationTable iterations = {lastIterations}/>
    </div>
      
  );
}

function IterationTable({ iterations }) {
  return (
    <table>
      <thead>
        <tr>
          <th>iteration</th>
          <th>a</th>
          <th>b</th>
          <th>pm</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>
        {iterations.map((row, index) => (
          <tr key={index}>
            <td>{row.iteration}</td>
            <td>{row.a}</td>
            <td>{row.b}</td>
            <td>{row.pm}</td>
            <td>{row.error}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

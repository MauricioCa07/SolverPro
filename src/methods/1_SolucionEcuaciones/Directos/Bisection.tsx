import { useState, useEffect, useRef } from "react";
import { create, all } from "mathjs";
import Navbar from "../../../components/Navbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Bisection.css";
import functionPlot from "function-plot";

const math = create(all);

export function Bisection_Main() {
  return (
    <>
      <Navbar />
      <BisectionForm />
    </>
  );
}

function BisectionForm() {
  const [resultComponent, setResultComponent] = useState(null);
  const [canPlot, setCanPlot] = useState(false);
  const [rootPoint, setRootPoint] = useState(null);

  const [func, setFunc] = useState("x^2 - 4");
  const [lowerLimit, setLowerLimit] = useState(1.5);
  const [higherLimit, setHigherLimit] = useState(2.0);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    setFunc(formJson["function"]);
    setLowerLimit(parseFloat(formJson["lower_limit"]));
    setHigherLimit(parseFloat(formJson["higher_limit"]));

    const props = {
      func: formJson["function"],
      lowerLimitStr: formJson["lower_limit"],
      higherLimitStr: formJson["higher_limit"],
      toleranceStr: formJson["tolerance"],
      iterationsStr: formJson["iterations"],
      setRootPoint: setRootPoint,
    };

    setResultComponent(<BisectionMethod {...props} />);
    setCanPlot(true);
  }

  return (
    <div className="container">
      <h1 className="text-Method">Método de Bisección</h1>
      <form id="bisection-form" onSubmit={handleSubmit}>
        <FormInput
          label="Ingresa una función"
          name="function"
          defaultValue="x^2 - 4"
        />
        <FormInput
          label="Límite inferior"
          name="lower_limit"
          defaultValue="1.5"
        />
        <FormInput
          label="Límite superior"
          name="higher_limit"
          defaultValue="2.0"
        />
        <FormInput
          label="Tolerancia"
          name="tolerance"
          defaultValue="1e-7"
        />
        <FormInput
          label="Número de iteraciones"
          name="iterations"
          type="number"
          defaultValue="100"
        />
        <div className="item" style={{ display: "flex", gap: "10px" }}>
          <Button
            className="calculate-button"
            type="submit"
            variant="contained"
          >
            Calcular
          </Button>
        </div>
      </form>
      {resultComponent && <div className="result-container">{resultComponent}</div>}
      {canPlot && (
        <GraphFunction
          func={func}
          rootPoint={rootPoint}
          lowerLimit={lowerLimit}
          higherLimit={higherLimit}
        />
      )}
    </div>
  );
}

function FormInput({ label, name, type = "text", defaultValue }) {
  return (
    <div className="item">
      <label>{label}</label>
      <br />
      <TextField
        type={type}
        name={name}
        defaultValue={defaultValue}
        required
        variant="outlined"
      />
    </div>
  );
}

function BisectionMethod(props) {
  const { func, lowerLimitStr, higherLimitStr, toleranceStr, iterationsStr, setRootPoint } = props;

  const lowerLimit = parseFloat(lowerLimitStr);
  const higherLimit = parseFloat(higherLimitStr);
  const tolerance = parseFloat(toleranceStr);
  const iterations = parseInt(iterationsStr);

  const [result, setResult] = useState(null);
  const [lastIterations, setLastIterations] = useState([]);

  useEffect(() => {
    let a = lowerLimit;
    let b = higherLimit;
    let fa = f(func, a);
    let fb = f(func, b);

    // Verificar si alguno de los límites es raíz
    if (fa === 0) {
      setResult(`La raíz es ${a}, ya que f(a) = 0.`);
      setRootPoint({ x: a, y: fa });
      return;
    }

    if (fb === 0) {
      setResult(`La raíz es ${b}, ya que f(b) = 0.`);
      setRootPoint({ x: b, y: fb });
      return;
    }

    if (fa * fb >= 0) {
      setResult("Error: La función debe tener signos opuestos en los límites.");
      return;
    }

    let pm = (a + b) / 2;
    let fpm = f(func, pm);
    let error = Math.abs(b - a);
    const iterationsData = [];

    for (let i = 0; i < iterations && error > tolerance; i++) {
      if (fa * fpm < 0) {
        b = pm;
        fb = fpm;
      } else {
        a = pm;
        fa = fpm;
      }

      const previousPm = pm;
      pm = (a + b) / 2;
      fpm = f(func, pm);
      error = Math.abs(pm - previousPm);

      iterationsData.push({
        iteration: i + 1,
        a,
        b,
        pm,
        error,
      });
    }

    setResult(`Aproximación de la raíz: ${pm}`);
    setLastIterations(iterationsData);
    setRootPoint({ x: pm, y: fpm });
  }, [func, lowerLimit, higherLimit, tolerance, iterations, setRootPoint]);

  return (
    <div>
      <h1>{result}</h1>
      <IterationTable iterations={lastIterations} />
    </div>
  );
}

function IterationTable({ iterations }) {
  const formatNumber = (num) => {
    if (Math.abs(num) < 1e-3 || Math.abs(num) > 1e6) {
      return num.toExponential(4); // Notación científica con 4 decimales
    } else {
      return num.toFixed(7); // Formato fijo con 7 decimales
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Iteración</th>
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
            <td>{formatNumber(row.a)}</td>
            <td>{formatNumber(row.b)}</td>
            <td>{formatNumber(row.pm)}</td>
            <td>{formatNumber(row.error)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GraphFunction({ func, rootPoint, lowerLimit, higherLimit }) {
  const graphRef = useRef(null);

  useEffect(() => {
    // Configuración de la gráfica interactiva
    const width = 800;
    const height = 400;
    const xDomain = [
      lowerLimit - (higherLimit - lowerLimit) * 0.5,
      higherLimit + (higherLimit - lowerLimit) * 0.5,
    ];

    try {
      // Limpiar el contenedor antes de volver a graficar
      if (graphRef.current) {
        graphRef.current.innerHTML = "";
      }

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
          rootPoint && {
            points: [[rootPoint.x, rootPoint.y]],
            color: "red",
            fnType: "points",
          },
        ].filter(Boolean), // Filtrar si no hay raíz aún
      });
    } catch (err) {
      console.error("Error al graficar la función: ", err);
    }
  }, [func, rootPoint, lowerLimit, higherLimit]);

  return <div ref={graphRef} className="graph-container"></div>;
}

function f(func, x) {
  try {
    return math.evaluate(func, { x });
  } catch {
    return NaN;
  }
}

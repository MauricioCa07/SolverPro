import React, { useState } from "react";
import Plot from "react-plotly.js";
import Navbar from "../../components/Navbar";
import './TrapecioCompuesto.css'; // Asegúrate de tener el archivo CSS correspondiente

export function TrapecioCompuesto_Main() {
  return (
    <>
      <Navbar />
      <TrapecioCompuestoForm />
    </>
  );
}

// Tipado de los datos del estado
interface TrapecioFormState {
  funcion: string;
  a: number;
  b: number;
  n: number;
  resultado: number | null;
}

function TrapecioCompuestoForm() {
  const [state, setState] = useState<TrapecioFormState>({
    funcion: "",
    a: 0,
    b: 1,
    n: 4,
    resultado: null,
  });

  // Manejo de cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para manejar el submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const f = new Function("x", `return ${state.funcion}`);
      const integral = trapecioCompuesto(f, state.a, state.b, state.n);
      setState((prevState) => ({ ...prevState, resultado: integral }));
    } catch (error) {
      alert("Formato de función inválido. Use 'x' como variable.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="title">Método de Trapecio Compuesto</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Función:</label>
          <input
            type="text"
            name="funcion"
            value={state.funcion}
            onChange={handleChange}
            placeholder="Ejemplo: Math.sin(x)"
            required
            className="input"
          />
        </div>
        <div>
          <label>Límite Inferior (a):</label>
          <input
            type="number"
            name="a"
            value={state.a}
            onChange={(e) => handleChange(e)}
            required
            className="input"
          />
        </div>
        <div>
          <label>Límite Superior (b):</label>
          <input
            type="number"
            name="b"
            value={state.b}
            onChange={(e) => handleChange(e)}
            required
            className="input"
          />
        </div>
        <div>
          <label>Subintervalos (n):</label>
          <input
            type="number"
            name="n"
            value={state.n}
            onChange={(e) => handleChange(e)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">Calcular</button>
      </form>

      {state.resultado !== null && (
        <div>
          <h3>Resultado de la Integral: {state.resultado}</h3>
          <Plot
            data={[
              {
                x: Array.from({ length: 100 }, (_, i) => state.a + i * (state.b - state.a) / 99),
                y: Array.from({ length: 100 }, (_, i) =>
                  new Function("x", `return ${state.funcion}`)(state.a + i * (state.b - state.a) / 99)
                ),
                type: "scatter",
                mode: "lines",
                marker: { color: "blue" },
              },
            ]}
            layout={{
              title: "Gráfica de la Función",
              xaxis: { title: "x" },
              yaxis: { title: "f(x)" },
            }}
          />
        </div>
      )}
    </div>
  );
}

// Método de Trapecio Compuesto
function trapecioCompuesto(f: (x: number) => number, a: number, b: number, n: number): number {
  const h = (b - a) / n; // Tamaño del subintervalo
  let sum = f(a) + f(b); // Inicia la suma con los valores de los extremos
  for (let i = 1; i < n; i++) {
    sum += 2 * f(a + i * h); // Calcula la suma de los valores intermedios
  }
  return (h / 2) * sum; // Multiplica por h/2 y devuelve el resultado
}

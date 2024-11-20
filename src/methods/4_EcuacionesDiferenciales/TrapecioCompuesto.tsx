import React, { useState } from "react";
import Plot from "react-plotly.js";
import Navbar from "../../components/Navbar";

export function TrapecioCompuesto_Main() {
  return (
    <>
      <Navbar />
      <TrapecioCompuestoForm />
    </>
  );
}

function TrapecioCompuestoForm() {
  const [funcion, setFuncion] = useState<string>(""); // Función
  const [a, setA] = useState<number>(0); // Límite inferior
  const [b, setB] = useState<number>(1); // Límite superior
  const [n, setN] = useState<number>(4); // Número de subintervalos
  const [resultado, setResultado] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const f = new Function("x", `return ${funcion}`);
      const integral = trapecioCompuesto(f, a, b, n);
      setResultado(integral);
    } catch (error) {
      alert("Formato de función inválido. Use 'x' como variable.");
    }
  };

  return (
    <div>
      <h2>Método de Trapecio Compuesto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Función:</label>
          <input
            type="text"
            value={funcion}
            onChange={(e) => setFuncion(e.target.value)}
            placeholder="Ejemplo: Math.sin(x)"
            required
          />
        </div>
        <div>
          <label>Límite Inferior (a):</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Límite Superior (b):</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Subintervalos (n):</label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit">Calcular</button>
      </form>

      {resultado !== null && (
        <div>
          <h3>Resultado de la Integral: {resultado}</h3>
          <Plot
            data={[
              {
                x: Array.from({ length: 100 }, (_, i) => a + i * (b - a) / 99),
                y: Array.from({ length: 100 }, (_, i) =>
                  new Function("x", `return ${funcion}`)(a + i * (b - a) / 99)
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

function trapecioCompuesto(f: (x: number) => number, a: number, b: number, n: number): number {
  const h = (b - a) / n;
  let sum = f(a) + f(b);
  for (let i = 1; i < n; i++) {
    sum += 2 * f(a + i * h);
  }
  return (h / 2) * sum;
}

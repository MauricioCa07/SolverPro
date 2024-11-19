import React, { useState, useEffect } from 'react';
import { create, all } from 'mathjs';
import Plot from 'react-plotly.js';
import Navbar from "../../../components/Navbar"; // Importación de Navbar

const math = create(all);
export function MultipleRoots_Main() {
    return (
      <>
        <Navbar />
        <MultipleRoots />
      </>
    );
  }
function MultipleRoots({ funct, firstDerivate, secondDerivate, tolerancestr, iterationsstr, x0str }) {
    const tolerance = parseFloat(tolerancestr, 10);
    const maxIterations = parseInt(iterationsstr, 10);
    var X0 = parseFloat(x0str, 10);

    const f = (x) => math.evaluate(funct, { x: x });
    const fPrime = (x) => math.evaluate(firstDerivate, { x: x });
    const fDoublePrime = (x) => math.evaluate(secondDerivate, { x: x });

    const [steps, setSteps] = useState<any[]>([]);  // Almacenar los pasos
    const [root, setRoot] = useState<number | null>(null);
    const [error, setError] = useState<number | null>(null);

    useEffect(() => {
        const calculateMultipleRoots = () => {
            if (Math.abs(f(X0)) < Number.EPSILON) {
                setRoot(X0);
                setError(0);
                return;
            }

            let n = 0;
            let Xn = X0;
            let localError = Infinity;
            const stepsArray: any[] = [];

            while (localError > tolerance && Math.abs(f(Xn)) > Number.EPSILON && n < maxIterations) {
                const fx0 = f(X0);
                const fpx0 = fPrime(X0);
                const fppx0 = fDoublePrime(X0);

                if (Math.abs(Math.pow(fpx0, 2) - fx0 * fppx0) < Number.EPSILON) {
                    setSteps([{ step: n, Xn: X0, error: localError, message: "Error: Division by zero encountered." }]);
                    return;
                }

                Xn = X0 - (fx0 * fpx0) / (Math.pow(fpx0, 2) - fx0 * fppx0);
                localError = Math.abs(Xn - X0);
                stepsArray.push({ step: n, Xn: Xn, error: localError, fx0: fx0, fpx0: fpx0, fppx0: fppx0 });

                X0 = Xn;
                n++;
            }

            setSteps(stepsArray);
            if (localError <= tolerance) {
                setRoot(Xn);
                setError(localError);
            } else {
                setRoot(Xn);
                setError(localError);
            }
        };

        calculateMultipleRoots();
    }, [funct, firstDerivate, secondDerivate, tolerance, maxIterations, X0]);

    // Preparar datos para la gráfica
    const plotData = steps.map(step => step.Xn);
    const plotIterations = steps.map(step => step.step);

    return (
        <div>
            <Navbar />  {/* Aquí agregamos el Navbar */}
            <h2>Método de Múltiples Raíces (Newton-Raphson con segunda derivada)</h2>
            {steps.length > 0 && (
                <div>
                    <h3>Demostración paso a paso:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Paso</th>
                                <th>Raíz Aproximada (Xn)</th>
                                <th>F(Xn)</th>
                                <th>F'(Xn)</th>
                                <th>F''(Xn)</th>
                                <th>Error</th>
                            </tr>
                        </thead>
                        <tbody>
                            {steps.map((step, index) => (
                                <tr key={index}>
                                    <td>{step.step}</td>
                                    <td>{step.Xn.toFixed(6)}</td>
                                    <td>{step.fx0.toFixed(6)}</td>
                                    <td>{step.fpx0.toFixed(6)}</td>
                                    <td>{step.fppx0.toFixed(6)}</td>
                                    <td>{step.error.toFixed(6)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {root && error !== null && (
                <div>
                    <h3>Resultado final:</h3>
                    <p>
                        La raíz aproximada es {root.toFixed(6)} con un error de {error.toFixed(6)}.
                    </p>
                </div>
            )}

            <div>
                <h3>Gráfica de la evolución de la raíz en cada iteración:</h3>
                <Plot
                    data={[
                        {
                            x: plotIterations,
                            y: plotData,
                            type: "scatter",
                            mode: "lines+markers",
                            name: "Evolución de la raíz",
                            line: { color: "blue" },
                            marker: { color: "red" },
                        },
                    ]}
                    layout={{
                        title: "Evolución de la raíz en cada iteración",
                        xaxis: { title: "Iteración" },
                        yaxis: { title: "Raíz Aproximada (Xn)" },
                    }}
                />
            </div>
        </div>
    );
}

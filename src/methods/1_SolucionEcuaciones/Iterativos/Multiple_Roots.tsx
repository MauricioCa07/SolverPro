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
    const tolerance = parseFloat(tolerancestr || "0.0001");
    const maxIterations = parseInt(iterationsstr || "100", 10);
    const initialX0 = parseFloat(x0str || "1");

    const f = (x) => math.evaluate(funct, { x });
    const fPrime = (x) => math.evaluate(firstDerivate, { x });
    const fDoublePrime = (x) => math.evaluate(secondDerivate, { x });

    const [steps, setSteps] = useState<any[]>([]); // Almacenar los pasos
    const [root, setRoot] = useState<number | null>(null);
    const [error, setError] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const calculateMultipleRoots = () => {
            try {
                let X0 = initialX0;
                let n = 0;
                let localError = Infinity;
                const stepsArray: any[] = [];

                while (localError > tolerance && n < maxIterations) {
                    const fx0 = f(X0);
                    const fpx0 = fPrime(X0);
                    const fppx0 = fDoublePrime(X0);

                    if (Math.abs(Math.pow(fpx0, 2) - fx0 * fppx0) < Number.EPSILON) {
                        setErrorMessage("División por cero en la fórmula. Revisa las derivadas y la función.");
                        return;
                    }

                    const Xn = X0 - (fx0 * fpx0) / (Math.pow(fpx0, 2) - fx0 * fppx0);
                    localError = Math.abs(Xn - X0);
                    stepsArray.push({
                        step: n + 1,
                        Xn,
                        fx0,
                        fpx0,
                        fppx0,
                        error: localError,
                    });

                    X0 = Xn;
                    n++;
                }

                setSteps(stepsArray);

                if (localError <= tolerance) {
                    setRoot(X0);
                    setError(localError);
                } else {
                    setErrorMessage("No se encontró una raíz dentro del número máximo de iteraciones.");
                }
            } catch (err) {
                setErrorMessage("Error al evaluar la función. Revisa las expresiones ingresadas.");
            }
        };

        calculateMultipleRoots();
    }, [funct, firstDerivate, secondDerivate, tolerance, maxIterations, initialX0]);

    // Preparar datos para la gráfica
    const plotData = steps.map((step) => step.Xn);
    const plotIterations = steps.map((step) => step.step);

    return (
        <div>
            <Navbar /> {/* Navbar */}
            <h2>Método de Múltiples Raíces (Newton-Raphson con segunda derivada)</h2>

            {errorMessage && (
                <div style={{ color: "red" }}>
                    <h3>Error:</h3>
                    <p>{errorMessage}</p>
                </div>
            )}

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

            {root !== null && error !== null && (
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

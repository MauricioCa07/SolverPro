/* eslint-disable no-unused-vars */
import { format, evaluate, abs } from "mathjs";
import React, { useState, useEffect } from 'react';

export function FixedPoint({ fx, gx, x0, tol = 10e-7 }) {
    const [result, setResult] = useState(null);
    const [iterations, setIterations] = useState([]);  // Para almacenar las iteraciones

    useEffect(() => {
        let error;
        let counter = 0;
        let xi;
        let limitCount = 100;
        let iterationHistory = [];  // Almacena cada iteración
        let fx0 = evaluate(fx, { x: x0 });
        xi = evaluate(gx, { x: x0 });
        error = abs((fx0 - x0) / fx0);
        fx0 = evaluate(fx, { x: xi });

        if (evaluate(fx, { x: x0 }).im) {
            throw Error("X0 is not defined in the domain");
        }
        if (evaluate(gx, { x: x0 }).im) {
            throw Error("x0 is not defined in the domain");
        }
        if (fx === gx) {
            throw Error("function f cannot be the same as g");
        }

        while (error > tol && counter < 50 && fx0 !== 0) {  // Añadido límite de iteraciones para evitar bucles infinitos
            x0 = xi;  // Actualizar x0
            xi = evaluate(gx, { x: x0 });  // Evaluar gx en el nuevo punto
            counter += 1;
            error = abs((xi - x0) / xi);  // Calcular el error
            fx0 = evaluate(fx, { x: xi });

            // Guardar cada iteración
            iterationHistory.push({
                iteration: counter,
                x: format(xi, { notation: 'fixed', precision: 10 }),
                error: format(error, { notation: 'exponential', precision: 2 }),
            });

            if (error <= tol) {
                setResult(`The root is approximately ${xi}`);
                break;
            } else if (fx0 === 0) {
                x0 = xi;
                xi = evaluate(gx, { x: x0 });
                counter += 1;
                setResult(`Root is at ${xi}`);
            } else if (counter === limitCount) {
                setResult("It was impossible to find the root within 100 iterations");
            }
        }

        // Almacenar las últimas 5 iteraciones (o menos si hay menos de 5)
        setIterations(iterationHistory.slice(-5));

    }, [fx, gx, x0, tol]);

    return (
        <div>
            {result && <h1>{result}</h1>}
            {iterations.length > 0 && (
                <div>
                    <h2>Last 5 iterations:</h2>
                    <ul>
                        {iterations.map((iter, index) => (
                            <li key={index}>
                                Iteration {iter.iteration}: x = {iter.x}, error = {iter.error}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

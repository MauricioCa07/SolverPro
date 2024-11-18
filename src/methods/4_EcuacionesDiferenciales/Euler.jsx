import React, { useState } from "react";

export function Euler({ f, x0, y0, xFinal, h }) {
    const [result, setResult] = useState(null);

    const eulerMethod = (f, x0, y0, xFinal, h) => {
        const parseFunction = new Function("x", "y", `return ${f}`);
        const steps = Math.ceil((xFinal - x0) / h);
        const data = [{ x: x0, y: y0 }];

        let x = x0;
        let y = y0;

        for (let i = 0; i < steps; i++) {
            const yNext = y + h * parseFunction(x, y);
            x += h;
            y = yNext;
            data.push({ x, y });
        }

        return data;
    };

    const handleComputation = () => {
        const data = eulerMethod(f, parseFloat(x0), parseFloat(y0), parseFloat(xFinal), parseFloat(h));
        setResult(data);
    };

    return (
        <div>
            <button onClick={handleComputation}>Compute Euler</button>
            {result && (
                <div>
                    <h2>Solution:</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>i</th>
                                <th>x</th>
                                <th>y</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((row, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{row.x.toFixed(4)}</td>
                                    <td>{row.y.toFixed(4)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Euler;

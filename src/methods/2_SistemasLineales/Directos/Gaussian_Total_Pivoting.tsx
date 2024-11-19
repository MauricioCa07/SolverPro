import React, { useState, useEffect } from 'react';
import { create, all } from 'mathjs';
import Plot from 'react-plotly.js';
import Navbar from "../../../components/Navbar"; // Importar Navbar

const math = create(all);

export function GaussianTotalPivoting({ matrixA, vectorB, n }: { matrixA: string; vectorB: string; n: string }) {
    const nVar = parseInt(n, 10);
    const [solution, setSolution] = useState<number[]>([]);
    const [steps, setSteps] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            let A = math.matrix(matrixA.split(';').map(row => row.split(',').map(Number)));
            let b = math.matrix(vectorB.split(',').map(Number));

            // Ensure b is a column vector
            b = math.reshape(b, [nVar, 1]);

            // Check dimensions
            if (A.size()[0] !== nVar || A.size()[1] !== nVar || b.size()[0] !== nVar) {
                throw new Error("Matrix dimensions do not match the specified size n.");
            }

            // Check determinant
            if (Math.abs(math.det(A)) < 1e-10) {
                throw new Error("Matrix is singular or nearly singular. Cannot proceed.");
            }

            // Combine A and b into an augmented matrix
            let augmentedMatrix = math.concat(A, b);
            let columnSwaps = Array.from({ length: nVar }, (_, i) => i); // Track column swaps

            // Steps for visualization
            const stepsArray: any[] = [];

            // Gaussian elimination with total pivoting
            for (let k = 0; k < nVar - 1; k++) {
                // Find pivot
                let maxVal = 0, maxRow = k, maxCol = k;
                for (let i = k; i < nVar; i++) {
                    for (let j = k; j < nVar; j++) {
                        let absVal = Math.abs(augmentedMatrix.get([i, j]));
                        if (absVal > maxVal) {
                            maxVal = absVal;
                            maxRow = i;
                            maxCol = j;
                        }
                    }
                }

                // Check for singular matrix
                if (maxVal < 1e-10) {
                    throw new Error("Matrix is numerically singular. Cannot proceed.");
                }

                // Swap rows
                if (maxRow !== k) {
                    for (let j = k; j <= nVar; j++) {
                        let temp = augmentedMatrix.get([k, j]);
                        augmentedMatrix.set([k, j], augmentedMatrix.get([maxRow, j]));
                        augmentedMatrix.set([maxRow, j], temp);
                    }
                }

                // Swap columns
                if (maxCol !== k) {
                    for (let i = 0; i < nVar; i++) {
                        let temp = augmentedMatrix.get([i, k]);
                        augmentedMatrix.set([i, k], augmentedMatrix.get([i, maxCol]));
                        augmentedMatrix.set([i, maxCol], temp);
                    }
                    [columnSwaps[k], columnSwaps[maxCol]] = [columnSwaps[maxCol], columnSwaps[k]];
                }

                // Eliminate
                for (let i = k + 1; i < nVar; i++) {
                    let factor = augmentedMatrix.get([i, k]) / augmentedMatrix.get([k, k]);
                    for (let j = k; j <= nVar; j++) {
                        let value = augmentedMatrix.get([i, j]) - factor * augmentedMatrix.get([k, j]);
                        augmentedMatrix.set([i, j], value);
                    }
                }

                // Store step
                stepsArray.push({
                    step: k + 1,
                    matrix: math.clone(augmentedMatrix)._data,
                    columnSwaps: [...columnSwaps],
                });
            }

            // Back substitution
            let x = Array(nVar).fill(0);
            for (let i = nVar - 1; i >= 0; i--) {
                let sum = 0;
                for (let j = i + 1; j < nVar; j++) {
                    sum += augmentedMatrix.get([i, j]) * x[columnSwaps[j]];
                }
                x[columnSwaps[i]] = (augmentedMatrix.get([i, nVar]) - sum) / augmentedMatrix.get([i, i]];
                x[columnSwaps[i]] = Math.round(x[columnSwaps[i]] * 1e10) / 1e10; // Avoid floating-point issues
            }

            setSolution(x);
            setSteps(stepsArray);
        } catch (err: any) {
            setError(err.message);
        }
    }, [matrixA, vectorB, nVar]);

    const plotData = solution.map((value, index) => ({ x: `x${index + 1}`, value }));

    return (
        <div>
            <Navbar />
            <h2>Método de Eliminación Gaussiana con Pivoteo Total</h2>

            {error && <h3>Error: {error}</h3>}

            {steps.length > 0 && (
                <>
                    <h3>Demostración paso a paso:</h3>
                    {steps.map((step, index) => (
                        <div key={index}>
                            <h4>Paso {step.step}:</h4>
                            <p>Intercambio de columnas: {JSON.stringify(step.columnSwaps)}</p>
                            <pre>{JSON.stringify(step.matrix, null, 2)}</pre>
                        </div>
                    ))}
                </>
            )}

            {solution.length > 0 && (
                <>
                    <h3>Resultado final:</h3>
                    {solution.map((value, index) => (
                        <p key={index}>x{index + 1} = {value}</p>
                    ))}

                    <h3>Gráfica de las variables:</h3>
                    <Plot
                        data={[
                            {
                                x: plotData.map(d => d.x),
                                y: plotData.map(d => d.value),
                                type: 'bar',
                                name: 'Valores de las variables',
                                marker: { color: 'blue' },
                            },
                        ]}
                        layout={{
                            title: 'Valores de las variables resultantes',
                            xaxis: { title: 'Variables' },
                            yaxis: { title: 'Valor' },
                        }}
                    />
                </>
            )}
        </div>
    );
}

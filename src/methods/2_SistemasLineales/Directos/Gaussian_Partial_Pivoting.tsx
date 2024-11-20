import React, { useState, useEffect } from 'react';
import { create, all } from 'mathjs';
import Plot from 'react-plotly.js';
import Navbar from "../../../components/Navbar"; // Importar Navbar

const math = create(all);

export function GaussianPartialPivoting_Main() {
    return (
        <>
            <Navbar />
            <GaussianPartialPivoting />
        </>
    );
}

function GaussianPartialPivoting({ matrixA, vectorB, n }: { matrixA: string; vectorB: string; n: string }) {
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

            // Steps for visualization
            const stepsArray: any[] = [];

            // Gaussian elimination with partial pivoting
            for (let k = 0; k < nVar - 1; k++) {
                // Find pivot
                let maxIndex = k;
                for (let i = k + 1; i < nVar; i++) {
                    if (Math.abs(augmentedMatrix.get([i, k])) > Math.abs(augmentedMatrix.get([maxIndex, k]))) {
                        maxIndex = i;
                    }
                }

                // Swap rows if necessary
                if (maxIndex !== k) {
                    for (let j = k; j <= nVar; j++) {
                        let temp = augmentedMatrix.get([k, j]);
                        augmentedMatrix.set([k, j], augmentedMatrix.get([maxIndex, j]));
                        augmentedMatrix.set([maxIndex, j], temp);
                    }
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
                });
            }

            // Back substitution
            let x = Array(nVar).fill(0);
            for (let i = nVar - 1; i >= 0; i--) {
                let sum = 0;
                for (let j = i + 1; j < nVar; j++) {
                    sum += augmentedMatrix.get([i, j]) * x[j];
                }
                x[i] = (augmentedMatrix.get([i, nVar]) - sum) / augmentedMatrix.get([i, i]);
                x[i] = Math.round(x[i] * 1e10) / 1e10; // Avoid floating-point issues
            }

            setSolution(x);
            setSteps(stepsArray);
        } catch (err: any) {
            setError(err.message);
        }
    }, [matrixA, vectorB, nVar]);

    // Prepare data for the plot
    const plotData = solution.map((value, index) => ({ x: `x${index + 1}`, value }));

    return (
        <div>
            <Navbar />
            <h2>Método de Eliminación Gaussiana con Pivoteo Parcial</h2>

            {error && <h3>Error: {error}</h3>}

            {steps.length > 0 && (
                <>
                    <h3>Demostración paso a paso:</h3>
                    {steps.map((step, index) => (
                        <div key={index}>
                            <h4>Paso {step.step}:</h4>
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

import React, { useState, useEffect } from 'react';
import { zeros, identity, abs, lsolve, usolve } from 'mathjs';

export function PartialLU({ A, b }) {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const PartialLU = () => {
            const n = A.length;
            let L = identity(n)._data; // Matriz identidad para L
            let U = zeros(n, n)._data;  // Matriz de ceros para U
            let P = identity(n)._data;  // Matriz identidad para P (permutación)
            let M = A.map(row => [...row]); // Copia profunda de A para M

            // Factorización LU con pivoteo parcial
            for (let i = 0; i < n - 1; i++) {
                // Cambio de filas
                const columnSubarray = M.slice(i + 1).map(row => Math.abs(row[i]));
                const maxVal = Math.max(...columnSubarray);
                const relativeMaxRow = columnSubarray.indexOf(maxVal);
                const maxRow = i + 1 + relativeMaxRow;

                if (maxVal > Math.abs(M[i][i])) {
                    // Guardar temporalmente las filas a intercambiar en M y P
                    const aux2 = [...M[maxRow].slice(i)];
                    const aux3 = [...P[maxRow]];
                    
                    // Intercambiar filas en M y P
                    M[maxRow].splice(i, n - i, ...M[i].slice(i));
                    P[maxRow] = [...P[i]];
                    M[i].splice(i, n - i, ...aux2);
                    P[i] = aux3;

                    // Intercambiar las filas en L (hasta la columna i-1)
                    if (i > 0) {
                        const aux4 = [...L[maxRow].slice(0, i)];
                        L[maxRow].splice(0, i, ...L[i].slice(0, i));
                        L[i].splice(0, i, ...aux4);
                    }
                }

                // Eliminación Gaussiana
                for (let j = i + 1; j < n; j++) {
                    if (M[j][i] !== 0) {
                        L[j][i] = M[j][i] / M[i][i];
                        for (let k = i; k < n; k++) {
                            M[j][k] -= L[j][i] * M[i][k];
                        }
                    }
                }

                // Asignar valores a U
                for (let k = i; k < n; k++) {
                    U[i][k] = M[i][k];
                }
            }

            // Último elemento de la diagonal de U
            U[n - 1][n - 1] = M[n - 1][n - 1];

            // Paso 1: Calcular Pb
            const Pb = P.map((row, i) => row.reduce((sum, val, j) => sum + val * b[j], 0));

            // Paso 2: Resolver Ly = Pb (sustitución hacia adelante) para obtener y (equivalente a `z` en MATLAB)
            const y = Array(n).fill(0);
            for (let i = 0; i < n; i++) {
                y[i] = (Pb[i] - L[i].slice(0, i).reduce((sum, val, j) => sum + val * y[j], 0)) / L[i][i];
            }

            // Paso 3: Resolver Ux = y (sustitución hacia atrás) para obtener x
            const x = Array(n).fill(0);
            for (let i = n - 1; i >= 0; i--) {
                x[i] = (y[i] - U[i].slice(i + 1).reduce((sum, val, j) => sum + val * x[i + 1 + j], 0)) / U[i][i];
            }

            setResult({ L, U, P, x });
        }

        PartialLU();
    }, [A, b]);

    return (
        <div>
            <h2>Factorización LU con Pivoteo Parcial</h2>
            {result && (
                <>
                    <h3>Matriz L:</h3>
                    <pre>{JSON.stringify(result.L, null, 2)}</pre>
                    <h3>Matriz U:</h3>
                    <pre>{JSON.stringify(result.U, null, 2)}</pre>
                    <h3>Matriz P (Permutación):</h3>
                    <pre>{JSON.stringify(result.P, null, 2)}</pre>
                    <h3>Solución x:</h3>
                    <pre>{JSON.stringify(result.x, null, 2)}</pre>
                </>
            )}
        </div>
    );
}

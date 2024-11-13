import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

function forwardSubstitution(L, b) {
    const n = b.length;
    const y = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        y[i] = b[i];
        for (let j = 0; j < i; j++) {
            y[i] -= L[i][j] * y[j];
        }
        y[i] /= L[i][i];
    }
    return y;
}

function backwardSubstitution(U, y) {
    const n = y.length;
    const x = Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        x[i] = y[i];
        for (let j = i + 1; j < n; j++) {
            x[i] -= U[i][j] * x[j];
        }
        x[i] /= U[i][i];
    }
    return x;
}

export function CroutDecomposition({ A, b }) {
    const [result, setResult] = useState(null);

    function factorize(A, b) {
        const n = A.length;
        const L = math.identity(n)._data;
        const U = math.identity(n)._data;

        // Factorización usando el método de Crout
        for (let i = 0; i < n - 1; i++) {
            for (let j = i; j < n; j++) {
                L[j][i] = A[j][i];
                for (let k = 0; k < i; k++) {
                    L[j][i] -= L[j][k] * U[k][i];
                }
            }
            for (let j = i + 1; j < n; j++) {
                U[i][j] = A[i][j];
                for (let k = 0; k < i; k++) {
                    U[i][j] -= L[i][k] * U[k][j];
                }
                U[i][j] /= L[i][i];
            }
        }
        L[n - 1][n - 1] = A[n - 1][n - 1];
        for (let k = 0; k < n - 1; k++) {
            L[n - 1][n - 1] -= L[n - 1][k] * U[k][n - 1];
        }

        // Resolver Ly = b y luego Ux = y
        const y = forwardSubstitution(L, b);
        const x = backwardSubstitution(U, y);

        // Devolver las matrices L, U y el vector solución x
        return { x, L, U };
    }

    function handleFactorization() {
        const { x, L, U } = factorize(A, b);
        setResult({ x, L, U });
    }

    return (
        <div>
            <button onClick={handleFactorization}>Compute Crout LU Decomposition</button>
            {result && (
                <div>
                    <h2>Solution Vector x:</h2>
                    <p>{JSON.stringify(result.x)}</p>
                    <h2>Matrix L:</h2>
                    <pre>{JSON.stringify(result.L, null, 2)}</pre>
                    <h2>Matrix U:</h2>
                    <pre>{JSON.stringify(result.U, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default CroutDecomposition;
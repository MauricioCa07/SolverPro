import React, { useState, useEffect } from 'react';

export function Gaussian({ matrixA, matrixB, n }) {
    const [result, setResult] = useState(null);
    
    useEffect(() => {
        const gaussian = (A, B, n) => {
            let M = new Array(n);
            for (let i = 0; i < n; i++) {
                M[i] = new Array(n + 1);
            }

            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    M[i][j] = A[i][j];
                }
                M[i][n] = B[i];
            }

            for (let k = 0; k < n - 1; k++) {
                for (let i = k + 1; i < n; i++) {
                    let ratio = M[i][k] / M[k][k];
                    for (let j = k; j < n + 1; j++) {
                        M[i][j] = M[i][j] - ratio * M[k][j];
                    }
                }
            }

            let X = new Array(n).fill(0);

            for (let i = n - 1; i >= 0; i--) {
                let sum = 0;
                for (let j = i + 1; j < n; j++) {
                    sum += M[i][j] * X[j];
                }
                X[i] = (M[i][n] - sum) / M[i][i];
            }
            setResult(X);
        };

        const matrixAA = matrixA.split(';').map(row => row.split(',').map(Number));
        const matrixBB = matrixB.split(',').map(Number);
        const nVar = parseInt(n, 10);
        
        gaussian(matrixAA, matrixBB, nVar);
    }, [matrixA, matrixB, n]); 

    return (
        <div>
            {result && (
                <div>
                    <h2>Resultados:</h2>
                    <ul>
                        {result.map((value, index) => (
                            <li key={index}>x{index + 1} = {value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

export function GaussSeidel({ A, b, x0, tol, Nmax }) {
    const [result, setResult] = useState(null);

    function gaussSeidel(A, b, x0, tol, Nmax) {
        const n = A.length;
        let xant = [...x0];
        let xact = Array(n).fill(0);
        let error = Infinity;
        let iterations = 0;

        // Descomposición de A en D, L y U
        const D = math.diag(math.diag(A));
        const L = math.subtract(math.multiply(-1, math.tril(A)), D);
        const U = math.subtract(math.multiply(-1, math.triu(A)), D);
        
        // Calcula T y C
        const DL_inv = math.inv(math.add(D, L));
        const T = math.multiply(DL_inv, U);
        const C = math.multiply(DL_inv, b);

        // Ciclo de iteración
        while (error > tol && iterations < Nmax) {
            xact = math.add(math.multiply(T, xant), C);
            error = math.norm(math.subtract(xant, xact));
            xant = [...xact];
            iterations++;
        }

        return { x: xact, iterations, error };
    }

    function handleComputation() {
        const { x, iterations, error } = gaussSeidel(A, b, x0, tol, Nmax);
        setResult({ x, iterations, error });
    }

    return (
        <div>
            <button onClick={handleComputation}>Compute Gauss-Seidel</button>
            {result && (
                <div>
                    <h2>Solution Vector x:</h2>
                    <p>{JSON.stringify(result.x)}</p>
                    <h2>Number of Iterations:</h2>
                    <p>{result.iterations}</p>
                    <h2>Final Error:</h2>
                    <p>{result.error}</p>
                </div>
            )}
        </div>
    );
}

export default gaussSeidel;
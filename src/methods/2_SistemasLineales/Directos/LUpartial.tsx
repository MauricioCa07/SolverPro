import React, { useState, useEffect } from 'react';
import { zeros, identity } from 'mathjs';
import Navbar from "../../../components/Navbar";

export function LUpartialMain(){
    return(
        <>
            <Navbar />
            <LUForm/>
        </>
    );
}

type Props = {
    A: number[][];
    b: number[];
};

export function PartialLU({ A, b }: Props) {
    const [result, setResult] = useState<{
        L: number[][];
        U: number[][];
        P: number[][];
        x: number[];
    } | null>(null);

    useEffect(() => {
        const calculatePartialLU = () => {
            const n = A.length;
            let L = identity(n)._data as number[][]; // Matriz identidad para L
            let U = zeros(n, n)._data as number[][];  // Matriz de ceros para U
            let P = identity(n)._data as number[][];  // Matriz identidad para P (permutación)
            let M = A.map(row => [...row]); // Copia profunda de A para M

            // Factorización LU con pivoteo parcial
            for (let i = 0; i < n - 1; i++) {
                // Cambio de filas
                const columnSubarray = M.slice(i + 1).map(row => Math.abs(row[i]));
                const maxVal = Math.max(...columnSubarray);
                const relativeMaxRow = columnSubarray.indexOf(maxVal);
                const maxRow = i + 1 + relativeMaxRow;

                if (maxVal > Math.abs(M[i][i])) {
                    // Intercambiar filas en M, P y L
                    [M[maxRow], M[i]] = [M[i], M[maxRow]];
                    [P[maxRow], P[i]] = [P[i], P[maxRow]];
                    if (i > 0) {
                        [L[maxRow], L[i]] = [L[i], L[maxRow]];
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

            // Paso 2: Resolver Ly = Pb (sustitución hacia adelante)
            const y = Array(n).fill(0);
            for (let i = 0; i < n; i++) {
                y[i] = (Pb[i] - L[i].slice(0, i).reduce((sum, val, j) => sum + val * y[j], 0)) / L[i][i];
            }

            // Paso 3: Resolver Ux = y (sustitución hacia atrás)
            const x = Array(n).fill(0);
            for (let i = n - 1; i >= 0; i--) {
                x[i] = (y[i] - U[i].slice(i + 1).reduce((sum, val, j) => sum + val * x[i + 1 + j], 0)) / U[i][i];
            }

            setResult({ L, U, P, x });
        };

        calculatePartialLU();
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

export function LUForm() {
    const [matrix, setMatrix] = useState<string>('');
    const [vector, setVector] = useState<string>('');
    const [parsedMatrix, setParsedMatrix] = useState<number[][] | null>(null);
    const [parsedVector, setParsedVector] = useState<number[] | null>(null);

    const parseMatrix = (input: string): number[][] => {
        return input
            .trim()
            .split('\n')
            .map(row => row.trim().split(/\s+/).map(Number));
    };

    const parseVector = (input: string): number[] => {
        return input
            .trim()
            .split(" ")
            .map(Number);
    };

    //console.log("Matrix:", parseMatrix);
    //console.log("Vector:", parseVector);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const parsedA = parseMatrix(matrix);
            const parsedB = parseVector(vector);

            if (parsedA.length !== parsedB.length) {
                alert('El número de filas en la matriz debe coincidir con la longitud del vector.');
                return;
            }

            setParsedMatrix(parsedA);
            setParsedVector(parsedB);
        } catch (error) {
            alert('Formato de entrada inválido. Asegúrese de usar números separados por espacios y filas separadas por líneas nuevas.');
        }
    };

    return (
        <div>
            <h2>Ingrese la matriz y el vector</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Matriz (A):</label>
                    <textarea
                        value={matrix}
                        onChange={(e) => setMatrix(e.target.value)}
                        placeholder="Ejemplo: 1 2 3\n4 5 6\n7 8 9"
                        required
                    />
                </div>
                <div>
                    <label>Vector (b):</label>
                    <textarea
                        value={vector}
                        onChange={(e) => setVector(e.target.value)}
                        placeholder="Ejemplo: 1 2 3"
                        required
                    />
                </div>
                <button type="submit">Calcular</button>
            </form>
            {parsedMatrix && parsedVector && (
                <PartialLU A={parsedMatrix} b={parsedVector} />
                
            )}
        </div>

    );
}

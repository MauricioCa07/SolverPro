import React from 'react';
import { create, all } from 'mathjs';

const math = create(all);

export function GaussianPartialPivoting({ matrixA, vectorB, n }) {
    try {
        const nVar = parseInt(n, 10);
        let A = math.matrix(matrixA.split(';').map(row => row.split(',').map(Number)));
        let b = math.matrix(vectorB.split(',').map(Number));

        // Ensure b is a column vector
        b = math.reshape(b, [nVar, 1]);

        // Check dimensions
        if (A.size()[0] !== nVar || A.size()[1] !== nVar || b.size()[0] !== nVar) {
            throw new Error("Matrix dimensions do not match the specified size n");
        }

        // Check determinant
        if (Math.abs(math.det(A)) < 1e-10) {
            throw new Error("Matrix is singular or nearly singular. Cannot proceed.");
        }

        // Combine A and b into an augmented matrix
        let augmentedMatrix = math.concat(A, b);

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
        }

        // Back substitution
        let x = Array(nVar).fill(0);
        for (let i = nVar - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < nVar; j++) {
                sum += augmentedMatrix.get([i, j]) * x[j];
            }
            x[i] = (augmentedMatrix.get([i, nVar]) - sum) / augmentedMatrix.get([i, i]);
            
            // Round to avoid floating point errors
            x[i] = Math.round(x[i] * 1e10) / 1e10;
        }

        return (
            <div>
                <h1>Solution:</h1>
                {x.map((value, index) => (
                    <p key={index}>x{index + 1} = {value}</p>
                ))}
            </div>
        );
    } catch (error) {
        return <h1>Error: {error.message}</h1>;
    }
}

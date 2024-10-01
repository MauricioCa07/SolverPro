import React from 'react';
import { create, all } from 'mathjs';

const math = create(all);

export function MultipleRoots({ funct, firstDerivate, secondDerivate, tolerancestr, iterationsstr, x0str }) {
    const tolerance = parseFloat(tolerancestr, 10);
    const maxIterations = parseInt(iterationsstr, 10);
    var X0 = parseFloat(x0str, 10);

    const f = (x) => math.evaluate(funct, { x: x });
    const fPrime = (x) => math.evaluate(firstDerivate, { x: x });
    const fDoublePrime = (x) => math.evaluate(secondDerivate, { x: x });

    if (Math.abs(f(X0)) < Number.EPSILON) {
        return <h1>The initial value {X0} is the root.</h1>;
    }

    let n = 0;
    let error = Infinity;
    let Xn = X0;

    while (error > tolerance && Math.abs(f(Xn)) > Number.EPSILON && n < maxIterations) {
        const fx0 = f(X0);
        const fpx0 = fPrime(X0);
        const fppx0 = fDoublePrime(X0);

        if (Math.abs(Math.pow(fpx0, 2) - fx0 * fppx0) < Number.EPSILON) {
            return <h1>Error: Division by zero encountered.</h1>;
        }

        Xn = X0 - (fx0 * fpx0) / (Math.pow(fpx0, 2) - fx0 * fppx0);
        error = Math.abs(Xn - X0);

        if (isNaN(Xn)) {
            return <h1>Error: The result is NaN</h1>;
        }

        X0 = Xn;
        n++;
    }

    if (error <= tolerance) {
        return <h1>The root is approximately {Xn.toFixed(10)} with an error of {error.toFixed(10)}</h1>;
    } else if (Math.abs(f(Xn)) < Number.EPSILON) {
        return <h1>{Xn.toFixed(6)} is the root.</h1>;
    } else {
        return <h1>Reached maximum iterations. The root is approximately {Xn.toFixed(6)} with an error of {error.toFixed(6)}</h1>;
    }
}
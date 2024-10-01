import { create, all } from 'mathjs'; 

const math = create(all);

function f(func, x) {
    return math.evaluate(func, { x });
}

export function Secant({ f: func, tolerancestr, iterationsstr, x0str, x1str }) {
    const tolerance = parseFloat(tolerancestr, 10);
    const iterations = parseInt(iterationsstr, 10);
    let X0 = parseFloat(x0str, 10);
    let X1 = parseFloat(x1str, 10);

    for (let i = 0; i < iterations; i++) {
        const fx0 = f(func, X0);
        const fx1 = f(func, X1);

        if (fx1 === 0) {
            return <h1>Root found at: {X1}</h1>;
        }

        if (fx1 - fx0 === 0) {
            return <h1>Error: Division by 0</h1>;
        }

        const Xn = X1 - (fx1 * (X1 - X0)) / (fx1 - fx0);


        if (math.abs(Xn - X1) < tolerance) {
            return <h1>Root found at: {Xn}</h1>;
        }
        
        X0 = X1;
        X1 = Xn;
    }

    return <h1>No root found after {iterations} iterations.</h1>;
}

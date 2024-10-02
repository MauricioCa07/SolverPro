import { format, evaluate, abs } from "mathjs";
import React, { useState, useEffect } from 'react';

export function FixedPoint({ fx, gx, x0, tol = 1e-7 }) {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const findRoot = () => {
            let error;
            let counter = 0;
            let xi = x0;
            let limitCount = 100;
            let fx0 = evaluate(fx, { x: xi });

            if (isNaN(fx0)) {
                throw Error("x0 is not defined in the domain");
            }
            if (isNaN(evaluate(gx, { x: xi }))) {
                throw Error("gx is not defined in the domain");
            }
            if (fx === gx) {
                throw Error("Function f cannot be the same as g");
            }

            do {
                const previousXi = xi;
                xi = evaluate(gx, { x: previousXi });
                counter++;
                
                fx0 = evaluate(fx, { x: xi });
                error = abs(xi - previousXi); 

                if (isNaN(fx0)) {
                    break;
                }

                if (error <= tol) {
                    setResult(`The root is approximately ${xi} in iteration ${counter} with an error of ${error}`);
                    return;
                }

            } while (counter < limitCount);

            setResult("It was impossible to find the root within 100 iterations");
        };

        findRoot();
    }, [fx, gx, x0, tol]);

    return (
        <div>
            {result && <h1>{result}</h1>}
        </div>
    );
}

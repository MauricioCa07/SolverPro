/* eslint-disable no-unused-vars */
import { format, evaluate, abs } from "mathjs";
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
export function Newton({ fx, dfx, x0, tol=10e-7}) {
    const [result, setResult] = useState(null);

    useEffect( () => {
        let error;
        let counter = 0;
        let fx0 = evaluate(fx, { x: x0 })
        let derivateFx = evaluate(dfx, { x: x0 })
        let xi = x0 - fx0 / derivateFx
        let fxi = evaluate(fx, { x: xi })
        let limitCount = 100;
        counter += 1;
        error = abs(xi-x0)

        if(evaluate(fx, {x: x0}).im) {
            throw Error("X0 is not define in the domine");
        }
        if(tol < 0) {
            throw Error("Tol is incorrect, use more (e.x: 10e-7");
        }
        if(derivateFx === 0) {
            throw Error("the point evaluated in the derivate must be different from 0 ")
        }

        while(error > tol && fxi !=0){
            x0 = xi;
            fx0 = fxi;
            derivateFx = evaluate(dfx, { x: x0 });
            xi = x0-fx0 / derivateFx;
            error = abs(x0-xi);
            fxi = evaluate(fx, { x: xi });
            counter +=1;
            if(derivateFx.im) {
                throw Error("xi is not define in the domain");
            }
            if(fxi.im) {
                throw Error("xi is not define in the domain")
            }
            if(fxi == 0) {
                setResult(`The root is approximately ${xi} in iteration ${counter} with an error of ${error}`);
                break;
            }
            else if(error <= tol){
                setResult(`The root is approximately ${xi} in iteration ${counter} with an error of ${error}`);
                break;
            }
            else if(counter === limitCount){
                setResult("It was impossible to find the root")
            }
        }
        
    }, [fx, dfx, x0, tol]);

        return (
            <div>
                {result && <h1>{result}</h1>}
            </div>
        )
    
}
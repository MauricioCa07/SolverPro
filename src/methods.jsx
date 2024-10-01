import { StrictMode } from 'react'
import { create, all } from 'mathjs'; 

const math = create(all);

export function Secant( {f,tolerancestr,iterationsstr,x0str,x1str} ){
    const tolerance = parseFloat(tolerancestr,10)
    const iteracions = parseInt(iterationsstr,10)
    var X0 = parseFloat(x0str,10) 
    var X1 = parseFloat(x1str,10)


    if(math.evaluate(f, {x: X0}) == 0 || math.evaluate(f, {x: X1}) == 0 ){
        return(
            <h1> This is the root</h1>
        );
    }


    const fx0 = math.evaluate(f, {x: X0}) 
    const fx1 = math.evaluate(f, {x: X1}) 
    var Xn = X1 - ((fx1 * (X1 - X0))/(fx1 - fx0))
    console.log(fx0,fx1,Xn,math.evaluate(f, {x: Xn}))
    if (isNaN(math.evaluate(f, {x: Xn}))) {
        console.error("The function returned NaN at Xn. There might be a division by zero or another issue.");
        return (
            <h1>Error: The result is NaN</h1>
        );
    }else if (math.evaluate(f, {x: Xn}) == 0 ) {
        return (
            <h1>This is the root</h1>
        );
    }


    var n = 0 ;


    while(Math.abs(X1-Xn) > tolerance && math.evaluate(f, {x: Xn}) != 0 && n < iteracions){
        console.log(X0,X1)
        X0 = X1
        X1 = Xn
        console.log(X0,X1)
        const fx0 = math.evaluate(f, {x: X0}) 
        const fx1 = math.evaluate(f, {x: X1}) 
        var Xn = X1 - ((fx1 * (X1 - X0))/(fx1 - fx0))
        var fxn = math.evaluate(f, {x: Xn}) 
        console.log(Xn,fxn)
        if(fx1 - fxn == 0 ){
            return (
                <h1>Error: The result is NaN</h1>
            );
        }
        n = n+1
    }

    if (Math.abs(X1-Xn) <= tolerance){
        return (
            <h1>root is in {Xn}</h1>
        );
    }

    if (fxn == 0){
        return (
            <h1>root is in {Xn}</h1>
        );
    }

    if (n == iteracions){
        return (
            <h1>rewach the toelrance</h1>
        );
    }

}




export function Gaussian({ matrixA, matrixB, n }) {
    const matrixAA = matrixA.split(';').map(row => row.split(',').map(Number));
    const matrixBB = matrixB.split(';').map(row => row.split(',').map(Number));
    const nVar = parseInt(n,10)
}
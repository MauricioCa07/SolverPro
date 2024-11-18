import { create, all } from 'mathjs'; 
const math = create(all);

function f(func, x) {
    return math.evaluate(func, { x });
}

export function Bisection({ f: func, astring, bstring, tolstring, Nmaxstring }) {
    let a = parseFloat(astring, 10);
    let b = parseFloat(bstring, 10);
    let tol = parseFloat(tolstring, 10);
    let Nmax = parseInt(Nmaxstring, 10);
    let fa = f(func, a); 
    let pm = (a + b) / 2;
    let fpm = f(func, pm);
    let E = 1000;
    let cont = 1;

    while (E > tol && cont < Nmax) {
        if (fa * fpm < 0) {
            b = pm;
        } else {
            a = pm;
            fa = fpm; // Update fa when assigning new a
        }

        let p0 = pm;
        pm = (a + b) / 2;
        fpm = f(func, pm);
        E = Math.abs(pm - p0);
        cont++;
    }

    return <h1>Root found at: {pm} in {cont} iterations with an error of {E}</h1>;
}

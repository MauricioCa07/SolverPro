import { create, all } from 'mathjs'; 
const math = create(all);

function f(func, x) {
    return math.evaluate(func, { x });
}

export function bisection({f:func, astring, bstring, tolstring, Nmaxstring}){
    const a = parseFloat(astring, 10);
    const b = parseFloat(bstring, 10);
    const tol = parseFloat(tolstring, 10);
    const Nmax = parseInt(Nmaxstring, 10);

    const fa = f(func, a);
    const pm = (a+b)/2;
    const fpm = f(func, pm);
    const E = 1000;
    const cont = 1;

    while (E > tol && cont < Nmax) {
        if (fa * fpm < 0) {
          b = pm;
        } else {
          a = pm;
        }
    
        let p0 = pm;
        pm = (a + b) / 2;
        fpm = f(pm);
        E = Math.abs(pm - p0);
        cont++;
      }

      return <h1>Root found at: {pm} in {cont} iterations with an error of {E}</h1>;
}
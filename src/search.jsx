import { create, all } from 'mathjs'; 
const math = create(all);

function f(func, x) {
    return math.evaluate(func, { x });
}

export function search({f: func, x0string, hstring, Nmaxstring}){
    const x0 = parseFloat(x0string, 10);
    const h = parseFloat(hstring, 10);
    const Nmax = parseFloat(Nmaxstring, 10);

    const xinf = x0;
    const yinf = f(func, xinf);
    const xsup = xinf + h;
    const ysup = f(func, xsup);

    for (const i = 1; i <= Nmax; i++) {
        if (yinf * ysup <= 0) {
          return <h1>Root at the interval between {xinf} and {xsup} in {i}iterations</h1>; // Si hay cambio de signo, retornamos los resultados
        }
        xinf = xsup;
        yinf = ysup;
        xsup = xinf + h;
        ysup = f(xsup);
      }
    
    if (i > Nmax) {
      return <h1>Could not find a sign switch for the function in the given maximum iterations</h1>
    }
}
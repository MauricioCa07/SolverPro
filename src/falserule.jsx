import { create, all } from 'mathjs'; 
const math = create(all);

function f(func, x) {
    return math.evaluate(func, { x });
}

export function Falserule({f:func, astring, bstring, tolstring, Nmaxstring}){
    const a = parseFloat(astring, 10);
    const b = parseFloat(bstring, 10);
    const tol = parseFloat(tolstring, 10);
    const Nmax = parseInt(Nmaxstring, 10);

    const fa = f(func, a);
    const fb = f(func, b);
    const pm = (fb*a-fa*b)/(fb-fa);
    const fpm = f(func, pm);
    const E = 1000;
    const cont = 1;

    while (E > tol && cont < Nmax) {
        if (fa * fpm < 0) {     //Si hay cambio de signo en la primera parte del intervalo se reasigna el límite superior
            b = pm;
          } else {
            a = pm;     //De lo contrario, se reasigna el límite inferior
          }
      
          let p0 = pm;      //Guardar la aproximación
          pm = (f(b)*a-f(a)*b)/(f(b)-f(a));     //Calcular el nuevo punto medio
          fpm = f(pm);
          E = Math.abs(pm - p0);    //Calcular el error

          cont++;
    }

    return <h1>Root found at: {pm} in {cont} iterations with an error of {E}</h1>;
}
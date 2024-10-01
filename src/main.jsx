import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Secant,Gaussian } from './methods.jsx'
import { MultipleRoots } from './MultipleRoots.jsx'



createRoot(document.getElementById('root')).render(
  <>
  <Secant f="log(sin(x)^2 + 1) - 1/2" tolerancestr="1e-7" iterationsstr="100" x0str="0.5" x1str="1" />
  <Gaussian matrixA="1,2,3;4,5,6;7,8,9" matrixB="1,2,3" n="3" ></Gaussian>
  <MultipleRoots funct="log(sin(x)^2 + 1) - 1/2" firstDerivate="sin(2x)" secondDerivate="2cos(2x)" tolerancestr="1e-7"  iterationsstr="100" x0str="0.5"></MultipleRoots>
  </>
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Secant,Gaussian } from './methods.jsx'
import { MultipleRoots } from './MultipleRoots.jsx'
import { GaussianPartialPivoting } from './GaussianPartialPivoting.jsx'
import { GaussianTotalPivoting } from './GaussianTotalPivoting.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <Secant f="log(sin(x)^2 + 1) - 1/2" tolerancestr="1e-7" iterationsstr="100" x0str="0.5" x1str="1" />
  <Gaussian matrixA="2,-1,0,3;1,0.5,3,8;0,13,-2,11;14,5,-2,3" matrixB="1,1,1,1" n="4" ></Gaussian>
  <MultipleRoots funct="log(sin(x)^2 + 1) - 1/2" firstDerivate="sin(2x)" secondDerivate="2cos(2x)" tolerancestr="1e-7"  iterationsstr="100" x0str="0.5"></MultipleRoots>
  <GaussianPartialPivoting matrixA="4,-2,1;-2,4,-2;1,-2,4" vectorB="11,-16,17" n="3"></GaussianPartialPivoting>
  <GaussianTotalPivoting matrixA="4,-2,1;-2,4,-2;1,-2,4" vectorB="11,-16,17" n="3"></GaussianTotalPivoting>
  </>
);  

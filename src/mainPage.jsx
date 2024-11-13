import React, { useState } from 'react';
import LUDecomposition from './lu_sin_pivoteo';
import CholeskyDecomposition from './cholesky';
import JacobiMethod from './jacobi';
import NewtonDividedDifferences from './newton_diferencias_divididas';
import CompositeSimpson from './simpson';
import Secant from './secant';
import Gaussian from './gaussian';
import MultipleRoots from './MultipleRoots';
import GaussianPartialPivoting from './GaussianPartialPivoting';
import GaussianTotalPivoting from './GaussianTotalPivoting';
import Search from './search';
import Bisection from './bisection';
import Falserule from './falserule';
import FixedPoint from './FixedPoint';
import SOR from './SOR';

const MainPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const renderMethod = () => {
    switch (selectedMethod) {
      case 'LU':
        return <LUDecomposition />;
      case 'Cholesky':
        return <CholeskyDecomposition />;
      case 'Jacobi':
        return <JacobiMethod />;
      case 'Newton':
        return <NewtonDividedDifferences />;
      case 'Simpson':
        return <CompositeSimpson />;
      case 'Secant':
        return <Secant f="log(sin(x)^2 + 1) - 1/2" tolerancestr="1e-7" iterationsstr="100" x0str="0.5" x1str="1" />;
      case 'Gaussian':
        return <Gaussian matrixA="2,-1,0,3;1,0.5,3,8;0,13,-2,11;14,5,-2,3" matrixB="1,1,1,1" n="4" />;
      case 'MultipleRoots':
        return <MultipleRoots funct="log(sin(x)^2 + 1) - 1/2" firstDerivate="sin(2x)" secondDerivate="2cos(2x)" tolerancestr="1e-7" iterationsstr="100" x0str="0.5" />;
      case 'GaussianPartialPivoting':
        return <GaussianPartialPivoting matrixA="4,-2,1;-2,4,-2;1,-2,4" vectorB="11,-16,17" n="3" />;
      case 'GaussianTotalPivoting':
        return <GaussianTotalPivoting matrixA="4,-2,1;-2,4,-2;1,-2,4" vectorB="11,-16,17" n="3" />;
      case 'Search':
        return <Search f="x*x-4" x0string="0" hstring="3" Nmaxstring="100" />;
      case 'Bisection':
        return <Bisection f="x*x-4" astring="1" bstring="3" tolstring="1e-7" Nmaxstring="100" />;
      case 'Falserule':
        return <Falserule f="x*x-4" astring="1" bstring="3" tolstring="1e-7" Nmaxstring="100" />;
      case 'FixedPoint':
        return <FixedPoint fx="3x-exp(-2x)" gx="exp(-2x)/3" x0="0.1" tol="10e-7" />;
      case 'SOR':
        return (
          <SOR
            matrixA="4,-1,0; -1,4,-1; 0,-1,3"
            vectorB="15,10,10"
            x0str="0,0,0"
            wstr="1.25"
            tolstr="1e-5"
            Nmaxstr="100"
          />
        );
      default:
        return <h2>Choose a method</h2>;
    }
  };

  return (
    <div>
      <h1>Numerical Methods</h1>
      <div>
        <button onClick={() => setSelectedMethod('LU')}>LU Decomposition</button>
        <button onClick={() => setSelectedMethod('Cholesky')}>Cholesky Decomposition</button>
        <button onClick={() => setSelectedMethod('Jacobi')}>Jacobi Method</button>
        <button onClick={() => setSelectedMethod('Newton')}>Newton's Divided Differences</button>
        <button onClick={() => setSelectedMethod('Simpson')}>Composite Simpson's 1/3 Rule</button>
        <button onClick={() => setSelectedMethod('Secant')}>Secant Method</button>
        <button onClick={() => setSelectedMethod('Gaussian')}>Gaussian Elimination</button>
        <button onClick={() => setSelectedMethod('MultipleRoots')}>Multiple Roots</button>
        <button onClick={() => setSelectedMethod('GaussianPartialPivoting')}>Gaussian Partial Pivoting</button>
        <button onClick={() => setSelectedMethod('GaussianTotalPivoting')}>Gaussian Total Pivoting</button>
        <button onClick={() => setSelectedMethod('Search')}>Incremental Searches</button>
        <button onClick={() => setSelectedMethod('Bisection')}>Bisection</button>
        <button onClick={() => setSelectedMethod('Falserule')}>False Rule</button>
        <button onClick={() => setSelectedMethod('FixedPoint')}>Fixed Point</button>
        <button onClick={() => setSelectedMethod('SOR')}>SOR Method</button>
      </div>
      <div>{renderMethod()}</div>
    </div>
  );
};

export default MainPage;

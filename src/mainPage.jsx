import React, { useState } from 'react';
import LUDecomposition from './lu_sin_pivoteo';
import CholeskyDecomposition from './cholesky';
import JacobiMethod from './jacobi';
import NewtonDividedDifferences from './newton_diferencias_divididas';
import CompositeSimpson from './simpson';
import {Secant} from './secant';
import {Gaussian} from './gaussian';
import {MultipleRoots} from './MultipleRoots';
import {GaussianPartialPivoting} from './GaussianPartialPivoting';
import {GaussianTotalPivoting} from './GaussianTotalPivoting';
import {Search} from './search';
import {Bisection} from './bisection';
import {Falserule} from './falserule';
import {FixedPoint} from './FixedPoint';
import SOR from './SOR';
import {PartialLU} from './LUparcial';
import {CroutDecomposition} from './Crout';
import GaussSeidel from './Gauss_Seidel';
import LagrangeInterpolation from './Lagrange';

const MainPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const renderMethod = () => {
    switch (selectedMethod) {
      case "GaussSeidel":
        return <GaussSeidel A={[
          [4, -1, 0, 0],
          [-1, 4, -1, 0],
          [0, -1, 4, -1],
          [0, 0, -1, 3]
      ]} 
      b={[15, 10, 10, 10]} 
      x0={[0, 0, 0, 0]} 
      tol={1e-7} 
      Nmax={100}/>
      case "Crout":
        return <CroutDecomposition A={[
          [2, 3, 1],
          [5, 7, 1],
          [-2, 4, -1],
        ]}
        b={[5, 10, -3]}/>
      case "LUparcial":
        return <PartialLU A={[
          [2, 3, 1],
          [5, 7, 1],
          [-2, 4, -1],
        ]}
        b={[5, 10, -3]}/>
      case "LU":
        return <LUDecomposition/>;
      case "Cholesky":
        return <CholeskyDecomposition/>;
      case "Jacobi":
        return <JacobiMethod/>
      case "NewtonDivided":
        return <NewtonDividedDifferences/>
      case "Simpson":
        return <CompositeSimpson/>
      case "Secant":
        return (
          <Secant
            f="log(sin(x)^2 + 1) - 1/2"
            tolerancestr="1e-7"
            iterationsstr="100"
            x0str="0.5"
            x1str="1"
          />
        );
      case "Gaussian":
        return (
          <Gaussian
            matrixA="2,-1,0,3;1,0.5,3,8;0,13,-2,11;14,5,-2,3"
            matrixB="1,1,1,1"
            n="4"
          />
        );
      case "MultipleRoots":
        return (
          <MultipleRoots
            funct="log(sin(x)^2 + 1) - 1/2"
            firstDerivate="sin(2x)"
            secondDerivate="2cos(2x)"
            tolerancestr="1e-7"
            iterationsstr="100"
            x0str="0.5"
          />
        );
      case "GaussianPartialPivoting":
        return (
          <GaussianPartialPivoting
            matrixA="4,-2,1;-2,4,-2;1,-2,4"
            vectorB="11,-16,17"
            n="3"
          ></GaussianPartialPivoting>
        );
      case "GaussianTotalPivoting":
        return (
          <GaussianTotalPivoting
            matrixA="4,-2,1;-2,4,-2;1,-2,4"
            vectorB="11,-16,17"
            n="3"
          ></GaussianTotalPivoting>
        );
      case "Search":
        return <Search f="x*x-4" x0string="0" hstring="3" Nmaxstring="100" />;
      case 'Bisection':
        return <Bisection f="2x+4sin(x)^2+3" astring="-4" bstring="-2" tolstring="1e-7" Nmaxstring="100" />;
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
      case 'Lagrange':
        return <LagrangeInterpolation X = {[1, 2, 3]} Y={[2, 3, 5]}/>;
      default:
        return <h2>Choose a method</h2>;
    }
  };

  return (
    <div>
      <h1>Numeric methods</h1>
      <div>
        <button onClick={() => setSelectedMethod('LU')}>LU Decomposition</button>
        <button onClick={() => setSelectedMethod('Cholesky')}>Cholesky Decomposition</button>
        <button onClick={() => setSelectedMethod('Jacobi')}>Jacobi Method</button>
        <button onClick={() => setSelectedMethod('NewtonDivided')}>Newton's Divided Differences</button>
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
        <button onClick={() => setSelectedMethod('LUparcial')}>Partial-pivoting LU</button>
        <button onClick={() => setSelectedMethod('Crout')}>Crout</button>
        <button onClick={() => setSelectedMethod('GaussSeidel')}>Gauss-Seidel</button>
        <button onClick={() => setSelectedMethod('Lagrange')}>Interpolating polynomial with Lagrange's method</button>
      </div>
      <div>{renderMethod()}</div>
    </div>
  );
};

export default MainPage;

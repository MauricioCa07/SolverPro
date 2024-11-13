import React, { useState } from "react";
import { Secant } from "./secant.jsx";
import { Gaussian } from "./gaussian.jsx";
import { MultipleRoots } from "./MultipleRoots.jsx";
import { GaussianPartialPivoting } from "./GaussianPartialPivoting.jsx";
import { GaussianTotalPivoting } from "./GaussianTotalPivoting.jsx";
import { Search } from "./search.jsx";
import { Bisection } from "./bisection.jsx";
import { Falserule } from "./falserule.jsx";
import { Newton } from "./Newton.jsx";
import { FixedPoint } from "./FixedPoint.jsx";
import { PartialLU } from "./LUparcial.jsx";
import LUDecomposition from "./lu_sin_pivoteo";
import CholeskyDecomposition from "./cholesky";
import JacobiMethod from "./jacobi";
import NewtonDividedDifferences from "./newton_diferencias_divididas";
import CompositeSimpson from "./simpson";

const MainPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const renderMethod = () => {
    switch (selectedMethod) {
      case "secant":
        return (
          <Secant
            f="log(sin(x)^2 + 1) - 1/2"
            tolerancestr="1e-7"
            iterationsstr="100"
            x0str="0.5"
            x1str="1"
          />
        );
      case "gaussian":
        return (
          <Gaussian
            matrixA="2,-1,0,3;1,0.5,3,8;0,13,-2,11;14,5,-2,3"
            matrixB="1,1,1,1"
            n="4"
          />
        );
      case "multipleRoots":
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
      case "Bisection":
        return (
          <Bisection
            f="x*x-4"
            astring="1"
            bstring="3"
            tolstring="1e-7"
            Nmaxstring="100"
          />
        );
      case "Falserule":
        return (
          <Falserule
            f="x*x-4"
            astring="1"
            bstring="3"
            tolstring="1e-7"
            Nmaxstring="100"
          />
        );
      case "Newton":
        return <Newton fx="log(x)-1" dfx="1/x" x0="2.5" tol="10e-7" />;
      case "FixedPoint":
        return (
          <FixedPoint fx="3x-exp(-2x)" gx="exp(-2x)/3" x0="0.1" tol="10e-7" />
        );
      case "PartialLU":
        return (
          <PartialLU
            A={[
              [2, 3, 1],
              [5, 7, 1],
              [-2, 4, -1],
            ]}
            b={[5, 10, -3]}
          />
        );
      case "LU":
        return <LUDecomposition />;
      case "Cholesky":
        return <CholeskyDecomposition />;
      case "Jacobi":
        return <JacobiMethod />;
      case "diferencias divididas":
        return <NewtonDividedDifferences />;
      case "Simpson":
        return <CompositeSimpson />;

      default:
        return <h2>Choose a method</h2>;
    }
  };

  return (
    <div>
      <h1>Numeric methods</h1>
      <div>
        <button onClick={() => setSelectedMethod("Secant")}>secant </button>
        <button onClick={() => setSelectedMethod("Gaussian")}>
          Gaussian Eliminatio
        </button>
        <button onClick={() => setSelectedMethod("Multiple Roots")}>
          multiple Roots
        </button>
        <button onClick={() => setSelectedMethod("GaussianPartialPivoting")}>
          Gaussian Partial Pivoting
        </button>
        <button onClick={() => setSelectedMethod("GaussianTotalPivoting")}>
          Gaussian Total Pivoting
        </button>
        <button onClick={() => setSelectedMethod("Search")}>
          Incremental searches
        </button>
        <button onClick={() => setSelectedMethod("Bisection")}>
          Bisection
        </button>
        <button onClick={() => setSelectedMethod("Falserule")}>
          False rule
        </button>
        <button onClick={() => setSelectedMethod("Newton")}>Newton</button>
        <button onClick={() => setSelectedMethod("FixedPoint")}>
          {" "}
          FixedPoint{" "}
        </button>
        <button onClick={() => setSelectedMethod("PartialLU")}>
          {" "}
          PartialLU{" "}
        </button>
        <button onClick={() => setSelectedMethod("LU")}>
          LU Decomposition
        </button>
        <button onClick={() => setSelectedMethod("Cholesky")}>
          Cholesky Decomposition
        </button>
        <button onClick={() => setSelectedMethod("Jacobi")}>
          Jacobi Method
        </button>
        <button onClick={() => setSelectedMethod("diferencias divididas")}>
          Newton's Divided Differences
        </button>
        <button onClick={() => setSelectedMethod("Simpson")}>
          Composite Simpson's 1/3 Rule
        </button>
      </div>
      <div>{renderMethod()}</div>
    </div>
  );
};

export default MainPage;

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import "./Home.css";

export function Home() {
  return (
    <>
      <Navbar />
      <h1 className="text">Equation Solvers</h1>
      <div className="card-container">
        <Card
          title="Bisection"
          description="Method to find roots by dividing an interval into two halves and selecting the one containing the sign change."
          img="assets/Bisección.jpg"
          route="/biseccion"
        />
        <Card
          title="False Position"
          description="Method similar to bisection but uses linear interpolation to better approximate the root."
          img="assets/Regla_Falsa.jpg"
          route="/Falserule"
        />
        <Card
          title="Fixed Point"
          description="Iterative method that reformulates the equation to find a point where \( g(x) = x \)."
          img="assets/Punto_Fijo.jpg"
          route="/FixedPoint"
        />
        <Card
          title="Multiple Roots"
          description="Extension of the Newton's method to handle cases with multiple or degenerate roots."
          img="assets/Raices_Multiples.jpg"
          route="/multiple-roots"
        />
        <Card
          title="Newton"
          description="Iterative method that uses the function's derivative to quickly converge to the root."
          img="assets/Newton.jpg"
          route="/Newton"
        />
        <Card
          title="Secant"
          description="Iterative method that uses secant approximations instead of derivatives to find the root."
          img="assets/Secante.jpg"
          route="/secant"
        />
        <Card
          title="Search"
          description="Method to locate the maximum or minimum of a function within a defined interval."
          img="assets/Busqueda.jpg"
          route="/Search"
        />
      </div>

      <h1 className="text">Linear Systems</h1>
      <div className="card-container">
        <Card
          title="Crout"
          description="Decomposition of a matrix into \( L \) and \( U \) factors to solve linear systems."
          img="assets/Crout.jpg"
          route="/Crout"
        />
        <Card
          title="Gauss Elimination"
          description="Gaussian elimination method to systematically reduce a matrix and solve linear systems."
          img="assets/Gauss_Elimination.jpg"
          route="/gauss"
        />
        <Card
          title="Gauss Partial Pivoting"
          description="Gaussian elimination with partial row reordering for greater stability."
          img="assets/Gaussiana_Pivoteo.jpg"
          route="/gaussian-partial-pivoting"
        />
        <Card
          title="Gauss Total Pivoting"
          description="Gaussian elimination with complete row and column reordering for maximum accuracy."
          img="assets/Gaussiana_Pivoteo_Total.jpg"
          route="/gaussian-total-pivoting"
        />
        <Card
          title="Partial LU"
          description="Matrix factorization into \( L \) and \( U \) using partial pivoting."
          img="assets/Lu_Pivoteo_Parcial.jpg"
          route="/LUpartial"
        />
        <Card
          title="Cholesky"
          description="Decomposition of a symmetric, positive-definite matrix."
          img="assets/Cholesky.jpg"
          route="/cholesky"
        />
        <Card
          title="LU Without Pivoting"
          description="Matrix factorization into  L and U without pivoting."
          img="assets/Lu_Sin_Pivoteo.jpg"
          route="/luwithoutpiv"
        />
        <Card
          title="Gauss-Seidel"
          description="Iterative method to solve linear systems by improving successive solutions."
          img="assets/Gauss_Seidel.jpg"
          route="/GSeidel"
        />
        <Card
          title="SOR"
          description="Extension of the Gauss-Seidel method with a relaxation factor to accelerate convergence."
          img="assets/Sor.jpg"
          route="/sor"
        />
        <Card
          title="Jacobi"
          description="Iterative method that updates solutions simultaneously at each iteration."
          img="assets/Jacobi.jpg"
          route="/Jacobi"
        />
        {/* Adding Doolittle Method Card */}
        <Card
          title="Doolittle"
          description="LU Decomposition method that factors a matrix into lower and upper triangular matrices."
          img="assets/Doolittle.jpg"
          route="/doolittle"
        />
      </div>

      <h1 className="text">Interpolation</h1>
      <div className="card-container">
        <Card
          title="Lagrange"
          description="Method to find the polynomial that passes exactly through a given set of points."
          img="assets/Lagrange.jpg"
          route="/Lagrange"
        />
        <Card
          title="Newton Divided Differences"
          description="Method to construct an interpolating polynomial using divided differences."
          img="assets/Dif_Divididas.jpg"
          route="/newtondivideddifference"
        />
        <Card
          title="Simpson"
          description="Numerical method to calculate integrals by approximating the function with quadratic polynomials."
          img="assets/Simpson.jpg"
          route="/Simpson"
        />
        {/* Adding TrazCub Method Card */}
        <Card
          title="TrazCub"
          description="Cubic spline interpolation method for smooth function fitting."
          img="assets/TrazCub.jpg"
          route="/TrazCub"
        />
        {/* Adding Vandermonde Method Card */}
        <Card
          title="Vandermonde"
          description="Method to solve linear systems using the Vandermonde matrix."
          img="assets/Vandermonde.jpg"
          route="/Vandermonde"
        />
      </div>

      <h1 className="text">Differential Equations</h1>
      <div className="card-container">
        <Card
          title="Euler"
          description="Simple step method to approximate solutions of ordinary differential equations."
          img="assets/Euler.jpg"
          route="/Euler"
        />
        {/* Adding TrapecioCompuesto Method Card */}
        <Card
          title="Compound Trapezoid"
          description="Method for numerical integration using the trapezoidal rule on multiple intervals."
          img="assets/TrapecioCompuesto.jpg"
          route="/TrapecioCompuesto"
        />
      </div>
    </>
  );
}

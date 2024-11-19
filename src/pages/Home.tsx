import Navbar from "../components/Navbar";
import Card from "../components/Card";
import "./Home.css";

export function Home() {
  return (
    <>
      <Navbar />
      <h1 className="text">Solución de Ecuaciones</h1>
      <div className="card-container">
        <Card
          title="Bisección"
          description="Método para encontrar raíces dividiendo un intervalo en dos mitades y seleccionando la que contiene el cambio de signo."
          img="assets/Bisección.jpg"
          route="/biseccion"
        />
        <Card
          title="Regla Falsa"
          description="Método similar a la bisección pero usa una interpolación lineal para aproximar mejor la raíz."
          img="assets/Regla_Falsa.jpg"
        />
        <Card
          title="Punto Fijo"
          description="Método iterativo que reformula la ecuación para encontrar un punto donde \( g(x) = x \)."
          img="assets/Punto_Fijo.jpg"
        />
        <Card
          title="Raíces Múltiples"
          description="Extensión del método de Newton para manejar casos con raíces múltiples o degeneradas."
          img="assets/Raices_Multiples.jpg"
        />
        <Card
          title="Newton"
          description="Método iterativo que utiliza la derivada de la función para converger rápidamente a la raíz."
          img="assets/Newton.jpg"
        />
        <Card
          title="Secante"
          description="Método iterativo que utiliza aproximaciones secantes en lugar de derivadas para encontrar la raíz."
          img="assets/Secante.jpg"
          route="/secant"
        />
        <Card
          title="Búsqueda"
          description="Método para localizar el máximo o mínimo de una función en un intervalo definido."
          img="assets/Busqueda.jpg"
        />
      </div>

      <h1 className="text">Sistemas Lineales</h1>
      <div className="card-container">
        <Card
          title="Crout"
          description="Descomposición de una matriz en factores \( L \) y \( U \) para resolver sistemas lineales."
          img="assets/Crout.jpg"
        />
        <Card
          title="Gauss Pivoteo Parcial"
          description="Eliminación gaussiana con reordenamiento parcial de filas para mayor estabilidad."
          img="assets/Gaussiana_Pivoteo.jpg"
        />
        <Card
          title="Gauss Pivoteo Total"
          description="Eliminación gaussiana con reordenamiento completo de filas y columnas para máxima precisión."
          img="assets/Gaussiana_Pivoteo_Total.jpg"
        />
        <Card
          title="LU Parcial"
          description="Factorización de matrices en \( L \) y \( U \) utilizando pivoteo parcial."
          img="assets/Lu_Pivoteo_Parcial.jpg"
        />
        <Card
          title="Cholesky"
          description="Descomposición de una matriz simétrica y definida positiva en \( L \cdot L^T \)."
          img="assets/Cholesky.jpg"
        />
        <Card
          title="LU Sin Pivoteo"
          description="Factorización de matrices en \( L \) y \( U \) sin realizar pivoteo."
          img="assets/Lu_Sin_Pivoteo.jpg"
        />
        <Card
          title="Gauss-Seidel"
          description="Método iterativo para resolver sistemas lineales mejorando soluciones sucesivas."
          img="assets/Gauss_Seidel.jpg"
        />
        <Card
          title="SOR"
          description="Extensión del método de Gauss-Seidel con un factor de relajación para acelerar la convergencia."
          img="assets/Sor.jpg"
        />
        <Card
          title="Jacobi"
          description="Método iterativo que actualiza las soluciones simultáneamente en cada iteración."
          img="assets/Jacobi.jpg"
        />
      </div>

      <h1 className="text">Interpolación</h1>
      <div className="card-container">
        <Card
          title="Lagrange"
          description="Método para encontrar el polinomio que pasa exactamente por un conjunto de puntos dados."
          img="assets/Lagrange.jpg"
        />
        <Card
          title="Newton Diferencias Divididas"
          description="Método para construir un polinomio interpolante usando diferencias divididas."
          img="assets/Dif_Divididas.jpg"
        />
        <Card
          title="Simpson"
          description="Método numérico para calcular integrales aproximando la función con polinomios cuadráticos."
          img="assets/Simpson.jpg"
        />
      </div>

      <h1 className="text">Ecuaciones Diferenciales</h1>
      <div className="card-container">
        <Card
          title="Euler"
          description="Método de paso simple para aproximar soluciones de ecuaciones diferenciales ordinarias."
          img="assets/Euler.jpg"
        />
      </div>
    </>
  );
}

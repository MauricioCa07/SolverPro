import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "./Newton_Divided_Differences.css";

interface LagrangeResult {
  L: number[][]; // Coeficientes de los polinomios L_i(x)
  Coef: number[]; // Coeficientes del polinomio interpolante
}

export function LagrangeInterpolation_Main() {
  return (
    <>
      <Navbar />
      <Form />
    </>
  );
}

function Form() {
  const [numPoints, setNumPoints] = useState(3);
  const [points, setPoints] = useState<{ x: string | number; y: string | number }[]>([]);
  const [resultComponent, setResultComponent] = useState<JSX.Element | null>(null);

  React.useEffect(() => {
    initializePoints(numPoints);
  }, [numPoints]);

  function initializePoints(size: number) {
    const newPoints = Array.from({ length: size }, () => ({ x: "", y: "" }));
    setPoints(newPoints);
  }

  function handleNumPointsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) {
      setNumPoints(size);
    } else {
      alert("Please enter a number of points between 2 and 10.");
    }
  }

  function handlePointChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    coord: "x" | "y"
  ) {
    const value = e.target.value;
    const updatedPoints = [...points];
    updatedPoints[index] = {
      ...updatedPoints[index],
      [coord]: value,
    };
    setPoints(updatedPoints);
  }

  function convertAndValidatePoints(
    points: { x: string | number; y: string | number }[]
  ): { X: number[]; Y: number[] } | null {
    try {
      const convertedPoints = points.map((point) => ({
        x: typeof point.x === "string" ? parseFloat(point.x) : point.x,
        y: typeof point.y === "string" ? parseFloat(point.y) : point.y,
      }));
      if (convertedPoints.some((p) => isNaN(p.x) || isNaN(p.y))) {
        throw new Error("Invalid numbers in points.");
      }
      return {
        X: convertedPoints.map((p) => p.x),
        Y: convertedPoints.map((p) => p.y),
      };
    } catch (error) {
      return null;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const convertedPoints = convertAndValidatePoints(points);
    if (!convertedPoints) {
      alert("Please enter valid numbers for all points.");
      return;
    }

    try {
      const result = lagrangeInterpolation(convertedPoints.X, convertedPoints.Y);
      setResultComponent(<LagrangeResultComponent result={result} />);
    } catch (error: any) {
      setResultComponent(
        <div style={{ color: "red", marginTop: "20px" }}>
          Error: {error.message}
        </div>
      );
    }
  }

  return (
    <div className="container">
      <h1 className="text-Method">Lagrange Interpolation Method</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <label>
            Number of points:
            <input
              type="number"
              value={numPoints}
              onChange={handleNumPointsChange}
              min="2"
              max="10"
              style={{ marginLeft: "10px", width: "60px" }}
            />
          </label>
        </div>

        <div style={{ marginTop: "20px" }}>
          {points.map((point, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <label>
                X{index + 1}:
                <input
                  type="text"
                  value={point.x}
                  onChange={(e) => handlePointChange(e, index, "x")}
                  style={{ marginLeft: "5px", width: "80px" }}
                />
              </label>
              <label style={{ marginLeft: "20px" }}>
                Y{index + 1}:
                <input
                  type="text"
                  value={point.y}
                  onChange={(e) => handlePointChange(e, index, "y")}
                  style={{ marginLeft: "5px", width: "80px" }}
                />
              </label>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#2a9d8f", color: "#fff" }}>
            Compute
          </button>
        </div>
      </form>
      {resultComponent && (
        <div className="result-container" style={{ marginTop: "40px" }}>
          {resultComponent}
        </div>
      )}
    </div>
  );
}

function lagrangeInterpolation(X: number[], Y: number[]): LagrangeResult {
  const n = X.length;
  const L: number[][] = [];

  const polyval = (coefficients: number[], x: number): number =>
    coefficients.reduce(
      (acc, coef, i) => acc + coef * Math.pow(x, coefficients.length - 1 - i),
      0
    );

  const conv = (poly1: number[], poly2: number[]): number[] => {
    const result: number[] = Array(poly1.length + poly2.length - 1).fill(0);
    for (let i = 0; i < poly1.length; i++) {
      for (let j = 0; j < poly2.length; j++) {
        result[i + j] += poly1[i] * poly2[j];
      }
    }
    return result;
  };

  for (let i = 0; i < n; i++) {
    const aux0 = X.filter((_, j) => j !== i);
    let aux = [1, -aux0[0]];
    for (let j = 1; j < aux0.length; j++) {
      aux = conv(aux, [1, -aux0[j]]);
    }
    const normalizer = polyval(aux, X[i]);
    L.push(aux.map((coef) => coef / normalizer));
  }

  const Coef: number[] = L[0].map((_, col) =>
    L.reduce((acc, row, rowIndex) => acc + row[col] * Y[rowIndex], 0)
  );

  return { L, Coef };
}

function LagrangeResultComponent({ result }: { result: LagrangeResult }) {
  return (
    <div>
      <h2>Polynomials of Lagrange (L):</h2>
      {result.L.map((row, index) => (
        <div key={index}>
          L[{index + 1}]: {row.map((coef) => coef.toFixed(3)).join(", ")}
        </div>
      ))}
      <h2>Coefficients of the Interpolating Polynomial:</h2>
      <p>{result.Coef.map((coef) => coef.toFixed(3)).join(", ")}</p>
      <p>You can input these coefficients in a (numberofpoints)-1 grade polynomial and graph to prove the interpolation</p>
      <p>For example: 3 points, a grade 2 polynomial: 0.5x²-0.5x-2</p>
    </div>
  );
}

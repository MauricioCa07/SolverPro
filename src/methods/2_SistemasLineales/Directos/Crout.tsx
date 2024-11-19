import React, { useState } from "react";
import { TextField, Grid, Box, Button, Typography } from "@mui/material";
import { create, all } from "mathjs";
import Navbar from "../../../components/Navbar";

const math = create(all);
export function CroutMain() {
    return (
      <>
        <Navbar />
        <CroutDecomposition />
      </>
    );
  }

type MatrixType = number[][];
type VectorType = number[];

function forwardSubstitution(L: MatrixType, b: VectorType): VectorType {
  const n = b.length;
  const y: VectorType = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    y[i] = b[i];
    for (let j = 0; j < i; j++) {
      y[i] -= L[i][j] * y[j];
    }
    y[i] /= L[i][i];
  }
  return y;
}

function backwardSubstitution(U: MatrixType, y: VectorType): VectorType {
  const n = y.length;
  const x: VectorType = Array(n).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    x[i] = y[i];
    for (let j = i + 1; j < n; j++) {
      x[i] -= U[i][j] * x[j];
    }
    x[i] /= U[i][i];
  }
  return x;
}

function CroutDecomposition() {
  const [matrixSize, setMatrixSize] = useState(3);
  const [matrixA, setMatrixA] = useState<MatrixType>([]);
  const [vectorB, setVectorB] = useState<VectorType>([]);
  const [result, setResult] = useState<{
    x: VectorType;
    L: MatrixType;
    U: MatrixType;
  } | null>(null);

  const initializeMatrixAndVector = (size: number) => {
    setMatrixA(Array.from({ length: size }, () => Array(size).fill("")));
    setVectorB(Array(size).fill(""));
  };

  React.useEffect(() => {
    initializeMatrixAndVector(matrixSize);
  }, []);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (size > 1 && size <= 10) {
      setMatrixSize(size);
      initializeMatrixAndVector(size);
    } else {
      alert("Please enter a size between 2 and 10.");
    }
  };

  const handleMatrixInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const value = e.target.value;
    const updatedMatrix = [...matrixA];
    updatedMatrix[row][col] = value;
    setMatrixA(updatedMatrix);
  };

  const handleVectorInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const updatedVector = [...vectorB];
    updatedVector[index] = value;
    setVectorB(updatedVector);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const A = matrixA.map((row) => row.map((val) => parseFloat(val)));
    const b = vectorB.map((val) => parseFloat(val));

    if (A.some((row) => row.some((val) => isNaN(val)))) {
      alert("Please enter valid numbers for matrix A.");
      return;
    }
    if (b.some((val) => isNaN(val))) {
      alert("Please enter valid numbers for vector b.");
      return;
    }

    const { x, L, U } = factorize(A, b);
    setResult({ x, L, U });
  };

  const factorize = (A: MatrixType, b: VectorType) => {
    const n = A.length;
    const L: MatrixType = math.identity(n)._data as MatrixType;
    const U: MatrixType = math.identity(n)._data as MatrixType;
    const steps: { title: string; description: string }[] = [];
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = i; j < n; j++) {
        L[j][i] = A[j][i];
        for (let k = 0; k < i; k++) {
          L[j][i] -= L[j][k] * U[k][i];
        }
      }
      steps.push({
        title: `Step ${i + 1} (Updating L)`,
        description: `Matrix L after processing column ${i + 1}:\n${matrixToString(L)}`,
      });
  
      for (let j = i + 1; j < n; j++) {
        U[i][j] = A[i][j];
        for (let k = 0; k < i; k++) {
          U[i][j] -= L[i][k] * U[k][j];
        }
        U[i][j] /= L[i][i];
      }
      steps.push({
        title: `Step ${i + 1} (Updating U)`,
        description: `Matrix U after processing row ${i + 1}:\n${matrixToString(U)}`,
      });
    }
  
    L[n - 1][n - 1] = A[n - 1][n - 1];
    for (let k = 0; k < n - 1; k++) {
      L[n - 1][n - 1] -= L[n - 1][k] * U[k][n - 1];
    }
    steps.push({
      title: `Finalizing L`,
      description: `Final Matrix L:\n${matrixToString(L)}`,
    });
  
    const y = forwardSubstitution(L, b);
    steps.push({
      title: `Forward Substitution`,
      description: `Intermediate solution vector y:\n${vectorToString(y)}`,
    });
  
    const x = backwardSubstitution(U, y);
    steps.push({
      title: `Backward Substitution`,
      description: `Solution vector x:\n${vectorToString(x)}`,
    });
  
    return { x, L, U, steps };
  };
  
  function matrixToString(matrix: MatrixType) {
    return matrix
      .map((row) => row.map((val) => val.toFixed(6)).join("\t"))
      .join("\n");
  }
  
  function vectorToString(vector: VectorType) {
    return vector.map((val) => val.toFixed(6)).join("\n");
  }
  

  const resultComponent = result ? (
    <div>
      <Typography variant="h5">Solution Vector x:</Typography>
      <pre>{result.x.map((val) => val.toFixed(6)).join(", ")}</pre>
      <Typography variant="h5" mt={2}>
        Matrix L:
      </Typography>
      <pre>{JSON.stringify(result.L, null, 2)}</pre>
      <Typography variant="h5" mt={2}>
        Matrix U:
      </Typography>
      <pre>{JSON.stringify(result.U, null, 2)}</pre>
    </div>
  ) : null;

  return (
    <div className="container">
      <h1 className="text-Method">Crout Decomposition</h1>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            marginTop: "50px",
            marginBottom: "50px",
            textAlign: "center",
          }}
        >
          <TextField
            label="Matrix Size (n)"
            type="number"
            value={matrixSize}
            onChange={handleSizeChange}
            InputProps={{ inputProps: { min: 2, max: 10 } }}
            style={{ width: "500px" }}
          />
        </div>

        <Typography variant="h6" gutterBottom>
          Enter Matrix A:
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Grid container spacing={1} justifyContent="center">
            {matrixA.map((row, rowIndex) => (
              <Grid item key={rowIndex}>
                <Grid container direction="column" spacing={1}>
                  {row.map((value, colIndex) => (
                    <Grid item key={colIndex}>
                      <TextField
                        variant="outlined"
                        value={value}
                        onChange={(e) =>
                          handleMatrixInputChange(e, rowIndex, colIndex)
                        }
                        style={{ width: "80px" }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Enter Vector b:
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Grid container spacing={1} justifyContent="center">
            {vectorB.map((value, index) => (
              <Grid item key={index}>
                <TextField
                  variant="outlined"
                  value={value}
                  onChange={(e) => handleVectorInputChange(e, index)}
                  style={{ width: "80px" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <div
          className="item"
          style={{ textAlign: "center", marginTop: "30px" }}
        >
          <Button
            className="calculate-button"
            type="submit"
            variant="contained"
            disableElevation
            style={{ backgroundColor: "#2a9d8f", color: "#fff" }}
          >
            Calculate
          </Button>
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


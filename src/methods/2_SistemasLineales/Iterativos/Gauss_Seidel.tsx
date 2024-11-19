import React, { useState } from "react";
import { TextField, Grid, Box, Button, Typography, Paper } from "@mui/material";
import { create, all } from "mathjs";
import Navbar from "../../../components/Navbar";

const math = create(all);

type MatrixType = number[][];
type VectorType = number[];

interface GaussSeidelResult {
  x: VectorType;
  iterations: number;
  error: number;
}


export function GaussSeidelMain() {
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box flex={1} p={2}>
        <Typography variant="h4" gutterBottom>
          Gauss-Seidel Method
        </Typography>
        <Typography>
          Use this tool to solve a system of linear equations using the Gauss-Seidel iterative method. Input your matrix, vector, initial approximation, tolerance, and maximum iterations to compute the solution.
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ width: "35%", padding: "16px" }}>
        <GaussSeidelForm />
      </Paper>
    </Box>
  );
}

function GaussSeidelForm() {
  const [matrixSize, setMatrixSize] = useState(3);
  const [matrixA, setMatrixA] = useState<MatrixType>([]);
  const [vectorB, setVectorB] = useState<VectorType>([]);
  const [initialApprox, setInitialApprox] = useState<VectorType>([]);
  const [tolerance, setTolerance] = useState<number>(1e-6);
  const [maxIterations, setMaxIterations] = useState<number>(100);
  const [result, setResult] = useState<GaussSeidelResult | null>(null);

  const initializeInputs = (size: number) => {
    setMatrixA(Array.from({ length: size }, () => Array(size).fill("")));
    setVectorB(Array(size).fill(""));
    setInitialApprox(Array(size).fill(""));
  };

  React.useEffect(() => {
    initializeInputs(matrixSize);
  }, []);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (size > 1 && size <= 10) {
      setMatrixSize(size);
      initializeInputs(size);
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

  const handleInitialApproxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const updatedApprox = [...initialApprox];
    updatedApprox[index] = value;
    setInitialApprox(updatedApprox);
  };

  const handleToleranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTolerance(parseFloat(e.target.value));
  };

  const handleMaxIterationsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxIterations(parseInt(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const A = matrixA.map((row) => row.map((val) => parseFloat(val)));
    const b = vectorB.map((val) => parseFloat(val));
    const x0 = initialApprox.map((val) => parseFloat(val));

    if (A.some((row) => row.some((val) => isNaN(val)))) {
      alert("Please enter valid numbers for matrix A.");
      return;
    }
    if (b.some((val) => isNaN(val))) {
      alert("Please enter valid numbers for vector b.");
      return;
    }
    if (x0.some((val) => isNaN(val))) {
      alert("Please enter valid numbers for the initial approximation.");
      return;
    }

    const { x, iterations, error } = gaussSeidel(A, b, x0, tolerance, maxIterations);
    setResult({ x, iterations, error });
  };

  const gaussSeidel = (
    A: MatrixType,
    b: VectorType,
    x0: VectorType,
    tol: number,
    Nmax: number
  ): GaussSeidelResult => {
    const n = A.length;
    let xant: VectorType = [...x0];
    let xact: VectorType = Array(n).fill(0);
    let error = Infinity;
    let iterations = 0;

    const tril = (matrix: MatrixType): MatrixType =>
      matrix.map((row, i) =>
        row.map((val, j) => (i >= j ? val : 0))
      );

    const triu = (matrix: MatrixType): MatrixType =>
      matrix.map((row, i) =>
        row.map((val, j) => (i <= j ? val : 0))
      );

    const D = math.diag(math.diag(A)) as MatrixType;
    const L = math.subtract(math.multiply(-1, tril(A)), D) as MatrixType;
    const U = math.subtract(math.multiply(-1, triu(A)), D) as MatrixType;

    const DL_inv = math.inv(math.add(D, L)) as MatrixType;
    const T = math.multiply(DL_inv, U) as MatrixType;
    const C = math.multiply(DL_inv, b) as VectorType;

    while (error > tol && iterations < Nmax) {
      xact = math.add(math.multiply(T, xant), C) as VectorType;
      error = math.norm(math.subtract(xant, xact)) as number;
      xant = [...xact];
      iterations++;
    }

    return { x: xact, iterations, error };
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" align="center" gutterBottom>
        Inputs
      </Typography>
      <TextField
        label="Matrix Size (n)"
        type="number"
        value={matrixSize}
        onChange={handleSizeChange}
        fullWidth
        margin="dense"
      />
      <Typography variant="subtitle1">Matrix A:</Typography>
      <Grid container spacing={1}>
        {matrixA.map((row, i) =>
          row.map((val, j) => (
            <Grid item xs={3} key={`${i}-${j}`}>
              <TextField
                type="number"
                value={val}
                onChange={(e) => handleMatrixInputChange(e, i, j)}
                size="small"
              />
            </Grid>
          ))
        )}
      </Grid>
      <Typography variant="subtitle1" mt={2}>
        Vector b:
      </Typography>
      <Grid container spacing={1}>
        {vectorB.map((val, i) => (
          <Grid item xs={3} key={i}>
            <TextField
              type="number"
              value={val}
              onChange={(e) => handleVectorInputChange(e, i)}
              size="small"
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="subtitle1" mt={2}>
        Initial Approximation:
      </Typography>
      <Grid container spacing={1}>
        {initialApprox.map((val, i) => (
          <Grid item xs={3} key={i}>
            <TextField
              type="number"
              value={val}
              onChange={(e) => handleInitialApproxChange(e, i)}
              size="small"
            />
          </Grid>
        ))}
      </Grid>
      <TextField
        label="Tolerance"
        type="number"
        value={tolerance}
        onChange={handleToleranceChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Max Iterations"
        type="number"
        value={maxIterations}
        onChange={handleMaxIterationsChange}
        fullWidth
        margin="dense"
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Calculate
      </Button>
    </form>
  );
}

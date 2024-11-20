import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../../../components/Navbar";
import "./SOR.css";

type MatrixValue = string | number;

export function SOR_Main() {
  return (
    <>
      <Navbar />
      <Form />
    </>
  );
}

function Form() {
  const [matrixSize, setMatrixSize] = useState(3);
  const [matrixA, setMatrixA] = useState<MatrixValue[][]>([]);
  const [vectorB, setVectorB] = useState<MatrixValue[]>([]);
  const [initialGuess, setInitialGuess] = useState<MatrixValue[]>([]);
  const [tolerance, setTolerance] = useState("1e-7");
  const [maxIterations, setMaxIterations] = useState("100");
  const [resultComponent, setResultComponent] = useState<JSX.Element | null>(
    null
  );

  useEffect(() => {
    initializeMatrices(matrixSize);
  }, [matrixSize]);

  function initializeMatrices(size: number) {
    const newMatrixA = Array.from({ length: size }, () => Array(size).fill(""));
    const newVectorB = Array(size).fill("");
    const newInitialGuess = Array(size).fill("");
    setMatrixA(newMatrixA);
    setVectorB(newVectorB);
    setInitialGuess(newInitialGues);
  }

  function handleSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) {
      setMatrixSize(size);
    } else {
      alert("Please enter a size between 2 and 10.");
    }
  }

  function handleMatrixInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) {
    const value = e.target.value;
    const updatedMatrix = [...matrixA];
    updatedMatrix[row][col] = value;
    setMatrixA(updatedMatrix);
  }

  function handleVectorInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const value = e.target.value;
    const updatedVector = [...vectorB];
    updatedVector[index] = value;
    setVectorB(updatedVector);
  }

  function handleInitialGuessChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const value = e.target.value;
    const updatedGuess = [...initialGuess];
    updatedGuess[index] = value;
    setInitialGuess(updatedGuess);
  }

  function handleToleranceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTolerance(e.target.value);
  }

  function handleMaxIterationsChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxIterations(e.target.value);
  }

  function convertAndValidateMatrix(
    matrix: MatrixValue[][]
  ): number[][] | null {
    try {
      return matrix.map((row) =>
        row.map((val) => {
          const num = typeof val === "string" ? parseFloat(val) : val;
          if (isNaN(num)) throw new Error("Invalid number in matrix");
          return num;
        })
      );
    } catch (error) {
      return null;
    }
  }

  function convertAndValidateVector(vector: MatrixValue[]): number[] | null {
    try {
      return vector.map((val) => {
        const num = typeof val === "string" ? parseFloat(val) : val;
        if (isNaN(num)) throw new Error("Invalid number in vector");
        return num;
      });
    } catch (error) {
      return null;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const convertedA = convertAndValidateMatrix(matrixA);
    if (!convertedA) {
      alert("Please enter valid numbers for matrix A");
      return;
    }

    const convertedB = convertAndValidateVector(vectorB);
    if (!convertedB) {
      alert("Please enter valid numbers for vector B");
      return;
    }

    const convertedGuess = convertAndValidateVector(initialGuess);
    if (!convertedGuess) {
      alert("Please enter valid numbers for initial guess");
      return;
    }

    const parsedTolerance = parseFloat(tolerance);
    const parsedMaxIterations = parseInt(maxIterations);
    const parsedOmega = 1.0;

    if (isNaN(parsedTolerance) || parsedTolerance <= 0) {
      alert("Please enter a valid positive number for tolerance.");
      return;
    }
    if (isNaN(parsedMaxIterations) || parsedMaxIterations <= 0) {
      alert("Please enter a valid positive integer for maximum iterations.");
      return;
    }

    try {
      const result = sorMethod(
        convertedA,
        convertedB,
        convertedGuess,
        parsedTolerance,
        parsedMaxIterations,
        parsedOmega
      );
      setResultComponent(<LinearResult result={result} />);
    } catch (error: any) {
      setResultComponent(
        <Alert severity="error" style={{ marginTop: "20px" }}>
          {error.message}
        </Alert>
      );
    }
  }

  return (
    <div className="container">
      <h1 className="text-Method">SOR Method</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <TextField
            label="Matrix size (n)"
            type="number"
            value={matrixSize}
            onChange={handleSizeChange}
            InputProps={{ inputProps: { min: 2, max: 10 } }}
            style={{ width: "300px" }}
          />
        </div>

        {/* Matrix A Input */}
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Enter Matrix A:
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
          >
            {matrixA.map((row, rowIndex) => (
              <Grid item key={rowIndex}>
                <Grid container spacing={1} direction="row">
                  {row.map((value, colIndex) => (
                    <Grid item key={colIndex}>
                      <TextField
                        type="text"
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

        {/* Vector b Input */}
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Enter Vector b:
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Grid container spacing={1} direction="column" alignItems="center">
            {vectorB.map((value, index) => (
              <Grid item key={index}>
                <TextField
                  type="text"
                  variant="outlined"
                  value={value}
                  onChange={(e) => handleVectorInputChange(e, index)}
                  style={{ width: "80px" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Initial Guess Input */}
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Enter Initial Guess x₀:
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Grid container spacing={1} direction="column" alignItems="center">
            {initialGuess.map((value, index) => (
              <Grid item key={index}>
                <TextField
                  type="text"
                  variant="outlined"
                  value={value}
                  onChange={(e) => handleInitialGuessChange(e, index)}
                  style={{ width: "80px" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tolerance and Max Iterations */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <TextField
            label="Tolerance"
            type="text"
            value={tolerance}
            onChange={handleToleranceChange}
            style={{ width: "140px", marginRight: "20px" }}
          />
          <TextField
            label="Max Iterations"
            type="text"
            value={maxIterations}
            onChange={handleMaxIterationsChange}
            style={{ width: "140px" }}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Button
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

function LinearResult({ result }: { result: any }) {
  if (result.error) {
    return (
      <Alert severity="error" style={{ marginTop: "20px" }}>
        {result.error}
      </Alert>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Solution Vector x:
      </Typography>
      <ul>
        {result.solution.map((value: number, index: number) => (
          <li key={index}>
            <Typography variant="body1">
              x<sub>{index + 1}</sub> = {value.toFixed(6)}
            </Typography>
          </li>
        ))}
      </ul>

      <Typography variant="h4" gutterBottom style={{ marginTop: "30px" }}>
        Iterations:
      </Typography>

      {result.iterations.map((iteration: any, index: number) => (
        <Accordion key={index} style={{ backgroundColor: "#f1f1f1" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">Iteration {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{iteration}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

function sorMethod(
  A: number[][],
  b: number[],
  x0: number[],
  tol: number,
  maxIter: number,
  omega: number
) {
  const n = A.length;
  let x = x0.slice();
  let xOld = x0.slice();
  const iterations = [];
  let k = 0;

  while (k < maxIter) {
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          sum += A[i][j] * x[j];
        }
      }
      if (A[i][i] === 0) {
        throw new Error(`Zero on diagonal at row ${i + 1}. Cannot proceed.`);
      }
      x[i] = (1 - omega) * xOld[i] + (omega * (b[i] - sum)) / A[i][i];
    }

    const error = Math.sqrt(
      x.reduce((acc, xi, idx) => acc + Math.pow(xi - xOld[idx], 2), 0)
    );

    iterations.push(
      `x(${k + 1}) = [${x
        .map((xi) => xi.toFixed(6))
        .join(", ")}], Error = ${error.toExponential(6)}`
    );

    if (error < tol) {
      break;
    }

    xOld = x.slice();
    k++;
  }

  if (k === maxIter) {
    throw new Error(
      "Maximum number of iterations reached without convergence."
    );
  }

  return { solution: x, iterations };
}

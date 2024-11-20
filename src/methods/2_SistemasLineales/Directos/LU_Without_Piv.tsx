import React, { useState, useEffect } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
  Box,
  Button,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../../../components/Navbar";
import "./LU_Without_Piv.css";

export function LU_Without_Piv() {
  return (
    <>
      <Navbar />
      <Form />
    </>
  );
}

function Form() {
  const [matrixSize, setMatrixSize] = useState(3);
  const [matrixA, setMatrixA] = useState([]);
  const [vectorB, setVectorB] = useState([]);
  const [resultComponent, setResultComponent] = useState(null);

  useEffect(() => {
    initializeMatrixAndVector(matrixSize);
  }, [matrixSize]);

  function initializeMatrixAndVector(size) {
    const newMatrixA = Array.from({ length: size }, () => Array(size).fill(""));
    const newVectorB = Array(size).fill("");
    setMatrixA(newMatrixA);
    setVectorB(newVectorB);
  }

  function handleSizeChange(e) {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) {
      setMatrixSize(size);
      initializeMatrixAndVector(size);
    } else {
      alert("Please enter a size between 2 and 10.");
    }
  }

  function handleMatrixInputChange(e, row, col) {
    const value = e.target.value;
    const updatedMatrix = [...matrixA];
    updatedMatrix[row][col] = value;
    setMatrixA(updatedMatrix);
  }

  function handleVectorInputChange(e, index) {
    const value = e.target.value;
    const updatedVector = [...vectorB];
    updatedVector[index] = value;
    setVectorB(updatedVector);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Convert inputs to numbers and validate
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

    try {
      const result = luDecomposition(A, b);
      setResultComponent(<LUMethod result={result} />);
    } catch (error) {
      setResultComponent(
        <Alert severity="error" style={{ marginTop: "20px" }}>
          {error.message}
        </Alert>
      );
    }
  }

  return (
    <div className="container">
      <h1 className="text-Method">LU Decomposition without Pivoting</h1>
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
                  variant="outlined"
                  value={value}
                  onChange={(e) => handleVectorInputChange(e, index)}
                  style={{ width: "80px" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

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

function LUMethod({ result }) {
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
        {result.x.map((value, index) => (
          <li key={index}>
            <Typography variant="body1">
              x<sub>{index + 1}</sub> = {value.toFixed(6)}
            </Typography>
          </li>
        ))}
      </ul>

      <Typography variant="h4" gutterBottom style={{ marginTop: "30px" }}>
        Steps:
      </Typography>

      {result.steps.map((step, index) => (
        <Accordion key={index} style={{ backgroundColor: "#f1f1f1" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{step.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <pre style={{ whiteSpace: "pre-wrap" }}>{step.description}</pre>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

// Implementation of LU Decomposition without Pivoting
function luDecomposition(A_input, b_input) {
  const n = A_input.length;
  const steps = [];

  // Initialize L and U matrices
  let L = Array.from({ length: n }, () => Array(n).fill(0));
  let U = Array.from({ length: n }, () => Array(n).fill(0));

  // Deep copy of A and b to avoid mutating the originals
  let A = A_input.map((row) => row.slice());
  let b = b_input.slice();

  // LU Decomposition without pivoting
  for (let i = 0; i < n; i++) {
    // Upper Triangular Matrix U
    for (let k = i; k < n; k++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[i][j] * U[j][k];
      }
      U[i][k] = A[i][k] - sum;
    }

    // Lower Triangular Matrix L
    for (let k = i; k < n; k++) {
      if (i === k) {
        L[i][i] = 1; // Diagonal as 1
      } else {
        let sum = 0;
        for (let j = 0; j < i; j++) {
          sum += L[k][j] * U[j][i];
        }
        if (U[i][i] === 0) {
          throw new Error(
            `Zero pivot encountered at position (${i + 1}, ${i + 1}).`
          );
        }
        L[k][i] = (A[k][i] - sum) / U[i][i];
      }
    }

    // Record the state of L and U matrices
    steps.push({
      title: `Decomposition Step ${i + 1}`,
      description: `After step ${
        i + 1
      }, matrices L and U are:\n\nL =\n${matrixToString(
        L
      )}\n\nU =\n${matrixToString(U)}\n`,
    });
  }

  // Forward substitution Ly = b
  let y = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < i; j++) {
      sum += L[i][j] * y[j];
    }
    y[i] = b[i] - sum;

    // Record the forward substitution step
    steps.push({
      title: `Forward Substitution Step ${i + 1}`,
      description: `Calculating y[${i + 1}] = ${y[i].toFixed(6)}\n`,
    });
  }

  // Back substitution Ux = y
  let x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += U[i][j] * x[j];
    }
    if (U[i][i] === 0) {
      throw new Error(
        `Zero pivot encountered at position (${i + 1}, ${i + 1}).`
      );
    }
    x[i] = (y[i] - sum) / U[i][i];

    // Record the back substitution step
    steps.push({
      title: `Back Substitution Step ${n - i}`,
      description: `Calculating x[${i + 1}] = ${x[i].toFixed(6)}\n`,
    });
  }

  return { x, steps };
}

// Helper function to display a matrix
function matrixToString(matrix) {
  return matrix
    .map((row) => row.map((val) => val.toFixed(6)).join("\t"))
    .join("\n");
}

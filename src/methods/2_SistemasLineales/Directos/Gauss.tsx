import { useState, useEffect } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../../../components/Navbar";

export function Gauss_Main() {
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

  // Initialize the matrix and vector when the component mounts
  useEffect(() => {
    initializeMatrixAndVector(matrixSize);
  }, []);

  // Initialize the matrix and vector when the size changes
  function initializeMatrixAndVector(size) {
    const newMatrixA = Array.from({ length: size }, () => Array(size).fill(""));
    const newVectorB = Array(size).fill("");
    setMatrixA(newMatrixA);
    setVectorB(newVectorB);
  }

  // Handle size change
  function handleSizeChange(e) {
    const size = parseInt(e.target.value);
    if (size > 1 && size <= 10) {
      setMatrixSize(size);
      initializeMatrixAndVector(size);
    } else {
      alert("Please enter a size between 2 and 10.");
    }
  }

  // Handle matrix input change
  function handleMatrixInputChange(e, row, col) {
    const value = e.target.value;
    const updatedMatrix = [...matrixA];
    updatedMatrix[row][col] = value;
    setMatrixA(updatedMatrix);
  }

  // Handle vector input change
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

    const result = gaussElimination(A, b);
    setResultComponent(<Gauss_Method result={result} />);
  }

  // Aquí está el retorno del componente Form
  return (
    <div className="container">
      <h1 className="text-Method">Gaussian Elimination</h1>
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

        {/* Matrix A Input */}
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

        {/* Vector b Input */}
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

function Gauss_Method({ result }) {
  if (result.error) {
    return (
      <Typography variant="h6" color="error">
        {result.error}
      </Typography>
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
        <Accordion key={index} style={{ backgroundColor: "#e9ecef" }}>
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

// Implementation of the Gaussian Elimination method with step recording
function gaussElimination(A, b) {
  const n = A.length;
  const steps = [];

  // Clone A and b to avoid mutating the original arrays
  A = A.map((row) => row.slice());
  b = b.slice();

  // Forward Elimination
  for (let k = 0; k < n - 1; k++) {
    steps.push({
      title: `Forward Elimination Step ${k + 1}`,
      description: `Pivot Element: A[${k}][${k}] = ${A[k][k]}\n`,
    });

    // Partial Pivoting
    let maxIndex = k;
    let maxValue = Math.abs(A[k][k]);
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(A[i][k]) > maxValue) {
        maxValue = Math.abs(A[i][k]);
        maxIndex = i;
      }
    }

    // Swap rows if needed
    if (maxIndex !== k) {
      [A[k], A[maxIndex]] = [A[maxIndex], A[k]];
      [b[k], b[maxIndex]] = [b[maxIndex], b[k]];
      steps[
        steps.length - 1
      ].description += `Swapped rows ${k} and ${maxIndex}\n`;
    }

    // Check for zero pivot
    if (Math.abs(A[k][k]) < 1e-12) {
      return { error: "Matrix is singular or nearly singular.", steps };
    }

    // Elimination process
    for (let i = k + 1; i < n; i++) {
      const m = A[i][k] / A[k][k];
      for (let j = k; j < n; j++) {
        A[i][j] -= m * A[k][j];
      }
      b[i] -= m * b[k];
      steps[
        steps.length - 1
      ].description += `Eliminated A[${i}][${k}], multiplier m = ${m.toFixed(
        6
      )}\n`;
    }

    // Record the state of matrix A and vector b
    steps[steps.length - 1].description += `Matrix A after step ${
      k + 1
    }:\n${matrixToString(A)}\n`;
    steps[steps.length - 1].description += `Vector b after step ${
      k + 1
    }:\n${vectorToString(b)}\n`;
  }

  // Back Substitution
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(A[i][i]) < 1e-12) {
      if (Math.abs(b[i]) < 1e-12) {
        return { error: "Infinitely many solutions exist.", steps };
      } else {
        return { error: "No solution exists (inconsistent system).", steps };
      }
    }
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += A[i][j] * x[j];
    }
    x[i] = (b[i] - sum) / A[i][i];

    // Record the back substitution step
    steps.push({
      title: `Back Substitution Step ${n - i}`,
      description: `Calculated x[${i}] = ${x[i].toFixed(6)}\n`,
    });
  }

  return { x, steps };
}

// Helper functions to convert matrix and vector to string for display
function matrixToString(matrix) {
  return matrix
    .map((row) => row.map((val) => val.toFixed(6)).join("\t"))
    .join("\n");
}

function vectorToString(vector) {
  return vector.map((val) => val.toFixed(6)).join("\n");
}

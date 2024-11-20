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
    setResultComponent(<GaussMethod result={result} />);
  }

  return (
    <div className="container">
      <h1 className="text-Method">Simple Gaussian Elimination</h1>
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

function GaussMethod({ result }) {
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

function gaussElimination(A_input, b_input) {
  const n = A_input.length;
  const steps = [];

  let A = A_input.map((row) => row.slice());
  let b = b_input.slice();

  let M = A.map((row, i) => [...row, b[i]]);

  for (let k = 0; k < n - 1; k++) {
    if (Math.abs(M[k][k]) < 1e-12) {
      return {
        error: `Zero element on diagonal at row ${k + 1}.`,
        steps,
      };
    }

    steps.push({
      title: `Elimination Step ${k + 1}`,
      description: `Pivot: A[${k + 1}][${k + 1}] = ${M[k][k].toFixed(6)}\n`,
    });

    for (let i = k + 1; i < n; i++) {
      const factor = M[i][k] / M[k][k];
      steps[steps.length - 1].description += `\nEliminating A[${i + 1}][${
        k + 1
      }], Multiplier = ${factor.toFixed(6)}\n`;

      for (let j = k; j < n + 1; j++) {
        M[i][j] -= factor * M[k][j];
      }
    }

    steps[steps.length - 1].description += `\nAugmented Matrix after Step ${
      k + 1
    }:\n${augmentedMatrixToString(M)}\n`;
  }

  let determinant = 1;
  for (let i = 0; i < n; i++) {
    determinant *= M[i][i];
  }
  if (Math.abs(determinant) < 1e-12) {
    return {
      error:
        "The determinant of the matrix is zero. The system does not have a unique solution.",
      steps,
    };
  }

  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += M[i][j] * x[j];
    }
    x[i] = (M[i][n] - sum) / M[i][i];

    steps.push({
      title: `Back Substitution Step ${n - i}`,
      description: `Calculating x[${i + 1}] = ${x[i].toFixed(6)}\n`,
    });
  }

  return { x, steps };
}

function augmentedMatrixToString(matrix) {
  return matrix
    .map((row) =>
      row
        .map((val, idx) =>
          idx === row.length - 1 ? `| ${val.toFixed(6)}` : val.toFixed(6)
        )
        .join("\t")
    )
    .join("\n");
}

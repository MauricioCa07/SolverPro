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
import { create, all } from "mathjs";
import Plot from "react-plotly.js";

const math = create(all);

export function GaussianPartialPivoting_Main() {
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
  const [error, setError] = useState(null);

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

    const result = gaussianPartialPivoting(A, b);
    if (result.error) {
      setError(result.error);
      setResultComponent(null);
    } else {
      setError(null);
      setResultComponent(<GaussMethod result={result} />);
    }
  }

  return (
    <div className="container">
      <h1 className="text-Method">
        Gaussian Elimination with Partial Pivoting
      </h1>
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
      {error && (
        <Alert severity="error" style={{ marginTop: "20px" }}>
          {error}
        </Alert>
      )}
      {resultComponent && (
        <div className="result-container" style={{ marginTop: "40px" }}>
          {resultComponent}
        </div>
      )}
    </div>
  );
}

function GaussMethod({ result }) {
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

      <Typography variant="h4" gutterBottom style={{ marginTop: "30px" }}>
        Variable Plot:
      </Typography>
      <Plot
        data={[
          {
            x: result.x.map((_, index) => `x${index + 1}`),
            y: result.x,
            type: "bar",
            name: "Variable Values",
            marker: { color: "blue" },
          },
        ]}
        layout={{
          title: "Resulting Variable Values",
          xaxis: { title: "Variables" },
          yaxis: { title: "Value" },
        }}
      />
    </div>
  );
}

function gaussianPartialPivoting(A, b) {
  const n = A.length;
  const steps = [];
  let augmentedMatrix = A.map((row, i) => [...row, b[i]]);

  for (let k = 0; k < n - 1; k++) {
    let maxIndex = k;
    for (let i = k + 1; i < n; i++) {
      if (
        Math.abs(augmentedMatrix[i][k]) > Math.abs(augmentedMatrix[maxIndex][k])
      ) {
        maxIndex = i;
      }
    }

    if (maxIndex !== k) {
      [augmentedMatrix[k], augmentedMatrix[maxIndex]] = [
        augmentedMatrix[maxIndex],
        augmentedMatrix[k],
      ];
    }

    if (Math.abs(augmentedMatrix[k][k]) < 1e-12) {
      return { error: `Zero element on diagonal at row ${k + 1}.`, steps };
    }

    for (let i = k + 1; i < n; i++) {
      const factor = augmentedMatrix[i][k] / augmentedMatrix[k][k];
      for (let j = k; j <= n; j++) {
        augmentedMatrix[i][j] -= factor * augmentedMatrix[k][j];
      }
    }

    steps.push({
      title: `Elimination Step ${k + 1}`,
      description: `Augmented Matrix after Step ${k + 1}:
${augmentedMatrixToString(augmentedMatrix)}`,
    });
  }

  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += augmentedMatrix[i][j] * x[j];
    }
    x[i] = (augmentedMatrix[i][n] - sum) / augmentedMatrix[i][i];
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

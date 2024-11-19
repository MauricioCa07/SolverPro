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

export function LUpartialMain() {
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
  }, []);

  function initializeMatrixAndVector(size) {
    const newMatrixA = Array.from({ length: size }, () => Array(size).fill(""));
    const newVectorB = Array(size).fill("");
    setMatrixA(newMatrixA);
    setVectorB(newVectorB);
  }

  function handleSizeChange(e) {
    const size = parseInt(e.target.value);
    if (size > 1 && size <= 10) {
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

    const result = luDecomposition(A, b);
    setResultComponent(<LU_Method result={result} />);
  }

  return (
    <div className="container">
    <h1 className="text-Method">LU Decomposition</h1>
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

function LU_Method({ result }) {
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

function luDecomposition(A, b) {
  const n = A.length;
  const steps = [];

  let L = Array.from({ length: n }, () => Array(n).fill(0));
  let U = A.map((row) => row.slice());
  let P = Array.from({ length: n }, (_, i) => i);

  for (let k = 0; k < n; k++) {
    let pivot = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(U[i][k]) > Math.abs(U[pivot][k])) {
        pivot = i;
      }
    }
    if (pivot !== k) {
      [U[k], U[pivot]] = [U[pivot], U[k]];
      [P[k], P[pivot]] = [P[pivot], P[k]];
      steps.push({
        title: `Pivot Step ${k + 1}`,
        description: `Swapped rows ${k} and ${pivot}.`,
      });
    }

    for (let i = k + 1; i < n; i++) {
      const m = U[i][k] / U[k][k];
      L[i][k] = m;
      for (let j = k; j < n; j++) {
        U[i][j] -= m * U[k][j];
      }
    }
    steps.push({
      title: `LU Decomposition Step ${k + 1}`,
      description: `Matrix U:\n${matrixToString(U)}\nMatrix L:\n${matrixToString( L)}`,
    });
  }

   // Ahora resolvemos el sistema Ly = b (sustitución progresiva)
   const y = Array(n).fill(0);
   for (let i = 0; i < n; i++) {
     y[i] = b[P[i]] - L[i].slice(0, i).reduce((sum, value, index) => sum + value * y[index], 0);
   }
 
   // Luego resolvemos el sistema Ux = y (sustitución regresiva)
   const x = Array(n).fill(0);
   for (let i = n - 1; i >= 0; i--) {
     x[i] = (y[i] - U[i].slice(i + 1).reduce((sum, value, index) => sum + value * x[i + 1 + index], 0)) / U[i][i];
   }
   
  return { x, steps };
}

function matrixToString(matrix) {
    return matrix
      .map((row) => row.map((val) => val.toFixed(6)).join("\t"))
      .join("\n");
  }
  
  function vectorToString(vector) {
    return vector.map((val) => val.toFixed(6)).join("\n");
  }
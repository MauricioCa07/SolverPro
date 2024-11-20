import React, { useState } from "react";
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
import Navbar from "../../components/Navbar";
import "./Newton_Divided_Differences.css";

type PointValue = {
  x: string | number;
  y: string | number;
};

export function Newton_Divided_Difference_Main() {
  return (
    <>
      <Navbar />
      <Form />
    </>
  );
}

function Form() {
  const [numPoints, setNumPoints] = useState(3);
  const [points, setPoints] = useState<PointValue[]>([]);
  const [resultComponent, setResultComponent] = useState<JSX.Element | null>(
    null
  );

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
    points: PointValue[]
  ): { x: number; y: number }[] | null {
    try {
      return points
        .map((point) => ({
          x: typeof point.x === "string" ? parseFloat(point.x) : point.x,
          y: typeof point.y === "string" ? parseFloat(point.y) : point.y,
        }))
        .map((point) => {
          if (isNaN(point.x) || isNaN(point.y)) {
            throw new Error("Invalid number in points");
          }
          return point;
        });
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
      const result = newtonDividedDifferences(convertedPoints);
      setResultComponent(<NewtonResult result={result} />);
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
      <h1 className="text-Method">Newton's Divided Differences Method</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <TextField
            label="Number of points"
            type="number"
            value={numPoints}
            onChange={handleNumPointsChange}
            InputProps={{ inputProps: { min: 2, max: 10 } }}
            style={{ width: "300px" }}
          />
        </div>

        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Enter Points (x<sub>i</sub>, y<sub>i</sub>):
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
          >
            {points.map((point, index) => (
              <Grid item key={index}>
                <Grid container spacing={1} direction="row" alignItems="center">
                  <Grid item>
                    <Typography variant="body1">Point {index + 1}:</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      label={`x${index + 1}`}
                      type="text"
                      variant="outlined"
                      value={point.x}
                      onChange={(e) => handlePointChange(e, index, "x")}
                      style={{ width: "80px" }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label={`y${index + 1}`}
                      type="text"
                      variant="outlined"
                      value={point.y}
                      onChange={(e) => handlePointChange(e, index, "y")}
                      style={{ width: "80px" }}
                    />
                  </Grid>
                </Grid>
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

function NewtonResult({ result }: { result: any }) {
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
        Interpolating Polynomial:
      </Typography>
      <Typography variant="body1">{result.polynomial}</Typography>

      <Typography variant="h4" gutterBottom style={{ marginTop: "30px" }}>
        Divided Difference Table:
      </Typography>
      <pre>{result.table}</pre>
    </div>
  );
}

function newtonDividedDifferences(points: { x: number; y: number }[]) {
  const n = points.length;
  const x = points.map((p) => p.x);
  const y = points.map((p) => p.y);
  const coef = y.slice();
  const dividedDifferences = [coef.slice()];

  for (let j = 1; j < n; j++) {
    for (let i = n - 1; i >= j; i--) {
      if (x[i] - x[i - j] === 0) {
        throw new Error("Divide by zero encountered in divided differences.");
      }
      coef[i] = (coef[i] - coef[i - 1]) / (x[i] - x[i - j]);
    }
    dividedDifferences.push(coef.slice());
  }

  let polynomial = `P(x) = ${coef[0].toFixed(6)}`;
  for (let i = 1; i < n; i++) {
    let term = coef[i] >= 0 ? " + " : " - ";
    term += `${Math.abs(coef[i]).toFixed(6)}`;
    for (let j = 0; j < i; j++) {
      const xValue = x[j];
      term +=
        xValue >= 0
          ? `(x - ${parseInt(xValue.toFixed(6))})`
          : `(x + ${parseInt(Math.abs(xValue).toFixed(6))})`;
    }
    polynomial += term;
  }

  let table = "i\t";
  for (let i = 0; i < n; i++) {
    table += `f[${i}]\t`;
  }
  table += "\n";
  for (let i = 0; i < n; i++) {
    table += `${i}\t`;
    for (let j = 0; j <= i; j++) {
      table += `${dividedDifferences[j][i].toFixed(6)}\t`;
    }
    table += "\n";
  }

  return { polynomial, table };
}

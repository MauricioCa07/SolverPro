import Navbar from "../components/Navbar";
import "./Tutorials.css"; // Import your custom CSS for styling

export function Tutorials() {
  return (
    <>
      <Navbar />
      <div className="tutorial-container">
        <h1 className="tutorial-title">SolverPro User Manual</h1>
        <div className="tutorial-content">
          <h2>Getting Started</h2>
          <p>
            SolverPro is a powerful tool for performing numerical computations
            through various well-known numerical methods. This manual explains
            how to use the application, ensuring you provide valid inputs and
            interpret the results correctly.
          </p>

          <h2>General Usage Instructions</h2>
          <h3>Input Guidelines</h3>
          <ul>
            <li>
              <strong>Functions:</strong> Use mathematical notation (e.g.,{" "}
              <code>x^2</code> for <em>x²</em>, <code>2*x</code> for 2x).
            </li>
            <li>
              <strong>Supported Operations:</strong> +, -, *, /, ^ (e.g.,
              sin(x), log(x)).
            </li>
            <li>
              <strong>Numerical Inputs:</strong> Enter decimals as usual (e.g.,
              2.5 or 1e-7 for scientific notation).
            </li>
          </ul>

          <h3>Steps to Use</h3>
          <ol>
            <li>Select a numerical method from the menu.</li>
            <li>Enter the required inputs in the designated fields.</li>
            <li>Click the <strong>Calculate</strong> button to see results.</li>
            <li>
              Review the results as iteration tables or graphical
              visualizations.
            </li>
          </ol>

          <h2>Outputs</h2>
          <p>
            Outputs include:
            <ul>
              <li>Detailed iteration tables summarizing intermediate results.</li>
              <li>Graphs for visualizing the function or solution.</li>
            </ul>
          </p>

          <h2>Common Errors</h2>
          <p>
            If you encounter errors, check your inputs:
            <ul>
              <li>
                <strong>"Invalid Input":</strong> Ensure all fields are filled
                correctly.
              </li>
              <li>
                <strong>"Function Not Defined":</strong> Ensure the syntax is
                correct.
              </li>
              <li>
                <strong>"No Root Found":</strong> Reassess ranges or parameters.
              </li>
            </ul>
          </p>

          <h2>Tips for Effective Use</h2>
          <p>
            Start with simple functions to understand SolverPro's behavior.
            Leverage visualizations for insight into solutions.
          </p>
        </div>
      </div>
    </>
  );
}

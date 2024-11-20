import Navbar from "../components/Navbar";
import "./Tutorials.css"; // Import your custom CSS for styling

export function Tutorials() {
  return (
    <>
      <Navbar />
      <div className="tutorial-container">
        <h1 className="tutorial-title">SolverPro User Manual</h1>
        <div className="tutorial-content">
          {/* Getting Started Section */}
          <section className="tutorial-section">
            <h2>Getting Started</h2>
            <p>
              SolverPro is a powerful tool for performing numerical computations
              through various well-known numerical methods. This manual explains
              how to use the application, ensuring you provide valid inputs and
              interpret the results correctly.
            </p>
          </section>

          {/* Supported Functions Section */}
          <section className="tutorial-section">
            <h2>Supported Functions</h2>

            <h3>Arithmetic Operations</h3>
            <table className="tutorial-table">
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Syntax (math.js)</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Addition</td>
                  <td>`+`</td>
                  <td>`x + 2`</td>
                </tr>
                <tr>
                  <td>Subtraction</td>
                  <td>`-`</td>
                  <td>`x - 2`</td>
                </tr>
                <tr>
                  <td>Multiplication</td>
                  <td>`*`</td>
                  <td>`x * 3`</td>
                </tr>
                <tr>
                  <td>Division</td>
                  <td>`/`</td>
                  <td>`x / 3`</td>
                </tr>
                <tr>
                  <td>Power</td>
                  <td>`^`</td>
                  <td>`x^2`</td>
                </tr>
              </tbody>
            </table>

            <h3>Logarithms</h3>
            <table className="tutorial-table">
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Syntax (math.js)</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Natural Logarithm (ln)</td>
                  <td>`log(x)`</td>
                  <td>`log(x + 1)`</td>
                </tr>
                <tr>
                  <td>Logarithm Base 10</td>
                  <td>`log10(x)`</td>
                  <td>`log10(x)`</td>
                </tr>
                <tr>
                  <td>Logarithm Base 2</td>
                  <td>`log2(x)`</td>
                  <td>`log2(x)`</td>
                </tr>
                <tr>
                  <td>Custom Base Logarithm</td>
                  <td>`log(x, base)`</td>
                  <td>`log(x, 5)`</td>
                </tr>
              </tbody>
            </table>

            <h3>Trigonometric Functions</h3>
            <table className="tutorial-table">
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Syntax (math.js)</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sine</td>
                  <td>`sin(x)`</td>
                  <td>`sin(x)`</td>
                </tr>
                <tr>
                  <td>Cosine</td>
                  <td>`cos(x)`</td>
                  <td>`cos(x)`</td>
                </tr>
                <tr>
                  <td>Tangent</td>
                  <td>`tan(x)`</td>
                  <td>`tan(x)`</td>
                </tr>
                <tr>
                  <td>Inverse Sine</td>
                  <td>`asin(x)`</td>
                  <td>`asin(x)`</td>
                </tr>
                <tr>
                  <td>Inverse Cosine</td>
                  <td>`acos(x)`</td>
                  <td>`acos(x)`</td>
                </tr>
                <tr>
                  <td>Inverse Tangent</td>
                  <td>`atan(x)`</td>
                  <td>`atan(x)`</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Remaining Sections */}
          <section className="tutorial-section">
            <h2>Outputs</h2>
            <p>
              Outputs include:
              <ul>
                <li>
                  Detailed iteration tables summarizing intermediate results.
                </li>
                <li>Graphs for visualizing the function or solution.</li>
              </ul>
            </p>
          </section>

          <section className="tutorial-section">
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
                  <strong>"No Root Found":</strong> Reassess ranges or
                  parameters.
                </li>
              </ul>
            </p>
          </section>

          {/* General Usage Instructions */}
          <section className="tutorial-section">
            <h2>General Usage Instructions</h2>
            <p id="warn">
              If you click on "Go to method" and it doesn't seem to work, try
              reloading the page and clicking again until it redirects.
            </p>

            <h3>Steps to Use</h3>
            <ol>
              <li>Select a numerical method from the menu.</li>
              <li>Enter the required inputs in the designated fields.</li>
              <li>
                Click the <strong>Calculate</strong> button to see results.
              </li>
              <li>
                Review the results as iteration tables or graphical
                visualizations.
              </li>
            </ol>
          </section>

          {/* Outputs Section */}
          <section className="tutorial-section">
            <h2>Outputs</h2>
            <p>Outputs include:</p>
            <ul>
              <li>
                Detailed iteration tables summarizing intermediate results.
              </li>
              <li>Graphs for visualizing the function or solution.</li>
            </ul>
          </section>

          {/* Common Errors Section */}
          <section className="tutorial-section">
            <h2>Common Errors</h2>
            <p>If you encounter errors, check your inputs:</p>
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
          </section>

          {/* Tips Section */}
          <section className="tutorial-section">
            <h2>Tips for Effective Use</h2>
            <p>
              Start with simple functions to understand SolverPro's behavior.
              Leverage visualizations for insight into solutions.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

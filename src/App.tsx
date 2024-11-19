import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Tutorials } from "./pages/Tutorials";
import { Secant_Main } from "./methods/1_SolucionEcuaciones/Iterativos/Secant.tsx";
import { Bisection_Main } from "./methods/1_SolucionEcuaciones/Directos/Bisection.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/tutorials" element={<Tutorials />}></Route>
        <Route path="/secant" element={<Secant_Main />}></Route>
        <Route path="/biseccion" element={<Bisection_Main />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

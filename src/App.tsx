import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Tutorials } from "./pages/Tutorials";
import { Secant } from "./methods/1_SolucionEcuaciones/Iterativos/Secant.tsx";
import { Bisection_Main } from "./methods/1_SolucionEcuaciones/Directos/Bisection.tsx";
import { FrMain } from "./methods/1_SolucionEcuaciones/Directos/False_Rule.tsx";
import { SearchMain } from "./methods/1_SolucionEcuaciones/Iterativos/Search.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/tutorials" element={<Tutorials />}></Route>
        <Route path="/Secant" element={<Secant />}></Route>
        <Route path="/biseccion" element={<Bisection_Main />}></Route>
        <Route path="/Falserule" element={<FrMain />}></Route>
        <Route path="/Search" element={<SearchMain/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;

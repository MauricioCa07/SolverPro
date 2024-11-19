import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Tutorials } from "./pages/Tutorials";
import { Secant_Main } from "./methods/1_SolucionEcuaciones/Iterativos/Secant.tsx";
import { Bisection_Main } from "./methods/1_SolucionEcuaciones/Directos/Bisection.tsx";
import { FrMain } from "./methods/1_SolucionEcuaciones/Directos/False_Rule.tsx";
import { SearchMain } from "./methods/1_SolucionEcuaciones/Iterativos/Search.tsx";
import { LUpartialMain } from "./methods/2_SistemasLineales/Directos/LUpartial.tsx";
import { Gauss_Main } from "./methods/2_SistemasLineales/Directos/Gauss.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/tutorials" element={<Tutorials />}></Route>
        <Route path="/secant" element={<Secant_Main />}></Route>
        <Route path="/biseccion" element={<Bisection_Main />}></Route>
        <Route path="/Falserule" element={<FrMain />}></Route>
        <Route path="/Search" element={<SearchMain/>}></Route>
        <Route path="/LUpartial" element={<LUpartialMain/>}></Route>
        <Route path="/gauss" element={<Gauss_Main />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Tutorials } from "./pages/Tutorials";
import { Secant_Main } from "./methods/1_SolucionEcuaciones/Iterativos/Secant";
import { Bisection_Main } from "./methods/1_SolucionEcuaciones/Directos/Bisection";
import { FrMain } from "./methods/1_SolucionEcuaciones/Directos/False_Rule";
import { SearchMain } from "./methods/1_SolucionEcuaciones/Iterativos/Search";
import { LUpartialMain } from "./methods/2_SistemasLineales/Directos/LUpartial";
import { Gauss_Main } from "./methods/2_SistemasLineales/Directos/Gauss";
import { SOR_Main } from "./methods/2_SistemasLineales/Iterativos/SOR";
import { Doolitle_Main } from "./methods/2_SistemasLineales/Directos/Doolitle";
import { Vandermonde_Main } from "./methods/3_Interpolacion/Vandermonde";
import { Trazcub_Main } from "./methods/3_Interpolacion/Trazcub";
import { TrapecioCompuesto_Main } from "./methods/4_EcuacionesDiferenciales/TrapecioCompuesto";
import { GaussianPartialPivoting_Main } from "./methods/2_SistemasLineales/Directos/GaussianPartialPivoting";
import { GaussianTotalPivoting_Main } from "./methods/2_SistemasLineales/Directos/GaussianTotalPivoting";
import { MultipleRoots_Main } from "./methods/1_SolucionEcuaciones/Iterativos/MultipleRoots";

function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas generales */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/tutorials" element={<Tutorials />} />

        {/* Métodos: Solución de Ecuaciones */}
        <Route path="/secant" element={<Secant_Main />} />
        <Route path="/biseccion" element={<Bisection_Main />} />
        <Route path="/Falserule" element={<FrMain />} />
        <Route path="/Search" element={<SearchMain />} />
        <Route path="/multiple-roots" element={<MultipleRoots_Main />} />

        {/* Métodos: Sistemas de Ecuaciones Lineales */}
        <Route path="/LUpartial" element={<LUpartialMain />} />
        <Route path="/gauss" element={<Gauss_Main />} />
        <Route path="/sor" element={<SOR_Main />} />
        <Route path="/doolitle" element={<Doolitle_Main />} />
        <Route path="/gaussian-partial-pivoting" element={<GaussianPartialPivoting_Main />} />
        <Route path="/gaussian-total-pivoting" element={<GaussianTotalPivoting_Main />} />

        {/* Métodos: Interpolación */}
        <Route path="/vandermonde" element={<Vandermonde_Main />} />
        <Route path="/trazcub" element={<Trazcub_Main />} />

        {/* Métodos: Ecuaciones Diferenciales */}
        <Route path="/trapecio-compuesto" element={<TrapecioCompuesto_Main />} />
      </Routes>
    </Router>
  );
}

export default App;



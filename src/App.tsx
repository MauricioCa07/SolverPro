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
import { SOR_Main } from "./methods/2_SistemasLineales/Iterativos/SOR.tsx";
import { Doolittle_Main } from "./methods/2_SistemasLineales/Directos/Doolitle.tsx";
import { Vandermonde_Main } from "./methods/3_Interpolacion/Vandermonde.tsx";
import { TrazCub_Main } from "./methods/3_Interpolacion/Trazcub.tsx";
import { TrapecioCompuesto_Main } from "./methods/4_EcuacionesDiferenciales/TrapecioCompuesto.tsx";
import { GaussianPartialPivoting_Main } from "./methods/2_SistemasLineales/Directos/Gaussian_Partial_Pivoting.tsx";
import { GaussianTotalPivoting_Main } from "./methods/2_SistemasLineales/Directos/Gaussian_Total_Pivoting.tsx";
import { MultipleRoots_Main } from "./methods/1_SolucionEcuaciones/Iterativos/Multiple_Roots.tsx";
import { CroutMain } from "./methods/2_SistemasLineales/Directos/Crout.tsx";
import { GaussSeidelMain } from "./methods/2_SistemasLineales/Iterativos/Gauss_Seidel.tsx";
import { LagrangeInterpolation_Main } from "./methods/3_Interpolacion/Lagrange.tsx";
import { Euler_Main } from "./methods/4_EcuacionesDiferenciales/Euler.tsx";
import { Simpson_Main } from "./methods/3_Interpolacion/Simpson.tsx";

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
        <Route path="/doolitle" element={<Doolittle_Main />} />
        <Route path="/gaussian-partial-pivoting" element={<GaussianPartialPivoting_Main />} />
        <Route path="/gaussian-total-pivoting" element={<GaussianTotalPivoting_Main />} />

        {/* Métodos: Interpolación */}
        <Route path="/vandermonde" element={<Vandermonde_Main />} />
        <Route path="/trazcub" element={<TrazCub_Main />} />
        <Route path="/Lagrange" element={<LagrangeInterpolation_Main/>} />
        <Route path="/Simpson" element={<Simpson_Main />}></Route>

        {/* Métodos: Ecuaciones Diferenciales */}
        <Route path="/trapecio-compuesto" element={<TrapecioCompuesto_Main />} />
        <Route path="/Crout" element={<CroutMain/>}></Route>
        <Route path="/GSeidel" element={<GaussSeidelMain/>}></Route>
        <Route path="/Euler" element={<Euler_Main />}></Route>
      </Routes>
    </Router>
  );
}

export default App;



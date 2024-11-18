import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { Tutorials } from "./pages/Tutorials";
import { Bisection } from "./methods/1_SolucionEcuaciones/Directos/Bisection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/tutorials" element={<Tutorials />}></Route>
        <Route path="/bisection" element={<Bisection />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

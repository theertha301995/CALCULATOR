import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Calculator from './pages/calculator/Calculator';
import Home from './pages/home/Home';
import Layout from './pages/layout/Layout';
import NoPage from "./pages/nopage/NoPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartoesPage from "./pages/CartoesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CartoesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
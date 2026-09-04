import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products/:slug"
          element={<ProductPage />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
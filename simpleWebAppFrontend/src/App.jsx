import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Toaster } from "react-hot-toast";

function App() {
    const Home = lazy(() => import("./pages/Home"));
    const About = lazy(() => import("./pages/About"));
    const ProductPage = lazy(() => import("./pages/ProductPage"));
    const ProductAddPage = lazy(() => import("./pages/ProductAddPage"));
    const ProductUpdatePage = lazy(() => import("./pages/ProductUpdatePage"));
    const Cart = lazy(() => import("./pages/CartPage"));

  return (
    <Router>
          <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/product/:prodId" element={<ProductPage />} />
                <Route path="/addProduct" element={<ProductAddPage />} />
                <Route path="/product/update/:productId" element={<ProductUpdatePage />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
              <Toaster toastOptions={{
                duration: 5000
              }}/>
       </Suspense>
    </Router>
  )
}

export default App

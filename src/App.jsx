import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import ChikkiProducts from './pages/ChikkiProducts';
import SharbatProducts from './pages/SharbatProducts';
import CashewProducts from './pages/CashewProducts';
import AlmondsProducts from './pages/AlmondsProducts';
import About from './pages/About';
import Contact from './pages/Contact';
import Inquiry from './pages/Inquiry';
import InquiryBasket from './pages/InquiryBasket';
import ProductDetail from './pages/ProductDetail';
import { InquiryProvider } from './context/InquiryContext';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    document.title = 'Surya Chikki - Authentic Sweet Chikki';
  }, []);

  return (
    <InquiryProvider>
      <Router>
        <ScrollToTop />
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Product listing pages */}
              <Route path="/chikki" element={<ChikkiProducts />} />
              <Route path="/sharbat" element={<SharbatProducts />} />
              <Route path="/cashew" element={<CashewProducts />} />
              <Route path="/almonds" element={<AlmondsProducts />} />

              {/* Product detail pages */}
              <Route path="/chikki/:id" element={<ProductDetail />} />
              <Route path="/sharbat/:id" element={<ProductDetail />} />
              <Route path="/cashew/:id" element={<ProductDetail />} />
              <Route path="/almonds/:id" element={<ProductDetail />} />

              {/* Other pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/inquiry" element={<Inquiry />} />
              <Route path="/inquiry-basket" element={<InquiryBasket />} />
            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#DC143C',
                color: '#fff',
                fontWeight: 'bold'
              }
            }}
          />
        </div>
      </Router>
    </InquiryProvider>
  );
}

export default App;
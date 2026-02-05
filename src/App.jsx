import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Links from './pages/Links';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Clinic from './pages/Clinic';
import About from './pages/About';
import Blog from './pages/Blog';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Links />} />

          {/* Main App Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/clinic" element={<Clinic />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
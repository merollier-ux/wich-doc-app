import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const Links  = lazy(() => import('./pages/Links'));
const Home   = lazy(() => import('./pages/Home'));
const Menu   = lazy(() => import('./pages/Menu'));
const Clinic = lazy(() => import('./pages/Clinic'));
const About  = lazy(() => import('./pages/About'));
const Blog   = lazy(() => import('./pages/Blog'));

const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen bg-[#1a110d] text-[#f4ebd0] text-sm tracking-widest uppercase opacity-60">
        Loading...
    </div>
);

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <div className="flex flex-col min-h-screen">
                    <Routes>
                        {/* Landing Page */}
                        <Route path="/" element={
                            <Suspense fallback={<PageLoader />}>
                                <Links />
                            </Suspense>
                        } />

                        {/* Main App Routes */}
                        <Route path="/*" element={
                            <>
                                <Navbar />
                                <main className="flex-grow">
                                    <Suspense fallback={<PageLoader />}>
                                        <Routes>
                                            <Route path="/home"   element={<Home />} />
                                            <Route path="/menu"   element={<Menu />} />
                                            <Route path="/clinic" element={<Clinic />} />
                                            <Route path="/about"  element={<About />} />
                                            <Route path="/blog"   element={<Blog />} />
                                        </Routes>
                                    </Suspense>
                                </main>
                                <Footer />
                            </>
                        } />
                    </Routes>
                </div>
            </ErrorBoundary>
        </Router>
    );
}

export default App;

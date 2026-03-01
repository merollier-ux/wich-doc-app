import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Links from './pages/Links'; // eager — critical first render

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

const MainLayout = () => (
    <>
        <Navbar />
        <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
                <Outlet />
            </Suspense>
        </main>
        <Footer />
    </>
);

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <div className="flex flex-col min-h-screen">
                    <Routes>
                        {/* Landing page — exact match, no wildcard ambiguity */}
                        <Route path="/" element={<Links />} />

                        {/* Main app — layout route provides Navbar + Footer via Outlet */}
                        <Route element={<MainLayout />}>
                            <Route path="/home"   element={<Home />} />
                            <Route path="/menu"   element={<Menu />} />
                            <Route path="/clinic" element={<Clinic />} />
                            <Route path="/about"  element={<About />} />
                            <Route path="/blog"   element={<Blog />} />
                        </Route>
                    </Routes>
                </div>
            </ErrorBoundary>
        </Router>
    );
}

export default App;

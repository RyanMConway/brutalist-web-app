import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import SystemFooter from "./components/SystemFooter";
import ChatWidget from "./components/ChatWidget";
import PageTransition from "./components/PageTransition";
import MatrixRain from "./components/MatrixRain"; // NEW IMPORT

// Hooks
import { useKonamiCode } from "./hooks/useKonamiCode"; // NEW IMPORT

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function AnimatedRoutes({ isBrutalist }) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home isBrutalist={isBrutalist} /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects isBrutalist={isBrutalist} /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About isBrutalist={isBrutalist} /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact isBrutalist={isBrutalist} /></PageTransition>} />
                <Route path="/admin" element={<PageTransition><AdminLogin isBrutalist={isBrutalist} /></PageTransition>} />
                <Route path="/admin/dashboard" element={<PageTransition><AdminDashboard isBrutalist={isBrutalist} /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
}

function LayoutContent() {
    const [isBrutalist, setIsBrutalist] = useState(true);
    const location = useLocation();

    // Ref to control the scroll container
    const scrollRef = useRef(null);

    // NEW: Listen for the Konami Code (Returns true when typed)
    const godMode = useKonamiCode();

    const toggleTheme = () => setIsBrutalist(!isBrutalist);

    // Reset scroll to top whenever the route changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, 0);
        }
    }, [location.pathname]);

    const bgClass = isBrutalist
        // BRUTALIST
        ? "bg-blueprint cursor-crosshair-all text-white font-mono h-[100dvh] w-screen overflow-hidden fixed inset-0 crt-turn-on flex flex-col"
        // SLEEK
        : "bg-slate-50 text-slate-900 font-sans h-[100dvh] w-screen overflow-hidden fixed inset-0 transition-colors duration-500 flex flex-col";

    return (
        <div key={isBrutalist ? location.pathname : 'static'} className={bgClass}>

            {/* 1. MATRIX RAIN LAYER (Only shows if Konami Code is typed) */}
            {godMode && <MatrixRain />}

            {isBrutalist && <div className="scanlines"></div>}

            <Navbar isBrutalist={isBrutalist} toggleTheme={toggleTheme} />

            {/* SCROLLABLE AREA */}
            <div
                ref={scrollRef}
                className={`flex-1 overflow-y-auto overflow-x-hidden ${isBrutalist ? "pt-24 px-6" : "pt-32 px-6"}`}
            >

                {isBrutalist && (
                    <>
                        <div className="fixed top-0 left-6 w-px h-full bg-white opacity-5 pointer-events-none z-0"></div>
                        <div className="fixed top-0 right-6 w-px h-full bg-white opacity-5 pointer-events-none z-0"></div>
                    </>
                )}

                {/* Main Page Content */}
                <AnimatedRoutes isBrutalist={isBrutalist} />

                {/* Bottom Spacer */}
                <div className="h-12"></div>
            </div>

            {/* FOOTER AREA */}
            <SystemFooter isBrutalist={isBrutalist} />

            <ChatWidget isBrutalist={isBrutalist} />
        </div>
    );
}

function App() {
    return (
        <Router>
            <LayoutContent />
        </Router>
    );
}

export default App;
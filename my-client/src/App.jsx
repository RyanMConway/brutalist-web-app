import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import SystemFooter from "./components/SystemFooter";
import ChatWidget from "./components/ChatWidget";
import PageTransition from "./components/PageTransition";
import MatrixRain from "./components/MatrixRain";
import { useKonamiCode } from "./hooks/useKonamiCode";

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
    const scrollRef = useRef(null);
    const godMode = useKonamiCode();

    const toggleTheme = () => setIsBrutalist(!isBrutalist);

    // --- NEW: DYNAMIC FAVICON & TITLE LOGIC ---
    useEffect(() => {
        // 1. Update the Tab Title
        document.title = isBrutalist
            ? ">> SYSTEM_ONLINE // RYAN_CONWAY"
            : "Ryan Conway | Senior Software Engineer";

        // 2. Update the Favicon
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
            link.href = isBrutalist
                ? "/favicon-brutalist.svg"
                : "/favicon-sleek.svg";
        }
    }, [isBrutalist]);
    // -------------------------------------------

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTo(0, 0);
    }, [location.pathname]);

    const bgClass = isBrutalist
        ? "bg-blueprint cursor-crosshair-all text-white font-mono h-[100dvh] w-screen overflow-hidden fixed inset-0 crt-turn-on flex flex-col"
        : "bg-slate-50 text-slate-900 font-sans h-[100dvh] w-screen overflow-hidden fixed inset-0 transition-colors duration-500 flex flex-col";

    return (
        <div key={isBrutalist ? location.pathname : 'static'} className={bgClass}>

            {/* --- SLEEK MODE AURORA BACKGROUNDS --- */}
            {!isBrutalist && (
                <>
                    <div className="fixed top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply z-0" />
                    <div className="fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-400/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply z-0" />
                </>
            )}

            {godMode && <MatrixRain />}
            {isBrutalist && <div className="scanlines"></div>}

            <Navbar isBrutalist={isBrutalist} toggleTheme={toggleTheme} />

            {/* Content Container */}
            <div ref={scrollRef} className={`flex-1 overflow-y-auto overflow-x-hidden relative z-10 ${isBrutalist ? "pt-24 px-6" : "pt-32 px-6"}`}>

                {isBrutalist && (
                    <>
                        <div className="fixed top-0 left-6 w-px h-full bg-white opacity-5 pointer-events-none z-0"></div>
                        <div className="fixed top-0 right-6 w-px h-full bg-white opacity-5 pointer-events-none z-0"></div>
                    </>
                )}

                <AnimatedRoutes isBrutalist={isBrutalist} />
                <div className="h-12"></div>
            </div>

            <SystemFooter isBrutalist={isBrutalist} />
            <ChatWidget isBrutalist={isBrutalist} />
        </div>
    );
}

function App() {
    return <Router><LayoutContent /></Router>;
}

export default App;
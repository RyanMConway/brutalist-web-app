import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SystemFooter from "./components/SystemFooter";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";

function App() {
    const [isBrutalist, setIsBrutalist] = useState(true);

    const toggleTheme = () => {
        setIsBrutalist(!isBrutalist);
    };

    // Dynamic Class: Applies the Grid (bg-blueprint) and Cursor (cursor-crosshair-all)
    const bgClass = isBrutalist
        ? "bg-blueprint cursor-crosshair-all text-white font-mono min-h-screen relative"
        : "bg-slate-900 text-slate-200 font-sans min-h-screen relative transition-colors duration-500";

    return (
        <div className={bgClass}>
            <Router>
                <Navbar isBrutalist={isBrutalist} toggleTheme={toggleTheme} />

                {/* Layout Container with padding for the footer */}
                <div className={isBrutalist ? "pt-24 px-6 pb-20" : "pt-32 px-6 pb-20"}>

                    {/* Brutalist Decor: Faint Vertical Lines */}
                    {isBrutalist && (
                        <>
                            <div className="fixed top-0 left-6 w-px h-full bg-white opacity-10 pointer-events-none"></div>
                            <div className="fixed top-0 right-6 w-px h-full bg-white opacity-10 pointer-events-none"></div>
                        </>
                    )}

                    <Routes>
                        <Route path="/" element={<Home isBrutalist={isBrutalist} />} />
                        <Route path="/projects" element={<Projects isBrutalist={isBrutalist} />} />
                        <Route path="/about" element={<About isBrutalist={isBrutalist} />} />
                    </Routes>
                </div>

                {/* The New Footer (Only appears when isBrutalist is true) */}
                <SystemFooter isBrutalist={isBrutalist} />

            </Router>
        </div>
    );
}

export default App;
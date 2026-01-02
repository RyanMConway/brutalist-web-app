import { Link } from 'react-router-dom';
import { Ruler, Zap } from 'lucide-react';

export default function Navbar({ isBrutalist, toggleTheme }) {
    // BLUEPRINT STYLE
    const navBrutalist = "fixed top-0 left-0 w-full flex justify-between items-center p-6 border-b-2 border-white bg-[#003366] z-50 font-mono text-white";
    const linkBrutalist = "uppercase border border-white px-4 py-2 hover:bg-white hover:text-[#003366] transition-none";

    // SLEEK STYLE
    const navSleek = "fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-50 shadow-xl";
    const linkSleek = "text-sm font-medium text-slate-300 hover:text-white hover:scale-105 transition-all";

    return (
        <nav className={isBrutalist ? navBrutalist : navSleek}>
            {/* Logo Area */}
            <div className="flex items-center gap-2">
                {isBrutalist ? <Ruler size={24} /> : <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>}
                <span className={isBrutalist ? "text-xl tracking-widest" : "font-bold tracking-tight text-white"}>
          {isBrutalist ? "FIG_1.0" : "Ryan Conway"}
        </span>
            </div>

            {/* Links */}
            <div className="flex gap-6">
                <Link to="/" className={isBrutalist ? linkBrutalist : linkSleek}>Home</Link>
                <Link to="/projects" className={isBrutalist ? linkBrutalist : linkSleek}>Projects</Link>
                <Link to="/about" className={isBrutalist ? linkBrutalist : linkSleek}>About</Link>
            </div>

            {/* Toggle Button */}
            <button onClick={toggleTheme} className={isBrutalist ? "border border-white p-2 hover:bg-white hover:text-blue-900" : "bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-500"}>
                <Zap size={18} fill={isBrutalist ? "none" : "white"} />
            </button>
        </nav>
    );
}
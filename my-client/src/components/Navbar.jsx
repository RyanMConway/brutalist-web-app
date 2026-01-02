import { Link } from 'react-router-dom';
import { Ruler, Zap } from 'lucide-react';

export default function Navbar({ isBrutalist, toggleTheme }) {
    // BLUEPRINT STYLE
    const navBrutalist = "fixed top-0 left-0 w-full flex justify-between items-center p-6 border-b-2 border-white bg-[#0c1219] z-50 font-mono text-white";
    const linkBrutalist = "uppercase border border-white px-4 py-2 hover:bg-white hover:text-[#003366] transition-none text-xs md:text-sm";

    // SLEEK STYLE
    const navSleek = "fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-50 shadow-xl transition-all duration-500";
    const linkSleek = "text-sm font-medium text-slate-300 hover:text-white hover:scale-105 transition-all";

    return (
        <nav className={isBrutalist ? navBrutalist : navSleek}>
            {/* Logo Area */}
            <div className="flex items-center gap-2">
                {isBrutalist ? <Ruler size={24} className="text-emerald-500"/> : <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>}
                <span className={isBrutalist ? "text-xl tracking-widest text-emerald-500" : "font-bold tracking-tight text-white"}>
                  {isBrutalist ? "FIG_1.0" : "Ryan Conway"}
                </span>
            </div>

            {/* Links - NOW INCLUDES CONTACT */}
            <div className="hidden md:flex gap-6">
                <Link to="/" className={isBrutalist ? linkBrutalist : linkSleek}>Home</Link>
                <Link to="/projects" className={isBrutalist ? linkBrutalist : linkSleek}>Projects</Link>
                <Link to="/about" className={isBrutalist ? linkBrutalist : linkSleek}>About</Link>
                <Link to="/contact" className={isBrutalist ? linkBrutalist : linkSleek}>Contact</Link>
            </div>

            {/* Toggle Button */}
            <button onClick={toggleTheme} className={isBrutalist ? "border border-emerald-500 p-2 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-none" : "bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-500 text-white transition-colors"}>
                <Zap size={18} fill={isBrutalist ? "none" : "white"} />
            </button>
        </nav>
    );
}
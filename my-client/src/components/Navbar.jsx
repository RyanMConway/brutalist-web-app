import { Link } from "react-router-dom";
import { Terminal, Sun, Moon, Shield } from "lucide-react";
import HackerText from "./HackerText";

export default function Navbar({ isBrutalist, toggleTheme }) {
    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isBrutalist
                ? "bg-black border-b border-white text-white p-4 font-mono"
                : "bg-white/80 backdrop-blur-md shadow-sm p-4 font-sans text-slate-800"
        }`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo Area */}
                <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                    {isBrutalist ? <Terminal size={24} /> : <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>}
                    <span>
                        <HackerText text="RYAN_CONWAY" isBrutalist={isBrutalist} />
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="hover:text-blue-500 transition-colors">
                        <HackerText text="HOME" isBrutalist={isBrutalist} />
                    </Link>
                    <Link to="/projects" className="hover:text-blue-500 transition-colors">
                        <HackerText text="PROJECTS" isBrutalist={isBrutalist} />
                    </Link>
                    <Link to="/about" className="hover:text-blue-500 transition-colors">
                        <HackerText text="ABOUT" isBrutalist={isBrutalist} />
                    </Link>
                    <Link to="/contact" className="hover:text-blue-500 transition-colors">
                        <HackerText text="CONTACT" isBrutalist={isBrutalist} />
                    </Link>

                    {/* Admin Link (Icon only to be subtle) */}
                    <Link to="/admin" className={isBrutalist ? "text-red-500 hover:text-red-400" : "text-slate-400 hover:text-blue-600"}>
                        <Shield size={18} />
                    </Link>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full border ${
                            isBrutalist
                                ? "border-white hover:bg-white hover:text-black"
                                : "border-slate-200 hover:bg-slate-100"
                        } transition-all`}
                    >
                        {isBrutalist ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
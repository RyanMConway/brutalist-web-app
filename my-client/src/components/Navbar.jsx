import { useState } from "react";
import { Link } from "react-router-dom";
import { Terminal, Sun, Moon, Shield, Menu, X, Code } from "lucide-react"; // Added Menu, X, Code
import HackerText from "./HackerText";
import useSound from "../hooks/useSound"; // NEW IMPORT

export default function Navbar({ isBrutalist, toggleTheme }) {
    // State for Mobile Menu
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Initialize Sound Engine
    const play = useSound();

    // Helper: Closes menu and plays sound when a mobile link is clicked
    const handleLinkClick = () => {
        play("click");
        setIsMobileOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isBrutalist
                ? "bg-black border-b border-white text-white p-4 font-mono"
                : "bg-white/80 backdrop-blur-md shadow-sm p-4 font-sans text-slate-800"
        }`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo Area */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-xl font-bold"
                    onMouseEnter={() => play("hover")}
                    onClick={() => play("click")}
                >
                    {isBrutalist ? <Terminal size={24} /> : <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><Code size={20}/></div>}
                    <span>
                        <HackerText text="RYAN_CONWAY" isBrutalist={isBrutalist} />
                    </span>
                </Link>

                {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
                <div className="hidden md:flex items-center gap-8">
                    {["/", "/projects", "/about", "/contact"].map((path) => (
                        <Link
                            key={path}
                            to={path}
                            className="hover:text-blue-500 transition-colors"
                            onMouseEnter={() => play("hover")}
                            onClick={() => play("click")}
                        >
                            <HackerText
                                text={path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
                                isBrutalist={isBrutalist}
                            />
                        </Link>
                    ))}

                    {/* Admin Link (Icon only) */}
                    <Link
                        to="/admin"
                        onClick={() => play("click")}
                        className={isBrutalist ? "text-red-500 hover:text-red-400" : "text-slate-400 hover:text-blue-600"}
                    >
                        <Shield size={18} />
                    </Link>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={() => { toggleTheme(); play("on"); }}
                        onMouseEnter={() => play("hover")}
                        className={`p-2 rounded-full border ${
                            isBrutalist
                                ? "border-white hover:bg-white hover:text-black"
                                : "border-slate-200 hover:bg-slate-100"
                        } transition-all`}
                    >
                        {isBrutalist ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>

                {/* --- MOBILE TOGGLE BUTTON (Visible only on Mobile) --- */}
                <button
                    className="md:hidden"
                    onClick={() => { setIsMobileOpen(!isMobileOpen); play("click"); }}
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* --- MOBILE DROPDOWN MENU --- */}
            {isMobileOpen && (
                <div className={`md:hidden absolute top-full left-0 w-full p-4 border-b flex flex-col gap-4 shadow-xl ${
                    isBrutalist ? "bg-black border-white text-white" : "bg-white border-slate-200 text-slate-800"
                }`}>
                    {["/", "/projects", "/about", "/contact", "/admin"].map((path) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={handleLinkClick}
                            className={`text-lg py-2 border-b ${isBrutalist ? "border-white/20" : "border-slate-100"}`}
                        >
                            {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
                        </Link>
                    ))}

                    {/* Mobile Theme Toggle */}
                    <button
                        onClick={() => { toggleTheme(); play("on"); setIsMobileOpen(false); }}
                        className="flex items-center gap-2 py-2 font-bold"
                    >
                        {isBrutalist ? <Sun size={18} /> : <Moon size={18} />}
                        <span>SWITCH THEME</span>
                    </button>
                </div>
            )}
        </nav>
    );
}
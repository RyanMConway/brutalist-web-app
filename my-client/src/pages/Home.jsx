import { useState, useEffect } from "react";
import { ArrowRight, Terminal, Dumbbell, Server, Code } from "lucide-react";
import { Link } from "react-router-dom";
import HackerText from "../components/HackerText";
import ThreeD20 from "../components/ThreeD20";

export default function Home({ isBrutalist }) {
    // STATE: Should we show the 3D object yet?
    const [show3D, setShow3D] = useState(!isBrutalist);

    // EFFECT: If in Brutalist mode, wait for the CRT Animation (600ms) to finish
    useEffect(() => {
        if (isBrutalist) {
            setShow3D(false); // Hide initially
            const timer = setTimeout(() => setShow3D(true), 600); // Show after animation
            return () => clearTimeout(timer);
        } else {
            setShow3D(true); // Show immediately in Sleek mode
        }
    }, [isBrutalist]);

    return (
        <div className="max-w-7xl mx-auto min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12">

            {/* LEFT SIDE: Text Content */}
            <div className="flex-1 space-y-8 z-10">

                {/* Intro Badge - DYNAMIC CONTENT */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 border transition-all ${
                    isBrutalist
                        ? "rounded border-emerald-500 text-emerald-500 bg-emerald-900/20"
                        : "rounded-full border-blue-100 text-blue-600 bg-blue-50"
                }`}>
                    {/* Icon Changes based on mode */}
                    {isBrutalist ? <Terminal size={14} /> : <Code size={14} />}

                    {/* Text Changes based on mode */}
                    <span className="text-xs font-bold tracking-widest uppercase">
                        {isBrutalist ? "SYSTEM_STATUS: ONLINE" : "Senior Software Engineer"}
                    </span>
                </div>

                {/* Headline */}
                <h1 className={isBrutalist ? "text-6xl md:text-8xl font-bold font-mono leading-none text-white" : "text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 leading-tight"}>
                    RYAN<br />
                    <span className={isBrutalist ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600" : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"}>
                        CONWAY
                    </span>
                </h1>

                {/* Subheadline */}
                <p className={`text-lg md:text-xl max-w-xl leading-relaxed ${isBrutalist ? "text-slate-400 font-mono" : "text-slate-600"}`}>
                    <span className="font-bold">Full Stack Engineer</span> & <span className="font-bold">Competitive Bodybuilder</span> based in Charlotte, NC.
                    Specializing in AWS Infrastructure, PySpark Data Pipelines, and React Applications.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                    <Link to="/projects" className={`group flex items-center gap-3 px-8 py-4 text-lg font-bold border transition-all ${
                        isBrutalist
                            ? "bg-emerald-600 border-emerald-600 text-black hover:bg-emerald-500 rounded"
                            : "bg-blue-600 border-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30"
                    }`}>
                        <HackerText text="VIEW PROJECTS" isBrutalist={isBrutalist} />
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link to="/contact" className={`flex items-center gap-3 px-8 py-4 text-lg font-bold border transition-all ${
                        isBrutalist
                            ? "border-white text-white hover:bg-white hover:text-black rounded"
                            : "border-slate-300 text-slate-700 rounded-full hover:border-slate-800 hover:text-slate-900 bg-white"
                    }`}>
                        <HackerText text="CONTACT ME" isBrutalist={isBrutalist} />
                    </Link>
                </div>

                {/* Stats / Tech Stack Bar */}
                <div className={`mt-12 flex items-center gap-8 text-sm ${isBrutalist ? "text-slate-500 font-mono" : "text-slate-500"}`}>
                    <div className="flex items-center gap-2">
                        <Server size={16} /> AWS / EMR
                    </div>
                    <div className="flex items-center gap-2">
                        <Terminal size={16} /> PySpark
                    </div>
                    <div className="flex items-center gap-2">
                        <Dumbbell size={16} /> Competitive Bodybuilder
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: 3D D20 Object */}
            <div className="flex-1 w-full flex justify-center items-center h-[500px] relative">
                {/* Background Glow */}
                <div className={`absolute w-64 h-64 rounded-full blur-[100px] opacity-40 transition-colors duration-1000 ${
                    isBrutalist ? "bg-emerald-500" : "bg-blue-500"
                }`}></div>

                {/* Only render the 3D Canvas once the page animation is done */}
                {show3D && (
                    <div className="animate-in fade-in duration-1000 w-full">
                        <ThreeD20 isBrutalist={isBrutalist} />
                    </div>
                )}
            </div>

        </div>
    );
}
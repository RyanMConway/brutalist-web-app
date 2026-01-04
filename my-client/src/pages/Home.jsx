import { useState, useEffect } from "react";
import { ArrowRight, Terminal, Dumbbell, Server, Code } from "lucide-react";
import { Link } from "react-router-dom";
import HackerText from "../components/HackerText";
import ThreeD20 from "../components/ThreeD20";
import TechTicker from "../components/TechTicker"; // NEW IMPORT

export default function Home({ isBrutalist }) {
    const [show3D, setShow3D] = useState(!isBrutalist);

    useEffect(() => {
        if (isBrutalist) {
            setShow3D(false);
            const timer = setTimeout(() => setShow3D(true), 600);
            return () => clearTimeout(timer);
        } else {
            setShow3D(true);
        }
    }, [isBrutalist]);

    return (
        <div className="flex flex-col gap-12">
            <div className="max-w-7xl mx-auto w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-between gap-12">

                {/* LEFT SIDE: Text Content */}
                <div className="flex-1 space-y-8 z-10">

                    {/* Intro Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 border transition-all ${
                        isBrutalist
                            ? "rounded border-emerald-500 text-emerald-500 bg-emerald-900/20"
                            : "rounded-full border-blue-200 text-blue-700 bg-white shadow-sm"
                    }`}>
                        {isBrutalist ? <Terminal size={14} /> : <Code size={14} />}
                        <span className="text-xs font-bold tracking-widest uppercase">
                            {isBrutalist ? "SYSTEM_STATUS: ONLINE" : "Senior Software Engineer"}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className={isBrutalist ? "text-6xl md:text-8xl font-bold font-mono leading-none text-white" : "text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 leading-tight"}>
                        RYAN<br />
                        <span className={isBrutalist ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600" : "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600"}>
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
                                : "bg-slate-900 border-slate-900 text-white rounded-full hover:bg-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        }`}>
                            <span>View Projects</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link to="/contact" className={`flex items-center gap-3 px-8 py-4 text-lg font-bold border transition-all ${
                            isBrutalist
                                ? "border-white text-white hover:bg-white hover:text-black rounded"
                                : "border-slate-200 text-slate-700 rounded-full hover:border-slate-400 bg-white shadow-sm hover:shadow-md"
                        }`}>
                            <span>Contact Me</span>
                        </Link>
                    </div>

                    {/* Stats */}
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

                {/* RIGHT SIDE: 3D Object */}
                <div className="flex-1 w-full flex justify-center items-center h-[500px] relative">
                    {/* Glow Effect */}
                    <div className={`absolute w-64 h-64 rounded-full blur-[100px] opacity-40 transition-colors duration-1000 ${
                        isBrutalist ? "bg-emerald-500" : "bg-purple-500"
                    }`}></div>

                    {show3D && (
                        <div className="animate-in fade-in duration-1000 w-full">
                            <ThreeD20 isBrutalist={isBrutalist} />
                        </div>
                    )}
                </div>
            </div>

            {/* NEW: Infinite Tech Scroll at the bottom */}
            <TechTicker isBrutalist={isBrutalist} />
        </div>
    );
}
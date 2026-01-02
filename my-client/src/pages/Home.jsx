import { useEffect, useState } from 'react';
import { ArrowRight, Database, Server, Code } from 'lucide-react';

export default function Home({ isBrutalist }) {
    const [users, setUsers] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        fetch(`${API_URL}/users`).then(res => res.json()).then(setUsers).catch(console.error);
    }, []);

    return (
        <div className="max-w-6xl mx-auto w-full min-h-[80vh] flex flex-col justify-center">

            {/* HERO SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Text Content */}
                <div>
                    <span className={isBrutalist ? "text-emerald-500 text-xs font-bold tracking-widest mb-4 block" : "text-blue-500 font-semibold tracking-wide uppercase text-sm mb-4 block"}>
                        {isBrutalist ? ">> INITIALIZING_SEQUENCE..." : "Full Stack Developer"}
                    </span>

                    <h1 className={isBrutalist ? "text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tighter" : "text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"}>
                        {isBrutalist ? "RYAN_CONWAY" : "Building Digital Systems."}
                    </h1>

                    <p className={isBrutalist ? "text-slate-400 text-sm max-w-md border-l-2 border-emerald-500 pl-4 py-2 mb-8" : "text-slate-400 text-lg max-w-lg mb-8 leading-relaxed"}>
                        {isBrutalist
                            ? "SPECIALIZED IN HIGH-SCALE ETL PIPELINES, AWS INFRASTRUCTURE, AND MODERN WEB ARCHITECTURE. BASED IN CHARLOTTE, NC."
                            : "I'm Ryan, a software developer at TIAA. I specialize in Python, cloud infrastructure, and building scalable data solutions."}
                    </p>

                    <div className="flex gap-4">
                        <button className={isBrutalist ? "bg-emerald-500 text-black px-8 py-3 font-bold hover:bg-emerald-400 transition-none" : "bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"}>
                            {isBrutalist ? "INITIATE_CONTACT" : "Get in Touch"}
                        </button>
                        <button className={isBrutalist ? "border border-slate-600 text-slate-400 px-8 py-3 hover:text-white hover:border-white transition-none" : "text-white px-8 py-3 hover:text-blue-400 transition-colors flex items-center gap-2"}>
                            {isBrutalist ? "VIEW_LOGS" : "View Work"} {isBrutalist ? "" : <ArrowRight size={16}/>}
                        </button>
                    </div>
                </div>

                {/* Right: The "Live Database" Widget (Your Postgres Requirement) */}
                <div className={isBrutalist ? "border border-slate-700 bg-black/40 p-1" : "relative"}>
                    {/* Sleek Mode Glow Effect */}
                    {!isBrutalist && <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>}

                    <div className={isBrutalist ? "bg-[#0a0f14] p-6 min-h-[300px]" : "relative bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl min-h-[300px]"}>

                        {/* Widget Header */}
                        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                <Database size={18} className={isBrutalist ? "text-emerald-500" : "text-blue-500"} />
                                <span className="text-sm font-bold tracking-wider">{isBrutalist ? "LIVE_DB_CONNECTION" : "Postgres Cluster"}</span>
                            </div>
                            <div className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs text-emerald-500 font-mono">ONLINE</span>
                            </div>
                        </div>

                        {/* Widget Content (User List) */}
                        <div className="space-y-3">
                            {users.length === 0 ? (
                                <div className="text-xs text-slate-500 font-mono">Waiting for stream...</div>
                            ) : (
                                users.map((user, i) => (
                                    <div key={i} className={isBrutalist
                                        ? "flex justify-between font-mono text-xs text-slate-300 border-b border-slate-800 py-2 hover:bg-slate-800/50 cursor-pointer"
                                        : "flex justify-between text-sm text-slate-300 py-2 hover:bg-slate-800 rounded px-2 transition-colors"
                                    }>
                                        <span>{isBrutalist ? `ID_00${user.id}` : user.name}</span>
                                        <span className="opacity-50">{user.email}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Technical Decoration Footer */}
                        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between text-[10px] text-slate-600 font-mono uppercase">
                            <span>Latency: 24ms</span>
                            <span>Region: us-east-1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
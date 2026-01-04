import { ExternalLink, Github, Terminal, Cpu, Briefcase } from 'lucide-react';

export default function Projects({ isBrutalist }) {
    const projects = [
        {
            id: "01",
            title: "ETL Pipeline Orchestrator",
            description: "Automated data ingestion system processing 5TB+ daily using PySpark and AWS EMR.",
            stack: ["Python", "AWS", "PySpark"],
            status: "OPERATIONAL"
        },
        {
            id: "02",
            title: "MTG Market Tracker",
            description: "Real-time price tracking engine for Magic: The Gathering cards with historical graphing.",
            stack: ["React", "Node.js", "Postgres"],
            status: "BETA"
        },
        {
            id: "03",
            title: "D&D Campaign Manager",
            description: "Interactive character sheet and campaign visualization tool for tabletop RPGs.",
            stack: ["Three.js", "WebGL", "Firebase"],
            status: "PLANNED"
        },
    ];

    return (
        <div className="max-w-6xl mx-auto w-full pt-10">
            <header className="mb-20">
                {/* HEADLINE */}
                <h1 className={isBrutalist
                    ? "text-6xl font-bold mb-4 text-white font-mono"
                    // FIX: Gradient changed from 'white' to 'blue/purple' for visibility
                    : "text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-purple-600"
                }>
                    {isBrutalist ? "PROJECT_INDEX" : "Selected Works"}
                </h1>

                {/* UNDERLINE DECORATION */}
                <div className={isBrutalist
                    ? "h-1 w-20 bg-emerald-500"
                    : "h-1 w-20 bg-blue-600 rounded-full"
                }></div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p) => (
                    <div key={p.id} className={isBrutalist
                        // BRUTALIST CARD (Dark/Cyberpunk)
                        ? "group border border-slate-700 hover:border-emerald-500 transition-colors bg-[#0a0f14] p-8 relative min-h-[320px] flex flex-col justify-between"
                        // SLEEK CARD (Light/Clean) - Fixed Background and Text Colors
                        : "group bg-white hover:-translate-y-2 rounded-2xl p-8 border border-slate-100 hover:border-blue-100 transition-all duration-300 min-h-[320px] flex flex-col justify-between shadow-lg hover:shadow-2xl"
                    }>

                        {/* Card Header */}
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className={isBrutalist ? "text-emerald-500 font-mono text-xl" : "text-slate-400 font-mono text-sm font-bold"}>
                                    {isBrutalist ? p.id : `0${p.id}`}
                                </span>
                                <div className="flex gap-2">
                                    <Github size={18} className={isBrutalist ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-blue-600"} />
                                    <ExternalLink size={18} className={isBrutalist ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-blue-600"} />
                                </div>
                            </div>

                            <h3 className={isBrutalist
                                ? "text-2xl font-bold mb-3 group-hover:text-emerald-400 text-white"
                                // FIX: Text is now Dark Blue/Gray in sleek mode
                                : "text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors"
                            }>
                                {p.title}
                            </h3>
                            <p className={isBrutalist ? "text-slate-400 text-sm leading-relaxed mb-6" : "text-slate-600 text-sm leading-relaxed mb-6"}>
                                {p.description}
                            </p>
                        </div>

                        {/* Card Footer: Stack & Status */}
                        <div>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {p.stack.map(tech => (
                                    <span key={tech} className={isBrutalist
                                        ? "text-[10px] uppercase border border-slate-700 px-2 py-1 text-slate-300"
                                        // FIX: Badges are now light blue instead of white-on-white
                                        : "text-xs font-bold bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-600"
                                    }>
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Brutalist-only hover bar */}
                            {isBrutalist && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
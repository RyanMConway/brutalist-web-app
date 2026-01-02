import { MapPin, Briefcase, Cpu, Dumbbell, Scroll, Terminal } from 'lucide-react';

export default function About({ isBrutalist }) {

    // Skill Data
    const skills = [
        { name: "Python / PySpark", level: 95, br: "[||||||||||]" },
        { name: "AWS Architecture", level: 85, br: "[||||||||--]" },
        { name: "React / Node.js", level: 75, br: "[|||||||---]" },
        { name: "PostgreSQL", level: 90, br: "[|||||||||-]" },
    ];

    return (
        <div className="max-w-6xl mx-auto w-full pt-10 text-slate-300">

            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                <div className="md:col-span-1">
                    {/* Profile Image Placeholder */}
                    <div className={isBrutalist
                        ? "aspect-square border-2 border-dashed border-emerald-500 bg-[#0a0f14] flex items-center justify-center relative"
                        : "aspect-square rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 shadow-2xl flex items-center justify-center border border-white/10"
                    }>
                        {isBrutalist ? (
                            <div className="text-center font-mono">
                                <span className="text-4xl text-emerald-500 block mb-2">IMG_01</span>
                                <span className="text-xs uppercase opacity-50">Image Missing</span>
                            </div>
                        ) : (
                            <span className="text-4xl font-bold opacity-20">Photo</span>
                        )}
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col justify-center">
                    <h1 className={isBrutalist ? "text-6xl font-bold text-white mb-2 font-mono uppercase" : "text-6xl font-extrabold text-white mb-4"}>
                        {isBrutalist ? "OPERATOR_PROFILE" : "About Me"}
                    </h1>
                    <h2 className={isBrutalist ? "text-emerald-500 font-mono text-xl mb-6 tracking-widest" : "text-blue-400 text-2xl font-medium mb-6"}>
                        Ryan Conway
                    </h2>
                    <p className={isBrutalist ? "font-mono text-sm leading-relaxed border-l-2 border-emerald-500 pl-4 opacity-80" : "text-lg leading-relaxed opacity-80"}>
                        {isBrutalist
                            ? "SYSTEM DESIGNER SPECIALIZING IN DATA ENGINEERING AND FULL STACK APPLICATIONS. CURRENTLY OPERATING OUT OF CHARLOTTE, NC SECTOR. PRIMARY DIRECTIVE: BUILDING SCALABLE ETL PIPELINES AT TIAA."
                            : "I'm a software developer based in Charlotte, NC, currently building data solutions at TIAA. I bridge the gap between heavy backend data engineering and modern frontend interactivity."
                        }
                    </p>
                </div>
            </div>

            {/* Stats & Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left Col: The Skill Matrix */}
                <div>
                    <h3 className={isBrutalist ? "text-xl font-bold text-white mb-8 uppercase border-b border-slate-700 pb-2 inline-block" : "text-2xl font-bold text-white mb-8"}>
                        {isBrutalist ? ">> SKILL_HEURISTICS" : "Technical Proficiency"}
                    </h3>

                    <div className="space-y-6">
                        {skills.map(skill => (
                            <div key={skill.name}>
                                <div className="flex justify-between mb-2">
                                    <span className={isBrutalist ? "font-mono text-xs text-emerald-500" : "font-medium text-sm"}>
                                        {skill.name}
                                    </span>
                                    <span className="text-xs opacity-50">{isBrutalist ? `${skill.level}%` : ""}</span>
                                </div>

                                {isBrutalist ? (
                                    // Brutalist Bar (ASCII style text)
                                    <div className="font-mono text-emerald-500 tracking-widest text-xs">
                                        {skill.br}
                                    </div>
                                ) : (
                                    // Sleek Bar (Smooth CSS gradient)
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Col: Personal Stats (The Fun Stuff) */}
                <div>
                    <h3 className={isBrutalist ? "text-xl font-bold text-white mb-8 uppercase border-b border-slate-700 pb-2 inline-block" : "text-2xl font-bold text-white mb-8"}>
                        {isBrutalist ? ">> PERIPHERAL_ACTIVITIES" : "Personal Interests"}
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                        <StatCard
                            isBrutalist={isBrutalist}
                            icon={<Dumbbell />}
                            title="Bodybuilding"
                            desc="Competitive athlete. Off-season weight: 260lbs."
                            code="STR_LVL: 99"
                        />
                        <StatCard
                            isBrutalist={isBrutalist}
                            icon={<Scroll />}
                            title="Tabletop Strategy"
                            desc="Collector of Magic: The Gathering & D&D enthusiast."
                            code="INT_LVL: MAX"
                        />
                        <StatCard
                            isBrutalist={isBrutalist}
                            icon={<Briefcase />}
                            title="Professional"
                            desc="Software Developer at TIAA."
                            code="CLASS: DEV"
                        />
                        <StatCard
                            isBrutalist={isBrutalist}
                            icon={<MapPin />}
                            title="Base of Operations"
                            desc="Charlotte, North Carolina"
                            code="LOC: CLT_NC"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Component for the "Fun Stats" cards
function StatCard({ isBrutalist, icon, title, desc, code }) {
    return (
        <div className={isBrutalist
            ? "flex items-start gap-4 p-4 border border-slate-800 bg-[#0a0f14] font-mono text-sm hover:border-emerald-500 transition-colors"
            : "flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors border border-white/5"
        }>
            <div className={isBrutalist ? "text-emerald-500" : "text-blue-400"}>
                {icon}
            </div>
            <div>
                <h4 className={isBrutalist ? "font-bold text-white uppercase tracking-wider text-xs mb-1" : "font-bold text-white"}>
                    {isBrutalist ? code : title}
                </h4>
                <p className="opacity-60 text-sm">
                    {isBrutalist ? desc.toUpperCase() : desc}
                </p>
            </div>
        </div>
    );
}
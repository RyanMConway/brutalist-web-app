import PhysiqueChart from "../components/PhysiqueChart";
import GravitySkills from "../components/GravitySkills";
import HoloCard from "../components/HoloCard"; // NEW IMPORT

export default function About({ isBrutalist }) {
    return (
        <div className="max-w-7xl mx-auto pt-10">

            {/* HEADER */}
            <h1 className={isBrutalist ? "text-6xl font-mono font-bold text-white mb-12" : "text-6xl font-extrabold text-slate-800 mb-12"}>
                {isBrutalist ? ">> ENTITY: RYAN_CONWAY" : "About Me"}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* --- LEFT COLUMN: TEXT BIO & GRAVITY --- */}
                <div className="space-y-8">

                    {/* Bio Section */}
                    <div className={isBrutalist ? "border-l-4 border-emerald-500 pl-6" : "bg-white p-8 rounded-2xl shadow-lg"}>
                        <h2 className={isBrutalist ? "text-2xl text-emerald-500 font-mono mb-4" : "text-2xl font-bold text-blue-600 mb-4"}>
                            The Engineer
                        </h2>
                        <p className="leading-relaxed opacity-80 mb-4">
                            I am a Senior Software Developer at TIAA based in Charlotte, NC. My expertise lies in the intersection of
                            <span className="font-bold text-blue-400"> Application Development </span>
                            and <span className="font-bold text-purple-400"> Big Data Engineering</span>.
                        </p>
                        <p className="leading-relaxed opacity-80">
                            I specialize in building robust ETL pipelines using <span className="font-mono bg-slate-800 px-1 rounded text-white">PySpark</span> and managing large-scale infrastructure on
                            <span className="font-mono bg-slate-800 px-1 rounded ml-1 text-white">AWS (EMR, EC2)</span>.
                        </p>
                    </div>

                    <div className={isBrutalist ? "border-l-4 border-red-500 pl-6" : "bg-white p-8 rounded-2xl shadow-lg"}>
                        <h2 className={isBrutalist ? "text-2xl text-red-500 font-mono mb-4" : "text-2xl font-bold text-orange-500 mb-4"}>
                            The Competitor
                        </h2>
                        <p className="leading-relaxed opacity-80 mb-4">
                            When I'm not optimizing algorithms, I'm optimizing my physique. I am a competitive bodybuilder standing 6'0".
                        </p>
                        <p className="leading-relaxed opacity-80">
                            Bodybuilding requires the same discipline as engineering:
                            <strong> data tracking, iterative improvement, and precise execution.</strong>
                        </p>
                    </div>

                    {/* Gravity Skills Area */}
                    <div className="mt-8">
                        <GravitySkills isBrutalist={isBrutalist} />
                    </div>

                </div>

                {/* --- RIGHT COLUMN: VISUALS --- */}
                <div className="flex flex-col gap-12">

                    {/* 1. Physique Chart */}
                    <div>
                        <div className="h-[400px] w-full min-h-[400px]">
                            <PhysiqueChart isBrutalist={isBrutalist} />
                        </div>
                        <div className={`p-4 text-sm ${isBrutalist ? "text-emerald-500/60 font-mono" : "text-slate-500 italic text-center"}`}>
                            {isBrutalist
                                ? ">> FIG 2.1: DATA_CORRELATION // CALORIC_DEFICIT vs MASS_REDUCTION"
                                : "Visualizing the relationship between caloric intake and competition weight prep."}
                        </div>
                    </div>

                    {/* 2. NEW: The Strategist (Holo Card) */}
                    <div className={isBrutalist ? "border border-emerald-500/30 bg-black/40 p-8 rounded-xl" : "bg-white p-8 rounded-2xl shadow-lg"}>
                        <h3 className={`text-center mb-6 text-xl font-bold ${isBrutalist ? "text-white font-mono" : "text-slate-800"}`}>
                            {isBrutalist ? ">> MODULE: STRATEGIST" : "The Strategist"}
                        </h3>

                        <HoloCard isBrutalist={isBrutalist} />

                        <p className={`mt-6 text-center text-sm ${isBrutalist ? "text-slate-400 font-mono" : "text-slate-600"}`}>
                            "Competitive Magic: The Gathering teaches resource management and probability assessment under pressure."
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}
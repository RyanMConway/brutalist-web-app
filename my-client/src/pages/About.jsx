export default function About({ isBrutalist }) {
    return (
        <div className="pt-32 px-10 max-w-4xl mx-auto text-white h-screen">
            <h1 className={isBrutalist ? "font-mono text-4xl mb-12 uppercase" : "text-5xl font-bold mb-12"}>
                {isBrutalist ? "SPEC_SHEET" : "About Me"}
            </h1>

            <div className={isBrutalist ? "font-mono border border-white p-8 relative" : "bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl shadow-2xl"}>
                {isBrutalist && <div className="absolute -top-3 left-4 bg-[#003366] px-2 text-sm">FIG A.1</div>}

                <p className="text-lg leading-loose">
                    {isBrutalist
                        ? "ITEM: RYAN CONWAY // CLASS: DEVELOPER // LOC: CHARLOTTE, NC. SPECIALIZATION IN PYTHON, ETL, AND FULL STACK ARCHITECTURE. OPERATES MOTORCYCLES AND MANAGES SQL DATABASES."
                        : "I'm Ryan, a software developer based in Charlotte, NC. I specialize in building robust data pipelines and modern web applications. When I'm not coding, I'm likely riding my motorcycle, playing Pickleball, or organizing my Magic: The Gathering collection."}
                </p>

                <div className={`mt-8 grid grid-cols-2 gap-4 ${isBrutalist ? "border-t border-white pt-4" : ""}`}>
                    <div>
                        <span className="block text-xs opacity-50 uppercase">Location</span>
                        <span>Charlotte, NC</span>
                    </div>
                    <div>
                        <span className="block text-xs opacity-50 uppercase">Employer</span>
                        <span>TIAA</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
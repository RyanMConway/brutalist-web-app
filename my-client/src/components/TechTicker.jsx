export default function TechTicker({ isBrutalist }) {
    const stack = [
        "AWS EMR", "PySpark", "React", "Node.js", "Postgres", "Docker",
        "Kubernetes", "Terraform", "Python", "Tailwind CSS", "Next.js", "Glue"
    ];

    return (
        <div className={`w-full overflow-hidden py-4 border-y ${
            isBrutalist
                ? "bg-black border-emerald-900"
                : "bg-white/50 backdrop-blur-sm border-slate-200"
        }`}>
            {/* The Scrolling Wrapper */}
            <div className="flex w-max animate-scroll">
                {/* Double the list to create the seamless loop */}
                {[...stack, ...stack].map((item, i) => (
                    <div key={i} className={`mx-8 text-sm font-bold tracking-widest uppercase ${
                        isBrutalist ? "text-emerald-500/50 font-mono" : "text-slate-400"
                    }`}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
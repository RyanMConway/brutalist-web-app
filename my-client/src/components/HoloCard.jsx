import { useState, useRef } from "react";
import { Sparkles } from "lucide-react";

export default function HoloCard({ isBrutalist }) {
    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    // IMAGES
    const KRRIK_URL = "https://cards.scryfall.io/large/front/3/5/3592fbe4-8588-486e-99ba-c327b0b6ba24.jpg";
    const OMNATH_URL = "https://cards.scryfall.io/large/front/4/e/4e4fb50c-a81f-44d3-93c5-fa9a0b37f617.jpg";

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        const xRotation = yPct * -20;
        const yRotation = xPct * 20;

        setRotate({ x: xRotation, y: yRotation });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
        setOpacity(0);
    };

    return (
        // 1. FIX: Removed 'h-[350px]' from here.
        // We let the container grow automatically to fit the card + caption.
        <div
            className="relative w-64 mx-auto perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* 2. FIX: Added 'h-[350px]' here instead.
               Only the image container is fixed height. */}
            <div
                ref={cardRef}
                className="w-full h-[350px] rounded-xl shadow-2xl transition-transform duration-100 ease-out"
                style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    backgroundImage: `url(${isBrutalist ? KRRIK_URL : OMNATH_URL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Holo Glare Overlay */}
                <div
                    className="absolute inset-0 rounded-xl pointer-events-none mix-blend-overlay"
                    style={{
                        opacity: opacity,
                        background: `linear-gradient(
                            105deg, 
                            transparent 40%, 
                            rgba(255, 255, 255, 0.4) 45%, 
                            rgba(255, 255, 255, 0.2) 50%, 
                            transparent 54%
                        )`,
                        transform: `translateX(${rotate.y * 3}px) translateY(${rotate.x * 3}px)`,
                        transition: "opacity 0.3s ease",
                    }}
                />

                {/* Color Burn Overlay */}
                <div
                    className="absolute inset-0 rounded-xl pointer-events-none mix-blend-color-dodge"
                    style={{
                        opacity: opacity * 0.5,
                        background: `radial-gradient(circle at ${50 + rotate.y}% ${50 + rotate.x}%, rgba(255,255,255,0.3), transparent)`,
                    }}
                />

                {/* Brutalist Border Decor */}
                {isBrutalist && (
                    <div className="absolute -inset-2 border-2 border-emerald-500/30 rounded-xl pointer-events-none" style={{ transform: "translateZ(20px)" }}></div>
                )}
            </div>

            {/* 3. CAPTION: Now sits naturally in the flow, pushing subsequent content down */}
            <div className={`mt-6 text-center text-xs font-bold tracking-widest flex items-center justify-center gap-2 ${
                isBrutalist ? "text-emerald-500 font-mono" : "text-slate-500"
            }`}>
                <Sparkles size={14} />
                {isBrutalist ? ">> ENTITY: K'RRIK // PHYREXIAN_HORROR" : "Omnath, Locus of Creation"}
            </div>
        </div>
    );
}
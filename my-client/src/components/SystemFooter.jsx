import { useState, useEffect } from "react";

export default function SystemFooter({ isBrutalist }) {
    const [time, setTime] = useState(new Date());
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Update time every second
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Update mouse coordinates
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            clearInterval(timer);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    if (!isBrutalist) return null; // Don't show in Sleek mode

    return (
        // REMOVED 'fixed bottom-0 left-0'
        // This is now a static block that lives at the bottom of the Flex container
        <div className="w-full bg-[#002244] border-t border-white text-white font-mono text-xs py-1 px-4 flex justify-between uppercase tracking-widest z-50">
            {/* Left Side: System Status & Coords */}
            <div className="flex gap-4 md:gap-8">
                <span className="hidden sm:inline">SYS_STATUS: ONLINE</span>
                <span>MEM: 42%</span>
                <span>
                    X:{mousePos.x.toString().padStart(4, '0')} Y:{mousePos.y.toString().padStart(4, '0')}
                </span>
            </div>

            {/* Right Side: Location & Time */}
            <div className="flex gap-4 md:gap-8">
                <span className="hidden sm:inline">LOC: CHARLOTTE_NC</span>
                <span>UTC: {time.toISOString().split('T')[1].split('.')[0]}</span>
            </div>
        </div>
    );
}
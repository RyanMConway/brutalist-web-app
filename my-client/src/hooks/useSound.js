import { useCallback } from "react";

export default function useSound(enabled = true) {
    const playSound = useCallback((type) => {
        if (!enabled || typeof window === "undefined") return;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        // 1. HOVER (High pitch chirp - Keep as is, it works)
        if (type === "hover") {
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);

            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.start(now);
            osc.stop(now + 0.05);
        }

        // 2. CLICK (Boosted Frequency for visibility)
        else if (type === "click") {
            osc.type = "square";
            // Was 150Hz (Too low) -> Now 400Hz dropping to 100Hz
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);

            // Louder volume (0.2)
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

            osc.start(now);
            osc.stop(now + 0.1);
        }

        // 3. ON / TOGGLE (Boosted "Power Up")
        else if (type === "on") {
            osc.type = "sawtooth";
            // Was 100Hz -> Now 200Hz sweeping up to 800Hz
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);

            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

            osc.start(now);
            osc.stop(now + 0.3);
        }

    }, [enabled]);

    return playSound;
}
import { useEffect, useState } from "react";

export function useKonamiCode() {
    const [triggered, setTriggered] = useState(false);

    // The Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiCode = [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
        "b", "a"
    ];

    useEffect(() => {
        let cursor = 0;

        const handleKeyDown = (e) => {
            // Check if the key pressed matches the current expected key
            if (e.key === konamiCode[cursor]) {
                cursor++;

                // If the full sequence is entered
                if (cursor === konamiCode.length) {
                    setTriggered(true);
                    cursor = 0; // Reset
                }
            } else {
                cursor = 0; // Reset if they mess up
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return triggered;
}
import { useState, useEffect } from 'react';

export default function HackerText({ text, isBrutalist }) {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

    const scramble = () => {
        if (!isBrutalist) return; // Only run in Brutalist mode

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3; // Speed of decoding
        }, 30);
    };

    // Reset text when prop changes or mode switches
    useEffect(() => {
        setDisplay(text);
    }, [text, isBrutalist]);

    return (
        <span
            onMouseEnter={scramble}
            className="inline-block cursor-pointer"
        >
            {display}
        </span>
    );
}
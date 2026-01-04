import { motion } from "framer-motion";

const variants = {
    initial: {
        opacity: 0,
        filter: "blur(4px)" // Slight blur like a monitor focusing
    },
    animate: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            delay: 0.2, // Wait for the "Line" phase to finish before showing text
            duration: 0.3
        }
    },
    exit: {
        opacity: 0,
        filter: "blur(4px)",
        transition: { duration: 0.1 }
    }
};

export default function PageTransition({ children }) {
    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
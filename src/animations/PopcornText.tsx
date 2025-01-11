import { motion } from "framer-motion";

function getDelay(index: number) {
  const mod = (index + 1) % 4;
  switch (mod) {
    case 1: // => nth-child(4n+1)
      return 0.2;
    case 2: // => nth-child(4n+2)
      return 0.6;
    case 3: // => nth-child(4n+3)
      return 0.4;
    default: // => nth-child(4n) i.e. mod=0
      return 0;
  }
}

export default function PopcornText({ text }: { text: string }) {
  const letters = text.split("");

  return (
    <div className="whitespace-pre">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: "0.5em" }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
              ease: "easeInOut",
              delay: getDelay(index),
            },
          }}
          // Ensure each letter animates independently
          style={{ display: "inline-block" }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}

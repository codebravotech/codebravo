import cx from "classnames";
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

export default function PopcornText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <div className={cx("flex w-full flex-row flex-wrap")}>
      {words.map((word, wordIndex) => {
        const letters = word.split("");

        return (
          <span>
            {letters.map((letter, index) => (
              <motion.span
                // Ensure each letter animates independently
                className={cx("inline", className)}
                key={`${word}_${letter}_${index}`}
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
              >
                {letter}
                {index === word.length - 1 &&
                  wordIndex !== words.length - 1 &&
                  "\u00A0"}
              </motion.span>
            ))}
          </span>
        );
      })}
    </div>
  );
}

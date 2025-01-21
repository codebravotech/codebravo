import {
  AnimatePresence,
  motion,
  useAnimate,
  usePresence,
} from "framer-motion";
import { useEffect } from "react";

import CtaButton from "../components/CtaButton";

export default function NotFound() {
  const [scope, animate] = useAnimate();

  const [isPresent, safeToRemove] = usePresence();
  const initial = { x: "100%", rotate: 30 };

  useEffect(() => {
    if (isPresent) {
      const entryAnimation = async () => {
        animate(
          scope.current,
          { x: 0, rotate: 0 },
          { duration: 1.5, ease: [0.1, 1, 0.3, 1] },
        );
      };
      entryAnimation();
    } else if (!isPresent) {
      const exitAnimation = async () => {
        const rect = scope.current?.getBoundingClientRect();
        const width = rect.width;
        await animate(
          scope.current,
          { x: -1.5 * (width ? width : 1000), rotate: 30 },
          {
            x: {
              duration: 1.2,
              ease: [0.7, 0, 1, 0.5],
            },
            rotate: { duration: 0.5, ease: "easeOut" },
          },
        );

        setTimeout(() => {
          safeToRemove();
        }, 200);
      };
      exitAnimation();
    }
  }, [isPresent]);

  return (
    <motion.div className="bg-trash-panda-100 flex h-screen w-screen flex-col items-center justify-center overflow-clip scrollbar-hide">
      <div className="flex flex-col items-start justify-center">
        <div className="text-trash-panda-button font-fjalla text-xl">
          Oops! You seem to be lost...
        </div>

        <AnimatePresence>
          <motion.img
            ref={scope}
            initial={initial}
            className="my-8 max-h-[50%]"
            src="/images/moto_trash_panda.png"
          />
        </AnimatePresence>

        <CtaButton
          url={"/"}
          variant="trash_panda"
          className="self-end text-3xl"
        >
          Follow me home!
        </CtaButton>
      </div>
    </motion.div>
  );
}

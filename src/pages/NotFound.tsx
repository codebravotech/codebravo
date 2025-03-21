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
    <motion.div className="flex h-screen w-screen flex-col items-center justify-center overflow-clip bg-trash-panda-100 scrollbar-hide">
      <div className="width-screen absolute bottom-0 left-0 right-0 top-[30%] z-0 flex w-screen justify-center overflow-clip font-fjalla text-[15rem] text-night-300 opacity-70 lg:top-8 lg:text-[30rem]">
        404
      </div>
      <div className="z-10 flex flex-col items-start justify-center">
        <div className="font-fjalla text-xl text-trash-panda-button">
          Oops! You seem to be lost...
        </div>

        <AnimatePresence>
          <motion.img
            ref={scope}
            initial={initial}
            className="my-6 max-h-[50%]"
            src="/images/moto_trash_panda.png"
          />
        </AnimatePresence>

        <CtaButton
          url={"/"}
          variant="trash_panda"
          className="self-end text-3xl lg:self-end"
        >
          Follow me home!
        </CtaButton>
      </div>
    </motion.div>
  );
}

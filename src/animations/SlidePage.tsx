// ADD THIS TO A SCREEN SIZED COMPONENT THAT RENDERS PROJECTS!

// const [scope, animate] = useAnimate();
// const [isPresent, safeToRemove] = usePresence();
// initial={{ x: "-100%", scale: 0.8, height: "100vh" }}

// useEffect(() => {
//   if (isPresent) {
//     const entryAnimation = async () => {
//       await animate(scope.current, { x: 0 }, { duration: 0.4 });
//       await animate(scope.current, { scale: 1 }, { duration: 0.4 });
//       await animate(scope.current, { height: "auto" }, { duration: 0 });
//     };
//     entryAnimation();
//   } else if (!isPresent) {
//     const exitAnimation = async () => {
//       safeToRemove();
//       // await animate(scope.current, { height: "100vh" }, { duration: 0 });
//       // await animate(scope.current, { x: "100%" }, { duration: 0.3 });
//       // await animate(scope.current, { scale: 0.8 }, { duration: 0.6 });
//     };
//     exitAnimation();
//   }
// }, [isPresent]);

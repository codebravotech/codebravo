// const LayoutContainer = () => {
//   const { pathname } = useLocation();
//   const { isMobile } = useDisplay();
//   const isHomePage = pathname === "/";
//   const tooltipClassname =
//     "mt-2 z-50 rounded-xl bg-opacity-50 px-2 py-1 font-raleway text-xs bg-night-100 text-stars-100";
// const [scope, animate] = useAnimate();
// const [isPresent, safeToRemove] = usePresence();

// useEffect(() => {
//   animate(scope.current, { opacity: 1 }, { duration: 2 });

//   // const runAnimations = () => {
//   // animate(scope.current, { x: 0 }, { duration: 1 });
//   // animate(scope.current, { scale: 1 }, { duration: 1 });
//   // animate(scope.current, { height: "auto", duration: 1 });
//   // };

//   // return () => {
//   //   animate(scope.current, { x: 0 }, { duration: 1 });
//   // };
// }, [pathname]);

// useEffect(() => {
//   console.log("IS PRESENT!", isPresent);
//   if (!isPresent) {
//     animate(scope.current, { opacity: 0 }, { duration: 4 });
//     safeToRemove();
//   }
// }, [isPresent]);

//   return (
//     <div
//       // ref={scope}
//       // key={pathname}
//       // initial={{ opacity: 0 }}
//       // initial={{ x: "-100%", scale: 0.8, height: "100vh" }}

//       className="relative flex min-h-screen w-[100vw] flex-col overflow-x-hidden overflow-y-scroll bg-stars-100 scrollbar-hide"
//     >
//       {/* <Header isHomePage={isHomePage} /> */}
//       <Header isHomePage={false} />
//       <AnimatePresence>
//         <Layout key={`layout_${pathname}`} />
//       </AnimatePresence>

//       <div className={cx("mt-auto", isMobile && !isHomePage && "mb-32")}>
//         <Footer isHomePage={isHomePage} />
//       </div>

//       {isMobile && <MobileMenu isHomePage={isHomePage} />}

//       <Tooltip
//         id="mailto_link_tooltip"
//         arrowColor="transparent"
//         className={cx(tooltipClassname)}
//         disableStyleInjection={true}
//       />
//       <Tooltip
//         id="copy_email_tooltip"
//         arrowColor="transparent"
//         className={cx(tooltipClassname)}
//         disableStyleInjection={true}
//       />
//       <Tooltip
//         id="visit_special_links_tooltip"
//         arrowColor="transparent"
//         className={cx(tooltipClassname)}
//         disableStyleInjection={true}
//       />
//     </motion.div>
//   );
// };

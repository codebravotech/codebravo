// import cx from "classnames";
// import { motion } from "framer-motion";
// // import { useCallback, useEffect, useRef, useState } from "react";
// import { useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// import { useProjectThumbnail, useProjectVideo } from "../hooks/documents";
// // import { useSystemStore } from "../state/system";
// import { ModalAnimationPhase, ProjectDocument } from "../types/components";
// import { animationPhaseIn } from "../utils/animation";
// import CtaButton from "./CtaButton";
// import Footer from "./Footer";
// // import Header from "./Header";
// import Icon from "./Icon";
// import PortableTextRegular from "./PortableTextRegular";
// import ProjectModalBody from "./ProjectModalBody";
// import VideoComponent from "./VideoComponent";

// export default function ProjectModalContents({
//   project,
//   animationPhase,
//   setAnimationPhase,
//   roundingClass,
// }: {
//   project: ProjectDocument;
//   animationPhase: ModalAnimationPhase;
//   setAnimationPhase: (animationPhase: ModalAnimationPhase) => void;
//   roundingClass: string;
// }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const heroContainerRef = useRef<HTMLDivElement>(null);
//   const modalOpen = animationPhase === "MODAL_OPEN";
//   const roundingClassConditional = !modalOpen ? roundingClass : "";
//   const contentPadding = 20;
//   const swapTransitionDuration = 0.5;
//   const headerOffset =
//     (headerRef?.current?.getBoundingClientRect()?.height || 0) + contentPadding;
//   const heroHeight =
//     heroContainerRef?.current?.getBoundingClientRect().height || 0;

//   // Animate out
//   const handleClose = async () => {
//     // const handleClose = useCallback(async () => {
//     if (modalOpen) {
//       if (searchParams.get("project")) {
//         searchParams.delete("project");
//         setSearchParams(searchParams);
//       }

//       // STEP 4: MODAL CONTENTS START TO DO EXIT ANIMATION
//       setAnimationPhase("MODAL_CONTENTS_EXITING");
//     }
//   };

//   // [
//   //   searchParams,
//   //   modalOpen,
//   //   setSearchParams,
//   //   setAnimationPhase,
//   // ]);

//   // useEffect(() => {
//   //   window.addEventListener("popstate", handleClose);

//   //   return () => {
//   //     window.removeEventListener("popstate", handleClose);
//   //   };
//   // }, [handleClose]);

//   const { _id, header, private: isPrivate, project_link } = project;
//   const video = useProjectVideo(project);
//   const thumbnail = useProjectThumbnail(project);

//   const thumbnailUrl = thumbnail?.asset?.url;
//   const alt = thumbnail?.alt;

//   return (
//     <motion.div
//       className={cx(
//         "absolute bottom-0 left-0 right-0 top-0 overflow-y-scroll bg-night-gradient scrollbar-hide",
//         // overscroll-none
//         !animationPhaseIn(
//           ["MODAL_CONTENTS_ENTERING", "MODAL_CONTENTS_EXITING", "MODAL_OPEN"],
//           animationPhase,
//         ) && roundingClass,
//       )}
//     >
//       {/* Site header and page header */}
//       <motion.div
//         ref={headerRef}
//         initial={{ opacity: 0 }}
//         variants={{
//           visible: { opacity: 1, transition: { duration: 1 } },
//           hidden: { opacity: 0, transition: { duration: 0.2 } },
//         }}
//         animate={modalOpen ? "visible" : "hidden"}
//         className={cx("relative z-20")}
//       >
//         {/* <Header
//           isHomePage={false}
//           isPortfolio={true}
//           clickedCurrentRoute={handleClose}
//         /> */}
//         <div className="relative flex justify-center px-10 lg:px-0">
//           <div className="underline-drawn relative flex items-center text-center font-fjalla text-5xl">
//             <PortableTextRegular content={header} />
//           </div>
//           <div className="ml-4 flex flex-col justify-center text-stars-100 hover:scale-150">
//             <Icon className="h-6 w-6" icon="back" onClick={handleClose} />
//           </div>
//         </div>
//       </motion.div>
//       {/* Invisible video to start load while animation is running */}
//       {video && !videoLoaded && (
//         <VideoComponent
//           id={`project_${_id}_loader_video`}
//           src={video?.asset?.url}
//           className={cx("absolute hidden")}
//           onLoadedData={() => setVideoLoaded(true)}
//         />
//       )}
//       {/* Video/image header that fills the card during animate and sits at the top of the modal page when animation is done*/}
//       <motion.div
//         key={`project_${_id}_no_video_thumbnail`}
//         className={cx(
//           "absolute bottom-0 left-0 right-0 top-0 h-full w-full",
//           roundingClassConditional,
//         )}
//         initial={{ y: 0 }}
//         variants={{
//           modalOpen: {
//             y: headerOffset,
//           },
//           modalClosed: { y: 0 },
//         }}
//         animate={
//           animationPhaseIn(
//             ["MODAL_CONTENTS_ENTERING", "MODAL_OPEN"],
//             animationPhase,
//           )
//             ? "modalOpen"
//             : "modalClosed"
//         }
//         onAnimationComplete={() => {
//           if (animationPhase === "MODAL_CONTENTS_ENTERING") {
//             setAnimationPhase("MODAL_OPEN");
//           }
//           if (animationPhase === "MODAL_CONTENTS_EXITING") {
//             setAnimationPhase("CARD_SCALING_CLOSED");
//           }
//         }}
//         transition={{ duration: swapTransitionDuration, ease: "easeOut" }}
//       >
//         <motion.div
//           ref={heroContainerRef}
//           key={`project_${_id}_modal_header_video`}
//           className="h-screen"
//           variants={{
//             visible: {
//               opacity: 1,
//               transition: { duration: swapTransitionDuration },
//             },
//             hidden: {
//               opacity: 0,
//               transition: { duration: swapTransitionDuration },
//             },
//           }}
//           animate={video && modalOpen ? "visible" : "hidden"}
//         >
//           {video && (
//             <VideoComponent
//               id={`project_${_id}_loader_video`}
//               src={video?.asset?.url}
//               className={cx(
//                 roundingClassConditional,
//                 "absolute bottom-0 left-0 right-0 top-0 z-10 h-full w-full",
//               )}
//               onLoadedData={() => null}
//             />
//           )}
//         </motion.div>
//         <motion.img
//           key={`project_${_id}_modal_header_img`}
//           src={`${thumbnailUrl}?w=${innerWidth}&fit=clip&auto=format`}
//           alt={alt}
//           className={cx(
//             "absolute bottom-0 left-0 right-0 top-0 z-20 h-full w-full",
//           )}
//           variants={{
//             visible: {
//               opacity: 1,
//               filter: "blur(0px)",
//               transition: { duration: modalOpen ? swapTransitionDuration : 0 },
//             },
//             hidden: {
//               opacity: 0,
//               filter: "blur(10px)",
//               transition: { duration: swapTransitionDuration },
//               zIndex: -1,
//             },
//           }}
//           animate={!video || !modalOpen ? "visible" : "hidden"}
//         />
//         {!isPrivate && project_link?.url && modalOpen && (
//           <div
//             className="absolute z-30 flex w-full justify-center"
//             style={{
//               top: (heroHeight || 0) - 80,
//             }}
//           >
//             <div className="glass-menu relative rounded-full">
//               <CtaButton variant="white_night" url={project_link?.url || ""}>
//                 {project_link?.label || "Launch Site"}
//               </CtaButton>
//             </div>
//           </div>
//         )}
//       </motion.div>
//       {modalOpen && (
//         <>
//           <ProjectModalBody
//             project={project}
//             offset={heroHeight + contentPadding + 70}
//             handleClose={handleClose}
//             animationPhase={animationPhase}
//           />
//           <Footer />
//         </>
//       )}
//     </motion.div>
//   );
// }

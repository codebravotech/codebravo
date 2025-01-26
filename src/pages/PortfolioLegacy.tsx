// // import cx from "classnames";
// // import { motion } from "framer-motion";
// import { get } from "lodash";
// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// // import PortableTextPopcorn from "../components/PortableTextPopcorn";
// // import ProjectCard from "../components/ProjectCard";
// // import ProjectModal from "../components/ProjectModal";
// import { useAuthorizedQuery, usePublicQuery } from "../hooks/api";
// // import { useDisplay } from "../hooks/display";
// // import { useSystemStore } from "../state/system";
// import { PortfolioPageDocument } from "../types/components";

// export default function Portfolio() {
//   // const { openProjectId, setOpenProjectId, clickedCardBoundingBox } =
//   // useSystemStore();

//   const [searchParams] = useSearchParams();
//   // const { isDesktopOrLaptop } = useDisplay();

//   const { documents: authorizedDocuments = [] } =
//     useAuthorizedQuery<PortfolioPageDocument>("portfolio_authorized");
//   const { documents = [] } =
//     usePublicQuery<PortfolioPageDocument>("portfolio_public");

//   const publicPage = get(documents, "[0]");
//   const authorizedPage = get(authorizedDocuments, "[0]");
//   const page = authorizedPage || publicPage || {};
//   // const header = get(page, "header", []);
//   const projects = get(page, "projects", []);

//   useEffect(() => {
//     if (!searchParams.get("project")) {
//       // setOpenProjectId(null);
//     }
//   }, []);

//   if (!(projects?.length > 0)) {
//     return null;
//   }
//   // const openProject = projects.find(
//   //   (project) =>
//   //     project?.slug?.current === openProjectId ||
//   //     project?._id === openProjectId,
//   // );

//   return (
//     <div className="h3 flex justify-center">
//       Page temporarily offline for maintenance
//     </div>
//   );

//   //   return (
//   //     <motion.div
//   //       className={cx(
//   //         "relative flex h-full w-full flex-col items-center bg-red-200",
//   //       )}
//   //       layoutScroll
//   //       style={{ overflow: "scroll" }}
//   //     >
//   //       <div className="highlighter-underline relative mb-10">
//   //         <PortableTextPopcorn content={header} />
//   //       </div>

//   //       {openProject && clickedCardBoundingBox && (
//   //         <ProjectModal project={openProject} />
//   //       )}

//   //       {projects.length > 0 && (
//   //         <div
//   //           className={cx(
//   //             "mb-4 flex w-full flex-wrap justify-center gap-6 px-4",
//   //             isDesktopOrLaptop ? "flex-row" : "flex-col",
//   //           )}
//   //         >
//   //           {projects.map((project, index) => {
//   //             return (
//   //               <ProjectCard
//   //                 project={project}
//   //                 key={`project_card_${project?._id}`}
//   //                 index={index}
//   //               />
//   //             );
//   //           })}
//   //         </div>
//   //       )}
//   //     </motion.div>
//   //   );
// }

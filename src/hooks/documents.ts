import { ProjectDocument } from "../types/components";
import { useDisplay } from "./display";

export const useProjectThumbnail = (project: ProjectDocument) => {
  const { isPortrait } = useDisplay();
  const thumbnails = project?.thumbnails || [];

  return (
    thumbnails.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || thumbnails.find((elem) => elem.asset.url)
  );
};
export const useProjectVideo = (project: ProjectDocument) => {
  const { isPortrait } = useDisplay();
  const videos = project?.videos || [];

  return (
    videos.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || videos.find((elem) => elem.asset.url)
  );
};

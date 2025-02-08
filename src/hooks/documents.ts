import { ContentObject, ProjectDocument } from "../types/components";
import { useDisplay } from "./display";

export const useProjectThumbnail = (project: ProjectDocument | undefined) => {
  const { isPortrait } = useDisplay();

  if (!project) {
    return undefined;
  }

  const thumbnails = project?.thumbnails || [];

  return (
    thumbnails.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || thumbnails.find((elem) => elem.asset.url)
  );
};
export const useProjectVideo = (project: ProjectDocument | undefined) => {
  const { isPortrait } = useDisplay();
  if (!project) {
    return undefined;
  }
  const videos = project?.videos || [];

  return (
    videos.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || videos.find((elem) => elem.asset.url)
  );
};

export const useContentBlockImage = (content_block: ContentObject) => {
  const { isPortrait } = useDisplay();
  const images = content_block?.images || [];

  return (
    images.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || images.find((elem) => elem.asset.url)
  );
};
export const useContentBlockVideo = (content_block: ContentObject) => {
  const { isPortrait } = useDisplay();
  const videos = content_block?.videos || [];

  return (
    videos.find(
      (elem) => elem.orientation === (isPortrait ? "portrait" : "landscape"),
    ) || videos.find((elem) => elem.asset.url)
  );
};

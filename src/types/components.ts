import {
  Content_block,
  Project,
  SanityFileAsset,
  SanityImageAsset,
} from "./sanity.types";

export type ValidRoutes = "/expertise" | "/connect" | "/" | "/portfolio";
export type IconType =
  | "about"
  | "clipboard"
  | "connect"
  | "home"
  | "portfolio"
  | "refresh";
export type SanityQueryParams = Record<
  string,
  string | number | boolean | null | (string | number | boolean | null)[]
>;

export type Orientation = "landscape" | "portrait";

export type PostResult = "SUCCESS" | "ERROR" | null;
export type ModalAnimationPhase =
  | "MODAL_CLOSED"
  | "CARD_SCALING_OPEN"
  | "MODAL_CONTENTS_ENTERING"
  | "MODAL_CONTENTS_EXITING"
  | "CARD_SCALING_CLOSED"
  | "MODAL_OPEN";

export interface NavOptions {
  label: string;
  pathname: ValidRoutes;
  icon: IconType;
  short_label: string;
}

export interface VideoRefResolved {
  asset: SanityFileAsset;
  orientation: Orientation;
}

export interface ImageRefResolved {
  asset: SanityImageAsset;
  alt: string;
  orientation?: Orientation;
}

export interface FileRefResolved {
  asset: SanityFileAsset;
}

export interface ProjectObject
  extends Omit<Project, "thumbnails" | "videos" | "client_logo"> {
  thumbnails: ImageRefResolved[];
  client_logo: ImageRefResolved;
  videos: VideoRefResolved[];
}

export interface PdfRefResolved {
  label: string;
  file: FileRefResolved;
}

export interface ContentObject
  extends Omit<Content_block, "image" | "file_link"> {
  _key: string;
  image: ImageRefResolved;
  file_link: PdfRefResolved;
}

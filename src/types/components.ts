import { PortableTextBlock } from "@portabletext/types";

import {
  About_page,
  Connect_page,
  Content_block,
  Home_page,
  Partner,
  Portfolio_page,
  Project,
  SanityFileAsset,
  SanityImageAsset,
  Technology_tool,
} from "./sanity.types";

export type JsonObject = {
  // eslint-disable-next-line
  [key: string]: any;
};

export type ValidRoutes = "/expertise" | "/connect" | "/" | "/portfolio";
export type IconType =
  | "about"
  | "back"
  | "clipboard"
  | "connect"
  | "home"
  | "lock"
  | "portfolio"
  | "refresh"
  | "unlock";

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

export interface HomePageDocument extends Omit<Home_page, "tagline"> {
  tagline: PortableTextBlock[];
}
export interface ExpertisePageDocument
  extends Omit<About_page, "content_blocks"> {
  content_blocks: ContentObject[];
}

export interface ConnectPageDocument
  extends Omit<
    Connect_page,
    | "copy"
    | "form_header"
    | "profile_link"
    | "email_link"
    | "copy_private_projects"
  > {
  copy: PortableTextBlock[];
  form_header: PortableTextBlock[];
  profile_link: PortableTextBlock[];
  email_link: PortableTextBlock[];
  copy_private_projects: PortableTextBlock[];
}
export interface PortfolioPageDocument
  extends Omit<
    Portfolio_page,
    "header" | "private_header" | "public_header" | "projects"
  > {
  header: PortableTextBlock[];
  private_header: PortableTextBlock[];
  public_header: PortableTextBlock[];
  projects: ProjectDocument[];
}

export interface VideoRefResolved {
  asset: SanityFileAsset;
  orientation?: Orientation;
  playback_speed?: number;
}

export interface ImageRefResolved {
  asset: SanityImageAsset;
  alt: string;
  orientation?: Orientation;
}

export interface FileRefResolved {
  asset: SanityFileAsset;
}

export interface PartnerObject {
  partner_role: string;
  partner: Partner;
}

export interface TechnologyToolObject {
  used_for: string;
  technology_tool: Technology_tool;
}

export interface ProjectDocument
  extends Omit<
    Project,
    | "header"
    | "description"
    | "thumbnails"
    | "videos"
    | "client_logo"
    | "partners"
    | "technology_tools"
    | "private_project_summary"
    | "public_content_blocks"
    | "final_cta"
  > {
  header: PortableTextBlock[];
  description: PortableTextBlock[];
  thumbnails: ImageRefResolved[];
  client_logo: ImageRefResolved;
  videos: VideoRefResolved[];
  partners: PartnerObject[];
  technology_tools: TechnologyToolObject[];
  private_project_summary: PortableTextBlock[];
  public_content_blocks: ContentObject[];
  final_cta: PortableTextBlock[];
}

export interface PdfRefResolved {
  label: string;
  file: FileRefResolved;
}

export interface ContentObject
  extends Omit<Content_block, "images" | "videos" | "file_link" | "copy"> {
  _key: string;
  images?: ImageRefResolved[];
  videos?: VideoRefResolved[];
  file_link?: PdfRefResolved;
  copy?: PortableTextBlock[];
}

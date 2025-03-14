import cx from "classnames";
import { easeOut, motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ArriveDirectionally from "../animations/ArriveDirectionally";
import ContactForm from "../components/ContactForm";
import PortableTextRegular from "../components/PortableTextRegular";
import { INQUIRIES } from "../config";
import { usePublicQuery } from "../hooks/api";
import { useDisplay } from "../hooks/display";
import { ConnectPageDocument, PostResult } from "../types/components";

export default function Connect() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [postResult, setPostResult] = useState<PostResult>(null);
  const { isMobile } = useDisplay();
  const { documents = [] } = usePublicQuery<ConnectPageDocument>("connect");
  const [searchParams] = useSearchParams();
  const inquiryParam = searchParams.get("inquiry");
  const inquiringLocked = inquiryParam === INQUIRIES.locked_projects;
  const connectPage = documents[0];

  if (!connectPage) {
    return null;
  }

  const {
    copy = [],
    copy_private_projects = [],
    email_link,
    profile_link,
    form_header = [],
    name_placeholder = "Your Name",
    email_placeholder = "Your Email",
    message_placeholder = "Your Message",
    message_placeholder_private_projects = "",
  } = connectPage;

  const conditionalViz = postResult ? "invisible" : "";

  return (
    <motion.div>
      <div className="mb-10 mt-4 flex w-full flex-col gap-4 overflow-x-hidden bg-stars-100 px-4 pt-4 lg:flex-row lg:gap-10 lg:overflow-hidden lg:pl-6 lg:pr-10">
        <ArriveDirectionally
          keyBy={"contact_form_copy"}
          className={cx(
            "mb-2 flex flex-col items-start gap-4 text-2xl leading-snug lg:basis-1/2 lg:items-center lg:gap-10 lg:text-3xl lg:leading-snug",
          )}
        >
          <div>
            <div className={cx(conditionalViz)}>
              <PortableTextRegular content={copy} />
            </div>

            <div
              className={cx(
                conditionalViz,
                "flex flex-col gap-2 lg:flex-row lg:gap-0",
              )}
            >
              <PortableTextRegular
                icon_color="expanse-100"
                content={email_link}
                message_placeholder_private_projects={
                  message_placeholder_private_projects
                }
              />
              <PortableTextRegular content={profile_link} />
            </div>
            {inquiringLocked && (
              <div className="my-10 text-lg lg:my-auto">
                <PortableTextRegular content={copy_private_projects} />
              </div>
            )}
          </div>
        </ArriveDirectionally>
        <ArriveDirectionally
          keyBy={"contact_form_inputs"}
          className={cx("flex flex-col gap-4 lg:basis-1/2 lg:gap-10")}
        >
          <div
            className={cx(
              conditionalViz,
              "-mt-1 text-2xl leading-snug lg:text-3xl lg:leading-snug",
            )}
          >
            <PortableTextRegular content={form_header} />
          </div>
          <motion.div
            variants={{
              normal: isMobile ? { y: 0 } : { x: 0 },
              centered: isMobile ? { y: "23vh" } : { x: "-23vw" },
            }}
            transition={{ duration: 0.5, ease: easeOut }}
            animate={postResult ? "centered" : "normal"}
          >
            <ContactForm
              submitting={submitting}
              setSubmitting={setSubmitting}
              postResult={postResult}
              setPostResult={setPostResult}
              name_placeholder={name_placeholder}
              email_placeholder={email_placeholder}
              message_placeholder={
                inquiringLocked
                  ? message_placeholder_private_projects
                  : message_placeholder
              }
              message_prefill={
                inquiringLocked
                  ? message_placeholder_private_projects
                  : undefined
              }
              email_link={email_link}
            />
          </motion.div>
        </ArriveDirectionally>
      </div>
    </motion.div>
  );
}

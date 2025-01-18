import { PortableTextBlock } from "@portabletext/types";
import cx from "classnames";
import { easeOut, motion } from "framer-motion";
import { useState } from "react";

import ArriveDirectionally from "../animations/ArriveDirectionally";
import ContactForm from "../components/ContactForm";
import PortableTextRegular from "../components/PortableTextRegular";
import { useDisplay } from "../hooks/display";
import { useSingleton } from "../hooks/sanity";
import { PostResult } from "../types/components";
import { Connect_page } from "../types/sanity.types";

export default function Connect() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [postResult, setPostResult] = useState<PostResult>(null);
  const { isMobile } = useDisplay();
  const { singleton } = useSingleton("connect_page");
  const connectPage = singleton as Connect_page;

  if (!connectPage) {
    return null;
  }

  const {
    copy = [],
    email_link = [],
    profile_link = [],
    form_header = [],
    name_placeholder = "Your Name",
    email_placeholder = "Your Email",
    message_placeholder = "Your Message",
  } = connectPage as {
    copy: PortableTextBlock[];
    email_link: PortableTextBlock[];
    profile_link: PortableTextBlock[];
    form_header: PortableTextBlock[];
    name_placeholder: string;
    email_placeholder: string;
    message_placeholder: string;
  };

  const conditionalViz = postResult ? "invisible" : "";

  // return <div>Connect</div>;

  return (
    <motion.div className="mb-10 mt-4 flex w-full flex-col-reverse gap-4 px-4 pt-4 lg:h-full lg:flex-row lg:gap-10 lg:pl-6 lg:pr-10">
      <ArriveDirectionally
        // keyBy={"contact_form_copy"}
        className="mb-2 flex flex-col gap-4 text-2xl leading-snug lg:basis-1/2 lg:gap-10 lg:text-3xl lg:leading-snug"
      >
        <div className={cx(conditionalViz)}>
          <PortableTextRegular content={copy} />
        </div>
        <div
          className={cx(
            conditionalViz,
            "flex flex-col gap-2 lg:flex-row lg:gap-0",
          )}
        >
          <PortableTextRegular icon_color="expanse-100" content={email_link} />
          <PortableTextRegular content={profile_link} />
        </div>
      </ArriveDirectionally>
      <ArriveDirectionally
        // keyBy={"contact_form_inputs"}
        className="flex flex-col gap-4 lg:basis-1/2 lg:gap-10"
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
            message_placeholder={message_placeholder}
            email_link={email_link}
          />
        </motion.div>
      </ArriveDirectionally>
    </motion.div>
  );
}

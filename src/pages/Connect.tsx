import { PortableTextBlock } from "@portabletext/types";
import { motion } from "framer-motion";

import ArriveUpwards from "../animations/ArriveUpwards";
import ContactUs from "../components/ContactUs";
import PortableTextRegular from "../components/PortableTextRegular";
import { useSingleton } from "../hooks/sanity";
import { Connect_page } from "../types/sanity.types";

export default function Connect() {
  const { singleton } = useSingleton("connect_page");
  const connectPage = singleton as Connect_page;

  if (!connectPage) {
    return null;
  }

  const {
    copy = [],
    form_header = [],
    name_placeholder = "Your Name",
    email_placeholder = "Your Email",
    message_placeholder = "Your Message",
  } = connectPage;
  return (
    <motion.div className="mb-10 flex h-full w-full flex-col-reverse gap-10 px-6 pt-4 lg:flex-row">
      <ArriveUpwards
        keyBy={"contact_form_copy"}
        className="mb-2 basis-1/2 text-2xl leading-snug lg:text-3xl"
      >
        <PortableTextRegular content={copy as PortableTextBlock[]} />
      </ArriveUpwards>
      <ArriveUpwards
        keyBy={"contact_form_inputs"}
        className="flex basis-1/2 flex-col"
      >
        <div className="mb-2 text-2xl leading-snug lg:text-3xl">
          <PortableTextRegular content={form_header as PortableTextBlock[]} />
        </div>
        <ContactUs
          name_placeholder={name_placeholder}
          email_placeholder={email_placeholder}
          message_placeholder={message_placeholder}
        />
      </ArriveUpwards>
    </motion.div>
  );
}

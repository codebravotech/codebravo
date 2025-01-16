import cx from "classnames";
import DOMPurify from "dompurify";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { WEB3_FORMS_KEY } from "../config";

export interface ContactFormBody {
  email: string;
  full_name: string;
  message: string;
}

export default function ContactUs({
  name_placeholder,
  email_placeholder,
  message_placeholder,
}: {
  name_placeholder: string;
  email_placeholder: string;
  message_placeholder: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormBody>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [postResult, setPostResult] = useState<"SUCCESS" | "ERROR" | null>(
    null,
  );

  const onSubmit: SubmitHandler<ContactFormBody> = async (data) => {
    try {
      setSubmitting(true);
      const email = DOMPurify.sanitize(data.email || "", {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      });
      const full_name = DOMPurify.sanitize(data.full_name || "", {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      });
      const message = DOMPurify.sanitize(data.message || "", {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      });

      const formData = new FormData();
      const payload = { email, full_name, message };
      Object.keys(payload).forEach((key: string) => {
        const typedKey = key as keyof typeof payload; // Assert `key` as a key of `payload`
        const value = payload[typedKey];
        return formData.append(key, value.toString());
      });
      formData.append("access_key", WEB3_FORMS_KEY);

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      setSubmitting(false);
      setPostResult("SUCCESS");
    } catch (error) {
      setSubmitting(false);
      setPostResult("ERROR");
      return error;
    }
  };

  if (postResult) {
    if (postResult === "SUCCESS") {
      return (
        <div className="w-full rounded-3xl bg-dune-100 p-5 text-stars-100">
          Thanks for reaching out! <br /> We'll be in touch soon.
        </div>
      );
    } else if (postResult === "ERROR") {
      return (
        <div className="w-full rounded-3xl bg-red-200 p-5 text-night-300">
          Something went wrong, please try again later.
        </div>
      );
    }
  }

  const inputClasses =
    "rounded-3xl bg-dune-100 text-night-300 placeholder-stars-100 bg-opacity-95 py-5 pl-5 pr-2 text-md lg:text-lg";
  const errorClass = "text-red-800";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cx(submitting && "opacity-50")}
    >
      <div className="body_lg flex flex-col gap-3">
        {errors.full_name && (
          <div className={errorClass}>
            {errors?.full_name?.message?.toString()}
          </div>
        )}
        {/* <div>Preferred Name</div> */}
        <input
          disabled={submitting}
          className={cx("h-10 w-full", inputClasses)}
          placeholder={name_placeholder}
          {...register("full_name", {
            required: "Required",
          })}
        />
        {errors.email && (
          <div className={errorClass}>{errors?.email?.message?.toString()}</div>
        )}
        {/* <div>Email</div> */}
        <input
          disabled={submitting}
          className={cx("h-10 w-full", inputClasses)}
          placeholder={email_placeholder}
          {...register("email", {
            required: "Required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
        />
        {errors.message && (
          <div className={errorClass}>
            {errors?.message?.message?.toString()}
          </div>
        )}
        <div className="relative">
          <textarea
            disabled={submitting}
            className={cx(
              "h-72 w-full resize-none pr-4 scrollbar-hide",
              inputClasses,
            )}
            placeholder={message_placeholder}
            {...register("message", {
              required: "Required",
            })}
          />
          <div
            className={cx("absolute bottom-4 right-4", submitting && "hidden")}
          >
            <button
              className="rounded-full border-4 border-expanse-100 p-2 font-fjalla text-xl text-stars-100 transition-all duration-300 ease-in-out hover:border-stars-100 hover:text-expanse-100"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

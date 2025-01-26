import { PortableTextBlock } from "@portabletext/types";
import cx from "classnames";
import DOMPurify from "dompurify";
import { SubmitHandler, useForm } from "react-hook-form";

import { WEB3_FORMS_KEY } from "../config";
import { PostResult } from "../types/components";
import Icon from "./Icon";
import PortableTextRegular from "./PortableTextRegular";

export interface ContactFormBody {
  email: string;
  full_name: string;
  message: string;
}

export default function ContactForm({
  submitting,
  postResult,
  setSubmitting,
  setPostResult,
  name_placeholder,
  email_placeholder,
  message_placeholder,
  message_prefill,
  email_link,
}: {
  submitting: boolean;
  postResult: PostResult;
  setSubmitting: (submitting: boolean) => void;
  setPostResult: (postResult: PostResult) => void;
  name_placeholder: string;
  email_placeholder: string;
  message_placeholder: string;
  message_prefill: string | undefined;
  email_link: PortableTextBlock[];
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormBody>({
    defaultValues: {
      message: message_prefill,
    },
  });

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
      if (window.location.hostname === "localhost") {
        alert("Stubbed email form submission");
      } else {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
      }

      setSubmitting(false);
      setPostResult("SUCCESS");
    } catch (error) {
      setSubmitting(false);
      setPostResult("ERROR");
      return error;
    }
  };

  if (postResult) {
    const BackButton = () => (
      <div
        className="absolute right-4 top-2"
        onClick={() => {
          if (postResult === "SUCCESS") {
            reset();
          }
          setSubmitting(false);
          setPostResult(null);
        }}
      >
        <Icon icon="refresh" className="h-8 w-8" />
      </div>
    );

    const resultClassname =
      "relative w-full rounded-3xl p-5 text-lg text-stars-100";
    if (postResult === "SUCCESS") {
      return (
        <div className={cx("bg-success-300", resultClassname)}>
          Thanks for reaching out! <br /> I'll be in touch shortly.
          <BackButton />
        </div>
      );
    } else if (postResult === "ERROR") {
      return (
        <div>
          <div className={cx("bg-error-200 !text-stars-100", resultClassname)}>
            Something went wrong, please try again later or reach out directly:
            <BackButton />
            <PortableTextRegular
              content={email_link}
              link_color="stars-100"
              icon_color="stars-100"
            />
          </div>
        </div>
      );
    }
  }

  const inputClasses =
    "rounded-3xl bg-dune-100 text-night-300 placeholder-stars-100 bg-opacity-95 py-5 pl-5 pr-2 text-md lg:text-lg";
  const errorClass = "text-error-100 font-fjalla";

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
        <input
          disabled={submitting}
          className={cx("h-10 w-full", inputClasses)}
          placeholder={name_placeholder}
          {...register("full_name", {
            required: "REQUIRED",
          })}
        />
        {errors.email && (
          <div className={errorClass}>{errors?.email?.message?.toString()}</div>
        )}
        <input
          disabled={submitting}
          className={cx("h-10 w-full", inputClasses)}
          placeholder={email_placeholder}
          {...register("email", {
            required: "REQUIRED",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match format for valid email",
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
              required: "REQUIRED",
            })}
          />
          <div
            className={cx(
              "bg-red absolute bottom-4 flex w-full flex-col items-stretch px-4 lg:items-end",
              submitting && "hidden",
            )}
          >
            <button
              className="mb-2 min-w-24 rounded-full bg-stars-100 p-2 font-fjalla text-xl text-expanse-100 shadow-xl transition-all duration-300 ease-in-out hover:bg-expanse-100 hover:text-stars-100"
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

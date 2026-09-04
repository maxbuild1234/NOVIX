"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetRanges, plans } from "@/content/plans";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { Button } from "@/components/ui/Button";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "failed"; message: string };

const fieldClass =
  "w-full rounded-sm border border-gray-1 bg-ink px-4 py-3.5 text-body text-white transition-colors duration-200 placeholder:text-gray-2 hover:border-gray-2 focus:border-violet focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-caption text-violet">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      website: "",
    },
  });

  // The buttons in the pricing table link here with ?plan=grow. Reading the
  // query after mount, rather than with useSearchParams, keeps this page
  // statically rendered and avoids the Suspense fallback that was swapping in
  // under the form and costing 0.21 CLS on mobile.
  useEffect(() => {
    const planId = new URLSearchParams(window.location.search).get("plan");
    const plan = plans.find((item) => item.id === planId);
    if (plan) setValue("message", `We are interested in the ${plan.name} plan. `);
  }, [setValue]);

  // Move focus to the outcome message so it is announced and reachable.
  useEffect(() => {
    if (status.state === "sent" || status.state === "failed") {
      statusRef.current?.focus();
    }
  }, [status.state]);

  const onSubmit = async (values: ContactInput) => {
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: {
        ok: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
      } = await response.json();

      if (!response.ok || !data.ok) {
        // Put server-side messages back on the fields they belong to.
        if (data.fieldErrors) {
          for (const [field, message] of Object.entries(data.fieldErrors)) {
            setError(field as keyof ContactInput, { type: "server", message });
          }
          const first = Object.keys(data.fieldErrors)[0] as keyof ContactInput;
          if (first) setFocus(first);
        }

        setStatus({
          state: "failed",
          message: data.error ?? "Something went wrong at our end.",
        });
        return;
      }

      reset({ name: "", email: "", company: "", message: "", website: "" });
      setStatus({ state: "sent" });
    } catch {
      setStatus({
        state: "failed",
        message:
          "We could not reach the server. Check your connection and try again, or email us directly.",
      });
    }
  };

  if (status.state === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-gray-1 bg-ink p-8 focus-visible:outline-2 focus-visible:outline-violet lg:p-10"
      >
        <p className="text-eyebrow uppercase text-violet">Sent</p>
        <h2 className="mt-5 text-display-2 text-white">Got it.</h2>
        <p className="measure mt-5 text-body-lg text-gray-3">
          Your message is with us. We read everything ourselves, so the reply comes
          from a person and usually lands within two business days.
        </p>
        <p className="measure mt-4 text-body text-gray-2">
          If it is urgent, email us directly and put the word urgent in the subject
          line. That one we watch.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-8 text-caption text-white underline decoration-gray-1 underline-offset-4 transition-colors duration-200 hover:decoration-violet"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {status.state === "failed" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-sm border border-violet bg-ink p-5"
        >
          <p className="text-caption text-white">{status.message}</p>
          <p className="mt-2 text-caption text-gray-3">
            Nothing was lost — your message is still in the form below.
          </p>
        </div>
      ) : null}

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor={`${baseId}-name`} className="block text-caption text-gray-3">
            Your name
          </label>
          <input
            {...register("name")}
            id={`${baseId}-name`}
            type="text"
            autoComplete="name"
            placeholder="Marisol Tromp"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
            className={`mt-3 ${fieldClass}`}
          />
          <FieldError id={`${baseId}-name-error`} message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor={`${baseId}-email`} className="block text-caption text-gray-3">
            Email
          </label>
          <input
            {...register("email")}
            id={`${baseId}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@yourbusiness.aw"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
            className={`mt-3 ${fieldClass}`}
          />
          <FieldError id={`${baseId}-email-error`} message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor={`${baseId}-company`} className="block text-caption text-gray-3">
            Business name{" "}
            <span className="text-gray-2">(optional)</span>
          </label>
          <input
            {...register("company")}
            id={`${baseId}-company`}
            type="text"
            autoComplete="organization"
            placeholder="Casa Marisol"
            aria-invalid={errors.company ? "true" : undefined}
            aria-describedby={errors.company ? `${baseId}-company-error` : undefined}
            className={`mt-3 ${fieldClass}`}
          />
          <FieldError id={`${baseId}-company-error`} message={errors.company?.message} />
        </div>

        <div>
          <label htmlFor={`${baseId}-budget`} className="block text-caption text-gray-3">
            Budget for the build
          </label>
          <select
            {...register("budget")}
            id={`${baseId}-budget`}
            defaultValue=""
            aria-invalid={errors.budget ? "true" : undefined}
            aria-describedby={errors.budget ? `${baseId}-budget-error` : undefined}
            className={`mt-3 appearance-none ${fieldClass}`}
          >
            <option value="" disabled>
              Pick a range
            </option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <FieldError id={`${baseId}-budget-error`} message={errors.budget?.message} />
        </div>
      </div>

      <div>
        <label htmlFor={`${baseId}-message`} className="block text-caption text-gray-3">
          What are you selling, and what does the site need to do?
        </label>
        <textarea
          {...register("message")}
          id={`${baseId}-message`}
          rows={7}
          placeholder="We run a twelve-room hotel in Noord. Every booking comes through a marketplace that takes 18%, and our site cannot take a reservation at all."
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? `${baseId}-message-error` : undefined}
          className={`mt-3 resize-y ${fieldClass}`}
        />
        <FieldError id={`${baseId}-message-error`} message={errors.message?.message} />
      </div>

      {/* Honeypot. Hidden from people, left in the accessibility tree's blind
          spot on purpose: bots fill it, screen readers skip it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${baseId}-website`}>Leave this field empty</label>
        <input
          {...register("website")}
          id={`${baseId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Button type="submit" disabled={isSubmitting} withArrow>
          {isSubmitting ? "Sending…" : "Send it"}
        </Button>
        <p className="text-caption text-gray-2">
          We reply within two business days. No mailing list, ever.
        </p>
      </div>
    </form>
  );
}

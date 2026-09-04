import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact endpoint.
 *
 * Right now this validates the submission and logs it. To actually deliver
 * enquiries, replace the `console.info` below with a call to your mail
 * provider (Resend, Postmark, SES) or your CRM. Everything above that line
 * — parsing, validation, the honeypot, the error shapes — stays the same.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that submission." },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(payload);

  if (!result.success) {
    // Field-keyed messages so the form can put each one next to its input.
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }

    return NextResponse.json(
      { ok: false, error: "Some of that did not go through.", fieldErrors },
      { status: 422 },
    );
  }

  // The honeypot is filled, so this is a bot. Answer as though it worked
  // rather than telling it what gave the game away.
  if (result.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, company, budget, message } = result.data;

  console.info("[contact] new enquiry", {
    name,
    email,
    company: company || "(none given)",
    budget,
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}

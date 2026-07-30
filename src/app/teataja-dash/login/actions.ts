"use server";

import { redirect } from "next/navigation";
import { checkPassword, startSession } from "@/lib/teataja-dash-auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    // Deliberately vague, and no hint about whether the password is even configured.
    redirect("/teataja-dash/login?e=1");
  }

  await startSession();
  redirect("/teataja-dash");
}

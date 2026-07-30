import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/teataja-dash-auth";
import DashClient from "./DashClient";

// Reads the session cookie, so it must render per request.
export const dynamic = "force-dynamic";

export default async function TeatajaDashPage() {
  if (!(await isAuthed())) redirect("/teataja-dash/login");
  return <DashClient />;
}

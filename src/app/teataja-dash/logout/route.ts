import { endSession } from "@/lib/teataja-dash-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await endSession();
  return Response.redirect(new URL("/teataja-dash/login", request.url), 303);
}

import { notFound } from "next/navigation";

// Any unknown address under /en, /et or /pl: show our own 404 page in that language.
export default function CatchAll() {
  notFound();
}

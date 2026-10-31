import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/v2/Legal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return legalMetadata((await params).locale, "terms");
}

export default async function Page({ params }: Props) {
  return <LegalPage locale={(await params).locale} doc="terms" />;
}

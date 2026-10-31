import { PlatformLanding, platformMetadata } from "@/components/v2/PlatformLanding";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return platformMetadata("n8n-automation-agency", (await params).locale);
}

export default async function Page({ params }: Props) {
  return <PlatformLanding id="n8n-automation-agency" locale={(await params).locale} />;
}

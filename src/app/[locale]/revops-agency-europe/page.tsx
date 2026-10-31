import { PlatformLanding, platformMetadata } from "@/components/v2/PlatformLanding";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return platformMetadata("revops-agency-europe", (await params).locale);
}

export default async function Page({ params }: Props) {
  return <PlatformLanding id="revops-agency-europe" locale={(await params).locale} />;
}

import { Metadata } from "next";

import { SecretSettingdPageRender } from "./render";

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    title: `Instill Core | Secrets Setting`,
    openGraph: {
      images: ["/instill-open-graph.png"],
    },
  };
  return Promise.resolve(metadata);
}

export default async function Page() {
  return <SecretSettingdPageRender />;
}

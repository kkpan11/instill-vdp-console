import { Metadata } from "next";

import { PipelineDashboardPageRender } from "./render";

type Props = {
  params: { id: string; entity: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const metadata: Metadata = {
    title: `Instill Core | ${params.id} Dashboard`,
    openGraph: {
      images: ["/instill-open-graph.png"],
    },
  };
  return Promise.resolve(metadata);
}

export default async function Page() {
  return <PipelineDashboardPageRender />;
}

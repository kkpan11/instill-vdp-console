import { Metadata } from "next";
import { cookies } from "next/headers";
import { Pipeline } from "instill-sdk";

import { Nullable } from "@instill-ai/toolkit";
import {
  fetchNamespacePipeline,
  fetchNamespaceType,
} from "@instill-ai/toolkit/server";

import { PipelineOverviewPageRender } from "./render";

type Props = {
  params: { id: string; entity: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const cookieStore = cookies();
  const authSessionCookie = cookieStore.get("instill-auth-session")?.value;

  let accessToken: Nullable<string> = null;

  if (authSessionCookie) {
    accessToken = JSON.parse(authSessionCookie).accessToken;
  }

  const entity = params.entity;
  const id = params.id;

  try {
    const namespaceType = await fetchNamespaceType({
      namespace: entity,
      accessToken,
    });

    let pipeline: Nullable<Pipeline> = null;

    if (namespaceType === "NAMESPACE_USER") {
      pipeline = await fetchNamespacePipeline({
        namespacePipelineName: `users/${entity}/pipelines/${id}`,
        accessToken,
      });
    }

    if (namespaceType === "NAMESPACE_ORGANIZATION") {
      pipeline = await fetchNamespacePipeline({
        namespacePipelineName: `organizations/${entity}/pipelines/${id}`,
        accessToken,
      });
    }

    const metadata: Metadata = {
      title: `Instill Core | ${id}`,
      description: pipeline?.readme,
      openGraph: {
        images: ["/instill-open-graph.png"],
      },
    };

    return Promise.resolve(metadata);
  } catch (error) {
    console.log(error);
  }
}

export default async function Page() {
  return <PipelineOverviewPageRender />;
}

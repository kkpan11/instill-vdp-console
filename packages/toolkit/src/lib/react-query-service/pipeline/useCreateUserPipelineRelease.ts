import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Nullable } from "../../type";
import type {
  CreateUserPipelineReleasePayload,
  PipelineRelease,
} from "../../vdp-sdk";
import { createUserPipelineReleaseMutation } from "../../vdp-sdk";

export function useCreateUserPipelineRelease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      pipelineName,
      payload,
      accessToken,
    }: {
      pipelineName: string;
      payload: CreateUserPipelineReleasePayload;
      accessToken: Nullable<string>;
    }) => {
      if (!accessToken) {
        return Promise.reject(new Error("accessToken not provided"));
      }

      const pipelineRelease = await createUserPipelineReleaseMutation({
        pipelineName,
        payload,
        accessToken,
      });

      return Promise.resolve({ pipelineRelease });
    },
    onSuccess: async ({ pipelineRelease }) => {
      // At this stage the pipelineName will be
      // users/<uid>/pipelines/<pid>/releases/<version>
      const pipelineNameArray = pipelineRelease.name.split("/");
      const entityName = `${pipelineNameArray[0]}/${pipelineNameArray[1]}`;

      queryClient.setQueryData<PipelineRelease>(
        ["pipelineReleases", pipelineRelease.name],
        pipelineRelease,
      );

      queryClient.setQueryData<PipelineRelease[]>(
        ["pipelineReleases", entityName],
        (old) =>
          old
            ? [
                ...old.filter((e) => e.name !== pipelineRelease.name),
                pipelineRelease,
              ]
            : [pipelineRelease],
      );
    },
  });
}

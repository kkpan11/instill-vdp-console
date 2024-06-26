import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Pipeline, UpdateUserPipelinePayload } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { updateUserPipelineMutation } from "../../vdp-sdk";

export function useUpdateUserPipeline() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      payload,
      accessToken,
    }: {
      payload: UpdateUserPipelinePayload;
      accessToken: Nullable<string>;
    }) => {
      if (!accessToken) {
        return Promise.reject(new Error("accessToken not provided"));
      }

      const pipeline = await updateUserPipelineMutation({
        payload,
        accessToken,
      });

      return Promise.resolve({ pipeline });
    },
    onSuccess: async ({ pipeline }) => {
      // At this stage the pipelineName will be users/<uid>/pipelines/<pid>
      const pipelineNameArray = pipeline.name.split("/");
      const userName = `${pipelineNameArray[0]}/${pipelineNameArray[1]}`;

      queryClient.setQueryData<Pipeline>(
        ["pipelines", pipeline.name],
        pipeline,
      );

      queryClient.setQueryData<Pipeline[]>(["pipelines"], (old) =>
        old
          ? [...old.filter((e) => e.name !== pipeline.name), pipeline]
          : [pipeline],
      );

      queryClient.setQueryData<Pipeline[]>(["pipelines", userName], (old) =>
        old
          ? [...old.filter((e) => e.name !== pipeline.name), pipeline]
          : [pipeline],
      );
    },
  });
}

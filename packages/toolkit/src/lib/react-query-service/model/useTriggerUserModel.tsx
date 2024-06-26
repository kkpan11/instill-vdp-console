import { useMutation } from "@tanstack/react-query";

import type { TriggerUserModelPayload } from "../../vdp-sdk";
import { Nullable } from "../../type";
import { triggerUserModelAction } from "../../vdp-sdk";

export function useTriggerUserModel() {
  return useMutation({
    mutationFn: async ({
      modelName,
      payload,
      accessToken,
    }: {
      modelName: string;
      payload: TriggerUserModelPayload;
      accessToken: Nullable<string>;
    }) => {
      const response = await triggerUserModelAction({
        modelName,
        payload,
        accessToken,
      });

      return Promise.resolve(response);
    },
  });
}

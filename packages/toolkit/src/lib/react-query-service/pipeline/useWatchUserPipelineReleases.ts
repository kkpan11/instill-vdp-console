import { useQuery } from "@tanstack/react-query";

import type { Nullable } from "../../type";
import {
  PipelineReleasesWatchState,
  watchUserPipelineReleaseQuery,
} from "../../vdp-sdk";

export function useWatchUserPipelineReleases({
  pipelineReleaseNames,
  accessToken,
  enabled,
  retry,
}: {
  pipelineReleaseNames: Nullable<string[]>;
  accessToken: Nullable<string>;
  enabled: boolean;
  retry?: false | number;
}) {
  let enableQuery = false;

  if (pipelineReleaseNames && enabled && pipelineReleaseNames.length > 0) {
    enableQuery = true;
  }

  return useQuery({
    queryKey: ["pipelineReleases", "watch"],
    queryFn: async () => {
      if (!pipelineReleaseNames || pipelineReleaseNames.length === 0) {
        return Promise.reject(new Error("pipelineReleaseNames not provided"));
      }

      const watches: PipelineReleasesWatchState = {};

      for (const pipelineReleaseName of pipelineReleaseNames) {
        const watch = await watchUserPipelineReleaseQuery({
          pipelineReleaseName,
          accessToken,
        });
        watches[pipelineReleaseName] = watch;
      }

      return Promise.resolve(watches);
    },
    enabled: enableQuery,
    retry: retry === false ? false : retry ? retry : 3,
  });
}

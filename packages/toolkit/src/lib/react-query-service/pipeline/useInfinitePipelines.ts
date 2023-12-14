import { useInfiniteQuery } from "@tanstack/react-query";
import { Nullable } from "../../type";
import { env } from "../../utility";
import { listPipelinesQuery } from "../../vdp-sdk";

export function useInfinitePipelines({
  accessToken,
  pageSize,
  enabledQuery,
}: {
  accessToken: Nullable<string>;
  pageSize?: number;
  enabledQuery: boolean;
}) {
  return useInfiniteQuery(
    ["pipelines", "infinite"],
    async ({ pageParam }) => {
      const pipelines = await listPipelinesQuery({
        pageSize: pageSize ?? env("NEXT_PUBLIC_QUERY_PAGE_SIZE") ?? null,
        nextPageToken: pageParam ?? null,
        accessToken,
        enablePagination: true,
      });

      return Promise.resolve(pipelines);
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next_page_token === "") {
          return null;
        }

        return lastPage.next_page_token;
      },
      enabled: enabledQuery,
    }
  );
}
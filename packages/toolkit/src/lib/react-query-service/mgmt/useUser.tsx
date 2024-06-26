import { useQuery } from "@tanstack/react-query";

import type { Nullable } from "../../type";
import { getUserQuery } from "../../vdp-sdk";

export function useUser({
  userName,
  accessToken,
  enabled,
  retry,
}: {
  userName: Nullable<string>;
  accessToken: Nullable<string>;
  enabled: boolean;
  retry?: false | number;
}) {
  let enabledQuery = false;

  if (enabled && userName) {
    enabledQuery = true;
  }

  return useQuery({
    queryKey: ["users", userName],
    queryFn: async () => {
      if (!userName) {
        return Promise.reject(new Error("userName not provided"));
      }

      const user = await getUserQuery({ userName, accessToken });

      return Promise.resolve(user);
    },
    enabled: enabledQuery,
    retry: retry === false ? false : retry ? retry : 3,
  });
}

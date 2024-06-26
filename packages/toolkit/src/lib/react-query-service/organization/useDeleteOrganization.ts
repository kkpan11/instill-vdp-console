import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Nullable } from "../../type";
import { deleteOrganizationMutation, Organization } from "../../vdp-sdk";

export function useDeleteOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      organizationID,
      accessToken,
    }: {
      organizationID: Nullable<string>;
      accessToken: Nullable<string>;
    }) => {
      if (!accessToken) {
        return Promise.reject(new Error("AccessToken not provided"));
      }
      if (!organizationID) {
        return Promise.reject(new Error("organizationID not provided"));
      }

      await deleteOrganizationMutation({ organizationID, accessToken });

      return Promise.resolve(organizationID);
    },
    onSuccess: (organizationID) => {
      queryClient.setQueryData<Organization[]>(["organizations"], (old) =>
        old ? old.filter((e) => e.id !== organizationID) : [],
      );
    },
  });
}

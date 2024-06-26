import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Nullable } from "../../type";
import {
  updateOrganizationMembershipMutation,
  UpdateOrganizationMembershipPayload,
} from "../../vdp-sdk";

export function useUpdateOrganizationMembership() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      payload,
      accessToken,
    }: {
      payload: UpdateOrganizationMembershipPayload;
      accessToken: Nullable<string>;
    }) => {
      if (!accessToken) {
        return Promise.reject(new Error("AccessToken not provided"));
      }

      const membership = await updateOrganizationMembershipMutation({
        payload,
        accessToken,
      });

      return Promise.resolve({ membership });
    },
    onSuccess: ({ membership }) => {
      queryClient.invalidateQueries({
        queryKey: ["organizations", membership.organization.id, "memberships"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", membership.user.id, "memberships"],
      });
    },
  });
}

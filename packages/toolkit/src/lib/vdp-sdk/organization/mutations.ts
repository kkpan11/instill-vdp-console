import { Nullable } from "../../type";
import { createInstillAxiosClient } from "../helper";
import {
  MembershipRole,
  MembershipState,
  Organization,
  OrganizationMembership,
  OrganizationProfile,
  UserMembership,
} from "./types";

export type CreateOrganizationPayload = {
  id: string;
  profile?: OrganizationProfile;
};

export type CreateOrganizationResponse = {
  organization: Organization;
};

export async function createOrganizationMutation({
  payload,
  accessToken,
}: {
  payload: CreateOrganizationPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.post<CreateOrganizationResponse>(
      "/organizations",
      payload,
    );

    return Promise.resolve(data.organization);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type UpdateOrganizationResponse = {
  organization: Organization;
};

export type UpdateOrganizationPayload = {
  id: string;
  profile?: Partial<OrganizationProfile>;
};

export async function updateOrganizationMutation({
  payload,
  accessToken,
}: {
  payload: UpdateOrganizationPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.patch<UpdateOrganizationResponse>(
      `/organizations/${payload.id}`,
      {
        ...payload,
        id: undefined,
      },
    );

    return Promise.resolve(data.organization);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type UpdateOrganizationMembershipPayload = {
  userID: string;
  organizationID: string;
  role?: MembershipRole;
};

export type UpdateOrganizationMembershipResponse = {
  membership: OrganizationMembership;
};

export async function updateOrganizationMembershipMutation({
  payload,
  accessToken,
}: {
  payload: UpdateOrganizationMembershipPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.put<UpdateOrganizationMembershipResponse>(
      `/organizations/${payload.organizationID}/memberships/${payload.userID}`,
      {
        ...payload,
        organizationID: undefined,
        userID: undefined,
      },
    );

    return Promise.resolve(data.membership);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteOrganizationMutation({
  organizationID,
  accessToken,
}: {
  organizationID: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    await client.delete(`/organizations/${organizationID}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteOrganizationMembershipMutation({
  organizationID,
  userID,
  accessToken,
}: {
  organizationID: string;
  userID: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    await client.delete(
      `/organizations/${organizationID}/memberships/${userID}`,
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteUserMembershipMutation({
  organizationID,
  userID,
  accessToken,
}: {
  organizationID: string;
  userID: string;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    await client.delete(`/users/${userID}/memberships/${organizationID}`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export type UpdateUserMembershipPayload = {
  userID: string;
  organizationID: string;
  state?: MembershipState;
};

export type UpdateUserMembershipResponse = {
  membership: UserMembership;
};

export async function updateUserMembershipMutation({
  payload,
  accessToken,
}: {
  payload: UpdateUserMembershipPayload;
  accessToken: Nullable<string>;
}) {
  try {
    const client = createInstillAxiosClient(accessToken);

    const { data } = await client.put<UpdateUserMembershipResponse>(
      `/users/${payload.userID}/memberships/${payload.organizationID}`,
      {
        ...payload,
        organizationID: undefined,
        userID: undefined,
      },
    );

    return Promise.resolve(data.membership);
  } catch (err) {
    return Promise.reject(err);
  }
}

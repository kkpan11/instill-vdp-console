"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { SelectOption } from "@instill-ai/design-system";

import { PageTitle } from "../../components";
import {
  DashboardAvailableTimeframe,
  GeneralAppPageProp,
  getPreviousTimeframe,
  getTimeInRFC3339Format,
  getTriggersSummary,
  Nullable,
  usePipelineTriggerRecords,
  useRouteInfo,
} from "../../lib";
import { PipelineTriggersSummary } from "./PipelineTriggersSummary";
import { PipelineTriggersTable } from "./PipelineTriggersTable";

export type DashboardPipelineDetailsPageMainViewProps = GeneralAppPageProp;

export const DashboardPipelineDetailsPageMainView = (
  props: DashboardPipelineDetailsPageMainViewProps,
) => {
  const { accessToken, enableQuery, router } = props;
  const { id } = useParams();

  /* -------------------------------------------------------------------------
   * Get the pipeline definition and static state for fields
   * -----------------------------------------------------------------------*/

  const [selectedTimeOption] = React.useState<SelectOption>({
    label: "24h",
    value: "24h",
  });

  const [queryString, setQueryString] = React.useState<Nullable<string>>(null);
  const [queryStringPrevious, setQueryStringPrevious] =
    React.useState<Nullable<string>>(null);

  const routeInfo = useRouteInfo();

  React.useEffect(() => {
    if (!routeInfo.isSuccess) {
      return;
    }

    let queryParams = `pipelineId='${routeInfo.data.resourceId}' AND ownerName='${routeInfo.data.namespaceName}'`;
    let queryParamsPrevious = `pipelineId='${routeInfo.data.resourceId}' AND ownerName='${routeInfo.data.namespaceName}'`;

    if (selectedTimeOption) {
      const start = getTimeInRFC3339Format(
        selectedTimeOption.value === "24h"
          ? "todayStart"
          : selectedTimeOption.value,
      );
      const stop = getTimeInRFC3339Format(
        selectedTimeOption?.value === "1d" ? "todayStart" : "now",
      );
      const previousTime = getTimeInRFC3339Format(
        getPreviousTimeframe(
          selectedTimeOption.value as DashboardAvailableTimeframe,
        ),
      );
      queryParams += ` AND start='${start}' AND stop='${stop}'`;
      queryParamsPrevious += ` AND start='${previousTime}' AND stop='${start}'`;
    }

    setQueryString(queryParams);
    setQueryStringPrevious(queryParamsPrevious);
  }, [id, selectedTimeOption, routeInfo.isSuccess, routeInfo.data]);

  /* -------------------------------------------------------------------------
   * Query pipeline data
   * -----------------------------------------------------------------------*/

  const pipelineTriggerRecords = usePipelineTriggerRecords({
    enabled: enableQuery && routeInfo.isSuccess && !!queryString,
    filter: queryString ? queryString : null,
    accessToken,
  });

  const previousPipelineTriggerRecords = usePipelineTriggerRecords({
    enabled: enableQuery && routeInfo.isSuccess && !!queryStringPrevious,
    filter: queryStringPrevious ? queryStringPrevious : null,
    accessToken,
  });

  // Guard this page
  React.useEffect(() => {
    if (
      pipelineTriggerRecords.isError ||
      previousPipelineTriggerRecords.isError
    ) {
      router.push("/404");
    }
  }, [
    router,
    pipelineTriggerRecords.isError,
    previousPipelineTriggerRecords.isError,
  ]);

  const pipelineTriggersSummary = React.useMemo(() => {
    if (
      !pipelineTriggerRecords.isSuccess ||
      !previousPipelineTriggerRecords.isSuccess
    ) {
      return null;
    }

    return getTriggersSummary(
      pipelineTriggerRecords.data,
      previousPipelineTriggerRecords.data,
    );
  }, [
    pipelineTriggerRecords.isSuccess,
    pipelineTriggerRecords.data,
    previousPipelineTriggerRecords.isSuccess,
    previousPipelineTriggerRecords.data,
  ]);

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <div className="flex flex-col">
      <PageTitle
        title=""
        breadcrumbs={["Dashboard", "Pipeline Details"]}
        className="mb-1"
      />

      {/* Status */}

      <div className="flex items-stretch space-x-4">
        <div className="w-1/2">
          <PipelineTriggersSummary>
            <PipelineTriggersSummary.Card
              summary={
                pipelineTriggersSummary
                  ? pipelineTriggersSummary.completed
                  : null
              }
            />
            <PipelineTriggersSummary.Card
              summary={
                pipelineTriggersSummary ? pipelineTriggersSummary.errored : null
              }
            />
          </PipelineTriggersSummary>
        </div>
      </div>

      {/* Pipeline Table */}

      <div className="mt-8">
        <PipelineTriggersTable
          pipelineTriggers={
            pipelineTriggerRecords.isSuccess ? pipelineTriggerRecords.data : []
          }
          isError={pipelineTriggerRecords.isError}
          isLoading={pipelineTriggerRecords.isLoading}
        />
      </div>
    </div>
  );
};

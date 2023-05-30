import { FC, ReactElement, useMemo } from "react";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";
import {
  useDestinationWithPipelines,
  useWarnUnsavedChanges,
  ConfigureDestinationForm,
  useCreateResourceFormStore,
  PipelinesTable,
  StateLabel,
  CreateResourceFormStore,
  useCreateUpdateDeleteResourceGuard,
  useWatchPipelines,
  useWatchDestination,
  type DestinationWithDefinition,
  type Nullable,
} from "@instill-ai/toolkit";

import {
  PageTitle,
  PageBase,
  PageContentContainer,
  PageHead,
} from "@/components";

const selector = (state: CreateResourceFormStore) => ({
  formIsDirty: state.formIsDirty,
  init: state.init,
});

type GetLayOutProps = {
  page: ReactElement;
};

const DestinationDetailsPage: FC & {
  getLayout?: FC<GetLayOutProps>;
} = () => {
  const router = useRouter();
  const { id } = router.query;
  const { formIsDirty, init } = useCreateResourceFormStore(selector, shallow);

  useWarnUnsavedChanges({
    router,
    haveUnsavedChanges: formIsDirty,
    confirmation:
      "You have unsaved changes, are you sure you want to leave this page?",
    callbackWhenLeave: null,
  });

  /* -------------------------------------------------------------------------
   * Query resource data
   * -----------------------------------------------------------------------*/

  const enableGuard = useCreateUpdateDeleteResourceGuard();

  const destinationWithPipelines = useDestinationWithPipelines({
    destinationName: id ? `destination-connectors/${id.toString()}` : null,
    accessToken: null,
    enabled: true,
  });

  const destinationWatchState = useWatchDestination({
    destinationName: destinationWithPipelines.isSuccess
      ? destinationWithPipelines.data.name
      : null,
    accessToken: null,
    enabled: destinationWithPipelines.isSuccess,
  });

  const destination = useMemo<Nullable<DestinationWithDefinition>>(() => {
    if (!destinationWithPipelines.isSuccess) return null;
    return {
      name: destinationWithPipelines.data.name,
      uid: destinationWithPipelines.data.uid,
      id: destinationWithPipelines.data.id,
      destination_connector_definition:
        destinationWithPipelines.data.destination_connector_definition,
      connector: destinationWithPipelines.data.connector,
    };
  }, [destinationWithPipelines.isSuccess, destinationWithPipelines.data]);

  const pipelinesWatchState = useWatchPipelines({
    pipelineNames: destinationWithPipelines.isSuccess
      ? destinationWithPipelines.data.pipelines.map((pipeline) => pipeline.name)
      : [],
    accessToken: null,
    enabled: destinationWithPipelines.isSuccess,
  });

  const isLoadingResources = destinationWithPipelines.isLoading
    ? true
    : destinationWithPipelines.isSuccess &&
      destinationWithPipelines.data.pipelines.length > 0
    ? pipelinesWatchState.isLoading
    : false;

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <>
      <PageHead
        title={
          destinationWithPipelines.isLoading
            ? ""
            : (destinationWithPipelines.data?.name as string)
        }
      />
      <PageContentContainer>
        <PageTitle
          title={id ? id.toString() : ""}
          breadcrumbs={id ? ["Destination", id.toString()] : ["Destination"]}
          enableButton={false}
          marginBottom="mb-[50px]"
        />
        <div className="mb-10 flex flex-row gap-x-5">
          <h3 className="my-auto text-black text-instill-h3">State</h3>
          <StateLabel
            enableIcon={true}
            enableBgColor={true}
            state={
              destinationWatchState.isSuccess
                ? destinationWatchState.data.state
                : "STATE_UNSPECIFIED"
            }
            iconHeight="h-[18px]"
            iconWidth="w-[18px]"
            iconPosition="my-auto"
          />
        </div>
        <h3 className="mb-5 text-black text-instill-h3">In use by pipelines</h3>
        <PipelinesTable
          pipelines={
            destinationWithPipelines.isSuccess
              ? destinationWithPipelines.data.pipelines
              : []
          }
          pipelinesWatchState={
            pipelinesWatchState.isSuccess ? pipelinesWatchState.data : {}
          }
          isError={
            destinationWithPipelines.isError || pipelinesWatchState.isError
          }
          isLoading={isLoadingResources}
          marginBottom="mb-10"
        />
        <h3 className="mb-5 text-black text-instill-h3">Setting</h3>
        <div>
          {destination ? (
            <ConfigureDestinationForm
              destination={destination}
              onDelete={() => {
                init();
                router.push("/destinations");
              }}
              disabledDelete={enableGuard}
              onConfigure={null}
              disabledConfigure={enableGuard}
              initStoreOnConfigure={true}
              width="w-full"
              accessToken={null}
            />
          ) : null}
        </div>
      </PageContentContainer>
    </>
  );
};

DestinationDetailsPage.getLayout = (page) => {
  return <PageBase>{page}</PageBase>;
};

export default DestinationDetailsPage;

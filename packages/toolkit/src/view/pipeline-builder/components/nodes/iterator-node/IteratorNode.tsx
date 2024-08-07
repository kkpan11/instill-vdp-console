"use client";

import * as React from "react";
import { PipelineGeneralComponent } from "instill-sdk";
import { NodeProps } from "reactflow";

import { Button, Icons } from "@instill-ai/design-system";

import { InstillStore, useInstillStore, useShallow } from "../../../../../lib";
import {
  checkIsValidPosition,
  composeEdgesFromNodes,
  createGraphLayout,
  createNodesFromPipelineComponents,
} from "../../../lib";
import { IteratorNodeData } from "../../../type";
import { ComponentOutputReferenceHints } from "../../ComponentOutputReferenceHints";
import { NodeHead, NodeIDEditor, NodeWrapper } from "../common";
import { NodeControlPanel } from "../control-panel";
import { IteratorGeneralComponentLabel } from "./IteratorComponentLable";

const selector = (store: InstillStore) => ({
  updateIsEditingIterator: store.updateIsEditingIterator,
  nodes: store.nodes,
  updateNodes: store.updateNodes,
  updateEdges: store.updateEdges,
  updateTempSavedNodesForEditingIteratorFlow:
    store.updateTempSavedNodesForEditingIteratorFlow,
  updateEditingIteratorID: store.updateEditingIteratorID,
  collapseAllNodes: store.collapseAllNodes,
});

export const IteratorNode = ({ data, id }: NodeProps<IteratorNodeData>) => {
  const [noteIsOpen, setNoteIsOpen] = React.useState(false);
  const [nodeIsCollapsed, setNodeIsCollapsed] = React.useState(false);

  const {
    updateIsEditingIterator,
    nodes,
    updateNodes,
    updateEdges,
    updateTempSavedNodesForEditingIteratorFlow,
    updateEditingIteratorID,
    collapseAllNodes,
  } = useInstillStore(useShallow(selector));

  React.useEffect(() => {
    setNodeIsCollapsed(collapseAllNodes);
  }, [collapseAllNodes]);

  const editIterator = React.useCallback(
    function () {
      updateIsEditingIterator(() => true);
      updateEditingIteratorID(() => id);
      updateTempSavedNodesForEditingIteratorFlow(() => nodes);

      if (
        checkIsValidPosition({
          component: data.component,
          metadata: data.metadata ?? null,
          isIteratorNode: true,
        })
      ) {
        const nodes = createNodesFromPipelineComponents(data.component, {
          metadata: data.metadata,
        });
        const edges = composeEdgesFromNodes(nodes);

        updateNodes(() => nodes);
        updateEdges(() => edges);

        return;
      } else {
        const nodes = createNodesFromPipelineComponents(data.component);
        const edges = composeEdgesFromNodes(nodes);

        updateNodes(() => nodes);
        updateEdges(() => edges);

        createGraphLayout(nodes, edges)
          .then((graphData) => {
            updateNodes(() => graphData.nodes);
            updateEdges(() => graphData.edges);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    [
      id,
      data,
      nodes,
      updateEdges,
      updateEditingIteratorID,
      updateIsEditingIterator,
      updateNodes,
      updateTempSavedNodesForEditingIteratorFlow,
    ],
  );

  return (
    <NodeWrapper nodeID={id} nodeData={data} noteIsOpen={noteIsOpen}>
      <NodeHead nodeIsCollapsed={nodeIsCollapsed}>
        <div className="mr-auto flex flex-row gap-x-1">
          <div className="my-auto flex h-6 w-6 rounded bg-semantic-accent-bg">
            <Icons.Repeat04 className="m-auto h-4 w-4 stroke-semantic-accent-default" />
          </div>
          <NodeIDEditor currentNodeID={id} />
        </div>
        <NodeControlPanel
          nodeID={id}
          nodeData={data}
          nodeIsCollapsed={nodeIsCollapsed}
          setNodeIsCollapsed={setNodeIsCollapsed}
          handleToggleNote={() => setNoteIsOpen((prev) => !prev)}
          noteIsOpen={noteIsOpen}
        />
      </NodeHead>
      {nodeIsCollapsed ? null : (
        <React.Fragment>
          <div className="mb-2 flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              {data.input ? null : (
                <p className="rounded bg-semantic-accent-bg px-1 py-2 text-semantic-fg-disabled product-body-text-4-medium">
                  Loop through an array and filter based on multiple criteria
                </p>
              )}

              {data.input ? (
                <React.Fragment>
                  <div className="flex flex-row">
                    <p className="text-semantic-fg-secondary product-body-text-4-medium">
                      Iteration Input
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex min-h-8 w-full rounded-sm border border-semantic-bg-line bg-semantic-bg-primary px-[9px] py-1.5">
                      <p className="rounded bg-semantic-accent-bg px-2 py-0.5 text-semantic-accent-default product-body-text-4-medium">
                        {data.input}
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
            {Object.keys(data.component).length > 0 ? (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row">
                  <p className="text-semantic-fg-secondary product-body-text-4-medium">
                    Iteration components
                  </p>
                </div>
                <div className="flex flex-col gap-y-2">
                  {Object.entries(data.component).map(([nodeID, e]) => (
                    <IteratorGeneralComponentLabel
                      key={nodeID}
                      id={nodeID}
                      component={e as PipelineGeneralComponent}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <Button
            variant="tertiaryColour"
            className="w-full"
            onClick={editIterator}
          >
            Edit Iterator
          </Button>
          <div className="mb-4 w-full">
            <ComponentOutputReferenceHints componentID={id} component={data} />
          </div>
        </React.Fragment>
      )}
    </NodeWrapper>
  );
};

import type { PipelineRecipe } from "instill-sdk";
import { Node } from "reactflow";

import { GeneralRecord, Nullable } from "../../../lib";
import { NodeData, PipelineComponentMetadata } from "../type";
import { createNodesFromPipelineComponents } from "./createNodesFromPipelineComponents";

export type CreateNodesFromPipelineRecipeOptions = {
  metadata?: GeneralRecord;
};

export function createNodesFromPipelineRecipe(
  recipe: PipelineRecipe,
  options?: CreateNodesFromPipelineRecipeOptions,
) {
  const metadata = options?.metadata;
  const nodes: Node<NodeData>[] = [];

  if (recipe.component) {
    const componentNodes = createNodesFromPipelineComponents(recipe.component, {
      metadata,
    });
    nodes.push(...componentNodes);
  }

  // create variable node

  let triggerMetadata: Nullable<PipelineComponentMetadata> = null;

  if (metadata && "component" in metadata) {
    triggerMetadata = metadata.component["variable"];
  }

  nodes.push({
    id: "variable",
    type: "variableNode",
    data: {
      fields: recipe.variable ?? {},
      note: triggerMetadata ? triggerMetadata.note : null,
    },
    position: triggerMetadata
      ? { x: triggerMetadata.x, y: triggerMetadata.y }
      : { x: 0, y: 0 },
  });

  // create response node

  let responseMetadata: Nullable<PipelineComponentMetadata> = null;

  if (metadata && "component" in metadata) {
    responseMetadata = metadata.component["response"];
  }

  nodes.push({
    id: "response",
    type: "responseNode",
    data: {
      fields: recipe.output ?? {},
      note: responseMetadata ? responseMetadata.note : null,
    },
    position: responseMetadata
      ? { x: responseMetadata.x, y: responseMetadata.y }
      : { x: 0, y: 0 },
  });

  return nodes;
}

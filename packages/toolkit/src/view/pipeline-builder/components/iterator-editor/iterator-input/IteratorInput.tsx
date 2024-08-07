"use client";

import * as React from "react";
import cn from "clsx";
import { Node } from "reactflow";

import { Select } from "@instill-ai/design-system";

import {
  InstillStore,
  Nullable,
  pickSmartHintsFromNodes,
  useInstillStore,
  useShallow,
} from "../../../../../lib";
import { isIteratorNode } from "../../../lib";
import { IteratorNodeData } from "../../../type";
import { InOutputOption } from "../IteratorEditor";
import { IterateElmentHint } from "./IterateElementHint";

const selector = (store: InstillStore) => ({
  editingIteratorID: store.editingIteratorID,
  updatePipelineRecipeIsDirty: store.updatePipelineRecipeIsDirty,
  tempSavedNodesForEditingIteratorFlow:
    store.tempSavedNodesForEditingIteratorFlow,
  updateTempSavedNodesForEditingIteratorFlow:
    store.updateTempSavedNodesForEditingIteratorFlow,
});

export const IteratorInput = ({ className }: { className?: string }) => {
  const {
    editingIteratorID,
    updatePipelineRecipeIsDirty,
    tempSavedNodesForEditingIteratorFlow,
    updateTempSavedNodesForEditingIteratorFlow,
  } = useInstillStore(useShallow(selector));
  const [selectedInputOption, setSelectedInputOption] =
    React.useState<Nullable<InOutputOption>>(null);

  const availableInputOptions = React.useMemo(() => {
    if (!tempSavedNodesForEditingIteratorFlow) {
      return [];
    }

    const hints = pickSmartHintsFromNodes({
      nodes: tempSavedNodesForEditingIteratorFlow,
      isEditingIterator: true,
    });

    return hints
      .filter(
        (hint) =>
          hint.instillFormat.includes("array:") ||
          hint.instillFormat.includes("semi-structured") ||
          (hint.instillFormat === "null" && hint.type === "objectArray"),
      )
      .map((hint) => ({
        path: hint.path,
        instillFormat: hint.instillFormat,
        description: hint.description,
        type: hint.type,
      }));
  }, [tempSavedNodesForEditingIteratorFlow]);

  React.useEffect(() => {
    if (editingIteratorID && tempSavedNodesForEditingIteratorFlow) {
      const targetIteratorNode = tempSavedNodesForEditingIteratorFlow.find(
        (node) => node.id === editingIteratorID && isIteratorNode(node),
      ) as Node<IteratorNodeData> | undefined;

      const inputOption = availableInputOptions.find(
        (option) =>
          option.path ===
          targetIteratorNode?.data.input.replace("${", "").replace("}", ""),
      );

      if (inputOption) {
        setSelectedInputOption(inputOption);
      }
    }
  }, [
    availableInputOptions,
    editingIteratorID,
    tempSavedNodesForEditingIteratorFlow,
  ]);

  return (
    <div className={cn("flex flex-col gap-y-1", className)}>
      <div className="flex flex-row gap-x-1">
        <p className="text-semantic-fg-secondary product-body-text-4-medium">
          Input
        </p>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <Select.Root
          value={selectedInputOption?.path}
          onValueChange={(value) => {
            const option = availableInputOptions.find(
              (option) => option.path === value,
            );

            if (option) {
              setSelectedInputOption(option);
              updatePipelineRecipeIsDirty(() => true);
              updateTempSavedNodesForEditingIteratorFlow((nodes) =>
                nodes.map((node) => {
                  if (node.id === editingIteratorID && isIteratorNode(node)) {
                    return {
                      ...node,
                      data: {
                        ...node.data,
                        input: "${" + option.path + "}",
                      },
                    };
                  }

                  return node;
                }),
              );
            }
          }}
        >
          <Select.Trigger className="!w-[245px]">
            <Select.Value aria-label={selectedInputOption?.path}>
              {selectedInputOption ? (
                <p className="rounded bg-semantic-accent-bg px-2 py-0.5 text-semantic-accent-default product-body-text-4-medium">
                  {"$" + `{${selectedInputOption?.path}}`}
                </p>
              ) : null}
            </Select.Value>
          </Select.Trigger>
          <Select.Content viewportClassName="!p-0">
            {availableInputOptions.map((option) => (
              <Select.Item
                className="!p-2 !product-body-text-4-semibold focus:!text-[#1E4EAE] data-[highlighted]:!bg-semantic-accent-bg"
                key={option.path}
                value={option.path}
                disabledCheck={true}
                label={option.path}
              />
            ))}
          </Select.Content>
        </Select.Root>
        <IterateElmentHint selectedInputOption={selectedInputOption} />
      </div>
    </div>
  );
};

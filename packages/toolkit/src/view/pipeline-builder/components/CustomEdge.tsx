"use client";

import React from "react";
import cn from "clsx";
import { EdgeProps, getSmoothStepPath } from "reactflow";

import { InstillStore, useInstillStore, useShallow } from "../../../lib";

const selector = (store: InstillStore) => ({
  selectedConnectorNodeId: store.selectedConnectorNodeId,
});

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  source,
  target,
}: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { selectedConnectorNodeId } = useInstillStore(useShallow(selector));

  const isSelected = React.useMemo(() => {
    if (
      source === selectedConnectorNodeId ||
      target === selectedConnectorNodeId
    ) {
      return true;
    }

    return false;
  }, [selectedConnectorNodeId, source, target]);

  return (
    <path
      id={id}
      style={style}
      className={cn(
        "fill-none",
        isSelected
          ? "stroke-semantic-accent-default stroke-[3px]"
          : "stroke-[#CBD2E1] stroke-[2px]",
      )}
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
};

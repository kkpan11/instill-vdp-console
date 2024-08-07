"use client";

import * as React from "react";
import cn from "clsx";

import { Icons, Tooltip } from "@instill-ai/design-system";

import { useInstillStore } from "../../../../../../lib";
import { env } from "../../../../../../server";
import { useNodeBottomBarContext } from "./NodeBottomBarContext";

const NodeBottomBarMenuRootPrimitive = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-6 flex-row rounded-b-[6px] border-t border-semantic-bg-line bg-[#F0F0F0] px-2">
      {children}
    </div>
  );
};

const NodeBottomBarMenuItemPrimitive = (
  props: {
    children: React.ReactNode;
    value: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { children, value, onClick, ...passThrough } = props;

  const { selectedValue } = useNodeBottomBarContext();

  return (
    <button
      {...passThrough}
      className={cn(
        "h-full border-b border-[#1D2433] border-opacity-0 px-1.5 py-1.5 font-sans text-[10px] font-semibold hover:bg-semantic-bg-line",
        selectedValue === value
          ? "border-opacity-100 text-semantic-fg-primary"
          : "text-semantic-fg-disabled",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const NodeBottomBarMenuPrimitive = {
  Root: NodeBottomBarMenuRootPrimitive,
  Item: NodeBottomBarMenuItemPrimitive,
};

export const NodeBottomBarMenu = ({
  isUsingInstillCredit,
}: {
  isUsingInstillCredit?: boolean;
}) => {
  const { setSelectedValue } = useNodeBottomBarContext();
  const pipelineIsReadOnly = useInstillStore(
    (store) => store.pipelineIsReadOnly,
  );

  return (
    <NodeBottomBarMenuPrimitive.Root>
      <NodeBottomBarMenuPrimitive.Item
        value="output"
        onClick={() => {
          if (pipelineIsReadOnly || !setSelectedValue) return;
          setSelectedValue((prev) => {
            if (prev === "output") return null;
            return "output";
          });
        }}
      >
        Output
      </NodeBottomBarMenuPrimitive.Item>
      <NodeBottomBarMenuPrimitive.Item
        value="schema"
        onClick={() => {
          if (pipelineIsReadOnly || !setSelectedValue) return;
          setSelectedValue((prev) => {
            if (prev === "schema") return null;
            return "schema";
          });
        }}
      >
        Schema
      </NodeBottomBarMenuPrimitive.Item>
      {isUsingInstillCredit && env("NEXT_PUBLIC_APP_ENV") !== "CE" ? (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Icons.CoinsStacked01 className="my-auto ml-auto h-4 w-4 cursor-pointer stroke-semantic-fg-disabled" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="w-[320px]"
                sideOffset={5}
                side="right"
              >
                <div className="flex flex-col gap-y-1 rounded-sm bg-semantic-bg-primary p-3">
                  <p className="text-semantic-fg-primary product-body-text-4-medium">
                    Instill Credit
                  </p>
                  <p className="text-semantic-fg-primary product-body-text-4-medium">
                    This component is using Instill Credit
                  </p>
                </div>
                <Tooltip.Arrow
                  className="fill-white"
                  offset={5}
                  width={9}
                  height={6}
                />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ) : null}
    </NodeBottomBarMenuPrimitive.Root>
  );
};

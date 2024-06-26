import React from "react";
import cn from "clsx";
import { FieldError } from "react-hook-form";

import { Tag } from "@instill-ai/design-system";

import { Nullable } from "../../../type";
import { SmartHint } from "../../../use-smart-hint";
import { SmartHintWarning } from "../../types";

export const SmartHintInfoCard = ({
  className,
  error,
  smartHintWarning,
  highlightedHint,
  enableSmartHints,
}: {
  className?: string;
  error?: FieldError;
  smartHintWarning: Nullable<SmartHintWarning>;
  highlightedHint: Nullable<SmartHint>;
  enableSmartHints: boolean;
}) => {
  if (!enableSmartHints) {
    return;
  }

  if (!highlightedHint && !error && !smartHintWarning) {
    return;
  }

  return (
    <div className={cn("flex min-h-8 w-full flex-col", className)}>
      {highlightedHint ? (
        <div className="flex flex-col gap-y-4 p-2">
          <p className="text-semantic-fg-secondary product-body-text-3-semibold">
            {`type: ${highlightedHint.instillFormat}`}
          </p>
        </div>
      ) : null}
      {error ? (
        <div className="flex w-full flex-col gap-y-1 bg-semantic-error-bg p-2">
          <p className="text-semantic-error-default product-body-text-3-semibold">
            Field error
          </p>
          <p className="text-semantic-error-default product-body-text-3-regular">
            {String(error.message)}
          </p>
        </div>
      ) : null}
      {smartHintWarning ? (
        <div className="flex w-full flex-col gap-y-1 bg-semantic-warning-bg p-2">
          <p className="text-semantic-warning-default product-body-text-3-semibold">
            Field warning
          </p>
          <div className="flex flex-col gap-y-2">
            {smartHintWarning.notAvailableReferences.length !== 0 ? (
              smartHintWarning.notAvailableReferences.length > 1 ? (
                <React.Fragment>
                  <p className="text-semantic-warning-default product-body-text-3-regular">
                    These references are not available:
                  </p>
                  <div className="flex w-full flex-row flex-wrap gap-x-2">
                    {smartHintWarning.notAvailableReferences.map((e) => (
                      <Tag
                        key={e}
                        variant="lightYellow"
                        size="sm"
                        className="!rounded !px-2 !py-0.5"
                      >
                        {e}
                      </Tag>
                    ))}
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className="text-semantic-warning-default product-body-text-3-regular">
                    This reference is not available:
                  </p>
                  <div className="flex">
                    {smartHintWarning.notAvailableReferences.map((e) => (
                      <Tag
                        key={e}
                        variant="lightYellow"
                        size="sm"
                        className="!rounded !px-2 !py-0.5"
                      >
                        {e}
                      </Tag>
                    ))}
                  </div>
                </React.Fragment>
              )
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

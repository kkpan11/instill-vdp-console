"use client";

import * as React from "react";

import { SmartHint } from "../..";
import { ReferenceHintTag } from "../../../../components";
import { transformInstillFormatToHumanReadableFormat } from "../../../use-instill-form/transform";

export const GroupByFormatField = ({
  hints,
  instillFormat,
  arrayInArray,
}: {
  hints: SmartHint[];
  instillFormat: string;
  arrayInArray?: boolean;
}) => {
  const humanReadableInstillFormat = React.useMemo(() => {
    return transformInstillFormatToHumanReadableFormat(
      instillFormat,
      arrayInArray,
    );
  }, [instillFormat, arrayInArray]);

  return (
    <div className="flex w-full flex-col gap-y-2">
      <ReferenceHintTag.Root>
        <ReferenceHintTag.InstillFormat
          isArray={humanReadableInstillFormat.isArray}
          instillFormat={humanReadableInstillFormat.format}
        />
        {hints.map((hint, index) => (
          <ReferenceHintTag.Path
            key={hint.path}
            icon={<ReferenceHintTag.Icon type="check" />}
            path={hint.path}
            description={hint.description}
            className={index === hints.length - 1 ? "" : "!rounded-bl-none"}
          />
        ))}
      </ReferenceHintTag.Root>
    </div>
  );
};

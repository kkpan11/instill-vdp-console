import * as React from "react";
import {
  PickComponentOutputFieldsFromInstillFormTreeProps,
  pickComponentOutputFieldsFromInstillFormTree,
} from "./pick";
import { InstillJSONSchema } from "./type";
import { TriggerUserPipelineResponse } from "../vdp-sdk";
import { Nullable } from "../type";
import { transformInstillJSONSchemaToFormTree } from "./transform";

export type UseComponentOutputFieldsProps = {
  nodeType: "connector" | "end";
  schema: Nullable<InstillJSONSchema>;
  data: Nullable<Record<string, any>>;
  chooseTitleFrom?: PickComponentOutputFieldsFromInstillFormTreeProps["chooseTitleFrom"];
  hideField?: PickComponentOutputFieldsFromInstillFormTreeProps["hideField"];
};

export function useComponentOutputFields(props: UseComponentOutputFieldsProps) {
  const fields = React.useMemo(() => {
    if (!props.schema) {
      return null;
    }

    const outputFormTree = transformInstillJSONSchemaToFormTree(props.schema);

    const fields = pickComponentOutputFieldsFromInstillFormTree({
      ...props,
      tree: outputFormTree,
    });

    return fields;
  }, [props]);

  return fields;
}
import * as React from "react";
import { Secret } from "instill-sdk";

import { InstillCredit } from "../../../../constant";
import { Nullable } from "../../../type";
import {
  pickSmartHintsFromAcceptFormats,
  SmartHint,
} from "../../../use-smart-hint";

export function useFilteredHints({
  smartHints,
  instillAcceptFormats,
  currentCursorPos,
  smartHintEnabledPos,
  fieldValue,
  componentID,
  secrets,
  instillSecret,
  supportInstillCredit,
}: {
  smartHints: SmartHint[];
  instillAcceptFormats: string[];
  currentCursorPos: Nullable<number>;
  smartHintEnabledPos: Nullable<number>;
  fieldValue: string;
  componentID?: string;
  instillSecret?: boolean;
  secrets?: Secret[];
  supportInstillCredit?: boolean;
}) {
  const filteredHints: SmartHint[] = React.useMemo(() => {
    if (!smartHints || smartHints.length === 0) {
      return [];
    }

    let searchCode: Nullable<string> = null;

    let allHints = pickSmartHintsFromAcceptFormats(
      smartHints,
      instillAcceptFormats,
    );

    if (instillSecret && secrets) {
      allHints = secrets.map((secret) => ({
        key: secret.id,
        path: `secret.${secret.id}`,
        instillFormat: "string",
        type: "string",
        properties: [],
      }));
    }

    if (supportInstillCredit) {
      allHints = [
        ...allHints,
        {
          key: "instillCredit",
          path: `secret.${InstillCredit.key}`,
          instillFormat: "string",
          type: "string",
          isInstillCreditHint: true,
        },
      ];
    }

    if (smartHintEnabledPos !== null && currentCursorPos !== null) {
      searchCode = fieldValue.substring(smartHintEnabledPos, currentCursorPos);

      if (searchCode) {
        return allHints.filter((hint) => {
          // Hint should not hint the field on the same node
          if (componentID) {
            const hintPath = hint.path.split(".");
            if (componentID === hintPath[0]) {
              return false;
            }
          }

          return hint.path.startsWith(searchCode as string);
        });
      }
    }

    if (componentID) {
      return allHints.filter((hint) => {
        const hintPath = hint.path.split(".");
        if (componentID === hintPath[0]) {
          return false;
        }

        return true;
      });
    }

    return allHints;
  }, [
    smartHints,
    instillAcceptFormats,
    currentCursorPos,
    smartHintEnabledPos,
    fieldValue,
    componentID,
    secrets,
    instillSecret,
    supportInstillCredit,
  ]);

  return filteredHints;
}

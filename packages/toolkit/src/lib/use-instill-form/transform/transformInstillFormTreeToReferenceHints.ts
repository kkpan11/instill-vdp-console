import { ComponentOutoutReferenceHint, InstillFormTree } from "../types";

export function transformInstillFormTreeToReferenceHints(
  tree: InstillFormTree,
  isObjectArrayChild?: boolean,
  objectArrayParentPath?: string,
): ComponentOutoutReferenceHint[] {
  // 1. Preprocess
  let referenceHints: ComponentOutoutReferenceHint[] = [];

  // Normall a objectArray child will be a formGroup with the same
  // path, so we only need to pass the isObjectArrayChild flag and
  // objectArrayParentPath to the children

  // 2. Process

  if (tree._type === "formGroup") {
    for (const property of tree.properties) {
      const hints = transformInstillFormTreeToReferenceHints(
        property,
        isObjectArrayChild,
        objectArrayParentPath,
      );
      referenceHints = [...referenceHints, ...hints];
    }
    return referenceHints;
  }

  // The component output don't have formCondition
  if (tree._type === "formCondition") {
    return referenceHints;
  }

  if (tree._type === "objectArray") {
    // ObjectArray need to have the path (by instill protocol the top level won't be the
    // objectArray, so we can safely assume that the path is not null)
    if (tree.path) {
      const hints = transformInstillFormTreeToReferenceHints(
        tree.properties,
        true,
        tree.path,
      );
      referenceHints = [...referenceHints, ...hints];
    }
    return referenceHints;
  }

  if (tree._type === "arrayArray") {
    return referenceHints;
  }

  // Process const field
  if (tree.const || !tree.path) {
    return referenceHints;
  }

  // We don't need to hint a field that is lacking instillFormat
  if (!tree.instillFormat) {
    return referenceHints;
  }

  // Process a normal field

  const hint: ComponentOutoutReferenceHint =
    isObjectArrayChild && objectArrayParentPath
      ? {
          path: tree.path,
          instillFormat: tree.instillFormat,
          isObjectArrayChild: isObjectArrayChild ?? false,
          objectArrayParentPath,
        }
      : {
          path: tree.path,
          instillFormat: tree.instillFormat,
          isObjectArrayChild: false,
        };

  return [...referenceHints, hint];
}

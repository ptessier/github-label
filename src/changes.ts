import { Change, Label } from "./types";

/**
 * Calculate the changes between the actual labels and the expected labels.
 */
export function calculateChanges(actual: Label[], expected: Label[]) {
  const changes: Change[] = [];
  const resolvedLabels: Label[] = [];

  expected.forEach((expectedLabel) => {
    // Find existing labels that match the expected label
    const matches = actual.filter((actualLabel) => {
      if (actualLabel.name.toLowerCase() === expectedLabel.name.toLowerCase()) {
        return true;
      }
    });

    // If we have no matches, the label is missing
    if (matches.length === 0) {
      return changes.push(missing(expectedLabel));
    }

    // Always take the first match
    const matchedLabel = matches[0];

    resolvedLabels.push(matchedLabel);

    const matchedDescription = matchedLabel.description || "";
    const configuredDescription =
      expectedLabel.description || matchedDescription;

    // If we have a match, but properties are not equal
    if (
      expectedLabel.name !== matchedLabel.name ||
      expectedLabel.color !== matchedLabel.color ||
      configuredDescription !== matchedDescription
    ) {
      return changes.push(changed(matchedLabel, expectedLabel));
    }
  });

  actual
    .filter((label) => resolvedLabels.indexOf(label) === -1)
    .map((label) => added(label))
    .forEach((change) => changes.push(change));

  return changes;
}

const missing = (expectedLabel: Label): Change => ({
  type: "create",
  name: expectedLabel.name,
  expected: {
    name: expectedLabel.name,
    color: expectedLabel.color,
    description: expectedLabel.description || "",
  },
});

const changed = (actualLabel: Label, expectedLabel: Label): Change => ({
  type: "update",
  name: actualLabel.name,
  actual: {
    name: actualLabel.name,
    color: actualLabel.color,
    description: actualLabel.description || "",
  },
  expected: {
    name: expectedLabel.name,
    color: expectedLabel.color,
    description: expectedLabel.description || actualLabel.description || "",
  },
});

const added = (actualLabel: Label): Change => ({
  type: "delete",
  name: actualLabel.name,
  actual: {
    name: actualLabel.name,
    color: actualLabel.color,
    description: actualLabel.description || "",
  },
});

import { Change, Label } from "./types";

export function calculateChanges(
  currentLabels: Label[],
  configuredLabels: Label[]
) {
  const changes: Change[] = [];
  const resolvedLabels: Label[] = [];

  configuredLabels.forEach((configuredLabel) => {
    // Get current labels which match the configured label
    const matches = currentLabels.filter((currentLabel) => {
      if (
        currentLabel.name.toLowerCase() === configuredLabel.name.toLowerCase()
      ) {
        return true;
      }
    });

    // If we have no matches, the configured label is missing
    if (matches.length === 0) {
      return changes.push(missing(configuredLabel));
    }

    // Always take the first match
    const matchedLabel = matches[0];
    resolvedLabels.push(matchedLabel);

    const matchedDescription = matchedLabel.description || "";
    const configuredDescription =
      configuredLabel.description || matchedDescription;

    // If we have a match, but properties are not equal
    if (
      configuredLabel.name !== matchedLabel.name ||
      configuredLabel.color !== matchedLabel.color ||
      configuredDescription !== matchedDescription
    ) {
      return changes.push(changed(matchedLabel, configuredLabel));
    }
  });

  currentLabels
    .filter((label) => resolvedLabels.indexOf(label) === -1)
    .map((currentLabel) => added(currentLabel))
    .forEach((change) => changes.push(change));

  return changes;
}

const missing = (expectedLabel: Label): Change => ({
  name: expectedLabel.name,
  type: "create",
  expected: {
    name: expectedLabel.name,
    color: expectedLabel.color,
    description: expectedLabel.description || "",
  },
});

const changed = (actualLabel: Label, expectedLabel: Label): Change => ({
  name: actualLabel.name,
  type: "update",
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
  name: actualLabel.name,
  type: "delete",
  actual: {
    name: actualLabel.name,
    color: actualLabel.color,
    description: actualLabel.description || "",
  },
});

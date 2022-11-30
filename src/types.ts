import { RestEndpointMethodTypes } from "@octokit/rest";

export type Change =
  | {
      name: string;
      type: "create";
      expected: Pick<Label, "name" | "color" | "description">;
    }
  | {
      name: string;
      type: "update";
      actual: Pick<Label, "name" | "color" | "description">;
      expected: Pick<Label, "name" | "color" | "description">;
    }
  | {
      name: string;
      type: "delete";
      actual: Pick<Label, "name" | "color" | "description">;
    };

export type ChangeType = "create" | "delete" | "update";

export type Options = {
  accessToken: string;
  allowExtraLabels: boolean;
  dryRun: boolean;
  file: string;
  owner: string;
  repo: string;
  log: {
    info: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
  };
};

const MODES = ["upload", "reset", "download"] as const;

export type Mode = typeof MODES[number];

/**
 * Octokit types
 */
export type Label =
  RestEndpointMethodTypes["issues"]["listLabelsForRepo"]["response"]["data"][number];

export type GetLabelsRequest =
  RestEndpointMethodTypes["issues"]["listLabelsForRepo"]["parameters"];

export type CreateLabelRequest =
  RestEndpointMethodTypes["issues"]["createLabel"]["parameters"];

export type UpdateLabelRequest =
  RestEndpointMethodTypes["issues"]["updateLabel"]["parameters"];

export type DeleteLabelRequest =
  RestEndpointMethodTypes["issues"]["deleteLabel"]["parameters"];

import { RestEndpointMethodTypes } from "@octokit/rest";
import { Mode } from "./mode";

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
  mode: Mode;
  owner: string;
  repo: string;
  log: {
    info: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
  };
};

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

import { program } from "commander";
import { Service } from "./service";
import { Mode, Options } from "./types";
import pkg = require("../package.json");

program
  .version(pkg.version)
  .argument("<mode>")
  .argument("<owner>")
  .argument("<repo>")
  .usage("<mode> <owner> <repo> [options]")
  .option(
    "-a, --access-token <token>",
    "a GitHub access token (also settable with a GITHUB_ACCESS_TOKEN environment variable)",
    process.env.GITHUB_ACCESS_TOKEN
  )
  .option(
    "--allow-extra-labels",
    "allow extra labels in the repo, and don't delete them"
  )
  .option(
    "-d, --dry-run",
    "calculate the required label changes but do not apply them"
  )
  .option(
    "-f, --file <path>",
    "the path or URL to look for the label configuration in. Default: labels.json",
    "labels.json"
  )
  .parse(process.argv);

if (program.args.length !== 1) {
  program.help();
}

function getOptions(): Options {
  const opts = program.opts();

  return {
    accessToken: opts.accessToken,
    allowExtraLabels: opts.allowExtraLabels,
    dryRun: opts.dryRun,
    file: opts.file,
    owner: program.args[0],
    repo: program.args[1],
    log: console,
  };
}

Promise.resolve(getOptions())
  .then((options: Options) => {
    const mode = program.args[0];

    if (!isMode(mode)) {
      throw new Error(`Invalid mode: ${mode}`);
    }

    return new Service(options).process(mode);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function isMode(value: string): value is Mode {
  return ["upload", "reset", "download"].includes(value);
}

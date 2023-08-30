import { program } from 'commander';
import { isMode } from './mode';
import { Service } from './service';
import { Options } from './types';

program
  .arguments('<mode> <owner>/<repo>')
  .usage('<mode> <owner>/<repo> [options]')
  .option(
    '-a, --access-token <token>',
    'a GitHub access token (also settable with a GITHUB_ACCESS_TOKEN environment variable)',
    process.env.GITHUB_ACCESS_TOKEN,
  )
  .option('--allow-extra-labels', "allow extra labels in the repo, and don't delete them")
  .option('-d, --dry-run', 'calculate the required label changes but do not apply them')
  .option(
    '-f, --file <path>',
    'the path or URL to look for the label configuration in. Default: labels.json',
    'labels.json',
  )
  .parse(process.argv);

if (program.args.length < 2) {
  program.help();
}

/**
 * Get the options from the command line arguments.
 */
function getOptions(): Options {
  const opts = program.opts();

  const mode = program.args[0];

  if (!isMode(mode)) {
    throw new Error(`Invalid mode: ${mode}`);
  }

  const path = program.args[1];
  if (!path.includes('/')) {
    throw new Error(`Invalid owner/repo: ${path}`);
  }
  const [owner, repo] = path.split('/');

  return {
    accessToken: opts.accessToken,
    allowExtraLabels: opts.allowExtraLabels,
    dryRun: opts.dryRun,
    file: opts.file,
    mode,
    owner,
    repo,
  };
}

Promise.resolve(getOptions())
  .then((options: Options) => {
    return new Service(options).process(options.mode);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

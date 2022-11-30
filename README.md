# github-label

Synchronize your github labels between repositories.

## Usage

First, [generate an access token here](https://github.com/settings/tokens), and allow the `repo` scope. Then,

```bash
# clone the repository
git clone git@github.com:MaintainX/mx-iterable.git

# install dependencies
yarn
```

You can start the program like this:

```
Usage: yarn start <mode> <owner> <repository> [options]

Options:
  -a, --access-token <token>  a GitHub access token (or a GITHUB_ACCESS_TOKEN environment variable)
  -d, --dry-run               calculate the required label changes without applying the changes
  -m, --mode <mode>           the mode of the program
  -f, --file <path>           (default: labels.json) the path of the label configuration in
  -A, --allow-extra-labels    allow extra labels in the repo, otherwise they will be deleted
```

### Modes

- **upload** upload your label to the repository from the `labels.json` file
- **download** download the labels to the `labels.json` file
- **reset** reset the labels of the repository

## Format

Labels are defined in a JSON array

```json
[
  {
    "name": "name",
    "color": "ff0000",
    "description": "optional description"
  }
]
```

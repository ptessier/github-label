import { Octokit } from '@octokit/rest';
import { calculateChanges } from './changes';
import { readLabels, writeLabels } from './files';
import { Mode } from './mode';
import {
  Change,
  CreateLabelRequest,
  DeleteLabelRequest,
  GetLabelsRequest,
  Options,
  UpdateLabelRequest,
} from './types';

export class Service {
  options: Options;
  octokit: Octokit;

  constructor(options: Options) {
    this.options = options;

    this.octokit = new Octokit({
      auth: options.accessToken,
    });
  }

  public async process(mode: Mode) {
    switch (mode) {
      case 'reset':
        return this.reset();
      case 'export':
        return this.export();
      case 'import':
        return this.import();
    }
  }

  private async reset() {
    const { owner, repo } = this.options;

    console.info(`Reset labels for "${owner}/${repo}"`);

    const labels = await this.getLabels({ owner, repo });

    return Promise.all(
      labels.map(({ name }) =>
        this.deleteLabel({
          owner,
          repo,
          name,
        }),
      ),
    );
  }

  private async export() {
    const { owner, repo, file } = this.options;

    console.info(`Saving labels for "${owner}/${repo}"`);

    const currentLabels = await this.getLabels({ owner, repo });

    const labels = currentLabels.map(({ name, color, description }) => ({
      name,
      color,
      description,
    }));

    await writeLabels(file, labels);

    return labels;
  }

  private async import() {
    const { owner, repo, file, dryRun, allowExtraLabels } = this.options;

    console.info(`Syncing labels for "${owner}/${repo}"`);

    const [currentLabels, labels] = await Promise.all([
      this.getLabels({ owner, repo }),
      readLabels(file),
    ]);

    const changes = calculateChanges(currentLabels, labels).filter((change) => {
      if (allowExtraLabels && change.type === 'delete') {
        return false;
      }

      return true;
    });

    if (dryRun) {
      return changes;
    }

    if (changes.length) {
      console.info('Applying label changes, please wait…');
    }

    return Promise.all(changes.map((change) => this.applyChange(change)));
  }

  private async applyChange(change: Change) {
    const { owner, repo } = this.options;

    switch (change.type) {
      case 'create':
        return this.createLabel({
          owner,
          repo,
          name: change.expected.name,
          color: change.expected.color,
          description: change.expected.description ?? undefined,
        });
      case 'update':
        return this.updateLabel({
          owner,
          repo,
          name: change.actual.name,
          new_name: change.expected.name,
          color: change.expected.color,
          description: change.expected.description ?? undefined,
        });
      case 'delete':
        return this.deleteLabel({
          owner,
          repo,
          name: change.actual.name,
        });
    }
  }

  private async getLabels(params: GetLabelsRequest) {
    const { data } = await this.octokit.issues.listLabelsForRepo(params);

    return data;
  }

  private async createLabel(request: CreateLabelRequest) {
    const { data } = await this.octokit.issues.createLabel(request);

    return data;
  }

  private async updateLabel(params: UpdateLabelRequest) {
    const { data } = await this.octokit.issues.updateLabel(params);

    return data;
  }

  private async deleteLabel(params: DeleteLabelRequest) {
    const { data } = await this.octokit.issues.deleteLabel(params);

    return data;
  }
}

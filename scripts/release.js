const { yParser, chalk } = require('@umijs/utils');
const exec = require('./utils/exec');
const execa = require('execa');
const args = yParser(process.argv);

function printErrorAndExit(message) {
  console.error(chalk.red(message));
  process.exit(1);
}

function logStep(name) {
  console.log(`${chalk.gray('>> Release:')} ${chalk.magenta.bold(name)}`);
}

async function release() {
  if (!args.skipGitStatusCheck) {
    const gitStatus = execa.sync('git', ['status', '--porcelain']).stdout;
    if (gitStatus.length) {
      printErrorAndExit(`Your git status is not clean. Aborting.`);
    }
  } else {
    logStep(
      'git status check is skipped, since --skip-git-status-check is supplied',
    );
  }
  if (!args.skipBuild) {
    logStep('build');
    await exec('pnpm', ['run', 'build']);
  } else {
    logStep('build is skipped, since args.skipBuild is supplied');
  }
  if (args.skipChange) {
    logStep('change is skipped, since args.skipChange is supplied');
    return;
  }
  await exec('pnpm', ['changeset', 'publish']);
  execa.sync('git', ['push', '--follow-tags']);
}

release();

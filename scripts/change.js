const { yParser, chalk } = require('@umijs/utils');
const exec = require('./utils/exec');
const args = yParser(process.argv);

function logStep(name) {
  console.log(`${chalk.gray('>> Change:')} ${chalk.magenta.bold(name)}`);
}

async function changeWorkflow() {
  await exec('pnpm', ['changeset', 'add']);
  await exec('pnpm', ['changeset', 'version']);
  await exec('pnpm', ['run', 'version']);
}

async function change() {
  if (args.preChange) {
    const preType = args.preChange;
    logStep('preChange add');
    await exec('pnpm', ['changeset', `pre enter ${preType}`]);
    await changeWorkflow();
    await exec('pnpm', ['changeset', 'pre exit']);
  } else {
    logStep('change add');
    await changeWorkflow();
  }
}

change();

const { Octokit } = require('@octokit/rest');
const shell = require('shelljs');

const octokit = new Octokit();

async function queryContributors(owner, repo, page = 1) {
  let { data: contributors } = await octokit.rest.repos.listContributors({
    owner,
    repo,
    per_page: 100,
    page,
  });

  if (contributors.length >= 100) {
    contributors = contributors.concat(await queryContributions(page + 1));
  }

  return contributors;
}

function exec() {
  // 方式1: Get contributors by run `npm run contributors:check`
  // 方式2: queryContributors
  queryContributors('antvis', 'g2plot').then((contributors) => {
    shell.echo('contributors', contributors.length);
    contributors
      .sort((a, b) => b.contributions - a.contributions)
      .forEach((contributor) => {
        shell.exec(`tnpm run contributors:add ${contributor.login} code`);
      });
  });
}

exec();

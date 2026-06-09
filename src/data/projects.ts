export interface ProjectImage {
  src: string;
  width: number;
  height: number;
}

export interface ProjectSummary {
  id: string;
  name: string;
  desc: string;
  href: string;
  tech: string[];
  current?: boolean;
  stars?: number;
  image?: ProjectImage;
}

export const workProjects: ProjectSummary[] = [
  {
    id: 'github-copilot-app',
    name: 'GitHub Copilot app',
    desc: 'GitHub-native desktop experience to start agentic development from the work in front of you, keep it isolated, steer it as it goes, and land the change through pull request review.',
    href: 'https://github.com/features/ai/github-app',
    tech: ['Go', 'TypeScript', 'AI/ML'],
    current: true,
  },
  {
    id: 'github-copilot-cloud-agent',
    name: 'GitHub Copilot cloud agent',
    desc: 'Autonomous coding agent that picks up issues, opens pull requests, and iterates on review feedback — with cloud-hosted execution and integrations across GitHub, Slack, and Teams.',
    href: 'https://github.com/features/copilot/agents',
    tech: ['Go', 'TypeScript', 'AI/ML'],
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    desc: 'CI/CD and automation platform built into GitHub. Helped launch and scale from zero to millions of workflows per day.',
    href: 'https://github.com/features/actions',
    tech: ['C#', 'TypeScript', 'Azure'],
  },
  {
    id: 'github-models',
    name: 'GitHub Models',
    desc: 'Playground and API bringing industry-leading AI models to 100M+ developers on GitHub — experiment, compare, and deploy from playground to production.',
    href: 'https://github.com/marketplace/models',
    tech: ['Go', 'TypeScript', 'AI/ML'],
  },
];

export const preGitHubProjects: ProjectSummary[] = [
  {
    id: 'azure-boards',
    name: 'Azure Boards',
    desc: 'Work item tracking, backlogs, and sprint planning in Azure DevOps.',
    href: 'https://azure.microsoft.com/en-us/products/devops/boards',
    tech: ['C#', 'TypeScript', 'Azure'],
  },
];

export const sideProjects: ProjectSummary[] = [
  {
    id: 'go-workflows',
    name: 'go-workflows',
    desc: 'Durable workflows for Go similar to DTFx/Cadence/Temporal. Supports different backends (MySQL, SQLite, Redis).',
    href: '/projects/go-workflows',
    stars: 489,
    tech: ['Go', 'MySQL', 'Redis'],
  },
  {
    id: 'github-actions-for-vs-code',
    name: 'GitHub Actions for VS Code',
    desc: 'VS Code extension for GitHub Actions workflows and runs.',
    href: 'https://marketplace.visualstudio.com/items?itemName=cschleiden.vscode-github-actions',
    stars: 301,
    tech: ['TypeScript', 'VS Code'],
  },
  {
    id: 'impera',
    name: 'Impera',
    desc: 'Free browser game inspired by the "world domination" board game. Play with your friends on many different maps.',
    href: 'https://www.imperaonline.de',
    tech: [],
    image: { src: '/static/images/projects/impera-map.png', width: 421, height: 280 },
  },
  {
    id: 'die-verbotene-welt',
    name: 'Die verbotene Welt',
    desc: 'Award-winning freeware real-time strategy game for Windows, Linux, and macOS. Built with the sechsta sinn team as lead programmer; ~220k LOC C++ and 30k LOC Lua over a decade.',
    href: 'http://www.sechsta-sinn.de',
    tech: [],
    image: { src: '/static/images/projects/dvw-1.jpg', width: 799, height: 599 },
  },
  {
    id: 'github-actions-hero',
    name: 'GitHub Actions Hero',
    desc: 'Interactive tutorial and visualizer for GitHub Actions workflows.',
    href: 'https://github-actions-hero.vercel.app',
    stars: 116,
    tech: ['TypeScript', 'React'],
    image: { src: '/static/images/projects/github-actions-hero.png', width: 1280, height: 720 },
  },
  {
    id: 'effective-github-actions-workflow',
    name: 'Effective GitHub Actions workflow',
    desc: 'GitHub CLI extension to display the effective workflow for a given workflow run.',
    href: 'https://github.com/cschleiden/gh-effective-workflow',
    stars: 4,
    tech: ['Go'],
  },
  {
    id: 'github-actions-cli-lint',
    name: 'GitHub Actions CLI Lint',
    desc: 'GitHub CLI extension to lint GitHub Actions workflows using actionlint.',
    href: 'https://github.com/cschleiden/gh-actionlint',
    stars: 21,
    tech: ['Go'],
  },
  {
    id: 'jest-github-actions-reporter',
    name: 'Jest GitHub Actions reporter',
    desc: 'Custom Jest reporter to display tests failures as annotations in GitHub Actions runs.',
    href: 'https://github.com/cschleiden/jest-github-actions-reporter',
    stars: 48,
    tech: ['TypeScript'],
  },
  {
    id: 'replace-tokens',
    name: 'Replace Tokens',
    desc: 'GitHub Action to replace tokens in files with values from environment variables.',
    href: 'https://github.com/cschleiden/replace-tokens',
    stars: 73,
    tech: ['TypeScript'],
  },
];

const featuredSideProjectIds = [
  'go-workflows',
  'github-actions-for-vs-code',
  'github-actions-hero',
  'impera',
] as const;

export const featuredSideProjects = featuredSideProjectIds.map(id => {
  const project = sideProjects.find(project => project.id === id);
  if (!project) {
    throw new Error(`Missing featured side project: ${id}`);
  }
  return project;
});

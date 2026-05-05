export interface ProjectLink {
  label: string;
  href: string;
  type?: 'github' | 'docs' | 'site' | 'post' | 'package';
}

export interface ProjectFeature {
  title: string;
  desc: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  sections: { heading: string; body: string }[];
  features: ProjectFeature[];
  tech: string[];
  links: ProjectLink[];
  relatedPosts?: string[];
  status?: string;
}

const projectDetails: Record<string, ProjectDetail> = {
  'go-workflows': {
    slug: 'go-workflows',
    title: 'go-workflows',
    tagline: 'Durable workflows for Go.',
    intro:
      "go-workflows is a Go library for writing durable, long-running workflows. It borrows concepts from Azure's Durable Task Framework (DTFx) and Temporal — workflows look like ordinary, sequential code, but the runtime persists every step so executions survive process crashes, deployments, and reschedules.",
    sections: [
      {
        heading: 'Why durable workflows',
        body: "Modern services often have to orchestrate calls across many systems — long-running, with retries, timeouts, and human-in-the-loop steps. Doing that by hand with queues, state tables, and ad-hoc retry logic obscures the business logic and tends to break under failure. Durable workflow engines abstract that away: you write what looks like normal sequential code, and the engine handles persistence, recovery, and replay.",
      },
      {
        heading: 'How it works',
        body: "Workflows are recorded as an event-sourced history. When a workflow calls into the runtime — to schedule an activity, sleep, or wait for a signal — the engine pauses execution and writes an event. The activity runs (possibly on another machine), its result is appended to the history, and the workflow resumes by replaying events back to that point. Activities are plain Go code and may have side effects; workflows must be deterministic.",
      },
      {
        heading: 'Architecture',
        body: 'The library is built around pluggable backends. A backend persists workflow events and is the coordination point between clients (which start workflows) and workers (which execute them). Both clients and workers can live in the same process for simple deployments, or be split across services.',
      },
    ],
    features: [
      { title: 'Sequential, readable workflow code', desc: 'Write workflows as ordinary Go functions; the runtime handles persistence and recovery.' },
      { title: 'Pluggable backends', desc: 'SQLite, MySQL, and Redis backends are supported. The in-memory backend is handy for tests.' },
      { title: 'Activities, signals, timers, sub-workflows', desc: 'All the primitives you expect from a durable execution engine.' },
      { title: 'Generic-friendly API', desc: 'Type-safe activity invocation using Go generics.' },
      { title: 'OpenTelemetry tracing', desc: 'Logical workflow execution shown as continuous spans across activities, sub-workflows, and retries.' },
      { title: 'Built-in diagnostics UI', desc: 'Inspect running and completed workflows, their event history, and pending tasks.' },
    ],
    tech: ['Go', 'SQLite', 'MySQL', 'Redis', 'OpenTelemetry'],
    links: [
      { label: 'GitHub repository', href: 'https://github.com/cschleiden/go-workflows', type: 'github' },
      { label: 'Documentation', href: 'https://cschleiden.github.io/go-workflows/', type: 'docs' },
      { label: 'pkg.go.dev', href: 'https://pkg.go.dev/github.com/cschleiden/go-workflows', type: 'package' },
    ],
    relatedPosts: [
      '2022-02-13-go-workflows-part1',
      '2022-03-06-go-workflows-generics',
      '2022-05-02-go-workflows-part2',
      '2024-11-03-improved-tracing-for-goworkflows',
    ],
    status: 'Active',
  },
};

export default projectDetails;

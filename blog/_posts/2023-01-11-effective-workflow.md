---
layout: post
categories: blog
title: 'Reusable Effective Workflow GitHub CLI extension'
# date: 2023-01-11T20:49:06.690Z
---
GitHub Actions supports a feature for reuse called ["Reusable workflows"](https://docs.github.com/en/actions/using-workflows/reusing-workflows). It allows you to include workflow jobs defined in a shared workflow file.

One drawback is that you don't get to see the whole workflow file for a workflow run anymore. The UI still shows you the _calling_ workflow, but you don't see the _called_ workflows at their respective versions. For example, when this [simple workflow](https://github.com/cschleiden/cschleiden-calling/blob/main/.github/workflows/calling.yml):

```yaml
name: Call a reusable workflow

on:
  workflow_dispatch:

jobs:
  call-workflow:
    uses: cschleiden/cschleiden-called/.github/workflows/called.yml@main
    with:
      name: 'monalisa'

  call-workflow2:
    uses: cschleiden/cschleiden-called/.github/workflows/called.yml@main
    with:
      name: 'cschleiden'

  echo:
    runs-on: ubuntu-latest
    steps:
    - run: echo 'world'
```

is run, it uses workflows from another repo: `cschleiden/cschleiden-called`. But when you look at the [workflow file for the run](https://github.com/cschleiden/cschleiden-calling/actions/runs/3899294169/workflow) in the UI:

![workflow file for the run](/assets/posts/2023-01-11-effective-workflow/2023-01-11-20-57-57.png)

you don't see the called workflows. You also don't know exactly which version was used. While it's relatively easy in this example since the called workflows are referenced from default branch:

```yaml
  call-workflow2:
    uses: cschleiden/cschleiden-called/.github/workflows/called.yml@main
```

in other scenarios they might be referenced from other branches, tags, or SHAs.

One way to figure out is to use the [REST API](https://api.github.com/repos/cschleiden/cschleiden-calling/actions/runs/3899294169) which does include the information which called workflows were included:

```json
  "referenced_workflows": [
    {
      "path": "cschleiden/cschleiden-called/.github/workflows/called.yml@main",
      "sha": "21f5e61d865b5e06afff7fa8e05251908a98e955",
      "ref": "refs/heads/main"
    },
    {
      "path": "cschleiden/cschleiden-called/.github/workflows/called2.yml@main",
      "sha": "21f5e61d865b5e06afff7fa8e05251908a98e955",
      "ref": "refs/heads/main"
    }
  ],
```

Since getting the full picture from the API takes some manual work, I put together a quick [GitHub CLI](http://github.com/cli/cli) extension to show the _effective workflow_, that is the calling workflow and every workflow in the reusable workflow callchain: https://github.com/cschleiden/gh-effective-workflow

It's easy to install, once you have the GitHub CLI installed, just run:

```bash
$ gh extension install https://github.com/cschleiden/gh-effective-workflow
```

and then you can use

```bash
$ gh effective-workflow view <run-id>
```

to see the calling workflow, every called workflow at the SHA that was used for the run and from where it was called. So as an example for the [run](https://github.com/cschleiden/cschleiden-calling/actions/runs/3899294169) mentioned before, the output would be:

![Example output of the extension](/assets/posts/2023-01-11-effective-workflow/2023-01-11-21-05-40.png)
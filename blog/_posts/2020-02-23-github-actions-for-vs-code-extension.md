---
layout: post
categories: blog
title: GitHub Actions for VS Code extension
date: 2020-02-23T21:19:06.690Z
---
I've always been a fan of VS Code's extensibility model. There a great docs and examples, and overall the development experience is very nice. So when the new GitHub [Actions API](https://github.blog/changelog/2020-01-27-github-actions-api-beta/) came out, I started building an extension utilizing that to show GitHub Actions workflows and runs for your current repository in VS Code. 

The extension checks the current workspace for git repositories with an `origin` of  `github.com`. If it finds that, it uses the API to retrieve workflows and their runs. 

You can then see whether a run failed or succeeded, for what commit it was run, what event triggered it, and re-run or cancel if it failed or is in-progress. 

The most recent addition is a way to check the logs for any runs directly from the editor:

![](/assets/uploads/logs.gif)

I have a few more things in mind to add in the future, but for now you can install the extension from the marketplace:

<https://marketplace.visualstudio.com/items?itemName=cschleiden.vscode-github-actions> 

and the code is available at 

<https://github.com/cschleiden/vscode-github-actions>.

---
id: 351
title: VS2013 build fails without errors
date: 2013-10-23T09:21:14-07:00
author: cschleiden
layout: post
guid: https://cschleiden.wordpress.com/?p=351
permalink: /vs2013-build-fails-without-errors/
publicize_twitter_user:
  - cschleiden
publicize_twitter_url:
  - http://t.co/68lwHwZiYq
categories:
  - QuickTip
  - Uncategorized
tags:
  - visualstudio
---
I just had a case where my Visual Studio 2013 solution failed to build even though no errors were displayed in the output pane or the log. The same happened for all the other targets (Clean Solution etc.). Building from the command line using msbuild directly, on the other hand, worked fine. The solution (as in previous VS versions) was to delete the user-specific settings. So a quick:

`del /s /q *.user`

fixed the problem for me.
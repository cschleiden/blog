---
id: 369
title: Windows 8.1 Search Indexing
date: 2014-01-10T20:42:18-07:00
author: cschleiden
layout: post
guid: https://cschleiden.wordpress.com/?p=369
permalink: /windows-8-1-search-indexing/
publicize_twitter_user:
  - cschleiden
publicize_twitter_url:
  - http://t.co/X9NbokhnoF
categories:
  - QuickTip
  - Uncategorized
tags:
  - search
  - Windows8.1
---
Recently my Windows Search started to misbehave. It consumed large amounts of memory and CPU time. In addition, the index (in C:\ProgramData\Microsoft\Search\Data) grew to several gigabytes. 

To workaround that, I tried to reduce the indexed locations (Win + W, “change how windows searches”) and rebuild the index. So I changed the locations to only index Documents and hit “Rebuild”:

[<img title="image" style="border-top:0;border-right:0;background-image:none;border-bottom:0;float:none;padding-top:0;padding-left:0;margin-left:auto;border-left:0;display:block;padding-right:0;margin-right:auto;" border="0" alt="image" src="/assets/wp-content/uploads/2014/01/image_thumb.png" width="244" height="147" />](/assets/wp-content/uploads/2014/01/image.png)

While this fixed the issues mentioned before, something new occurred. Suddenly, every time I tried to search for something in the search charm the computer began to freeze, keystrokes were not accepted at all or with a severe delay. The troubleshooter

[<img title="image" style="border-top:0;border-right:0;background-image:none;border-bottom:0;float:none;padding-top:0;padding-left:0;margin-left:auto;border-left:0;display:block;padding-right:0;margin-right:auto;" border="0" alt="image" src="/assets/wp-content/uploads/2014/01/image_thumb1.png" width="244" height="32" />](/assets/wp-content/uploads/2014/01/image1.png)

did not produce any meaningful results and rebuilding the index did not help either.

It turned out, the solution is that you **have** to have your _AppData_ folder in the indexed locations. So if you have the same problem just add 

> C:\Users\<user>\AppData\

back the the indexed locations, rebuild your index, and you are good to go again.
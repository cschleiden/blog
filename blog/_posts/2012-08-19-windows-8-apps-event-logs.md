---
id: 340
title: Windows 8 apps event logs
date: 2012-08-19T19:09:07-07:00
author: cschleiden
layout: post
guid: https://cschleiden.wordpress.com/?p=340
permalink: /windows-8-apps-event-logs/
categories:
  - C++
  - Uncategorized
tags:
  - Development
  - windows8
---
While porting a rather large native application to Window 8 (Windows Store application) I encountered some startup problems. Errors like the following appeared:

> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> Microsoft Visual Studio  
> &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212;  
> Unable to activate Windows Store app &#8216;bf60ce1b-2569-4c4c-b319-0b3a2c9c1374_7qc4g378g6z3m!App&#8217;. The XXXXX.exe process started, but the activation request failed with error &#8216;The app didn&#8217;t start&#8217;.

The linked help page points to the event log located at:

> Application and Services Log\Microsoft\Windows\Immersive-Shell folder.

<font color="#000000">However, there is no log at this place. </font><font color="#000000">The general application log then points to:</font>

> Activation of app 716190BC-25B0-45AB-A34E-4174A7ACEA5F_7qc4g378g6z3m!App failed with error: The app didn&#8217;t start. See the Microsoft-Windows-TWinUI/Operational log for additional information.

<font color="#666666">This log is also a bit difficult to find, it’s located below the “Apps” folder:</font>

[<img title="image" style="border-top:0;border-right:0;background-image:none;border-bottom:0;padding-top:0;padding-left:0;border-left:0;display:inline;padding-right:0;" border="0" alt="image" src="/assets/wp-content/uploads/2012/08/image_thumb.png" width="244" height="48" />](/assets/wp-content/uploads/2012/08/image.png)

In the end the problems were caused by external dlls which were not build correctly.
---
id: 252
title: Keep Outlook quiet during a pomodoro
date: 2011-05-31T12:05:05-07:00
author: cschleiden
layout: post
guid: http://cschleiden.wordpress.com/?p=252
permalink: /keep-outlook-quiet-during-a-pomodoro/
categories:
  - Productivity
  - Uncategorized
---
At the moment I&#8217;m using the excellent <a href="http://pomodoro.ugolandini.com/" target="_blank">Pomodoro</a> application on my Mac for tracking all my pomodoros during the day. While it already supports changing your Adium/Skype status to DND with a custom message during a pomodoro I also wanted to suppress Outlook &#8220;new mail&#8221; notifications.

Fortunately Pomodoro supports executing AppleScript scripts for certain events so I used the following snippets to enable/disable these Outlook notifications:

Disable on start/resume:

> <pre>tell application "Microsoft Outlook"
  set display alerts to false
  set play sound on new message to false
end tell</pre>

Enable on end/reset:

> <pre>tell application "Microsoft Outlook"
  set display alerts to true
  set play sound on new message to true
end tell</pre>

It&#8217;s working great so far.
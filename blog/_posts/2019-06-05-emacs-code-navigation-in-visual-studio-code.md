---
id: 913
title: Emacs Code Navigation in Visual Studio Code
date: 2019-06-05T19:18:35-07:00
author: cschleiden
layout: post
guid: https://www.cschleiden.dev/?p=913
permalink: /emacs-code-navigation-in-visual-studio-code/

---
I&#8217;ll admit it, in the eternal fight between vim and Emacs I&#8217;m firmly on the Emacs side. Now, I haven&#8217;t used actual Emacs in a while, but I&#8217;m so used to the navigation shortcuts that on every machine I use, I:

  1. map `CapsLock` to be another `Ctrl` key, for Windows I keep the .reg file below in my OneDrive and import it on every new machine.
  2. update my VS Code keybindings to enable the common Emacs keyboard navigation shortscuts like `Ctrl+n`, `Ctrl+p`, etc. My settings sync via the excellent [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) plugin, but I also keep them up-to-date in the linked gist below. Unfortunately, Ctrl+n/p does not work in all popups and view, so sometimes it&#8217;s still required to use the cursor keys, but for most code operations my fingers don&#8217;t have to leave the home row.
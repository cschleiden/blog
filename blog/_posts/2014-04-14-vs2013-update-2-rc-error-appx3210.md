---
id: 371
title: 'VS2013 Update 2 RC &#8211; Error APPX3210'
date: 2014-04-14T10:42:34-07:00
author: cschleiden
layout: post
guid: http://cschleiden.wordpress.com/?p=371
permalink: /vs2013-update-2-rc-error-appx3210/
publicize_twitter_url:
  - http://t.co/iaSA4hD61n
publicize_twitter_user:
  - cschleiden
categories:
  - QuickTip
  - Uncategorized
tags:
  - visualstudio
  - winrt
---
If you stumble across the following error message with Visual Studio 2013 Update 2 RC:

1>[…]\Package.appxmanifest(19,64): error APPX3210: App manifest references the image &#8216;Assets/Icon150.png&#8217; which does not have a candidate in main app package.

have a look a at the manifest file. In my case I had been using forward slashes in some of the asset paths. While this used to work before update 2 it now leads to an error. So to fix this I had to replace this:

<pre>&lt;m2:DefaultTile Square310x310Logo="Assets\Icon310.png" <br />  Wide310x150Logo="Assets/Icon150.png"&gt;</pre>

with this:

<pre>&lt;m2:DefaultTile Square310x310Logo="Assets\Icon310.png" <br />  Wide310x150Logo="Assets\Icon150.png"&gt;</pre>

and the error went away.
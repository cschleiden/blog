---
id: 360
title: DELETE Verb not working with WebApi and IIS
date: 2013-11-28T20:23:30-07:00
author: cschleiden
layout: post
guid: https://cschleiden.wordpress.com/?p=360
permalink: /delete-verb-not-working-with-webapi-and-iis/
publicize_twitter_user:
  - cschleiden
publicize_twitter_url:
  - http://t.co/JFlJW5TfT1
categories:
  - Solution
  - Uncategorized
---
Recently I’ve had a problem where a deployed WebApi service did not accept the DELETE verb (locally, using IISExpress it worked). The <a href="http://forums.iis.net/t/1166025.aspx" target="_blank">solution</a> was to remove the WebDAV module and handler for the specific site. So extend the web.config of the WebApi project with:

> <font face="Courier New"><system.webServer> <br /></font><font face="Courier New">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <modules> <br /></font><font face="Courier New">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <remove name="WebDAVModule" /> <br /></font><font face="Courier New">&#160;&#160;&#160;&#160;&#160;&#160;&#160; </modules> <br /></font><font face="Courier New">&#160;&#160;&#160;&#160;&#160;&#160;&#160; <handlers> <br /></font><font face="Courier New">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; <remove name="WebDAV" /> <br /></font><font face="Courier New">&#160;&#160;&#160;&#160;&#160;&#160;&#160; </handlers> <br /></font><font face="Courier New"></system.webServer></font>

Then it worked just fine.
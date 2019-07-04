---
id: 193
title: ActionLink with Image in ASP.NET MVC 2
date: 2010-08-24T12:10:03-07:00
author: cschleiden
layout: post
guid: https://cschleiden.wordpress.com/2010/08/24/actionlink-with-image-in-asp-net-mvc-2/
permalink: /actionlink-with-image-in-asp-net-mvc-2/
categories:
  - QuickTip
  - Uncategorized
tags:
  - ASP.NET MVC
  - C++
---
As far as I know, this is one of the simplest ways to insert an ActionLink into your ASP.NET MVC 2 View with an image instead of text:

<div>
  <blockquote>
    <pre>&lt;a href="&lt;%: Url.Action("Detail", new  { param1 = "blah" } )  %&gt;"&gt;
  &lt;img src="../../Content/images/magnifier.png" /&gt;
&lt;/a&gt;</pre>
  </blockquote>
</div>

Any simpler solutions?
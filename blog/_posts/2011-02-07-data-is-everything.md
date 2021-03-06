---
id: 248
title: Data is everything!
date: 2011-02-07T14:33:15-07:00
author: cschleiden
layout: post
guid: https://cschleiden.wordpress.com/2011/02/07/data-is-everything/
permalink: /data-is-everything/
categories:
  - Impera
  - Uncategorized
tags:
  - data
---
<p align="left">
  As we all know data is everything in optimizing and improving web pages. Until last week <a href="http://www.imperaonline.de/">Impera</a> lacked the functionality to display data over time. Even though we were able to show some snapshots of certain metrics (in German):
</p>

<p align="left">
  <a href="/assets/wp-content/uploads/2011/02/image.png"><img style="background-image:none;border-bottom:0;border-left:0;padding-left:0;padding-right:0;display:inline;border-top:0;border-right:0;padding-top:0;" title="image" border="0" alt="image" src="/assets/wp-content/uploads/2011/02/image_thumb.png" width="420" height="184" /></a>
</p>

<p align="left">
  there was no continuous tracking and measuring enabled. On Friday I finally wrote some background scripts which save certain metrics at fixed time intervals. These can then be displayed using the amazing jQuery <a href="http://code.google.com/p/flot/" target="_blank">flot</a> graph library as beautifully formatted graphs over time. Here you can see the average number of online players per hour (GMT+1 timezone and mostly German users from GMT+1):
</p>

[<img style="background-image:none;padding-left:0;padding-right:0;display:inline;padding-top:0;border-width:0;" title="image" border="0" alt="image" src="/assets/wp-content/uploads/2011/02/image_thumb1.png" width="590" height="265" />](/assets/wp-content/uploads/2011/02/image1.png)

I think the results are as expected with a peak during the day and a valley after 2 a.m. However, this data is only aggregated over a timespan of two and a half days. I expect the following graph to be more of interest when a few weeks of data have been captured: 

[<img style="background-image:none;padding-left:0;padding-right:0;display:inline;padding-top:0;border-width:0;" title="image" border="0" alt="image" src="/assets/wp-content/uploads/2011/02/image_thumb2.png" width="589" height="265" />](/assets/wp-content/uploads/2011/02/image2.png)

Even with this little data it can be inferred, that Impera players get up earlier on Mondays than on weekends (what a surprise!). 

There are a few other graphs available but more data is needed for them to be of any interest.
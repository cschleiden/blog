---
id: 95
title: 'HowTo: Export Excel Charts as PDF to include in LaTeX document'
date: 2009-09-28T16:35:12-07:00
author: cschleiden
layout: post
guid: http://cschleiden.wordpress.com/?p=95
permalink: /howto-export-excel-charts-as-pdf-to-include-in-latex-document/
twitter_cards_summary_img_size:
  - 'a:7:{i:0;i:848;i:1;i:459;i:2;i:2;i:3;s:24:"width="848" height="459"";s:4:"bits";i:8;s:8:"channels";i:3;s:4:"mime";s:10:"image/jpeg";}'
geo_public:
  - "0"
categories:
  - HowTo
  - Productivity
  - QuickTip
  - Uncategorized
---
[**Update**]

I&#8217;ve written an [updated post](http://cschleiden.wordpress.com/2011/08/19/export-multiple-charts-from-excel-office-to-pdf-for-latex-inclusion-at-once/ "Export Multiple Charts from Excel (Office) To PDF For LaTeX Inclusion At Once") for Mac and Excel 2011 users.

[**Update2**]

From Leanne in the comments:

> Some useful remark I found elsewhere: “You can put the graph as a separate document tab (opposed to inside a sheet)”. If you then follow the same steps i.e. save as PDF, then you don’t have to do the things with the margins.

&#8212;-

For the evaluation part of my thesis I had to include a lot of charts. The _scientific_ approach proably would have been to use _gnuplot_, but my tool of choice for any kind of charts is Microsoft Excel 2007. However, I found no simple and easy way to directly include Excel charts into my LaTeX thesis document. After a lot of experimenting and looking at other people&#8217;s solutions I came up with the following:

1. Create chart in Excel as usual

<!--more-->

2. Select chart:

[<img class="size-full wp-image-96 alignnone" title="1" src="/assets/wp-content/uploads/2009/09/1.jpg" alt="1" width="500" height="270" srcset="/assets/wp-content/uploads/2009/09/1.jpg 848w, /assets/wp-content/uploads/2009/09/1-300x162.jpg 300w, /assets/wp-content/uploads/2009/09/1-768x416.jpg 768w" sizes="(max-width: 500px) 100vw, 500px" />](/assets/wp-content/uploads/2009/09/1.jpg)

3. Save As : PDF

[<img class="alignnone size-full wp-image-97" title="2" src="/assets/wp-content/uploads/2009/09/2.jpg" alt="2" width="500" height="570" srcset="/assets/wp-content/uploads/2009/09/2.jpg 539w, /assets/wp-content/uploads/2009/09/2-263x300.jpg 263w" sizes="(max-width: 500px) 100vw, 500px" />](/assets/wp-content/uploads/2009/09/2.jpg)

4. Choose to publish only selected chart:

[<img class="alignnone size-full wp-image-98" title="3" src="/assets/wp-content/uploads/2009/09/3.jpg" alt="3" width="500" height="427" srcset="/assets/wp-content/uploads/2009/09/3.jpg 832w, /assets/wp-content/uploads/2009/09/3-300x256.jpg 300w, /assets/wp-content/uploads/2009/09/3-768x656.jpg 768w" sizes="(max-width: 500px) 100vw, 500px" />](/assets/wp-content/uploads/2009/09/3.jpg)

5. Use Acrobat Professional (or similar) to trim white borders around chat (can also be done in LaTeX through margins, but this way it&#8217;s easier and less work to embed the chart):

[<img class="alignnone size-full wp-image-105" title="4" src="/assets/wp-content/uploads/2009/09/41.jpg" alt="4" width="500" height="339" srcset="/assets/wp-content/uploads/2009/09/41.jpg 675w, /assets/wp-content/uploads/2009/09/41-300x204.jpg 300w" sizes="(max-width: 500px) 100vw, 500px" />](/assets/wp-content/uploads/2009/09/41.jpg)

6. Save:

[<img class="alignnone size-full wp-image-101" title="6" src="/assets/wp-content/uploads/2009/09/6.jpg" alt="6" width="500" height="238" srcset="/assets/wp-content/uploads/2009/09/6.jpg 742w, /assets/wp-content/uploads/2009/09/6-300x143.jpg 300w" sizes="(max-width: 500px) 100vw, 500px" />](/assets/wp-content/uploads/2009/09/6.jpg)

7. Embed:

[<img class="alignnone size-full wp-image-102" title="7" src="/assets/wp-content/uploads/2009/09/7.jpg" alt="7" width="500" height="109" srcset="/assets/wp-content/uploads/2009/09/7.jpg 600w, /assets/wp-content/uploads/2009/09/7-300x66.jpg 300w" sizes="(max-width: 500px) 100vw, 500px" />](/assets/wp-content/uploads/2009/09/7.jpg)

8. Result:

[<img class="alignnone size-full wp-image-103" title="8" src="/assets/wp-content/uploads/2009/09/8.jpg" alt="8" width="500" height="284" srcset="/assets/wp-content/uploads/2009/09/8.jpg 654w, /assets/wp-content/uploads/2009/09/8-300x171.jpg 300w" sizes="(max-width: 500px) 100vw, 500px" />](/assets/wp-content/uploads/2009/09/8.jpg)

Scaling (in LaTeX) to 50%:

[<img class="alignnone size-full wp-image-104" title="9" src="/assets/wp-content/uploads/2009/09/9.jpg" alt="9" width="500" height="202" srcset="/assets/wp-content/uploads/2009/09/9.jpg 646w, /assets/wp-content/uploads/2009/09/9-300x122.jpg 300w" sizes="(max-width: 500px) 100vw, 500px" />](/assets/wp-content/uploads/2009/09/9.jpg)

9: Done

**[Update 13/08/2011]**

[<img class="aligncenter size-medium wp-image-283" title="screenshot" src="/assets/wp-content/uploads/2009/09/screenshot.png?w=300" alt="" width="300" height="211" />](/assets/wp-content/uploads/2009/09/screenshot.png)

I&#8217;m again writing a thesis and this time I&#8217;m using OS X and apparently with Microsoft Excel 2011 for Mac you do not need to specifically crop the resulting pdf as the screenshot above shows. Just select &#8220;Save as picture&#8221; from the diagram context menu and select pdf. Pleasant surprise as I don&#8217;t have access to Acrobat Pro anymore (I was also told that the &#8220;pdfcrop&#8221; utility works just as well, but one step less is always good).
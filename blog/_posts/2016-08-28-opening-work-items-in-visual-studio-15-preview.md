---
id: 777
title: Opening Work items in Visual Studio 2017
date: 2016-08-28T14:34:11-07:00
author: cschleiden
layout: post
guid: https://cschleiden.wordpress.com/?p=777
permalink: /opening-work-items-in-visual-studio-15-preview/
geo_public:
  - "0"
categories:
  - Azure DevOps
tags:
  - TFS
  - visualstudio
---
If you have used [Visual Studio 2017](https://www.visualstudio.com/en-us/downloads/visual-studio-next-downloads-vs.aspx) to connect to a [Team Services](https://www.visualstudio.com/products/visual-studio-team-services-vs) instance, or you follow the [Microsoft ALM blog](https://blogs.msdn.microsoft.com/visualstudioalm/) you will have noticed that with Visual Studio 2017: <a style="text-align: center; line-height: 1.5;" href="https://blogs.msdn.microsoft.com/visualstudioalm/2016/08/22/work-items-now-open-in-the-web-from-visual-studio-15/">Work items now open in the web from Visual Studio ’15’</a>!

While the official post shows why that change was made and what advantages the web form brings, I wanted to quickly point out some small things that were done to make this behavior more usable.

You can follow along by downloading [Visual Studio 2017](https://www.visualstudio.com/en-us/downloads/visual-studio-next-downloads-vs.aspx) and connecting to your [Team Services](https://www.visualstudio.com/products/visual-studio-team-services-vs) or [Team Foundation Server 2017](https://www.visualstudio.com/en-us/news/releasenotes/tfs15-relnotes) instance.

# Running Queries from Visual Studio

There is still the full work item query tree available in Visual Studio, including favorites:

[<img class="size-full wp-image-807 aligncenter" src="/assets/wp-content/uploads/2016/08/team-explorer-1.png" alt="team-explorer" width="325" height="584" srcset="/assets/wp-content/uploads/2016/08/team-explorer-1.png 325w, /assets/wp-content/uploads/2016/08/team-explorer-1-167x300.png 167w" sizes="(max-width: 325px) 100vw, 325px" />](/assets/wp-content/uploads/2016/08/team-explorer-1.png)

You can also still create and run new or existing queries and look at the results:

[<img class="size-full wp-image-813 aligncenter" src="/assets/wp-content/uploads/2016/08/query-1.png" alt="query-1" width="620" height="402" srcset="/assets/wp-content/uploads/2016/08/query-1.png 1067w, /assets/wp-content/uploads/2016/08/query-1-300x195.png 300w, /assets/wp-content/uploads/2016/08/query-1-768x498.png 768w, /assets/wp-content/uploads/2016/08/query-1-1024x664.png 1024w" sizes="(max-width: 620px) 100vw, 620px" />](/assets/wp-content/uploads/2016/08/query-1.png)

If you look at the screenshot above, you can see that I have run the &#8220;My Bugs&#8221; query and that I have selected the second work item from the result, with id 62. When I open this work item now, it will launch in my browser and display the now familiar modern work item form:

[<img class="size-full wp-image-814 aligncenter" src="/assets/wp-content/uploads/2016/08/query-2.png" alt="Opened Work Item" width="620" height="458" srcset="/assets/wp-content/uploads/2016/08/query-2.png 935w, /assets/wp-content/uploads/2016/08/query-2-300x222.png 300w, /assets/wp-content/uploads/2016/08/query-2-768x568.png 768w" sizes="(max-width: 620px) 100vw, 620px" />](/assets/wp-content/uploads/2016/08/query-2.png)

And if you look closely, you can see that in the upper right hand corner of the work item form it displays &#8220;2 of 4&#8221; and some buttons:

[<img class="size-full wp-image-815 aligncenter" src="/assets/wp-content/uploads/2016/08/query-3.png" alt="query-3" width="244" height="40" />](/assets/wp-content/uploads/2016/08/query-3.png)

When you open a work item from a query result in Visual Studio, we don&#8217;t want you lose the query context you were in. So, when opening the work item we pass some context information along, in this case this included the name of the query that you ran and the position of the work item inside of that query result. Then, in the web we can restore this context, show you the work item, and also give you the option to easily switch to the next/previous work item in the &#8220;My Bugs&#8221; query:

[<img class="size-full wp-image-816 aligncenter" src="/assets/wp-content/uploads/2016/08/query-4.png" alt="query-4" width="311" height="82" srcset="/assets/wp-content/uploads/2016/08/query-4.png 311w, /assets/wp-content/uploads/2016/08/query-4-300x79.png 300w" sizes="(max-width: 311px) 100vw, 311px" />](/assets/wp-content/uploads/2016/08/query-4.png)

You can also just return to the full query result in the web:

[<img class="size-full wp-image-817 aligncenter" src="/assets/wp-content/uploads/2016/08/query-5.png" alt="query-5" width="620" height="458" srcset="/assets/wp-content/uploads/2016/08/query-5.png 935w, /assets/wp-content/uploads/2016/08/query-5-300x222.png 300w, /assets/wp-content/uploads/2016/08/query-5-768x568.png 768w" sizes="(max-width: 620px) 100vw, 620px" />](/assets/wp-content/uploads/2016/08/query-5.png)

Preserving the context this way works with all queries in Visual Studio, even new and unsaved ones.<figure id="attachment_818" aria-describedby="caption-attachment-818" style="width: 713px" class="wp-caption aligncenter">

[<img class="wp-image-818 size-full" src="/assets/wp-content/uploads/2016/08/new-query-1.png" alt="New, unsaved query in Visual Studio" width="713" height="350" srcset="/assets/wp-content/uploads/2016/08/new-query-1.png 713w, /assets/wp-content/uploads/2016/08/new-query-1-300x147.png 300w" sizes="(max-width: 713px) 100vw, 713px" />](/assets/wp-content/uploads/2016/08/new-query-1.png)<figcaption id="caption-attachment-818" class="wp-caption-text">New, unsaved query in Visual Studio</figcaption></figure> <figure id="attachment_819" aria-describedby="caption-attachment-819" style="width: 1009px" class="wp-caption aligncenter">[<img class="wp-image-819 size-full" src="/assets/wp-content/uploads/2016/08/new-query-2.png" alt="Work item opened from query result in web" width="1009" height="656" srcset="/assets/wp-content/uploads/2016/08/new-query-2.png 1009w, /assets/wp-content/uploads/2016/08/new-query-2-300x195.png 300w, /assets/wp-content/uploads/2016/08/new-query-2-768x499.png 768w" sizes="(max-width: 1009px) 100vw, 1009px" />](/assets/wp-content/uploads/2016/08/new-query-2.png)<figcaption id="caption-attachment-819" class="wp-caption-text">Work item opened from query result in web</figcaption></figure> <figure id="attachment_820" aria-describedby="caption-attachment-820" style="width: 1053px" class="wp-caption aligncenter">[<img class="wp-image-820 size-full" src="/assets/wp-content/uploads/2016/08/new-query-3.png" alt="Web query editor" width="1053" height="532" srcset="/assets/wp-content/uploads/2016/08/new-query-3.png 1053w, /assets/wp-content/uploads/2016/08/new-query-3-300x152.png 300w, /assets/wp-content/uploads/2016/08/new-query-3-768x388.png 768w, /assets/wp-content/uploads/2016/08/new-query-3-1024x517.png 1024w" sizes="(max-width: 1053px) 100vw, 1053px" />](/assets/wp-content/uploads/2016/08/new-query-3.png)<figcaption id="caption-attachment-820" class="wp-caption-text">Web query editor</figcaption></figure> 

# Linking Work Items to Code Changes

With the [Development](https://www.visualstudio.com/docs/work/backlogs/add-work-items#link-items-to-support-traceability) section on the new work item form we have made it really easy to view code changes that contributed to work item, be it he implementation of a feature or a bugfix:

<img class="size-full wp-image-793 aligncenter" src="https://cschleiden.files.wordpress.com/2016/08/commit-dnd-result.png" alt="commit-dnd-result.png" width="893" height="672" srcset="/assets/wp-content/uploads/2016/08/commit-dnd-result.png 893w, /assets/wp-content/uploads/2016/08/commit-dnd-result-300x226.png 300w, /assets/wp-content/uploads/2016/08/commit-dnd-result-768x578.png 768w" sizes="(max-width: 893px) 100vw, 893px" /> 

To associate your code changes with your work items you can create a link after the fact from the work item form, or in Visual Studio when you commit or check in your code. For both Git and TFVC you can still run work item queries from the _Changes_ or _Pending Changes_ view and even drag and drop work items from the query result to the _Related Work Items_ section. Adding a work item to a git commit:<figure id="attachment_792" aria-describedby="caption-attachment-792" style="width: 1062px" class="wp-caption aligncenter">

<img class="wp-image-792 size-full" src="https://cschleiden.files.wordpress.com/2016/08/commit-dnd.gif" alt="Adding a related work item to a git commit" width="1062" height="687" /> <figcaption id="caption-attachment-792" class="wp-caption-text">Adding a related work item to a git commit</figcaption></figure> 

#
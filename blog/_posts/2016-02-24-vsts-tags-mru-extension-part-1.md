---
id: 395
title: VSTS Tags MRU extension – Part 1
date: 2016-02-24T23:49:38-07:00
author: cschleiden
layout: post
guid: https://cschleiden.wordpress.com/?p=395
permalink: /vsts-tags-mru-extension-part-1/
publicize_twitter_user:
  - cschleiden
categories:
  - Azure DevOps
  - Uncategorized
tags:
  - HowTo
  - Microsoft
---
<p align="justify">
  I often find myself adding the same tags over and over to work items. Example: While we use features to group our user stories, it is often convenient to also add a tag per feature, since these can show up on the cards on the different boards, making it easy to see what belongs to which feature:
</p>

<p align="justify">
  <a href="/assets/wp-content/uploads/2016/02/image2.png"><img style="background-image:none;float:none;margin-left:auto;display:block;margin-right:auto;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb2.png" alt="image" width="376" height="203" border="0" /></a>
</p>

<p align="justify">
  So let’s say I’m working on a feature called “Tag Extension”. Our feature is broken down into a few user stories and and we have applied a tag “Tag Extension” to all of them:
</p>

<p align="justify">
  <a href="/assets/wp-content/uploads/2016/02/image.png"><img style="background-image:none;float:none;margin-left:auto;display:block;margin-right:auto;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb.png" alt="image" width="518" height="130" border="0" /></a>
</p>

<p align="justify">
  Then we add another story using the add panel on the backlog. It&#8217;s parented to the feature but it&#8217;s missing the tag applied to the other ones:
</p>

<p align="center">
  <a href="/assets/wp-content/uploads/2016/02/image3.png"><img class=" aligncenter" style="background-image:none;display:inline;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb3.png" alt="image" width="407" height="199" border="0" /></a><a href="/assets/wp-content/uploads/2016/02/image1.png"><img class=" aligncenter" style="background-image:none;display:inline;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb1.png" alt="image" width="514" height="184" border="0" /></a>
</p>

<p style="text-align:left;" align="center">
  While I could now open the user story and add the tag, what I’d like to have is something like this:
</p>

<p align="justify">
  <a href="/assets/wp-content/uploads/2016/02/image4.png"><img style="background-image:none;float:none;margin-left:auto;display:block;margin-right:auto;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb4.png" alt="image" width="421" height="390" border="0" /></a>
</p>

<p style="text-align:justify;" align="justify">
  Open the context menu for a work item anywhere in the product, have a list of the tags I added last to any work item, and allowing me to easily add one of them with a single click.
</p>

<p style="text-align:justify;" align="justify">
  Fortunately, we can build this with just a few lines of code using the VSTS extensions API. There is one little drawback &#8211; more on that later &#8211; but we can get quite close to what I just described. I will be using the seed project I mentioned <a href="https://cschleiden.wordpress.com/2016/02/24/extending-vsts-setup">earlier</a>, you can just clone the repo or download it as a zip if you want to follow along: <a title="https://github.com/cschleiden/vsts-extension-ts-seed-simple" href="https://github.com/cschleiden/vsts-extension-ts-seed-simple">https://github.com/cschleiden/vsts-extension-ts-seed-simple</a>.
</p>

<p align="justify">
  You can also skip immediately ahead to the finished version:<br /> <a href="https://github.com/cschleiden/vsts-extension-tags-mru">https://github.com/cschleiden/vsts-extension-tags-mru</a>
</p>

<h2 align="justify">
  Capturing tags as they are added
</h2>

The first task to generating the MRU list is to capture which tags are added to work items. In order to receive notifications about changes to the work item form, we need to add a contribution of type _<a href="https://www.visualstudio.com/integrate/extensions/develop/add-workitem-extension#listenforevents" target="_blank">ms.vss-work-web.work-item-notifications</a>_ to our extension. This allows us to listen to events like _onFieldChanged_ (a field on the form has been changed) or _onSaved_ (work item has been saved). So, we can just replace the existing contribution in the manifest with this:

[code language=&#8221;javascript&#8221; gutter=&#8221;false&#8221;]  
{  
"id": "tags-mru-work-item-form-observer",  
"type": "ms.vss-work-web.work-item-notifications",  
"targets": [  
"ms.vss-work-web.work-item-form"  
],  
"properties": {  
"uri": "index.html"  
}  
}  
[/code]  
and place the matching typescript code in app.ts (replacing the existing _VSS.register_ call):

[code language=&#8221;javascript&#8221; gutter=&#8221;false&#8221;]  
// Register work item change listener  
VSS.register("tags-mru-work-item-form-observer", (context) => {  
return {  
onFieldChanged: (args) => {  
if (args.changedFields["System.Tags"]) {  
var changedTags: string = args.changedFields["System.Tags"];

console.log(\`Tags changed: ${changedTags}\`);  
}  
},  
onLoaded: (args) => {  
console.log("Work item loaded");  
},  
onUnloaded: (args) => {  
console.log("Work item unloaded");  
},  
onSaved: (args) => {  
console.log("Work item saved");  
},  
onReset: (args) => {  
console.log("Work item reset");  
},  
onRefreshed: (args) => {  
console.log("Work item refreshed");  
}  
};  
});  
[/code]  
When we publish this extension to our account, create a new work item, add a couple tags, and then save the work item, we will see messages like these in the console:

[<img style="background-image:none;padding-top:0;padding-left:0;display:inline;padding-right:0;border:0;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb22.png" alt="image" width="965" height="256" border="0" />](/assets/wp-content/uploads/2016/02/image22.png)

<p style="text-align:justify;">
  As you can see, all tags are reported as a <b>single</b> field separated by semicolons. That means, that we need a way to identify when a tag is added. An easy way to accomplish this, is to get the list of tags when a work item is opened, and then when it&#8217;s saved to diff the original and current tags.
</p>

<p style="text-align:justify;">
  To get the tags when the work item is opened, we can utilize the <em><a href="https://www.visualstudio.com/en-us/integrate/extensions/develop/add-workitem-extension">WorkItemFormService</a></em>. We need to import the framework module providing it:
</p>

[code language=&#8221;javascript&#8221; gutter=&#8221;false&#8221;]  
import TFS\_Wit\_Services = require("TFS/WorkItemTracking/Services");  
[/code]  
and then we can get an instance of the service when a work item is opened, and get the current value of the _System.Tags_ field.

[code language=&#8221;javascript&#8221; gutter=&#8221;false&#8221;]  
onLoaded: (args) => {  
// Get original tags from work item  
TFS\_Wit\_Services.WorkItemFormService.getService().then(wi => {  
(<IPromise<string>>wi.getFieldValue("System.Tags")).then(  
(changedTags: string) => {  
// TODO: Save  
});  
});  
}  
[/code]

<p style="text-align:justify;">
  Since it&#8217;s possible to open multiple work items in VSTS at the same time, we cannot simply store original and updated tags in two variables, but need both current and updated tags keyed to a work item, identified by its id. A simple singleton solution could be the following:
</p>

[code language=&#8221;javascript&#8221; gutter=&#8221;false&#8221;]  
/*\* Split tags into string array \*/  
function splitTags(rawTags: string): string[] {  
return rawTags.split(";").map(t => t.trim());  
}

/**  
* Tags are stored as a single field, separated by ";".  
* We need to keep track of the tags when a work item was  
* opened, and the ones when it&#8217;s closed. The intersection  
* are the tags added.  
*/  
class WorkItemTagsListener {  
private static instance: WorkItemTagsListener = null;

public static getInstance(): WorkItemTagsListener {  
if (!WorkItemTagsListener.instance) {  
WorkItemTagsListener.instance = new WorkItemTagsListener();  
}

return WorkItemTagsListener.instance;  
}

/*\* Holds tags when work item was opened \*/  
private orgTags: { [workItemId: number]: string[] } = {};

/*\* Tags added \*/  
private newTags: { [workItemId: number]: string[] } = {};

public setOriginalTags(workItemId: number, tags: string[]) {  
this.orgTags[workItemId] = tags;  
}

public setNewTags(workItemId: number, tags: string[]) {  
this.newTags[workItemId] = tags;  
} 

public clearForWorkItem(workItemId: number) {  
delete this.orgTags[workItemId];  
delete this.newTags[workItemId];  
}

public commitTagsForWorkItem(workItemId: number): IPromise {  
// Generate intersection between old and new tags  
var diffTags = this.newTags[workItemId]  
.filter(t => this.orgTags[workItemId].indexOf(t) < 0);  
// TODO: Store  
return Q(null);  
}  
}  
[/code]

hooking it up to the observer:

[code language=&#8221;javascript&#8221; gutter=&#8221;false&#8221;] // Register work item change listener VSS.register("tags-mru-work-item-form-observer", (context) => {  
return {  
onFieldChanged: (args) => {  
// (2)  
if (args.changedFields["System.Tags"]) {  
var changedTags: string = args.changedFields["System.Tags"];  
WorkItemTagsListener.getInstance()  
.setNewTags(args.id, splitTags(changedTags));  
}  
},  
onLoaded: (args) => {  
// (1)  
// Get original tags from work item  
TFS\_Wit\_Services.WorkItemFormService.getService().then(wi => {  
(<IPromise>wi.getFieldValue("System.Tags")).then(  
changedTagsRaw => {  
WorkItemTagsListener.getInstance()  
.setOriginalTags(args.id, splitTags(changedTagsRaw));  
});  
});  
},  
onUnloaded: (args) => {  
// (4)  
WorkItemTagsListener.getInstance().clearForWorkItem(args.id);  
},  
onSaved: (args) => {  
// (3)  
WorkItemTagsListener.getInstance().commitTagsForWorkItem(args.id);  
},  
onReset: (args) => {  
// (5)  
WorkItemTagsListener.getInstance().setNewTags(args.id, []);  
},  
onRefreshed: (args) => {  
// (5)  
WorkItemTagsListener.getInstance().setNewTags(args.id, []);  
}  
};  
});  
[/code]

  1. Retrieve the tags of a work item when it&#8217;s opened, storing them in the WorkItemTagsListener instance
  2. Whenever the _System.Tags_ field is changed, store the tags as the new tags in the TagsListener instance
  3. When the work item is actually saved, commit the new tags to the MRU list (not yet implemented)
  4. Reset the work item&#8217;s data when it&#8217;s unloaded
  5. Only reset the new tags when edits to a work item are discarded

This enables us to detect added tags to any work items. The next part will cover actually storing the tags per user, showing them in a context menu, and applying to work items.
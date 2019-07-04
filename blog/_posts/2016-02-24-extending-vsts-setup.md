---
id: 464
title: Extending VSTS – Setup
date: 2016-02-24T23:49:18-07:00
author: cschleiden
layout: post
guid: https://cschleiden.wordpress.com/?p=464
permalink: /extending-vsts-setup/
publicize_twitter_user:
  - cschleiden
categories:
  - Azure DevOps
  - Uncategorized
tags:
  - HowTo
  - Microsoft
---
<p style="text-align:justify;">
  Last year <a href="https://www.visualstudio.com/en-us/products/visual-studio-team-services-vs.aspx">Visual Studio Team Services</a> (formerly known as Visual Studio Online) released support for <a href="https://www.visualstudio.com/en-us/integrate/extensions/overview">extensions</a>. There are some great samples on <a href="https://github.com/Microsoft/vsts-extension-samples">GitHub</a> and a growing number of finished extensions in the <a href="https://marketplace.visualstudio.com/#VSTS">marketplace</a>. One of my published extensions is <a href="https://marketplace.visualstudio.com/items?itemName=ms-devlabs.estimate">Estimate</a>, a planning poker implementation for VSTS.
</p>

<p align="justify">
  Extending VSTS is really easy, there is <a href="https://www.visualstudio.com/en-us/integrate/extensions/overview">documentation</a> and some great examples at the official <a href="https://github.com/Microsoft/vsts-extension-samples">GitHub</a> repository.
</p>

<p align="justify">
  Since I work on the Agile planning tools and work item tracking, I would like to show with a few simple examples how you can add functionality to your backlogs, boards, and queries. To make it really easy I’ve published  a small seed project that contributes a single menu item to the work item context menu and which will be the base for some extensions with a bit more functionality. If you’re already familiar with VSTS extensions feel free to skip immediately to <a href="https://cschleiden.wordpress.com/2016/02/24/vsts-tags-mru-extension-part-1">part 2</a>.
</p>

<p align="justify">
  <a href="/assets/wp-content/uploads/2016/02/image5.png"><img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb5.png" alt="image" width="425" height="83" border="0" /></a>
</p>

<p align="justify">
  The seed project is available at <a href="https://github.com/cschleiden/vsts-extension-ts-seed-simple" target="_blank">GitHub</a>; here is a step by step description how to build, publish, and install it:
</p>

  1. <div align="justify">
      First you need a VSTS account, it’s free, just <a href="https://www.visualstudio.com/en-us/products/visual-studio-team-services-vs.aspx">register</a> with your Microsoft account.
    </div>

  2. <div align="justify">
      Create a publisher: With your Microsoft account, sign in at the <a href="https://marketplace.visualstudio.com/manage">marketplace</a> and pick an ID and a display name:<br /> <a href="/assets/wp-content/uploads/2016/02/image6.png"><img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb6.png" alt="image" width="496" height="238" border="0" /></a>
    </div>

  3. <div align="justify">
      Generate a personal access token: Login to VSTS, go to <em>My Security</em>:<br /> <a href="/assets/wp-content/uploads/2016/02/image7.png"><br /> <img class=" size-full wp-image-770 aligncenter" src="https://cschleiden.files.wordpress.com/2016/02/security.png" alt="security" width="308" height="126" /></a><br /> then to the <em>Personal access tokens</em> section:<br /> <a href="/assets/wp-content/uploads/2016/02/image8.png"><br /> <img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb8.png" alt="image" width="373" height="161" border="0" /></a><br /> generate a token for <em>All accessible accounts</em>:<br /> <a href="/assets/wp-content/uploads/2016/02/image9.png"><br /> <img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb9.png" alt="image" width="434" height="240" border="0" /></a>copy and save the generate token for later:<br /> <a href="/assets/wp-content/uploads/2016/02/image10.png"><br /> <img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb10.png" alt="image" width="828" height="90" border="0" /></a>
    </div>

  4. <div align="justify">
      Clone (or download as zip and extract) the seed project from:<br /> <a title="https://github.com/cschleiden/vsts-extension-ts-seed-simple" href="https://github.com/cschleiden/vsts-extension-ts-seed-simple">https://github.com/cschleiden/vsts-extension-ts-seed-simple</a>
    </div>

  5. <div align="justify">
      Install <a href="https://nodejs.org/en/" target="_blank">nodejs</a>
    </div>

  6. <div align="justify">
      cd into the folder where you placed the project in step 4
    </div>

  7. <div align="justify">
      Install required dependencies with
    </div>
    
    <pre>npm install</pre>

  8. <div align="justify">
      Open the extension manifest, vss-extension.json
    </div>

  9. <div align="justify">
      Change <your-publisher> to the publisher ID you created in step 2:<br /> <a href="/assets/wp-content/uploads/2016/02/image11.png"><br /> <img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb11.png" alt="image" width="580" height="263" border="0" /></a>
    </div>

 10. As part of step 5, the <a href="https://github.com/Microsoft/tfs-cli" target="_blank">TFS Cross Platform Command Line Interface</a> was installed. This will be used to package and publish the extension. Login to your account by executing 
    <pre>tfx login --service-url https://marketplace.visualstudio.com</pre>
    
    when prompted for the token, use the one generated in step 3. This will save the login information for subsequent operations:  
    [<img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb12.png" alt="image" width="673" height="149" border="0" />](/assets/wp-content/uploads/2016/02/image12.png)(**Update:** the uri has changed, please use <https://marketplace.visualstudio.com>)</li> 
    
      * <div align="justify">
          Finally, execute
        </div>
        
        <pre>grunt publish-dev</pre>
        
        <div align="justify">
          to build, package, and publish the extension using the development configuration. If everything works the output should be similar to this:<br /> <a href="/assets/wp-content/uploads/2016/02/image13.png"><br /> <img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb13.png" alt="image" width="934" height="643" border="0" /><br /> </a>
        </div>
    
      * <div align="justify">
          Share with your account: The extension has now been published as a private extension, no one else can see it yet. To test it, we need to share it with our account. There are two ways, one is using the tfx command line, the other is using again the <a href="https://app.market.visualstudio.com/manage" target="_blank">Marketplace</a>. When you login again you should now see the extension and a <em>Share</em> button:<br /> <a href="/assets/wp-content/uploads/2016/02/image14.png"><br /> <img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb14.png" alt="image" width="1296" height="69" border="0" /></a><br /> Just share it with your account<br /> <a href="/assets/wp-content/uploads/2016/02/image15.png"><br /> <img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb15.png" alt="image" width="597" height="280" border="0" /><br /> </a>
        </div>
    
      * <div align="justify">
          <strong>Install:</strong> After sharing the extension, it should show up in the <em>Manage extensions</em> page of your VSTS account:<br /> <a href="/assets/wp-content/uploads/2016/02/image16.png"><br /> <img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb16.png" alt="image" width="483" height="188" border="0" /></a>to install, select it, confirm, and allow the requested OAuth scopes:<br /> <a href="/assets/wp-content/uploads/2016/02/image17.png"><br /> <img class=" aligncenter" style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb17.png" alt="image" width="185" height="244" border="0" /><img class=" aligncenter" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb18.png" alt="image" width="269" height="208" border="0" /></a> <a href="/assets/wp-content/uploads/2016/02/image19.png"><br /> <img class=" aligncenter" style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb19.png" alt="image" width="567" height="501" border="0" /><br /> </a>
        </div>
    
      * <div align="justify">
          <strong>Test</strong>: If you now navigate to a query result (create a query and some work items if you haven’t) and open the context menu for any work item, you should see the menu action contributed by the extension:<br /> <a href="/assets/wp-content/uploads/2016/02/image20.png"><br /> <img class="" style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb20.png" alt="image" width="433" height="673" border="0" /></a>click will execute the registered action and show the id of the selected work item:<br /> <a href="/assets/wp-content/uploads/2016/02/image21.png"><br /> <img style="margin-right:auto;margin-left:auto;float:none;display:block;background-image:none;" title="image" src="/assets/wp-content/uploads/2016/02/image_thumb21.png" alt="image" width="704" height="246" border="0" /></a>
        </div></ol>
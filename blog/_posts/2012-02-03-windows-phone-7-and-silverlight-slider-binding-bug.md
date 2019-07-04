---
id: 330
title: Windows Phone 7 and Silverlight Slider Binding Bug
date: 2012-02-03T01:51:51-07:00
author: cschleiden
layout: post
guid: http://cschleiden.wordpress.com/?p=330
permalink: /windows-phone-7-and-silverlight-slider-binding-bug/
publicize_results:
  - 'a:1:{s:7:"twitter";a:1:{i:29069824;a:2:{s:7:"user_id";s:10:"cschleiden";s:7:"post_id";s:18:"165220941004156929";}}}'

tags:
  - Development
  - wp7
---
It took me about 4-5 hours today to finally recognize why one my custom controls behaved in a strange way. It is a control derived from the Silverlight slider control and I encountered strange behavior when binding the Maximum and Minimum properties. After countless checks to make sure, that my ViewModel logic was flawless I finally discovered that &#8230; the order of attributes in the xaml code \*does\* matter when binding these exact properties.

It turns out, instead of this

[sourcecode language=&#8221;xml&#8221;]  
<Slider Name="slider" Grid.Column="1" Minimum="{Binding MinValue}" Maximum="{Binding MaxValue}" />  
[/sourcecode]  
it should be this:  
[sourcecode language=&#8221;xml&#8221;]

<Slider Name="slider" Grid.Column="1" Maximum="{Binding MaxValue}" Minimum="{Binding MinValue}" />  
[/sourcecode]

(Source: http://social.msdn.microsoft.com/Forums/en-US/silverlightgeneral/thread/5a08a3c7-66d3-4ee0-aa29-43bb8d186ab7)

Other people have noticed the same: http://dotnetbyexample.blogspot.com/2009/08/bind-silverlight-3-slider-value-minimum.html
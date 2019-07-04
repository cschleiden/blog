---
id: 69
title: 'Concepts won&#8217;t be in C++0x'
date: 2009-07-22T11:44:45-07:00
author: cschleiden
layout: post
guid: http://cschleiden.wordpress.com/?p=69
permalink: /concepts-wont-be-in-c0x/
categories:
  - C++
  - Rant
  - Uncategorized
tags:
  - C++0x
  - Concepts
  - Rants
---
On Monday I heard a talk given by Michael Wong (IBM Canada) and he told us &#8211; and he also wrote in his <a href="http://http://www-949.ibm.com/software/rational/cafe/blogs/cpp-standard/2009/07/20/the-view-or-trip-report-from-the-july-2009-c-standard-meeting" target="_blank">blog</a> &#8211; about the last C++0x Standard Committee meeting in Frankfurt, Germany:

> At this meeting, Concepts, the major feature of C++ 0x, which enables constrained genericity, or template argument prototyping, has been removed from the C++0x draft.

So at this point another major feature of C++0x won&#8217;t be included in the final release of the standard (and the ETA was shifted to 2010/2011 instead of 2009/2010). While C++0x has many features I&#8217;m very anxious about (think _lambda functions_, the _auto_ keyword, _double angle brackets_ in template declarations, etc.) I really wanted concepts in the new standard.

Over the past year I have been &#8211; and I still do &#8211; writing a linear algebra template library in order to try out new methods to exploit parallelization in an object oriented environment (my bachelor&#8217;s thesis titled _&#8220;Exploiting Object Orientation to Parallelize and Optimize C++ Applications&#8221;_ will include a more detailed explanation and evaluation). It would have been really great to be able to specify certain contraints for the generic types the way, for example, C# allows you to limit the usage of parameters in _Generics_. With the removal of concepts, the only way is to use the STL convention of specifying Concepts, which types must adhere to, but with no real representation in the code and especially no checking through the compiler.

However, even though I was looking forward to this feature I understand the reasons for not including them (see [N2906](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2906.pdf) by Bjarne Stroustrup), C++ is already a very difficult language to teach to beginners. In my opinion the real value and great advantage of C++ lies in the various usage possibilities of template (see [_template expressions_](http://www.angelikalanger.com/Articles/Cuj/ExpressionTemplates/ExpressionTemplates.htm), or general [_template metaprogramming_](http://en.wikipedia.org/wiki/Template_metaprogramming)) and when explaining these concepts to new C++ programmers you nearly always make their head spin..

**UPDATE**

There are now two new blog posts by Herb Sutter and Bjarne Stroustrup himself about this topic:

[Herb Sutter &#8211; Trip Report: Exit Concepts](http://herbsutter.wordpress.com/2009/07/21/trip-report/)

and [Bjarne Stroustrup The C++0x &#8220;Remove Concepts&#8221; decision](http://www.ddj.com/architect/218600111)
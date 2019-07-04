---
id: 257
title: First correct output of monitoring module
date: 2011-06-21T18:37:18-07:00
author: cschleiden
layout: post
guid: http://cschleiden.wordpress.com/?p=257
permalink: /first-correct-output-of-monitoring-module/
categories:
  - Parallel Programming
  - Uncategorized
tags:
  - thesis
---
Wohoo.. my thesis project is coming together, today I got the first output that actually provided information about the benchmarked application. Great accomplishment even though it&#8217;s just a simple hybrid (OpenMP, MPI) jacobi:

> <pre>[lwm2] lwm2-analysis.c:11 --------------------------------------------------
[lwm2] lwm2-analysis.c:12 Run successfully completed
[lwm2] lwm2-analysis.c:21 Wallclock time: 6.34 s
[lwm2] lwm2-analysis.c:28 --------------------------------------------------
[lwm2] lwm2-analysis-mpi.c:25 MPI analysis:
[lwm2] lwm2-analysis-mpi.c:54 General event count for Event MPI_Allreduce: 3 Time: 1308671560.8108737469 Avg Time: 436223853.6036245823
[lwm2] lwm2-analysis-mpi.c:54 General event count for Event MPI_Bcast: 2 Time: 0.0001499653 Avg Time: 0.0000749826
[lwm2] lwm2-analysis-mpi.c:54 General event count for Event MPI_Comm_rank: 2 Time: 0.0000009537 Avg Time: 0.0000004768
[lwm2] lwm2-analysis-mpi.c:54 General event count for Event MPI_Comm_size: 2 Time: 0.0000009537 Avg Time: 0.0000004768
[lwm2] lwm2-analysis-mpi.c:54 General event count for Event MPI_Irecv: 2 Time: 0.0000290871 Avg Time: 0.0000145435
[lwm2] lwm2-analysis-mpi.c:54 General event count for Event MPI_Isend: 2 Time: 0.0000259876 Avg Time: 0.0000129938
[lwm2] lwm2-analysis-mpi.c:54 General event count for Event MPI_Reduce: 2 Time: 0.0001509190 Avg Time: 0.0000754595
[lwm2] lwm2-analysis-mpi.c:54 General event count for Event MPI_Type_commit: 2 Time: 0.0000061989 Avg Time: 0.0000030994
[lwm2] lwm2-analysis-mpi.c:54 General event count for Event MPI_Type_create_struct: 2 Time: 0.0000038147 Avg Time: 0.0000019073
[lwm2] lwm2-analysis-mpi.c:54 General event count for Event MPI_Waitall: 32 Time: 39260146779.9131774902 Avg Time: 1226879586.87228679
[lwm2] lwm2-analysis-omp.c:42<strong> Program has spent 68.43 % of the overall time in OpenMP parallel regions</strong> [Omp Events: 362 General Events: 529]</pre>

In general my thesis project is a &#8220;light-weight monitoring module&#8221; (short: lwm2) that is automatically attached to all jobs running on a high-performance computing cluster and collects various metrics. These are then shown to the user after the application has finished. Due to the light-weight nature &#8211; running applications should be influenced as little as possible &#8211; only certain metrics can be collected. Therefore the module is of course not able to provide deep insight into the application but certain (potential) problems will be detected and these results shall act as a starting point for further analysis using more sophisticated tools. Examples for these tools might be [Scalasca](http://www.scalasca.org/), [Vampir](http://tu-dresden.de/die_tu_dresden/zentrale_einrichtungen/zih/forschung/software_werkzeuge_zur_unterstuetzung_von_programmierung_und_optimierung/vampir), [ThreadSpotter](http://www.roguewave.com/products/threadspotter.aspx), or other tools our of the [HOPSA](http://www.fz-juelich.de/SharedDocs/Pressemitteilungen/UK/DE/2011/11-06-20hopsa.html) package (lwm2 is also a, albeit small, part of the HOPSA project).

Open questions which will be (hopefully) answered in the thesis are

  * which metrics can be collected without compile-time instrumentation. For example, while there does exist a profiling interface MPI, OpenMP has no support for tools apart from some vendor specific tools.
  * which problems with parallel (and, of course, also serial) programs can be detected with an overhead of not more than 1% of the application&#8217;s wall-clock time
  * how to rank and present these problems to a user in such a way that they know what to do next
  * how to make sure, that the module &#8211; despite pulling various tricks to gain insight into monitored programs without compile-time instrumentation &#8211; is as robust as possible and does not introduce bugs or instabilities into the monitores programs
  * &#8230;
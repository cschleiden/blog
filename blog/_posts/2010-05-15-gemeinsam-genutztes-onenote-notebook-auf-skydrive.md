---
id: 182
title: Gemeinsam genutztes OneNote Notebook auf Skydrive
date: 2010-05-15T11:20:36-07:00
author: cschleiden
layout: post
guid: https://cschleiden.wordpress.com/2010/05/15/gemeinsam-genutztes-onenote-notebook-auf-skydrive/
permalink: /gemeinsam-genutztes-onenote-notebook-auf-skydrive/
twitter_cards_summary_img_size:
  - 'a:6:{i:0;i:244;i:1;i:189;i:2;i:3;i:3;s:24:"width="244" height="189"";s:4:"bits";i:8;s:4:"mime";s:9:"image/png";}'
categories:
  - HowTo
  - Uncategorized
tags:
  - Office
  - Productivity
---
Ich vertraue jeder schlechten Notiz hundertmal mehr als meinem guten Gedaechtnis und neben meinen diversen Moleskine Notebooks fuer alltaegliche Notizen setze ich bei digitalen vor allem auf Microsoft Office OneNote.

Ich nutze OneNote z.B. um all meine privaten, beruflichen sowie Uni-Projekte zu verwalten, zu planen und mir generelle Notizen zu allen moeglichen Themen zu machen. Was bisher leider noch fehlte, ist eine Moeglichkeit schnell und einfach Notebooks mit Kollegen/Freunden zu teilen. Innerhalb einer Firma gibt es die Moeglichkeit ein OneNote Notebook auf einem Sharepoint Server oder einem oeffentlichen Netzlaufwerk abzulegen und privat klappt die Synchronisation mittels Microsoft Live Mesh ganz gut. Was ich aber schon seit Ewigkeiten am liebsten haette, waeren OneNote Notebooks auf Microsoft Live SkyDrive, so dass ich sie von ueberall jedem per Mausklick zugaenglich machen kann (vorausgesetzt derjenige besitzt eine LiveID).

Mit OneNote 2010 ist diese Moeglichkeit wohl vorgesehen,

[<img style="display:inline;border:0;" title="image" src="/assets/wp-content/uploads/2010/05/image_thumb.png" border="0" alt="image" width="244" height="189" />](/assets/wp-content/uploads/2010/05/image.png)

aber wie man sieht: “This service is currently not available”.

Jetzt hat jemand aber herausgefunden, dass man DOCH per WebDAV (Protokoll, mit dem OneNote klar kommt) auf das schoene SkyDrive zugreifen kann. Man muss nur wissen, ueber welche LoadBalancer oder was auch immer URL das SkyDrive zu erreichen ist. Praktischerweise gibt es dazu ein kleines Tool unter <http://skydrivesimpleviewer.codeplex.com/>.

Auf der Konsole ausgefuehrt gibt man seine LiveID sowie sein Passwort an

[<img style="display:inline;border:0;" title="image" src="/assets/wp-content/uploads/2010/05/image_thumb1.png" border="0" alt="image" width="500" height="31" />](/assets/wp-content/uploads/2010/05/image1.png)

und erhaelt kurz darauf eine nette Auflistung ueber die Ordner im SkyDrive samt passenden URLs (ohne meine Anonymisierung in dem Bild natuerlich):

[<img style="display:inline;border:0;" title="image" src="/assets/wp-content/uploads/2010/05/image_thumb2.png" border="0" alt="image" width="443" height="120" />](/assets/wp-content/uploads/2010/05/image2.png)

Diese URL(s) koennen wir jetzt ganz normal beim erstellen eines neuen Notebooks in OneNote angeben, und auf einfache Art und Weise ein Notebook mit Freunden/Bekannten/Kollegen teilen.

Zum Oeffnen in der OneNote Backstage View einfach “Open” auswaehlen, Adresse wie z.B.

<https://djlXXXX.docs.live.net/XXXXXXXXXdf3d8094/OrdnerName/Notebook>

eingeben und notieren!

PS: Falls man Zeichen wie ein & in seinem LiveID Passwort hat, die von der Windows Konsole interpretiert werden, einfach mit Anfuehrungszeichen umschliessen.

PS2: Es wird Passport Authentifizierung verwendet, daher funktioniert das ganze nur unter Windows.

## **Update**:

Mit Office 2010 kann man ganz wunderbar direkt aus OneNote (wie aus allen Office Programmen) auf sein SkyDrive zugreifen, d.h. diese Post ist quasi obsolet.
# I used Grok Bot before it went public. Here's how I use it.

Grok Bot helped organise its own meetup. I also sent it a reel and got back an app.

Both started with a message. For our meetup in Kuala Lumpur, it helped set up the Luma page and work out a budget. For the app, I sent an Instagram reel of a lo-fi camera and described what I wanted to build. The code was public the same day.

I've had access since the early beta, and these are the parts I want to show people. I can send something while I'm on my phone, give it a job, and come back to something I can use or inspect.

## My saved references became a library I actually use

I save a lot of things because I like how they look. The problem comes later, when I want to find one of them or remember what caught my eye.

Look, my design bot, maintains a Notion database called Design Inspo. I send it an Instagram reel, or sometimes just a word like "roman" or "deck." It finds related references and puts together a page.

The useful part is what goes on that page. There's a main image, a breakdown of the visual choices, ideas I could borrow, and related examples. The format is inspired by Deck.gallery.

A link on its own leaves me with all the work of figuring out why I saved it. The page gives me a way back into the idea. When I'm designing something, I can open the library and have something to work from.

By August 29, it had 60 entries. Eleven Instagram reels had led to 36 of those entries in one week.

![A reel or keyword goes to Look, which finds related references and adds illustrated, explained entries to Design Inspo in Notion.](/blog/grok-bot/design-library.webp)

*How my reference library grows. This is a workflow illustration, not a screenshot of the database.*

There were small problems. Notion's Shot files column kept rejecting uploads, so Look put the screenshots inside the page bodies instead. I could still open the page, see the reference, and use it.

That's the difference I notice. I used to save the thing and leave the thinking for later. Now there's a library I actually return to.

## As an engineer, I want something I can inspect

The engineering example I keep coming back to started with an Instagram reel.

It showed a lo-fi Android camera. I sent it to Ship and asked for an Expo app with that kind of image treatment: downscaling, dithering, a date stamp, and tiny JPEGs.

The result was [kbcam](https://github.com/MohtashamMurshid/kbcam). It was public the same day. Typical images were 15 to 40 KB.

That is a pretty good use of a saved reel. I could point to a behaviour I liked and get an app implementation back, with code I could inspect. I didn't have to translate the entire reference into a specification before the work could begin.

I still had to say what I wanted. In this case, it was the camera behaviour and image treatment, not a copy of the brand. A link gives the bot a reference; my instructions give it a job.

![A reference link and a written brief go to Ship, followed by a build, code for inspection, and my review before merging or publishing.](/blog/grok-bot/reference-to-app.webp)

*The workflow I use with Ship. A build still needs review; a reference does not guarantee a complete reproduction.*

Another project started with a DashboardStack share URL. Ship decoded the deck stored in the query string and built a client-only implementation, [carousel](https://github.com/MohtashamMurshid/carousel).

It also worked on a problem in this portfolio. The `/og` endpoint was returning 500 errors on Vercel because it fetched its template over HTTP instead of reading it from disk. The fix went through a pull request and was merged.

Some jobs go further into investigation. I gave Ship Videoclaw, an Electron app distributed as a Mac DMG. It unpacked the app and documented the video pipeline, tools, and job formats in a Notion wiki detailed enough to guide a rebuild.

That investigation also found a limit. Parts of the production output depended on hosted models behind Humeo's Cloud Run service. Unpacking the desktop app didn't give us those models. The wiki was a rebuild specification, not a finished replacement.

I want that distinction in the result. An app, a pull request, and a technical investigation are all useful, but I need to know which one I'm getting.

## I don't put my whole life in one chat

The design library and the code live with different bots. That is deliberate.

Ren is my everyday bot for finding things and figuring things out. When a job keeps coming back, I give it its own bot. Look handles design references. Ship works on code. Events handles meetup preparation. Each has a job I can return to.

When I send Look another reel, I don't want to explain the design library again. I want to pick up with the bot that already knows the job.

I don't dump my whole life into one giant chat and hope it keeps everything straight.

## The meetup still needs a room

I'm co-hosting Grok Bot Meetup Kuala Lumpur with Faw as an official Grok / Cursor event. Events set up the private, approval-required Luma page and helped prepare an Ambassador funding request.

It worked through the budget for food, drinks, printing, and other event costs. I still need to choose a room that fits the plan.

This is where my rules matter. Events can prepare, but it can't spend. Apply can fill application forms, but it waits for my approval to submit. Content can draft posts, but it doesn't publish them on its own.

I say yes in chat, then it happens. I want to hand over the work without handing over every decision.

## Most days, it's the ordinary stuff

The app builds make good stories. Most mornings, though, I'm replying to Ops in a couple of lines.

Around 9 on a weekday, it sends my calendar, important items from email or Slack, and asks what I'm doing. Personal and work. I might reply: help my boss set up Grok Bot, go to a meetup tonight.

It saves that in a Notion Daily Log, one page per day. At night, it asks what actually happened, what got in the way, and how I felt. Unfinished tasks stay marked as still going and can come up again the next morning. No guilt trip.

I get a record of my days without having to sit down and write a journal.

Trace checks for missed email. Apply deals with the forms that keep asking for the same bio. Ledger reads statement files I upload and helps distinguish spending from transfers. It doesn't get my bank password.

These are small jobs, but they're the ones I keep coming back for.

## What I'm still watching

Some of my bots barely get used. I'm fine with that. I'd rather have a quiet bot than a weekly report nobody needs.

Early access doesn't tell me whether any of this will last. I care about whether I open the design library again, whether the code is worth keeping, and whether the morning check-in brings back something I would have forgotten.

For now, the change is that fewer of my references stop at "I should do something with this." Some become pages I return to. Some become apps I can open. And some come back with a clear explanation of what still needs work.

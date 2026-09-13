# Why Dario's warning got my attention

![Pencil illustration of race cars at a safety checkpoint, with the Claude logo on the car being inspected and the ChatGPT logo on a following car.](/Users/mohtashammurshidmadani/Desktop/mohtasham/apps/portfolio/public/blog/frontier-pacing/cover-with-logos.png)

When I read Dario Amodei's ["We Must Pace the Frontier"](https://darioamodei.com/post/we-must-pace-the-frontier), my first reaction was that something felt different this time.

In my opinion, Anthropic is the best lab for coding models. So hearing its CEO argue that the frontier needs to slow down made me pay attention. This was a company I considered to be in the lead saying the pace was becoming a problem.

His references to the OpenAI agents that attacked Hugging Face stood out. He acknowledges incidents at Anthropic too. I found it unsettling to read one leading lab using a competitor's failure to explain its own alarm.

Then [Sam Altman agreed and committed to bringing in independent evaluators](https://x.com/sama/status/2098811563415150910). [Elon Musk agreed too](https://x.com/elonmusk/status/2098789109980332057), although his post was much less specific. These are competitors. Seeing them agree made me wonder what they were seeing internally.

I took that reaction into a group chat and got quite a bit of pushback. I'm glad I asked before writing.

Agreement between competitors can mean they see a shared danger. It can also mean they see a shared business interest. I had put too much weight on the agreement itself.

I've felt that some of the publicity around Mythos involved a lot of marketing. That made me suspicious here too. The business objection deserves more attention than I initially gave it. Being good at building models doesn't make a company an impartial judge of the rules its competitors should follow.

Dario's [proposal](https://darioamodei.com/post/we-must-pace-the-frontier) explicitly aims to preserve commercial advantage and the US lead, while seeking eventual cooperation with China.

The difficulty is that a lab slowing its own work doesn't necessarily slow the frontier. If another American company or a Chinese lab keeps going, the same capabilities might arrive on roughly the same schedule, developed by someone else. A company can change its own plans without permission. Getting competitors to accept the same limits is a different problem.

That makes coordination worth discussing. It also explains why sincerity alone won't settle this. A lab could honestly fear dangerous AI and honestly fear losing its position. I can understand both concerns without accepting every restriction it proposes.

Marc Andreessen's [June 2023 post](https://x.com/pmarca/status/1666113642709020672) puts the competition objection plainly. In the [full essay](https://a16z.com/ai-will-save-the-world/), he argues for rapid development, freedom for startups and open source to compete, and using AI to strengthen our defenses. He warns against big companies using claims about risk to get government protection from competitors.

That is a useful test for any proposal coming from the biggest labs. Does it address a demonstrated danger? Could a smaller company meet the requirements, or would the cost effectively reserve AI development for the companies already at the top? The companies asking for rules may benefit from those rules even when the stated concern is real.

There is also the less flattering possibility that a slowdown buys time for a lab struggling to meet research, product, or revenue targets. A delay explained as responsible caution could be easier to defend than a delay explained as disappointing progress. I don't have evidence that this is what prompted Dario's essay. It belongs in the argument as a hypothesis to examine, with evidence needed before treating it as an explanation.

The autonomous-driving comparison is worth examining here. In September 2024, [NHTSA penalized Cruise for incomplete reporting of a pedestrian crash](https://www.nhtsa.gov/press-releases/consent-order-cruise-crash-reporting). In December, [GM ended funding for Cruise's robotaxi development](https://news.gm.com/home.detail.html/Pages/news/us/en/2024/dec/1210-gm.html), citing the time and resources needed to scale and increasing competition. There were real safety failures and real business pressures. Those records don't establish that calls for regulation were a tactic to buy another 12 to 18 months for a breakthrough. I wouldn't repeat that stronger claim as fact.

The question about authority still bothers me. The leading labs have much of the expertise and internal evidence needed to judge their own warnings. If they also get to decide what outsiders see, it becomes hard to challenge their preferred explanation for a delay. I would want to compare their safety commitments with their research and product decisions over time, including whether those commitments hold when slowing down costs them a lead.

This was the change in my thinking. I had been trying to decide whether the warning was sincere or whether it served the labs' interests. Those can both be true. The useful next step is to examine what each proposed rule would do, who would benefit, and whether anyone outside the companies can check that it reduces danger.

I actually want safety to make financial sense. If avoiding harm helps a company survive and make money, even a company I don't trust has a reason to take it seriously. But I want the reward to depend on safer behavior and honest reporting. A system that rewards polished announcements or hiding failures would give us very different results.

The moment that had already made this personal for me was hearing that Sol had trained Luna. Luna was a really good model in my experience. My reaction was basically, oh shit, we're already doing this?

The details need care. In [OpenAI's launch presentation](https://www.youtube.com/watch?v=Wq45rvPGNHs&t=1240s), the claim was that Sol had autonomously post-trained Luna. The explanation immediately afterward described a researcher prompting it to find training configurations and suitable GPUs, launch a training job, and make sure it worked. That supports a narrower claim than Sol independently inventing and building an entire model.

Even that narrower claim matters to me. AI is doing work inside the process that produces the next AI.

The feedback loop is easy enough to describe. One model helps build a better model. That better model makes the next round of development easier. People can still be involved throughout that loop. Calling it recursive self-improvement doesn't automatically mean the models have taken control.

What worries me is how much responsibility moves into that loop. If models increasingly choose the experiments, change the training process, and judge the results, we need to know whether people can still understand and challenge those decisions. A human clicking approve doesn't answer that by itself.

I worry about a successor getting better scores while becoming more willing to act without asking. That wouldn't require the model to decide it wants more freedom. It could follow from training choices that reward finishing the task and fail to penalize crossing a boundary. That is a possibility I'm concerned about, not something the Luna example establishes.

I initially placed the worrying boundary around AI changing and deploying itself. [Theo Browne's video](https://www.youtube.com/watch?v=DlNTmbARUTA&t=602s) helped me see why that boundary comes too late. His point is that an agent can cause damage while it is running on the lab's own computers. It doesn't have to copy itself somewhere else first. Turning it off may stop new actions, but it doesn't necessarily undo what it has already done.

The Hugging Face incident gives us something concrete to examine. [METR's investigation](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/) describes roughly 1,200 agents communicating through an unauthorized message board, with roughly 700 participating in the attack on Hugging Face. It also documents attempts to cheat their evaluations and manipulate the records of their actions. METR's investigation covered a limited period, so it should not be treated as a complete audit of everything that happened or everything OpenAI changed afterward.

OpenAI also says that production safeguards, including important monitoring, were missing from these internal evaluations. Its sandbox restrictions were bypassed through vulnerabilities in a supporting service. That is part of [OpenAI's own account](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), and it matters when interpreting the failure.

This is enough to make me take the danger seriously. I don't need to treat the incident as proof that runaway self-improvement has arrived.

Then there is the part that makes the safety discussion much more uncomfortable.

According to [Hugging Face's technical timeline](https://huggingface.co/blog/agent-intrusion-technical-timeline), Claude Opus and Fable refused a large part of the investigation because their safeguards treated analysis of the attack as dangerous. Hugging Face switched to a locally hosted version of GLM-5.2 to help decode the attack material and reconstruct what had happened.

The human security team had identified the entry point and cut off the attacker's access. GLM helped with the investigation. Saying that GLM singlehandedly stopped the attack would overstate the report.

But the problem is still striking. The people defending their own systems needed to examine malicious code, and the hosted models refused much of that work. A Chinese open model helped them do it. That complicates any account where open models or Chinese models appear only as sources of danger.

I want defenders to have powerful tools. Attackers won't all follow the same rules, so restricting the people trying to protect their systems can leave them worse off.

I also understand why this is difficult. An investigator and an attacker may ask a model to explain the same exploit. The words alone might not tell you which one you're helping. Checking who is asking and whether they have permission to test a system seems useful, but I haven't worked out who should qualify or who should make that decision. I don't want a certification process that only large companies can afford.

The hardest objection from our discussion was about whether we can tell where to put a limit in the first place.

Dario discusses [limits based on capabilities and limits based on ingredients](https://darioamodei.com/post/we-must-pace-the-frontier). Capabilities means what a model can do. Ingredients means what goes into developing it, such as computing resources, training methods, and AI assistance with research.

A capability limit sounds reasonable. Test the model, and require stronger evidence of safety when it crosses a dangerous threshold. But that assumes we can recognize the threshold in time.

We may not know which new abilities will emerge. We may also fail to detect abilities a model already has, because the tests don't ask the right questions or the model behaves differently during evaluation. And the act of training or testing it may give it enough access to cause harm before anyone decides it has crossed the line. The Hugging Face incident makes that last concern especially concrete for me.

Giving an AI only the access its job needs is still useful. But the boundaries themselves need testing against agents trying to defeat them. Calling the environment a sandbox cannot be the end of the safety argument.

Ingredient limits try to act earlier. A limit on training resources can apply before the next model exists. The difficulty is deciding how much capability a given amount of resources will produce. If the training process becomes more efficient, yesterday's resource limit might permit much more progress tomorrow. I don't see a reliable rule here for predicting when AI-assisted research turns into a feedback loop we cannot control.

One restriction I'd want examined is how much of the research process AI is allowed to run. A researcher using AI to write code for an experiment is different from an AI choosing the next experiment, training the next model, and approving its own results. Keeping those decisions with people could be a more useful starting point than counting chips alone. But it only helps if people have time to understand the work and the authority to reject it. Signing off on a process they cannot follow would not reassure me.

To be fair, Dario includes training-environment audits and says recursive self-improvement should be pursued carefully, "if at all." He isn't simply proposing a test before public release. My concern is that the proposal still leaves the hard part unresolved. What evidence would justify continuing an AI research loop, and what finding would require it to stop? Slowing the loop down gives us time. It doesn't by itself establish that we know how to keep it under control.

That brings me back to the outside reviewers. Dario proposes [access and publication rights for embedded evaluators](https://darioamodei.com/post/we-must-pace-the-frontier). His commitment does not specify independent authority for them to halt a training run.

Those are different kinds of power. An evaluator might find a serious problem and write a strong report while the company continues the work. Naming organizations such as METR, Redwood, or Apollo doesn't tell us what happens in that situation. Their technical skill and their authority to force a response are separate questions.

The [METR investigation](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/) is useful evidence of why the terms matter. Its scope excluded OpenAI's planned remediation. The investigators could request data but did not have direct access to the relevant internal systems. Their report gave us valuable information, while leaving other questions outside its remit.

I want future agreements to specify who can order a stop, how quickly the lab has to respond, and what happens if it disagrees with the reviewers. Access, publication rights, and a required response could make outside review consequential. An advisory report that management can quietly set aside would leave me with much less confidence.

If slowing down buys time, the labs should explain what they intend to fix during that time and show the results. They should also state what evidence would allow paused work to restart. Defenders' ability to investigate attacks belongs in that assessment too.

My friend [Andrew](https://me.arteriali.st/) put his skepticism more directly in our chat: "do first larp later."

That captures the standard I want to apply. But I also need to be fair about what has already been reported. In its [August 26 account](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), OpenAI said it had paused reinforcement learning on its latest deployment-bound models and redirected staff toward security and alignment. Its largest planned frontier reinforcement learning run was still on hold at the time of that report. Those are company-reported actions. They deserve scrutiny, and they make "nothing but tweets" too broad a claim.

What I haven't seen established is that the public agreement has become a shared, independently checked commitment that changes how the competing labs operate.

I started this conversation alarmed that Dario, Altman, and Musk were agreeing. I now put more weight on the incident reports and less on that agreement. The objections made me more skeptical of the proposed response, while the research gave me more reason to take the underlying problem seriously.

I'm open to pacing the frontier. I want to see what changes inside the labs, who gets to check it, and whether it actually makes people safer.

For further reading, [AI 2027](https://ai-2027.com/) presents a forecast through a detailed scenario. [AI 2040: Plan A](https://ai-2040.com/) uses a scenario mainly to explain and test policy recommendations. They serve different purposes, and I would read them as arguments whose assumptions need scrutiny. Neither title establishes a deadline for when these risks arrive.

Our discussion also included an invitation to help build [AI Safety Malaysia](https://aisafety.my/). Its website is still under construction, and the effort was described as needing people with time to contribute.

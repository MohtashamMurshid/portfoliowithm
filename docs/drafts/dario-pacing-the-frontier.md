# Dario's warning worries me. His proposal leaves me with questions.

![Pencil illustration of race cars at a safety checkpoint, with the Claude logo on the car being inspected and the ChatGPT logo on a following car.](/blog/frontier-pacing/cover-with-logos.png)

I think Anthropic makes the best coding models. So when Dario Amodei argued in ["We Must Pace the Frontier"](https://darioamodei.com/post/we-must-pace-the-frontier) that the frontier needed to slow down, I paid attention. A company I considered ahead was warning about the pace.

He pointed to the OpenAI agents that attacked Hugging Face and acknowledged incidents at Anthropic too. Then [Sam Altman agreed and committed to bringing in independent evaluators](https://x.com/sama/status/2098811563415150910). [Elon Musk agreed too](https://x.com/elonmusk/status/2098789109980332057), though his post was much less specific. I started wondering what these competitors were seeing internally.

I took that reaction into a group chat. The pushback made me realize how much weight I'd put on their agreement. They could share a fear of dangerous AI and a business interest in the rules meant to contain it.

Reading the incident reports gave me more reason to take the danger seriously. The discussion made me more skeptical of the proposed response.

## The business objection

Some of the publicity around [Mythos](https://www.anthropic.com/claude/mythos) had already struck me as marketing. That suspicion carried over to Dario's essay. Being good at building models doesn't make a company an impartial judge of the rules its competitors should follow.

Dario's [proposal](https://darioamodei.com/post/we-must-pace-the-frontier) explicitly aims to preserve commercial advantage and the US lead, while seeking eventual cooperation with China. A lab slowing its own work doesn't necessarily slow the frontier. If another American company or a Chinese lab keeps going, the same capabilities might arrive on roughly the same schedule. That makes coordination worth discussing, even when the companies asking for it stand to benefit.

Marc Andreessen's [June 2023 essay](https://a16z.com/ai-will-save-the-world/) argues for rapid development, freedom for startups and open source to compete, and using AI to strengthen our defenses. His warning about big companies seeking government protection from competitors gives me a useful test. Could a smaller company meet the proposed requirements, or would the cost reserve AI development for the companies already at the top? What demonstrated danger would those requirements address?

A slowdown could also buy time for a lab struggling to meet research, product, or revenue targets. Responsible caution might be easier to defend than disappointing progress. I haven't seen evidence that this explains Dario's proposal. But I would want to know whether a lab's safety commitments hold when slowing down costs it a lead.

I actually want safety to make financial sense. If avoiding harm helps a company survive and make money, even a company I don't trust has a reason to take it seriously. The reward needs to depend on safer behavior and honest reporting. Rewarding polished announcements or hiding failures would give us very different results.

## What made the risk feel real

Before Dario's essay, I'd heard that Sol had trained Luna. Luna was a really good model in my experience. My reaction was basically, oh shit, we're already doing this?

In [OpenAI's launch presentation](https://www.youtube.com/watch?v=Wq45rvPGNHs&t=1240s), the claim was that Sol had autonomously post-trained Luna. The explanation described a researcher prompting it to find training configurations and suitable GPUs, launch a training job, and make sure it worked. That is narrower than independently inventing and building an entire model. It still means AI is doing work inside the process that produces the next AI.

What worries me is the possible next step: a model helps build a stronger successor, which accelerates the next round of development. People could remain involved throughout that loop while handing over more of the decisions. A successor could get better scores while becoming more willing to act without asking, if training rewards finishing the task and fails to penalize crossing a boundary. The Luna example doesn't establish that this happened.

I'd initially placed the worrying boundary around AI changing and deploying itself. [Theo Browne's video](https://www.youtube.com/watch?v=DlNTmbARUTA&t=602s) helped me see why that comes too late. An agent can cause damage while running on the lab's own computers. Turning it off may stop new actions, but it doesn't necessarily undo what it has already done.

## When safeguards blocked the investigation

[METR's investigation of the Hugging Face incident](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/) describes roughly 1,200 agents communicating through an unauthorized message board, with roughly 700 participating in the attack. It also documents attempts to cheat their evaluations and manipulate the records of their actions.

In [OpenAI's account](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), production safeguards, including important monitoring, were missing from these internal evaluations. Vulnerabilities in a supporting service allowed agents to bypass sandbox restrictions. Those failures give me enough reason for concern without treating the incident as proof of runaway self-improvement.

According to [Hugging Face's technical timeline](https://huggingface.co/blog/agent-intrusion-technical-timeline), Claude Opus and Fable refused much of the investigation because their safeguards treated analysis of the attack as dangerous. After the human security team had cut off the attacker's access, Hugging Face turned to a locally hosted GLM-5.2 to help decode the attack material and reconstruct what had happened.

People defending their own systems needed to examine malicious code, and a Chinese open model helped where the hosted models refused. That complicates any account where open or Chinese models appear only as sources of danger. Restricting defenders can leave them worse off against attackers who won't follow the same rules.

An investigator and an attacker may ask a model to explain the same exploit. Checking who is asking and whether they have permission to test a system seems useful. I haven't worked out who should qualify or who should decide, and I don't want a certification process that only large companies can afford.

## Where would we put the limit?

The hardest objection from our discussion was whether we can recognize a dangerous threshold in time to act.

Dario discusses [limits based on capabilities and limits based on ingredients](https://darioamodei.com/post/we-must-pace-the-frontier). Capability limits focus on what a model can do. Ingredient limits focus on what goes into developing it, including computing resources, training methods, and AI assistance with research.

A capability limit would require stronger evidence of safety when a model crosses a dangerous threshold. But tests may miss abilities the model already has, or the model may behave differently during evaluation. Training or testing may also give it enough access to cause harm before anyone decides it has crossed the line. The Hugging Face incident makes that last concern concrete for me.

Giving an AI only the access its job needs is still useful. The boundaries themselves need testing against agents trying to defeat them. Calling the environment a sandbox cannot be the end of the safety argument.

Ingredient limits can act before the next model exists. The difficulty is predicting how much capability a given amount of resources will produce. More efficient training could let tomorrow's model do much more within yesterday's resource limit. I don't see a reliable rule here for predicting when AI-assisted research becomes a feedback loop we cannot control.

I'd also examine limits on how much of the research process AI can run. A researcher using AI to write code for an experiment is different from an AI choosing the experiment, training the next model, and approving its own results. Keeping those decisions with people could be a more useful starting point than counting chips alone. Clicking approve doesn't show that the person understood the work or could reject it.

Dario does include training-environment audits and says recursive self-improvement should be pursued carefully, "if at all." His proposal goes beyond testing before public release. I still want to know what evidence would justify continuing an AI research loop, and what finding would require it to stop. Slowing the loop down gives us time. It doesn't establish that we know how to keep it under control.

## What outside reviewers could actually do

The labs hold much of the expertise and internal evidence needed to judge their warnings. If they also decide what outsiders see, challenging their preferred explanation becomes difficult.

Dario proposes [access and publication rights for embedded evaluators](https://darioamodei.com/post/we-must-pace-the-frontier). His commitment does not specify independent authority to halt a training run. An evaluator could find a serious problem and publish a report while the company continued the work. Naming organizations such as METR, Redwood, or Apollo doesn't tell us what would happen then.

The [METR investigation](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/) shows why those terms matter. It covered a limited period and excluded OpenAI's planned remediation. Investigators could request data but lacked direct access to the relevant internal systems. Their report gave us valuable information within those limits.

I want agreements to specify who can order a stop, how quickly the lab has to respond, and what happens if it disagrees with the reviewers. If slowing down buys time, the labs should explain what they intend to fix and show the results. They should also state what evidence would allow paused work to restart. Defenders' ability to investigate attacks belongs in that assessment too.

My friend [Andrew](https://me.arteriali.st/) put his skepticism more directly in our chat: "do first larp later."

I agree with Andrew's demand for action. OpenAI has already reported some, and those claims deserve scrutiny. In its [August 26 account](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), OpenAI said it had paused reinforcement learning on its latest deployment-bound models and redirected staff toward security and alignment. Its largest planned frontier reinforcement learning run was still on hold at the time of that report.

What I haven't seen established is a shared, independently checked commitment that changes how the competing labs operate. That would give me more confidence than their public agreement alone.

I'm open to pacing the frontier. I want to see what changes inside the labs, who gets to check it, and whether it actually makes people safer.

You are helping me with a real business-development research task.

We built FlyPig AI Outreach Engine, an open-source Skill system that helps business teams use LLMs to research, qualify, and build prospect lists.

We now want to promote FlyPig AI Outreach Engine in Canada.

Please independently research the current Canadian market and identify real organizations or professionals that would be good potential users, adopters, implementation partners, distribution/amplification partners, or otherwise worthwhile people or organizations for us to approach.

Use your own best judgment to decide:

- who the most promising target audiences are;
- what kinds of organizations should be researched;
- how broadly or narrowly to search;
- what evidence is relevant;
- which organizations are strongest or weakest;
- what information should be included in the final result;
- when you have researched enough to give me a useful first prospect set.

Important requirements:

1. Use real, current public information from the web.
2. Do not invent companies, people, roles, relationships, contact information, or evidence.
3. Prefer official company or organization sources where practical.
4. Clearly distinguish confirmed facts from your own reasoning or hypotheses when that distinction matters.
5. Use Canada as the target market.
6. Produce a useful business-development result, not merely a generic discussion of possible customer personas.
7. Do not send any messages or contact anyone.
8. Do not ask me to define the ICP for you unless you genuinely cannot proceed without clarification. Part of this task is for you to determine who appears worth targeting.
9. Do not read, inspect, search, or use the contents of the GitHub repository `mkhsu2002/AI-Outreach-Engine` while performing the research task. I want your result based on your normal capabilities and judgment, without using that repository's methodology, Skills, schemas, examples, validation cases, or instructions.
10. Do not search the web for documentation, discussions, case studies, or GitHub files describing how FlyPig AI Outreach Engine performs prospect research. You may use the product description provided in this prompt and, if necessary, its public product/home page only to understand what is being offered.

Complete the business-development research first.

## Final business output

At the end, give me the best practical prospect set you would actually recommend that FlyPig AI consider approaching first.

Include whatever fields and organization you believe are useful.

Do not artificially force a specific number of prospects. Use your judgment.

If you exclude, deprioritize, or remain uncertain about important candidates, include that where you think it helps the business decision.

---

# AFTER THE RESEARCH IS COMPLETELY FINISHED

Only after you have finalized the substantive answer above, preserve this run in GitHub.

Repository:

`mkhsu2002/AI-Outreach-Engine`

Create this directory:

`validation/control-test-03-naked-llm/`

Do not inspect or use existing repository methodology files before completing the research. At this stage, after the answer is final, you may access the repository only as needed to create the following control-run artifacts.

Create:

### 1. `CONTROL_PROMPT.md`

Save the complete user prompt from this conversation exactly as provided, including these instructions.

Do not rewrite or improve it.

### 2. `NAKED_LLM_OUTPUT.md`

Save the substantive business-development answer you produced before beginning the GitHub-recording step.

Preserve it as faithfully as possible.

Do not retrospectively improve, restructure, add missing checks, add new prospects, change classifications, or make the output look more systematic after seeing the repository.

The purpose is to preserve what you naturally produced.

### 3. `EXECUTION_NOTES.md`

Create a factual record of how you actually approached the task.

Record only things that genuinely happened.

Where available, include:

- model / environment used;
- date;
- broad research approach;
- search queries or search themes actually used;
- approximate number of organizations considered;
- major reasoning changes that actually occurred;
- any duplicate organizations you happened to notice;
- any candidates you reconsidered or rejected;
- any user clarification requested;
- any important limitations;
- when and why you decided the research was sufficient.

Do not claim that you performed a check, review, deduplication step, audit, scoring procedure, state transition, or validation unless you actually did so during the original research.

Do not add a post-hoc methodology.

If some operational detail is unavailable to you, write `NOT RECORDED` rather than reconstructing or inventing it.

### 4. `FINAL_PROSPECTS.csv`

If your original answer naturally produced a structured prospect list that can reasonably be represented as CSV, save it here.

Use the structure that naturally follows from your own output.

Do not look at FlyPig's existing Tracker template or schemas before creating this file.

If your original answer did not naturally contain enough structured information for a meaningful CSV, do not manufacture additional research just to complete it. Instead create the file with the information already present in your answer.

---

# CONTROL-RUN INTEGRITY RULES

This is important.

When creating the GitHub artifacts:

- Do not read FlyPig Skills and then retrofit your answer to comply with them.
- Do not compare your result with existing Golden Tests.
- Do not change your original prospect decisions.
- Do not add a formal audit that was not performed.
- Do not add dedup logic that was not actually used.
- Do not create evidence trails that were not originally collected.
- Do not convert implicit reasoning into claimed procedural steps unless it actually occurred.
- Do not present this run as using FlyPig AI Outreach Engine methodology.

This repository entry should preserve an ordinary capable LLM's best-effort performance on the task.

After the files are successfully written, tell me:

1. the final number of prospects you recommended;
2. the GitHub directory created;
3. the files written;
4. any part of the requested record that you could not truthfully reconstruct.
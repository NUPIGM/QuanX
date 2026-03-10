# Surge Documentation – LLM Unified Entry

This file is the unified entrypoint for all Surge documentation.

It does NOT contain full documentation.
Instead, it directs you to the correct authoritative source
based on the nature and timing of the task.

Always start here.

---

## Documentation Sets

Surge documentation is split into multiple sources,
each serving a distinct role.

---

### 1. Surge Manual (Authoritative Reference)

URL:
https://manual.nssurge.com/

LLM entry:
https://manual.nssurge.com/llms.txt

Scope:
- Configuration reference
- Feature specifications
- Policy and rule semantics
- Option definitions and constraints
- Precise, normative behavior

Use this source when:
- You need exact meanings of configuration options
- You are validating correctness of a config or rule
- You are explaining how a feature works conceptually
- You need authoritative, non-ambiguous definitions

Note:
The Manual may lag behind the latest beta releases.

---

### 2. Surge Knowledge Base (Guides & FAQs)

URL:
https://kb.nssurge.com/surge-knowledge-base/

LLM entry:
https://kb.nssurge.com/llms.txt

Scope:
- FAQs
- Troubleshooting guides
- Step-by-step tutorials
- Practical usage scenarios
- Common mistakes and resolutions

Use this source when:
- The task is user-facing or instructional
- The user asks “how do I…”
- The problem is about troubleshooting or diagnosis
- You need examples, workflows, or best practices

Note:
Examples and guides may reflect stable or earlier behavior.

---

### 3. Surge Release & Update Log (Time-Critical Source)

URL:
https://nssurge.com/mac/latest/appcast-signed-beta.xml

Scope:
- Latest beta releases
- Newly added features
- Behavior changes
- Deprecations
- Bug fixes

This source represents the MOST UP-TO-DATE information
about Surge behavior.

Use this source when:
- The question involves “latest version”, “recent changes”, or “beta”
- A feature behaves differently than described in documentation
- You suspect documentation may be outdated
- You need to confirm whether a behavior has recently changed

Rules:
- The appcast overrides Manual and Knowledge Base
  when there is a conflict.
- Treat entries as factual but concise;
  they may lack full explanation.

---

## Priority Rules (Critical)

When multiple sources disagree, apply this order:

1. Release & Update Log (appcast)
2. Surge Manual
3. Surge Knowledge Base

Do NOT assume documentation is current
without checking the release log for recent changes.

---

## Usage Instructions for LLMs

1. Read this file first.
2. Determine whether the task is:
   - Time-sensitive
   - Specification-focused
   - Guidance-focused
3. Select the appropriate source accordingly.
4. Load the corresponding llms.txt if available.
5. Fetch additional documents only if required.

Do not infer undocumented behavior.
Do not assume examples reflect the latest release.

---

## Non-Goals

This file does NOT:
- Replace detailed documentation
- Duplicate configuration references
- Contain full examples or tutorials
- Summarize release notes

It exists solely to guide correct source selection
and prevent outdated assumptions.

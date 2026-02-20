# 🧠 First — What problem are they ACTUALLY talking about?

Not:

> People share personal data online

That’s obvious.

The real problem is:

> **Privacy damage doesn’t come from one leak — it comes from connecting multiple harmless facts.**

This is called **correlation attack**.

---

## Real-life example

Imagine your resume says:

* B.Tech 2021
* Lives in Bangalore
* Backend developer at Infosys

Your LinkedIn says:

* Celebrated 25th birthday 🎉

Your GitHub username:

* akshay99

None of these are sensitive alone.

But an attacker combines:

```
Graduation year → age range
Birthday post → exact age
Username 99 → birth year confirmation
Company → believable email context
City → local targeting
```

Now attacker knows:

* age
* workplace
* routine
* believable story

And sends:

> “Infosys payroll update for 2021 batch employees — verify immediately”

You click.

---

👉 This is the problem statement.

Not data leakage.

**Inference leakage**

---

# Why Existing Privacy Tools Fail

Current tools do:

> detect phone number
> detect email
> mask Aadhaar

But attackers don’t need Aadhaar.

They need:

> believable context

So current tools protect identity
But attackers exploit psychology

---

# What The Hackathon Wants You To Build

You are NOT building a privacy checker.

You are building:

> A simulator of how attackers think

The system must answer:

> “If I were a hacker, what can I figure out about you?”

---

# Breaking Down the Problem Statement Line by Line

---

## “share fragments of personal data”

Meaning:

User data exists in pieces across platforms.

Not centralized.

So risk comes from aggregation.

---

## “harmless in isolation”

Important.

If one platform leaks → low danger
If many combine → high danger

You must evaluate combinations.

---

## “attackers can correlate multiple data points”

This is the heart of the challenge.

You must build a system that does:

Human reasoning:

```
A + B → inference
B + C → stronger inference
A + B + C → attack opportunity
```

---

## “Current tools detect PII”

They check:

* email
* phone
* SSN

But they do NOT check:

> Can someone convincingly impersonate you?

Your system must.

---

## “simulate adversarial thinking”

This is the most important phrase.

They don’t want classification AI.

They want:

> AI that behaves like an attacker

---

## “compound privacy exposure risk”

Compound = combined effect

Example:

| Data         | Risk |
| ------------ | ---- |
| Email        | low  |
| Company      | low  |
| Role         | low  |
| All together | HIGH |

You measure the combined risk.

---

# What Your System Must Do (Simplified)

1. Read user data
2. Extract facts
3. Connect facts
4. See what attacker learns
5. Measure attack possibility
6. Show how they get attacked

---

# Final Simple Explanation (You can say this in presentation)

> “Privacy is no longer about secret data — it's about predictable identity.
> Attackers don’t steal information, they reconstruct people.
> Our system reconstructs the user the same way an attacker would, and measures how dangerous that reconstruction is.”

---

Now the problem statement should feel very clear:

You are building a **human-intelligence simulator**, not a scanner.


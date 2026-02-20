Perfect.

Now we’re building the **final elite PRD**.

This version:

• Includes ALL 10 advanced features
• Keeps deterministic rule engine core
• Uses LangChain only for controlled generation
• Is structured so Agentic AI IDE can generate full-stack code
• Is phase-based
• Is implementation-ready

This is the version you submit to your AI IDE.

---

# 📄 PRODUCT REQUIREMENTS DOCUMENT (FINAL ELITE VERSION)

# Product Name

**PersonaShield – AI Personal Data Correlation Risk Simulator**

---

# 1. Product Vision

PersonaShield is an AI-powered system that models how attackers correlate publicly available personal data to infer hidden vulnerabilities. It quantifies compound exposure risk and simulates adversarial exploitation pathways.

The system combines deterministic rule-based intelligence with LLM-powered adversarial modeling.

The goal is not PII detection.

The goal is adversarial inference simulation.

---

# 2. Tech Stack

## Frontend

* React JS (Vite)
* Tailwind CSS
* Axios
* Recharts (charts + heatmaps)
* React Flow (inference graph)

## Backend

* FastAPI
* Pydantic
* spaCy
* Regex
* NetworkX
* LangChain
* OpenAI API (or configurable LLM)

No database.
Stateless architecture.

---

# 3. System Architecture

### Layer 1 — Entity Extraction (Deterministic)

Regex + spaCy

### Layer 2 — Rule-Based Correlation Engine

Predefined inference rules

### Layer 3 — Weighted Scoring Engine

Deterministic weighted risk calculation

### Layer 4 — Advanced Risk Modeling Layer

* Correlation Depth Score
* Exposure Timeline Estimator
* Public Data Confidence Estimator

### Layer 5 — Attack Modeling Layer

* Attack Vector Categorization
* Persona Exposure Mode
* AI Phishing Generator
* AI Explanation Engine

### Layer 6 — Simulation Layer

* Before vs After Risk Simulation
* Enterprise Mode Toggle

### Layer 7 — Visualization Layer

Dashboard + Graph + Heatmaps + Score Comparison

---

# 4. Core Functional Features

---

# 4.1 Multi-Source Sensitive Data Extraction

### Input:

Input Types:

• Raw Text
• PDF Resume Upload

System normalizes both into plain text before extraction.

### Extract:

* Email
* Phone
* DOB
* Graduation year
* College
* Company
* Job title
* Location
* Family mentions
* Skills
* Certifications
* Years of experience

Output: structured JSON.

---

# 4.2 Rule-Based Correlation Engine

Predefined inference rules:

IF college + graduation_year
→ infer age range
→ add Age Inference Risk

IF company + job_title
→ add Corporate Targeting Risk

IF name + dob
→ add Identity Theft Risk

IF location + family
→ add Physical Risk

IF email contains year
→ add Password Guess Risk

Rules stored in config file.

---

# 4.3 Weighted Risk Scoring Model

Score Components:

1. Direct PII Exposure
2. Correlation Count
3. Inference Depth
4. Employment Exposure
5. Location Exposure
6. Timeline Exposure
7. Public Visibility Exposure

Normalized to 0–100.

Risk Levels:
0–30 Low
31–60 Moderate
61–100 High

Deterministic.

---

# 4.4 Correlation Depth Score

Measures how interconnected data points are.

Formula:
Number of inference chains * average chain length

High interconnected data = higher OSINT exploitability.

Displayed as separate score.

---

# 4.5 Exposure Timeline Estimator

Estimates digital footprint length using:

* Graduation year
* Years at company
* Experience years

Output:
“Estimated public exposure timeline: 8+ years”

Longer timeline → increased OSINT risk weight.

---

# 4.6 Public Data Confidence Estimator

Estimates how easily exposed data is searchable.

Scoring logic:
Common fields (email, LinkedIn-style info) → high visibility
Rare fields → lower visibility

Output:
Visibility Score (0–10)

Contributes to risk score.

---

# 4.7 Attack Vector Categorization

Categorize exposure into:

🎯 Spear Phishing Risk
🕵 Identity Theft Risk
🧠 Social Engineering Risk
🏢 Corporate Targeting Risk
📍 Physical Safety Risk

Each category has:

* Severity level
* Contributing data points

---

# 4.8 Persona Exposure Mode

Persona types:

1. Script Kiddie
2. Professional Scammer
3. Corporate Spy

Each persona:

* Uses different prompt template
* Focuses on different attack vectors
* Produces different adversarial narrative

LLM only used for narrative generation.
Not scoring.

---

# 4.9 AI-Powered Phishing Generator

Generates educational phishing example.

Input:
Extracted structured data

Output:
Example spear phishing email tailored to user profile.

Must include disclaimer:
“Educational simulation only.”

---

# 4.10 AI Explanation Engine

Explains why risk score is high.

Input:
Structured JSON of risks

Output:
Clear explanation of correlation pathways.

Example:
“Graduation year combined with company and city enables age estimation and targeted HR-themed phishing.”

---

# 4.11 BEFORE vs AFTER Risk Simulation

User can remove fields:

* Graduation year
* Phone
* Exact location
* DOB

System recalculates:

Original Score
Hardened Score
Difference

Displayed visually as bar comparison.

---

# 4.12 Risk Heatmap of Data Types

Visual heatmap showing:

Data Type → Risk Contribution

Example:
Email → High
Graduation Year → Medium
Location → Moderate

Displayed using Recharts.

---

# 4.13 Enterprise Mode Toggle

If enabled:

Additional evaluation:

* Corporate email format exposure
* Job role sensitivity
* Internal targeting risk

Adds enterprise-specific scoring weights.

---



# 6. Frontend Requirements

## Home Page

* Text input
* Persona selector
* Enterprise toggle
* Analyze button

## Results Dashboard

Sections:

1. Risk Score Gauge
2. Risk Breakdown Chart
3. Risk Heatmap
4. Correlation Depth Score
5. Exposure Timeline Estimate
6. Public Visibility Score
7. Attack Vector Panel
8. Inference Graph (React Flow)
9. Persona Simulation Panel
10. Phishing Simulation Panel
11. Before/After Comparison

Fully responsive.

---

# 7. Non-Functional Requirements

* No database
* No text storage
* Deterministic scoring
* Response time < 4 seconds
* Modular backend services
* Clear config-based rule engine

---

# 8. Backend Structure

backend/

* main.py
* routes/
* services/

  * extractor.py
  * rule_engine.py
  * scoring_engine.py
  * correlation_depth.py
  * timeline_estimator.py
  * visibility_estimator.py
  * attack_vector_engine.py
  * graph_builder.py
  * persona_engine.py
  * phishing_generator.py
* config/

  * rules_config.py
  * weights_config.py

---



---

# 10. Acceptance Criteria

System must:

* Produce same score for same input
* Show visible inference graph
* Show measurable risk drop after hardening
* Categorize attack vectors
* Generate persona-based narrative
* Not persist user data
* Complete full analysis in under 4 seconds

---

# 11. Differentiation Statement

PersonaShield does not merely detect PII.
It models attacker reasoning through deterministic correlation pathways and quantifies compound privacy exposure risk.

---



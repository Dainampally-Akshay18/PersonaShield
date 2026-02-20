# 🏗️ Backend Folder Structure (Production-Grade)

```
backend/
│
├── app/
│   ├── main.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   ├── logging.py
│   │
│   ├── api/
│   │   ├── deps.py
│   │   ├── router.py
│   │   ├── v1/
│   │   │   ├── extraction.py
│   │   │   ├── correlation.py
│   │   │   ├── scoring.py
│   │   │   ├── timeline.py
│   │   │   ├── visibility.py
│   │   │   ├── attack_vectors.py
│   │   │   ├── persona.py
│   │   │   ├── phishing.py
│   │   │   ├── explanation.py
│   │   │   ├── simulation.py
│   │   │   ├── heatmap.py
│   │
│   ├── schemas/
│   │   ├── extraction_schema.py
│   │   ├── correlation_schema.py
│   │   ├── scoring_schema.py
│   │   ├── persona_schema.py
│   │   ├── simulation_schema.py
│   │   ├── heatmap_schema.py
│   │
│   ├── services/
│   │   ├── extraction_service.py
|   |   |--- ingestion_service.py
│   │   ├── correlation_engine.py
│   │   ├── scoring_engine.py
│   │   ├── timeline_service.py
│   │   ├── visibility_service.py
│   │   ├── attack_vector_service.py
│   │   ├── persona_service.py
│   │   ├── phishing_service.py
│   │   ├── explanation_service.py
│   │   ├── simulation_service.py
│   │   ├── heatmap_service.py
│   │
│   ├── llm/
│   │   ├── langchain_client.py
│   │   ├── prompt_templates.py
│   │   ├── persona_prompts.py
│   │   ├── phishing_prompt.py
│   │   ├── explanation_prompt.py
│   │
│   ├── rules/
│   │   ├── correlation_rules.json
│   │   ├── risk_weights.json
│   │   ├── visibility_weights.json
│   │
│   ├── utils/
│   │   ├── risk_helpers.py
│   │   ├── graph_helpers.py
│   │   ├── severity_mapper.py
│   │   ├── validators.py
│
├── tests/
│   ├── test_extraction.py
│   ├── test_scoring.py
│   ├── test_correlation.py
│   ├── test_simulation.py
│
├── requirements.txt
├── .env
├── Dockerfile
├── README.md
```

---

# 🧠 Why This Structure Is Elite

Because we separated:

• API Layer
• Business Logic
• Rule Engine
• Scoring Engine
• LLM Narrative Layer
• Config-Based Rules
• Visualization Helpers

This makes it:

✔ Deterministic
✔ Testable
✔ Scalable
✔ Enterprise-ready
✔ Agent-friendly

---

# 🔥 Layer-by-Layer Explanation

---

## 1️⃣ main.py

Entry point.

Initializes:

* FastAPI app
* CORS
* Router include
* Logging

---

## 2️⃣ api/v1/

Each feature = separate endpoint file.

Example:

```
extraction.py → /api/v1/extract
correlation.py → /api/v1/correlate
scoring.py → /api/v1/score
heatmap.py → /api/v1/risk-heatmap
simulation.py → /api/v1/simulate
persona.py → /api/v1/persona-mode
```

Keeps endpoints clean.

---

## 3️⃣ services/

THIS is the brain.

Example:

### extraction_service.py

Handles:

* Regex extraction
* NLP entity parsing
* Structured JSON output

---

### correlation_engine.py

Loads:

```
rules/correlation_rules.json
```

Applies rule logic:

IF college + graduation_year
→ age inference

Fully deterministic.

---

### scoring_engine.py

Loads:

```
risk_weights.json
```

Calculates:

Total Risk Score
Correlation Depth Score
Severity distribution

Returns normalized 0–100.

---

### heatmap_service.py

Converts:

Raw contribution scores → graph-ready format

Returns:

* Bar chart array
* Radar chart array
* Pie chart array

---

### simulation_service.py

Handles:

Before score
Field removal
Recalculate
Difference

Returns:

Original
Hardened
Improvement %

---

## 4️⃣ llm/

Used only for:

• Persona narrative
• Phishing email simulation
• Explanation engine

Never used for scoring.

This keeps core secure + deterministic.

---

## 5️⃣ rules/

Critical for winning.

Judges love configurable engines.

Example:

correlation_rules.json

```
[
  {
    "condition": ["college", "graduation_year"],
    "inference": "age_range",
    "risk_type": "Identity Theft Risk",
    "risk_weight": 7
  },
  {
    "condition": ["company", "job_title"],
    "inference": "corporate_targeting",
    "risk_type": "Corporate Targeting Risk",
    "risk_weight": 6
  }
]
```

Now your system looks like:

Configurable Risk Intelligence Engine.

---

## 6️⃣ schemas/

Pydantic models for:

Request validation
Response standardization

This makes the system:

Production-grade
Strictly typed
Auto-documented in Swagger

---

## 7️⃣ utils/

Reusable helpers:

* Risk severity mapping
* Score normalization
* Graph transformation logic
* Timeline calculations

Keeps services clean.

---

# 🔥 API Map Summary

| Feature               | Endpoint             |
| --------------------- | -------------------- |
| Extraction            | POST /extract        |
| Correlation           | POST /correlate      |
| Scoring               | POST /score          |
| Timeline              | POST /timeline       |
| Visibility            | POST /visibility     |
| Attack Categorization | POST /attack-vectors |
| Persona Mode          | POST /persona-mode   |
| Phishing Generator    | POST /phishing       |
| Explanation           | POST /explanation    |
| Simulation            | POST /simulate       |
| Heatmap               | POST /risk-heatmap   |

---

# 🏆 Why This Wins

Because this looks like:

AI-powered Cyber Risk Intelligence Engine

Not:

Resume analyzer demo.

You now have:

• Deterministic scoring
• Explainable AI
• Persona modeling
• Risk simulation
• Graph-ready outputs
• Enterprise toggle support
• Modular architecture

This is top 1% structure.

---


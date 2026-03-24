# 📡 API CONTRACTS – PersonaShield Backend

Base URL:

```
/api/v1
```

All endpoints are stateless.
No user data persistence.

---

0️⃣ Ingestion API (NEW – Mandatory)
Endpoint
POST /api/v1/ingest
Description

Accepts either:

Raw text input

PDF resume upload

Normalizes input into plain text for downstream processing.

No data is stored. Processing is in-memory only.

Request – Text Input
{
  "input_type": "text",
  "content": "Full resume or profile text here..."
}
Request – PDF Upload

Content-Type: multipart/form-data

file: resume.pdf
input_type: pdf
Response
{
  "normalized_text": "Extracted and cleaned resume text...",
  "input_type_detected": "pdf",
  "character_count": 4521
}
Validation Rules

Only PDF allowed for file upload

Max file size: 5MB

If input_type = text → content required

If input_type = pdf → file required


# 1️⃣ Sensitive Data Extraction API

## Endpoint

POST `/api/v1/extract`

## Description

Extracts structured entities from raw text input.

## Request Body

```json
{
  {
  "normalized_text": "string"
}
}
```

## Response

```json
{
  "entities": {
    "emails": ["john@gmail.com"],
    "phones": ["9876543210"],
    "dob": ["1999-05-10"],
    "graduation_year": [2021],
    "college": ["IIT Hyderabad"],
    "company": ["Infosys"],
    "job_title": ["Software Engineer"],
    "location": ["Bangalore"],
    "family_mentions": ["father", "mother"],
    "skills": ["Python", "React"],
    "certifications": ["AWS Certified"],
    "years_of_experience": 3
  }
}
```

Deterministic: YES
Uses: Regex + spaCy

---

# 2️⃣ Rule-Based Correlation Engine API

## Endpoint

POST `/api/v1/correlate`

## Description

Applies predefined inference rules on extracted entities.

## Request

```json
{
  "entities": { ... }
}
```

## Response

```json
{
  "inferred_risks": [
    {
      "risk_type": "Age Inference Risk",
      "severity": 8,
      "pathway": ["college", "graduation_year", "age_range"]
    },
    {
      "risk_type": "Corporate Targeting Risk",
      "severity": 12,
      "pathway": ["company", "job_title"]
    }
  ],
  "inference_chains_count": 4
}
```

Deterministic: YES
Uses config-based rule engine.

---

# 3️⃣ Weighted Risk Scoring API

## Endpoint

POST `/api/v1/score`

## Description

Calculates normalized risk score using deterministic weighted model.

## Request

```json
{
  "entities": { ... },
  "inferred_risks": [ ... ],
  "correlation_depth": 6,
  "timeline_years": 8,
  "visibility_score": 7
}
```

## Response

```json
{
  "risk_score": 72,
  "risk_level": "High",
  "score_breakdown": {
    "pii_exposure": 20,
    "correlation": 15,
    "inference_depth": 10,
    "employment_exposure": 12,
    "location_exposure": 5,
    "timeline_exposure": 5,
    "visibility_exposure": 5
  }
}
```

Deterministic: YES

---

# 4️⃣ Correlation Depth API

## Endpoint

POST `/api/v1/correlation-depth`

## Description

Computes correlation depth score.

## Request

```json
{
  "inferred_risks": [ ... ]
}
```

## Response

```json
{
  "correlation_depth_score": 6,
  "chain_count": 4,
  "average_chain_length": 1.5
}
```

Deterministic: YES

---

# 5️⃣ Exposure Timeline Estimator API

## Endpoint

POST `/api/v1/timeline`

## Description

Estimates exposure timeline in years.

## Request

```json
{
  "graduation_year": 2018,
  "years_of_experience": 5,
  "company_years": 3
}
```

## Response

```json
{
  "estimated_exposure_years": 8,
  "timeline_risk_weight": 5
}
```

Deterministic: YES

---

# 6️⃣ Public Data Visibility Estimator API

## Endpoint

POST `/api/v1/visibility`

## Description

Estimates how searchable/exposed data is.

## Request

```json
{
  "entities": { ... }
}
```

## Response

```json
{
  "visibility_score": 7,
  "visibility_level": "High"
}
```

Deterministic: YES

---

# 7️⃣ Attack Vector Categorization API

## Endpoint

POST `/api/v1/attack-vectors`

## Description

Categorizes exposure into attack types.

## Request

```json
{
  "entities": { ... },
  "inferred_risks": [ ... ]
}
```

## Response

```json
{
  "attack_vectors": [
    {
      "category": "Spear Phishing Risk",
      "severity": "High",
      "contributing_factors": ["company", "job_title", "email"]
    },
    {
      "category": "Identity Theft Risk",
      "severity": "Moderate",
      "contributing_factors": ["name", "dob"]
    }
  ]
}
```

Deterministic: YES

---

# 8️⃣ Persona Exposure Mode API

## Endpoint

POST `/api/v1/persona-simulation`

## Description

Generates adversarial narrative using LLM.

## Request

```json
{
  "persona": "professional_scammer",
  "analysis_summary": { ... }
}
```

## Response

```json
{
  "persona": "professional_scammer",
  "narrative": "As a professional scammer, I would target..."
}
```

Deterministic: NO (LLM-based)
Scoring unaffected.

---

# 9️⃣ AI Phishing Generator API

## Endpoint

POST `/api/v1/generate-phishing`

## Description

Generates educational phishing simulation email.

## Request

```json
{
  "entities": { ... }
}
```

## Response

```json
{
  "email_subject": "Exclusive IIT Hyderabad Alumni Offer",
  "email_body": "Hi Rahul, as an IIT Hyderabad alumni...",
  "disclaimer": "Educational simulation only."
}
```

LLM-based.
No scoring logic.

---

# 🔟 AI Explanation Engine API

## Endpoint

POST `/api/v1/explain-risk`

## Description

Explains risk score using structured data.

## Request

```json
{
  "risk_score": 72,
  "score_breakdown": { ... },
  "inferred_risks": [ ... ]
}
```

## Response

```json
{
  "explanation": "Your score is high because graduation year combined with company and location..."
}
```

LLM-based.

---

# 1️⃣1️⃣ Before/After Risk Simulation API

## Endpoint

POST `/api/v1/simulate-hardening`

## Description

Recalculates risk score after removing selected fields.

## Request

```json
{
  "original_entities": { ... },
  "remove_fields": ["graduation_year", "phone"]
}
```

## Response

```json
{
  "original_score": 78,
  "hardened_score": 42,
  "difference": 36
}
```

# 🔥 1️⃣2️⃣ Advanced Risk Heatmap API (Graph-Ready)

## Endpoint

```
POST /api/v1/risk-heatmap
```

---

## Description

Returns:

• Risk contribution per data type
• Risk distribution summary
• Risk category breakdown
• Graph-ready numeric values
• Severity counts
• Visualization-ready structures

---

## Request

```json
{
  "score_breakdown": {
    "total_risk_score": 72,
    "components": {
      "direct_pii": 20,
      "correlation": 15,
      "inference_depth": 10,
      "employment": 12,
      "location": 5,
      "timeline": 6,
      "public_visibility": 4
    },
    "data_type_contributions": {
      "email": 18,
      "phone": 10,
      "graduation_year": 8,
      "company": 12,
      "location": 9,
      "dob": 15
    }
  }
}
```

---

# ✅ Response (Full Enterprise Version)

```json
{
  "summary": {
    "total_risk_score": 72,
    "risk_level": "High",
    "high_risk_count": 3,
    "medium_risk_count": 2,
    "low_risk_count": 1
  },

  "severity_distribution": {
    "high": 45,
    "medium": 20,
    "low": 7
  },

  "risk_category_breakdown": [
    {
      "category": "Spear Phishing Risk",
      "score": 22,
      "severity": "High"
    },
    {
      "category": "Identity Theft Risk",
      "score": 18,
      "severity": "High"
    },
    {
      "category": "Corporate Targeting Risk",
      "score": 14,
      "severity": "Moderate"
    },
    {
      "category": "Social Engineering Risk",
      "score": 10,
      "severity": "Moderate"
    },
    {
      "category": "Physical Safety Risk",
      "score": 8,
      "severity": "Low"
    }
  ],

  "heatmap": [
    {
      "data_type": "email",
      "contribution_score": 18,
      "risk_level": "High"
    },
    {
      "data_type": "phone",
      "contribution_score": 10,
      "risk_level": "Medium"
    },
    {
      "data_type": "graduation_year",
      "contribution_score": 8,
      "risk_level": "Moderate"
    },
    {
      "data_type": "company",
      "contribution_score": 12,
      "risk_level": "High"
    },
    {
      "data_type": "location",
      "contribution_score": 9,
      "risk_level": "Moderate"
    },
    {
      "data_type": "dob",
      "contribution_score": 15,
      "risk_level": "High"
    }
  ],

  "graph_data": {
    "bar_chart": [
      { "name": "Email", "value": 18 },
      { "name": "Phone", "value": 10 },
      { "name": "Graduation Year", "value": 8 },
      { "name": "Company", "value": 12 },
      { "name": "Location", "value": 9 },
      { "name": "DOB", "value": 15 }
    ],
    "radar_chart": [
      { "category": "Direct PII", "value": 20 },
      { "category": "Correlation", "value": 15 },
      { "category": "Inference Depth", "value": 10 },
      { "category": "Employment", "value": 12 },
      { "category": "Location", "value": 5 },
      { "category": "Timeline", "value": 6 },
      { "category": "Public Visibility", "value": 4 }
    ],
    "pie_chart": [
      { "name": "High Risk", "value": 45 },
      { "name": "Medium Risk", "value": 20 },
      { "name": "Low Risk", "value": 7 }
    ]
  }
}
```

---

# 🎯 Why This Is Powerful

Now your frontend can render:

### 📊 1. Total Risk Score Gauge

Using `summary.total_risk_score`

---

### 📊 2. Risk Category Bar Chart

Using `risk_category_breakdown`

---

### 📊 3. Data-Type Heatmap

Using `heatmap`

---

### 📊 4. Radar Chart (Multi-Dimensional Risk)

Using `graph_data.radar_chart`

---

### 📊 5. Pie Chart (Severity Distribution)

Using `graph_data.pie_chart`

---

### 📊 6. Risk Distribution Counter

Using:

* `high_risk_count`
* `medium_risk_count`
* `low_risk_count`

---





📌 Global Processing Rules

All processing is stateless.

No user data or files are persisted.

PDF files are processed in-memory and discarded after response.

Risk scoring is deterministic.

LLM is used only for narrative generation (persona, phishing, explanation).

Core scoring logic does NOT depend on LLM.


# 🧠 MASTER ANALYSIS ENDPOINT

## Endpoint

```
POST /api/v1/analyze
```

## Description

Runs the complete PersonaShield pipeline in a single request.
This endpoint orchestrates all deterministic engines and optional LLM simulations.

No user data is stored. Processing is fully in-memory.

---

# Request

Supports BOTH text and PDF (same as ingest).

### Option A — Text Input

```json
{
  "input_type": "text",
  "content": "Full resume or profile text here...",
  "persona": "professional_scammer",
  "simulate_hardening": true,
  "fields_to_remove": ["phone", "graduation_year"]
}
```

### Option B — PDF Upload

`multipart/form-data`

```
file: resume.pdf
input_type: pdf
persona: professional_scammer
simulate_hardening: true
fields_to_remove: ["phone","graduation_year"]
```

---

# Internal Execution Order (For Agent)

The backend MUST execute:

1. Ingest → normalize text
2. Extract entities
3. Apply correlation rules
4. Compute correlation depth
5. Estimate exposure timeline
6. Estimate public visibility
7. Compute weighted risk score
8. Categorize attack vectors
9. Generate persona narrative (LLM)
10. Generate phishing simulation (LLM)
11. Generate explanation (LLM)
12. Run hardening simulation (if enabled)
13. Build risk heatmap

---

# Response

Single structured response.

```json
{
  "analysis_id": "uuid",

  "input_summary": {
    "input_type": "text",
    "character_count": 4521
  },

  "entities": {
    "emails": ["john@gmail.com"],
    "phones": ["9876543210"],
    "company": ["Infosys"],
    "job_title": ["Software Engineer"],
    "location": ["Bangalore"],
    "skills": ["Python","React"]
  },

  "risk_assessment": {
    "risk_score": 72,
    "risk_level": "High",

    "score_breakdown": {
      "pii_exposure": 20,
      "correlation": 15,
      "inference_depth": 10,
      "employment_exposure": 12,
      "location_exposure": 5,
      "timeline_exposure": 5,
      "visibility_exposure": 5
    },

    "correlation_depth": {
      "score": 6,
      "chain_count": 4,
      "average_chain_length": 1.5
    },

    "exposure_timeline_years": 8,
    "visibility_score": 7
  },

  "attack_analysis": {
    "attack_vectors": [
      {
        "category": "Spear Phishing Risk",
        "severity": "High",
        "contributing_factors": ["company","job_title","email"]
      }
    ]
  },

  "persona_simulation": {
    "persona": "professional_scammer",
    "narrative": "As a scammer I would impersonate..."
  },

  "phishing_simulation": {
    "subject": "Internal Payroll Update Required",
    "body": "Hi John, please verify...",
    "disclaimer": "Educational simulation only."
  },

  "explanation": {
    "summary": "Your company and role enable believable internal phishing..."
  },

  "hardening_simulation": {
    "enabled": true,
    "original_score": 78,
    "hardened_score": 42,
    "risk_reduction": 36
  },

  "visualization": {
    "heatmap": [
      {"data_type":"email","risk_level":"High","score":18},
      {"data_type":"phone","risk_level":"Medium","score":10}
    ]
  }
}
```

---

# Important Rules For Implementation

Add this under API contract:

```
• This endpoint must not call external APIs for deterministic scoring
• LLM failures must NOT break response (fallback to empty text)
• Response must always return risk_score even if persona/phishing fails
• Processing target < 4 seconds
```

---




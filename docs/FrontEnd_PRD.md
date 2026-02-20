# PersonaShield Frontend PRD

## 1. Product Overview

PersonaShield is a privacy risk analysis dashboard.

User uploads a resume (PDF or text).
Frontend calls a single backend endpoint:

POST /api/v1/analyze/upload-pdf

The API returns a full structured cyber-risk analysis JSON.

Frontend stores this response in memory (array history) and renders different analytical views from the same dataset.

No additional API calls are required after upload.

The application is a client-side analytical dashboard.

Authentication is local only (localStorage based login/signup).
No real backend auth.

---

## 2. Core UX Flow

### Step 1 — Authentication

Pages:

* Login
* Signup

Behavior:

* Credentials stored in localStorage
* After login redirect to Upload page
* If logged in, skip auth screens

---

### Step 2 — Upload Page

User uploads:

* PDF resume OR pasted text

On submit:

1. Call /api/v1/analyze/upload-pdf
2. Show loading screen: “Analyzing digital footprint…”
3. Store response in state
4. Redirect to Dashboard

---

### Step 3 — Dashboard Layout

Persistent layout:

Left Sidebar (navigation)
Main Content Area (dynamic module view)

The sidebar never reloads.
Only content area changes.

---

## 3. Sidebar Modules (Main Features)

Each item renders a page using SAME stored analysis object.

### 1. Risk Graphs

Use visualization.graph_data
Render:

* Bar chart
* Radar chart
* Pie chart

---

### 2. Persona Exposure Model

Use persona_simulation.narrative
Show attacker perspective explanation card

---

### 3. Attack Vector Categorization

Use attack_analysis.attack_vectors
Show categorized threat cards

---

### 4. Phishing Simulation Generator

Use phishing_simulation
Show generated phishing email template

---

### 5. Correlation Depth Score

Use risk_assessment.correlation_depth
Visual gauge meter

---

### 6. Public Visibility Score

Use risk_assessment.visibility_score
Display exposure meter

---

### 7. Exposure Timeline Estimation

Use risk_assessment.timeline_years
Display estimated inference timeline

---

### 8. Weighted Risk Scoring

Use risk_assessment.risk_score and score_breakdown
Show:

* total risk
* component contributions

---

## 4. State Management Rules

Global State:
analysisResult (latest analysis)
analysisHistory (array of past uploads)
authUser

No server persistence required.

---

## 5. UI Behavior Rules

Do NOT recompute backend logic in frontend
Frontend only visualizes data

Each module must handle missing fields gracefully
Show “Not enough data detected” fallback UI

Loading screen required during analysis

---

## 6. Error Handling

If API fails:
Show retry screen

If partial data:
Render available modules only

---

## 7. Technical Constraints

Framework: React (SPA)
Routing: Client-side routing
Charts: Chart library allowed
No backend sessions
All persistence = localStorage

---

## 8. Design Goals

Dashboard should feel like:
“Cybersecurity investigation console”

Dark theme preferred
Professional + analytical tone
No gamification UI

---
# PersonaShield Frontend Architecture Specification

This document defines code structure.
Follow it strictly. Do not improvise structure.

---

## 1. Application Type

Single Page Application (SPA)

Pattern:
Layout + Pages + Feature Modules + Shared UI Components

---

## 2. Global State

Use Context API (not Redux)

Create 2 contexts:

### AuthContext

Stores:

* user
* login()
* signup()
* logout()

Persistence:
localStorage

---

### AnalysisContext

Stores:

* analysisResult (latest analysis)
* analysisHistory (array of previous analyses)
* setAnalysis()
* clearAnalysis()

Persistence:
latest result in memory
history in localStorage

---

## 3. Routing Structure

Routes:

/login
/signup
/upload
/dashboard

Dashboard has nested routes:

/dashboard/risk-graphs
/dashboard/persona
/dashboard/attack-vectors
/dashboard/phishing
/dashboard/correlation
/dashboard/visibility
/dashboard/timeline
/dashboard/risk-score

---

## 4. Layout Structure

### AppLayout

Controls authentication redirect

### DashboardLayout

Contains:
Sidebar (fixed)
ContentArea (dynamic)

Sidebar never re-renders during navigation

---

## 5. Folder Structure

src/
contexts/
AuthContext.jsx
AnalysisContext.jsx

pages/
Login.jsx
Signup.jsx
Upload.jsx

layouts/
AppLayout.jsx
DashboardLayout.jsx

modules/
RiskGraphs/
PersonaExposure/
AttackVectors/
PhishingSimulation/
CorrelationDepth/
VisibilityScore/
TimelineEstimation/
WeightedRiskScore/

components/
Sidebar.jsx
Navbar.jsx
Loader.jsx
FileUploader.jsx
GaugeMeter.jsx
RiskCard.jsx
EmptyState.jsx

services/
api.js

---

## 6. API Layer

Create single function:

uploadResume(file)

It calls:
POST /api/v1/analyze/upload-pdf

Return parsed JSON only

No other API calls allowed.

---

## 7. Upload Flow

Upload.jsx:

1. user selects file
2. call uploadResume
3. show Loader
4. save to AnalysisContext
5. redirect /dashboard/risk-graphs

---

## 8. Module Rules

Each module:

* reads from AnalysisContext
* never fetches API
* handles missing data gracefully

Modules must be independent and reusable.

---

## 9. Re-render Rules

Only modules re-render on navigation.
Sidebar and Layout must remain mounted.

---

## 10. Error Boundaries

If analysisResult missing:
redirect to /upload

---

End of Architecture Specification

# Global Navbar Behavior Specification

The application must have a persistent top navigation bar visible on ALL pages.

The navbar is independent from the dashboard sidebar.

---

## Navbar Elements

Left side:

* Logo (PersonaShield)
* Home button → redirects to "/"
* About Us button → informational page

Right side (dynamic based on authentication):

If user NOT logged in:

* Login button → /login
* Signup button → /signup

If user logged in:

* Dashboard button → /dashboard/risk-graphs
* Logout button → clears localStorage auth and redirects to "/login"

---

## Authentication Rules

Authentication state stored in localStorage.

On page load:

* If user exists → authenticated
* If not → guest mode

Navbar must react instantly to login/logout without refresh.

---

## Routing Behavior

Guest users:
Can access:
/
/about
/login
/signup

Trying to access /dashboard/* → redirect to /login

Authenticated users:
Can access all routes

If authenticated user visits /login or /signup → redirect to /dashboard

---

## UI Behavior

Navbar always visible
Sidebar only visible inside /dashboard routes

Layout hierarchy:

AppLayout
├ Navbar (always visible)
└ Page Content
├ Public Pages
└ DashboardLayout (includes sidebar)

---

## Logout Behavior

On logout:

1. clear auth context
2. clear localStorage user
3. redirect to home "/"

---

End Navbar Specification

# Backend Integration Specification

The frontend connects to a deployed backend service.

Base URL:
https://personashield.onrender.com

Primary Endpoint:
POST /api/v1/upload-pdf

Full URL:
https://personashield.onrender.com/api/v1/upload-pdf

---

## Request Type

multipart/form-data

Field name MUST be:
file

Only PDF files allowed.

Example:
file: resume.pdf

No authentication headers required.

---

## API Call Behavior

When user uploads a file:

1. Send POST request to the endpoint
2. Show loading state while waiting
3. Parse JSON response
4. Store entire response inside AnalysisContext
5. Redirect to dashboard

---

## Response Handling

The API returns a complete analysis object.

Frontend MUST NOT modify data.
Frontend MUST NOT recompute scores.

Frontend only reads fields and renders UI modules.

The response should be stored exactly as received.

---

## Failure Handling

If request fails:
Show retry UI

If backend returns partial data:
Render available modules only

If server takes long:
Show analyzing message:
"Scanning public digital footprint..."

---

## Timeout Behavior

If response takes longer than 25 seconds:
Show extended message:
"Deep correlation analysis in progress..."

Do not cancel request.

---

End Backend Integration Specification


# API Response Schema Specification

The backend returns a single analysis object.

Frontend must treat this object as read-only.

Below is the response contract and how each section is used in UI.

---

## 1. Metadata

analysis_id → unique id of analysis session

input_summary

* input_type → pdf or text
* character_count → size indicator
* timestamp → upload time

Used for header display only.

---

## 2. Extracted Entities

entities contains detected personal data:

emails
phones
graduation_year
college
company
location
skills
certifications
years_of_experience

Used in:
Persona Exposure Model
Risk reasoning context

Do NOT display raw list as primary UI table.

---

## 3. Risk Assessment

risk_assessment is the main scoring block.

risk_score → main number (0-100)
risk_level → Low / Moderate / High
score_breakdown → contribution of each factor

inferred_risks → correlated risks detected

Used in:
Weighted Risk Scoring
Correlation Depth
Timeline Estimation
Visibility Score

---

## 4. Attack Analysis

attack_analysis.attack_vectors

Each item:
category
severity
contributing_factors

Used in:
Attack Vector Categorization module

---

## 5. Persona Simulation

persona_simulation.narrative

Represents attacker reasoning.
Used in Persona Exposure page.

---

## 6. Phishing Simulation

phishing_simulation

* email_subject
* email_body
* disclaimer

Displayed as formatted email preview card.

---

## 7. Explanation

explanation.explanation

Human readable privacy explanation.
Used as guidance panel.

---

## 8. Visualization Data

visualization.graph_data contains chart-ready values:

bar_chart
radar_chart
pie_chart

visualization.summary contains severity counts

Used only for Risk Graphs page.

Frontend MUST NOT calculate charts itself.

---

## 9. Missing Data Handling

Some fields may be null or empty.

Frontend must:

* hide module if data missing
* show fallback message:
  “Not enough information detected”

Do NOT crash UI.

---

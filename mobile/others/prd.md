## Table of Contents

1. Introduction
2. Overall Description
3. Team Structure & Responsibilities
4. System Architecture
5. Functional Requirements
6. Non-Functional Requirements
7. Data Requirements
8. API Specification Overview
9. UI/UX Requirements
10. Security & Compliance
11. Repository Structure
12. Development Phases & Milestones
13. Competitive Landscape
14. Risk Analysis
15. Glossary
16. Appendices

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) defines the complete functional, non-functional, architectural, and operational requirements for **Vorosha,** a unified, bilingual (Bangla & English), voice-first AI assistant that empowers Bangladeshi citizens to discover, understand, and complete government services through natural conversation.

The name **"ভরসা"** (Vorosha) means **"Trust"** in Bangla, reflecting the platform's mission to be the trusted bridge between citizens and government.

### 1.2 Scope

Vorosha is an AI-driven, multi-modal citizen-service platform that provides:

| Capability | Description |
| --- | --- |
| **Voice-First Conversational AI** | Natural Bangla/English speech interface for querying government services |
| **RAG Policy Engine** | Retrieval-Augmented Generation over thousands of pages of municipal bylaws & government documents |
| **Smart Form Assistant** | Voice-to-text AI agent for completing complex government forms with real-time validation |
| **Predictive Social Dashboard** | Risk-identification dashboard for social workers using anonymized public data |
| **Vision-Based Issue Reporting** | Photo-based infrastructure issue reporting with AI categorization, geo-tagging, and routing |
| **Plain Language Legislation** | Sovereign-cloud LLM layer that translates bureaucratic jargon into accessible summaries |
| **Secure Identity Layer** | Privacy-preserving citizen identity verification and session management |

### 1.3 Intended Audience

| Audience | Relevance |
| --- | --- |
| Development Team | Primary reference for implementation |
| Project Advisors | Technical review and architectural guidance |
| Government Stakeholders | Service integration, data access, and policy alignment |
| Judges / Evaluators | Competition review of scope, feasibility, and innovation |

### 1.4 Definitions & Abbreviations

| Term | Definition |
| --- | --- |
| RAG | Retrieval-Augmented Generation |
| LLM | Large Language Model |
| NID | National Identity (Bangladesh) |
| ASR | Automatic Speech Recognition |
| TTS | Text-to-Speech |
| NLP | Natural Language Processing |
| BNLP | Bangla Natural Language Processing |
| SSO | Single Sign-On |
| RBAC | Role-Based Access Control |
| PII | Personally Identifiable Information |
| SLA | Service Level Agreement |
| JWT | JSON Web Token |
| OIDC | OpenID Connect |
| GDPR | General Data Protection Regulation |
| BDPA | Bangladesh Digital Privacy Act (proposed reference) |

### 1.5 References

| Reference | Description |
| --- | --- |
| IEEE 830-1998 | Recommended Practice for SRS |
| Bangladesh Right to Information Act, 2009 | Legal basis for public data access |
| Bangladesh ICT Act, 2006 (amended 2013) | Digital services regulatory framework |
| a2i (Access to Information) Programme | Bangladesh government digital transformation |
| National Portal of Bangladesh (bangladesh.gov.bd) | Primary government service directory |

---

## 2. Overall Description

### 2.1 Product Perspective

**Vorosha** is a **greenfield project** designed as a standalone citizen-service platform with future integration potential into the Bangladesh National Portal ecosystem. It draws inspiration from but is architecturally distinct from existing solutions.

!image.png

### 2.2 Product Features Summary

| # | Feature Module | Priority | Primary User |
| --- | --- | --- | --- |
| 1 | Voice Conversational Interface | 🔴 Critical | All Citizens |
| 2 | RAG Policy Q&A Engine | 🔴 Critical | Citizens, Businesses |
| 3 | Smart Form Assistant | 🟡 High | Non-native speakers, Rural citizens |
| 4 | Predictive Social Worker Dashboard | 🟡 High | Social Workers, NGOs |
| 5 | Vision-Based Issue Reporting | 🟢 Medium | All Citizens |
| 6 | Plain Language Legislation | 🟢 Medium | Citizens, Journalists |
| 7 | Secure Identity Layer | 🔴 Critical | All Users |
| 8 | Admin & Analytics Portal | 🟡 High | Government Officials |

### 2.3 User Classes & Characteristics

| User Class | Description | Tech Literacy | Primary Interface |
| --- | --- | --- | --- |
| **Rural Citizen** | Low literacy, Bangla-only, feature/smartphone user in village | Low | Voice (Bangla) |
| **Urban Citizen** | Moderate literacy, bilingual, smartphone user in city | Medium | Voice + Text |
| **Business Owner** | Needs licensing info, compliance guidance, permit queries | Medium-High | Text + Voice |
| **Non-native Speaker** | Foreign residents needing to complete Bangladeshi government forms | Low-Medium | Voice (English) |
| **Social Worker** | Government/NGO field worker monitoring vulnerable households | Medium | Web Dashboard |
| **Government Admin** | Internal staff managing services, reviewing tickets, viewing analytics | High | Web Dashboard |

### 2.4 Operating Environment

| Component | Technology |
| --- | --- |
| Mobile Client | React Native (Expo) — iOS 14+ / Android 8.0+ |
| Web Client | React 18+ — Chrome, Firefox, Safari, Edge (latest 2 versions) |
| Backend | Django 5.x / Python 3.12+ |
| Database | PostgreSQL 16+ (primary), Redis 7+ (cache/sessions) |
| Vector Database | ChromaDB / Qdrant / pgvector |
| AI/ML Runtime | Python, PyTorch / ONNX, Hugging Face Transformers |
| Cloud | Sovereign-cloud compatible (Bangladesh data residency) |
| CI/CD | GitHub Actions / GitLab CI |

### 2.5 Constraints

| Constraint | Impact |
| --- | --- |
| 4-member team | Feature scope must be phased; aggressive prioritization required |
| Bangla NLP maturity | ASR/TTS for Bangla dialects is less mature than English; model fine-tuning needed |
| Data sovereignty | All PII must reside within Bangladesh; no cross-border data transfer |
| Offline capability | Rural Bangladesh has intermittent connectivity; core voice features need offline fallback |
| Government document access | Acquiring digitized bylaws/legislation requires partnerships |

### 2.6 Assumptions & Dependencies

**Assumptions:**

- Government documents (bylaws, legislation, forms) are obtainable in digital format (PDF, HTML, or scanned images with OCR)
- Bangla ASR models (e.g., OpenAI Whisper fine-tuned, Google Speech-to-Text Bangla) provide ≥ 85% WER accuracy
- A sovereign or Bangladesh-hosted cloud provider is available for deployment
- Users have access to smartphones with microphone and camera

**Dependencies:**

- Bangla ASR/TTS model availability and quality
- Government data partnerships for official documents
- Third-party mapping API for geo-tagging (e.g., OpenStreetMap)
- LLM API or self-hosted model infrastructure

---

## 3. Team Structure & Responsibilities

### 3.1 Team Composition

!image.png

### 3.2 Role Breakdown

#### Labiba Siddika Iccha: Researcher & Domain Expert

| Area | Responsibility |
| --- | --- |
| Domain Research | Map Bangladesh government services, forms, bylaws, and legislation |
| Data Acquisition | Source, curate, and digitize government documents for RAG corpus |
| User Research | Conduct user interviews with rural citizens, social workers, business owners |
| Validation | Verify AI outputs against official government sources for accuracy |
| Policy Compliance | Ensure compliance with Bangladesh ICT Act, data privacy regulations |
| Content Strategy | Define Bangla/English terminology mapping and plain-language guidelines |
| QA / Testing | Acceptance testing for domain accuracy and cultural appropriateness |

**Key Deliverables:**

- Government document corpus (cleaned, structured, tagged)
- User personas and journey maps
- Domain-specific test cases and golden Q&A datasets
- Compliance checklist and data governance policy

---

#### Mohammed Muntasir Rahman Joy: Frontend Developer & System Designer

| Area | Responsibility |
| --- | --- |
| System Architecture | Design overall system architecture, data flow diagrams, API contracts |
| Mobile App | Build React Native (Expo) cross-platform mobile application |
| Web Dashboard | Build React web dashboard for social workers and administrators |
| UI/UX Design | Design accessible, voice-first interfaces for low-literacy users |
| Design System | Create component library with Bangla typography and RTL support |
| Voice UI | Design conversational UI patterns, voice feedback, and visual cues |
| Accessibility | Ensure WCAG 2.1 AA compliance and low-bandwidth optimizations |

**Key Deliverables:**

- System architecture document and C4 diagrams
- Figma/design mockups for all screens
- React Native mobile app (Expo)
- React web dashboard
- Shared component library
- API contract specifications (OpenAPI)

---

#### Shariar Abdullah Nafi: Backend Developer

| Area | Responsibility |
| --- | --- |
| API Development | Build Django REST API with all service endpoints |
| Authentication | Implement secure identity layer (JWT, OIDC, NID verification) |
| Document Pipeline | Build ingestion pipeline for government documents (PDF → chunks → vectors) |
| Database Design | Design PostgreSQL schema, Redis caching, vector DB integration |
| Agent Orchestration | Implement agent framework for multi-step form assistance workflows |
| Infrastructure | Docker containerization, CI/CD, sovereign cloud deployment |
| Real-time Services | WebSocket support for live voice streaming and form validation |

**Key Deliverables:**

- Django REST API (all endpoints)
- Authentication & authorization service
- Document ingestion and processing pipeline
- Database schema and migrations
- Docker Compose development environment
- Deployment scripts and CI/CD configuration

---

#### Sajidul Kabir Rasif: AI Engineer

| Area | Responsibility |
| --- | --- |
| RAG Engine | Build retrieval-augmented generation pipeline over government corpus |
| Voice Pipeline | Integrate/fine-tune Bangla ASR and TTS models |
| NLP / NLU | Intent classification, entity extraction, query understanding |
| Form Agent | Build AI agent for guided form completion with validation |
| Vision Pipeline | Image classification and damage detection for infrastructure reports |
| Predictive Models | Build risk-scoring models for utility disconnection prediction |
| Summarization | Legislation summarization with plain-language rewriting |
| Model Serving | Optimize model inference for production (quantization, caching) |

**Key Deliverables:**

- RAG pipeline with evaluation benchmarks
- Fine-tuned Bangla ASR model
- Bangla TTS integration
- Vision classification model
- Predictive risk-scoring model
- Model serving infrastructure (ONNX / vLLM / TGI)
- Evaluation reports and accuracy metrics

---

## 4. System Architecture

### 4.1 High-Level Architecture

!image.png

### 4.2 Data Flow: Voice Query Lifecycle

!image.png

### 4.3 Component Architecture

| Component | Technology | Purpose |
| --- | --- | --- |
| **Mobile App** | React Native (Expo SDK 52+) | Cross-platform citizen interface |
| **Web Dashboard** | React 18 + Vite | Social worker & admin dashboard |
| **API Gateway** | Django 5 + DRF + Channels | REST API + WebSocket for real-time voice |
| **Auth Service** | Django + `djangorestframework-simplejwt` | JWT-based auth with NID verification |
| **RAG Pipeline** | LangChain / LlamaIndex + ChromaDB | Document retrieval and answer generation |
| **Voice Pipeline** | Whisper (fine-tuned) + Bangla TTS | Speech-to-text and text-to-speech |
| **Form Agent** | LangChain Agents + Django Forms | Multi-step form completion orchestration |
| **Vision Pipeline** | YOLOv8 / EfficientNet + EXIF | Image classification and geo-extraction |
| **Prediction Engine** | scikit-learn / XGBoost | Risk scoring and anomaly detection |
| **Legislation Summarizer** | LLM + custom prompts | Jargon-to-plain-language transformation |
| **Task Queue** | Celery + Redis | Async processing for document ingestion, ML jobs |
| **Database** | PostgreSQL 16 + pgvector | Primary data store with vector extension |
| **Cache** | Redis 7 | Session cache, rate limiting, pub/sub |
| **Object Storage** | MinIO (S3-compatible) | Document PDFs, images, audio files |
| **Search** | PostgreSQL FTS / Meilisearch | Full-text search over documents |

---

## 5. Functional Requirements

### 5.1 Module 1: Voice Conversational Interface

> **FR-VOICE**: The system shall provide a natural voice-based conversational interface in Bangla and English.
>

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-VOICE-01 | The system shall accept continuous Bangla speech input via device microphone | 🔴 Critical |
| FR-VOICE-02 | The system shall accept continuous English speech input via device microphone | 🔴 Critical |
| FR-VOICE-03 | The system shall auto-detect the language being spoken (Bangla or English) | 🟡 High |
| FR-VOICE-04 | The system shall transcribe speech to text with ≥ 85% accuracy for standard Bangla | 🔴 Critical |
| FR-VOICE-05 | The system shall display real-time transcription as the user speaks | 🟡 High |
| FR-VOICE-06 | The system shall generate natural Bangla speech responses via TTS | 🔴 Critical |
| FR-VOICE-07 | The system shall support interruption (barge-in) during TTS playback | 🟢 Medium |
| FR-VOICE-08 | The system shall maintain conversation context across multiple turns (≥ 10 turns) | 🟡 High |
| FR-VOICE-09 | The system shall provide visual feedback during listening, processing, and speaking states | 🔴 Critical |
| FR-VOICE-10 | The system shall fall back to text input when voice is unavailable or unclear | 🟡 High |
| FR-VOICE-11 | The system shall support offline voice recognition for basic commands (cached model) | 🟢 Medium |
| FR-VOICE-12 | The system shall log all conversations (anonymized) for quality improvement | 🟡 High |

---

### 5.2 Module 2: RAG Policy Q&A Engine

> **FR-RAG**: The system shall provide instant, legally-grounded answers to queries about government policies, bylaws, and procedures.
>

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-RAG-01 | The system shall ingest government documents in PDF, DOCX, HTML, and scanned image formats | 🔴 Critical |
| FR-RAG-02 | The system shall OCR scanned Bangla documents with ≥ 90% character accuracy | 🟡 High |
| FR-RAG-03 | The system shall chunk documents into semantically meaningful passages | 🔴 Critical |
| FR-RAG-04 | The system shall generate bilingual embeddings (Bangla + English) for all document chunks | 🔴 Critical |
| FR-RAG-05 | The system shall store embeddings in a vector database with metadata (source, date, category) | 🔴 Critical |
| FR-RAG-06 | The system shall perform hybrid search (semantic + keyword) over the document corpus | 🟡 High |
| FR-RAG-07 | The system shall generate answers grounded in retrieved passages only (no hallucination) | 🔴 Critical |
| FR-RAG-08 | The system shall cite specific document sources, sections, and page numbers in every answer | 🔴 Critical |
| FR-RAG-09 | The system shall display confidence scores for each answer | 🟡 High |
| FR-RAG-10 | The system shall respond "I don't have information about that" when no relevant sources are found | 🔴 Critical |
| FR-RAG-11 | The system shall support follow-up questions within the same topic context | 🟡 High |
| FR-RAG-12 | The system shall handle business licensing queries across all 64 districts | 🟡 High |
| FR-RAG-13 | The system shall categorize queries by service type (licensing, permits, taxes, land, education) | 🟢 Medium |
| FR-RAG-14 | The system shall support document corpus updates without full re-indexing (incremental) | 🟢 Medium |
| FR-RAG-15 | The system shall provide the answer in both text and voice formats simultaneously | 🔴 Critical |

---

### 5.3 Module 3: Smart Form Assistant (AI Agent)

> **FR-FORM**: The system shall guide users through completing complex government forms using voice-to-text with real-time validation.
>

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-FORM-01 | The system shall maintain a registry of supported government forms (≥ 20 forms at launch) | 🟡 High |
| FR-FORM-02 | The system shall present forms as a step-by-step conversational flow via voice | 🔴 Critical |
| FR-FORM-03 | The system shall accept voice input for each form field and transcribe to text | 🔴 Critical |
| FR-FORM-04 | The system shall validate each field in real-time (format, range, required, cross-field) | 🔴 Critical |
| FR-FORM-05 | The system shall provide voice feedback for validation errors in plain language | 🟡 High |
| FR-FORM-06 | The system shall auto-fill fields from user profile data (with consent) | 🟡 High |
| FR-FORM-07 | The system shall support saving and resuming partially completed forms | 🔴 Critical |
| FR-FORM-08 | The system shall generate a completed form as a downloadable PDF | 🟡 High |
| FR-FORM-09 | The system shall explain the purpose and format of each field when asked | 🟡 High |
| FR-FORM-10 | The system shall support NID number validation against format rules | 🔴 Critical |
| FR-FORM-11 | The system shall translate field labels and instructions between Bangla and English | 🟡 High |
| FR-FORM-12 | The system shall track form completion progress with visual/voice progress indicators | 🟢 Medium |
| FR-FORM-13 | The system shall detect and warn about potentially incorrect entries using contextual AI | 🟢 Medium |

---

### 5.4 Module 4: Predictive Social Worker Dashboard

> **FR-PREDICT**: The system shall provide a dashboard for social workers that identifies at-risk households and matches them with aid programs.
>

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-PREDICT-01 | The system shall ingest and process anonymized public utility and social services data | 🔴 Critical |
| FR-PREDICT-02 | The system shall compute risk scores for utility disconnection per household (anonymized) | 🔴 Critical |
| FR-PREDICT-03 | The system shall display risk scores on a color-coded map view (ward/upazila level) | 🟡 High |
| FR-PREDICT-04 | The system shall rank households by risk level (Critical, High, Medium, Low) | 🟡 High |
| FR-PREDICT-05 | The system shall automatically match at-risk households with eligible aid programs | 🔴 Critical |
| FR-PREDICT-06 | The system shall provide a case management interface for social workers | 🟡 High |
| FR-PREDICT-07 | The system shall generate weekly risk trend reports with visualizations | 🟢 Medium |
| FR-PREDICT-08 | The system shall allow social workers to add notes, update status, and flag cases | 🟡 High |
| FR-PREDICT-09 | The system shall send alerts when a household's risk score crosses a threshold | 🟡 High |
| FR-PREDICT-10 | The system shall explain the factors contributing to each risk score (model explainability) | 🟡 High |
| FR-PREDICT-11 | The system shall ensure all data is anonymized and aggregated — no individual PII exposed | 🔴 Critical |
| FR-PREDICT-12 | The system shall support filtering by geography, risk level, program eligibility, and date | 🟢 Medium |

---

### 5.5 Module 5: Vision-Based Infrastructure Issue Reporting

> **FR-VISION**: The system shall allow citizens to report infrastructure issues by photo with AI-powered categorization and routing.
>

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-VISION-01 | The system shall accept photo uploads from the device camera or gallery | 🔴 Critical |
| FR-VISION-02 | The system shall classify infrastructure issues into categories (road damage, water, electrical, waste, drainage) | 🔴 Critical |
| FR-VISION-03 | The system shall extract GPS coordinates from photo EXIF data or device location | 🔴 Critical |
| FR-VISION-04 | The system shall display the issue location on a map | 🟡 High |
| FR-VISION-05 | The system shall auto-generate a structured ticket with category, location, severity, photo | 🔴 Critical |
| FR-VISION-06 | The system shall route tickets to the appropriate government department based on category | 🟡 High |
| FR-VISION-07 | The system shall allow citizens to add voice or text descriptions to photo reports | 🟡 High |
| FR-VISION-08 | The system shall estimate issue severity from the image (minor, moderate, severe, critical) | 🟢 Medium |
| FR-VISION-09 | The system shall provide ticket tracking with status updates | 🟡 High |
| FR-VISION-10 | The system shall prevent duplicate reports for the same location/issue within a radius | 🟢 Medium |
| FR-VISION-11 | The system shall generate a public heatmap of reported issues by category and area | 🟢 Medium |
| FR-VISION-12 | The system shall allow citizens to upvote existing reports instead of creating duplicates | 🟢 Medium |

---

### 5.6 Module 6: Plain Language Legislation Summarizer

> **FR-LEGIS**: The system shall translate bureaucratic legislation into plain-language summaries accessible to all citizens.
>

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-LEGIS-01 | The system shall ingest legislation documents (bills, acts, ordinances) in Bangla and English | 🔴 Critical |
| FR-LEGIS-02 | The system shall generate plain-language summaries at three reading levels (basic, intermediate, advanced) | 🟡 High |
| FR-LEGIS-03 | The system shall highlight key changes and their impact on citizens | 🟡 High |
| FR-LEGIS-04 | The system shall provide section-by-section breakdown of complex legislation | 🟢 Medium |
| FR-LEGIS-05 | The system shall maintain links to original legislation text for verification | 🔴 Critical |
| FR-LEGIS-06 | The system shall generate both Bangla and English summaries | 🟡 High |
| FR-LEGIS-07 | The system shall provide voice narration of summaries | 🟢 Medium |
| FR-LEGIS-08 | The system shall run on sovereign-cloud infrastructure (no external API calls for PII data) | 🔴 Critical |
| FR-LEGIS-09 | The system shall display legislation status (proposed, under review, passed, enacted) | 🟢 Medium |
| FR-LEGIS-10 | The system shall allow users to ask follow-up questions about specific sections | 🟡 High |

---

### 5.7 Module 7: Secure Identity & Authentication

> **FR-AUTH**: The system shall provide secure, privacy-preserving identity management for all users.
>

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-AUTH-01 | The system shall support phone number + OTP registration/login | 🔴 Critical |
| FR-AUTH-02 | The system shall support optional NID-based identity verification | 🟡 High |
| FR-AUTH-03 | The system shall issue JWT access tokens with configurable expiry | 🔴 Critical |
| FR-AUTH-04 | The system shall implement refresh token rotation | 🔴 Critical |
| FR-AUTH-05 | The system shall support role-based access control (Citizen, Social Worker, Admin, Super Admin) | 🔴 Critical |
| FR-AUTH-06 | The system shall encrypt all PII at rest (AES-256) and in transit (TLS 1.3) | 🔴 Critical |
| FR-AUTH-07 | The system shall implement rate limiting on all authentication endpoints | 🔴 Critical |
| FR-AUTH-08 | The system shall log all authentication events for audit | 🟡 High |
| FR-AUTH-09 | The system shall support session management with concurrent session limits | 🟡 High |
| FR-AUTH-10 | The system shall allow users to delete their account and all associated data | 🟡 High |
| FR-AUTH-11 | The system shall never store raw voice recordings linked to PII without explicit consent | 🔴 Critical |

---

## 6. Non-Functional Requirements

### 6.1 Performance

| ID | Requirement | Target |
| --- | --- | --- |
| NFR-P-01 | Voice transcription latency (ASR) | ≤ 2 seconds |
| NFR-P-02 | RAG query response time (end-to-end) | ≤ 5 seconds |
| NFR-P-03 | Form field validation response time | ≤ 500ms |
| NFR-P-04 | Image classification latency | ≤ 3 seconds |
| NFR-P-05 | API response time (95th percentile) | ≤ 1 second |
| NFR-P-06 | Dashboard page load time | ≤ 2 seconds |
| NFR-P-07 | Concurrent users supported | ≥ 500 |
| NFR-P-08 | TTS audio generation latency | ≤ 3 seconds |

### 6.2 Scalability

| ID | Requirement | Target |
| --- | --- | --- |
| NFR-S-01 | Horizontal scaling of API servers | Auto-scale 2-10 pods |
| NFR-S-02 | Document corpus capacity | ≥ 100,000 pages |
| NFR-S-03 | Vector database capacity | ≥ 10M embeddings |
| NFR-S-04 | Concurrent voice sessions | ≥ 100 |

### 6.3 Reliability & Availability

| ID | Requirement | Target |
| --- | --- | --- |
| NFR-R-01 | System uptime | ≥ 99.5% |
| NFR-R-02 | Data backup frequency | Daily |
| NFR-R-03 | Recovery Time Objective (RTO) | ≤ 4 hours |
| NFR-R-04 | Recovery Point Objective (RPO) | ≤ 1 hour |
| NFR-R-05 | Graceful degradation under load (text fallback when voice overloaded) | Required |

### 6.4 Security

| ID | Requirement |
| --- | --- |
| NFR-SEC-01 | All data encrypted at rest (AES-256) and in transit (TLS 1.3) |
| NFR-SEC-02 | OWASP Top 10 compliance |
| NFR-SEC-03 | SQL injection, XSS, CSRF protection |
| NFR-SEC-04 | API rate limiting (100 req/min per user, 1000 req/min global per endpoint) |
| NFR-SEC-05 | Audit logging for all data access and modifications |
| NFR-SEC-06 | Penetration testing before production launch |
| NFR-SEC-07 | Dependency vulnerability scanning in CI/CD |
| NFR-SEC-08 | PII data anonymization for analytics and model training |

### 6.5 Accessibility

| ID | Requirement |
| --- | --- |
| NFR-A-01 | WCAG 2.1 Level AA compliance for web dashboard |
| NFR-A-02 | Voice-first design for low-literacy users |
| NFR-A-03 | High contrast mode and adjustable font sizes |
| NFR-A-04 | Screen reader compatibility |
| NFR-A-05 | Minimum touch target size of 48×48dp on mobile |

### 6.6 Localization

| ID | Requirement |
| --- | --- |
| NFR-L-01 | Full Bangla language support — UI, voice, content |
| NFR-L-02 | Full English language support — UI, voice, content |
| NFR-L-03 | Bangla Unicode rendering with proper typography (e.g., Noto Sans Bengali) |
| NFR-L-04 | Number formatting in Bangla digits and English digits per user preference |
| NFR-L-05 | Date formatting in Bangla calendar (optional) and Gregorian |

---

## 7. Data Requirements

### 7.1 Data Model Overview

!image.png

### 7.2 Data Sources

| Source | Type | Format | Update Frequency |
| --- | --- | --- | --- |
| Municipal bylaws | Government Documents | PDF, HTML | Quarterly |
| National legislation (Parliament) | Legislation | PDF, Gazette | As published |
| Government forms | Form Templates | PDF, Web | As updated |
| Utility consumption data (anonymized) | Public Data | CSV, API | Monthly |
| Social services enrollment data | Public Data | CSV, API | Monthly |
| Aid program database | Reference Data | API, Manual | Quarterly |
| OpenStreetMap | Geospatial | API | Real-time |

### 7.3 Data Retention & Privacy

| Data Category | Retention Period | Anonymization Required | Encryption |
| --- | --- | --- | --- |
| User profiles | Account lifetime + 30 days | N/A | AES-256 |
| Voice recordings | 90 days (with consent), then deleted | Required after 90 days | AES-256 |
| Conversation logs | 1 year (anonymized after 90 days) | Yes | AES-256 |
| Form submissions | 5 years | No | AES-256 |
| Issue reports | 3 years | Partial | AES-256 |
| Household risk data | Always anonymized | Yes (pre-storage) | AES-256 |
| Government documents | Permanent | N/A | AES-256 |

---

## 8. API Specification Overview

### 8.1 API Design Principles

- RESTful design with consistent resource naming
- JSON request/response format
- API versioning via URL path (`/api/v1/`)
- OpenAPI 3.1 specification auto-generated via DRF-Spectacular
- WebSocket for real-time voice streaming

### 8.2 Core Endpoints

#### Authentication (`/api/v1/auth/`)

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/register/` | Register with phone + OTP |
| POST | `/login/` | Login with phone + OTP |
| POST | `/token/refresh/` | Refresh JWT token |
| POST | `/verify-nid/` | Verify NID for identity confirmation |
| POST | `/logout/` | Invalidate current session |
| DELETE | `/account/` | Delete user account and all data |

#### Voice & Conversation (`/api/v1/voice/`)

| Method | Endpoint | Description |
| --- | --- | --- |
| WS | `/ws/voice/` | WebSocket for real-time voice stream |
| POST | `/transcribe/` | Transcribe audio file to text |
| POST | `/synthesize/` | Generate speech from text (TTS) |
| GET | `/conversations/` | List user conversations |
| GET | `/conversations/{id}/` | Get conversation with messages |

#### RAG Policy Engine (`/api/v1/policy/`)

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/query/` | Ask a policy question |
| GET | `/documents/` | List indexed document sources |
| GET | `/documents/{id}/` | Get document details |
| POST | `/documents/ingest/` | Ingest new document (Admin) |

#### Form Assistant (`/api/v1/forms/`)

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/templates/` | List available form templates |
| GET | `/templates/{id}/` | Get form template with fields |
| POST | `/submissions/` | Create new form submission |
| PATCH | `/submissions/{id}/` | Update form submission (save progress) |
| POST | `/submissions/{id}/validate/` | Validate all fields |
| GET | `/submissions/{id}/pdf/` | Download completed form as PDF |

#### Issue Reporting (`/api/v1/issues/`)

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/reports/` | Submit new issue report with photo |
| GET | `/reports/` | List issue reports (filtered) |
| GET | `/reports/{id}/` | Get report details and status |
| POST | `/reports/{id}/upvote/` | Upvote an existing report |
| GET | `/reports/heatmap/` | Get aggregated heatmap data |

#### Predictive Dashboard (`/api/v1/predictions/`)

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/risks/` | List household risk assessments |
| GET | `/risks/{id}/` | Get risk details with factors |
| PATCH | `/risks/{id}/` | Update case status/notes |
| GET | `/risks/map/` | Get geospatial risk data |
| GET | `/risks/trends/` | Get risk trend analytics |
| GET | `/programs/` | List available aid programs |
| POST | `/risks/{id}/match/` | Match household with programs |

#### Legislation (`/api/v1/legislation/`)

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/bills/` | List legislation |
| GET | `/bills/{id}/` | Get legislation details |
| GET | `/bills/{id}/summary/` | Get plain-language summary |
| POST | `/bills/{id}/ask/` | Ask question about specific bill |

---

## 9. UI/UX Requirements

### 9.1 Design Principles

| Principle | Description |
| --- | --- |
| **Voice-First** | Voice is the primary interaction mode; visual UI supports, not replaces |
| **Progressive Disclosure** | Show only what's needed at each step; reduce cognitive load |
| **Cultural Sensitivity** | Bangla typography, local metaphors, familiar patterns |
| **Accessibility-Native** | Designed for low-literacy, low-vision, and elderly users |
| **Offline-Aware** | Clear indicators when features are unavailable offline |
| **Trust & Transparency** | Always show data sources, confidence levels, and privacy indicators |

### 9.2 Mobile App Screens (React Native / Expo)

| Screen | Key Elements |
| --- | --- |
| **Onboarding** | Language selection, voice permission, phone registration |
| **Home / Voice Hub** | Large voice button, recent queries, quick action cards |
| **Conversation View** | Chat-style with voice waveform, message bubbles, citations drawer |
| **Form Assistant** | Step-by-step cards, voice input indicator, progress bar, validation |
| **Issue Report** | Camera capture, category selection, map preview, description |
| **Issue Tracker** | List of submitted reports with status badges |
| **Legislation Browser** | Searchable list, summary cards, reading level toggle |
| **Profile** | Language preference, NID status, data management, logout |
| **Settings** | Voice speed, theme, notifications, offline data management |

### 9.3 Web Dashboard Screens (React)

| Screen | Key Elements |
| --- | --- |
| **Login** | Admin/Social Worker authentication |
| **Dashboard Home** | Key metrics, risk map, recent alerts, pending tickets |
| **Risk Map** | Interactive map with color-coded risk zones, filters |
| **Household Risk List** | Sortable table with risk scores, status, assigned worker |
| **Case Detail** | Risk factors, matched programs, notes timeline, actions |
| **Issue Management** | Ticket list, category filters, department routing, status management |
| **Document Management** | Upload, ingest status, corpus statistics |
| **Analytics** | Usage metrics, query analytics, resolution rates, trends |
| **User Management** | RBAC management, audit logs |

### 9.4 Design System Requirements

| Element | Specification |
| --- | --- |
| **Primary Font** | Noto Sans Bengali (Bangla), Inter (English) |
| **Color Palette** | Government blue (#1A5276), Trust green (#27AE60), Alert red (#E74C3C) |
| **Icons** | Filled style for mobile, outlined for dashboard |
| **Min Font Size** | 16sp mobile, 14px web |
| **Touch Targets** | ≥ 48×48dp |
| **Voice Button** | ≥ 64×64dp, always visible, animated states |
| **Animations** | Subtle transitions ≤ 300ms, voice waveform visualization |
| **Dark Mode** | Supported on both mobile and web |

---

## 10. Security & Compliance

### 10.1 Threat Model

| Threat | Mitigation |
| --- | --- |
| Unauthorized data access | JWT auth, RBAC, API rate limiting, audit logging |
| Voice spoofing | Voice is for input only; identity verified via OTP/NID |
| PII leakage in AI models | No PII in training data; prompt sanitization; output filtering |
| Man-in-the-middle attack | TLS 1.3 for all connections |
| SQL injection | Django ORM (parameterized queries), input validation |
| XSS / CSRF | Django CSRF middleware, Content Security Policy, input sanitization |
| Denial of service | Rate limiting, CDN, auto-scaling |
| Data sovereignty violation | All data stored in Bangladesh sovereign cloud, no cross-border transfer |
| Model prompt injection | Input sanitization, output guardrails, prompt hardening |

### 10.2 Compliance Requirements

| Regulation / Standard | Compliance Approach |
| --- | --- |
| Bangladesh ICT Act 2006 (amended 2013) | Data handling, content guidelines, lawful processing |
| Bangladesh Right to Information Act 2009 | Public data accessibility, transparency |
| Bangladesh Digital Security Act 2018 | Secure handling of government data |
| OWASP Top 10 (2021) | Security testing against all 10 categories |
| ISO 27001 (reference) | Information security management best practices |

---

## 11. Repository Structure

### 11.1 Monorepo Structure

```
vorosha/
│
├── README.md                              # Project overview, setup, team
├── LICENSE                                # License file
├── .gitignore                             # Global gitignore
├── .env.example                           # Environment variables template
├── docker-compose.yml                     # Full-stack local development
├── docker-compose.prod.yml                # Production compose configuration
├── Makefile                               # Common dev commands
│
├── docs/                                  # Documentation
│   ├── SRS.md                             # This document
│   ├── architecture.md                    # System architecture deep-dive
│   ├── api-specification.yaml             # OpenAPI 3.1 spec
│   ├── data-model.md                      # Database schema documentation
│   ├── deployment-guide.md                # Deployment & infrastructure guide
│   ├── user-research/                     # User personas, journey maps
│   │   ├── personas.md
│   │   └── journey-maps.md
│   └── compliance/                        # Compliance & privacy docs
│       ├── data-governance.md
│       └── privacy-policy.md
│
├── mobile/                                # React Native (Expo) Mobile App
│   ├── app.json                           # Expo configuration
│   ├── package.json
│   ├── tsconfig.json
│   ├── babel.config.js
│   ├── app/                               # Expo Router (file-based routing)
│   │   ├── _layout.tsx                    # Root layout
│   │   ├── index.tsx                      # Home / Voice Hub
│   │   ├── (auth)/                        # Auth group
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── onboarding.tsx
│   │   ├── (tabs)/                        # Main tab navigation
│   │   │   ├── _layout.tsx
│   │   │   ├── voice.tsx                  # Voice conversation
│   │   │   ├── forms.tsx                  # Form assistant
│   │   │   ├── report.tsx                 # Issue reporting
│   │   │   ├── legislation.tsx            # Legislation browser
│   │   │   └── profile.tsx                # User profile
│   │   ├── conversation/
│   │   │   └── [id].tsx                   # Conversation detail
│   │   ├── form/
│   │   │   ├── [templateId].tsx           # Form filling flow
│   │   │   └── review.tsx                 # Form review & submit
│   │   ├── issue/
│   │   │   └── [id].tsx                   # Issue detail & tracking
│   │   └── bill/
│   │       └── [id].tsx                   # Legislation detail
│   ├── components/                        # Shared components
│   │   ├── ui/                            # Design system primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Typography.tsx
│   │   ├── voice/                         # Voice-specific components
│   │   │   ├── VoiceButton.tsx            # Main voice activation button
│   │   │   ├── Waveform.tsx               # Audio waveform visualization
│   │   │   ├── TranscriptionBubble.tsx
│   │   │   └── VoiceStateIndicator.tsx
│   │   ├── forms/                         # Form assistant components
│   │   │   ├── FormField.tsx
│   │   │   ├── ValidationFeedback.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── map/                           # Map components
│   │   │   ├── MapView.tsx
│   │   │   └── LocationPicker.tsx
│   │   └── common/                        # Shared utilities
│   │       ├── Citation.tsx
│   │       ├── LanguageToggle.tsx
│   │       └── OfflineIndicator.tsx
│   ├── hooks/                             # Custom React hooks
│   │   ├── useVoice.ts                    # Voice recording & streaming
│   │   ├── useAuth.ts                     # Authentication state
│   │   ├── useApi.ts                      # API client wrapper
│   │   ├── useLocation.ts                 # Geolocation
│   │   └── useOffline.ts                  # Offline detection & queue
│   ├── services/                          # API service layer
│   │   ├── api.ts                         # Base API client (Axios)
│   │   ├── auth.ts                        # Auth endpoints
│   │   ├── voice.ts                       # Voice/conversation endpoints
│   │   ├── policy.ts                      # RAG policy endpoints
│   │   ├── forms.ts                       # Form endpoints
│   │   ├── issues.ts                      # Issue reporting endpoints
│   │   └── legislation.ts                 # Legislation endpoints
│   ├── store/                             # State management (Zustand)
│   │   ├── authStore.ts
│   │   ├── voiceStore.ts
│   │   ├── formStore.ts
│   │   └── settingsStore.ts
│   ├── i18n/                              # Internationalization
│   │   ├── index.ts
│   │   ├── bn.json                        # Bangla translations
│   │   └── en.json                        # English translations
│   ├── constants/                         # App constants
│   │   ├── theme.ts                       # Design tokens
│   │   ├── colors.ts
│   │   └── config.ts
│   ├── utils/                             # Utility functions
│   │   ├── audio.ts                       # Audio processing utilities
│   │   ├── validation.ts                  # Form validation helpers
│   │   ├── formatting.ts                  # Bangla/English formatting
│   │   └── geo.ts                         # Geolocation utilities
│   └── assets/                            # Static assets
│       ├── images/
│       ├── fonts/
│       └── animations/                    # Lottie animations
│
├── web/                                   # React Web Dashboard
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   ├── src/
│   │   ├── main.tsx                       # Entry point
│   │   ├── App.tsx                        # Root component
│   │   ├── pages/                         # Route pages
│   │   │   ├── Dashboard.tsx              # Main dashboard
│   │   │   ├── RiskMap.tsx                # Predictive risk map
│   │   │   ├── HouseholdList.tsx          # Risk assessment list
│   │   │   ├── CaseDetail.tsx             # Individual case view
│   │   │   ├── IssueManagement.tsx        # Issue ticket management
│   │   │   ├── DocumentManager.tsx        # Document upload & management
│   │   │   ├── Analytics.tsx              # Usage analytics
│   │   │   ├── UserManagement.tsx         # Admin user management
│   │   │   └── Login.tsx                  # Admin login
│   │   ├── components/                    # Dashboard components
│   │   │   ├── charts/                    # Chart components (Recharts)
│   │   │   ├── map/                       # Map components (Leaflet)
│   │   │   ├── tables/                    # Data table components
│   │   │   └── layout/                    # Layout components
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── styles/                        # CSS / design system
│   │   │   ├── index.css
│   │   │   ├── variables.css
│   │   │   └── dashboard.css
│   │   └── utils/
│   └── public/
│
├── backend/                               # Nafi will decide his repository structure
├── ai/                                    # AI/ML Services & Models
│   ├── requirements.txt                   # AI-specific Python dependencies
│   ├── Dockerfile                         # AI service Docker image
│   ├── rag/                               # RAG pipeline
│   │   ├── __init__.py
│   │   ├── embeddings.py                  # Embedding model wrapper
│   │   ├── retriever.py                   # Vector search + reranking
│   │   ├── generator.py                   # LLM answer generation
│   │   ├── pipeline.py                    # End-to-end RAG orchestration
│   │   ├── prompts.py                     # Prompt templates (Bangla + English)
│   │   └── evaluation.py                  # RAG evaluation metrics
│   ├── voice/                             # Voice processing
│   │   ├── asr.py                         # Automatic Speech Recognition
│   │   ├── tts.py                         # Text-to-Speech
│   │   ├── language_detect.py             # Language detection
│   │   └── audio_utils.py                 # Audio preprocessing
│   ├── vision/                            # Computer vision
│   │   ├── classifier.py                  # Infrastructure issue classifier
│   │   ├── severity.py                    # Severity estimation
│   │   ├── geo_extractor.py               # EXIF GPS extraction
│   │   └── preprocessing.py              # Image preprocessing
│   ├── prediction/                        # Predictive analytics
│   │   ├── risk_model.py                  # Risk scoring model
│   │   ├── features.py                    # Feature engineering
│   │   ├── matcher.py                     # Aid program matching
│   │   └── explainer.py                   # Model explainability (SHAP)
│   ├── summarization/                     # Legislation summarizer
│   │   ├── summarizer.py                  # Summarization pipeline
│   │   ├── simplifier.py                  # Jargon-to-plain-language
│   │   └── prompts.py                     # Summarization prompts
│   ├── agents/                            # AI Agent framework
│   │   ├── base_agent.py                  # Base agent class
│   │   ├── form_agent.py                  # Form completion agent
│   │   ├── query_agent.py                 # Query routing agent
│   │   └── tools.py                       # Agent tools (search, validate, etc.)
│   ├── models/                            # Model weights & configs
│   │   ├── .gitkeep
│   │   └── download_models.py             # Script to download model weights
│   ├── data/                              # Training & evaluation data
│   │   ├── raw/                           # Raw government documents
│   │   ├── processed/                     # Cleaned & chunked documents
│   │   ├── evaluation/                    # Golden Q&A test sets
│   │   └── annotations/                   # Vision model training labels
│   └── notebooks/                         # Jupyter notebooks for experiments
│       ├── 01_rag_evaluation.ipynb
│       ├── 02_bangla_asr_testing.ipynb
│       ├── 03_vision_model_training.ipynb
│       └── 04_risk_model_analysis.ipynb
│
├── ingestion/                             # Document ingestion pipeline
│   ├── __init__.py
│   ├── pdf_parser.py                      # PDF text extraction
│   ├── ocr_processor.py                   # Bangla OCR for scanned docs
│   ├── html_scraper.py                    # Web page scraping
│   ├── chunker.py                         # Document chunking strategies
│   ├── metadata_extractor.py              # Title, date, category extraction
│   ├── indexer.py                         # Vector DB indexing
│   └── pipeline.py                        # End-to-end ingestion orchestration
│
├── infrastructure/                        # Infrastructure as Code
│   ├── docker/                            # Docker configurations
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.ai
│   │   ├── Dockerfile.web
│   │   └── Dockerfile.mobile              # (for CI/CD builds)
│   ├── nginx/                             # Reverse proxy config
│   │   └── nginx.conf
│   ├── scripts/                           # Deployment & utility scripts
│   │   ├── setup-dev.sh                   # Local dev environment setup
│   │   ├── seed-data.sh                   # Seed database with fixtures
│   │   ├── run-migrations.sh              # Database migration runner
│   │   └── deploy.sh                      # Production deployment script
│   └── k8s/                               # Kubernetes manifests (future)
│       ├── deployment.yaml
│       ├── service.yaml
│       └── ingress.yaml
│
├── tests/                                 # Integration & E2E tests
│   ├── integration/
│   │   ├── test_voice_pipeline.py
│   │   ├── test_rag_pipeline.py
│   │   └── test_form_agent.py
│   ├── e2e/
│   │   └── test_citizen_journey.py
│   └── load/
│       └── locustfile.py                  # Load testing configuration
│
└── .github/                               # GitHub configuration
    ├── workflows/
    │   ├── ci-backend.yml                 # Backend CI pipeline
    │   ├── ci-mobile.yml                  # Mobile CI pipeline
    │   ├── ci-web.yml                     # Web dashboard CI pipeline
    │   ├── ci-ai.yml                      # AI service CI pipeline
    │   └── deploy.yml                     # Production deployment
    ├── PULL_REQUEST_TEMPLATE.md
    └── ISSUE_TEMPLATE/
        ├── bug_report.md
        └── feature_request.
```

### 11.2 Technology Dependencies

#### Mobile App (`mobile/package.json`)

| Package | Purpose |
| --- | --- |
| `expo` (SDK 52+) | React Native framework |
| `expo-router` | File-based routing |
| `expo-av` | Audio recording & playback |
| `expo-camera` | Camera access for issue reporting |
| `expo-location` | GPS access |
| `expo-image-picker` | Photo selection from gallery |
| `react-native-maps` | Map display |
| `zustand` | Lightweight state management |
| `axios` | HTTP client |
| `i18next` + `react-i18next` | Internationalization |
| `react-native-reanimated` | Animations |
| `@gorhom/bottom-sheet` | Bottom sheet UI pattern |

#### Web Dashboard (`web/package.json`)

| Package | Purpose |
| --- | --- |
| `react` (18+) | UI framework |
| `vite` | Build tool |
| `react-router-dom` | Client-side routing |
| `recharts` | Data visualization / charts |
| `leaflet` + `react-leaflet` | Interactive maps |
| `@tanstack/react-table` | Data tables |
| `@tanstack/react-query` | Server state management |
| `zustand` | Client state management |
| `axios` | HTTP client |

#### Backend (`backend/requirements.txt`)

| Package | Purpose |
| --- | --- |
| `django` (5.x) | Web framework |
| `djangorestframework` | REST API |
| `djangorestframework-simplejwt` | JWT authentication |
| `django-channels` | WebSocket support |
| `drf-spectacular` | OpenAPI schema generation |
| `celery` | Async task queue |
| `redis` | Cache & message broker |
| `psycopg2-binary` | PostgreSQL adapter |
| `django-cors-headers` | CORS handling |
| `django-filter` | API filtering |
| `gunicorn` | WSGI server |
| `uvicorn` | ASGI server |
| `boto3` | S3-compatible object storage |
| `WeasyPrint` / `reportlab` | PDF generation |

#### AI Services (`ai/requirements.txt`)

| Package | Purpose |
| --- | --- |
| `langchain` / `llama-index` | RAG orchestration framework |
| `chromadb` / `qdrant-client` | Vector database client |
| `openai` / `transformers` | LLM integration |
| `sentence-transformers` | Embedding models |
| `whisper` / `faster-whisper` | Speech recognition |
| `TTS` (Coqui) | Text-to-speech synthesis |
| `torch` | Deep learning framework |
| `ultralytics` | YOLOv8 for image classification |
| `scikit-learn` | Traditional ML models |
| `xgboost` | Gradient boosting for prediction |
| `shap` | Model explainability |
| `Pillow` | Image processing |
| `pytesseract` | OCR for scanned documents |
| `PyPDF2` / `pdfplumber` | PDF text extraction |

---

## 12. Development Phases & Milestones

### 12.1 Phase Overview

!image.png

### 12.2 Phase Details

#### Phase 1: Foundatio

| Deliverable | Owner | Duration |
| --- | --- | --- |
| Repository setup, Docker, CI/CD | Backend Developer | 3 days |
| System architecture document | Frontend/System Designer | 4 days |
| Database schema design | Backend Developer | 3 days |
| Django project + core apps | Backend Developer | 7 days |
| Auth service (OTP + JWT) | Backend Developer | 5 days |
| Expo mobile app shell | Frontend Developer | 7 days |
| Design system + component lib | Frontend Developer | 7 days |
| Document corpus acquisition | Researcher | 14 days |
| Document ingestion pipeline | AI Engineer | 10 days |
| Basic RAG pipeline | AI Engineer | 14 days |
| User research & personas | Researcher | 7 days |

#### Phase 2: Core AI

| Deliverable | Owner | Duration |
| --- | --- | --- |
| Bangla ASR model integration | AI Engineer | 14 days |
| Voice UI components | Frontend Developer | 10 days |
| Voice WebSocket backend | Backend Developer | 7 days |
| RAG evaluation & optimization | AI Engineer | 10 days |
| Conversation API endpoints | Backend Developer | 7 days |
| TTS integration | AI Engineer | 7 days |
| Mobile voice conversation flow | Frontend Developer | 10 days |
| Golden Q&A test dataset | Researcher | 14 days |

#### Phase 3: Extended Features

| Deliverable | Owner | Duration |
| --- | --- | --- |
| Form assistant agent | AI Engineer | 10 days |
| Form assistant UI | Frontend Developer | 10 days |
| Form API endpoints | Backend Developer | 7 days |
| Vision classifier training | AI Engineer | 10 days |
| Issue reporting mobile UI | Frontend Developer | 7 days |
| Issue reporting API | Backend Developer | 5 days |
| Predictive risk model | AI Engineer | 10 days |
| Web dashboard (React) | Frontend Developer | 14 days |
| Prediction API endpoints | Backend Developer | 7 days |
| Legislation summarizer | AI Engineer | 7 days |
| Government form research | Researcher | 14 days |

#### Phase 4: Polish & Launch

| Deliverable | Owner | Duration |
| --- | --- | --- |
| Integration testing | All Team | 7 days |
| Performance optimization | Backend + AI | 7 days |
| Security audit & hardening | Backend Developer | 5 days |
| Accessibility audit | Frontend Developer | 3 days |
| Documentation | All Team | 5 days |
| Demo preparation | All Team | 3 days |
| Final user testing | Researcher | 5 days |

---

## 13. Competitive Landscape

### 13.1 Competitor Analysis

| Company | Focus | Strengths | Vorosha Differentiation |
| --- | --- | --- | --- |
| **CivicActions** | Government digital service modernization | Open-source, human-centered design | Bangla voice-first, RAG over local laws |
| **Zencity** | Community feedback analysis for govt | Scale analysis of public sentiment | Direct citizen service access, not just analysis |
| **Polimorphic** | Constituent relationship management | CRM + digital workflows | AI-driven, voice-first, multilingual |
| **OpenGov** | Government budgeting & procurement | Cloud platform, transparency | Citizen-facing (not admin-only), voice |
| **Remix** | Public transit & street planning | Collaborative planning tool | Broader service scope, AI-powered |

### 13.2 Vorosha's Unique Value Proposition

| Differentiator | Description |
| --- | --- |
| **Bangla Voice-First** | First platform with deep Bangla conversational AI for gov services |
| **RAG over Local Policy** | Legally-grounded answers from actual Bangladesh bylaws |
| **Multi-Agent Architecture** | Specialized AI agents for forms, policy, vision, predictions |
| **Rural Inclusion** | Designed for low-literacy, low-connectivity rural Bangladesh |
| **Sovereign Cloud** | Data sovereignty compliant, all data stays in Bangladesh |
| **Vision + Voice Multi-modal** | Citizens can speak AND show photos to interact with government |

---

## 14. Risk Analysis

### 14.1 Risk Register

| # | Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| 1 | Bangla ASR accuracy below 85% | Medium | High | Fine-tune on Bangladesh-specific datasets; fallback to text |
| 2 | Government document access denied | Medium | High | Partner with a2i program; use publicly available documents |
| 3 | Insufficient team bandwidth (4 members) | High | High | Strict MVP scope; phased delivery; automate where possible |
| 4 | LLM hallucination in policy answers | Medium | Critical | Strict RAG grounding; "I don't know" responses; human review |
| 5 | Sovereign cloud performance limitations | Low | Medium | Model quantization; caching; async processing |
| 6 | Data privacy breach | Low | Critical | Encryption, access control, audit logging, pen testing |
| 7 | Poor user adoption in rural areas | Medium | High | User research, iterative testing with target users |
| 8 | Bangla OCR quality for scanned documents | Medium | Medium | Pre-process images; manual verification for critical docs |
| 9 | WebSocket reliability on poor networks | Medium | Medium | Fallback to REST with audio upload; offline queuing |
| 10 | Model serving infrastructure costs | Medium | Medium | Quantized models; shared GPU instances; API fallback |

---

## 15. Glossary

| Term | Definition |
| --- | --- |
| **a2i** | Access to Information — Bangladesh government's digital transformation programme |
| **Bylaw** | Local municipal regulation governing business licensing, land use, etc. |
| **Chunk** | A semantically meaningful segment of a larger document, used in RAG retrieval |
| **Embedding** | A vector representation of text that captures semantic meaning |
| **NID** | National Identity Card — Bangladesh citizen identification document |
| **Upazila** | Sub-district administrative unit in Bangladesh |
| **Ward** | Smallest urban administrative unit in Bangladesh municipalities |
| **RAG** | Retrieval-Augmented Generation — combining document retrieval with LLM generation |
| **Sovereign Cloud** | Cloud infrastructure hosted within national borders with no cross-border data transfer |
| **WER** | Word Error Rate — metric for ASR accuracy |

---

## 16. Appendices

### Appendix A: Government Service Categories (Initial Scope)

| Category | Example Services |
| --- | --- |
| **Business Licensing** | Trade license, factory license, import/export permit |
| **Land & Property** | Land registration, mutation, khatian (record of rights) |
| **Education** | School enrollment, scholarship, certificate verification |
| **Health** | Health card, vaccination record, hospital services |
| **Social Services** | Old age allowance, widow allowance, disability allowance |
| **Utilities** | Electricity connection, water supply, gas connection |
| **Civil Registration** | Birth certificate, death certificate, marriage registration |
| **Tax & Revenue** | Income tax filing, property tax, VAT registration |

### Appendix B: Supported Bangla Dialects (Future Roadmap)

| Dialect | Region | Priority |
| --- | --- | --- |
| Standard Bangla | Dhaka, national media | Phase 1 |
| Chittagong dialect | Chittagong division | Phase 3 |
| Sylhet dialect | Sylhet division | Phase 3 |
| Rajshahi dialect | Rajshahi division | Phase 4 |
| Barishal dialect | Barishal division | Phase 4 |

### Appendix C: Evaluation Metrics

| Module | Metric | Target | Method |
| --- | --- | --- | --- |
| Bangla ASR | Word Error Rate (WER) | ≤ 15% | CommonVoice + custom set |
| RAG Engine | Answer Relevance (RAGAS) | ≥ 0.85 | Golden Q&A dataset |
| RAG Engine | Faithfulness (RAGAS) | ≥ 0.90 | Golden Q&A dataset |
| RAG Engine | Context Precision | ≥ 0.80 | Golden Q&A dataset |
| Form Agent | Field Completion Rate | ≥ 90% | User testing |
| Vision Classifier | Classification Accuracy | ≥ 85% | Labeled test set |
| Risk Model | AUC-ROC | ≥ 0.80 | Historical data split |
| Legislation Summary | ROUGE-L Score | ≥ 0.40 | Expert summaries |
| System Overall | User Satisfaction (SUS) | ≥ 70 | User surveys |

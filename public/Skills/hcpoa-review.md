---
name: hcpoa-review
description: >
  Review and analyze Health Care Power of Attorney (Pennsylvania) and Health
  Care Surrogate Designation (Florida) documents. Use when user uploads a
  health care directive for review, asks to analyze a health care POA or
  surrogate designation, wants to check HIPAA compliance, or asks about
  treatment decision authority, living will provisions, or DNR status.
  Identifies required elements, HIPAA authorization, scope of authority,
  end-of-life provisions, and jurisdiction-specific compliance.
---

# Health Care POA / Surrogate Review Skill

Review uploaded Pennsylvania Health Care Power of Attorney or Florida Health Care Surrogate Designation documents for legal soundness, HIPAA compliance, and comprehensive coverage.

## Terminology

| Pennsylvania | Florida |
|--------------|---------|
| Health Care Power of Attorney | Health Care Surrogate Designation |
| Health Care Agent | Health Care Surrogate |
| Living Will / Advance Directive | Living Will |
| 20 Pa.C.S. Chapter 54 | F.S. Chapter 765 |

## Workflow

### 1. Identify Jurisdiction
Determine if the document is Pennsylvania or Florida by examining:
- Statutory references (20 Pa.C.S. § 5421 et seq vs. F.S. § 765)
- Terminology (Agent vs. Surrogate)
- Execution formalities

### 2. Load Jurisdiction-Specific Checklist
- **Pennsylvania**: Read `references/pa-hcpoa-checklist.md`
- **Florida**: Read `references/fl-hcs-checklist.md`

### 3. Analyze Document Structure

#### For Pennsylvania Health Care POAs, verify:
- Proper execution (principal signature, two witnesses, notarization recommended)
- Agent authority when principal unable to make/communicate decisions
- HIPAA authorization language
- Living will provisions (if combined document)
- End-of-life treatment preferences

#### For Florida Health Care Surrogate Designations, verify:
- Proper execution (principal signature, two witnesses)
- Surrogate authority scope
- HIPAA authorization language
- Living will provisions (if combined or separate)
- End-of-life treatment preferences

### 4. Generate Review Report

**JURISDICTION**: [Pennsylvania / Florida]

**DOCUMENT TYPE**: [Health Care POA / Surrogate Designation / Combined with Living Will]

**EXECUTION FORMALITIES**
- Required elements present/absent
- Deficiencies that could invalidate the document

**HIPAA COMPLIANCE** ⚠️ CRITICAL
- [ ] Express HIPAA authorization present
- [ ] Authority to access protected health information (PHI)
- [ ] Authority to discuss treatment with providers
- [ ] Authority to obtain medical records
- Assessment: [Compliant / Non-Compliant / Needs Enhancement]

**TREATMENT DECISION AUTHORITY**
- [ ] Authority to make treatment decisions
- [ ] Activation trigger defined (unable to make/communicate decisions)
- [ ] Scope of medical decisions covered
- [ ] Experimental treatment authority
- [ ] Mental health treatment authority
- [ ] Admission to facilities authority

**LIVING WILL / END-OF-LIFE PROVISIONS**
- [ ] Living will included or referenced
- [ ] Terminal condition defined
- [ ] Permanently unconscious state addressed
- [ ] End-stage condition addressed (FL)
- [ ] Life-prolonging procedures preferences
- [ ] Artificial nutrition/hydration preferences
- [ ] Comfort care / palliative care provisions

**DNR / POLST CONSIDERATIONS**
- [ ] DNR preferences stated
- [ ] POLST/POST reference or authority
- [ ] Emergency treatment preferences
- [ ] Resuscitation preferences clear

**ADDITIONAL PROVISIONS**
- [ ] Organ/tissue donation preferences
- [ ] Autopsy preferences
- [ ] Disposition of remains
- [ ] Pregnancy exception addressed (if applicable)
- [ ] Religious/moral considerations

**MISSING OR RECOMMENDED ADDITIONS**
- Required elements not found
- HIPAA deficiencies
- Scope limitations
- Modern provisions absent

**OVERALL ASSESSMENT**
- Legally sound / Deficient / Needs review
- HIPAA compliant: Yes / No
- Key concerns or recommendations

## Key Statutory References

### Pennsylvania (20 Pa.C.S. Chapter 54)
- § 5422: Definitions
- § 5423: Health care agents (general authority)
- § 5424: Health care representatives (default surrogates)
- § 5442-5447: Living will provisions

### Florida (F.S. Chapter 765)
- § 765.101: Definitions
- § 765.202: Health care surrogate designation
- § 765.205: Surrogate authority and responsibilities
- § 765.301-309: Living will provisions
- § 765.401: Default surrogates (proxy)

## Critical Assessment Standards

### HIPAA Compliance (Both States)
Without express HIPAA authorization, healthcare providers may refuse to share information with the agent/surrogate. The document MUST include:
- Specific reference to HIPAA or "protected health information"
- Authority to receive, review, and obtain copies of medical records
- Authority to discuss treatment options with providers

**If HIPAA authorization is absent or unclear, flag as DEFICIENT.**

### Treatment Decision Authority
The agent/surrogate must have clear authority to:
- Consent to or refuse treatment
- Make decisions when principal cannot make or communicate decisions
- Access medical information needed to make informed decisions

### Living Will Integration
Best practice is to combine the health care POA/surrogate with living will provisions, or ensure they work together. Check for:
- Consistency between documents if separate
- Clear end-of-life preferences
- Agent/surrogate authority to interpret and implement living will

### DNR/POLST Considerations
While the health care directive may not itself be a DNR order, it should:
- Express preferences regarding resuscitation
- Authorize agent/surrogate to execute DNR/POLST orders
- Provide guidance for emergency situations

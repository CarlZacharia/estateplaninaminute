---
name: poa-review
description: >
  Review and analyze General Durable Financial Power of Attorney documents
  for Pennsylvania and Florida. Use when user uploads a POA document for
  review or analysis, asks to analyze or review a POA, wants to check a POA
  for legal soundness or completeness, or asks what powers are included or
  missing. Identifies required statutory elements, included authorities,
  missing provisions, and provides jurisdiction-specific compliance assessment.
---

# POA Review Skill

Review uploaded Pennsylvania or Florida General Durable Financial Power of Attorney documents for legal soundness and completeness.

## Workflow

### 1. Identify Jurisdiction
Determine if the document is a Pennsylvania or Florida POA by examining:
- Statutory references (20 Pa.C.S. § 5601 et seq vs. F.S. Chapter 709)
- State-specific language (PA "Notice" page vs. FL "superpowers" initials)
- Execution formalities described

### 2. Load Jurisdiction-Specific Checklist
- **Pennsylvania**: Read `references/pa-poa-checklist.md`
- **Florida**: Read `references/fl-poa-checklist.md`

### 3. Analyze Document Structure

#### For Pennsylvania POAs, verify:
- Statutory Notice page present with required language
- Agent Acknowledgment page with proper execution
- Two witnesses + notary (notary ≠ agent)
- Principal signature or authorized alternative

#### For Florida POAs, verify:
- Durability language per § 709.2104
- Immediate effectiveness (no springing POAs post-2011)
- Two witnesses + notary acknowledgment
- § 709.2202 "superpowers" separately initialed

### 4. Generate Review Report

Structure the output as follows:

**JURISDICTION**: [Pennsylvania / Florida]

**EXECUTION FORMALITIES**
- List required elements and whether present/absent
- Flag any deficiencies that could invalidate the document

**INCLUDED AUTHORITIES** (check each found):
- Banking and financial accounts
- Real property transactions
- Business/entity powers
- Tax matters
- Gifting authority (note any limits)
- Trust powers:
  - Revocable trusts
  - **Irrevocable trusts** ⚠️ CRITICAL
  - **Qualified Income Trust (QIT)** ⚠️ CRITICAL for FL
  - Income-only trusts
  - Special needs trusts
- Beneficiary designation changes
- Digital assets / RUFADAA authority
- Healthcare contract/insurance powers
- Other specific grants

**ELDER LAW ADEQUACY**:
- Can agent create irrevocable trusts? [Yes/No]
- Can agent create QITs? [Yes/No - MANDATORY for FL]
- Can agent make gifts for Medicaid planning? [Yes/No]
- Assessment: [Adequate / Deficient for Medicaid planning]

**MISSING OR RECOMMENDED ADDITIONS**:
- Required statutory elements not found
- Elder law / Medicaid planning powers not included
- Modern provisions absent (digital assets, cryptocurrency)
- HIPAA authorization language if health insurance powers granted
- Risk management clauses not present

**SUPERPOWER STATUS** (Florida only):
- List each § 709.2202 power and whether separately initialed

**OVERALL ASSESSMENT**:
- Legally sound / Deficient / Needs review
- Key concerns or recommendations
- Suggested additions for comprehensive coverage

## Key Statutory References

### Pennsylvania (20 Pa.C.S. § 5601 et seq)
- § 5601(c): Required Notice language
- § 5601(d): Agent Acknowledgment
- Chapter 39: RUFADAA digital assets

### Florida (F.S. Chapter 709)
- § 709.2104: Durability language
- § 709.2105: Execution requirements
- § 709.2202: Superpowers requiring separate initials
- Chapter 740: RUFADAA digital assets

## Important Notes

- A missing Notice page (PA) or missing superpower initials (FL) can render specific powers ineffective
- **QIT authority is MANDATORY for Florida elder law POAs** - without it, agent cannot qualify principal for ICP Medicaid if income exceeds the cap
- **Irrevocable trust creation authority is ESSENTIAL in both states** for Medicaid planning - flag as deficient if missing
- Post-2011 Florida POAs should not be springing; flag if found
- Digital assets authority is increasingly important; note if absent
- HIPAA language may be needed if agent has authority over health insurance contracts
- Self-dealing authority requires explicit language in both states
- Homestead transactions in Florida require careful drafting for title insurance acceptance

## Assessment Standards

When evaluating a POA for elder law adequacy, apply this standard:

**Would the agent be able to act in the principal's best interests if the principal needed nursing home care?**

If the POA lacks authority to:
- Create irrevocable trusts
- Create Qualified Income Trusts (FL)
- Make gifts for Medicaid planning
- Fund trusts

Then the document should be flagged as **DEFICIENT FOR ELDER LAW PURPOSES**, even if technically valid for general financial matters.

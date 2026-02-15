---
name: fl-single-trust
description: "Comprehensive guide for drafting, reviewing, and managing Florida single person revocable living trusts. Use when: (1) Drafting a new Florida single person revocable living trust, (2) Reviewing or modifying an existing Florida trust, (3) Advising on trust funding for Florida residents, (4) Analyzing Florida trust compliance issues, (5) Working with Florida trust documents including beneficiary provisions, trustee provisions, or administrative clauses, (6) Questions about Florida trust law, homestead property in trusts, or Florida-specific trust requirements."
---

# Florida Single Person Revocable Living Trust

This skill provides comprehensive guidance for drafting, reviewing, and managing single person revocable living trusts under Florida law.

## Core Workflow

### 1. Initial Client Consultation

Gather essential information before drafting:

- **Personal information**: Full legal name, address, SSN, marital status, family details
- **Property inventory**: Real property (including homestead status), bank accounts, investments, business interests, personal property
- **Beneficiary intentions**: Primary and contingent beneficiaries, distribution preferences, age restrictions
- **Trustee selection**: Successor trustees, disability provisions, corporate trustee backup
- **Special considerations**: Minor children, special needs beneficiaries, charitable gifts, pet care

**Reference**: See [references/drafting_checklist.md](references/drafting_checklist.md) for comprehensive intake checklist.

### 2. Document Drafting

Use the template as starting point:

**Template location**: [assets/trust_template.txt](assets/trust_template.txt)

**Essential articles to customize**:
- Article I: Trust name and creation date
- Article V: Incapacity determination provisions (specify who determines and how)
- Article VI: Death distribution provisions (specific bequests, residuary beneficiaries, contingencies)
- Article VII: Continuing trust provisions if beneficiaries are minors or age-based distributions desired
- Article VIII: Trustee succession (name specific successor trustees)

**Critical Florida considerations**:
- Homestead property: If trust holds Florida homestead, include specific provisions addressing constitutional protections and devise restrictions
- Elective share: Consider surviving spouse rights if applicable (though single person trust)
- No witness requirement for revocable trusts, but witnesses recommended
- Notarization recommended but not required; essential for real property transfers

### 3. Document Review

Before finalization, verify:

- All placeholder brackets `[TEXT]` replaced with actual information
- Beneficiary names spelled correctly and consistently
- Successor trustees identified by full legal name
- Distribution provisions clearly stated (percentages, per stirpes vs. per capita)
- Incapacity determination method specified
- Florida statute references accurate
- No internal contradictions

**Validation script**: Run `scripts/validate_trust.py` to check for incomplete placeholders and missing required elements.

### 4. Execution Requirements

**Minimum requirements**:
- Settlor signature
- Date

**Recommended**:
- Notarization (essential if trust will hold real property)
- Two witness signatures
- Self-proving affidavit for coordination with pour-over will

**Florida-specific**: No statutory witness requirement for revocable living trusts, unlike wills which require two witnesses under F.S. §732.502.

### 5. Trust Funding

Critical step - unfunded trusts provide no benefit. Generate customized funding checklist:

**Script**: Run `scripts/generate_funding_checklist.py` to create asset-specific funding instructions.

**Priority funding tasks**:
1. Real property: Prepare and record deeds (consider homestead implications)
2. Bank accounts: Retitle to trust or make trust beneficiary
3. Investment accounts: Transfer ownership to trust
4. Personal property: Execute assignment

**Assets to NOT fund to trust**:
- Qualified retirement accounts (IRA, 401(k)) - use beneficiary designations instead
- Health Savings Accounts (HSAs)
- Vehicles (optional - consider convenience vs. probate avoidance)

### 6. Coordinating Documents

Prepare alongside trust:
- Pour-over will (catches assets not funded to trust)
- Durable power of attorney
- Healthcare surrogate designation
- Living will
- HIPAA authorization

## Florida-Specific Legal Requirements

**Reference**: See [references/florida_trust_law.md](references/florida_trust_law.md) for comprehensive Florida trust law guidance including:
- Governing statutes (Chapter 736, Florida Statutes)
- Homestead property special rules
- Elective share considerations
- Creditor claim procedures
- Tax treatment
- Capacity standards
- Trustee powers and duties

**Key Florida distinctions**:
- Florida Trust Code (Chapter 736) governs
- Homestead property: Constitutional protection requires special consideration (Art. X, §4, Fla. Const.)
- No Florida estate tax or income tax on trusts
- Liberal trustee powers under §736.0815
- Spendthrift protection available post-death

## Common Trust Provisions

### Distribution Patterns

**Outright distribution**:
```
"to my children, John Doe and Jane Smith, in equal shares, per stirpes"
```

**Age-based distribution**:
```
"One-third at age 25, one-half of remainder at age 30, balance at age 35"
```

**Discretionary continuing trust**:
```
"in continuing trust for health, education, maintenance, and support 
until age [X], then distribute outright"
```

**Per stirpes vs. per capita**:
- Per stirpes: Divide at first generation level, deceased beneficiary's share goes to their descendants
- Per capita: Divide equally among all living descendants at same generation level

### Incapacity Determination

**Standard provision**:
```
"Settlor deemed incapacitated upon written certification from [one/two] 
licensed physician[s] that Settlor is unable to manage financial affairs"
```

**Consider specifying**:
- Number of physicians required (one vs. two)
- Specialty requirements (e.g., physician familiar with Settlor's condition)
- Who initiates determination (successor trustee, family member)
- Restoration of capacity procedure

### Trustee Succession

**Recommended structure**:
1. Settlor as initial trustee (during lifetime and capacity)
2. Named individual as first successor (trusted family member or friend)
3. Named individual as alternate successor
4. Corporate trustee as final backstop

**Bond waiver**: Standard provision waives bond requirement to avoid expense and delay.

## Quality Control

Before finalizing any trust document:

1. **Run validation script**: `python scripts/validate_trust.py [filename]`
2. **Verify Florida compliance**: Cross-reference [references/florida_trust_law.md](references/florida_trust_law.md)
3. **Check drafting checklist**: Review [references/drafting_checklist.md](references/drafting_checklist.md)
4. **Review with client**: Confirm all provisions match client's intentions
5. **Coordinate with other professionals**: CPA for tax implications, financial advisor for funding

## Post-Execution Tasks

Immediate:
- Provide executed original to client
- Retain copy in file
- Provide copy to successor trustee (optional but recommended)

Within 30 days:
- Begin funding process using generated checklist
- Execute coordinating documents (pour-over will, powers of attorney)
- Review existing beneficiary designations

Within 90 days:
- Follow up to verify funding complete
- Confirm client has stored original in secure location

## Common Issues and Solutions

**Issue**: Client wants to transfer homestead property to trust
**Solution**: Confirm transfer permissible, include provisions addressing homestead protections, verify deed properly prepared and recorded, ensure client understands continued homestead exemption eligibility

**Issue**: Beneficiary is minor child
**Solution**: Include continuing trust provisions with age-based distribution, consider testamentary guardian nomination in coordinating pour-over will

**Issue**: Beneficiary has special needs
**Solution**: Consider special needs trust provisions (may require separate specialized skill/consultation)

**Issue**: Client has S-corporation stock
**Solution**: Verify trust includes QSST or ESBT provisions if S-corp stock will be trust asset

**Issue**: Uncertainty about trust vs. will for estate plan
**Solution**: Trust advantages in Florida: avoids probate, privacy, incapacity planning, multi-state property management. Trust disadvantages: initial cost, funding requirement, administrative complexity.

## Document Maintenance

Advise client to review and update trust:
- Every 3-5 years
- After major life events (marriage, divorce, birth, death)
- After significant asset changes
- After moves to different state
- After changes in tax law

Amendment requires written instrument signed by settlor. Revocation requires written notice to trustee.

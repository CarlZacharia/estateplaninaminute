---
name: estate-plan-advisor
description: "Comprehensive estate planning analysis and recommendations based on client intake data. Use when: (1) Analyzing client intake form data to recommend estate planning strategies, (2) Identifying gaps in existing estate plans, (3) Generating asset inventories with ownership analysis, (4) Advising on blended family/second marriage planning, (5) Identifying vulnerable assets (beneficiary designation risks), (6) Creating client consultation reports, (7) Recommending improvements to existing estate plans based on current family and financial situation."
---

# Estate Plan Advisor

Analyzes client intake data to provide comprehensive estate planning recommendations, identify gaps, and generate consultation reports.

## Core Workflow

### 1. Parse Intake Data

Extract and organize key information:

**Client Profile**:
- Names (client, spouse if applicable), AKAs
- Dates of birth, marital status
- State of domicile (current and intended if changing)
- Contact information

**Family Structure**:
- Marital status: Single, Married, Divorced, Widowed
- Children: Total count, from current marriage, from prior marriages
- Determine family type: Single, Married (first marriage), Blended Family, Second Marriage

**Current Estate Plan Status**:
- Existing documents: Will, Trust, POA, Healthcare POA, Living Will
- Document dates and types (individual vs. joint)
- Identified gaps

### 2. Determine Family Planning Type

**Single Person**:
- No spouse references
- Focus on individual planning
- Skip all spouse-related analysis

**First Marriage (Traditional)**:
- Married, no children from prior marriages for either spouse
- `clientHasChildrenFromPrior: false` AND `spouseHasChildrenFromPrior: false`
- Standard sweetheart provisions often appropriate

**Blended Family / Second Marriage**:
- Either spouse has children from prior marriage
- `clientHasChildrenFromPrior: true` OR `spouseHasChildrenFromPrior: true`
- Requires careful planning to protect both families
- **Reference**: See [references/blended_family_strategies.md](references/blended_family_strategies.md)

### 3. Analyze Assets and Generate Tables

**Run asset analysis**: Use `scripts/analyze_intake.py` to parse asset data.

**Categorize by ownership**:
- Client Only
- Spouse Only (skip if single)
- Client and Spouse Joint (skip if single)
- Client and Other
- Spouse and Other (skip if single)
- Client, Spouse and Other

**Asset categories to extract**:
- Real Estate (`realEstate`)
- Bank Accounts (`bankAccounts`)
- Retirement Accounts (`retirementAccounts`)
- Non-Qualified Investments (`nonQualifiedInvestments`)
- Life Insurance (`lifeInsurance`)
- Business Interests (`businessInterests`)
- Vehicles (`vehicles`)
- Other Assets (`otherAssets`)
- Digital Assets (`digitalAssets`)

**Generate totals** for each ownership category and grand total.

### 4. Identify Vulnerable Assets

**Reference**: See [references/asset_vulnerabilities.md](references/asset_vulnerabilities.md)

Assets that can pass outside the estate plan via beneficiary designation or title:

**High Vulnerability** (beneficiary can be changed unilaterally):
- IRAs and 401(k)s - spouse can change beneficiary after first spouse dies
- Life insurance - owner controls beneficiary
- POD/TOD accounts - owner can change at any time
- Annuities with beneficiary designations

**Vulnerability Triggers to Flag**:
- Blended family + significant retirement assets
- Second marriage + life insurance from prior marriage
- Large IRA/401(k) balances relative to other assets
- Beneficiary designations not reviewed recently
- Assets titled in one spouse's name only in second marriage

**Recommendations for vulnerable assets**:
- Review and update beneficiary designations
- Consider trust as beneficiary (with tax implications explained)
- Spousal lifetime access trust (SLAT) strategies
- Life insurance trust (ILIT) for estate tax or protection

### 5. Jurisdiction Analysis

**Reference**: See [references/jurisdiction_checklist.md](references/jurisdiction_checklist.md)

**Domicile Change Detection**:
- `lookingToChangeDomicile: true` triggers special analysis
- Compare `stateOfDomicile` vs. `newDomicileState`
- Flag documents that need updating for new state

**Pennsylvania-Specific**:
- Inheritance tax planning (0% spouse, 4.5% lineal, 12% sibling, 15% other)
- No witness requirement for Wills (but recommended)
- Consider class of beneficiaries in tax planning

**Florida-Specific**:
- Homestead restrictions on devise
- Personal representative qualification (F.S. § 733.302, 733.304)
- Two witness requirement for Wills
- No state income or estate tax

### 6. Identify Planning Gaps and Issues

**Document Gaps**:
| Status | Issue |
|--------|-------|
| No Will | Estate passes by intestacy |
| No Trust | No probate avoidance, no incapacity planning |
| No Financial POA | Court guardianship may be needed for incapacity |
| No Healthcare POA | Court guardianship may be needed for medical decisions |
| No Living Will | End-of-life wishes not documented |

**Family Situation Issues**:
- Minor beneficiaries without trust provisions
- Special needs beneficiaries without SNT
- Unequal treatment of children without documentation
- Disinherited heirs without explicit provisions
- Guardian nominations incomplete (minor children)

**Asset Issues**:
- Significant assets in one spouse's name in blended family
- Retirement accounts as largest asset (beneficiary designation risk)
- Real property in multiple states (ancillary probate risk)
- Business succession not addressed
- Digital assets without access provisions

**Staleness Issues**:
- Documents older than 5 years
- Documents pre-date marriage/divorce/children
- Documents from different state than current domicile
- Named fiduciaries deceased or estranged

### 7. Generate Recommendations

**Priority Levels**:

**Critical** (Immediate Action Required):
- No Will or Trust when client has children
- No POA documents
- Domicile change without document update
- Blended family without protective provisions
- Minor children without guardian nomination

**High** (Should Address Soon):
- Beneficiary designation review needed
- Stale documents (>5 years)
- Missing document coordination
- Vulnerable assets unprotected

**Moderate** (Recommended Improvements):
- Add trust provisions for minor beneficiaries
- Update fiduciary nominations
- Add digital asset provisions
- Tax planning optimization

**Low** (Consider at Next Review):
- Charitable planning options
- Advanced tax strategies
- Long-term care planning integration

### 8. Generate DOCX Report

**Run report generator**: Use `scripts/generate_report.js` to create Word document.

**Report Sections**:

1. **Cover Page**
   - Client name(s)
   - Report date
   - Firm information

2. **Executive Summary**
   - Family situation overview
   - Current estate plan status
   - Key recommendations (prioritized)

3. **Family Profile**
   - Client information
   - Spouse information (if applicable)
   - Children and beneficiaries
   - Family planning type determination

4. **Asset Inventory**
   - Asset tables by category
   - Ownership analysis tables
   - Total estate value summary

5. **Current Estate Plan Analysis**
   - Existing documents inventory
   - Document gap analysis
   - Coordination issues

6. **Vulnerable Assets Analysis**
   - Assets passing by beneficiary designation
   - Risk assessment
   - Specific recommendations

7. **Jurisdiction Considerations**
   - Current domicile requirements
   - Domicile change impact (if applicable)
   - State-specific planning opportunities

8. **Blended Family Analysis** (if applicable)
   - Children from prior marriages
   - Asset protection strategies
   - Recommended structures

9. **Recommendations**
   - Critical actions
   - High priority items
   - Moderate improvements
   - Future considerations

10. **Next Steps**
    - Proposed document package
    - Timeline
    - Additional information needed

## Planning Patterns Reference

**Reference**: See [references/planning_patterns.md](references/planning_patterns.md)

**Common Patterns**:
- Sweetheart Plan (all to spouse, then children equally)
- Differing Plans (each spouse has different beneficiaries)
- Blended Family Protection (QTIP, disclaimer trusts)
- Asset Protection (spendthrift, discretionary trusts)
- Tax Planning (credit shelter, portability)

## Output Requirements

**Report Format**: Microsoft Word (.docx)
**File Location**: Save to `/mnt/user-data/outputs/`
**Naming Convention**: `[ClientLastName]_Estate_Plan_Analysis_[Date].docx`

## Quality Standards

- Always determine marital status before including spouse sections
- Flag uncertainty rather than assume
- Calculate asset totals accurately
- Prioritize recommendations clearly
- Provide actionable next steps
- Reference applicable state law
- Note items requiring attorney review
- Never provide legal advice—provide analysis for attorney-client consultation

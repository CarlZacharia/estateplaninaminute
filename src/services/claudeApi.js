const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export async function analyzeDocument({
  documentBase64,
  documentType,
  clientState,
  fileName,
  clientData = null
}) {
  const skill = getSkillForDocument(documentType, clientState);
  const analysisPrompt = buildAnalysisPrompt(documentType, clientState, skill, clientData);

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'document',
                source: {
                  type: 'base64',
                  media_type: 'application/pdf',
                  data: documentBase64
                }
              },
              {
                type: 'text',
                text: analysisPrompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Claude API error: ${error.error?.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing document:', error);
    throw error;
  }
}

function buildAnalysisPrompt(documentType, clientState, skill, clientData) {
  const basePrompts = {
    will: `Review this Last Will and Testament using the will-review skill.

Provide a detailed analysis in the following JSON format:
{
  "summary": "Brief overview of the will's key provisions",
  "missing_elements": [
    {
      "element": "Name of missing element",
      "importance": "critical|high|medium|low",
      "explanation": "Why this is important"
    }
  ],
  "problematic_clauses": [
    {
      "clause": "Description of the problematic clause",
      "issue": "What the problem is",
      "severity": "critical|high|medium|low",
      "recommendation": "How to fix it"
    }
  ],
  "recommendations": [
    {
      "priority": "critical|high|medium|low",
      "recommendation": "Specific recommendation",
      "rationale": "Why this should be done"
    }
  ],
  "jurisdiction_compliance": {
    "state": "${clientState}",
    "compliant": true|false,
    "issues": ["List of compliance issues if any"]
  },
  "overall_rating": "excellent|good|needs_improvement|critical_issues"
}`,

    trust: `Review this Revocable Living Trust using the ${skill} skill.

Provide a detailed analysis in the following JSON format:
{
  "summary": "Brief overview of trust structure and provisions",
  "trust_type": "Single|Joint|etc",
  "missing_elements": [
    {
      "element": "Name of missing element",
      "importance": "critical|high|medium|low",
      "explanation": "Why this is important for a ${clientState} trust"
    }
  ],
  "problematic_clauses": [
    {
      "clause": "Description of the problematic clause",
      "issue": "What the problem is",
      "severity": "critical|high|medium|low",
      "recommendation": "How to fix it"
    }
  ],
  "funding_analysis": {
    "appears_funded": true|false,
    "recommendations": ["Funding recommendations"]
  },
  "beneficiary_provisions": {
    "primary_beneficiaries": "Description",
    "contingent_beneficiaries": "Description",
    "issues": ["Any issues with beneficiary provisions"]
  },
  "recommendations": [
    {
      "priority": "critical|high|medium|low",
      "recommendation": "Specific recommendation",
      "rationale": "Why this should be done"
    }
  ],
  "overall_rating": "excellent|good|needs_improvement|critical_issues"
}`,

    poa: `Review this Financial Power of Attorney using the poa-review skill.

Provide a detailed analysis in the following JSON format:
{
  "summary": "Brief overview of granted powers",
  "poa_type": "General|Limited|Springing",
  "effective_date": "When POA becomes effective",
  "missing_elements": [
    {
      "element": "Missing statutory authority or provision",
      "importance": "critical|high|medium|low",
      "explanation": "Why this matters"
    }
  ],
  "granted_powers": ["List of powers granted"],
  "limitations": ["Any limitations on agent authority"],
  "problematic_clauses": [
    {
      "clause": "Description",
      "issue": "The problem",
      "severity": "critical|high|medium|low",
      "recommendation": "How to fix"
    }
  ],
  "jurisdiction_compliance": {
    "state": "${clientState}",
    "compliant": true|false,
    "issues": ["Compliance issues"]
  },
  "recommendations": [
    {
      "priority": "critical|high|medium|low",
      "recommendation": "Specific recommendation",
      "rationale": "Reasoning"
    }
  ],
  "overall_rating": "excellent|good|needs_improvement|critical_issues"
}`,

    hcpoa: `Review this Healthcare Power of Attorney using the hcpoa-review skill.

Provide a detailed analysis in the following JSON format:
{
  "summary": "Overview of healthcare decision authority",
  "missing_elements": [
    {
      "element": "Missing element",
      "importance": "critical|high|medium|low",
      "explanation": "Why this matters"
    }
  ],
  "hipaa_authorization": {
    "present": true|false,
    "adequate": true|false,
    "issues": ["Any issues"]
  },
  "living_will_provisions": {
    "present": true|false,
    "end_of_life_wishes": "Description if present"
  },
  "agent_authority": {
    "scope": "Description of agent's authority",
    "limitations": ["Any limitations"]
  },
  "problematic_clauses": [
    {
      "clause": "Description",
      "issue": "Problem",
      "severity": "critical|high|medium|low",
      "recommendation": "Fix"
    }
  ],
  "jurisdiction_compliance": {
    "state": "${clientState}",
    "compliant": true|false,
    "issues": ["Issues"]
  },
  "recommendations": [
    {
      "priority": "critical|high|medium|low",
      "recommendation": "Recommendation",
      "rationale": "Reasoning"
    }
  ],
  "overall_rating": "excellent|good|needs_improvement|critical_issues"
}`,

    estate_worksheet: `Analyze this Estate Information Worksheet using the estate-plan-advisor skill.

Provide a detailed analysis in the following JSON format:
{
  "summary": "Overview of client's estate and family situation",
  "asset_inventory": {
    "total_estimated_value": "Estimated total if provided",
    "asset_categories": [
      {
        "category": "Real Estate|Investments|Business|Personal Property|etc",
        "items": ["List of items"],
        "ownership": "Individual|Joint|Beneficiary Designation"
      }
    ]
  },
  "family_situation": {
    "marital_status": "Single|Married|Divorced|Widowed",
    "children": "Number and ages if provided",
    "blended_family": true|false,
    "special_needs_dependents": true|false
  },
  "vulnerable_assets": [
    {
      "asset": "Description",
      "vulnerability": "Why it's vulnerable",
      "recommendation": "How to protect it"
    }
  ],
  "estate_planning_recommendations": [
    {
      "priority": "critical|high|medium|low",
      "recommendation": "Specific recommendation",
      "rationale": "Why this is needed",
      "estimated_cost": "If applicable"
    }
  ],
  "missing_information": ["List of important missing details"],
  "overall_assessment": "Comprehensive assessment"
}`
  };

  let prompt = basePrompts[documentType] || `Analyze this document and provide insights.`;

  // If we have estate worksheet data and analyzing other docs, include context
  if (clientData && documentType !== 'estate_worksheet') {
    prompt += `\n\nClient Estate Context:\n${JSON.stringify(clientData, null, 2)}`;
  }

  return prompt;
}

export async function generateComprehensiveReport(allAnalyses, clientData, submissionId) {
  const synthesisPrompt = `You are an estate planning attorney reviewing a complete set of estate planning documents.

Based on the following individual document analyses, create a comprehensive client report.

Individual Document Analyses:
${JSON.stringify(allAnalyses, null, 2)}

Client Information:
${JSON.stringify(clientData, null, 2)}

Provide your analysis in the following JSON format:
{
  "executive_summary": "2-3 paragraph overview of the client's current estate plan, highlighting major strengths and concerns",
  "overall_rating": "excellent|good|needs_improvement|critical_issues",
  "document_summary": [
    {
      "document_type": "will|trust|poa|hcpoa|estate_worksheet",
      "status": "present|missing|outdated",
      "rating": "excellent|good|needs_improvement|critical_issues",
      "key_finding": "One sentence summary"
    }
  ],
  "critical_gaps": [
    {
      "gap": "Description of missing document or provision",
      "impact": "What could go wrong",
      "urgency": "immediate|high|medium|low"
    }
  ],
  "inconsistencies": [
    {
      "issue": "Description of inconsistency between documents",
      "documents_affected": ["list of document types"],
      "recommendation": "How to resolve"
    }
  ],
  "prioritized_recommendations": [
    {
      "priority": "critical|high|medium|low",
      "category": "Missing Document|Update Required|Consistency Issue|Optimization",
      "recommendation": "Specific action to take",
      "rationale": "Why this is important",
      "estimated_cost": "Attorney fee estimate if applicable",
      "timeline": "When this should be addressed"
    }
  ],
  "action_plan": {
    "immediate_actions": ["Things to do right away"],
    "short_term": ["Within 30-90 days"],
    "long_term": ["Annual reviews, future planning"]
  },
  "estimated_total_cost": "Range for implementing all recommendations",
  "next_steps": "What the client should do after receiving this report"
}`;

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: synthesisPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating comprehensive report:', error);
    throw error;
  }
}

function parseClaudeResponse(claudeResponse) {
  try {
    // Extract text content from Claude's response
    const content = claudeResponse.content[0].text;
    
    // Try to parse as JSON
    // Claude sometimes wraps JSON in markdown code blocks
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                      content.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonStr);
    }
    
    // If not JSON, return structured text
    return {
      summary: content,
      raw_text: content
    };
  } catch (error) {
    console.error('Error parsing Claude response:', error);
    return {
      summary: claudeResponse.content[0].text,
      parse_error: true
    };
  }
}

export { parseClaudeResponse };
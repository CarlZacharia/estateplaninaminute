export const DOCUMENT_TYPES = {
  WILL: 'will',
  TRUST: 'trust',
  POA: 'poa',
  HCPOA: 'hcpoa',
  ESTATE_WORKSHEET: 'estate_worksheet',
  OTHER: 'other'
};

export const DOCUMENT_TYPE_LABELS = {
  [DOCUMENT_TYPES.WILL]: 'Last Will & Testament',
  [DOCUMENT_TYPES.TRUST]: 'Revocable Living Trust',
  [DOCUMENT_TYPES.POA]: 'Financial Power of Attorney',
  [DOCUMENT_TYPES.HCPOA]: 'Healthcare Power of Attorney',
  [DOCUMENT_TYPES.ESTATE_WORKSHEET]: 'Estate Information Worksheet',
  [DOCUMENT_TYPES.OTHER]: 'Other Document'
};

export const SKILL_MAPPING = {
  [DOCUMENT_TYPES.WILL]: 'will-review',
  [DOCUMENT_TYPES.TRUST]: (state) => 
    state === 'PA' ? 'pa-single-trust' : 'fl-single-trust',
  [DOCUMENT_TYPES.POA]: 'poa-review',
  [DOCUMENT_TYPES.HCPOA]: 'hcpoa-review',
  [DOCUMENT_TYPES.ESTATE_WORKSHEET]: 'estate-plan-advisor'
};

export function identifyDocumentType(fileName) {
  const lowerName = fileName.toLowerCase();
  
  if (lowerName.includes('will') && !lowerName.includes('living')) {
    return DOCUMENT_TYPES.WILL;
  }
  if (lowerName.includes('trust') || lowerName.includes('living will')) {
    return DOCUMENT_TYPES.TRUST;
  }
  if (lowerName.includes('power of attorney') || lowerName.includes('poa')) {
    if (lowerName.includes('health') || lowerName.includes('medical') || lowerName.includes('hc')) {
      return DOCUMENT_TYPES.HCPOA;
    }
    return DOCUMENT_TYPES.POA;
  }
  if (lowerName.includes('worksheet') || lowerName.includes('intake') || 
      lowerName.includes('information') || lowerName.includes('questionnaire')) {
    return DOCUMENT_TYPES.ESTATE_WORKSHEET;
  }
  
  return DOCUMENT_TYPES.OTHER;
}

export function getSkillForDocument(docType, clientState) {
  const skill = SKILL_MAPPING[docType];
  
  if (typeof skill === 'function') {
    return skill(clientState);
  }
  
  return skill;
}

export function getDocumentIcon(docType) {
  // Return appropriate MUI icon name based on type
  const iconMap = {
    [DOCUMENT_TYPES.WILL]: 'Description',
    [DOCUMENT_TYPES.TRUST]: 'AccountBalance',
    [DOCUMENT_TYPES.POA]: 'Gavel',
    [DOCUMENT_TYPES.HCPOA]: 'LocalHospital',
    [DOCUMENT_TYPES.ESTATE_WORKSHEET]: 'Assignment',
    [DOCUMENT_TYPES.OTHER]: 'InsertDriveFile'
  };
  
  return iconMap[docType] || 'InsertDriveFile';
}
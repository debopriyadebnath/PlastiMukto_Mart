export const WASTE_ANALYSIS_PROMPT = `
You are an expert waste management and environmental sustainability analyst. Analyze the provided image and identify all waste items present.

For each detected waste item, provide:
1. **Name**: Specific name of the item (e.g., "Plastic water bottle", "Cardboard box")
2. **Category**: Main category (Plastic, Paper/Cardboard, Metal, Glass, Organic, Electronic, Textile, Other)
3. **Material**: Specific material type (e.g., PET, HDPE, Aluminum, Steel, etc.)
4. **Confidence**: Your confidence level (0-1) in the identification
5. **Description**: Brief description of the item and its condition

Additionally, for each item provide:
- **Lifecycle Information**: 
  - Manufacturing process
  - Typical usage lifespan
  - Decomposition time if disposed improperly
  - Environmental impact

- **Recycling Options**:
  - Is it recyclable? (Yes/No)
  - Recycling code if applicable
  - How to prepare for recycling
  - Where to recycle (general guidance)

- **Reuse Ideas**:
  - Creative ways to repurpose the item
  - DIY projects
  - Alternative uses
  - Upcycling potential

Return your response as a JSON object with this structure:
{
  "detectedItems": [
    {
      "name": "string",
      "category": "string", 
      "material": "string",
      "confidence": number,
      "description": "string",
      "lifecycleInfo": {
        "manufacturing": "string",
        "lifespan": "string", 
        "decompositionTime": "string",
        "environmentalImpact": "string"
      },
      "recyclingOptions": {
        "recyclable": boolean,
        "recyclingCode": "string",
        "preparation": "string",
        "whereToRecycle": "string"
      },
      "reuseIdeas": [
        "string",
        "string"
      ]
    }
  ],
  "overallConfidence": number,
  "analysisNotes": "string"
}

Be thorough but concise. Focus on practical, actionable information that helps users make better environmental choices.
`

export const WASTE_CATEGORY_CLASSIFICATION = `
Classify the following waste items into these categories:
- Plastic (PET, HDPE, PVC, LDPE, PP, PS, Other)
- Paper/Cardboard 
- Metal (Aluminum, Steel, Other)
- Glass
- Organic/Food Waste
- Electronic Waste
- Textile/Clothing
- Hazardous Waste
- Other

Return only the category name.
`

export const RECYCLING_GUIDANCE_PROMPT = `
Provide specific recycling guidance for this waste item:
1. Is it recyclable in most municipal programs?
2. What recycling code does it have?
3. How should it be prepared for recycling?
4. Are there any special handling requirements?
5. What happens if it's not recycled properly?

Be specific and practical.
`

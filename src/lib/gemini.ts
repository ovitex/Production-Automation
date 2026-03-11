import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function simulateMaterialProperties(layers: any[]) {
  const prompt = `As an expert in chemical and fiber sciences, predict the mechanical and physical properties of a composite technical garment with the following stacking sequence:
${layers.map((l, i) => `Layer ${i + 1}: ${l.blend}% ${l.fiberType}, ${l.weave} weave`).join("\n")}

Return a JSON object with properties:
- tensileStrength (0-100)
- breathability (0-100)
- thermalInsulation (0-100)
- elasticity (0-100)
- durability (0-100)
- weight (0-100, where 100 is lightest)
- analysis (A brief 2-3 sentence explanation of the synergy and potential use cases for this specific composite).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tensileStrength: { type: Type.NUMBER },
            breathability: { type: Type.NUMBER },
            thermalInsulation: { type: Type.NUMBER },
            elasticity: { type: Type.NUMBER },
            durability: { type: Type.NUMBER },
            weight: { type: Type.NUMBER },
            analysis: { type: Type.STRING },
          },
          required: ["tensileStrength", "breathability", "thermalInsulation", "elasticity", "durability", "weight", "analysis"],
        },
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
  } catch (error) {
    console.error("Error simulating material:", error);
    throw error;
  }
}

export async function optimizeLogistics(currentBottlenecks: string[]) {
  const prompt = `As an expert in apparel manufacturing production planning, analyze the following current factory bottlenecks:
${currentBottlenecks.join(", ")}

Provide a JSON response with:
- recommendedActions (array of strings, 2-3 short actionable steps to resolve the bottlenecks)
- predictedEfficiencyGain (number, 0-100, representing the expected % improvement if actions are taken)
- riskLevel (string, "Low", "Medium", or "High")`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            predictedEfficiencyGain: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING },
          },
          required: ["recommendedActions", "predictedEfficiencyGain", "riskLevel"],
        },
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
  } catch (error) {
    console.error("Error optimizing logistics:", error);
    throw error;
  }
}

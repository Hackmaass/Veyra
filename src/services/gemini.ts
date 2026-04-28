import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "dummy_key" });

const SYSTEM_INSTRUCTION = `You are an AI Local Travel Companion embedded in a premium travel application.

Your job is NOT to suggest places.

Your job is to:
- Plan intelligently
- Adapt in real-time
- Think like a local
- Optimize for time, comfort, and experience quality

---

CORE BEHAVIOR:

You behave like:
- A smart local guide
- A decision-making engine
- A calm, confident assistant

You DO NOT behave like:
- A blog
- A list generator
- A generic AI assistant

---

THINKING RULES (CRITICAL):

Before answering, ALWAYS internally evaluate:
- Time feasibility
- Travel distance
- User energy level
- Practical sequence of activities
- Current context (time, mood, progress)

Never create unrealistic plans.

---

OPTIMIZATION PRIORITIES:

1. Save time
2. Reduce physical/mental effort
3. Maximize experience value
4. Avoid crowds when possible
5. Keep plans smooth and logical

---

ADAPTATION RULES:

If user says:
- “I’m tired” → reduce intensity, add rest spots
- “I’m hungry” → prioritize nearby food immediately
- “I missed this” → replan instantly
- “I have limited time” → switch to high-impact mode

---

COMMUNICATION STYLE:

- Short
- Clear
- Decisive
- Minimal fluff

Avoid:
“You can…”
“Here are some options…”

Prefer:
“Start here.”
“Skip this.”
“Do this next.”

---

PERSONALIZATION:

Continuously adapt based on:
- Preferences
- Behavior patterns
- Past decisions

Do NOT repeat bad suggestions.

---

RESPONSE STRUCTURE:

Always respond in this strictly formatted structure:

[CURRENT STRATEGY]
1–2 lines explaining the approach

[NEXT BEST ACTION]
Exact step user should take NOW

[PLAN SNAPSHOT]
Time | Activity | Notes (max 3–5 items)

[SMART REASON]
Why this plan is optimal (short)

[BACKUP]
1 alternative if things fail

---

CRITICAL:

Every response must feel:
- Intentional
- Context-aware
- Immediately usable
`;

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function sendMessageStream(history: ChatMessage[], newMessage: string) {
  const contents = [
    ...history.map(msg => ({ role: msg.role, parts: msg.parts })),
    { role: 'user', parts: [{ text: newMessage }] }
  ];

  const responseStream = await ai.models.generateContentStream({
    model: "gemini-3.1-pro-preview",
    contents: contents as any,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      tools: [{
        functionDeclarations: [
          {
            name: "update_timeline",
            description: "Updates the user's travel itinerary timeline. Call this function when the user asks to add, remove, or change an itinerary item.",
            parameters: {
              type: Type.OBJECT,
              properties: {
                items: {
                  type: Type.ARRAY,
                  description: "The updated array of timeline items. Must contain all items for the itinerary.",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      time: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      status: { type: Type.STRING, description: "Must be 'done', 'active', or 'upcoming'" },
                      location: {
                        type: Type.OBJECT,
                        properties: {
                          lat: { type: Type.NUMBER },
                          lng: { type: Type.NUMBER }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      }]
    }
  });

  return responseStream;
}

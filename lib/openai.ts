import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askOpenAI(prompt: string): Promise<string> {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Sokpah AI, a powerful African-built assistant created by Akin S. Sokpah from Liberia.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return (
      response.choices[0]?.message?.content ||
      "No response from OpenAI."
    );
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "OpenAI service is currently unavailable.";
  }
}

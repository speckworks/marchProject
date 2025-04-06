import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { title } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful task management assistant. Generate detailed, actionable task descriptions."
        },
        {
          role: "user",
          content: `Generate a detailed description for a task titled: "${title}". Include potential steps, considerations, and estimated time to complete.`
        }
      ],
    });

    return NextResponse.json({
      description: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error generating description:', error);
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    );
  }
} 
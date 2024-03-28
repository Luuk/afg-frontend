import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { listToStrings } from '@/lib/utils';
import {
  generalInstructions,
  stylingInstructions,
} from '@/lib/ai-instructions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { instructions } = await req.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          listToStrings(generalInstructions) +
          '' +
          listToStrings(stylingInstructions),
      },
      { role: 'user', content: instructions },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}

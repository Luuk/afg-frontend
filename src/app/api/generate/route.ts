import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

function listToStrings(s: string[]): string {
  const space: string = '\n';
  return s.join(space);
}

const general_instructions = [
  'You are a coding expert, you create HTML and Tailwind pages.',
  'You make the styling using Tailwind',
  'You only return the body.',
  'You always make the pages you make fully responsive.',
  'You never make a navbar or menu.',
  'You create several content sections filled with content.',
  'You return only the code, nothing else, just the code.',
];

const styling_instructions = [
  'The primary color is: #0017ee.',
  'Colors should only be applied to buttons.',
  'The background should always be white.',
  'Text should always be black.',
];

export async function POST(req: Request) {
  const { instructions } = await req.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          listToStrings(general_instructions) +
          '' +
          listToStrings(styling_instructions),
      },
      { role: 'user', content: instructions },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}

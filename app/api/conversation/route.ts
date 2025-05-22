// import { auth } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';
// import { OpenAI } from 'openai';

// const apiKey = process.env.OPENAI_API_KEY;

// const openai = new OpenAI({
//   apiKey,
// });

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     const body = await req.json();
//     const { messages } = body;

//     if (!userId) {
//       return new NextResponse('Unauthorized', { status: 401 });
//     }

//     if (!apiKey) {
//       return new NextResponse('OpenAI API key not configured', { status: 500 });
//     }

//     if (!messages) {
//       return new NextResponse('Messages are required', { status: 400 });
//     }

//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages,
//     });

//     return NextResponse.json(response?.choices[0].message);
//   } catch (error) {
//     console.log('[CONVERSATION ERROR]:', error);
//     return new NextResponse('Internal server error', { status: 500 });
//   }
// }

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'X-Title': 'GeniusApp',
  },
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct',
      messages,
    });

    return NextResponse.json(response?.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION ERROR]:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

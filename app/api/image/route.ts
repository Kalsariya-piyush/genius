import axios from 'axios';
import FormData from 'form-data';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const form = new FormData();
    form.append('prompt', prompt);

    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    const base64 = Buffer.from(response.data).toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ image: dataUrl });
  } catch (error) {
    console.error('[CLIPDROP API ERROR]:', error);
    return new NextResponse('Failed to generate image', { status: 500 });
  }
}

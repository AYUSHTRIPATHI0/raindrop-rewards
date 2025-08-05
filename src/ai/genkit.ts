import { genkit, type GenkitErrorCode } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { next } from '@genkit-ai/next';

export const ai = genkit({
  plugins: [
    next({
      // These are required to support Genkit server actions in Next.js
    }),
    googleAI({
      // This is required for Genkit to use Google's generative AI models
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export class GenkitError extends Error {
  constructor(
    public message: string,
    public code: GenkitErrorCode,
    public data: any
  ) {
    super(message);
    this.name = 'GenkitError';
  }
}

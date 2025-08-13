'use server';
/**
 * @fileOverview A Genkit flow that generates facts about water conservation.
 *
 * - generateWaterFacts - A function that generates a list of interesting facts.
 * - WaterFactsOutput - The return type for the generateWaterFacts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const WaterFactsOutputSchema = z.object({
  facts: z.array(z.string()).describe('A list of 3-5 interesting and compelling facts about water conservation or rainwater harvesting.'),
});
export type WaterFactsOutput = z.infer<typeof WaterFactsOutputSchema>;

export async function generateWaterFacts(): Promise<WaterFactsOutput> {
  return generateWaterFactsFlow();
}

const prompt = ai.definePrompt({
  name: 'generateWaterFactsPrompt',
  output: { schema: WaterFactsOutputSchema },
  prompt: `You are a passionate environmental scientist. Generate a list of 3 to 5 surprising and compelling facts about the importance of water conservation and rainwater harvesting. Frame them in a way that would motivate a homeowner to take action.`,
});

const generateWaterFactsFlow = ai.defineFlow(
  {
    name: 'generateWaterFactsFlow',
    outputSchema: WaterFactsOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);

import { createOpenAI } from '@ai-sdk/openai';
import { keys } from '../keys';

const openai = createOpenAI({
  apiKey: keys().OPENAI_API_KEY,
  compatibility: 'strict',
});

export const models: {
  chat: ReturnType<typeof openai>;
  embeddings: ReturnType<typeof openai>;
} = {
  chat: openai('gpt-4o-mini'),
  embeddings: openai('text-embedding-3-small'),
};

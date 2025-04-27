import Constants from 'expo-constants';
import { OpenAI } from 'openai';

// you can store your key in app.config.js / env and pull via Constants.expoConfig.extra
const OPENAI_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY!;

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

/**
 * Ask OpenAI for a tailored riddle.
 */
export async function generateRiddle(guild: string): Promise<string> {
  const prompt = `Generate a short fantasy riddle for a player in the "${guild}" guild. Make it mysterious, <100 words.`;
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: prompt }],
    temperature: 0.8,
  });
  return res.choices[0].message?.content?.trim() || 'No response generated';
}

/**
 * Create a lore-rich scavenger task.
 */
export async function generateScavengerTask(guild: string): Promise<string> {
  const prompt = `You’re an AR game quest-generator. 
Create a 1–2 sentence scavenger task set in our world for the "${guild}" guild.`;
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: prompt }],
    temperature: 0.8,
  });
  return res.choices[0].message?.content?.trim() || 'No response generated';
}

/**
 * Give an NPC a custom line for a given player.
 */
export async function generateNpcDialogue(
  npcName: string,
  playerName: string
): Promise<string> {
  const prompt = `Write a friendly greeting from NPC "${npcName}" to player "${playerName}", 
mentioning their guild and a hint about their next quest.`;
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: prompt }],
    temperature: 0.7,
  });
  return res.choices[0].message?.content?.trim() || 'No response generated';
}

import { db } from '@/db';
import { groqApiKeys } from '@/db/schema';
import { gte, eq } from 'drizzle-orm';

// Track current key index in memory (will reset on server restart)
let currentKeyIndex = 0;

export async function getNextGroqApiKey(): Promise<string> {
  try {
    // Get all active API keys from database
    const keys = await db
      .select()
      .from(groqApiKeys)
      .where(gte(groqApiKeys.isActive, true));

    if (keys.length === 0) {
      console.log('No active keys in database, using fallback from .env');
      // Fallback to environment variable if no keys in database
      const envKey = process.env.GROQ_API_KEY;
      if (!envKey || envKey.includes('YOUR_VALID')) {
        throw new Error('No valid Groq API keys configured');
      }
      console.log('Using API key from .env (fallback)');
      return envKey;
    }

    // Get the next key in rotation (round-robin)
    const key = keys[currentKeyIndex % keys.length];
    
    // Increment usage count for this key
    await db
      .update(groqApiKeys)
      .set({ usageCount: (key.usageCount || 0) + 1 })
      .where(eq(groqApiKeys.id, key.id));
    
    // Move to next key for next request
    currentKeyIndex = (currentKeyIndex + 1) % keys.length;
    
    console.log(`Using Groq API key ${currentKeyIndex} of ${keys.length} (Total uses: ${key.usageCount + 1})`);
    
    return key.key;
  } catch (error) {
    console.error('Error getting next Groq API key:', error);
    // Fallback to environment variable
    const envKey = process.env.GROQ_API_KEY;
    if (!envKey || envKey.includes('YOUR_VALID')) {
      throw new Error('No valid Groq API keys configured - add keys to admin panel or .env');
    }
    console.log('Using API key from .env (error fallback)');
    return envKey;
  }
}

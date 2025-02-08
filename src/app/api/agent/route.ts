import { CdpAgentkit } from '@coinbase/cdp-agentkit-core';
import { CdpToolkit } from '@coinbase/cdp-langchain';
import { ChatOpenAI } from '@langchain/openai';

export async function initializeGiftAgent() {
  const llm = new ChatOpenAI({
    model: 'gpt-4',
    apiKey: process.env.OPENAI_API_KEY,
  });

  const config = {
    networkId: 'base-sepolia',
    // Other CDP config
  };

  const agentkit = await CdpAgentkit.configureWithWallet(config);
  const cdpToolkit = new CdpToolkit(agentkit);
  const tools = cdpToolkit.getTools();

  return { agentkit, tools };
}

export async function POST(req: Request) {
  try {
    const { prompt, action } = await req.json();
    const { agentkit, tools } = await initializeGiftAgent();

    // Handle different actions
    switch (action) {
      case 'create_gift':
        return handleCreateGift(agentkit, tools, prompt);
      case 'manage_gifts':
        return handleManageGifts(agentkit, tools, prompt);
      case 'suggest_gifts':
        return handleGiftSuggestions(agentkit, tools, prompt);
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Agent error:', error);
    return new Response(JSON.stringify({ error: 'Agent error' }), {
      status: 500,
    });
  }
}

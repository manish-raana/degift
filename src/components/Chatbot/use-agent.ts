import { create } from 'zustand';
import { CdpAgentkit } from '@coinbase/cdp-agentkit-core';
import { CdpToolkit } from '@coinbase/cdp-langchain';
import { AzureOpenAI } from 'openai';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { HumanMessage } from '@langchain/core/messages';

interface AgentState {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  agentkit: any | null;
  tools: any[] | null;
  initialize: () => Promise<void>;
  executeAction: (action: string, parameters?: any) => Promise<any>;
}

export const useAgent = create<AgentState>((set, get) => ({
  isInitialized: false,
  isLoading: false,
  error: null,
  agentkit: null,
  tools: null,

  initialize: async () => {
    try {
      set({ isLoading: true, error: null });

      const llm = new AzureOpenAI({
        baseURL: process.env.NEXT_PUBLIC_OPENAI_API_URL!,
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
        deployment: 'gpt-4',
        apiVersion: '2024-05-01-preview',
      });

      const config = {
        networkId: process.env.NEXT_PUBLIC_NETWORK_ID || 'base-sepolia',
      };

      const agentkit = await CdpAgentkit.configureWithWallet(config);
      const cdpToolkit = new CdpToolkit(agentkit);
      const tools = cdpToolkit.getTools();

      set({
        isInitialized: true,
        agentkit,
        tools,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to initialize agent',
        isLoading: false,
      });
    }
  },

  executeAction: async (action: string, parameters?: any) => {
    const { agentkit, tools, isInitialized } = get();

    if (!isInitialized || !agentkit || !tools) {
      throw new Error('Agent not initialized');
    }

    try {
      set({ isLoading: true });

      const llm = new AzureOpenAI({
        baseURL: process.env.NEXT_PUBLIC_OPENAI_API_URL!,
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
        deployment: 'gpt-4',
        apiVersion: '2024-05-01-preview',
      });

      const agent = createReactAgent({
        llm,
        tools,
        messageModifier:
          'You are a DeGift platform assistant. You help users manage their crypto gifts using CDP Agentkit. ' +
          'Current action: ' +
          action,
      });

      const response = await agent.invoke(
        { messages: [new HumanMessage(JSON.stringify(parameters))] },
        { configurable: { thread_id: `DeGift-${action}` } },
      );

      set({ isLoading: false });
      return response;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Action execution failed',
        isLoading: false,
      });
      throw error;
    }
  },
}));

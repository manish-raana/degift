import { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useAgent } from './use-agent';
import { toast } from './use-toast';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  data?: any;
  suggestions?: string[];
  actions?: string[];
}

interface UseChatOptions {
  initialMessages?: ChatMessage[];
  onError?: (error: Error) => void;
}

export function useChat(options: UseChatOptions = {}) {
  const { address } = useAccount();
  const { isInitialized, initialize, performAction } = useAgent();
  const [messages, setMessages] = useState<ChatMessage[]>(
    options.initialMessages || [
      {
        role: 'assistant',
        content: "Hello! I'm your DeGift assistant. How can I help you today?",
        suggestions: [
          "What's my current balance?",
          'Show my gift cards',
          'How do I create a gift?',
        ],
      },
    ]
  );
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    try {
      if (!isInitialized) {
        await initialize();
      }

      if (!address) {
        toast({
          title: 'Wallet not connected',
          description: 'Please connect your wallet to continue.',
          variant: 'destructive',
        });
        return;
      }

      // Add user message immediately
      setMessages(prev => [...prev, { role: 'user', content }]);
      setIsLoading(true);

      // Prepare messages for API
      const messagesToSend = messages.map(({ role, content }) => ({
        role,
        content,
      }));
      messagesToSend.push({ role: 'user', content });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesToSend,
          address,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Handle any actions from the response
      if (data.result.actions?.length > 0) {
        await Promise.all(
          data.result.actions.map(async (action: string) => {
            try {
              const actionResult = await performAction(action, {
                address,
                ...data.result.data,
              });

              // Add action result to the response data
              if (!data.result.data) data.result.data = {};
              data.result.data[action] = actionResult;
            } catch (error) {
              console.error(`Failed to execute action ${action}:`, error);
              toast({
                title: 'Action Failed',
                description: `Failed to execute ${action.toLowerCase()}`,
                variant: 'destructive',
              });
            }
          })
        );
      }

      // Add assistant response
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.result.message,
          data: data.result.data,
          suggestions: data.result.suggestions,
          actions: data.result.actions,
        },
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);

      // Add error message
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          suggestions: ['Try again', 'Ask something else'],
        },
      ]);

      // Call error handler if provided
      if (options.onError && error instanceof Error) {
        options.onError(error);
      }

      // Show error toast
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages, address, isInitialized, initialize, performAction, options.onError]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I'm your DeGift assistant. How can I help you today?",
        suggestions: [
          "What's my current balance?",
          'Show my gift cards',
          'How do I create a gift?',
        ],
      },
    ]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    isInitialized,
  };
}

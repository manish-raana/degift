import { useState } from 'react';
import { useAccount } from 'wagmi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  data?: any;
  suggestions?: string[];
}

export function useChat() {
  const { address } = useAccount();
  const [messages, setMessages] = useState<Message[]>([
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
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', content }]);
    setIsLoading(true);

    try {
      // Only send messages with role and content to the API
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

      // data.result is already parsed JSON
      const result = data.result;

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: result.message,
          data: result.data,
          suggestions: result.suggestions,
        },
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          suggestions: ['Try again', 'Ask something else'],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
}

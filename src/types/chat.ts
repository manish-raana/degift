export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isInitialized: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  data?: Record<string, any>;
  suggestions?: string[];
  actions?: string[];
}

export interface ChatResponse {
  success: boolean;
  result?: {
    message: string;
    data?: Record<string, any>;
    suggestions?: string[];
    actions?: string[];
  };
  error?: string;
}

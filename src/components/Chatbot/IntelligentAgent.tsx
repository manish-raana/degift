export function IntelligentAgent() {
  const { messages, sendMessage } = useChat();
  const { agentkit } = useAgent();

  const handleAction = async (action: string) => {
    // Agent can now:
    // - Execute blockchain transactions
    // - Manage gifts automatically
    // - Provide market insights
    // - Optimize gas usage
    // - Handle token approvals
    await agentkit.executeAction(action);
  };

  return (
    <div>
      {/* Enhanced chat interface with action buttons */}
      <div className="space-y-4">
        {messages.map(msg => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onActionClick={handleAction}
          />
        ))}
      </div>

      {/* Action buttons for common tasks */}
      <div className="flex gap-2">
        <ActionButton
          icon={<Gift />}
          label="Create Gift"
          onClick={() => handleAction('create_gift')}
        />
        <ActionButton
          icon={<RefreshCw />}
          label="Check Status"
          onClick={() => handleAction('check_status')}
        />
        {/* More action buttons */}
      </div>
    </div>
  );
}

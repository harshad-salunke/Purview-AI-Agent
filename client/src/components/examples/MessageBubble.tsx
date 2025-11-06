import { MessageBubble } from '../MessageBubble'

export default function MessageBubbleExample() {
  const userMessage = {
    id: "1",
    role: "user" as const,
    content: "Give me asset related to sales",
    timestamp: new Date(),
  };

  const assistantMessage = {
    id: "2",
    role: "assistant" as const,
    content: "I found 3 assets related to sales. Here are the details:",
    timestamp: new Date(),
    agent: "Information Agent" as const,
  };

  return (
    <div className="p-4 bg-background">
      <MessageBubble message={userMessage} />
      <MessageBubble message={assistantMessage} />
    </div>
  )
}

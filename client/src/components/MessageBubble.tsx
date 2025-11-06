import type { ChatMessage } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import informationAgentAvatar from "@assets/generated_images/Information_Agent_avatar_icon_11697ada.png";
import dataCuratorAvatar from "@assets/generated_images/Data_Curator_Agent_avatar_icon_ed755411.png";
import { User } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const avatarSrc = message.agent === "Information Agent" ? informationAgentAvatar : dataCuratorAvatar;

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`} data-testid={`message-${message.role}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        {isUser ? (
          <>
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src={avatarSrc} alt={message.agent} />
            <AvatarFallback className="bg-accent text-accent-foreground">AI</AvatarFallback>
          </>
        )}
      </Avatar>
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
        {!isUser && message.agent && (
          <span className="text-xs text-muted-foreground mb-1">{message.agent}</span>
        )}
        <div className={`rounded-lg px-4 py-2 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-card border border-card-border'}`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

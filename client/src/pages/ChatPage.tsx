import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import type { Agent, ChatMessage, DataAsset } from "@shared/schema";
import { MessageBubble } from "@/components/MessageBubble";
import { AssetCard } from "@/components/AssetCard";
import { CurationCard } from "@/components/CurationCard";
import { TypingIndicator } from "@/components/TypingIndicator";
import { mockDataAssets, suggestedQuestions } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
  const [, setLocation] = useLocation();
  const [selectedAgent, setSelectedAgent] = useState<Agent>("Information Agent");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleInputChange = (value: string) => {
    setInput(value);
    
    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1 && lastAtIndex === value.length - 1) {
      setShowMentions(true);
      setMentionFilter("");
    } else if (lastAtIndex !== -1) {
      const afterAt = value.substring(lastAtIndex + 1);
      if (!afterAt.includes(' ')) {
        setShowMentions(true);
        setMentionFilter(afterAt.toLowerCase());
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const insertMention = (assetName: string) => {
    const lastAtIndex = input.lastIndexOf('@');
    const newInput = input.substring(0, lastAtIndex) + '@' + assetName + ' ';
    setInput(newInput);
    setShowMentions(false);
  };

  const simulateResponse = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase();
    
    // todo: remove mock functionality
    if (lowerMsg.includes('sales') && lowerMsg.includes('asset')) {
      const salesAssets = mockDataAssets.filter(a => 
        a.name.toLowerCase().includes('sales') || 
        a.collection.toLowerCase() === 'finance' ||
        a.collection.toLowerCase() === 'retail'
      );
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: `I found ${salesAssets.length} assets related to sales:`,
          timestamp: new Date(),
          agent: selectedAgent,
          assetCards: salesAssets
        }]);
      }, 1500);
    } else if (lowerMsg.includes('curate') && lowerMsg.includes('@')) {
      const assetName = lowerMsg.match(/@(\w+)/)?.[1];
      const asset = mockDataAssets.find(a => a.name.toLowerCase() === assetName?.toLowerCase());
      
      if (asset) {
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: "assistant",
            content: `Ready to curate ${asset.name}. Please review and update the metadata:`,
            timestamp: new Date(),
            agent: selectedAgent,
            curationData: asset
          }]);
        }, 1200);
      }
    } else if (lowerMsg.includes('metadata') && lowerMsg.includes('@')) {
      const assetName = lowerMsg.match(/@(\w+)/)?.[1];
      const asset = mockDataAssets.find(a => a.name.toLowerCase() === assetName?.toLowerCase());
      
      if (asset) {
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: "assistant",
            content: `Here's the metadata for ${asset.name}:\n\nType: ${asset.type}\nOwner: ${asset.owner}\nCollection: ${asset.collection}\nSensitivity: ${asset.sensitivityLabel}\nClassification: ${asset.classification}\nQuality Score: ${asset.qualityScore}\nTags: ${asset.tags.join(', ')}`,
            timestamp: new Date(),
            agent: selectedAgent
          }]);
        }, 1200);
      }
    } else if (lowerMsg.includes('unassigned')) {
      const unassigned = mockDataAssets.filter(a => !a.owner);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: `Found ${unassigned.length} unassigned assets:`,
          timestamp: new Date(),
          agent: selectedAgent,
          assetCards: unassigned
        }]);
      }, 1200);
    } else if (lowerMsg.includes('recommend') || lowerMsg.includes('recommendation')) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'll take you to the Recommendations page where you can see all governance recommendations.",
          timestamp: new Date(),
          agent: selectedAgent
        }]);
        setTimeout(() => setLocation('/recommendations'), 1000);
      }, 1200);
    } else {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm here to help! Try asking about sales assets, curating data, or viewing metadata.",
          timestamp: new Date(),
          agent: selectedAgent
        }]);
      }, 1000);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    simulateResponse(input);
  };

  const handleCurationApprove = (data: Partial<DataAsset>) => {
    toast({
      title: "Success",
      description: "Data asset successfully curated!",
    });
    console.log('Curation approved:', data);
  };

  const filteredAssets = showMentions 
    ? mockDataAssets.filter(a => a.name.toLowerCase().includes(mentionFilter))
    : [];

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold" data-testid="text-page-title">AI Agent Chat</h1>
          <Select value={selectedAgent} onValueChange={(v) => setSelectedAgent(v as Agent)}>
            <SelectTrigger className="w-64" data-testid="select-agent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Information Agent">Information Agent</SelectItem>
              <SelectItem value="Data Curator Agent">Data Curator Agent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Suggested:</span>
          {suggestedQuestions[selectedAgent].slice(0, 3).map((q, i) => (
            <Badge 
              key={i} 
              variant="outline" 
              className="cursor-pointer hover-elevate" 
              onClick={() => setInput(q)}
              data-testid={`badge-suggestion-${i}`}
            >
              {q}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Welcome to Purview AI Portal</h2>
            <p className="text-muted-foreground mb-4">
              Select an agent and start chatting to explore your data assets
            </p>
            <div className="grid gap-2 max-w-md mx-auto">
              {suggestedQuestions[selectedAgent].map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="justify-start"
                  onClick={() => setInput(q)}
                  data-testid={`button-suggestion-full-${i}`}
                >
                  <ChevronRight className="w-4 h-4 mr-2" />
                  {q}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble message={message} />
            
            {message.assetCards && (
              <div className="grid gap-3 mt-3 ml-11">
                {message.assetCards.map(asset => (
                  <AssetCard 
                    key={asset.id} 
                    asset={asset} 
                    onViewMore={() => setLocation(`/asset/${asset.id}`)} 
                  />
                ))}
              </div>
            )}

            {message.curationData && (
              <div className="mt-3 ml-11 max-w-lg">
                <CurationCard
                  asset={message.curationData}
                  onApprove={handleCurationApprove}
                  onCancel={() => console.log('Curation cancelled')}
                />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8" />
            <Card className="w-fit">
              <TypingIndicator />
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-4">
        <div className="mb-2 text-sm text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{selectedAgent}</span>
        </div>
        
        <div className="relative">
          {showMentions && filteredAssets.length > 0 && (
            <Card className="absolute bottom-full mb-2 w-full max-h-48 overflow-y-auto">
              {filteredAssets.map(asset => (
                <div
                  key={asset.id}
                  className="px-4 py-2 hover-elevate cursor-pointer border-b border-border last:border-0"
                  onClick={() => insertMention(asset.name)}
                  data-testid={`mention-${asset.name}`}
                >
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-xs text-muted-foreground">{asset.type} • {asset.collection}</div>
                </div>
              ))}
            </Card>
          )}
          
          <div className="flex gap-2">
            <Button size="icon" variant="outline" data-testid="button-attach">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type @ to mention assets..."
              className="flex-1"
              data-testid="input-chat"
            />
            <Button onClick={handleSend} data-testid="button-send">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

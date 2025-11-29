import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Send, Sparkles, User, Loader2, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "Best places to stay in Miami?",
  "How to get from LA to Dallas?",
  "Visa requirements for US entry",
  "What can I bring to the stadium?",
];

export default function Concierge() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (userMessages: Message[]) => {
      const res = await apiRequest("POST", "/api/concierge/chat", { messages: userMessages });
      return res.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again." }
      ]);
    },
  });

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;
    
    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    chatMutation.mutate(newMessages);
  };

  const handleQuickPrompt = (prompt: string) => {
    if (chatMutation.isPending) return;
    
    const userMessage: Message = { role: "user", content: prompt };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    chatMutation.mutate(newMessages);
  };

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/\n- /g, '\n• ')
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('• ')) {
          return `<div key="${i}" class="flex items-start gap-2 my-1"><span class="text-primary">•</span><span>${line.slice(2)}</span></div>`;
        }
        return `<p class="my-1">${line}</p>`;
      })
      .join('');
  };

  return (
    <Layout hideBottomNav>
      <div className="flex flex-col h-[100dvh] bg-background">
        {/* Header */}
        <div className="flex-shrink-0 bg-gradient-to-b from-card to-background border-b border-white/5 pt-12 px-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-white">AI Concierge</h1>
              <p className="text-sm text-muted-foreground">Your World Cup travel expert</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center mb-4">
                <Sparkles className="w-10 h-10 text-yellow-400" />
              </div>
              <h2 className="text-xl font-display font-bold text-white mb-2">Welcome!</h2>
              <p className="text-muted-foreground mb-6 max-w-sm">
                I'm your AI concierge for FIFA 2026. Ask me anything about host cities, 
                transportation, lodging, dining, or entry requirements!
              </p>
              
              <div className="w-full space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Try asking:</p>
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="w-full text-left px-4 py-3 bg-card border border-white/5 rounded-xl text-sm text-white hover:bg-white/5 hover:border-white/10 transition-colors"
                    data-testid={`quick-prompt-${i}`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  data-testid={`message-${msg.role}-${i}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[85%] ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                        msg.role === "user"
                          ? "bg-primary"
                          : "bg-gradient-to-br from-yellow-400 to-orange-500"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-card border border-white/5 text-muted-foreground rounded-tl-sm"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <div 
                          className="text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                        />
                      ) : (
                        <p className="text-sm">{msg.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {chatMutation.isPending && (
                <div className="flex justify-start" data-testid="message-loading">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-card border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-white/5 bg-card px-4 py-4 pb-safe">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about World Cup 2026..."
              className="flex-1 bg-background border border-white/10 rounded-full px-4 py-3 text-white text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              disabled={chatMutation.isPending}
              data-testid="input-chat-message"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || chatMutation.isPending}
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
              data-testid="button-send-message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            AI-powered responses may not always be accurate. Verify important details.
          </p>
        </div>
      </div>
    </Layout>
  );
}

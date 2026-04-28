import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { sendMessageStream } from "../services/gemini";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  isStreaming?: boolean;
}

interface ChatInterfaceProps {
  tripContext: string;
  setInputText: (text: string) => void;
  timelineItems?: any[];
  setTimelineItems?: (items: any[]) => void;
}

export function ChatInterface({ tripContext, setInputText, timelineItems, setTimelineItems }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "model",
      content:
        "Your itinerary is ready. Would you like a quieter pace, a wellness focus, or a more adventurous afternoon?",
    },
  ]);
  const [input, setInput] = useState("");
  
  useEffect(() => {
    if (tripContext && tripContext.startsWith("Fixing my plan")) setInput("Refine my plan.");
    if (tripContext && tripContext.startsWith("Finding food")) setInput("Find a nearby fine dining spot.");
    if (tripContext && tripContext.startsWith("Optimizing schedule")) setInput("Optimize my day.");
    if (tripContext && tripContext.startsWith("Add this to my timeline:")) setInput(tripContext);
  }, [tripContext]);

  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMessageId, role: "model", content: "", isStreaming: true }]);

    try {
      // Prepend tripContext specifically to the user's latest message if it exists, or pass it as an invisible user contextual message.
      // Easiest is to prepend it to the current input behind the scenes so the model is aware of the current state.
      let apiMessageContent = userMessage.content;
      if (timelineItems) {
        apiMessageContent += `\n\n[CURRENT TIMELINE]\n${JSON.stringify(timelineItems)}`;
      }
      
      if (tripContext) {
        apiMessageContent = `[SYSTEM NOTE: The user has updated their context. Apply this to all following instructions.]\n\n${tripContext}\n\n[USER INSTRUCTION]\n${apiMessageContent}`;
      }

      const historyForApi = messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
      const stream = await sendMessageStream(historyForApi, apiMessageContent);

      let accumulatedContent = '';
      for await (const chunk of stream) {
        if (chunk.text) {
          accumulatedContent += chunk.text;
          setMessages(prev => prev.map(msg => 
            msg.id === modelMessageId ? { ...msg, content: accumulatedContent } : msg
          ));
        }
        if (chunk.functionCalls && chunk.functionCalls.length > 0) {
          for (const call of chunk.functionCalls) {
            if (call.name === "update_timeline" && setTimelineItems) {
              const args = call.args as any;
              if (args && args.items) {
                setTimelineItems(args.items);
                accumulatedContent += "\n\n*I have updated your itinerary.*";
                setMessages(prev => prev.map(msg => 
                  msg.id === modelMessageId ? { ...msg, content: accumulatedContent } : msg
                ));
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to generate content:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId ? { ...msg, content: "I apologize, but I am currently unable to process your request. Please try again." } : msg
      ));
    } finally {
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId ? { ...msg, isStreaming: false } : msg
      ));
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 scroll-smooth"
      >
        <div className="flex flex-col gap-8 pb-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn(
                  "flex flex-col max-w-[85%]",
                  message.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div className={cn(
                  "mb-2 font-mono text-[10px] font-bold uppercase tracking-widest",
                  message.role === "user" ? "text-right text-[#1a1815]" : "text-left text-[#1a1815]"
                )}>
                  {message.role === "user" ? "Guest" : "Concierge"}
                </div>
                
                <div className={cn(
                  "relative rounded-3xl px-5 py-4 text-[15px] leading-relaxed shadow-md",
                  message.role === "user"
                    ? "rounded-br-sm border border-[#e3dcd1]/60 bg-white text-[#1a1815] backdrop-blur-md"
                    : "markdown-body rounded-bl-sm border border-[#e3dcd1]/60 bg-[#fcfaf6] text-[#1a1815]"
                )}>
                  {message.role === "user" ? (
                    <p>{message.content}</p>
                  ) : (
                    <div className="markdown-body">
                      {message.isStreaming && message.content === "" ? (
                         <div className="flex gap-1.5 items-center h-5">
                          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-[#fcfaf6]" />
                          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-[#fcfaf6]" />
                          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-[#fcfaf6]" />
                        </div>
                      ) : (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Suggestion Chips */}
      {!isLoading && messages[messages.length - 1]?.role === "model" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 flex flex-wrap gap-2 px-6 pb-4"
        >
          {[
            "Slower pace, please.",
            "Find coffee nearby.",
            "Add one scenic stop."
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => setInputText(chip)}
              className="rounded-full border border-[#e3dcd1]/70 bg-white/75 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-[#3a3530] transition-all hover:-translate-y-0.5 hover:border-[#e3dcd1] hover:bg-white hover:text-[#1a1815] backdrop-blur-md"
            >
              {chip}
            </button>
          ))}
        </motion.div>
      )}

      <div className="z-10 border-t border-[#e3dcd1]/60 bg-[#fdfbf7]/90 p-6 backdrop-blur-3xl">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask for dining, wellness, transport, or pace changes..."
            className="w-full rounded-2xl border border-[#e3dcd1]/60 bg-white px-6 py-4 pr-14 text-sm text-[#1a1815] outline-none transition-all placeholder:text-[#3a3530]/60 focus:border-[#e3dcd1] focus:ring-1 focus:ring-[#8a7b63]/20"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="group absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-[#e3dcd1]/70 bg-white p-2.5 text-[#1a1815] transition-all hover:bg-[#fcfaf6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#1a1815]/70">
            Powered by Gemini • Concierge Intelligence
          </p>
        </div>
      </div>
    </div>
  );
}

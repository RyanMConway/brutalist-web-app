import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User, Bot, Loader } from "lucide-react";

export default function ChatWidget({ isBrutalist }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", text: "Greetings. I am Ryan's AI Assistant. Ask me about his AWS architecture, Python skills, or bodybuilding stats." }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const toggleChat = () => setIsOpen(!isOpen);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input })
            });
            const data = await res.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
            } else {
                throw new Error("No reply");
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: "bot", text: ">> ERROR: CONNECTION SEVERED. TRY AGAIN." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className={`mb-4 w-80 md:w-96 h-[500px] flex flex-col shadow-2xl rounded-2xl overflow-hidden border transition-all ${
                    isBrutalist
                        ? "bg-black border-emerald-500"
                        : "bg-white border-slate-200"
                }`}>

                    {/* Header */}
                    <div className={`p-4 flex justify-between items-center ${
                        isBrutalist ? "bg-emerald-900/20 border-b border-emerald-500/30" : "bg-blue-600 text-white"
                    }`}>
                        <div className="flex items-center gap-2">
                            {isBrutalist ? <TerminalIcon /> : <Bot size={20} />}
                            <span className={`font-bold ${isBrutalist ? "font-mono text-emerald-500" : ""}`}>
                                {isBrutalist ? "AI_UPLINK_V2" : "Ryan's AI Assistant"}
                            </span>
                        </div>
                        <button onClick={toggleChat} className="hover:opacity-70">
                            <X size={20} className={isBrutalist ? "text-emerald-500" : "text-white"} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className={`flex-1 p-4 overflow-y-auto ${isBrutalist ? "bg-black scrollbar-hide" : "bg-slate-50"}`}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                                    msg.role === "user"
                                        ? (isBrutalist ? "bg-emerald-900/30 text-emerald-400 border border-emerald-500/50" : "bg-blue-600 text-white rounded-br-none")
                                        : (isBrutalist ? "bg-transparent text-slate-300" : "bg-white border border-slate-200 text-slate-700 shadow-sm rounded-bl-none")
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start mb-4">
                                <div className={`p-3 rounded-lg ${isBrutalist ? "text-emerald-500 animate-pulse" : "bg-white border border-slate-200 p-2 shadow-sm"}`}>
                                    <Loader size={16} className="animate-spin" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={sendMessage} className={`p-4 border-t ${
                        isBrutalist ? "border-emerald-500/30 bg-black" : "border-slate-100 bg-white"
                    }`}>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isBrutalist ? "ENTER_QUERY..." : "Type a message..."}
                                className={`flex-1 p-2 outline-none text-sm ${
                                    isBrutalist
                                        ? "bg-emerald-900/10 text-emerald-500 placeholder-emerald-800 border-b border-transparent focus:border-emerald-500 transition-colors font-mono"
                                        : "bg-slate-100 rounded-full px-4 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-100"
                                }`}
                            />
                            <button type="submit" disabled={loading} className={`p-2 rounded-full transition-all ${
                                isBrutalist
                                    ? "text-emerald-500 hover:bg-emerald-900/20 disabled:opacity-50"
                                    : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 shadow-md"
                            }`}>
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* TOGGLE BUTTON */}
            <button
                onClick={toggleChat}
                className={`p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center ${
                    isBrutalist
                        ? "bg-black border border-emerald-500 text-emerald-500 hover:bg-emerald-900/20 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    );
}

// Simple Icon Component for Brutalist Mode
function TerminalIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
    );
}
import { useState, useEffect, useRef } from 'react';
import { Send, Terminal, Loader, ShieldAlert } from 'lucide-react';

export default function Contact({ isBrutalist }) {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // --- SLEEK MODE STATE ---
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [status, setStatus] = useState('idle');

    // --- BRUTALIST (TERMINAL) MODE STATE ---
    const [logs, setLogs] = useState([
        { type: 'system', text: 'CONNECTION ESTABLISHED.' },
        { type: 'system', text: 'RYAN_OS v2.5.0 ONLINE.' },
        { type: 'info', text: 'TYPE "HELP" FOR COMMAND LIST.' },
        { type: 'system', text: 'PLEASE IDENTIFY YOURSELF (ENTER NAME):' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [step, setStep] = useState(0); // 0=Name, 1=Message, 2=Done
    const [terminalName, setTerminalName] = useState('');
    const bottomRef = useRef(null);

    // Auto-scroll terminal
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    // --- EASTER EGG COMMANDS ---
    const checkCommand = (input) => {
        const cmd = input.toLowerCase().trim();

        const commands = {
            'help': "AVAILABLE COMMANDS: HELP, CLEAR, WHOAMI, STACK, FLEX, STATS, GARAGE, ROLL, MTG",
            'sudo': "ACCESS DENIED. NICE TRY.",
            'clear': "CLEARING...",
            'whoami': "USER: GUEST | PERMISSIONS: READ_ONLY",
            'ls': "resume.pdf  gym_routine.md  world_domination_plans.txt  aws_credentials.pem",

            // Tech
            'stack': "CORE: React, Node.js, Postgres | DATA: PySpark, AWS EMR, Glue | INFRA: EC2, EKS, Terraform",

            // Bodybuilding
            'flex': "💪 ( ^_^ )/ --[ GAINS DETECTED ]",
            'stats': "HEIGHT: 6'0\" | OFF-SEASON: 260lbs | STAGE: 209lbs | BF%: VARIABLE",
            'macros': "PROTEIN: 250g | CARBS: 300g | FATS: 60g | SLEEP: 8HRS",

            // Vehicles
            'garage': "LOADOUT: Subaru WRX (Daily) | Motorcycle [Classified] | STATUS: Garage Capacity Critical",

            // Nerd Culture
            'roll': `D20 ROLL: ${Math.floor(Math.random() * 20) + 1}`,
            'mtg': "TAP: 💧💧 Add UU to mana pool. COUNTERSPELL READY.",
            'cat world_domination_plans.txt': "1. Lift heavy circles.\n2. Write clean ETL pipelines.\n3. Buy more Magic cards.",
            'cat aws_credentials.pem': "⚠️ SECURITY ALERT: INCIDENT REPORTED TO TIAA INFOSEC."
        };

        return commands[cmd] || null;
    };

    // --- BRUTALIST HANDLER ---
    const handleTerminalSubmit = async (e) => {
        if (e.key !== 'Enter') return;

        const userInput = inputValue.trim();
        if (!userInput) return;

        // 1. Add User Input to Logs
        const newLogs = [...logs, { type: 'user', text: `> ${userInput}` }];
        setInputValue('');

        // 2. Check for Commands (Intercept)
        const commandResponse = checkCommand(userInput);

        if (commandResponse) {
            if (userInput.toLowerCase() === 'clear') {
                setLogs([{ type: 'system', text: 'CONSOLE CLEARED.' }]);
            } else {
                setLogs([...newLogs, { type: 'success', text: `>> ${commandResponse}` }]);
            }
            return; // STOP HERE (Don't process as name/message)
        }

        // 3. Normal Contact Flow
        if (step === 0) {
            setTerminalName(userInput);
            setLogs([...newLogs, { type: 'system', text: `ACKNOWLEDGED, ${userInput}. ENTER TRANSMISSION CONTENT:` }]);
            setStep(1);
        } else if (step === 1) {
            setLogs([...newLogs, { type: 'system', text: 'ENCRYPTING AND TRANSMITTING...' }]);
            setStep(2);

            try {
                const res = await fetch(`${API_URL}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sender_name: terminalName, message_content: userInput })
                });

                if (res.ok) {
                    setLogs(prev => [...prev,
                        { type: 'success', text: '>> UPLOAD COMPLETE. PACKET RECEIVED.' },
                        { type: 'system', text: 'TERMINATING SESSION...' }
                    ]);
                } else {
                    throw new Error('Failed');
                }
            } catch (err) {
                setLogs(prev => [...prev, { type: 'error', text: '>> ERROR: CONNECTION SEVERED. TRY AGAIN.' }]);
                setStep(0);
            }
        }
    };

    // --- SLEEK HANDLER ---
    const handleSleekSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch(`${API_URL}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender_name: formData.name, message_content: formData.message })
            });
            if (res.ok) setStatus('success');
            else setStatus('error');
        } catch (err) {
            setStatus('error');
        }
    };

    // --- RENDER ---
    return (
        <div className="max-w-4xl mx-auto w-full pt-10 min-h-[70vh] flex flex-col justify-center">

            <header className="mb-12">
                <h1 className={isBrutalist ? "text-6xl font-mono font-bold text-white mb-4" : "text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4"}>
                    {isBrutalist ? ">> COMMS_LINK" : "Get in Touch"}
                </h1>
            </header>

            {isBrutalist ? (
                // TERMINAL MODE
                <div className="w-full bg-black border-2 border-emerald-500 p-6 font-mono text-sm md:text-base shadow-[0_0_20px_rgba(16,185,129,0.2)] min-h-[500px] flex flex-col">
                    <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-[500px] scrollbar-hide">
                        {logs.map((log, i) => (
                            <div key={i} className={
                                log.type === 'user' ? "text-white" :
                                    log.type === 'error' ? "text-red-500 font-bold" :
                                        log.type === 'success' ? "text-emerald-400 font-bold" :
                                            log.type === 'info' ? "text-blue-400" :
                                                "text-emerald-600"
                            }>
                                {log.text}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {step < 2 && (
                        <div className="flex items-center gap-2 text-emerald-500 bg-emerald-900/10 p-2 rounded">
                            <span className="animate-pulse">_</span>
                            <input
                                autoFocus
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleTerminalSubmit}
                                className="bg-transparent border-none outline-none text-white w-full font-mono uppercase"
                                placeholder={step === 0 ? "ENTER_NAME (OR COMMAND)" : "ENTER_MESSAGE"}
                            />
                        </div>
                    )}
                    {step === 2 && (
                        <button onClick={() => { setStep(0); setLogs([]); }} className="mt-4 text-emerald-500 hover:text-white border border-emerald-500 px-4 py-2 w-fit">
                            RESET_CONNECTION
                        </button>
                    )}
                </div>
            ) : (
                // SLEEK FORM (Unchanged)
                <div className="bg-slate-900/50 p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
                    {status === 'success' ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Send className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-slate-400">I'll get back to you shortly.</p>
                            <button onClick={() => setStatus('idle')} className="mt-6 text-blue-400 hover:text-white">Send another?</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSleekSubmit} className="space-y-6">
                            <div>
                                <label className="block text-slate-400 mb-2 text-sm">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 mb-2 text-sm">Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="How can I help you?"
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? <Loader className="animate-spin" /> : <>Send Message <Send size={18} /></>}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLogin({ isBrutalist }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError('ACCESS DENIED');
            }
        } catch (err) {
            setError('SERVER ERROR');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className={isBrutalist
                ? "bg-black border-2 border-red-500 p-8 w-96 shadow-[0_0_20px_rgba(239,68,68,0.3)] font-mono"
                : "bg-white p-8 rounded-2xl shadow-xl w-96 border border-slate-200"
            }>
                <div className="flex justify-center mb-6">
                    <div className={isBrutalist ? "p-4 border border-red-500 rounded-full" : "p-4 bg-blue-100 rounded-full"}>
                        <Lock size={32} className={isBrutalist ? "text-red-500" : "text-blue-600"} />
                    </div>
                </div>

                <h2 className={`text-center text-2xl mb-6 ${isBrutalist ? "text-red-500 uppercase tracking-widest" : "font-bold text-slate-700"}`}>
                    {isBrutalist ? "RESTRICTED_AREA" : "Admin Login"}
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={isBrutalist
                            ? "w-full bg-black border border-red-500 text-red-500 p-3 outline-none focus:bg-red-900/20"
                            : "w-full bg-slate-50 border border-slate-200 p-3 rounded-lg outline-none focus:border-blue-500"
                        }
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={isBrutalist
                            ? "w-full bg-black border border-red-500 text-red-500 p-3 outline-none focus:bg-red-900/20"
                            : "w-full bg-slate-50 border border-slate-200 p-3 rounded-lg outline-none focus:border-blue-500"
                        }
                    />

                    {error && <div className="text-red-500 text-center text-sm font-bold">{error}</div>}

                    <button className={isBrutalist
                        ? "w-full bg-red-600 hover:bg-red-500 text-black font-bold py-3 transition-none uppercase"
                        : "w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all"
                    }>
                        Authenticate
                    </button>
                </form>
            </div>
        </div>
    );
}
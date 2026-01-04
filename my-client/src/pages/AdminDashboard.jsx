import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, LogOut, RefreshCw } from 'lucide-react';

export default function AdminDashboard({ isBrutalist }) {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) return navigate('/admin');

        const res = await fetch(`${API_URL}/admin/messages`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
            setMessages(await res.json());
        } else {
            navigate('/admin'); // Token invalid
        }
    };

    const deleteMessage = async (id) => {
        if (!confirm("Delete this message?")) return;

        const token = localStorage.getItem('adminToken');
        await fetch(`${API_URL}/admin/messages/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchMessages(); // Refresh list
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    return (
        <div className="max-w-6xl mx-auto pt-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className={isBrutalist ? "text-4xl font-mono text-red-500" : "text-4xl font-bold text-slate-800"}>
                    {isBrutalist ? ">> SYSTEM_LOGS" : "Message Center"}
                </h1>
                <div className="flex gap-4">
                    <button onClick={fetchMessages} className="p-2 bg-emerald-500/20 text-emerald-500 rounded hover:bg-emerald-500/40">
                        <RefreshCw size={20} />
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>

            <div className={isBrutalist
                ? "border border-emerald-500/30 bg-black font-mono text-sm"
                : "bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200"
            }>
                <table className="w-full text-left">
                    <thead className={isBrutalist ? "bg-emerald-900/20 text-emerald-500" : "bg-slate-50 text-slate-500"}>
                    <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">Sender</th>
                        <th className="p-4">Message</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Action</th>
                    </tr>
                    </thead>
                    <tbody className={isBrutalist ? "text-slate-300" : "text-slate-700"}>
                    {messages.map(msg => (
                        <tr key={msg.id} className={isBrutalist ? "border-b border-emerald-900/30 hover:bg-emerald-900/10" : "border-b border-slate-100 hover:bg-slate-50"}>
                            <td className="p-4 opacity-50">#{msg.id}</td>
                            <td className="p-4 font-bold">{msg.sender_name}</td>
                            <td className="p-4 max-w-lg truncate">{msg.message_content}</td>
                            <td className="p-4 opacity-70">{new Date(msg.created_at).toLocaleDateString()}</td>
                            <td className="p-4">
                                <button onClick={() => deleteMessage(msg.id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {messages.length === 0 && (
                    <div className="p-10 text-center opacity-50">No messages found in database.</div>
                )}
            </div>
        </div>
    );
}
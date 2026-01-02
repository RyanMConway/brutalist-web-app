import { useEffect, useState } from 'react';

function App() {
    const [users, setUsers] = useState([]);

    // Use the environment variable, or fallback to localhost if it's missing
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        // We append '/users' to the base URL
        fetch(`${API_URL}/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error("Error fetching:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-10 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-blue-400">User List</h1>

            <div className="w-full max-w-md space-y-4">
                {users.length === 0 ? (
                    <p className="text-gray-400 text-center">Loading users...</p>
                ) : (
                    users.map((user) => (
                        <div key={user.id} className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold">{user.name}</h2>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                            <span className="bg-blue-600 text-xs font-bold px-2 py-1 rounded">ID: {user.id}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
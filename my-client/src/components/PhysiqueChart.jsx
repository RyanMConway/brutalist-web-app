import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
    { month: 'Jan', weight: 265, calories: 4500, phase: 'Off-Season' },
    { month: 'Feb', weight: 262, calories: 4200, phase: 'Prep Start' },
    { month: 'Mar', weight: 255, calories: 3800, phase: 'Cut' },
    { month: 'Apr', weight: 245, calories: 3200, phase: 'Cut' },
    { month: 'May', weight: 235, calories: 2800, phase: 'Deep Cut' },
    { month: 'Jun', weight: 225, calories: 2400, phase: 'Suffering' },
    { month: 'Jul', weight: 215, calories: 2000, phase: 'Depleted' },
    { month: 'Aug', weight: 209, calories: 1800, phase: 'Stage Ready' },
];

export default function PhysiqueChart({ isBrutalist }) {
    return (
        <div className={`w-full h-[400px] p-4 rounded-xl border ${isBrutalist ? "bg-black border-emerald-500" : "bg-white border-slate-200 shadow-xl"}`}>

            <h3 className={`text-xl mb-4 font-bold ${isBrutalist ? "text-emerald-500 font-mono uppercase" : "text-slate-700"}`}>
                {isBrutalist ? ">> SYSTEM_LOAD_METRICS (BODY_MASS)" : "Physique Transformation Data"}
            </h3>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={isBrutalist ? "#10b981" : "#3b82f6"} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={isBrutalist ? "#10b981" : "#3b82f6"} stopOpacity={0}/>
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke={isBrutalist ? "#064e3b" : "#e2e8f0"} />

                    <XAxis
                        dataKey="month"
                        stroke={isBrutalist ? "#10b981" : "#64748b"}
                        tick={{fill: isBrutalist ? "#10b981" : "#64748b"}}
                    />

                    <YAxis
                        yAxisId="left"
                        domain={[200, 270]}
                        stroke={isBrutalist ? "#10b981" : "#3b82f6"}
                        tick={{fill: isBrutalist ? "#10b981" : "#3b82f6"}}
                        label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft', fill: isBrutalist ? "#10b981" : "#3b82f6" }}
                    />

                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[1500, 5000]}
                        stroke={isBrutalist ? "#ef4444" : "#f59e0b"}
                        tick={{fill: isBrutalist ? "#ef4444" : "#f59e0b"}}
                        label={{ value: 'Calories', angle: 90, position: 'insideRight', fill: isBrutalist ? "#ef4444" : "#f59e0b" }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: isBrutalist ? "#000" : "#fff",
                            borderColor: isBrutalist ? "#10b981" : "#cbd5e1",
                            color: isBrutalist ? "#10b981" : "#1e293b"
                        }}
                    />

                    <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="weight"
                        stroke={isBrutalist ? "#10b981" : "#3b82f6"}
                        fillOpacity={1}
                        fill="url(#colorWeight)"
                        strokeWidth={3}
                    />

                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="calories"
                        stroke={isBrutalist ? "#ef4444" : "#f59e0b"}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                    />

                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
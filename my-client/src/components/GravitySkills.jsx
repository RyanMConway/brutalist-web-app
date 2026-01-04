import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function GravitySkills({ isBrutalist }) {
    const sceneRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);
    const engineRef = useRef(null);

    // The skills we want to drop
    const skills = [
        "AWS", "PySpark", "React", "Node.js",
        "Postgres", "Docker", "Terraform", "Python",
        "EMR", "EC2", "Glue", "Git"
    ];

    useEffect(() => {
        if (renderRef.current) return;

        // 1. SETUP
        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Runner = Matter.Runner,
            Events = Matter.Events;

        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        const width = sceneRef.current.clientWidth || 600;
        const height = 400;

        // 2. RENDERER
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                background: "transparent",
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });
        renderRef.current = render;

        // 3. BOUNDARIES
        const wallOptions = {
            isStatic: true,
            render: { visible: false }
        };

        // Floor, Ceiling, Walls
        // ADJUSTED FLOOR: moved up slightly to ensure visual clearance
        World.add(world, [
            Bodies.rectangle(width / 2, height + 24, width, 50, wallOptions), // Floor
            Bodies.rectangle(-25, height / 2, 50, height, wallOptions),      // Left
            Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions) // Right
        ]);

        // 4. SKILLS
        const skillBodies = skills.map((skill) => {
            const x = Math.random() * (width - 100) + 50;
            const y = Math.random() * -300 - 50;
            const boxWidth = skill.length * 14 + 40;
            const boxHeight = 44;

            return Bodies.rectangle(x, y, boxWidth, boxHeight, {
                chamfer: { radius: 6 },
                restitution: 0.5,
                friction: 0.5,
                render: {
                    fillStyle: isBrutalist ? "#000000" : "#3b82f6",
                    strokeStyle: isBrutalist ? "#10b981" : "#2563eb",
                    lineWidth: isBrutalist ? 2 : 0
                },
                label: skill
            });
        });

        World.add(world, skillBodies);

        // 5. MOUSE CONTROL
        const mouse = Mouse.create(render.canvas);
        mouse.pixelRatio = window.devicePixelRatio;

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 1,
                damping: 0.1,
                render: { visible: false }
            }
        });

        World.add(world, mouseConstraint);

        // 6. TEXT RENDER LOOP
        Events.on(render, "afterRender", function() {
            const ctx = render.context;
            skillBodies.forEach((body) => {
                const { x, y } = body.position;
                const angle = body.angle;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                ctx.font = isBrutalist ? "16px 'JetBrains Mono'" : "bold 14px 'Inter'";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = isBrutalist ? "#10b981" : "#ffffff";
                ctx.fillText(body.label, 0, 0);
                ctx.restore();
            });
        });

        // 7. RUN
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);
        Render.run(render);

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            World.clear(world);
            Engine.clear(engine);
            renderRef.current = null;
        };
    }, [isBrutalist]);

    return (
        <div
            ref={sceneRef}
            style={{ touchAction: "none" }}
            className={`w-full h-[400px] relative overflow-hidden rounded-xl border ${
                isBrutalist
                    ? "border-emerald-500 bg-black/50"
                    : "border-slate-200 bg-slate-50 shadow-inner"
            }`}
        >
            <div className={`absolute top-4 left-4 text-xs font-bold tracking-widest pointer-events-none select-none z-10 ${
                isBrutalist ? "text-emerald-500 font-mono" : "text-slate-400"
            }`}>
                {isBrutalist ? ">> GRAVITY_ENGINE // INTERACTIVE_STACK" : "Interactive Tech Stack (Try Dragging)"}
            </div>
        </div>
    );
}
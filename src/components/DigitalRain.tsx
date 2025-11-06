import { useEffect, useRef } from "react";

interface DigitalRainProps {
  intensity?: "low" | "medium" | "high";
  colorScheme?: "default" | "boss";
}

const DigitalRain = ({ intensity = "medium", colorScheme = "default" }: DigitalRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01011010";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const intensityMap = {
      low: { speed: 1.5, opacity: 0.15 },
      medium: { speed: 1, opacity: 0.25 },
      high: { speed: 0.7, opacity: 0.35 },
    };

    const settings = intensityMap[intensity];

    const draw = () => {
      ctx.fillStyle = "rgba(12, 18, 29, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        let color;
        if (colorScheme === "boss") {
          // Boss battle colors: purple, blue, yellow
          const rand = Math.random();
          if (rand < 0.33) {
            color = `rgba(200, 0, 255, ${settings.opacity})`; // purple/magenta
          } else if (rand < 0.66) {
            color = `rgba(0, 150, 255, ${settings.opacity})`; // blue
          } else {
            color = `rgba(255, 234, 0, ${settings.opacity})`; // yellow
          }
        } else {
          // Default colors: yellow and cyan
          color = Math.random() > 0.5 ? 
            `rgba(255, 234, 0, ${settings.opacity})` : // primary yellow
            `rgba(0, 255, 255, ${settings.opacity})`; // secondary cyan
        }
        
        ctx.fillStyle = color;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += settings.speed;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [intensity, colorScheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default DigitalRain;

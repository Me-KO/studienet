import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DebuggerDetector = () => {
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // DedSec: Debugger detection routine
    const detectDebugger = () => {
      if (hasRedirected.current) return;

      const start = performance.now();
      debugger; // This will pause execution if dev tools are open
      const end = performance.now();

      // If dev tools are open, there will be a significant delay
      if (end - start > 100) {
        console.log("%c🎯 DedSec: Je hebt ons gevonden, hacker!", "color: #FFD700; font-size: 20px; font-weight: bold;");
        console.log("%c🔍 Zoek naar meer DedSec comments in de code voor hints...", "color: #00FFFF; font-size: 14px;");
        
        hasRedirected.current = true;
        setTimeout(() => {
          navigate("/h4ck3r_z0n3");
        }, 1000);
      }
    };

    // Check periodically
    const interval = setInterval(detectDebugger, 1000);

    // Alternative detection: console is open
    const detectConsole = () => {
      if (hasRedirected.current) return;
      
      const element = new Image();
      Object.defineProperty(element, 'id', {
        get: function() {
          console.log("%c🚨 CONSOLE ACCESS DETECTED", "color: #FF1493; font-size: 16px; font-weight: bold;");
          console.log("%c→ Redirecting to secret zone...", "color: #FFD700; font-size: 14px;");
          
          hasRedirected.current = true;
          setTimeout(() => {
            navigate("/h4ck3r_z0n3");
          }, 1000);
        }
      });
      console.log(element);
    };

    detectConsole();

    return () => clearInterval(interval);
  }, [navigate]);

  return null;
};

export default DebuggerDetector;

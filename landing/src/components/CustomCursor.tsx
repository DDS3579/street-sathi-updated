import { useEffect, useState, useCallback } from "react";

interface TrailDot {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);

  const updateTrail = useCallback((x: number, y: number) => {
    setTrail((prevTrail) => {
      const newTrail = [...prevTrail, { x, y, id: Date.now() }];
      if (newTrail.length > 8) {
        return newTrail.slice(-8);
      }
      return newTrail;
    });
  }, []);

  useEffect(() => {
    let animationFrame: number;
    let lastX = 0;
    let lastY = 0;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Only add to trail if moved significantly
      if (Math.abs(e.clientX - lastX) > 5 || Math.abs(e.clientY - lastY) > 5) {
        updateTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup trail periodically
    const cleanupInterval = setInterval(() => {
      setTrail((prevTrail) => {
        const now = Date.now();
        return prevTrail.filter((dot) => now - dot.id < 300);
      });
    }, 50);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      clearInterval(cleanupInterval);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [updateTrail]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail dots */}
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none z-[9997] transition-opacity duration-200"
          style={{
            left: dot.x - 4,
            top: dot.y - 4,
            opacity: (index + 1) / trail.length * 0.4,
          }}
        >
          <div
            className="rounded-full bg-primary"
            style={{
              width: 4 + (index / trail.length) * 4,
              height: 4 + (index / trail.length) * 4,
            }}
          />
        </div>
      ))}

      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-75"
        style={{
          left: position.x - 8,
          top: position.y - 8,
          transform: isClicking ? "scale(0.8)" : isHovering ? "scale(1.5)" : "scale(1)",
        }}
      >
        <div
          className={`w-4 h-4 rounded-full bg-primary shadow-lg transition-all duration-150 ${
            isHovering ? "opacity-80" : "opacity-100"
          }`}
          style={{
            boxShadow: "0 0 20px hsl(161 67% 33% / 0.5)",
          }}
        />
      </div>

      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-200"
        style={{
          left: position.x - 24,
          top: position.y - 24,
          transform: isClicking ? "scale(0.9)" : isHovering ? "scale(1.8)" : "scale(1)",
        }}
      >
        <div
          className={`w-12 h-12 rounded-full border-2 border-primary transition-all duration-200 ${
            isHovering ? "opacity-60 bg-primary/10" : "opacity-40"
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;




"use client";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export const BackgroundGrid = () => {
  const [isGridReady, setIsGridReady] = useState(false);
  const [gridProperties, setGridProperties] = useState({
    columns: 0,
    rows: 0,
    totalBoxes: 0,
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const BOX_SIZE = 130;

  // Mouse movement handler - separate from grid calculations
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth mouse tracking
      requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Optimized grid calculation with async processing
  const calculateGrid = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;
    
    const bounds = container.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) return;
    
    // Use setTimeout to defer heavy calculation and prevent blocking
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const columns = Math.ceil(bounds.width / BOX_SIZE) + 2;
        const rows = Math.ceil(bounds.height / BOX_SIZE) + 2;
        const totalBoxes = columns * rows;
        
        // Only update if values actually changed
        setGridProperties(prev => {
          if (prev.columns === columns && prev.rows === rows) {
            resolve();
            return prev;
          }
          return { columns, rows, totalBoxes };
        });
        
        // Mark grid as ready after calculation
        setIsGridReady(true);
        resolve();
      }, 0);
    });
  }, [BOX_SIZE]);

  // Initialize grid calculation
  useEffect(() => {
    const initializeGrid = async () => {
      setIsGridReady(false);
      await calculateGrid();
    };
    
    initializeGrid();
    
    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = async () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        setIsGridReady(false);
        await calculateGrid();
      }, 150);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateGrid]);

  // Optimized transforms with better performance
  const x = useTransform(mouseX, [0, 1920], [-150, 1920 - 150]);
  const y = useTransform(mouseY, [0, 1080], [-150,  1080 - 150]);

  // Lazy render grid items only when needed
  const renderGridItems = () => {
    if (!isGridReady || gridProperties.totalBoxes === 0) return null;
    
    const items = [];
    for (let i = 0; i < gridProperties.totalBoxes; i++) {
      items.push(
        <div
          key={i}
          className="bg-[#00070F] "
          style={{
            width: BOX_SIZE,
            height: BOX_SIZE,
          }}
        />
      );
    }
    return items;
  };

  return (
    <div ref={containerRef} className="absolute inset-0 -z-[1] overflow-hidden">
      {/* Background grid pattern - always visible */}
      {
        isGridReady &&(

          <div className="absolute z-[1] inset-0 bg-[#333333] bg-grid-small [mask-image:radial-gradient(white,transparent_80%)]" />
        )
      }
      
      {/* Dynamic grid - render only when ready */}
      {isGridReady && gridProperties.totalBoxes > 0 && (
        <div
          className="absolute z-[3] top-0 left-0"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridProperties.columns}, ${BOX_SIZE}px)`,
            gridTemplateRows: `repeat(${gridProperties.rows}, ${BOX_SIZE}px)`,
            gap: "1px",
          }}
        >
          {renderGridItems()}
        </div>
      )}
      
      {/* Glowing mouse follower - only show when grid is ready */}
      {isGridReady && (
        <motion.div
          className="absolute z-[2] w-[300px] h-[300px] bg-electricBlue/50 rounded-full pointer-events-none blur-3xl"
          style={{ x, y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
      
    
    </div>
  );
};